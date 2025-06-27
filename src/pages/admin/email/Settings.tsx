
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const generalSettingsSchema = z.object({
  senderName: z.string().min(2, { message: "Sender name must be at least 2 characters." }),
  senderEmail: z.string().email({ message: "Please enter a valid email address." }),
  replyToEmail: z.string().email({ message: "Please enter a valid email address." }),
  emailFooter: z.string().optional(),
  trackOpens: z.boolean().default(true),
  trackClicks: z.boolean().default(true)
});

const deliverySettingsSchema = z.object({
  maxSendRate: z.number().min(1, { message: "Maximum send rate must be at least 1." }),
  bounceHandlingEnabled: z.boolean().default(true),
  autoRetryFailedEmails: z.boolean().default(true),
  retryAttempts: z.number().min(0, { message: "Retry attempts must be at least 0." }),
  retryDelay: z.number().min(1, { message: "Retry delay must be at least 1 minute." })
});

const EmailSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      senderName: "RODA Admin",
      senderEmail: "notifications@roda.pk",
      replyToEmail: "support@roda.pk",
      emailFooter: "© 2025 RODA Inc. All rights reserved.",
      trackOpens: true,
      trackClicks: true
    }
  });

  const deliveryForm = useForm<z.infer<typeof deliverySettingsSchema>>({
    resolver: zodResolver(deliverySettingsSchema),
    defaultValues: {
      maxSendRate: 50,
      bounceHandlingEnabled: true,
      autoRetryFailedEmails: true,
      retryAttempts: 3,
      retryDelay: 5
    }
  });

  const onGeneralSubmit = (values: z.infer<typeof generalSettingsSchema>) => {
    console.log("General settings updated:", values);
    toast({
      title: "Settings Updated",
      description: "Your email general settings have been saved.",
    });
  };

  const onDeliverySubmit = (values: z.infer<typeof deliverySettingsSchema>) => {
    console.log("Delivery settings updated:", values);
    toast({
      title: "Settings Updated",
      description: "Your email delivery settings have been saved.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Email Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Email Settings</CardTitle>
                <CardDescription>
                  Configure your email sender details and tracking preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sender Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={generalForm.control}
                          name="senderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sender Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                This name will appear in the From field of your emails
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={generalForm.control}
                          name="senderEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sender Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                This address will be used to send emails
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={generalForm.control}
                        name="replyToEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reply-To Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Replies to your emails will go to this address
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="emailFooter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Footer</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              This text will appear at the bottom of all emails
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Tracking</h3>
                      <FormField
                        control={generalForm.control}
                        name="trackOpens"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Track Opens</FormLabel>
                              <FormDescription>
                                Track when recipients open your emails
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
                      <FormField
                        control={generalForm.control}
                        name="trackClicks"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Track Clicks</FormLabel>
                              <FormDescription>
                                Track when recipients click links in your emails
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
                    </div>

                    <Button type="submit">Save General Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
                <CardDescription>
                  Configure how emails are delivered and handled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...deliveryForm}>
                  <form onSubmit={deliveryForm.handleSubmit(onDeliverySubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sending Configuration</h3>
                      <FormField
                        control={deliveryForm.control}
                        name="maxSendRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Send Rate</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum emails to send per minute
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Error Handling</h3>
                      <FormField
                        control={deliveryForm.control}
                        name="bounceHandlingEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Bounce Handling</FormLabel>
                              <FormDescription>
                                Automatically manage bounced emails
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
                      <FormField
                        control={deliveryForm.control}
                        name="autoRetryFailedEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Auto-Retry Failed Emails</FormLabel>
                              <FormDescription>
                                Automatically retry sending failed emails
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
                      {deliveryForm.watch("autoRetryFailedEmails") && (
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={deliveryForm.control}
                            name="retryAttempts"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Retry Attempts</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Number of retry attempts
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={deliveryForm.control}
                            name="retryDelay"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Retry Delay (minutes)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Delay between retry attempts
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit">Save Delivery Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default EmailSettingsPage;
