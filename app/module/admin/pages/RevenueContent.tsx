import { BarChart3, Calendar, DollarSign, Download, Filter, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useRevenueByCategory,
  useRevenueSummary,
  useRevenueTransactions,
  useRevenueTrends,
} from "~/module/admin/hooks/useRevenueAdmin";
import type { TimeRange, TransactionStatus } from "~/module/admin/types/Revenue";
import { formatCurrency, formatDate, getStatusColor } from "~/module/admin/types/Revenue";

const RevenueContent: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setTransactionPage(1); // Reset to first page when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters change
  useEffect(() => {
    setTransactionPage(1);
  }, [transactionStatus]);

  // Fetch data from API
  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useRevenueSummary(timeRange);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useRevenueByCategory(timeRange);

  const {
    transactions,
    totalCount: transactionTotalCount,
    totalPages: transactionTotalPages,
    loading: transactionsLoading,
    error: transactionsError,
  } = useRevenueTransactions({
    page: transactionPage,
    pageSize: 10,
    status: transactionStatus === "all" ? undefined : transactionStatus,
    search: debouncedSearchTerm || undefined,
  });

  const {
    trends,
    loading: trendsLoading,
    error: trendsError,
  } = useRevenueTrends({
    timeRange,
  });

  // Map categories to display format with colors
  const categoryColors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-green-500", "bg-indigo-500"];
  const revenueByCategory = useMemo(() => {
    return categories.map((cat, index) => ({
      category: cat.categoryName,
      amount: cat.totalRevenue,
      percentage: cat.percentage,
      color: categoryColors[index % categoryColors.length],
    }));
  }, [categories]);

  // Loading state
  if (summaryLoading && !summary) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-slate-400">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (summaryError && !summary) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-red-400">Lỗi: {summaryError}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Revenue Management</h2>
          <p className="text-slate-400">View revenue statistics and reports</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            {summary?.trend === "up" ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
          <div className="text-sm opacity-90 mb-1">Total Revenue</div>
          <div className="text-3xl font-bold">
            {summary ? formatCurrency(summary.totalRevenue).replace(".00", "") : "$0"}
          </div>
          <div className="text-sm mt-2 opacity-80">
            {summary && summary.changePercentage > 0 ? "+" : ""}
            {summary?.changePercentage.toFixed(1) || 0}% from last period
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center border border-violet-600/30">
              <Calendar className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {summary ? formatCurrency(summary.monthlyRevenue).replace(".00", "") : "$0"}
              </div>
              <div className="text-sm font-medium text-slate-400">Monthly Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center border border-green-600/30">
              <TrendingUp className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {summary ? formatCurrency(summary.weeklyRevenue).replace(".00", "") : "$0"}
              </div>
              <div className="text-sm font-medium text-slate-400">Weekly Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center border border-orange-600/30">
              <DollarSign className="w-7 h-7 text-orange-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {summary ? formatCurrency(summary.dailyRevenue).replace(".00", "") : "$0"}
              </div>
              <div className="text-sm font-medium text-slate-400">Daily Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
              <p className="text-sm text-slate-400">Revenue trends over time</p>
            </div>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition">
              <Filter className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          {trendsLoading ? (
            <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
              <div className="text-slate-400">Đang tải dữ liệu...</div>
            </div>
          ) : trendsError ? (
            <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
              <div className="text-red-400">Lỗi: {trendsError}</div>
            </div>
          ) : (
            <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
              <BarChart3 className="w-16 h-16 text-violet-400/50" />
              {/* TODO: Integrate charting library (Recharts) to display trends.dataPoints */}
            </div>
          )}
        </div>

        {/* Revenue by Category */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Revenue by Category</h3>
              <p className="text-sm text-slate-400">Breakdown by course category</p>
            </div>
          </div>
          {categoriesLoading ? (
            <div className="space-y-4">
              <div className="text-slate-400 text-center py-8">Đang tải dữ liệu...</div>
            </div>
          ) : categoriesError ? (
            <div className="space-y-4">
              <div className="text-red-400 text-center py-8">Lỗi: {categoriesError}</div>
            </div>
          ) : revenueByCategory.length > 0 ? (
            <div className="space-y-4">
              {revenueByCategory.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300">{item.category}</span>
                    <span className="text-sm font-bold text-white">
                      {formatCurrency(item.amount).replace(".00", "")}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{item.percentage.toFixed(1)}% of total</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 text-center py-8">Không có dữ liệu</div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
            <p className="text-sm text-slate-400">Latest payment transactions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-slate-400"
            />
          </div>
          <select
            value={transactionStatus}
            onChange={(e) => setTransactionStatus(e.target.value as TransactionStatus | "all")}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        {transactionsLoading ? (
          <div className="text-center py-12">
            <div className="text-slate-400">Đang tải dữ liệu...</div>
          </div>
        ) : transactionsError ? (
          <div className="text-center py-12">
            <div className="text-red-400">Lỗi: {transactionsError}</div>
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Transaction ID</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Student</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Course</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Method</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.transactionId}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-slate-400">{transaction.transactionId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {transaction.studentAvatarUrl && (
                            <img
                              src={transaction.studentAvatarUrl}
                              alt={transaction.studentName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-white">{transaction.studentName}</div>
                            <div className="text-xs text-slate-400">{transaction.studentEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-slate-300">{transaction.courseTitle}</div>
                        <div className="text-xs text-slate-400">{transaction.categoryName}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-white">
                          {formatCurrency(transaction.amount, transaction.currency).replace(".00", "")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400">
                        {formatDate(transaction.paidAt || transaction.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400">{transaction.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {transactionTotalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  Hiển thị {(transactionPage - 1) * 10 + 1} - {Math.min(transactionPage * 10, transactionTotalCount)} trong tổng số {transactionTotalCount} giao dịch
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTransactionPage((prev) => Math.max(1, prev - 1))}
                    disabled={transactionPage === 1 || transactionsLoading}
                    className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, transactionTotalPages) }, (_, i) => {
                      let pageNum: number;
                      if (transactionTotalPages <= 5) {
                        pageNum = i + 1;
                      } else if (transactionPage <= 3) {
                        pageNum = i + 1;
                      } else if (transactionPage >= transactionTotalPages - 2) {
                        pageNum = transactionTotalPages - 4 + i;
                      } else {
                        pageNum = transactionPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setTransactionPage(pageNum)}
                          disabled={transactionsLoading}
                          className={`px-3 py-2 rounded-lg transition ${transactionPage === pageNum
                              ? "bg-violet-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            } disabled:opacity-50`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setTransactionPage((prev) => Math.min(transactionTotalPages, prev + 1))}
                    disabled={transactionPage === transactionTotalPages || transactionsLoading}
                    className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400">Không tìm thấy giao dịch nào</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueContent;
