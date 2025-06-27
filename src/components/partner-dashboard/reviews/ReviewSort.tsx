
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown } from 'lucide-react';

export type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

interface ReviewSortProps {
  onSortChange: (value: SortOption) => void;
  currentSort: SortOption;
}

const ReviewSort = ({ onSortChange, currentSort }: ReviewSortProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Sort by:</span>
      <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">
            <div className="flex items-center gap-2">
              <span>Date</span>
              <ArrowDown size={16} />
            </div>
          </SelectItem>
          <SelectItem value="oldest">
            <div className="flex items-center gap-2">
              <span>Date</span>
              <ArrowUp size={16} />
            </div>
          </SelectItem>
          <SelectItem value="highest">
            <div className="flex items-center gap-2">
              <span>Rating</span>
              <ArrowDown size={16} />
            </div>
          </SelectItem>
          <SelectItem value="lowest">
            <div className="flex items-center gap-2">
              <span>Rating</span>
              <ArrowUp size={16} />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReviewSort;
