import { useQuery } from "@tanstack/react-query";
import {
  fetchExpenseSummary,
  fetchSavingSummary,
  fetchEarningSummary,
} from "./api";
import type { Range } from "../../utils/analytics";

export const useExpenseSummary = (range: Range) =>
  useQuery({
    queryKey: ["expense-summary", range],
    queryFn: () => fetchExpenseSummary(range),
  });

export const useSavingSummary = (range: Range) =>
  useQuery({
    queryKey: ["saving-summary", range],
    queryFn: () => fetchSavingSummary(range),
  });

export const useEarningSummary = (range: Range) =>
  useQuery({
    queryKey: ["earning-summary", range],
    queryFn: () => fetchEarningSummary(range),
  });
