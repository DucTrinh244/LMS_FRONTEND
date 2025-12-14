import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, CheckCircle, Lock, Shield } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import MainLayout from '~/layouts/MainLayout';
import { courseService } from '~/module/landing/services/CourseApi';
import { paymentService } from '~/module/landing/services/PaymentApi';
import ProtectedRoute from '~/shared/components/common/ProtectedRoute';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';
import { useToast } from '~/shared/hooks/useToast';

const CheckoutPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Chỉ hỗ trợ single course checkout
  if (!courseId) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-8 text-center max-w-md">
              <p className="text-red-400 mb-4">Không tìm thấy khóa học</p>
              <button
                onClick={() => navigate('/courses')}
                className="text-violet-400 hover:text-violet-300"
              >
                Quay lại danh sách khóa học
              </button>
            </div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  // Fetch course detail
  const {
    data: courseDetail,
    isLoading: courseLoading,
    error
  } = useQuery({
    queryKey: ['course-detail', courseId],
    queryFn: () => courseService.getCourseDetail(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  const course = courseDetail?.course;
  const totalPrice = course?.price || 0;

  // Mutation để tạo payment
  const createPaymentMutation = useMutation({
    mutationFn: async ({ courseId, amount, orderInfo }: { courseId: string; amount: number; orderInfo?: string }) => {
      return paymentService.createPayment({ courseId, amount, orderInfo });
    },
    onSuccess: (data) => {
      // Check if response is successful and has Data
      if (!data.Success || !data.Data) {
        toast.error(data.Message || 'Không thể tạo thanh toán');
        setIsProcessing(false);
        return;
      }

      // Lưu thông tin payment vào localStorage
      localStorage.setItem('currentPaymentId', data.Data.paymentId);
      localStorage.setItem('currentTxnRef', data.Data.txnRef);

      // Redirect đến VNPAY
      window.location.href = data.Data.paymentUrl;
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể tạo thanh toán. Vui lòng thử lại sau.');
      setIsProcessing(false);
    }
  });

  const handleEnroll = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      if (!courseId || !course) {
        toast.error('Không tìm thấy thông tin khóa học');
        setIsProcessing(false);
        return;
      }

      const amount = course.price || 0;
      if (amount <= 0) {
        toast.info('Khóa học này miễn phí. Đang đăng ký...');
        // TODO: Implement free enrollment
        setIsProcessing(false);
        return;
      }

      await createPaymentMutation.mutateAsync({
        courseId: courseId,
        amount: amount,
        orderInfo: `Thanh toan khoa hoc ${course.title}`
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };

  const isLoading = courseLoading;
  const hasError = error || !course;

  return (
    <ProtectedRoute>
      <MainLayout>
        {isLoading ? (
          <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Đang tải...</p>
            </div>
          </div>
        ) : hasError ? (
          <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <CourseGridHeader
              title="Checkout"
              breadcrumb={[
                { label: 'Home', href: '/' },
                { label: 'Checkout', href: `/checkout${courseId ? `/${courseId}` : ''}` }
              ]}
            />
            <div className="container mx-auto px-4 py-10 max-w-4xl">
              <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-8 text-center">
                <p className="text-red-400 mb-4">Không thể tải thông tin khóa học</p>
                <button
                  onClick={() => navigate(-1)}
                  className="text-violet-400 hover:text-violet-300"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <CourseGridHeader
              title="Checkout"
              breadcrumb={[
                { label: 'Home', href: '/' },
                { label: 'Course', href: `/course/detail/${courseId}` },
                { label: 'Checkout', href: `/checkout/${courseId}` }
              ]}
            />

            <div className="container mx-auto px-4 py-10 max-w-6xl">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Course Summary */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Course Info */}
                  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Course Summary</h2>
                    <div className="flex gap-4">
                      <img
                        src={course?.image}
                        alt={course?.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{course?.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{course?.shortDescription}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <span>Instructor: {course?.instructorName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Phương thức thanh toán</h2>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border-2 border-violet-500/50 bg-violet-500/10 rounded-lg cursor-pointer hover:border-violet-500/70 transition">
                        <input
                          type="radio"
                          name="payment"
                          value="vnpay"
                          defaultChecked
                          className="w-4 h-4 text-violet-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">VNPAY</span>
                            <span className="bg-violet-500/20 text-violet-400 text-xs font-semibold px-2 py-0.5 rounded">Mặc định</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Thanh toán an toàn qua cổng VNPAY</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Secure Payment</p>
                        <p className="text-xs text-slate-400">
                          Your payment information is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6 sticky top-4">
                    <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Course Price</span>
                        <span className="text-white font-semibold">
                          {totalPrice === 0 ? 'Free' : `$${totalPrice.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Tax</span>
                        <span className="text-white font-semibold">$0.00</span>
                      </div>
                      <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="text-2xl font-bold text-violet-400">
                          {totalPrice === 0 ? 'Free' : `$${totalPrice.toLocaleString()}`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleEnroll}
                      disabled={isProcessing || createPaymentMutation.isPending}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-semibold mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing || createPaymentMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          {totalPrice === 0 ? 'Đăng ký miễn phí' : 'Thanh toán'}
                        </>
                      )}
                    </button>

                    <div className="space-y-2 text-xs text-slate-400">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Lifetime access to course materials</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Certificate of completion included</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(-1)}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-violet-400 transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
};

export default CheckoutPage;

