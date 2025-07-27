import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { faqAPI, FAQ } from '../lib/api';
import emailjs from '@emailjs/browser';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriberName, setSubscriberName] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const subscribeFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        const data = await faqAPI.getAll();
        setFaqs(data || []);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeError(null);
    if (!subscribeFormRef.current) return;
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSubscribeError('Email service is not configured. Please try again later.');
      setIsSubscribing(false);
      return;
    }
    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        subscribeFormRef.current,
        PUBLIC_KEY
      );
      setSubscribed(true);
      setSubscriberName('');
      setSubscriberEmail('');
    } catch (err) {
      setSubscribeError('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="py-20 min-h-screen bg-white" aria-label="FAQ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal animate-fade-in-up">
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
            <p className="text-gray-400 mt-4">Loading FAQs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 futuristic-btn bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* No FAQs State */}
        {!isLoading && !error && faqs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No FAQs available at the moment.</p>
            <p className="text-gray-300 mt-2">Check back soon for more information!</p>
          </div>
        )}

        {/* FAQ Accordion - only show when data is loaded */}
        {!isLoading && !error && faqs.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id || index}
              className="border border-cyan-200 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors duration-300 bg-white shadow-md reveal animate-fade-in-up"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left flex items-center justify-between hover:bg-cyan-50 transition-colors duration-200 min-h-[44px]"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-cyan-700 pr-3 sm:pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 flex-shrink-0 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 flex-shrink-0 transition-transform duration-200" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        )}

        {/* Still Have Questions Section */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-12 rounded-lg border border-cyan-200 text-center bg-white shadow-md reveal animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700 mb-4 sm:mb-6">Still Have Questions?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
            We're here to help! Contact us for personalized answers to your specific questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=spaarkeliteevents@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="futuristic-btn bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-cyan-400 transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/919391833475"
              target="_blank"
              rel="noopener noreferrer"
              className="futuristic-btn border-2 border-cyan-500 text-cyan-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center"
            >
              WhatsApp Chat
            </a>
          </div>
          {/* Subscribe Form */}
          <div className="mt-6 sm:mt-8">
            {subscribed ? (
              <div className="text-green-700 text-base sm:text-lg font-semibold py-3 sm:py-4">Thank you for subscribing!</div>
            ) : (
              <form ref={subscribeFormRef} onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
                <input
                  type="text"
                  name="subscriber_name"
                  required
                  value={subscriberName}
                  onChange={e => setSubscriberName(e.target.value)}
                  className="w-full sm:flex-1 modern-input text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 rounded border border-cyan-300 focus:border-cyan-500 min-h-[44px]"
                  placeholder="Enter your name"
                />
                <input
                  type="email"
                  name="subscriber_email"
                  required
                  value={subscriberEmail}
                  onChange={e => setSubscriberEmail(e.target.value)}
                  className="w-full sm:flex-1 modern-input text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 rounded border border-cyan-300 focus:border-cyan-500 min-h-[44px]"
                  placeholder="Enter your Phone Number"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full sm:w-auto futuristic-btn bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-400 transition-all duration-300 hover:scale-105 disabled:opacity-50 min-h-[44px]"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {subscribeError && (
              <div className="text-red-600 text-xs sm:text-sm mt-2">{subscribeError}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;