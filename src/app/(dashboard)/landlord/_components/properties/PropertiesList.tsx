import { getLandlordProperties } from "@dashboard/landlord/_actions/landlordActions";
import { getCategories } from "@public/_actions/getData";
import {
  Building2, CheckCircle2, XCircle, Home, Bed, Bath,
  Maximize, MapPin, Star, Users, TrendingUp, ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CreatePropertyButton from "@dashboard/landlord/_components/properties/CreatePropertyButton";
import PropertyActions from "@dashboard/landlord/_components/properties/PropertyActions";
import { IProperty } from "@/types";

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  AVAILABLE: { label: "Available", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  RENTED: { label: "Rented", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  UNAVAILABLE: { label: "Unavailable", color: "text-slate-500", bg: "bg-slate-100 border-slate-200", dot: "bg-slate-400" },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency", currency: "BDT", maximumFractionDigits: 0,
  }).format(amount);

const PropertiesList = async () => {
  const [propertiesData, categories] = await Promise.all([
    getLandlordProperties(),
    getCategories(),
  ]);

  if (!propertiesData) return null;

  const { meta, properties } = propertiesData;

  const stats = [
    { label: "Total Properties", value: meta.total_property, icon: Building2, accent: "from-slate-100 to-slate-50", iconColor: "text-slate-700" },
    { label: "Available", value: meta.available_property, icon: CheckCircle2, accent: "from-emerald-50 to-white", iconColor: "text-emerald-600" },
    { label: "Rented", value: meta.rented_property, icon: Users, accent: "from-blue-50 to-white", iconColor: "text-blue-600" },
    { label: "Unavailable", value: meta.unavailable_property, icon: XCircle, accent: "from-slate-100 to-slate-50", iconColor: "text-slate-500" },
  ];

  return (
    <>
      <div className="flex justify-end">
        <CreatePropertyButton categories={categories || []} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={cn("relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b p-4 shadow-sm", stat.accent)}>
            <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm", stat.iconColor)}>
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Properties Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">All Listings</h2>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
            {properties.length} properties
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property: IProperty) => {
            const status = statusConfig[property.status] ?? statusConfig.UNAVAILABLE;

            return (
              <div key={property.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={property.images?.[0] || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm", status.bg, status.color)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3">
                    <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      {property.category?.name || "None"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-10">
                    <p className="text-lg font-bold text-white">
                      {formatCurrency(property.rentAmount)}
                      <span className="text-xs font-normal text-white/70"> /month</span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="truncate text-base font-semibold text-slate-900">{property.title}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{property.address}, {property.city}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
                        <Bed className="h-3.5 w-3.5 text-slate-400" /> {property.bedrooms}
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
                        <Bath className="h-3.5 w-3.5 text-slate-400" /> {property.bathrooms}
                      </div>
                    )}
                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
                      <Maximize className="h-3.5 w-3.5 text-slate-400" /> {property.area.toLocaleString()} sqft
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      {property._count?.reviews !== undefined && property._count.reviews > 0 && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Star className="h-3.5 w-3.5 text-amber-400" />
                          {property._count.reviews} {property._count.reviews === 1 ? "review" : "reviews"}
                        </div>
                      )}
                      {property._count?.rentals !== undefined && property._count.rentals > 0 && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <TrendingUp className="h-3.5 w-3.5 text-brand-500" />
                          {property._count.rentals} {property._count.rentals === 1 ? "rental" : "rentals"}
                        </div>
                      )}
                      {property._count?.reviews === 0 && property._count?.rentals === 0 && (
                        <span className="text-xs text-slate-400">No activity yet</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <PropertyActions property={property} categories={categories || []} />
                      <Link
                        href={`/properties/${property.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-md"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {properties.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Home className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-slate-900">No properties listed</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Start by adding your first rental property to begin managing your portfolio.
          </p>
          <div className="mt-6">
            <CreatePropertyButton categories={categories || []} />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertiesList;