import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  {
    name: "Sun",
    value: 10
  },
  {
    name: "Mon",
    value: 30
  },
  {
    name: "Tue",
    value: 100
  },
  {
    name: "Wed",
    value: 30
  },
  {
    name: "Thu",
    value: 23
  },
  {
    name: "Fri",
    value: 34
  },
  {
    name: "Sat",
    value: 11
  }
];

const SimpleLineChart = () => {
  return (
    <div className="flex caption2 flex-col ui-chart">
      <LineChart width={650} height={300} data={data}>
        <CartesianGrid vertical={false} opacity="0.2" />
        <XAxis
          tick={{ fill: "black" }}
          axisLine={false}
          tickLine={false}
          dataKey="name"
        />
        <YAxis
          tickCount={7}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "black" }}
          type="number"
          domain={[0, 100]}
        />
        <Tooltip
          viewBox={{ x: 0, y: 0, width: 20, height: 20 }}
          cursor={false}
          wrapperStyle={{ display: "hidden" }}
        />
        <Line
          fill="#40C0C0"
          stroke="#40C0C0"
          dot={true}
          type="monotone"
          dataKey="value"
        />
      </LineChart>
    </div>
  );
};

export default SimpleLineChart;