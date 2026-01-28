'use client';

import { useState, useEffect, useRef } from 'react';
import { Youtube, Instagram, Twitter, Linkedin, Mail, ArrowRight, Heart } from 'lucide-react';
import contentData from '@/data/content.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Youtube, Instagram, Twitter, Linkedin
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer sections animation
      gsap.from('.footer-section', {
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 90%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Social icons animation
      gsap.from('.social-icon', {
        scrollTrigger: {
          trigger: '.social-icon',
          start: 'top 90%',
        },
        opacity: 0,
        scale: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });

      // Continuous floating animation for social icons
      gsap.to('.social-icon', {
        y: -5,
        duration: 2,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      });

      // Heart beat animation
      gsap.to('.heart-icon', {
        scale: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Quick links hover animation
      const links = document.querySelectorAll('.footer-link');
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            x: 10,
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            x: 0,
            color: '#9ca3af',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    const button = document.querySelector('.subscribe-button');
    gsap.to(button, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setSubscribed(true);
        gsap.from('.subscribe-success', {
          scale: 0,
          rotation: 360,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });
      },
    });

    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="text-2xl font-bold text-gradient mb-4 inline-block cursor-pointer">
              Creator
            </h3>
            <p className="text-gray-400 mb-6">
              Creating content that inspires and educates. Let's build something amazing together.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {contentData.social.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-icon w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Work', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="footer-link text-gray-400 transition-colors inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get the latest updates and exclusive content
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/5 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="subscribe-button w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm disabled:opacity-50"
              >
                {subscribed ? (
                  <span className="subscribe-success">Subscribed! ✓</span>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Creator. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Made with <Heart size={16} className="heart-icon text-red-500 fill-red-500" /> by Creator
          </p>
        </div>
      </div>
    </footer>
  );
}
