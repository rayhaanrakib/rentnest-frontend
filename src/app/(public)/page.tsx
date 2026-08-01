import HomepageCategoriesSection from "./_components/_home/CategoriesSection";
import HomepageFeaturedPropertiesSection from "./_components/_home/FeaturedPropertiesSection";
import HomepageHeroSection from "./_components/_home/HeroSection";
import HomepagePopularLocationsSection from "./_components/_home/PopularLocationsSection";
import HomepageWhyChooseUsSection from "./_components/_home/WhyChooseUsSection";
import HomepageBecomeLandlordSection from "./_components/_home/BecomeLandlordSection";
import HomepageReviewsSection from "./_components/_home/ReviewsSection";
import HomepageCTASection from "./_components/_home/CTASection";
// get data
import { getAllProperties, getCategories, getProperties } from "./_actions/getData";


export default async function Home() {
  // get data
  const categories = await getCategories();
  const properties = await getProperties({ page: '1' });
  const allProperties = await getAllProperties();

  return (
    <>
      <HomepageHeroSection />
      <HomepageCategoriesSection categories={categories} />
      <HomepageFeaturedPropertiesSection properties={properties.properties.slice(0,6)} />
      <HomepageWhyChooseUsSection />
      <HomepagePopularLocationsSection allProperties={allProperties} />
      <HomepageBecomeLandlordSection />
      <HomepageReviewsSection />
      <HomepageCTASection />
    </>
  );
}
