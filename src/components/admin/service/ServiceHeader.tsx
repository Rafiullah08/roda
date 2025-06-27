
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import ServiceForm from "./ServiceForm";

interface ServiceHeaderProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  handleCreateService: (formData: any) => void;
  isCreating: boolean;
}

export default function ServiceHeader({
  isAddDialogOpen,
  setIsAddDialogOpen,
  handleCreateService,
  isCreating
}: ServiceHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Services Management</h1>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service that will be displayed on the services page.
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            onSubmit={handleCreateService}
            isSubmitting={isCreating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
