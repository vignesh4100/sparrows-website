import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const offices = [
    {
      city: 'Chennai',
      address: 'No. 123, Anna Salai, Nandanam, Chennai - 600035',
      phone: '+91 98765 43210',
      email: 'chennai@landvest.com'
    },
    {
      city: 'Bangalore',
      address: 'No. 456, MG Road, Brigade Road, Bangalore - 560001',
      phone: '+91 98765 43211',
      email: 'bangalore@landvest.com'
    },
    {
      city: 'Coimbatore',
      address: 'No. 789, Avinashi Road, Peelamedu, Coimbatore - 641004',
      phone: '+91 98765 43212',
      email: 'coimbatore@landvest.com'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full -translate-y-36"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white rounded-full translate-y-36"></div>
          <div className="absolute top-1/2 left-0 w-48 h-48 bg-white rounded-full -translate-x-24 -translate-y-24"></div>
          <div className="absolute top-1/2 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
        </div>

        {/* Contact Icons Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-8 h-8 border-2 border-white/20 rounded-full animate-spin"></div>
          <div className="absolute top-40 right-32 w-6 h-6 border-2 border-white/15 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-4 h-4 border border-white/25 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-1/4 w-10 h-10 border-2 border-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">
                Get In Touch
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Ready to start your investment journey? Get in touch with our experts
              and discover the perfect plot for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">📞</span>
                </div>
                <span className="font-medium">Call Us</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">✉️</span>
                </div>
                <span className="font-medium">Email Us</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">📍</span>
                </div>
                <span className="font-medium">Visit Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Subject</option>
                      <option value="plot-inquiry">Plot Inquiry</option>
                      <option value="site-visit">Site Visit Request</option>
                      <option value="investment-consultation">Investment Consultation</option>
                      <option value="documentation">Documentation Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

                {/* Quick Contact */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <a href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`} className="text-red-600">
                          {import.meta.env.VITE_CONTACT_PHONE}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">Email Us</p>
                        <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="text-red-600">
                          {import.meta.env.VITE_CONTACT_EMAIL}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <a
                          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600"
                        >
                          Chat with us
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Head Office */}
                <div className="bg-red-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Head Office</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium">LandVest Real Estate</p>
                      <p className="font-medium">Sparrows Projects</p>
                      <p className="text-gray-600">
                        Bharathi nagar<br />
                        Ramanathapuram - 623503<br />
                        Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Map Section */}
      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Sparrow Projects Real Estate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.682875037477!2d79.0025!3d9.3745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01d1f233bc6a3f%3A0xf91d1e2f1c2b4bdb!2sBharathi%20Nagar%2C%20Ramanathapuram%2C%20Tamil%20Nadu%20623503!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Contact;