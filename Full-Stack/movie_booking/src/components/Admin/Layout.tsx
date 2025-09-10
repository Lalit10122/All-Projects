import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    else if (!user?.isAdmin) navigate('/');
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Admin</h1>
        <nav className="flex gap-4 mb-6">
          <NavLink className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-red-600 text-white':'bg-white text-gray-800 border'}`} to="/admin">Dashboard</NavLink>
          <NavLink className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-red-600 text-white':'bg-white text-gray-800 border'}`} to="/admin/users">Users</NavLink>
          <NavLink className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-red-600 text-white':'bg-white text-gray-800 border'}`} to="/admin/movies">Movies</NavLink>
          <NavLink className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-red-600 text-white':'bg-white text-gray-800 border'}`} to="/admin/bookings">Bookings</NavLink>
          <NavLink className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-red-600 text-white':'bg-white text-gray-800 border'}`} to="/admin/analytics">Analytics</NavLink>
        </nav>
        <div className="bg-white rounded shadow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;


