import React, { useCallback, useState, useMemo } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Social links data - memoized for performance
    const socialLinks = useMemo(() => [
        {
            href: "mailto:hrushibhanvadiya@gmail.com",
            icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
            label: "Email"
        },
        {
            href: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/",
            icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
            label: "LinkedIn"
        },
        {
            href: "https://github.com/hrushi2501",
            icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
            label: "GitHub"
        },
        {
            href: "https://x.com/hrushi2501",
            icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
            label: "Twitter/X"
        },
        {
            href: "https://www.instagram.com/hrushi_2501/",
            icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
            label: "Instagram"
        }
    ], []);

    // Optimized form handlers using useCallback
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const formspreeEndpoint = "https://formspree.io/f/xyzjykww";

            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _replyto: formData.email,
                    _subject: `New contact from ${formData.firstName} ${formData.lastName}`
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData]);

    return (
        <section id="contact" className="relative py-24">
            <style jsx>{`
                @keyframes pulse-glow {
                    0%, 100% { 
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.2),
                                    0 0 40px rgba(59, 130, 246, 0.05);
                    }
                    50% { 
                        box-shadow: 0 0 30px rgba(59, 130, 246, 0.3),
                                    0 0 60px rgba(59, 130, 246, 0.1);
                    }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }

                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }

                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                @keyframes buttonShine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                .contact-card {
                    background: rgba(17, 17, 17, 0.6);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    backdrop-filter: blur(20px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .contact-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(59, 130, 246, 0.4);
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                .form-input {
                    background: rgba(17, 17, 17, 0.8);
                    border: 1px solid rgba(55, 65, 81, 0.5);
                    backdrop-filter: blur(10px);
                    transition: all 0.2s ease;
                    color: white;
                }

                .form-input:focus {
                    border-color: rgba(59, 130, 246, 0.5);
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                    outline: none;
                    transform: translateY(-1px);
                }

                .form-input::placeholder {
                    color: rgba(156, 163, 175, 0.7);
                }

                .send-button {
                    background: linear-gradient(135deg, 
                        #3B82F6 0%,   /* Blue-500 */
                        #2563EB 25%,  /* Blue-600 */
                        #1D4ED8 75%,  /* Blue-700 */
                        #1E40AF 100%  /* Blue-800 */
                    );
                    border: none;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                }

                .send-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(255, 255, 255, 0.3), 
                        transparent
                    );
                    transition: left 0.6s;
                }

                .send-button:hover::before {
                    left: 100%;
                }

                .send-button:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 
                        0 15px 35px rgba(59, 130, 246, 0.4),
                        0 5px 15px rgba(37, 99, 235, 0.3);
                }

                .send-button:active {
                    transform: translateY(-1px) scale(1.01);
                    transition: all 0.1s ease;
                }

                .send-button:disabled {
                    opacity: 0.7;
                    transform: none;
                    cursor: not-allowed;
                }

                .send-button:disabled:hover {
                    transform: none;
                    box-shadow: none;
                }

                .button-text {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-weight: 600;
                }

                .emoji-wave {
                    display: inline-block;
                    animation: wave 2s ease-in-out infinite;
                    transform-origin: 70% 70%;
                }

                .sparkle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    animation: sparkle 1.5s ease-in-out infinite;
                }

                .sparkle:nth-child(1) { top: 20%; right: 20%; animation-delay: 0s; }
                .sparkle:nth-child(2) { top: 80%; left: 20%; animation-delay: 0.3s; }
                .sparkle:nth-child(3) { top: 40%; right: 30%; animation-delay: 0.6s; }

                .social-link {
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .social-link:hover {
                    transform: translateY(-2px) scale(1.05);
                    animation: float 2s ease-in-out infinite;
                }

                .personal-touch {
                    background: linear-gradient(135deg, 
                        rgba(59, 130, 246, 0.1) 0%,
                        rgba(147, 51, 234, 0.1) 100%
                    );
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }
            `}</style>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                            Let&#39;s Discuss Your Vision!
                        </span>
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full mx-auto mb-8"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Contact Form */}
                    <div className="contact-card p-8 rounded-2xl mb-16">
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">
                            What&#39;s on your mind?
                        </h3>
                        <p className="text-gray-400 text-center mb-8">
                            Whether it&#39;s about a project, collaboration, or just saying hi! 🚀
                        </p>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                                <p className="text-green-300 text-center">
                                    🎉 Awesome! Your message is on its way to me. I&#39;ll get back to you soon!
                                </p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                                <p className="text-red-300 text-center">
                                    😅 Oops! Something went wrong. Mind trying again or shooting me an email directly?
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="What should I call you? (First name)*"
                                    required
                                    className="form-input w-full px-4 py-3 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="And your last name?*"
                                    required
                                    className="form-input w-full px-4 py-3 rounded-lg"
                                />
                            </div>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your email (so I can reply!) 📧*"
                                required
                                className="form-input w-full px-4 py-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="What's this about? 🤔*"
                                required
                                className="form-input w-full px-4 py-3 rounded-lg"
                            />

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell me more! I'm all ears... 👂✨*"
                                required
                                rows={5}
                                className="form-input w-full px-4 py-3 rounded-lg resize-none"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="send-button w-full py-4 px-8 rounded-xl text-white text-lg font-semibold relative"
                            >
                                <div className="sparkle"></div>
                                <div className="sparkle"></div>
                                <div className="sparkle"></div>

                                <span className="button-text">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending your message...
                                        </>
                                    ) : (
                                        <>
                                            Send it my way
                                            <span className="emoji-wave">👋</span>
                                        </>
                                    )}
                                </span>
                            </button>

                            <p className="text-gray-400 text-sm text-center">
                                *Required fields • I usually reply within a few hours ⚡
                            </p>
                        </form>
                    </div>

                    {/* Social Links */}
                    <div className="text-center mb-16">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Or find me around the web 🌐
                        </h3>
                        <p className="text-gray-400 mb-8">
                            I&#39;m pretty active on these platforms too!
                        </p>
                        <div className="flex justify-center space-x-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 social-link"
                                    aria-label={social.label}
                                >
                                    <div className="p-4 rounded-full border border-gray-700 hover:border-blue-500/50 hover:bg-blue-500/10 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20">
                                        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-gray-800">
                    <p className="text-gray-400 mb-4">
                        Crafted with 💙 and lots of ☕ in <span className="text-blue-300 font-semibold">India</span> by <span className="text-blue-300 font-semibold">Hrushi Bhanvadiya</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        © 2025. Thanks for stopping by! Let&#39;s create something amazing together 🚀
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;