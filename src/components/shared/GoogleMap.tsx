"use client";

import { useState, useEffect } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const HAS_MAPS_ENABLED =
  Boolean(GOOGLE_MAPS_API_KEY) &&
  GOOGLE_MAPS_API_KEY !== "your-google-maps-api-key";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Improved map options for better text visibility
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    // Make text darker (slate-700) for better contrast
    { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
    // Add a white outline to text so it pops off the light backgrounds
    { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff", weight: 2 }] },
    { featureType: "water", stylers: [{ color: "#e0f2fe" }] },
    { featureType: "road", stylers: [{ color: "#ffffff" }] },
    { featureType: "landscape", stylers: [{ color: "#f8fafc" }] },
    // Make administrative labels slightly darker
    { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#1e293b" }] },
  ],
};

function MapUnavailableFallback({
  address,
  city,
  state,
  reason,
}: {
  address: string;
  city: string;
  state: string;
  reason?: string;
}) {
  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-6 text-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-brand-100 blur-xl opacity-60"></div>
        <div className="relative h-14 w-14 rounded-2xl border border-brand-100 bg-white shadow-sm flex items-center justify-center">
          <MapPin className="h-7 w-7 text-brand-600" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-base font-bold text-slate-900">Location</p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {address}
          <br />
          {city}, {state}
        </p>
      </div>
      {reason && (
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-white bg-slate-900 border border-slate-200 px-2.5 py-1 rounded-full">
          <AlertCircle className="h-3 w-3" />
          <span className="uppercase tracking-wide font-medium">
            {reason}
          </span>
        </div>
      )}
    </div>
  );
}

const GoogleMapComponent = ({
  address,
  city,
  state,
}: {
  address: string;
  city: string;
  state: string;
}) => {
  const skipLoad = !HAS_MAPS_ENABLED;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    ...(skipLoad ? { preventGoogleFontsLoading: true } : {}),
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [geocodeFailedReason, setGeocodeFailedReason] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (skipLoad) return;
    if (!isLoaded || !window.google) return;

    let cancelled = false;
    const geocoder = new window.google.maps.Geocoder();
    const fullAddress = `${address}, ${city}, ${state}`;

    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (cancelled) return;
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng(),
        });
        setGeocodeFailedReason(null);
      } else {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[GoogleMap] Geocode failed: ${status}. Enable Geocoding API in GCP or provide a valid key.`,
          );
        }
        const reason =
          status === "REQUEST_DENIED"
            ? "Map API not configured"
            : status === "ZERO_RESULTS"
              ? "Address not found"
              : "Map unavailable";
        setGeocodeFailedReason(reason);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [skipLoad, isLoaded, address, city, state]);

  if (!HAS_MAPS_ENABLED) {
    return (
      <MapUnavailableFallback
        address={address}
        city={city}
        state={state}
        reason="Google Maps API key missing"
      />
    );
  }

  if (loadError) {
    return (
      <MapUnavailableFallback
        address={address}
        city={city}
        state={state}
        reason="Failed to load Maps"
      />
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] rounded-3xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-medium">
        Loading Map...
      </div>
    );
  }

  if (!markerPosition && geocodeFailedReason) {
    return (
      <MapUnavailableFallback
        address={address}
        city={city}
        state={state}
        reason={geocodeFailedReason}
      />
    );
  }

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
      {markerPosition ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markerPosition}
          zoom={14}
          options={mapOptions}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-medium">
          Locating property...
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;