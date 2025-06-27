
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DocumentUploader from "./DocumentUploader";
import { toast } from "@/hooks/use-toast";

interface DocumentsCardProps {
  documents: Record<string, File | null>;
  setDocuments: React.Dispatch<React.SetStateAction<Record<string, File | null>>>;
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ documents, setDocuments }) => {
  const [uploading, setUploading] = React.useState(false);
  
  const handleFileChange = (documentType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [documentType]: e.target.files![0]
      }));
    }
  };
  
  const handleRemoveFile = (documentType: string) => () => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: null
    }));
  };
  
  const handleUploadDocuments = async () => {
    setUploading(true);
    
    try {
      // Mock upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Documents Uploaded",
        description: "Your documents have been successfully uploaded and will be reviewed soon.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Documents</CardTitle>
        <CardDescription>
          Please upload your business documents. All documents should be in PDF, JPG, or PNG format.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <DocumentUploader
            label="Business License / Registration"
            description="A copy of your current business license or registration"
            required={true}
            file={documents.businessLicense}
            onChange={handleFileChange('businessLicense')}
            onRemove={handleRemoveFile('businessLicense')}
          />
          
          <DocumentUploader
            label="ID Proof / NIC"
            description="National Identity Card or government-issued ID of the business owner"
            required={true}
            file={documents.idProof}
            onChange={handleFileChange('idProof')}
            onRemove={handleRemoveFile('idProof')}
          />
          
          <DocumentUploader
            label="Tax Registration (NTN)"
            description="Tax registration certificate or National Tax Number document"
            required={true}
            file={documents.taxRegistration}
            onChange={handleFileChange('taxRegistration')}
            onRemove={handleRemoveFile('taxRegistration')}
          />
          
          <DocumentUploader
            label="Business Agreement"
            description="Partnership agreement or other business formation documents"
            required={false}
            file={documents.businessAgreement}
            onChange={handleFileChange('businessAgreement')}
            onRemove={handleRemoveFile('businessAgreement')}
          />
          
          <DocumentUploader
            label="Professional Certifications"
            description="Professional certifications related to your services (if applicable)"
            required={false}
            file={documents.certifications}
            onChange={handleFileChange('certifications')}
            onRemove={handleRemoveFile('certifications')}
          />
        </div>
        
        <div className="pt-4 border-t">
          <Button 
            onClick={handleUploadDocuments} 
            disabled={!Object.values(documents).some(doc => doc !== null) || uploading}
            className="w-full sm:w-auto"
          >
            {uploading ? 'Uploading...' : 'Submit Documents'}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Once submitted, our team will review your documents within 3-5 business days.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsCard;
