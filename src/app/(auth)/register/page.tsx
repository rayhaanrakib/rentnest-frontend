import { Suspense } from "react";
import RegisterForm from "@auth/_components/RegisterForm";
import RegisterFormSkeleton from "@auth/_components/RegisterFormSkeleton";

const RegisterPage=()=> {
  return (
    <Suspense fallback={<RegisterFormSkeleton />}>
      <RegisterForm />
    </Suspense>
  );
}
export default RegisterPage;