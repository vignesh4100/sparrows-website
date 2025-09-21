import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Projects from './Projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl">
              Explore our carefully selected DTCP and RERA approved plot projects 
              across prime locations in South India
            </p>
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