import React from 'react';
import { Award, Shield, TrendingUp, FileText, Clock, Users } from 'lucide-react';

const WhyChooseUs = () => {
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

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-red-600">LandVest</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in land investment with over a decade of experience in Tamil Nadu real estate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h3>
              <p className="text-xl mb-6">
                Join thousands of satisfied investors who chose LandVest for their plot investments
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Schedule Site Visit
                </button>
                <button className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">12+</div>
                <div className="text-red-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-red-100">Successful Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2000+</div>
                <div className="text-red-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-red-100">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;