import { useQuery } from "@tanstack/react-query";
import type { Range } from "../../utils/analytics";
import {
    fetchAnalytics,
    fetchEarningSummary,
    fetchExpenseSummary,
    fetchSavingSummary,
} from "./api";

export const useAnalytics = (range: Range) =>
    useQuery({
        queryKey: ["analytics", range],
        queryFn: () => fetchAnalytics(range),
    });

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
