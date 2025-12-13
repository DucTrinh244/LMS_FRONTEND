import * as signalR from '@microsoft/signalr'
import type { Message } from '~/module/instructor/types/Chat'

// Get SignalR Hub URL
const getSignalRHubURL = (): string => {
  // Check if there's a specific SignalR URL in env
  let signalRURL = import.meta.env.VITE_SIGNALR_HUB_URL

  if (signalRURL) {
    // Đảm bảo sử dụng http cho localhost (không phải https)
    if (signalRURL.includes('localhost') && signalRURL.startsWith('https://')) {
      signalRURL = signalRURL.replace('https://', 'http://')
    }
    return signalRURL
  }

  // Otherwise, derive from API base URL
  let baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7151/api'

  // Đảm bảo sử dụng http cho localhost (không phải https)
  if (baseURL.includes('localhost') && baseURL.startsWith('https://')) {
    baseURL = baseURL.replace('https://', 'http://')
  }

  // Remove /api suffix if present
  const hubURL = baseURL.replace('/api', '')

  // Ensure it doesn't end with /
  const cleanURL = hubURL.endsWith('/') ? hubURL.slice(0, -1) : hubURL

  return `${cleanURL}/hubs/chat`
}

// Get JWT token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

export class SignalRChatService {
  private connection: signalR.HubConnection | null = null
  private isConnected: boolean = false
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5

  // Event handlers
  private onPrivateMessageHandlers: ((message: Message) => void)[] = []
  private onGroupMessageHandlers: ((message: Message) => void)[] = []
  private onUserJoinedGroupHandlers: ((data: { groupId: string; userId: string }) => void)[] = []
  private onUserLeftGroupHandlers: ((data: { groupId: string; userId: string }) => void)[] = []
  private onGroupCreatedHandlers: ((group: any) => void)[] = []
  private onUsersAddedToGroupHandlers: ((data: { groupId: string; userIds: string[] }) => void)[] = []
  private onPrivateHistoryHandlers: ((messages: Message[]) => void)[] = []
  private onGroupHistoryHandlers: ((messages: Message[]) => void)[] = []
  private onConnectionStateChangedHandlers: ((isConnected: boolean) => void)[] = []

  // Connect to SignalR Hub
  async connect(): Promise<void> {
    if (this.connection && this.isConnected) {
      return
    }

    const token = getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const hubURL = getSignalRHubURL()
    console.log('🔗 Connecting to SignalR Hub:', hubURL)

    // Đảm bảo URL là HTTP (không phải HTTPS) cho localhost
    const finalURL = hubURL.startsWith('https://') && hubURL.includes('localhost')
      ? hubURL.replace('https://', 'http://')
      : hubURL

    console.log('🔗 Final SignalR Hub URL:', finalURL)

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(finalURL, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
            return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000)
          }
          return null // Stop reconnecting
        }
      })
      .build()

    // Setup event listeners
    this.setupEventListeners()

    try {
      await this.connection.start()
      this.isConnected = true
      this.reconnectAttempts = 0
      this.notifyConnectionStateChanged(true)
      console.log('Connected to Chat Hub')
    } catch (error) {
      console.error('Error connecting to Chat Hub:', error)
      this.isConnected = false
      this.notifyConnectionStateChanged(false)
      throw error
    }

    // Handle reconnection
    this.connection.onreconnecting(() => {
      this.isConnected = false
      this.notifyConnectionStateChanged(false)
      console.log('Reconnecting to Chat Hub...')
    })

    this.connection.onreconnected(() => {
      this.isConnected = true
      this.reconnectAttempts = 0
      this.notifyConnectionStateChanged(true)
      console.log('Reconnected to Chat Hub')
    })

    // Handle disconnection
    this.connection.onclose((error) => {
      this.isConnected = false
      this.notifyConnectionStateChanged(false)
      if (error) {
        console.error('Chat Hub connection closed with error:', error)
      } else {
        console.log('Chat Hub connection closed')
      }
    })
  }

  // Setup event listeners
  private setupEventListeners(): void {
    if (!this.connection) return

    // Receive private message
    this.connection.on('ReceivePrivateMessage', (message: any) => {
      const mappedMessage: Message = {
        id: message.id,
        senderId: message.senderId,
        chatThreadId: message.chatThreadId,
        chatGroupId: message.chatGroupId,
        content: message.content,
        sentAt: message.sentAt,
        edited: message.edited,
        deleted: message.deleted,
        conversationId: message.chatThreadId || undefined,
        messageType: 'text',
        createdAt: message.sentAt,
        updatedAt: message.sentAt,
        isRead: false
      }
      this.onPrivateMessageHandlers.forEach(handler => handler(mappedMessage))
    })

    // Receive group message
    this.connection.on('ReceiveGroupMessage', (message: any) => {
      const mappedMessage: Message = {
        id: message.id,
        senderId: message.senderId,
        chatThreadId: message.chatThreadId,
        chatGroupId: message.chatGroupId,
        content: message.content,
        sentAt: message.sentAt,
        edited: message.edited,
        deleted: message.deleted,
        conversationId: message.chatGroupId || undefined,
        messageType: 'text',
        createdAt: message.sentAt,
        updatedAt: message.sentAt,
        isRead: false
      }
      this.onGroupMessageHandlers.forEach(handler => handler(mappedMessage))
    })

    // User joined group
    this.connection.on('UserJoinedGroup', (data: { groupId: string; userId: string }) => {
      this.onUserJoinedGroupHandlers.forEach(handler => handler(data))
    })

    // User left group
    this.connection.on('UserLeftGroup', (data: { groupId: string; userId: string }) => {
      this.onUserLeftGroupHandlers.forEach(handler => handler(data))
    })

    // Group created
    this.connection.on('GroupCreated', (group: any) => {
      this.onGroupCreatedHandlers.forEach(handler => handler(group))
    })

    // Users added to group
    this.connection.on('UsersAddedToGroup', (data: { groupId: string; userIds: string[] }) => {
      this.onUsersAddedToGroupHandlers.forEach(handler => handler(data))
    })

    // Private history
    this.connection.on('PrivateHistory', (messages: any[]) => {
      const mappedMessages = messages.map(msg => ({
        id: msg.id,
        senderId: msg.senderId,
        chatThreadId: msg.chatThreadId,
        chatGroupId: msg.chatGroupId,
        content: msg.content,
        sentAt: msg.sentAt,
        edited: msg.edited,
        deleted: msg.deleted,
        conversationId: msg.chatThreadId || undefined,
        messageType: 'text' as const,
        createdAt: msg.sentAt,
        updatedAt: msg.sentAt,
        isRead: false
      }))
      this.onPrivateHistoryHandlers.forEach(handler => handler(mappedMessages))
    })

    // Group history
    this.connection.on('GroupHistory', (messages: any[]) => {
      const mappedMessages = messages.map(msg => ({
        id: msg.id,
        senderId: msg.senderId,
        chatThreadId: msg.chatThreadId,
        chatGroupId: msg.chatGroupId,
        content: msg.content,
        sentAt: msg.sentAt,
        edited: msg.edited,
        deleted: msg.deleted,
        conversationId: msg.chatGroupId || undefined,
        messageType: 'text' as const,
        createdAt: msg.sentAt,
        updatedAt: msg.sentAt,
        isRead: false
      }))
      this.onGroupHistoryHandlers.forEach(handler => handler(mappedMessages))
    })
  }

  // Disconnect from SignalR Hub
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop()
      this.connection = null
      this.isConnected = false
      this.notifyConnectionStateChanged(false)
    }
  }

  // ========== SignalR Methods (Client → Server) ==========

  // Send private message
  async sendPrivateMessage(recipientId: string, content: string): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('SendPrivateMessage', recipientId, content)
  }

  // Send group message
  async sendGroupMessage(groupId: string, content: string): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('SendGroupMessage', groupId, content)
  }

  // Join group
  async joinGroup(groupId: string): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('JoinGroup', groupId)
  }

  // Leave group - DISABLED
  // This method is disabled to prevent users from leaving groups automatically
  async leaveGroup(groupId: string): Promise<void> {
    // DISABLED: Leave group functionality is disabled
    console.log('⚠️ leaveGroup is disabled, not leaving group:', groupId)
    // Do nothing - user stays in the group
    return Promise.resolve()
    // Original code (disabled):
    // if (!this.connection || !this.isConnected) {
    //   throw new Error('Not connected to Chat Hub')
    // }
    // await this.connection.invoke('LeaveGroup', groupId)
  }

  // Create group
  async createGroup(name: string, description: string | null, isPrivate: boolean): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('CreateGroup', name, description, isPrivate)
  }

  // Add users to group
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('AddUsersToGroup', groupId, userIds)
  }

  // Get private history (via SignalR)
  async getPrivateHistory(otherUserId: string, page: number = 1, pageSize: number = 50): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('GetPrivateHistory', otherUserId, page, pageSize)
  }

  // Get group history (via SignalR)
  async getGroupHistory(groupId: string, page: number = 1, pageSize: number = 50): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('Not connected to Chat Hub')
    }
    await this.connection.invoke('GetGroupHistory', groupId, page, pageSize)
  }

  // ========== Event Subscriptions ==========

  onPrivateMessage(handler: (message: Message) => void): () => void {
    this.onPrivateMessageHandlers.push(handler)
    return () => {
      const index = this.onPrivateMessageHandlers.indexOf(handler)
      if (index > -1) {
        this.onPrivateMessageHandlers.splice(index, 1)
      }
    }
  }

  onGroupMessage(handler: (message: Message) => void): () => void {
    this.onGroupMessageHandlers.push(handler)
    return () => {
      const index = this.onGroupMessageHandlers.indexOf(handler)
      if (index > -1) {
        this.onGroupMessageHandlers.splice(index, 1)
      }
    }
  }

  onUserJoinedGroup(handler: (data: { groupId: string; userId: string }) => void): () => void {
    this.onUserJoinedGroupHandlers.push(handler)
    return () => {
      const index = this.onUserJoinedGroupHandlers.indexOf(handler)
      if (index > -1) {
        this.onUserJoinedGroupHandlers.splice(index, 1)
      }
    }
  }

  onUserLeftGroup(handler: (data: { groupId: string; userId: string }) => void): () => void {
    this.onUserLeftGroupHandlers.push(handler)
    return () => {
      const index = this.onUserLeftGroupHandlers.indexOf(handler)
      if (index > -1) {
        this.onUserLeftGroupHandlers.splice(index, 1)
      }
    }
  }

  onGroupCreated(handler: (group: any) => void): () => void {
    this.onGroupCreatedHandlers.push(handler)
    return () => {
      const index = this.onGroupCreatedHandlers.indexOf(handler)
      if (index > -1) {
        this.onGroupCreatedHandlers.splice(index, 1)
      }
    }
  }

  onUsersAddedToGroup(handler: (data: { groupId: string; userIds: string[] }) => void): () => void {
    this.onUsersAddedToGroupHandlers.push(handler)
    return () => {
      const index = this.onUsersAddedToGroupHandlers.indexOf(handler)
      if (index > -1) {
        this.onUsersAddedToGroupHandlers.splice(index, 1)
      }
    }
  }

  onPrivateHistory(handler: (messages: Message[]) => void): () => void {
    this.onPrivateHistoryHandlers.push(handler)
    return () => {
      const index = this.onPrivateHistoryHandlers.indexOf(handler)
      if (index > -1) {
        this.onPrivateHistoryHandlers.splice(index, 1)
      }
    }
  }

  onGroupHistory(handler: (messages: Message[]) => void): () => void {
    this.onGroupHistoryHandlers.push(handler)
    return () => {
      const index = this.onGroupHistoryHandlers.indexOf(handler)
      if (index > -1) {
        this.onGroupHistoryHandlers.splice(index, 1)
      }
    }
  }

  onConnectionStateChanged(handler: (isConnected: boolean) => void): () => void {
    this.onConnectionStateChangedHandlers.push(handler)
    return () => {
      const index = this.onConnectionStateChangedHandlers.indexOf(handler)
      if (index > -1) {
        this.onConnectionStateChangedHandlers.splice(index, 1)
      }
    }
  }

  private notifyConnectionStateChanged(isConnected: boolean): void {
    this.onConnectionStateChangedHandlers.forEach(handler => handler(isConnected))
  }

  // Get connection state
  getConnectionState(): boolean {
    return this.isConnected
  }
}

// Singleton instance
export const signalRChatService = new SignalRChatService()

