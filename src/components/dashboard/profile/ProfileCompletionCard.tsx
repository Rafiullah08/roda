
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileSection {
  name: string;
  isComplete: boolean;
  fields?: string[];
}

interface ProfileCompletionCardProps {
  sections: ProfileSection[];
  onSectionClick?: (sectionName: string) => void;
}

const ProfileCompletionCard = ({ sections, onSectionClick }: ProfileCompletionCardProps) => {
  const completedSections = sections.filter(section => section.isComplete).length;
  const completionPercentage = Math.round((completedSections / sections.length) * 100);
  
  // Filter incomplete sections
  const incompleteSections = sections.filter(section => !section.isComplete);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {completionPercentage}% Complete
              </span>
              <span className="text-sm font-medium">
                {completedSections}/{sections.length} Sections
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {incompleteSections.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3">Sections to complete:</h4>
              <div className="space-y-3">
                {incompleteSections.map((section) => (
                  <div key={section.name} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">{section.name}</span>
                    </div>
                    {onSectionClick && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSectionClick(section.name)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
