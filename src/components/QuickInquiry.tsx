import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const QuickInquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      budget: '',
      message: ''
    });
  };

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h2 className="text-4xl font-light mb-6">
                Ready to <span className="font-normal">Invest?</span>
              </h2>
              <div className="w-16 h-px bg-white mb-8"></div>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                Get in touch with our investment experts to discover the perfect opportunity 
                for your portfolio. We're here to guide you through every step of your investment journey.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-gray-300">{import.meta.env.VITE_CONTACT_PHONE}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-gray-300">{import.meta.env.VITE_CONTACT_EMAIL}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-gray-300">Bharathi nagar, Ramanathapuram - 623503</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Quick Enquiry</h3>
              <div className="w-16 h-px bg-gray-900 mb-8"></div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                    placeholder="Enter your number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                    >
                      <option value="">Select Location</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Salem">Salem</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                    >
                      <option value="">Select Budget</option>
                      <option value="5-10L">₹5L - ₹10L</option>
                      <option value="10-25L">₹10L - ₹25L</option>
                      <option value="25-50L">₹25L - ₹50L</option>
                      <option value="50L+">₹50L+</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
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

export default QuickInquiry;