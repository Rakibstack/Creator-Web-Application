'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Mail, User, Briefcase, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.contact-title', {
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Form container animation
      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
      });

      // Form fields animation
      gsap.from('.form-field', {
        scrollTrigger: {
          trigger: '.form-field',
          start: 'top 85%',
        },
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Floating animation for form
      gsap.to('.contact-form', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setIsSubmitted(true);
        
        // Confetti-like animation
        const successOverlay = document.querySelector('.success-overlay');
        gsap.fromTo(
          successOverlay,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
      },
    });

    setTimeout(() => {
      gsap.to('.success-overlay', {
        scale: 0,
        rotation: 180,
        duration: 0.4,
        ease: 'back.in(1.7)',
        onComplete: () => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', service: '', message: '' });
        },
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="contact-title text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Fill out the form below and I'll get back to you within 24 hours
          </p>
        </div>

        {/* Contact Form */}
        <div className="contact-form glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />

          <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {/* Name Input */}
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/5"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/5"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Service Select */}
            <div className="form-field">
              <label htmlFor="service" className="block text-sm font-medium mb-2 text-gray-300">
                Service Interested In
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/5 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-900">Select a service</option>
                  <option value="video-editing" className="bg-gray-900">Video Editing</option>
                  <option value="brand-promotion" className="bg-gray-900">Brand Promotion</option>
                  <option value="mentorship" className="bg-gray-900">1-on-1 Mentorship</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Your Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full pl-12 pr-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/5 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle size={20} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Success Animation */}
          {isSubmitted && (
            <div className="success-overlay absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl z-20">
              <div className="text-center">
                <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-400">I'll get back to you soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
