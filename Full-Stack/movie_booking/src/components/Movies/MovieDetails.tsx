import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, MapPin } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies, setSelectedMovie, setSelectedShowTime } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = (showTime: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSelectedMovie(movie);
    setSelectedShowTime(showTime);
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <div className="h-96 bg-gradient-to-r from-black to-transparent">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ₹{movie.price}
                </div>
                <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="text-sm font-medium">{movie.rating}</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex items-center space-x-6 text-white mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Now Showing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>All Theaters</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg mb-2">{movie.genre}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Synopsis</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Show Times</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {movie.showTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleBooking(time)}
                  className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-800 font-medium py-4 px-6 rounded-lg transition-all duration-200 border-2 border-transparent hover:border-red-600"
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Please arrive 15 minutes before the show time. 
                Outside food and beverages are not allowed in the theater.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;