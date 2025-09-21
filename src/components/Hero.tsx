import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectService } from '../services/projectService';
import { Project } from '../types/Project';

const Hero = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await projectService.getAllProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (projects.length > 0) {
      window.open(`/project/${projects[currentSlide].id}`, '_blank');
    }
  };

  if (loading || projects.length === 0) {
    return (
      <section id="hero" className="relative overflow-hidden h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-light mb-4">Premium Land Investments</h1>
            <p className="text-xl text-gray-300">Discover exceptional opportunities</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative overflow-hidden h-[80vh] group">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={project.bannerImage || project.images[0]}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only visible on hover */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Click overlay for navigation */}
      <div
        onClick={handleProjectClick}
        className="absolute inset-0 cursor-pointer z-10"
        title="Click to view project details"
      />
    </section>
  );
};

export default Hero;