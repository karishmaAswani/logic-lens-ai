import React from 'react';

const CodeHealthGauge = ({ score }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let color = 'text-red-500';
    if (score > 50) color = 'text-yellow-500';
    if (score > 80) color = 'text-green-500';

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-dark-800 rounded-xl border border-white/5 relative">
            <h3 className="text-gray-400 text-xs uppercase tracking-widest absolute top-4">Code Health</h3>

            <div className="relative w-32 h-32 mt-4 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-dark-700"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={`${color} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${color}`}>{score}</span>
                    <span className="text-xs text-gray-500">/ 100</span>
                </div>
            </div>
        </div>
    );
};

export default CodeHealthGauge;
