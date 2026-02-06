import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Github, Moon, Sun } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();
    const isWorkspace = location.pathname === '/workspace';

    return (
        <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary-500/30">
            {/* Navbar - Glassmorphism */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="p-2 bg-primary-600/10 rounded-lg group-hover:bg-primary-600/20 transition-colors">
                                    <Code2 className="w-6 h-6 text-primary-500" />
                                </div>
                                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                    Karishma's Logic Lens
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            <a href="https://github.com/karishmaAswani/AI-code-reviewer" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            {!isWorkspace && (
                                <Link to="/workspace">
                                    <button className="px-5 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                        Get Started
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-16 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
