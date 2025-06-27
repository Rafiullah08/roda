
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  Bell,
  Check,
  ChevronDown,
  Clock,
  Flag,
  Star,
  UserCheck,
  X,
} from "lucide-react";

// Mock data for our charts and metrics
const performanceData = [
  { name: 'Jan', onTime: 82, quality: 87, communication: 91, overall: 86 },
  { name: 'Feb', onTime: 78, quality: 90, communication: 88, overall: 85 },
  { name: 'Mar', onTime: 85, quality: 91, communication: 90, overall: 89 },
  { name: 'Apr', onTime: 90, quality: 92, communication: 93, overall: 92 },
  { name: 'May', onTime: 88, quality: 90, communication: 91, overall: 90 },
];

const serviceDistributionData = [
  { name: 'Web Dev', value: 35 },
  { name: 'Design', value: 25 },
  { name: 'Marketing', value: 18 },
  { name: 'Writing', value: 12 },
  { name: 'Video', value: 10 },
];

const qualityAlertPartners = [
  { id: '1', name: 'Agency Solutions', issues: 'Late deliveries (3)', severity: 'high' },
  { id: '2', name: 'Creative Designs', issues: 'Poor quality reviews (2)', severity: 'medium' },
  { id: '3', name: 'Tech Consult Pro', issues: 'Communication delays', severity: 'low' },
  { id: '4', name: 'Marketing Masters', issues: 'Missed requirements', severity: 'medium' },
];

const topPerformingPartners = [
  { id: '1', name: 'Digital Wizards', rating: 4.9, completions: 47 },
  { id: '2', name: 'Content Kings', rating: 4.8, completions: 52 },
  { id: '3', name: 'Design Experts', rating: 4.8, completions: 31 },
  { id: '4', name: 'Dev Solutions', rating: 4.7, completions: 62 },
];

const PartnerMonitoringPage = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [alertFilter, setAlertFilter] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Partner Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor partner performance, quality, and activity across the platform
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Range:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="365d">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild>
            <Link to="/admin/partners/directory">
              View Partner Directory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+0.2</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">On-time Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 font-medium">-3%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Quality Alerts
            </TabsTrigger>
            <TabsTrigger value="top" className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Top Partners
            </TabsTrigger>
          </TabsList>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Track key partner performance indicators over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="%" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="onTime"
                        name="On-time Delivery"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="quality"
                        name="Quality Score"
                        stroke="#82ca9d"
                      />
                      <Line
                        type="monotone"
                        dataKey="communication"
                        name="Communication"
                        stroke="#ffc658"
                      />
                      <Line
                        type="monotone"
                        dataKey="overall"
                        name="Overall Rating"
                        stroke="#ff8042"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                  <CardDescription>
                    Partner service category breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={serviceDistributionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Partners" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Order Completion Stats</CardTitle>
                  <CardDescription>
                    Partner order completion metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium">Completed On-Time</span>
                        <span className="font-medium text-green-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium">Late Delivery</span>
                        <span className="font-medium text-amber-600">6%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium">Cancelled Orders</span>
                        <span className="font-medium text-red-600">2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium">Average Days to Complete</span>
                        <span className="font-medium">3.2 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Quality Alerts Tab */}
          <TabsContent value="quality" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Quality Alerts</CardTitle>
                  <CardDescription>
                    Partners with potential quality issues
                  </CardDescription>
                </div>
                <div>
                  <Select value={alertFilter} onValueChange={setAlertFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Alerts</SelectItem>
                      <SelectItem value="high">High Severity</SelectItem>
                      <SelectItem value="medium">Medium Severity</SelectItem>
                      <SelectItem value="low">Low Severity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityAlertPartners
                    .filter(p => alertFilter === 'all' || p.severity === alertFilter)
                    .map(partner => (
                      <div key={partner.id} className="border rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <h4 className="font-medium">{partner.name}</h4>
                            <p className="text-sm text-muted-foreground">Issue: {partner.issues}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(partner.severity)}>
                              {partner.severity} priority
                            </Badge>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/admin/partners/directory/${partner.id}`}>
                                View Partner
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-sm font-medium">Delivery Issues</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    Partners with late deliveries
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-sm font-medium">Low Ratings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Partners with ratings under 3.5
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-sm font-medium">Flagged Issues</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Partners with customer complaints
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Top Partners Tab */}
          <TabsContent value="top" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Partners</CardTitle>
                <CardDescription>
                  Partners with the highest ratings and most completed orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingPartners.map((partner, index) => (
                    <div key={partner.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <h4 className="font-medium">
                            {index + 1}. {partner.name}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={`text-sm ${i < partner.rating ? "text-yellow-400" : "text-gray-300"}`}>
                                ★
                              </span>
                            ))}
                            <span className="ml-2 text-sm font-medium">{partner.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm font-medium">{partner.completions} orders</div>
                          <Button size="sm" variant="outline" className="mt-2" asChild>
                            <Link to={`/admin/partners/directory/${partner.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Partner Certification Status</CardTitle>
                <CardDescription>
                  Partner verification and certification metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center border rounded-lg p-4">
                      <UserCheck className="h-8 w-8 text-green-500 mb-2" />
                      <h4 className="text-lg font-bold">42</h4>
                      <p className="text-sm text-center text-muted-foreground">Fully Verified</p>
                    </div>
                    <div className="flex flex-col items-center border rounded-lg p-4">
                      <Clock className="h-8 w-8 text-amber-500 mb-2" />
                      <h4 className="text-lg font-bold">18</h4>
                      <p className="text-sm text-center text-muted-foreground">Pending Verification</p>
                    </div>
                    <div className="flex flex-col items-center border rounded-lg p-4">
                      <Award className="h-8 w-8 text-blue-500 mb-2" />
                      <h4 className="text-lg font-bold">27</h4>
                      <p className="text-sm text-center text-muted-foreground">Certified Partners</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Verification Progress</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                      <span>70% of partners verified</span>
                      <span>Goal: 100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PartnerMonitoringPage;
