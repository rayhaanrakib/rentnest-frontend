# API Integration Map

Maps frontend Server Actions and pages to backend API endpoints.

**Base URL:** `BACKEND_API_URL` env variable
**Local:** `http://localhost:5000` · **Live:** `https://rayhaanrakib-rentnest-backend.vercel.app`

---

## 1. Authentication

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `src/proxy.ts` | — | *(local JWT verify)* | Verifies `accessToken` + `refreshToken` cookies locally. No network call. |
| `src/proxy.ts` | `POST` | `/auth/refresh` | Called when access token expired but refresh token valid. |
| `src/service/refreshToken.ts` | `POST` | `/auth/refresh` | Used by all dashboard Server Actions via `isAccessTokenExist()`. |
| `authActions.ts` → `loginAction` | `POST` | `/auth/login` | Sets `accessToken` (24 h) + `refreshToken` (7 d) httpOnly cookies. |
| `authActions.ts` → `registerAction` | `POST` | `/auth/register` | Registers as `TENANT` or `LANDLORD`. Sets auth cookies. |
| `authActions.ts` → `getCurrentUser` | `GET` | `/user/me` | Called by all dashboard home pages and Navbar. |
| `authActions.ts` → `logoutAction` | — | *(no network call)* | Deletes auth cookies. |

---

## 2. Public Pages

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `getData.ts` → `getCategories()` | `GET` | `/categories` | Homepage, `/categories` page, property filter UI. |
| `getData.ts` → `getProperties()` | `GET` | `/properties?page=&limit=&search=&category=&status=` | Homepage featured grid + `/properties` listing. |
| `getData.ts` → `getAllProperties()` | `GET` | `/properties/all` | Homepage popular locations section. |
| `getData.ts` → `getPropertyDetail()` | `GET` | `/properties/:id` | `/properties/[id]` detail page. |
| `paymentActions.ts` → `makePayment` | `POST` | `/payments/checkout` | Sends `rentalRequestId`. Redirects to Stripe checkout URL. |

---

## 3. Tenant Dashboard

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `tenantActions.ts` → `getTenantRentals()` | `GET` | `/rentals` | `/tenant/dashboard/requests` page. |
| `tenantActions.ts` → `getTenantRentalsById()` | `GET` | `/rentals/:id` | Individual rental detail. |
| `tenantActions.ts` → `postTenantRentalRequest` | `POST` | `/rentals` | Rental request modal on property detail page. |

---

## 4. Landlord Dashboard

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `landlordActions.ts` → `getLandlordProperties()` | `GET` | `/properties/my-property` | Properties list + dashboard stats. |
| `landlordActions.ts` → `createProperty` | `POST` | `/properties/landlord/create` | Create property form. Revalidates `landlord-properties`. |
| `landlordActions.ts` → `updateProperty()` | `PUT` | `/properties/landlord/:id` | Edit property form. Revalidates `landlord-properties`. |
| `landlordActions.ts` → `deleteProperty()` | `DELETE` | `/properties/landlord/:id` | Delete confirmation modal. Revalidates `landlord-properties`. |
| `landlordActions.ts` → `togglePropertyStatus()` | `PATCH` | `/properties/:id/status` | Status toggle (AVAILABLE / UNAVAILABLE). Revalidates `landlord-properties`. |
| `landlordActions.ts` → `getLandlordRentals()` | `GET` | `/rentals/landlord/requests/all` | Rental requests list. |
| `landlordActions.ts` → `getLandlordRentalDetail()` | `GET` | `/rentals/landlord/requests/:id` | Rental request detail view. |
| `landlordActions.ts` → `updateRentalStatus()` | `PATCH` | `/rentals/landlord/requests/:id` | Approve or reject a rental request. Revalidates `landlord-rentals`. |

---

## 5. Admin Dashboard

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `adminActions.ts` → `getAdminDashboardStats()` | `GET` | `/admin/stats` | Platform stats page. |
| `adminActions.ts` → `getAdminUsersData()` | `GET` | `/admin/users/all` | All users (for stats totals). |
| `adminActions.ts` → `getAdminUsersByFilter()` | `GET` | `/admin/users?role=&status=` | Filtered user list. |
| `adminActions.ts` → `getAdminUserDetail()` | `GET` | `/admin/users/:id` | User detail modal. |
| `adminActions.ts` → `updateUserStatus()` | `PATCH` | `/admin/users/:id` | Toggle user ACTIVE / INACTIVE. |
| `adminActions.ts` → `getCategoriesData()` | `GET` | `/categories` | Admin categories page. |
| `adminActions.ts` → `createCategory()` | `POST` | `/categories` | Create category modal. Revalidates `admin-categories-data`. |
| `adminActions.ts` → `deleteCategory()` | `DELETE` | `/categories/:id` | Delete category button. Revalidates `admin-categories-data`. |

---

## 6. All Backend Endpoints

| Method | Endpoint | Auth | Used |
|---|---|---|---|
| `POST` | `/auth/register` | None | ✓ |
| `POST` | `/auth/login` | None | ✓ |
| `POST` | `/auth/refresh` | Cookie | ✓ |
| `GET` | `/user/me` | Bearer | ✓ |
| `GET` | `/categories` | None / Bearer | ✓ |
| `POST` | `/categories` | Admin | ✓ |
| `DELETE` | `/categories/:id` | Admin | ✓ |l
| `GET` | `/properties` | None | ✓ |
| `GET` | `/properties/all` | None | ✓ |
| `GET` | `/properties/:id` | None | ✓ |
| `GET` | `/properties/my-property` | Landlord | ✓ |
| `POST` | `/properties/landlord/create` | Landlord | ✓ |
| `PUT` | `/properties/landlord/:id` | Landlord | ✓ |
| `DELETE` | `/properties/landlord/:id` | Landlord | ✓ |
| `PATCH` | `/properties/:id/status` | Landlord | ✓ |
| `POST` | `/rentals` | Tenant | ✓ |
| `GET` | `/rentals` | Tenant | ✓ |
| `GET` | `/rentals/:id` | Tenant/Landlord/Admin | ✓ |
| `GET` | `/rentals/landlord/requests/all` | Landlord | ✓ |
| `GET` | `/rentals/landlord/requests/:id` | Landlord | ✓ |
| `PATCH` | `/rentals/landlord/requests/:id` | Landlord | ✓ |
| `POST` | `/payments/checkout` | Tenant | ✓ |
| `GET` | `/payments` | Tenant | ✓ |
| `POST` | `/reviews` | Tenant | ✓ |
| `GET` | `/admin/stats` | Admin | ✓ |
| `GET` | `/admin/users/all` | Admin | ✓ |
| `GET` | `/admin/users` | Admin | ✓ |
| `GET` | `/admin/users/:id` | Admin | ✓ |
| `PATCH` | `/admin/users/:id` | Admin | ✓ |
