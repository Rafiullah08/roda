
import React from "react";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { BlogPost } from "@/services/admin/blogService";

interface BlogTableProps {
  posts: BlogPost[];
  onEdit: (postId: string) => void;
  onView: (postId: string) => void;
  onDelete: (postId: string) => void;
}

const BlogTable = ({ posts, onEdit, onView, onDelete }: BlogTableProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published Date</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium max-w-xs">
                <div className="truncate" title={post.title}>
                  {post.title}
                </div>
                {post.excerpt && (
                  <div className="text-sm text-muted-foreground truncate mt-1" title={post.excerpt}>
                    {post.excerpt}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {post.author_name || "Unknown"}
              </TableCell>
              <TableCell>
                {post.category ? (
                  <Badge variant="outline">{post.category}</Badge>
                ) : (
                  <span className="text-muted-foreground">Uncategorized</span>
                )}
              </TableCell>
              <TableCell>
                {post.published ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                    Published
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800">
                    Draft
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {formatDate(post.published_at)}
              </TableCell>
              <TableCell>
                {formatDate(post.created_at)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(post.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {post.published && (
                      <DropdownMenuItem onClick={() => onView(post.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Live
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      className="text-red-600" 
                      onClick={() => onDelete(post.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogTable;
