import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import ImageUpload from './ImageUpload';
import SelectiveInput from './SelectiveInput';
import NearbyPlacesInput from './NearbyPlacesInput';
import { projectService } from '../../services/projectService';
import { Project } from '../../types/Project';
import { amenitiesSuggestions, highlightsSuggestions } from '../../data/suggestions';

interface ProjectManagementProps {
  onLogout?: () => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ onLogout }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    priceRange: '',
    plotSizes: '',
    status: 'Available',
    totalPlots: 0,
    soldPlots: 0,
    images: [] as string[],
    description: '',
    highlights: [] as string[],
    amenities: [] as string[],
    nearbyPlaces: [] as Array<{name: string; distance: string; type: string}>
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const fetchedProjects = await projectService.getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      name: formData.name,
      location: formData.location,
      priceRange: formData.priceRange,
      plotSizes: formData.plotSizes,
      status: formData.status as Project['status'],
      totalPlots: Number(formData.totalPlots),
      soldPlots: Number(formData.soldPlots),
      images: formData.images,
      description: formData.description,
      highlights: formData.highlights,
      amenities: formData.amenities,
      nearbyPlaces: formData.nearbyPlaces
    };

    saveProject(projectData);
  };

  const saveProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingProject) {
        const success = await projectService.updateProject(editingProject.id, projectData);
        if (success) {
          alert('Project updated successfully!');
          setEditingProject(null);
        } else {
          alert('Failed to update project');
          return;
        }
      } else {
        const projectId = await projectService.addProject(projectData);
        if (projectId) {
          alert('Project added successfully!');
        } else {
          alert('Failed to add project');
          return;
        }
      }
      
      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      location: project.location,
      priceRange: project.priceRange,
      plotSizes: project.plotSizes,
      status: project.status,
      totalPlots: project.totalPlots,
      soldPlots: project.soldPlots,
      images: project.images,
      description: project.description,
      highlights: project.highlights,
      amenities: project.amenities,
      nearbyPlaces: project.nearbyPlaces
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const success = await projectService.deleteProject(id);
        if (success) {
          alert('Project deleted successfully!');
          await fetchProjects();
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      priceRange: '',
      plotSizes: '',
      status: 'Available',
      totalPlots: 0,
      soldPlots: 0,
      images: [],
      description: '',
      highlights: [],
      amenities: [],
      nearbyPlaces: []
    });
    setShowAddForm(false);
    setEditingProject(null);
  };

  return (
    <div className="flex">
      <AdminSidebar onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Management</h1>
            <p className="text-gray-600">Manage your land and plot projects</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <input
                  type="text"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., ₹8L - ₹25L"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plot Sizes
                </label>
                <input
                  type="text"
                  name="plotSizes"
                  value={formData.plotSizes}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 600 - 2400 sq.ft"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Available">Available</option>
                  <option value="New Launch">New Launch</option>
                  <option value="Few Left">Few Left</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Plots
                </label>
                <input
                  type="number"
                  name="totalPlots"
                  value={formData.totalPlots}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter total plots"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sold Plots
                </label>
                <input
                  type="number"
                  name="soldPlots"
                  value={formData.soldPlots}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter sold plots"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => setFormData({...formData, images})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <SelectiveInput
                  label="Project Highlights"
                  items={formData.highlights}
                  onItemsChange={(highlights) => setFormData({...formData, highlights})}
                  suggestions={highlightsSuggestions}
                  placeholder="Add project highlight"
                />
              </div>

              <div>
                <SelectiveInput
                  label="Amenities"
                  items={formData.amenities}
                  onItemsChange={(amenities) => setFormData({...formData, amenities})}
                  suggestions={amenitiesSuggestions}
                  placeholder="Add amenity"
                />
              </div>

              <div className="md:col-span-2">
                <NearbyPlacesInput
                  places={formData.nearbyPlaces}
                  onPlacesChange={(nearbyPlaces) => setFormData({...formData, nearbyPlaces})}
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Projects ({projects.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plots
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={project.images[0]}
                            alt={project.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {project.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.priceRange}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'Available' ? 'bg-green-100 text-green-800' :
                          project.status === 'New Launch' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Few Left' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.soldPlots}/{project.totalPlots}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {projects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No projects found. Add your first project!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;