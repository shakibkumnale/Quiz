import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizy-frontent.vercel.app/api',
  // baseURL: 'http://localhost:3000/api', 

  withCredentials: true,
  timeout: 10000, // Add timeout
});

api.interceptors.request.use((config) => {
  const authState = localStorage.getItem('authState');
  if (authState) {
    const { accessToken } = JSON.parse(authState);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('authState');
      // Use window.location.replace to avoid adding to history
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export const login = async (data) => {
  const response = await api.post('/users/login', data);
  if (response.data.success) {
    const authState = {
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
      isAuthenticated: true
    };
    localStorage.setItem('authState', JSON.stringify(authState));
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