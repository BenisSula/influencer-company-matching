import api from '../../utils/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const signupUser = async (payload: SignupPayload) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};
