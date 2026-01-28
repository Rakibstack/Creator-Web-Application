'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Eye } from 'lucide-react';
import contentData from '@/data/content.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Video Production', 'YouTube', 'Education', 'Vlog', 'Case Study'];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredWork = activeCategory === 'All'
    ? contentData.work
    : contentData.work.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.work-title', {
        scrollTrigger: {
          trigger: '.work-title',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Category buttons animation
      gsap.from('.category-btn', {
        scrollTrigger: {
          trigger: '.category-btn',
          start: 'top 85%',
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate work cards when category changes
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.work-card');
      
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: -90,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      // Hover animations
      cards.forEach((card) => {
        const playIcon = card.querySelector('.play-icon');
        const thumbnail = card.querySelector('.work-thumbnail');

        card.addEventListener('mouseenter', () => {
          gsap.to(thumbnail, {
            scale: 1.1,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(playIcon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: 'back.out(1.7)',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(thumbnail, {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(playIcon, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      });
    }
  }, [filteredWork]);

  return (
    <section ref={sectionRef} id="work" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="work-title text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my best content and projects that showcase my creative journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Work Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWork.map((work) => (
            <div
              key={work.id}
              className="work-card group relative glass rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="work-thumbnail w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="play-icon w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-medium">
                  {work.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                  {work.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Eye size={16} />
                  <span>{work.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
