
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedServicesSection from "@/components/home/FeaturedServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </MainLayout>
  );
};

export default Index;
