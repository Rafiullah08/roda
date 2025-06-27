
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, RefreshCw, FileText } from "lucide-react";
import { fetchBlogPosts, deleteBlogPost, BlogPost } from "@/services/admin/blogService";
import { supabase } from "@/integrations/supabase/client";
import BlogTable from "@/components/admin/blog/BlogTable";
import BlogFilters from "@/components/admin/blog/BlogFilters";

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load blog posts on component mount
  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Filter posts whenever filters change
  useEffect(() => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(post => {
        if (statusFilter === "published") return post.published;
        if (statusFilter === "draft") return !post.published;
        return true;
      });
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, statusFilter, categoryFilter]);

  const loadBlogPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Loading blog posts...");
      const data = await fetchBlogPosts();
      console.log("Blog posts loaded:", data);
      setPosts(data || []);
    } catch (error) {
      console.error("Failed to load blog posts:", error);
      setError("Failed to load blog posts. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBlogPosts = async () => {
    setIsRefreshing(true);
    try {
      const posts = await fetchBlogPosts();
      setPosts(posts || []);
      toast({
        title: "Success",
        description: "Blog posts refreshed successfully.",
      });
    } catch (error) {
      console.error("Failed to refresh blog posts:", error);
      toast({
        title: "Error",
        description: "Failed to refresh blog posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    
    try {
      const success = await deleteBlogPost(postToDelete);
      if (success) {
        setPosts(posts.filter(post => post.id !== postToDelete));
        toast({
          title: "Success",
          description: "Blog post deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    } finally {
      setPostToDelete(null);
    }
  };

  const handleEdit = (postId: string) => {
    navigate(`/admin/blog/edit/${postId}`);
  };

  const handleView = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post?.slug) {
      window.open(`/blog/${post.slug}`, '_blank');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return (
    <AdminLayout>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Blog Posts</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={refreshBlogPosts} 
              disabled={isRefreshing}
              size="icon"
              className="mr-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button onClick={() => navigate("/admin/blog/create")}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <BlogFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            onClearFilters={handleClearFilters}
          />
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-destructive opacity-50" />
              <h3 className="mt-2 font-medium text-destructive">{error}</h3>
              <Button 
                variant="outline" 
                onClick={loadBlogPosts} 
                className="mt-4"
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Try Again
              </Button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-2 font-medium">No blog posts found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all" ? 
                  "Try adjusting your filters or search terms." : 
                  "Get started by creating a new blog post."}
              </p>
              {posts.length === 0 && (
                <Button 
                  onClick={() => navigate("/admin/blog/create")}
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Blog Post
                </Button>
              )}
            </div>
          ) : (
            <BlogTable
              posts={filteredPosts}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={setPostToDelete}
            />
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default BlogPosts;
