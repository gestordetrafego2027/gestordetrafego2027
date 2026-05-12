// AUTO-GERADO via Supabase MCP (generate_typescript_types) em 2026-05-12.
// Reflete o schema após a migração 0011_views_security_invoker.
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
  __InternalSupabase: { PostgrestVersion: "14.5" }
  public: {
    Tables: {
      activities: {
        Row: {
          author_id: string | null; body: string | null; completed_at: string | null
          created_at: string; id: string; lead_id: string; metadata: Json | null
          scheduled_at: string | null; title: string
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          author_id?: string | null; body?: string | null; completed_at?: string | null
          created_at?: string; id?: string; lead_id: string; metadata?: Json | null
          scheduled_at?: string | null; title: string
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: Partial<Database["public"]["Tables"]["activities"]["Insert"]>
        Relationships: []
      }
      automation_rules: {
        Row: {
          actions: Json; active: boolean; conditions: Json; created_at: string
          created_by: string | null; description: string | null; id: string
          last_run_at: string | null; name: string; run_count: number
          trigger_type: Database["public"]["Enums"]["automation_trigger"]; updated_at: string
        }
        Insert: {
          actions?: Json; active?: boolean; conditions?: Json; created_at?: string
          created_by?: string | null; description?: string | null; id?: string
          last_run_at?: string | null; name: string; run_count?: number
          trigger_type: Database["public"]["Enums"]["automation_trigger"]; updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["automation_rules"]["Insert"]>
        Relationships: []
      }
      automation_runs: {
        Row: {
          client_id: string | null; error: string | null; id: string
          lead_id: string | null; payload: Json | null; ran_at: string
          rule_id: string; status: string
        }
        Insert: {
          client_id?: string | null; error?: string | null; id?: string
          lead_id?: string | null; payload?: Json | null; ran_at?: string
          rule_id: string; status?: string
        }
        Update: Partial<Database["public"]["Tables"]["automation_runs"]["Insert"]>
        Relationships: []
      }
      campaign_leads: {
        Row: {
          attributed_value_brl: number | null; campaign_id: string; created_at: string
          id: string; lead_id: string; touch_type: string
        }
        Insert: {
          attributed_value_brl?: number | null; campaign_id: string; created_at?: string
          id?: string; lead_id: string; touch_type?: string
        }
        Update: Partial<Database["public"]["Tables"]["campaign_leads"]["Insert"]>
        Relationships: []
      }
      campaigns: {
        Row: {
          budget_brl: number | null
          channel: Database["public"]["Enums"]["campaign_channel"]
          created_at: string; end_at: string | null; goal: string | null
          id: string; metadata: Json; name: string; slug: string; spent_brl: number
          start_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          unit: Database["public"]["Enums"]["business_unit"] | null
          updated_at: string
          utm_campaign: string | null; utm_medium: string | null; utm_source: string | null
        }
        Insert: {
          budget_brl?: number | null
          channel: Database["public"]["Enums"]["campaign_channel"]
          created_at?: string; end_at?: string | null; goal?: string | null
          id?: string; metadata?: Json; name: string; slug: string; spent_brl?: number
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          unit?: Database["public"]["Enums"]["business_unit"] | null
          updated_at?: string
          utm_campaign?: string | null; utm_medium?: string | null; utm_source?: string | null
        }
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>
        Relationships: []
      }
      clients: {
        Row: {
          city: string | null; created_at: string; details: Json
          display_name: string; document: string | null; email: string | null
          first_purchase_at: string | null; id: string
          last_purchase_at: string | null; lead_id: string | null
          legal_name: string | null; lifetime_value_brl: number
          owner_id: string | null; phone: string | null; state: string | null
          status: Database["public"]["Enums"]["client_status"]
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at: string
        }
        Insert: {
          city?: string | null; created_at?: string; details?: Json
          display_name: string; document?: string | null; email?: string | null
          first_purchase_at?: string | null; id?: string
          last_purchase_at?: string | null; lead_id?: string | null
          legal_name?: string | null; lifetime_value_brl?: number
          owner_id?: string | null; phone?: string | null; state?: string | null
          status?: Database["public"]["Enums"]["client_status"]
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>
        Relationships: []
      }
      invoice_items: {
        Row: {
          created_at: string; description: string | null; id: string
          invoice_id: string; label: string; position: number; quantity: number
          total_brl: number | null; unit_price_brl: number
        }
        Insert: {
          created_at?: string; description?: string | null; id?: string
          invoice_id: string; label: string; position?: number; quantity?: number
          total_brl?: number | null; unit_price_brl: number
        }
        Update: Partial<Database["public"]["Tables"]["invoice_items"]["Insert"]>
        Relationships: []
      }
      invoices: {
        Row: {
          client_id: string; created_at: string; discount_brl: number
          due_date: string | null; id: string; issue_date: string
          notes: string | null; number: string | null
          opportunity_id: string | null; paid_brl: number; quote_id: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal_brl: number; tax_brl: number; total_brl: number; updated_at: string
        }
        Insert: {
          client_id: string; created_at?: string; discount_brl?: number
          due_date?: string | null; id?: string; issue_date?: string
          notes?: string | null; number?: string | null
          opportunity_id?: string | null; paid_brl?: number; quote_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal_brl?: number; tax_brl?: number; total_brl?: number; updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>
        Relationships: []
      }
      lead_service_interests: {
        Row: {
          addons: Json; answers: Json; created_at: string; id: string
          lead_id: string; package_id: string | null; priority: number; service_id: string
        }
        Insert: {
          addons?: Json; answers?: Json; created_at?: string; id?: string
          lead_id: string; package_id?: string | null; priority?: number; service_id: string
        }
        Update: Partial<Database["public"]["Tables"]["lead_service_interests"]["Insert"]>
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
          city: string | null; created_at: string; details: Json
          email: string | null; id: string
          lead_type: Database["public"]["Enums"]["lead_type"]
          name: string; notes: string | null; owner_id: string | null
          phone: string | null
          segment: Database["public"]["Enums"]["lead_segment"]
          source: string | null; stage_id: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string; utm: Json | null
        }
        Insert: {
          city?: string | null; created_at?: string; details?: Json
          email?: string | null; id?: string
          lead_type: Database["public"]["Enums"]["lead_type"]
          name: string; notes?: string | null; owner_id?: string | null
          phone?: string | null
          segment: Database["public"]["Enums"]["lead_segment"]
          source?: string | null; stage_id?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string; utm?: Json | null
        }
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>
        Relationships: []
      }
      notes: {
        Row: {
          author_id: string | null; body: string; created_at: string
          id: string; lead_id: string; updated_at: string
        }
        Insert: {
          author_id?: string | null; body: string; created_at?: string
          id?: string; lead_id: string; updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>
        Relationships: []
      }
      opportunities: {
        Row: {
          amount_brl: number; client_id: string | null; closed_at: string | null
          created_at: string; expected_close: string | null; id: string
          lead_id: string | null; lost_reason: string | null
          owner_id: string | null; probability: number; source: string | null
          stage: Database["public"]["Enums"]["opportunity_stage"]
          title: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at: string
        }
        Insert: {
          amount_brl?: number; client_id?: string | null; closed_at?: string | null
          created_at?: string; expected_close?: string | null; id?: string
          lead_id?: string | null; lost_reason?: string | null
          owner_id?: string | null; probability?: number; source?: string | null
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          title: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["opportunities"]["Insert"]>
        Relationships: []
      }
      payments: {
        Row: {
          amount_brl: number; client_id: string; created_at: string
          id: string; invoice_id: string; metadata: Json
          method: Database["public"]["Enums"]["payment_method"]
          paid_at: string; reference: string | null
        }
        Insert: {
          amount_brl: number; client_id: string; created_at?: string
          id?: string; invoice_id: string; metadata?: Json
          method: Database["public"]["Enums"]["payment_method"]
          paid_at?: string; reference?: string | null
        }
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>
        Relationships: []
      }
      pipeline_stages: {
        Row: {
          created_at: string; id: string; is_lost: boolean; is_won: boolean
          name: string; position: number
          segment: Database["public"]["Enums"]["lead_segment"]; slug: string
        }
        Insert: {
          created_at?: string; id?: string; is_lost?: boolean; is_won?: boolean
          name: string; position: number
          segment: Database["public"]["Enums"]["lead_segment"]; slug: string
        }
        Update: Partial<Database["public"]["Tables"]["pipeline_stages"]["Insert"]>
        Relationships: []
      }
      quote_items: {
        Row: {
          created_at: string; description: string | null; id: string
          kind: Database["public"]["Enums"]["quote_item_kind"]
          label: string; position: number; quantity: number
          quote_id: string; reference_id: string | null
          total_brl: number | null; unit_price_brl: number
        }
        Insert: {
          created_at?: string; description?: string | null; id?: string
          kind: Database["public"]["Enums"]["quote_item_kind"]
          label: string; position?: number; quantity?: number
          quote_id: string; reference_id?: string | null
          total_brl?: number | null; unit_price_brl: number
        }
        Update: Partial<Database["public"]["Tables"]["quote_items"]["Insert"]>
        Relationships: []
      }
      quotes: {
        Row: {
          accepted_at: string | null; created_at: string; discount_brl: number
          id: string; lead_id: string; notes: string | null
          owner_id: string | null; sent_at: string | null
          status: Database["public"]["Enums"]["quote_status"]
          subtotal_brl: number; title: string; total_brl: number
          updated_at: string; valid_until: string | null
        }
        Insert: {
          accepted_at?: string | null; created_at?: string; discount_brl?: number
          id?: string; lead_id: string; notes?: string | null
          owner_id?: string | null; sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal_brl?: number; title: string; total_brl?: number
          updated_at?: string; valid_until?: string | null
        }
        Update: Partial<Database["public"]["Tables"]["quotes"]["Insert"]>
        Relationships: []
      }
      service_addons: {
        Row: {
          active: boolean; created_at: string; description: string | null
          id: string; name: string; position: number; price_brl: number | null
          service_id: string | null; slug: string
        }
        Insert: {
          active?: boolean; created_at?: string; description?: string | null
          id?: string; name: string; position?: number; price_brl?: number | null
          service_id?: string | null; slug: string
        }
        Update: Partial<Database["public"]["Tables"]["service_addons"]["Insert"]>
        Relationships: []
      }
      service_packages: {
        Row: {
          active: boolean; created_at: string; description: string | null
          duration: string | null; id: string; includes: Json
          name: string; position: number; price_brl: number | null
          service_id: string; slug: string; updated_at: string
        }
        Insert: {
          active?: boolean; created_at?: string; description?: string | null
          duration?: string | null; id?: string; includes?: Json
          name: string; position?: number; price_brl?: number | null
          service_id: string; slug: string; updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["service_packages"]["Insert"]>
        Relationships: []
      }
      services: {
        Row: {
          active: boolean; created_at: string; description: string | null
          id: string; name: string; position: number; questions_schema: Json
          slug: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at: string
        }
        Insert: {
          active?: boolean; created_at?: string; description?: string | null
          id?: string; name: string; position?: number; questions_schema?: Json
          slug: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null; created_at: string; id: string
          name: string; slug: string
        }
        Insert: {
          color?: string | null; created_at?: string; id?: string
          name: string; slug: string
        }
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>
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
          active: boolean; base_price_brl: number | null; category_id: string
          created_at: string; description: string | null
          final_price_brl: number | null; id: string; position: number
          role: string; slug: string; target_audience: string | null
        }
        Insert: {
          active?: boolean; base_price_brl?: number | null; category_id: string
          created_at?: string; description?: string | null
          final_price_brl?: number | null; id?: string; position?: number
          role: string; slug: string; target_audience?: string | null
        }
        Update: Partial<Database["public"]["Tables"]["team_resources"]["Insert"]>
        Relationships: []
      }
    }
    Views: {
      v_campaign_performance: {
        Row: {
          attributed_revenue_brl: number | null
          channel: Database["public"]["Enums"]["campaign_channel"] | null
          id: string | null; leads_count: number | null; name: string | null
          roas: number | null; slug: string | null; spent_brl: number | null
        }
        Relationships: []
      }
      v_leads_funnel: {
        Row: {
          month: string | null
          segment: Database["public"]["Enums"]["lead_segment"] | null
          status: Database["public"]["Enums"]["lead_status"] | null
          total: number | null
        }
        Relationships: []
      }
      v_opportunities_pipeline: {
        Row: {
          amount_total_brl: number | null
          stage: Database["public"]["Enums"]["opportunity_stage"] | null
          total: number | null
          unit: Database["public"]["Enums"]["business_unit"] | null
          weighted_brl: number | null
        }
        Relationships: []
      }
      v_revenue_monthly: {
        Row: {
          invoices_paid: number | null; month: string | null
          revenue_brl: number | null
          unit: Database["public"]["Enums"]["business_unit"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_staff: { Args: never; Returns: boolean }
      json_matches_schema: { Args: { instance: Json; schema: Json }; Returns: boolean }
      jsonb_matches_schema: { Args: { instance: Json; schema: Json }; Returns: boolean }
      jsonschema_is_valid: { Args: { schema: Json }; Returns: boolean }
      jsonschema_validation_errors: { Args: { instance: Json; schema: Json }; Returns: string[] }
    }
    Enums: {
      activity_type:
        | "call" | "email" | "whatsapp" | "meeting" | "note" | "task"
        | "status_change" | "stage_change" | "quote_sent" | "system"
      automation_trigger:
        | "lead_created" | "lead_status_change" | "stage_change"
        | "quote_accepted" | "invoice_overdue" | "inactivity" | "cron"
      business_unit: "agencia" | "studio" | "produtora"
      campaign_channel:
        | "instagram" | "meta_ads" | "google_ads" | "tiktok" | "email"
        | "whatsapp" | "evento" | "indicacao" | "organico" | "outro"
      campaign_status: "rascunho" | "ativa" | "pausada" | "encerrada"
      client_status: "ativo" | "inativo" | "churn" | "prospect"
      invoice_status:
        | "rascunho" | "emitida" | "paga" | "parcial" | "vencida" | "cancelada"
      lead_segment: "talents" | "commercial"
      lead_status:
        | "novo" | "em_contato" | "qualificado" | "proposta_enviada"
        | "negociacao" | "ganho" | "perdido" | "arquivado"
      lead_type:
        | "aluno_curso" | "afiliada" | "agenciado_casting" | "talento"
        | "fornecedor" | "parceiro" | "cliente_agencia"
        | "cliente_produtora" | "cliente_studio"
      opportunity_stage:
        | "descoberta" | "qualificacao" | "proposta"
        | "negociacao" | "ganho" | "perdido"
      payment_method:
        | "pix" | "boleto" | "cartao_credito" | "cartao_debito"
        | "transferencia" | "dinheiro" | "outro"
      quote_item_kind: "package" | "addon" | "team_resource" | "custom"
      quote_status: "rascunho" | "enviado" | "aceito" | "recusado" | "expirado"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

type DefaultSchema = Database["public"]

export type Tables<
  T extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[T] extends { Row: infer R } ? R : never

export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T] extends { Insert: infer I } ? I : never

export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T] extends { Update: infer U } ? U : never

export type Enums<T extends keyof DefaultSchema["Enums"]> = DefaultSchema["Enums"][T]
