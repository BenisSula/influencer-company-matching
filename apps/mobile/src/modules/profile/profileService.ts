import api from '../../utils/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  followersCount: number;
  followingCount: number;
}

export const getProfile = async (token: string): Promise<UserProfile> => {
  const response = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
