import QuizAttemptDetailContent from './QuizAttemptDetailContent'
import { StudentRoute } from '~/shared/components/auth/RouteGuard'
import Header from '~/shared/components/ui/Header'
import Footer from '~/shared/components/ui/Footer'

const QuizAttemptDetailPage = () => {
  return (
    <StudentRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="pt-20">
          <QuizAttemptDetailContent />
        </main>
        <Footer />
      </div>
    </StudentRoute>
  )
}

export default QuizAttemptDetailPage

