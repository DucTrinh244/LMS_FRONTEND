import type { 
  Conversation, 
  Message, 
  SendMessageRequest, 
  CreateConversationRequest, 
  ChatFilters 
} from '~/module/instructor/types/Chat'
import httpClient from '~/services/httpClient'

export const chatService = {
  // Get all conversations for instructor
  getConversations: (filters?: ChatFilters): Promise<Conversation[]> => {
    const params = new URLSearchParams()
    if (filters?.search) params.append('search', filters.search)
    if (filters?.courseId) params.append('courseId', filters.courseId)
    if (filters?.isArchived !== undefined) params.append('isArchived', String(filters.isArchived))
    if (filters?.hasUnread !== undefined) params.append('hasUnread', String(filters.hasUnread))
    
    return httpClient
      .get(`/chat/conversations?${params.toString()}`)
      .then((res) => res.data)
  },

  // Get messages for a specific conversation
  getMessages: (conversationId: string, page = 1, limit = 50): Promise<{
    messages: Message[]
    total: number
    hasMore: boolean
  }> => {
    return httpClient
      .get(`/chat/conversations/${conversationId}/messages?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  },

  // Send a message
  sendMessage: (data: SendMessageRequest): Promise<Message> => {
    const formData = new FormData()
    formData.append('conversationId', data.conversationId)
    formData.append('content', data.content)
    formData.append('messageType', data.messageType || 'text')
    
    if (data.replyTo) {
      formData.append('replyTo', data.replyTo)
    }
    
    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file)
      })
    }

    return httpClient
      .post('/chat/messages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => res.data)
  },

  // Create new conversation
  createConversation: (data: CreateConversationRequest): Promise<Conversation> => {
    return httpClient
      .post('/chat/conversations', data)
      .then((res) => res.data)
  },

  // Mark messages as read
  markAsRead: (conversationId: string): Promise<void> => {
    return httpClient
      .patch(`/chat/conversations/${conversationId}/read`)
      .then((res) => res.data)
  },

  // Archive/unarchive conversation
  toggleArchive: (conversationId: string, isArchived: boolean): Promise<void> => {
    return httpClient
      .patch(`/chat/conversations/${conversationId}/archive`, { isArchived })
      .then((res) => res.data)
  },

  // Delete message
  deleteMessage: (messageId: string): Promise<void> => {
    return httpClient
      .delete(`/chat/messages/${messageId}`)
      .then((res) => res.data)
  },

  // Search messages
  searchMessages: (query: string, conversationId?: string): Promise<Message[]> => {
    const params = new URLSearchParams({ query })
    if (conversationId) params.append('conversationId', conversationId)
    
    return httpClient
      .get(`/chat/messages/search?${params.toString()}`)
      .then((res) => res.data)
  },

  // Get online users
  getOnlineUsers: (): Promise<string[]> => {
    return httpClient
      .get('/chat/online-users')
      .then((res) => res.data)
  },

  // Upload file
  uploadFile: (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    
    return httpClient
      .post('/chat/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => res.data)
  }
}
