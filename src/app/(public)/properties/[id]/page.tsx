import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Mail,
  MapPin,
  Maximize,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPropertyDetail } from "@public/_actions/getData";
import PropertyActions from "@public/_components/_properties/PropertyActions";

const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const propertyData = await getPropertyDetail(id);

  return (
    <div className="bg-white min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to properties
          </Link>
          <PropertyActions />
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 rounded-full border border-brand-100">
                {propertyData.category?.name}
              </span>
              {propertyData.status === "AVAILABLE" && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Available
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.1]">
              {propertyData.title}
            </h1>
            <div className="flex items-center gap-2 mt-5 text-slate-500">
              <MapPin className="h-5 w-5 text-brand-600" />
              <p className="text-base">
                {propertyData.address}, {propertyData.city},{" "}
                {propertyData.state}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pb-2 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-8 pt-6 lg:pt-0">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">
                {propertyData.bedrooms}
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                Bedrooms
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">
                {propertyData.bathrooms}
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                Bathrooms
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">
                {propertyData.area}
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                Sqft
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 h-[450px] md:h-[600px] mb-16 rounded-3xl overflow-hidden">
          <div className="relative md:col-span-3 md:row-span-2 h-full rounded-3xl md:rounded-none overflow-hidden group">
            {propertyData.images?.[0] && (
              <Image
                src={propertyData.images[0]}
                alt={propertyData.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                About this property
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {propertyData.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {propertyData.amenities?.map((amenity: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center">
                      <Check className="h-4 w-4 text-brand-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                <div className="pb-6 border-b border-slate-100">
                  <p className="text-sm text-slate-400 font-medium mb-1">
                    Monthly Rent
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      ৳{propertyData.rentAmount?.toLocaleString()}
                    </span>
                    <span className="text-slate-400 font-medium">/month</span>
                  </div>
                </div>

                <div className="py-6 border-b border-slate-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">
                    Listed by
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-100">
                      <Image
                        src={
                          propertyData.landlord?.avatar ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/500px-Default_pfp.svg.png"
                        }
                        alt={propertyData.landlord?.name || "Landlord"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {propertyData.landlord?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Verified Landlord
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button className="w-full h-12 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2">
                    <CalendarDays className="h-4 w-4" /> Request a Tour
                  </button>
                  <button className="w-full h-12 rounded-full bg-white text-slate-900 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" /> Send Message
                  </button>
                  <button className="w-full h-12 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold border border-brand-100 hover:bg-brand-100 transition-all flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" /> {propertyData.landlord?.phone}
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Verified Listing
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    RentNest has checked this property and landlord to ensure
                    safety and authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
