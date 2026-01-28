'use client';

import { useEffect, useRef } from 'react';
import { Video, Sparkles, Palette, Target, Award, Share2, Users, Briefcase, Clock } from 'lucide-react';
import contentData from '@/data/content.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Video, Sparkles, Palette, Target, Award, Share2
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Stats cards animation with stagger
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '.stat-card',
          start: 'top 85%',
        },
        opacity: 0,
        y: 60,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      });

      // Animate stat numbers
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
          },
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
        });
      });

      // Skills cards with 3D rotation effect
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skill-card',
          start: 'top 85%',
        },
        opacity: 0,
        rotationY: 90,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Continuous floating animation for skill cards
      gsap.to('.skill-card', {
        y: -10,
        duration: 2,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      });

      // Icon rotation on scroll
      gsap.to('.skill-icon', {
        scrollTrigger: {
          trigger: '.skill-card',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        rotation: 360,
        duration: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="about-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {contentData.about.story}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="stat-card glass rounded-2xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer">
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="stat-number text-4xl font-bold text-gradient mb-2">{contentData.hero.stats.subscribers}</h3>
            <p className="text-gray-400">Subscribers</p>
          </div>

          <div className="stat-card glass rounded-2xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="stat-number text-4xl font-bold text-gradient mb-2">{contentData.hero.stats.projects}</h3>
            <p className="text-gray-400">Projects Completed</p>
          </div>

          <div className="stat-card glass rounded-2xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer">
            <Clock className="w-12 h-12 mx-auto mb-4 text-pink-400" />
            <h3 className="stat-number text-4xl font-bold text-gradient mb-2">{contentData.hero.stats.experience}</h3>
            <p className="text-gray-400">Experience</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {contentData.about.skills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            return (
              <div
                key={index}
                className="skill-card glass rounded-xl p-6 text-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Icon className="skill-icon w-8 h-8 mx-auto mb-3 text-purple-400" />
                <p className="text-sm font-medium">{skill.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
