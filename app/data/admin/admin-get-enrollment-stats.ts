import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetEnrollmentStats() {
  await requireAdmin();

  const thiryDaysAgo = new Date();

  thiryDaysAgo.setDate(thiryDaysAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thiryDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const lastThirtyDays: { date: string; enrollments: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);
    lastThirtyDays.push({
      date: date.toISOString().split("T")[0],
      enrollments: 0,
    });
  }

  enrollments.forEach((enrollment) => {
    const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];
    const dayIndex = lastThirtyDays.findIndex(
      (day) => day.date === enrollmentDate
    );

    if (dayIndex !== -1) {
      lastThirtyDays[dayIndex].enrollments++;
    }
  });

  return lastThirtyDays;
}
