
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Search, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for template library
const TEMPLATE_CATEGORIES = [
  "Onboarding", "Notifications", "Marketing", "Transactional", "Support"
];

const LIBRARY_TEMPLATES = [
  {
    id: "template-1",
    name: "Welcome Email",
    category: "Onboarding",
    description: "Send to new users after sign up",
    variables: ["user_name", "company_name", "activation_link"],
    preview: "/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png",
  },
  {
    id: "template-2",
    name: "Password Reset",
    category: "Onboarding",
    description: "Send when a user requests a password reset",
    variables: ["user_name", "reset_link", "expiry_time"],
    preview: "/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png",
  },
  {
    id: "template-3",
    name: "Order Confirmation",
    category: "Transactional",
    description: "Send after a successful order",
    variables: ["user_name", "order_id", "order_items", "order_total", "delivery_date"],
    preview: "/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png",
  },
  {
    id: "template-4",
    name: "Monthly Newsletter",
    category: "Marketing",
    description: "Monthly updates and offers",
    variables: ["user_name", "month", "featured_products", "special_offer"],
    preview: "/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png",
  },
  {
    id: "template-5",
    name: "Support Ticket Created",
    category: "Support",
    description: "Confirmation of new support ticket",
    variables: ["user_name", "ticket_id", "ticket_subject", "estimated_response_time"],
    preview: "/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png",
  },
  {
    id: "template-6",
    name: "Appointment Reminder",
    category: "Notifications",
    description: "Reminder for upcoming appointments",
    variables: ["user_name", "appointment_date", "appointment_time", "location"],
    preview: "/lovable-uploads/cac4af9e-934a-4265-832b-bbcdee7fecdd.png",
  },
];

const TemplateLibraryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredTemplates = LIBRARY_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || template.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBackToTemplates = () => {
    navigate("/admin/email/templates");
  };

  const handleImportTemplate = (templateId: string) => {
    // Here you would implement the actual template import logic
    console.log("Importing template:", templateId);
    // After importing, you could navigate back to the templates page
    // navigate("/admin/email/templates");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2" 
              onClick={handleBackToTemplates}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
            <h1 className="text-2xl font-bold">Template Library</h1>
          </div>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Templates</CardTitle>
              <CardDescription>
                Select from our library of pre-designed email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid w-full auto-cols-fr grid-flow-col">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {TEMPLATE_CATEGORIES.map(category => (
                      <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value={activeCategory} className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Template</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="hidden md:table-cell">Variables</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTemplates.map(template => (
                          <TableRow key={template.id}>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">{template.name}</span>
                                <span className="text-sm text-muted-foreground">{template.description}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-slate-100">
                                <Tag className="mr-1 h-3 w-3" /> {template.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {template.variables.slice(0, 3).map((variable, idx) => (
                                  <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700">
                                    {variable}
                                  </Badge>
                                ))}
                                {template.variables.length > 3 && (
                                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                    +{template.variables.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleImportTemplate(template.id)}
                                className="whitespace-nowrap"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Import
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {filteredTemplates.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <p className="text-muted-foreground">
                          No templates found matching your filters. Try adjusting your search criteria.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplateLibraryPage;
