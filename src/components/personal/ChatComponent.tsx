import React, { useState, useEffect, useRef } from 'react';
import chatService from '../../services/ChatService';

interface ChatMessage {
  text: string;
  position: 'left' | 'right';
  sender?: string;
  isNotification?: boolean;
  timestamp: Date;
}

interface ChatComponentProps {
  roomId: string;
  userId: string;
  userType: 'owner' | 'user';
  productId?: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ roomId, userId, userType, productId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        text: `Welcome to the chat! You are connected as a ${userType === 'owner' ? 'seller' : 'buyer'}.`,
        position: 'left',
        isNotification: true,
        timestamp: new Date()
      }
    ]);

    // Join room
    chatService.joinRoom({ roomId, userId, userType });

    chatService.onReceiveMessage(({ userId, message, userType }) => {
      setMessages(prev => [...prev, {
        text: message,
        position: 'left',
        sender: `${userType}`,
        timestamp: new Date()
      }]);
    });

    chatService.onUserJoined((joinedUserType) => {
      setMessages(prev => [...prev, {
        text: `${joinedUserType} has joined the chat`,
        position: 'left',
        isNotification: true,
        timestamp: new Date()
      }]);
    });

    chatService.onUserLeft((leftUserType) => {
      setMessages(prev => [...prev, {
        text: `${leftUserType} has left the chat`,
        position: 'left',
        isNotification: true,
        timestamp: new Date()
      }]);
    });

    return () => {
      chatService.disconnect();
    };
  }, [roomId, userId, userType]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add message to local state
    setMessages(prev => [...prev, {
      text: newMessage,
      position: 'right',
      timestamp: new Date()
    }]);

    // Send message via socket
    chatService.sendMessage(roomId, userId, newMessage, userType);
    
    // Clear input
    setNewMessage('');
    
    // Focus input for next message
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold">
          Chat<span className="text-blue-600">Connect</span>
        </h1>
        <p className="text-gray-600">
          {userType === 'user' 
            ? 'Connect with distributors and find great deals!'
            : 'Connect with buyers interested in your products!'}
        </p>
        {productId && <p className="text-sm text-gray-500">Product ID: {productId}</p>}
      </div>
      
      <div
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 mb-3 ${
              message.isNotification
                ? 'mx-auto bg-gray-100 text-gray-600 text-center text-sm py-2'
                : message.position === 'right'
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-200 text-gray-800'
            }`}
          >
            {message.sender && (
              <div className="text-xs opacity-75 mb-1">
                {message.sender}
              </div>
            )}
            <div className="flex justify-between items-end">
              <div className="mr-2">{message.text}</div>
              <div className="text-xs opacity-75 self-end whitespace-nowrap">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mr-auto bg-gray-100 text-gray-600 rounded-lg p-3 mb-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
      
      <form
        onSubmit={sendMessage}
        className="bg-white p-4 shadow-lg flex space-x-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;