"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-foreground text-white overflow-hidden flex items-center justify-center p-4">

      {/* Background Textures & Glows */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Giant Background 404 Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute text-[18rem] md:text-[28rem] font-bold tracking-tighter text-white/[0.02] select-none pointer-events-none leading-none"
      >
        404
      </motion.h1>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-lg w-full space-y-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-400 bg-brand-500/10 rounded-full mb-4 border border-brand-500/20"
        >
          Error 404
        </motion.span>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
          You&apos;ve wandered <br />
          <span className="text-brand-400">off the map.</span>
        </h2>

        <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto">
          The page you are looking for might have been removed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-foreground text-sm font-medium hover:bg-brand-400 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <Search className="h-4 w-4" />
            Browse Properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-transparent text-white text-sm font-medium border border-white/20 hover:bg-white/5 transition-all"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}