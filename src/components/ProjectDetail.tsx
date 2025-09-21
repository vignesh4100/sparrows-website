import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { MapPin, Download, Calendar, Star, Zap } from 'lucide-react';
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

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  const goToNextImage = () => {
    if (!project) return;
    setSelectedImage((prev) => (prev + 1) % project.images.length);
  };

  const goToPrevImage = () => {
    if (!project) return;
    setSelectedImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Auto-rotate main image every 5 seconds
  useEffect(() => {
    if (!project || project.images.length === 0) return;

    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % project.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [project]);

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
          src={project.images[selectedImage]}
          alt={project.name}
          className="w-full h-full object-cover opacity-70 cursor-pointer"
          onClick={openImageModal} // ✅ Clicking opens slider
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent cursor-pointer"
          onClick={openImageModal} // ✅ Overlay also clickable
        ></div>
        <div className="absolute top-8 left-8 text-white pointer-events-none">
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
              onClick={() => setSelectedImage(index)} // ✅ Only replace main image
              className={`relative h-20 rounded-lg overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-red-500' : ''
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

      {/* Project Overview */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Project Highlights */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-red-600" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Places */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nearby Places</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <div>
                            <span className="font-medium text-gray-900">{place.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({place.type})</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-red-600">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Price Range</h4>
                    <p className="text-2xl font-bold text-red-600">{project.priceRange}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Plot Sizes</h4>
                    <p className="text-lg text-gray-700">{project.plotSizes}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === 'Available' ? 'bg-green-100 text-green-800' :
                      project.status === 'New Launch' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Few Left' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Plots Sold</span>
                      <span>{project.soldPlots}/{project.totalPlots}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{
                          width: `${(project.soldPlots / project.totalPlots) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <button
                      onClick={() => setShowInquiryModal(true)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-4"
                    >
                      Enquire Now
                    </button>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Download Brochure</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Schedule Site Visit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition duration-300"
        >
          ← Back to Projects
        </button>
      </div>

      {/* Image Modal */}
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
      <InquiryModal isOpen={showInquiryModal} onClose={() => setShowInquiryModal(false)} />
    </div>
  );
};

export default ProjectDetail;