import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const FAQ: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      )
      .then((result) => {
          console.log('Success!', result.text);
      }, (error) => {
          console.log('Failed...', error.text);
      });
    }
  };

  return (
    <div className="faq-section">
      <h2 className="heading-xl text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {/* ...existing FAQ content... */}
      </div>

      <div className="subscribe-form mt-16">
        <h3 className="text-2xl font-semibold text-center mb-4">Subscribe to our Newsletter</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="text"
            name="user_name" // Make sure this matches your EmailJS template variable
            placeholder="Your Name"
            required
            className="modern-input mb-4 sm:mb-0"
          />
          <input
            type="email"
            name="user_email" // Make sure this matches your EmailJS template variable
            placeholder="Your Email"
            required
            className="modern-input mb-4 sm:mb-0"
          />
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;