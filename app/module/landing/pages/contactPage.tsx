import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'contact@zoneedu.com',
      link: 'mailto:contact@zoneedu.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Điện thoại',
      content: '+84 123 456 789',
      link: 'tel:+84123456789'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Địa chỉ',
      content: 'Hà Nội, Việt Nam',
      link: '#'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Thứ 6: 9:00 - 18:00',
      link: '#'
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Liên hệ"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" }
          ]}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Liên hệ với <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">chúng tôi</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy gửi tin nhắn cho chúng tôi!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="block bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-violet-500/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-violet-400 group-hover:text-violet-300 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      <p className="text-slate-400 text-sm">{info.content}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Gửi tin nhắn</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Tiêu đề tin nhắn"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Nội dung *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ContactPage
