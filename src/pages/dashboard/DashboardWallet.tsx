
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CircleDollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const DashboardWallet = () => {
  const walletInfo = {
    balance: "Rs. 1,458.75",
    totalCredit: "Rs. 3,250.00",
    totalDebit: "Rs. 1,791.25",
    withdrawn: "Rs. 0.00"
  };
  
  const transactions = [
    {
      id: "TRX-001",
      date: "2025-04-25",
      type: "Credit",
      description: "Deposit",
      amount: "Rs. 500.00"
    },
    {
      id: "TRX-002",
      date: "2025-04-23",
      type: "Debit",
      description: "Payment for SEO Services",
      amount: "Rs. 200.00"
    },
    {
      id: "TRX-003",
      date: "2025-04-20",
      type: "Credit",
      description: "Refund",
      amount: "Rs. 75.00"
    },
    {
      id: "TRX-004",
      date: "2025-04-18",
      type: "Debit",
      description: "Payment for Logo Design",
      amount: "Rs. 150.00"
    },
    {
      id: "TRX-005",
      date: "2025-04-15",
      type: "Credit",
      description: "Deposit",
      amount: "Rs. 1,000.00"
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{walletInfo.balance}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{walletInfo.totalCredit}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Debits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">{walletInfo.totalDebit}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Withdrawn Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{walletInfo.withdrawn}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <Button>
            <CircleDollarSign className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
          <Button variant="outline">
            Withdraw
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.type === "Credit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span
                            className={transaction.type === "Credit" ? "text-green-600" : "text-red-600"}
                          >
                            {transaction.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[150px] truncate">{transaction.description}</TableCell>
                      <TableCell 
                        className={`text-right ${
                          transaction.type === "Credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "Credit" ? "+" : "-"}{transaction.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardWallet;
