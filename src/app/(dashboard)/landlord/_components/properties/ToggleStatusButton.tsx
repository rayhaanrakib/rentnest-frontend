"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { togglePropertyStatus } from "@dashboard/landlord/_actions/landlordActions";
import { ITogglePropertyStatus } from "@/types";

interface ToggleStatusButtonProps {
  propertyId: string;
  propertyTitle: string;
  currentStatus: ITogglePropertyStatus;
}

const ToggleStatusButton = ({
  propertyId,
  propertyTitle,
  currentStatus,
}: ToggleStatusButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAvailable = currentStatus === "AVAILABLE";
  const newStatus: ITogglePropertyStatus = isAvailable ? "UNAVAILABLE" : "AVAILABLE";

  const handleToggle = async () => {
    setLoading(true);
    try {
      const result = await togglePropertyStatus(propertyId, newStatus);

      if (result?.success) {
        toast.success(result.message || `Property marked as ${newStatus.toLowerCase()}`);
        setOpen(false);
      } else {
        toast.error(result?.message || "Failed to update status");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex h-9 w-9 items-center justify-center rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${
          isAvailable
            ? "border-slate-200 bg-white text-slate-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
            : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
        }`}
        title={isAvailable ? "Make unavailable" : "Make available"}
      >
        {isAvailable ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Confirm */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  className="fixed inset-0 z-[100] bg-slate-950/30 backdrop-blur-[3px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                />

                <motion.div
                  className="fixed left-1/2 top-1/2 z-[101] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_32px_100px_rgba(15,23,42,0.15)]"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-center">
                    {/* Icon */}
                    <div
                      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                        isAvailable ? "bg-amber-50" : "bg-emerald-50"
                      }`}
                    >
                      {isAvailable ? (
                        <EyeOff className="h-6 w-6 text-amber-600" />
                      ) : (
                        <Eye className="h-6 w-6 text-emerald-600" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {isAvailable ? "Make Unavailable" : "Make Available"}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {isAvailable ? (
                        <>
                          Are you sure you want to mark{" "}
                          <span className="font-semibold text-slate-700">
                            &ldquo;{propertyTitle}&rdquo;
                          </span>{" "}
                          as unavailable? It will no longer appear in search results.
                        </>
                      ) : (
                        <>
                          Are you sure you want to mark{" "}
                          <span className="font-semibold text-slate-700">
                            &ldquo;{propertyTitle}&rdquo;
                          </span>{" "}
                          as available? It will be visible to tenants again.
                        </>
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      disabled={loading}
                      className="flex-1 rounded-full border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:text-slate-900 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleToggle}
                      disabled={loading}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${
                        isAvailable
                          ? "bg-amber-600 shadow-[0_8px_20px_rgba(217,119,6,0.25)] hover:bg-amber-700"
                          : "bg-emerald-600 shadow-[0_8px_20px_rgba(5,150,105,0.25)] hover:bg-emerald-700"
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          {isAvailable ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          {isAvailable ? "Yes" : "Yes"}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default ToggleStatusButton;