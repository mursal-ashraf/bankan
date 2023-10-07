declare module 'schema-v1' {
  export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

  export type Board = Database['public']['Tables']['board']['Row'];
  export type Member = Database['public']['Tables']['member']['Row'];
  export type Card = Database['public']['Tables']['card']['Row'];

  export interface Database {
    public: {
      Tables: {
        board: {
          Row: {
            _id?: any;
            created_at: string | null;
            description: string | null;
            id: string;
            name: string | null;
            saved_date: string | null;
            team_id: string | null;
            user_id: string | null;
            version: number;
          };
          Insert: {
            created_at?: string | null;
            description?: string | null;
            id?: string;
            name?: string | null;
            saved_date?: string | null;
            team_id?: string | null;
            user_id?: string | null;
            version?: number;
          };
          Update: {
            created_at?: string | null;
            description?: string | null;
            id?: string;
            name?: string | null;
            saved_date?: string | null;
            team_id?: string | null;
            user_id?: string | null;
            version?: number;
          };
          Relationships: [
            {
              foreignKeyName: 'board_team_id_fkey';
              columns: ['team_id'];
              referencedRelation: 'team';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'board_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
          ];
        };
        card: {
          Row: {
            created_at: string | null;
            deadline: string | null;
            description: string | null;
            id: string;
            index: number | null;
            list_id: string;
            title: string | null;
            user_assigned: string | null;
            user_creator: string | null;
          };
          Insert: {
            created_at?: string | null;
            deadline?: string | null;
            description?: string | null;
            id?: string;
            index?: number | null;
            list_id: string;
            title?: string | null;
            user_assigned?: string | null;
            user_creator?: string | null;
          };
          Update: {
            created_at?: string | null;
            deadline?: string | null;
            description?: string | null;
            id?: string;
            index?: number | null;
            list_id?: string;
            title?: string | null;
            user_assigned?: string | null;
            user_creator?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'card_list_id_fkey';
              columns: ['list_id'];
              referencedRelation: 'list';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'card_user_assigned_fkey';
              columns: ['user_assigned'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'card_user_creator_fkey';
              columns: ['user_creator'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
          ];
        };
        list: {
          Row: {
            board_id: string;
            board_version: number;
            created_at: string | null;
            id: string;
            index: number | null;
            name: string | null;
            user_id: string | null;
          };
          Insert: {
            board_id: string;
            board_version: number;
            created_at?: string | null;
            id?: string;
            index?: number | null;
            name?: string | null;
            user_id?: string | null;
          };
          Update: {
            board_id?: string;
            board_version?: number;
            created_at?: string | null;
            id?: string;
            index?: number | null;
            name?: string | null;
            user_id?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'list_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
          ];
        };
        member: {
          Row: {
            address: string | null;
            company: string | null;
            created_at: string;
            expertise: string | null;
            email: string | null;
            id: string;
            name: string | null;
            phone: string | null;
          };
          Insert: {
            address?: string | null;
            company?: string | null;
            created_at?: string;
            expertise?: string | null;
            email?: string | null;
            id?: string;
            name?: string | null;
            phone?: string | null;
          };
          Update: {
            address?: string | null;
            company?: string | null;
            created_at?: string;
            expertise?: string | null;
            email?: string | null;
            id?: string;
            name?: string | null;
            phone?: string | null;
          };
          Relationships: [];
        };
        organisation: {
          Row: {
            created_at: string | null;
            id: string;
            user_id: string | null;
          };
          Insert: {
            created_at?: string | null;
            id?: string;
            user_id?: string | null;
          };
          Update: {
            created_at?: string | null;
            id?: string;
            user_id?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'organisation_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
          ];
        };
        team: {
          Row: {
            board_id: string | null;
            created_at: string | null;
            id: string;
            user_id: string | null;
          };
          Insert: {
            board_id?: string | null;
            created_at?: string | null;
            id?: string;
            user_id?: string | null;
          };
          Update: {
            board_id?: string | null;
            created_at?: string | null;
            id?: string;
            user_id?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'team_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
          ];
        };
        user_team: {
          Row: {
            created_at: string | null;
            team_id: string;
            user_id: string;
          };
          Insert: {
            created_at?: string | null;
            team_id: string;
            user_id: string;
          };
          Update: {
            created_at?: string | null;
            team_id?: string;
            user_id?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'user_team_team_id_fkey';
              columns: ['team_id'];
              referencedRelation: 'team';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'user_team_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
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
}
