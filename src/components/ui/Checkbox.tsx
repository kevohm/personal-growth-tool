import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { Label } from "./Label";

export const Checkbox: React.FC<
  { id: string; label: string } & CheckboxPrimitive.CheckboxProps
> = ({ id, label, ...props }) => (
  <div className="flex items-center gap-2">
    <CheckboxPrimitive.Root
      id={id}
      className="h-4 w-4 rounded border border-gray-300 bg-white data-[state=checked]:bg-green-600 focus:ring-2 focus:ring-green-500"
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <CheckIcon className="h-3 w-3 text-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <Label htmlFor={id}>
      {label}
    </Label>
  </div>
);
