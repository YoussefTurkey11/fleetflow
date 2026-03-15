"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";

type Props = {
  loads: {
    id: number;
    total: number;
  }[];
  loading?: boolean;
};

export default function LoadsMoneyChart({ loads, loading }: Props) {
  const chartConfig = {
    total: {
      label: "Total Money",
      color: "var(--chart-2)",
    },
    label: {
      color: "var(--background)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loads Revenue</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className="h-55 w-full rounded-lg" />
        ) : (
          <ChartContainer config={chartConfig} className="-ml-25">
            <BarChart data={loads} layout="vertical" margin={{ right: 50 }}>
              <CartesianGrid horizontal={false} />

              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={120}
              />

              <XAxis dataKey="total" type="number" />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Bar
                dataKey="total"
                layout="vertical"
                fill="var(--color-total)"
                radius={4}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
                  fontSize={12}
                />

                <LabelList
                  dataKey="total"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
