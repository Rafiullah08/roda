
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useService, useServiceMutations } from "@/hooks/service-management";
import ServiceForm from "@/components/admin/service-management/ServiceForm";
import { FAQ } from "@/components/admin/service/components/FaqManager";
import { Service } from "@/types/service"; // Updated import

const EditServicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading } = useService(id || "");
  const { updateService, isUpdating } = useServiceMutations();

  const handleUpdateService = (data: any) => {
    if (!id) return;

    // Transform "none" value back to null for subcategory
    const subcategory = data.subcategory === "none" ? null : data.subcategory;

    // Convert price to number
    const serviceData = {
      ...data,
      price: parseFloat(data.price),
      subcategory: subcategory,
      service_location: data.service_location || 'online',
      is_free: data.is_free || false
    };

    // Correctly call the mutation function (not the mutation result)
    updateService({ id, data: serviceData });
  };

  // Process service data for the form
  const prepareServiceData = (service: any) => {
    if (!service) return null;

    // Process FAQs to ensure they have the correct format
    const processedFaqs: FAQ[] = service.faqs 
      ? service.faqs.filter((faq: any): faq is FAQ => 
          faq !== null && 
          typeof faq === 'object' && 
          'question' in faq && 
          'answer' in faq &&
          typeof faq.question === 'string' &&
          typeof faq.answer === 'string'
        )
      : [];

    return {
      title: service.title,
      description: service.description || "",
      price: service.price?.toString() || "0",
      status: service.status || "draft",
      features: Array.isArray(service.features) ? service.features : [],
      image_url: service.image_url,
      delivery_time: service.delivery_time || "3 days",
      category_id: service.category_id || service.category,
      subcategory: service.subcategory || null,
      service_type: service.service_type || "Project",
      faqs: processedFaqs,
      service_location: service.service_location || "online",
      is_free: service.is_free || false
    };
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Edit Service</h1>
          <p className="text-muted-foreground">
            Update service information.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 bg-card">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          ) : service ? (
            <ServiceForm
              initialData={service}
              onSubmit={handleUpdateService}
              isSubmitting={isUpdating}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Service not found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditServicePage;
