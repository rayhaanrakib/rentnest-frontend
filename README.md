<div align="center">
<br />

# RentNest Frontend

<p>A production-oriented Next.js frontend for a full-featured rental marketplace platform.</p>
<p>Built with server-first architecture, role-based access control, and a seamless Stripe payment flow.</p>

<br />

<p>
  <img src="https://img.shields.io/badge/Next.js-16.x-111111?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-111111?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-111111?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-111111?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn/ui-Components-111111?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-Payments-111111?style=for-the-badge&logo=stripe&logoColor=white" />
</p>

<br />

</div>

---

## Project Summary

| | |
|---|---|
| **Project** | RentNest Frontend |
| **Type** | Full-Stack Next.js App — Rental Marketplace |
| **Roles** | Tenant, Landlord, Admin |
| **Language** | TypeScript (Strict Mode) |
| **Framework** | Next.js 16 with App Router |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **State / Forms** | React Hook Form + Zod |
| **Payments** | Stripe Checkout (via backend redirect) |
| **Backend** | [RentNest Backend API](https://rayhaanrakib-rentnest-backend.vercel.app) |
| **API Docs** | [View on Postman](https://documenter.getpostman.com/view/55143757/2sBY4LQM5J) |

---

## Overview

RentNest Frontend is the client-facing application for the RentNest rental marketplace. It pairs with the RentNest Backend to deliver a complete rental workflow — from property discovery and rental requests through Stripe-powered checkout.

The application is architected around Next.js Server Components and Server Actions, keeping sensitive operations (authentication, payment initiation, data mutations) server-side. A custom middleware layer handles JWT verification, automatic token refresh, and role-based routing — all without any client-side token exposure.

---

## Product Scope

### Public (Unauthenticated)

- Browse and search the property listing with filters (category, city, status, pagination)
- View detailed property pages with images, amenities, landlord info, and reviews
- Browse property categories
- Register as a Tenant or Landlord
- Secure login with role-aware redirect

### Tenant

- Submit rental requests with move-in date, duration, and message
- View all personal rental requests and their status (Pending / Approved / Rejected / Active / Completed)
- Initiate Stripe Checkout for approved rental requests
- View payment confirmation and history

### Landlord

- Create, update, and delete property listings
- Toggle property availability (Available / Unavailable)
- Review incoming rental requests with full tenant and property context
- Approve or reject rental requests
- Monitor all listings from a dedicated dashboard

### Admin

- View platform-wide statistics (users, properties, rentals, revenue, pending requests)
- Manage all user accounts with filtering by role and status
- Toggle user account status (Active / Inactive)
- Create and delete property categories

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Base UI, Lucide React, HugeIcons |
| Forms & Validation | React Hook Form, Zod |
| Animations | Framer Motion |
| Data Fetching | Next.js Server Actions + fetch with cache tags |
| Auth | JWT via httpOnly cookies, automatic refresh |
| Payments | Stripe Checkout (server-initiated redirect) |
| Date Handling | date-fns |
| Notifications | Sonner |
| Package Manager | Bun |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/                  # Login and Register pages
│   │   ├── _actions/            # Server Actions: login, register, logout
│   │   └── _components/         # LoginForm, RegisterForm (with skeletons)
│   ├── (dashboard)/             # Protected role dashboards
│   │   ├── admin/               # Admin: stats, users, categories
│   │   ├── landlord/            # Landlord: properties, rental requests
│   │   └── tenant/              # Tenant: rentals, payment flow
│   └── (public)/                # Public-facing pages
│       ├── properties/          # Listing + detail pages
│       ├── categories/          # Category browser
│       ├── payment/             # Checkout, success, cancel
│       ├── _actions/            # getData (properties, categories), paymentActions
│       └── page.tsx             # Homepage
├── components/
│   ├── shared/layout/           # Navbar, Footer, DashboardNavbar, Links
│   └── ui/                      # shadcn/ui component library
├── lib/
│   └── validations/             # Zod schemas: auth, rental request
├── service/
│   └── refreshToken.ts          # Token refresh logic
├── types/
│   └── index.ts                 # Shared TypeScript interfaces and enums
├── utils/
│   └── jwt.ts                   # JWT decode/verify helpers
└── proxy.ts                     # Middleware: auth guard + role-based routing
```

---

## Key Architecture Decisions

**Server Actions over API routes** — All data mutations run as Next.js Server Actions, keeping auth headers and tokens entirely server-side.

**Middleware-based auth + RBAC** — A single `proxy.ts` middleware handles JWT validation, silent token refresh, auth-route guards, and role-based access control (Tenant / Landlord / Admin routes are strictly isolated).

**Next.js cache with revalidation tags** — Read-heavy data (properties, categories, admin stats) uses `force-cache` with named tags. Mutations call `revalidateTag` to invalidate only the affected data, giving fine-grained cache control without full page reloads.

**httpOnly cookie tokens** — Access and refresh tokens are stored exclusively in httpOnly cookies — never in localStorage or client state — reducing XSS exposure.

---

## Local Setup

### Prerequisites

- Node.js 20+ or [Bun](https://bun.sh)
- A running instance of the [RentNest Backend](https://github.com/rayhaanrakib/RentNest-Backend-Project)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/rayhaanrakib/rentnest-frontend.git
cd rentnest-frontend
```

**2. Install dependencies**

```bash
bun install
# or
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory:

```env
BACKEND_API_URL=http://localhost:5000

JWT_ACCESS_TOKEN=your_jwt_access_secret
JWT_REFRESH_TOKEN=your_jwt_refresh_secret
```

> The JWT secrets must match the values used in the backend so the middleware can verify tokens locally.

**4. Start the development server**

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**5. Build for production**

```bash
bun run build
bun run start
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `BACKEND_API_URL` | Base URL of the RentNest backend API |
| `JWT_ACCESS_TOKEN` | Secret used to verify access tokens in middleware |
| `JWT_REFRESH_TOKEN` | Secret used to verify refresh tokens in middleware |

---

## Related Repository

- **Backend:** [RentNest Backend](https://github.com/rayhaanrakib/RentNest-Backend-Project) — Node.js / Express / Prisma / PostgreSQL / Stripe

---

## License

Licensed under the ISC License. See `LICENSE` for details.
