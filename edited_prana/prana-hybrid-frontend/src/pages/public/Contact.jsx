import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Button } from '../../components/Card.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); setSent(true) }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Get in touch</h2>
        <p className="text-slate-600">Tell us about your project. We usually respond within 24 hours.</p>
      </div>
      <Card>
        <CardHeader><div className="text-lg font-semibold">Contact Form</div></CardHeader>
        <CardContent>
          {sent ? <div className="text-green-700">Thanks! We'll reach out shortly.</div> : (
            <form onSubmit={submit} className="space-y-3">
              <input required className="w-full border border-slate-300 rounded-xl px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
              <input required type="email" className="w-full border border-slate-300 rounded-xl px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
              <textarea required className="w-full border border-slate-300 rounded-xl px-3 py-2" rows="4" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
              <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">Send</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
