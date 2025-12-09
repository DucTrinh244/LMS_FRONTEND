import { Calendar, CheckCircle, Clock, CreditCard, Download, Receipt, ShoppingCart } from 'lucide-react';

const OrderHistoryContent = () => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: [
        { name: 'Advanced React Development', price: 149 },
        { name: 'Complete Python Bootcamp', price: 129 }
      ],
      total: 278,
      status: 'completed',
      paymentMethod: 'Credit Card',
      invoice: 'INV-001'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: [
        { name: 'UI/UX Design Degree', price: 120 }
      ],
      total: 120,
      status: 'completed',
      paymentMethod: 'PayPal',
      invoice: 'INV-002'
    },
    {
      id: 'ORD-003',
      date: '2024-01-08',
      items: [
        { name: 'Wordpress for Beginners', price: 140 },
        { name: 'Sketch from A to Z (2024)', price: 140 }
      ],
      total: 280,
      status: 'completed',
      paymentMethod: 'Credit Card',
      invoice: 'INV-003'
    },
    {
      id: 'ORD-004',
      date: '2024-01-05',
      items: [
        { name: 'Digital Marketing Mastery', price: 99 }
      ],
      total: 99,
      status: 'pending',
      paymentMethod: 'Credit Card',
      invoice: 'INV-004'
    }
  ];

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{orders.length}</div>
              <div className="text-sm font-medium text-slate-300">Total Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {orders.filter(o => o.status === 'completed').length}
              </div>
              <div className="text-sm font-medium text-slate-300">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">${totalSpent}</div>
              <div className="text-sm font-medium text-slate-300">Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">Order History</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-white">Order #{order.id}</h4>
                    <span className={`${order.status === 'completed'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                      } text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
                      {order.status === 'completed' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4" />
                      <span>Invoice: {order.invoice}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.name}</span>
                        <span className="text-white font-semibold">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-violet-400 mb-1">
                      ${order.total}
                    </div>
                    <div className="text-xs text-slate-400">Total Amount</div>
                  </div>
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Invoice
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

export default OrderHistoryContent;