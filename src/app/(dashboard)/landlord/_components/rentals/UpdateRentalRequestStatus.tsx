"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X as XIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateRentalStatus } from "@dashboard/landlord/_actions/landlordActions";

const UpdateRentalRequestStatus = ({
  requestId,
  propertyTitle,
  tenantName,
}: {
  requestId: string;
  propertyTitle: string;
  tenantName: string;
}) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = (type: "APPROVED" | "REJECTED") => {
    setAction(type);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!action) return;

    setLoading(true);
    const result = await updateRentalStatus(requestId, action);

    if (result?.success) {
      toast.success(result.message || `Request ${action.toLowerCase()} successfully`);
      setOpen(false);
    } else {
      toast.error(result?.message || "Failed to update request");
    }
    setLoading(false);
  };

  const isApprove = action === "APPROVED";

  return (
    <>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => openModal("APPROVED")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md"
          title="Approve"
        >
          <Check className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => openModal("REJECTED")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
          title="Reject"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Confirm */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && action && (
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
                    <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isApprove ? "bg-emerald-50" : "bg-red-50"}`}>
                      {isApprove ? <Check className="h-6 w-6 text-emerald-600" /> : <XIcon className="h-6 w-6 text-red-600" />}
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {isApprove ? "Approve Request" : "Reject Request"}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Are you sure you want to {isApprove ? "approve" : "reject"}{" "}
                      <span className="font-semibold text-slate-700">{tenantName}</span>&apos;s
                      request for{" "}
                      <span className="font-semibold text-slate-700">&ldquo;{propertyTitle}&rdquo;</span>?
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      disabled={loading}
                      className="flex-1 rounded-full border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={loading}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 ${
                        isApprove
                          ? "bg-emerald-600 shadow-[0_8px_20px_rgba(5,150,105,0.25)] hover:bg-emerald-700"
                          : "bg-red-600 shadow-[0_8px_20px_rgba(220,38,38,0.25)] hover:bg-red-700"
                      }`}
                    >
                      {loading ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                      ) : (
                        <>
                          {isApprove ? <Check className="h-4 w-4" /> : <XIcon className="h-4 w-4" />}
                          {isApprove ? "Yes, Approve" : "Yes, Reject"}
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

export default UpdateRentalRequestStatus;