import { Footer } from "@/components/shared/layout/Footer";
import { Navbar } from "@/components/shared/layout/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;