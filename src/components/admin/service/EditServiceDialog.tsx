
import React from "react";
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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Service } from "@/types/service"; 
import { updateService } from "@/utils/service";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number({
    required_error: "Price is required.",
    invalid_type_error: "Price must be a number.",
  }).min(0, {
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  image_url: z.string().url({
    message: "Image URL must be a valid URL.",
  }).nullable(),
});

export interface EditServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentService: Service | null;
  onSubmit: (data: Partial<Service>) => void;
  isSubmitting?: boolean;
}

export const EditServiceDialog: React.FC<EditServiceDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  currentService,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentService?.title ?? "",
      description: currentService?.description ?? "",
      price: currentService?.price ? Number(currentService?.price) : 0,
      category: currentService?.category ?? "",
      image_url: currentService?.image_url ?? "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!currentService?.id) {
        toast({
          title: "Error",
          description: "Service ID is missing.",
          variant: "destructive",
        });
        return;
      }

      const updatedService = {
        ...values,
        id: currentService.id,
      };

      await updateService(currentService.id, updatedService);

      toast({
        title: "Success",
        description: "Service updated successfully.",
      });

      onSubmit(updatedService as Partial<Service>);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Service</AlertDialogTitle>
          <AlertDialogDescription>
            Edit the details of the service.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Service Name</Label>
                  <FormControl>
                    <Input placeholder="Service Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <Label>Price</Label>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
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
                  <Label>Category</Label>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <Label>Image URL</Label>
                  <FormControl>
                    <Input 
                      placeholder="Image URL" 
                      {...field} 
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value || "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 flex gap-2 items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
