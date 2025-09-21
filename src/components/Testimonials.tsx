import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Chennai",
      rating: 5,
      text: "LandVest helped me find the perfect plot in Tambaram. The entire process was transparent and the documentation was handled professionally. Highly recommend!",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      investment: "₹15L Investment"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "Excellent service and genuine DTCP approved plots. The team guided me through every step and the appreciation has been fantastic. Very satisfied with my investment.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      investment: "₹25L Investment"
    },
    {
      id: 3,
      name: "Suresh Patel",
      location: "Coimbatore",
      rating: 5,
      text: "Best decision I made was to invest in their Metro Park project. Clear title, proper documentation, and great location. Already seeing good appreciation.",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      investment: "₹12L Investment"
    },
    {
      id: 4,
      name: "Meera Nair",
      location: "Madurai",
      rating: 5,
      text: "Professional team, transparent pricing, and excellent after-sales support. They made my first land investment experience smooth and stress-free.",
      image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      investment: "₹8L Investment"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            What Our <span className="font-normal">Investors Say</span>
          </h2>
          <div className="w-24 h-px bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from satisfied investors who chose us for their land investments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 border border-gray-100 hover:border-gray-200 transition-colors">
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
              
              <div className="text-sm text-gray-500">
                {testimonial.investment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;