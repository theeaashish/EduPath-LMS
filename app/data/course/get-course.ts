import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function GetIndividualCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      smallDescription: true,
      category: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lesson: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return notFound();

  return course;
}
