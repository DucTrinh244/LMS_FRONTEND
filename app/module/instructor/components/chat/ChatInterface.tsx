import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useActiveConversation, useChat, useConversations, useMessages } from '~/module/instructor/hooks/useChat'
import type { ChatFilters, Conversation, User } from '~/module/instructor/types/Chat'
import { useAuth } from '~/shared/hooks/useAuth'
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog'
import AddMemberModal from './AddMemberModal'
import ConversationList from './ConversationList'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import NewConversationModal from './NewConversationModal'

interface ChatInterfaceProps {
  userId?: string
  userRole?: 'instructor' | 'student'
  className?: string
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  userId,
  userRole = 'instructor',
  className = ''
}) => {
  // Backward compatibility
  const instructorId = userId
  const { confirm } = useConfirmDialog()
  const queryClient = useQueryClient()
  const { user: authUser } = useAuth()
  const [filters, setFilters] = useState<ChatFilters>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  // Get current user ID - prioritize auth context, then fallback to props
  // Also try to find current user in group members if available
  const getCurrentUserId = () => {
    // First priority: auth context
    if (authUser?.id) {
      return authUser.id
    }

    // Note: activeConversation is not available here yet, so we skip this check
    // It will be handled when conversation is loaded

    // Fallback to props
    return userId || instructorId || 'current-user'
  }

  const currentUserId = getCurrentUserId()

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
  // Available users - empty by default, should be fetched from API if needed
  const [availableUsers] = useState<User[]>([])

  // State to store conversation with members
  const [conversationWithMembers, setConversationWithMembers] = React.useState<Conversation | null>(null)
  const previousGroupIdRef = React.useRef<string | null>(null)
  const currentGroupIdRef = React.useRef<string | null>(null) // Track current group for rejoin after reconnect

  // Get active conversation data
  const baseConversation = conversations.find(c => c.id === activeConversationId)
  const activeConversation = conversationWithMembers || baseConversation
  const messages = messagesData?.messages || []

  // Leave previous group when switching conversations - DISABLED
  // User will stay in all groups they've joined, no automatic leaving
  React.useEffect(() => {
    // Just update refs without leaving previous group
    previousGroupIdRef.current = activeConversationId && activeConversation?.type === 'group' ? activeConversationId : null
    // Update current group ref for rejoin after reconnect
    currentGroupIdRef.current = activeConversationId && activeConversation?.type === 'group' ? activeConversationId : null
  }, [activeConversationId, activeConversation])

  // Rejoin group after SignalR reconnects
  React.useEffect(() => {
    const rejoinGroupAfterReconnect = async () => {
      const { signalRChatService } = await import('~/module/instructor/services/SignalRChatService')

      // Subscribe to connection state changes
      const unsubscribe = signalRChatService.onConnectionStateChanged(async (isConnected: boolean) => {
        if (isConnected && currentGroupIdRef.current) {
          // SignalR just reconnected and we have an active group
          try {
            console.log('🔄 SignalR reconnected, rejoining group:', currentGroupIdRef.current)
            if (signalRChatService.getConnectionState()) {
              await signalRChatService.joinGroup(currentGroupIdRef.current)
              console.log('✅ Successfully rejoined group after reconnect:', currentGroupIdRef.current)
            }
          } catch (error: any) {
            // Handle errors gracefully - user might not be a member anymore
            const errorMessage = error?.message || ''
            if (errorMessage.includes('not found') || errorMessage.includes('not a member') || errorMessage.includes('HubException')) {
              console.log('ℹ️ User is not a member of the group anymore, clearing group ref:', currentGroupIdRef.current)
              currentGroupIdRef.current = null
              // Optionally refresh conversations to update UI
              queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] })
            } else {
              console.error('❌ Error rejoining group after reconnect:', error)
            }
          }
        }
      })

      // Also check immediately if already connected and we have a group
      if (signalRChatService.getConnectionState() && currentGroupIdRef.current) {
        try {
          console.log('🔗 SignalR already connected, ensuring group membership:', currentGroupIdRef.current)
          await signalRChatService.joinGroup(currentGroupIdRef.current)
          console.log('✅ Ensured group membership:', currentGroupIdRef.current)
        } catch (error: any) {
          // Handle errors gracefully
          const errorMessage = error?.message || ''
          if (errorMessage.includes('not found') || errorMessage.includes('not a member') || errorMessage.includes('HubException')) {
            console.log('ℹ️ User is not a member of the group, clearing group ref:', currentGroupIdRef.current)
            currentGroupIdRef.current = null
          } else {
            console.error('❌ Error ensuring group membership:', error)
          }
        }
      }

      return unsubscribe
    }

    const cleanup = rejoinGroupAfterReconnect()
    return () => {
      cleanup.then(unsubscribe => unsubscribe?.())
    }
  }, []) // Only run once on mount

  // Load conversation members when conversation is selected
  React.useEffect(() => {
    if (activeConversationId && baseConversation?.type === 'group') {
      // Fetch group members
      const loadGroupMembers = async () => {
        try {
          const { chatService } = await import('~/module/instructor/services/ChatApi')
          const members = await chatService.getGroupMembers(activeConversationId)

          // Map members to User format
          const participants: User[] = members.map(member => ({
            id: member.userId,
            name: member.fullName,
            email: member.email,
            role: member.isAdmin ? 'instructor' : 'student',
            avatar: member.avatarUrl || undefined,
            isOnline: false // Will be updated if we have online status API
          }))

          // Update conversation with members
          setConversationWithMembers({
            ...baseConversation,
            participants
          })
        } catch (error) {
          console.error('Error loading group members:', error)
          // Keep base conversation if loading fails
          setConversationWithMembers(null)
        }
      }

      loadGroupMembers()
    } else {
      // Reset when conversation changes or is not a group
      setConversationWithMembers(null)
    }
  }, [activeConversationId, baseConversation, currentUserId, authUser])

  // Update participants when new messages arrive (to handle senders not in participants list)
  React.useEffect(() => {
    if (activeConversation && messages.length > 0 && activeConversation.type === 'group') {
      // Find all unique senderIds from messages
      const messageSenders = new Set(messages.map(m => m.senderId).filter(Boolean))

      // Check if any sender is missing from participants
      const missingSenders = Array.from(messageSenders).filter(
        (senderId: string) => !activeConversation.participants.some((p: User) => p.id === senderId)
      )

      if (missingSenders.length > 0) {
        // Reload group members to get missing senders
        const loadMissingMembers = async () => {
          try {
            const { chatService } = await import('~/module/instructor/services/ChatApi')
            const members = await chatService.getGroupMembers(activeConversationId || '')

            // Map members to User format
            const participants: User[] = members.map(member => ({
              id: member.userId,
              name: member.fullName,
              email: member.email,
              role: member.isAdmin ? 'instructor' : 'student',
              avatar: member.avatarUrl || undefined,
              isOnline: false
            }))

            // Update conversation with all members
            setConversationWithMembers((prev: Conversation | null) => prev ? {
              ...prev,
              participants
            } : null)
          } catch (error) {
            console.error('Error reloading group members:', error)
          }
        }

        loadMissingMembers()
      }
    }
  }, [messages, activeConversation, activeConversationId])

  // Handlers
  const handleSelectConversation = async (conversationId: string) => {
    selectConversation(conversationId)

    // Pre-load group members if it's a group conversation
    const selectedConversation = conversations.find(c => c.id === conversationId)
    if (selectedConversation?.type === 'group') {
      // Join SignalR group to receive real-time messages
      try {
        const { signalRChatService } = await import('~/module/instructor/services/SignalRChatService')
        if (signalRChatService.getConnectionState()) {
          console.log('🔗 Joining SignalR group:', conversationId)
          await signalRChatService.joinGroup(conversationId)
          console.log('✅ Successfully joined SignalR group:', conversationId)
          // Update current group ref for rejoin after reconnect
          currentGroupIdRef.current = conversationId
        } else {
          console.warn('⚠️ SignalR not connected, cannot join group')
          // Still update ref so we can join when it reconnects
          currentGroupIdRef.current = conversationId
        }
      } catch (error: any) {
        // Handle errors gracefully
        const errorMessage = error?.message || ''
        if (errorMessage.includes('not found') || errorMessage.includes('not a member') || errorMessage.includes('HubException')) {
          console.log('ℹ️ User is not a member of the group, refreshing conversations:', conversationId)
          // Refresh conversations to update UI (group might have been removed)
          queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] })
          currentGroupIdRef.current = null
        } else {
          console.error('❌ Error joining SignalR group:', error)
        }
      }

      // Load group members
      try {
        const { chatService } = await import('~/module/instructor/services/ChatApi')
        const members = await chatService.getGroupMembers(conversationId)

        const participants: User[] = members.map(member => ({
          id: member.userId,
          name: member.fullName,
          email: member.email,
          role: member.isAdmin ? 'instructor' : 'student',
          avatar: member.avatarUrl || undefined,
          isOnline: false
        }))

        setConversationWithMembers({
          ...selectedConversation,
          participants
        })
      } catch (error) {
        console.error('Error pre-loading group members:', error)
      }
    }

    // Mark conversation as read
    try {
      await markAsRead(conversationId)
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleSendMessage = async (data: any) => {
    if (!activeConversationId || !activeConversation) return

    // Determine if it's a group or private conversation
    const isGroup = activeConversation.type === 'group'


    await sendMessage({
      ...data,
      conversationId: activeConversationId,
      groupId: isGroup ? activeConversationId : undefined,
      // For private messages, we need the other participant's ID
      recipientId: !isGroup
        ? activeConversation.participants.find((p: User) => p.role !== userRole)?.id
        : undefined
    })
  }

  const handleDeleteMessage = async (messageId: string) => {
    const ok = await confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')
    if (ok) {
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

  const handleCreateConversation = async (groupId: string) => {
    // Group đã được tạo, cần refresh conversations và select
    try {
      // Fetch group info ngay để thêm vào cache
      try {
        const { chatService } = await import('~/module/instructor/services/ChatApi')
        const groups = await chatService.getMyGroups()
        const newGroup = groups.find(g => g.id === groupId)

        if (newGroup) {
          // Thêm group vào cache ngay lập tức
          queryClient.setQueryData(
            ['chat', 'conversations'],
            (old: Conversation[] | undefined) => {
              // Kiểm tra xem group đã có trong cache chưa
              const exists = old?.some(conv => conv.id === groupId)
              if (exists) {
                return old // Đã có rồi, không cần thêm
              }

              // Map group thành conversation format
              const newConversation: Conversation = {
                id: newGroup.id,
                title: newGroup.name,
                type: 'group',
                participants: [], // Sẽ được load khi select
                unreadCount: 0,
                createdAt: newGroup.lastMessageAt,
                updatedAt: newGroup.lastMessageAt,
                isArchived: false,
                name: newGroup.name,
                description: newGroup.description || undefined,
                ownerId: newGroup.ownerId,
                isPrivate: newGroup.isPrivate,
                lastMessageAt: newGroup.lastMessageAt,
                memberCount: newGroup.memberCount
              }

              // Thêm vào đầu danh sách
              return [newConversation, ...(old || [])]
            }
          )
        }
      } catch (error) {
        console.error('Error fetching group info:', error)
      }

      // Refetch conversations để đảm bảo có đầy đủ thông tin
      await queryClient.refetchQueries({ queryKey: ['chat', 'conversations'] })

      // Auto-select the new conversation
      selectConversation(groupId)

      // Join SignalR group để nhận real-time messages
      try {
        const { signalRChatService } = await import('~/module/instructor/services/SignalRChatService')
        if (signalRChatService.getConnectionState()) {
          console.log('🔗 Joining newly created SignalR group:', groupId)
          await signalRChatService.joinGroup(groupId)
          console.log('✅ Successfully joined newly created SignalR group')
          // Update current group ref for rejoin after reconnect
          currentGroupIdRef.current = groupId
        } else {
          // Still update ref so we can join when it reconnects
          currentGroupIdRef.current = groupId
        }
      } catch (error: any) {
        // Handle errors gracefully (though this should rarely happen for newly created groups)
        const errorMessage = error?.message || ''
        if (errorMessage.includes('not found') || errorMessage.includes('not a member') || errorMessage.includes('HubException')) {
          console.log('ℹ️ Could not join newly created group, will retry on reconnect:', groupId)
          // Still update ref so we can join when it reconnects
          currentGroupIdRef.current = groupId
        } else {
          console.error('❌ Error joining SignalR group after creation:', error)
        }
      }
    } catch (error) {
      console.error('Error refreshing conversations after group creation:', error)
      // Vẫn select conversation ngay cả khi refetch fail
      selectConversation(groupId)
    }

    setShowNewConversationModal(false)
  }

  const handleAddMembers = async (emails: string[]) => {
    if (!activeConversationId || !activeConversation || activeConversation.type !== 'group') {
      return
    }

    const { chatService } = await import('~/module/instructor/services/ChatApi')
    await chatService.addUsersToGroupByEmail(activeConversationId, emails)

    // Refresh conversations to update member count
    queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] })
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
            {userRole === 'instructor' && (
              <button
                onClick={() => setShowNewConversationModal(true)}
                className="p-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-colors flex items-center space-x-2"
                title="Tạo cuộc trò chuyện mới"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm hidden sm:inline">Mới</span>
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${filters.hasUnread
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 border-violet-600 text-white'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
            >
              Chưa đọc
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, isArchived: prev.isArchived ? undefined : false }))}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${filters.isArchived === false
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 border-violet-600 text-white'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
            >
              Hoạt động
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div
          className="flex-1 overflow-y-auto p-4"
          onScroll={(e) => {
            // Prevent scroll event from bubbling
            e.stopPropagation()
          }}
        >
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
                      .filter((p: User) => p.role !== userRole)
                      .slice(0, 2)
                      .map((participant: User, index: number) => (
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
                  <div className="flex-1">
                    <div>
                      <h3 className="font-medium text-white">
                        {activeConversation.title ||
                          activeConversation.participants
                            .filter((p: User) => p.role !== userRole)
                            .map((p: User) => p.name)
                            .join(', ')
                        }
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-400">
                        {activeConversation.type === 'group' && activeConversation.memberCount !== undefined
                          ? `${activeConversation.memberCount} thành viên`
                          : `${activeConversation.participants.length} thành viên`
                        }
                        {activeConversation.courseName && (
                          <> • 📚 {activeConversation.courseName}</>
                        )}
                      </p>
                      {/* Add Member button - only for groups, next to member count */}
                      {activeConversation.type === 'group' && userRole === 'instructor' && (
                        <button
                          onClick={() => setShowAddMemberModal(true)}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-violet-400 hover:bg-slate-700/50 rounded transition-colors"
                          title="Thêm thành viên"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Add member</span>
                        </button>
                      )}
                    </div>
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
              currentUserId={currentUserId}
              isLoading={loadingMessages}
              onDeleteMessage={handleDeleteMessage}
              conversationId={activeConversationId || undefined}
            />

            {/* Message Input */}
            <MessageInput
              conversationId={activeConversationId || ''}
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
        availableStudents={availableUsers}
        isCreating={isCreatingConversation}
        userRole={userRole}
      />

      {/* Add Member Modal - only show when group conversation is active */}
      {activeConversation && activeConversation.type === 'group' && activeConversationId && userRole === 'instructor' && (
        <AddMemberModal
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onAddMembers={handleAddMembers}
          groupId={activeConversationId}
        />
      )}
    </div>
  )
}

export default ChatInterface
