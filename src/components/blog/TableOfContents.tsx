
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
  sticky?: boolean;
}

const TableOfContents = ({ content, className, sticky = true }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeItem, setActiveItem] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Parse headings from content
    const headings: TocItem[] = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const title = line.replace(/^#+\s/, '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        if (level <= 3) { // Only show h1, h2, h3
          headings.push({
            id: id + '-' + index,
            title,
            level
          });
        }
      }
    });
    
    setTocItems(headings);
  }, [content]);

  const scrollToHeading = (id: string) => {
    setActiveItem(id);
    // In a real implementation, you'd scroll to the heading
    // For now, we'll just update the active state
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <Card className={cn(
      "w-64 h-fit",
      sticky && "sticky top-8",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <List className="h-4 w-4 text-roda-500" />
            Table of Contents
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-6 w-6 p-0"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="pt-0">
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "block w-full text-left text-sm py-1 px-2 rounded transition-colors hover:bg-roda-50",
                  item.level === 1 && "font-medium",
                  item.level === 2 && "ml-2 text-muted-foreground",
                  item.level === 3 && "ml-4 text-muted-foreground text-xs",
                  activeItem === item.id && "bg-roda-100 text-roda-700"
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </CardContent>
      )}
    </Card>
  );
};

export default TableOfContents;
