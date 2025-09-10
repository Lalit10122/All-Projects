import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import { Star, Clock, Calendar } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  image: string;
  price: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const { setSelectedMovie, setSelectedShowTime } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const startBooking = (showTime: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSelectedMovie(movie as any);
    setSelectedShowTime(showTime);
    navigate('/booking');
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹{movie.price}
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg flex items-center space-x-1">
          <Star className="h-4 w-4 fill-current text-yellow-400" />
          <span className="text-sm font-medium">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {movie.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">{movie.genre}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Now Showing</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link
            to={`/movie/${movie.id}`}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
          >
            Details
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Quick View
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-xl max-w-xl w-full overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <button onClick={()=>setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover rounded" />
              <p className="text-gray-600 text-sm">{movie.duration} • {movie.genre}</p>
              <div className="grid grid-cols-2 gap-2">
                {(movie as any).showTimes?.map((t: string) => (
                  <button key={t} onClick={()=>{ setOpen(false); startBooking(t); }} className="bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;