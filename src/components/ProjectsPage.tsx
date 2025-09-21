import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Projects from './Projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full -translate-y-32"></div>
        </div>
        
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-white/25 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-1/4 w-5 h-5 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">
                Premium Developments
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
              Our Projects
            </h1>
            <p className="text-xl leading-relaxed text-red-100 mb-8">
              Explore our carefully selected DTCP and RERA approved plot projects 
              across prime locations in South India
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>DTCP Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>RERA Registered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Clear Title</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <div className="py-0">
        <Projects />
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;