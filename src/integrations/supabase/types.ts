export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brand_briefs: {
        Row: {
          brand_name: string
          brief_content: string | null
          brief_title: string
          brief_type: string | null
          created_at: string | null
          generated_brief: string | null
          id: string
          industry: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          brand_name: string
          brief_content?: string | null
          brief_title: string
          brief_type?: string | null
          created_at?: string | null
          generated_brief?: string | null
          id?: string
          industry?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          brand_name?: string
          brief_content?: string | null
          brief_title?: string
          brief_type?: string | null
          created_at?: string | null
          generated_brief?: string | null
          id?: string
          industry?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      connections: {
        Row: {
          access_token: string | null
          connected_at: string | null
          expires_at: string | null
          id: string
          provider: string
          provider_user_id: string | null
          refresh_token: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          connected_at?: string | null
          expires_at?: string | null
          id?: string
          provider: string
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          connected_at?: string | null
          expires_at?: string | null
          id?: string
          provider?: string
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          card_type: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_default: boolean | null
          last_four: string | null
          provider: string
          user_id: string
        }
        Insert: {
          card_type?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_default?: boolean | null
          last_four?: string | null
          provider: string
          user_id: string
        }
        Update: {
          card_type?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_default?: boolean | null
          last_four?: string | null
          provider?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          email_verification_pending: boolean | null
          full_name: string | null
          id: string
          last_verification_sent: string | null
          monthly_quota: number | null
          password: string | null
          plan_ends: string | null
          plan_name: string | null
          plan_starts: string | null
          profile_image_settings: Json | null
          profile_image_url: string | null
          used_quota: number | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          email_verification_pending?: boolean | null
          full_name?: string | null
          id: string
          last_verification_sent?: string | null
          monthly_quota?: number | null
          password?: string | null
          plan_ends?: string | null
          plan_name?: string | null
          plan_starts?: string | null
          profile_image_settings?: Json | null
          profile_image_url?: string | null
          used_quota?: number | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          email_verification_pending?: boolean | null
          full_name?: string | null
          id?: string
          last_verification_sent?: string | null
          monthly_quota?: number | null
          password?: string | null
          plan_ends?: string | null
          plan_name?: string | null
          plan_starts?: string | null
          profile_image_settings?: Json | null
          profile_image_url?: string | null
          used_quota?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { string: string } | { string: string } | { data: Json }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
