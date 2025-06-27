
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostForm from "@/components/admin/blog/BlogPostForm";

const CreateBlogPost: React.FC = () => {
  return (
    <AdminLayout>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogPostForm />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default CreateBlogPost;
