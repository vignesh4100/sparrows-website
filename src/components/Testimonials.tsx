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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-red-600">Investors Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from satisfied investors who trusted LandVest for their plot investments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-shadow">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-medium inline-block">
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