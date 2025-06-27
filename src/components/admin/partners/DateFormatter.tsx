
import React from "react";
import { format } from "date-fns";

interface DateFormatterProps {
  dateString: string | null;
  fallback?: string;
}

const DateFormatter = ({ dateString, fallback = "N/A" }: DateFormatterProps) => {
  if (!dateString) return <span>{fallback}</span>;
  return <span>{format(new Date(dateString), "MMM d, yyyy")}</span>;
};

export default DateFormatter;
