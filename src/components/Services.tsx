"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Search, Zap, Calendar, Palette } from "lucide-react";

export default function Services() {
    const services = [
        {
            code: "0x01",
            icon: <Palette className="w-5 h-5" />,
            title: "UI/UX ARCHITECTURE",
            desc: "Drafting precision interfaces structured entirely around your brand identity. Form follows algorithmic function."
        },
        {
            code: "0x02",
            icon: <Smartphone className="w-5 h-5" />,
            title: "RESPONSIVE GRIDS",
            desc: "Absolute structural integrity across all device dimensions. Engineered to maintain layout stability."
        },
        {
            code: "0x03",
            icon: <Search className="w-5 h-5" />,
            title: "SEARCH AUTHORITY",
            desc: "A solid SEO foundation constructed within the codebase to establish dominance in local search query parsing."
        },
        {
            code: "0x04",
            icon: <Zap className="w-5 h-5" />,
            title: "OPTIMIZED DELIVERY",
            desc: "Sub-second load times engineered via minimalistic DOM structures. High performance influences high conversions."
        },
        {
            code: "0x05",
            icon: <Calendar className="w-5 h-5" />,
            title: "SYS.INTEGRATION",
            desc: "Connecting the backbone of your business—CRM protocols, booking APIs—seamlessly into the front-end."
        },
        {
            code: "0x06",
            icon: <Code className="w-5 h-5" />,
            title: "CORE FRAMEWORKS",
            desc: "Future-proof scalability built upon React & Next.js. Your server is built to handle heavy traffic."
        }
    ];

    return (
        <section className="py-32 bg-[#0A0A0A] relative" id="services">
            {/* Glitch Grid BG */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F1F1F_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t-4 border-[#FF0055] pt-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="font-mono text-xs text-[#FF0055] mb-4 tracking-widest">[ CAPABILITIES_LOG ]</div>
                        <h2 className="font-sans text-5xl md:text-6xl font-bold text-[#E0E0E0] uppercase tracking-tighter leading-none text-glitch" data-text="ENGINEERING MODULES">
                            ENGINEERING <br /> MODULES
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#1F1F1F] border border-[#1F1F1F]">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#050505] p-10 hover:bg-[#0A0A0A] transition-colors duration-500 group relative overflow-hidden"
                        >
                            {/* HEX Code watermark */}
                            <div className="absolute top-4 right-4 font-mono text-3xl font-bold text-[#111111] group-hover:text-[#1A1A1A] transition-colors duration-500 select-none">
                                {service.code}
                            </div>

                            <div className="flex items-center justify-between mb-16 relative z-10 text-[#FF0055]">
                                <div className="p-3 border border-[#FF0055]/30 bg-[#FF0055]/10 group-hover:bg-[#FF0055] group-hover:text-[#050505] transition-colors">
                                    {service.icon}
                                </div>
                                <div className="w-16 h-[1px] bg-[#333333] group-hover:bg-[#FF0055] transition-colors duration-500 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#FF0055] opacity-0 group-hover:opacity-100 shadow-[0_0_5px_#FF0055]"></div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="font-sans text-xl font-bold text-[#E0E0E0] mb-3 tracking-tight uppercase group-hover:text-[#FF0055] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="font-mono text-xs text-[#888888] leading-relaxed transition-colors duration-500 bg-[#0A0A0A] p-4 border-l-2 border-[#333333] group-hover:border-[#FF0055]/50">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
