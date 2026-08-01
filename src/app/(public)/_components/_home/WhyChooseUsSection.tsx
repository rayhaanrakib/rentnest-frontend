"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Search, MessageSquare } from "lucide-react";

const features = [
  { title: "Verified Listings", desc: "Every property is checked to ensure what you see is what you get.", icon: ShieldCheck, color: "text-emerald-500" },
  { title: "Trusted Landlords", desc: "We verify all landlords to ensure a safe renting experience.", icon: UserCheck, color: "text-blue-500" },
  { title: "Easy Property Search", desc: "Powerful filters help you find your dream home in minutes.", icon: Search, color: "text-violet-500" },
  { title: "Secure Communication", desc: "Chat directly with landlords without sharing personal info.", icon: MessageSquare, color: "text-amber-500" },
];

const HomepageWhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Why Choose RentNest?
          </motion.h2>
          <p className="mt-3 text-slate-500">We make renting simple, safe, and transparent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all bg-slate-50"
            >
              <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 ${feat.color}`}>
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomepageWhyChooseUsSection