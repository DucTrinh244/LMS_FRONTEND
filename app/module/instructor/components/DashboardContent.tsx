import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  BookMarked,
  BookOpen,
  Calendar,
  Check,
  GraduationCap,
  Loader2,
  Users,
  Wallet
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { instructorDashboardService } from '~/module/instructor/services/DashboardApi';
import type { DashboardSummaryDto } from '~/module/instructor/types/dashboard';
import { useToast } from '~/shared/hooks/useToast';

// Helper function to format currency
const formatCurrency = (amount: number, currency: string = 'VND'): string => {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};

// Placeholder components for each menu item
const DashboardContent = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // Fetch dashboard summary
  const {
    data: summary,
    isLoading,
    error,
    refetch
  } = useQuery<DashboardSummaryDto>({
    queryKey: ['instructor-dashboard-summary'],
    queryFn: () => instructorDashboardService.getSummary(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    onError: (error: any) => {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể tải dữ liệu dashboard',
        variant: 'destructive'
      });
    }
  });

  // Get earnings by year for chart - try to use from summary first, otherwise fetch separately
  const {
    data: earningsByYearData,
    isLoading: isLoadingEarnings
  } = useQuery({
    queryKey: ['instructor-dashboard-earnings', selectedYear],
    queryFn: () => instructorDashboardService.getEarningsByYear(selectedYear),
    enabled: !!summary && (!summary.earningsByYear || !summary.earningsByYear.find(e => e.year === selectedYear)),
    staleTime: 2 * 60 * 1000,
    retry: 2
  });

  // Use earnings from summary if available, otherwise use fetched data
  const earningsByYear = useMemo(() => {
    if (summary?.earningsByYear) {
      const yearData = summary.earningsByYear.find(e => e.year === selectedYear);
      if (yearData) return yearData;
    }
    return earningsByYearData || null;
  }, [summary, earningsByYearData, selectedYear]);

  // Transform stats for cards
  const statsCards = useMemo(() => {
    if (!summary) return [];

    return [
      {
        icon: <GraduationCap className="w-5 h-5 text-violet-600" />,
        title: 'Total Enrollments',
        value: summary.totalEnrollments.toString(),
        bgColor: 'from-violet-600 to-purple-600',
        iconBg: 'bg-violet-600/20'
      },
      {
        icon: <BookMarked className="w-5 h-5 text-violet-600" />,
        title: 'Active Courses',
        value: summary.activeCourses.toString(),
        bgColor: 'from-violet-600 to-purple-600',
        iconBg: 'bg-violet-600/20'
      },
      {
        icon: <Check className="w-5 h-5 text-violet-600" />,
        title: 'Completed Courses',
        value: summary.completedCourses.toString(),
        bgColor: 'from-violet-600 to-purple-600',
        iconBg: 'bg-violet-600/20'
      },
      {
        icon: <Users className="w-5 h-5 text-violet-600" />,
        title: 'Total Students',
        value: summary.totalStudents.toString(),
        bgColor: 'from-violet-600 to-purple-600',
        iconBg: 'bg-violet-600/20'
      },
      {
        icon: <BookOpen className="w-5 h-5 text-violet-600" />,
        title: 'Total Courses',
        value: summary.totalCourses.toString(),
        bgColor: 'from-violet-600 to-purple-600',
        iconBg: 'bg-violet-600/20'
      },
      {
        icon: <Wallet className="w-5 h-5 text-violet-600" />,
        title: 'Total Earnings',
        value: formatCurrency(summary.totalEarnings),
        bgColor: 'from-violet-600 to-purple-600',
        iconBg: 'bg-violet-600/20'
      }
    ];
  }, [summary]);

  // Transform monthly data for chart
  const chartData = useMemo(() => {
    if (!earningsByYear?.monthlyBreakdown) return [];

    return earningsByYear.monthlyBreakdown.map((month) => ({
      month: month.monthName.substring(0, 3), // Short month name (Jan, Feb, etc.)
      earnings: month.earnings,
      enrollments: month.enrollments
    }));
  }, [earningsByYear]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          <p className="text-slate-400">Đang tải dữ liệu dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <div>
            <p className="text-red-400 font-semibold mb-2">Không thể tải dữ liệu dashboard</p>
            <p className="text-slate-400 text-sm mb-4">
              {(error as any)?.message || 'Đã xảy ra lỗi không xác định'}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!summary) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5 hover:shadow-xl hover:shadow-violet-500/50 transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-slate-300 text-xs mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Earnings by Year */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Earnings by Year</h2>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value) || new Date().getFullYear())}
              min="2020"
              max={new Date().getFullYear()}
              className="px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-xs w-24"
            />
          </div>
        </div>
        {isLoadingEarnings ? (
          <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value.toString();
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Bar
                  dataKey="earnings"
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Không có dữ liệu earnings cho năm {selectedYear}</p>
          </div>
        )}
      </div>

      {/* Recently Created Courses */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recently Created Courses</h2>
        {summary.recentCourses && summary.recentCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-300">Courses</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-300">Enrolled</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentCourses.map((course) => (
                  <tr key={course.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {course.thumbnailUrl ? (
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                        <span className="font-medium text-white">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-300">{course.enrolledCount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-violet-600/20 text-violet-400 px-2 py-1 rounded-full text-xs font-semibold">
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-400">Chưa có khóa học nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;

