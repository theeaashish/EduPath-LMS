"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Rate limit exceeded. Please try again later.",
        };
      } else {
        return {
          status: "error",
          message: "Bot detected. Access denied.",
        };
      }
    }

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.description,
      default_price_data: {
        currency: "usd",
        unit_amount: validation.data.price * 100,
      },
    });

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
        stripePriceId: data.default_price as string,
      },
    });

    return {
      status: "success",
      message: "Course created Successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
