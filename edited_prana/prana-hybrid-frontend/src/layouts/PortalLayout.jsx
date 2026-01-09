import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Building2, LayoutDashboard, Users, Package, FileText, Settings, Briefcase, Truck, Shield, UserCircle2, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Button({ className='', ...props }) {
  return <button className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-slate-200 bg-white hover:bg-slate-50 transition ${className}`} {...props} />
}

export default function PortalLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const base = [{ to: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> }]
  const admin = [
    { to: '/dashboard/projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/dashboard/employees', label: 'Employees', icon: <Users className="w-4 h-4" /> },
    { to: '/dashboard/inventory', label: 'Inventory', icon: <Package className="w-4 h-4" /> },
    { to: '/dashboard/invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ]
  const manager = [
    { to: '/dashboard/projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/dashboard/inventory', label: 'Inventory', icon: <Package className="w-4 h-4" /> },
    { to: '/dashboard/invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
  ]
  const employee = [
    { to: '/dashboard/my-tasks', label: 'My Tasks', icon: <Shield className="w-4 h-4" /> },
    { to: '/dashboard/requests', label: 'Requests', icon: <Truck className="w-4 h-4" /> },
  ]
  const client = [
    { to: '/dashboard/my-projects', label: 'My Projects', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/dashboard/billing', label: 'Billing', icon: <FileText className="w-4 h-4" /> },
  ]

  let menu = base
  if (user?.role === 'admin') menu = [...base, ...admin]
  else if (user?.role === 'manager') menu = [...base, ...manager]
  else if (user?.role === 'employee') menu = [...base, ...employee]
  else menu = [...base, ...client]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex">
        <aside className="hidden md:flex w-64 min-h-screen sticky top-0 flex-col gap-2 p-4 border-r border-slate-200 bg-white/70 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-200">
            <Building2 className="w-5 h-5" />
            <span className="font-semibold">Prana</span>
          </Link>
          {menu.map(m => (
            <Link key={m.to} to={m.to} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 text-sm">
              {m.icon}{m.label}
            </Link>
          ))}
          <div className="mt-auto flex items-center gap-3 text-sm text-slate-600 px-3">
            <UserCircle2 className="w-5 h-5" />
            <div className="flex-1">
              <div className="font-medium">{user?.name}</div>
              <div className="capitalize">{user?.role}</div>
            </div>
          </div>
          <Button className="mt-3" onClick={() => { logout(); navigate('/'); }}><LogOut className="w-4 h-4" /> Logout</Button>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
