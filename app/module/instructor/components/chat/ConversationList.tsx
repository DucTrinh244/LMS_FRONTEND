import React from 'react'
import type { Conversation, User } from '~/module/instructor/types/Chat'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

interface ConversationListProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (conversationId: string) => void
  isLoading?: boolean
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50">
              <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                <div className="h-3 bg-slate-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-sm">Chưa có cuộc trò chuyện nào</p>
        <p className="text-xs mt-1">Bắt đầu cuộc trò chuyện với học viên của bạn</p>
      </div>
    )
  }

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.title) return conversation.title
    
    // For direct messages, show the other participant's name
    if (conversation.type === 'direct' && conversation.participants.length === 2) {
      const otherParticipant = conversation.participants.find(p => p.role !== 'instructor')
      return otherParticipant?.name || 'Cuộc trò chuyện'
    }
    
    return `Nhóm (${conversation.participants.length} thành viên)`
  }

  const getLastMessagePreview = (conversation: Conversation) => {
    if (!conversation.lastMessage) return 'Chưa có tin nhắn'
    
    const { content, messageType, senderId } = conversation.lastMessage
    const sender = conversation.participants.find(p => p.id === senderId)
    const senderName = sender?.name || 'Không rõ'
    
    if (messageType === 'image') return `${senderName}: 📷 Hình ảnh`
    if (messageType === 'file') return `${senderName}: 📎 Tệp đính kèm`
    
    return `${senderName}: ${content.length > 50 ? content.substring(0, 50) + '...' : content}`
  }

  const getParticipantAvatars = (participants: User[]) => {
    // Show first 3 participants (excluding current instructor)
    const otherParticipants = participants.filter(p => p.role !== 'instructor').slice(0, 3)
    
    return (
      <div className="relative">
        {otherParticipants.length === 1 ? (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-600 flex items-center justify-center">
            {otherParticipants[0].avatar ? (
              <img 
                src={otherParticipants[0].avatar} 
                alt={otherParticipants[0].name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-white">
                {otherParticipants[0].name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        ) : (
          <div className="flex -space-x-2">
            {otherParticipants.map((participant, index) => (
              <div 
                key={participant.id}
                className="w-8 h-8 rounded-full overflow-hidden bg-slate-600 border-2 border-slate-800 flex items-center justify-center"
              >
                {participant.avatar ? (
                  <img 
                    src={participant.avatar} 
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-white">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Online indicator */}
        {otherParticipants.length === 1 && otherParticipants[0].isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className={`
            flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
            hover:bg-slate-700/50 
            ${activeConversationId === conversation.id 
              ? 'bg-blue-600/20 border border-blue-500/30' 
              : 'hover:bg-slate-700/30'
            }
          `}
        >
          {/* Avatar(s) */}
          {getParticipantAvatars(conversation.participants)}
          
          {/* Conversation Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className={`
                text-sm font-medium truncate
                ${activeConversationId === conversation.id ? 'text-blue-400' : 'text-white'}
              `}>
                {getConversationTitle(conversation)}
              </h3>
              
              {conversation.lastMessage && (
                <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { 
                    addSuffix: true, 
                    locale: vi 
                  })}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-slate-400 truncate pr-2">
                {getLastMessagePreview(conversation)}
              </p>
              
              {/* Unread count */}
              {conversation.unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center flex-shrink-0">
                  {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                </span>
              )}
            </div>
            
            {/* Course tag */}
            {conversation.courseName && (
              <div className="mt-1">
                <span className="inline-block bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded">
                  📚 {conversation.courseName}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConversationList
