import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const DeveloperCard = () => {
    return (
        <div className="relative min-h-screen flex items-end justify-center pb-6">
            <div className="animate-fade-in-up">
                <div className="group relative bg-dark-800/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-primary-500/50 transition-all shadow-lg hover:shadow-primary-500/20 max-w-xs">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-xs font-bold">
                                KA
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Karishma Aswani</h3>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                Bridging the gap between messy code and production-ready logic using Gemini AI.
                            </p>
                            <div className="flex gap-3 mt-3">
                                <a
                                    href="https://github.com/karishmaAswani"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <Github size={16} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/karishmaaswani/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <Linkedin size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperCard;


