import type {
  ChatFilters,
  Conversation,
  CreateConversationRequest,
  Message,
  SendMessageRequest,
  User
} from '~/module/instructor/types/Chat'
import httpClient from '~/services/httpClient'

// Backend API Response wrapper
interface ApiResponse<T> {
  isSuccess: boolean
  value: T | null
  error: {
    message: string
    statusCode: number
  } | null
}

// Chat Message DTO from backend
interface ChatMessageDto {
  id: string
  senderId: string
  chatThreadId: string | null
  chatGroupId: string | null
  content: string
  sentAt: string
  edited: boolean
  deleted: boolean
}

// Chat Group DTO from backend
interface ChatGroupDto {
  id: string
  name: string
  description: string | null
  ownerId: string
  isPrivate: boolean
  lastMessageAt: string
  memberCount: number
}

// Group Member DTO from backend
interface GroupMemberDto {
  userId: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatarUrl: string | null
  isAdmin: boolean
  joinedAt: string
}

// Group Member DTO from backend
interface GroupMemberDto {
  userId: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatarUrl: string | null
  isAdmin: boolean
  joinedAt: string
}

// Helper to convert backend message to frontend message
const mapMessageDtoToMessage = (dto: ChatMessageDto, conversationId?: string): Message => {
  return {
    id: dto.id,
    senderId: dto.senderId,
    chatThreadId: dto.chatThreadId,
    chatGroupId: dto.chatGroupId,
    content: dto.content,
    sentAt: dto.sentAt,
    edited: dto.edited,
    deleted: dto.deleted,
    // Map to frontend format
    conversationId: conversationId || dto.chatThreadId || dto.chatGroupId || undefined,
    messageType: 'text', // Default, can be enhanced later
    createdAt: dto.sentAt,
    updatedAt: dto.sentAt,
    isRead: false // Will be handled separately
  }
}

export const chatService = {
  // ========== PRIVATE MESSAGES ==========

  // Send private message (1-on-1)
  sendPrivateMessage: async (recipientId: string, content: string): Promise<Message> => {
    const response = await httpClient.post<ApiResponse<ChatMessageDto>>(
      '/Chat/private/send',
      { recipientId, content }
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to send message')
    }

    return mapMessageDtoToMessage(response.data.value)
  },

  // Get private message history
  getPrivateHistory: async (
    otherUserId: string,
    page: number = 1,
    pageSize: number = 50
  ): Promise<Message[]> => {
    const response = await httpClient.get<ApiResponse<ChatMessageDto[]>>(
      `/Chat/private/history/${otherUserId}?page=${page}&pageSize=${pageSize}`
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to get history')
    }

    return response.data.value.map(msg => mapMessageDtoToMessage(msg, otherUserId))
  },

  // ========== GROUP MESSAGES ==========

  // Send group message
  sendGroupMessage: async (groupId: string, content: string): Promise<Message> => {
    const response = await httpClient.post<ApiResponse<ChatMessageDto>>(
      `/Chat/group/${groupId}/send`,
      { content }
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to send message')
    }

    return mapMessageDtoToMessage(response.data.value, groupId)
  },

  // Get group message history
  getGroupHistory: async (
    groupId: string,
    page: number = 1,
    pageSize: number = 50
  ): Promise<Message[]> => {
    const response = await httpClient.get<ApiResponse<ChatMessageDto[]>>(
      `/Chat/group/${groupId}/history?page=${page}&pageSize=${pageSize}`
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to get history')
    }

    return response.data.value.map(msg => mapMessageDtoToMessage(msg, groupId))
  },

  // ========== GROUP MANAGEMENT ==========

  // Create chat group
  createGroup: async (
    name: string,
    description?: string,
    isPrivate: boolean = false
  ): Promise<ChatGroupDto> => {
    const response = await httpClient.post<ApiResponse<ChatGroupDto>>(
      '/Chat/group/create',
      { name, description, isPrivate }
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to create group')
    }

    return response.data.value
  },

  // Add users to group
  addUsersToGroup: async (groupId: string, userIds: string[]): Promise<boolean> => {
    const response = await httpClient.post<ApiResponse<boolean>>(
      `/Chat/group/${groupId}/add-users`,
      { userIds }
    )

    if (!response.data.isSuccess) {
      throw new Error(response.data.error?.message || 'Failed to add users')
    }

    return response.data.value ?? false
  },

  // Add users to group by email
  addUsersToGroupByEmail: async (groupId: string, emails: string[]): Promise<boolean> => {
    const response = await httpClient.post<ApiResponse<boolean>>(
      `/Chat/group/${groupId}/add-users/email`,
      { emails }
    )

    if (!response.data.isSuccess) {
      throw new Error(response.data.error?.message || 'Failed to add users by email')
    }

    return response.data.value ?? false
  },

  // Join public group
  joinGroup: async (groupId: string): Promise<boolean> => {
    const response = await httpClient.post<ApiResponse<boolean>>(
      `/Chat/group/${groupId}/join`
    )

    if (!response.data.isSuccess) {
      throw new Error(response.data.error?.message || 'Failed to join group')
    }

    return response.data.value ?? false
  },

  // Leave group
  leaveGroup: async (groupId: string): Promise<boolean> => {
    const response = await httpClient.post<ApiResponse<boolean>>(
      `/Chat/group/${groupId}/leave`
    )

    if (!response.data.isSuccess) {
      throw new Error(response.data.error?.message || 'Failed to leave group')
    }

    return response.data.value ?? false
  },

  // Get my groups
  getMyGroups: async (): Promise<ChatGroupDto[]> => {
    const response = await httpClient.get<ApiResponse<ChatGroupDto[]>>(
      '/Chat/groups/my-groups'
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to get groups')
    }

    console.log('getMyGroups', response.data.value)
    return response.data.value
  },

  // Get group members
  getGroupMembers: async (groupId: string): Promise<GroupMemberDto[]> => {
    const response = await httpClient.get<ApiResponse<GroupMemberDto[]>>(
      `/Chat/user/group/${groupId}`
    )

    if (!response.data.isSuccess || !response.data.value) {
      throw new Error(response.data.error?.message || 'Failed to get group members')
    }

    return response.data.value
  },

  // ========== LEGACY METHODS (for backward compatibility) ==========

  // Get all conversations for instructor (combines private threads and groups)
  getConversations: async (filters?: ChatFilters): Promise<Conversation[]> => {
    try {
      // Get private threads and groups
      const groups = await chatService.getMyGroups()

      // Convert groups to conversations format
      // Note: We'll fetch members separately when needed to avoid too many API calls
      const groupConversations: Conversation[] = groups.map(group => ({
        id: group.id,
        title: group.name,
        type: 'group',
        participants: [], // Will be populated when conversation is selected
        unreadCount: 0,
        createdAt: group.lastMessageAt,
        updatedAt: group.lastMessageAt,
        isArchived: false,
        name: group.name,
        description: group.description || undefined,
        ownerId: group.ownerId,
        isPrivate: group.isPrivate,
        lastMessageAt: group.lastMessageAt,
        memberCount: group.memberCount
      }))

      return groupConversations
    } catch (error) {
      console.error('Error getting conversations:', error)
      return []
    }
  },

  // Get conversation with members (for group conversations)
  getConversationWithMembers: async (conversationId: string, type: 'group' | 'direct' = 'group'): Promise<Conversation | null> => {
    try {
      if (type === 'group') {
        // Get group info and members
        const [groups, members] = await Promise.all([
          chatService.getMyGroups(),
          chatService.getGroupMembers(conversationId)
        ])

        const group = groups.find(g => g.id === conversationId)
        if (!group) {
          return null
        }

        // Map members to User format
        const participants: User[] = members.map((member: GroupMemberDto) => ({
          id: member.userId,
          name: member.fullName,
          email: member.email,
          role: member.isAdmin ? 'instructor' : 'student',
          avatar: member.avatarUrl || undefined,
          isOnline: false // Will be updated if we have online status API
        }))

        return {
          id: group.id,
          title: group.name,
          type: 'group',
          participants,
          unreadCount: 0,
          createdAt: group.lastMessageAt,
          updatedAt: group.lastMessageAt,
          isArchived: false,
          name: group.name,
          description: group.description || undefined,
          ownerId: group.ownerId,
          isPrivate: group.isPrivate,
          lastMessageAt: group.lastMessageAt,
          memberCount: group.memberCount
        }
      }

      return null
    } catch (error) {
      console.error('Error getting conversation with members:', error)
      return null
    }
  },

  // Get messages for a specific conversation (handles both private and group)
  getMessages: async (
    conversationId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<{
    messages: Message[]
    total: number
    hasMore: boolean
  }> => {
    try {
      // Try as group first, then as private thread
      let messages: Message[] = []

      try {
        messages = await chatService.getGroupHistory(conversationId, page, limit)
        console.log('✅ getGroupHistory success:', messages.length, 'messages')
      } catch (error) {
        console.error('❌ getGroupHistory failed:', error)
        // If group fails, try as private thread
        // Note: For private threads, we need the other user ID
        // This is a limitation - we might need to store thread mapping
        try {
          // For now, we can't get private history without other user ID
          // So return empty array
          messages = []
        } catch (privateError) {
          console.error('❌ Private history also failed:', privateError)
          messages = []
        }
      }

      console.log('📨 Final messages count:', messages.length)
      if (messages.length > 0) {
        console.log('📨 First message:', messages[0])
        console.log('📨 First message sentAt:', messages[0].sentAt)
        console.log('📨 First message createdAt:', messages[0].createdAt)
      }

      return {
        messages,
        total: messages.length,
        hasMore: messages.length === limit
      }
    } catch (error) {
      console.error('Error getting messages:', error)
      return { messages: [], total: 0, hasMore: false }
    }
  },

  // Send a message (handles both private and group)
  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    if (data.groupId) {
      return chatService.sendGroupMessage(data.groupId, data.content)
    } else if (data.recipientId) {
      return chatService.sendPrivateMessage(data.recipientId, data.content)
    } else {
      throw new Error('Either groupId or recipientId must be provided')
    }
  },

  // Create new conversation
  createConversation: async (data: CreateConversationRequest): Promise<Conversation> => {
    if (data.type === 'group') {
      const group = await chatService.createGroup(
        data.title || 'New Group',
        undefined,
        false
      )

      if (data.participantIds.length > 0) {
        await chatService.addUsersToGroup(group.id, data.participantIds)
      }

      return {
        id: group.id,
        title: group.name,
        type: 'group',
        participants: [],
        unreadCount: 0,
        createdAt: group.lastMessageAt,
        updatedAt: group.lastMessageAt,
        isArchived: false,
        name: group.name,
        description: group.description || undefined,
        ownerId: group.ownerId,
        isPrivate: group.isPrivate,
        lastMessageAt: group.lastMessageAt,
        memberCount: group.memberCount
      }
    } else {
      // For direct messages, we don't create a conversation explicitly
      // The backend creates it automatically when first message is sent
      throw new Error('Direct conversations are created automatically when sending first message')
    }
  },

  // Mark messages as read (placeholder - backend might not have this endpoint)
  markAsRead: async (conversationId: string): Promise<void> => {
    // Backend API doesn't have this endpoint in the summary
    // Implement if available
    console.log('Mark as read not implemented in backend API')
  },

  // Archive/unarchive conversation (placeholder)
  toggleArchive: async (conversationId: string, isArchived: boolean): Promise<void> => {
    // Backend API doesn't have this endpoint in the summary
    console.log('Archive not implemented in backend API')
  },

  // Delete message (placeholder)
  deleteMessage: async (messageId: string): Promise<void> => {
    // Backend API doesn't have delete message endpoint in the summary
    console.log('Delete message not implemented in backend API')
  },

  // Search messages (placeholder)
  searchMessages: async (query: string, conversationId?: string): Promise<Message[]> => {
    // Backend API doesn't have search endpoint in the summary
    console.log('Search messages not implemented in backend API')
    return []
  },

  // Get online users (placeholder)
  getOnlineUsers: async (): Promise<string[]> => {
    // Backend API doesn't have this endpoint in the summary
    console.log('Get online users not implemented in backend API')
    return []
  },

  // Upload file (placeholder)
  uploadFile: async (file: File): Promise<{ url: string; filename: string }> => {
    // Backend API doesn't have upload endpoint in the summary
    throw new Error('File upload not implemented in backend API')
  }
}
