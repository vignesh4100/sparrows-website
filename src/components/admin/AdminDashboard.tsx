import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MapPin, Mail, TrendingUp, Eye, Plus, Settings, Edit } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { projectService } from '../../services/projectService';
import { Project } from '../../types/Project';

interface AdminDashboardProps {
  onLogout?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [projects, setProjects] = useState<Project[]>([]);
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

  const getStats = () => {
    const activeProjects = projects.filter(p => p.status === 'Available' || p.status === 'New Launch').length;
    const newProjects = projects.filter(p => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return p.createdAt > oneMonthAgo;
    }).length;
    const totalProjects = projects.length;
    const fewLeftProjects = projects.filter(p => p.status === 'Few Left').length;

    return [
      {
        title: 'Active Projects',
        value: activeProjects.toString(),
        change: 'Currently Active',
        icon: MapPin,
        color: 'bg-blue-500'
      },
      {
        title: 'New Projects',
        value: newProjects.toString(),
        change: 'This Month',
        icon: Plus,
        color: 'bg-green-500'
      },
      {
        title: 'Total Projects',
        value: totalProjects.toString(),
        change: 'All Time',
        icon: BarChart3,
        color: 'bg-red-500'
      },
      {
        title: 'Few Left',
        value: fewLeftProjects.toString(),
        change: 'Urgent Attention',
        icon: Settings,
        color: 'bg-purple-500'
      }
    ];
  };

  const recentActivity = [
    { id: 1, action: 'Project created', project: 'Green Valley Plots', time: '2 hours ago' },
    { id: 2, action: 'Project updated', project: 'Sunrise Residency', time: '4 hours ago' },
    { id: 3, action: 'Project published', project: 'Metro Park Plots', time: '6 hours ago' },
    { id: 4, action: 'Project edited', project: 'Royal Gardens', time: '8 hours ago' }
  ];

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar onLogout={onLogout} />
        <div className="flex-1 p-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const topProjects = projects.slice(0, 4);

  return (
    <div className="flex">
      <AdminSidebar onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-red-600 hover:text-red-700 transition-colors">
                <Eye className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.action}</h4>
                    <p className="text-sm text-gray-600">{activity.project}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Projects */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              <button className="text-red-600 hover:text-red-700 transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {topProjects.map((project, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Available' ? 'bg-green-100 text-green-800' :
                      project.status === 'New Launch' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Few Left' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{project.location}</span>
                    <span>{project.totalPlots} plots</span>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500">No projects found. Add your first project!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;