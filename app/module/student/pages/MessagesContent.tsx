import ChatInterface from '~/module/instructor/components/chat/ChatInterface'
import { useAuth } from '~/shared/hooks/useAuth'

const MessagesContent = () => {
  const { user } = useAuth()

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden">
      <div className="h-[calc(100vh-12rem)]">
        <ChatInterface
          userId={user?.id}
          userRole="student"
          className="h-full"
        />
      </div>
    </div>
  )
}

export default MessagesContent