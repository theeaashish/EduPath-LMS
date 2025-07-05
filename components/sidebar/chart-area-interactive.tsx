"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

export const description = "An interactive area chart";

// const dummyEnrollmentData = [
//   { date: "2024-05-15", enrollments: 23 },
//   { date: "2024-05-16", enrollments: 12 },
//   { date: "2024-05-17", enrollments: 34 },
//   { date: "2024-05-18", enrollments: 8 },
//   { date: "2024-05-19", enrollments: 29 },
//   { date: "2024-05-20", enrollments: 17 },
//   { date: "2024-05-21", enrollments: 14 },
//   { date: "2024-05-22", enrollments: 41 },
//   { date: "2024-05-23", enrollments: 26 },
//   { date: "2024-05-24", enrollments: 39 },
//   { date: "2024-05-25", enrollments: 10 },
//   { date: "2024-05-26", enrollments: 31 },
//   { date: "2024-05-27", enrollments: 7 },
//   { date: "2024-05-28", enrollments: 45 },
//   { date: "2024-05-29", enrollments: 20 },
//   { date: "2024-05-30", enrollments: 16 },
//   { date: "2024-05-31", enrollments: 13 },
//   { date: "2024-06-01", enrollments: 36 },
//   { date: "2024-06-02", enrollments: 22 },
//   { date: "2024-06-03", enrollments: 18 },
//   { date: "2024-06-04", enrollments: 30 },
//   { date: "2024-06-05", enrollments: 5 },
//   { date: "2024-06-06", enrollments: 27 },
//   { date: "2024-06-07", enrollments: 42 },
//   { date: "2024-06-08", enrollments: 11 },
//   { date: "2024-06-09", enrollments: 19 },
//   { date: "2024-06-10", enrollments: 15 },
//   { date: "2024-06-11", enrollments: 33 },
//   { date: "2024-06-12", enrollments: 6 },
//   { date: "2024-06-13", enrollments: 28 },
//   { date: "2024-06-14", enrollments: 44 },
//   { date: "2024-06-15", enrollments: 9 },
// ];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data]
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days:{" "}
            <span className="font-semibold">{totalEnrollmentsNumber}</span>
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 days:{" "}
            <span className="font-semibold">{totalEnrollmentsNumber}</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar
              radius={[8, 8, 0, 0]}
              dataKey={"enrollments"}
              fill="var(--color-enrollments)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
