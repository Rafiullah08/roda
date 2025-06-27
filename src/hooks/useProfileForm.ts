
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export const useProfileForm = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    businessName: "Acme Corporation",
    ownerName: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    businessType: "Technology Services",
    website: "www.acmecorp.com",
    taxId: "12-3456789",
  });

  const [documents, setDocuments] = useState<Record<string, File | null>>({
    businessLicense: null,
    idProof: null,
    taxRegistration: null,
    businessAgreement: null,
    certifications: null,
    portfolioSamples: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive"
      });
    }
  };

  return {
    formData,
    setFormData,
    documents,
    setDocuments,
    handleSubmit
  };
};
