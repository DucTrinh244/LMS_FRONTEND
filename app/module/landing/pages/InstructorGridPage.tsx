import InstructorContent from '~/module/landing/components/InstructorContent'
import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'

const InstructorGridPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Tất cả giảng viên"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Instructor", href: "/instructors" },
            { label: "List" }
          ]}
        />
        <InstructorContent />
      </div>
    </MainLayout>
  )
}

export default InstructorGridPage