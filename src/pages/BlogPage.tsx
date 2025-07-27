import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogAPI, BlogPostExtended } from '../lib/api';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostExtended[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const toggleExpanded = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await blogAPI.getAll();
        setBlogPosts(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-20 min-h-screen bg-white" aria-label="Blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black" style={{ fontFamily: 'Playfair Display, Inter, Arial, sans-serif' }}>
            SPAARK ELITE EVENTS
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl italic mb-6 sm:mb-8 text-black" style={{ fontFamily: 'Playfair Display, Inter, Arial, sans-serif' }}>
            Luxury. Celebration. Perfection.
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 sm:mb-8 font-light dark-blue-hero-text">
            Where Your Vision Becomes a Masterpiece
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto dark-blue-hero-text">
            Welcome to Spaark Elite Events, your trusted partner in crafting unforgettable moments. 
            We specialize in designing and executing luxury events that reflect your style, story, and dreams.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Loading blog posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 elegant-btn bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content - only show when not loading and no error */}
        {!isLoading && !error && blogPosts.length > 0 && (
          <>
        {/* Featured Post */}
        <div className="mb-12 sm:mb-16">
          <div className="glass rounded-lg border border-cyan-200 overflow-hidden hover:border-cyan-500 transition-colors duration-300 bg-white shadow-md reveal animate-glass-fade-in section-animate">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="bg-cyan-500 overlay-text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Featured
                  </span>
                  <span className="ml-2 sm:ml-3 overlay-text-white text-xs sm:text-sm">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display, Inter, Arial, sans-serif' }}>
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {expandedPosts.has(blogPosts[0].id || '') ? blogPosts[0].content || blogPosts[0].summary : blogPosts[0].summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-xs sm:text-sm space-y-1 sm:space-y-0">
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="mr-2 sm:mr-4">{blogPosts[0].author || 'Admin'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span>{new Date(blogPosts[0].created_at || new Date()).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleExpanded(blogPosts[0].id || '')}
                    className="elegant-btn bg-cyan-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-all flex items-center text-sm sm:text-base min-h-[44px] mt-2 sm:mt-0"
                  >
                    {expandedPosts.has(blogPosts[0].id || '') ? 'Show Less' : 'Read More'}
                    <ArrowRight className={`ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform ${expandedPosts.has(blogPosts[0].id || '') ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="glass rounded-lg border border-cyan-200 overflow-hidden hover:border-cyan-500 transition-all duration-300 hover:scale-105 group bg-white shadow-md reveal animate-glass-fade-in section-animate"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                  <span className="bg-cyan-500 overlay-text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3 line-clamp-2" style={{ fontFamily: 'Playfair Display, Inter, Arial, sans-serif' }}>
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                  {expandedPosts.has(post.id || '') ? post.content || post.summary : post.summary}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 text-xs mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author || 'Admin'}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(post.created_at || new Date()).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleExpanded(post.id || '')}
                  className="w-full elegant-btn bg-cyan-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-all flex items-center justify-center text-xs sm:text-sm min-h-[44px]"
                >
                  {expandedPosts.has(post.id || '') ? 'Show Less' : 'Read More'}
                  <ArrowRight className={`ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform ${expandedPosts.has(post.id || '') ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
        </>
        )}

        {/* No Posts State */}
        {!isLoading && !error && blogPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No blog posts available at the moment.</p>
            <p className="text-gray-300 mt-2">Check back soon for new content!</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-12 rounded-lg border border-cyan-200 text-center bg-white shadow-md reveal animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-4 sm:mb-6">Stay Updated with Event Planning Tips</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter and never miss our latest insights, trends, and expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-cyan-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-sm sm:text-base min-h-[44px]"
            />
            <button className="elegant-btn bg-cyan-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-300 text-sm sm:text-base min-h-[44px]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;