
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/service';
import { RelatedServicesResult } from './types';

export const useRelatedServices = (
  serviceId: string | null,
  category: string | null
): RelatedServicesResult => {
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedServices = async () => {
      console.log('Fetching related services for:', { serviceId, category });
      
      if (!serviceId || !category) {
        console.log('Missing serviceId or category, skipping fetch');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // First try exact category match - limit to 4 as requested
        let { data, error: fetchError } = await supabase
          .from('services')
          .select('*')
          .eq('category', category)
          .eq('status', 'active')
          .neq('id', serviceId)
          .limit(4);

        // If no exact matches, try case-insensitive search
        if (!fetchError && (!data || data.length === 0)) {
          console.log('No exact category matches, trying case-insensitive search');
          const result = await supabase
            .from('services')
            .select('*')
            .ilike('category', `%${category}%`)
            .eq('status', 'active')
            .neq('id', serviceId)
            .limit(4);
          
          data = result.data;
          fetchError = result.error;
        }

        // If still no matches, get any active services except current one
        if (!fetchError && (!data || data.length === 0)) {
          console.log('No category matches found, getting random active services');
          const result = await supabase
            .from('services')
            .select('*')
            .eq('status', 'active')
            .neq('id', serviceId)
            .limit(4);
          
          data = result.data;
          fetchError = result.error;
        }

        if (fetchError) {
          console.error('Error fetching related services:', fetchError);
          throw new Error(`Error fetching related services: ${fetchError.message}`);
        }

        console.log('Related services fetched:', data?.length || 0, 'services');
        
        // Process the services to ensure proper data structure
        const processedServices = (data || []).map(service => ({
          ...service,
          // Ensure required fields have default values
          features: Array.isArray(service.features) ? service.features : [],
          title: service.title || 'Untitled Service',
          description: service.description || 'No description available',
          category: service.category || 'General'
        })) as Service[];

        setRelatedServices(processedServices);
      } catch (err: any) {
        console.error('Related services fetch error:', err);
        setError(err.message || 'Failed to load related services');
        setRelatedServices([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedServices();
  }, [serviceId, category]);

  return { relatedServices, loading, error };
};
