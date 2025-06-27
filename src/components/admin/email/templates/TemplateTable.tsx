import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, Trash, Mail, MoreVertical } from "lucide-react";
import { EmailTemplate, getCategoryLabel } from "@/services/email";

interface TemplateTableProps {
  templates: EmailTemplate[];
  isLoading: boolean;
  isInitializing: boolean;
  onEdit: (template: EmailTemplate) => void;
  onPreview: (template: EmailTemplate) => void;
  onDelete: (template: EmailTemplate) => void;
  onTestEmail: (template: EmailTemplate) => void;
  onToggleStatus: (template: EmailTemplate) => void;
}

const TemplateTable: React.FC<TemplateTableProps> = ({
  templates,
  isLoading,
  isInitializing,
  onEdit,
  onPreview,
  onDelete,
  onTestEmail,
  onToggleStatus,
}) => {
  const isLoadingData = isLoading || isInitializing;

  return (
    <div className="rounded-md border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-start p-3 font-medium text-gray-500">Template Name</th>
            <th className="text-start p-3 font-medium text-gray-500 hidden md:table-cell">Type</th>
            <th className="text-start p-3 font-medium text-gray-500 hidden md:table-cell">Subject</th>
            <th className="text-start p-3 font-medium text-gray-500 hidden lg:table-cell">Last Updated</th>
            <th className="text-start p-3 font-medium text-gray-500">Status</th>
            <th className="text-end p-3 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingData ? (
            <tr>
              <td colSpan={6} className="p-3 text-center text-sm text-gray-500">
                {isInitializing ? "Initializing templates..." : "Loading templates..."}
              </td>
            </tr>
          ) : templates.length > 0 ? (
            templates.map((template) => (
              <tr key={template.id} className="border-t">
                <td className="p-3 font-medium">{template.name}</td>
                <td className="p-3 hidden md:table-cell">{getCategoryLabel(template.type)}</td>
                <td className="p-3 hidden md:table-cell truncate max-w-[200px]">{template.subject}</td>
                <td className="p-3 hidden lg:table-cell">
                  {new Date(template.updated_at).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Badge 
                    variant={template.is_active ? "default" : "outline"}
                    className={template.is_active ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
                  >
                    {template.is_active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-3 text-end">
                  <div className="flex items-center justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(template)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onPreview(template)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(template)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPreview(template)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onTestEmail(template)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Test
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onToggleStatus(template)}>
                          {template.is_active ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onDelete(template)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-3 text-center text-sm text-gray-500">
                No templates found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateTable;
