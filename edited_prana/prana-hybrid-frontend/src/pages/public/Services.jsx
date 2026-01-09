import React from 'react'
import { Card, CardHeader, CardContent } from "../../components/Card.jsx"
import { Wrench, Ruler, Building2, Package, Truck, Layers } from "lucide-react"

export default function Services() {
  const items = [
    { icon: <Wrench className="h-6 w-6 text-blue-600" />, title: 'EPC Contracts', desc: 'End-to-end engineering, procurement and construction with single-point accountability.' },
    { icon: <Ruler className="h-6 w-6 text-blue-600" />, title: 'Civil Works', desc: 'Residential and commercial structures with modern reinforced frameworks.' },
    { icon: <Building2 className="h-6 w-6 text-blue-600" />, title: 'Industrial Projects', desc: 'Factories, plants, and utility infrastructure with safety-first execution.' },
    { icon: <Layers className="h-6 w-6 text-blue-600" />, title: 'Interior Fit-outs', desc: 'Premium corporate and retail interiors with fast-track delivery.' },
    { icon: <Truck className="h-6 w-6 text-blue-600" />, title: 'Roads & Paving', desc: 'Urban roads, concrete paving and drainage development.' },
    { icon: <Package className="h-6 w-6 text-blue-600" />, title: 'Material Supply', desc: 'Quality assured cement, steel, aggregates and fixtures.' },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(x => (
        <Card key={x.title} className="p-4 shadow-lg rounded-2xl">
          <CardHeader className="space-y-2">
            {x.icon}
            <div className="text-lg font-semibold">{x.title}</div>
            <div className="text-slate-600 text-sm">{x.desc}</div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
