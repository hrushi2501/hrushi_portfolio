"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 80%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <div
            className="w-full bg-transparent font-sans md:px-10"
            ref={containerRef}
        >
            {/* Remove the hardcoded header section since it's handled in Experience component */}
            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <TimelineItem
                        key={index}
                        item={item}
                        index={index}
                        totalItems={data.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}

                {/* Animated Timeline Line */}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-gray-700/30 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] rounded-full"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-blue-400 via-cyan-400 to-purple-500 rounded-full shadow-lg"
                    />
                    {/* Glow effect */}
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[6px] -left-[1.5px] bg-gradient-to-b from-blue-400/30 via-cyan-400/30 to-purple-500/30 rounded-full blur-sm"
                    />
                </div>
            </div>
        </div>
    );
};

// Separate component for each timeline item to properly use hooks
const TimelineItem = ({
    item,
    index,
    totalItems,
    scrollYProgress
}: {
    item: TimelineEntry;
    index: number;
    totalItems: number;
    scrollYProgress: import("framer-motion").MotionValue<number>;
}) => {
    // Now we can safely use hooks at the top level of this component
    const nodeProgress = useTransform(
        scrollYProgress,
        [index / totalItems, (index + 0.5) / totalItems],
        [0, 1]
    );

    const bgOuter = useTransform(nodeProgress, [0, 1], [
        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,211,238,0.3))"
    ]);

    const bgInner = useTransform(nodeProgress, [0, 1], [
        "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
        "linear-gradient(135deg, rgb(59,130,246), rgb(34,211,238))"
    ]);

    const boxShadow = useTransform(nodeProgress, [0, 1], [
        "0 0 0px rgba(59,130,246,0)",
        "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(34,211,238,0.3)"
    ]);

    const bgInnerMost = useTransform(nodeProgress, [0, 1], [
        "transparent",
        "linear-gradient(135deg, rgb(59,130,246), rgb(34,211,238))"
    ]);

    const scale = useTransform(nodeProgress, [0, 1], [1, 1.1]);

    return (
        <div className="flex justify-start pt-10 md:pt-20 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div
                    className="h-12 absolute left-3 md:left-3 w-12 rounded-full backdrop-blur-sm border border-gray-600/50 flex items-center justify-center shadow-lg transition-all duration-500"
                    style={{
                        background: bgOuter
                    }}
                >
                    <motion.div
                        className="h-5 w-5 rounded-full transition-all duration-500"
                        style={{
                            background: bgInner,
                            boxShadow: boxShadow
                        }}
                    >
                        <motion.div
                            className="h-full w-full rounded-full opacity-60"
                            style={{
                                background: bgInnerMost,
                                scale: scale
                            }}
                        />
                    </motion.div>
                </motion.div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                    {item.title}
                </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                    {item.title}
                </h3>
                {item.content}
            </div>
        </div>
    );
};