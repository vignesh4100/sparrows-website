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

      {/* Rest of your code (Project Overview, Amenities, Sidebar, etc.) stays the same */}

      {/* Back Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition duration-300"
        >
          ← Back
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
