import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const PaymentSuccessPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_30%)]" />
      <div className="absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-100/50 blur-3xl" />

      <div className="relative w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 className="h-8 w-8 text-brand-600" />
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            Payment confirmed
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Payment successful
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your payment has been completed successfully. You can now return to
            your dashboard to review your rental details and next steps.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          A confirmation has been recorded for your payment.
        </div>

        <Link
          href="/tenant/dashboard"
          className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Go to Dashboard
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;