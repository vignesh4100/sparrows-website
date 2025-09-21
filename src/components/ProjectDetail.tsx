import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MapPin, Phone, Mail, Download, Share2, Heart, Star, Calendar, Users, Home, Zap } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import InquiryModal from './InquiryModal';
import { projectService } from '../services/projectService';
import { Project } from '../types/Project';

const ProjectDetail = () => {
  const { id } = useParams();
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = (index: number) => {
    setSelectedImage(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const goToNextImage = () => {
    if (!project) return;
    setSelectedImage((prev) => (prev + 1) % project.images.length);
  };

  const goToPrevImage = () => {
    if (!project) return;
    setSelectedImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };


  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError('Project ID not provided');
        setLoading(false);
        return;
      }

      try {
        const fetchedProject = await projectService.getProjectById(id);
        if (fetchedProject) {
          setProject(fetchedProject);
        } else {
          setError('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="ml-4 text-gray-600">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[500px] bg-black overflow-hidden">
        <img
          src={project.bannerImage || project.images[selectedImage]}
          alt={project.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{project.location}</span>
            </div>
            <div className="bg-green-500 px-3 py-1 rounded-full text-sm">
              {project.status}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {project.images.map((image, index) => (
            <button
              key={index}
              onClick={() => openImageModal(index)}
              className={`relative h-20 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-red-500' : ''
                }`}
            >
              <img
                src={image}
                alt={`${project.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-gray-600 mb-6">{project.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Project Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Facts</h3>
                  <div className="space-y-2">
                    {project.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{place.name}:</span>
                        <span className="font-medium">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Features</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {project.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Zap className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Places</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Facts</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Plots:</span>
                      <span className="font-medium">{project.totalPlots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium">{project.totalPlots - project.soldPlots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plot Sizes:</span>
                      <span className="font-medium">{project.plotSizes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-medium text-red-600">{project.priceRange}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Location Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{place.name}</h4>
                          <p className="text-sm text-gray-600">{place.type}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-red-600 font-medium">{place.distance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Inquiry Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Project Details</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Send Inquiry
                </button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Brochure</span>
                  </button>
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Book Site Visit</span>
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">For immediate assistance</p>
                  <a href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`} className="text-red-600 font-semibold">
                    {import.meta.env.VITE_CONTACT_PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Sales Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sales Progress</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {Math.round((project.soldPlots / project.totalPlots) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Sold Out</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(project.soldPlots / project.totalPlots) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sold: {project.soldPlots}</span>
                <span>Total: {project.totalPlots}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition duration-300"
        >
          ← Back
        </button>
      </div>
      {isImageModalOpen && project && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            onClick={closeImageModal}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ×
          </button>

          <button
            onClick={goToPrevImage}
            className="absolute left-6 text-white text-4xl font-bold hover:text-red-400"
          >
            ‹
          </button>

          <img
            src={project.images[selectedImage]}
            alt={`Full view ${selectedImage + 1}`}
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
          />

          <button
            onClick={goToNextImage}
            className="absolute right-6 text-white text-4xl font-bold hover:text-red-400"
          >
            ›
          </button>
        </div>
      )}

      <Footer />
      <FloatingActions onInquiryClick={() => setShowInquiryModal(true)} />
      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
      />
    </div>
  );
};

export default ProjectDetail;