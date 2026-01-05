let authToken: string | null = null;

export const setToken = (token: string | null) => {
  authToken = token;
};

export const getToken = (): string | null => {
  return authToken;
};
