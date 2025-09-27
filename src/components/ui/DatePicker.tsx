"use client";

import * as Popover from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DayPicker, type DropdownProps } from "react-day-picker";
import { Select } from "./Select";

export function CustomSelectDropdown(props: DropdownProps) {
  const { options, value, onChange, name, ...rest } = props;

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue, name },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <Select
      value={value?.toString() ?? ""} // ✅ always a string
      onValueChange={handleValueChange}
      options={(options ?? []).map((opt) => ({
        value: opt.value.toString(), // ensure string
        label: opt.label,
      }))} // ✅ always a string[] array
      placeholder="Select..."
      className="min-w-[6rem]"
      {...rest}
    />
  );
}

export const DatePicker: React.FC<{
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Pick a date" }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {value ? (
            value.toLocaleDateString()
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <CalendarIcon className="h-4 w-4 text-gray-500" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="z-50 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(day) => {
              onChange(day ?? undefined);
              setOpen(false);
            }}
            endMonth={new Date(2025, 11)}
            captionLayout="dropdown"
            classNames={{
              root: "rdp-root text-sm text-gray-700  ",
              month_caption:
                "flex items-center justify-between gap-2 mb-2 text-sm font-medium text-gray-900",
              caption_dropdowns: "flex items-center gap-2", // space between dropdowns
              // dropdown:
              //   "rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500",
              // nav: "flex items-center gap-1", // fix nav button overlap
              nav_button:
                "inline-flex items-center justify-center bg-red-500 hover:bg-gray-100 w-max gap-6 transition w-7 h-7 text-sm",
              head_row: "text-xs text-gray-500 font-medium",
              day_button:
                "transition hover:bg-green-100 p-2 px-3 rounded-xl focus:outline-none ",
              selected:
                "bg-green-500/20 text-green-700 font-medium rounded-xl hover:bg-green-500/25",
              today: "font-semibold text-green-600 ",
            }}
            components={{
              Dropdown: CustomSelectDropdown,
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
