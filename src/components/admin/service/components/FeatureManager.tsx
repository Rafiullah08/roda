
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";
import { countWords, FEATURE_MIN_WORDS, FEATURE_MAX_WORDS } from "@/hooks/service/useServiceForm";

interface FeatureManagerProps {
  initialFeatures: string[];
  onChange: (features: string[]) => void;
  minWords?: number;
  maxWords?: number;
}

const FeatureManager: React.FC<FeatureManagerProps> = ({ 
  initialFeatures = [], 
  onChange,
  minWords = FEATURE_MIN_WORDS,
  maxWords = FEATURE_MAX_WORDS 
}) => {
  const [features, setFeatures] = useState<string[]>(initialFeatures);
  const [newFeature, setNewFeature] = useState("");
  const [wordCounts, setWordCounts] = useState<number[]>(
    initialFeatures.map(feature => countWords(feature))
  );
  const [newFeatureWordCount, setNewFeatureWordCount] = useState(0);

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    const updatedFeatures = [...features, newFeature.trim()];
    setFeatures(updatedFeatures);
    setWordCounts([...wordCounts, countWords(newFeature)]);
    setNewFeature("");
    setNewFeatureWordCount(0);
    onChange(updatedFeatures);
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    const updatedWordCounts = wordCounts.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    setWordCounts(updatedWordCounts);
    onChange(updatedFeatures);
  };

  const handleNewFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewFeature(value);
    setNewFeatureWordCount(countWords(value));
  };

  const isValidFeature = newFeatureWordCount >= minWords && newFeatureWordCount <= maxWords;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Service Features</h3>
      <p className="text-sm text-gray-500">
        Add key features of your service. Each feature should be {minWords}-{maxWords} words.
      </p>
      
      {features.length > 0 ? (
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input value={feature} disabled className="flex-grow" />
              <div className="text-xs text-gray-500 min-w-20">
                {wordCounts[index]} words
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFeature(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No features added yet.</p>
      )}

      <div className="pt-4 border-t">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              value={newFeature}
              onChange={handleNewFeatureChange}
              placeholder="Add a new feature"
              className="flex-grow"
            />
            <div className={`text-xs min-w-20 ${
              newFeature && !isValidFeature ? "text-red-500" : "text-gray-500"
            }`}>
              {newFeatureWordCount} / {minWords}-{maxWords} words
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddFeature}
              disabled={!newFeature.trim() || !isValidFeature}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          {newFeature && !isValidFeature && (
            <p className="text-xs text-red-500">
              Feature must be between {minWords} and {maxWords} words
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureManager;
