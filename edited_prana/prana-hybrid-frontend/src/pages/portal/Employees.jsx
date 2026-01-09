import React, { useState, useEffect } from 'react'
import { Card } from '../../components/Card.jsx'
import api from '../../api/axios.js'
import { ENDPOINTS } from '../../api/endpoints.js'

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log('Fetching supervisors from:', ENDPOINTS.employees.supervisors)
        console.log('Fetching labours from:', ENDPOINTS.employees.labours)
        
        // Fetch both supervisors and labours
        const [supervisorsResponse, laboursResponse] = await Promise.all([
          api.get(ENDPOINTS.employees.supervisors),
          api.get(ENDPOINTS.employees.labours)
        ])

        console.log('Supervisors response:', supervisorsResponse.data)
        console.log('Labours response:', laboursResponse.data)

        // Combine and format the data
        const supervisors = supervisorsResponse.data.map(supervisor => ({
          ...supervisor,
          role: supervisor.designation || 'Supervisor',
          type: 'supervisor'
        }))

        const labours = laboursResponse.data.map(labour => ({
          ...labour,
          role: labour.work_type ? labour.work_type.replace('_', ' ').toUpperCase() : 'Labour',
          type: 'labour'
        }))

        console.log('Combined employees:', [...supervisors, ...labours])
        setEmployees([...supervisors, ...labours])
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch employees')
        setLoading(false)
        console.error('Error fetching employees:', err)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) {
    return (
      <Card className="p-4">
        <div className="text-center text-slate-500">Loading employees...</div>
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
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={`${employee.type}-${employee.id}`} className="border-b last:border-0">
              <td className="py-2">{employee.name}</td>
              <td className="py-2">{employee.role}</td>
              <td className="py-2 capitalize">{employee.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
