'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';

// Enhanced Direction-aware hover component
const DirectionAwareHover = ({
    imageUrl,
    children,
    childrenClassName,
    imageClassName,
    className,
}: {
    imageUrl: string;
    children: React.ReactNode | string;
    childrenClassName?: string;
    imageClassName?: string;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [direction, setDirection] = useState<
        "top" | "bottom" | "left" | "right" | "initial"
    >("initial");

    const getDirection = useCallback((
        ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
        obj: HTMLElement
    ): number => {
        const { width: w, height: h, left, top } = obj.getBoundingClientRect();
        const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
        const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
        const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
        return d;
    }, []);

    const handleMouseEnter = useCallback((
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!ref.current) return;

        const directionValue = getDirection(event, ref.current);
        switch (directionValue) {
            case 0:
                setDirection("top");
                break;
            case 1:
                setDirection("right");
                break;
            case 2:
                setDirection("bottom");
                break;
            case 3:
                setDirection("left");
                break;
            default:
                setDirection("left");
                break;
        }
    }, [getDirection]);

    const handleMouseLeave = useCallback(() => {
        setDirection("initial");
    }, []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={ref}
            className={`relative overflow-hidden group/card ${className || ''}`}
            style={{
                transform: 'translateZ(0)',
            }}
        >
            <div className="relative h-full w-full">
                {/* Enhanced image movement with more noticeable effect */}
                <div
                    className={`h-full w-full relative transition-all duration-700 ease-out ${direction === 'top' ? 'transform translate-y-3 scale-105' :
                            direction === 'bottom' ? 'transform -translate-y-3 scale-105' :
                                direction === 'left' ? 'transform translate-x-3 scale-105' :
                                    direction === 'right' ? 'transform -translate-x-3 scale-105' :
                                        'transform scale-100'
                        }`}
                >
                    <Image
                        alt="project"
                        className={`h-full w-full object-cover scale-[1.08] transition-all duration-700 ${imageClassName || ''}`}
                        src={imageUrl}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />

                    {/* Dynamic overlay that responds to direction */}
                    <div
                        className={`absolute inset-0 transition-all duration-700 ease-out ${direction === 'top' ? 'bg-gradient-to-b from-blue-500/20 via-transparent to-black/90' :
                                direction === 'bottom' ? 'bg-gradient-to-t from-blue-500/20 via-transparent to-black/90' :
                                    direction === 'left' ? 'bg-gradient-to-r from-blue-500/20 via-transparent to-black/90' :
                                        direction === 'right' ? 'bg-gradient-to-l from-blue-500/20 via-transparent to-black/90' :
                                            'bg-gradient-to-t from-black/95 via-black/60 to-black/10'
                            }`}
                    />
                </div>

                {/* Base overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Enhanced content animation */}
                <div
                    className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-40 transition-all duration-700 ease-out ${direction === 'top' ? 'transform -translate-y-2 opacity-100' :
                            direction === 'bottom' ? 'transform translate-y-1 opacity-100' :
                                direction === 'left' ? 'transform -translate-x-1 opacity-100' :
                                    direction === 'right' ? 'transform translate-x-2 opacity-100' :
                                        'opacity-90 transform translate-y-0'
                        } ${childrenClassName || ''}`}
                >
                    {children}
                </div>

                {/* Subtle directional glow effect */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-out ${direction === 'top' ? 'bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent' :
                            direction === 'bottom' ? 'bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent' :
                                direction === 'left' ? 'bg-gradient-to-r from-cyan-400/10 via-transparent to-transparent' :
                                    direction === 'right' ? 'bg-gradient-to-l from-cyan-400/10 via-transparent to-transparent' :
                                        'opacity-0'
                        }`}
                />
            </div>
        </div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "AI HR Interview System",
            description: "AI-driven interview system with GPT-based responses for candidate evaluation and automated screening processes.",
            imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "Dynamic Bandwidth Allocation Simulator",
            description: "Full-featured web application simulating dynamic bandwidth allocation with real-time visualization and analytics.",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "Process Scheduling Algorithms Simulator",
            description: "Advanced simulator for scheduling algorithms with dynamic process arrival times and interactive Gantt charts.",
            imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "E-commerce Analytics Dashboard",
            description: "Comprehensive real-time dashboard for tracking sales metrics, customer behavior analysis, and business insights.",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "Smart Home IoT Platform",
            description: "Integrated IoT platform for managing smart home devices with voice control and automated scheduling features.",
            imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "Machine Learning Model Trainer",
            description: "Automated ML pipeline for training, validating, and deploying custom machine learning models with real-time monitoring.",
            imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "Blockchain Voting System",
            description: "Secure and transparent decentralized voting system built on blockchain technology with cryptographic verification.",
            imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        },
        {
            title: "Real-time Chat Application",
            description: "WebSocket-based chat application with file sharing, video calls, and real-time collaboration features.",
            imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=500&fit=crop",
            githubUrl: "https://github.com/Hrushi2501"
        }
    ];

    // Secure URL validation function
    const isValidUrl = useCallback((url: string): boolean => {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'https:' &&
                (urlObj.hostname === 'github.com' ||
                    urlObj.hostname === 'leetcode.com' ||
                    urlObj.hostname === 'codeforces.com' ||
                    urlObj.hostname === 'www.codechef.com' ||
                    urlObj.hostname === 'atcoder.jp');
        } catch {
            return false;
        }
    }, []);

    // Secure link handler
    const handleLinkClick = useCallback((e: React.MouseEvent, url: string) => {
        if (!isValidUrl(url)) {
            e.preventDefault();
            console.warn('Invalid URL detected:', url);
            return;
        }
    }, [isValidUrl]);

    return (
        <section id="projects" className="relative py-16 sm:py-24 overflow-hidden">
            <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 1rem));
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(calc(-100% - 1rem));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-scroll-left {
          animation: scrollLeft 60s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scrollRight 55s linear infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        /* Pause on hover for better interaction */
        .scroll-container:hover .animate-scroll-left,
        .scroll-container:hover .animate-scroll-right {
          animation-play-state: paused;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left,
          .animate-scroll-right,
          .animate-float,
          .animate-pulse-slow,
          .shimmer::before {
            animation: none;
          }
        }
      `}</style>

            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-blue-600/8 to-purple-600/8 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-cyan-600/8 to-pink-600/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Section Header */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-6 sm:mb-8"></div>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                        Innovative solutions built with cutting-edge technologies
                    </p>
                </div>
            </div>

            {/* First Row - Scrolling Left */}
            <div className="relative w-full mb-6 sm:mb-8 overflow-hidden scroll-container">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll-left">
                    {/* Triple the projects for truly infinite scroll */}
                    {[...Array(3)].map((_, setIndex) => (
                        <React.Fragment key={`set-${setIndex}`}>
                            {projects.slice(0, 4).map((project, index) => (
                                <a
                                    key={`set${setIndex}-${index}`}
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => handleLinkClick(e, project.githubUrl)}
                                    className="flex-shrink-0 w-80 sm:w-96 lg:w-[28rem] h-48 sm:h-56 lg:h-64 cursor-pointer transform hover:scale-[1.03] transition-all duration-500 hover:z-10 relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-xl sm:rounded-2xl"
                                    aria-label={`View ${project.title} project on GitHub`}
                                >
                                    <DirectionAwareHover
                                        imageUrl={project.imageUrl}
                                        className="w-full h-full bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl border border-gray-600/30 rounded-xl sm:rounded-2xl hover:border-gray-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
                                        childrenClassName="text-white"
                                    >
                                        <div className="space-y-2 sm:space-y-3">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-100 text-sm sm:text-base leading-relaxed drop-shadow-md line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>
                                    </DirectionAwareHover>
                                </a>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Second Row - Scrolling Right */}
            <div className="relative w-full overflow-hidden scroll-container">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll-right">
                    {/* Triple the projects for truly infinite scroll */}
                    {[...Array(3)].map((_, setIndex) => (
                        <React.Fragment key={`set-right-${setIndex}`}>
                            {projects.slice(4, 8).map((project, index) => (
                                <a
                                    key={`set${setIndex}-${index + 4}`}
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => handleLinkClick(e, project.githubUrl)}
                                    className="flex-shrink-0 w-80 sm:w-96 lg:w-[28rem] h-48 sm:h-56 lg:h-64 cursor-pointer transform hover:scale-[1.03] transition-all duration-500 hover:z-10 relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-xl sm:rounded-2xl"
                                    aria-label={`View ${project.title} project on GitHub`}
                                >
                                    <DirectionAwareHover
                                        imageUrl={project.imageUrl}
                                        className="w-full h-full bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl border border-gray-600/30 rounded-xl sm:rounded-2xl hover:border-gray-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
                                        childrenClassName="text-white"
                                    >
                                        <div className="space-y-2 sm:space-y-3">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-100 text-sm sm:text-base leading-relaxed drop-shadow-md line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>
                                    </DirectionAwareHover>
                                </a>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Enhanced Coding Profiles Section */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-3xl sm:text-4xl font-bold">
                        <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                            Coding Profiles
                        </span>
                    </h3>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-3 rounded-full shadow-[0_0_8px_rgba(203,213,225,0.4)]"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    <a
                        href="https://leetcode.com/u/Hrushi2501/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleLinkClick(e, "https://leetcode.com/u/Hrushi2501/")}
                        className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-gray-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden shimmer cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        style={{ '--delay': '0s' } as React.CSSProperties}
                        aria-label="View LeetCode profile"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-red-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse-slow"></div>
                        <div className="text-center relative z-10">
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors duration-300">LeetCode</h4>
                            <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">Hrushi2501</p>
                            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-300">
                                1737
                            </p>
                            <p className="text-gray-500 text-sm mt-2 group-hover:text-gray-400 transition-colors duration-300">Rating</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </a>

                    <a
                        href="https://codeforces.com/profile/Hrushi2501"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleLinkClick(e, "https://codeforces.com/profile/Hrushi2501")}
                        className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-gray-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden shimmer cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        style={{ '--delay': '0.5s' } as React.CSSProperties}
                        aria-label="View Codeforces profile"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        <div className="text-center relative z-10">
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">Codeforces</h4>
                            <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">Hrushi2501</p>
                            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                                1217
                            </p>
                            <p className="text-gray-500 text-sm mt-2 group-hover:text-gray-400 transition-colors duration-300">Pupil</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </a>

                    <a
                        href="https://www.codechef.com/users/hrushi_2501"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleLinkClick(e, "https://www.codechef.com/users/hrushi_2501")} className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-gray-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden shimmer cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        style={{ '--delay': '1s' } as React.CSSProperties}
                        aria-label="View CodeChef profile"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.03] to-pink-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                        <div className="text-center relative z-10">
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors duration-300">CodeChef</h4>
                            <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">hrushi_2501</p>
                            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent group-hover:from-rose-300 group-hover:to-pink-300 transition-all duration-300">
                                1856
                            </p>
                            <p className="text-gray-500 text-sm mt-2 group-hover:text-gray-400 transition-colors duration-300">4★ (Expert)</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500/20 to-pink-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </a>

                    <a
                        href="https://atcoder.jp/users/hrushi2501"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleLinkClick(e, "https://atcoder.jp/users/hrushi2501")}
                        className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-gray-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden shimmer cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        style={{ '--delay': '1.5s' } as React.CSSProperties}
                        aria-label="View AtCoder profile"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-teal-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
                        <div className="text-center relative z-10">
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-green-200 transition-colors duration-300">AtCoder</h4>
                            <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">hrushi2501</p>
                            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-teal-300 transition-all duration-300">
                                824
                            </p>
                            <p className="text-gray-500 text-sm mt-2 group-hover:text-gray-400 transition-colors duration-300">Gray</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 to-teal-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;