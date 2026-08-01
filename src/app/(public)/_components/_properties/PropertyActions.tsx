"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

const PropertyActions = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
        <Share2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => setIsFavorited(!isFavorited)}
        className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
          isFavorited
            ? "border-red-200 bg-red-50 text-red-500"
            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        <Heart
          className={`h-4 w-4 transition-all ${isFavorited ? "fill-red-500 text-red-500" : ""}`}
        />
      </button>
    </div>
  );
}

export default PropertyActions;