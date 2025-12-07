import CourseGridPage from '~/module/landing/components/courseContent'
import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'

const CoursePage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Tất cả khóa học"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
            { label: "List" }
          ]}
        />
        <CourseGridPage />
      </div>
    </MainLayout>
  )
}

export default CoursePage