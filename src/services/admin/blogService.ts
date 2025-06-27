
import { supabaseAdmin } from "./supabaseAdmin";
import { toast } from "@/hooks/use-toast";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  author_id?: string;
  author_name?: string;
  published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  tags?: string[];
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log('Fetching blog posts...');
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts' as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    console.log('Blog posts fetched successfully:', data?.length || 0, 'posts');
    return (data || []) as unknown as BlogPost[];
  } catch (error: any) {
    console.error('Error in fetchBlogPosts:', error);
    toast({
      title: "Error fetching blog posts",
      description: error.message || "Failed to fetch blog posts",
      variant: "destructive",
    });
    return [];
  }
}

export const fetchBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts' as any)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }

    return data as unknown as BlogPost;
  } catch (error: any) {
    console.error('Error in fetchBlogPostById:', error);
    toast({
      title: "Error fetching blog post",
      description: error.message || "Failed to fetch blog post",
      variant: "destructive",
    });
    return null;
  }
}

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  try {
    const postData = { 
      ...post, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Creating blog post with data:', postData);
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts' as any)
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }

    toast({
      title: "Blog post created",
      description: "Your blog post has been created successfully.",
    });

    return data as unknown as BlogPost;
  } catch (error: any) {
    console.error('Error in createBlogPost:', error);
    toast({
      title: "Error creating blog post",
      description: error.message || "Failed to create blog post. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts' as any)
      .update({
        ...post,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }

    toast({
      title: "Blog post updated",
      description: "Your blog post has been updated successfully.",
    });

    return data as unknown as BlogPost;
  } catch (error: any) {
    console.error('Error in updateBlogPost:', error);
    toast({
      title: "Error updating blog post",
      description: error.message || "Failed to update blog post",
      variant: "destructive",
    });
    return null;
  }
}

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabaseAdmin
      .from('blog_posts' as any)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }

    toast({
      title: "Blog post deleted",
      description: "Your blog post has been deleted successfully.",
    });

    return true;
  } catch (error: any) {
    console.error('Error in deleteBlogPost:', error);
    toast({
      title: "Error deleting blog post",
      description: error.message || "Failed to delete blog post",
      variant: "destructive",
    });
    return false;
  }
}

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
