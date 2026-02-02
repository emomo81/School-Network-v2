import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, BookOpen, TrendingUp } from 'lucide-react';

import { motion } from 'framer-motion';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div> */}
                            <img src="/ulk-logo.png" alt="ULK Logo" className="w-8 h-8 object-contain" />
                            <span className="font-bold text-lg">ULK Network</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost">Sign in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            {/* Hero */}
            <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden bg-black">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/hero-background.mp4" type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                <div className="relative z-20 max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Connect, Learn, and <span className="text-blue-400">Grow Together</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Join ULK's academic network. Ask questions, share knowledge,
                        and collaborate with peers across all departments.
                    </p>
                    <Link to="/signup">
                        <Button size="lg" className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 border-none shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
                            Join Now - It's Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Marquee Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-[#1C8AF8] py-4 border-y border-white/10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="flex">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="flex flex-shrink-0 gap-12 px-6"
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-12 whitespace-nowrap">
                                <span className="text-white/90 text-lg font-medium tracking-wide">
                                    ULK is destined to stand out as a remarkable University for excellence at the heart of Africa, with highly motivated students and high qualified personnel endowed with elevated ethical values.
                                </span>
                                <div className="w-2 h-2 rounded-full bg-white/40" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Features */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
                    <FeaturesGrid />
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-8 px-4">
                <div className="max-w-7xl mx-auto text-center text-gray-600">
                    <p>&copy; 2024 Independent University of Kigali (ULK). Built for students, by students.</p>
                </div>
            </footer>
        </div>
    );
}
