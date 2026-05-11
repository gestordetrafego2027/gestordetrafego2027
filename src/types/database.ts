// AUTO-GERADO via Supabase MCP (generate_typescript_types).
// Regenerar com: `supabase gen types typescript --linked` ou via Supabase MCP.
// NÃO EDITAR À MÃO.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          author_id: string | null
          body: string | null
          completed_at: string | null
          created_at: string
          id: string
          lead_id: string
          metadata: Json | null
          scheduled_at: string | null
          title: string
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          lead_id: string
          metadata?: Json | null
          scheduled_at?: string | null
          title: string
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: {
          author_id?: string | null
          body?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          lead_id?: string
          metadata?: Json | null
          scheduled_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["activity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_service_interests: {
        Row: {
          addons: Json
          answers: Json
          created_at: string
          id: string
          lead_id: string
          package_id: string | null
          priority: number
          service_id: string
        }
        Insert: {
          addons?: Json
          answers?: Json
          created_at?: string
          id?: string
          lead_id: string
          package_id?: string | null
          priority?: number
          service_id: string
        }
        Update: {
          addons?: Json
          answers?: Json
          created_at?: string
          id?: string
          lead_id?: string
          package_id?: string | null
          priority?: number
          service_id?: string
        }
        Relationships: []
      }
      lead_tags: {
        Row: { lead_id: string; tag_id: string }
        Insert: { lead_id: string; tag_id: string }
        Update: { lead_id?: string; tag_id?: string }
        Relationships: []
      }
      leads: {
        Row: {
          city: string | null
          created_at: string
          details: Json
          email: string | null
          id: string
          lead_type: Database["public"]["Enums"]["lead_type"]
          name: string
          notes: string | null
          owner_id: string | null
          phone: string | null
          segment: Database["public"]["Enums"]["lead_segment"]
          source: string | null
          stage_id: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          utm: Json | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          details?: Json
          email?: string | null
          id?: string
          lead_type: Database["public"]["Enums"]["lead_type"]
          name: string
          notes?: string | null
          owner_id?: string | null
          phone?: string | null
          segment: Database["public"]["Enums"]["lead_segment"]
          source?: string | null
          stage_id?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          utm?: Json | null
        }
        Update: {
          city?: string | null
          created_at?: string
          details?: Json
          email?: string | null
          id?: string
          lead_type?: Database["public"]["Enums"]["lead_type"]
          name?: string
          notes?: string | null
          owner_id?: string | null
          phone?: string | null
          segment?: Database["public"]["Enums"]["lead_segment"]
          source?: string | null
          stage_id?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          utm?: Json | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          id: string
          lead_id: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
          lead_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
          lead_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      pipeline_stages: {
        Row: {
          created_at: string
          id: string
          is_lost: boolean
          is_won: boolean
          name: string
          position: number
          segment: Database["public"]["Enums"]["lead_segment"]
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_lost?: boolean
          is_won?: boolean
          name: string
          position: number
          segment: Database["public"]["Enums"]["lead_segment"]
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          is_lost?: boolean
          is_won?: boolean
          name?: string
          position?: number
          segment?: Database["public"]["Enums"]["lead_segment"]
          slug?: string
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          kind: Database["public"]["Enums"]["quote_item_kind"]
          label: string
          position: number
          quantity: number
          quote_id: string
          reference_id: string | null
          total_brl: number | null
          unit_price_brl: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          kind: Database["public"]["Enums"]["quote_item_kind"]
          label: string
          position?: number
          quantity?: number
          quote_id: string
          reference_id?: string | null
          total_brl?: number | null
          unit_price_brl: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["quote_item_kind"]
          label?: string
          position?: number
          quantity?: number
          quote_id?: string
          reference_id?: string | null
          total_brl?: number | null
          unit_price_brl?: number
        }
        Relationships: []
      }
      quotes: {
        Row: {
          accepted_at: string | null
          created_at: string
          discount_brl: number
          id: string
          lead_id: string
          notes: string | null
          owner_id: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["quote_status"]
          subtotal_brl: number
          title: string
          total_brl: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          discount_brl?: number
          id?: string
          lead_id: string
          notes?: string | null
          owner_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal_brl?: number
          title: string
          total_brl?: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          discount_brl?: number
          id?: string
          lead_id?: string
          notes?: string | null
          owner_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal_brl?: number
          title?: string
          total_brl?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      service_addons: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          position: number
          price_brl: number | null
          service_id: string | null
          slug: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          position?: number
          price_brl?: number | null
          service_id?: string | null
          slug: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          position?: number
          price_brl?: number | null
          service_id?: string | null
          slug?: string
        }
        Relationships: []
      }
      service_packages: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          duration: string | null
          id: string
          includes: Json
          name: string
          position: number
          price_brl: number | null
          service_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          includes?: Json
          name: string
          position?: number
          price_brl?: number | null
          service_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          includes?: Json
          name?: string
          position?: number
          price_brl?: number | null
          service_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          position: number
          questions_schema: Json
          slug: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          position?: number
          questions_schema?: Json
          slug: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          position?: number
          questions_schema?: Json
          slug?: string
          unit?: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      team_resource_categories: {
        Row: { id: string; name: string; position: number; slug: string }
        Insert: { id?: string; name: string; position?: number; slug: string }
        Update: { id?: string; name?: string; position?: number; slug?: string }
        Relationships: []
      }
      team_resources: {
        Row: {
          active: boolean
          base_price_brl: number | null
          category_id: string
          created_at: string
          description: string | null
          final_price_brl: number | null
          id: string
          position: number
          role: string
          slug: string
          target_audience: string | null
        }
        Insert: {
          active?: boolean
          base_price_brl?: number | null
          category_id: string
          created_at?: string
          description?: string | null
          final_price_brl?: number | null
          id?: string
          position?: number
          role: string
          slug: string
          target_audience?: string | null
        }
        Update: {
          active?: boolean
          base_price_brl?: number | null
          category_id?: string
          created_at?: string
          description?: string | null
          final_price_brl?: number | null
          id?: string
          position?: number
          role?: string
          slug?: string
          target_audience?: string | null
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      activity_type:
        | "call" | "email" | "whatsapp" | "meeting" | "note" | "task"
        | "status_change" | "stage_change" | "quote_sent" | "system"
      business_unit: "agencia" | "studio" | "produtora"
      lead_segment: "talents" | "commercial"
      lead_status:
        | "novo" | "em_contato" | "qualificado" | "proposta_enviada"
        | "negociacao" | "ganho" | "perdido" | "arquivado"
      lead_type:
        | "aluno_curso" | "afiliada" | "agenciado_casting" | "talento"
        | "fornecedor" | "parceiro" | "cliente_agencia"
        | "cliente_produtora" | "cliente_studio"
      quote_item_kind: "package" | "addon" | "team_resource" | "custom"
      quote_status: "rascunho" | "enviado" | "aceito" | "recusado" | "expirado"
    }
    CompositeTypes: { [_ in never]: never }
  }
}
