import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Clock, Plus } from 'lucide-react';
import { blogService } from '../services/blogService';
import { Blog } from '../types/Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs...');
        const fetchedBlogs = await blogService.getAllBlogs(false);
        console.log('Fetched blogs:', fetchedBlogs);
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const handleAddSampleBlogs = async () => {
    try {
      setLoading(true);
      console.log('Adding sample blogs...');
      
      const { seedBlogDatabase } = await import('../services/seedBlogData');
      await seedBlogDatabase();
      
      console.log('Sample blogs added successfully!');
      
      // Refresh the blogs list
      const fetchedBlogs = await blogService.getAllBlogs(false);
      console.log('Refreshed blogs after seeding:', fetchedBlogs);
      setBlogs(fetchedBlogs);
      
      alert('Sample blogs added successfully!');
    } catch (error) {
      console.error('Error adding sample blogs:', error);
      alert('Failed to add sample blogs. Please check your Firebase configuration and security rules.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Real Estate <span className="text-red-600">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights in the real estate and land investment market
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src={blog.featuredImage} 
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    <User className="w-4 h-4 ml-4 mr-2" />
                    <span>{blog.author}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedCategory === 'All' ? 'No Blogs Yet' : `No Blogs in "${selectedCategory}"`}
            </h3>
            <p className="text-gray-600">
              {selectedCategory === 'All' 
                ? 'We\'re working on creating valuable content for you. Check back soon!'
                : `No blogs found in the "${selectedCategory}" category.`
              }
            </p>
            {selectedCategory === 'All' && blogs.length === 0 && (
              <div className="mt-6">
                <button
                  onClick={handleAddSampleBlogs}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  disabled={loading}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {loading ? 'Adding Sample Blogs...' : 'Add Sample Blogs'}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Click to add 5 sample blog posts about real estate investment
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;