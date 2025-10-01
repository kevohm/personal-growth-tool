import { Label } from "./Label";

export const FormFieldWrapper: React.FC<
  React.PropsWithChildren<{ label?: string; htmlFor?: string }>
> = ({ label, htmlFor, children }) => (
  <div className="space-y-1 ">
    {label && <Label htmlFor={htmlFor}>{label}</Label>}
    {children}
  </div>
);
