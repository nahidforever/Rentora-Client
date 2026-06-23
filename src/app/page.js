import Banner from "@/components/Banner";
import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import RecentlyAddedPropertiesSection from "@/components/RecentlyAddedPropertiesSection";
import TopLocationsSection from "@/components/TopLocationsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-properties`,
  );

  const reviewRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home-reviews`,
  );

  const recentRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/recent-properties`,
  );

  const properties = await res.json();
  const reviews = await reviewRes.json();
  const recentProperties = await recentRes.json();

  return (
    <>
      <Banner></Banner>

      <FeaturedPropertiesSection properties={properties} />

      <WhyChooseUsSection></WhyChooseUsSection>

      <CustomerReviewsSection reviews={reviews} />

      <TopLocationsSection></TopLocationsSection>

      <RecentlyAddedPropertiesSection properties={recentProperties} />
    </>
  );
}
