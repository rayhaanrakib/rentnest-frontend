"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Sarah Johnson", role: "Rented in NY", avatar: "https://i.pravatar.cc/150?img=1", rating: 5, text: "RentNest made finding my apartment so easy. The process was transparent and the landlord was verified and professional." },
  { name: "Michael Chen", role: "Rented in LA", avatar: "https://i.pravatar.cc/150?img=2", rating: 5, text: "As a landlord, RentNest helped me find quality tenants quickly. The dashboard makes managing properties a breeze." },
  { name: "Emily Davis", role: "Rented in CH", avatar: "https://i.pravatar.cc/150?img=3", rating: 5, text: "The payment system is secure and the entire rental process from request to move-in was incredibly smooth." },
];


const HomepageReviewsSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            What Our Users Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-100" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10">"{rev.text}"</p>
              <div className="flex items-center gap-3">
                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-800">{rev.name}</p>
                  <p className="text-xs text-slate-400">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomepageReviewsSection