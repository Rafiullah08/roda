
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { BlogPost, createBlogPost, updateBlogPost, generateSlug } from "@/services/admin/blogService";
import { Loader2, Save, X } from "lucide-react";
import { Badge } from "./Badge";

const categories = [
  "News",
  "Tutorials",
  "Case Studies",
  "Product Updates",
  "Industry Insights",
  "Announcements",
  "Uncategorized"
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  featured_image: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  initialData?: BlogPost;
  isEdit?: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      featured_image: initialData?.featured_image || "",
      category: initialData?.category || "Uncategorized",
      tags: initialData?.tags || [],
      published: initialData?.published || false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (isEdit && initialData) {
        // Update existing post
        await updateBlogPost(initialData.id, {
          ...data,
          updated_at: new Date().toISOString(),
          published_at: data.published ? new Date().toISOString() : initialData.published_at,
        });
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        // Create new post
        const newPostData = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          featured_image: data.featured_image,
          category: data.category,
          tags: data.tags,
          published: data.published,
          published_at: data.published ? new Date().toISOString() : undefined,
        };
        
        const newPost = await createBlogPost(newPostData);
        
        if (newPost) {
          toast({
            title: "Success",
            description: "Blog post created successfully",
          });
        }
      }
      
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    
    if (!isEdit || !initialData?.slug) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  };

  // Handle tags input
  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleTagsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      
      const tag = tagsInput.trim();
      if (tag && !form.getValues("tags")?.includes(tag)) {
        const currentTags = form.getValues("tags") || [];
        form.setValue("tags", [...currentTags, tag]);
        setTagsInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter(tag => tag !== tagToRemove)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter post title" 
                    {...field}
                    onChange={handleTitleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="post-url-slug" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be used in the URL of your blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief summary of the post" 
                  className="h-24"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short summary that appears in blog listings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Full blog post content" 
                  className="min-h-[300px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="featured_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || 'Uncategorized'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Tags</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.watch("tags")?.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-primary-50 flex items-center gap-1"
              >
                {tag}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeTag(tag)} 
                />
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add tags (press Enter or comma to add)"
            value={tagsInput}
            onChange={handleTagsInputChange}
            onKeyDown={handleTagsKeyDown}
          />
          <FormDescription>
            Press Enter or comma to add a tag
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish</FormLabel>
                <FormDescription>
                  When enabled, the blog post will be visible on the website.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/blog")}
            disabled={isSubmitting}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? "Update Post" : "Create Post"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;
