import React from 'react';
import { useBooking } from '../../contexts/BookingContext';
import MovieCard from './MovieCard';

const MovieList: React.FC = () => {
  const { movies } = useBooking();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Now Showing
        </h2>
        <p className="text-gray-600 text-lg">
          Discover the latest blockbusters and book your tickets now
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;