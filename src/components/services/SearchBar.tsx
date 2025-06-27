
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }: SearchBarProps) => {
  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search for services..."
          className="pl-10 h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
      </div>
      <Button type="submit" className="bg-roda-500 hover:bg-roda-600 h-12">
        Search
      </Button>
    </form>
  );
};
