
import React, { useState } from "react";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportAnalyticsData } from "@/services/admin/analyticsService";
import { toast } from "@/hooks/use-toast";

interface ExportReportButtonProps {
  reportType: string;
  dateRange: DateRange;
}

const ExportReportButton: React.FC<ExportReportButtonProps> = ({
  reportType,
  dateRange,
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (format: "csv" | "pdf") => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Date range required",
        description: "Please select a date range to export data",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(format);
    try {
      await exportAnalyticsData(reportType, dateRange, format);
      toast({
        title: "Export successful",
        description: `Your ${format.toUpperCase()} report has been generated and downloaded`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: "Unable to export data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")} disabled={isExporting !== null}>
          {isExporting === "csv" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="mr-2 h-4 w-4" />
          )}
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")} disabled={isExporting !== null}>
          {isExporting === "pdf" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-2 h-4 w-4" />
          )}
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportReportButton;
