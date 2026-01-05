import api from '../../utils/api';

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export const getChats = async (token: string): Promise<ChatMessage[]> => {
  const response = await api.get('/chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
