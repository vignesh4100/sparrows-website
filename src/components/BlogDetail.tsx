import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { blogService } from '../services/blogService';
import { Blog } from '../types/Blog';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        setError('Blog slug not provided');
        setLoading(false);
        return;
      }

      try {
        const fetchedBlog = await blogService.getBlogBySlug(slug);
        if (fetchedBlog && fetchedBlog.status === 'Published') {
          setBlog(fetchedBlog);
        } else {
          setError('Blog not found');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="ml-4 text-gray-600">Loading blog...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2" />
                <span>{blog.author}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-xl text-gray-200">{blog.excerpt}</p>
          </div>
        </div>
        <div className="absolute top-8 right-8 flex space-x-2">
          <button
            onClick={handleShare}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Author Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{blog.author}</h3>
                <p className="text-gray-600">Content Writer</p>
                <p className="text-sm text-gray-500 mt-1">
                  Published on {formatDate(blog.publishedAt || blog.createdAt)}
                </p>
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
      <Footer />
    </div>
  );
};

export default BlogDetail;