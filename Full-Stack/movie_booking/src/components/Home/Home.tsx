import React from 'react';
import { Film, Star, Ticket, Users, Shield } from 'lucide-react';
import MovieList from '../Movies/MovieList';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Film className="h-16 w-16 text-red-500" />
              <h1 className="text-6xl font-bold">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  CineBooker
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience the magic of cinema like never before. Book your favorite movies 
              with just a few clicks and enjoy premium entertainment at its finest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                Book Tickets Now
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                Watch Trailers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose CineBooker?
            </h2>
            <p className="text-gray-600 text-lg">
              Your ultimate movie booking experience awaits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your favorite movies in just a few clicks with our intuitive interface
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Your transactions are protected with industry-leading security measures
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Experience</h3>
              <p className="text-gray-600">
                Enjoy premium movie experiences with comfortable seating and latest technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Listings */}
      <section className="py-16 bg-gray-100">
        <MovieList />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">50K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">100+</div>
              <div className="text-gray-300">Movies Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">25+</div>
              <div className="text-gray-300">Theater Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;