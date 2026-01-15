import { motion } from 'framer-motion';

// Shadcn-like minimal card with Hover Effect
function FeatureCard({ title, description, className = "" }: any) {
    return (
        <div className={`group relative p-6 rounded-xl border border-zinc-800 bg-zinc-950/20 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/50 hover:bg-zinc-900/40 hover:shadow-2xl hover:shadow-electric-500/10 ${className}`}>

            {/* Hover Gradient Border/Glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-electric-500/50 to-transparent" />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-electric-500/10 to-transparent" />
                <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-electric-500/10 to-transparent" />
                <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-electric-500/10 to-transparent" />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-electric-400 transition-colors">{title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                {description}
            </p>
        </div>
    );
}

const features = [
    {
        title: "AI Architect",
        description: "Intelligent code generation that understands project context and dependencies."
    },
    {
        title: "Full Stack",
        description: "Generate React frontends and Node.js backends in a single unified workflow."
    },
    {
        title: "Instant Preview",
        description: "Zero-latency live preview. See your changes update in real-time as you code."
    },
    {
        title: "WebContainers",
        description: "Browser-native Node.js environment. secure, fast, and sandboxed execution."
    },
    {
        title: "Enterprise Security",
        description: "Built-in security best practices. Your code runs locally in the browser."
    },
    {
        title: "Smart Optimize",
        description: "AI automatically refactors and optimizes your code for production performance."
    }
];

export function Features() {
    return (
        <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                        Built for modern development
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        The speed of AI with the control of a traditional IDE.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <FeatureCard {...feature} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
