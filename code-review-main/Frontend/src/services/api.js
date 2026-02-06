import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const reviewCode = async (code) => {
    return await api.post('/review', { code });
};

export default api;
