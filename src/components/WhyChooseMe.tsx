"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Network } from "lucide-react";

export default function WhyChooseMe() {
    const points = [
        { title: "HYPER_VELOCITY", desc: "Launch sequences completed in weeks. We execute rapid deployment without compromising code integrity." },
        { title: "VALUE_ENGINEERED", desc: "Premium architectural quality compiled to respect modern business resource constraints." },
        { title: "SYSTEM_PARTNERS", desc: "We manage server maintenance and scaling operations as your digital footprint expands." },
        { title: "CONVERSION_TESTED", desc: "Every component, vector, and layout decision is formulated to maximize client terminal interactions." },
    ];

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden" id="why-us">

            {/* Background Cyber Details */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FFAA]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF0055]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#1F1F1F] pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decals */}
                        <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00FFAA]/50 to-transparent hidden lg:block"></div>

                        <div className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] mb-6 opacity-50">
                            <Cpu size={14} /> SYS.CORE_ADVANTAGE
                        </div>

                        <h2 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-[0.9] text-[#E0E0E0] uppercase tracking-tighter">
                            STOP BLEEDING <br />
                            <span className="text-[#FF0055] drop-shadow-[0_0_10px_rgba(255,0,85,0.4)]">REVENUE</span> TO <br />
                            OUTDATED SYSTEMS.
                        </h2>
                        <p className="font-mono text-sm text-[#888888] mb-12 leading-relaxed max-w-lg border-l-2 border-[#1F1F1F] pl-4">
                            A visually cluttered, unoptimized framework costs you resources every CPU cycle. We construct automated digital engines that scale your operations flawlessly.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10">
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="bg-[#0A0A0A] border border-[#1F1F1F] p-5 hover:border-[#00FFAA]/50 transition-colors group"
                                >
                                    <div className="font-mono text-[10px] text-[#00FFAA] mb-2">&gt; NODE_{i + 1}</div>
                                    <h4 className="font-sans text-xl font-bold text-[#E0E0E0] mb-2 uppercase tracking-tight group-hover:text-[#00FFAA] transition-colors">{point.title}</h4>
                                    <p className="font-mono text-[#888888] text-xs leading-relaxed">{point.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pt-24"
                    >
                        {/* Terminal Data Display */}
                        <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-8 md:p-12 shadow-[0_0_30px_rgba(0,255,170,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FFAA] to-[#FF0055]"></div>

                            <div className="mb-12 pb-6 border-b border-[#1F1F1F] flex justify-between items-end">
                                <div>
                                    <h3 className="font-sans text-2xl font-bold text-[#E0E0E0] mb-1 uppercase tracking-tight">SCALE_OPERATIONS</h3>
                                    <p className="font-mono text-[#888888] text-xs tracking-widest uppercase">SYNDICATE SIZE: 50+ PARTNERS</p>
                                </div>
                                <Terminal size={24} className="text-[#00FFAA] opacity-50" />
                            </div>

                            <div className="space-y-10">
                                <div className="flex flex-col gap-1 group relative">
                                    <div className="font-mono text-5xl md:text-6xl font-bold text-[#E0E0E0] tracking-tighter group-hover:text-[#00FFAA] transition-colors">
                                        +200<span className="text-[#FF0055] text-4xl">%</span>
                                    </div>
                                    <div className="font-mono text-[#888888] text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#00FFAA] rounded-full animate-pulse"></span> AVERAGE LEAD EFFICIENCY
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 group relative">
                                    <div className="font-mono text-5xl md:text-6xl font-bold text-[#E0E0E0] tracking-tighter group-hover:text-[#00FFAA] transition-colors">
                                        99.9<span className="text-[#FF0055] text-4xl">%</span>
                                    </div>
                                    <div className="font-mono text-[#888888] text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#00FFAA] rounded-full animate-pulse"></span> SYSTEM UPTIME & STABILITY
                                    </div>
                                </div>
                            </div>

                            {/* Fake terminal log output */}
                            <div className="mt-12 bg-[#050505] p-4 text-[10px] font-mono text-[#00FFAA] h-24 overflow-hidden border border-[#1F1F1F]">
                                <div className="opacity-50">Loading metrics...</div>
                                <div className="opacity-70">Calculating cluster density... OK</div>
                                <div>Fetching node status... OK</div>
                                <div className="text-[#FF0055]">Warning: High traffic detected.</div>
                                <div>Initiating load balancers... OK</div>
                                <div className="animate-pulse">_</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
