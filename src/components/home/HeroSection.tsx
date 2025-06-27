
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/service-management";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { categories } = useCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handlePopularSearch = (term: string) => {
    navigate(`/services?search=${encodeURIComponent(term)}`);
  };

  // Get first 3 categories for popular searches
  const popularCategories = categories.slice(0, 3);

  return (
    <section className="bg-gradient-to-r from-roda-700 to-roda-500 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Professional Services for Your Business Needs
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              From design to development, we deliver top-quality services to help your business grow.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" className="bg-white text-roda-600 hover:bg-gray-100 hover:text-roda-700">
                  Explore Services
                </Button>
              </Link>
              <Link to="/quote-request">
                <Button size="lg" variant="outline" className="border-white hover:bg-white text-white hover:text-roda-600">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-roda-600 font-semibold text-lg mb-4">Search for Services</h3>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="What service are you looking for?" 
                    className="pl-10 h-12 text-gray-900 placeholder:text-gray-500" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                  <Search className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                </div>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Popular:</span>
                {popularCategories.map((category) => (
                  <Button 
                    key={category.id}
                    variant="link" 
                    size="sm" 
                    className="text-roda-500 p-0 h-auto"
                    onClick={() => handlePopularSearch(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
