"use client";

import { GraphData } from "@/actions";
import { FC } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

interface OverviewProps<T> {
  data: T[];
}

export const Overview: FC<OverviewProps<GraphData>> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
