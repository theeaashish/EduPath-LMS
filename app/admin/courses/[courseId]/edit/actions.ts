"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function editCourse(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.user.id,
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
    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
}
