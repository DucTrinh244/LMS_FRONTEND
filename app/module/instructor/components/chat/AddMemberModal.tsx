import React, { useState } from 'react'
import { X, Mail } from 'lucide-react'
import { chatService } from '~/module/instructor/services/ChatApi'
import { useToast } from '~/shared/hooks/useToast'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAddMembers: (emails: string[]) => Promise<void>
  groupId: string
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMembers,
  groupId
}) => {
  const { toast } = useToast()
  const [emailInput, setEmailInput] = useState('')
  const [emailList, setEmailList] = useState<string[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const handleAddEmail = () => {
    const email = emailInput.trim()
    
    if (!email) {
      toast.error('Vui lòng nhập email')
      return
    }

    // Strict email validation - must contain @ and valid domain
    // Do NOT auto-format or add @gmail.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập đầy đủ email (ví dụ: user@example.com)')
      return
    }

    // Additional check: ensure it's a real email format, not just text
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

    // Store email as-is (lowercase for consistency, but no auto-formatting)
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

  const handleAdd = async () => {
    if (emailList.length === 0) {
      toast.error('Vui lòng thêm ít nhất một email')
      return
    }

    setIsAdding(true)
    try {
      await onAddMembers(emailList)
      toast.success(`Đã thêm ${emailList.length} thành viên vào nhóm!`)
      
      // Reset form
      setEmailList([])
      setEmailInput('')
      onClose()
    } catch (error: any) {
      console.error('Error adding members:', error)
      toast.error(error?.message || 'Không thể thêm thành viên')
    } finally {
      setIsAdding(false)
    }
  }

  const handleClose = () => {
    setEmailList([])
    setEmailInput('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Thêm thành viên</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nhập email thành viên
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            type="button"
            onClick={handleAdd}
            disabled={emailList.length === 0 || isAdding}
            className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isAdding ? (
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
  )
}

export default AddMemberModal

