import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CheckCircle, BookOpen, ArrowRight, Download, Home } from 'lucide-react';
import MainLayout from '~/layouts/MainLayout';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';
import type { PaymentCallbackResult } from '~/module/landing/types/payment';

interface PaymentSuccessState {
  result?: PaymentCallbackResult;
  message?: string;
  paymentSuccess?: boolean;
}

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PaymentSuccessState | null;
  const result = state?.result;

  useEffect(() => {
    // Nếu không có data, redirect về trang chủ
    if (!state && !result) {
      const timer = setTimeout(() => {
        navigate('/courses');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, result, navigate]);

  // Xóa payment info từ localStorage khi vào trang success
  useEffect(() => {
    localStorage.removeItem('currentPaymentId');
    localStorage.removeItem('currentTxnRef');
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader
          title="Thanh toán thành công"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Payment', href: '/payment/callback' },
            { label: 'Success', href: '/payment/success' }
          ]}
        />

        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-8 md:p-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xl">🎉</span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Thanh toán thành công!
              </h1>
              <p className="text-lg text-slate-300 mb-2">
                {state?.message || result?.message || 'Bạn đã được ghi danh vào khóa học thành công.'}
              </p>
              <p className="text-sm text-slate-400">
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.
              </p>
            </div>

            {/* Payment Details */}
            {result && (
              <div className="bg-slate-900/50 rounded-lg p-6 mb-8 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-violet-500 rounded-full"></div>
                  Chi tiết giao dịch
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Mã giao dịch:</span>
                    <span className="text-white font-semibold font-mono">{result.txnRef}</span>
                  </div>
                  {result.transactionNo && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-slate-400">Số giao dịch VNPay:</span>
                      <span className="text-white font-semibold font-mono">{result.transactionNo}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Số tiền thanh toán:</span>
                    <span className="text-violet-400 font-bold text-lg">
                      {result.amount.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">Trạng thái:</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      ✓ Đã thanh toán
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/student')}
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Vào khóa học của tôi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/courses')}
                  className="group flex items-center justify-center gap-3 bg-slate-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-slate-600 transition-all border border-slate-600"
                >
                  <Home className="w-5 h-5" />
                  <span>Xem thêm khóa học</span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-slate-300">
                    <p className="font-semibold mb-1">Lưu ý:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      <li>Bạn có thể bắt đầu học ngay bây giờ</li>
                      <li>Email xác nhận đã được gửi đến địa chỉ email của bạn</li>
                      <li>Nếu có vấn đề, vui lòng liên hệ hỗ trợ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Receipt Button (Optional) */}
            {result && (
              <div className="mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => {
                    // TODO: Implement download receipt functionality
                    console.log('Download receipt for:', result.txnRef);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-violet-400 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải hóa đơn thanh toán</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccessPage;

