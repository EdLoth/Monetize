import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  ReferenceLine,
} from "recharts";
import { format, startOfYear, endOfYear, eachMonthOfInterval } from "date-fns";
import { CustomTooltip } from "@/components/custom-reserve-tooltip";

type Props = {
  data?: {
    date: string;
    amount: number;
  }[];
  verticalThreshold?: number;
};

// Função para preencher os meses ausentes
const fillMissingMonths = (data: { date: string; amount: number }[] = []) => {
  const monthsOfYear = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  return monthsOfYear.map((month) => {
    const monthString = format(month, "yyyy-MM");
    const existingData = data.find((item) =>
      item.date.startsWith(monthString)
    );

    return {
      date: format(month, "yyyy-MM"),
      amount: existingData ? existingData.amount : null,
    };
  });
};

export const BarVariant = ({ data, verticalThreshold }: Props) => {
  const processedData = fillMissingMonths(data || []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={processedData}>
        <XAxis
          dataKey="date"
          axisLine={false} // Remove a linha do eixo X
          tickLine={false} // Remove as linhas dos ticks do eixo X
          tickFormatter={(date) => format(new Date(date), "MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <YAxis
          axisLine={false} // Remove a linha do eixo Y
          tickLine={false} // Remove as linhas dos ticks do eixo Y
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="amount"
          fill="#3b82f6"
          className="drop-shadow-sm"
          isAnimationActive={true}
        />
        {verticalThreshold !== undefined && (
          <ReferenceLine
            y={verticalThreshold}
            stroke="red"
            strokeDasharray="3 3"
            label={{
              value: `Threshold: $${verticalThreshold}`,
              position: "insideTopRight",
              fill: "red",
              fontSize: "14px",
            }}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};
