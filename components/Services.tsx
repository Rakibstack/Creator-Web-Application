'use client';

import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import contentData from '@/data/content.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const title = sectionRef.current?.querySelector('.services-title');
      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Service cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Card entrance
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 80,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
          });

          // Continuous glow effect
          gsap.to(card, {
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });

          // Number animation
          const number = card.querySelector('.service-number');
          if (number) {
            gsap.from(number, {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              opacity: 0,
              scale: 0,
              rotation: 180,
              duration: 1,
              delay: index * 0.2 + 0.3,
              ease: 'back.out(2)',
            });
          }

          // Features animation
          const features = card.querySelectorAll('.service-feature');
          features.forEach((feature, idx) => {
            gsap.from(feature, {
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              opacity: 0,
              x: -30,
              duration: 0.5,
              delay: index * 0.2 + idx * 0.1 + 0.5,
              ease: 'power2.out',
            });
          });

          // Button hover
          const button = card.querySelector('.service-button');
          if (button) {
            button.addEventListener('mouseenter', () => {
              gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
            button.addEventListener('mouseleave', () => {
              gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="services-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional services tailored to help you create amazing content and grow your brand
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentData.services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="service-card glass rounded-2xl p-8 hover:bg-white/10 transition-all relative overflow-hidden group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
              
              <div className="relative z-10">
                {/* Service Number */}
                <div className="service-number text-6xl font-bold text-white/5 mb-4">
                  0{index + 1}
                </div>

                {/* Title & Price */}
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-purple-400 font-semibold mb-4">{service.price}</p>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-feature flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="service-button w-full py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500 hover:to-blue-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300">
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
