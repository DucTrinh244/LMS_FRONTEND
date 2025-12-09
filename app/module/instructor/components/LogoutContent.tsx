import { LogOut, AlertTriangle } from 'lucide-react'
import { useAuth } from '~/context/authContext'
import { useNavigate } from 'react-router'
import { useToast } from '~/shared/hooks/useToast'

const LogoutContent = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500/20 rounded-full">
            <AlertTriangle className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Logout Confirmation</h2>
        <p className="text-slate-300 mb-2">
          Are you sure you want to logout, <span className="font-semibold text-violet-400">{user?.fullName}</span>?
        </p>
        <p className="text-slate-400 text-sm mb-8">
          You will need to login again to access your instructor dashboard.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Yes, Logout
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutContent
