
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

export type BrandBrief = {
  id: string;
  brand_name: string;
  company_name: string;
  company_url: string | null;
  extra_instructions: string | null;
  generated_brief: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
  brief_title?: string | null;
};

export const useBrandBriefs = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['briefs', user?.id],
    queryFn: async (): Promise<BrandBrief[]> => {
      if (!user) return [];

      // Using the any type to bypass TypeScript's strict checking on table names
      // This is necessary because the generated types don't include brand_briefs yet
      const { data, error } = await (supabase as any)
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

      // Using the any type to bypass TypeScript's strict checking on table names
      const { data, error } = await (supabase as any)
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
    brand_name: string;
    company_url: string;
    extra_instructions?: string;
  }
): Promise<BrandBrief | null> => {
  // We'll update the insert operation to not include brief_title directly since it's not in the table
  const { data, error } = await (supabase as any)
    .from('brand_briefs')
    .insert([
      {
        user_id: userId,
        company_name: brief.brand_name, // Map to the correct column name in the database
        brand_name: brief.brand_name,   // Also set brand_name as it exists in the schema
        company_url: brief.company_url,
        extra_instructions: brief.extra_instructions || null,
        // brief_title is not included in the insert as it doesn't exist in the table
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating brief:', error);
    throw error;
  }

  return data;
};
