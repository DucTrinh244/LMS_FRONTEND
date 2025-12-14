import { Calendar, CheckCircle, Clock, CreditCard, Receipt, ShoppingCart, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { studentPaymentService } from '~/module/student/services/PaymentApi';
import { PaymentStatus } from '~/module/student/types/payment';
import type { PaymentOrderListItemDto } from '~/module/student/types/payment';
import { getPaymentStatusText, getPaymentStatusColor, formatCurrency } from '~/module/student/types/payment';
import { useToast } from '~/shared/hooks/useToast';

const OrderHistoryContent = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | undefined>(undefined);

  const {
    data: ordersData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['student-orders', page, pageSize, statusFilter],
    queryFn: async () => {
      const res = await studentPaymentService.getMyOrders(page, pageSize, statusFilter);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || 'Không thể tải lịch sử đơn hàng');
    },
    retry: 1
  });

  const orders = ordersData?.items || [];
  const totalCount = ordersData?.totalCount || 0;
  const totalPages = ordersData?.totalPages || 0;
  
  const totalSpent = orders
    .filter(order => order.statusCode === PaymentStatus.Paid)
    .reduce((sum, order) => sum + order.amount, 0);
  
  const completedCount = orders.filter(order => order.statusCode === PaymentStatus.Paid).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center text-white py-12">
          <p>Đang tải lịch sử đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-slate-400">{error instanceof Error ? error.message : 'Có lỗi xảy ra'}</p>
        </div>
      </div>
    );
  }

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
              <div className="text-3xl font-bold text-white">{totalCount}</div>
              <div className="text-sm font-medium text-slate-300">Tổng đơn hàng</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{completedCount}</div>
              <div className="text-sm font-medium text-slate-300">Đã thanh toán</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{formatCurrency(totalSpent)}</div>
              <div className="text-sm font-medium text-slate-300">Tổng chi tiêu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Lịch sử đơn hàng</h3>
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter || ''}
              onChange={(e) => {
                const value = e.target.value;
                setStatusFilter(value ? Number(value) as PaymentStatus : undefined);
                setPage(1);
              }}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value={PaymentStatus.Pending}>Đang chờ thanh toán</option>
              <option value={PaymentStatus.Paid}>Đã thanh toán</option>
              <option value={PaymentStatus.Failed}>Thanh toán thất bại</option>
              <option value={PaymentStatus.Canceled}>Đã hủy</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Chưa có đơn hàng nào</h3>
              <p className="text-slate-400">Bạn chưa có đơn hàng nào trong hệ thống</p>
            </div>
          ) : (
            <>
              {orders.map((order: PaymentOrderListItemDto) => (
                <div
                  key={order.id}
                  className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-lg font-semibold text-white">{order.courseTitle}</h4>
                        <span className={`${getPaymentStatusColor(order.statusCode)} text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
                          {order.statusCode === PaymentStatus.Paid ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : order.statusCode === PaymentStatus.Pending ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {getPaymentStatusText(order.statusCode)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        {order.paidAt && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Thanh toán: {new Date(order.paidAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                        )}
                        {order.txnRef && (
                          <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4" />
                            <span>Mã: {order.txnRef}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-violet-400 mb-1">
                          {formatCurrency(order.amount, order.currency)}
                        </div>
                        <div className="text-xs text-slate-400">Tổng tiền</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  <span className="text-slate-300 px-4">
                    Trang {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryContent;