import React, { useState } from 'react'
import ConversationList from './ConversationList'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import NewConversationModal from './NewConversationModal'
import { useConversations, useMessages, useChat, useActiveConversation } from '~/module/instructor/hooks/useChat'
import type { ChatFilters, User } from '~/module/instructor/types/Chat'

interface ChatInterfaceProps {
  instructorId?: string
  className?: string
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  instructorId, 
  className = '' 
}) => {
  const [filters, setFilters] = useState<ChatFilters>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  
  // Chat hooks
  const { activeConversationId, selectConversation } = useActiveConversation()
  const { sendMessage, markAsRead, deleteMessage, createConversation, isSending, isCreatingConversation } = useChat()
  
  // Data hooks
  const { 
    data: conversations = [], 
    isLoading: loadingConversations 
  } = useConversations(filters)
  
  const { 
    data: messagesData, 
    isLoading: loadingMessages 
  } = useMessages(activeConversationId || '', !!activeConversationId)

  // Mock available students (in real app, this would come from API)
  const [availableStudents] = useState<User[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'student1@example.com',
      role: 'student',
      isOnline: true
    },
    {
      id: '2', 
      name: 'Trần Thị B',
      email: 'student2@example.com',
      role: 'student',
      isOnline: false,
      lastSeen: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Lê Văn C', 
      email: 'student3@example.com',
      role: 'student',
      isOnline: true
    }
  ])

  // Get active conversation data
  const activeConversation = conversations.find(c => c.id === activeConversationId)
  const messages = messagesData?.messages || []

  // Handlers
  const handleSelectConversation = async (conversationId: string) => {
    selectConversation(conversationId)
    
    // Mark conversation as read
    try {
      await markAsRead(conversationId)
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleSendMessage = async (data: any) => {
    if (!activeConversationId) return
    
    await sendMessage({
      ...data,
      conversationId: activeConversationId
    })
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
      await deleteMessage(messageId)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setFilters(prev => ({
      ...prev,
      search: term || undefined
    }))
  }

  const handleCreateConversation = async (data: any) => {
    const conversation = await createConversation(data)
    
    // Auto-select the new conversation
    if (conversation && conversation.id) {
      selectConversation(conversation.id)
    }
    
    setShowNewConversationModal(false)
  }

  const filteredConversations = conversations.filter(conv => {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
    const title = conv.title?.toLowerCase() || ''
    const lastMessageContent = conv.lastMessage?.content?.toLowerCase() || ''
    const participantNames = conv.participants
      .map(p => p.name.toLowerCase())
      .join(' ')
    
    return title.includes(searchLower) || 
           lastMessageContent.includes(searchLower) || 
           participantNames.includes(searchLower)
  })

  return (
    <div className={`flex h-full bg-slate-900 rounded-xl overflow-hidden ${className}`}>
      {/* Left Sidebar - Conversations */}
      <div className="w-1/3 border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Tin nhắn</h2>
            <button
              onClick={() => setShowNewConversationModal(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              title="Tạo cuộc trò chuyện mới"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm hidden sm:inline">Mới</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg 
              className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filters */}
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => setFilters(prev => ({ ...prev, hasUnread: prev.hasUnread ? undefined : true }))}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.hasUnread 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-slate-600 text-slate-400 hover:border-slate-500'
              }`}
            >
              Chưa đọc
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, isArchived: prev.isArchived ? undefined : false }))}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.isArchived === false 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-slate-600 text-slate-400 hover:border-slate-500'
              }`}
            >
              Hoạt động
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          <ConversationList
            conversations={filteredConversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            isLoading={loadingConversations}
          />
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Conversation Avatar */}
                  <div className="flex -space-x-2">
                    {activeConversation.participants
                      .filter(p => p.role !== 'instructor')
                      .slice(0, 2)
                      .map((participant, index) => (
                        <div 
                          key={participant.id}
                          className="w-10 h-10 rounded-full overflow-hidden bg-slate-600 border-2 border-slate-800 flex items-center justify-center relative"
                        >
                          {participant.avatar ? (
                            <img 
                              src={participant.avatar} 
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-white">
                              {participant.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                          
                          {participant.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                  
                  {/* Conversation Info */}
                  <div>
                    <h3 className="font-medium text-white">
                      {activeConversation.title || 
                       activeConversation.participants
                         .filter(p => p.role !== 'instructor')
                         .map(p => p.name)
                         .join(', ')
                      }
                    </h3>
                    
                    <p className="text-sm text-slate-400">
                      {activeConversation.participants.length} thành viên
                      {activeConversation.courseName && (
                        <> • 📚 {activeConversation.courseName}</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Chat Actions */}
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Tùy chọn"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <MessageList
              messages={messages}
              participants={activeConversation.participants}
              currentUserId={instructorId || 'current-instructor'}
              isLoading={loadingMessages}
              onDeleteMessage={handleDeleteMessage}
            />

            {/* Message Input */}
            <MessageInput
              conversationId={activeConversationId}
              onSendMessage={handleSendMessage}
              isSending={isSending}
            />
          </>
        ) : (
          /* No conversation selected */
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium mb-1">Chọn cuộc trò chuyện</h3>
              <p className="text-sm">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
            </div>
          </div>
        )}
      </div>

      {/* New Conversation Modal */}
      <NewConversationModal
        isOpen={showNewConversationModal}
        onClose={() => setShowNewConversationModal(false)}
        onCreateConversation={handleCreateConversation}
        availableStudents={availableStudents}
        isCreating={isCreatingConversation}
      />
    </div>
  )
}

export default ChatInterface
