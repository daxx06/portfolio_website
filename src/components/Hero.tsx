"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Terminal, Cpu, Database, Network } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
    const [text, setText] = useState("");
    const fullText = "INITIALIZING DIGITAL SYSTEMS...";
    const [cursorPhase, setCursorPhase] = useState(true);

    // Typewriter effect
    useEffect(() => {
        let i = 0;
        const typingTimer = setInterval(() => {
            setText(fullText.substring(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(typingTimer);
        }, 50);
        return () => clearInterval(typingTimer);
    }, []);

    // Blinking cursor
    useEffect(() => {
        const cursorTimer = setInterval(() => setCursorPhase((p) => !p), 530);
        return () => clearInterval(cursorTimer);
    }, []);

    // 3D HUD Tracking
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-300, 300], [5, -5]);
    const rotateY = useTransform(x, [-300, 300], [-5, 5]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    return (
        <section className="relative min-h-[100vh] flex items-center pt-24 pb-20 justify-center overflow-hidden bg-[#0a0a0a]">

            {/* Dynamic Cyber Grid */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 z-0"></div>

            {/* Glitchy Scanline */}
            <div className="absolute w-full h-8 bg-gradient-to-b from-transparent via-[#00FFAA]/10 to-transparent pointer-events-none animate-scanline z-50"></div>

            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full perspective-[1500px]"
                onMouseMove={handleMouse}
                onMouseLeave={() => { x.set(0); y.set(0); }}
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="relative max-w-5xl mx-auto w-full border border-[#1F1F1F] bg-[#0A0A0A]/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,255,170,0.05)] overflow-hidden"
                >
                    {/* Subtle Cyber Panel Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00FFAA]"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00FFAA]"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00FFAA]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00FFAA]"></div>

                    <motion.div style={{ translateZ: 20 }} className="flex items-center gap-4 mb-10 border-b border-[#1F1F1F] pb-4">
                        <span className="font-mono text-xs text-[#00FFAA] bg-[#00FFAA]/10 px-2 py-1 flex items-center gap-2">
                            <Terminal size={14} /> SYS.STATUS: ONLINE
                        </span>
                        <span className="font-mono text-xs text-[#E0E0E0] opacity-50">v4.0.1_BETA</span>
                    </motion.div>

                    <motion.div style={{ translateZ: 60 }} className="mb-8 h-6 flex items-center">
                        <span className="font-mono text-[#00FFAA] text-sm md:text-base">&gt; {text}{cursorPhase ? "_" : " "}</span>
                    </motion.div>

                    <motion.h1 style={{ translateZ: 80 }} className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 relative group">
                        <span className="text-[#E0E0E0] drop-shadow-[0_0_15px_rgba(0,255,170,0.2)]">DIGITAL</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFAA] to-[#00aa77] filter drop-shadow-[0_0_20px_rgba(0,255,170,0.4)] block">AUTOMATION</span>
                    </motion.h1>

                    <motion.p style={{ translateZ: 40 }} className="font-mono text-sm md:text-base text-[#888888] max-w-xl mb-12 border-l-2 border-[#00FFAA]/50 pl-4">
                        Deploying high-performance, strictly-typed web architectures. We reconstruct business workflows into optimized digital machines.
                    </motion.p>

                    <motion.div style={{ translateZ: 50 }} className="flex flex-col sm:flex-row gap-6">
                        <a href="#contact" className="group relative px-8 py-4 bg-[#00FFAA]/10 text-[#00FFAA] border border-[#00FFAA] font-mono text-sm tracking-widest uppercase hover:bg-[#00FFAA] hover:text-[#0A0A0A] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(0,255,170,0.2)] hover:shadow-[0_0_30px_rgba(0,255,170,0.5)]">
                            <span className="relative z-10">[ EXECUTE_PROJECT ]</span>
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#00FFAA]/50 to-transparent -translate-x-full group-hover:animate-[glitch-anim_1s_linear_infinite]"></div>
                        </a>
                        <a href="#portfolio" className="px-8 py-4 bg-transparent border border-[#333333] text-[#E0E0E0] font-mono text-sm tracking-widest uppercase hover:border-[#E0E0E0] transition-colors flex items-center justify-center">
                            ACCESS_ARCHIVE
                        </a>
                    </motion.div>

                    {/* Cyber Data Nodes floating on Z axis */}
                    <motion.div style={{ translateZ: 120 }} className="absolute right-10 top-20 hidden lg:flex flex-col gap-4 opacity-70">
                        <div className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0]"><Cpu size={16} className="text-[#00FFAA]" /> CPU: 12%</div>
                        <div className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0]"><Database size={16} className="text-[#FF0055]" /> MEM: 4096MB</div>
                        <div className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0]"><Network size={16} className="text-[#00FFAA]" /> NET: STABLE</div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
