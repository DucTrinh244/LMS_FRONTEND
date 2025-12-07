import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'
import { BookOpen, Users, Award, Target, Heart, Globe } from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Khóa học chất lượng',
      description: 'Hơn 10,000 khóa học từ các giảng viên hàng đầu trong ngành'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Cộng đồng lớn',
      description: 'Hơn 500,000 học viên đang học tập và phát triển cùng chúng tôi'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Chứng chỉ uy tín',
      description: 'Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mục tiêu rõ ràng',
      description: 'Học tập có định hướng với lộ trình được thiết kế chuyên nghiệp'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Khóa học' },
    { value: '500K+', label: 'Học viên' },
    { value: '1K+', label: 'Giảng viên' },
    { value: '50+', label: 'Quốc gia' }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Về chúng tôi"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" }
          ]}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Về <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">ZoneEdu</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Nền tảng học trực tuyến hàng đầu với sứ mệnh cung cấp nguồn tài nguyên giáo dục 
              chất lượng cao và trải nghiệm học tập liền mạch cho mọi người.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                <div className="text-3xl md:text-4xl font-bold text-violet-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">Sứ mệnh</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Cung cấp nền tảng học tập trực tuyến tốt nhất, giúp mọi người có thể tiếp cận 
                giáo dục chất lượng cao bất kể vị trí địa lý hay hoàn cảnh kinh tế.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">Tầm nhìn</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Trở thành nền tảng học tập trực tuyến hàng đầu khu vực, trao quyền cho hàng triệu 
                người học trên toàn thế giới thông qua công nghệ giáo dục tiên tiến và dễ tiếp cận.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Điểm nổi bật
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-violet-500/50 transition-all"
                >
                  <div className="text-violet-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-2xl p-8 border border-violet-500/30 text-center">
            <Globe className="w-12 h-12 text-violet-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-slate-300 mb-6">
              Có câu hỏi hoặc muốn tìm hiểu thêm? Chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </p>
            <a
              href="mailto:contact@zoneedu.com"
              className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all font-medium"
            >
              contact@zoneedu.com
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AboutPage