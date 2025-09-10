import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share2, Calendar, MapPin, Users, IndianRupee } from 'lucide-react';

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

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking as Booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Receipt not found</h2>
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

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Download functionality would be implemented here');
  };

  const handleShare = () => {
    // In a real app, this would share the booking details
    alert('Share functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-green-100">Your tickets have been successfully booked</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="bg-gray-100 rounded-lg p-4 inline-block">
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="text-2xl font-bold text-gray-800">{booking.id}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Movie Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Movie</p>
                      <p className="font-medium text-gray-800">{booking.movieTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Show Time</p>
                      <p className="font-medium text-gray-800">{booking.showTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium text-gray-800">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Theater</p>
                      <p className="font-medium text-gray-800">CineBooker Cinema</p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Seat Information</h2>
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-800">
                      {booking.seats.length} Seat(s)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {booking.seats.map((seat) => (
                      <span
                        key={seat}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Amount Paid</span>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {booking.totalAmount}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      Payment Successful
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-800 mb-2">Important Instructions</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Please arrive 15 minutes before the show time</li>
                    <li>• Carry a valid ID proof for verification</li>
                    <li>• Outside food and beverages are not allowed</li>
                    <li>• This ticket is non-refundable and non-transferable</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Receipt</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/')}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Book Another Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;