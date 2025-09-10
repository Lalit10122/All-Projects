import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, User, LogOut, Ticket } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Film className="h-8 w-8 text-red-500" />
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              CineBooker
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`hover:text-red-400 transition-colors ${
                location.pathname === '/' ? 'text-red-400' : ''
              }`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`hover:text-red-400 transition-colors ${
                  location.pathname === '/dashboard' ? 'text-red-400' : ''
                }`}
              >
                My Bookings
              </Link>
            )}
            {isAuthenticated && user?.isAdmin && (
              <Link
                to="/admin"
                className={`hover:text-red-400 transition-colors ${
                  location.pathname === '/admin' ? 'text-red-400' : ''
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 hover:text-red-400 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Link>
                {user?.isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Ticket className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Ticket className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="hover:text-red-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;