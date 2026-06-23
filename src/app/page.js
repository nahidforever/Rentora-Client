import Banner from "@/components/Banner";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-properties`,
  );

  const properties = await res.json();

  return (
    <>
      <Banner></Banner>

      <FeaturedPropertiesSection properties={properties} />

      <WhyChooseUsSection></WhyChooseUsSection>
    </>
  );
}
