import type {
    AdminRevenueSummaryDto,
    AdminRevenueTrendsDto,
    GetTopCoursesParams,
    GetTransactionsParams,
    GetTrendsParams,
    PagedTransactionResponse,
    RevenueByCategoryDto,
    TimeRange,
    TopCourseRevenueDto
} from "~/module/admin/types/Revenue";
import httpClient from "~/services/httpClient";
import type { BaseResponse } from "~/shared/types/BaseResponse";

export const adminRevenueService = {
    /**
     * GET /api/Revenue/admin/summary
     * Lấy tổng thống kê doanh thu tổng quan
     */
    getSummary: async (timeRange?: TimeRange): Promise<BaseResponse<AdminRevenueSummaryDto>> => {
        try {
            const params = new URLSearchParams();
            if (timeRange) {
                params.append("timeRange", timeRange);
            }

            const response = await httpClient.get<BaseResponse<AdminRevenueSummaryDto>>(
                `/Revenue/admin/summary?${params.toString()}`
            );
            return response.data;
        } catch (error: any) {
            console.error("Error fetching revenue summary:", error);
            const apiError = error.response?.data;
            throw new Error(
                apiError?.error?.message || apiError?.message || error.message || "Failed to fetch revenue summary"
            );
        }
    },

    /**
     * GET /api/Revenue/admin/by-category
     * Lấy doanh thu theo danh mục khóa học
     */
    getByCategory: async (timeRange?: TimeRange): Promise<BaseResponse<RevenueByCategoryDto[]>> => {
        try {
            const params = new URLSearchParams();
            if (timeRange) {
                params.append("timeRange", timeRange);
            }

            const response = await httpClient.get<BaseResponse<RevenueByCategoryDto[]>>(
                `/Revenue/admin/by-category?${params.toString()}`
            );
            return response.data;
        } catch (error: any) {
            console.error("Error fetching revenue by category:", error);
            const apiError = error.response?.data;
            throw new Error(
                apiError?.error?.message || apiError?.message || error.message || "Failed to fetch revenue by category"
            );
        }
    },

    /**
     * GET /api/Revenue/admin/transactions
     * Lấy danh sách giao dịch với pagination và filter
     */
    getTransactions: async (
        params: GetTransactionsParams = {}
    ): Promise<BaseResponse<PagedTransactionResponse>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append("page", params.page.toString());
            if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString());
            if (params.status && params.status !== "all") queryParams.append("status", params.status);
            if (params.startDate) queryParams.append("startDate", params.startDate);
            if (params.endDate) queryParams.append("endDate", params.endDate);
            if (params.courseId) queryParams.append("courseId", params.courseId);
            if (params.categoryId) queryParams.append("categoryId", params.categoryId);
            if (params.search) queryParams.append("search", params.search);

            const response = await httpClient.get<BaseResponse<PagedTransactionResponse>>(
                `/Revenue/admin/transactions?${queryParams.toString()}`
            );
            return response.data;
        } catch (error: any) {
            console.error("Error fetching transactions:", error);
            const apiError = error.response?.data;
            throw new Error(
                apiError?.error?.message || apiError?.message || error.message || "Failed to fetch transactions"
            );
        }
    },

    /**
     * GET /api/Revenue/admin/trends
     * Lấy dữ liệu xu hướng doanh thu theo thời gian
     */
    getTrends: async (params: GetTrendsParams = {}): Promise<BaseResponse<AdminRevenueTrendsDto>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params.timeRange) queryParams.append("timeRange", params.timeRange);
            if (params.startDate) queryParams.append("startDate", params.startDate);
            if (params.endDate) queryParams.append("endDate", params.endDate);

            const response = await httpClient.get<BaseResponse<AdminRevenueTrendsDto>>(
                `/Revenue/admin/trends?${queryParams.toString()}`
            );
            return response.data;
        } catch (error: any) {
            console.error("Error fetching revenue trends:", error);
            const apiError = error.response?.data;
            throw new Error(
                apiError?.error?.message || apiError?.message || error.message || "Failed to fetch revenue trends"
            );
        }
    },

    /**
     * GET /api/Revenue/admin/top-courses
     * Lấy danh sách top khóa học có doanh thu cao nhất
     */
    getTopCourses: async (
        params: GetTopCoursesParams = {}
    ): Promise<BaseResponse<TopCourseRevenueDto[]>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params.limit) queryParams.append("limit", params.limit.toString());
            if (params.timeRange) queryParams.append("timeRange", params.timeRange);

            const response = await httpClient.get<BaseResponse<TopCourseRevenueDto[]>>(
                `/Revenue/admin/top-courses?${queryParams.toString()}`
            );
            return response.data;
        } catch (error: any) {
            console.error("Error fetching top courses:", error);
            const apiError = error.response?.data;
            throw new Error(
                apiError?.error?.message || apiError?.message || error.message || "Failed to fetch top courses"
            );
        }
    },
};

