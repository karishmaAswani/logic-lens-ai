import React, { useState } from 'react';
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Copy, Check } from 'lucide-react';

const FeedbackCard = ({ review, originalCode }) => {
    const [copied, setCopied] = useState(false);

    // Naively extract "Fixed Code" for diffing if user asks for it. 
    // This is a simplification. Ideally backend provides structure. 
    // For now we will just show the markdown, and if there is a code block, we assume it's the fix.

    const handleCopy = () => {
        navigator.clipboard.writeText(review);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-dark-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col">
            <div className="p-4 bg-dark-800/60 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                    <span className="font-semibold text-white">AI Analysis</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        title="Copy Feedback"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 prose prose-invert max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                    {review}
                </Markdown>
            </div>
        </div>
    );
};

export default FeedbackCard;
