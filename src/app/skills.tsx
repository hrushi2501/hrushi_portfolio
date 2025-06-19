import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    const techSkills = [
        "React.js", "Next.js", "TypeScript", "Python", "Node.js", "MongoDB",
        "Tailwind CSS", "Express.js", "REST APIs", "OpenAI API", "Machine Learning",
        "Git", "Docker", "Firebase", "JavaScript", "HTML/CSS", "Svelte", "GraphQL",
        "PostgreSQL", "Redis", "AWS", "Kubernetes", "Jest", "Cypress", "Webpack"
    ];

    const softSkills = [
        "🎯 Strategic Planning", "🤝 Team Leadership", "💬 Communication",
        "🧠 Critical Thinking", "🚀 Innovation", "🔄 Adaptability",
        "⚡ Problem Solving", "🎨 Creative Design", "📊 Data Analysis",
        "🌱 Continuous Learning", "💪 Resilience", "🎤 Public Speaking",
        "🔍 Analytical Mindset", "⭐ Mentoring", "👑 Leadership", "🎭 Emotional Intelligence",
        "🌐 Cross-Cultural Awareness", "📈 Project Management", "🔧 Technical Writing"
    ];

    // Memoize magnetic transform function
    const getMagneticTransform = useMemo(() => {
        return (
            mouseX: number,
            mouseY: number,
            windowWidth: number,
            windowHeight: number,
            multiplier: number = 0.003
        ) => {
            if (windowWidth === 0) return 'translate3d(0, 0, 0)';
            const x = (mouseX - windowWidth / 2) * multiplier;
            const y = (mouseY - windowHeight / 2) * multiplier;
            return `translate3d(${x}px, ${y}px, 0)`;
        };
    }, []);

    // Memoize scroll transforms with smooth, buttery multipliers
    const scrollTransforms = useMemo(() => ({
        tech1: `translate3d(${scrollY * 450 - 225}px, 0, 0)`,
        tech2: `translate3d(${-scrollY * 380 + 190}px, 0, 0)`,
        tech3: `translate3d(${scrollY * 420 - 210}px, 0, 0)`,
        soft1: `translate3d(${-scrollY * 400 + 200}px, 0, 0)`,
        soft2: `translate3d(${scrollY * 460 - 230}px, 0, 0)`,
        soft3: `translate3d(${-scrollY * 350 + 175}px, 0, 0)`
    }), [scrollY]);

    useEffect(() => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1,
                    (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
                ));
                setScrollY(scrollProgress);
            }
        };

        // Smoother mouse move handler - update every frame for maximum smoothness
        let mouseFrame = 0;

        interface MouseEventWithClient extends MouseEvent {
            clientX: number;
            clientY: number;
        }

        const handleMouseMove = (e: MouseEventWithClient) => {
            if (mouseFrame) cancelAnimationFrame(mouseFrame);
            mouseFrame = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            });
        };

        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Ultra-smooth scroll handler with interpolation
        let scrollFrame = 0;
        let lastScrollY = 0;
        
        const smoothScrollHandler = () => {
            if (scrollFrame) return;
            
            scrollFrame = requestAnimationFrame(() => {
                if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const newScrollProgress = Math.max(0, Math.min(1,
                        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
                    ));
                    
                    // Smooth interpolation for buttery effect
                    const smoothedProgress = lastScrollY + (newScrollProgress - lastScrollY) * 0.15;
                    lastScrollY = smoothedProgress;
                    setScrollY(smoothedProgress);
                }
                scrollFrame = 0;
            });
        };

        window.addEventListener('scroll', smoothScrollHandler, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', smoothScrollHandler);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mouseFrame) cancelAnimationFrame(mouseFrame);
        };
    }, []);

    return (
        <section
            id="skills"
            className="relative py-24 overflow-hidden"
            ref={containerRef}
        >
            <style jsx>{`
                @keyframes subtle-glow {
                    0%, 100% { 
                        box-shadow: 0 0 8px rgba(59, 130, 246, 0.2),
                                    0 0 15px rgba(59, 130, 246, 0.08);
                    }
                    50% { 
                        box-shadow: 0 0 12px rgba(59, 130, 246, 0.3),
                                    0 0 25px rgba(59, 130, 246, 0.12);
                    }
                }

                @keyframes soft-glow {
                    0%, 100% { 
                        box-shadow: 0 0 8px rgba(34, 197, 94, 0.2),
                                    0 0 15px rgba(34, 197, 94, 0.08);
                    }
                    50% { 
                        box-shadow: 0 0 12px rgba(34, 197, 94, 0.3),
                                    0 0 25px rgba(34, 197, 94, 0.12);
                    }
                }

                .tech-badge {
                    background: linear-gradient(135deg, 
                        rgba(30, 41, 59, 0.9) 0%,
                        rgba(51, 65, 85, 0.8) 100%
                    );
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    backdrop-filter: blur(8px);
                    animation: subtle-glow 6s ease-in-out infinite;
                    will-change: transform;
                    transform: translateZ(0);
                }
                
                .tech-badge:hover {
                    transform: translateY(-2px) scale(1.03) translateZ(0);
                    border-color: rgba(59, 130, 246, 0.5);
                }
                
                .soft-badge {
                    background: linear-gradient(135deg, 
                        rgba(21, 128, 61, 0.8) 0%,
                        rgba(22, 163, 74, 0.7) 100%
                    );
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    backdrop-filter: blur(8px);
                    animation: soft-glow 6s ease-in-out infinite;
                    will-change: transform;
                    transform: translateZ(0);
                }
                
                .soft-badge:hover {
                    transform: translateY(-2px) scale(1.03) translateZ(0);
                    border-color: rgba(34, 197, 94, 0.5);
                }
                
                .scroll-layer {
                    will-change: transform;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                    transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .magnetic-effect {
                    will-change: transform;
                    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            `}</style>
            {/* Section Header */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <h2 className="text-6xl font-bold mb-6 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                        Skills & Expertise
                    </span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full mx-auto mb-8"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Technical proficiency and soft skills driving innovation in modern development
                </p>
            </div>

            {/* Technical Skills */}
            <div className="max-w-full mx-auto px-6 lg:px-8 mb-16">
                <h3 className="text-3xl font-bold text-center mb-12 relative">
                    <span className="bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300 bg-clip-text text-transparent">
                        Technical Stack
                    </span>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-3 rounded-full shadow-[0_0_8px_rgba(203,213,225,0.4)]"></div>
                </h3>

                <div className="relative h-64 overflow-hidden">
                    {/* Tech Skills - Layer 1 */}
                    <div
                        className="absolute top-4 left-0 flex gap-6 whitespace-nowrap scroll-layer"
                        style={{
                            transform: scrollTransforms.tech1
                        }}
                    >
                        {[...Array(3)].map((_, repeat) => (
                            <div key={`tech1-${repeat}`} className="flex gap-6">
                                {techSkills.slice(0, 8).map((skill, index) => (
                                    <Badge
                                        key={`${skill}-${repeat}-${index}`}
                                        className="tech-badge py-3 px-6 text-base text-gray-100 font-semibold magnetic-effect cursor-pointer"
                                        style={{
                                            transform: getMagneticTransform(
                                                mousePosition.x,
                                                mousePosition.y,
                                                windowDimensions.width,
                                                windowDimensions.height,
                                                0.003
                                            )
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Tech Skills - Layer 2 (Opposite Direction) */}
                    <div
                        className="absolute top-24 left-0 flex gap-6 whitespace-nowrap scroll-layer"
                        style={{
                            transform: scrollTransforms.tech2
                        }}
                    >
                        {[...Array(3)].map((_, repeat) => (
                            <div key={`tech2-${repeat}`} className="flex gap-6">
                                {techSkills.slice(8, 16).map((skill, index) => (
                                    <Badge
                                        key={`${skill}-${repeat}-${index}`}
                                        className="tech-badge py-3 px-6 text-base text-gray-100 font-semibold magnetic-effect cursor-pointer"
                                        style={{
                                            transform: getMagneticTransform(
                                                mousePosition.x,
                                                mousePosition.y,
                                                windowDimensions.width,
                                                windowDimensions.height,
                                                -0.003
                                            )
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Tech Skills - Layer 3 */}
                    <div
                        className="absolute top-44 left-0 flex gap-6 whitespace-nowrap scroll-layer"
                        style={{
                            transform: scrollTransforms.tech3
                        }}
                    >
                        {[...Array(3)].map((_, repeat) => (
                            <div key={`tech3-${repeat}`} className="flex gap-6">
                                {techSkills.slice(16).map((skill, index) => (
                                    <Badge
                                        key={`${skill}-${repeat}-${index}`}
                                        className="tech-badge py-3 px-6 text-base text-gray-100 font-semibold magnetic-effect cursor-pointer"
                                        style={{
                                            transform: getMagneticTransform(
                                                mousePosition.x,
                                                mousePosition.y,
                                                windowDimensions.width,
                                                windowDimensions.height,
                                                0.005
                                            )
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Edge Fade Effects */}
                    <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-950/50 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-950/50 to-transparent pointer-events-none z-10"></div>
                </div>
            </div>

            {/* Soft Skills */}
            <div className="max-w-full mx-auto px-6 lg:px-8">
                <h3 className="text-3xl font-bold text-center mb-12 relative">
                    <span className="bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300 bg-clip-text text-transparent">
                        Core Competencies
                    </span>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-3 rounded-full shadow-[0_0_8px_rgba(203,213,225,0.4)]"></div>
                </h3>

                <div className="relative h-72 overflow-hidden">
                    {/* Soft Skills - Layer 1 */}
                    <div
                        className="absolute top-4 left-0 flex gap-6 whitespace-nowrap scroll-layer"
                        style={{
                            transform: scrollTransforms.soft1
                        }}
                    >
                        {[...Array(3)].map((_, repeat) => (
                            <div key={`soft1-${repeat}`} className="flex gap-6">
                                {softSkills.slice(0, 6).map((skill, index) => (
                                    <Badge
                                        key={`${skill}-${repeat}-${index}`}
                                        className="soft-badge py-3 px-6 text-base text-gray-100 font-semibold magnetic-effect cursor-pointer"
                                        style={{
                                            transform: getMagneticTransform(
                                                mousePosition.x,
                                                mousePosition.y,
                                                windowDimensions.width,
                                                windowDimensions.height,
                                                -0.003
                                            )
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Soft Skills - Layer 2 */}
                    <div
                        className="absolute top-24 left-0 flex gap-6 whitespace-nowrap scroll-layer"
                        style={{
                            transform: scrollTransforms.soft2
                        }}
                    >
                        {[...Array(3)].map((_, repeat) => (
                            <div key={`soft2-${repeat}`} className="flex gap-6">
                                {softSkills.slice(6, 12).map((skill, index) => (
                                    <Badge
                                        key={`${skill}-${repeat}-${index}`}
                                        className="soft-badge py-3 px-6 text-base text-gray-100 font-semibold magnetic-effect cursor-pointer"
                                        style={{
                                            transform: getMagneticTransform(
                                                mousePosition.x,
                                                mousePosition.y,
                                                windowDimensions.width,
                                                windowDimensions.height,
                                                0.003
                                            )
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Soft Skills - Layer 3 */}
                    <div
                        className="absolute top-44 left-0 flex gap-6 whitespace-nowrap scroll-layer"
                        style={{
                            transform: scrollTransforms.soft3
                        }}
                    >
                        {[...Array(3)].map((_, repeat) => (
                            <div key={`soft3-${repeat}`} className="flex gap-6">
                                {softSkills.slice(12).map((skill, index) => (
                                    <Badge
                                        key={`${skill}-${repeat}-${index}`}
                                        className="soft-badge py-3 px-6 text-base text-gray-100 font-semibold magnetic-effect cursor-pointer"
                                        style={{
                                            transform: getMagneticTransform(
                                                mousePosition.x,
                                                mousePosition.y,
                                                windowDimensions.width,
                                                windowDimensions.height,
                                                -0.005
                                            )
                                        }}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Edge Fade Effects */}
                    <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-950/50 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-950/50 to-transparent pointer-events-none z-10"></div>
                </div>
            </div>
        </section>
    );
};

export default Skills;