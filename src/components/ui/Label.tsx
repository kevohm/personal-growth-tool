import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <LabelPrimitive.Root
      {...props}
      className={`text-sm font-medium ${className}`}
    >
      {children}
    </LabelPrimitive.Root>
  );
};
