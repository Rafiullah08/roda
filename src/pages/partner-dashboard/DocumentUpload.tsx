
import React, { useState } from 'react';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const { partner } = usePartnerDashboard();
  const [documents, setDocuments] = useState<Record<string, File | null>>({
    businessLicense: null,
    idProof: null,
    certifications: null,
    portfolioSamples: null
  });
  
  const [uploading, setUploading] = useState(false);
  
  if (!partner) {
    return (
      <PartnerDashboardLayout>
        <div className="alert alert-warning">
          You need to be registered as a partner to access this page.
        </div>
      </PartnerDashboardLayout>
    );
  }
  
  if (partner.status !== 'screening') {
    return (
      <PartnerDashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              This section is only applicable during the screening stage of your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg text-blue-800">
              <p>Your application has progressed beyond the document screening stage.</p>
              <p className="mt-2">
                {partner.status === 'service_selection' && "You can now select services you'd like to offer."}
                {partner.status === 'trial_period' && "You are in the trial period. Please complete your assigned trial services."}
                {partner.status === 'approved' && "Your partner account has been fully approved!"}
              </p>
            </div>
          </CardContent>
        </Card>
      </PartnerDashboardLayout>
    );
  }
  
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
  
  const handleUpload = async () => {
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
  
  const isFormValid = Object.values(documents).some(doc => doc !== null);
  
  return (
    <PartnerDashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>
            Please upload the following documents to complete the screening process. 
            All documents should be in PDF, JPG, or PNG format.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <DocumentUploader
              label="Business License"
              description="A copy of your current business license or registration"
              required={true}
              file={documents.businessLicense}
              onChange={handleFileChange('businessLicense')}
              onRemove={handleRemoveFile('businessLicense')}
            />
            
            <DocumentUploader
              label="ID Proof / Passport"
              description="Government-issued ID or passport of the business owner"
              required={true}
              file={documents.idProof}
              onChange={handleFileChange('idProof')}
              onRemove={handleRemoveFile('idProof')}
            />
            
            <DocumentUploader
              label="Certifications"
              description="Professional certifications related to your services (if applicable)"
              required={false}
              file={documents.certifications}
              onChange={handleFileChange('certifications')}
              onRemove={handleRemoveFile('certifications')}
            />
            
            <DocumentUploader
              label="Portfolio Samples"
              description="Examples of your previous work relevant to your expertise"
              required={false}
              file={documents.portfolioSamples}
              onChange={handleFileChange('portfolioSamples')}
              onRemove={handleRemoveFile('portfolioSamples')}
            />
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              onClick={handleUpload} 
              disabled={!isFormValid || uploading}
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
    </PartnerDashboardLayout>
  );
};

interface DocumentUploaderProps {
  label: string;
  description: string;
  required: boolean;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  label,
  description,
  required,
  file,
  onChange,
  onRemove
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{label}</h3>
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {!file ? (
          <div className="flex-shrink-0">
            <label className="cursor-pointer">
              <div className="flex items-center justify-center h-10 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                <span className="text-sm">Upload</span>
              </div>
              <input 
                type="file" 
                className="sr-only" 
                onChange={onChange} 
                accept="image/png,image/jpeg,application/pdf" 
              />
            </label>
          </div>
        ) : (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
      
      {file && (
        <div className="mt-3 flex items-center p-2 bg-green-50 rounded">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-green-700 truncate flex-1">
            {file.name}
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(file.size / 1024)} KB
          </span>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
