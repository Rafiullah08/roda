
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash, Shield } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const RolesPage = () => {
  const [newRoleDialogOpen, setNewRoleDialogOpen] = useState(false);
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  
  // Form state
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  // Mock data
  const permissions: Permission[] = [
    // Website Management
    { id: "edit_website", name: "Edit Website", description: "Can edit website content", category: "Website Management" },
    { id: "publish_website", name: "Publish Website", description: "Can publish website changes", category: "Website Management" },
    
    // Service Management
    { id: "view_services", name: "View Services", description: "Can view all services", category: "Service Management" },
    { id: "add_service", name: "Add Services", description: "Can add new services", category: "Service Management" },
    { id: "edit_service", name: "Edit Services", description: "Can edit existing services", category: "Service Management" },
    { id: "delete_service", name: "Delete Services", description: "Can delete services", category: "Service Management" },
    
    // Payment Management
    { id: "view_payments", name: "View Payments", description: "Can view all payments", category: "Payment Management" },
    { id: "process_payments", name: "Process Payments", description: "Can process payments", category: "Payment Management" },
    { id: "refund_payments", name: "Refund Payments", description: "Can issue refunds", category: "Payment Management" },
    
    // User Management
    { id: "view_users", name: "View Users", description: "Can view all users", category: "User Management" },
    { id: "add_user", name: "Add Users", description: "Can invite new users", category: "User Management" },
    { id: "edit_user", name: "Edit Users", description: "Can edit user details", category: "User Management" },
    { id: "delete_user", name: "Delete Users", description: "Can delete users", category: "User Management" },
    
    // Role Management
    { id: "view_roles", name: "View Roles", description: "Can view all roles", category: "Role Management" },
    { id: "manage_roles", name: "Manage Roles", description: "Can manage roles and permissions", category: "Role Management" },
    
    // Support Management
    { id: "view_tickets", name: "View Tickets", description: "Can view support tickets", category: "Support Management" },
    { id: "reply_tickets", name: "Reply to Tickets", description: "Can reply to support tickets", category: "Support Management" },
    { id: "close_tickets", name: "Close Tickets", description: "Can close support tickets", category: "Support Management" },
  ];
  
  const roles: Role[] = [
    {
      id: "admin",
      name: "Admin",
      description: "Full access to all features",
      userCount: 2,
      permissions: permissions.map(p => p.id),
    },
    {
      id: "payment_manager",
      name: "Payment Manager",
      description: "Manage payment operations",
      userCount: 3,
      permissions: ["view_payments", "process_payments", "refund_payments"],
    },
    {
      id: "customer_support",
      name: "Customer Support",
      description: "Handle customer inquiries and issues",
      userCount: 4,
      permissions: ["view_tickets", "reply_tickets", "close_tickets", "view_users"],
    },
    {
      id: "service_manager",
      name: "Service Manager",
      description: "Manage services and offerings",
      userCount: 2,
      permissions: ["view_services", "add_service", "edit_service", "delete_service"],
    },
    {
      id: "website_manager",
      name: "Website Manager",
      description: "Manage website content and layout",
      userCount: 1,
      permissions: ["edit_website", "publish_website"],
    },
  ];

  // Group permissions by category
  const permissionsByCategory = permissions.reduce((acc: Record<string, Permission[]>, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});
  
  const handleCreateRole = () => {
    // Placeholder for future implementation with Supabase
    toast({
      title: "Role created",
      description: `${roleName} role has been created successfully.`,
    });
    
    resetFormAndClose();
  };
  
  const handleUpdateRole = () => {
    // Placeholder for future implementation with Supabase
    toast({
      title: "Role updated",
      description: `${editingRole?.name} role has been updated successfully.`,
    });
    
    resetFormAndClose();
  };
  
  const handleDeleteRole = () => {
    if (!deletingRole) return;
    
    // Placeholder for future implementation with Supabase
    toast({
      title: "Role deleted",
      description: `${deletingRole.name} role has been deleted successfully.`,
    });
    
    setDeleteDialogOpen(false);
    setDeletingRole(null);
  };
  
  const resetFormAndClose = () => {
    setRoleName("");
    setRoleDescription("");
    setSelectedPermissions([]);
    setEditingRole(null);
    setNewRoleDialogOpen(false);
    setEditRoleDialogOpen(false);
  };
  
  const openEditRoleDialog = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions([...role.permissions]);
    setEditRoleDialogOpen(true);
  };
  
  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prevState => 
      prevState.includes(permissionId)
        ? prevState.filter(id => id !== permissionId)
        : [...prevState, permissionId]
    );
  };
  
  const isPermissionSelected = (permissionId: string) => {
    return selectedPermissions.includes(permissionId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Role Management</h1>
          
          <Dialog open={newRoleDialogOpen} onOpenChange={setNewRoleDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role and its permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="role-name" className="text-sm font-medium">
                    Role Name
                  </label>
                  <Input
                    id="role-name"
                    placeholder="e.g., Content Manager"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input
                    id="role-description"
                    placeholder="Describe the role's purpose"
                    value={roleDescription}
                    onChange={e => setRoleDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Permissions</h4>
                  
                  {Object.entries(permissionsByCategory).map(([category, perms]) => (
                    <div key={category} className="space-y-2">
                      <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {perms.map(permission => (
                          <div key={permission.id} className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                            <div>
                              <p className="text-sm font-medium">{permission.name}</p>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                            <Switch
                              checked={isPermissionSelected(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetFormAndClose}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRole} disabled={!roleName}>
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {roles.map(role => (
            <Card key={role.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-purple-500" /> {role.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role.description}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openEditRoleDialog(role)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit role</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setDeletingRole(role);
                      setDeleteDialogOpen(true);
                    }}
                    disabled={role.id === "admin"} // Prevent deleting the admin role
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete role</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {role.userCount} {role.userCount === 1 ? "user" : "users"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {role.permissions.length} {role.permissions.length === 1 ? "permission" : "permissions"}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Key Permissions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.slice(0, 5).map(permId => {
                      const permission = permissions.find(p => p.id === permId);
                      return permission ? (
                        <Badge key={permission.id} variant="secondary" className="text-xs">
                          {permission.name}
                        </Badge>
                      ) : null;
                    })}
                    {role.permissions.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{role.permissions.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map(permission => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">{permission.name}</TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{permission.category}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Role Dialog */}
      <Dialog open={editRoleDialogOpen} onOpenChange={setEditRoleDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
            <DialogDescription>
              Update this role's details and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-role-name" className="text-sm font-medium">
                Role Name
              </label>
              <Input
                id="edit-role-name"
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
                disabled={editingRole?.id === "admin"} // Prevent renaming the admin role
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-role-description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="edit-role-description"
                value={roleDescription}
                onChange={e => setRoleDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Permissions</h4>
              
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                <div key={category} className="space-y-2">
                  <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {perms.map(permission => (
                      <div key={permission.id} className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                        <div>
                          <p className="text-sm font-medium">{permission.name}</p>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                        <Switch
                          checked={isPermissionSelected(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                          disabled={editingRole?.id === "admin"} // Admin role always has all permissions
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetFormAndClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Role Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {deletingRole?.name} role?
              {deletingRole && deletingRole.userCount > 0 && (
                <span className="text-red-500 font-medium block mt-2">
                  Warning: {deletingRole.userCount} users are currently assigned this role.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRole}>
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default RolesPage;
