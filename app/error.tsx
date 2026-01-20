'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-[#ededed] font-sans">
            <h2 className="text-4xl font-display font-bold mb-4">Something went wrong!</h2>
            <p className="opacity-50 mb-8 max-w-md text-center">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <button
                onClick={reset}
                className="px-6 py-3 bg-[#455CE9] hover:bg-[#3549c2] text-white rounded-full transition-colors duration-300 font-medium"
            >
                Try again
            </button>
        </div>
    )
}
