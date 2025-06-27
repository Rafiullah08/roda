
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface AddOrderNoteProps {
  orderId: string;
  onNoteAdded?: () => void;
}

const AddOrderNote: React.FC<AddOrderNoteProps> = ({ orderId, onNoteAdded }) => {
  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { partner } = usePartnerDashboard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!note.trim()) {
      toast({
        title: "Note cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    if (!partner) {
      toast({
        title: "Not authorized",
        description: "You must be logged in as a partner to add notes",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('order_notes')
        .insert({
          order_id: orderId,
          note: note.trim(),
          created_by: partner.id,
          private: isPrivate
        });
      
      if (error) throw error;
      
      toast({
        title: "Note added successfully"
      });
      
      setNote('');
      if (onNoteAdded) onNoteAdded();
    } catch (error) {
      console.error("Error adding note:", error);
      toast({
        title: "Failed to add note",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea 
        placeholder="Add notes about this order..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="private-note" 
          checked={isPrivate} 
          onCheckedChange={(checked) => setIsPrivate(checked as boolean)} 
        />
        <Label htmlFor="private-note" className="text-sm">
          Private note (only visible to partners)
        </Label>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting || !note.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add Note'}
      </Button>
    </form>
  );
};

export default AddOrderNote;
