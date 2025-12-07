import React, { useEffect, useRef } from 'react'
import type { Message, User } from '~/module/instructor/types/Chat'
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns'
import { vi } from 'date-fns/locale'

interface MessageListProps {
  messages: Message[]
  participants: User[]
  currentUserId: string
  isLoading?: boolean
  onDeleteMessage?: (messageId: string) => void
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  participants,
  currentUserId,
  isLoading,
  onDeleteMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getSender = (senderId: string) => {
    return participants.find(p => p.id === senderId)
  }

  const formatMessageTime = (createdAt: string) => {
    const date = new Date(createdAt)
    
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
      const messageDate = format(new Date(message.createdAt), 'yyyy-MM-dd')
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
    const messageDate = new Date(date)
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
    const isOwnMessage = message.senderId === currentUserId
    
    return (
      <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[70%]`}>
          {/* Avatar - only show for first message in sequence */}
          {!isOwnMessage && !isConsecutive && (
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-600 flex items-center justify-center flex-shrink-0">
              {sender?.avatar ? (
                <img 
                  src={sender.avatar} 
                  alt={sender?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium text-white">
                  {sender?.name?.charAt(0)?.toUpperCase() || '?'}
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
                {sender?.name || 'Không rõ'}
              </span>
            )}
            
            {/* Message bubble */}
            <div 
              className={`
                relative px-3 py-2 rounded-lg max-w-full break-words
                ${isOwnMessage 
                  ? 'bg-blue-600 text-white' 
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
              {formatMessageTime(message.createdAt)}
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

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4">
      {messageGroups.map((group, groupIndex) => (
        <div key={group.date}>
          {renderDateSeparator(group.date)}
          
          {group.messages.map((message, messageIndex) => {
            // Check if this message is consecutive (same sender as previous message within 5 minutes)
            const previousMessage = messageIndex > 0 ? group.messages[messageIndex - 1] : null
            const isConsecutive = previousMessage && 
              previousMessage.senderId === message.senderId &&
              (new Date(message.createdAt).getTime() - new Date(previousMessage.createdAt).getTime()) < 5 * 60 * 1000
            
            return (
              <div key={message.id} className="group">
                {renderMessage(message, isConsecutive)}
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
