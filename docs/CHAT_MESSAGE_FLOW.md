# Luồng Gửi Tin Nhắn (Message Sending Flow)

Tài liệu này mô tả chi tiết luồng xử lý khi người dùng nhấn nút gửi tin nhắn trong ứng dụng chat.

## Tổng Quan

Khi người dùng nhấn gửi tin nhắn, hệ thống sẽ:
1. Xác thực và validate dữ liệu
2. Gửi tin nhắn qua SignalR (real-time) hoặc REST API (fallback)
3. Cập nhật UI với tin nhắn mới
4. Xử lý tin nhắn nhận được từ server

---

## Luồng Chi Tiết

### 1. **User Input (MessageInput.tsx)**

**File:** `app/module/instructor/components/chat/MessageInput.tsx`

**Bước 1.1: Người dùng nhập tin nhắn**
- Người dùng nhập nội dung vào textarea
- Có thể đính kèm file (tối đa 10MB/file)
- Hỗ trợ nhấn `Enter` để gửi (Shift+Enter để xuống dòng)

**Bước 1.2: Submit Form**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validate: tin nhắn không rỗng hoặc có file đính kèm
  if ((!message.trim() && attachments.length === 0) || disabled || isSending) {
    return
  }

  // Gọi callback onSendMessage
  await onSendMessage({
    conversationId,
    content: message.trim(),
    messageType: attachments.length > 0 ? 'file' : 'text',
    attachments
  })
  
  // Clear form sau khi gửi thành công
  setMessage('')
  setAttachments([])
}
```

**Dữ liệu truyền:**
- `conversationId`: ID của cuộc trò chuyện
- `content`: Nội dung tin nhắn
- `messageType`: 'text' | 'file' | 'image'
- `attachments`: Mảng các file đính kèm

---

### 2. **ChatInterface Handler (ChatInterface.tsx)**

**File:** `app/module/instructor/components/chat/ChatInterface.tsx`

**Bước 2.1: Xử lý tin nhắn**
```typescript
const handleSendMessage = async (data: any) => {
  if (!activeConversationId || !activeConversation) return
  
  // Xác định loại cuộc trò chuyện (group hoặc private)
  const isGroup = activeConversation.type === 'group'
  
  // Gọi sendMessage từ useChat hook
  await sendMessage({
    ...data,
    conversationId: activeConversationId,
    groupId: isGroup ? activeConversationId : undefined,
    // Với tin nhắn private, cần ID của người nhận
    recipientId: !isGroup 
      ? activeConversation.participants.find(p => p.role !== userRole)?.id 
      : undefined
  })
}
```

**Logic:**
- Nếu là group: truyền `groupId`
- Nếu là private: truyền `recipientId` (ID của người nhận)

---

### 3. **useChat Hook - Send Message Mutation (useChat.ts)**

**File:** `app/module/instructor/hooks/useChat.ts`

**Bước 3.1: Kiểm tra kết nối SignalR**

```typescript
const sendMessageMutation = useMutation({
  mutationFn: async (data: SendMessageRequest) => {
    // Nếu có recipientId (private message) và SignalR đã kết nối
    if (signalRConnectedRef.current && data.recipientId) {
      await signalRChatService.sendPrivateMessage(data.recipientId, data.content)
      // Trả về message tạm (sẽ được cập nhật khi nhận từ server)
      return {
        id: `temp-${Date.now()}`,
        senderId: 'current-user',
        content: data.content,
        sentAt: new Date().toISOString(),
        // ...
      } as Message
    } 
    // Nếu có groupId (group message) và SignalR đã kết nối
    else if (signalRConnectedRef.current && data.groupId) {
      await signalRChatService.sendGroupMessage(data.groupId, data.content)
      return { /* temp message */ } as Message
    }
    
    // Fallback: Sử dụng REST API
    return chatService.sendMessage(data)
  }
})
```

**Quyết định:**
- ✅ **SignalR đã kết nối** → Gửi qua SignalR (real-time)
- ❌ **SignalR chưa kết nối** → Gửi qua REST API (fallback)

---

### 4. **SignalR Service (SignalRChatService.ts)**

**File:** `app/module/instructor/services/SignalRChatService.ts`

**Bước 4.1: Gửi Private Message qua SignalR**

```typescript
async sendPrivateMessage(recipientId: string, content: string): Promise<void> {
  if (!this.connection || !this.isConnected) {
    throw new Error('Not connected to Chat Hub')
  }
  // Gọi SignalR hub method
  await this.connection.invoke('SendPrivateMessage', recipientId, content)
}
```

**Bước 4.2: Gửi Group Message qua SignalR**

```typescript
async sendGroupMessage(groupId: string, content: string): Promise<void> {
  if (!this.connection || !this.isConnected) {
    throw new Error('Not connected to Chat Hub')
  }
  // Gọi SignalR hub method
  await this.connection.invoke('SendGroupMessage', groupId, content)
}
```

**SignalR Hub Methods:**
- `SendPrivateMessage(recipientId, content)` - Gửi tin nhắn private
- `SendGroupMessage(groupId, content)` - Gửi tin nhắn group

---

### 5. **REST API Fallback (ChatApi.ts)**

**File:** `app/module/instructor/services/ChatApi.ts`

**Bước 5.1: Gửi Private Message qua REST API**

```typescript
sendPrivateMessage: async (recipientId: string, content: string): Promise<Message> => {
  const response = await httpClient.post<ApiResponse<ChatMessageDto>>(
    '/Chat/private/send',
    { recipientId, content }
  )
  
  if (!response.data.isSuccess || !response.data.value) {
    throw new Error(response.data.error?.message || 'Failed to send message')
  }
  
  return mapMessageDtoToMessage(response.data.value)
}
```

**API Endpoint:** `POST /api/Chat/private/send`
**Payload:**
```json
{
  "recipientId": "string",
  "content": "string"
}
```

**Bước 5.2: Gửi Group Message qua REST API**

```typescript
sendGroupMessage: async (groupId: string, content: string): Promise<Message> => {
  const response = await httpClient.post<ApiResponse<ChatMessageDto>>(
    `/Chat/group/${groupId}/send`,
    { content }
  )
  
  if (!response.data.isSuccess || !response.data.value) {
    throw new Error(response.data.error?.message || 'Failed to send message')
  }
  
  return mapMessageDtoToMessage(response.data.value, groupId)
}
```

**API Endpoint:** `POST /api/Chat/group/{groupId}/send`
**Payload:**
```json
{
  "content": "string"
}
```

---

### 6. **Nhận Tin Nhắn từ Server**

#### 6.1. **Qua SignalR (Real-time)**

**File:** `app/module/instructor/hooks/useChat.ts`

**Bước 6.1.1: Setup SignalR Event Handlers**

```typescript
useEffect(() => {
  signalRChatService.connect()
    .then(() => {
      signalRConnectedRef.current = true
      
      // Handler cho private message
      signalRChatService.onPrivateMessage((message) => {
        // Cập nhật messages cache
        queryClient.setQueryData(
          CHAT_QUERY_KEYS.messages(message.conversationId || ''),
          (old: any) => ({
            ...old,
            messages: [...(old?.messages || []), message]
          })
        )
        
        // Cập nhật conversations list
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
      
      // Handler cho group message
      signalRChatService.onGroupMessage((message) => {
        // Tương tự như private message
        queryClient.setQueryData(/* ... */)
      })
    })
}, [queryClient])
```

**SignalR Events từ Server:**
- `ReceivePrivateMessage` - Nhận tin nhắn private
- `ReceiveGroupMessage` - Nhận tin nhắn group

#### 6.2. **Qua REST API Response**

**File:** `app/module/instructor/hooks/useChat.ts`

**Bước 6.2.1: Cập nhật Cache sau khi gửi thành công**

```typescript
onSuccess: (newMessage) => {
  // Chỉ cập nhật nếu không dùng SignalR hoặc là temp message
  if (!signalRConnectedRef.current || newMessage.id.startsWith('temp-')) {
    const conversationId = newMessage.conversationId || newMessage.chatThreadId || newMessage.chatGroupId || ''
    
    // Cập nhật messages cache
    queryClient.setQueryData(
      CHAT_QUERY_KEYS.messages(conversationId),
      (old: any) => ({
        ...old,
        messages: [...(old?.messages || []), newMessage]
      })
    )
    
    // Cập nhật conversations list
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
}
```

---

### 7. **Hiển Thị Tin Nhắn (MessageList.tsx)**

**File:** `app/module/instructor/components/chat/MessageList.tsx`

**Bước 7.1: Render Messages**

```typescript
const renderMessage = (message: Message, isConsecutive: boolean) => {
  const sender = getSender(message.senderId)
  
  // Xác định tin nhắn của chính mình
  const isOwnMessage = 
    message.senderId === currentUserId ||  // So sánh với prop
    (authUser?.id && message.senderId === authUser.id) ||  // So sánh với auth context
    (authUser?.email && sender?.email === authUser.email)  // So sánh email
  
  // Render message bubble
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {/* Message content */}
    </div>
  )
}
```

**Logic hiển thị:**
- Tin nhắn của mình: `justify-end` (bên phải, màu violet-purple gradient)
- Tin nhắn của người khác: `justify-start` (bên trái, màu slate-700)

**Bước 7.2: Auto-scroll**

```typescript
useEffect(() => {
  // Chỉ scroll khi có tin nhắn mới và user đang ở gần cuối
  if (hasNewMessage && isNearBottom) {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }
}, [messages, isLoading])
```

---

## Sơ Đồ Luồng

```
┌─────────────────┐
│  User Input     │
│  (MessageInput) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ChatInterface   │
│ handleSendMsg   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  useChat Hook   │
│ sendMessage     │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌─────────────────┐
│  SignalR        │  │  REST API       │
│  (Real-time)    │  │  (Fallback)     │
└────────┬────────┘  └────────┬────────┘
         │                    │
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│  Server         │  │  Server         │
│  (SignalR Hub)  │  │  (REST API)     │
└────────┬────────┘  └────────┬────────┘
         │                    │
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│  Receive Event  │  │  Response       │
│  (SignalR)      │  │  (HTTP)         │
└────────┬────────┘  └────────┬────────┘
         │                    │
         └────────┬───────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Update Cache   │
         │  (React Query)  │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Re-render UI   │
         │  (MessageList)  │
         └─────────────────┘
```

---

## Các Trường Hợp Đặc Biệt

### 1. **Tin Nhắn Tạm (Temp Message)**

Khi gửi qua SignalR, tin nhắn được tạo tạm với:
- `id: 'temp-${Date.now()}'`
- `senderId: 'current-user'`

Tin nhắn này sẽ được thay thế khi nhận message thật từ server.

### 2. **Fallback Mechanism**

Nếu SignalR không kết nối:
- Tự động chuyển sang REST API
- Vẫn hoạt động bình thường nhưng không real-time

### 3. **Xác Định Tin Nhắn Của Chính Mình**

Kiểm tra 3 điều kiện:
1. `message.senderId === currentUserId` (từ props)
2. `message.senderId === authUser.id` (từ auth context)
3. `sender.email === authUser.email` (so sánh email)

### 4. **Cập Nhật Participants**

Khi nhận tin nhắn từ sender chưa có trong participants:
- Tự động reload group members
- Cập nhật `conversationWithMembers` state

---

## Error Handling

### 1. **SignalR Connection Error**

```typescript
.catch((error) => {
  console.error('Failed to connect to SignalR:', error)
  toast.error('Không thể kết nối đến chat server')
  // Tự động fallback sang REST API
})
```

### 2. **Send Message Error**

```typescript
onError: (error: any) => {
  toast.error(error?.message || 'Không thể gửi tin nhắn')
}
```

### 3. **Validation Errors**

- Tin nhắn rỗng → Không gửi
- File quá lớn (>10MB) → Hiển thị alert
- Không có conversationId → Return early

---

## Performance Optimizations

1. **React Query Cache**: Tin nhắn được cache, không cần refetch
2. **SignalR Real-time**: Giảm số lượng HTTP requests
3. **Optimistic Updates**: Hiển thị tin nhắn ngay khi gửi
4. **Auto-scroll**: Chỉ scroll khi user ở gần cuối danh sách

---

## Testing Checklist

- [ ] Gửi tin nhắn private qua SignalR
- [ ] Gửi tin nhắn group qua SignalR
- [ ] Gửi tin nhắn khi SignalR disconnect (fallback REST API)
- [ ] Hiển thị tin nhắn của chính mình bên phải
- [ ] Hiển thị tin nhắn của người khác bên trái
- [ ] Auto-scroll khi có tin nhắn mới
- [ ] Cập nhật lastMessage trong conversations list
- [ ] Xử lý lỗi khi gửi thất bại
- [ ] Validate tin nhắn rỗng
- [ ] Validate file size

---

## Tài Liệu Liên Quan

- [Chat API Summary](./CHAT_API_SUMMARY.md)
- [SignalR Service Documentation](../app/module/instructor/services/SignalRChatService.ts)
- [Chat API Service](../app/module/instructor/services/ChatApi.ts)

