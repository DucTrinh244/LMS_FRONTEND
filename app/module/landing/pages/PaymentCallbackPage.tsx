import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import MainLayout from '~/layouts/MainLayout';
import { paymentService } from '~/module/landing/services/PaymentApi';
import type { PaymentCallbackResult } from '~/module/landing/types/payment';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';
import { useToast } from '~/shared/hooks/useToast';

const PaymentCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PaymentCallbackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processCallback() {
      try {
        // Lấy tất cả query parameters từ URL
        const queryString = window.location.search;

        if (!queryString) {
          throw new Error('Không có thông tin thanh toán');
        }

        // Gọi API để xử lý callback
        const callbackResult = await paymentService.processCallback(queryString);
        setResult(callbackResult);

        if (callbackResult.success) {
          // Thanh toán thành công - redirect đến success page
          toast.success('Thanh toán thành công! Bạn đã được ghi danh vào khóa học.');

          // Redirect đến success page với data
          navigate('/payment/success', {
            state: {
              result: callbackResult,
              message: 'Thanh toán thành công! Bạn đã được ghi danh vào khóa học.',
              paymentSuccess: true
            }
          });
        } else {
          // Thanh toán thất bại
          toast.error(callbackResult.message || 'Thanh toán thất bại');

          // Redirect sau 3 giây
          setTimeout(() => {
            navigate('/cart');
          }, 3000);
        }
      } catch (err: any) {
        console.error('Callback error:', err);
        setError(err?.message || 'Không thể xử lý kết quả thanh toán');
        toast.error('Đã xảy ra lỗi khi xử lý kết quả thanh toán');

        setTimeout(() => {
          navigate('/courses');
        }, 3000);
      } finally {
        setLoading(false);
      }
    }

    processCallback();
  }, [navigate, toast]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader
          title="Kết quả thanh toán"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Payment', href: '/payment/callback' }
          ]}
        />

        <div className="container mx-auto px-4 py-10 max-w-2xl">
          {loading ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
              <Loader2 className="w-16 h-16 text-violet-400 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Đang xử lý kết quả thanh toán...</h2>
              <p className="text-slate-400">Vui lòng đợi trong giây lát</p>
            </div>
          ) : error ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Đã xảy ra lỗi</h2>
              <p className="text-red-400 mb-6">{error}</p>
              <button
                onClick={() => navigate('/courses')}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition"
              >
                Xem khóa học
              </button>
            </div>
          ) : result?.success ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">✅ Thanh toán thành công!</h2>
              <p className="text-slate-300 text-lg mb-6">{result.message}</p>

              <div className="bg-slate-900/50 rounded-lg p-6 mb-6 text-left space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mã giao dịch:</span>
                  <span className="text-white font-semibold">{result.txnRef}</span>
                </div>
                {result.transactionNo && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Số giao dịch:</span>
                    <span className="text-white font-semibold">{result.transactionNo}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Số tiền:</span>
                  <span className="text-violet-400 font-bold text-lg">
                    {result.amount.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mã phản hồi:</span>
                  <span className="text-green-400 font-semibold">{result.responseCode}</span>
                </div>
              </div>

              <p className="text-slate-400 mb-6">Đang chuyển hướng đến trang học viên...</p>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">❌ Thanh toán thất bại</h2>
              <p className="text-slate-300 text-lg mb-6">
                {result?.message || 'Đã xảy ra lỗi trong quá trình thanh toán'}
              </p>

              {result && (
                <div className="bg-slate-900/50 rounded-lg p-6 mb-6 text-left space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Mã giao dịch:</span>
                    <span className="text-white font-semibold">{result.txnRef}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Mã phản hồi:</span>
                    <span className="text-red-400 font-semibold">{result.responseCode}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/courses')}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition"
                >
                  Xem khóa học
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentCallbackPage;

