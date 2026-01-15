// Footer component with simple links

export function Footer() {
    return (
        <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    {/* Logo placeholder - using text for now if logo component isnt available in scope easily, 
              but we can use the same svg from Home if we want or just text */}
                    <span className="text-xl font-bold text-white tracking-tight">Boltly</span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400">v1.0.0</span>
                </div>

                <div className="flex items-center gap-8 text-sm text-zinc-500">
                    <a href="https://github.com/hackice20/boltly" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">License</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                </div>

                <div className="text-zinc-600 text-sm">
                    © {new Date().getFullYear()} Boltly. Open Source.
                </div>
            </div>
        </footer>
    );
}
