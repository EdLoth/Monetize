import { Suspense } from "react";
import { AccountFilter } from "./account-filter";
import { DateFilter } from "./date-filter";

export const Filters = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <Suspense fallback={<div>Loading Account Filter...</div>}>
        <AccountFilter />
      </Suspense>
      <Suspense fallback={<div>Loading Date Filter...</div>}>
        <DateFilter />
      </Suspense>
    </div>
  );
};
