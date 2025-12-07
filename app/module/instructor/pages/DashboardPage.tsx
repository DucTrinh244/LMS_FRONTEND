import DashboardHeroInstructor from '~/module/instructor/components/DashboardHero'
import InstructorDashboard from '~/module/instructor/components/InstructorDashboard'
import Header from '~/shared/components/ui/Header'
import { InstructorRoute } from '~/shared/components/auth/RouteGuard'

const DashboardPage = () => {
  return (
    <InstructorRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="pt-20">
          <DashboardHeroInstructor />
          <InstructorDashboard />
        </main>
      </div>
    </InstructorRoute>
  )
}

export default DashboardPage