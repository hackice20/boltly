import { motion } from 'framer-motion';
import { Github, Star, GitFork } from 'lucide-react';

export function OpenSource() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-900 via-zinc-950 to-zinc-950 opacity-50" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-3xl bg-zinc-900/50 border border-electric-500/20 backdrop-blur-xl"
                >
                    <Github className="w-16 h-16 text-white mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Proudly Open Source
                    </h2>
                    <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                        Bolty is free and open for everyone. Join our community of developers
                        building the future of AI-assisted coding.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://github.com/hackice20/boltly"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-105"
                        >
                            <Github className="w-6 h-6" />
                            <span>Star on GitHub</span>
                        </a>

                        <div className="flex gap-4 text-zinc-400 font-mono text-sm ml-0 sm:ml-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>Star us</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4 text-electric-400" />
                                <span>Fork us</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
