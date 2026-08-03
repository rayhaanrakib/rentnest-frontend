const RegisterFormSkeleton = () => {
  return (
    <div className="w-full max-w-md space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="mx-auto h-8 w-52 rounded-lg bg-slate-200" />
        <div className="mx-auto h-4 w-64 rounded bg-slate-100" />
      </div>

      {/* Role Toggle */}
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-1">
        <div className="h-11 rounded-lg bg-slate-200" />
        <div className="h-11 rounded-lg bg-slate-100" />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-11 rounded-lg bg-slate-100" />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 w-12 rounded bg-slate-200" />
            <div className="h-11 rounded-lg bg-slate-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-11 rounded-lg bg-slate-100" />
          </div>
        </div>

        {/* Avatar */}
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-11 rounded-lg bg-slate-100" />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-slate-200" />
          <div className="h-11 rounded-lg bg-slate-100" />
          <div className="h-3 w-28 rounded bg-slate-100" />
        </div>

        {/* Submit Button */}
        <div className="h-11 rounded-lg bg-slate-200" />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="border-t border-slate-200" />
        <div className="absolute inset-x-0 -top-2 flex justify-center">
          <div className="h-4 w-24 rounded bg-white px-2" />
        </div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-11 rounded-lg bg-slate-100" />
        <div className="h-11 rounded-lg bg-slate-100" />
      </div>

      {/* Footer Link */}
      <div className="flex justify-center">
        <div className="h-4 w-40 rounded bg-slate-100" />
      </div>
    </div>
  );
};

export default RegisterFormSkeleton;