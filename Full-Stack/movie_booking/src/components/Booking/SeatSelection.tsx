import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, IndianRupee } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
  price: number;
}

const SeatSelection: React.FC = () => {
  const { selectedMovie, selectedShowTime, getSeatsForShow, setSelectedSeats } = useBooking();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMovie && selectedShowTime) {
      const showSeats = getSeatsForShow(selectedMovie.id, selectedShowTime);
      setSeats(showSeats);
    }
  }, [selectedMovie, selectedShowTime, getSeatsForShow]);

  const handleSeatClick = (seatId: string) => {
    if (seats.find(s => s.id === seatId)?.isBooked) return;

    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, isSelected: !seat.isSelected };
      }
      return seat;
    });

    setSeats(updatedSeats);
    
    const selected = updatedSeats.filter(seat => seat.isSelected);
    setSelectedSeatIds(selected.map(s => s.id));
  };

  const handleProceedToPayment = () => {
    const selectedSeats = seats.filter(seat => seat.isSelected);
    setSelectedSeats(selectedSeats);
    navigate('/payment');
  };

  const selectedSeats = seats.filter(seat => seat.isSelected);
  const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  if (!selectedMovie || !selectedShowTime) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid booking session</h2>
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

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{selectedMovie.title}</h1>
              <p className="text-gray-600">{selectedShowTime}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">Selected Seats</p>
              <p className="text-lg font-bold text-red-600">{selectedSeats.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-full h-4 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-lg mb-4"></div>
              <p className="text-gray-600 font-medium">SCREEN</p>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                <div key={row} className="flex items-center justify-center space-x-2">
                  <div className="w-6 text-center font-medium text-gray-700">{row}</div>
                  <div className="flex space-x-2">
                    {rowSeats.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.isBooked}
                        className={`
                          w-8 h-8 rounded-t-lg text-xs font-medium transition-colors
                          ${seat.isBooked
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : seat.isSelected
                            ? 'bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-8 mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                <span className="text-sm text-gray-600">Booked</span>
              </div>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    Selected Seats: {selectedSeats.map(s => s.id).join(', ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">₹{totalAmount}</span>
                </div>
              </div>
              
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;