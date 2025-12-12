import React, { useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { chatService } from '~/module/instructor/services/ChatApi'
import { signalRChatService } from '~/module/instructor/services/SignalRChatService'
import type { 
  Conversation, 
  Message, 
  SendMessageRequest, 
  CreateConversationRequest,
  ChatFilters 
} from '~/module/instructor/types/Chat'
import { useToast } from '~/shared/hooks/useToast'

const CHAT_QUERY_KEYS = {
  conversations: ['chat', 'conversations'],
  messages: (conversationId: string) => ['chat', 'messages', conversationId],
  onlineUsers: ['chat', 'online-users']
}

// Mock data for development (when API is not available)
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    title: undefined,
    type: 'direct',
    participants: [
      { id: 'instructor-1', name: 'Ronald Richard', email: 'ronald@example.com', role: 'instructor', isOnline: true },
      { id: 'student-1', name: 'Nguyễn Văn A', email: 'student1@example.com', role: 'student', isOnline: true }
    ],
    lastMessage: {
      id: 'msg-1',
      conversationId: '1',
      senderId: 'student-1',
      content: 'Thầy ơi, em có câu hỏi về bài tập ạ',
      messageType: 'text',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isRead: false
    },
    unreadCount: 2,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isArchived: false,
    courseName: 'React Fundamentals'
  },
  {
    id: '2',
    title: 'Nhóm học React',
    type: 'group',
    participants: [
      { id: 'instructor-1', name: 'Ronald Richard', email: 'ronald@example.com', role: 'instructor', isOnline: true },
      { id: 'student-2', name: 'Trần Thị B', email: 'student2@example.com', role: 'student', isOnline: false },
      { id: 'student-3', name: 'Lê Văn C', email: 'student3@example.com', role: 'student', isOnline: true }
    ],
    lastMessage: {
      id: 'msg-2',
      conversationId: '2',
      senderId: 'student-2',
      content: 'Cảm ơn thầy đã giải đáp!',
      messageType: 'text',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: true
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isArchived: false,
    courseName: 'Advanced JavaScript'
  }
]

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg-1-1',
      conversationId: '1',
      senderId: 'student-1',
      content: 'Chào thầy ạ!',
      messageType: 'text',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: 'msg-1-2',
      conversationId: '1',
      senderId: 'instructor-1',
      content: 'Chào em, có gì thầy giúp được không?',
      messageType: 'text',
      createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: 'msg-1-3',
      conversationId: '1',
      senderId: 'student-1',
      content: 'Thầy ơi, em có câu hỏi về bài tập ạ',
      messageType: 'text',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isRead: false
    }
  ],
  '2': [
    {
      id: 'msg-2-1',
      conversationId: '2',
      senderId: 'instructor-1',
      content: 'Chào cả nhóm, hôm nay chúng ta sẽ thảo luận về React Hooks nhé!',
      messageType: 'text',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: 'msg-2-2',
      conversationId: '2',
      senderId: 'student-3',
      content: 'Vâng thầy, em có thắc mắc về useEffect ạ',
      messageType: 'text',
      createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: 'msg-2-3',
      conversationId: '2',
      senderId: 'student-2',
      content: 'Cảm ơn thầy đã giải đáp!',
      messageType: 'text',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: true
    }
  ]
}

// Set to false to use real API (requires backend running)
const USE_MOCK_DATA = false

export function useConversations(filters?: ChatFilters) {
  return useQuery({
    queryKey: [...CHAT_QUERY_KEYS.conversations, filters],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return MOCK_CONVERSATIONS
      }
      return chatService.getConversations(filters)
    },
    staleTime: 30 * 1000,
    refetchInterval: USE_MOCK_DATA ? false : 60 * 1000,
    retry: USE_MOCK_DATA ? false : 2
  })
}

export function useMessages(conversationId: string, enabled = true) {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(conversationId),
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return {
          messages: MOCK_MESSAGES[conversationId] || [],
          total: MOCK_MESSAGES[conversationId]?.length || 0,
          hasMore: false
        }
      }
      return chatService.getMessages(conversationId)
    },
    enabled: !!conversationId && enabled,
    staleTime: 10 * 1000,
    refetchInterval: USE_MOCK_DATA ? false : 5 * 1000,
    retry: USE_MOCK_DATA ? false : 2
  })
}

export function useChat() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const signalRConnectedRef = useRef(false)

  // Connect to SignalR on mount
  useEffect(() => {
    if (!USE_MOCK_DATA && !signalRConnectedRef.current) {
      signalRChatService.connect()
        .then(() => {
          signalRConnectedRef.current = true
          
          // Setup real-time message handlers
          signalRChatService.onPrivateMessage((message) => {
            queryClient.setQueryData(
              CHAT_QUERY_KEYS.messages(message.conversationId || ''),
              (old: any) => ({
                ...old,
                messages: [...(old?.messages || []), message]
              })
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
            queryClient.setQueryData(
              CHAT_QUERY_KEYS.messages(message.conversationId || ''),
              (old: any) => ({
                ...old,
                messages: [...(old?.messages || []), message]
              })
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
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId: data.conversationId,
          senderId: 'instructor-1',
          content: data.content,
          messageType: data.messageType || 'text',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isRead: false
        }
        return newMessage
      }

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
          conversationId: data.conversationId
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
          conversationId: data.groupId
        } as Message
      }

      // Fallback to REST API
      return chatService.sendMessage(data)
    },
    onSuccess: (newMessage) => {
      // Only update if not using SignalR (SignalR will handle it via events)
      // SignalR events will update the cache automatically
      if (!signalRConnectedRef.current || newMessage.id.startsWith('temp-')) {
        const conversationId = newMessage.conversationId || newMessage.chatThreadId || newMessage.chatGroupId || ''
        
        queryClient.setQueryData(
          CHAT_QUERY_KEYS.messages(conversationId),
          (old: any) => ({
            ...old,
            messages: [...(old?.messages || []), newMessage]
          })
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
      
      toast.success('Tin nhắn đã được gửi!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể gửi tin nhắn')
    }
  })

  // Create conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (data: CreateConversationRequest) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          title: data.title,
          type: data.type,
          participants: [
            { id: 'instructor-1', name: 'Ronald Richard', email: 'ronald@example.com', role: 'instructor', isOnline: true },
            ...data.participantIds.map(id => ({
              id,
              name: `Student ${id}`,
              email: `student${id}@example.com`,
              role: 'student' as const,
              isOnline: false
            }))
          ],
          unreadCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isArchived: false
        }
        return newConversation
      }
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
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 100))
        return
      }
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
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return
      }
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
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return
      }
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
      if (USE_MOCK_DATA) {
        return ['instructor-1', 'student-1', 'student-3']
      }
      return chatService.getOnlineUsers()
    },
    refetchInterval: USE_MOCK_DATA ? false : 30 * 1000,
    staleTime: 20 * 1000,
    retry: USE_MOCK_DATA ? false : 2
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
