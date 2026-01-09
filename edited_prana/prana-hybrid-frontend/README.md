# Prana Hybrid Frontend (React + Vite + Tailwind)

A clean, organized **hybrid** frontend:
- **Public website** (Home, About, Services, Projects, Contact)
- **Portal** with **role-based dashboards** (admin, manager, employee, client)

## Tech Stack
- React 18, Vite, TailwindCSS
- React Router v6
- Axios (with interceptor)
- Framer Motion + Lucide React
- Recharts

## Quick Start
```bash
npm i
cp .env.example .env
npm run dev
```

Set your API base in `.env`:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Folder Structure
```
src/
  api/           # axios, endpoints
  components/    # shared UI
  context/       # auth/session
  layouts/       # public + portal shells
  pages/         # public + portal pages
  routes/        # route config
  styles/        # global CSS
```

## Auth Integration (Django)
- Replace `login()` in `context/AuthContext.jsx` with your JWT endpoint.
- Store tokens and attach via Axios interceptor (`api/axios.js`).
- Use `/users/me/` (or equivalent) to fetch role & profile.

## Roles
- `admin`, `manager`, `employee`, `client`

Emails used in demo to map to roles:
- Contains `admin` → admin
- Contains `manager` → manager
- Contains `client` → client
- Otherwise → employee
