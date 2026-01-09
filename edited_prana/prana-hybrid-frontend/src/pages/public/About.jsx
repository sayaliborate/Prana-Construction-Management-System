import React from 'react'
import { Card } from '../../components/Card.jsx'

export default function About() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="text-slate-600">We are a Pune-based construction firm with expertise in residential, commercial, and industrial projects. Our philosophy blends modern engineering with sustainable practices.</p>
        <p className="text-slate-600">ISO-certified processes, transparent communication, and on-site safety are at the core of our delivery framework.</p>
      </div>
      <Card>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop" alt="Team" className="w-full h-72 object-cover rounded-2xl" />
      </Card>
    </div>
  )
}
