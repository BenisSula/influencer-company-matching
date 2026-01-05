import api from '../../utils/api';

export interface MatchItem {
  id: string;
  name: string;
  type: 'company' | 'influencer';
  followers?: number;
  targetAudience?: string;
  costPerFollower?: number;
}

export const getMatches = async (token: string): Promise<MatchItem[]> => {
  const response = await api.get('/matches', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
