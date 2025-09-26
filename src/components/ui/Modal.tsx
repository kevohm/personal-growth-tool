import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

/* ---------- Modal (Radix Dialog) ---------- */
export const Modal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ open, onOpenChange, title, trigger, children, footer }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
      <Dialog.Content
        aria-describedby={undefined}
        className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
          <Dialog.Close asChild>
            <button className="rounded-full p-1 hover:bg-gray-100">
              <Cross2Icon className="h-5 w-5 text-gray-500" />
            </button>
          </Dialog.Close>
        </div>

        {/* Body */}
        <div className="space-y-4">{children}</div>

        {/* Footer */}
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
