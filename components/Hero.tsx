'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingRef1 = useRef<HTMLDivElement>(null);
  const floatingRef2 = useRef<HTMLDivElement>(null);
  const floatingRef3 = useRef<HTMLDivElement>(null);
  const floatingRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.from('.hero-badge', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Image entrance with rotation
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 1.5,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });

      // Floating animations for emoji cards
      if (floatingRef1.current) {
        gsap.to(floatingRef1.current, {
          y: -20,
          rotation: 5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      if (floatingRef2.current) {
        gsap.to(floatingRef2.current, {
          y: 20,
          rotation: -5,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      if (floatingRef3.current) {
        gsap.to(floatingRef3.current, {
          y: -15,
          rotation: -5,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 0.5,
        });
      }

      if (floatingRef4.current) {
        gsap.to(floatingRef4.current, {
          y: 15,
          rotation: 5,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 0.3,
        });
      }

      // Background blobs animation
      gsap.to('.bg-blob-1', {
        x: 50,
        y: -50,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.bg-blob-2', {
        x: -50,
        y: 50,
        scale: 1.3,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="bg-blob-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="hero-badge inline-block px-4 py-2 glass rounded-full mb-6">
              <span className="text-sm text-gray-300">✨ Available for projects</span>
            </div>

            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Creating Content</span>
              <br />
              That Inspires
            </h1>

            <p className="hero-subtitle text-xl text-gray-400 mb-8 max-w-xl">
              Full-stack creator helping brands tell their story through video, design, and digital experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-cta px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                <Calendar size={20} />
                Book a Call
              </motion.a>

              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-cta px-8 py-4 glass rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                View Work
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative">
            <div ref={imageRef} className="relative z-10">
              <div className="glass rounded-3xl p-2 overflow-hidden">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&h=600&fit=crop&crop=faces"
                    alt="Creator Profile"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-blue-900/30" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div ref={floatingRef1} className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-lg">
              <span className="text-3xl">✨</span>
            </div>

            <div ref={floatingRef2} className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg">
              <span className="text-3xl">🎨</span>
            </div>

            <div ref={floatingRef3} className="absolute top-1/2 -left-8 glass rounded-2xl p-4 shadow-lg hidden lg:block">
              <span className="text-3xl">🎬</span>
            </div>

            <div ref={floatingRef4} className="absolute top-1/3 -right-8 glass rounded-2xl p-4 shadow-lg hidden lg:block">
              <span className="text-3xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
