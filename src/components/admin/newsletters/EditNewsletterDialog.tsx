
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface EditNewsletterDialogProps {
  newsletter: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditNewsletterDialog = ({ newsletter, open, onOpenChange }: EditNewsletterDialogProps) => {
  const [title, setTitle] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (newsletter) {
      setTitle(newsletter.title || "");
      setSubjectLine(newsletter.subject_line || "");
      setContent(newsletter.content || "");
    }
  }, [newsletter]);

  const updateMutation = useMutation({
    mutationFn: async (data: { title: string; subject_line: string; content: string }) => {
      const { data: updatedNewsletter, error } = await supabase
        .from('newsletters')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', newsletter.id)
        .select()
        .single();

      if (error) throw error;
      return updatedNewsletter;
    },
    onSuccess: () => {
      toast({
        title: "Newsletter updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['newsletters'] });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update newsletter",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      title,
      subject_line: subjectLine,
      content,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Newsletter</DialogTitle>
          <DialogDescription>
            Make changes to your newsletter.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Newsletter Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter newsletter title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject Line</Label>
            <Input
              id="subject"
              value={subjectLine}
              onChange={(e) => setSubjectLine(e.target.value)}
              placeholder="Enter email subject line"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Newsletter Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your newsletter content here... You can use basic HTML tags."
              className="min-h-[200px]"
              required
            />
            <p className="text-sm text-gray-500">
              You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;, etc.
            </p>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {updateMutation.isPending ? "Updating..." : "Update Newsletter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNewsletterDialog;
