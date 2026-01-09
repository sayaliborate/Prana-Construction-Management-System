import React, { useState, useEffect } from 'react'
import { Card } from '../../components/Card.jsx'
import api from '../../api/axios.js'
import { ENDPOINTS } from '../../api/endpoints.js'

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from:', ENDPOINTS.projects)
        const response = await api.get(ENDPOINTS.projects)
        console.log('Projects response:', response.data)
        // Handle different response formats - check if data is an array or object with results
        const projectsData = Array.isArray(response.data) ? response.data : response.data.results || []
        console.log('Processed projects data:', projectsData)
        setProjects(projectsData)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch projects')
        setLoading(false)
        console.error('Error fetching projects:', err)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <Card className="p-4">
        <div className="text-center text-slate-500">Loading projects...</div>
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
            <th className="py-2">Project</th>
            <th className="py-2">Client</th>
            <th className="py-2">Status</th>
            <th className="py-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} className="border-b last:border-0">
              <td className="py-2">{project.name}</td>
              <td className="py-2">{project.client_name}</td>
              <td className="py-2 capitalize">{project.status.replace('_', ' ')}</td>
              <td className="py-2">{project.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
