"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Home,
  Building,
  Image as ImageIcon,
} from "lucide-react";
import { GoogleIcon, GithubIcon } from "@/components/icons/sharedIcon";
import { authLinks } from "@/components/shared/layout/Links";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, {
    success: false,
  });
  // input data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"TENANT" | "LANDLORD">("TENANT");

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.errorDetails) {
      toast.error(state.errorDetails);
    }
  }, [state]);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to join RentNest
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-1 bg-muted/50 rounded-xl border border-border">
        <button
          type="button"
          onClick={() => setRole("TENANT")}
          className={`flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            role === "TENANT"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-4 w-4" />
          I&apos;m a Tenant
        </button>
        <button
          type="button"
          onClick={() => setRole("LANDLORD")}
          className={`flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            role === "LANDLORD"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building className="h-4 w-4" />
          I&apos;m a Landlord
        </button>
      </div>

      <form action={action} className="space-y-4">
        <input type="hidden" name="role" value={role} />

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Tenant"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full h-11 pl-10 pr-4 rounded-lg bg-muted/50 border text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                state?.errors?.name ? "border-destructive" : "border-border"
              }`}
            />
          </div>
          {state?.errors?.name && (
            <p className="text-xs text-destructive mt-1">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <label
              htmlFor="phone"
              className="text-sm font-medium text-foreground"
            >
              Phone{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+8801711111111"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full h-11 pl-10 pr-4 rounded-lg bg-muted/50 border text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                  state?.errors?.phone ? "border-destructive" : "border-border"
                }`}
              />
            </div>
            {state?.errors?.phone && (
              <p className="text-xs text-destructive mt-1">
                {state.errors.phone[0]}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="avatar"
            className="text-sm font-medium text-foreground"
          >
            Avatar URL{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="avatar"
              name="avatar"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className={`w-full h-11 pl-10 pr-4 rounded-lg bg-muted/50 border text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                state?.errors?.avatar ? "border-destructive" : "border-border"
              }`}
            />
          </div>
          {state?.errors?.avatar && (
            <p className="text-xs text-destructive mt-1">
              {state.errors.avatar[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
          {state?.errors?.password ? (
            <p className="text-xs text-destructive mt-1">
              {state.errors.password[0]}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Must be 6+ characters.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full h-11 flex items-center justify-center rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground tracking-widest">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 h-11 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-sm font-medium cursor-pointer"
        >
          <GoogleIcon className="h-4 w-4" /> Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 h-11 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-sm font-medium cursor-pointer"
        >
          <GithubIcon className="h-4 w-4" /> GitHub
        </button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={authLinks[0].href}
          className="font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
