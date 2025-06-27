
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterToggleProps {
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (value: boolean) => void;
}

export const FilterToggle = ({ isMobileFilterOpen, setIsMobileFilterOpen }: FilterToggleProps) => {
  return (
    <Button 
      type="button" 
      variant="outline" 
      className="md:hidden flex items-center gap-2 h-12"
      onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
    >
      <Filter className="h-4 w-4" />
      Filters
      <ChevronDown className={`h-4 w-4 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
    </Button>
  );
};
