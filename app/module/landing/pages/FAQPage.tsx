import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Làm thế nào để đăng ký khóa học?',
      answer: 'Bạn có thể đăng ký khóa học bằng cách tìm kiếm khóa học mong muốn, xem chi tiết và nhấn nút "Đăng ký ngay". Sau đó bạn sẽ được chuyển đến trang thanh toán để hoàn tất đăng ký.'
    },
    {
      question: 'Tôi có thể học offline không?',
      answer: 'Hiện tại tất cả các khóa học trên ZoneEdu đều là học trực tuyến. Bạn có thể học mọi lúc, mọi nơi chỉ cần có kết nối internet.'
    },
    {
      question: 'Sau khi hoàn thành khóa học, tôi có nhận được chứng chỉ không?',
      answer: 'Có, sau khi hoàn thành khóa học và đạt điểm yêu cầu, bạn sẽ nhận được chứng chỉ điện tử được công nhận. Chứng chỉ có thể tải xuống và chia sẻ trên LinkedIn.'
    },
    {
      question: 'Tôi có thể hoàn tiền nếu không hài lòng?',
      answer: 'Chúng tôi có chính sách hoàn tiền trong vòng 30 ngày kể từ ngày đăng ký nếu bạn không hài lòng với khóa học. Vui lòng liên hệ bộ phận hỗ trợ để được xử lý.'
    },
    {
      question: 'Làm thế nào để trở thành giảng viên?',
      answer: 'Bạn có thể đăng ký trở thành giảng viên bằng cách điền form đăng ký trên trang "Trở thành giảng viên". Sau khi được duyệt, bạn có thể tạo và quản lý khóa học của mình.'
    },
    {
      question: 'Tôi có thể truy cập khóa học trong bao lâu?',
      answer: 'Sau khi đăng ký, bạn có quyền truy cập trọn đời vào khóa học. Bạn có thể xem lại bài học bất cứ lúc nào, không giới hạn số lần.'
    },
    {
      question: 'Có hỗ trợ kỹ thuật không?',
      answer: 'Có, chúng tôi có đội ngũ hỗ trợ kỹ thuật 24/7. Bạn có thể liên hệ qua email, chat trực tuyến hoặc hotline để được hỗ trợ nhanh chóng.'
    },
    {
      question: 'Tôi có thể học trên mobile không?',
      answer: 'Có, ZoneEdu hoàn toàn tương thích với mobile. Bạn có thể học trên ứng dụng di động hoặc trình duyệt web trên điện thoại.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Câu hỏi thường gặp"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/faq" }
          ]}
        />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-500/20 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-violet-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Câu hỏi <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">thường gặp</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc phổ biến về ZoneEdu
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden transition-all hover:border-violet-500/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-2xl p-8 border border-violet-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Vẫn còn thắc mắc?
            </h2>
            <p className="text-slate-300 mb-6">
              Nếu bạn không tìm thấy câu trả lời, đừng ngần ngại liên hệ với chúng tôi!
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all font-medium"
            >
              Liên hệ hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default FAQPage
