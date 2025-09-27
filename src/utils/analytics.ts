import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

// Supported ranges
export type Range =
  | "7d"
  | "30d"
  | "3m"
  | "6m"
  | "1y"
  | "ytd"
  | "all";

// 🔹 Step unit per range
export function getStepUnit(range: Range): "day" | "month" | "year" {
  switch (range) {
    case "7d":
    case "30d":
      return "day";
    case "3m":
    case "6m":
    case "1y":
    case "ytd":
      return "month";
    case "all":
    default:
      return "year";
  }
}

// 🔹 Start & end date per range
export function getDateRange(range: Range): { start: dayjs.Dayjs; end: dayjs.Dayjs } {
  const now = dayjs();
  let start;

  switch (range) {
    case "7d":
      start = now.subtract(6, "day").startOf("day"); // include today
      break;
    case "30d":
      start = now.subtract(29, "day").startOf("day");
      break;
    case "3m":
      start = now.subtract(3, "month").startOf("month");
      break;
    case "6m":
      start = now.subtract(6, "month").startOf("month");
      break;
    case "1y":
      start = now.subtract(1, "year").startOf("month");
      break;
    case "ytd":
      start = now.startOf("year");
      break;
    case "all":
    default:
      start = dayjs("1970-01-01");
      break;
  }

  return { start, end: now };
}

// 🔹 Label format per range
export function getDateFormat(range: Range): string {
  switch (range) {
    case "7d":
      return "ddd"; // Mon, Tue, ...
    case "30d":
      return "MMM D"; // Sep 1, Sep 2
    case "3m":
    case "6m":
      return "MMM"; // Jan, Feb, ...
    case "1y":
    case "ytd":
      return "MMM YYYY"; // Jan 2025
    case "all":
    default:
      return "YYYY"; // 2023, 2024
  }
}


// 🔹 User-friendly dropdown options
export const RANGE_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "3m", label: "Last 3 months" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last 12 months" },
  { value: "ytd", label: "Year to date" },
  { value: "all", label: "All time" },
] as const;
