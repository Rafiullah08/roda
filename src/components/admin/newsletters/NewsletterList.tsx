
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import EditNewsletterDialog from "./EditNewsletterDialog";
import PreviewNewsletterDialog from "./PreviewNewsletterDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NewsletterList = () => {
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [previewingNewsletter, setPreviewingNewsletter] = useState(null);
  const queryClient = useQueryClient();

  const { data: newsletters, isLoading } = useQuery({
    queryKey: ['newsletters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (newsletterId: string) => {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: { newsletterId }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Newsletter sent successfully!",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ['newsletters'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send newsletter",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (newsletterId: string) => {
      const { error } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', newsletterId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Newsletter deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['newsletters'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete newsletter",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSend = (newsletterId: string) => {
    sendMutation.mutate(newsletterId);
  };

  const handleDelete = (newsletterId: string) => {
    deleteMutation.mutate(newsletterId);
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsletters?.map((newsletter) => (
          <Card key={newsletter.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{newsletter.title}</CardTitle>
                <Badge variant={newsletter.status === 'sent' ? 'default' : 'secondary'}>
                  {newsletter.status}
                </Badge>
              </div>
              <CardDescription>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(newsletter.created_at), 'MMM dd, yyyy')}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  Subject: {newsletter.subject_line}
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewingNewsletter(newsletter)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  
                  {newsletter.status === 'draft' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingNewsletter(newsletter)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSend(newsletter.id)}
                        disabled={sendMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        {sendMutation.isPending ? 'Sending...' : 'Send'}
                      </Button>
                    </>
                  )}
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the newsletter.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(newsletter.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingNewsletter && (
        <EditNewsletterDialog
          newsletter={editingNewsletter}
          open={!!editingNewsletter}
          onOpenChange={(open) => !open && setEditingNewsletter(null)}
        />
      )}

      {previewingNewsletter && (
        <PreviewNewsletterDialog
          newsletter={previewingNewsletter}
          open={!!previewingNewsletter}
          onOpenChange={(open) => !open && setPreviewingNewsletter(null)}
        />
      )}
    </>
  );
};

export default NewsletterList;
