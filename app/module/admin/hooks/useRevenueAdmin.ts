import { useQuery } from "@tanstack/react-query";
import { adminRevenueService } from "~/module/admin/services/RevenueApi";
import type {
  AdminRevenueSummaryDto,
  AdminRevenueTrendsDto,
  AdminTransactionDto,
  GetTopCoursesParams,
  GetTransactionsParams,
  GetTrendsParams,
  PagedTransactionResponse,
  RevenueByCategoryDto,
  TimeRange,
  TopCourseRevenueDto,
} from "~/module/admin/types/Revenue";
import { useToast } from "~/shared/hooks/useToast";

const REVENUE_SUMMARY_QUERY_KEY = "admin-revenue-summary";
const REVENUE_BY_CATEGORY_QUERY_KEY = "admin-revenue-by-category";
const REVENUE_TRANSACTIONS_QUERY_KEY = "admin-revenue-transactions";
const REVENUE_TRENDS_QUERY_KEY = "admin-revenue-trends";
const REVENUE_TOP_COURSES_QUERY_KEY = "admin-revenue-top-courses";

export function useRevenueSummary(timeRange?: TimeRange) {
  const { toast } = useToast();

  const {
    data: summary,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<AdminRevenueSummaryDto>({
    queryKey: [REVENUE_SUMMARY_QUERY_KEY, timeRange],
    queryFn: async () => {
      const res = await adminRevenueService.getSummary(timeRange);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch revenue summary");
    },
    retry: 1,
  });

  return {
    summary,
    loading,
    error: error?.message || null,
    refetch,
  };
}

export function useRevenueByCategory(timeRange?: TimeRange) {
  const { toast } = useToast();

  const {
    data: categories = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<RevenueByCategoryDto[]>({
    queryKey: [REVENUE_BY_CATEGORY_QUERY_KEY, timeRange],
    queryFn: async () => {
      const res = await adminRevenueService.getByCategory(timeRange);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch revenue by category");
    },
    retry: 1,
  });

  return {
    categories,
    loading,
    error: error?.message || null,
    refetch,
  };
}

export function useRevenueTransactions(params: GetTransactionsParams = {}) {
  const { toast } = useToast();

  const {
    data: transactionsData,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<PagedTransactionResponse>({
    queryKey: [REVENUE_TRANSACTIONS_QUERY_KEY, params],
    queryFn: async () => {
      const res = await adminRevenueService.getTransactions(params);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch transactions");
    },
    retry: 1,
    placeholderData: (previousData) => previousData,
  });

  return {
    transactions: transactionsData?.items || [],
    totalCount: transactionsData?.totalCount || 0,
    totalPages: transactionsData?.totalPages || 0,
    page: transactionsData?.page || 1,
    pageSize: transactionsData?.pageSize || 10,
    loading,
    error: error?.message || null,
    refetch,
  };
}

export function useRevenueTrends(params: GetTrendsParams = {}) {
  const { toast } = useToast();

  const {
    data: trends,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<AdminRevenueTrendsDto>({
    queryKey: [REVENUE_TRENDS_QUERY_KEY, params],
    queryFn: async () => {
      const res = await adminRevenueService.getTrends(params);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch revenue trends");
    },
    retry: 1,
  });

  return {
    trends,
    loading,
    error: error?.message || null,
    refetch,
  };
}

export function useTopCourses(params: GetTopCoursesParams = {}) {
  const { toast } = useToast();

  const {
    data: topCourses = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<TopCourseRevenueDto[]>({
    queryKey: [REVENUE_TOP_COURSES_QUERY_KEY, params],
    queryFn: async () => {
      const res = await adminRevenueService.getTopCourses(params);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch top courses");
    },
    retry: 1,
  });

  return {
    topCourses,
    loading,
    error: error?.message || null,
    refetch,
  };
}

