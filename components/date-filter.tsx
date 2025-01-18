"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formatDateRange } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "./ui/popover";
import { format, addMonths, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const now = new Date();
  const defaultFrom = new Date(now.getFullYear(), now.getMonth(), 1); // Primeiro dia do mês atual
  const defaultTo = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Último dia do mês atual

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    console.log(dateRange);
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId: accountId === "all" ? "" : accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  const handlePreviousMonth = () => {
    if (date) {
      const newFrom = subMonths(date.from || defaultFrom, 1);
      const newTo = subMonths(date.to || defaultTo, 1);
      setDate({ from: newFrom, to: newTo });
    }
  };

  const handleNextMonth = () => {
    if (date) {
      const newFrom = addMonths(date.from || defaultFrom, 1);
      const newTo = addMonths(date.to || defaultTo, 1);
      setDate({ from: newFrom, to: newTo });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          {formatDateRange(paramState)}
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex flex-col gap-y-2">
          {/* Botões para Navegação de Mês */}
          <div className="flex justify-between">
            <Button onClick={handlePreviousMonth} variant="outline" size="sm">
              Previous Month
            </Button>
            <Button onClick={handleNextMonth} variant="outline" size="sm">
              Next Month
            </Button>
          </div>

          {/* Botões Reset e Apply */}
          <div className="flex items-center gap-x-2">
            <PopoverClose asChild>
              <Button
                onClick={onReset}
                disabled={!date?.from || !date?.to}
                className="w-full"
                variant="outline"
              >
                Reset
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                onClick={() => pushToUrl(date)}
                disabled={!date?.from || !date?.to}
                className="w-full"
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
