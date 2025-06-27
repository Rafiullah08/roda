
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements, Announcement } from "@/services/announcements";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface AnnouncementsListProps {
  onEdit: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
  onCreateNew: () => void;
}

export function AnnouncementsList({ 
  onEdit, 
  onDelete, 
  onCreateNew 
}: AnnouncementsListProps) {
  const { data: announcements, isLoading, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Announcements</h2>
          <Button onClick={onCreateNew} className="flex items-center gap-2">
            <Plus size={16} /> New Announcement
          </Button>
        </div>
        <div className="text-center py-8">Loading announcements...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Announcements</h2>
          <Button onClick={onCreateNew} className="flex items-center gap-2">
            <Plus size={16} /> New Announcement
          </Button>
        </div>
        <div className="text-center py-8 text-red-500">
          Error loading announcements. Please try again.
        </div>
      </Card>
    );
  }

  const getImportanceBadge = (importance: "low" | "medium" | "high") => {
    const colors = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[importance]}`}>
        {importance.charAt(0).toUpperCase() + importance.slice(1)}
      </span>
    );
  };

  const handleEditClick = (announcement: Announcement) => {
    onEdit(announcement);
  };

  const handleDeleteClick = (announcement: Announcement) => {
    onDelete(announcement);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <Button onClick={onCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> New Announcement
        </Button>
      </div>

      {announcements && announcements.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Importance</TableHead>
              <TableHead>Active Period</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell className="font-medium">{announcement.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{announcement.category}</Badge>
                </TableCell>
                <TableCell>{getImportanceBadge(announcement.importance)}</TableCell>
                <TableCell>
                  {new Date(announcement.startDate).toLocaleDateString()} 
                  {announcement.endDate ? ` - ${new Date(announcement.endDate).toLocaleDateString()}` : ' - Ongoing'}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(announcement)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(announcement)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground mb-4">No announcements found</p>
          <Button onClick={onCreateNew} variant="outline">
            Create your first announcement
          </Button>
        </div>
      )}
    </Card>
  );
}
