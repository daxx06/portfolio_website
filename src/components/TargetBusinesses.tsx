"use client";

import { motion } from "framer-motion";
import { Utensils, Hotel, Stethoscope, Dumbbell, Store, Scissors, TerminalSquare } from "lucide-react";
import { useState } from "react";

function SystemCard({ industry, index }: any) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative p-8 border ${isHovered ? 'border-[#00FFAA] bg-[#00FFAA]/5 shadow-[0_0_30px_rgba(0,255,170,0.15)] z-10' : 'border-[#1F1F1F] bg-[#0A0A0A] z-0'} transition-all duration-300 h-full flex flex-col group overflow-hidden`}
        >
            {/* Decorative Cyber Corners */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l transition-colors duration-300 ${isHovered ? 'border-[#00FFAA]' : 'border-transparent'}`}></div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r transition-colors duration-300 ${isHovered ? 'border-[#00FFAA]' : 'border-transparent'}`}></div>

            <div className="flex justify-between items-start mb-12">
                <div className={`p-3 border transition-colors duration-300 ${isHovered ? 'border-[#00FFAA] text-[#00FFAA] bg-[#00FFAA]/10' : 'border-[#333333] text-[#888888]'}`}>
                    {industry.icon}
                </div>
                <div className="font-mono text-[10px] text-[#888888] tracking-widest uppercase">
                    MOD_{index + 1}
                </div>
            </div>

            <div className="mt-auto">
                <h3 className={`font-sans text-2xl font-bold uppercase tracking-wide mb-4 transition-colors duration-300 ${isHovered ? 'text-[#00FFAA]' : 'text-[#E0E0E0]'}`}>
                    {isHovered ? `> ${industry.title}_` : industry.title}
                </h3>
                <p className="font-mono text-sm text-[#888888] leading-relaxed">
                    {industry.desc}
                </p>
            </div>

            {/* Scanning Laser Line on Hover */}
            {isHovered && (
                <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[1px] bg-[#00FFAA] shadow-[0_0_10px_#00FFAA]"
                />
            )}
        </motion.div>
    );
}

export default function TargetBusinesses() {
    const industries = [
        {
            icon: <Utensils className="w-6 h-6" />,
            title: "Gastronomy.SYS",
            desc: "Deploy automated menus and reservation algorithms. Optimize table turnover via digital throughput.",
        },
        {
            icon: <Stethoscope className="w-6 h-6" />,
            title: "Clinic.SYS",
            desc: "Secure patient data nodes. Streamline appointment architecture for zero-friction healthcare access.",
        },
        {
            icon: <Dumbbell className="w-6 h-6" />,
            title: "Fitness.SYS",
            desc: "High-voltage member portals. Automate class scheduling and subscription revenue streams.",
        },
        {
            icon: <Hotel className="w-6 h-6" />,
            title: "Hospitality.SYS",
            desc: "Bypass third-party API commissions. Construct direct-booking ecosystems with immersive galleries.",
        },
        {
            icon: <Scissors className="w-6 h-6" />,
            title: "Aesthetics.SYS",
            desc: "Precision digital storefronts paired with automated booking machines to maximize calendar efficiency.",
        },
        {
            icon: <Store className="w-6 h-6" />,
            title: "Retail.SYS",
            desc: "Structurally sound e-commerce mainframes designed to dominate local search algorithms.",
        },
    ];

    return (
        <section className="py-32 bg-[#050505] relative" id="industries">
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#1F1F1F] pt-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 font-mono text-xs text-[#00FFAA] mb-4 border border-[#00FFAA]/30 bg-[#00FFAA]/10 w-max px-3 py-1">
                            <TerminalSquare size={14} /> SYS_CONFIG_SECTORS
                        </div>
                        <h2 className="font-sans text-5xl md:text-6xl font-bold text-[#E0E0E0] uppercase tracking-tighter leading-none">
                            Operational <br /> <span className="text-[#00FFAA]">Protocols</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-sm text-[#888888] max-w-sm pl-4 border-l-2 border-[#FF0055]"
                    >
                        We deploy specialized, highly-performant digital systems tailored to the exact algorithmic needs of your operational sector.
                    </motion.p>
                </div>

                {/* Dense Cyber Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((industry, index) => (
                        <SystemCard key={index} industry={industry} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
