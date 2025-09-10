import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminBookingItem {
  _id: string;
  movieTitle: string;
  showTime: string;
  seats: string[];
  totalAmount: number;
  createdAt: string;
  userId?: { name: string; email: string } | string;
}

const Admin: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<AdminBookingItem[]>([]);
  const [error, setError] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    duration: '',
    rating: 0,
    description: '',
    image: '',
    price: 0,
    showTimes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    (async () => {
      try {
        const data = await apiGet('/api/admin/bookings');
        setBookings(data);
      } catch (e) {
        setError('Failed to load bookings');
      }
    })();
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Add Movie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="Title" value={newMovie.title} onChange={e=>setNewMovie({...newMovie,title:e.target.value})} />
          <input className="border p-2 rounded" placeholder="Genre" value={newMovie.genre} onChange={e=>setNewMovie({...newMovie,genre:e.target.value})} />
          <input className="border p-2 rounded" placeholder="Duration (e.g., 2h 11m)" value={newMovie.duration} onChange={e=>setNewMovie({...newMovie,duration:e.target.value})} />
          <input className="border p-2 rounded" placeholder="Rating (0-10)" type="number" step="0.1" value={newMovie.rating} onChange={e=>setNewMovie({...newMovie,rating:parseFloat(e.target.value || '0')})} />
          <input className="border p-2 rounded" placeholder="Price (₹)" type="number" value={newMovie.price} onChange={e=>setNewMovie({...newMovie,price:parseFloat(e.target.value || '0')})} />
          <input className="border p-2 rounded" placeholder="Image URL" value={newMovie.image} onChange={e=>setNewMovie({...newMovie,image:e.target.value})} />
          <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={newMovie.description} onChange={e=>setNewMovie({...newMovie,description:e.target.value})} />
          <input className="border p-2 rounded md:col-span-2" placeholder="Show times (comma separated, e.g., 10:00 AM, 2:00 PM)" value={newMovie.showTimes} onChange={e=>setNewMovie({...newMovie,showTimes:e.target.value})} />
        </div>
        <div className="mt-3">
          <button
            disabled={creating}
            onClick={async()=>{
              setCreating(true);
              setError('');
              try {
                const payload:any = { ...newMovie, showTimes: newMovie.showTimes.split(',').map(s=>s.trim()).filter(Boolean) };
                await apiPost('/api/admin/movies', payload);
                setNewMovie({ title:'', genre:'', duration:'', rating:0, description:'', image:'', price:0, showTimes:''});
                alert('Movie added');
              } catch {
                setError('Failed to add movie');
              } finally {
                setCreating(false);
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >{creating ? 'Adding...' : 'Add Movie'}</button>
        </div>
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Movie</th>
              <th className="p-3">Show Time</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">{typeof b.userId === 'object' ? b.userId.name : ''}</td>
                <td className="p-3">{typeof b.userId === 'object' ? b.userId.email : ''}</td>
                <td className="p-3">{b.movieTitle}</td>
                <td className="p-3">{b.showTime}</td>
                <td className="p-3">{b.seats.join(', ')}</td>
                <td className="p-3">₹{b.totalAmount}</td>
                <td className="p-3">{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td className="p-3" colSpan={7}>No bookings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;


