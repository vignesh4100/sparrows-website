import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <img 
              src="/sparrow-logo.png" 
              alt="Sparrows Logo" 
             className="w-24 h-24 rounded-lg object-contain"
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            <button onClick={() => handleNavigation('hero')} className="text-gray-700 hover:text-red-600 transition-colors">Home</button>
            <button onClick={() => handleNavigation('projects')} className="text-gray-700 hover:text-red-600 transition-colors">Projects</button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-red-600 transition-colors">About</button>
            <button onClick={() => navigate('/blogs')} className="text-gray-700 hover:text-red-600 transition-colors">Blogs</button>
            <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-red-600 transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{import.meta.env.VITE_CONTACT_PHONE}</span>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Enquire Now
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => handleNavigation('hero')} className="text-gray-700 hover:text-red-600 transition-colors text-left">Home</button>
              <button onClick={() => handleNavigation('projects')} className="text-gray-700 hover:text-red-600 transition-colors text-left">Projects</button>
              <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-red-600 transition-colors text-left">About</button>
              <button onClick={() => navigate('/blogs')} className="text-gray-700 hover:text-red-600 transition-colors text-left">Blogs</button>
              <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-red-600 transition-colors text-left">Contact</button>
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors self-start">
                Enquire Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;