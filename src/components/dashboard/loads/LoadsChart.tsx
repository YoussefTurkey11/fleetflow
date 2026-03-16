"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "../../ui/skeleton";

type Props = {
  loads: number;
  available: number;
  unavailable: number;
  loading?: boolean;
};

export default function LoadsChart({
  loads,
  available,
  unavailable,
  loading,
}: Props) {
  const chartData = [
    { status: "Total", loads, fill: "var(--color-total)" },
    { status: "Available", loads: available, fill: "var(--color-available)" },
    {
      status: "Unavailable",
      loads: unavailable,
      fill: "var(--color-unavailable)",
    },
  ];

  const chartConfig = {
    loads: {
      label: "Loads",
    },
    total: {
      label: "Total",
      color: "var(--chart-1)",
    },
    available: {
      label: "Available",
      color: "var(--chart-2)",
    },
    unavailable: {
      label: "Unavailable",
      color: "var(--chart-3)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loads Analytics</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className="h-55 w-full rounded-lg" />
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />

              <XAxis dataKey="status" tickLine={false} axisLine={false} />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="loads" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
