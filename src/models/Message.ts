export interface Message {
  userId: string;
  conversationId: string;
  lastMessageText: string;
  lastMessageTime: string;
  unseenCount: number;
}

export interface UserProfile {
  userId: string;
  username: string;
  profilePicture?: string;
}