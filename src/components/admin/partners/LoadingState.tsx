
import React from "react";
import { Loader } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-2">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
