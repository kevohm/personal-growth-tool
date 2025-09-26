import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";

export const Select: React.FC<{
  value: string;
  onValueChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}> = ({ value, onValueChange, options, placeholder }) => (
  <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
    <SelectPrimitive.Trigger
      className="flex w-full items-center justify-between gap-2 rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      aria-label="Select option"
    >
      <SelectPrimitive.Value placeholder={placeholder ?? "Select..."} />
      <SelectPrimitive.Icon>
        <ChevronDownIcon className="w-4 h-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>

    <SelectPrimitive.Portal  >
      <SelectPrimitive.Content style={{zIndex:1000}}  className="rounded-lg border border-gray-200 bg-white shadow-lg">
        <SelectPrimitive.Viewport className="p-1">
          {options.map((opt) => (
            <SelectPrimitive.Item
              key={opt.value}
              value={opt.value}
              className="cursor-pointer rounded px-3 py-2 text-sm outline-none hover:bg-green-50 focus:bg-green-100"
            >
              <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);
