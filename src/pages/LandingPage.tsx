import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, Clock } from 'lucide-react';
import { servicesAPI, blogAPI, galleryAPI, inquiriesAPI } from '../lib/api';
import FloatingPetals from '../components/FloatingPetals';
import SparkleEffect from '../components/SparkleEffect';

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [serviceCount, setServiceCount] = useState<number | null>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [galleryCount, setGalleryCount] = useState<number | null>(null);
  const [inquiryCount, setInquiryCount] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Kesa Madhan",
      event: "Dream Wedding",
      text: "Spaark Elite Events made our wedding absolutely perfect. Every detail was flawless, and they brought our vision to life beyond our wildest dreams.",
      rating: 5
    },
    {
      name: "Kakunuri Nagarjuna",
      event: "Corporate Gala",
      text: "Professional, creative, and incredibly organized. Our annual gala was a huge success thanks to their exceptional planning and execution.",
      rating: 5
    },
    {
      name: "Thota Karthik",
      event: "Anniversary Celebration",
      text: "They turned our 25th anniversary into a magical evening. The attention to detail and personal touch made it truly unforgettable.",
      rating: 5
    }
  ];

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [services, blogs, gallery, inquiries] = await Promise.all([
          servicesAPI.getAll(),
          blogAPI.getAll(),
          galleryAPI.getAll(),
          inquiriesAPI.getAll()
        ]);
        setServiceCount(services.length);
        setBlogCount(blogs.length);
        setGalleryCount(gallery.length);
        setInquiryCount(inquiries.length);
      } catch (err) {
        // Optionally handle error
        setServiceCount(null);
        setBlogCount(null);
        setGalleryCount(null);
        setInquiryCount(null);
      }
    }
    fetchCounts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <FloatingPetals />
      {/* Hero Section with Placeholder Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
        <SparkleEffect />
        
        {/* Responsive background image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://i.postimg.cc/PrNpJjs4/OSK01772.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7,
            zIndex: 0,
            minHeight: '100vh',
            width: '100vw',
            top: 0,
            left: 0
          }}
        >
          {/* You can replace the above url with your desired background image */}
        </div>

        {/* Central Content */}
        <div
          className="relative z-10 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center glass flex flex-col items-center justify-center"
          style={{
            maxHeight: 'none', // Remove height restriction
            padding: '1rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            width: '100%',
            boxSizing: 'border-box',
            background: 'rgba(255,255,255,0.92)'
          }}
        >
          <SparkleEffect className="opacity-60" />

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', fontFamily: 'Playfair Display, serif', lineHeight: '1.1' }}>
            Spaark Elite Events
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 md:mb-8 text-black" style={{ fontFamily: 'Dancing Script, Playfair Display, serif', fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Luxury. Celebration. Perfection.
          </p>
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 font-light dark-blue-hero-text" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', fontFamily: 'Playfair Display, serif' }}>
            Where Your Vision Becomes a Masterpiece
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto dark-blue-hero-text leading-relaxed" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Welcome to Spaark Elite Events, your trusted partner in crafting unforgettable moments. 
            We specialize in designing and executing luxury events that reflect your style, story, and dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center w-full max-w-md sm:max-w-none">
            <Link
              to="/contact"
              className="btn-primary text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 flex items-center justify-center group shadow-2xl hover-lift min-h-[44px] w-full sm:w-auto"
              aria-label="Start Planning"
            >
              Start Planning
              <ArrowRight className="ml-2 sm:ml-3 md:ml-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300" />
            </Link>
            <Link
              to="/services"
              className="btn-secondary text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 hover-lift shadow-xl min-h-[44px] w-full sm:w-auto"
              aria-label="View Services"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section-padding floral-bg-2 relative" aria-label="About Us">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/90 to-cyan-50/95"></div>
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-cyan-700 mb-6 sm:mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Spaark Elite Events</h2>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl dark-blue-hero-text mb-6 sm:mb-8" style={{ fontFamily: 'Dancing Script, serif', fontWeight: 500 }}>Where Your Vision Becomes a Masterpiece</h3>
            <div className="text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto space-y-4 sm:space-y-6 leading-relaxed">
              <p>Welcome to Spaark Elite Events, your trusted partner in crafting unforgettable moments. We specialize in designing and executing luxury events that reflect your style, story, and dreams. Whether it’s a dreamy wedding, an exclusive corporate affair, or a milestone celebration, we bring creativity, elegance, and flawless coordination to every occasion.</p>
              <p>At the heart of Spaark Elite Events is a passionate team of planners, designers, and coordinators who are dedicated to excellence. We believe that no detail is too small, and no idea is too big. From the first spark of inspiration to the final standing ovation, we’re with you every step of the way.</p>
              <p>Every event we plan is infused with a touch of magic, tailored to perfection, and remembered for a lifetime. Because at Spaark Elite Events, we don’t just manage events — we create experiences that shine.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-cyan-700 mb-6 sm:mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Our Mission</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                From the first spark of inspiration to the final standing ovation, we're with you every step of the way. 
                Every event we plan is infused with a touch of magic, tailored to perfection, and remembered for a lifetime.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 sm:mb-10 leading-relaxed">
                Because at Spaark Elite Events, we don't just manage events — we create experiences that shine.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center modern-card p-4 sm:p-6 md:p-8 hover-lift">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-2 sm:mb-3">500+</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">Happy Clients</p>
                </div>
                <div className="text-center modern-card p-4 sm:p-6 md:p-8 hover-lift">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-2 sm:mb-3">50+</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">Awards Won</p>
                </div>
                <div className="text-center modern-card p-4 sm:p-6 md:p-8 hover-lift sm:col-span-2 lg:col-span-1">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-2 sm:mb-3">{serviceCount !== null ? serviceCount : '...'}</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">Total Services</p>
                </div>
                <div className="text-center modern-card p-4 sm:p-6 md:p-8 hover-lift">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-2 sm:mb-3">{inquiryCount !== null ? inquiryCount : '...'}</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">Total Inquiries</p>
                </div>
                <div className="text-center modern-card p-4 sm:p-6 md:p-8 hover-lift">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-2 sm:mb-3">{blogCount !== null ? blogCount : '...'}</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">Blog Posts</p>
                </div>
                <div className="text-center modern-card p-4 sm:p-6 md:p-8 hover-lift">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-2 sm:mb-3">{galleryCount !== null ? galleryCount : '...'}</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">Gallery Items</p>
                </div>
                {(serviceCount === 0 && inquiryCount === 0 && blogCount === 0 && galleryCount === 0) && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-6 sm:p-10">
                    <p className="text-cyan-700 text-base sm:text-lg font-semibold mb-2">No analytics data available yet!</p>
                    <p className="text-gray-500 text-sm sm:text-base text-center">Add some services, inquiries, blog posts, or gallery items to see your stats here.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-8">
              <div className="modern-card p-6 sm:p-8 md:p-10 hover-lift">
                <SparkleEffect className="opacity-30" />
                <h4 className="text-cyan-700 font-semibold mb-4 sm:mb-6 flex items-center text-base sm:text-lg md:text-xl">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Our Founders
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  Meet the visionary team behind Spaark Elite Events - passionate professionals dedicated to bringing your dreams to life.
                </p>
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50 border-2 border-cyan-100 p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto group">
                        <img src="https://i.postimg.cc/fkgbR4dF/founder1.jpg" alt="Founder 1" className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-xl hover-scale transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-bold text-gray-700 text-center leading-tight">Thakur Anmol Singh</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto group">
                        <img src="https://i.postimg.cc/sG1D4mkw/founder2.jpg" alt="Founder 2" className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-xl hover-scale transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-bold text-gray-700 text-center leading-tight">Kalavagunta Naga Lalitha Saraswathi</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto group">
                        <img src="https://i.postimg.cc/rzpmTyDx/founder3.jpg" alt="Founder 3" className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-xl hover-scale transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-bold text-gray-700 text-center leading-tight">Thallapragada Annapurna</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glassdoor Testimonials Section */}
      <section className="relative min-h-screen floral-bg-3 w-full" aria-label="Testimonials Section">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/90 via-slate-100/80 to-white/90"></div>
        <div className="glassdoor-container max-w-7xl mx-auto">
          {/* Sticky Background Image */}
          <img src="https://i.postimg.cc/NLhC6R8Q/pexels-vireshstudio-1444442.jpg" alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-0" style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.2)' }} />
          
          {/* Scrollable Glassmorphism Content */}
          <div className="glassdoor-content">
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20 pt-12 sm:pt-16 md:pt-24 relative z-10">
              <SparkleEffect />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-cyan-700 mb-6 sm:mb-8 md:mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                What Our Clients Say
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700" style={{ fontFamily: 'Dancing Script, serif' }}>
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>

            {/* Testimonials Grid */}
            <div 
              className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 mb-8 sm:mb-12 md:mb-16 lg:mb-20 relative p-4 sm:p-6 md:p-10 lg:p-16"
              style={{
                backgroundImage: 'url(https://i.postimg.cc/jS0Wnc9L/pexels-darshandave-30840224.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                opacity: 1,
                filter: 'brightness(1.05) contrast(1.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-cyan-50/20 z-0"></div>
              
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="relative z-10 glass p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-center rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/40"
                >
                  <SparkleEffect className="opacity-40" />
                  <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-cyan-500 fill-current mx-0.5 sm:mx-1" 
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8 md:mb-10 italic leading-relaxed" style={{ fontFamily: 'Dancing Script, serif' }}>
                    "{testimonial.text}"
                  </p>
                  <h4 className="text-cyan-700 font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg">
                    {testimonial.event}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Testimonial Selector */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-cyan-700 mb-6 sm:mb-8 md:mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                Featured Testimonial
              </h3>
              <div className="modern-card p-6 sm:p-8 md:p-12 lg:p-16 text-center hover-lift ripple">
                <SparkleEffect />
                <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 text-cyan-500 fill-current mx-1 sm:mx-1.5" 
                    />
                  ))}
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 mb-6 sm:mb-8 md:mb-10 italic leading-relaxed font-light" style={{ fontFamily: 'Dancing Script, serif' }}>
                  "{testimonials[currentTestimonial].text}"
                </p>
                <h4 className="text-cyan-700 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                  {testimonials[currentTestimonial].event}
                </p>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 space-x-3 sm:space-x-4 md:space-x-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`relative w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full transition-all duration-500 hover:scale-125 sm:hover:scale-150 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-cyan-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-2xl scale-125 sm:scale-150' 
                        : 'bg-gray-400 hover:bg-cyan-500 hover:shadow-lg'
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                  >
                    {index === currentTestimonial && (
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-cyan-400 rounded-full opacity-60"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20 relative z-10">
              <div className="modern-card p-6 sm:p-8 md:p-10 hover-glow">
                <SparkleEffect className="opacity-30" />
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-cyan-700 mb-4 sm:mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Our Promise</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  Every event we create is a masterpiece, crafted with attention to detail and a commitment to excellence that exceeds expectations.
                </p>
              </div>
              <div className="modern-card p-6 sm:p-8 md:p-10 hover-glow">
                <SparkleEffect className="opacity-30" />
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-cyan-700 mb-4 sm:mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Why Choose Us</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  With years of experience and a passion for perfection, we transform your vision into unforgettable moments that last a lifetime.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pb-12 sm:pb-16 md:pb-24 relative z-10">
              <div className="modern-card p-6 sm:p-8 md:p-12 lg:p-16 hover-glow">
                <SparkleEffect />
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-cyan-700 mb-6 sm:mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Create Magic?</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed" style={{ fontFamily: 'Dancing Script, serif' }}>
                  Let us bring your dream event to life with our expertise and passion for perfection.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center space-x-2 sm:space-x-3 btn-primary px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-2xl sm:rounded-3xl hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 ripple min-h-[44px]"
                >
                  <span>Start Planning Today</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

// No changes needed in this file for your request.
// To fix the last login display for the admin profile, update your admin profile page/component.
// Make sure you fetch and display the last login value from your backend/auth provider in the admin profile component.