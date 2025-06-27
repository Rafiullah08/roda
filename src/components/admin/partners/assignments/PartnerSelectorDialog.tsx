import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, Star, UserCheck } from "lucide-react";
import { ExtendedBadge } from "@/components/ui/badge-extended";
import { toast } from "@/components/ui/use-toast";
import { getPartnersByExpertise, assignPartnerToService } from "@/services/partners";

interface PartnerSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: any;
}

export const PartnerSelectorDialog: React.FC<PartnerSelectorDialogProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  
  // Reset selections when dialog opens with new service
  useEffect(() => {
    if (isOpen && service) {
      setSelectedPartners([]);
      setSearchTerm('');
    }
  }, [isOpen, service]);
  
  // Fetch partners that match the expertise needed for this service
  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners-for-service', service?.id],
    queryFn: () => getPartnersByExpertise(service?.category),
    enabled: !!service?.id
  });
  
  const filteredPartners = partners.filter((partner: any) =>
    partner.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.contact_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTogglePartner = (partnerId: string) => {
    setSelectedPartners(prevSelected =>
      prevSelected.includes(partnerId)
        ? prevSelected.filter(id => id !== partnerId)
        : [...prevSelected, partnerId]
    );
  };

  const handleAssignPartners = async () => {
    if (selectedPartners.length === 0) {
      toast({
        title: "No partners selected",
        description: "Please select at least one partner to assign",
        variant: "destructive",
      });
      return;
    }

    try {
      await Promise.all(
        selectedPartners.map(partnerId => 
          assignPartnerToService(partnerId, service.id)
        )
      );
      
      toast({
        title: "Partners assigned",
        description: `Assigned ${selectedPartners.length} partners to "${service.service_title}"`,
      });
      
      onClose();
    } catch (error) {
      console.error('Error assigning partners:', error);
      toast({
        title: "Assignment failed",
        description: "There was an error assigning partners to this service",
        variant: "destructive",
      });
    }
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Partners to Service</DialogTitle>
          <DialogDescription>
            Select partners to assign to "{service?.service_title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative my-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search partners..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="border rounded-md max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">Loading partners...</TableCell>
                </TableRow>
              ) : filteredPartners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {searchTerm ? "No partners match your search" : "No eligible partners found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPartners.map((partner: any) => (
                  <TableRow key={partner.id} 
                    className={selectedPartners.includes(partner.id) ? "bg-blue-50" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedPartners.includes(partner.id)}
                        onCheckedChange={() => handleTogglePartner(partner.id)}
                        disabled={partner.status !== 'approved'}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{partner.business_name}</div>
                        <div className="text-sm text-gray-500">{partner.contact_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ExtendedBadge variant="outline" className="capitalize">
                        {partner.partner_type}
                      </ExtendedBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{partner.rating || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ExtendedBadge 
                        variant={partner.status === 'approved' ? 'success' : 'secondary'}
                        className="capitalize">
                        {partner.status}
                      </ExtendedBadge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={handleAssignPartners} disabled={selectedPartners.length === 0}>
            <UserCheck className="mr-2 h-4 w-4" />
            Assign {selectedPartners.length} Partners
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
