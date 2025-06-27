
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EmailTemplate,
  CreateEmailTemplateParams,
  UpdateEmailTemplateParams,
  fetchEmailTemplates,
  fetchEmailTemplateById,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  toggleTemplateStatus,
  sendTestEmail
} from "@/services/email";

export const useEmailTemplates = () => {
  const queryClient = useQueryClient();
  
  const { 
    data: templates = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["emailTemplates"],
    queryFn: fetchEmailTemplates
  });

  const createTemplateMutation = useMutation({
    mutationFn: createEmailTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateEmailTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: deleteEmailTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => 
      toggleTemplateStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });

  const sendTestEmailMutation = useMutation({
    mutationFn: ({ templateId, testEmail }: { templateId: string, testEmail: string }) =>
      sendTestEmail(templateId, testEmail)
  });

  return {
    templates,
    isLoading,
    error,
    refetch, // Ensure we're exporting the refetch function
    createTemplate: createTemplateMutation.mutate,
    updateTemplate: updateTemplateMutation.mutate,
    deleteTemplate: deleteTemplateMutation.mutate,
    toggleTemplateStatus: toggleStatusMutation.mutate,
    sendTestEmail: sendTestEmailMutation.mutate,
    isCreating: createTemplateMutation.isPending,
    isUpdating: updateTemplateMutation.isPending,
    isDeleting: deleteTemplateMutation.isPending,
    isTogglingStatus: toggleStatusMutation.isPending,
    isSendingTest: sendTestEmailMutation.isPending,
  };
};

export const useEmailTemplateById = (id?: string) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["emailTemplate", id],
    queryFn: () => id ? fetchEmailTemplateById(id) : Promise.resolve(null),
    enabled: !!id
  });

  useEffect(() => {
    if (data) {
      setTemplate(data);
    }
  }, [data]);

  return {
    template,
    isLoading,
    error,
    refetch,
    setTemplate
  };
};
