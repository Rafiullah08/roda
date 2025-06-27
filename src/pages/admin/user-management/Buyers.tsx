
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Search, User, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Buyer, getBuyers } from "@/services/admin/buyerManagementService";
import { format } from "date-fns";

const BuyerManagementPage = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalBuyers / ITEMS_PER_PAGE);

  const fetchBuyers = async () => {
    setIsLoading(true);
    try {
      const { buyers, count } = await getBuyers(currentPage, ITEMS_PER_PAGE, searchQuery);
      setBuyers(buyers);
      setTotalBuyers(count);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch buyers. Please try again.",
        variant: "destructive"
      });
      console.error("Error fetching buyers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    fetchBuyers();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Buyer Profiles</h1>
            <p className="text-muted-foreground">
              Manage and monitor buyer accounts and activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search buyers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Contact Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading buyers...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : buyers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No buyers found
                  </TableCell>
                </TableRow>
              ) : (
                buyers.map((buyer) => (
                  <TableRow key={buyer.id}>
                    <TableCell className="font-mono text-xs">
                      {buyer.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {buyer.profile?.business_name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {buyer.profile?.owner_name || buyer.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {buyer.profile?.phone || "N/A"}
                    </TableCell>
                    <TableCell>
                      {buyer.created_at 
                        ? format(new Date(buyer.created_at), 'MMM d, yyyy')
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/buyers/${buyer.id}`}>
                                <User className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/buyers/${buyer.id}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show current page, first, last, and pages around current
                  const isCurrentPage = page === currentPage;
                  const isFirstPage = page === 1;
                  const isLastPage = page === totalPages;
                  const isNearCurrentPage = Math.abs(page - currentPage) <= 1;
                  
                  return isCurrentPage || isFirstPage || isLastPage || isNearCurrentPage;
                })
                .map((page, index, array) => {
                  // Add ellipsis if there are gaps
                  const prevPage = array[index - 1];
                  const showEllipsisBefore = prevPage && page - prevPage > 1;
                  
                  return (
                    <React.Fragment key={page}>
                      {showEllipsisBefore && (
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    </React.Fragment>
                  );
                })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </AdminLayout>
  );
};

export default BuyerManagementPage;
