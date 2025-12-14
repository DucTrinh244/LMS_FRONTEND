import { BookOpen, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';
import MainLayout from '~/layouts/MainLayout';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';

const CartPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Giỏ hàng"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" }
          ]}
        />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Chức năng giỏ hàng đã được tắt</h2>
            <p className="text-slate-400 mb-8">
              Hiện tại hệ thống chỉ hỗ trợ đăng ký từng khóa học một. Vui lòng chọn khóa học và đăng ký trực tiếp.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition"
            >
              <BookOpen className="w-5 h-5" />
              Xem khóa học
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;