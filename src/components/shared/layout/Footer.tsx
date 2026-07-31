import Link from "next/link";
import { footerLinks, socialLinks } from "./Links";



export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-background/80 backdrop-blur-xl">
      {/* Subtle top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Brand & Newsletter Section */}
          <div className="col-span-6 md:col-span-4 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 w-fit cursor-pointer"
            >
              <span className="text-xl font-bold tracking-tight">
                <span className="gradient-text">Rent</span>Nest
              </span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              The trusted marketplace for tenants and landlords. Find your
              perfect home or the ideal tenant with ease.
            </p>
          </div>

          {/* Links Section */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-4 md:col-span-2 space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                {section.title}
              </h4>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand-600 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear} RentNest Inc. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Built with Next.js, Tailwind CSS, and Shadcn UI.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted hover:border-foreground/20 transition-all cursor-pointer"
              >
                <social.Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
