
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostForm from "@/components/admin/blog/BlogPostForm";
import { fetchBlogPostById, BlogPost } from "@/services/admin/blogService";
import { toast } from "@/hooks/use-toast";

const EditBlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!id) {
        navigate("/admin/blog");
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchBlogPostById(id);
        if (!data) {
          toast({
            title: "Error",
            description: "Blog post not found",
            variant: "destructive",
          });
          navigate("/admin/blog");
          return;
        }
        
        setPost(data);
      } catch (error) {
        console.error("Failed to load blog post:", error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
        navigate("/admin/blog");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPost();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          {post && <BlogPostForm initialData={post} isEdit={true} />}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default EditBlogPost;
