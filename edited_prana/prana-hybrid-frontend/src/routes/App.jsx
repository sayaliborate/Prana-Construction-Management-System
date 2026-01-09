import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import AuthProvider, { useAuth } from '../context/AuthContext'
import PublicLayout from '../layouts/PublicLayout'
import PortalLayout from '../layouts/PortalLayout'
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Services from '../pages/public/Services'
import Projects from '../pages/public/Projects'
import Contact from '../pages/public/Contact'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/portal/Dashboard'
import Invoices from '../pages/portal/Invoices'
import Inventory from '../pages/portal/Inventory'
import Employees from '../pages/portal/Employees'
import ProjectList from '../pages/portal/ProjectList'
import MyTasks from '../pages/portal/MyTasks'
import Requests from '../pages/portal/Requests'
import ClientProjects from '../pages/portal/ClientProjects'
import Billing from '../pages/portal/Billing'
import Settings from '../pages/portal/Settings'
import Privacy from '../pages/public/Privacy'
import Terms from '../pages/public/Terms'
import ProjectForm from '../pages/portal/ProjectForm'   // ✅ added

function RequireAuth() {
  const { user } = useAuth()
  if (!user) {
      console.log("User not authenticated, redirecting to login"); // Added log
      return <Navigate to="/login" replace />
  }
  return <Outlet />
}

function RequireRole({ roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Site */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* Auth */}
        <Route path="login" element={<Login />} />

        {/* Portal (Protected) */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<PortalLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectList />} />
             <Route path="projects" element={<ProjectList />} />
<Route path="projects" element={<ProjectList />} />     {/* duplicate */}

            <Route path="employees" element={<Employees />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="settings" element={<Settings />} />
           


            {/* Employee */}
            <Route element={<RequireRole roles={['employee']} />}>
              <Route path="my-tasks" element={<MyTasks />} />
              <Route path="requests" element={<Requests />} />
            </Route>

            {/* Client */}
            <Route element={<RequireRole roles={['client']} />}>
              <Route path="my-projects" element={<ClientProjects />} />
              <Route path="billing" element={<Billing />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
