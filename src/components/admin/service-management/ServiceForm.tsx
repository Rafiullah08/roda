import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Add this import
import {
  useCategories, 
  useSubcategories, 
  useCategoryMutations
} from "@/hooks/service-management";
import { Service } from "@/types/service-management";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureManager from "@/components/admin/service/components/FeatureManager";
import FaqManager, { FAQ } from "@/components/admin/service/components/FaqManager";
import { 
  countWords, 
  TITLE_MIN_WORDS, 
  TITLE_MAX_WORDS, 
  DESCRIPTION_MIN_WORDS, 
  DESCRIPTION_MAX_WORDS 
} from "@/hooks/service/useServiceForm";
import TabProgressIndicator from "@/components/admin/service/TabProgressIndicator";

const serviceSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .refine(
      (val) => {
        const wordCount = countWords(val);
        return wordCount >= TITLE_MIN_WORDS && wordCount <= TITLE_MAX_WORDS;
      },
      {
        message: `Title must be between ${TITLE_MIN_WORDS} and ${TITLE_MAX_WORDS} words`,
      }
    ),
  description: z.string()
    .min(1, "Description is required")
    .refine(
      (val) => {
        const wordCount = countWords(val);
        return wordCount >= DESCRIPTION_MIN_WORDS && wordCount <= DESCRIPTION_MAX_WORDS;
      },
      {
        message: `Description must be between ${DESCRIPTION_MIN_WORDS} and ${DESCRIPTION_MAX_WORDS} words`,
      }
    ),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Price must be a positive number",
  }),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().nullable().optional(),
  status: z.enum(["active", "inactive", "draft", "archived"]).default("active"),
  features: z.array(z.string()).default([]),
  image_url: z.string().optional().nullable(),
  delivery_time: z.string().default("3 days"),
  service_type: z.enum(["Project", "Task", "Prompt"]).default("Project"),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).default([]),
  service_location: z.enum(["online", "onsite", "hybrid"]).default("online"),
  is_free: z.boolean().default(false)
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: ServiceFormValues) => void;
  isSubmitting: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(
    initialData?.category
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryDescription, setNewSubcategoryDescription] = useState("");
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubcategoryDialogOpen, setIsSubcategoryDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState(0);
  
  // Process defaultValues to ensure faqs and features are valid arrays
  const processedFaqs = initialData?.faqs 
    ? Array.isArray(initialData.faqs)
      ? initialData.faqs.filter(faq => 
          faq !== null && 
          typeof faq === 'object' && 
          'question' in faq && 
          'answer' in faq
        )
      : []
    : [];

  const processedFeatures = initialData?.features || [];
  
  const [features, setFeatures] = useState<string[]>(processedFeatures);
  const [faqs, setFaqs] = useState<FAQ[]>(processedFaqs);

  const { categories = [], isLoading: isCategoriesLoading, refetch: refetchCategories } = useCategories();
  const { subcategories = [], isLoading: isSubcategoriesLoading, refetch: refetchSubcategories } = useSubcategories(selectedCategoryId);
  const { createCategory, createSubcategory, isCreating: isCreatingCategory, isCreatingSubcategory } = useCategoryMutations();

  const defaultValues: ServiceFormValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price ? initialData.price.toString() : "",
    category: initialData?.category || "",
    subcategory: initialData?.subcategory || null,
    status: initialData?.status || "active",
    features: features,
    image_url: initialData?.image_url || null,
    delivery_time: initialData?.delivery_time || "3 days",
    service_type: initialData?.service_type || "Project",
    faqs: faqs,
    service_location: initialData?.service_location || "online",
    is_free: initialData?.is_free || false
  };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  // Update form when initial data changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description || "",
        price: initialData.price.toString(),
        category: initialData.category || "",
        subcategory: initialData.subcategory || null,
        status: initialData.status,
        features: processedFeatures,
        image_url: initialData.image_url || null,
        delivery_time: initialData.delivery_time || "3 days",
        service_type: initialData.service_type || "Project",
        faqs: processedFaqs
      });
      
      // Initialize word counts
      setTitleWordCount(countWords(initialData.title));
      setDescriptionWordCount(countWords(initialData.description || ""));
      setSelectedCategoryId(initialData.category);
    }
  }, [initialData, form]);

  // Define tabs for the progress indicator
  const tabs = ["basic", "features", "faqs"];
  
  // Handle category change to update subcategories
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("subcategory", null);
    refetchSubcategories();
  };
  
  const handleFeatureChange = (newFeatures: string[]) => {
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const handleFaqChange = (newFaqs: FAQ[]) => {
    setFaqs(newFaqs);
    form.setValue("faqs", newFaqs);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitleWordCount(countWords(value));
    form.setValue("title", value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescriptionWordCount(countWords(value));
    form.setValue("description", value);
  };

  const handleSubmit = (data: ServiceFormValues) => {
    // Make sure features and faqs are included in the form data
    data.features = features;
    data.faqs = faqs;
    onSubmit(data);
  };

  // Handle creating a new category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return;
    }
    
    try {
      const category = await createCategory({
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim() || undefined
      });
      
      // After creating, reset form fields and close dialog
      setNewCategoryName("");
      setNewCategoryDescription("");
      setIsCategoryDialogOpen(false);
      
      // Refetch categories to get the newly created one
      const { data } = await refetchCategories();
      
      // Find the newly created category
      if (category) {
        // Select the newly created category
        form.setValue("category", category.id);
        setSelectedCategoryId(category.id);
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  // Handle creating a new subcategory
  const handleCreateSubcategory = async () => {
    if (!selectedCategoryId || !newSubcategoryName.trim()) {
      return;
    }
    
    try {
      const subcategory = await createSubcategory({
        name: newSubcategoryName.trim(),
        categoryId: selectedCategoryId,
        description: newSubcategoryDescription.trim() || undefined
      });
      
      // After creating, reset form fields and close dialog
      setNewSubcategoryName("");
      setNewSubcategoryDescription("");
      setIsSubcategoryDialogOpen(false);
      
      // Refetch subcategories
      await refetchSubcategories();
      
      // Select the newly created subcategory
      if (subcategory) {
        form.setValue("subcategory", subcategory.name);
      }
    } catch (error) {
      console.error("Failed to create subcategory:", error);
    }
  };

  // Helper function to determine if a form field is valid
  const isFieldValid = (fieldName: keyof ServiceFormValues) => {
    return !form.formState.errors[fieldName];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="space-y-2">
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            <TabProgressIndicator tabs={tabs} activeTab={activeTab} />
          </div>
          
          <TabsContent value="basic" className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className="space-y-1">
                    <div className="relative">
                      <FormControl>
                        <Input 
                          placeholder="Service title" 
                          {...field} 
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                    </div>
                    <div className={`text-xs flex justify-end ${
                      titleWordCount > 0 && (titleWordCount < TITLE_MIN_WORDS || titleWordCount > TITLE_MAX_WORDS) 
                        ? "text-red-500" 
                        : "text-gray-500"
                    }`}>
                      {titleWordCount} / {TITLE_MIN_WORDS}-{TITLE_MAX_WORDS} words
                    </div>
                  </div>
                  <FormDescription>
                    Title should be {TITLE_MIN_WORDS}-{TITLE_MAX_WORDS} words that clearly describe your service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <div className="space-y-1">
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          placeholder="Describe the service..."
                          rows={5}
                          {...field}
                          onChange={handleDescriptionChange}
                        />
                      </FormControl>
                    </div>
                    <div className={`text-xs flex justify-end ${
                      descriptionWordCount > 0 && (descriptionWordCount < DESCRIPTION_MIN_WORDS || descriptionWordCount > DESCRIPTION_MAX_WORDS) 
                        ? "text-red-500" 
                        : "text-gray-500"
                    }`}>
                      {descriptionWordCount} / {DESCRIPTION_MIN_WORDS}-{DESCRIPTION_MAX_WORDS} words
                    </div>
                  </div>
                  <FormDescription>
                    Description should be {DESCRIPTION_MIN_WORDS}-{DESCRIPTION_MAX_WORDS} words that provide details about your service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (PKR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter price in Pakistan Rupees (PKR)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delivery_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Select
                          disabled={isCategoriesLoading}
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleCategoryChange(value);
                          }}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="icon" className="flex-shrink-0">
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Create New Category</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter category name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter category description"
                                    value={newCategoryDescription}
                                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                                    rows={3}
                                  />
                                </FormControl>
                              </FormItem>
                            </div>
                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCategoryDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={handleCreateCategory}
                                disabled={!newCategoryName.trim() || isCreatingCategory}
                              >
                                {isCreatingCategory ? "Creating..." : "Create Category"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Select
                          disabled={isSubcategoriesLoading || !selectedCategoryId}
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                          defaultValue={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subcategory" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem key="none" value="none">None</SelectItem>
                            {subcategories.map((subcategory) => (
                              <SelectItem key={subcategory.id} value={subcategory.name}>
                                {subcategory.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Dialog open={isSubcategoryDialogOpen} onOpenChange={setIsSubcategoryDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon" 
                              className="flex-shrink-0"
                              disabled={!selectedCategoryId}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Create New Subcategory</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <FormItem>
                                <FormLabel>Subcategory Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter subcategory name"
                                    value={newSubcategoryName}
                                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter subcategory description"
                                    value={newSubcategoryDescription}
                                    onChange={(e) => setNewSubcategoryDescription(e.target.value)}
                                    rows={3}
                                  />
                                </FormControl>
                              </FormItem>
                            </div>
                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsSubcategoryDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={handleCreateSubcategory}
                                disabled={!newSubcategoryName.trim() || isCreatingSubcategory}
                              >
                                {isCreatingSubcategory ? "Creating..." : "Create Subcategory"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <FormDescription>
                        {!selectedCategoryId
                          ? "Select a category first"
                          : "Select a subcategory (optional)"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Project">Project</SelectItem>
                        <SelectItem value="Task">Task</SelectItem>
                        <SelectItem value="Prompt">Prompt</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field} 
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the URL of an image for this service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose where this service is delivered
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_free"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Free Service</FormLabel>
                      <FormDescription>
                        Mark this service as free (no payment required)
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-6">
            <FeatureManager 
              initialFeatures={features} 
              onChange={handleFeatureChange} 
            />
          </TabsContent>
          
          <TabsContent value="faqs" className="space-y-6">
            <FaqManager 
              initialFaqs={faqs} 
              onChange={handleFaqChange} 
            />
          </TabsContent>
        </Tabs>
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : initialData ? "Update Service" : "Create Service"}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
