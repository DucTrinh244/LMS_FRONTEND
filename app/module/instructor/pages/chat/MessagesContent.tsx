import ChatInterface from '~/module/instructor/components/chat/ChatInterface'

const MessagesContent = () => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden">
      <div className="h-[600px]">
        <ChatInterface
          instructorId="instructor-1"
          className="h-full"
        />
      </div>
    </div>
  )
}

export default MessagesContent