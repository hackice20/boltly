export function Loader() {
    return (
        <div className="flex justify-center items-center">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary-400/50 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
            </div>
        </div>
    );
}