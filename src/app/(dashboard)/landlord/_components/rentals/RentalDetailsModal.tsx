"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Home,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  MapPin,
  DollarSign,
  Loader2,
  Check,
  X as XIcon,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  getLandlordRentalDetail,
  updateRentalStatus,
} from "@dashboard/landlord/_actions/landlordActions";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  PENDING: {
    label: "Pending",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
  },
  APPROVED: {
    label: "Approved",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    dot: "bg-red-500",
  },
  ACTIVE: {
    label: "Active",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
  },
  COMPLETED: {
    label: "Completed",
    color: "text-slate-700",
    bg: "bg-slate-100 border-slate-200",
    dot: "bg-slate-500",
  },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const RentalDetailsModal = ({
  open,
  onClose,
  requestId,
}: {
  open: boolean;
  onClose: () => void;
  requestId: string;
}) => {
  const [rental, setRental] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (open && requestId) {
      setLoading(true);
      getLandlordRentalDetail(requestId)
        .then((data) => setRental(data))
        .catch(() => toast.error("Failed to load details"))
        .finally(() => setLoading(false));
    }
  }, [open, requestId]);

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    setUpdating(true);
    const result = await updateRentalStatus(requestId, status);

    if (result?.success) {
      toast.success(result.message || `Request ${status.toLowerCase()}`);
      onClose();
    } else {
      toast.error(result?.message || "Failed to update");
    }
    setUpdating(false);
  };

  if (!open) return null;

  const status = rental
    ? (statusConfig[rental.status] ?? statusConfig.PENDING)
    : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative flex w-full max-w-lg max-h-[95vh] sm:max-h-[85vh] flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:rounded-[2rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              <p className="text-xs text-slate-500">Loading details...</p>
            </div>
          )}

          {!loading && !rental && (
            <div className="flex flex-col items-center justify-center py-20 gap-2">
              <p className="text-sm text-slate-500">No details found.</p>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 underline"
              >
                Close
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && rental && (
            <>
              <div className="relative h-44 w-full shrink-0 bg-slate-100">
                {rental.property?.images?.[0] ? (
                  <Image
                    src={rental.property.images[0]}
                    alt={rental.property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 512px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Home className="h-10 w-10 text-slate-300" />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-slate-700 backdrop-blur-sm hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Status badge */}
                {status && (
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${status.bg} ${status.color}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </div>
                )}

                {/* Property title on image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h2 className="text-lg font-bold text-white">
                    {rental.property?.title}
                  </h2>
                  <p className="flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="h-3 w-3" />
                    {rental.property?.address}, {rental.property?.city}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 no-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                    <DollarSign className="mx-auto h-4 w-4 text-slate-400 mb-1" />
                    <p className="text-lg font-bold text-slate-900">
                      {formatCurrency(rental.property?.rentAmount || 0)}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Per Month
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                    <Clock className="mx-auto h-4 w-4 text-slate-400 mb-1" />
                    <p className="text-lg font-bold text-slate-900">
                      {rental.duration}{" "}
                      {rental.duration === 1 ? "Month" : "Months"}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Duration
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Move-in Date
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {rental.moveInDate
                      ? formatDate(rental.moveInDate)
                      : "Not specified"}
                  </span>
                </div>

                {/* Tenant */}
                <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Tenant Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{rental.tenant?.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {rental.tenant?.email}
                    </div>
                    {rental.tenant?.phone && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        {rental.tenant?.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                {rental.message && (
                  <div className="rounded-xl border border-slate-100 p-4 w-full">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> Tenant Message
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed italic break-words whitespace-pre-wrap">
                      &ldquo;{rental.message}&rdquo;
                    </p>
                  </div>
                )}

                {/* Payment */}
                {rental.payment && (
                  <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> Payment
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Amount</span>
                      <span className="text-sm font-bold text-slate-900">
                        {formatCurrency(rental.payment.amount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Status</span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                          rental.payment.status === "COMPLETED"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-amber-50 border-amber-200 text-amber-700"
                        }`}
                      >
                        {rental.payment.status}
                      </span>
                    </div>

                    {rental.payment.paidAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Paid on</span>
                        <span className="text-sm text-slate-700">
                          {formatDate(rental.payment.paidAt)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Request */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
                  <span>Created: {formatDate(rental.createdAt)}</span>
                  <span>Updated: {formatDate(rental.updatedAt)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4">
                {rental.status === "PENDING" ? (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleStatusUpdate("REJECTED")}
                      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full border border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-all disabled:opacity-50"
                    >
                      <XIcon className="h-4 w-4" />
                      Reject
                    </button>
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleStatusUpdate("APPROVED")}
                      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 transition-all disabled:opacity-50"
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Approve
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-11 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Close
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default RentalDetailsModal;
