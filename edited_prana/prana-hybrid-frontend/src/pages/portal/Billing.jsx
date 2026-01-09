import React, { useState, useEffect } from 'react'
import { Card } from '../../components/Card.jsx'
import api from '../../api/axios.js'
import { ENDPOINTS } from '../../api/endpoints.js'

export default function Billing() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchInvoices = async () => {
    // Fetch invoices from API
    try {
      const response = await api.get(ENDPOINTS.invoices);
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setError('Failed to fetch invoices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <Card className="p-4">
        <div className="text-center text-slate-500">Loading invoices...</div>
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
      <button onClick={fetchInvoices} className="mb-4 p-2 bg-blue-500 text-white rounded">Test Fetch Invoices</button>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="py-2">Invoice #</th>
            <th className="py-2">Client</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id} className="border-b last:border-0">
              <td className="py-2">{invoice.invoice_number}</td>
              <td className="py-2">{invoice.client_name}</td>
              <td className="py-2">₹{invoice.total_amount}</td>
              <td className="py-2">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
