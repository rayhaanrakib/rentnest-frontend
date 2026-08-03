"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory } from "@dashboard/admin/_actions/adminActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const DeleteCategoryButton = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteCategory(categoryId);

    if (result?.success) {
      toast.success(result.message || "Category deleted");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result?.message || "Failed to delete category");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
        title="Delete category"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      <DialogContent className="max-w-sm rounded-[2rem] border-slate-200/80 p-6">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="mt-4 text-center text-lg font-bold text-slate-900">
              Delete Category
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                &ldquo;{categoryName}&rdquo;
              </span>
              ? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-6 flex gap-3 sm:justify-normal">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="flex-1 rounded-full border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            No, Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Yes, Delete
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteCategoryButton;