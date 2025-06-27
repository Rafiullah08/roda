
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BasicInformationCard from "@/components/dashboard/profile/BasicInformationCard";
import BusinessDetailsCard from "@/components/dashboard/profile/BusinessDetailsCard";
import DocumentsCard from "@/components/dashboard/profile/DocumentsCard";
import ProfileCompletionCard from "@/components/dashboard/profile/ProfileCompletionCard";
import ChangePasswordCard from "@/components/dashboard/profile/ChangePasswordCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfileForm } from "@/hooks/useProfileForm";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const { formData, setFormData, documents, setDocuments, handleSubmit } = useProfileForm();

  // Calculate profile completion sections
  const profileSections = [
    {
      name: "Basic Information",
      isComplete: !!(formData.businessName && formData.ownerName && formData.email && formData.phone),
    },
    {
      name: "Business Details", 
      isComplete: !!(formData.address && formData.city && formData.state && formData.zipCode),
    },
    {
      name: "Documents",
      isComplete: !!(documents.businessLicense && documents.idProof && documents.taxRegistration),
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security & Password</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <BasicInformationCard formData={formData} setFormData={setFormData} />
                  <BusinessDetailsCard formData={formData} setFormData={setFormData} />
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
                <div>
                  <ProfileCompletionCard sections={profileSections} />
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChangePasswordCard />
              <div className="space-y-6">
                {/* Future security settings can go here */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Account Security</h3>
                  <p className="text-sm text-blue-700">
                    Your account is secured with email verification. 
                    Make sure to keep your email address up to date for security notifications.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentsCard documents={documents} setDocuments={setDocuments} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
