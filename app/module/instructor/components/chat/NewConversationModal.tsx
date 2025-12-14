import { ArrowLeft, Mail, X } from 'lucide-react'
import React, { useState } from 'react'
import { chatService } from '~/module/instructor/services/ChatApi'
import type { User } from '~/module/instructor/types/Chat'
import { useToast } from '~/shared/hooks/useToast'

interface NewConversationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateConversation: (groupId: string) => void
  availableStudents: User[]
  isCreating?: boolean
  userRole?: 'instructor' | 'student'
}

type Step = 'create' | 'addUsers'

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  onCreateConversation,
  availableStudents,
  isCreating = false,
  userRole = 'instructor'
}) => {
  const { toast } = useToast()
  const [step, setStep] = useState<Step>('create')
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [createdGroupId, setCreatedGroupId] = useState<string | null>(null)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [emailInput, setEmailInput] = useState('')
  const [emailList, setEmailList] = useState<string[]>([])
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [isAddingUsers, setIsAddingUsers] = useState(false)

  // Handle create group (Step 1)
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!groupName.trim()) {
      toast.error('Vui lòng nhập tên nhóm')
      return
    }

    setIsCreatingGroup(true)
    try {
      const group = await chatService.createGroup(
        groupName.trim(),
        groupDescription.trim() || undefined,
        isPrivate
      )

      setCreatedGroupId(group.id)
      setStep('addUsers')
      toast.success('Tạo nhóm thành công! Bây giờ bạn có thể thêm thành viên.')
    } catch (error: any) {
      console.error('Error creating group:', error)
      toast.error(error?.message || 'Không thể tạo nhóm')
    } finally {
      setIsCreatingGroup(false)
    }
  }

  // Handle add email to list
  const handleAddEmail = () => {
    const email = emailInput.trim()

    if (!email) {
      toast.error('Vui lòng nhập email')
      return
    }

    // Strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập đầy đủ email (ví dụ: user@example.com)')
      return
    }

    // Additional check: ensure it's a real email format
    if (!email.includes('@') || email.split('@').length !== 2) {
      toast.error('Email không hợp lệ. Vui lòng nhập đầy đủ email (ví dụ: user@example.com)')
      return
    }

    // Check domain part exists and has at least one dot
    const [, domain] = email.split('@')
    if (!domain || !domain.includes('.')) {
      toast.error('Email không hợp lệ. Vui lòng nhập đầy đủ email (ví dụ: user@example.com)')
      return
    }

    // Check if email already in list (case-insensitive)
    const emailLower = email.toLowerCase()
    if (emailList.includes(emailLower)) {
      toast.error('Email đã được thêm vào danh sách')
      return
    }

    // Store email as-is (lowercase for consistency)
    setEmailList(prev => [...prev, emailLower])
    setEmailInput('')
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailList(prev => prev.filter(email => email !== emailToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddEmail()
    }
  }

  // Handle add users (Step 2)
  const handleAddUsers = async () => {
    if (!createdGroupId || emailList.length === 0) {
      toast.error('Vui lòng thêm ít nhất một email')
      return
    }

    setIsAddingUsers(true)
    try {
      await chatService.addUsersToGroupByEmail(createdGroupId, emailList)
      toast.success(`Đã thêm ${emailList.length} thành viên vào nhóm!`)

      // Call onCreateConversation to refresh the list
      onCreateConversation(createdGroupId)

      // Reset and close
      handleClose()
    } catch (error: any) {
      console.error('Error adding users:', error)
      toast.error(error?.message || 'Không thể thêm thành viên')
    } finally {
      setIsAddingUsers(false)
    }
  }

  // Handle skip adding users
  const handleSkip = () => {
    if (createdGroupId) {
      onCreateConversation(createdGroupId)
      handleClose()
    }
  }

  // Reset and close modal
  const handleClose = () => {
    setStep('create')
    setGroupName('')
    setGroupDescription('')
    setIsPrivate(false)
    setCreatedGroupId(null)
    setSelectedStudents([])
    setEmailInput('')
    setEmailList([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {step === 'addUsers' && (
              <button
                onClick={() => setStep('create')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-white">
              {step === 'create' ? 'Tạo nhóm mới' : 'Thêm thành viên'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step 1: Create Group */}
        {step === 'create' && (
          <form onSubmit={handleCreateGroup} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tên nhóm <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên nhóm..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Group Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mô tả
                </label>
                <textarea
                  placeholder="Nhập mô tả nhóm (tùy chọn)..."
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Privacy Setting */}
              <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 text-violet-600 focus:ring-violet-500"
                />
                <label htmlFor="isPrivate" className="flex-1 cursor-pointer">
                  <div className="text-sm font-medium text-white">Nhóm riêng tư</div>
                  <div className="text-xs text-slate-400">
                    Chỉ người tạo nhóm mới có thể thêm thành viên
                  </div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={!groupName.trim() || isCreatingGroup}
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCreatingGroup ? (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang tạo...</span>
                  </div>
                ) : (
                  'Tạo nhóm'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Add Users */}
        {step === 'addUsers' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {userRole === 'student' ? 'Nhập email giảng viên' : 'Nhập email học viên'}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                  <button
                    onClick={handleAddEmail}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Thêm
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Nhấn Enter hoặc click "Thêm" để thêm email vào danh sách
                </p>
              </div>

              {/* Email List */}
              {emailList.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Danh sách email ({emailList.length})
                  </label>
                  <div className="max-h-64 overflow-y-auto border border-slate-600 rounded-lg p-2 space-y-2">
                    {emailList.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-slate-700/50 rounded-lg"
                      >
                        <span className="text-sm text-white">{email}</span>
                        <button
                          onClick={() => handleRemoveEmail(email)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-slate-700">
              <button
                type="button"
                onClick={handleSkip}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Bỏ qua
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleAddUsers}
                  disabled={emailList.length === 0 || isAddingUsers}
                  className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isAddingUsers ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Đang thêm...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Thêm thành viên</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewConversationModal
