'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Hero from './hero';
import Projects from './project';
import Skills from './skills';
import Contact from './contacts';
import Experience from './experience';
import Loader from './loader';

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const heroRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const scrollYRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Background element refs for direct DOM manipulation
  const backgroundElementsRef = useRef<{
    particles: HTMLElement[],
    orbs: HTMLElement[],
    grid: HTMLElement | null,
    mesh: HTMLElement | null
  }>({ particles: [], orbs: [], grid: null, mesh: null });

  // Static particles and orbs data (no regeneration)
  const particles = useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 6 }, (_, i) => ({ // Reduced from 8 to 6
      id: i,
      left: seededRandom(i * 7 + 1) * 100,
      top: seededRandom(i * 11 + 3) * 100,
      speed: 0.002 + seededRandom(i * 13 + 5) * 0.004, // Reduced speed
      delay: seededRandom(i * 17 + 7) * 3,
      size: 1 + seededRandom(i * 19 + 9) * 1.2,
      opacity: 0.03 + seededRandom(i * 23 + 11) * 0.05, // Reduced opacity
      hue: seededRandom(i * 29 + 13) * 40 + 190,
    }));
  }, []);

  const floatingOrbs = useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 1.5) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 2 }, (_, i) => ({ // Reduced from 3 to 2
      id: i,
      left: seededRandom(i * 31 + 15) * 100,
      top: seededRandom(i * 37 + 17) * 100,
      speed: 0.0005 + seededRandom(i * 41 + 19) * 0.002, // Reduced speed
      size: 60 + seededRandom(i * 43 + 21) * 60, // Reduced size
      delay: seededRandom(i * 47 + 23) * 4,
      hue: seededRandom(i * 53 + 25) * 60 + 200,
    }));
  }, []);

  // Handle loader completion
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Optimized background animation
  const updateBackgroundElements = useCallback(() => {
    const scrollY = scrollYRef.current;

    // Update particles
    backgroundElementsRef.current.particles.forEach((particle, i) => {
      if (particle) {
        const data = particles[i];
        const translateY = scrollY * data.speed;
        const scale = 1 + Math.sin((scrollY + data.delay) * 0.001) * 0.1;
        particle.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
    });

    // Update orbs
    backgroundElementsRef.current.orbs.forEach((orb, i) => {
      if (orb) {
        const data = floatingOrbs[i];
        const translateY = scrollY * data.speed;
        const scale = 1 + Math.sin((scrollY + data.delay) * 0.0005) * 0.03;
        orb.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
    });

    // Update grid
    if (backgroundElementsRef.current.grid) {
      backgroundElementsRef.current.grid.style.transform = `translate3d(0, ${scrollY * 0.004}px, 0)`;
    }

    // Update mesh overlay
    if (backgroundElementsRef.current.mesh) {
      backgroundElementsRef.current.mesh.style.transform = `translate3d(0, ${scrollY * 0.001}px, 0)`;
    }
  }, [particles, floatingOrbs]);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    scrollYRef.current = currentScrollY;
    setScrollY(currentScrollY);

    // Navbar logic
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight;
      const scrollDifference = currentScrollY - lastScrollYRef.current;

      if (currentScrollY < 50) {
        setIsNavbarVisible(true);
      } else if (currentScrollY < heroHeight - 200) {
        setIsNavbarVisible(true);
      } else if (scrollDifference < -8) {
        setIsNavbarVisible(true);
      } else if (scrollDifference > 8 && currentScrollY > 100) {
        setIsNavbarVisible(false);
      }
    }

    lastScrollYRef.current = currentScrollY;

    // Update background elements
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateBackgroundElements);
  }, [updateBackgroundElements]);

  const handleResumeDownload = useCallback(() => {
    try {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Hrushi_Bhanvadiya_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      window.open('/Resume.pdf', '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Collect background elements
  const collectBackgroundElements = useCallback(() => {
    backgroundElementsRef.current = {
      particles: Array.from(document.querySelectorAll('.background-particle')) as HTMLElement[],
      orbs: Array.from(document.querySelectorAll('.background-orb')) as HTMLElement[],
      grid: document.querySelector('.background-grid') as HTMLElement,
      mesh: document.querySelector('.background-mesh') as HTMLElement
    };
  }, []);

  useEffect(() => {
    setIsClient(true);

    // Throttled event handlers
    let scrollTimeout: NodeJS.Timeout;

    const throttledScrollHandler = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 8); // ~120fps
    };

    // Add event listeners
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Collect background elements after component mounts
    setTimeout(collectBackgroundElements, 500);

    // Initial calls
    handleScroll();

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [handleScroll, collectBackgroundElements]);

  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  const navItems = useMemo(() =>
    ['About', 'Skills', 'Projects', 'Experience', 'Contact'],
    []
  );

  // Enhanced parallax effects
  const parallaxTransforms = useMemo(() => ({
    shape1: `translate3d(0px, ${scrollY * 0.02}px, 0)`,
    shape2: `translate3d(0px, ${scrollY * 0.015}px, 0)`,
    shape3: `translate3d(0px, ${scrollY * -0.01}px, 0)`,
    shape4: `translate3d(0px, ${scrollY * 0.025}px, 0)`,
    grid: `translate3d(0, ${scrollY * 0.008}px, 0)`,
    gridSecondary: `translate3d(0, ${scrollY * 0.012}px, 0)`,
    particles: `translate3d(0, ${scrollY * 0.006}px, 0)`,
    mouse: `translate3d(0, 0, 0)`,
  }), [scrollY]);

  return (
    <>
      <Head>
        <title>Hrushi Bhanvadiya - Portfolio</title>
        <meta name="description" content="Portfolio of Hrushi Bhanvadiya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/Resume.pdf" as="document" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Render loader first with highest z-index */}
      {isLoading && <Loader onComplete={handleLoadingComplete} />}

      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Multi-Layer Background */}
        <div className="fixed inset-0 z-0">
          {/* Base gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/15 via-black/90 to-gray-950/70" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-950/8 via-transparent to-blue-950/12" />

          {/* Enhanced grid pattern with better performance */}
          <div
            className="absolute inset-0 opacity-[0.12] will-change-transform"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.07) 1px, transparent 1px),
                linear-gradient(rgba(0, 255, 255, 0.05) 0.5px, transparent 0.5px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.05) 0.5px, transparent 0.5px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
              transform: parallaxTransforms.grid,
            }}
          />

          {/* Dynamic grain effect */}
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay animate-grain"
            style={{
              background: `
                repeating-radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.01) 0, transparent 1px),
                repeating-radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.008) 0, transparent 1px),
                repeating-radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.01) 0, transparent 1px)
              `
            }}
          />

          {/* Enhanced floating orbs with better gradients */}
          {isClient && floatingOrbs.map((orb) => (
            <div
              key={`orb-${orb.id}`}
              className="absolute rounded-full blur-2xl will-change-transform"
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                left: `${orb.left}%`,
                top: `${orb.top}%`,
                background: `radial-gradient(circle, hsla(${200 + orb.id * 15}, 20%, 15%, 0.012) 0%, hsla(${220 + orb.id * 10}, 12%, 10%, 0.004) 70%, transparent 100%)`,
                transform: `translate3d(0, ${scrollY * orb.speed}px, 0) scale(${1 + Math.sin((scrollY + orb.delay) * 0.001) * 0.06})`,
                animation: `orbFloat ${12 + orb.delay}s ease-in-out infinite`,
                animationDelay: `${orb.delay}s`,
              }}
            />
          ))}

          {/* Optimized particle system */}
          {isClient && particles.map((particle) => (
            <div
              key={`particle-${particle.id}`}
              className="absolute rounded-full will-change-transform"
              style={{
                width: `${particle.size * 1.2}px`,
                height: `${particle.size * 1.2}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                background: `
                  radial-gradient(circle at center,
                    hsla(${particle.hue}, 80%, 60%, ${particle.opacity * 1.2}) 0%,
                    hsla(${particle.hue}, 70%, 45%, ${particle.opacity}) 50%,
                    transparent 100%
                  )
                `,
                boxShadow: `
                  0 0 ${particle.size * 2}px hsla(${particle.hue}, 70%, 45%, ${particle.opacity * 0.5}),
                  0 0 ${particle.size * 4}px hsla(${particle.hue}, 80%, 60%, ${particle.opacity * 0.3})
                `,
                transform: `translate3d(0, ${scrollY * particle.speed}px, 0)
                           scale(${1 + Math.sin((scrollY + particle.delay) * 0.002) * 0.2})`,
                animation: `enhancedParticleFloat ${8 + particle.delay}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}

          {/* Improved mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay will-change-transform"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(0, 255, 255, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 90% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)
              `,
              transform: `translate3d(0, ${scrollY * 0.002}px, 0)`,
            }}
          />

          {/* Enhanced noise texture */}
          <div
            className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
            style={{
              filter: 'contrast(120%) brightness(120%)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* Enhanced CSS Styles */}
        <style jsx global>{`
          /* Enhanced scrollbar */
          ::-webkit-scrollbar {
            width: 12px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            border: 1px solid rgba(0, 255, 255, 0.05);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(
              135deg,
              rgba(0, 255, 255, 0.4) 0%,
              rgba(59, 130, 246, 0.3) 50%,
              rgba(0, 255, 255, 0.4) 100%
            );
            border-radius: 10px;
            border: 2px solid rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              135deg,
              rgba(0, 255, 255, 0.6) 0%,
              rgba(59, 130, 246, 0.5) 50%,
              rgba(0, 255, 255, 0.6) 100%
            );
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
          }

          /* Enhanced animations */
          @keyframes particleFloat {
            0%, 100% { 
              opacity: 0.6; 
              transform: translateY(0px) scale(1); 
            }
            50% { 
              opacity: 1; 
              transform: translateY(-8px) scale(1.05); 
            }
          }
          
          @keyframes orbFloat {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.6; 
            }
            33% { 
              transform: translateY(-12px) scale(1.02); 
              opacity: 0.8; 
            }
            66% { 
              transform: translateY(8px) scale(0.98); 
              opacity: 0.9; 
            }
          }

          @keyframes gridDotPulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(1); 
              box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
            }
            50% { 
              opacity: 0.8; 
              transform: scale(1.2); 
              box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
            }
          }

          @keyframes logoGlow {
            0%, 100% { 
              filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.3));
            }
            50% { 
              filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
            }
          }

          @keyframes navbarSlideDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes navbarSlideUp {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(-100%);
              opacity: 0;
            }
          }

          @keyframes enhancedOrbFloat {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 0.6;
              filter: brightness(1);
            }
            25% {
              transform: translateY(-15px) scale(1.05);
              opacity: 0.8;
              filter: brightness(1.2);
            }
            75% {
              transform: translateY(15px) scale(0.95);
              opacity: 0.7;
              filter: brightness(0.8);
            }
          }

          @keyframes enhancedParticleFloat {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 0.7;
              filter: brightness(1);
            }
            50% {
              transform: translateY(-12px) scale(1.1);
              opacity: 1;
              filter: brightness(1.3);
            }
          }

          @keyframes grain {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(10%, -5%) scale(1.02); }
            50% { transform: translate(-5%, 10%) scale(0.98); }
            75% { transform: translate(5%, -10%) scale(1.01); }
          }

          .animate-grain {
            animation: grain 8s steps(10) infinite;
          }

          /* Performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .will-change-transform {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
            perspective: 1000px;
          }

          /* Enhanced Logo Styles */
          .logo-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .logo-container:hover {
            transform: scale(1.05);
            animation: logoGlow 2s ease-in-out infinite;
          }

          .logo-text {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 800;
            font-size: 24px;
            background: linear-gradient(135deg, 
              #00ffff 0%,
              #00e6e6 25%,
              #00cccc 50%,
              #ffffff 75%,
              #f0f9ff 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.05em;
            transition: all 0.3s ease;
          }

          .logo-container:hover .logo-text {
            background: linear-gradient(135deg, 
              #00ffff 0%,
              #33ffff 20%,
              #66ffff 40%,
              #99ffff 60%,
              #ffffff 80%,
              #f0f9ff 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .navbar-visible {
            animation: navbarSlideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .navbar-hidden {
            animation: navbarSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .navbar-enhanced {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(15px) saturate(150%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .navbar-enhanced:hover {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px) saturate(180%);
            border-bottom-color: rgba(0, 255, 255, 0.15);
          }

          /* Enhanced nav link effects */
          .nav-link {
            position: relative;
            overflow: hidden;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.08), transparent);
            transition: left 0.4s ease;
          }

          .nav-link:hover::before {
            left: 100%;
          }

          /* Resume button styling */
          .resume-btn-glow {
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #00ffff, #0099cc);
            border-radius: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .resume-btn:hover .resume-btn-glow {
            opacity: 0.2;
          }

          /* Interactive element hover effects */
          .interactive {
            transition: all 0.2s ease;
          }

          .interactive:hover {
            transform: translateY(-1px);
            filter: brightness(1.1);
          }

          .interactive:active {
            transform: translateY(0);
            filter: brightness(0.95);
          }
        `}</style>

        {/* Enhanced Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out will-change-transform ${isNavbarVisible
          ? 'navbar-visible translate-y-0 opacity-100'
          : 'navbar-hidden -translate-y-full opacity-0'
          }`}>
          <div className="navbar-enhanced shadow-xl shadow-black/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-18">
                {/* Simple HB Logo */}
                <div className="flex-shrink-0">
                  <div className="logo-container interactive" onClick={() => smoothScrollTo('about')}>
                    <div className="logo-text">HB</div>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-between flex-1 ml-8">
                  {/* Navigation Links */}
                  <div className="flex items-center justify-center flex-1">
                    <div className="flex items-baseline space-x-8">
                      {navItems.map((item) => (
                        <button
                          key={item}
                          onClick={() => smoothScrollTo(item.toLowerCase())}
                          className="nav-link interactive relative text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group will-change-transform"
                        >
                          <span className="relative z-10">{item}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/6 to-cyan-800/6 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100" />
                          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-white group-hover:w-full group-hover:left-0 transition-all duration-300" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resume Download Button */}
                  <div className="flex-shrink-0 ml-8">
                    <button
                      onClick={handleResumeDownload}
                      className="resume-btn interactive relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600/15 via-cyan-700/20 to-blue-800/15 hover:from-cyan-500/25 hover:via-cyan-600/30 hover:to-blue-700/25 border border-cyan-500/25 hover:border-cyan-400/40 rounded-lg transition-all duration-300 group will-change-transform"
                    >
                      <div className="resume-btn-glow"></div>
                      <span className="flex items-center space-x-2.5">
                        <svg
                          className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="font-medium">Resume</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex items-center space-x-4">
                  {/* Mobile Resume Button */}
                  <button
                    onClick={handleResumeDownload}
                    className="resume-btn interactive relative p-2.5 text-cyan-300 hover:text-white bg-gradient-to-r from-cyan-600/12 to-cyan-700/12 hover:from-cyan-500/20 hover:to-cyan-600/20 border border-cyan-500/20 hover:border-cyan-400/35 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    aria-label="Download Resume"
                  >
                    <div className="resume-btn-glow"></div>
                    <svg
                      className="h-5 w-5 transition-transform duration-300 hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Loader />
        {/* Main Content */}
        <main className="relative z-10">
          <div ref={heroRef}>
            <Hero />
          </div>
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}