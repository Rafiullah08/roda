
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  imageUrl: string;
  category?: string;
  readTime?: string;
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const BlogCard = ({ post, className }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group block hover:no-underline">
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-roda-200",
        className
      )}>
        <div className="aspect-video overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-3">
            {post.category && (
              <Badge variant="outline" className="px-2 py-0.5 text-xs font-medium bg-roda-100 text-roda-700 border-roda-200">
                {post.category}
              </Badge>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{post.date}</span>
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-xl font-bold font-display tracking-tight line-clamp-2 group-hover:text-roda-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </div>
          
          {post.readTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
