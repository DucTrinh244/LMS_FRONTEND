import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CategoriesSection = () => {
  const categories = [
    { name: 'Development', icon: '💻', count: 450, color: 'from-blue-500 to-cyan-500' },
    { name: 'Business', icon: '💼', count: 320, color: 'from-violet-500 to-purple-500' },
    { name: 'Design', icon: '🎨', count: 280, color: 'from-pink-500 to-rose-500' },
    { name: 'Marketing', icon: '📈', count: 210, color: 'from-orange-500 to-amber-500' },
    { name: 'Photography', icon: '📷', count: 180, color: 'from-emerald-500 to-teal-500' },
    { name: 'Music', icon: '🎵', count: 150, color: 'from-indigo-500 to-blue-500' },
    { name: 'Data Science', icon: '📊', count: 200, color: 'from-teal-500 to-green-500' },
    { name: 'Finance', icon: '💰', count: 170, color: 'from-yellow-500 to-amber-500' },
    { name: 'Health & Fitness', icon: '🏋️', count: 140, color: 'from-red-500 to-pink-500' },
    { name: 'Language', icon: '🌐', count: 160, color: 'from-purple-500 to-indigo-500' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000, // Tốc độ chuyển đổi slide (4 giây)
    slidesToShow: 6,
    slidesToScroll: 1, // Cuộn từng slide
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 0, // Loại bỏ khoảng dừng giữa các slide
    rtl: true, // Cuộn từ phải sang trái
    arrows: true,
    pauseOnHover: true, // Tạm dừng khi hover
    pauseOnDotsHover: true, // Tạm dừng khi hover dots
    cssEase: 'linear', // Chuyển động tuyến tính
    variableWidth: true, // Tự điều chỉnh chiều rộng slide
    centerMode: true, // Căn giữa các slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false, // Ẩn mũi tên trên mobile
          centerMode: true,
        },
      },
    ],
  };

  // Debug autoplay
  useEffect(() => {
    console.log('Carousel initialized with autoplay: true, rtl: true, speed: 4000, cssEase: linear, autoplaySpeed: 0');
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Explore Top Categories
          </h2>
          <p className="text-slate-400 text-lg">
            Choose from thousands of courses across multiple categories
          </p>
        </div>

        <div className="relative overflow-hidden">
          <style>{`
            .slick-prev,
            .slick-next {
              width: 32px;
              height: 32px;
              background: rgba(100, 116, 139, 0.5);
              border-radius: 50%;
              z-index: 10;
              transition: background 0.3s;
            }
            .slick-prev:hover,
            .slick-next:hover {
              background: rgba(139, 92, 246, 0.8);
            }
            .slick-prev {
              left: -40px;
            }
            .slick-next {
              right: -40px;
            }
            .slick-prev:before,
            .slick-next:before {
              font-size: 16px;
              color: white;
            }
            .slick-dots li button:before {
              color: #94a3b8;
            }
            .slick-dots li.slick-active button:before {
              color: #8b5cf6;
            }
            .slick-slide > div {
              will-change: transform;
            }
            .slick-track {
              display: flex;
              align-items: center;
            }
          `}</style>
          <Slider {...settings}>
            {categories.map((category, index) => (
              <div key={index} className="px-1.5" style={{ width: 200 }}>
                <div 
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-violet-500/50 transition cursor-pointer group text-center"
                >
                  <div className={`text-4xl mb-3 group-hover:scale-110 transition bg-gradient-to-r ${category.color} text-transparent bg-clip-text`}>
                    {category.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-sm">{category.name}</h3>
                  <p className="text-slate-500 text-xs">{category.count} courses</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;