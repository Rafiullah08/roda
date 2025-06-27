
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ShieldCheck, Settings } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Team Members",
      value: 12,
      icon: Users,
      description: "Active team members",
      color: "bg-blue-500",
    },
    {
      title: "User Roles",
      value: 5,
      icon: UserCheck,
      description: "Defined user roles",
      color: "bg-green-500",
    },
    {
      title: "Permission Sets",
      value: 18,
      icon: ShieldCheck,
      description: "Configured permissions",
      color: "bg-purple-500",
    },
    {
      title: "System Settings",
      value: 24,
      icon: Settings,
      description: "Total system settings",
      color: "bg-amber-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "User role updated",
                    user: "John Doe",
                    time: "2 minutes ago",
                  },
                  {
                    action: "New team member invited",
                    user: "Admin",
                    time: "1 hour ago",
                  },
                  {
                    action: "Permission changed",
                    user: "Admin",
                    time: "3 hours ago",
                  },
                  {
                    action: "New role created",
                    user: "Admin",
                    time: "Yesterday",
                  },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between pb-2 border-b border-border last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        By {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Role Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { role: "Admin", count: 2, color: "bg-purple-500" },
                  { role: "Payment Manager", count: 3, color: "bg-blue-500" },
                  { role: "Customer Support", count: 4, color: "bg-green-500" },
                  { role: "Service Manager", count: 2, color: "bg-amber-500" },
                  { role: "Website Manager", count: 1, color: "bg-red-500" },
                ].map((role, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{role.role}</span>
                      <span>{role.count} users</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full ${role.color}`}
                        style={{ width: `${(role.count / 12) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
