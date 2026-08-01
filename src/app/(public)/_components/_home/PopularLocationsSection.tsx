"use client";

import { IPropertyAll } from "@/types";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

const HomepagePopularLocationsSection = ({
  allProperties,
}: {
  allProperties: IPropertyAll[];
}) => {
  const cityCounts: Record<string, number> = {};

  for (const property of allProperties) {
    const city = property.city;

    if (cityCounts[city]) {
      cityCounts[city]++;
    } else {
      cityCounts[city] = 1;
    }
  }

  const locations = Object.entries(cityCounts)
    .map(([city, count]) => ({
      city,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  if (locations.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-4 border border-brand-100">
              Top Areas
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Popular Locations
            </h2>
          </div>
          <p className="text-slate-500 text-lg max-w-md">
            Explore properties in the most sought-after cities and
            neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="group relative h-48 p-6 rounded-3xl overflow-hidden cursor-pointer bg-slate-900 hover:bg-foreground transition-colors duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >

              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
                  <MapPin className="h-3.5 w-3.5 text-brand-400" />
                  <span>
                    {loc.count} {loc.count === 1 ? "Property" : "Properties"}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-slate-900 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="z-10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {loc.city}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepagePopularLocationsSection;
