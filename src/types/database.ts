// AUTO-GERADO via Supabase MCP (generate_typescript_types).
// Reflete o schema após a migração 0020_attachments_and_storage.
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
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
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
      attachments: {
        Row: {
          client_id: string | null
          created_at: string
          description: string | null
          file_name: string
          id: string
          kind: string
          lead_id: string | null
          mime_type: string | null
          size_bytes: number | null
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          id?: string
          kind?: string
          lead_id?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          id?: string
          kind?: string
          lead_id?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attachments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          actions: Json
          active: boolean
          conditions: Json
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          last_run_at: string | null
          name: string
          run_count: number
          trigger_type: Database["public"]["Enums"]["automation_trigger"]
          updated_at: string
        }
        Insert: {
          actions?: Json
          active?: boolean
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          last_run_at?: string | null
          name: string
          run_count?: number
          trigger_type: Database["public"]["Enums"]["automation_trigger"]
          updated_at?: string
        }
        Update: {
          actions?: Json
          active?: boolean
          conditions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          last_run_at?: string | null
          name?: string
          run_count?: number
          trigger_type?: Database["public"]["Enums"]["automation_trigger"]
          updated_at?: string
        }
        Relationships: []
      }
      automation_runs: {
        Row: {
          client_id: string | null
          error: string | null
          id: string
          lead_id: string | null
          payload: Json | null
          ran_at: string
          rule_id: string
          status: string
        }
        Insert: {
          client_id?: string | null
          error?: string | null
          id?: string
          lead_id?: string | null
          payload?: Json | null
          ran_at?: string
          rule_id: string
          status?: string
        }
        Update: {
          client_id?: string | null
          error?: string | null
          id?: string
          lead_id?: string | null
          payload?: Json | null
          ran_at?: string
          rule_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_runs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_runs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_runs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_leads: {
        Row: {
          attributed_value_brl: number | null
          campaign_id: string
          created_at: string
          id: string
          lead_id: string
          touch_type: string
        }
        Insert: {
          attributed_value_brl?: number | null
          campaign_id: string
          created_at?: string
          id?: string
          lead_id: string
          touch_type?: string
        }
        Update: {
          attributed_value_brl?: number | null
          campaign_id?: string
          created_at?: string
          id?: string
          lead_id?: string
          touch_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "v_campaign_performance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget_brl: number | null
          channel: Database["public"]["Enums"]["campaign_channel"]
          created_at: string
          end_at: string | null
          goal: string | null
          id: string
          metadata: Json
          name: string
          slug: string
          spent_brl: number
          start_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          unit: Database["public"]["Enums"]["business_unit"] | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          budget_brl?: number | null
          channel: Database["public"]["Enums"]["campaign_channel"]
          created_at?: string
          end_at?: string | null
          goal?: string | null
          id?: string
          metadata?: Json
          name: string
          slug: string
          spent_brl?: number
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          unit?: Database["public"]["Enums"]["business_unit"] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          budget_brl?: number | null
          channel?: Database["public"]["Enums"]["campaign_channel"]
          created_at?: string
          end_at?: string | null
          goal?: string | null
          id?: string
          metadata?: Json
          name?: string
          slug?: string
          spent_brl?: number
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          unit?: Database["public"]["Enums"]["business_unit"] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          city: string | null
          created_at: string
          details: Json
          display_name: string
          document: string | null
          email: string | null
          first_purchase_at: string | null
          id: string
          last_purchase_at: string | null
          lead_id: string | null
          legal_name: string | null
          lifetime_value_brl: number
          owner_id: string | null
          phone: string | null
          state: string | null
          status: Database["public"]["Enums"]["client_status"]
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          details?: Json
          display_name: string
          document?: string | null
          email?: string | null
          first_purchase_at?: string | null
          id?: string
          last_purchase_at?: string | null
          lead_id?: string | null
          legal_name?: string | null
          lifetime_value_brl?: number
          owner_id?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["client_status"]
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          details?: Json
          display_name?: string
          document?: string | null
          email?: string | null
          first_purchase_at?: string | null
          id?: string
          last_purchase_at?: string | null
          lead_id?: string | null
          legal_name?: string | null
          lifetime_value_brl?: number
          owner_id?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["client_status"]
          unit?: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          invoice_id: string
          label: string
          position: number
          quantity: number
          total_brl: number | null
          unit_price_brl: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          invoice_id: string
          label: string
          position?: number
          quantity?: number
          total_brl?: number | null
          unit_price_brl: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          invoice_id?: string
          label?: string
          position?: number
          quantity?: number
          total_brl?: number | null
          unit_price_brl?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string
          created_at: string
          discount_brl: number
          due_date: string | null
          id: string
          issue_date: string
          notes: string | null
          number: string | null
          opportunity_id: string | null
          paid_brl: number
          quote_id: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal_brl: number
          tax_brl: number
          total_brl: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          discount_brl?: number
          due_date?: string | null
          id?: string
          issue_date?: string
          notes?: string | null
          number?: string | null
          opportunity_id?: string | null
          paid_brl?: number
          quote_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal_brl?: number
          tax_brl?: number
          total_brl?: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          discount_brl?: number
          due_date?: string | null
          id?: string
          issue_date?: string
          notes?: string | null
          number?: string | null
          opportunity_id?: string | null
          paid_brl?: number
          quote_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal_brl?: number
          tax_brl?: number
          total_brl?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
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
        Relationships: [
          {
            foreignKeyName: "lead_service_interests_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_service_interests_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "service_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_service_interests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tags: {
        Row: {
          lead_id: string
          tag_id: string
        }
        Insert: {
          lead_id: string
          tag_id: string
        }
        Update: {
          lead_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_tags_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "leads_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "pipeline_stages"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          amount_brl: number
          client_id: string | null
          closed_at: string | null
          created_at: string
          expected_close: string | null
          id: string
          lead_id: string | null
          lost_reason: string | null
          owner_id: string | null
          probability: number
          source: string | null
          stage: Database["public"]["Enums"]["opportunity_stage"]
          title: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at: string
        }
        Insert: {
          amount_brl?: number
          client_id?: string | null
          closed_at?: string | null
          created_at?: string
          expected_close?: string | null
          id?: string
          lead_id?: string | null
          lost_reason?: string | null
          owner_id?: string | null
          probability?: number
          source?: string | null
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          title: string
          unit: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Update: {
          amount_brl?: number
          client_id?: string | null
          closed_at?: string | null
          created_at?: string
          expected_close?: string | null
          id?: string
          lead_id?: string | null
          lost_reason?: string | null
          owner_id?: string | null
          probability?: number
          source?: string | null
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          title?: string
          unit?: Database["public"]["Enums"]["business_unit"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_brl: number
          client_id: string
          created_at: string
          id: string
          invoice_id: string
          metadata: Json
          method: Database["public"]["Enums"]["payment_method"]
          paid_at: string
          reference: string | null
        }
        Insert: {
          amount_brl: number
          client_id: string
          created_at?: string
          id?: string
          invoice_id: string
          metadata?: Json
          method: Database["public"]["Enums"]["payment_method"]
          paid_at?: string
          reference?: string | null
        }
        Update: {
          amount_brl?: number
          client_id?: string
          created_at?: string
          id?: string
          invoice_id?: string
          metadata?: Json
          method?: Database["public"]["Enums"]["payment_method"]
          paid_at?: string
          reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
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
          public_token: string
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
          public_token?: string
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
          public_token?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal_brl?: number
          title?: string
          total_brl?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "service_addons_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "service_packages_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
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
        Row: {
          id: string
          name: string
          position: number
          slug: string
        }
        Insert: {
          id?: string
          name: string
          position?: number
          slug: string
        }
        Update: {
          id?: string
          name?: string
          position?: number
          slug?: string
        }
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
        Relationships: [
          {
            foreignKeyName: "team_resources_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "team_resource_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_campaign_performance: {
        Row: {
          attributed_revenue_brl: number | null
          channel: Database["public"]["Enums"]["campaign_channel"] | null
          id: string | null
          leads_count: number | null
          name: string | null
          roas: number | null
          slug: string | null
          spent_brl: number | null
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
          invoices_paid: number | null
          month: string | null
          revenue_brl: number | null
          unit: Database["public"]["Enums"]["business_unit"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_quote_by_token: { Args: { p_token: string }; Returns: boolean }
      check_lead_rate_limit: { Args: never; Returns: boolean }
      current_user_unit: { Args: never; Returns: string }
      exec_automation_actions: {
        Args: {
          p_client_id?: string
          p_lead_id: string
          p_rule: Database["public"]["Tables"]["automation_rules"]["Row"]
        }
        Returns: undefined
      }
      get_quote_by_token: {
        Args: { p_token: string }
        Returns: {
          accepted_at: string
          created_at: string
          discount_brl: number
          id: string
          items: Json
          lead_city: string
          lead_email: string
          lead_name: string
          lead_phone: string
          notes: string
          sent_at: string
          status: Database["public"]["Enums"]["quote_status"]
          subtotal_brl: number
          title: string
          total_brl: number
          valid_until: string
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      is_visible_unit: { Args: { p_unit: string }; Returns: boolean }
      json_matches_schema: {
        Args: { instance: Json; schema: Json }
        Returns: boolean
      }
      jsonb_matches_schema: {
        Args: { instance: Json; schema: Json }
        Returns: boolean
      }
      jsonschema_is_valid: { Args: { schema: Json }; Returns: boolean }
      jsonschema_validation_errors: {
        Args: { instance: Json; schema: Json }
        Returns: string[]
      }
      promote_lead_to_client: {
        Args: {
          p_amount_brl?: number
          p_lead_id: string
          p_unit?: Database["public"]["Enums"]["business_unit"]
        }
        Returns: string
      }
      run_automation_inactivity: { Args: never; Returns: number }
      run_automation_invoice_overdue: { Args: never; Returns: number }
    }
    Enums: {
      activity_type:
        | "call"
        | "email"
        | "whatsapp"
        | "meeting"
        | "note"
        | "task"
        | "status_change"
        | "stage_change"
        | "quote_sent"
        | "system"
      automation_trigger:
        | "lead_created"
        | "lead_status_change"
        | "stage_change"
        | "quote_accepted"
        | "invoice_overdue"
        | "inactivity"
        | "cron"
      business_unit: "agencia" | "studio" | "produtora"
      campaign_channel:
        | "instagram"
        | "meta_ads"
        | "google_ads"
        | "tiktok"
        | "email"
        | "whatsapp"
        | "evento"
        | "indicacao"
        | "organico"
        | "outro"
      campaign_status: "rascunho" | "ativa" | "pausada" | "encerrada"
      client_status: "ativo" | "inativo" | "churn" | "prospect"
      invoice_status:
        | "rascunho"
        | "emitida"
        | "paga"
        | "parcial"
        | "vencida"
        | "cancelada"
      lead_segment: "talents" | "commercial"
      lead_status:
        | "novo"
        | "em_contato"
        | "qualificado"
        | "proposta_enviada"
        | "negociacao"
        | "ganho"
        | "perdido"
        | "arquivado"
      lead_type:
        | "aluno_curso"
        | "afiliada"
        | "agenciado_casting"
        | "talento"
        | "fornecedor"
        | "parceiro"
        | "cliente_agencia"
        | "cliente_produtora"
        | "cliente_studio"
      opportunity_stage:
        | "descoberta"
        | "qualificacao"
        | "proposta"
        | "negociacao"
        | "ganho"
        | "perdido"
      payment_method:
        | "pix"
        | "boleto"
        | "cartao_credito"
        | "cartao_debito"
        | "transferencia"
        | "dinheiro"
        | "outro"
      quote_item_kind: "package" | "addon" | "team_resource" | "custom"
      quote_status: "rascunho" | "enviado" | "aceito" | "recusado" | "expirado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: [
        "call",
        "email",
        "whatsapp",
        "meeting",
        "note",
        "task",
        "status_change",
        "stage_change",
        "quote_sent",
        "system",
      ],
      automation_trigger: [
        "lead_created",
        "lead_status_change",
        "stage_change",
        "quote_accepted",
        "invoice_overdue",
        "inactivity",
        "cron",
      ],
      business_unit: ["agencia", "studio", "produtora"],
      campaign_channel: [
        "instagram",
        "meta_ads",
        "google_ads",
        "tiktok",
        "email",
        "whatsapp",
        "evento",
        "indicacao",
        "organico",
        "outro",
      ],
      campaign_status: ["rascunho", "ativa", "pausada", "encerrada"],
      client_status: ["ativo", "inativo", "churn", "prospect"],
      invoice_status: [
        "rascunho",
        "emitida",
        "paga",
        "parcial",
        "vencida",
        "cancelada",
      ],
      lead_segment: ["talents", "commercial"],
      lead_status: [
        "novo",
        "em_contato",
        "qualificado",
        "proposta_enviada",
        "negociacao",
        "ganho",
        "perdido",
        "arquivado",
      ],
      lead_type: [
        "aluno_curso",
        "afiliada",
        "agenciado_casting",
        "talento",
        "fornecedor",
        "parceiro",
        "cliente_agencia",
        "cliente_produtora",
        "cliente_studio",
      ],
      opportunity_stage: [
        "descoberta",
        "qualificacao",
        "proposta",
        "negociacao",
        "ganho",
        "perdido",
      ],
      payment_method: [
        "pix",
        "boleto",
        "cartao_credito",
        "cartao_debito",
        "transferencia",
        "dinheiro",
        "outro",
      ],
      quote_item_kind: ["package", "addon", "team_resource", "custom"],
      quote_status: ["rascunho", "enviado", "aceito", "recusado", "expirado"],
    },
  },
} as const
