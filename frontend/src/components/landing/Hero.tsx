import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative pt-32 pb-40 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">

            {/* Mesh Gradient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-30 pointer-events-none">
                <div className="w-full h-full aurora-gradient rounded-full blur-[100px] animate-aurora"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse"></span>
                    <span>v1.0 Now Public</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.1]"
                >
                    Build apps at the <br />
                    <span className="text-zinc-500">speed of thought.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                >
                    The open-source AI web builder. Prompt, generate, and deploy full-stack React & Node.js apps directly from your browser.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate('/builder')}
                        className="group flex items-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-200 transition-all hover:scale-105"
                    >
                        Start Building
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                        href="https://github.com/hackice20/boltly"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-900 transition-all hover:border-zinc-700"
                    >
                        <Terminal className="w-5 h-5 text-zinc-500" />
                        <span>Documentation</span>
                    </a>
                </motion.div>

                {/* Floating Code Preview (Subtle) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 mx-auto max-w-4xl"
                >
                    <div className="rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl p-2">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/5 rounded-t-lg">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="ml-4 text-xs text-zinc-500 font-mono">terminal — boltly-cli</div>
                        </div>
                        <div className="p-6 font-mono text-sm text-zinc-400 text-left">
                            <div className="flex gap-2">
                                <span className="text-electric-500">$</span>
                                <span className="text-white">boltly create</span>
                                <span className="text-zinc-500">"a personal portfolio with a blog"</span>
                            </div>
                            <div className="mt-2 text-zinc-500">
                                Analyzing requirements... <span className="text-green-500">Done</span><br />
                                Generating database schema... <span className="text-green-500">Done</span><br />
                                Scaffolding Next.js project... <span className="text-green-500">Done</span><br />
                                <span className="text-white mt-2 block">Application ready at http://localhost:3000 🚀</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
