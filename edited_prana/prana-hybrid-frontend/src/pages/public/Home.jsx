import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent, Button } from '../../components/Card.jsx'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Home() {
  const stats = [
    { label: 'Projects Delivered', value: 128 },
    { label: 'On-Time Rate', value: '97%' },
    { label: 'Active Sites', value: 12 },
  ]
  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">Building with Precision, Delivering with Pride</h1>
          <p className="mt-4 text-slate-600 text-lg">Prana Constructions specializes in end-to-end civil projects, EPC, and infrastructure with a focus on quality, safety, and time-bound delivery.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/projects"><Button>View Projects</Button></Link>
            <Link to="/contact"><Button className="bg-slate-900 text-white hover:bg-slate-800">Get a Quote</Button></Link>
          </div>
        </div>
        <Card className="overflow-hidden">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" alt="Construction" className="w-full h-64 object-cover" />
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {stats.map(s => (
          <Card key={s.label}><CardHeader><div className="text-sm text-slate-500">{s.label}</div><div className="text-3xl font-bold mt-1">{s.value}</div></CardHeader></Card>
        ))}
      </div>

      <Card>
        <CardHeader><div className="text-lg font-semibold">Recent Performance</div></CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{m:'Jan',v:32},{m:'Feb',v:28},{m:'Mar',v:36},{m:'Apr',v:40},{m:'May',v:38},{m:'Jun',v:45}]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="v" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
