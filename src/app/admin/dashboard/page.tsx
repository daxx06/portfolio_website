"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Trash2, Mail, Briefcase, Calendar, Search } from "lucide-react";

type Lead = {
    _id: string;
    name: string;
    email: string;
    businessType: string;
    message: string;
    createdAt: string;
};

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchLeads();
        }
    }, [status, router]);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data.leads || []);
            }
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;

        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setLeads(leads.filter(lead => lead._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete lead:", error);
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.businessType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden pt-24 pb-12">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none crt-overlay opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Dashboard Header */}
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_0_30px_rgba(0,255,170,0.02)] relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FFAA] to-transparent"></div>
                    <div>
                        <div className="font-mono text-[10px] text-[#00FFAA] mb-2 tracking-[0.2em] animate-pulse">
                            &gt; SYSTEM_OPERATIONAL // SESSION_ACTIVE
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-[#E0E0E0] uppercase tracking-tighter">
                            COMMAND <span className="text-[#00FFAA]">CENTER</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="group flex items-center gap-3 px-6 py-3 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] hover:bg-[#FF0055] hover:text-[#050505] font-mono text-xs tracking-widest transition-all shadow-[0_0_15px_rgba(255,0,85,0.1)]"
                    >
                        <LogOut size={14} /> [ DISCONNECT ]
                    </button>
                </div>

                {/* Search and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-3 bg-[#0A0A0A] border border-[#1F1F1F] p-1 flex items-center group focus-within:border-[#00FFAA]/50 transition-colors">
                        <div className="pl-4 pr-2 text-[#444444] group-focus-within:text-[#00FFAA]">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="FILTER_LEADS_BY_CRITERIA..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-2 py-4 outline-none bg-transparent font-mono text-xs text-[#E0E0E0] placeholder:text-[#333333]"
                        />
                    </div>
                    <div className="bg-[#0A0A0A] border border-[#00FFAA]/30 text-[#00FFAA] p-6 flex flex-col justify-center items-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#00FFAA]/5 group-hover:bg-[#00FFAA]/10 transition-colors"></div>
                        <div className="text-4xl font-sans font-bold relative z-10">{leads.length}</div>
                        <div className="font-mono text-[10px] tracking-widest uppercase relative z-10 mt-1">LEADS_DETECTED</div>
                    </div>
                </div>

                {/* Leads List */}
                <div className="space-y-6">
                    {filteredLeads.length === 0 ? (
                        <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-24 text-center font-mono text-xs text-[#444444] uppercase tracking-widest">
                            {searchTerm ? "NO_MATCHING_DATA_FOUND" : "SYSTEM_ARCHIVE_EMPTY"}
                        </div>
                    ) : (
                        filteredLeads.map((lead, index) => (
                            <motion.div
                                key={lead._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 sm:p-8 flex flex-col md:flex-row gap-8 hover:border-[#333333] transition-colors relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-[#222222] group-hover:text-[#444444] pointer-events-none select-none">
                                    NODE_ID: {lead._id.slice(-8).toUpperCase()}
                                </div>

                                {/* Lead Info */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F1F1F] pb-4">
                                        <h3 className="text-2xl font-sans font-bold text-[#E0E0E0] uppercase tracking-tight group-hover:text-[#00FFAA] transition-colors">
                                            {lead.name}
                                        </h3>
                                        <div className="flex items-center gap-2 font-mono text-[10px] text-[#888888] bg-[#161616] px-3 py-1 border border-[#1F1F1F]">
                                            <Calendar size={12} className="text-[#666666]" />
                                            {new Date(lead.createdAt).toISOString().split('T')[0]}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-[11px]">
                                        <div className="flex items-center gap-3 text-[#BBBBBB]">
                                            <Mail size={14} className="text-[#00FFAA]" />
                                            <a href={`mailto:${lead.email}`} className="hover:text-[#00FFAA] truncate decoration-[#333333] underline underline-offset-4">{lead.email}</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-[#BBBBBB]">
                                            <Briefcase size={14} className="text-[#FF0055]" />
                                            <span className="uppercase tracking-widest bg-[#1F1F1F] px-2 py-0.5 border border-[#333333]">
                                                {lead.businessType}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-[#050505] border-l-2 border-[#1F1F1F] p-5 group-hover:border-[#00FFAA]/30 transition-colors">
                                        <p className="text-[#888888] font-mono text-xs leading-relaxed whitespace-pre-wrap">
                                            {lead.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-start md:border-l md:border-[#1F1F1F] md:pl-8">
                                    <button
                                        onClick={() => deleteLead(lead._id)}
                                        className="flex items-center justify-center gap-3 px-4 py-3 bg-[#FF0055]/5 border border-[#FF0055]/20 text-[#FF0055] hover:bg-[#FF0055] hover:text-[#050505] font-mono text-[10px] tracking-[0.2em] transition-all w-full md:w-auto"
                                    >
                                        <Trash2 size={14} /> [ PURGE ]
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
