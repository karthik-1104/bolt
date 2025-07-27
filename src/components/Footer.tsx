import React from 'react';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-gray-900 section-padding border-t border-gray-200/50 floral-bg-2 relative shadow-inner transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-white/90 to-cyan-50/95"></div>
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 relative z-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 animate-fade-in-up animate-float">
            <div className="flex items-center space-x-4 mb-8 group">
              <div className="relative">
                <Sparkles className="h-10 w-10 text-cyan-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 animate-float" />
                <div className="absolute inset-0 h-10 w-10 bg-cyan-500/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-black tracking-wider group-hover:text-cyan-600 transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                SPAARK ELITE EVENTS
              </h3>
            </div>
            <p className="text-xl italic text-black mb-3 animate-sway" style={{ fontFamily: 'Dancing Script, Playfair Display, serif', fontWeight: 500 }}>
              Luxury. Celebration. Perfection.
            </p>
            <h4 className="text-xl font-light dark-blue-hero-text mb-8 animate-breathe" style={{ fontFamily: 'Playfair Display, serif' }}>
              Where Your Vision Becomes a Masterpiece
            </h4>
            <p className="body-md text-gray-600 max-w-lg leading-relaxed animate-float-delayed">
              Creating unforgettable moments with passion, creativity, and flawless execution. Your dreams, our expertise.
            </p>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up animate-delay-100 animate-float">
            <h4 className="text-xl font-semibold text-cyan-700 mb-8 animate-breathe">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group magnetic-hover">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <a href="mailto:spaarkeliteevents@gmail.com" className="text-gray-700 hover:text-cyan-600 transition-colors font-semibold text-lg">
                  spaarkeliteevents@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4 group magnetic-hover">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <a href="tel:+918919732484" className="text-gray-700 hover:text-cyan-600 transition-colors font-semibold text-lg">
                  +91 8919732484
                </a>
              </div>
              <div className="flex items-center space-x-4 group magnetic-hover">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <a href="tel:+918522967932" className="text-gray-700 hover:text-cyan-600 transition-colors font-semibold text-lg">
                  +91 85229 67932
                </a>
              </div>
              <div className="flex items-center space-x-4 group magnetic-hover">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                  <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-gray-700 font-semibold text-lg">Hyderabad, Telangana</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up animate-delay-200 animate-float-delayed">
            <h4 className="text-xl font-semibold text-cyan-700 mb-8 animate-breathe">Services</h4>
            <ul className="space-y-4 text-gray-700">
              <li className="hover:text-cyan-600 transition-all duration-300 cursor-pointer font-semibold text-lg hover:translate-x-2 hover:scale-105">Wedding Planning</li>
              <li className="hover:text-cyan-600 transition-all duration-300 cursor-pointer font-semibold text-lg hover:translate-x-2 hover:scale-105">Corporate Events</li>
              <li className="hover:text-cyan-600 transition-all duration-300 cursor-pointer font-semibold text-lg hover:translate-x-2 hover:scale-105">Private Parties</li>
              <li className="hover:text-cyan-600 transition-all duration-300 cursor-pointer font-semibold text-lg hover:translate-x-2 hover:scale-105">Anniversary Celebrations</li>
              <li className="hover:text-cyan-600 transition-all duration-300 cursor-pointer font-semibold text-lg hover:translate-x-2 hover:scale-105">Event Coordination</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/50 mt-16 pt-10 text-center animate-fade-in-up animate-delay-300 relative z-10">
          <p className="text-gray-500 font-semibold text-lg animate-breathe">
            © 2025 Spaark Elite Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;