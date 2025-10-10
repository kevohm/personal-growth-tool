import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Range } from "../../utils/analytics";
import {
    fetchAnalytics,
    fetchEarningSummary,
    fetchExpenseSummary,
    fetchSavingSummary,
} from "./api";
import type { TotalAnalyticType, TotalsResult } from "../../types/types";

export const useAnalytics = (range: Range,  params?:{userId?:string}, options?: Omit<UseQueryOptions<TotalAnalyticType[], Error >, "queryKey" | "queryFn">) =>
    useQuery({
        queryKey: ["analytics", range],
        queryFn: () => fetchAnalytics(range, params),
        ...options
    });

export const useExpenseSummary = (range: Range,  params?:{userId?:string}, options?: Omit<UseQueryOptions<TotalsResult, Error >, "queryKey" | "queryFn">) =>
    useQuery({
        queryKey: ["expense-summary", range],
        queryFn: () => fetchExpenseSummary(range, params),
        ...options
    });
    
    export const useSavingSummary = (range: Range,  params?:{userId?:string}, options?: Omit<UseQueryOptions<TotalsResult, Error >, "queryKey" | "queryFn">) =>
        useQuery({
            queryKey: ["saving-summary", range],
            queryFn: () => fetchSavingSummary(range, params),
            ...options
    });

export const useEarningSummary = (range: Range,  params?:{userId?:string}, options?: Omit<UseQueryOptions<TotalsResult, Error >, "queryKey" | "queryFn">) =>
    useQuery({
        queryKey: ["earning-summary", range],
        queryFn: () => fetchEarningSummary(range, params),
        ...options
    });
