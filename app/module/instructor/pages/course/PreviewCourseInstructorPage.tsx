import PreviewCourseInstructor from './PreviewCourseInstructor'
import { InstructorRoute } from '~/shared/components/auth/RouteGuard'
import Header from '~/shared/components/ui/Header'
import Footer from '~/shared/components/ui/Footer'

const PreviewCourseInstructorPage = () => {
  return (
    <InstructorRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main>
          <PreviewCourseInstructor />
        </main>
        <Footer />
      </div>
    </InstructorRoute>
  )
}

export default PreviewCourseInstructorPage

