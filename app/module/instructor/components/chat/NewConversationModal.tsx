import React, { useState } from 'react'
import type { CreateConversationRequest, User } from '~/module/instructor/types/Chat'

interface NewConversationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateConversation: (data: CreateConversationRequest) => Promise<void>
  availableStudents: User[]
  isCreating?: boolean
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  onCreateConversation,
  availableStudents,
  isCreating = false
}) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [conversationTitle, setConversationTitle] = useState('')
  const [conversationType, setConversationType] = useState<'direct' | 'group'>('direct')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedStudents.length === 0) return

    try {
      await onCreateConversation({
        participantIds: selectedStudents,
        title: conversationType === 'group' ? conversationTitle : undefined,
        type: conversationType
      })
      
      // Reset form
      setSelectedStudents([])
      setConversationTitle('')
      setSearchTerm('')
      onClose()
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId)
      } else {
        return [...prev, studentId]
      }
    })
  }

  const filteredStudents = availableStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Auto-detect conversation type based on selection
  React.useEffect(() => {
    if (selectedStudents.length > 1) {
      setConversationType('group')
    } else {
      setConversationType('direct')
    }
  }, [selectedStudents.length])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Cuộc trò chuyện mới</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Search students */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tìm học viên
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Students list */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Chọn học viên ({selectedStudents.length} được chọn)
              </label>
              <div className="max-h-48 overflow-y-auto border border-slate-600 rounded-lg">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => toggleStudentSelection(student.id)}
                      className="flex items-center space-x-3 p-3 hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => {}} // Controlled by onClick above
                        className="rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                      />
                      
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-600 flex items-center justify-center flex-shrink-0">
                        {student.avatar ? (
                          <img 
                            src={student.avatar} 
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-medium text-white">
                            {student.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {student.email}
                        </p>
                      </div>
                      
                      {student.isOnline && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400">
                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm">Không tìm thấy học viên</p>
                  </div>
                )}
              </div>
            </div>

            {/* Group title (only for group conversations) */}
            {conversationType === 'group' && selectedStudents.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tên nhóm (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên nhóm..."
                  value={conversationTitle}
                  onChange={(e) => setConversationTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Conversation type indicator */}
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                {conversationType === 'direct' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Cuộc trò chuyện riêng tư</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Cuộc trò chuyện nhóm ({selectedStudents.length + 1} thành viên)</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={selectedStudents.length === 0 || isCreating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Tạo...</span>
                </div>
              ) : (
                'Tạo cuộc trò chuyện'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewConversationModal
