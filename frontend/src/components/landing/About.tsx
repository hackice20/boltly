import { motion } from 'framer-motion';

export function About() {
    return (
        <section className="py-24 px-6 bg-zinc-950">
            <div className="max-w-4xl mx-auto text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-electric-400 font-semibold tracking-wider text-sm uppercase mb-4 block"
                >
                    About The Project
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-8"
                >
                    An Open Source AI Coding Workspace
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
                >
                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                        <strong className="text-white">Bolty</strong> is a community-driven clone inspired by <em className="text-white">bolt.new</em>.
                        It empowers developers to build, run, and deploy full-stack applications without leaving the browser.
                        By leveraging advanced AI models, Bolty turns natural language prompts into production-ready code,
                        making rapid prototyping and development accessible to everyone.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
