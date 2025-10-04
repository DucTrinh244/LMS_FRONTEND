// app/routes/home.tsx
import { Link } from 'react-router'
// Remove the problematic import and use a generic argument type for meta

export function meta({}: { [key: string]: any }) {
  return [
    { title: 'LMS - Hệ thống quản lý học tập' },
    { name: 'description', content: 'Trang chủ hệ thống LMS, nơi quản lý khóa học, học viên và giảng viên.' }
  ]
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Chào mừng đến với Hệ thống LMS
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Đây là nền tảng giúp giảng viên quản lý khóa học, học viên theo dõi tiến độ và
          quản trị viên điều hành toàn bộ hệ thống một cách dễ dàng.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/courses"
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700"
          >
            Xem khóa học
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl bg-gray-200 text-gray-800 font-medium shadow hover:bg-gray-300"
          >
            Đăng nhập
          </Link>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="p-6 rounded-2xl bg-white shadow">
          <h2 className="text-xl font-semibold text-blue-500">👨‍🏫 Giảng viên</h2>
          <p className="text-gray-600 mt-2">
            Quản lý nội dung bài giảng, giao bài tập và theo dõi tiến độ học viên.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow">
          <h2 className="text-xl font-semibold text-green-500">🎓 Học viên</h2>
          <p className="text-gray-600 mt-2">
            Tham gia khóa học, làm bài tập, nhận phản hồi từ giảng viên.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow">
          <h2 className="text-xl font-semibold text-purple-500">🛠️ Quản trị viên</h2>
          <p className="text-gray-600 mt-2">
            Điều hành hệ thống, phân quyền và quản lý người dùng.
          </p>
        </div>
      </section>
    </main>
  )
}
