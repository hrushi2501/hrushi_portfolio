'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// TextHoverEffect Component - Refined and Subtle
const TextHoverEffect = ({
    text,
    duration = 0.3,
    className = ""
}: {
    text: string;
    duration?: number;
    className?: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
        if (svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;

            setMaskPosition(prev => {
                const newCx = Math.max(0, Math.min(100, cxPercentage));
                const newCy = Math.max(0, Math.min(100, cyPercentage));

                if (Math.abs(parseFloat(prev.cx) - newCx) > 1 || Math.abs(parseFloat(prev.cy) - newCy) > 1) {
                    return {
                        cx: `${newCx}%`,
                        cy: `${newCy}%`,
                    };
                }
                return prev;
            });
        }
    }, []);

    return (
        <div className={`relative ${className}`}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 1000 120"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={handleMouseMove}
                className="select-none cursor-pointer"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    {/* Subtle gradient - less vibrant */}
                    <linearGradient
                        id="textGradient"
                        gradientUnits="userSpaceOnUse"
                        cx="50%"
                        cy="50%"
                        r="40%"
                    >
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="25%" stopColor="#e2e8f0" />
                        <stop offset="50%" stopColor="#cbd5e1" />
                        <stop offset="75%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>

                    {/* Gentle shimmer - much more subtle */}
                    <motion.linearGradient
                        id="shimmerGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        animate={{
                            x1: ["0%", "100%", "0%"],
                            x2: ["100%", "200%", "100%"]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="transparent" />
                    </motion.linearGradient>

                    {/* Minimal glow filter */}
                    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    {/* Soft hover reveal */}
                    <motion.radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="35%"
                        animate={maskPosition}
                        transition={{ duration, ease: "easeOut" }}
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="60%" stopColor="rgba(255,255,255,0.9)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
                    </motion.radialGradient>
                    <mask id="textMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#revealMask)"
                        />
                    </mask>
                </defs>

                {/* Subtle base text */}
                <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-400/60 font-bold text-6xl md:text-7xl lg:text-8xl"
                    style={{ opacity: hovered ? 0.8 : 0.4 }}
                >
                    {text}
                </text>

                {/* Main text with subtle gradient */}
                <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="url(#textGradient)"
                    mask="url(#textMask)"
                    className="font-bold text-6xl md:text-7xl lg:text-8xl"
                    filter="url(#subtleGlow)"
                >
                    {text}
                </text>

                {/* Gentle shimmer overlay - only on hover */}
                <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="url(#shimmerGradient)"
                    className="font-bold text-6xl md:text-7xl lg:text-8xl"
                    style={{ 
                        mixBlendMode: 'overlay',
                        opacity: hovered ? 0.6 : 0.3
                    }}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

// Typewriter Effect for Roles
const TypewriterRole = ({ roles }: { roles: string[] }) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < currentRole.length) {
                    setCurrentText(currentRole.substring(0, currentText.length + 1));
                    setTypingSpeed(100);
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentRole.substring(0, currentText.length - 1));
                    setTypingSpeed(50);
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

    return (
        <div className="h-16 flex items-center justify-center">
            <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="font-medium bg-gradient-to-r from-blue-300 via-white to-blue-200 bg-clip-text text-transparent">
                    {currentText}
                </span>
                <motion.span
                    className="text-blue-400 ml-1 text-2xl"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    |
                </motion.span>
            </motion.p>
        </div>
    );
};

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    // Handle mounting state to avoid hydration mismatch
    useEffect(() => {
        // Use RAF to delay setting isVisible to avoid hydration mismatch
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const roles = [
        "Computer Science Student",
        "Competitive Programming Enthusiast",
        "AI ML Enthusiast",
        "Problem Solver",
        "Aspiring Quant Developer",
    ];

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 z-10">
            <div className="relative max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        {/* Enhanced Greeting */}
                        <motion.div
                            className="mb-8 flex justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.span
                                className="inline-flex items-center px-6 py-3 rounded-full text-lg font-bold bg-gradient-to-r from-blue-900/60 to-blue-800/60 text-blue-100 border border-blue-600/40 backdrop-blur-md hover:border-blue-400/60 transition-all duration-500 group shadow-xl"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    className="mr-3 text-xl"
                                    animate={{
                                        rotate: [0, 14, -8, 14, -4, 10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                    }}
                                >
                                    👋
                                </motion.span>
                                Hello, I&apos;m
                            </motion.span>
                        </motion.div>

                        {/* Name - Now more subtle and elegant */}
                        <motion.div
                            className="mb-6 relative flex justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <div className="w-full max-w-3xl">
                                <TextHoverEffect
                                    text="Hrushi Bhanvadiya"
                                    duration={0.2}
                                    className="h-20 md:h-24 lg:h-28 w-full"
                                />
                            </div>
                        </motion.div>

                        {/* Typewriter Roles */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mb-8"
                        >
                            <TypewriterRole roles={roles} />
                        </motion.div>

                        {/* Enhanced Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mb-12"
                        >
                            <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl leading-relaxed font-light mx-auto text-center">
                                Computer Science student at{" "}
                                <span className="text-blue-300 font-medium">Nirma University</span>{" "}
                                with a passion for building innovative solutions. Experienced in{" "}
                                <span className="text-blue-200 font-medium">AI, full-stack development,</span>{" "}
                                and algorithm optimization.
                            </p>
                        </motion.div>

                        {/* Premium CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 mb-16 justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            <motion.button
                                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold rounded-xl transition-all duration-500 overflow-hidden shadow-xl text-lg border border-blue-500/30"
                                whileHover={{
                                    scale: 1.05,
                                    y: -3,
                                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    document.getElementById('projects')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                            >
                                <motion.span
                                    className="relative z-10 flex items-center"
                                    initial={false}
                                >
                                    View My Work
                                    <motion.svg
                                        className="ml-3 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </motion.span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>

                            <motion.button
                                className="px-10 py-4 border-2 border-blue-500/50 text-blue-200 font-bold rounded-xl transition-all duration-300 group relative overflow-hidden text-lg"
                                whileHover={{
                                    scale: 1.05,
                                    y: -3,
                                    borderColor: "rgb(59 130 246)",
                                    color: "white"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                            >
                                <motion.span
                                    className="flex items-center relative z-10"
                                >
                                    Get In Touch
                                    <motion.div
                                        className="ml-3"
                                        whileHover={{
                                            rotate: 45,
                                            scale: 1.1
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            />
                                        </svg>
                                    </motion.div>
                                </motion.span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-500/20"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        </motion.div>

                        {/* Premium Social Links */}
                        <motion.div
                            className="flex space-x-6 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            {[
                                { href: "mailto:hrushibhanvadiya@gmail.com", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
                                { href: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                                { href: "https://github.com/hrushi2501", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    className="text-slate-500 hover:text-blue-300 transition-all duration-300 group"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                                >
                                    <motion.div
                                        className="p-3 rounded-full border border-blue-600/30 group-hover:border-blue-400/50 group-hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm"
                                        whileHover={{
                                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                                            borderColor: "rgb(59 130 246 / 0.5)"
                                        }}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </motion.div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Enhanced Scroll Indicator - Centered at bottom */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
            >
                <motion.div
                    className="flex flex-col items-center space-y-2"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-5 h-10 border-2 border-blue-500/60 rounded-full flex justify-center relative overflow-hidden"
                        whileHover={{ borderColor: "rgb(59 130 246)" }}
                    >
                        <motion.div
                            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full mt-1.5"
                            animate={{
                                y: [0, 12, 0],
                                opacity: [1, 0.3, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                    <span className="text-xs text-blue-400/70 uppercase tracking-wider font-medium">Scroll</span>
                </motion.div>
            </motion.div>
        </div>
    );
}