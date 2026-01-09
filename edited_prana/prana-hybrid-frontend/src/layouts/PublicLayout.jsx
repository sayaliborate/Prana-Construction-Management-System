import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Building2, Home as HomeIcon, Info, Layers, GalleryHorizontal, Phone, LayoutDashboard, LogIn, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Button({ className='', ...props }) {
  return <button className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-slate-200 bg-white hover:bg-slate-50 transition ${className}`} {...props} />
}

export default function PublicLayout() {
  const nav = [
    { to: '/', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
    { to: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { to: '/services', label: 'Services', icon: <Layers className="w-4 h-4" /> },
    { to: '/projects', label: 'Projects', icon: <GalleryHorizontal className="w-4 h-4" /> },
    { to: '/contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ]
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            <span className="font-bold text-slate-800">Prana Constructions</span>
          </Link>
          <nav className="hidden md:flex gap-2">
            {nav.map(n => (
              <Link key={n.to} to={n.to} className="px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center gap-2 text-sm font-medium">
                {n.icon}{n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {!user ? (
              <Link to="/login"><Button><LogIn className="w-4 h-4" /> Login</Button></Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/dashboard"><Button className="hidden sm:inline-flex"><LayoutDashboard className="w-4 h-4" /> Dashboard</Button></Link>
                <Button onClick={logout}><LogOut className="w-4 h-4" /> Logout</Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> © {new Date().getFullYear()} Prana Constructions</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
