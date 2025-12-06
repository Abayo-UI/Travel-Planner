'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WelcomePage() {
    const [email, setEmail] = useState('');

    const handleGetStarted = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle email submission
        console.log('Email:', email);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Travel Planner</h1>
                <p className="text-xl mb-8">Plan your next adventure with ease</p>

                <form onSubmit={handleGetStarted} className="mb-8">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-gray-900 mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        Get Started
                    </button>
                </form>

                <Link href="/dashboard" className="text-white underline hover:text-gray-200">
                    Skip to Dashboard
                </Link>
            </div>
        </div>
    );
}