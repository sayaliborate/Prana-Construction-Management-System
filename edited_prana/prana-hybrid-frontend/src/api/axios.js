import axios from 'axios'
import { API_BASE } from './endpoints'

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const access = localStorage.getItem('access_token')
  if (access) config.headers.Authorization = `Bearer ${access}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (!refresh) return Promise.reject(error)
      try {
        const { data } = await axios.post(`${API_BASE}/auth/jwt/refresh/`, { refresh })
        localStorage.setItem('access_token', data.access)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch (e) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }
    }
    return Promise.reject(error)
  }
)


export const createProject = async (projectData) => {
  const response = await api.post("/projects/projects/", projectData);
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects/projects/");
  return response.data;
};

export default api


