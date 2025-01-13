"use client"
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { Suspense, useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Monetize - Dashboard Page";
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<div>Loading DataGrid...</div>}>
        <DataGrid />
      </Suspense>
      <Suspense fallback={<div>Loading DataCharts...</div>}>
        <DataCharts />
      </Suspense>
    </div>
  );
}
