import React from "react";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm 
      focus:outline-none focus:ring-2 focus:ring-green-500 ${className ?? ""}`}
  />
));
Textarea.displayName = "Textarea";
