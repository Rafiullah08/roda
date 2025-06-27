
import { useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import TemplatesContainer from "@/components/admin/email/templates/TemplatesContainer";

const EmailTemplatesPage = () => {
  // Use effect for any page-level initialization if needed in the future
  useEffect(() => {
    // Page initialization logic can go here if needed
    document.title = "Email Templates - Admin Dashboard";
  }, []);

  return (
    <AdminLayout>
      <TemplatesContainer />
    </AdminLayout>
  );
};

export default EmailTemplatesPage;
