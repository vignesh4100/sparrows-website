import React from 'react';
import { Award, Shield, TrendingUp, FileText, Clock, Users, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Award,
      title: "DTCP & RERA Approved",
      description: "All our projects are government approved with proper documentation and legal clearances",
      color: "bg-red-500"
    },
    {
      icon: Shield,
      title: "Clear Title Properties",
      description: "Every plot comes with clear title deeds and complete legal documentation support",
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      title: "High Appreciation Potential",
      description: "Strategic locations with excellent connectivity and infrastructure development plans",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "Vastu Compliant Layouts",
      description: "All plot layouts are designed according to traditional Indian Vastu principles",
      color: "bg-purple-500"
    },
    {
      icon: Clock,
      title: "Quick Registration",
      description: "Fast-track documentation process with minimal paperwork and quick possession",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "24/7 Customer Support",
      description: "Dedicated relationship managers to assist you throughout your investment journey",
      color: "bg-teal-500"
    }
  ];

  const benefits = [
    "Bank loan assistance available",
    "Free legal verification",
    "Site visit arrangements",
    "Post-sales support",
    "Investment guidance",
    "Documentation support"
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-red-600">LandVest</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in land investment with over a decade of experience in Tamil Nadu real estate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group hover:shadow-lg transition-shadow duration-300 p-6 rounded-2xl border border-gray-100">
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Additional Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-red-600 text-white rounded-2xl p-8">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Premium Service</h4>
                <p className="text-red-100 mb-6">
                  Experience our premium service with dedicated support throughout your investment journey
                </p>
                <Link to="/contact" className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 mt-4 rounded-lg font-semibold transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;