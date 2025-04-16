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
  console.log("Typing",setIsTyping);
  
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
      console.log("th uer id is",userId);
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with improved styling */}
      <div className="p-4 bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Chat<span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-sm text-gray-600">
              {userType === 'user' 
                ? 'Connect with distributors and find great deals!'
                : 'Connect with buyers interested in your products!'}
            </p>
          </div>
          <div className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            {userType === 'user' ? 'Buyer' : 'Seller'}
          </div>
        </div>
        {productId && (
          <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            Product ID: {productId}
          </div>
        )}
      </div>
      
      {/* Chat messages container with improved styling */}
      <div 
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-opacity-50 bg-gray-50"
        style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.025) 2%, transparent 0%)",
          backgroundSize: "100px 100px"
        }}
      >
        <div className="flex flex-col max-w-3xl mx-auto space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.position === 'right' ? 'justify-end' : message.isNotification ? 'justify-center' : 'justify-start'}`}
            >
              {!message.isNotification && message.position === 'left' && (
                <div className="flex items-center justify-center w-8 h-8 mt-1 mr-2 text-xs font-medium text-gray-700 bg-gray-300 rounded-full">
                  {message.sender ? message.sender.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              
              <div
                className={`rounded-lg p-3 ${
                  message.isNotification
                    ? 'bg-gray-100 text-gray-600 text-center text-sm py-2 px-4 max-w-md'
                    : message.position === 'right'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm'
                }`}
                style={{
                  maxWidth: message.isNotification ? '80%' : '70%'
                }}
              >
                {message.sender && !message.isNotification && (
                  <div className="mb-1 text-xs font-medium opacity-75">
                    {message.sender}
                  </div>
                )}
                <div className="flex items-end justify-between gap-2">
                  <div className={`${message.isNotification ? 'text-center w-full' : ''}`}>
                    {message.text}
                  </div>
                  <div className={`text-xs opacity-75 self-end whitespace-nowrap ${
                    message.position === 'right' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
              
              {!message.isNotification && message.position === 'right' && (
                <div className="flex items-center justify-center w-8 h-8 mt-1 ml-2 text-xs font-medium text-white bg-blue-600 rounded-full">
                  {userType === 'user' ? 'B' : 'S'}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center justify-center w-8 h-8 mr-2 text-xs font-medium text-gray-700 bg-gray-300 rounded-full">
                ?
              </div>
              <div className="p-3 text-gray-600 bg-white border border-gray-200 rounded-lg rounded-tl-none shadow-sm">
                <div className="flex items-center h-5 px-1 space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Message input form with improved styling */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="flex max-w-3xl mx-auto">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              className="absolute text-gray-400 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 text-white transition-colors duration-300 bg-blue-500 rounded-r-lg hover:bg-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatComponent;