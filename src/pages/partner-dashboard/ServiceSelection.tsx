
import React, { useState, useEffect } from 'react';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Info, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock data for services
const mockServices = [
  { id: 1, title: 'Website Development', category: 'Web Development', description: 'Full website development from design to launch', fee: '$45/hr' },
  { id: 2, title: 'Mobile App Development', category: 'App Development', description: 'Native and cross-platform mobile app development', fee: '$50/hr' },
  { id: 3, title: 'Logo Design', category: 'Design', description: 'Professional logo design with multiple revisions', fee: '$80/design' },
  { id: 4, title: 'SEO Optimization', category: 'Marketing', description: 'Search engine optimization to improve rankings', fee: '$30/hr' },
  { id: 5, title: 'Content Writing', category: 'Content', description: 'High-quality blog posts and website content', fee: '$25/hr' },
  { id: 6, title: 'Social Media Management', category: 'Marketing', description: 'Full management of social media accounts', fee: '$35/hr' },
  { id: 7, title: 'Video Editing', category: 'Media', description: 'Professional video editing services', fee: '$40/hr' },
  { id: 8, title: 'E-commerce Development', category: 'Web Development', description: 'Setup and customization of e-commerce platforms', fee: '$55/hr' },
];

const ServiceSelection = () => {
  const { partner } = usePartnerDashboard();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = mockServices.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(mockServices);
    }
  }, [searchTerm]);
  
  if (!partner) {
    return (
      <PartnerDashboardLayout>
        <div className="alert alert-warning">
          You need to be registered as a partner to access this page.
        </div>
      </PartnerDashboardLayout>
    );
  }
  
  if (partner.status !== 'service_selection' && partner.status !== 'trial_period' && partner.status !== 'approved') {
    return (
      <PartnerDashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Service Selection</CardTitle>
            <CardDescription>
              This section is only available after passing the document screening stage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-50 rounded-lg text-yellow-800">
              <p>Your application has not yet reached the service selection stage.</p>
              <p className="mt-2">
                {partner.status === 'pending' && "Your application is currently under initial review."}
                {partner.status === 'screening' && "Please complete the document screening stage first."}
              </p>
            </div>
          </CardContent>
        </Card>
      </PartnerDashboardLayout>
    );
  }
  
  // For trial_period and approved partners, show their selected services as read-only
  const readOnly = partner.status === 'trial_period' || partner.status === 'approved';
  
  const toggleService = (serviceId: number) => {
    if (readOnly) return;
    
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const addService = (serviceId: number) => {
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices(prev => [...prev, serviceId]);
      toast({
        title: "Service Added",
        description: "This service has been added to your profile.",
      });
    } else {
      toast({
        title: "Already Added",
        description: "This service is already in your profile.",
        variant: "destructive"
      });
    }
  };
  
  const handleSubmit = async () => {
    if (selectedServices.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one service to offer.",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Mock submission process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Services Selected",
        description: "Your service selections have been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your selection. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <PartnerDashboardLayout>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>
                {readOnly ? "Your Selected Services" : "Select Services to Offer"}
              </CardTitle>
              <CardDescription>
                {readOnly 
                  ? "These are the services you have selected to offer as a partner." 
                  : "Choose the services you want to provide as a partner."
                }
              </CardDescription>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="text"
                placeholder="Search services..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    {!readOnly && '#'}
                  </TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead className="w-[100px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map(service => (
                    <TableRow 
                      key={service.id} 
                      className={selectedServices.includes(service.id) ? "bg-gray-50" : ""}
                    >
                      <TableCell className="w-[50px]">
                        {readOnly ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Checkbox 
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => toggleService(service.id)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell className="hidden md:table-cell text-gray-500">{service.description}</TableCell>
                      <TableCell>{service.fee}</TableCell>
                      <TableCell className="text-right">
                        {!readOnly && (
                          <Button
                            size="sm"
                            variant={selectedServices.includes(service.id) ? "outline" : "default"}
                            onClick={() => addService(service.id)}
                            className="whitespace-nowrap"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            {selectedServices.includes(service.id) ? "Added" : "Add Service"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No services found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex items-center gap-4">
            {!readOnly && (
              <Button 
                onClick={handleSubmit}
                disabled={selectedServices.length === 0 || submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Selection'}
              </Button>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <Info className="h-4 w-4 mr-2" />
              {readOnly 
                ? "You can request to modify your service offerings by contacting support."
                : "You must select at least one service to offer as a partner."
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </PartnerDashboardLayout>
  );
};

export default ServiceSelection;
