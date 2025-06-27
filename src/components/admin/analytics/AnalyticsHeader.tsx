
import React from "react";
import { FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./DateRangePicker";
import { subDays, subMonths } from "date-fns";

interface AnalyticsHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  const setLastDays = (days: number) => {
    onDateRangeChange({
      from: subDays(new Date(), days),
      to: new Date(),
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <FileBarChart className="mr-2 h-6 w-6" />
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive insights on platform performance
        </p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-start sm:items-center">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLastDays(7)}
          >
            Last 7 days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLastDays(30)}
          >
            Last 30 days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              onDateRangeChange({
                from: subMonths(new Date(), 3),
                to: new Date(),
              });
            }}
          >
            Last 3 months
          </Button>
        </div>
        
        <DateRangePicker 
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </div>
  );
};

export default AnalyticsHeader;
