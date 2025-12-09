import { CheckCheck, MoreVertical, Paperclip, Search, Send } from 'lucide-react';
import { useState } from 'react';

const MessagesContent = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      role: 'Instructor',
      lastMessage: 'Great work on the assignment! Let me know if you have any questions.',
      time: '2 hours ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'Sarah Johnson', text: 'Hi! I wanted to check in on your progress with the course.', time: '10:30 AM', isMe: false },
        { id: 2, sender: 'You', text: 'Hi Sarah! I\'m doing well, thank you for asking.', time: '10:45 AM', isMe: true },
        { id: 3, sender: 'Sarah Johnson', text: 'Great work on the assignment! Let me know if you have any questions.', time: '11:00 AM', isMe: false }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      role: 'Instructor',
      lastMessage: 'The next lesson will be available tomorrow.',
      time: '1 day ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'Michael Chen', text: 'The next lesson will be available tomorrow.', time: 'Yesterday', isMe: false }
      ]
    },
    {
      id: 3,
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      role: 'Instructor',
      lastMessage: 'Thanks for your feedback on the course!',
      time: '3 days ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'You', text: 'I really enjoyed the course, thank you!', time: '3 days ago', isMe: true },
        { id: 2, sender: 'Emily Davis', text: 'Thanks for your feedback on the course!', time: '3 days ago', isMe: false }
      ]
    }
  ];

  const currentConversation = conversations[selectedConversation];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden">
      <div className="grid md:grid-cols-3 h-[600px]">
        {/* Conversations List */}
        <div className="border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(index)}
                className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-700/50 transition ${selectedConversation === index ? 'bg-slate-700' : ''
                  }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-white truncate">{conversation.name}</h4>
                      <span className="text-xs text-slate-400">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 flex flex-col">
          {currentConversation && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentConversation.avatar}
                    alt={currentConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{currentConversation.name}</h3>
                    <p className="text-xs text-slate-400">{currentConversation.role}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white transition">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                      {!message.isMe && (
                        <div className="text-xs text-slate-400 mb-1">{message.sender}</div>
                      )}
                      <div
                        className={`rounded-lg p-3 ${message.isMe
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                          : 'bg-slate-700 text-white'
                          }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`text-xs text-slate-400 mt-1 flex items-center gap-1 ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                        <span>{message.time}</span>
                        {message.isMe && (
                          <CheckCheck className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <button className="text-slate-400 hover:text-white transition">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-2.5 rounded-lg hover:shadow-violet-500/50 transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesContent;