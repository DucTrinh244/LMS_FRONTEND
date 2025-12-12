export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'instructor' | 'student' | 'admin'
  isOnline: boolean
  lastSeen?: string
}

export interface Message {
  id: string
  senderId: string
  chatThreadId?: string | null
  chatGroupId?: string | null
  content: string
  sentAt: string
  edited: boolean
  deleted: boolean
  // Frontend only fields
  conversationId?: string
  messageType?: 'text' | 'image' | 'file' | 'system'
  createdAt?: string
  updatedAt?: string
  isRead?: boolean
  replyTo?: string
  attachments?: MessageAttachment[]
}

export interface MessageAttachment {
  id: string
  filename: string
  fileType: string
  fileSize: number
  url: string
}

export interface Conversation {
  id: string
  title?: string
  type: 'direct' | 'group'
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
  isArchived: boolean
  courseId?: string
  courseName?: string
  // For group conversations
  name?: string
  description?: string
  ownerId?: string
  isPrivate?: boolean
  lastMessageAt?: string
  memberCount?: number
}

export interface SendMessageRequest {
  conversationId?: string
  recipientId?: string // For private messages
  groupId?: string // For group messages
  content: string
  messageType?: 'text' | 'image' | 'file'
  replyTo?: string
  attachments?: File[]
}

export interface CreateConversationRequest {
  participantIds: string[]
  title?: string
  type: 'direct' | 'group'
  courseId?: string
}

export interface ChatFilters {
  search?: string
  courseId?: string
  isArchived?: boolean
  hasUnread?: boolean
}

export interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  messages: Record<string, Message[]>
  isLoading: boolean
  error: string | null
  onlineUsers: Set<string>
}
