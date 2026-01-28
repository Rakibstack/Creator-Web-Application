'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load animation
    const tl = gsap.timeline();
    
    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1,
      ease: 'power3.inOut',
      delay: 0.5,
    });

    // Cursor follow effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a855f7, #3b82f6);
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cursor.remove();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 z-[100] pointer-events-none"
    />
  );
}
