"use client"

import { motion } from "framer-motion";
import { Search, MapPin, Home, Building2, DollarSign, Star, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HomepageHeroSection = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Advanced search is coming soon! 🚀");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg pt-20 pb-10">
      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating UI Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="absolute top-[15%] right-[5%] hidden xl:block z-20"
      >
        <div className="bg-white/70 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/40 w-64 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-sm">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Verified Listing</p>
              <p className="text-xs text-slate-500">Checked by RentNest</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="absolute bottom-[60%] left-[5%] hidden xl:block z-20"
      >
        <div className="bg-white/30 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/40 w-64 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-xs text-slate-600 italic leading-relaxed">"Found my dream apartment in 2 days! The process was seamless."</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">S</div>
            <p className="text-xs font-bold text-slate-800">Sarah T.</p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-brand-700 text-sm font-semibold border border-brand-100 shadow-sm mb-8"
          >
            <Sparkles className="h-3.5 w-3.5" /> Join today and start your journey!
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]"
          >
            Find Your Next <br />
            <span className="gradient-text">Perfect Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover hundreds of verified properties. Connect directly with landlords and move in with confidence.
          </motion.p>

          {/* Search Bar (Coming Soon) */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-12 relative bg-white/60 backdrop-blur-xl rounded-[1.75rem] shadow-2xl border border-white/50 p-2 flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200/50 opacity-60 cursor-not-allowed">
              <MapPin className="h-5 w-5 text-slate-400" />
              <input
                type="text" placeholder="Location"
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 cursor-not-allowed"
                disabled
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200/50 opacity-60 cursor-not-allowed">
              <Home className="h-5 w-5 text-slate-400" />
              <select
                className="w-full bg-transparent outline-none text-sm text-slate-700 cursor-not-allowed"
                disabled
              >
                <option value="">All Types</option>
                <option value="apartments">Apartments</option>
                <option value="houses">Houses</option>
                <option value="villas">Villas</option>
              </select>
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-3 opacity-60 cursor-not-allowed">
              <DollarSign className="h-5 w-5 text-slate-400" />
              <input
                type="number" placeholder="Max Budget"
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 cursor-not-allowed"
                disabled
              />
            </div>
            <Button type="submit" size="lg" className="w-full md:w-auto cursor-not-rounded-xl">
              <Search className="h-4 w-4" /> Search
            </Button>
          </motion.form>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full text-base font-medium px-8 py-8 shadow-lg hover:shadow-xl transition-shadow" onClick={() => router.push("/properties")}>
              Browse Properties <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full text-base font-medium px-8 py-8 bg-white/50 backdrop-blur-md border-slate-200 hover:bg-white" onClick={() => router.push("/landlord/dashboard")}>
              <Building2 className="h-4 w-4 mr-1" /> List Your Property
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageHeroSection;