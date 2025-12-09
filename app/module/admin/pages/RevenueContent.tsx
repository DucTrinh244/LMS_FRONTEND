import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, BarChart3, PieChart, Filter } from "lucide-react";
import { useState } from "react";

const RevenueContent: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const revenueStats = {
    total: 45890,
    monthly: 12450,
    weekly: 3420,
    daily: 890,
    change: 12.5,
    trend: 'up'
  };

  const revenueByCategory = [
    { category: 'Development', amount: 18450, percentage: 40.2, color: 'bg-blue-500' },
    { category: 'Design', amount: 12340, percentage: 26.9, color: 'bg-purple-500' },
    { category: 'Marketing', amount: 8900, percentage: 19.4, color: 'bg-pink-500' },
    { category: 'Business', amount: 6200, percentage: 13.5, color: 'bg-orange-500' }
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      student: 'John Smith',
      course: 'Complete Web Development',
      amount: 149,
      date: '2024-01-15',
      status: 'Completed',
      method: 'Credit Card'
    },
    {
      id: 'TXN-002',
      student: 'Emma Johnson',
      course: 'UI/UX Design Masterclass',
      amount: 199,
      date: '2024-01-14',
      status: 'Completed',
      method: 'PayPal'
    },
    {
      id: 'TXN-003',
      student: 'Michael Brown',
      course: 'Python Programming',
      amount: 129,
      date: '2024-01-14',
      status: 'Pending',
      method: 'Credit Card'
    },
    {
      id: 'TXN-004',
      student: 'Sophie Davis',
      course: 'Digital Marketing',
      amount: 99,
      date: '2024-01-13',
      status: 'Completed',
      method: 'Stripe'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Revenue Management</h2>
          <p className="text-gray-600">View revenue statistics and reports</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
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
            {revenueStats.trend === 'up' ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
          <div className="text-sm opacity-90 mb-1">Total Revenue</div>
          <div className="text-3xl font-bold">${revenueStats.total.toLocaleString()}</div>
          <div className="text-sm mt-2 opacity-80">
            {revenueStats.change > 0 ? '+' : ''}{revenueStats.change}% from last period
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">${revenueStats.monthly.toLocaleString()}</div>
              <div className="text-sm font-medium text-gray-600">Monthly Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">${revenueStats.weekly.toLocaleString()}</div>
              <div className="text-sm font-medium text-gray-600">Weekly Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">${revenueStats.daily.toLocaleString()}</div>
              <div className="text-sm font-medium text-gray-600">Daily Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Revenue trends over time</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-purple-300" />
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue by Category</h3>
              <p className="text-sm text-gray-500">Breakdown by course category</p>
            </div>
          </div>
          <div className="space-y-4">
            {revenueByCategory.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                  <span className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
            <p className="text-sm text-gray-500">Latest payment transactions</p>
          </div>
          <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-gray-600">{transaction.id}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.student}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.course}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">${transaction.amount}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.method}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueContent;