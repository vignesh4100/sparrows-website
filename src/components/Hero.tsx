import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectService } from '../services/projectService';
import { Project } from '../types/Project';

const Hero = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    }, 5000); // Change slide every 5 seconds

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

  const handleProjectClick = () => {
    if (projects.length > 0) {
      navigate(`/project/${projects[currentSlide].id}`);
    }
  };

  if (loading || projects.length === 0) {
    return (
      <section id="hero" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-red-400">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">DTCP & RERA Approved Projects</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Invest in
                  <span className="text-red-500"> Premium Plots</span>
                  <br />
                  Secure Your Future
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Discover DTCP-approved residential plots in prime locations across Tamil Nadu. 
                  Start your investment journey with clear title properties and guaranteed returns.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Available Plots
                </button>
                <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Project Tour
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">50+</div>
                  <div className="text-sm text-gray-400">DTCP Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">2000+</div>
                  <div className="text-sm text-gray-400">Happy Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">₹500Cr+</div>
                  <div className="text-sm text-gray-400">Total Investment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentProject = projects[currentSlide];

  return (
    <section id="hero" className="relative text-white overflow-hidden min-h-screen">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 lg:py-32 min-h-screen flex items-center z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-red-400">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">DTCP & RERA Approved Projects</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {currentProject.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {currentProject.description}
              </p>
              <div className="flex items-center justify-center space-x-4 text-lg">
                <span className="bg-red-600 px-4 py-2 rounded-full font-semibold">
                  {currentProject.priceRange}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {currentProject.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleProjectClick}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center cursor-pointer"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View This Project
              </button>
              <button
                onClick={() => navigate('/#projects')}
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                View All Projects
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">50+</div>
                <div className="text-sm text-gray-400">DTCP Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">2000+</div>
                <div className="text-sm text-gray-400">Happy Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">₹500Cr+</div>
                <div className="text-sm text-gray-400">Total Investment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-red-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Click overlay for navigation */}
      <div
        onClick={handleProjectClick}
        className="absolute inset-0 cursor-pointer z-5"
        title={`Click to view ${currentProject.name}`}
      />
    </section>
  );
};

export default Hero;