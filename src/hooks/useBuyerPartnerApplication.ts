
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type ApplicationStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';
type PartnerStatus = 'pending' | 'screening' | 'service_selection' | 'trial_period' | 'approved' | 'rejected' | 'suspended';

interface PartnerApplicationStatus {
  id: string;
  status: ApplicationStatus;
  application_date: string;
  review_date?: string;
  rejection_reason?: string;
  partner: {
    id: string;
    status: PartnerStatus;
    business_name: string;
  };
}

export const useBuyerPartnerApplication = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState<PartnerApplicationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!user) {
        console.log('useBuyerPartnerApplication: No user found');
        setIsLoading(false);
        return;
      }

      try {
        console.log('useBuyerPartnerApplication: Fetching data for user:', user.id, user.email);
        
        // First, check if user has a partner record by user_id
        let { data: partner, error: partnerError } = await supabase
          .from('partners')
          .select('id, status, business_name, created_at, user_id, contact_email')
          .eq('user_id', user.id)
          .maybeSingle();

        if (partnerError) {
          console.error('useBuyerPartnerApplication: Error fetching partner by user_id:', partnerError);
        }

        // If no partner found by user_id, try to find by email
        if (!partner && user.email) {
          console.log('useBuyerPartnerApplication: No partner found by user_id, trying by email:', user.email);
          
          const { data: partnerByEmail, error: emailError } = await supabase
            .from('partners')
            .select('id, status, business_name, created_at, user_id, contact_email')
            .eq('contact_email', user.email)
            .maybeSingle();

          if (emailError) {
            console.error('useBuyerPartnerApplication: Error fetching partner by email:', emailError);
          }

          if (partnerByEmail) {
            console.log('useBuyerPartnerApplication: Partner found by email, linking accounts');
            partner = partnerByEmail;
            
            // Link the partner to the current user if not already linked
            if (!partner.user_id) {
              const { error: updateError } = await supabase
                .from('partners')
                .update({ user_id: user.id })
                .eq('id', partner.id);
              
              if (updateError) {
                console.error('useBuyerPartnerApplication: Error linking partner to user:', updateError);
              } else {
                console.log('useBuyerPartnerApplication: Successfully linked partner to user');
                partner.user_id = user.id;
              }
            }
          }
        }

        if (!partner) {
          console.log('useBuyerPartnerApplication: No partner record found for user');
          setApplication(null);
          setIsLoading(false);
          return;
        }

        console.log('useBuyerPartnerApplication: Partner found:', partner);

        // If partner exists, try to get their application
        const { data: appData, error: appError } = await supabase
          .from('partner_applications')
          .select(`
            id,
            status,
            application_date,
            review_date,
            rejection_reason
          `)
          .eq('partner_id', partner.id)
          .maybeSingle();

        if (appError) {
          console.error('useBuyerPartnerApplication: Error fetching application:', appError);
        }

        // Determine the correct application status based on partner status and application status
        let finalApplicationStatus: ApplicationStatus;
        
        // If partner is rejected, application should be rejected regardless of application status
        if (partner.status === 'rejected') {
          finalApplicationStatus = 'rejected';
        } else if (partner.status === 'approved') {
          finalApplicationStatus = 'approved';
        } else if (appData?.status) {
          finalApplicationStatus = appData.status as ApplicationStatus;
        } else {
          // Default based on partner status
          finalApplicationStatus = partner.status === 'pending' ? 'submitted' : 'under_review';
        }

        // Create application data
        const applicationData: PartnerApplicationStatus = {
          id: appData?.id || 'synthetic',
          status: finalApplicationStatus,
          application_date: appData?.application_date || partner.created_at || new Date().toISOString(),
          review_date: appData?.review_date,
          rejection_reason: appData?.rejection_reason || (partner.status === 'rejected' ? 'Partner account rejected' : undefined),
          partner: {
            id: partner.id,
            status: partner.status as PartnerStatus,
            business_name: partner.business_name
          }
        };

        console.log('useBuyerPartnerApplication: Setting application data:', applicationData);
        setApplication(applicationData);
      } catch (error) {
        console.error('useBuyerPartnerApplication: Error in fetchApplication:', error);
        setApplication(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [user]);

  // User can switch to partner if they have a partner record with approved status
  const canSwitchToPartner = Boolean(application?.partner && application.partner.status === 'approved');

  // Application is in progress if partner exists but is not approved or rejected yet
  const isApplicationInProgress = Boolean(
    application && 
    application.partner.status !== 'approved' && 
    application.partner.status !== 'rejected' &&
    application.status !== 'approved' &&
    application.status !== 'rejected'
  );

  console.log('useBuyerPartnerApplication: Final state:', {
    hasApplication: !!application,
    canSwitchToPartner,
    isApplicationInProgress,
    applicationStatus: application?.status,
    partnerStatus: application?.partner?.status,
    userEmail: user?.email
  });

  return {
    application,
    isLoading,
    canSwitchToPartner,
    isApplicationInProgress,
    hasApplication: !!application
  };
};
