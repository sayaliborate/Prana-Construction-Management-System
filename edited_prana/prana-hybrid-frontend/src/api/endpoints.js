export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE}/token/`, // Updated endpoint
    refresh: `${API_BASE}/auth/jwt/refresh/`,
    me: `${API_BASE}/users/me/`,
  },
  projects: `${API_BASE}/projects/projects/`,
  employees: {
    supervisors: `${API_BASE}/employees/supervisors/`,
    labours: `${API_BASE}/employees/labours/`,
  },
  inventory: `${API_BASE}/inventory/materials/`,
  invoices: `${API_BASE}/billing/invoices/`,
  clients: `${API_BASE}/company/clients/`,
  suppliers: `${API_BASE}/company/suppliers/`,
};
