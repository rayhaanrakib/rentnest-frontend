import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Maximize, ArrowUpRight } from "lucide-react";

// Fallback images based on category
const categoryImages: Record<string, string> = {
  Apartment: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
  House: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
  Warehouse: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop",
  "Office Space": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  "Commercial Space": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  Hostel: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  Default: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
};

const PropertyCard = ({ property }: { property: any }) => {
  const isRented = property.status === "RENTED";
  const imageSrc = property.images?.[0] || categoryImages[property.category?.name] || categoryImages.Default;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group relative h-[440px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-200"
    >
      {/* Image Background */}
      <Image
        src={imageSrc}
        alt={property.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Top Elements */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide shadow-sm">
            {property.category?.name}
          </span>
          {isRented && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/90 backdrop-blur-md text-white text-xs font-medium tracking-wide shadow-sm w-fit">
              Currently Rented
            </span>
          )}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white">

        {/* Location */}
        <div className="flex items-center gap-1.5 text-white/70 text-xs mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{property.address}, {property.city}</span>
        </div>

        {/* Title & Price */}
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold leading-tight pr-4 drop-shadow-md">
            {property.title}
          </h3>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold leading-none drop-shadow-md">
              ৳{new Intl.NumberFormat('en-US').format(property.rentAmount)}
            </p>
            <p className="text-xs text-white/60 mt-1">per month</p>
          </div>
        </div>

        {/* Specs (Slide up on hover) */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
          <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-5 pt-4 border-t border-white/20">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-2 text-sm text-white/90">
                  <BedDouble className="h-4 w-4 text-white/60" /> {property.bedrooms} Beds
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-2 text-sm text-white/90">
                  <Bath className="h-4 w-4 text-white/60" /> {property.bathrooms} Baths
                </span>
              )}
              <span className="flex items-center gap-2 text-sm text-white/90 ml-auto">
                <Maximize className="h-4 w-4 text-white/60" /> {property.area} sqft
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View Details */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide shadow-xl transition-all duration-300 ease-out opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 hover:scale-110">
          <ArrowUpRight className="h-6 w-6" />
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;