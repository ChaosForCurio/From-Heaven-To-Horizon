import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-[#ededed] font-sans">
            <h1 className="text-[12vw] font-display font-bold opacity-10 select-none leading-none">404</h1>
            <h2 className="text-2xl font-medium mb-4 -mt-10">Page Not Found</h2>
            <p className="opacity-50 mb-8">Could not find requested resource</p>
            <Link
                href="/"
                className="px-6 py-3 border border-white/20 hover:bg-white hover:text-black rounded-full transition-all duration-300"
            >
                Return Home
            </Link>
        </div>
    )
}
