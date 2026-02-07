import React from 'react';
import { Github, Linkedin, Zap } from 'lucide-react';

const DeveloperCard = () => {
    return (
        <div className="group relative">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative flex items-center gap-4 px-6 py-4 bg-gray-900/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl transition-all duration-300 hover:translate-y-[-2px] hover:border-white/10">
                {/* Profile Image / Initials */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        KA
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-white tracking-wide">Karishma Aswani</h3>
                    <div className="mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/30 text-[10px] font-semibold tracking-wide">
                            <Zap className="w-3 h-3" />
                            Made with AI by Logic Lens
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                        Bridging the gap between messy code and production‑ready logic using Gemini AI.
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperCard;
