
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Library } from "lucide-react";

interface TemplateActionsHeaderProps {
  onCreateTemplate: () => void;
}

const TemplateActionsHeader: React.FC<TemplateActionsHeaderProps> = ({ onCreateTemplate }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h1 className="text-2xl font-bold">Email Templates</h1>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate("/admin/email/templates/library")}>
          <Library className="mr-2 h-4 w-4" />
          Template Library
        </Button>
        <Button onClick={onCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateActionsHeader;
