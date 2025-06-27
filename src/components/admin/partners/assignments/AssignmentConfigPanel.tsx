
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Settings } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { updateAssignmentStrategy } from "@/services/partners";

interface AssignmentConfigPanelProps {
  selectedStrategy: string;
  onStrategyChange: (strategy: string) => void;
}

export const AssignmentConfigPanel: React.FC<AssignmentConfigPanelProps> = ({
  selectedStrategy,
  onStrategyChange
}) => {
  // Save the selected assignment strategy
  const handleSaveStrategy = async () => {
    try {
      await updateAssignmentStrategy(selectedStrategy);
      toast({
        title: "Strategy updated",
        description: `Assignment strategy set to ${selectedStrategy}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update strategy",
        description: "There was an error updating the assignment strategy",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Assignment Strategy</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleSaveStrategy}
          >
            <Settings className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedStrategy} 
          onValueChange={onStrategyChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className={`border rounded-lg p-4 ${selectedStrategy === 'round-robin' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <RadioGroupItem value="round-robin" id="round-robin" className="sr-only" />
            <Label 
              htmlFor="round-robin" 
              className="flex flex-col h-full cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-base">Round Robin</span>
                {selectedStrategy === 'round-robin' && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <p className="text-sm text-gray-500 flex-grow">
                Distributes assignments evenly across all eligible partners, ensuring fair workload distribution.
              </p>
            </Label>
          </div>

          <div className={`border rounded-lg p-4 ${selectedStrategy === 'rating-based' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <RadioGroupItem value="rating-based" id="rating-based" className="sr-only" />
            <Label 
              htmlFor="rating-based" 
              className="flex flex-col h-full cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-base">Rating Based</span>
                {selectedStrategy === 'rating-based' && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <p className="text-sm text-gray-500 flex-grow">
                Prioritizes partners with higher quality ratings and customer satisfaction scores.
              </p>
            </Label>
          </div>

          <div className={`border rounded-lg p-4 ${selectedStrategy === 'combined' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <RadioGroupItem value="combined" id="combined" className="sr-only" />
            <Label 
              htmlFor="combined" 
              className="flex flex-col h-full cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-base">Combined Approach</span>
                {selectedStrategy === 'combined' && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <p className="text-sm text-gray-500 flex-grow">
                Uses a weighted algorithm considering partner ratings, current workload, and response times.
              </p>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
