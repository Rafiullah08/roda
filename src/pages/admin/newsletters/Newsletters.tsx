
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Mail, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import NewsletterList from "@/components/admin/newsletters/NewsletterList";
import CreateNewsletterDialog from "@/components/admin/newsletters/CreateNewsletterDialog";
import SubscribersList from "@/components/admin/newsletters/SubscribersList";

const NewslettersPage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'newsletters' | 'subscribers'>('newsletters');

  // Fetch newsletter statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['newsletter-stats'],
    queryFn: async () => {
      const [subscribersResult, newslettersResult, sendsResult] = await Promise.all([
        supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact' })
          .eq('is_active', true),
        supabase
          .from('newsletters')
          .select('*', { count: 'exact' }),
        supabase
          .from('newsletter_sends')
          .select('*', { count: 'exact' })
      ]);

      return {
        activeSubscribers: subscribersResult.count || 0,
        totalNewsletters: newslettersResult.count || 0,
        totalSends: sendsResult.count || 0,
      };
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Newsletter Management</h1>
            <p className="text-muted-foreground">
              Manage your newsletter campaigns and subscribers
            </p>
          </div>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Newsletter
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.activeSubscribers || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Users subscribed to newsletters
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Newsletters</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.totalNewsletters || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Created newsletters
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sends</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.totalSends || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Emails sent successfully
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('newsletters')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'newsletters'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Newsletters
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscribers'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Subscribers
          </button>
        </div>

        {/* Content */}
        {activeTab === 'newsletters' ? (
          <NewsletterList />
        ) : (
          <SubscribersList />
        )}

        {/* Create Dialog */}
        <CreateNewsletterDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </div>
    </AdminLayout>
  );
};

export default NewslettersPage;
