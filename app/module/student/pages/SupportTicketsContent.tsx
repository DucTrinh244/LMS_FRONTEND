import { AlertCircle, Calendar, CheckCircle, Clock, HelpCircle, MessageSquare, Plus } from 'lucide-react';

const SupportTicketsContent = () => {
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Unable to access course materials',
      category: 'Technical Issue',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-16',
      messages: 3
    },
    {
      id: 'TKT-002',
      subject: 'Certificate download not working',
      category: 'Technical Issue',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-12',
      lastUpdate: '2024-01-14',
      messages: 5
    },
    {
      id: 'TKT-003',
      subject: 'Payment refund request',
      category: 'Billing',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-01-08',
      lastUpdate: '2024-01-10',
      messages: 8
    },
    {
      id: 'TKT-004',
      subject: 'Question about course content',
      category: 'General Inquiry',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-05',
      lastUpdate: '2024-01-06',
      messages: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-600/20 text-red-400';
      case 'in-progress':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'resolved':
        return 'bg-green-600/20 text-green-400';
      default:
        return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600/20 text-red-400';
      case 'medium':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'low':
        return 'bg-blue-600/20 text-blue-400';
      default:
        return 'bg-slate-600/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Support Tickets</h2>
            <p className="text-slate-300">Get help with your account, courses, or technical issues</p>
          </div>
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-md">
          <div className="text-2xl font-bold text-white mb-1">{tickets.filter(t => t.status === 'open').length}</div>
          <div className="text-sm text-slate-300">Open Tickets</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-md">
          <div className="text-2xl font-bold text-white mb-1">{tickets.filter(t => t.status === 'in-progress').length}</div>
          <div className="text-sm text-slate-300">In Progress</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-md">
          <div className="text-2xl font-bold text-white mb-1">{tickets.filter(t => t.status === 'resolved').length}</div>
          <div className="text-sm text-slate-300">Resolved</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-md">
          <div className="text-2xl font-bold text-white mb-1">{tickets.length}</div>
          <div className="text-sm text-slate-300">Total Tickets</div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">All Tickets</h3>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{ticket.subject}</h4>
                    <span className={`${getStatusColor(ticket.status)} text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                    <span className={`${getPriorityColor(ticket.priority)} text-xs font-semibold px-3 py-1 rounded-full`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-2 py-1 rounded">
                        {ticket.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{ticket.messages} messages</span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    Ticket ID: <span className="text-violet-400 font-mono">{ticket.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="bg-slate-600 text-slate-300 px-4 py-2 rounded-lg font-semibold hover:bg-slate-500 transition">
                    View Details
                  </button>
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportTicketsContent;