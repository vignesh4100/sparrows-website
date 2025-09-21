import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Clock, Plus } from 'lucide-react';
import { projectService } from '../services/projectService';
import { seedDatabase } from '../services/seedData';
import { Project } from '../types/Project';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSetupMessage, setShowSetupMessage] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await projectService.getAllProjects();
        setProjects(fetchedProjects);
        
        if (fetchedProjects.length === 0) {
          setShowSetupMessage(true);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProgressPercentage = (sold: number, total: number) => {
    return (sold / total) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-500';
      case 'New Launch': return 'bg-blue-500';
      case 'Few Left': return 'bg-amber-500';
      case 'Sold Out': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddSampleData = async () => {
    try {
      setLoading(true);
      setShowSetupMessage(false);
      console.log('Adding sample data...');
      await seedDatabase();
      
      // Also seed blog data
      const { seedBlogDatabase } = await import('../services/seedBlogData');
      await seedBlogDatabase();
      
      console.log('Sample data added successfully!');
      const fetchedProjects = await projectService.getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error adding sample data:', error);
      alert('Failed to add sample data. Please check your Firebase configuration and security rules.');
      setShowSetupMessage(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (showSetupMessage) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Setup Required</h3>
              <p className="text-gray-600 mb-6">
                No projects found. Please configure your Firebase Firestore security rules to allow data access.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">Firebase Setup Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Go to your Firebase Console</li>
                <li>Navigate to Firestore Database → Rules</li>
                <li>Replace the rules with:</li>
              </ol>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-3 text-xs overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}`}
              </pre>
              <p className="text-sm text-gray-600 mt-3">4. Click "Publish" to apply the changes</p>
            </div>
            
            <button
              onClick={handleAddSampleData}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Sample Data
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Featured <span className="font-normal text-red-600">Projects</span>
          </h2>
          <div className="w-24 h-px bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium land investments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white border border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.images[0]} 
                  alt={project.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getStatusColor(project.status)} text-white px-4 py-2 text-sm font-medium rounded-full shadow-lg`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{project.name}</h3>
                <div className="flex items-center text-gray-500 mb-6">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price Range</span>
                    <span className="text-sm font-semibold text-red-600">{project.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Plot Sizes</span>
                    <span className="text-sm font-medium text-gray-900">{project.plotSizes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Available</span>
                    <span className="text-sm font-medium text-gray-900">
                      {project.totalPlots - project.soldPlots} of {project.totalPlots}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(project.soldPlots, project.totalPlots)}%` }}
                    ></div>
                  </div>
                </div>

                <Link 
                  to={`/project/${project.id}`}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors group"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center mt-12">
            <p className="text-gray-600">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;