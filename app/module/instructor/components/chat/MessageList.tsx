import { format, isToday, isYesterday } from 'date-fns'
import { vi } from 'date-fns/locale'
import React, { useEffect, useRef } from 'react'
import type { Message, User } from '~/module/instructor/types/Chat'
import { useAuth } from '~/shared/hooks/useAuth'

interface MessageListProps {
  messages: Message[]
  participants: User[]
  currentUserId: string
  isLoading?: boolean
  onDeleteMessage?: (messageId: string) => void
  conversationId?: string
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  participants,
  currentUserId,
  isLoading,
  onDeleteMessage,
  conversationId
}) => {
  const { user: authUser } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousMessagesLengthRef = useRef<number>(0)
  const previousLastMessageIdRef = useRef<string | null>(null)
  const previousConversationIdRef = useRef<string | undefined>(undefined)
  const isConversationChangingRef = useRef<boolean>(false)

  // Track conversation changes - but DO NOT scroll or reset position
  useEffect(() => {
    if (conversationId !== previousConversationIdRef.current) {
      // Mark that conversation is changing
      isConversationChangingRef.current = true

      // Reset tracking refs
      previousMessagesLengthRef.current = 0
      previousLastMessageIdRef.current = null
      previousConversationIdRef.current = conversationId

      // DO NOT reset scroll position - let user keep their scroll position
      // DO NOT auto scroll - user clicked to view this conversation

      // Reset flag after a short delay
      setTimeout(() => {
        isConversationChangingRef.current = false
      }, 500)
    }
  }, [conversationId])

  // Auto scroll to bottom when:
  // 1. First time loading messages for a conversation
  // 2. New message is added (always scroll, not just when near bottom)
  useEffect(() => {
    // Don't do anything if loading
    if (isLoading) {
      return
    }

    const currentLength = messages.length
    const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : null

    // Scroll function that only scrolls the container, not the whole page
    const scrollToBottom = (smooth: boolean = false) => {
      if (containerRef.current) {
        const container = containerRef.current
        if (smooth) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          })
        } else {
          container.scrollTop = container.scrollHeight
        }
      }
    }

    // First time loading messages for this conversation - scroll to bottom
    if (previousMessagesLengthRef.current === 0 && previousLastMessageIdRef.current === null) {
      previousMessagesLengthRef.current = currentLength
      previousLastMessageIdRef.current = lastMessageId

      // Scroll to bottom after messages are rendered
      setTimeout(() => {
        scrollToBottom(false)
      }, 100)
      return
    }

    // New message added - always scroll to bottom
    const hasNewMessage =
      currentLength > previousMessagesLengthRef.current ||
      (lastMessageId && lastMessageId !== previousLastMessageIdRef.current)

    if (hasNewMessage) {
      setTimeout(() => {
        scrollToBottom(true)
      }, 50)
    }

    previousMessagesLengthRef.current = currentLength
    previousLastMessageIdRef.current = lastMessageId
  }, [messages, isLoading])

  const getSender = (senderId: string) => {
    return participants.find(p => p.id === senderId)
  }

  const formatMessageTime = (dateString?: string | null) => {
    if (!dateString) {
      return ''
    }

    const date = new Date(dateString)

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return ''
    }

    if (isToday(date)) {
      return format(date, 'HH:mm')
    } else if (isYesterday(date)) {
      return `Hôm qua ${format(date, 'HH:mm')}`
    } else {
      return format(date, 'dd/MM/yyyy HH:mm')
    }
  }

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = []

    messages.forEach(message => {
      // Use sentAt or createdAt, whichever is available
      const dateString = message.sentAt || message.createdAt

      if (!dateString) {
        // If no date, put in "unknown" group
        const unknownGroup = groups.find(g => g.date === 'unknown')
        if (unknownGroup) {
          unknownGroup.messages.push(message)
        } else {
          groups.push({ date: 'unknown', messages: [message] })
        }
        return
      }

      const date = new Date(dateString)

      // Check if date is valid
      if (isNaN(date.getTime())) {
        const unknownGroup = groups.find(g => g.date === 'unknown')
        if (unknownGroup) {
          unknownGroup.messages.push(message)
        } else {
          groups.push({ date: 'unknown', messages: [message] })
        }
        return
      }

      const messageDate = format(date, 'yyyy-MM-dd')
      const existingGroup = groups.find(g => g.date === messageDate)

      if (existingGroup) {
        existingGroup.messages.push(message)
      } else {
        groups.push({ date: messageDate, messages: [message] })
      }
    })

    return groups
  }

  const renderDateSeparator = (date: string) => {
    if (!date || date === 'unknown') {
      // Don't show separator for unknown dates, but still render messages
      return null
    }

    const messageDate = new Date(date)

    // Check if date is valid
    if (isNaN(messageDate.getTime())) {
      return null
    }

    let displayDate = ''

    if (isToday(messageDate)) {
      displayDate = 'Hôm nay'
    } else if (isYesterday(messageDate)) {
      displayDate = 'Hôm qua'
    } else {
      displayDate = format(messageDate, 'dd/MM/yyyy', { locale: vi })
    }

    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">
          {displayDate}
        </div>
      </div>
    )
  }

  const renderMessage = (message: Message, isConsecutive: boolean) => {
    const sender = getSender(message.senderId)

    // Determine if this is own message - check multiple sources
    // 1. Check if senderId is 'current-user' (temp message from SignalR)
    // 2. Compare senderId with currentUserId prop
    // 3. Compare senderId with authUser.id
    // 4. Check if sender email matches authUser email
    const isTempOwnMessage = message.senderId === 'current-user'
    const isOwnMessageByCurrentUserId = message.senderId === currentUserId
    const isOwnMessageByAuthId = authUser?.id && message.senderId === authUser.id
    const isOwnMessageByEmail = authUser?.email && sender?.email === authUser.email

    const isOwnMessage = isTempOwnMessage || isOwnMessageByCurrentUserId || isOwnMessageByAuthId || isOwnMessageByEmail

    // If sender not found, try to get from auth context if it's own message
    // Also handle temp messages (senderId === 'current-user')
    let displaySender = sender
    if ((!sender || isTempOwnMessage) && isOwnMessage && authUser) {
      // Use auth user info for own messages
      const userName = authUser.fullName ||
        (authUser.firstName && authUser.lastName
          ? `${authUser.firstName} ${authUser.lastName}`
          : authUser.firstName || authUser.lastName || 'Bạn')

      displaySender = {
        id: authUser.id || message.senderId,
        name: userName,
        email: authUser.email || '',
        role: authUser.roles?.[0] === 'Instructor' ? 'instructor' : 'student',
        avatar: authUser.avatarUrl || undefined,
        isOnline: true
      } as User
    }

    return (
      <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[70%]`}>
          {/* Avatar - only show for first message in sequence */}
          {!isOwnMessage && !isConsecutive && (
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-600 flex items-center justify-center flex-shrink-0">
              {displaySender?.avatar ? (
                <img
                  src={displaySender.avatar}
                  alt={displaySender?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium text-white">
                  {displaySender?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              )}
            </div>
          )}

          {/* Spacer for consecutive messages */}
          {!isOwnMessage && isConsecutive && (
            <div className="w-8"></div>
          )}

          <div className="flex flex-col space-y-1">
            {/* Sender name - only show for first message in sequence */}
            {!isOwnMessage && !isConsecutive && (
              <span className="text-xs text-slate-400 px-2">
                {displaySender?.name || 'Đang tải...'}
              </span>
            )}

            {/* Message bubble */}
            <div
              className={`
                relative px-3 py-2 rounded-lg max-w-full break-words
                ${isOwnMessage
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                  : 'bg-slate-700 text-slate-100'
                }
              `}
            >
              {/* Reply indicator */}
              {message.replyTo && (
                <div className="border-l-2 border-slate-500 pl-2 mb-2 text-xs opacity-75">
                  <div className="bg-slate-600/50 rounded p-1">
                    Trả lời tin nhắn
                  </div>
                </div>
              )}

              {/* Message content */}
              {message.messageType === 'text' && (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}

              {message.messageType === 'image' && (
                <div className="space-y-2">
                  <img
                    src={message.content}
                    alt="Hình ảnh"
                    className="rounded max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(message.content, '_blank')}
                  />
                </div>
              )}

              {message.messageType === 'file' && (
                <div className="flex items-center space-x-2 bg-slate-600/30 rounded p-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <a
                    href={message.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    Tải xuống tệp
                  </a>
                </div>
              )}

              {message.messageType === 'system' && (
                <p className="text-xs italic text-slate-300">{message.content}</p>
              )}

              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-2 text-xs bg-slate-600/30 rounded p-1">
                      <span>📎</span>
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline truncate"
                      >
                        {attachment.filename}
                      </a>
                      <span className="text-slate-400">
                        ({Math.round(attachment.fileSize / 1024)} KB)
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Message actions */}
              {isOwnMessage && onDeleteMessage && (
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteMessage(message.id)
                    }}
                    className="w-5 h-5 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Message time */}
            <span className={`text-xs text-slate-500 px-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
              {formatMessageTime(message.sentAt || message.createdAt)}
              {isOwnMessage && (
                <span className="ml-1">
                  {message.isRead ? '✓✓' : '✓'}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className="animate-pulse flex items-start space-x-2 max-w-[70%]">
              {i % 2 === 0 && <div className="w-8 h-8 bg-slate-600 rounded-full"></div>}
              <div className="bg-slate-700 rounded-lg p-3 space-y-2">
                <div className="h-4 bg-slate-600 rounded w-32"></div>
                <div className="h-3 bg-slate-600 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-medium mb-1">Chưa có tin nhắn</h3>
          <p className="text-sm">Hãy gửi tin nhắn đầu tiên để bắt đầu cuộc trò chuyện</p>
        </div>
      </div>
    )
  }

  const messageGroups = groupMessagesByDate(messages)
    .sort((a, b) => {
      // Put unknown dates at the end
      if (a.date === 'unknown') return 1
      if (b.date === 'unknown') return -1

      // Sort by date
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0
      }
      return dateA.getTime() - dateB.getTime()
    })

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4">
      {messageGroups.map((group, groupIndex) => (
        <div key={group.date}>
          {renderDateSeparator(group.date)}

          {group.messages.map((message, messageIndex) => {
            // Check if this message is consecutive (same sender as previous message within 5 minutes)
            const previousMessage = messageIndex > 0 ? group.messages[messageIndex - 1] : null
            const isConsecutive = previousMessage !== null &&
              previousMessage.senderId === message.senderId &&
              (() => {
                const currentDate = new Date(message.sentAt || message.createdAt || '')
                const previousDate = new Date(previousMessage.sentAt || previousMessage.createdAt || '')

                if (isNaN(currentDate.getTime()) || isNaN(previousDate.getTime())) {
                  return false
                }

                return (currentDate.getTime() - previousDate.getTime()) < 5 * 60 * 1000
              })()

            return (
              <div key={message.id} className="group">
                {renderMessage(message, !!isConsecutive)}
              </div>
            )
          })}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
