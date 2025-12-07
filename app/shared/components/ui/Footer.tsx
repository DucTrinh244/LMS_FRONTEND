import { BookOpen, Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'Về chúng tôi', href: '/about' },
      { label: 'Liên hệ', href: '/contact' },
      { label: 'Tuyển dụng', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Trung tâm hỗ trợ', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Điều khoản sử dụng', href: '/terms' },
      { label: 'Chính sách bảo mật', href: '/privacy' },
    ],
    courses: [
      { label: 'Web Development', href: '/courses?category=web' },
      { label: 'Mobile Development', href: '/courses?category=mobile' },
      { label: 'Data Science', href: '/courses?category=data' },
      { label: 'Design', href: '/courses?category=design' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">ZoneEdu</span>
                <span className="text-xs text-violet-400 block -mt-1">
                  Learning Management
                </span>
              </div>
            </a>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Nền tảng học trực tuyến hàng đầu với hàng nghìn khóa học chất lượng cao 
              từ các giảng viên hàng đầu trong ngành.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-violet-400" />
                <span>contact@zoneedu.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-violet-400" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Khóa học</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-400 text-sm">
              © {currentYear} ZoneEdu. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer