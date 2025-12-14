
// Time Range Type
export type TimeRange = "day" | "week" | "month" | "year" | "all";

// Transaction Status
export type TransactionStatus = "Completed" | "Pending" | "Failed" | "Canceled";

// Revenue Summary DTO
export interface AdminRevenueSummaryDto {
    totalRevenue: number;
    monthlyRevenue: number;
    weeklyRevenue: number;
    dailyRevenue: number;
    changePercentage: number;
    trend: "up" | "down";
    totalTransactions: number;
    completedTransactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    averageTransactionAmount: number;
    totalStudents: number;
    totalCourses: number;
    activeCourses: number;
}

// Revenue by Category DTO
export interface RevenueByCategoryDto {
    categoryId: string;
    categoryName: string;
    totalRevenue: number;
    percentage: number;
    totalCourses: number;
    totalEnrollments: number;
    averageRevenuePerCourse: number;
}

// Admin Transaction DTO
export interface AdminTransactionDto {
    transactionId: string;
    paymentId: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    studentAvatarUrl: string | null;
    courseId: string;
    courseTitle: string;
    courseThumbnailUrl: string | null;
    categoryName: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    statusCode: number; // 1=Pending, 2=Completed, 3=Failed, 4=Canceled
    paymentMethod: string;
    provider: string;
    transactionNo: string | null;
    txnRef: string;
    paidAt: string | null;
    createdAt: string;
}

// Paginated Transaction Response
export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface PagedTransactionResponse extends PagedResult<AdminTransactionDto> { }

// Revenue Trend Data Point DTO
export interface RevenueTrendDataPointDto {
    date: string; // ISO 8601: YYYY-MM-DD
    revenue: number;
    transactions: number;
    enrollments: number;
}

// Admin Revenue Trends DTO
export interface AdminRevenueTrendsDto {
    timeRange: TimeRange;
    startDate: string;
    endDate: string;
    dataPoints: RevenueTrendDataPointDto[];
    totalRevenue: number;
    totalTransactions: number;
    totalEnrollments: number;
    averageRevenue: number;
    peakRevenue: number;
    peakDate: string;
}

// Top Course Revenue DTO
export interface TopCourseRevenueDto {
    courseId: string;
    courseTitle: string;
    courseThumbnailUrl: string | null;
    instructorName: string;
    categoryName: string;
    totalRevenue: number;
    totalEnrollments: number;
    averageRevenuePerEnrollment: number;
    totalTransactions: number;
    completedTransactions: number;
    lastPaymentDate: string | null;
}

// Get Transactions Params
export interface GetTransactionsParams {
    page?: number;
    pageSize?: number;
    status?: TransactionStatus | "all";
    startDate?: string; // ISO 8601: YYYY-MM-DD
    endDate?: string; // ISO 8601: YYYY-MM-DD
    courseId?: string;
    categoryId?: string;
    search?: string;
}

// Get Trends Params
export interface GetTrendsParams {
    timeRange?: TimeRange;
    startDate?: string; // ISO 8601: YYYY-MM-DD
    endDate?: string; // ISO 8601: YYYY-MM-DD
}

// Get Top Courses Params
export interface GetTopCoursesParams {
    limit?: number;
    timeRange?: TimeRange;
}

// Helper Functions
export function formatCurrency(amount: number, currency: string = "VND"): string {
    if (currency === "VND") {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount);
}

export function getStatusColor(status: TransactionStatus): string {
    switch (status) {
        case "Completed":
            return "bg-green-600/20 text-green-400 border border-green-600/30";
        case "Pending":
            return "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30";
        case "Failed":
            return "bg-red-600/20 text-red-400 border border-red-600/30";
        case "Canceled":
            return "bg-slate-600/20 text-slate-400 border border-slate-600/30";
        default:
            return "bg-slate-600/20 text-slate-400 border border-slate-600/30";
    }
}

export function formatDate(dateString: string | null): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatDateTime(dateString: string | null): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

