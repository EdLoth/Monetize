/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";

import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null; // Verifica se `payload` é válido

  const { date, amount } = payload[0]?.payload || {}; // Evita acessar propriedades de um objeto inválido

  if (!date || amount === undefined) return null; // Garante que as propriedades necessárias existem

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(new Date(date), "MMM yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center gap-x-2">
          <div className="flex items-center justify-between gap-x-4">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Amount</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
    </div>
  );
};
