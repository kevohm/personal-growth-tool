import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { Label } from "./Label";

export const RadioGroupField: React.FC<{
  options: { value: string; label: string }[];
  name: string;
  value: string;
  onValueChange: (val: string) => void;
}> = ({ options, name, value, onValueChange }) => (
  <RadioGroup.Root
    value={value}
    onValueChange={onValueChange}
    className="flex flex-col gap-2"
    name={name}
  >
    {options.map((opt) => (
      <div key={opt.value} className="flex items-center gap-2">
        <RadioGroup.Item
          value={opt.value}
          id={`${name}-${opt.value}`}
          className="h-4 w-4 rounded-full border border-gray-300 bg-white data-[state=checked]:bg-green-600 focus:ring-2 focus:ring-green-500"
        >
          <RadioGroup.Indicator>
            <CircleIcon className="h-3 w-3 text-white" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
        <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
      </div>
    ))}
  </RadioGroup.Root>
);
