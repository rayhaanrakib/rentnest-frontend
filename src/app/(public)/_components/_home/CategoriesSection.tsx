"use client";

import { ICategory } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CategoriesSectionProps {
  categories: ICategory[];
}


const HomepageCategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-4 border border-brand-100"
            >
              Explore
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900"
            >
              Browse by Property Type
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-slate-500 text-lg"
            >
              Find the perfect space that fits your lifestyle and needs.
            </motion.p>
          </div>

          <Link
            href="/categories"
            className="group hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-brand-600 transition-colors"
          >
            View all categories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/categories?cat=${cat.id}`}
                className="group relative block h-full p-8 rounded-2xl border border-slate-200 bg-white hover:bg-foreground hover:border-foreground transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300 tracking-tight">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-white/50 transition-colors duration-300 px-2.5 py-1 border border-slate-200 group-hover:border-white/20 rounded-full">
                    {cat._count?.properties || 0} {cat._count?.properties === 1 ? "Property" : "Properties"}
                  </span>
                </div>

                <p className="text-sm text-slate-500 group-hover:text-white/70 transition-colors duration-300 leading-relaxed">
                  {cat.description}
                </p>

                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-foreground">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


        <div className="mt-10 text-center md:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-all"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomepageCategoriesSection;