import React, { useState, useEffect } from 'react'
import { Card } from '../../components/Card.jsx'
import api from '../../api/axios.js'
import { ENDPOINTS } from '../../api/endpoints.js'

export default function Inventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        console.log('Fetching inventory from:', ENDPOINTS.inventory)
        const response = await api.get(ENDPOINTS.inventory)
        console.log('Inventory response:', response.data)
        // Handle different response formats - check if data is an array or object with results
        const inventoryData = Array.isArray(response.data) ? response.data : response.data.results || []
        console.log('Processed inventory data:', inventoryData)
        setInventory(inventoryData)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch inventory')
        setLoading(false)
        console.error('Error fetching inventory:', err)
      }
    }

    fetchInventory()
  }, [])

  if (loading) {
    return (
      <Card className="p-4">
        <div className="text-center text-slate-500">Loading inventory...</div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-center text-red-500">{error}</div>
      </Card>
    )
  }

  return (
    <Card className="p-4 overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="py-2">Item</th>
            <th className="py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} className="border-b last:border-0">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.current_stock} {item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
