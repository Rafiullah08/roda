import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Service } from "@/types/service";
import { ServiceCard } from "@/components/services/ServiceCard";
import { useHomeFeaturedServices } from "@/hooks/useHomeFeaturedServices";
import { useCategories } from "@/hooks/service-management";

// Keep only for fallback
const sampleFeaturedServices = [
  {
    id: "1",
    title: "Professional Logo Design",
    category: "Graphic Design",
    price: 99,
    delivery_time: "3 days",
    rating: 4.8,
    reviews_count: 124,
    status: "active" as const,
    features: [],
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=350",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
    created_by: null,
    description: null,
    faqs: null,
    service_type: null
  },
  {
    id: "2",
    title: "E-commerce Website Development",
    category: "Web Development",
    price: 499,
    delivery_time: "7 days",
    rating: 4.5,
    reviews_count: 89,
    status: "active" as const,
    features: [],
    image_url: "https://images.unsplash.com/photo-1518770660439-464ef5093ffc?auto=format&fit=crop&w=600&h=350",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
    created_by: null,
    description: null,
    faqs: null,
    service_type: null
  },
  {
    id: "3",
    title: "Social Media Marketing Campaign",
    category: "Digital Marketing",
    price: 199,
    delivery_time: "5 days",
    rating: 4.2,
    reviews_count: 67,
    status: "active" as const,
    features: [],
    image_url: "https://images.unsplash.com/photo-1505373100919-787e03cc2145?auto=format&fit=crop&w=600&h=350",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
    created_by: null,
    description: null,
    faqs: null,
    service_type: null
  },
  {
    id: "4",
    title: "Professional Content Writing",
    category: "Content Writing",
    price: 79,
    delivery_time: "2 days",
    rating: 4.9,
    reviews_count: 156,
    status: "active" as const,
    features: [],
    image_url: "https://images.unsplash.com/photo-1497034825429-c343dd07e586?auto=format&fit=crop&w=600&h=350",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
    created_by: null,
    description: null,
    faqs: null,
    service_type: null
  }
];

// Helper functions for rendering featured services
const renderFeaturedServicesSkeleton = () => {
  return Array(4).fill(0).map((_, index) => (
    <div key={index} className="flex flex-col space-y-3">
      <Skeleton className="h-60 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  ));
};

const renderFeaturedServices = (services: Service[]) => {
  if (!services || services.length === 0) {
    console.log("No featured services available");
    return null;
  }
  
  // Debug log to see what services we're working with
  console.log("Rendering featured services:", services);
  
  return services.map((service) => (
    <ServiceCard key={service.id} service={service} />
  ));
};

const FeaturedServicesSection = () => {
  const { data: featuredServices, isLoading: isFeaturedServicesLoading, error: featuredError } = useHomeFeaturedServices();
  const { categories } = useCategories();

  // Debug logging for featured services data
  console.log("Featured services data:", featuredServices);
  console.log("Featured services loading:", isFeaturedServicesLoading);
  console.log("Featured services error:", featuredError);

  // Get first 3 categories for tabs
  const tabCategories = categories.slice(0, 3);

  // Filter services by category
  const filterServicesByCategory = (categoryName: string) => {
    if (!featuredServices) return [];
    return featuredServices.filter(service => service.category === categoryName);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Services</h2>
          <p className="text-gray-600">Our most popular and top-rated services</p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Services</TabsTrigger>
              {tabCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.name.toLowerCase().replace(/\s+/g, '-')}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isFeaturedServicesLoading 
                ? renderFeaturedServicesSkeleton() 
                : featuredServices && featuredServices.length > 0 
                  ? renderFeaturedServices(featuredServices)
                  : renderFeaturedServices(sampleFeaturedServices as Service[])
              }
            </div>
          </TabsContent>
          
          {/* Dynamic category tabs */}
          {tabCategories.map((category) => (
            <TabsContent key={category.id} value={category.name.toLowerCase().replace(/\s+/g, '-')}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isFeaturedServicesLoading ? (
                  renderFeaturedServicesSkeleton()
                ) : (
                  (() => {
                    const categoryServices = filterServicesByCategory(category.name);
                    return categoryServices.length > 0 
                      ? renderFeaturedServices(categoryServices)
                      : (
                        <p className="col-span-full text-center text-gray-500">
                          No featured services available in {category.name}
                        </p>
                      );
                  })()
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <Link to="/services">
            <Button variant="outline" className="mt-8 px-8">
              View All Services <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
