const TOKEN_KEY = 'access_token';
const USER_ID = 'user_id';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const setUserID = (id: number) => localStorage.setItem(USER_ID, id.toString());
export const getUserID = () => localStorage.getItem(USER_ID);
export const clearUserID = () => localStorage.removeItem(USER_ID);