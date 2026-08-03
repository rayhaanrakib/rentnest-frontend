import { Suspense } from "react";
import RegisterForm from "@auth/_components/RegisterForm";
import RegisterFormSkeleton from "@auth/_components/RegisterFormSkeleton";

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFormSkeleton />}>
      <RegisterForm />
    </Suspense>
  );
}