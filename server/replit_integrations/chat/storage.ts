export interface ChatConversation {
  id: number;
  title: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: number;
  conversationId: number;
  role: string;
  content: string;
  createdAt: Date;
}

export interface IChatStorage {
  getConversation(id: number): Promise<ChatConversation | undefined>;
  getAllConversations(): Promise<ChatConversation[]>;
  createConversation(title: string): Promise<ChatConversation>;
  deleteConversation(id: number): Promise<void>;
  getMessagesByConversation(conversationId: number): Promise<ChatMessage[]>;
  createMessage(conversationId: number, role: string, content: string): Promise<ChatMessage>;
}

const conversations: ChatConversation[] = [];
const messages: ChatMessage[] = [];
let nextConversationId = 1;
let nextMessageId = 1;

export const chatStorage: IChatStorage = {
  async getConversation(id: number) {
    return conversations.find((conversation) => conversation.id === id);
  },

  async getAllConversations() {
    return [...conversations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async createConversation(title: string) {
    const conversation = {
      id: nextConversationId++,
      title,
      createdAt: new Date(),
    };
    conversations.push(conversation);
    return conversation;
  },

  async deleteConversation(id: number) {
    const conversationIndex = conversations.findIndex((conversation) => conversation.id === id);
    if (conversationIndex !== -1) {
      conversations.splice(conversationIndex, 1);
    }

    for (let index = messages.length - 1; index >= 0; index--) {
      if (messages[index].conversationId === id) {
        messages.splice(index, 1);
      }
    }
  },

  async getMessagesByConversation(conversationId: number) {
    return messages
      .filter((message) => message.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  },

  async createMessage(conversationId: number, role: string, content: string) {
    const message = {
      id: nextMessageId++,
      conversationId,
      role,
      content,
      createdAt: new Date(),
    };
    messages.push(message);
    return message;
  },
};
