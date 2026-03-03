"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none crt-overlay"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00FFAA] animate-scanline opacity-30"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-1 shadow-[0_0_50px_rgba(0,255,170,0.05)]">
                    {/* Header bar */}
                    <div className="w-full h-8 bg-[#1F1F1F] flex items-center px-4 justify-between mb-8">
                        <div className="font-mono text-[10px] text-[#888888]">C:\SYS\AUTH\PORTAL.EXE</div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                            <div className="w-2 h-2 rounded-full bg-[#00FFAA]/30"></div>
                        </div>
                    </div>

                    <div className="px-8 pb-10 pt-2 space-y-8">
                        <div>
                            <h2 className="text-4xl font-sans font-bold text-[#E0E0E0] uppercase tracking-tighter leading-none text-glitch" data-text="ADMIN_PORTAL">
                                ADMIN <br /> <span className="text-[#00FFAA]">PORTAL.</span>
                            </h2>
                            <p className="mt-4 font-mono text-[10px] text-[#888888] uppercase tracking-widest border-l border-[#333333] pl-2">
                                INITIALIZE SECURE SESSION ACCESS
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-[#FF0055]/10 border border-[#FF0055] text-[#FF0055] p-3 text-[10px] font-mono font-bold uppercase tracking-widest animate-pulse">
                                    ERROR: {error}
                                </div>
                            )}

                            <div className="space-y-4 font-mono">
                                <div className="group">
                                    <label className="block text-[10px] text-[#00FFAA] uppercase tracking-widest mb-2">&gt; IDENTIFICATOR</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-[#888888]" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-[#050505] border border-[#1F1F1F] group-hover:border-[#00FFAA]/50 focus:border-[#00FFAA] pl-12 pr-4 py-4 text-[#E0E0E0] text-xs focus:outline-none transition-colors placeholder:text-[#333333]"
                                            placeholder="USER@NETWORK"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] text-[#00FFAA] uppercase tracking-widest mb-2">&gt; ACCESS_KEY</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-[#888888]" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[#050505] border border-[#1F1F1F] group-hover:border-[#00FFAA]/50 focus:border-[#00FFAA] pl-12 pr-4 py-4 text-[#E0E0E0] text-xs focus:outline-none transition-colors placeholder:text-[#333333]"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full py-5 bg-[#00FFAA]/10 border border-[#00FFAA] text-[#00FFAA] tracking-widest uppercase text-xs hover:bg-[#00FFAA] hover:text-[#0A0A0A] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,255,170,0.1)] hover:shadow-[0_0_25px_rgba(0,255,170,0.4)]"
                            >
                                {loading ? (
                                    "[ AUTHORIZING... ]"
                                ) : (
                                    <><span>[ INITIATE_LOGIN ]</span> <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 text-center font-mono text-[10px] text-[#333333] uppercase tracking-widest">
                    SECURED BY CRYPTO-SHIELD v2.4.0
                </div>
            </motion.div>
        </div>
    );
}
