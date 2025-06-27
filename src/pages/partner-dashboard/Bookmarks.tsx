
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PartnerDashboardLayout from "@/components/layout/PartnerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useServiceData } from "@/hooks/service/useServiceData";
import { Service } from "@/types/service";
import { Bookmark, ExternalLink, Search } from "lucide-react";

const PartnerBookmarks = () => {
  const navigate = useNavigate();
  const { bookmarks, isLoading, toggleBookmark } = useBookmarks();
  const { services } = useServiceData();
  const [bookmarkedServices, setBookmarkedServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get all categories from services
  const categories = services
    ? Array.from(new Set(services.map(service => service.category)))
    : [];

  // Filter bookmarked services
  useEffect(() => {
    if (services && services.length > 0 && bookmarks && bookmarks.length > 0) {
      const bookmarkedServiceIds = bookmarks.map(bookmark => bookmark.service_id);
      const filteredServices = services.filter(service => bookmarkedServiceIds.includes(service.id));
      setBookmarkedServices(filteredServices);
    } else {
      setBookmarkedServices([]);
    }
  }, [services, bookmarks]);

  // Apply filters
  const filteredBookmarks = bookmarkedServices.filter(service => {
    const matchesSearch = searchTerm === "" || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
      service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredBookmarks.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredBookmarks.length / itemsPerPage);

  const handleRemoveBookmark = (serviceId: string, serviceName: string) => {
    toggleBookmark(serviceId, serviceName);
  };

  const handleViewService = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price}`;
  };

  const LoadingState = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-16 w-16 rounded" />
          <div className="flex-1">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium">No bookmarks yet</h3>
      <p className="text-gray-500 mb-6">Browse services and bookmark them for later reference</p>
      <Button onClick={() => navigate('/services')}>Browse Services</Button>
    </div>
  );

  return (
    <PartnerDashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bookmarked Services</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-1.5 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState />
          ) : currentItems.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((service) => (
                    <TableRow key={service.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-gray-100 flex-shrink-0">
                            {service.image_url && (
                              <img
                                src={service.image_url}
                                alt={service.title}
                                className="h-10 w-10 rounded object-cover"
                              />
                            )}
                          </div>
                          <div className="font-medium">{service.title}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{service.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatPrice(service.price)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge 
                          variant="outline" 
                          className={service.is_free ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}
                        >
                          {service.is_free ? "Free" : "Paid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewService(service.id)}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveBookmark(service.id, service.title)}
                          >
                            <Bookmark className="h-4 w-4 fill-red-600 mr-1" /> Unbookmark
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="mt-6 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i} className="hidden md:inline-flex">
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </PartnerDashboardLayout>
  );
};

export default PartnerBookmarks;
