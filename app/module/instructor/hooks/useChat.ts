import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { chatService } from '~/module/instructor/services/ChatApi'
import { signalRChatService } from '~/module/instructor/services/SignalRChatService'
import type {
  ChatFilters,
  Conversation,
  CreateConversationRequest,
  Message,
  SendMessageRequest
} from '~/module/instructor/types/Chat'
import { useAuth } from '~/shared/hooks/useAuth'
import { useToast } from '~/shared/hooks/useToast'

const CHAT_QUERY_KEYS = {
  conversations: ['chat', 'conversations'],
  messages: (conversationId: string) => ['chat', 'messages', conversationId],
  onlineUsers: ['chat', 'online-users']
}


export function useConversations(filters?: ChatFilters) {
  return useQuery({
    queryKey: [...CHAT_QUERY_KEYS.conversations, filters],
    queryFn: async () => {
      return chatService.getConversations(filters)
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    // refetchInterval: false,
    retry: 2
  })
}

export function useMessages(conversationId: string, enabled = true) {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(conversationId),
    queryFn: async () => {
      return chatService.getMessages(conversationId)
    },
    enabled: !!conversationId && enabled,
    staleTime: 10 * 1000,
    refetchInterval: 5 * 1000,
    // refetchInterval: false,
    retry: 2
  })
}

export function useChat() {
  const { toast } = useToast()
  const { user: authUser } = useAuth()
  const queryClient = useQueryClient()
  const signalRConnectedRef = useRef(false)
  const currentUserId = authUser?.id

  // Connect to SignalR on mount
  useEffect(() => {
    if (!signalRConnectedRef.current) {
      signalRChatService.connect()
        .then(() => {
          signalRConnectedRef.current = true

          // Setup real-time message handlers
          signalRChatService.onPrivateMessage((message) => {
            const conversationId = message.conversationId || ''
            queryClient.setQueryData(
              CHAT_QUERY_KEYS.messages(conversationId),
              (old: any) => {
                const existingMessages = old?.messages || []

                // FIRST: Check if message with same ID already exists (prevent duplicates)
                const existingMessageById = existingMessages.find(
                  (msg: Message) => msg.id === message.id
                )

                if (existingMessageById) {
                  console.log('⚠️ Private message already exists with id:', message.id, '- SKIPPING DUPLICATE')
                  return old // Don't add duplicate
                }

                // SECOND: Check if there's a temp message from current user that should be replaced
                const isOwnMessage = message.senderId === currentUserId || message.senderId === 'current-user'
                const tempMessageIndex = existingMessages.findIndex(
                  (msg: Message) =>
                    msg.id.startsWith('temp-') &&
                    (msg.senderId === 'current-user' || msg.senderId === currentUserId) &&
                    msg.conversationId === conversationId &&
                    isOwnMessage // Only replace if this is our own message
                )

                if (tempMessageIndex !== -1) {
                  console.log('📨 Replacing temp private message at index:', tempMessageIndex)
                  // Replace temp message with real message from server
                  const tempMessage = existingMessages[tempMessageIndex]
                  const finalMessage: Message = {
                    ...message,
                    content: message.content || tempMessage.content || ''
                  }
                  const newMessages = [...existingMessages]
                  newMessages[tempMessageIndex] = finalMessage
                  return {
                    ...old,
                    messages: newMessages
                  }
                } else {
                  console.log('📨 Adding new private message to list')
                  // No temp message found, add new message
                  return {
                    ...old,
                    messages: [...existingMessages, message]
                  }
                }
              }
            )

            queryClient.setQueryData(
              CHAT_QUERY_KEYS.conversations,
              (old: Conversation[] | undefined) =>
                old?.map(conv =>
                  conv.id === (message.conversationId || '')
                    ? { ...conv, lastMessage: message, updatedAt: message.sentAt }
                    : conv
                )
            )
          })

          signalRChatService.onGroupMessage((message) => {
            console.log('📨 Received group message from SignalR:', {
              id: message.id,
              senderId: message.senderId,
              content: message.content,
              chatGroupId: message.chatGroupId,
              conversationId: message.conversationId,
              currentUserId
            })

            // Use chatGroupId as primary identifier for group messages
            const conversationId = message.conversationId || message.chatGroupId || ''
            console.log('📨 Processing message for conversationId:', conversationId)

            queryClient.setQueryData(
              CHAT_QUERY_KEYS.messages(conversationId),
              (old: any) => {
                const existingMessages = old?.messages || []
                console.log('📨 Existing messages count:', existingMessages.length)

                // FIRST: Check if message with same ID already exists (prevent duplicates)
                const existingMessageById = existingMessages.find(
                  (msg: Message) => msg.id === message.id
                )

                if (existingMessageById) {
                  console.log('⚠️ Message already exists with id:', message.id, '- SKIPPING DUPLICATE')
                  return old // Don't add duplicate
                }

                // SECOND: Check if there's a temp message from current user that should be replaced
                // Temp messages have senderId === 'current-user' OR senderId === currentUserId
                // Only replace if this message is from current user
                const isOwnMessage = message.senderId === currentUserId

                if (isOwnMessage) {
                  // Try to find temp message to replace
                  // Match by: temp ID, same sender, same group/conversation
                  const tempMessageIndex = existingMessages.findIndex(
                    (msg: Message) => {
                      const isTemp = msg.id.startsWith('temp-')
                      const isFromCurrentUser = msg.senderId === 'current-user' || msg.senderId === currentUserId
                      const sameGroup =
                        (msg.chatGroupId && msg.chatGroupId === message.chatGroupId) ||
                        (msg.conversationId && msg.conversationId === conversationId) ||
                        (msg.chatGroupId && msg.chatGroupId === conversationId) ||
                        (msg.conversationId && msg.conversationId === message.chatGroupId)

                      return isTemp && isFromCurrentUser && sameGroup
                    }
                  )

                  if (tempMessageIndex !== -1) {
                    console.log('📨 Replacing temp message at index:', tempMessageIndex)
                    // Replace temp message with real message from server
                    const tempMessage = existingMessages[tempMessageIndex]
                    const finalMessage: Message = {
                      ...message,
                      content: message.content || tempMessage.content || ''
                    }
                    const newMessages = [...existingMessages]
                    newMessages[tempMessageIndex] = finalMessage
                    console.log('📨 Updated messages count:', newMessages.length)
                    return {
                      ...old,
                      messages: newMessages
                    }
                  }
                }

                // No temp message found or not own message, add new message
                console.log('📨 Adding new message to list (not duplicate, not temp replacement)')
                const newMessages = [...existingMessages, message]
                console.log('📨 New messages count:', newMessages.length)
                return {
                  ...old,
                  messages: newMessages
                }
              }
            )

            queryClient.setQueryData(
              CHAT_QUERY_KEYS.conversations,
              (old: Conversation[] | undefined) =>
                old?.map(conv =>
                  conv.id === conversationId
                    ? { ...conv, lastMessage: message, updatedAt: message.sentAt }
                    : conv
                )
            )
          })

          // Handle group created event
          signalRChatService.onGroupCreated((group: any) => {
            console.log('📨 Received GroupCreated event from SignalR:', group)

            // Check if group already exists in cache
            queryClient.setQueryData(
              CHAT_QUERY_KEYS.conversations,
              (old: Conversation[] | undefined) => {
                const exists = old?.some(conv => conv.id === group.id)
                if (exists) {
                  console.log('⚠️ Group already exists in cache:', group.id)
                  return old // Already exists, don't add duplicate
                }

                // Map group to conversation format
                const newConversation: Conversation = {
                  id: group.id,
                  title: group.name || group.title,
                  type: 'group',
                  participants: [], // Will be loaded when selected
                  unreadCount: 0,
                  createdAt: group.lastMessageAt || group.createdAt || new Date().toISOString(),
                  updatedAt: group.lastMessageAt || group.updatedAt || new Date().toISOString(),
                  isArchived: false,
                  name: group.name,
                  description: group.description || undefined,
                  ownerId: group.ownerId,
                  isPrivate: group.isPrivate || false,
                  lastMessageAt: group.lastMessageAt,
                  memberCount: group.memberCount || 0
                }

                console.log('✅ Adding new group to conversations cache:', newConversation)
                // Add to beginning of list
                return [newConversation, ...(old || [])]
              }
            )
          })

          // Handle user joined group event
          signalRChatService.onUserJoinedGroup((data: { groupId: string; userId: string }) => {
            console.log('👤 User joined group:', data)
            // Optionally refresh group members if this is the current group
            // This will be handled by ChatInterface when needed
          })

          // Handle user left group event
          signalRChatService.onUserLeftGroup((data: { groupId: string; userId: string }) => {
            console.log('👤 User left group:', data)

            // If current user left, refresh conversations to remove the group
            if (data.userId === currentUserId) {
              console.log('⚠️ Current user was removed from group:', data.groupId)
              queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.conversations })
              toast.error('Bạn đã bị xóa khỏi nhóm')
            } else {
              // Another user left, refresh group members if this is the active conversation
              queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.messages(data.groupId) })
            }
          })

          // Handle users added to group event
          signalRChatService.onUsersAddedToGroup((data: { groupId: string; userIds: string[] }) => {
            console.log('👥 Users added to group:', data)
            // Refresh group members if this is the active conversation
            queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.messages(data.groupId) })
          })

          // Handle reconnection - need to rejoin groups
          signalRChatService.onConnectionStateChanged((isConnected: boolean) => {
            if (isConnected) {
              console.log('✅ SignalR reconnected, will rejoin active group if needed')
              // The ChatInterface component will handle rejoining the active group
              // We just need to notify it via a custom event or state
            }
          })
        })
        .catch((error) => {
          console.error('Failed to connect to SignalR:', error)
          toast.error('Không thể kết nối đến chat server')
        })
    }

    return () => {
      // Don't disconnect on unmount - keep connection alive
      // signalRChatService.disconnect()
    }
  }, [queryClient, toast])

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: SendMessageRequest) => {
      // Use SignalR if connected, otherwise fallback to REST API
      if (signalRConnectedRef.current && data.recipientId) {
        await signalRChatService.sendPrivateMessage(data.recipientId, data.content)
        // Message will be received via SignalR event
        return {
          id: `temp-${Date.now()}`,
          senderId: 'current-user',
          content: data.content,
          sentAt: new Date().toISOString(),
          edited: false,
          deleted: false,
          conversationId: data.conversationId,
          chatThreadId: data.conversationId,
          messageType: data.messageType || 'text'
        } as Message
      } else if (signalRConnectedRef.current && data.groupId) {
        console.log('📤 Sending group message via SignalR:', {
          groupId: data.groupId,
          content: data.content,
          conversationId: data.conversationId
        })
        await signalRChatService.sendGroupMessage(data.groupId, data.content)
        console.log('✅ Group message sent via SignalR')
        return {
          id: `temp-${Date.now()}`,
          senderId: 'current-user',
          content: data.content,
          sentAt: new Date().toISOString(),
          edited: false,
          deleted: false,
          conversationId: data.conversationId || data.groupId,
          chatGroupId: data.groupId,
          messageType: data.messageType || 'text'
        } as Message
      }

      // Fallback to REST API
      return chatService.sendMessage(data)
    },
    onSuccess: (newMessage) => {
      // Only add temp messages to cache if:
      // 1. It's a temp message AND SignalR is NOT connected (fallback to REST API)
      // 2. OR it's a real message from REST API (not SignalR)
      // 
      // If SignalR is connected and we sent via SignalR, the message will be received
      // via onGroupMessage/onPrivateMessage handlers, so we don't need to add temp message here

      // For group messages sent via SignalR, don't add temp message - wait for SignalR response
      // For private messages sent via SignalR, don't add temp message - wait for SignalR response
      // Only add temp message if SignalR is not connected (fallback to REST API)
      if (newMessage.id.startsWith('temp-') && signalRConnectedRef.current) {
        // SignalR is connected, message will be received via SignalR handlers
        // Don't add temp message to avoid duplicates
        console.log('📤 Message sent via SignalR, waiting for SignalR response (not adding temp message)')
      } else if (newMessage.id.startsWith('temp-') || !signalRConnectedRef.current) {
        // Add temp message only if SignalR is not connected (REST API fallback)
        const conversationId = newMessage.conversationId || newMessage.chatThreadId || newMessage.chatGroupId || ''

        if (conversationId) {
          queryClient.setQueryData(
            CHAT_QUERY_KEYS.messages(conversationId),
            (old: any) => {
              const existingMessages = old?.messages || []
              // Check if temp message already exists (avoid duplicates)
              const existingTempIndex = existingMessages.findIndex(
                (msg: Message) => msg.id === newMessage.id
              )

              if (existingTempIndex === -1) {
                // Add new message
                return {
                  ...old,
                  messages: [...existingMessages, newMessage]
                }
              } else {
                // Update existing message
                return {
                  ...old,
                  messages: existingMessages.map((msg: Message, idx: number) =>
                    idx === existingTempIndex ? newMessage : msg
                  )
                }
              }
            }
          )

          queryClient.setQueryData(
            CHAT_QUERY_KEYS.conversations,
            (old: Conversation[] | undefined) =>
              old?.map(conv =>
                conv.id === conversationId
                  ? {
                    ...conv,
                    lastMessage: newMessage,
                    updatedAt: newMessage.sentAt || newMessage.createdAt || new Date().toISOString()
                  }
                  : conv
              )
          )
        }
      }

      toast.success('Tin nhắn đã được gửi!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể gửi tin nhắn')
    }
  })

  // Create conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (data: CreateConversationRequest) => {
      return chatService.createConversation(data)
    },
    onSuccess: (newConversation) => {
      queryClient.setQueryData(
        CHAT_QUERY_KEYS.conversations,
        (old: Conversation[] | undefined) => [newConversation, ...(old || [])]
      )
      toast.success('Cuộc trò chuyện mới đã được tạo!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể tạo cuộc trò chuyện')
    }
  })

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (conversationId: string) => {
      return chatService.markAsRead(conversationId)
    },
    onSuccess: (_, conversationId) => {
      queryClient.setQueryData(
        CHAT_QUERY_KEYS.conversations,
        (old: Conversation[] | undefined) =>
          old?.map(conv =>
            conv.id === conversationId
              ? { ...conv, unreadCount: 0 }
              : conv
          )
      )
    }
  })

  // Archive conversation mutation
  const archiveConversationMutation = useMutation({
    mutationFn: async ({ conversationId, isArchived }: { conversationId: string; isArchived: boolean }) => {
      return chatService.toggleArchive(conversationId, isArchived)
    },
    onSuccess: (_, { conversationId, isArchived }) => {
      queryClient.setQueryData(
        CHAT_QUERY_KEYS.conversations,
        (old: Conversation[] | undefined) =>
          old?.map(conv =>
            conv.id === conversationId
              ? { ...conv, isArchived }
              : conv
          )
      )
      toast.success(isArchived ? 'Cuộc trò chuyện đã được lưu trữ' : 'Cuộc trò chuyện đã được khôi phục')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể thay đổi trạng thái lưu trữ')
    }
  })

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return chatService.deleteMessage(messageId)
    },
    onSuccess: (_, messageId) => {
      queryClient.setQueriesData(
        { queryKey: ['chat', 'messages'] },
        (old: any) => ({
          ...old,
          messages: old?.messages?.filter((msg: Message) => msg.id !== messageId) || []
        })
      )
      toast.success('Tin nhắn đã được xóa')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể xóa tin nhắn')
    }
  })

  return {
    // Actions
    sendMessage: sendMessageMutation.mutateAsync,
    createConversation: createConversationMutation.mutateAsync,
    markAsRead: markAsReadMutation.mutateAsync,
    archiveConversation: (conversationId: string, isArchived: boolean) =>
      archiveConversationMutation.mutateAsync({ conversationId, isArchived }),
    deleteMessage: deleteMessageMutation.mutateAsync,

    // Loading states
    isSending: sendMessageMutation.isPending,
    isCreatingConversation: createConversationMutation.isPending,
    isMarkingAsRead: markAsReadMutation.isPending,
    isArchiving: archiveConversationMutation.isPending,
    isDeleting: deleteMessageMutation.isPending,
  }
}

export function useOnlineUsers() {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.onlineUsers,
    queryFn: async () => {
      return chatService.getOnlineUsers()
    },
    refetchInterval: 30 * 1000,
    staleTime: 20 * 1000,
    retry: 2
  })
}

// Custom hook for managing active conversation
export function useActiveConversation() {
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null)

  const selectConversation = (conversationId: string | null) => {
    setActiveConversationId(conversationId)
  }

  return {
    activeConversationId,
    selectConversation
  }
}
