import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'
import { Check, X, Star } from 'lucide-react'
import { Link } from 'react-router'

const PricingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '0',
      period: 'miễn phí',
      description: 'Dành cho người mới bắt đầu',
      features: [
        'Truy cập khóa học miễn phí',
        'Chứng chỉ sau khi hoàn thành',
        'Hỗ trợ cộng đồng',
        'Nội dung cơ bản'
      ],
      limitations: [
        'Không có khóa học cao cấp',
        'Không có hỗ trợ 1-1'
      ],
      popular: false,
      buttonText: 'Bắt đầu miễn phí',
      buttonLink: '/register'
    },
    {
      name: 'Premium',
      price: '299',
      period: '/tháng',
      description: 'Dành cho người học nghiêm túc',
      features: [
        'Tất cả khóa học Premium',
        'Chứng chỉ được công nhận',
        'Hỗ trợ ưu tiên 24/7',
        'Truy cập trọn đời',
        'Tải xuống tài liệu',
        'Học offline'
      ],
      limitations: [],
      popular: true,
      buttonText: 'Đăng ký ngay',
      buttonLink: '/register'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Dành cho doanh nghiệp',
      features: [
        'Tất cả tính năng Premium',
        'Quản lý nhóm người dùng',
        'Báo cáo tiến độ chi tiết',
        'Tích hợp API',
        'Hỗ trợ chuyên dụng',
        'Đào tạo tùy chỉnh'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Liên hệ bán hàng',
      buttonLink: '/contact'
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Bảng giá"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Pricing", href: "/pricing" }
          ]}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chọn gói <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">phù hợp</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chọn gói phù hợp với nhu cầu học tập của bạn. Tất cả gói đều có thể hủy bất cứ lúc nào.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? 'border-violet-500 shadow-lg shadow-violet-500/25 scale-105'
                    : 'border-slate-700 hover:border-violet-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Phổ biến nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price === 'Custom' ? (
                      <span className="text-3xl font-bold text-white">Liên hệ</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400">k{plan.period}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-400 text-sm line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.buttonLink}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/50'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Câu hỏi về giá
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Có thể hủy gói bất cứ lúc nào?</h3>
                <p className="text-slate-400 text-sm">
                  Có, bạn có thể hủy gói đăng ký bất cứ lúc nào. Bạn vẫn có quyền truy cập đến hết thời gian đã thanh toán.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Có chính sách hoàn tiền không?</h3>
                <p className="text-slate-400 text-sm">
                  Có, chúng tôi có chính sách hoàn tiền trong vòng 30 ngày nếu bạn không hài lòng với dịch vụ.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Có thể nâng cấp gói không?</h3>
                <p className="text-slate-400 text-sm">
                  Có, bạn có thể nâng cấp gói bất cứ lúc nào. Chúng tôi sẽ tính toán lại giá dựa trên thời gian còn lại.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Có ưu đãi cho sinh viên không?</h3>
                <p className="text-slate-400 text-sm">
                  Có, sinh viên được giảm 50% khi đăng ký gói Premium. Vui lòng liên hệ để được xác minh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PricingPage
