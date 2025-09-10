import React from 'react';
import { Film, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">CineBooker</span>
            </div>
            <p className="text-gray-400">
              Your ultimate destination for movie ticket booking. Experience cinema like never before.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-400 transition-colors">Now Showing</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Coming Soon</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Theaters</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Offers</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@cinebooker.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Cinema Street, Movie City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CineBooker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;