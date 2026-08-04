"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { ICreateCategory, IUserStatus } from "@/types";
import { revalidateTag } from "next/cache";

const getAuthHeaders = async (json = false) => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) return null;

  return {
    Authorization: `Bearer ${accessToken}`,
    ...(json && {
      "Content-Type": "application/json",
    }),
  };
};

// get dashboard stats
export const getAdminDashboardStats = async () => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return {};
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/admin/stats`, {
    headers,
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["admin-dashboard-stats"],
    },
  });
  const result = await res.json();
  return result.data;
};

// get all users
export const getAdminUsersData = async () => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return null;
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/admin/users/all`, {
    headers,
    cache: "no-cache",
    next: {
      tags: ["admin-users-data"],
    },
  });
  const result = await res.json();
  return result.data;
};

// get users filtered
export const getAdminUsersByFilter = async (role?: string, status?: string) => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return null;
  }

  const params = new URLSearchParams();
  if (role) params.set("role", role);
  if (status) params.set("status", status);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/admin/users?${params.toString()}`,
    {
      headers,
      cache: "no-cache",
      next: {
        tags: ["admin-users-data"],
      },
    }
  );
  const result = await res.json();
  return result.data;
};

// get single user detail
export const getAdminUserDetail = async (userId: string) => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return null;
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/admin/users/${userId}`,
    {
      headers,
      cache: "no-cache",
    }
  );
  const result = await res.json();
  return result.data;
};

// toggle user status (active/inactive)
export const updateUserStatus = async (
  userId: string,
  status: IUserStatus
) => {
  const headers = await getAuthHeaders(true);
  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/admin/users/${userId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    }
  );
  const result = await res.json();

  if (result.success) {
    revalidateTag("admin-categories-data", {
      expire: 0
    });
  }
  return result;
};

// create category
export const createCategory = async (category: ICreateCategory) => {
  const headers = await getAuthHeaders(true);
  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    method: "POST",
    headers,
    body: JSON.stringify(category),
  });
  const result = await res.json();

  if (result.success) {
    revalidateTag("admin-categories-data", {
      expire: 0
    });
  }
  return result;
};

// get all categories
export const getCategoriesData = async () => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return [];
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    headers,
    cache: "no-cache",
    next: {
      tags: ["admin-categories-data"],
    },
  });
  const result = await res.json();
  return result.data;
};

// delete category
export const deleteCategory = async (categoryId: string) => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/categories/${categoryId}`,
    {
      method: "DELETE",
      headers,
    }
  );
  const result = await res.json();

  if (result.success) {
    revalidateTag("admin-categories-data", {
      expire: 0
    });
  }
  return result;
};