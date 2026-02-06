import React from 'react';

const TechStack = () => {
    return (
        <div className="mt-20 pt-10 border-t border-white/5 w-full">
            <p className="text-center text-gray-500 text-sm tracking-widest uppercase mb-8">Powered By</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Using text for now, could act as placeholders for SVG logos */}
                <StackItem name="React" color="text-blue-400" />
                <StackItem name="Vite" color="text-yellow-400" />
                <StackItem name="Tailwind CSS" color="text-cyan-400" />
                <StackItem name="Google Gemini" color="text-purple-400" />
            </div>
        </div>
    );
};

const StackItem = ({ name, color }) => (
    <div className={`flex items-center gap-2 font-semibold text-lg hover:scale-110 transition-transform cursor-default ${color}`}>
        <span className="w-2 h-2 rounded-full bg-current"></span>
        {name}
    </div>
);

export default TechStack;
