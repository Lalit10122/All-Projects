import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGet, apiPost } from '../lib/api';
import { useAuth } from './AuthContext';

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  description: string;
  image: string;
  price: number;
  showTimes: string[];
}

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
  price: number;
}

interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  showTime: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  userId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface BookingContextType {
  movies: Movie[];
  selectedMovie: Movie | null;
  selectedShowTime: string;
  selectedSeats: Seat[];
  bookings: Booking[];
  setSelectedMovie: (movie: Movie) => void;
  setSelectedShowTime: (showTime: string) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  createBooking: (userId: string) => Booking;
  getBookingsByUser: (userId: string) => Booking[];
  getSeatsForShow: (movieId: string, showTime: string) => Seat[];
  updateSeatStatus: (movieId: string, showTime: string, seatIds: string[], isBooked: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach(row => {
    for (let i = 1; i <= 12; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        isBooked: Math.random() > 0.8, // 20% chance of being booked
        isSelected: false,
        price: row <= 'D' ? 250 : row <= 'F' ? 200 : 150
      });
    }
  });
  
  return seats;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: '1',
      title: 'Avatar: The Way of Water',
      genre: 'Action, Adventure, Sci-Fi',
      duration: '3h 12m',
      rating: 7.8,
      description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Navi race to protect their home.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 200,
      showTimes: ['10:00 AM', '2:00 PM', '6:00 PM', '9:30 PM']
    },
    {
      id: '2',
      title: 'Top Gun: Maverick',
      genre: 'Action, Drama',
      duration: '2h 11m',
      rating: 8.3,
      description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.',
      image: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 220,
      showTimes: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
    },
    {
      id: '3',
      title: 'Black Panther: Wakanda Forever',
      genre: 'Action, Adventure, Drama',
      duration: '2h 41m',
      rating: 6.7,
      description: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T\'Challa.',
      image: 'https://images.pexels.com/photos/1181421/pexels-photo-1181421.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 200,
      showTimes: ['10:30 AM', '2:30 PM', '6:30 PM', '9:45 PM']
    },
    {
      id: '4',
      title: 'Spider-Man: No Way Home',
      genre: 'Action, Adventure, Sci-Fi',
      duration: '2h 28m',
      rating: 8.4,
      description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
      image: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 250,
      showTimes: ['11:30 AM', '3:30 PM', '7:30 PM', '10:15 PM']
    },
    {
      id: '5',
      title: 'Dune',
      genre: 'Action, Adventure, Drama',
      duration: '2h 35m',
      rating: 8.0,
      description: 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 180,
      showTimes: ['10:15 AM', '2:15 PM', '6:15 PM', '9:30 PM']
    },
    {
      id: '6',
      title: 'The Batman',
      genre: 'Action, Crime, Drama',
      duration: '2h 56m',
      rating: 7.8,
      description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
      image: 'https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 230,
      showTimes: ['11:45 AM', '4:00 PM', '8:00 PM', '10:30 PM']
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet('/api/movies');
        setMovies(data.map((m: any) => ({
          id: m._id,
          title: m.title,
          genre: m.genre,
          duration: m.duration,
          rating: m.rating,
          description: m.description,
          image: m.image,
          price: m.price,
          showTimes: m.showTimes
        })));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }
    (async () => {
      try {
        const data = await apiGet('/api/bookings/me');
        setBookings(
          data.map((b: any) => ({
            id: b._id,
            movieId: typeof b.movieId === 'object' ? b.movieId._id : b.movieId,
            movieTitle: b.movieTitle,
            showTime: b.showTime,
            seats: b.seats,
            totalAmount: b.totalAmount,
            bookingDate: b.createdAt || b.bookingDate,
            userId: b.userId?._id || b.userId,
            status: b.status
          }))
        );
      } catch {}
    })();
  }, [user]);

  const createBooking = (userId: string): Booking => {
    if (!selectedMovie || !selectedShowTime || selectedSeats.length === 0) {
      throw new Error('Invalid booking data');
    }
    const seats = selectedSeats.map(seat => seat.id);
    // fire-and-forget; UI already has details for receipt
    (async () => {
      try {
        const created = await apiPost('/api/bookings', {
          movieId: selectedMovie.id,
          showTime: selectedShowTime,
          seats
        });
        setBookings(prev => [
          ...prev,
          {
            id: created._id,
            movieId: created.movieId,
            movieTitle: created.movieTitle,
            showTime: created.showTime,
            seats: created.seats,
            totalAmount: created.totalAmount,
            bookingDate: created.createdAt,
            userId: created.userId,
            status: created.status
          }
        ]);
      } catch {}
    })();

    const booking: Booking = {
      id: Date.now().toString(),
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      showTime: selectedShowTime,
      seats,
      totalAmount: selectedSeats.reduce((total, seat) => total + seat.price, 0),
      bookingDate: new Date().toISOString(),
      userId,
      status: 'confirmed'
    };
    updateSeatStatus(selectedMovie.id, selectedShowTime, seats, true);
    return booking;
  };

  const getBookingsByUser = (userId: string): Booking[] => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getSeatsForShow = (movieId: string, showTime: string): Seat[] => {
    const key = `seats_${movieId}_${showTime}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    
    const newSeats = generateSeats();
    localStorage.setItem(key, JSON.stringify(newSeats));
    return newSeats;
  };

  const updateSeatStatus = (movieId: string, showTime: string, seatIds: string[], isBooked: boolean) => {
    const key = `seats_${movieId}_${showTime}`;
    const seats = getSeatsForShow(movieId, showTime);
    
    const updatedSeats = seats.map(seat => 
      seatIds.includes(seat.id) ? { ...seat, isBooked } : seat
    );
    
    localStorage.setItem(key, JSON.stringify(updatedSeats));
  };

  return (
    <BookingContext.Provider value={{
      movies,
      selectedMovie,
      selectedShowTime,
      selectedSeats,
      bookings,
      setSelectedMovie,
      setSelectedShowTime,
      setSelectedSeats,
      createBooking,
      getBookingsByUser,
      getSeatsForShow,
      updateSeatStatus
    }}>
      {children}
    </BookingContext.Provider>
  );
};