import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser'; // <-- Add this import
import { contactAPI, inquiriesAPI } from '../lib/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null); // <-- Add this ref

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Replace handleSubmit with EmailJS logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    if (!formRef.current) return;
    // Read EmailJS credentials from environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setError('Email service is not configured. Please try again later.');
      setIsSubmitting(false);
      return;
    }
    try {
      // Send email
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );
      // Save inquiry to database
      await inquiriesAPI.create({
        name: formData.user_name,
        email: formData.user_email,
        message: formData.message,
        status: 'pending'
      });
      setSubmitted(true);
      setFormData({ user_name: '', user_email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919391833475', '_blank');
  };

  return (
    <div className="section-padding min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50 relative" aria-label="Contact">
      {/* Floating WhatsApp Button */}
      <button
      
        onClick={handleWhatsAppClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-large hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50 group min-h-[56px] min-w-[56px] flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <img
          src="https://i.postimg.cc/xdg2nwxS/whatsapp.png"
          alt="WhatsApp"
          className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-black tracking-tight" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.1' }}>
            SPAARK ELITE EVENTS
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl italic mb-6 sm:mb-8 md:mb-10 text-black animate-fade-in-up animate-delay-100" style={{ fontFamily: 'Playfair Display, serif' }}>
            Luxury. Celebration. Perfection.
          </p>
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 font-light dark-blue-hero-text animate-fade-in-up animate-delay-200" style={{ fontFamily: 'Playfair Display, serif' }}>
            Where Your Vision Becomes a Masterpiece
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto dark-blue-hero-text animate-fade-in-up animate-delay-300 leading-relaxed">
            Welcome to Spaark Elite Events, your trusted partner in crafting unforgettable moments. 
            We specialize in designing and executing luxury events that reflect your style, story, and dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="animate-fade-in-up animate-delay-400">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-cyan-700 mb-6 sm:mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Get In Touch</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 sm:mb-10 leading-relaxed">
              We'd love to hear about your upcoming event and discuss how we can make it extraordinary. 
              Reach out to us through any of the channels below.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-4 sm:space-x-6 group">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-cyan-700 font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Email</h3>
                  <a href="mailto:spaarkeliteevents@gmail.com" className="text-cyan-600 font-medium text-sm sm:text-base md:text-lg hover:underline break-all">
                    spaarkeliteevents@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 sm:space-x-6 group">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-cyan-700 font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Phone</h3>
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg mb-1">
                    <a href="tel:+918919732484" className="hover:text-cyan-600 transition-colors">+91 8919732484</a>
                  </p>
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                    <a href="tel:+918522967932" className="hover:text-cyan-600 transition-colors">+91 85229 67932</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 sm:space-x-6 group">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-cyan-700 font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Location</h3>
                  <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">Hyderabad, Telangana</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up animate-delay-500">
            <div className="modern-card p-6 sm:p-8 md:p-10 hover-lift">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-cyan-700 mb-6 sm:mb-8 md:mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>Send Us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-8 sm:py-12 md:py-16 animate-fade-in-scale">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-large">
                    <Send className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <h3 className="text-green-700 text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">Message Sent!</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-ghost min-h-[44px]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-cyan-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name" // <-- Change to match EmailJS template
                      required
                      value={formData.user_name}
                      onChange={handleInputChange}
                      className="modern-input text-base sm:text-lg min-h-[44px]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-cyan-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email" // <-- Change to match EmailJS template
                      required
                      value={formData.user_email}
                      onChange={handleInputChange}
                      className="modern-input text-base sm:text-lg min-h-[44px]"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-cyan-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message" // <-- Keep as 'message' for EmailJS
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="modern-textarea text-base sm:text-lg min-h-[120px]"
                      placeholder="Tell us about your event, preferred dates, budget, and any specific requirements..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl mb-4 sm:mb-6 animate-fade-in-up text-sm sm:text-base">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-base sm:text-lg md:text-xl py-4 sm:py-5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center shadow-large min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;