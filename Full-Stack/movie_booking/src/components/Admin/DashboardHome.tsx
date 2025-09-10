import React, { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({ users: 0, movies: 0, bookings: 0, revenue: 0 });
  const [popular, setPopular] = useState<{ _id: string; count: number; revenue: number }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [users, movies, bookings, rev, pop] = await Promise.all([
          apiGet('/api/admin/users?limit=1'),
          apiGet('/api/movies'),
          apiGet('/api/admin/bookings'),
          apiGet('/api/admin/analytics/revenue?by=day'),
          apiGet('/api/admin/analytics/popular-movies')
        ]);
        const totalUsers = users.total || 0;
        setStats({ users: totalUsers, movies: (movies||[]).length, bookings: (bookings||[]).length, revenue: (rev||[]).reduce((a:any,b:any)=>a+b.revenue,0) });
        setPopular(pop || []);
      } catch {}
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-2xl font-semibold">{stats.users}</div>
        </div>
        <div className="p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Movies</div>
          <div className="text-2xl font-semibold">{stats.movies}</div>
        </div>
        <div className="p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Bookings</div>
          <div className="text-2xl font-semibold">{stats.bookings}</div>
        </div>
        <div className="p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-semibold">₹{stats.revenue}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Top Movies</h3>
        <ul className="divide-y">
          {popular.map((p) => (
            <li key={p._id} className="py-2 flex justify-between">
              <span>{p._id}</span>
              <span className="text-gray-600">{p.count} bookings • ₹{p.revenue}</span>
            </li>
          ))}
          {popular.length === 0 && <li className="py-2 text-gray-500">No data</li>}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;


