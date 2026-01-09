import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Login() {
    console.log("Login component rendered"); // Added log
  const { login } = useAuth()
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()
  const loc = useLocation()

    const onSubmit = async (e) => {
        console.log("Form submitted"); // Added log
        console.log("Login attempt:", { username, password }); // Added log
    e.preventDefault()
    setError('')
    try {
      await login({ username, password })
      const to = loc.state?.from?.pathname || '/dashboard'
      nav(to, { replace: true })
    } catch (e) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input 
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Enter your username" 
            type="text" 
            value={username} 
            onChange={e=>setusername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Enter your password" 
            type="password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm p-2 bg-red-50 rounded-lg">{error}</div>}
        <button 
          type="submit"
          className="w-full rounded-xl px-4 py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in
        </button>
        <div className="text-xs text-slate-500 text-center mt-4">
          Tip: use an email like <b>admin@demo.com</b>, <b>manager@demo.com</b>, <b>client@demo.com</b> to see role-based menus.
        </div>
      </form>
    </div>
  )
}
