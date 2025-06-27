
import React from "react";

interface TabProgressIndicatorProps {
  tabs: string[];
  activeTab: string;
}

const TabProgressIndicator = ({ tabs, activeTab }: TabProgressIndicatorProps) => {
  // Calculate completion percentage based on active tab
  const activeIndex = tabs.indexOf(activeTab);
  const completionPercentage = ((activeIndex + 1) / tabs.length) * 100;

  return (
    <div className="w-full bg-gray-100 h-1 mb-2 mt-1">
      <div
        className="bg-primary h-1 transition-all duration-300"
        style={{ width: `${completionPercentage}%` }}
        role="progressbar"
        aria-valuenow={completionPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default TabProgressIndicator;
