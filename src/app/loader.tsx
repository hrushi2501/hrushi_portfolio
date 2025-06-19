import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const transition = {
    duration: 0,
    ease: "linear",
};

// Pre-defined particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
    { x: 150, y: 200 },
    { x: 300, y: 400 },
    { x: 750, y: 150 },
    { x: 900, y: 350 },
    { x: 450, y: 500 },
    { x: 1100, y: 250 },
    { x: 200, y: 600 },
    { x: 650, y: 450 },
    { x: 1000, y: 100 },
    { x: 400, y: 300 },
    { x: 800, y: 550 },
    { x: 100, y: 450 },
    { x: 550, y: 200 },
    { x: 950, y: 400 },
    { x: 350, y: 650 },
    { x: 700, y: 300 },
    { x: 50, y: 500 },
    { x: 850, y: 180 },
    { x: 600, y: 480 },
    { x: 1150, y: 350 }
];

const MinimalistLoader = ({ onLoadingComplete }: { onLoadingComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Motion values for each line group
    const line1Progress = useMotionValue(0);
    const line2Progress = useMotionValue(0);
    const line3Progress = useMotionValue(0);
    const line4Progress = useMotionValue(0);
    const line5Progress = useMotionValue(0);
    const line6Progress = useMotionValue(0);

    // Smooth spring animations for line lengths
    const springLine1 = useSpring(line1Progress, { stiffness: 80, damping: 25 });
    const springLine2 = useSpring(line2Progress, { stiffness: 80, damping: 25 });
    const springLine3 = useSpring(line3Progress, { stiffness: 80, damping: 25 });
    const springLine4 = useSpring(line4Progress, { stiffness: 80, damping: 25 });
    const springLine5 = useSpring(line5Progress, { stiffness: 80, damping: 25 });
    const springLine6 = useSpring(line6Progress, { stiffness: 80, damping: 25 });

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const nextProgress = prev + Math.random() * 2.5 + 1;

                if (nextProgress >= 100) {
                    clearInterval(interval);
                    setIsComplete(true);
                    // Add delay before hiding and calling onLoadingComplete
                    setTimeout(() => {
                        setIsVisible(false);
                        setTimeout(() => {
                            onLoadingComplete?.();
                        }, 1000); // Wait for fade out animation
                    }, 500);
                    return 100;
                }

                return nextProgress;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    useEffect(() => {
        const normalizedProgress = Math.min(progress / 100, 1);

        // Stagger the line animations for a cascading effect
        line1Progress.set(Math.max(0, Math.min(1, normalizedProgress * 1.3)));
        line2Progress.set(Math.max(0, Math.min(1, (normalizedProgress - 0.08) * 1.3)));
        line3Progress.set(Math.max(0, Math.min(1, (normalizedProgress - 0.16) * 1.3)));
        line4Progress.set(Math.max(0, Math.min(1, (normalizedProgress - 0.24) * 1.3)));
        line5Progress.set(Math.max(0, Math.min(1, (normalizedProgress - 0.32) * 1.3)));
        line6Progress.set(Math.max(0, Math.min(1, (normalizedProgress - 0.40) * 1.3)));
    }, [progress, line1Progress, line2Progress, line3Progress, line4Progress, line5Progress, line6Progress]);

    // Don't render anything if not visible
    if (!isVisible) {
        return null;
    }

    return (
        <motion.div
            className="fixed inset-0 w-screen h-screen bg-black flex flex-col items-center justify-center z-[100] overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            style={{ pointerEvents: isComplete ? 'none' : 'auto' }}
        >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {PARTICLE_POSITIONS.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-10"
                        initial={{
                            x: pos.x,
                            y: pos.y,
                            scale: 0
                        }}
                        animate={{
                            y: -100,
                            scale: [0, 1, 0],
                            opacity: [0, 0.2, 0]
                        }}
                        transition={{
                            duration: (i % 3) + 2,
                            repeat: Infinity,
                            delay: (i % 4) * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Logo/Brand */}
            <motion.div
                className="mb-16 text-center z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="text-3xl md:text-5xl font-thin text-white mb-4 tracking-widest">
                    LOADING
                </h1>
                <div className="w-16 h-px bg-white mx-auto opacity-40"></div>
            </motion.div>

            {/* Full-screen SVG Container - Geometric Lines */}
            <div className="absolute inset-0 w-full h-full">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1920 1080"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        {/* Gradients for different line groups */}
                        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="lineGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="lineGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="lineGrad6" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                        </linearGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Horizontal Lines - Top Section */}
                    <motion.line
                        x1="0"
                        y1="300"
                        x2="1920"
                        y2="300"
                        stroke="url(#lineGrad1)"
                        strokeWidth="2"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: springLine1 }}
                        transition={transition}
                    />

                    {/* Diagonal Lines - Creating geometric pattern */}
                    <motion.line
                        x1="0"
                        y1="400"
                        x2="1920"
                        y2="350"
                        stroke="url(#lineGrad2)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: springLine2 }}
                        transition={transition}
                    />

                    {/* Center horizontal line */}
                    <motion.line
                        x1="0"
                        y1="540"
                        x2="1920"
                        y2="540"
                        stroke="url(#lineGrad3)"
                        strokeWidth="3"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: springLine3 }}
                        transition={transition}
                    />

                    {/* Diagonal crossing line */}
                    <motion.line
                        x1="0"
                        y1="680"
                        x2="1920"
                        y2="730"
                        stroke="url(#lineGrad4)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: springLine4 }}
                        transition={transition}
                    />

                    {/* Bottom horizontal line */}
                    <motion.line
                        x1="0"
                        y1="780"
                        x2="1920"
                        y2="780"
                        stroke="url(#lineGrad5)"
                        strokeWidth="2"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: springLine5 }}
                        transition={transition}
                    />

                    {/* Subtle connecting line */}
                    <motion.line
                        x1="0"
                        y1="620"
                        x2="1920"
                        y2="460"
                        stroke="url(#lineGrad6)"
                        strokeWidth="1"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: springLine6 }}
                        transition={transition}
                    />

                    {/* Additional geometric elements - Vertical accents */}
                    <motion.line
                        x1="480"
                        y1="0"
                        x2="480"
                        y2="1080"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        strokeOpacity="0.1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress > 20 ? 1 : 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />

                    <motion.line
                        x1="960"
                        y1="0"
                        x2="960"
                        y2="1080"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        strokeOpacity="0.1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress > 40 ? 1 : 0 }}
                        transition={{ duration: 1.5, delay: 1 }}
                    />

                    <motion.line
                        x1="1440"
                        y1="0"
                        x2="1440"
                        y2="1080"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        strokeOpacity="0.1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress > 60 ? 1 : 0 }}
                        transition={{ duration: 1.5, delay: 1.5 }}
                    />
                </svg>
            </div>

            {/* Enhanced Progress Text */}
            <motion.div
                className="mt-8 text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <motion.div
                    className="text-3xl font-thin text-white mb-3 tracking-wider"
                    key={Math.floor(progress)}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {Math.floor(progress)}%
                </motion.div>
                <div className="text-xs text-gray-500 mb-6 tracking-widest uppercase">
                    Loading Experience
                </div>

                {/* Progress bar */}
                <div className="w-80 h-px bg-gray-800 mx-auto overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

// Main Loader component to be imported in loader.tsx
const Loader = ({ onComplete }: { onComplete?: () => void }) => {
    return <MinimalistLoader onLoadingComplete={onComplete} />;
};

export default Loader;