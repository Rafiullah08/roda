
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Deliverable {
  id: string;
  order_id: string;
  file_name: string;
  file_url: string;
  version: number;
  description: string | null;
  uploaded_at: string;
  uploaded_by: string;
}

interface DeliverablesListProps {
  orderId: string;
  refresh?: number;
}

const DeliverablesList: React.FC<DeliverablesListProps> = ({ orderId, refresh = 0 }) => {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('order_deliverables')
          .select('*')
          .eq('order_id', orderId)
          .order('uploaded_at', { ascending: false });
        
        if (error) throw error;
        
        setDeliverables(data || []);
      } catch (err) {
        console.error("Error fetching deliverables:", err);
        setError("Failed to load deliverables. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDeliverables();
  }, [orderId, refresh]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(2).fill(null).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-700">
        {error}
      </div>
    );
  }
  
  if (deliverables.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No deliverables uploaded for this order yet</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {deliverables.map((deliverable) => (
        <div key={deliverable.id} className="border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{deliverable.file_name}</span>
              {deliverable.version > 1 && (
                <Badge variant="outline">v{deliverable.version}</Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(deliverable.uploaded_at), 'MMM d, yyyy • h:mm a')}
            </div>
          </div>
          
          {deliverable.description && (
            <p className="text-sm text-muted-foreground my-2">{deliverable.description}</p>
          )}
          
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" size="sm" asChild>
              <a href={deliverable.file_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                Preview
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href={deliverable.file_url} download={deliverable.file_name}>
                <Download className="mr-1 h-3 w-3" />
                Download
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliverablesList;
