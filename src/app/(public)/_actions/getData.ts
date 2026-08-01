export const getCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["categories"],
    },
  });
  const result = await res.json();
  return result.data;
};

export const getAllProperties = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/properties/all`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["all-properties"],
      },
    }
  );
  const result = await res.json();
  return result.data;
};
export const getProperties = async (
  query: Record<string, string | string[] | undefined>
) => {
  const params = new URLSearchParams();

  if (query.page) {
    params.set("page", String(query.page));
  } else {
    params.set("page", "1");
  }

  if (query.limit) {
    params.set("limit", String(query.limit));
  } else {
    params.set("limit", "9");
  }

  if (query.search) {
    params.set("search", String(query.search));
  }

  if (query.category) {
    params.set("category", String(query.category));
  }

  if (query.status) {
    params.set("status", String(query.status));
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["properties"],
      },
    }
  );

  const result = await res.json();
  return result.data;
};

export const getPropertyDetail = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/properties/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["property-detail"],
    },
  });
  const result = await res.json();
  return result.data;
};
