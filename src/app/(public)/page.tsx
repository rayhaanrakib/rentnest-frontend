import { Suspense } from "react";
import HeroSkeleton from "@public/_components/_home/HeroSkeleton";
import HomepageHeroSection from "@public/_components/_home/HeroSection";
import HomepageCategoriesSection from "@public/_components/_home/CategoriesSection";
import HomepageFeaturedPropertiesSection from "@public/_components/_home/FeaturedPropertiesSection";
import HomepagePopularLocationsSection from "@public/_components/_home/PopularLocationsSection";
import HomepageWhyChooseUsSection from "@public/_components/_home/WhyChooseUsSection";
import HomepageBecomeLandlordSection from "@public/_components/_home/BecomeLandlordSection";
import HomepageReviewsSection from "@public/_components/_home/ReviewsSection";
import HomepageCTASection from "@public/_components/_home/CTASection";
// get data
import {
  getAllProperties,
  getCategories,
  getProperties,
} from "@public/_actions/getData";

const Home = async () => {
  // get data
  const categories = await getCategories();
  const properties = await getProperties({ page: "1" });
  const allProperties = await getAllProperties();

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HomepageHeroSection />
      </Suspense>
      <HomepageCategoriesSection categories={categories} />
      <HomepageFeaturedPropertiesSection
        properties={properties.properties.slice(0, 6)}
      />
      <HomepageWhyChooseUsSection />
      <HomepagePopularLocationsSection allProperties={allProperties} />
      <HomepageBecomeLandlordSection />
      <HomepageReviewsSection />
      <HomepageCTASection />
    </>
  );
}
export default Home;
