import { DollarSign, TrendingUp, TrendingDown, Eye, Loader2, AlertCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { instructorEarningsService } from '~/module/instructor/services/EarningsApi'
import type { EarningsSummaryDto, CourseEarningsDto, EarningsByMonthDto } from '~/module/instructor/types/earnings'
import { formatCurrency, formatNumber } from '~/module/instructor/types/earnings'
import { useToast } from '~/shared/hooks/useToast'

const EarningsContent = () => {
  const { toast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Fetch earnings summary
  const {
    data: summary,
    isLoading,
    error,
    refetch
  } = useQuery<EarningsSummaryDto>({
    queryKey: ['instructor-earnings-summary'],
    queryFn: () => instructorEarningsService.getSummary(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2
  })

  // Transform summary to stats
  const stats = useMemo(() => {
    if (!summary) return []
    
    const thisMonthChange = summary.lastMonthEarnings > 0
      ? ((summary.thisMonthEarnings - summary.lastMonthEarnings) / summary.lastMonthEarnings * 100)
      : 0
    
    return [
      {
        label: 'Total Earnings',
        value: formatCurrency(summary.totalEarnings),
        change: `${formatNumber(summary.totalEnrollments)} enrollments`,
        trend: 'up' as const,
        icon: DollarSign,
        color: 'from-violet-600 to-purple-600',
      },
      {
        label: 'This Month',
        value: formatCurrency(summary.thisMonthEarnings),
        change: thisMonthChange >= 0 
          ? `+${thisMonthChange.toFixed(1)}%` 
          : `${thisMonthChange.toFixed(1)}%`,
        trend: (thisMonthChange >= 0 ? 'up' : 'down') as const,
        icon: TrendingUp,
        color: 'from-emerald-600 to-teal-600',
      },
      {
        label: 'Last Month',
        value: formatCurrency(summary.lastMonthEarnings),
        change: `${formatNumber(summary.lastMonthEnrollments)} enrollments`,
        trend: 'up' as const,
        icon: TrendingDown,
        color: 'from-amber-600 to-orange-600',
      },
      {
        label: 'Total Courses',
        value: summary.totalCourses.toString(),
        change: `${formatNumber(summary.totalEnrollments)} total enrollments`,
        trend: 'up' as const,
        icon: Eye,
        color: 'from-blue-600 to-cyan-600',
      },
    ]
  }, [summary])

  // Transform top courses
  const courseEarnings = useMemo(() => {
    if (!summary?.topCourses) return []
    return summary.topCourses.map((course, index) => ({
      id: course.courseId,
      courseName: course.courseTitle,
      totalRevenue: course.totalEarnings,
      students: course.totalEnrollments,
      avgRevenuePerStudent: course.averageEarningPerEnrollment,
      trend: 'up' as const, // API doesn't provide trend, default to up
      trendPercent: 0, // API doesn't provide trend percent
    }))
  }, [summary])

  // Transform monthly data for chart
  const monthlyData = useMemo(() => {
    if (!summary?.earningsByMonth) return []
    
    return summary.earningsByMonth.slice(0, 12).reverse().map((month) => {
      // Extract month name (e.g., "tháng mười hai 2024" -> "Dec")
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthShort = monthNames[month.month - 1] || `${month.month}`
      
      return {
        month: monthShort,
        earnings: month.totalEarnings,
        fullMonth: month.monthName
      }
    })
  }, [summary])

  const maxEarnings = useMemo(() => {
    if (monthlyData.length === 0) return 1
    return Math.max(...monthlyData.map(d => d.earnings))
  }, [monthlyData])

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Đang tải dữ liệu earnings...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !summary) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-red-700 shadow-md p-6">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Lỗi tải dữ liệu</h3>
              <p className="text-red-400">
                {error instanceof Error ? error.message : 'Không thể tải dữ liệu earnings'}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-4 bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-700 transition"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Earnings Dashboard</h2>
          <p className="text-slate-400 mt-1">Track your revenue and financial performance</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={e => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <p
              className={`text-sm mt-2 ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
        {monthlyData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-400">Chưa có dữ liệu earnings</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`
                  }
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}K`
                  }
                  return value.toString()
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
                labelStyle={{ color: '#cbd5e1', marginBottom: '4px' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar 
                dataKey="earnings" 
                fill="url(#colorGradient)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Course Earnings Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Earnings by Course</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left py-4 px-6 text-slate-300 font-medium">Course Name</th>
                <th className="text-left py-4 px-6 text-slate-300 font-medium">Total Revenue</th>
                <th className="text-left py-4 px-6 text-slate-300 font-medium">Students</th>
                <th className="text-left py-4 px-6 text-slate-300 font-medium">Avg/Student</th>
                <th className="text-left py-4 px-6 text-slate-300 font-medium">Last Payment</th>
              </tr>
            </thead>
            <tbody>
              {courseEarnings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Eye className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Chưa có earnings từ khóa học nào</p>
                  </td>
                </tr>
              ) : (
                courseEarnings.map(course => (
                <tr
                  key={course.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                >
                  <td className="py-4 px-6 text-white font-medium">{course.courseName}</td>
                  <td className="py-4 px-6">
                    <span className="text-2xl font-bold text-violet-400">
                      {formatCurrency(course.totalRevenue)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{formatNumber(course.students)}</td>
                  <td className="py-4 px-6 text-slate-300">
                    {formatCurrency(course.avgRevenuePerStudent)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {course.lastPaymentDate ? (
                        <span className="text-slate-400 text-sm">
                          {new Date(course.lastPaymentDate).toLocaleDateString('vi-VN')}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-sm">-</span>
                      )}
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EarningsContent
