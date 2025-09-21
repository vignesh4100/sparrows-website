import React from 'react';
import { TrendingUp, Users, MapPin, Award } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: '12+',
      label: 'Years Experience',
      description: 'Serving customers since 2012'
    },
    {
      icon: MapPin,
      number: '50+',
      label: 'Successful Projects',
      description: 'Across Tamil Nadu'
    },
    {
      icon: Users,
      number: '2000+',
      label: 'Happy Customers',
      description: 'Satisfied investors'
    },
    {
      icon: Award,
      number: '95%',
      label: 'Customer Satisfaction',
      description: 'Based on feedback surveys'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Track Record</h2>
          <p className="text-xl text-red-100">
            Numbers that speak for our commitment and success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-red-100 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;