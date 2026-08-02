"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 mesh-bg overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-300/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full text-center space-y-6"
      >
        {/* Floating 404 Text */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-block"
        >
          <h1 className="text-[120px] sm:text-[150px] font-bold leading-none gradient-text">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass
              className="h-16 w-16 sm:h-20 sm:w-20 text-brand-500/30 animate-spin-slow"
              style={{ animationDuration: "8s" }}
            />
          </div>
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Lost in the Property Maze?
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button variant="link" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/properties">
              <Search className="h-4 w-4" />
              Browse Properties
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
};
export default NotFound;
