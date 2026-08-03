"use server";

import {
  rentalRequestSchema,
  RentalRequestState,
} from "@/lib/validations/request";
import { cookies } from "next/headers";

export const getTenantRentals = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(`${process.env.BACKEND_API_URL}/rentals`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-cache",
  });
  const result = await res.json();
  return result.data;
};

export const getTenantRentalsById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(`${process.env.BACKEND_API_URL}/rentals/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["tenant-rentals"],
    },
  });
  const result = await res.json();
  return result.data;
};

export const postTenantRentalRequest = async (
  prevState: RentalRequestState,
  formData: FormData,
): Promise<RentalRequestState> => {
  const rawFormData = {
    propertyId: formData.get("propertyId") as string,
    moveInDate: formData.get("moveInDate") as string,
    duration: formData.get("duration") as string,
    message: formData.get("message") as string,
  };

  const parsed = rentalRequestSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      errorDetails: "Please fix the highlighted errors.",
    };
  }

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        errorDetails: "Authentication required. Please log in.",
      };
    }
    console.log(parsed.data);
    const res = await fetch(`${process.env.BACKEND_API_URL}/rentals`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(parsed.data),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        errorMessage: result.message || "Failed to submit rental request.",
        errorDetails: result.errorDetails,
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      errorDetails: "Something went wrong. Please try again.",
    };
  }
};

export const getPayments = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(`${process.env.BACKEND_API_URL}/payments`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-cache",
  });
  const result = await res.json();
  return result.data;
};
