import React from 'react';
import { Calendar, MapPin, Briefcase, Code, DollarSign } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';

interface Position {
    role: string;
    duration: string;
    description: string;
    isCurrent?: boolean;
}

interface CompanyData {
    company: string;
    location: string;
    positions: Position[];
    companyType: 'tech' | 'finance';
}

const Experience = () => {
    const companies: CompanyData[] = [
        {
            company: 'Computer Society of India (CSI)',
            location: 'Nirma University, Ahmedabad',
            companyType: 'tech',
            positions: [
                {
                    role: 'Core Committee Member',
                    duration: 'Feb 2025 - Present',
                    description: 'Leading strategic initiatives and managing technical events.',
                    isCurrent: true
                },
                {
                    role: 'Executive Committee Member',
                    duration: 'Oct 2024 - Feb 2025',
                    description: 'Led design initiatives for CUBIX\'25 with 2000+ participants.'
                },
                {
                    role: 'Member',
                    duration: 'Oct 2023 - Oct 2024',
                    description: 'Active in workshops and coding competitions.'
                }
            ]
        }
    ];

    const glowColors = [
        'from-blue-400 via-cyan-400 to-teal-400',
        'from-purple-400 via-pink-400 to-rose-400',
        'from-emerald-400 via-green-400 to-lime-400',
        'from-orange-400 via-amber-400 to-yellow-400'
    ];

    const timelineData = companies.map((company, companyIndex) => ({
        title: company.company,
        content: (
            <div className="w-full">
                {/* Company Card */}
                <div className="group relative overflow-hidden border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/70 transition-all duration-300 ease-out w-full backdrop-blur-sm bg-gradient-to-br from-gray-900/10 via-gray-800/10 to-gray-900/10 hover:from-gray-800/20 hover:via-gray-700/20 hover:to-gray-800/20">
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.03] to-transparent shimmer-effect"></div>

                    {/* Optimized glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>

                    {/* Company Header */}
                    <div className="relative z-10 flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors duration-200">
                                {company.company}
                            </h3>
                            <div className="flex items-center text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
                                <MapPin className="w-3 h-3 mr-1" />
                                {company.location}
                            </div>
                        </div>
                        <div className={`relative p-3 rounded-xl backdrop-blur-sm transition-all duration-200 ${company.companyType === 'tech' ?
                                'bg-blue-500/20 border border-blue-500/30 group-hover:bg-blue-500/30 group-hover:border-blue-400/50' :
                                'bg-green-500/20 border border-green-500/30 group-hover:bg-green-500/30 group-hover:border-green-400/50'
                            }`}>
                            {/* Subtle icon shimmer */}
                            <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 shimmer-icon ${company.companyType === 'tech' ? 'bg-blue-400/[0.05]' : 'bg-green-400/[0.05]'
                                }`}></div>
                            {company.companyType === 'tech' ?
                                <Code className="relative w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" /> :
                                <DollarSign className="relative w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-200" />
                            }
                        </div>
                    </div>

                    {/* Positions */}
                    <div className="relative z-10 space-y-5">
                        {company.positions.map((position, positionIndex) => {
                            const colorClass = glowColors[(companyIndex * company.positions.length + positionIndex) % glowColors.length];
                            return (
                                <div key={positionIndex} className="relative pl-6 group/position">
                                    {/* Optimized Glowing Line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 overflow-hidden">
                                        <div className={`w-full h-full bg-gradient-to-b ${colorClass} rounded-full opacity-60 group-hover:opacity-100 group/position-hover:opacity-100 transition-opacity duration-300 ease-out`}></div>
                                        <div className={`absolute inset-0 w-full h-full bg-gradient-to-b ${colorClass} rounded-full blur-sm opacity-30 group-hover:opacity-50 group/position-hover:opacity-60 transition-opacity duration-300 ease-out`}></div>
                                    </div>

                                    {/* Position Content */}
                                    <div className="space-y-3 transition-transform duration-200 ease-out group/position-hover:translate-x-1">
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <div className="flex items-center flex-wrap gap-2">
                                                <Briefcase className="w-4 h-4 text-gray-400 group/position-hover:text-gray-300 transition-colors duration-200" />
                                                <h4 className="font-medium text-white group/position-hover:text-blue-100 transition-colors duration-200">
                                                    {position.role}
                                                </h4>
                                                {position.isCurrent && (
                                                    <span className="px-3 py-1 text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full border border-yellow-500/30 backdrop-blur-sm hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-400/50 transition-all duration-200 current-badge">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm group/position-hover:text-gray-300 transition-colors duration-200">
                                            <Calendar className="w-3 h-3 mr-2" />
                                            {position.duration}
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed group/position-hover:text-gray-200 transition-colors duration-200">
                                            {position.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }));

    return (
        <section id="experience" className="relative min-h-screen py-20 bg-transparent">
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes subtle-pulse {
                    0%, 100% {
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                @keyframes gradient-flow {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .shimmer-effect {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
                }

                .shimmer-icon {
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
                    animation: shimmer 2s infinite;
                }

                .current-badge {
                    animation: subtle-pulse 2s infinite ease-in-out;
                    background-size: 200% 200%;
                    animation: gradient-flow 3s ease infinite;
                }

                /* Optimize performance by using will-change and transform3d */
                .group {
                    will-change: transform;
                }

                .group:hover {
                    transform: translate3d(0, -1px, 0);
                }

                .group/position-hover {
                    will-change: transform;
                }

                /* Reduce complexity of animations */
                .transition-all {
                    transition-property: background-color, border-color, color, opacity, transform;
                }

                /* Disable animations for reduced motion preference */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>

            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <h2 className="text-6xl font-bold mb-6 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                        Experience
                    </span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full mx-auto mb-8"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Journey through my professional experiences and contributions
                </p>
            </div>

            {/* Timeline */}
            <div className="w-full px-6">
                <Timeline data={timelineData} />
            </div>
        </section>
    );
};

export default Experience;