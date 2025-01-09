import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, value, defaultValue, ...props }, ref) => {
    // Check if both `value` and `defaultValue` are provided
    if (value !== undefined && defaultValue !== undefined) {
      console.warn(
        "Input component cannot have both `value` and `defaultValue` props. Choose one."
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={value} // Controlled input
        defaultValue={value === undefined ? defaultValue : undefined} // Uncontrolled input
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
