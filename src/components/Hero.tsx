import React from 'react';
import { Play, TrendingUp, Award, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-red-400">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">DTCP & RERA Approved Projects</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Invest in
                <span className="text-red-500"> Premium Plots</span>
                <br />
                Secure Your Future
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Discover DTCP-approved residential plots in prime locations across Tamil Nadu. 
                Start your investment journey with clear title properties and guaranteed returns.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Available Plots
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Project Tour
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">50+</div>
                <div className="text-sm text-gray-400">DTCP Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">2000+</div>
                <div className="text-sm text-gray-400">Happy Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">₹500Cr+</div>
                <div className="text-sm text-gray-400">Total Investment</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Quick Enquiry</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Location</label>
                  <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                    <option value="">Select Location</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Salem">Salem</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                    <option value="">Select Budget</option>
                    <option value="5-10L">₹5L - ₹10L</option>
                    <option value="10-25L">₹10L - ₹25L</option>
                    <option value="25-50L">₹25L - ₹50L</option>
                    <option value="50L+">₹50L+</option>
                  </select>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;