import ChatInterface from '~/module/instructor/components/chat/ChatInterface'

const MessagesContent = () => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden">
      <div className="h-[calc(100vh-12rem)]">
        <ChatInterface
          userId="instructor-1"
          userRole="instructor"
          className="h-full"
        />
      </div>
    </div>
  )
}

export default MessagesContent