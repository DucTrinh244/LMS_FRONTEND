# Chat API Integration Guide

## Cấu hình Environment Variables

Thêm vào file `.env` hoặc `.env.local`:

```env
# API Base URL (cho REST API)
VITE_API_BASE_URL=http://localhost:7151/api

# SignalR Hub URL (tùy chọn, nếu khác với API base URL)
VITE_SIGNALR_HUB_URL=http://localhost:7151/hubs/chat
```

## Cách sử dụng

### 1. REST API

Tất cả các endpoints đã được tích hợp trong `ChatApi.ts`:

- `sendPrivateMessage(recipientId, content)` - Gửi tin nhắn riêng
- `getPrivateHistory(otherUserId, page, pageSize)` - Lấy lịch sử tin nhắn riêng
- `sendGroupMessage(groupId, content)` - Gửi tin nhắn group
- `getGroupHistory(groupId, page, pageSize)` - Lấy lịch sử tin nhắn group
- `createGroup(name, description, isPrivate)` - Tạo group mới
- `getMyGroups()` - Lấy danh sách groups của user

### 2. SignalR (Real-time)

SignalR service tự động kết nối khi component mount và xử lý real-time messages.

Các events được xử lý tự động:
- `ReceivePrivateMessage` - Nhận tin nhắn riêng mới
- `ReceiveGroupMessage` - Nhận tin nhắn group mới
- `UserJoinedGroup` - User join group
- `UserLeftGroup` - User rời group
- `GroupCreated` - Group mới được tạo

### 3. Hooks

Sử dụng các hooks có sẵn:

```typescript
import { useConversations, useMessages, useChat } from '~/module/instructor/hooks/useChat'

// Lấy danh sách conversations
const { data: conversations } = useConversations()

// Lấy messages của một conversation
const { data: messagesData } = useMessages(conversationId)

// Gửi tin nhắn, tạo conversation, etc.
const { sendMessage, createConversation } = useChat()
```

## Chuyển đổi giữa Mock và Real API

Trong file `app/module/instructor/hooks/useChat.ts`:

```typescript
// Set to false để sử dụng API thực tế
const USE_MOCK_DATA = false
```

## Lưu ý

1. **Authentication**: Tất cả requests cần JWT token, được tự động thêm từ `localStorage.getItem('accessToken')`

2. **Error Handling**: Tất cả errors được xử lý và hiển thị toast notification

3. **Real-time Updates**: Khi SignalR connected, messages sẽ được cập nhật real-time tự động

4. **Fallback**: Nếu SignalR không kết nối được, hệ thống sẽ tự động fallback về REST API

