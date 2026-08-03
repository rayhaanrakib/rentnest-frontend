import PaymentButton from "../_components/_payments/PaymentButton";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const rentalRequestId = params.rentalRequestId as string;

  const shortId = rentalRequestId
    ? `${rentalRequestId.slice(0, 8)}...${rentalRequestId.slice(-4)}`
    : "";

  if (!rentalRequestId) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.04),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.06),_transparent_30%)]" />
        <div className="relative w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <CreditCard className="h-7 w-7 text-slate-700" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Invalid Payment Link
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            We couldn’t find a rental request attached to this payment page.
            Please return to your booking details and try again.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Missing parameter:{" "}
            <span className="font-medium text-slate-900">rentalRequestId</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="relative container mx-auto flex min-h-screen px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left side */}
          <div className="border-b border-slate-200/80 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure payment experience
            </div>

            <div className="mt-6 max-w-xl">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Complete your rental payment with confidence
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                You’re one step away from confirming your booking. We’ll
                redirect you to Stripe’s secure checkout so you can complete
                your payment safely and quickly.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Trusted security
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your checkout is protected by industry-standard payment
                  security.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <Lock className="mb-3 h-5 w-5 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Encrypted flow
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Sensitive payment details are handled securely through Stripe.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <CheckCircle2 className="mb-3 h-5 w-5 text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Instant confirmation
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Once payment succeeds, your rental process can move forward
                  immediately.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    What happens next
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900">
                    A quick, seamless final step
                  </h2>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-slate-400" />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Complete your payment
                    </p>
                    <p className="text-sm text-slate-500">
                      Click the payment button to move to the secure checkout.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Pay securely on Stripe
                    </p>
                    <p className="text-sm text-slate-500">
                      Complete your transaction using Stripe’s hosted payment
                      page.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Return with confirmation
                    </p>
                    <p className="text-sm text-slate-500">
                      After successful payment, your booking flow can continue
                      smoothly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center p-6 sm:p-8 lg:p-10">
            <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                <CreditCard className="h-8 w-8 text-brand-600" />
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Secure Checkout
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You’ll be redirected to Stripe to finalize your rental
                  payment.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Rental request</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                    {shortId}
                  </span>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <p className="text-xs leading-5 text-slate-500">
                      Payments are processed securely. You may be asked to
                      confirm your payment method depending on your bank or card
                      provider.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <PaymentButton rentalRequestId={rentalRequestId} />
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By continuing, you’ll leave this page and be redirected to
                Stripe’s secure checkout environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;