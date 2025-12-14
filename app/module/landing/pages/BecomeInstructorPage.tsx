import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, Users, DollarSign, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Header from '~/shared/components/ui/Header';
import Footer from '~/shared/components/ui/Footer';
import { useAuth } from '~/context/authContext';
import { useToast } from '~/shared/hooks/useToast';

const BecomeInstructorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    expertise: '',
    experience: '',
    motivation: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Call API to submit instructor application
      // await instructorService.applyToBecomeInstructor(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Đăng ký thành công!',
        description: 'Chúng tôi đã nhận được đơn đăng ký của bạn. Chúng tôi sẽ xem xét và phản hồi trong vòng 24-48 giờ.',
        variant: 'default'
      });
      
      // Reset form
      setFormData({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: '',
        bio: '',
        expertise: '',
        experience: '',
        motivation: ''
      });
      
      // Navigate to student dashboard
      setTimeout(() => {
        navigate('/student');
      }, 2000);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể gửi đơn đăng ký. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Kiếm tiền từ kiến thức',
      description: 'Chia sẻ kiến thức và kiếm thu nhập từ các khóa học của bạn'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Xây dựng cộng đồng',
      description: 'Kết nối với hàng ngàn học viên và xây dựng thương hiệu cá nhân'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Phát triển sự nghiệp',
      description: 'Mở rộng ảnh hưởng và phát triển sự nghiệp giảng dạy của bạn'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trở thành Instructor
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chia sẻ kiến thức của bạn với hàng ngàn học viên và kiếm thu nhập từ các khóa học
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-violet-500/50 transition"
              >
                <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center text-violet-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Đơn đăng ký trở thành Instructor</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                    Họ và tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Số điện thoại <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="0123456789"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-2">
                    Giới thiệu bản thân <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    placeholder="Giới thiệu ngắn gọn về bản thân, kinh nghiệm và chuyên môn của bạn..."
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-slate-300 mb-2">
                    Lĩnh vực chuyên môn <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Ví dụ: Web Development, Data Science, Design..."
                  />
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-2">
                    Kinh nghiệm giảng dạy / làm việc <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    placeholder="Mô tả kinh nghiệm giảng dạy, làm việc hoặc các dự án liên quan..."
                  />
                </div>

                {/* Motivation */}
                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-slate-300 mb-2">
                    Lý do muốn trở thành Instructor <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    placeholder="Chia sẻ lý do bạn muốn trở thành instructor và những gì bạn muốn đóng góp..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Đang gửi đơn đăng ký...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Gửi đơn đăng ký</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Info Note */}
                <div className="bg-violet-600/10 border border-violet-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-slate-300">
                      <p className="font-semibold text-violet-400 mb-1">Lưu ý:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-400">
                        <li>Đơn đăng ký của bạn sẽ được xem xét trong vòng 24-48 giờ</li>
                        <li>Chúng tôi sẽ gửi email thông báo kết quả đến địa chỉ email của bạn</li>
                        <li>Vui lòng điền đầy đủ và chính xác thông tin để quá trình xét duyệt diễn ra nhanh chóng</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeInstructorPage;

