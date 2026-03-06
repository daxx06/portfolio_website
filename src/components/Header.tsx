"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const GlitchHoverLink = ({ title, href, onClick, delayIndex }: { title: string; href: string, onClick: () => void, delayIndex: number }) => {
    return (
        <motion.a
            href={href}
            onClick={onClick}
            className="relative overflow-hidden block text-4xl sm:text-6xl md:text-8xl font-bold font-sans text-[#E0E0E0] group cursor-crosshair uppercase tracking-widest"
            initial="initial"
            animate="enter"
            exit="exit"
            whileHover="hover"
        >
            <div className="flex relative">
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-[#00FFAA] z-10"
                    variants={{
                        initial: { width: "0%" },
                        hover: { width: "100%", transition: { duration: 0.3 } }
                    }}
                />
                {title.split("").map((char, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col relative"
                        variants={{
                            initial: { opacity: 0, x: -20 },
                            enter: {
                                opacity: 1, x: 0,
                                transition: { duration: 0.2, delay: 0.1 + delayIndex * 0.1 + i * 0.05 }
                            },
                            exit: {
                                opacity: 0, x: 20,
                                transition: { duration: 0.1, delay: i * 0.02 }
                            }
                        }}
                    >
                        <motion.span
                            variants={{
                                initial: { color: "#E0E0E0", y: 0 },
                                hover: {
                                    color: "#00FFAA",
                                    y: [0, -5, 5, -2, 2, 0],
                                    transition: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
                                }
                            }}
                            className="inline-block whitespace-pre relative z-0"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    </motion.div>
                ))}
                {/* Decorative Hex Code trailing text */}
                <motion.span
                    variants={{
                        initial: { opacity: 0 },
                        hover: { opacity: 0.3, transition: { delay: 0.1 } }
                    }}
                    className="absolute right-0 bottom-2 text-sm font-mono text-[#00FFAA] tracking-tighter"
                >
                    _0x{Math.floor(Math.random() * 16777215).toString(16)}
                </motion.span>
            </div>
        </motion.a>
    );
};

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200, damping: 50, restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    const navLinks = [
        { name: "SYS.HOME", href: "#top" },
        { name: "SECTORS", href: "#industries" },
        { name: "MODULES", href: "#services" },
        { name: "ARCHIVE", href: "#portfolio" },
        { name: "TERMINAL", href: "#contact" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${scrolled && !isOpen ? "bg-[#050505]/90 backdrop-blur-md border-[#00FFAA]/30 shadow-[0_4px_30px_rgba(0,255,170,0.1)] py-4" : "bg-transparent border-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        <div className="flex-shrink-0 flex items-center relative z-[60]">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 border-2 border-[#00FFAA] flex items-center justify-center relative overflow-hidden group-hover:bg-[#00FFAA]/20 transition-colors">
                                    <div className="w-2 h-2 bg-[#00FFAA] group-hover:animate-ping"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className={`font-sans font-bold text-xl tracking-widest ${isOpen ? 'text-[#00FFAA]' : 'text-[#E0E0E0]'}`}>
                                        WEBX SOLUTION
                                    </span>
                                    <span className="font-mono text-[10px] text-[#888888] tracking-widest">
                    // SYS.NET_ACTIVE
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 relative z-[60]">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`flex items-center gap-3 px-4 py-2 border transition-all duration-300 font-mono text-xs tracking-widest ${isOpen
                                    ? 'border-[#FF0055] text-[#FF0055] bg-[#FF0055]/10 hover:bg-[#FF0055]/20'
                                    : 'border-[#00FFAA] text-[#00FFAA] bg-[#00FFAA]/10 hover:bg-[#00FFAA]/20 shadow-[0_0_10px_rgba(0,255,170,0.2)]'
                                    }`}
                            >
                                <div className="hidden sm:block">[{isOpen ? "TERMINATE" : "ACCESS"}]</div>
                                <div className="w-6 h-4 flex flex-col justify-between">
                                    <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} className={`w-full h-[2px] ${isOpen ? 'bg-[#FF0055]' : 'bg-[#00FFAA]'}`} />
                                    <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className={`w-3/4 h-[2px] ${isOpen ? 'bg-[#FF0055]' : 'bg-[#00FFAA]'}`} />
                                    <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} className={`w-full h-[2px] ${isOpen ? 'bg-[#FF0055]' : 'bg-[#00FFAA]'}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Cyber Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-[#00FFAA] origin-left z-[70] shadow-[0_0_10px_#00FFAA]"
                style={{ scaleX }}
            />

            {/* Glitch Overlay Menu */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                        transition={{ duration: 0.5, ease: "circInOut" }}
                        className="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-[55] flex flex-col justify-center px-4 sm:px-12 md:px-24 border-x-4 border-[#00FFAA]/20"
                    >
                        <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>

                        <nav className="flex flex-col relative z-10 w-full max-w-7xl mx-auto space-y-4">
                            {navLinks.map((link, i) => (
                                <div key={link.name} className="flex items-center gap-6 group">
                                    <span className="font-mono text-xs font-bold text-[#333333] group-hover:text-[#00FFAA] transition-colors hidden md:block w-12 text-right">
                                        _0{i + 1}
                                    </span>
                                    <GlitchHoverLink
                                        title={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        delayIndex={i}
                                    />
                                </div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-12 right-12 font-mono text-xs text-[#00FFAA] text-right pointer-events-none hidden md:block"
                        >
                            <div>SECURE_CONNECTION_ESTABLISHED</div>
                            <div className="opacity-50">ENCRYPTION: AES-256</div>
                            <div className="opacity-50">LATENCY: 12ms</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
