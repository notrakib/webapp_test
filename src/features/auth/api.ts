import { api } from "../../lib/axios";

export const login = (data: { username: string; password: string }) =>
    api.post('/auth/login', data);

export const register = (data: { username: string; password: string }) =>
    api.post('/auth/register', data);