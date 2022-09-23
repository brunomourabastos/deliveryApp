import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'http://localhost:3001',
});

export default apiRequest;

// register route
export const registerUser = async (info) => apiRequest.post('/users/register', {
  ...info,
});
