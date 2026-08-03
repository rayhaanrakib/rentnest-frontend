import { Suspense } from "react";
import LoginForm from "@auth/_components/LoginForm";
import LoginFormSkeleton from "@auth/_components/LoginFormSkeleton";

const LoginPage = () => {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
export default LoginPage;