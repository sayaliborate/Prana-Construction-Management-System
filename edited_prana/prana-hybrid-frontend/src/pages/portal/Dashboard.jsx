import React from 'react'
import { Card, CardHeader, CardContent } from '../../components/Card.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const blocks = [
    { title: 'Projects in Progress', value: 8 },
    { title: 'Pending Invoices', value: 5 },
    { title: 'Material Requests', value: 12 },
  ]
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold">Welcome, {user?.name}</div>
      <div className="grid md:grid-cols-3 gap-4">
        {blocks.map(b => (
          <Card key={b.title}><CardHeader><div className="text-sm text-slate-500">{b.title}</div><div className="text-3xl font-bold mt-1">{b.value}</div></CardHeader></Card>
        ))}
      </div>
      <Card><CardHeader><div className="text-lg font-semibold">Activity</div></CardHeader><CardContent><ul className="list-disc pl-5 text-slate-600 space-y-1"><li>Project Alpha updated timeline.</li><li>Invoice INV-104 generated.</li><li>Material request MR-220 approved.</li></ul></CardContent></Card>
    </div>
  )
}
