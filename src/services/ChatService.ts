import { io, Socket } from 'socket.io-client';

interface ChatRoom {
  roomId: string;
  userId: string;
  userType: 'owner' | 'user';
}

type MessageHandler = (data: { userId: string; message: string; userType: string }) => void;
type UserStatusHandler = (userType: string) => void;

class ChatService {
  private socket: Socket | null = null;
  private connected = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Connect to the same port as your Express server
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    this.socket.on('connect', () => {
      this.connected = true;
      console.log('Connected to chat server');
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      console.log('Disconnected from chat server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.connected = false;
    });
  }

  public joinRoom({ roomId, userId, userType }: ChatRoom) {
    if (!this.socket) {
      console.error('Cannot join room: socket not initialized');
      return false;
    }

    if (!this.connected) {
      console.log('Socket not yet connected, attempting to connect...');
      this.socket.connect();
      
      // Set up event listener to join room after connection
      this.socket.once('connect', () => {
        this.socket?.emit('join-room', { roomId, userId, userType });
        console.log(`Joined room ${roomId} as ${userType}`);
      });
      
      return true;
    }

    this.socket.emit('join-room', { roomId, userId, userType });
    console.log(`Joined room ${roomId} as ${userType}`);
    return true;
  }

  public sendMessage(roomId: string, userId: string, message: string, userType: 'owner' | 'user') {
    if (!this.socket) {
      console.error('Cannot send message: socket not initialized');
      return false;
    }

    if (!this.connected) {
      console.error('Cannot send message: socket not connected');
      return false;
    }

    this.socket.emit('sendMessage', { roomId, userId, message, userType });
    return true;
  }

  public onReceiveMessage(callback: MessageHandler) {
    if (!this.socket) {
      console.error('Cannot set up message handler: socket not initialized');
      return;
    }
    
    this.socket.on('receiveMessage', callback);
  }

  public onUserJoined(callback: UserStatusHandler) {
    if (!this.socket) {
      console.error('Cannot set up user joined handler: socket not initialized');
      return;
    }
    
    this.socket.on('user-joined', callback);
  }

  public onUserLeft(callback: UserStatusHandler) {
    if (!this.socket) {
      console.error('Cannot set up user left handler: socket not initialized');
      return;
    }
    
    this.socket.on('left', callback);
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }
}

const chatService = new ChatService();
export default chatService;