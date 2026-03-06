import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] text-[#E0E0E0] border-t-2 border-[#1F1F1F] pt-24 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>

            {/* Glitching Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FFAA] to-[#FF0055]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">

                    <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="font-sans font-bold text-2xl tracking-widest mb-6 block flex items-center gap-4 group">
                                <div className="w-8 h-8 border-2 border-[#00FFAA] flex items-center justify-center relative bg-[#00FFAA]/10">
                                    <div className="w-2 h-2 bg-[#00FFAA] animate-pulse"></div>
                                </div>
                                <div>
                                    <span className="text-[#E0E0E0] group-hover:text-[#00FFAA] transition-colors">WEBX SOLUTION</span>
                                    <span className="block font-mono text-[10px] text-[#888888] tracking-widest mt-1">
                                        SYSTEM_CORE // ONLINE
                                    </span>
                                </div>
                            </Link>
                            <p className="font-mono text-[#888888] leading-relaxed max-w-sm text-xs mb-12 lg:mb-0 border-l border-[#333333] pl-3">
                                Automated digital engineering for high-performance scale. We compile structurally sound web frameworks.
                            </p>
                        </div>

                        <a href="mailto:hello@webcrafters.agency" className="text-xl md:text-2xl font-sans font-bold tracking-tighter text-[#00FFAA] hover:text-[#E0E0E0] hover:drop-shadow-[0_0_10px_#00FFAA] transition-all mt-auto flex items-center gap-3">
                            <span className="font-mono text-sm">&gt;</span> webxsolution@gmail.com
                        </a>
                    </div>

                    <div className="md:col-span-3 lg:col-span-2 lg:col-start-8">
                        <h4 className="font-mono text-[10px] text-[#FF0055] uppercase tracking-widest mb-6">[ DIRECTORY_INDEX ]</h4>
                        <ul className="space-y-4 font-mono text-xs">
                            <li><a href="#industries" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">SECTORS <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            <li><a href="#services" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">MODULES <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            <li><a href="#portfolio" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">ARCHIVE <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            <li><a href="#why-us" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">SYSTEM_SPECS <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3 lg:col-span-2">
                        <h4 className="font-mono text-[10px] text-[#FF0055] uppercase tracking-widest mb-6">[ NETWORK_NODES ]</h4>
                        <ul className="space-y-4 font-mono text-xs">
                            <li><a href="#" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">X_NET <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            <li><a href="#" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">LINKEDIN_NODE <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            <li><a href="#" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">INSTA_GRID <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                            <li><a href="#" className="hover:text-[#00FFAA] transition-colors flex items-center gap-2 group">GITHUB_REPO <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-[#888888] tracking-widest uppercase">
                    <p>&copy; {currentYear} WEBX SOLUTION LLC</p>
                    <div className="flex gap-8">
                        <Link href="/admin/login" className="hover:text-[#00FFAA] transition-colors">[ ADMIN_TERMINAL ]</Link>
                        <a href="#" className="hover:text-[#00FFAA] transition-colors">SECURITY_POLICY</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
