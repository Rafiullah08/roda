
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PreviewNewsletterDialogProps {
  newsletter: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreviewNewsletterDialog = ({ newsletter, open, onOpenChange }: PreviewNewsletterDialogProps) => {
  if (!newsletter) return null;

  const previewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${newsletter.title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .unsubscribe { color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${newsletter.title}</h1>
          </div>
          <div class="content">
            ${newsletter.content}
          </div>
          <div class="footer">
            <p class="unsubscribe">
              You received this email because you subscribed to our newsletter.<br>
              <a href="#" style="color: #666;">Unsubscribe</a> | 
              <a href="#" style="color: #666;">Privacy Policy</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Newsletter Preview</DialogTitle>
          <DialogDescription>
            Subject: {newsletter.subject_line}
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-lg overflow-hidden">
          <iframe
            srcDoc={previewHtml}
            className="w-full h-[500px] border-0"
            title="Newsletter Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewNewsletterDialog;
