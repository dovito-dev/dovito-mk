
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Json } from '@/integrations/supabase/types';

export type Profile = {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  profile_image_url?: string;
  monthly_quota?: number;
  used_quota?: number;
  plan_name?: string;
  plan_starts?: string;
  plan_ends?: string;
  email_verification_pending?: boolean;
  last_verification_sent?: string;
  profile_image_settings?: Json;
};

export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    },
    enabled: !!user,
  });
};
