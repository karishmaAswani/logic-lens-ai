import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const TerminalDemo = () => {
    const [lines, setLines] = useState([
        "> Initializing Logic Lens...",
        "> Analyzing codebase structure...",
    ]);

    useEffect(() => {
        const nextLines = [
            "> Detecting code smells...",
            "> Found 3 optimization opportunities.",
            "> Applying best practices...",
            "> Logic optimized successfully.",
            "> Ready for deployment."
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < nextLines.length) {
                setLines(prev => [...prev, nextLines[currentIndex]].slice(-7)); // Keep last 7 lines
                currentIndex++;
            } else {
                // Reset loop
                currentIndex = 0;
                setLines(["> Initializing Logic Lens..."]);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-lg mx-auto bg-dark-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm relative">
            {/* Window Controls */}
            <div className="bg-dark-800 p-3 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-auto text-gray-500 text-xs flex items-center gap-1">
                    <Terminal size={12} /> zsh
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-64 flex flex-col justify-end space-y-2 bg-black/50 backdrop-blur-sm">
                {lines.map((line, i) => (
                    <div key={i} className="text-gray-300 animate-fade-in">
                        <span className="text-green-500 mr-2">$</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse w-3 h-5 bg-gray-500"></div>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary-500/5 to-transparent h-[20%] animate-scan opacity-30"></div>
        </div>
    );
};

export default TerminalDemo;
