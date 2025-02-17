import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizy-frontent.vercel.app/api', 
  // baseURL: 'http://localhost:3000/api', 
  withCredentials: true, 
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (data) => {
  const response = await api.post('/users/login', data);
  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken);
  }
  return response;
};

export const register = async (data) => {
  const response = await api.post('/users/register', data);
  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken);
  }
  return response;
};

export const sendOtp = async (data) => {
  const response = await api.post('/otp', data);
  return response;
};

export const logout = async () => {
  await api.post('/users/logout');
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const fetchTopics = async () => {
  try {
    const response = await api.post('/fetchtopic');
    return response.data && response.data.data ? response : { data: { data: [] } };
  } catch (error) {
    console.error('Error fetching topics:', error);
    return { data: { data: [] } };
  }
};

export const getQuestions = async (topic) => {
  try {
    const response = await api.post(`/questions/${topic}`);
    return response.data && response.data.data ? response : { data: { data: [] } };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { data: { data: [] } };
  }
};

export const submitScore = (data) => api.post('/score', data);
export const selectTopic = (data) => api.post('/select', data);
export const fetchUser = () => api.get('/user');

export default api;