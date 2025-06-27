
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PartnerDashboardProvider } from "./contexts/PartnerDashboardContext";
import LiveChatButton from "./components/chat/LiveChatButton";
import Index from "./pages/Index";
import Services from "./pages/services";
import ServiceDetail from "./pages/ServiceDetail";
import QuoteRequest from "./pages/QuoteRequest";
import FreeServiceRequest from "./pages/FreeServiceRequest";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyResetCode from "./pages/auth/VerifyResetCode";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import CookieConsent from "./components/CookieConsent";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/dashboard/UserProfile";
import DashboardPurchases from "./pages/dashboard/DashboardPurchases";
import DashboardSellers from "./pages/dashboard/DashboardSellers";
import DashboardFavourites from "./pages/dashboard/DashboardFavourites";
import DashboardWallet from "./pages/dashboard/DashboardWallet";
import DashboardReviews from "./pages/dashboard/DashboardReviews";
import DashboardMessages from "./pages/dashboard/DashboardMessages";
import DashboardNotifications from "./pages/dashboard/DashboardNotifications";
import DashboardTransactions from "./pages/dashboard/DashboardTransactions";
import PrivateRoute from "./components/PrivateRoute";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PartnerProfile from "./pages/partners/PartnerProfile";
import QualityControl from "./pages/QualityControl";
import ConsultingAdvisory from "./pages/ConsultingAdvisory";
import ComplianceDocumentation from "./pages/ComplianceDocumentation";
import TalentIntegration from "./pages/TalentIntegration";
import ProductDevelopment from "./pages/ProductDevelopment";
import DigitalProjectManagement from "./pages/DigitalProjectManagement";
import BusinessServices from "./pages/BusinessServices";
import IndividualServices from "./pages/IndividualServices";
import Documentation from "./pages/Documentation";

// Partner Dashboard imports
import BecomePartnerPage from "./pages/partners/BecomePartner";
import PartnerApplicationPage from "./pages/partners/PartnerApplication";
import PartnerDashboard from "./pages/partner-dashboard/PartnerDashboard";
import PartnerProfilePage from "./pages/partner-dashboard/Profile";
import ServiceSelection from "./pages/partner-dashboard/ServiceSelection";
import TrialServices from "./pages/partner-dashboard/TrialServices";
import FreeServices from "./pages/partner-dashboard/FreeServices";
import MyServices from "./pages/partner-dashboard/MyServices";
import PartnerOrders from "./pages/partner-dashboard/Orders";
import PartnerAssignments from "./pages/partner-dashboard/Assignments";
import PartnerBookmarks from "./pages/partner-dashboard/Bookmarks";
import PartnerReviews from "./pages/partner-dashboard/Reviews";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAnalyticsDashboard from "./pages/admin/analytics/Dashboard";

// Email Management imports
import EmailTemplatesPage from "./pages/admin/email/Templates";
import TemplateLibraryPage from "./pages/admin/email/Templates/TemplateLibrary";
import EmailLogsPage from "./pages/admin/email/Logs";
import EmailSettingsPage from "./pages/admin/email/Settings";

// Newsletter Management imports
import NewslettersPage from "./pages/admin/newsletters/Newsletters";

// Announcements Management imports
import AnnouncementsPage from "./pages/admin/announcements/Announcements";

// Service Management imports
import ServicesManagementPage from "./pages/admin/service-management/Services";
import CreateServicePage from "./pages/admin/service-management/CreateService";
import CreatePromptService from "./pages/admin/service-management/CreatePromptService";
import EditServicePage from "./pages/admin/service-management/EditService";

// User Management imports
import UsersPage from "./pages/admin/Users";
import InviteUserPage from "./pages/admin/InviteUser";
import RolesPage from "./pages/admin/Roles";

// Buyer Management imports
import BuyerManagementPage from "./pages/admin/user-management/Buyers";
import BuyerProfilePage from "./pages/admin/user-management/BuyerProfile";

// Partner Management imports
import PartnerLeadsPage from "./pages/admin/partners/PartnerLeads";
import PartnerApplicationsPage from "./pages/admin/partners/Applications";
import PartnerApplicationDetailPage from "./pages/admin/partners/ApplicationDetail";
import PartnerDirectoryPage from "./pages/admin/partners/Directory";
import PartnerDetailPage from "./pages/admin/partners/PartnerDetail";
import PartnerAssignmentsPage from "./pages/admin/partners/Assignments";
import PartnerMonitoringPage from "./pages/admin/partners/Monitoring";

import React from "react";

function App() {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <PartnerDashboardProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/quality-control" element={<QualityControl />} />
                <Route path="/consulting-advisory" element={<ConsultingAdvisory />} />
                <Route path="/compliance-documentation" element={<ComplianceDocumentation />} />
                <Route path="/talent-integration" element={<TalentIntegration />} />
                <Route path="/quote-request" element={<QuoteRequest />} />
                <Route path="/free-service" element={<FreeServiceRequest />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/verify-code" element={<VerifyResetCode />} />
                <Route path="/auth/verify-reset-code" element={<VerifyResetCode />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/documentation" element={<Documentation />} />
                
                {/* Blog Routes */}
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/support" element={<Support />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                
                {/* Partner Routes */}
                <Route path="/become-partner" element={<BecomePartnerPage />} />
                <Route path="/partner-application" element={<PartnerApplicationPage />} />
                <Route path="/partners/:id" element={<PartnerProfile />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/dashboard/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/dashboard/settings" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/dashboard/purchases" element={<PrivateRoute><DashboardPurchases /></PrivateRoute>} />
                <Route path="/dashboard/sellers" element={<PrivateRoute><DashboardSellers /></PrivateRoute>} />
                <Route path="/dashboard/favourites" element={<PrivateRoute><DashboardFavourites /></PrivateRoute>} />
                <Route path="/dashboard/wallet" element={<PrivateRoute><DashboardWallet /></PrivateRoute>} />
                <Route path="/dashboard/reviews" element={<PrivateRoute><DashboardReviews /></PrivateRoute>} />
                <Route path="/dashboard/messages" element={<PrivateRoute><DashboardMessages /></PrivateRoute>} />
                <Route path="/dashboard/notifications" element={<PrivateRoute><DashboardNotifications /></PrivateRoute>} />
                <Route path="/dashboard/transactions" element={<PrivateRoute><DashboardTransactions /></PrivateRoute>} />
                
                {/* Partner Dashboard Routes */}
                <Route path="/partner-dashboard" element={<PrivateRoute><PartnerDashboard /></PrivateRoute>} />
                <Route path="/partner-dashboard/profile" element={<PrivateRoute><PartnerProfilePage /></PrivateRoute>} />
                <Route path="/partner-dashboard/services" element={<PrivateRoute><ServiceSelection /></PrivateRoute>} />
                <Route path="/partner-dashboard/trials" element={<PrivateRoute><TrialServices /></PrivateRoute>} />
                <Route path="/partner-dashboard/free-services" element={<PrivateRoute><FreeServices /></PrivateRoute>} />
                <Route path="/partner-dashboard/my-services" element={<PrivateRoute><MyServices /></PrivateRoute>} />
                <Route path="/partner-dashboard/orders" element={<PrivateRoute><PartnerOrders /></PrivateRoute>} />
                <Route path="/partner-dashboard/assignments" element={<PrivateRoute><PartnerAssignments /></PrivateRoute>} />
                <Route path="/partner-dashboard/bookmarks" element={<PrivateRoute><PartnerBookmarks /></PrivateRoute>} />
                <Route path="/partner-dashboard/reviews" element={<PrivateRoute><PartnerReviews /></PrivateRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsDashboard />} />
                
                {/* Email Management */}
                <Route path="/admin/email/templates" element={<EmailTemplatesPage />} />
                <Route path="/admin/email/templates/library" element={<TemplateLibraryPage />} />
                <Route path="/admin/email/logs" element={<EmailLogsPage />} />
                <Route path="/admin/email/settings" element={<EmailSettingsPage />} />
                
                {/* Newsletter Management */}
                <Route path="/admin/newsletters" element={<NewslettersPage />} />
                
                {/* Announcements Management */}
                <Route path="/admin/announcements" element={<AnnouncementsPage />} />
                
                {/* Legacy Services Route - Redirect to new service management */}
                <Route path="/admin/services" element={<Navigate to="/admin/service-management" replace />} />
                
                {/* Service Management Routes */}
                <Route path="/admin/service-management" element={<ServicesManagementPage />} />
                <Route path="/admin/service-management/create" element={<CreateServicePage />} />
                <Route path="/admin/service-management/create-prompt" element={<CreatePromptService />} />
                <Route path="/admin/service-management/edit/:id" element={<EditServicePage />} />
                
                {/* User Management Routes */}
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/users/invite" element={<InviteUserPage />} />
                <Route path="/admin/roles" element={<RolesPage />} />
                
                {/* Buyer Management Routes */}
                <Route path="/admin/buyers" element={<BuyerManagementPage />} />
                <Route path="/admin/buyers/:id" element={<BuyerProfilePage />} />
                
                {/* Partner Management Routes */}
                <Route path="/admin/partners" element={<Navigate to="/admin/partners/applications" replace />} />
                <Route path="/admin/partners/leads" element={<PartnerLeadsPage />} />
                <Route path="/admin/partners/applications" element={<PartnerApplicationsPage />} />
                <Route path="/admin/partners/applications/:id" element={<PartnerApplicationDetailPage />} />
                <Route path="/admin/partners/directory" element={<PartnerDirectoryPage />} />
                <Route path="/admin/partners/directory/:id" element={<PartnerDetailPage />} />
                <Route path="/admin/partners/assignments" element={<PartnerAssignmentsPage />} />
                <Route path="/admin/partners/monitoring" element={<PartnerMonitoringPage />} />
                
                <Route path="/product-development" element={<ProductDevelopment />} />
                <Route path="/digital-project-management" element={<DigitalProjectManagement />} />
                <Route path="/business-services" element={<BusinessServices />} />
                
                <Route path="/individual-services" element={<IndividualServices />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
              <LiveChatButton />
            </PartnerDashboardProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
