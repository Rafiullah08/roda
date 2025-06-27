
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface DesktopFiltersProps {
  categories: Array<{ id: number; name: string; count: number }>;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  priceRangeMinMax: { min: number; max: number };
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  showFreeOnly: boolean;
  setShowFreeOnly: (value: boolean) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  clearFilters: () => void;
}

export const DesktopFilters = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  priceRangeMinMax,
  selectedRating,
  setSelectedRating,
  selectedType,
  setSelectedType,
  showFreeOnly,
  setShowFreeOnly,
  selectedLocation,
  setSelectedLocation,
  clearFilters,
}: DesktopFiltersProps) => {
  return (
    <div className="hidden md:block md:w-1/4">
      <div className="space-y-6">
        {/* Categories Filter */}
        <div>
          <h3 className="text-lg font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => toggleCategory(category.name)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category.name}
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t my-4"></div>

        {/* Free Services Filter */}
        <div>
          <h3 className="text-lg font-medium mb-3">Price Options</h3>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="free-only"
              checked={showFreeOnly}
              onCheckedChange={setShowFreeOnly}
            />
            <Label htmlFor="free-only">Show Free Services Only</Label>
          </div>

          {/* Price Range Filter - hide when showing free only */}
          {!showFreeOnly && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Price Range</h4>
              <Slider
                value={priceRange}
                min={priceRangeMinMax.min}
                max={priceRangeMinMax.max}
                step={Math.max(1, Math.floor(priceRangeMinMax.max / 1000))}
                onValueChange={(value) => setPriceRange(value as number[])}
                className="w-full"
              />
              <div className="flex justify-between">
                <span>Rs. {priceRange[0].toLocaleString()}</span>
                <span>Rs. {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t my-4"></div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-lg font-medium mb-3">Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRating === rating}
                  onCheckedChange={(checked) => setSelectedRating(checked ? rating : null)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center cursor-pointer"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm ml-2">& up</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t my-4"></div>

        {/* Service Type Filter */}
        <div>
          <h3 className="text-lg font-medium mb-3">Type</h3>
          <div className="space-y-2">
            {["Project", "Task"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedType === type}
                  onCheckedChange={(checked) => setSelectedType(checked ? type : null)}
                />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t my-4"></div>

        {/* Service Location Filter */}
        <div>
          <h3 className="text-lg font-medium mb-3">Service Location</h3>
          <div className="space-y-2">
            {["online", "onsite", "hybrid"].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={selectedLocation === location}
                  onCheckedChange={(checked) => setSelectedLocation(checked ? location : null)}
                />
                <label
                  htmlFor={`location-${location}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t my-4"></div>

        {/* Clear Filters Button */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
