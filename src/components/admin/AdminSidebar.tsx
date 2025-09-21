import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Mail, 
  Users, 
  Settings, 
  LogOut,
  BarChart3,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  onLogout?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: MapPin, label: 'Projects', path: '/admin/projects' },
    { icon: Mail, label: 'Blogs', path: '/admin/blogs' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="flex items-center space-x-2 mb-8">
        <img 
          src="/sparrow-logo.png" 
          alt="Sparrows Logo" 
          className="w-12 h-12 rounded-lg object-contain"
        />
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Website</span>
        </button>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;