import { Github, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="p-1.5 rounded-lg bg-electric-500/10 text-electric-500">
                        <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Boltly</span>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/hackice20/boltly"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-zinc-300">
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/builder')}
                        className="bg-white text-zinc-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
