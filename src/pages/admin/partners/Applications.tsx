
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplicationsHeader } from "@/components/admin/partners/applications/ApplicationsHeader";
import { ApplicationsTable } from "@/components/admin/partners/applications/ApplicationsTable";
import { ApplicationsPagination } from "@/components/admin/partners/applications/ApplicationsPagination";
import { getStatusBadge } from "@/components/admin/partners/applications/statusUtils";
import { usePartnerApplications } from "@/hooks/admin/usePartnerApplications";

const PartnerApplicationsPage = () => {
  const {
    applications,
    loading,
    currentPage,
    totalPages,
    filter,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    handleFilterChange,
    loadApplications,
  } = usePartnerApplications();

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Partner Applications</CardTitle>
          <CardDescription>
            Review and manage partner program applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationsHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={handleFilterChange}
            onRefresh={loadApplications}
            loading={loading}
          />

          <ApplicationsTable
            applications={applications}
            loading={loading}
            getStatusBadge={getStatusBadge}
          />

          <ApplicationsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default PartnerApplicationsPage;
