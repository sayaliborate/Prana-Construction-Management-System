import React from 'react'
import { Card } from '../../components/Card.jsx'

const data = [
  { id:1, title:'Riverview Apartments', img:'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop' },
  { id:2, title:'Corporate Tower', img:'https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1200&auto=format&fit=crop' },
  { id:3, title:'Industrial Shed', img:'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop' },
]

export default function Projects() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {data.map(p => (
        <Card key={p.id} className="overflow-hidden">
          <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-slate-600 mt-1">Delivered with high safety and on-time commitment.</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
