import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TerminalDemo from '../components/landing/TerminalDemo';
import DeveloperCard from '../components/landing/DeveloperCard';

const LandingPage = () => {
    const [titleWord, setTitleWord] = useState('Refined.');
    const words = ["Refined.", "Secured.", "Optimized.", "Future-Proof."];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % words.length;
            setTitleWord(words[index]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
                {/* Left: Text Content */}
                <div className="space-y-8 animate-fade-in-up text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                            Logic <span className="text-primary-500 transition-all duration-300">{titleWord}</span><br />
                            Code <span className="text-purple-500">Perfected.</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
                            Transform messy spaghetti code into production-ready logic instantly. Powered by advanced AI analysis.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/workspace">
                            <button className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                Try Live Demo <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <button className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-semibold rounded-full transition-colors">
                            View Documentation
                        </button>
                    </div>
                </div>

                {/* Right: Terminal Demo */}
                <div className="relative animate-fade-in delay-200">
                    <TerminalDemo />
                </div>
            </div>

            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 animate-fade-in delay-500 z-10">
                <DeveloperCard />
            </div>
        </div>
    );
};

export default LandingPage;

