"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import PropertyModal from "./PropertyModal";
import { ICategorySelect } from "@/types";

interface CreatePropertyButtonProps {
  categories: ICategorySelect[];
}

const CreatePropertyButton = ({ categories }: CreatePropertyButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15">
          <Plus className="h-3.5 w-3.5" />
        </span>
        Add Property
      </button>

      <PropertyModal
        open={open}
        onClose={() => setOpen(false)}
        mode="create"
        categories={categories}
      />
    </>
  );
}
export default CreatePropertyButton;
