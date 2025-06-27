
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase } from 'lucide-react';

const PartnerDashboardHeader: React.FC = () => {
  const { mode, setMode, isPartner } = usePartnerDashboard();
  const navigate = useNavigate();
  
  if (!isPartner) return null;
  
  const handleModeChange = (checked: boolean) => {
    const newMode = checked ? 'partner' : 'buyer';
    setMode(newMode);
    
    // Navigate to the appropriate dashboard based on the selection
    if (newMode === 'partner') {
      navigate('/partner-dashboard', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2">
        {mode === 'partner' ? (
          <Badge variant="outline" className="px-2 py-1 border-primary">
            <Briefcase className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Partner Mode</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="px-2 py-1">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Buyer Mode</span>
          </Badge>
        )}
        <span className="text-sm text-gray-500 hidden xs:inline-block">
          You are currently using the platform as a {mode === 'partner' ? 'partner' : 'buyer'}
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Label htmlFor="dashboard-mode-toggle" className="text-sm font-medium">
          Switch to:
        </Label>
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
          <span className={`text-sm ${mode === 'buyer' ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
            Buyer
          </span>
          <Switch 
            id="dashboard-mode-toggle" 
            checked={mode === 'partner'}
            onCheckedChange={handleModeChange}
          />
          <span className={`text-sm ${mode === 'partner' ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
            Partner
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardHeader;
