
import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/service-management";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/utils/service";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesSection = () => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  
  // Fetch services to calculate accurate counts
  const { data: services = [], isLoading: isServicesLoading } = useQuery({
    queryKey: ["services-for-categories"],
    queryFn: getServices,
  });
  
  const isLoading = isCategoriesLoading || isServicesLoading;
  
  // Calculate service counts per category
  const categoriesWithCounts = categories.map(category => {
    const serviceCount = services.filter(service => 
      service.category === category.name && service.status === 'active'
    ).length;
    
    return {
      ...category,
      serviceCount
    };
  });
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Browse Service Categories</h2>
          <p className="text-gray-600">Find the perfect service for your business needs</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        ) : categoriesWithCounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithCounts.map((category) => (
              <Link 
                to={`/services?category=${encodeURIComponent(category.name)}`} 
                key={category.id}
                className="bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md hover:-translate-y-1"
              >
                <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm">
                  {category.serviceCount} {category.serviceCount === 1 ? 'service' : 'services'}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
