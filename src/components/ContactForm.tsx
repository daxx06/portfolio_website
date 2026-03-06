"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Terminal, MapPin } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        businessType: "",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", businessType: "", message: "" });
            } else {
                throw new Error(data.error || "Failed to submit form");
            }
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden" id="contact">
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="border border-[#1F1F1F] bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,255,170,0.03)] w-full">
                    {/* Mock Window Header */}
                    <div className="w-full h-8 bg-[#1F1F1F] flex items-center px-4 justify-between">
                        <div className="font-mono text-[10px] text-[#888888]">C:\SYS\MODULES\CONTACT.EXE</div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#1F1F1F] hidden lg:block"></div>

                        <div className="p-10 md:p-16 lg:p-20 border-b lg:border-b-0 border-[#1F1F1F] flex flex-col justify-between">

                            <div className="mb-20">
                                <div className="flex items-center gap-2 font-mono text-[10px] text-[#00FFAA] mb-6 tracking-widest bg-[#00FFAA]/10 w-max px-2 py-1">
                                    <Terminal size={12} /> INITIALIZE_CONNECTION
                                </div>
                                <h2 className="text-5xl md:text-6xl font-sans font-bold mb-6 uppercase tracking-tighter text-[#E0E0E0]">
                                    ESTABLISH <br /> <span className="text-[#00FFAA]">UPLINK.</span>
                                </h2>
                                <p className="font-mono text-[#888888] text-sm leading-relaxed max-w-sm border-l border-[#333333] pl-3">
                                    Input your system parameters below. Our architects will decrypt your request and initialize a blueprint compilation within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex flex-col gap-2">
                                    <div className="font-mono text-[#00FFAA] text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        &gt; PING_ADDRESS
                                    </div>
                                    <a href="mailto:webxsolution@gmail.com" className="text-2xl font-sans font-bold text-[#E0E0E0] hover:text-[#00FFAA] transition-colors inline-block w-max">
                                        webxsolution@gmail.com
                                    </a>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-mono text-[#00FFAA] text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        &gt; GEO_COORDINATES <MapPin size={12} />
                                    </div>
                                    <address className="text-lg font-sans font-bold text-[#888888] not-italic leading-relaxed">
                                        Ghanta Ghar<br />
                                        Dehradun, UK
                                    </address>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 md:p-16 lg:p-20 bg-[#0A0A0A]">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col items-start justify-center text-left py-20 border border-[#00FFAA]/30 p-10 bg-[#00FFAA]/5"
                                    >
                                        <div className="text-[#00FFAA] mb-8 animate-pulse">
                                            <CheckCircle size={48} strokeWidth={1} />
                                        </div>
                                        <h3 className="font-sans text-4xl font-bold text-[#E0E0E0] uppercase tracking-tighter mb-4">UPLINK SUCCESSFUL</h3>
                                        <p className="font-mono text-[#00FFAA] text-xs max-w-sm mb-12 leading-relaxed">
                                            DATA TRANSMITTED TO PRIMARY SERVERS. EXPECT INCOMING TRANSMISSION SHORTLY.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="group flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-[#888888] hover:text-[#E0E0E0] transition-colors"
                                        >
                                            [ RESET_TERMINAL ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-8 h-full font-mono"
                                    >
                                        <div className="grid grid-cols-1 gap-8">
                                            <div className="flex flex-col relative group">
                                                <label htmlFor="name" className="text-[10px] text-[#00FFAA] uppercase tracking-widest mb-2">&gt; IDENTIFICATOR</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#050505] border border-[#1F1F1F] p-4 text-[#E0E0E0] text-sm focus:border-[#00FFAA] focus:outline-none transition-colors placeholder:text-[#333333]"
                                                    placeholder="ENTER_NAME..."
                                                />
                                            </div>
                                            <div className="flex flex-col relative group">
                                                <label htmlFor="email" className="text-[10px] text-[#00FFAA] uppercase tracking-widest mb-2">&gt; ROUTING_EMAIL</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#050505] border border-[#1F1F1F] p-4 text-[#E0E0E0] text-sm focus:border-[#00FFAA] focus:outline-none transition-colors placeholder:text-[#333333]"
                                                    placeholder="ENTER_EMAIL..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col relative group">
                                            <label htmlFor="businessType" className="text-[10px] text-[#00FFAA] uppercase tracking-widest mb-2">&gt; SECTOR_DESIGNATION</label>
                                            <select
                                                id="businessType"
                                                name="businessType"
                                                required
                                                value={formData.businessType}
                                                onChange={handleChange}
                                                className="w-full bg-[#050505] border border-[#1F1F1F] p-4 text-[#E0E0E0] text-sm focus:border-[#00FFAA] focus:outline-none transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="text-[#333333]">SELECT_NODE</option>
                                                <option value="Gastronomy">Gastronomy_Module</option>
                                                <option value="Hospitality">Hospitality_Module</option>
                                                <option value="Healthcare">Healthcare_Module</option>
                                                <option value="Wellness">Wellness_Module</option>
                                                <option value="Retail">Retail_Module</option>
                                                <option value="Other">Other_Application</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col relative group flex-grow">
                                            <label htmlFor="message" className="text-[10px] text-[#00FFAA] uppercase tracking-widest mb-2">&gt; PROJECT_PAYLOAD</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full bg-[#050505] border border-[#1F1F1F] p-4 text-[#E0E0E0] text-sm focus:border-[#00FFAA] focus:outline-none transition-colors placeholder:text-[#333333] resize-none"
                                                placeholder="INPUT_PARAMETERS..."
                                            ></textarea>
                                        </div>

                                        {status === "error" && (
                                            <div className="py-3 px-4 bg-[#FF0055]/10 border border-[#FF0055] text-[#FF0055] text-[10px] font-bold uppercase tracking-widest animate-pulse">
                                                ERROR: {errorMessage}
                                            </div>
                                        )}

                                        <div className="mt-auto pt-4 flex">
                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="group w-full px-8 py-5 bg-[#00FFAA]/10 border border-[#00FFAA] text-[#00FFAA] tracking-widest uppercase text-xs hover:bg-[#00FFAA] hover:text-[#0A0A0A] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,255,170,0.1)] hover:shadow-[0_0_25px_rgba(0,255,170,0.4)]"
                                            >
                                                {status === "submitting" ? (
                                                    "[ ENCRYPTING... ]"
                                                ) : (
                                                    <><span>[ INITIATE_UPLOAD ]</span> <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>
                                                )}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
