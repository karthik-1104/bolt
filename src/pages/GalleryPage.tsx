import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Wedding", "Corporate", "Private", "Venue"];

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching gallery:", error.message);
      } else {
        setGalleryImages(data as GalleryItem[]);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (selectedImage === null || filteredImages.length === 0) return;
    const newIndex =
      dir === 'prev'
        ? (selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
        : (selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    setSelectedImage(newIndex);
  };

  return (
    <div className="py-20 min-h-screen bg-white" aria-label="Gallery">
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

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 futuristic-btn text-xs sm:text-sm md:text-base min-h-[44px] ${
                activeCategory === category
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 text-cyan-700 border border-cyan-200 hover:border-cyan-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg hover:scale-105 transition-all duration-300 bg-white shadow-md reveal animate-fade-in-up"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x200.png?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-cyan-700 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
                <div className="glass text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 sm:p-3 md:p-4">
                  <h3 className="overlay-text-white font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, Inter, Arial, sans-serif' }}>{image.title}</h3>
                  <span className="bg-cyan-500 overlay-text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && filteredImages[selectedImage] && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="relative max-w-4xl max-h-full w-full">
              <button onClick={closeLightbox} className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-cyan-500 z-10 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              <button onClick={() => navigateLightbox('prev')} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-500 z-10 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              <button onClick={() => navigateLightbox('next')} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-500 z-10 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>

              <img
                src={filteredImages[selectedImage].image_url}
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                <h3 className="text-cyan-500 font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{filteredImages[selectedImage].title}</h3>
                <span className="bg-cyan-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {filteredImages[selectedImage].category}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-12 rounded-lg border border-cyan-200 text-center bg-white shadow-md reveal animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-4 sm:mb-6">Ready to Create Your Own Masterpiece?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us bring your vision to life and create stunning moments that you'll treasure forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="/contact" className="futuristic-btn bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-cyan-400 transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center">
              Start Planning
            </a>
            <a href="/services" className="futuristic-btn border-2 border-cyan-500 text-cyan-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center">
              View Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
