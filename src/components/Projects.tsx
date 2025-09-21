import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Award, Clock } from 'lucide-react';
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
      case 'Available': return 'bg-green-500';
      case 'New Launch': return 'bg-blue-500';
      case 'Few Left': return 'bg-orange-500';
      setShowSetupMessage(true);
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
      await fetchProjects();
    } catch (error) {
      console.error('Error adding sample data:', error);
      alert('Failed to add sample data. Please check your Firebase configuration and security rules.');
      setShowSetupMessage(true);
    }
  };

  const handleAddSampleBlogs = async () => {
    try {
      setLoading(true);
      console.log('Adding sample blogs...');
      
      const { seedBlogDatabase } = await import('../services/seedBlogData');
      await seedBlogDatabase();
      
      console.log('Sample blogs added successfully!');
      alert('Sample blogs added successfully! You can view them at /blogs');
    } catch (error) {
      console.error('Error adding sample blogs:', error);
      alert('Failed to add sample blogs. Please check your Firebase configuration and security rules.');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <section id="projects" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (showSetupMessage) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Setup Required</h3>
              <p className="text-gray-600 mb-6">
                No projects found. Please configure your Firebase Firestore security rules to allow data access.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">Firebase Setup Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Go to your Firebase Console</li>
                <li>Navigate to Firestore Database → Rules</li>
                <li>Replace the rules with:</li>
              </ol>
              <pre className="bg-gray-800 text-green-400 p-4 rounded mt-3 text-xs overflow-x-auto">
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddSampleData}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Sample Projects + Blogs
              </button>
              <button
                onClick={handleAddSampleBlogs}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Sample Blogs Only
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Click "Add Sample Blogs Only" to add just the 5 sample blogs, or "Add Sample Projects + Blogs" for both
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Current <span className="text-red-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our carefully selected DTCP and RERA approved plot projects across prime locations in South India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <img 
                  src={project.images[0]} 
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getStatusColor(project.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                    {project.soldPlots}/{project.totalPlots} Sold
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Price Range</div>
                    <div className="font-semibold text-gray-900">{project.priceRange}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Plot Sizes</div>
                    <div className="font-semibold text-gray-900">{project.plotSizes}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Sales Progress</span>
                    <span>{Math.round(getProgressPercentage(project.soldPlots, project.totalPlots))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(project.soldPlots, project.totalPlots)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.slice(0, 3).map((feature, index) => (
                    <span key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded-lg text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link 
                    to={`/project/${project.id}`}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors">
                    Quick Enquiry
                  </button>
                </div>
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