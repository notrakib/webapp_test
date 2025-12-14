import { api } from "../../lib/axios";

export const fetchTimeline = () => api.get('/murmurs');


export const createMurmur = (content: string) =>
    api.post('/me/murmurs', { content });


export const deleteMurmur = (id: number) =>
    api.delete(`/me/murmurs/${id}`);


export const likeMurmur = (id: number) =>
    api.post(`/murmurs/${id}/like`);


export const unlikeMurmur = (id: number) =>
    api.delete(`/murmurs/${id}/like`);