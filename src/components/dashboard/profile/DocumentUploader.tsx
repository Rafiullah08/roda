
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Upload } from "lucide-react";

interface DocumentUploaderProps {
  label: string;
  description: string;
  required: boolean;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  label,
  description,
  required,
  file,
  onChange,
  onRemove
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{label}</h3>
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {!file ? (
          <div className="flex-shrink-0">
            <label className="cursor-pointer">
              <div className="flex items-center justify-center h-10 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                <span className="text-sm">Upload</span>
              </div>
              <input 
                type="file" 
                className="sr-only" 
                onChange={onChange} 
                accept="image/png,image/jpeg,application/pdf" 
              />
            </label>
          </div>
        ) : (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
      
      {file && (
        <div className="mt-3 flex items-center p-2 bg-green-50 rounded">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-green-700 truncate flex-1">
            {file.name}
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(file.size / 1024)} KB
          </span>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
