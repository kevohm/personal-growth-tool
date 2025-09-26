import React from "react";

/* ---------- Input ---------- */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm 
      focus:outline-none focus:ring-2 focus:ring-green-500 ${className ?? ""}`}
  />
));
Input.displayName = "Input";
