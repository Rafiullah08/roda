
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const DashboardSellers = () => {
  const sellers = [
    {
      id: 1,
      name: "Emma Wilson",
      totalGigs: 24,
      location: "New York, US",
      avatar: "",
      description: "Expert web developer with 8+ years experience in React, Node.js and MongoDB."
    },
    {
      id: 2,
      name: "James Rodriguez",
      totalGigs: 18,
      location: "London, UK",
      avatar: "",
      description: "Professional graphic designer specializing in brand identity and logo design."
    },
    {
      id: 3,
      name: "Sophie Chen",
      totalGigs: 15,
      location: "Toronto, CA",
      avatar: "",
      description: "SEO specialist with proven track record of improving search rankings."
    },
    {
      id: 4,
      name: "Michael Brown",
      totalGigs: 12,
      location: "Sydney, AU",
      avatar: "",
      description: "Creative content writer with expertise in marketing and technical articles."
    },
    {
      id: 5,
      name: "Sarah Johnson",
      totalGigs: 9,
      location: "Berlin, DE",
      avatar: "",
      description: "Full-stack developer specializing in e-commerce solutions and payment integrations."
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Sellers</CardTitle>
          <div className="flex items-center gap-4">
            <select className="px-2 py-1 border border-gray-300 rounded-md">
              <option value="all">All Categories</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
            </select>
            <input
              type="text"
              placeholder="Search sellers..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sellers.map((seller) => (
              <div 
                key={seller.id} 
                className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={seller.avatar} alt={seller.name} />
                    <AvatarFallback>{getInitials(seller.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{seller.name}</h3>
                    <p className="text-gray-500 text-sm">{seller.location}</p>
                    <p className="text-sm mt-2">{seller.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-600">{seller.totalGigs} gigs available</span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="default" size="sm">View Profile</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardSellers;
