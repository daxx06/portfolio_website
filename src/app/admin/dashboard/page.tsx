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
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Dashboard Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your website leads and inquiries.</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                {/* Search and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex items-center">
                        <div className="pl-4 pr-2 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search leads by name, email, or business type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-2 py-3 outline-none bg-transparent"
                        />
                    </div>
                    <div className="bg-blue-600 text-white rounded-xl p-6 flex flex-col justify-center items-center shadow-md">
                        <div className="text-3xl font-bold">{leads.length}</div>
                        <div className="text-blue-100 text-sm font-medium">Total Leads</div>
                    </div>
                </div>

                {/* Leads List */}
                <div className="space-y-4">
                    {filteredLeads.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
                            {searchTerm ? "No leads found matching your search." : "You don't have any leads yet."}
                        </div>
                    ) : (
                        filteredLeads.map((lead, index) => (
                            <motion.div
                                key={lead._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                            >
                                {/* Lead Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{lead.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                            <Calendar size={14} />
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail size={16} className="text-blue-500" />
                                            <a href={`mailto:${lead.email}`} className="hover:text-blue-600 truncate">{lead.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Briefcase size={16} className="text-indigo-500" />
                                            <span className="font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-sm">
                                                {lead.businessType}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mt-2">
                                        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                                            {lead.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-start md:border-l md:border-gray-100 md:pl-6 pt-4 md:pt-0">
                                    <button
                                        onClick={() => deleteLead(lead._id)}
                                        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors w-full md:w-auto"
                                    >
                                        <Trash2 size={18} /> <span className="md:hidden">Delete Lead</span>
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
