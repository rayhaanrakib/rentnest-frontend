"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import UserDetailModal from "./UserDetailModal";

const UserRowActions = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
        title="View details"
      >
        <Eye className="h-3.5 w-3.5" />
      </button>

      <UserDetailModal
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
      />
    </>
  );
}
export default UserRowActions;
