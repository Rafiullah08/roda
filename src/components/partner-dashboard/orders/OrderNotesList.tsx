
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';

interface OrderNote {
  id: string;
  order_id: string;
  note: string;
  created_at: string;
  created_by: string;
  private: boolean;
}

interface OrderNotesListProps {
  orderId: string;
  refresh?: number;
}

const OrderNotesList: React.FC<OrderNotesListProps> = ({ orderId, refresh = 0 }) => {
  const [notes, setNotes] = useState<OrderNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('order_notes')
          .select('*')
          .eq('order_id', orderId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setNotes(data || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotes();
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
  
  if (notes.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No notes yet for this order</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-muted-foreground">
              {format(new Date(note.created_at), 'MMM d, yyyy • h:mm a')}
            </div>
            <Badge 
              variant={note.private ? "outline" : "secondary"}
              className="flex items-center gap-1"
            >
              {note.private ? (
                <>
                  <EyeOff className="h-3 w-3" />
                  <span>Private</span>
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3" />
                  <span>Shared</span>
                </>
              )}
            </Badge>
          </div>
          <p className="text-sm whitespace-pre-wrap">{note.note}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderNotesList;
