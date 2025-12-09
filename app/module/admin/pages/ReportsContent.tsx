import { FileText, Download, Calendar, BarChart3, Users, BookOpen, DollarSign, TrendingUp, Filter } from "lucide-react";
import { useState } from "react";

const ReportsContent: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reportTemplates = [
    {
      id: 'sales',
      title: 'Sales Report',
      description: 'Revenue and sales statistics',
      icon: DollarSign,
      color: 'bg-blue-500',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'students',
      title: 'Students Report',
      description: 'Student enrollment and activity',
      icon: Users,
      color: 'bg-purple-500',
      lastGenerated: '2024-01-14'
    },
    {
      id: 'courses',
      title: 'Courses Report',
      description: 'Course performance and statistics',
      icon: BookOpen,
      color: 'bg-green-500',
      lastGenerated: '2024-01-13'
    },
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Detailed revenue breakdown',
      icon: TrendingUp,
      color: 'bg-orange-500',
      lastGenerated: '2024-01-12'
    }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      name: 'Monthly Sales Report',
      type: 'Sales Report',
      generatedDate: '2024-01-15',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 'RPT-002',
      name: 'Student Enrollment Report',
      type: 'Students Report',
      generatedDate: '2024-01-14',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 'RPT-003',
      name: 'Course Performance Analysis',
      type: 'Courses Report',
      generatedDate: '2024-01-13',
      size: '3.2 MB',
      format: 'PDF'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports</h2>
          <p className="text-gray-600">Generate and view platform reports</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Report Templates</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedReport(template.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition ${
                  selectedReport === template.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{template.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last: {new Date(template.lastGenerated).toLocaleDateString()}</span>
                  <Download className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate Report Section */}
      {selectedReport && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Generate {reportTemplates.find(t => t.id === selectedReport)?.title}
            </h3>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>All Data</option>
                <option>Summary Only</option>
                <option>Detailed</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
              <FileText className="w-5 h-5" />
              Generate Report
            </button>
            <button
              onClick={() => setSelectedReport(null)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Reports</h3>
            <p className="text-sm text-gray-500">Previously generated reports</p>
          </div>
          <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{report.name}</div>
                  <div className="text-sm text-gray-500">
                    {report.type} • {report.format} • {report.size}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    Generated: {new Date(report.generatedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;