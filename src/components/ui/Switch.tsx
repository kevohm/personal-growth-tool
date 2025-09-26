import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Label } from "./Label";

export const Switch: React.FC<
  { id: string; label: string } & SwitchPrimitive.SwitchProps
> = ({ id, label, ...props }) => (
  <div className="flex items-center gap-2 ">
    <SwitchPrimitive.Root
      id={id}
      className="relative h-6 w-11 rounded-full bg-gray-300 data-[state=checked]:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      {...props}
    >
      <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
    <Label htmlFor={id}>{label}</Label>
  </div>
);
