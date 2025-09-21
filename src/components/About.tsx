import React from 'react';
import { Award, Users, TrendingUp, Shield, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  const stats = [
    { number: '12+', label: 'Years Experience' },
    { number: '50+', label: 'Successful Projects' },
    { number: '2000+', label: 'Happy Customers' },
    { number: '95%', label: 'Customer Satisfaction' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency in all our dealings and maintain the highest standards of integrity.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every project undergoes rigorous quality checks to ensure DTCP approval and legal compliance.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations at every step.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Partnership',
      description: 'We partner with our investors for long-term growth and wealth creation through strategic investments.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '15+ years in real estate development'
    },
    {
      name: 'Priya Sharma',
      position: 'Head of Sales',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Expert in customer relations and sales'
    },
    {
      name: 'Suresh Patel',
      position: 'Legal Advisor',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Specialist in property law and documentation'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 -translate-y-40"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-white rounded-full"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-16 w-2 h-16 bg-white/20 rounded-full rotate-45 animate-pulse"></div>
          <div className="absolute top-32 right-24 w-2 h-12 bg-white/15 rounded-full -rotate-45 animate-bounce"></div>
          <div className="absolute bottom-24 left-1/4 w-1 h-8 bg-white/25 rounded-full rotate-12 animate-ping"></div>
          <div className="absolute bottom-16 right-1/3 w-2 h-10 bg-white/10 rounded-full -rotate-12 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">
                Our Story
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
              About LandVest
            </h1>
            <p className="text-xl leading-relaxed text-red-100 mb-8">
              Your trusted partner in land investment with over a decade of experience 
              in Tamil Nadu real estate. We specialize in DTCP approved plots that 
              offer excellent returns and legal security.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">12+</div>
                <div className="text-red-200 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-red-200 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2000+</div>
                <div className="text-red-200 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-red-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Our Story"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Building Dreams Since 2012</h3>
                <p className="text-gray-600 mb-6">
                  LandVest was founded with a simple mission: to make land investment 
                  accessible, transparent, and profitable for everyone. Starting with 
                  our first project in Chennai, we have grown to become one of the 
                  most trusted names in South Indian real estate.
                </p>
                <p className="text-gray-600 mb-6">
                  Our commitment to quality, transparency, and customer satisfaction 
                  has helped thousands of families build their dream homes and create 
                  lasting wealth through strategic land investments.
                </p>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-red-600" />
                  <span className="text-gray-700">Established in 2012</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed">
              To democratize real estate investment by providing transparent, 
              legally compliant, and high-growth potential land opportunities 
              that help our customers build lasting wealth and achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;