"use client";

import { deleteProperty } from "@dashboard/landlord/_actions/landlordActions";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PropertyModal from "./PropertyModal";
import ToggleStatusButton from "./ToggleStatusButton";
import { ICategorySelect, IProperty, IPropertyFormData, IPropertyStatus } from "@/types";

interface PropertyActionsProps {
  property: IProperty;
  categories: ICategorySelect[];
}

export default function PropertyActions({ property, categories }: PropertyActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const initialData: IPropertyFormData = {
    title: property.title,
    description: property.description,
    address: property.address,
    city: property.city,
    state: property.state,
    zipCode: property.zipCode,
    country: property.country,
    rentAmount: property.rentAmount,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    amenities: property.amenities,
    images: property.images,
    categoryId: property.category?.id || "",
    status: property.status as IPropertyStatus,
  };

  const handleDelete = async () => {
    const result = await deleteProperty(property.id);
    if (result?.success) {
      toast.success(result.message || "Property deleted successfully");
    } else {
      toast.error(result?.message || "Failed to delete property");
      throw new Error("Delete failed");
    }
  };

  const showToggle =
    property.status === "AVAILABLE" || property.status === "UNAVAILABLE";

  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* Status */}
        {showToggle && (
          <ToggleStatusButton
            propertyId={property.id}
            propertyTitle={property.title}
            currentStatus={property.status as "AVAILABLE" | "UNAVAILABLE"}
          />
        )}

        {/* Edit */}
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
          title="Edit property"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
          title="Delete property"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Edit */}
      <PropertyModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        mode="update"
        initialData={initialData}
        categories={categories}
        propertyId={property.id}
      />

      {/* Delete */}
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        propertyTitle={property.title}
      />
    </>
  );
}