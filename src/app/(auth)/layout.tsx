import { SiteIcon } from "@/components/icons/sharedIcon";
import { Home } from "lucide-react";
import Link from "next/link";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left side: Form */}
      <div className="flex flex-col">
        <div className="p-6 lg:p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 cursor-pointer"
          >
            <SiteIcon className="h-4 w-auto" />

          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          {children}
        </div>

        <div className="p-6 lg:p-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </div>
      </div>

      {/* Right side: Decorative / Welcome Panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-foreground items-center justify-center p-12">
        {/* Decorative Blurs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-700/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-lg text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-background/10 backdrop-blur-sm border border-background/20 mb-4 shadow-2xl">
            <Home className="h-10 w-10 text-background" />
          </div>
          <h2 className="text-4xl font-bold text-background tracking-tight">
            Welcome to RentNest
          </h2>
          <p className="text-background/70 leading-relaxed text-lg">
            Join thousands of tenants and landlords who trust RentNest for
            seamless, transparent, and secure rental experiences.
          </p>

          <div className="pt-8 flex items-center justify-center gap-8 text-background/50 text-sm font-medium">
            <span>Secure Login</span>
            <span className="w-1 h-1 rounded-full bg-background/30" />
            <span>Verified Listings</span>
            <span className="w-1 h-1 rounded-full bg-background/30" />
            <span>Trusted Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
