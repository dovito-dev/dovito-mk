
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

export type BrandBrief = {
  id: string;
  brief_title: string;
  company_name: string;
  company_url: string | null;
  extra_instructions: string | null;
  generated_brief: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
};

export const useBrandBriefs = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['briefs', user?.id],
    queryFn: async (): Promise<BrandBrief[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('brand_briefs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching briefs:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });
};

export const useBrandBrief = (id: string | undefined) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['brief', id],
    queryFn: async (): Promise<BrandBrief | null> => {
      if (!user || !id) return null;

      const { data, error } = await supabase
        .from('brand_briefs')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching brief:', error);
        return null;
      }

      return data;
    },
    enabled: !!user && !!id,
  });
};

export const createBrandBrief = async (
  userId: string,
  brief: {
    brief_title?: string;
    company_name: string;
    company_url: string;
    extra_instructions?: string;
  }
): Promise<BrandBrief | null> => {
  try {
    console.log('Creating brief with data:', { userId, brief });
    
    // Prepare the brief data object
    const briefData = {
      user_id: userId,
      brief_title: brief.brief_title || brief.company_name,
      company_name: brief.company_name,
      company_url: brief.company_url,
      extra_instructions: brief.extra_instructions || null,
    };

    console.log('Prepared brief data:', briefData);

    // Insert into brand_briefs table without specifying schema
    const { data, error } = await supabase
      .from('brand_briefs')
      .insert(briefData)
      .select()
      .single();

    if (error) {
      console.error('Supabase insertion error:', error);
      throw error;
    }

    console.log('Successfully created brief:', data);
    return data;
  } catch (error) {
    console.error('Error in createBrandBrief:', error);
    throw error;
  }
};
