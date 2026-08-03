import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// ============ Auth Types ============
export type IUserRole = "TENANT" | "LANDLORD" | "ADMIN";
export type IUserStatus = "ACTIVE" | "INACTIVE";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: IUserRole;
  status: IUserStatus;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    properties: number;
    rentals: number;
    reviews: number;
  };
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============ Category Types ============
export interface ICategory {
  id: string;
  name: string;
  description?: string;
  _count?: {
    properties: number;
  };
}
export interface ICategorySelect {
  id: string;
  name: string;
}

// ============ Property Types ============
export type IPropertyStatus = "AVAILABLE" | "UNAVAILABLE" | "RENTED";
export type ITogglePropertyStatus = "AVAILABLE" | "UNAVAILABLE";

export interface IProperty {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  status: IPropertyStatus;
  categoryId: string;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
  landlord?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  category?: ICategory;
  _count?: {
    reviews: number;
    rentals: number;
  };
}

export interface IPropertyAll {
  id: string;
  title: string;
  city: string;
  category: {
    id: string;
  };
}

export interface IPropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  bedrooms?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedProperties {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  properties: IProperty[];
}

export interface IPropertyCreateFormData {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  categoryId: string;
  amenities: string[];
  images: string[];
}

export interface IPropertyFormData {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  categoryId: string;
  status: IPropertyStatus;
}

// ============ Rental Types ============
export type IRentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export type IUpdateRentalStatus = "APPROVED" | "REJECTED";

export interface IRentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: IRentalStatus;
  moveInDate: string;
  duration: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
  property?: IProperty;
  tenant?: IUser;
  payment?: IPayment;
}

export interface IPostRentalRequest {
  propertyId: string;
  moveInDate: Date | string;
  duration: number;
  message?: string;
}

export interface ILandlordRequestsResponse {
  totals: {
    pending: number;
    approved: number;
    rejected: number;
  };
  requests: IRentalRequest[];
}

// ============ Payment Types ============
export type IPaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type IPaymentProvider = "STRIPE" | "SSLCOMMERZ";

export interface IPayment {
  id: string;
  rentalRequestId: string;
  amount: number;
  currency: string;
  status: IPaymentStatus;
  provider: IPaymentProvider;
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
  rentalRequest?: IRentalRequest;
}

export interface ICheckoutResponse {
  payment: IPayment;
  checkoutUrl: string;
  sessionId: string;
}

// ============ Review Types ============
export interface IReview {
  id: string;
  propertyId: string;
  tenantId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  tenant?: IUser;
  property?: IProperty;
}

// ============ Admin Types ============
export interface IAdminStats {
  totalUsers: number;
  totalTenants: number;
  totalLandlords: number;
  totalProperties: number;
  totalRentals: number;
  totalRevenue: number;
  pendingRequests: number;
}

// ============ API Response Types ============
export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface IApiError {
  success: false;
  statusCode: number;
  message: string;
  errorDetails?: string;
}

// ============ Form Types ============
export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "TENANT" | "LANDLORD";
  phone?: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IRentalRequestFormData {
  propertyId: string;
  moveInDate: string;
  duration: number;
  message?: string;
}

export interface IReviewFormData {
  propertyId: string;
  rating: number;
  comment: string;
}

export type IDashboardNavItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  exact?: boolean;
};