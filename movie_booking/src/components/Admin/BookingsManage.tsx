import React, { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPut } from '../../lib/api';

const BookingsManage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState('');

  const load = async () => {
    const data = await apiGet('/api/admin/bookings');
    setItems(data || []);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <select className="border p-2 rounded" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <button className="bg-gray-800 text-white px-3 py-2 rounded" onClick={load}>Refresh</button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Movie</th>
              <th className="p-2">Showtime</th>
              <th className="p-2">Seats</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(b=>!status || b.status===status).map(b=>(
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.userId?.name||''}</td>
                <td className="p-2">{b.userId?.email||''}</td>
                <td className="p-2">{b.movieTitle}</td>
                <td className="p-2">{b.showTime}</td>
                <td className="p-2">{(b.seats||[]).join(', ')}</td>
                <td className="p-2">₹{b.totalAmount}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2 flex gap-2 text-sm">
                  <button className="text-blue-600" onClick={async()=>{ await apiPut(`/api/admin/bookings/${b._id}`, { status: 'cancelled' }); await load(); }}>Cancel</button>
                  <button className="text-red-600" onClick={async()=>{ if (!confirm('Delete booking?')) return; await apiDelete(`/api/admin/bookings/${b._id}`); await load(); }}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length===0 && <tr><td className="p-2" colSpan={8}>No bookings</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsManage;


