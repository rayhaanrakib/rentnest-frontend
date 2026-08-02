"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HomepageCTASection = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl grid lg:grid-cols-2 border border-slate-200"
        >
          {/* Left Side */}
          <div className="relative bg-foreground p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-md">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-400 border border-brand-400/30 rounded-full mb-6"
              >
                Get Started
              </motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-background leading-[1.1] mb-6">
                Your next chapter <br />
                starts here.
              </h2>

              <p className="text-background/60 text-base md:text-lg mb-10 leading-relaxed">
                Join RentNest today to discover verified properties or list your
                own. It only takes a minute to create your account.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-foreground text-sm font-medium hover:bg-white/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Login
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-transparent text-background text-sm font-medium border border-background/20 hover:bg-background/5 hover:border-background/40 transition-all"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-[300px] lg:min-h-[500px] overflow-hidden bg-slate-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop"
              alt="Modern home interior"
              fill
              className="object-cover transition-transform duration-[1.2s] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent lg:from-foreground/10" />

            <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg max-w-[300px] hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-xs font-medium text-white">
                  Trusted by Top Companies
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageCTASection;
