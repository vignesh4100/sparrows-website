import React from 'react';
import { Award, Users, MapPin, TrendingUp, Shield, Clock } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  const stats = [
    { number: '12+', label: 'Years Experience', icon: Clock },
    { number: '50+', label: 'Successful Projects', icon: Award },
    { number: '2000+', label: 'Happy Customers', icon: Users },
    { number: '95%', label: 'Customer Satisfaction', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency in all our dealings. Every project comes with clear documentation and honest communication.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'All our projects are DTCP and RERA approved, ensuring legal compliance and quality infrastructure development.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We provide personalized service and lifetime support for all investments.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Partnership',
      description: 'We don\'t just sell land; we partner with you in your investment journey, ensuring maximum returns and growth potential.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'With over 15 years in real estate, Rajesh leads our vision of making land investment accessible and profitable for everyone.'
    },
    {
      name: 'Priya Sharma',
      position: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Priya ensures smooth operations and customer satisfaction across all our projects with her expertise in project management.'
    },
    {
      name: 'Suresh Patel',
      position: 'Legal Advisor',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Suresh handles all legal aspects, ensuring every project meets regulatory requirements and provides secure investments.'
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
              About <span className="font-normal text-red-600">LandVest</span>
            </h1>
            <div className="w-24 h-px bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over a decade, we've been helping investors discover exceptional land investment opportunities 
              across South India. Our commitment to transparency, quality, and customer satisfaction has made us 
              a trusted name in the real estate industry.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-3xl font-light text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-light text-gray-900 mb-6">Our Story</h2>
                <div className="w-16 h-px bg-red-600 mb-8"></div>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2012, LandVest began with a simple vision: to make quality land investments 
                    accessible to everyone. What started as a small team of real estate enthusiasts has grown 
                    into one of South India's most trusted land investment companies.
                  </p>
                  <p>
                    Our journey has been marked by unwavering commitment to transparency, quality, and customer 
                    satisfaction. We've helped thousands of families and investors secure their financial future 
                    through strategic land investments.
                  </p>
                  <p>
                    Today, we continue to identify and develop premium land parcels in high-growth areas, 
                    ensuring our customers benefit from the best investment opportunities in the market.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Our Story"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-light">2012</div>
                    <div className="text-xs">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">Our Values</h2>
            <div className="w-24 h-px bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">Our Team</h2>
            <div className="w-24 h-px bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind your investment success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">Our Mission</h2>
            <div className="w-24 h-px bg-white mx-auto mb-8"></div>
            <p className="text-xl leading-relaxed text-gray-300">
              To democratize land investment by providing transparent, high-quality, and profitable 
              opportunities that help our customers build lasting wealth and secure their financial future.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;