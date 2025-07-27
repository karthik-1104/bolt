import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Home, Briefcase, Image, FileText, HelpCircle, Mail, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin-login', label: 'Admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const navItemsWithIcons = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/admin-login', label: 'Admin', icon: Shield },
  ];

  return (
    <header
      className="border-b border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-lg transition-all duration-500"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: '100%',
      }}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'py-3 lg:py-4' : 'py-4 lg:py-6'
        }`}>
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <Sparkles className={`text-cyan-500 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 animate-float ${
                scrolled ? 'h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8' : 'h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
              }`} />
              <div className={`absolute inset-0 bg-cyan-500/20 rounded-full blur-md animate-pulse ${
                scrolled ? 'h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8' : 'h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
              }`}></div>
            </div>
            <div className="text-left">
              <h1 className={`font-bold text-black tracking-wider transition-all duration-300 group-hover:text-cyan-600 ${
                scrolled ? 'text-sm sm:text-base lg:text-lg xl:text-xl' : 'text-base sm:text-lg lg:text-xl xl:text-2xl'
              }`}>
                SPAARK ELITE EVENTS
              </h1>
              {!scrolled && window.innerWidth >= 640 && (
                <p className="text-xs sm:text-sm italic text-black hidden sm:block animate-fade-in-up" style={{ fontFamily: 'Dancing Script, serif' }}>
                  Luxury. Celebration. Perfection.
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItemsWithIcons.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200 magnetic-hover ${
                  isActive(item.path) 
                    ? 'text-cyan-600 bg-gradient-to-r from-cyan-50 to-cyan-100 shadow-md' 
                    : 'text-gray-700 hover:text-cyan-600'
                } ${scrolled ? 'text-sm sm:text-base px-3 py-2' : 'text-base sm:text-lg px-4 py-3'}`}
              >
                <item.icon className={`transition-all duration-300 group-hover:scale-110 ${
                  isActive(item.path) ? 'text-cyan-600' : 'text-gray-500 group-hover:text-cyan-600'
                } ${scrolled ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6'}`} />
                <span className={scrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}>{item.label}</span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Tablet Navigation - Simplified to only show hamburger menu */}
          <div className="hidden md:flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 magnetic-hover"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-90 animate-spin" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 magnetic-hover min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 rotate-90 animate-spin" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 pb-6' 
            : 'max-h-0 opacity-0 overflow-hidden'
        } sticky top-0 z-50 bg-white/95 backdrop-blur-xl`}>
          <nav className="space-y-2 pt-4 border-t border-gray-100 w-full px-4">
            {navItemsWithIcons.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 animate-fade-in-up w-full min-h-[44px] ${
                  isActive(item.path) 
                    ? 'text-cyan-600 bg-gradient-to-r from-cyan-50 to-cyan-100 border-l-3 border-cyan-600 shadow-sm' 
                    : 'text-gray-700 hover:text-cyan-600'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
                  isActive(item.path) ? 'text-cyan-600' : 'text-gray-500 group-hover:text-cyan-600'
                }`} />
                <span className="text-base">{item.label}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full animate-pulse shadow-sm"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;