
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Partner } from "@/types/partner";
import PartnerOverviewTab from "./PartnerOverviewTab";
import PartnerApplicationTab from "./PartnerApplicationTab";
import PartnerExpertiseTab from "./PartnerExpertiseTab";
import PartnerAssignmentsTab from "./PartnerAssignmentsTab";
import PartnerTrialServicesTab from "./PartnerTrialServicesTab";

interface PartnerDetailTabsProps {
  partner: Partner;
  onStatusChange: () => void;
}

const PartnerDetailTabs = ({ partner, onStatusChange }: PartnerDetailTabsProps) => {
  // Show different tabs based on partner status
  const showTrialTab = ['screening', 'service_selection', 'trial_period', 'approved'].includes(partner.status);
  const showExpertiseTab = ['service_selection', 'trial_period', 'approved'].includes(partner.status);
  const showAssignmentsTab = ['approved'].includes(partner.status);

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="application">Application</TabsTrigger>
        {showTrialTab && <TabsTrigger value="trials">Trial Services</TabsTrigger>}
        {showExpertiseTab && <TabsTrigger value="expertise">Expertise</TabsTrigger>}
        {showAssignmentsTab && <TabsTrigger value="assignments">Assignments</TabsTrigger>}
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <PartnerOverviewTab partner={partner} />
      </TabsContent>

      <TabsContent value="application" className="space-y-6">
        <PartnerApplicationTab partner={partner} />
      </TabsContent>

      {showTrialTab && (
        <TabsContent value="trials" className="space-y-6">
          <PartnerTrialServicesTab partner={partner} onStatusChange={onStatusChange} />
        </TabsContent>
      )}

      {showExpertiseTab && (
        <TabsContent value="expertise" className="space-y-6">
          <PartnerExpertiseTab partner={partner} />
        </TabsContent>
      )}

      {showAssignmentsTab && (
        <TabsContent value="assignments" className="space-y-6">
          <PartnerAssignmentsTab partner={partner} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default PartnerDetailTabs;
