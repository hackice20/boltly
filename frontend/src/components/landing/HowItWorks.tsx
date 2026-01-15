import { motion } from 'framer-motion';
import { MessageSquare, Zap, PenTool, Play } from 'lucide-react';

const steps = [
    {
        icon: <MessageSquare className="w-6 h-6 text-white" />,
        title: "1. Prompt",
        description: "Describe your application idea in natural language."
    },
    {
        icon: <Zap className="w-6 h-6 text-white" />,
        title: "2. Generate",
        description: "AI architects the structure and writes the initial code."
    },
    {
        icon: <PenTool className="w-6 h-6 text-white" />,
        title: "3. Edit",
        description: "Refine definitions or edit code manually in the browser."
    },
    {
        icon: <Play className="w-6 h-6 text-white" />,
        title: "4. Run",
        description: "Instantly deploy a live preview of your full-stack app."
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-electric-900/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        From idea to deployment <br />
                        <span className="text-neon-400">in four simple steps.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-800 via-electric-900 to-zinc-800 -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-lg shadow-black/50 z-10">
                                <div className="p-3 bg-electric-600 rounded-lg">
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-[200px]">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
