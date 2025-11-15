import { DollarSign, TrendingUp, TrendingDown, Eye } from 'lucide-react'
import { useState } from 'react'

interface CourseEarning {
  id: string
  courseName: string
  totalRevenue: number
  students: number
  avgRevenuePerStudent: number
  trend: 'up' | 'down'
  trendPercent: number
}

const EarningsContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const stats = [
    {
      label: 'Total Earnings',
      value: '$12,458.00',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'from-violet-600 to-purple-600',
    },
    {
      label: 'This Month',
      value: '$2,350.00',
      change: '+8.3%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      label: 'Last Month',
      value: '$2,170.00',
      change: '-5.2%',
      trend: 'down' as const,
      icon: TrendingDown,
      color: 'from-amber-600 to-orange-600',
    },
    {
      label: 'Pending',
      value: '$548.00',
      change: '12 students',
      trend: 'up' as const,
      icon: Eye,
      color: 'from-blue-600 to-cyan-600',
    },
  ]

  const courseEarnings: CourseEarning[] = [
    {
      id: '1',
      courseName: 'React Fundamentals',
      totalRevenue: 5240,
      students: 85,
      avgRevenuePerStudent: 61.65,
      trend: 'up',
      trendPercent: 15.2,
    },
    {
      id: '2',
      courseName: 'Advanced JavaScript',
      totalRevenue: 4350,
      students: 72,
      avgRevenuePerStudent: 60.42,
      trend: 'up',
      trendPercent: 8.7,
    },
    {
      id: '3',
      courseName: 'Node.js Backend',
      totalRevenue: 2868,
      students: 48,
      avgRevenuePerStudent: 59.75,
      trend: 'down',
      trendPercent: 3.5,
    },
  ]

  const monthlyData = [
    { month: 'Jan', earnings: 1850 },
    { month: 'Feb', earnings: 2100 },
    { month: 'Mar', earnings: 1920 },
    { month: 'Apr', earnings: 2350 },
    { month: 'May', earnings: 2170 },
    { month: 'Jun', earnings: 2350 },
  ]

  const maxEarnings = Math.max(...monthlyData.map(d => d.earnings))

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
        <div className="flex items-end justify-between gap-4 h-64">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-violet-600 to-purple-600 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                  style={{ height: `${(data.earnings / maxEarnings) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-700 px-2 py-1 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    ${data.earnings}
                  </div>
                </div>
              </div>
              <span className="text-slate-400 text-sm">{data.month}</span>
            </div>
          ))}
        </div>
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
                <th className="text-left py-4 px-6 text-slate-300 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {courseEarnings.map(course => (
                <tr
                  key={course.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                >
                  <td className="py-4 px-6 text-white font-medium">{course.courseName}</td>
                  <td className="py-4 px-6">
                    <span className="text-2xl font-bold text-violet-400">
                      ${course.totalRevenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{course.students}</td>
                  <td className="py-4 px-6 text-slate-300">
                    ${course.avgRevenuePerStudent.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {course.trend === 'up' ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">
                            +{course.trendPercent}%
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-medium">
                            -{course.trendPercent}%
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EarningsContent
