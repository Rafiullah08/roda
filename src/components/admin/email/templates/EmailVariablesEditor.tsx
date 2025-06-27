
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { EmailTemplateVariable } from "@/services/email";

interface EmailVariablesEditorProps {
  variables: EmailTemplateVariable[] | string[];
  onChange: (variables: EmailTemplateVariable[]) => void;
}

export const EmailVariablesEditor: React.FC<EmailVariablesEditorProps> = ({ variables, onChange }) => {
  const [newVariable, setNewVariable] = useState("");
  const [processedVariables, setProcessedVariables] = useState<EmailTemplateVariable[]>([]);

  // Process incoming variables to ensure they're in the right format
  useEffect(() => {
    if (variables && variables.length > 0) {
      // Convert string[] to EmailTemplateVariable[] if needed
      if (typeof variables[0] === 'string') {
        setProcessedVariables((variables as string[]).map(name => ({
          name,
          description: name
        })));
      } else {
        setProcessedVariables(variables as EmailTemplateVariable[]);
      }
    } else {
      setProcessedVariables([]);
    }
  }, [variables]);

  const handleAddVariable = () => {
    if (newVariable && !processedVariables.some(v => v.name === newVariable)) {
      const updatedVariables = [
        ...processedVariables, 
        { name: newVariable, description: newVariable }
      ];
      onChange(updatedVariables);
      setNewVariable("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddVariable();
    }
  };

  const handleRemoveVariable = (variableName: string) => {
    const updatedVariables = processedVariables.filter(v => v.name !== variableName);
    onChange(updatedVariables);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newVariable}
          onChange={(e) => setNewVariable(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a variable (e.g., name, email)"
        />
        <Button
          type="button"
          onClick={handleAddVariable}
          disabled={!newVariable || processedVariables.some(v => v.name === newVariable)}
          variant="outline"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {processedVariables.map((variable) => (
          <Badge key={variable.name} variant="secondary" className="flex items-center gap-1">
            {`{{${variable.name}}}`}
            <button
              type="button"
              onClick={() => handleRemoveVariable(variable.name)}
              className="ml-1 rounded-full text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        {processedVariables.length === 0 && (
          <p className="text-sm text-gray-500">
            No variables added yet. Variables allow you to personalize emails with dynamic content.
          </p>
        )}
      </div>
    </div>
  );
};
