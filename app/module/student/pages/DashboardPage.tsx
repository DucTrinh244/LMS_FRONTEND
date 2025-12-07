import DashboardHero from '~/module/student/components/DashboardHero'
import StudentDashboard from '~/module/student/components/StudentDashboard'
import Footer from '~/shared/components/ui/Footer'
import Header from '~/shared/components/ui/Header'
import { StudentRoute } from '~/shared/components/auth/RouteGuard'

// ==================== MAIN APP ====================
export default function Dashboard() {
  return (
    <StudentRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="pt-20">
          <DashboardHero />
          <StudentDashboard />
        </main>
        <Footer />
      </div>
    </StudentRoute>
  )
}