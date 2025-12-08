import InstructorProfile from '~/module/landing/components/InstructorDetailContent'
import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'

const InstructorDetailPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Chi tiết giảng viên"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Instructors", href: "/instructors" },
            { label: "Detail", href: "/instructor/detail" }
          ]}
        />
        <InstructorProfile />
      </div>
    </MainLayout>
  )
}

export default InstructorDetailPage