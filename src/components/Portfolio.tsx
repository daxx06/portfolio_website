"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Box } from "lucide-react";
import { useRef } from "react";

export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const projects = [
        {
            title: "BELLA_VITA.EXE",
            id: "PRJ_01",
            category: "GASTRONOMY",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80",
            desc: "Immersive dining interface with compiled digital menus and automated reservation tracking.",
            color: "#00FFAA",
            yOffset: useTransform(scrollYProgress, [0, 1], [30, -30])
        },
        {
            title: "IRONFORGE.SYS",
            id: "PRJ_02",
            category: "WELLNESS",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80",
            desc: "High-contrast geometric layout built to compile local traffic into membership databases.",
            color: "#FF0055",
            yOffset: useTransform(scrollYProgress, [0, 1], [0, -80])
        },
        {
            title: "LUMINA.APP",
            id: "PRJ_03",
            category: "HEALTHCARE",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1000&q=80",
            desc: "Verified aesthetic formulated strictly to ease user processing and facilitate safe connections.",
            color: "#00FFAA",
            yOffset: useTransform(scrollYProgress, [0, 1], [80, -120])
        }
    ];

    return (
        <section ref={containerRef} className="py-32 bg-[#0A0A0A] relative overflow-hidden" id="portfolio">
            <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#1F1F1F] pt-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] mb-4 opacity-50">
                            <Box size={14} /> SYS_ARCHIVE_DIRECTORY
                        </div>
                        <h2 className="font-sans text-5xl md:text-6xl font-bold text-[#E0E0E0] uppercase tracking-tighter leading-none mb-6">
                            COMPILED <br /> <span className="text-[#00FFAA]">MASTERPIECES</span>
                        </h2>
                    </motion.div>
                    <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        href="#contact"
                        className="group flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-[#888888] hover:text-[#00FFAA] transition-colors bg-[#1F1F1F]/50 px-4 py-3 border border-[#333333] hover:border-[#00FFAA]/50"
                    >
                        [ EXECUTE_FULL_ARCHIVE ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            style={{ y: project.yOffset }}
                            className="group cursor-crosshair bg-[#050505] border border-[#1F1F1F] hover:border-[#00FFAA]/50 transition-colors duration-500 overflow-hidden relative"
                        >
                            {/* Top Cyber Bar */}
                            <div className="p-3 border-b border-[#1F1F1F] flex justify-between items-center bg-[#0A0A0A]">
                                <span className="font-mono text-[10px] font-bold text-[#E0E0E0] tracking-widest flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: project.color }}></span>
                                    {project.id}
                                </span>
                                <span className="font-mono text-[10px] text-[#888888] uppercase tracking-widest">
                                    DIR/{project.category}/
                                </span>
                            </div>

                            <div className="relative h-[350px] overflow-hidden m-3 border border-[#1F1F1F] group-hover:border-[#00FFAA]/30">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-700 scale-100 group-hover:scale-[1.03] mix-blend-luminosity"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-[#00FFAA]/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500"></div>

                                {/* Crosshairs Overlay */}
                                <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#00FFAA]/20 transition-colors">
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00FFAA]/10"></div>
                                    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#00FFAA]/10"></div>
                                </div>
                            </div>

                            <div className="p-6 bg-[#050505]">
                                <h3 className="text-xl font-sans font-bold text-[#E0E0E0] mb-3 uppercase tracking-tight group-hover:text-[#00FFAA] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="font-mono text-xs text-[#888888] leading-relaxed border-l border-[#333333] pl-3">
                                    {project.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
