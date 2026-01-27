import { motion } from 'framer-motion';
import { Timer, Trophy, Users } from 'lucide-react';

export function WhyBoltly() {
    return (
        <section className="py-24 px-6 bg-zinc-900 border-y border-zinc-800">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Why developers choose <span className="text-electric-400">Boltly</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800"
                    >
                        <div className="mb-6 inline-flex p-3 rounded-lg bg-blue-500/10 text-blue-400">
                            <Timer className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Faster Prototyping</h3>
                        <p className="text-zinc-400">
                            Skip the boilerplate. Get straight to the logic.
                            Boltly handles the mundane setup so you can focus on the unique features of your app.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800"
                    >
                        <div className="mb-6 inline-flex p-3 rounded-lg bg-yellow-500/10 text-yellow-400">
                            <Trophy className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Hackathon Ready</h3>
                        <p className="text-zinc-400">
                            Perfect for hackathons where every minute counts.
                            Generate a working MVP in minutes and spend the rest of your time polishing.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800"
                    >
                        <div className="mb-6 inline-flex p-3 rounded-lg bg-green-500/10 text-green-400">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Community Driven</h3>
                        <p className="text-zinc-400">
                            Built by developers, for developers.
                            Boltly is fully open source, transparent, and constantly evolving with community contributions.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
