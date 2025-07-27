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
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className={`text-cyan-500 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 animate-float ${
                scrolled ? 'h-7 w-7 lg:h-8 lg:w-8' : 'h-8 w-8 lg:h-10 lg:w-10'
              }`} />
              <div className={`absolute inset-0 bg-cyan-500/20 rounded-full blur-md animate-pulse ${
                scrolled ? 'h-7 w-7 lg:h-8 lg:w-8' : 'h-8 w-8 lg:h-10 lg:w-10'
              }`}></div>
            </div>
            <div className="text-left">
              <h1 className={`font-bold text-black tracking-wider transition-all duration-300 group-hover:text-cyan-600 ${
                scrolled ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'
              }`}>
                SPAARK ELITE EVENTS
              </h1>
              {!scrolled && (
                <p className="text-xs lg:text-sm italic text-black hidden sm:block animate-fade-in-up" style={{ fontFamily: 'Dancing Script, serif' }}>
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
                } ${scrolled ? 'text-base px-3 py-2' : 'text-lg px-4 py-3'}`}
              >
                <item.icon className={`transition-all duration-300 group-hover:scale-110 ${
                  isActive(item.path) ? 'text-cyan-600' : 'text-gray-500 group-hover:text-cyan-600'
                } ${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                <span className={scrolled ? 'text-base' : 'text-lg'}>{item.label}</span>
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
            className="md:hidden p-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 magnetic-hover"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 transition-transform duration-300 rotate-90 animate-spin" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 pb-8' 
            : 'max-h-0 opacity-0 overflow-hidden'
        } sticky top-0 z-50 bg-white/95`}>
          <nav className="space-y-3 pt-6 border-t border-gray-100 w-full">
            {navItemsWithIcons.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`group flex items-center space-x-4 px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 animate-fade-in-up w-full magnetic-hover ${
                  isActive(item.path) 
                    ? 'text-cyan-600 bg-gradient-to-r from-cyan-50 to-cyan-100 border-l-4 border-cyan-600 shadow-md' 
                    : 'text-gray-700 hover:text-cyan-600'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={`h-6 w-6 transition-all duration-300 group-hover:scale-110 ${
                  isActive(item.path) ? 'text-cyan-600' : 'text-gray-500 group-hover:text-cyan-600'
                }`} />
                <span className="text-lg">{item.label}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-3 h-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full animate-pulse shadow-lg"></div>
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