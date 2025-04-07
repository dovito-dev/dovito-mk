
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

export type BrandBrief = {
  id: string;
  brief_title: string;
  brand_name: string;
  industry: string | null;
  brief_type: string | null;
  brief_content: string | null;
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
    brief_title: string;
    brand_name: string;
    industry: string;
    brief_type: string;
    brief_content: string;
  }
): Promise<BrandBrief | null> => {
  const { data, error } = await (supabase as any)
    .from('brand_briefs')
    .insert([
      {
        user_id: userId,
        brief_title: brief.brief_title,
        brand_name: brief.brand_name,
        industry: brief.industry,
        brief_type: brief.brief_type,
        brief_content: brief.brief_content,
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
