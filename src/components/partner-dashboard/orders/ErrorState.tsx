
import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorState: React.FC = () => {
  return (
    <div className="text-center text-red-500 py-6">
      <AlertCircle className="h-8 w-8 mx-auto mb-2" />
      <p>Failed to load orders. Please try again.</p>
    </div>
  );
};

export default ErrorState;
