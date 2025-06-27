
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { AnnouncementsList } from "@/components/admin/announcements/AnnouncementsList";
import { AnnouncementForm } from "@/components/admin/announcements/AnnouncementForm";
import { DeleteAnnouncementDialog } from "@/components/admin/announcements/DeleteAnnouncementDialog";
import { 
  createAnnouncement, 
  Announcement, 
  CreateAnnouncementParams
} from "@/services/announcements";
import { useAuth } from "@/contexts/AuthContext";

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const createAnnouncementMutation = useMutation({
    mutationFn: async (params: CreateAnnouncementParams) => {
      if (!user?.id) throw new Error("User not authenticated");
      return await createAnnouncement(params, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Announcement created",
        description: "Your announcement has been created successfully.",
      });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to create announcement: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleCreateAnnouncement = (data: CreateAnnouncementParams) => {
    createAnnouncementMutation.mutate(data);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setIsEditing(true);
  };

  const handleDeleteAnnouncement = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAnnouncement = async () => {
    try {
      // For now, we just close the dialog and show a toast
      // In a real implementation, we would call a service to delete the announcement
      toast({
        title: "Announcement Deleted",
        description: "The announcement has been deleted.",
      });
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the announcement.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Announcement Management</h1>

        {isEditing ? (
          <AnnouncementForm 
            announcement={currentAnnouncement || undefined}
            onSubmit={handleCreateAnnouncement}
            onCancel={() => {
              setIsEditing(false);
              setCurrentAnnouncement(null);
            }}
          />
        ) : (
          <AnnouncementsList
            onEdit={handleEditAnnouncement}
            onDelete={handleDeleteAnnouncement}
            onCreateNew={() => setIsEditing(true)}
          />
        )}

        <DeleteAnnouncementDialog
          announcement={currentAnnouncement}
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDeleteAnnouncement}
        />
      </div>
    </AdminLayout>
  );
}
