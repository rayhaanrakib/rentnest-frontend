"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleIcon, GithubIcon } from "@/components/icons/sharedIcon";
import { authLinks } from "@/components/shared/layout/Links";
import { toast } from "sonner";
import { loginAction } from "@auth/_actions/authActions";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    { success: false },
  );
  //   input data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.errorDetails) {
      toast.error(state.errorDetails);
    }
  }, [state]);

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to sign in to your account
        </p>
      </div>

      <form action={action} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="mail@example.com"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-11 pl-10 pr-4 rounded-lg bg-muted/50 border text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                state?.errors?.email ? "border-destructive" : "border-border"
              }`}
            />
          </div>
          {state?.errors?.email && (
            <p className="text-xs text-destructive mt-1">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="group relative inline-block cursor-not-allowed">
              <Link
                href="#"
                aria-disabled="true"
                className="text-xs font-medium text-brand-600 opacity-60 pointer-events-none"
              >
                Forgot your password?
              </Link>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                Coming soon
              </span>
            </div>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-11 pl-10 pr-10 rounded-lg bg-muted/50 border text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                state?.errors?.password ? "border-destructive" : "border-border"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {state?.errors?.password && (
            <p className="text-xs text-destructive mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full h-11 flex items-center justify-center rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In with Email"
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground tracking-widest">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Google", Icon: GoogleIcon },
          { label: "GitHub", Icon: GithubIcon },
        ].map(({ label, Icon }) => (
          <div key={label} className="group relative">
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 h-11 w-full rounded-lg border border-border bg-background text-sm font-medium opacity-60 cursor-not-allowed"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">
              Coming soon
            </span>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={authLinks[1].href}
          className="font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
