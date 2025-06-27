
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Announcement, CreateAnnouncementParams } from "@/services/announcements";
import { format } from "date-fns";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  importance: z.enum(["low", "medium", "high"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  targetUserGroups: z.array(z.string()),
  sendEmail: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSubmit: (data: CreateAnnouncementParams) => void;
  onCancel: () => void;
}

export function AnnouncementForm({ announcement, onSubmit, onCancel }: AnnouncementFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: announcement?.title || "",
      content: announcement?.content || "",
      category: announcement?.category || "general",
      importance: announcement?.importance || "medium",
      startDate: announcement?.startDate ? format(new Date(announcement.startDate), "yyyy-MM-dd'T'HH:mm") : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: announcement?.endDate ? format(new Date(announcement.endDate), "yyyy-MM-dd'T'HH:mm") : "",
      targetUserGroups: announcement?.targetUserGroups || ["all_users"],
      sendEmail: announcement?.sendEmail || false
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      title: values.title,
      content: values.content,
      category: values.category,
      importance: values.importance as "low" | "medium" | "high",
      startDate: values.startDate,
      endDate: values.endDate || null,
      targetUserGroups: values.targetUserGroups,
      sendEmail: values.sendEmail
    });
  };

  const userGroups = [
    { id: "all_users", label: "All Users" },
    { id: "buyers", label: "Buyers" },
    { id: "partners", label: "Partners" },
    { id: "new_users", label: "New Users" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{announcement ? "Edit Announcement" : "Create New Announcement"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter announcement title" {...field} />
                  </FormControl>
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
                      placeholder="Enter announcement content" 
                      className="min-h-[150px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="feature">New Feature</SelectItem>
                        <SelectItem value="promotion">Promotion</SelectItem>
                        <SelectItem value="policy">Policy Update</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="importance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importance</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select importance level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave blank for permanent announcements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="targetUserGroups"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Target User Groups</FormLabel>
                    <FormDescription>
                      Select which user groups should receive this announcement
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {userGroups.map((group) => (
                      <FormField
                        key={group.id}
                        control={form.control}
                        name="targetUserGroups"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={group.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(group.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, group.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== group.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {group.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sendEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Send email notification
                    </FormLabel>
                    <FormDescription>
                      Notify users via email in addition to in-app notification
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {announcement ? "Update Announcement" : "Create Announcement"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
