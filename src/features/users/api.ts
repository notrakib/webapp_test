import { api } from "../../lib/axios";

export const fetchUsers = () => api.get('/users');

export const followUser = (id: number) =>
    api.post(`/users/${id}/follow`);

export const unfollowUser = (id: number) =>
    api.delete(`/users/${id}/follow`);

export const isUserFollowed = (id: number) =>
    api.get(`/users/${id}/is-followed`);
