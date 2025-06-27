
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const DashboardTransactions = () => {
  // No demo data - show empty state until real transactions are available
  const transactions: any[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Payment":
        return "text-red-600";
      case "Deposit":
        return "text-green-600";
      case "Refund":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <select className="px-2 py-1 border border-gray-300 rounded-md w-full sm:w-auto">
              <option value="all">All Types</option>
              <option value="payment">Payment</option>
              <option value="deposit">Deposit</option>
              <option value="refund">Refund</option>
            </select>
            <input
              type="text"
              placeholder="Search transactions..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-auto"
            />
          </div>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.date}</TableCell>
                      <TableCell className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                        {transaction.description}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 border rounded-lg">
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-muted-foreground mt-1">
                Your transaction history will appear here once you make payments or deposits.
              </p>
            </div>
          )}
          
          {transactions.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
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
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardTransactions;
