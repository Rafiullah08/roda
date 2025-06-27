
import { useState } from "react";
import { Service } from "@/types/service";

// Define word limits as constants
export const TITLE_MIN_WORDS = 5;
export const TITLE_MAX_WORDS = 15;
export const DESCRIPTION_MIN_WORDS = 50;
export const DESCRIPTION_MAX_WORDS = 200;
export const FEATURE_MIN_WORDS = 1;
export const FEATURE_MAX_WORDS = 5;
export const FAQ_QUESTION_MIN_WORDS = 3;
export const FAQ_QUESTION_MAX_WORDS = 10;
export const FAQ_ANSWER_MIN_WORDS = 10;
export const FAQ_ANSWER_MAX_WORDS = 50;

// Helper function for counting words
export function countWords(text: string): number {
  return text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

export function useServiceForm() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const handleCreateService = (formData: any) => {
    // Convert price string to number
    const numericPrice = parseFloat(formData.price);
    
    return {
      title: formData.title,
      description: formData.description,
      price: numericPrice,
      status: formData.status,
      features: formData.features || [],
      image_url: formData.image_url || null,
      delivery_time: formData.delivery_time || "3 days",
      category: formData.category || null,
      subcategory: formData.subcategory || null,
      service_type: formData.service_type || "Project",
      faqs: formData.faqs || []
    };
  };

  const handleUpdateService = (formData: any, currentServiceId: string) => {
    if (!currentServiceId) return null;
    
    // Convert price string to number
    const numericPrice = parseFloat(formData.price);
    
    return {
      id: currentServiceId,
      service: {
        title: formData.title,
        description: formData.description,
        price: numericPrice,
        status: formData.status,
        features: formData.features || [],
        image_url: formData.image_url || null,
        delivery_time: formData.delivery_time || "3 days",
        category: formData.category || null,
        subcategory: formData.subcategory || null,
        service_type: formData.service_type || "Project",
        faqs: formData.faqs || []
      },
    };
  };

  return {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    serviceToDelete,
    setServiceToDelete,
    currentService,
    setCurrentService,
    handleCreateService,
    handleUpdateService
  };
}
