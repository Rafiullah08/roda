
import { useState, useEffect } from "react";
import { getAllApplications } from "@/services/partners/partnerApplicationService";
import { PartnerApplication } from "@/types/partner";
import { toast } from "@/hooks/use-toast";

export const usePartnerApplications = () => {
  const [applications, setApplications] = useState<Array<PartnerApplication & {partners?: any}>>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const loadApplications = async () => {
    console.log("=== Loading applications from admin panel ===");
    console.log("Current parameters:", { currentPage, limit, filter });
    
    setLoading(true);
    try {
      const filterValue = filter === "all" ? undefined : filter;
      const { applications, count } = await getAllApplications(currentPage, limit, filterValue);
      
      console.log("Admin panel - Loaded applications:", {
        applicationsCount: applications.length,
        totalCount: count,
        firstApplication: applications[0] || "None"
      });
      
      setApplications(applications);
      setTotalPages(Math.ceil(count / limit));
      
      if (applications.length === 0 && count === 0) {
        console.log("No applications found in database");
        toast({
          title: "No applications found",
          description: "There are currently no partner applications in the system.",
        });
      } else {
        console.log(`Successfully loaded ${applications.length} applications`);
      }
      
    } catch (error) {
      console.error("Error fetching applications in admin panel:", error);
      toast({
        title: "Failed to load applications",
        description: "An error occurred while loading partner applications. Please check the console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [currentPage, filter]);

  const filteredApplications = applications.filter(app => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      app.partners?.business_name?.toLowerCase().includes(searchLower) ||
      app.partners?.contact_name?.toLowerCase().includes(searchLower) ||
      app.partners?.contact_email?.toLowerCase().includes(searchLower)
    );
  });

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return {
    applications: filteredApplications,
    loading,
    currentPage,
    totalPages,
    filter,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    handleFilterChange,
    loadApplications,
  };
};
