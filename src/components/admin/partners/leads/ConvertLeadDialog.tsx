
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { convertLeadToApplication } from "@/services/partners/partnerLeadService";
import { UserCheck, Mail, Clock, AlertCircle } from "lucide-react";

interface ConvertLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    id: string;
    full_name: string;
    email: string;
    skills: string;
  } | null;
  onSuccess: () => void;
}

export const ConvertLeadDialog: React.FC<ConvertLeadDialogProps> = ({
  isOpen,
  onClose,
  lead,
  onSuccess,
}) => {
  const [isConverting, setIsConverting] = useState(false);
  const [notes, setNotes] = useState("");

  const handleConvert = async () => {
    if (!lead) return;

    setIsConverting(true);

    try {
      console.log("Starting lead conversion for:", lead.id);
      
      // Call the conversion service without providing an admin user ID
      // Let the service handle getting the proper admin user ID
      const result = await convertLeadToApplication(lead.id);

      if (result.success) {
        console.log("Lead conversion successful:", result);
        toast({
          title: "Lead converted successfully!",
          description: `${lead.full_name} has been sent an invitation to complete their partner application.`,
        });
        onSuccess();
        onClose();
        setNotes("");
      } else {
        console.error("Lead conversion failed:", result.error);
        throw new Error(result.error || "Conversion failed");
      }
    } catch (error) {
      console.error("Error converting lead:", error);
      
      let errorMessage = "An error occurred while converting the lead. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Conversion failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-green-600" />
            Convert Lead to Application
          </DialogTitle>
          <DialogDescription>
            Send {lead.full_name} an invitation to complete their partner application.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-gray-900">Lead Details</h4>
            <div className="text-sm text-gray-600">
              <div><strong>Name:</strong> {lead.full_name}</div>
              <div><strong>Email:</strong> {lead.email}</div>
              <div><strong>Skills:</strong> {lead.skills}</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">What happens next:</p>
                <ul className="text-blue-700 mt-1 space-y-1">
                  <li>• An invitation email will be sent to {lead.email}</li>
                  <li>• They'll receive a secure link to complete their application</li>
                  <li>• The invitation expires in 7 days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this conversion..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                This action will mark the lead as "invited" and cannot be undone.
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isConverting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConvert}
            disabled={isConverting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isConverting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
