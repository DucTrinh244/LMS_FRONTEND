import CourseDetailContent from '~/module/landing/components/CourseDetailContent'
import MainLayout from '~/layouts/MainLayout'

const CourseDetailPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <CourseDetailContent />
      </div>
    </MainLayout>
  )
}

export default CourseDetailPage