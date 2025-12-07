// Export hooks
export { useCourseInstructor, useCourseDetails, useCourseStats } from './hooks/useCourseInstructor'
export { useConversations, useMessages, useChat, useActiveConversation, useOnlineUsers } from './hooks/useChat'

// Export services  
export { courseInstructorService } from './services/CourseInstructorApi'
export { chatService } from './services/ChatApi'

// Export components
export { default as ChatInterface } from './components/chat/ChatInterface'
export { default as ConversationList } from './components/chat/ConversationList'
export { default as MessageList } from './components/chat/MessageList'
export { default as MessageInput } from './components/chat/MessageInput'
export { default as NewConversationModal } from './components/chat/NewConversationModal'

// Export types
export type {
  CourseEditInstructorRequest,
  Course,
  AddRequestCourseInstructor,
  CourseStats,
  LevelCourse,
  LanguageCourse,
  CourseFilters,
  CoursePaginationParams
} from './types/CourseInstructor'

export type {
  User,
  Message,
  Conversation,
  SendMessageRequest,
  CreateConversationRequest,
  ChatFilters,
  ChatState,
  MessageAttachment
} from './types/Chat'