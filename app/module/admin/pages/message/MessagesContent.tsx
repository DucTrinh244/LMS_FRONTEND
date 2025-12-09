import { MessageSquare, Search, Send, Mail, User, Calendar, CheckCircle, Clock, Filter } from "lucide-react";
import { useState } from "react";

const MessagesContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const messages = [
    {
      id: 'MSG-001',
      from: 'John Smith',
      fromAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      to: 'Sarah Wilson',
      subject: 'Question about course content',
      preview: 'I have a question regarding the React hooks section...',
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'Unread',
      category: 'Course Inquiry'
    },
    {
      id: 'MSG-002',
      from: 'Emma Johnson',
      fromAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      to: 'Michael Chen',
      subject: 'Technical support needed',
      preview: 'I am experiencing issues with video playback...',
      date: '2024-01-14',
      time: '2:15 PM',
      status: 'Read',
      category: 'Technical Support'
    },
    {
      id: 'MSG-003',
      from: 'Michael Brown',
      fromAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      to: 'Admin',
      subject: 'Account verification',
      preview: 'I need help verifying my account...',
      date: '2024-01-14',
      time: '9:00 AM',
      status: 'Unread',
      category: 'Account'
    },
    {
      id: 'MSG-004',
      from: 'Sophie Davis',
      fromAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      to: 'David Lee',
      subject: 'Course completion certificate',
      preview: 'When will I receive my certificate?',
      date: '2024-01-13',
      time: '4:45 PM',
      status: 'Read',
      category: 'Certificates'
    }
  ];

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || msg.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'Unread').length,
    today: messages.filter(m => {
      const today = new Date().toDateString();
      return new Date(m.date).toDateString() === today;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm font-medium text-gray-600">Total Messages</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.unread}</div>
              <div className="text-sm font-medium text-gray-600">Unread</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.today}</div>
              <div className="text-sm font-medium text-gray-600">Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages</h2>
            <p className="text-gray-600">View and respond to messages</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border rounded-lg transition cursor-pointer ${
                message.status === 'Unread'
                  ? 'border-purple-300 bg-purple-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={message.fromAvatar}
                  alt={message.from}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{message.from}</span>
                        <span className="text-sm text-gray-500">→</span>
                        <span className="text-sm text-gray-600">{message.to}</span>
                        {message.status === 'Unread' && (
                          <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        )}
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{message.subject}</div>
                      <p className="text-sm text-gray-600 line-clamp-1">{message.preview}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">{message.date}</div>
                      <div className="text-xs text-gray-400">{message.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {message.category}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-purple-50 rounded-lg transition" title="Reply">
                        <Send className="w-4 h-4 text-purple-600" />
                      </button>
                      {message.status === 'Unread' && (
                        <button className="p-1.5 hover:bg-green-50 rounded-lg transition" title="Mark as read">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesContent;