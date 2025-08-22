import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieDetails from './components/Movies/MovieDetails';
import SeatSelection from './components/Booking/SeatSelection';
import Payment from './components/Booking/Payment';
import Receipt from './components/Booking/Receipt';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import AdminLayout from './components/Admin/Layout';
import DashboardHome from './components/Admin/DashboardHome';
import UsersAdmin from './components/Admin/Users';
import MoviesManage from './components/Admin/MoviesManage';
import BookingsManage from './components/Admin/BookingsManage';
import Analytics from './components/Admin/Analytics';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/booking" element={<SeatSelection />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/receipt" element={<Receipt />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="users" element={<UsersAdmin />} />
                  <Route path="movies" element={<MoviesManage />} />
                  <Route path="bookings" element={<BookingsManage />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;