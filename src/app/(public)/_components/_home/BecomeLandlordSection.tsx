"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Create unlimited property listings",
  "Manage everything from one dashboard",
  "Reach verified tenants instantly",
  "Receive booking inquiries securely",
];

const HomepageBecomeLandlordSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-foreground text-white overflow-hidden">
      {/* Background Textures & Glows */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-8">
              For Property Owners
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
              Turn your property <br />
              into someone&apos;s <span className="text-brand-400">home.</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
              List your property in minutes and connect with thousands of verified tenants looking for their next home. It&apos;s free, fast, and secure.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-12">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="group flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500/10 border border-brand-500/20 shrink-0 transition-colors group-hover:bg-brand-500 group-hover:border-brand-500">
                    <Check className="h-3.5 w-3.5 text-brand-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/landlord/dashboard"
              className="group inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-white text-foreground text-base font-semibold hover:bg-brand-400 hover:text-white transition-all shadow-lg hover:shadow-brand-500/20 hover:-translate-y-0.5"
            >
              Become a Landlord
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Column: Image with Floating Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                alt="Modern property interior"
                fill
                className="object-cover"
                sizes="50vw"
              />
              {/* Gradient overlay to blend image with dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
            </div>

            {/* Floating Glassmorphism Notification Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-xl flex items-center gap-5"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 shrink-0">
                <Bell className="h-6 w-6 text-brand-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium mb-1">New Inquiry</p>
                <p className="text-base font-bold text-white leading-tight">You have a new tenant request!</p>
                <p className="text-xs text-white/60 mt-1">Review and respond instantly from your dashboard.</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HomepageBecomeLandlordSection;