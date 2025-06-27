import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { EmailTemplate } from "@/services/email";
import { useEmailTemplates } from "@/hooks/admin/useEmailTemplates";
import { initializeDefaultTemplates } from "@/services/admin/emailTemplateService";

import TemplateActionsHeader from "./TemplateActionsHeader";
import TemplateFilters from "./TemplateFilters";
import TemplateTable from "./TemplateTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DeleteTemplateDialog } from "./DeleteTemplateDialog";
import { TestEmailDialog } from "./TestEmailDialog";
import { EmailTemplatePreview } from "./EmailTemplatePreview";
import EmailTemplateForm from "./EmailTemplateForm";

const TemplatesContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTestEmailDialogOpen, setIsTestEmailDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  
  const {
    templates,
    isLoading,
    refetch,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleTemplateStatus,
    sendTestEmail,
    isCreating,
    isUpdating,
    isDeleting,
    isSendingTest
  } = useEmailTemplates();

  // Initialize templates on component mount if none exist
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsInitializing(true);
        await initializeDefaultTemplates();
        await refetch();
      } catch (error: any) {
        console.error("Failed to initialize templates:", error);
        toast({
          title: "Initialization error",
          description: error.message || "Failed to initialize email templates",
          variant: "destructive"
        });
      } finally {
        setIsInitializing(false);
      }
    };
    initialize();
  }, [refetch]);

  const handleCreate = (data: any) => {
    createTemplate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      }
    });
  };

  const handleUpdate = (data: any) => {
    if (currentTemplate) {
      updateTemplate({
        id: currentTemplate.id,
        ...data
      }, {
        onSuccess: () => {
          setIsEditDialogOpen(false);
        }
      });
    }
  };

  const handleDelete = () => {
    if (currentTemplate) {
      deleteTemplate(currentTemplate.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        }
      });
    }
  };

  const handleToggleStatus = (template: EmailTemplate) => {
    toggleTemplateStatus({
      id: template.id,
      isActive: !template.is_active
    });
  };

  const handleSendTest = (email: string) => {
    if (currentTemplate) {
      sendTestEmail({
        templateId: currentTemplate.id,
        testEmail: email
      }, {
        onSuccess: () => {
          setIsTestEmailDialogOpen(false);
        }
      });
    }
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsEditDialogOpen(true);
  };

  const handlePreviewTemplate = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsPreviewDialogOpen(true);
  };

  const handleDeleteTemplate = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const handleTestEmail = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsTestEmailDialogOpen(true);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && template.is_active;
    if (activeTab === "inactive") return matchesSearch && !template.is_active;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <TemplateActionsHeader onCreateTemplate={() => setIsCreateDialogOpen(true)} />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <TemplateFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          >
            <TabsContent value="all" className="m-0">
              <TemplateTable
                templates={filteredTemplates}
                isLoading={isLoading}
                isInitializing={isInitializing}
                onEdit={handleEditTemplate}
                onPreview={handlePreviewTemplate}
                onDelete={handleDeleteTemplate}
                onTestEmail={handleTestEmail}
                onToggleStatus={handleToggleStatus}
              />
            </TabsContent>
            <TabsContent value="active" className="m-0">
              <TemplateTable
                templates={filteredTemplates.filter(t => t.is_active)}
                isLoading={isLoading}
                isInitializing={isInitializing}
                onEdit={handleEditTemplate}
                onPreview={handlePreviewTemplate}
                onDelete={handleDeleteTemplate}
                onTestEmail={handleTestEmail}
                onToggleStatus={handleToggleStatus}
              />
            </TabsContent>
            <TabsContent value="inactive" className="m-0">
              <TemplateTable
                templates={filteredTemplates.filter(t => !t.is_active)}
                isLoading={isLoading}
                isInitializing={isInitializing}
                onEdit={handleEditTemplate}
                onPreview={handlePreviewTemplate}
                onDelete={handleDeleteTemplate}
                onTestEmail={handleTestEmail}
                onToggleStatus={handleToggleStatus}
              />
            </TabsContent>
          </TemplateFilters>
        </CardContent>
      </Card>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Create Email Template</DialogTitle>
          </DialogHeader>
          <EmailTemplateForm
            onSubmit={handleCreate}
            isSubmitting={isCreating}
            mode="create"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
          </DialogHeader>
          <EmailTemplateForm
            template={currentTemplate || undefined}
            onSubmit={handleUpdate}
            isSubmitting={isUpdating}
            mode="edit"
          />
        </DialogContent>
      </Dialog>

      {/* Preview Template Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {currentTemplate?.name} - Preview
            </DialogTitle>
          </DialogHeader>
          <div className="h-[70vh] overflow-auto border rounded-md bg-white">
            {currentTemplate && (
              <EmailTemplatePreview 
                html={currentTemplate.html_content}
                variables={Array.isArray(currentTemplate.variables) ? currentTemplate.variables : []}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Template Dialog */}
      {currentTemplate && (
        <DeleteTemplateDialog
          templateName={currentTemplate.name}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* Test Email Dialog */}
      {currentTemplate && (
        <TestEmailDialog
          templateName={currentTemplate.name}
          isOpen={isTestEmailDialogOpen}
          onClose={() => setIsTestEmailDialogOpen(false)}
          onSend={handleSendTest}
          isSending={isSendingTest}
        />
      )}
    </div>
  );
};

export default TemplatesContainer;
