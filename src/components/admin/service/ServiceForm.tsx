
import React, { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { Service } from "@/types/service";
import { useCategories } from "@/hooks/service-management";
import { Checkbox } from "@/components/ui/checkbox";

export interface ServiceFormValues {
  title: string;
  description: string;
  price: number;
  delivery_time: string;
  category: string;
  subcategory: string | null;
  image_url: string | null;
  is_free: boolean;
  features: string[];
  faqs: Array<{ question: string; answer: string }>;
  service_type: "Project" | "Task";
  status: 'active' | 'inactive' | 'draft' | 'archived';
  service_location: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  delivery_time: z.string().min(2, {
    message: "Delivery time must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be selected.",
  }),
  subcategory: z.string().nullable(),
  image_url: z.string().url({
    message: "Image URL must be a valid URL.",
  }),
  is_free: z.boolean().default(false),
  features: z.array(z.string()).default([]),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).default([]),
  service_type: z.enum(["Project", "Task"]).default("Project"),
  status: z.enum(["active", "inactive", "draft", "archived"]).default("active"),
  service_location: z.string().default("online"),
});

interface ServiceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting: boolean;
  initialData?: Service | Partial<ServiceFormValues> | null;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, isSubmitting, initialData }) => {
  const { data: categories, isLoading, error } = useCategories();
  const [featuresList, setFeaturesList] = useState<string[]>(
    (initialData && 'features' in initialData) ? initialData.features || [] : []
  );
  const [formData, setFormData] = useState<Partial<ServiceFormValues>>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    delivery_time: initialData?.delivery_time || "",
    category: initialData?.category || "",
    subcategory: initialData?.subcategory || null,
    image_url: initialData?.image_url || "",
    is_free: initialData?.is_free || false,
    features: initialData?.features || [],
    faqs: initialData?.faqs || [],
    service_type: initialData?.service_type as "Project" | "Task" || "Project",
    status: initialData?.status || "active",
    service_location: initialData?.service_location || "online",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      delivery_time: initialData?.delivery_time || "",
      category: initialData?.category || "",
      subcategory: initialData?.subcategory || null,
      image_url: initialData?.image_url || "",
      is_free: initialData?.is_free || false,
      features: initialData?.features || [],
      faqs: initialData?.faqs || [],
      service_type: initialData?.service_type as "Project" | "Task" || "Project",
      status: initialData?.status || "active",
      service_location: initialData?.service_location || "online",
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || 0,
        delivery_time: initialData.delivery_time || "",
        category: initialData.category || "",
        subcategory: initialData.subcategory || null,
        image_url: initialData.image_url || "",
        is_free: initialData.is_free || false,
        features: initialData.features || [],
        faqs: initialData.faqs || [],
        service_type: initialData.service_type as "Project" | "Task" || "Project",
        status: initialData.status || "active",
        service_location: initialData.service_location || "online",
      });
      
      if ('features' in initialData && initialData.features) {
        setFeaturesList(initialData.features);
      }
    }
  }, [initialData]);

  const handleFeatureAdd = useCallback(() => {
    setFeaturesList((prevFeatures) => [...prevFeatures, ""]);
  }, [setFeaturesList]);

  const handleFeatureRemove = useCallback((index: number) => {
    setFeaturesList((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures.splice(index, 1);
      return newFeatures;
    });
  }, [setFeaturesList]);

  const handleFeatureChange = useCallback((index: number, value: string) => {
    setFeaturesList((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures[index] = value;
      return newFeatures;
    });
  }, [setFeaturesList]);

  const [faqList, setFaqList] = useState<{ question: string; answer: string }[]>(
    formData.faqs?.map((faq: any) => ({
      question: faq.question || "",
      answer: faq.answer || ""
    })) || []
  );

  const handleFAQAdd = () => {
    setFaqList((prevFaqs) => [...prevFaqs, { question: "", answer: "" }]);
  };

  const handleFAQRemove = (index: number) => {
    setFaqList((prevFaqs) => {
      const newFaqs = [...prevFaqs];
      newFaqs.splice(index, 1);
      return newFaqs;
    });
  };

  const handleFAQChange = (index: number, field: string, value: string) => {
    setFaqList((prevFaqs) => {
      const newFaqs = [...prevFaqs];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return newFaqs;
    });
  };

  const onSubmitHandler = (values: z.infer<typeof formSchema>) => {
    const finalValues = {
      ...values,
      features: featuresList,
      faqs: faqList,
    };
    onSubmit(finalValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Service Title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of the service that will be displayed to users.
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
              <FormControl>
                <Textarea
                  placeholder="Service Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write a detailed description of your service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormDescription>
                Set the price for your service.
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
                <Input placeholder="e.g., 3-5 business days" {...field} />
              </FormControl>
              <FormDescription>
                Specify the estimated delivery time for the service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading" disabled>Loading...</SelectItem>
                  ) : error ? (
                    <SelectItem value="error" disabled>Error</SelectItem>
                  ) : (
                    categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose a category that best describes your service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <FormControl>
                <Input placeholder="Subcategory" {...field} />
              </FormControl>
              <FormDescription>
                Specify a subcategory for your service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Provide a URL for the service image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_free"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Free Service</FormLabel>
                <FormDescription>
                  Check if the service is offered for free.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Features</FormLabel>
          <FormDescription>
            List the key features of your service.
          </FormDescription>
          {featuresList.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <FormControl>
                <Input
                  placeholder="Feature"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleFeatureRemove(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFeatureAdd}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>

        <div>
          <FormLabel>FAQs</FormLabel>
          <FormDescription>
            List frequently asked questions and their answers.
          </FormDescription>
          {faqList.map((faq, index) => (
            <div key={index} className="space-y-2 mt-2 border p-4 rounded-md">
              <div>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                  />
                </FormControl>
              </div>
              <div>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Answer"
                    className="resize-none"
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                  />
                </FormControl>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleFAQRemove(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFAQAdd}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>

        <FormField
          control={form.control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                  <SelectItem value="Prompt">Prompt</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose a type that best describes your service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Status</FormLabel>
                <FormDescription>
                  Set the status of your service.
                </FormDescription>
              </div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="service_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="in_person">In Person</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the location where the service is provided.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
