
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";

interface TestEmailDialogProps {
  templateName: string;
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  isSending?: boolean;
}

export const TestEmailDialog: React.FC<TestEmailDialogProps> = ({
  templateName,
  isOpen,
  onClose,
  onSend,
  isSending = false,
}) => {
  const [testEmail, setTestEmail] = useState("test@roda.pk");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!testEmail) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    onSend(testEmail);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Test Email</DialogTitle>
          <DialogDescription>
            Send a test version of the "{templateName}" template to verify its appearance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="testEmail">Recipient Email</Label>
          <div className="flex mt-1 items-center">
            <Mail className="h-4 w-4 text-gray-400 absolute ml-3" />
            <Input
              id="testEmail"
              value={testEmail}
              onChange={e => {
                setTestEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter email address"
              className="pl-9"
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSending}>Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSend}
            disabled={isSending}
            className="flex gap-2 items-center"
          >
            {isSending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSending ? "Sending..." : "Send Test"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
