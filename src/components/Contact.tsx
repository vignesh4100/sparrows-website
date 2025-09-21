import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Bharathi nagar', 'Ramanathapuram - 623503', 'Tamil Nadu, India']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [import.meta.env.VITE_CONTACT_PHONE, '+91 98765 43210']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [import.meta.env.VITE_CONTACT_EMAIL, 'support@landvest.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday: 9:00 AM - 7:00 PM', 'Sunday: 10:00 AM - 5:00 PM']
    }
  ];

  const offices = [
    {
      city: 'Chennai',
      address: 'No. 123, Anna Salai, Nandanam, Chennai - 600035',
      phone: '+91 44 2434 5678',
      email: 'chennai@landvest.com'
    },
    {
      city: 'Bangalore',
      address: 'No. 456, MG Road, Brigade Road, Bangalore - 560001',
      phone: '+91 80 2567 8901',
      email: 'bangalore@landvest.com'
    },
    {
      city: 'Coimbatore',
      address: 'No. 789, Avinashi Road, Peelamedu, Coimbatore - 641004',
      phone: '+91 422 234 5678',
      email: 'coimbatore@landvest.com'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-light text-gray-900 mb-6">
              Get in <span className="font-normal text-red-600">Touch</span>
            </h1>
            <div className="w-24 h-px bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to start your investment journey? We're here to help you every step of the way. 
              Reach out to our experts for personalized guidance and support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="text-center p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-6">Send us a Message</h2>
                <div className="w-16 h-px bg-red-600 mb-8"></div>
                
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
                        className="w-full px-4 py-3 border border-gray-200 focus:border-red-500 focus:outline-none transition-colors rounded-lg"
                        placeholder="Enter your full name"
                      />
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
                        className="w-full px-4 py-3 border border-gray-200 focus:border-red-500 focus:outline-none transition-colors rounded-lg"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 border border-gray-200 focus:border-red-500 focus:outline-none transition-colors rounded-lg"
                        placeholder="Enter your phone number"
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
                        className="w-full px-4 py-3 border border-gray-200 focus:border-red-500 focus:outline-none transition-colors rounded-lg"
                      >
                        <option value="">Select Subject</option>
                        <option value="investment-inquiry">Investment Inquiry</option>
                        <option value="project-information">Project Information</option>
                        <option value="site-visit">Site Visit Request</option>
                        <option value="documentation">Documentation Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
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
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-red-500 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition-colors inline-flex items-center rounded-lg font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map & Quick Actions */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-light text-gray-900 mb-6">Find Us</h3>
                  <div className="w-16 h-px bg-red-600 mb-6"></div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Interactive Map Coming Soon</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-light text-gray-900 mb-6">Quick Actions</h3>
                  <div className="w-16 h-px bg-red-600 mb-6"></div>
                  <div className="space-y-4">
                    <a
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <MessageCircle className="w-6 h-6 text-green-600 mr-4" />
                      <div>
                        <h4 className="font-medium text-gray-900">WhatsApp Chat</h4>
                        <p className="text-sm text-gray-600">Get instant responses</p>
                      </div>
                    </a>
                    <a
                      href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}
                      className="flex items-center p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <Phone className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <h4 className="font-medium text-gray-900">Call Now</h4>
                        <p className="text-sm text-gray-600">Speak with our experts</p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                      className="flex items-center p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-red-600 mr-4" />
                      <div>
                        <h4 className="font-medium text-gray-900">Email Us</h4>
                        <p className="text-sm text-gray-600">Detailed inquiries</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">Our Offices</h2>
            <div className="w-24 h-px bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our convenient locations across South India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {offices.map((office, index) => (
              <div key={index} className="text-center p-8 border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="text-xl font-medium text-gray-900 mb-4">{office.city}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>{office.address}</p>
                  <p>{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;