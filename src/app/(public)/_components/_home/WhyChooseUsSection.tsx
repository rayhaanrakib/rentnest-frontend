"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Search, MessageSquare } from "lucide-react";

const features = [
  { title: "100% Verified Listings", desc: "Every property is meticulously checked to ensure what you see is exactly what you get.", icon: ShieldCheck },
  { title: "Vetted Landlords", desc: "We verify all landlords to ensure a safe, reliable, and transparent renting experience.", icon: UserCheck },
  { title: "Smart Search Filters", desc: "Powerful and intuitive filters help you find your dream home in minutes, not days.", icon: Search },
  { title: "Private Messaging", desc: "Chat directly with landlords through our secure platform without sharing personal info.", icon: MessageSquare },
];

const HomepageWhyChooseUsSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Subtle background grid and glow */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">

          {/* Left Column: Header */}
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-400 bg-brand-500/10 rounded-full mb-6 border border-brand-500/20"
            >
              The RentNest Advantage
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Why choose <br />
              <span className="text-brand-400">RentNest?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-slate-400 text-lg leading-relaxed"
            >
              We make renting simple, safe, and transparent. Experience the future of property hunting today.
            </motion.p>
          </div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative bg-slate-950 p-8 md:p-10 hover:bg-slate-900 transition-colors duration-300 ease-out"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:border-brand-500 transition-colors duration-300">
                  <feat.icon className="h-5 w-5 text-brand-400 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default HomepageWhyChooseUsSection;