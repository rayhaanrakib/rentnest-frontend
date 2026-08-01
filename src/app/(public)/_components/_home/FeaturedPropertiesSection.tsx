"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bed, Bath, Maximize, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IProperty } from "@/types";

const categoryImages: Record<string, string> = {
  Apartment:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
  House:
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
  Warehouse:
    "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop",
  "Office Space":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  "Commercial Space":
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  Hostel:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  Default:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
};
interface PropertiesSectionProps {
  properties: IProperty[];
}

const HomepageFeaturedPropertiesSection = ({
  properties,
}: PropertiesSectionProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFav = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-4 border border-brand-100"
            >
              Featured Listings
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900"
            >
              Discover exceptional spaces
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-slate-500 text-lg"
            >
              Handpicked properties available for rent across prime locations.
            </motion.p>
          </div>

          <Link
            href="/properties"
            className="group hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-brand-600 transition-colors whitespace-nowrap"
          >
            View all properties
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property, i) => {
            const isFavorited = favorites.includes(property.id);
            const isRented = property.status === "RENTED";
            const imageSrc =
              property.images?.[0] ||
              categoryImages[property.category?.name || "Default"] ||
              categoryImages.Default;

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative h-[440px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-200"
              >
                {/* Image Background */}
                <Image
                  src={imageSrc}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                  <div className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide shadow-sm">
                      {property.category?.name}
                    </span>
                    {isRented && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/90 backdrop-blur-md text-white text-xs font-medium tracking-wide shadow-sm w-fit">
                        Currently Rented
                      </span>
                    )}
                  </div>

                  {/* Favorite */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFav(property.id);
                    }}
                    className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
                    />
                  </button>
                </div>

                {/* Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white">
                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-white/70 text-xs mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      {property.address}, {property.city}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl font-bold leading-tight pr-4 drop-shadow-md">
                      {property.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold leading-none drop-shadow-md">
                        ৳{formatPrice(property.rentAmount)}
                      </p>
                      <p className="text-xs text-white/60 mt-1">per month</p>
                    </div>
                  </div>

                  {/* Specs  */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                    <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-5 pt-4 border-t border-white/20">
                        {property.bedrooms > 0 && (
                          <span className="flex items-center gap-2 text-sm text-white/90">
                            <Bed className="h-4 w-4 text-white/60" />{" "}
                            {property.bedrooms} Beds
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <Link
                    href={`/properties/${property.id}`}
                    className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide shadow-xl transition-all duration-300 ease-out opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 hover:scale-110"
                  >
                    <ArrowUpRight className="h-7 w-7" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-all"
          >
            View all properties
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageFeaturedPropertiesSection;
