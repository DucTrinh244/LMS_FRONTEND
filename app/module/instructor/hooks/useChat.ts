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
    // COMMENTED FOR SIGNALR TESTING - Disable auto refetch for conversations
    // refetchInterval: 60 * 1000, // Commented out
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
    // COMMENTED FOR SIGNALR TESTING - Disable auto refetch, use SignalR instead
    refetchInterval: false, // Changed from 5 * 1000 to false
    retry: 2
  })
}

export function useChat() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const signalRConnectedRef = useRef(false)

  // Connect to SignalR on mount
  useEffect(() => {
    if (!signalRConnectedRef.current) {
      signalRChatService.connect()
        .then(() => {
          signalRConnectedRef.current = true

          // Setup real-time message handlers
          signalRChatService.onPrivateMessage((message) => {
            queryClient.setQueryData(
              CHAT_QUERY_KEYS.messages(message.conversationId || ''),
              (old: any) => {
                const existingMessages = old?.messages || []
                // Check if there's a temp message from current user that should be replaced
                // Temp messages have senderId === 'current-user' and id starting with 'temp-'
                const tempMessageIndex = existingMessages.findIndex(
                  (msg: Message) =>
                    msg.id.startsWith('temp-') &&
                    msg.senderId === 'current-user' &&
                    msg.conversationId === message.conversationId
                )

                if (tempMessageIndex !== -1) {
                  // Replace temp message with real message from server
                  // But preserve content from temp message if server message doesn't have it
                  const tempMessage = existingMessages[tempMessageIndex]
                  const finalMessage: Message = {
                    ...message,
                    // Preserve content from temp message if server message content is empty
                    content: message.content || tempMessage.content || ''
                  }
                  const newMessages = [...existingMessages]
                  newMessages[tempMessageIndex] = finalMessage
                  return {
                    ...old,
                    messages: newMessages
                  }
                } else {
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
            const conversationId = message.conversationId || message.chatGroupId || ''
            queryClient.setQueryData(
              CHAT_QUERY_KEYS.messages(conversationId),
              (old: any) => {
                const existingMessages = old?.messages || []
                // Check if there's a temp message from current user that should be replaced
                // Temp messages have senderId === 'current-user' and id starting with 'temp-'
                // Match by conversationId or chatGroupId
                const tempMessageIndex = existingMessages.findIndex(
                  (msg: Message) =>
                    msg.id.startsWith('temp-') &&
                    msg.senderId === 'current-user' &&
                    (msg.conversationId === conversationId ||
                      msg.chatGroupId === message.chatGroupId ||
                      msg.conversationId === message.chatGroupId)
                )

                if (tempMessageIndex !== -1) {
                  // Replace temp message with real message from server
                  // But preserve content from temp message if server message doesn't have it
                  const tempMessage = existingMessages[tempMessageIndex]
                  const finalMessage: Message = {
                    ...message,
                    // Preserve content from temp message if server message content is empty
                    content: message.content || tempMessage.content || ''
                  }
                  const newMessages = [...existingMessages]
                  newMessages[tempMessageIndex] = finalMessage
                  return {
                    ...old,
                    messages: newMessages
                  }
                } else {
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
                  conv.id === conversationId
                    ? { ...conv, lastMessage: message, updatedAt: message.sentAt }
                    : conv
                )
            )
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
        await signalRChatService.sendGroupMessage(data.groupId, data.content)
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
      // Always add temp messages to cache immediately for instant UI feedback
      // For real messages from REST API (not SignalR), also add to cache
      if (newMessage.id.startsWith('temp-') || !signalRConnectedRef.current) {
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
