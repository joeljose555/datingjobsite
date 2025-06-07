import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PaperclipIcon, SendIcon, SmileIcon } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

interface ChatInterfaceProps {
  conversations?: Conversation[];
  currentUserId?: string;
  onSendMessage?: (conversationId: string, message: string) => void;
  onAttachFile?: (conversationId: string, file: File) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversations = defaultConversations,
  currentUserId = 'user-1',
  onSendMessage = () => {},
  onAttachFile = () => {},
}) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    conversations.length > 0 ? conversations[0].id : null
  );
  const [messageText, setMessageText] = useState('');

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      onSendMessage(selectedConversation, messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedConversation) {
      onAttachFile(selectedConversation, e.target.files[0]);
    }
  };

  return (
    <div className="flex h-full w-full bg-background">
      {/* Sidebar with conversations */}
      <div className="w-80 border-r bg-muted/10">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent ${selectedConversation === conversation.id ? 'bg-accent' : ''}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <Avatar>
                  <AvatarImage src={conversation.userAvatar} alt={conversation.userName} />
                  <AvatarFallback>{conversation.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{conversation.userName}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {conversation.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {selectedConversation && currentConversation ? (
          <>
            {/* Chat header */}
            <div className="flex items-center border-b p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentConversation.userAvatar} alt={currentConversation.userName} />
                <AvatarFallback>
                  {currentConversation.userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">{currentConversation.userName}</p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>

            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${message.senderId === currentUserId ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      <p>{message.text}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SmileIcon className="h-5 w-5" />
                </Button>
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="ghost" size="icon" className="rounded-full" type="button">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                  <SendIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="text-muted-foreground">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const formatTime = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (date >= yesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Default mock data
const defaultConversations: Conversation[] = [
  {
    id: 'conv-1',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    lastMessage: 'Your resume looks great! When can you start?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-2',
        text: 'Hi there! I saw your application for the Frontend Developer position.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: true,
      },
      {
        id: 'msg-2',
        senderId: 'user-1',
        text: 'Hello! Yes, I'm very interested in the position. I have 3 years of experience with React.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
        isRead: true,
      },
      {
        id: 'msg-3',
        senderId: 'user-2',
        text: 'That's great to hear! Your resume looks impressive. Would you be available for an interview next week?',
        timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
        isRead: true,
      },
      {
        id: 'msg-4',
        senderId: 'user-1',
        text: 'Absolutely! I'm free on Tuesday and Thursday afternoon.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        isRead: true,
      },
      {
        id: 'msg-5',
        senderId: 'user-2',
        text: 'Perfect! Let's schedule for Tuesday at 2 PM. I'll send you a calendar invite with the details.',
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
        isRead: true,
      },
      {
        id: 'msg-6',
        senderId: 'user-2',
        text: 'Your resume looks great! When can you start?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-2',
    userId: 'user-3',
    userName: 'Alex Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    lastMessage: 'We'd like to move forward with your application',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    messages: [
      {
        id: 'msg-7',
        senderId: 'user-3',
        text: 'Hello! Thanks for applying to our UX Designer position.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        isRead: true,
      },
      {
        id: 'msg-8',
        senderId: 'user-1',
        text: 'Hi Alex! Thank you for considering my application.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
        isRead: true,
      },
      {
        id: 'msg-9',
        senderId: 'user-3',
        text: 'We'd like to move forward with your application',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-3',
    userId: 'user-4',
    userName: 'Taylor Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=taylor',
    lastMessage: 'Do you have experience with TypeScript?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    messages: [
      {
        id: 'msg-10',
        senderId: 'user-4',
        text: 'Hi there! I'm reviewing your application for the Senior Developer role.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
        isRead: true,
      },
      {
        id: 'msg-11',
        senderId: 'user-1',
        text: 'Great to hear from you! I'm excited about the opportunity.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5), // 24.5 hours ago
        isRead: true,
      },
      {
        id: 'msg-12',
        senderId: 'user-4',
        text: 'Do you have experience with TypeScript?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
        isRead: true,
      },
    ],
  },
];

export default ChatInterface;
