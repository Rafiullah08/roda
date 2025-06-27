
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search articles...", className }: SearchInputProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 focus:ring-roda-500 focus:border-roda-500 border-gray-200 hover:border-roda-300 transition-colors"
      />
    </div>
  );
};

export default SearchInput;
