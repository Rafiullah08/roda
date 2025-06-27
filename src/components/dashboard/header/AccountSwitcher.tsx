
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, Clock } from 'lucide-react';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { useBuyerPartnerApplication } from '@/hooks/useBuyerPartnerApplication';
import { useNavigate, useLocation } from 'react-router-dom';

const AccountSwitcher: React.FC = () => {
  const { mode, setMode, isPartner } = usePartnerDashboard();
  const { canSwitchToPartner, isApplicationInProgress, isLoading } = useBuyerPartnerApplication();
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('AccountSwitcher: Current state:', {
    isPartner,
    canSwitchToPartner,
    isApplicationInProgress,
    mode,
    isLoading,
    currentPath: location.pathname
  });
  
  // Don't show anything while loading
  if (isLoading) {
    console.log('AccountSwitcher: Still loading, not showing switcher');
    return null;
  }
  
  // Show switcher if user can switch to partner mode (approved partner)
  const showSwitcher = canSwitchToPartner;
  
  console.log('AccountSwitcher: Should show switcher:', showSwitcher);
  
  if (!showSwitcher) {
    console.log('AccountSwitcher: Not showing switcher - user cannot switch to partner');
    return null;
  }
  
  const handleModeChange = (checked: boolean) => {
    const newMode = checked ? 'partner' : 'buyer';
    console.log('AccountSwitcher: Switching mode to:', newMode, 'from path:', location.pathname);
    setMode(newMode);
    
    // Only redirect to dashboards if user is already in a dashboard context
    const isDashboardContext = location.pathname.startsWith('/dashboard') || 
                              location.pathname.startsWith('/partner-dashboard');
    
    if (isDashboardContext) {
      // User is in dashboard context, redirect to appropriate dashboard
      if (newMode === 'partner') {
        navigate('/partner-dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      // User is not in dashboard context (e.g., home page), just switch mode without redirecting
      console.log('AccountSwitcher: Switching mode without navigation - staying on current page');
    }
  };

  return (
    <div className="px-3 py-2 border-t border-gray-100">
      <div className="space-y-2">
        {/* Current Mode Badge */}
        <div className="flex items-center justify-center mb-2">
          {mode === 'partner' ? (
            <Badge variant="outline" className="px-2 py-1 border-primary text-primary text-xs">
              <Briefcase className="h-3 w-3 mr-1" />
              Partner Mode
            </Badge>
          ) : (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              <User className="h-3 w-3 mr-1" />
              Buyer Mode
            </Badge>
          )}
        </div>
        
        {/* Application Status for buyers */}
        {isApplicationInProgress && mode === 'buyer' && (
          <div className="flex items-center justify-center mb-2">
            <Badge variant="outline" className="px-2 py-1 border-blue-500 text-blue-700 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Application Pending
            </Badge>
          </div>
        )}
        
        {/* Compact Switch Controls */}
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="account-switcher" className="text-xs text-muted-foreground text-center">
            Switch Account Mode
          </Label>
          <div className="flex items-center justify-center space-x-2 w-full">
            <span className={`text-xs ${mode === 'buyer' ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
              Buyer
            </span>
            <Switch 
              id="account-switcher" 
              checked={mode === 'partner'}
              onCheckedChange={handleModeChange}
            />
            <span className={`text-xs ${mode === 'partner' ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
              Partner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSwitcher;
