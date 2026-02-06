import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import { reviewCode } from '../services/api';
import { Loader2, Zap, History } from 'lucide-react';
import CodeHealthGauge from '../components/workspace/CodeHealthGauge';
import FeedbackCard from '../components/workspace/FeedbackCard';

const Workspace = () => {
    const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [healthScore, setHealthScore] = useState(0);

    // Sidebar persistence 
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem('reviewHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('reviewHistory', JSON.stringify(history));
    }, [history]);

    const handleReview = async () => {
        setLoading(true);
        setReview('');
        setHealthScore(0);

        try {
            const response = await reviewCode(code);
            const data = response.data;

            // Artificial delay for "Heavy Processing" feel requested by user
            await new Promise(r => setTimeout(r, 1200));

            // Use the structured data returned from the backend
            const reviewText = data.review || data;
            const score = data.score !== undefined ? data.score : 70;

            setReview(reviewText);
            setHealthScore(score);

            const newHistory = [{
                id: Date.now(),
                codeSnippet: code.substring(0, 40) + "...",
                date: new Date().toLocaleDateString(),
                score: score
            }, ...history].slice(0, 10);

            setHistory(newHistory);

        } catch (error) {
            console.error('Review failed:', error);
            setReview('⚠️ Rate Result: Too many requests. You have exceeded your API quota.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setCode(text);
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    const handleClear = () => {
        setCode('');
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-dark-900">
            {/* Sidebar - Glassmorphism History */}
            <div className="w-72 bg-dark-900/50 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col">
                <div className="p-5 border-b border-white/5 flex items-center gap-2 text-primary-500">
                    <History size={18} />
                    <span className="font-bold text-sm tracking-wide">TIMELINE</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {history.map(item => (
                        <div key={item.id} className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-primary-500 transition-colors"></div>
                            <div className="text-sm font-medium text-gray-200 truncate pr-8">
                                {item.codeSnippet}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">{item.date}</span>
                                {item.score && (
                                    <span className={`text-xs font-bold ${item.score > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                                        {item.score}%
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && (
                        <p className="text-gray-600 text-sm text-center py-10 italic">Your journey begins here.</p>
                    )}
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* Heavy Processing Overlay */}
                {loading && (
                    <div className="absolute inset-0 z-[60] bg-dark-900/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex flex-col items-center gap-6 animate-pulse-heavy">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500/30 blur-2xl rounded-full"></div>
                                <Loader2 className="w-16 h-16 text-primary-500 animate-spin relative z-10" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white tracking-widest">ANALYZING LOGIC</h3>
                                <p className="text-primary-400 font-mono text-sm">Validating Syntax... Checking Security...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Left: Input */}
                <div className="flex-1 flex flex-col border-r border-white/5 bg-[#0e0e0e]">
                    <div className="p-4 bg-dark-800/50 backdrop-blur border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <span className="text-sm font-bold text-gray-400 tracking-wide">SOURCE CODE</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={handleReview}
                                disabled={loading}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-2"
                            >
                                <Zap size={14} />
                                {loading ? 'ANALYZING...' : 'REVIEW'}
                            </button>
                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                            <button onClick={handleCopy} className="p-1 hover:bg-white/10 rounded group" title="Copy">
                                <span className="text-xs text-gray-400 group-hover:text-white">COPY</span>
                            </button>
                            <button onClick={handlePaste} className="p-1 hover:bg-white/10 rounded group" title="Paste">
                                <span className="text-xs text-gray-400 group-hover:text-white">PASTE</span>
                            </button>
                            <button onClick={handleClear} className="p-1 hover:bg-red-500/10 rounded group" title="Clear">
                                <span className="text-xs text-red-400 group-hover:text-red-300">CLEAR</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2 bg-dark-900/50 border-b border-white/5 md:hidden">
                        <div className="flex gap-2">
                            <button
                                onClick={handleReview}
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg"
                            >
                                <Zap size={14} /> RUN
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto relative">
                        <div className="h-full w-full absolute inset-0">
                            <CodeEditor code={code} setCode={setCode} />
                        </div>
                    </div>
                </div>

                {/* Right: Output */}
                <div className="flex-1 flex flex-col bg-dark-900/95 relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                    {review ? (
                        <div className="h-full flex flex-col p-6 gap-6 overflow-hidden">
                            {/* Score Header */}
                            <div className="flex items-center justify-between animate-fade-in-up">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Diagnostic Report</h2>
                                    <p className="text-gray-400 text-sm">AI Generated Analysis</p>
                                </div>
                                <CodeHealthGauge score={healthScore} />
                            </div>

                            {/* Feedback Content */}
                            <div className="flex-1 min-h-0 animate-fade-in-up delay-100">
                                <FeedbackCard review={review} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600 space-y-6">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                <Zap size={40} className="text-gray-700" />
                            </div>
                            <p className="text-lg font-medium tracking-wide">AWAITING INPUT</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Workspace;
