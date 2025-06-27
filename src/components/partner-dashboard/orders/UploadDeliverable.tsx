
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Upload } from 'lucide-react';

interface UploadDeliverableProps {
  orderId: string;
  onDeliverableUploaded?: () => void;
}

const UploadDeliverable: React.FC<UploadDeliverableProps> = ({ 
  orderId, 
  onDeliverableUploaded 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { partner } = usePartnerDashboard();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Please select a file",
        variant: "destructive"
      });
      return;
    }
    
    if (!partner) {
      toast({
        title: "Not authorized",
        description: "You must be logged in as a partner to upload deliverables",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Upload file to storage bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${orderId}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `deliverables/${fileName}`;
      
      // Mock the storage upload (since we don't have actual storage bucket set up)
      // In a real implementation, you would upload to Supabase Storage:
      // const { data: uploadData, error: uploadError } = await supabase.storage
      //   .from('deliverables')
      //   .upload(filePath, file);
      
      // if (uploadError) throw uploadError;
      
      // For now, we'll mock the file URL
      const fileUrl = `https://example.com/files/${filePath}`;
      
      // Save deliverable info to database
      const { error } = await supabase
        .from('order_deliverables')
        .insert({
          order_id: orderId,
          file_name: file.name,
          file_url: fileUrl,
          description: description.trim() || null,
          uploaded_by: partner.id
        });
      
      if (error) throw error;
      
      toast({
        title: "Deliverable uploaded successfully"
      });
      
      // Reset form
      setFile(null);
      setDescription('');
      if (onDeliverableUploaded) onDeliverableUploaded();
      
    } catch (error) {
      console.error("Error uploading deliverable:", error);
      toast({
        title: "Failed to upload deliverable",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Select file</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Enter a description for this deliverable..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isUploading}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isUploading || !file}
        className="w-full"
      >
        {isUploading ? (
          'Uploading...'
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Deliverable
          </>
        )}
      </Button>
    </form>
  );
};

export default UploadDeliverable;
