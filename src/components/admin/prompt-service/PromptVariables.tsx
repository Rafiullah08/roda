
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";

interface PromptVariablesProps {
  promptVariables: string[];
  onAddVariable: () => void;
  onRemoveVariable: (index: number) => void;
  onUpdateVariable: (index: number, value: string) => void;
}

const PromptVariables: React.FC<PromptVariablesProps> = ({
  promptVariables,
  onAddVariable,
  onRemoveVariable,
  onUpdateVariable,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Prompt Variables</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddVariable}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Variable
        </Button>
      </div>
      
      {promptVariables.map((variableValue, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            placeholder="Variable name (without {{ }})"
            value={variableValue}
            onChange={(e) => onUpdateVariable(index, e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemoveVariable(index)}
            disabled={promptVariables.length === 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PromptVariables;
