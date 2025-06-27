
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryLabelProps {
  category: string;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CategoryLabel = ({ category, variant = "secondary", size = "md", className }: CategoryLabelProps) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  const variantClasses = {
    default: "bg-roda-500 text-white hover:bg-roda-600",
    outline: "border-roda-200 text-roda-600 hover:bg-roda-50",
    secondary: "bg-roda-100 text-roda-700 hover:bg-roda-200"
  };

  return (
    <Badge 
      variant={variant}
      className={cn(
        "font-medium transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {category}
    </Badge>
  );
};

export default CategoryLabel;
