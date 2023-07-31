export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      experience: {
        Row: {
          auth_id: string | null;
          company: string;
          description: string | null;
          end_date: string;
          experience_id: string;
          profile_id: string;
          role: string;
          start_date: string;
        };
        Insert: {
          auth_id?: string | null;
          company: string;
          description?: string | null;
          end_date?: string;
          experience_id?: string;
          profile_id: string;
          role: string;
          start_date: string;
        };
        Update: {
          auth_id?: string | null;
          company?: string;
          description?: string | null;
          end_date?: string;
          experience_id?: string;
          profile_id?: string;
          role?: string;
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experience_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "experience_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["profile_id"];
          }
        ];
      };
      profiles: {
        Row: {
          auth_id: string;
          bio: string;
          email: string;
          full_name: string;
          location: string;
          primary_role: string;
          profile_id: string;
          years_experience: string;
        };
        Insert: {
          auth_id?: string;
          bio?: string;
          email?: string;
          full_name?: string;
          location?: string;
          primary_role?: string;
          profile_id?: string;
          years_experience?: string;
        };
        Update: {
          auth_id?: string;
          bio?: string;
          email?: string;
          full_name?: string;
          location?: string;
          primary_role?: string;
          profile_id?: string;
          years_experience?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type PROFILE = Database["public"]["Tables"]["profiles"]["Row"];
export type EXPERIENCE = Database["public"]["Tables"]["experience"]["Row"];
