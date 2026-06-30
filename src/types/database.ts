export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      academy_authors: {
        Row: {
          active: boolean
          avatar_override_url: string | null
          bio_long: string | null
          created_at: string
          credentials: Json
          featured: boolean
          headline: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          pen_name: string | null
          profile_id: string
          slug: string
          social_links: Json
          updated_at: string
        }
        Insert: {
          active?: boolean
          avatar_override_url?: string | null
          bio_long?: string | null
          created_at?: string
          credentials?: Json
          featured?: boolean
          headline?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          pen_name?: string | null
          profile_id: string
          slug: string
          social_links?: Json
          updated_at?: string
        }
        Update: {
          active?: boolean
          avatar_override_url?: string | null
          bio_long?: string | null
          created_at?: string
          credentials?: Json
          featured?: boolean
          headline?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          pen_name?: string | null
          profile_id?: string
          slug?: string
          social_links?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_authors_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_bundle_items: {
        Row: {
          bundle_product_id: string
          child_product_id: string
          created_at: string
          id: string
          order_index: number
        }
        Insert: {
          bundle_product_id: string
          child_product_id: string
          created_at?: string
          id?: string
          order_index?: number
        }
        Update: {
          bundle_product_id?: string
          child_product_id?: string
          created_at?: string
          id?: string
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: 'academy_bundle_items_bundle_product_id_fkey'
            columns: ['bundle_product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_bundle_items_bundle_product_id_fkey'
            columns: ['bundle_product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_bundle_items_bundle_product_id_fkey'
            columns: ['bundle_product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_bundle_items_child_product_id_fkey'
            columns: ['child_product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_bundle_items_child_product_id_fkey'
            columns: ['child_product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_bundle_items_child_product_id_fkey'
            columns: ['child_product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_categories: {
        Row: {
          active: boolean
          business_unit: Database['public']['Enums']['business_unit'] | null
          cover_url: string | null
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          name: string
          og_image_url: string | null
          order_index: number
          parent_id: string | null
          product_count: number
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          business_unit?: Database['public']['Enums']['business_unit'] | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          name: string
          og_image_url?: string | null
          order_index?: number
          parent_id?: string | null
          product_count?: number
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          business_unit?: Database['public']['Enums']['business_unit'] | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          og_image_url?: string | null
          order_index?: number
          parent_id?: string | null
          product_count?: number
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_categories_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'academy_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_categories_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['category_id']
          },
        ]
      }
      academy_certificates: {
        Row: {
          city: string | null
          code: string
          coordinator_name: string | null
          coordinator_title: string | null
          course_title_en_snapshot: string | null
          course_title_pt_snapshot: string | null
          created_at: string
          end_date: string | null
          enrollment_id: string
          founder_name: string | null
          founder_title: string | null
          hours: number | null
          id: string
          issued_at: string
          metadata: Json
          pdf_url: string | null
          product_id: string
          revoked_at: string | null
          revoked_reason: string | null
          start_date: string | null
          student_name_snapshot: string | null
          updated_at: string
          user_id: string
          verify_url: string | null
        }
        Insert: {
          city?: string | null
          code: string
          coordinator_name?: string | null
          coordinator_title?: string | null
          course_title_en_snapshot?: string | null
          course_title_pt_snapshot?: string | null
          created_at?: string
          end_date?: string | null
          enrollment_id: string
          founder_name?: string | null
          founder_title?: string | null
          hours?: number | null
          id?: string
          issued_at?: string
          metadata?: Json
          pdf_url?: string | null
          product_id: string
          revoked_at?: string | null
          revoked_reason?: string | null
          start_date?: string | null
          student_name_snapshot?: string | null
          updated_at?: string
          user_id: string
          verify_url?: string | null
        }
        Update: {
          city?: string | null
          code?: string
          coordinator_name?: string | null
          coordinator_title?: string | null
          course_title_en_snapshot?: string | null
          course_title_pt_snapshot?: string | null
          created_at?: string
          end_date?: string | null
          enrollment_id?: string
          founder_name?: string | null
          founder_title?: string | null
          hours?: number | null
          id?: string
          issued_at?: string
          metadata?: Json
          pdf_url?: string | null
          product_id?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          start_date?: string | null
          student_name_snapshot?: string | null
          updated_at?: string
          user_id?: string
          verify_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'academy_certificates_enrollment_id_fkey'
            columns: ['enrollment_id']
            isOneToOne: true
            referencedRelation: 'academy_enrollments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_certificates_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_certificates_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_certificates_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_certificates_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_comments: {
        Row: {
          author_user_id: string
          body_md: string
          created_at: string
          edited_at: string | null
          hidden_at: string | null
          id: string
          parent_comment_id: string | null
          post_id: string
          reaction_count: number
          status: string
          updated_at: string
        }
        Insert: {
          author_user_id: string
          body_md: string
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          id?: string
          parent_comment_id?: string | null
          post_id: string
          reaction_count?: number
          status?: string
          updated_at?: string
        }
        Update: {
          author_user_id?: string
          body_md?: string
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          id?: string
          parent_comment_id?: string | null
          post_id?: string
          reaction_count?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_comments_author_user_id_fkey'
            columns: ['author_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_comments_parent_comment_id_fkey'
            columns: ['parent_comment_id']
            isOneToOne: false
            referencedRelation: 'academy_comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_comments_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'academy_posts'
            referencedColumns: ['id']
          },
        ]
      }
      academy_community_spaces: {
        Row: {
          active: boolean
          cover_url: string | null
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          member_count: number
          name: string
          order_index: number
          post_count: number
          required_product_id: string | null
          requires_subscription: boolean
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          member_count?: number
          name: string
          order_index?: number
          post_count?: number
          required_product_id?: string | null
          requires_subscription?: boolean
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          member_count?: number
          name?: string
          order_index?: number
          post_count?: number
          required_product_id?: string | null
          requires_subscription?: boolean
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_community_spaces_required_product_id_fkey'
            columns: ['required_product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_community_spaces_required_product_id_fkey'
            columns: ['required_product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_community_spaces_required_product_id_fkey'
            columns: ['required_product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_coupon_redemptions: {
        Row: {
          coupon_id: string
          discount_cents: number
          id: string
          order_id: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          coupon_id: string
          discount_cents: number
          id?: string
          order_id: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          coupon_id?: string
          discount_cents?: number
          id?: string
          order_id?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_coupon_redemptions_coupon_id_fkey'
            columns: ['coupon_id']
            isOneToOne: false
            referencedRelation: 'academy_coupons'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_coupon_redemptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_coupons: {
        Row: {
          active: boolean
          applies_to: Json
          code: string
          created_at: string
          id: string
          max_discount_cents: number | null
          min_order_cents: number
          per_user_limit: number | null
          type: Database['public']['Enums']['academy_coupon_type']
          updated_at: string
          usage_count: number
          usage_limit: number | null
          valid_from: string | null
          valid_until: string | null
          value: number
        }
        Insert: {
          active?: boolean
          applies_to?: Json
          code: string
          created_at?: string
          id?: string
          max_discount_cents?: number | null
          min_order_cents?: number
          per_user_limit?: number | null
          type: Database['public']['Enums']['academy_coupon_type']
          updated_at?: string
          usage_count?: number
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
          value: number
        }
        Update: {
          active?: boolean
          applies_to?: Json
          code?: string
          created_at?: string
          id?: string
          max_discount_cents?: number | null
          min_order_cents?: number
          per_user_limit?: number | null
          type?: Database['public']['Enums']['academy_coupon_type']
          updated_at?: string
          usage_count?: number
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
          value?: number
        }
        Relationships: []
      }
      academy_ebook_chapters: {
        Row: {
          created_at: string
          id: string
          is_preview: boolean
          order_index: number
          pages_end: number | null
          pages_start: number | null
          product_id: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_preview?: boolean
          order_index?: number
          pages_end?: number | null
          pages_start?: number | null
          product_id: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_preview?: boolean
          order_index?: number
          pages_end?: number | null
          pages_start?: number | null
          product_id?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_ebook_chapters_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_ebook_chapters_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_ebook_chapters_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_ebook_files: {
        Row: {
          checksum_sha256: string | null
          created_at: string
          file_size_bytes: number | null
          file_url: string
          format: string
          id: string
          is_active: boolean
          is_default: boolean
          language: string
          metadata: Json
          pages: number | null
          product_id: string
          updated_at: string
          version: string
        }
        Insert: {
          checksum_sha256?: string | null
          created_at?: string
          file_size_bytes?: number | null
          file_url: string
          format: string
          id?: string
          is_active?: boolean
          is_default?: boolean
          language?: string
          metadata?: Json
          pages?: number | null
          product_id: string
          updated_at?: string
          version?: string
        }
        Update: {
          checksum_sha256?: string | null
          created_at?: string
          file_size_bytes?: number | null
          file_url?: string
          format?: string
          id?: string
          is_active?: boolean
          is_default?: boolean
          language?: string
          metadata?: Json
          pages?: number | null
          product_id?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_ebook_files_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_ebook_files_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_ebook_files_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_enrollments: {
        Row: {
          completed_at: string | null
          created_at: string
          expires_at: string | null
          granted_at: string
          id: string
          last_accessed_at: string | null
          metadata: Json
          order_id: string | null
          product_id: string
          progress_percent: number
          revoked_at: string | null
          revoked_reason: string | null
          source: string
          status: Database['public']['Enums']['academy_enrollment_status']
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          last_accessed_at?: string | null
          metadata?: Json
          order_id?: string | null
          product_id: string
          progress_percent?: number
          revoked_at?: string | null
          revoked_reason?: string | null
          source?: string
          status?: Database['public']['Enums']['academy_enrollment_status']
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          last_accessed_at?: string | null
          metadata?: Json
          order_id?: string | null
          product_id?: string
          progress_percent?: number
          revoked_at?: string | null
          revoked_reason?: string | null
          source?: string
          status?: Database['public']['Enums']['academy_enrollment_status']
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_enrollments_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_enrollments_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_enrollments_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_enrollments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_follows: {
        Row: {
          created_at: string
          followed_user_id: string
          follower_user_id: string
          id: string
        }
        Insert: {
          created_at?: string
          followed_user_id: string
          follower_user_id: string
          id?: string
        }
        Update: {
          created_at?: string
          followed_user_id?: string
          follower_user_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_follows_followed_user_id_fkey'
            columns: ['followed_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_follows_follower_user_id_fkey'
            columns: ['follower_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_lesson_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          first_watched_at: string
          id: string
          last_position_seconds: number
          last_watched_at: string
          lesson_id: string
          metadata: Json
          product_id: string
          seconds_watched: number
          updated_at: string
          user_id: string
          watch_count: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          first_watched_at?: string
          id?: string
          last_position_seconds?: number
          last_watched_at?: string
          lesson_id: string
          metadata?: Json
          product_id: string
          seconds_watched?: number
          updated_at?: string
          user_id: string
          watch_count?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          first_watched_at?: string
          id?: string
          last_position_seconds?: number
          last_watched_at?: string
          lesson_id?: string
          metadata?: Json
          product_id?: string
          seconds_watched?: number
          updated_at?: string
          user_id?: string
          watch_count?: number
        }
        Relationships: [
          {
            foreignKeyName: 'academy_lesson_progress_lesson_id_fkey'
            columns: ['lesson_id']
            isOneToOne: false
            referencedRelation: 'academy_lessons'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lesson_progress_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lesson_progress_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lesson_progress_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lesson_progress_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_lesson_resources: {
        Row: {
          created_at: string
          id: string
          kind: string
          label: string
          lesson_id: string
          order_index: number
          size_bytes: number | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          label: string
          lesson_id: string
          order_index?: number
          size_bytes?: number | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          label?: string
          lesson_id?: string
          order_index?: number
          size_bytes?: number | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_lesson_resources_lesson_id_fkey'
            columns: ['lesson_id']
            isOneToOne: false
            referencedRelation: 'academy_lessons'
            referencedColumns: ['id']
          },
        ]
      }
      academy_lessons: {
        Row: {
          attachments_count: number
          body_md: string | null
          created_at: string
          duration_seconds: number | null
          id: string
          is_free_for_all: boolean
          is_preview: boolean
          live_id: string | null
          module_id: string
          order_index: number
          product_id: string
          subtitle: string | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
          video_provider: string | null
          video_url: string | null
        }
        Insert: {
          attachments_count?: number
          body_md?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          is_free_for_all?: boolean
          is_preview?: boolean
          live_id?: string | null
          module_id: string
          order_index?: number
          product_id: string
          subtitle?: string | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
          video_provider?: string | null
          video_url?: string | null
        }
        Update: {
          attachments_count?: number
          body_md?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          is_free_for_all?: boolean
          is_preview?: boolean
          live_id?: string | null
          module_id?: string
          order_index?: number
          product_id?: string
          subtitle?: string | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
          video_provider?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'academy_lessons_module_id_fkey'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'academy_modules'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lessons_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lessons_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lessons_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_live_registrations: {
        Row: {
          attended: boolean
          id: string
          joined_at: string | null
          left_at: string | null
          live_id: string
          metadata: Json
          registered_at: string
          user_id: string
          watch_seconds: number
        }
        Insert: {
          attended?: boolean
          id?: string
          joined_at?: string | null
          left_at?: string | null
          live_id: string
          metadata?: Json
          registered_at?: string
          user_id: string
          watch_seconds?: number
        }
        Update: {
          attended?: boolean
          id?: string
          joined_at?: string | null
          left_at?: string | null
          live_id?: string
          metadata?: Json
          registered_at?: string
          user_id?: string
          watch_seconds?: number
        }
        Relationships: [
          {
            foreignKeyName: 'academy_live_registrations_live_id_fkey'
            columns: ['live_id']
            isOneToOne: false
            referencedRelation: 'academy_lives'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_live_registrations_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_lives: {
        Row: {
          attended_count: number
          cover_url: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          ended_at: string | null
          host_author_id: string | null
          id: string
          max_attendees: number | null
          metadata: Json
          og_image_url: string | null
          product_id: string | null
          recording_available_until: string | null
          recording_url: string | null
          registration_count: number
          scheduled_at: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          started_at: string | null
          status: Database['public']['Enums']['academy_live_status']
          stream_provider: string | null
          stream_url: string | null
          title: string
          updated_at: string
          visibility: Database['public']['Enums']['academy_live_visibility']
        }
        Insert: {
          attended_count?: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          ended_at?: string | null
          host_author_id?: string | null
          id?: string
          max_attendees?: number | null
          metadata?: Json
          og_image_url?: string | null
          product_id?: string | null
          recording_available_until?: string | null
          recording_url?: string | null
          registration_count?: number
          scheduled_at: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          started_at?: string | null
          status?: Database['public']['Enums']['academy_live_status']
          stream_provider?: string | null
          stream_url?: string | null
          title: string
          updated_at?: string
          visibility?: Database['public']['Enums']['academy_live_visibility']
        }
        Update: {
          attended_count?: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          ended_at?: string | null
          host_author_id?: string | null
          id?: string
          max_attendees?: number | null
          metadata?: Json
          og_image_url?: string | null
          product_id?: string | null
          recording_available_until?: string | null
          recording_url?: string | null
          registration_count?: number
          scheduled_at?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          started_at?: string | null
          status?: Database['public']['Enums']['academy_live_status']
          stream_provider?: string | null
          stream_url?: string | null
          title?: string
          updated_at?: string
          visibility?: Database['public']['Enums']['academy_live_visibility']
        }
        Relationships: [
          {
            foreignKeyName: 'academy_lives_host_author_id_fkey'
            columns: ['host_author_id']
            isOneToOne: false
            referencedRelation: 'academy_authors'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lives_host_author_id_fkey'
            columns: ['host_author_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['author_id']
          },
          {
            foreignKeyName: 'academy_lives_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lives_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_lives_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_modules: {
        Row: {
          cover_url: string | null
          created_at: string
          duration_minutes: number
          id: string
          lesson_count: number
          order_index: number
          product_id: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          lesson_count?: number
          order_index?: number
          product_id: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          lesson_count?: number
          order_index?: number
          product_id?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_modules_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_modules_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_modules_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_mp_webhooks: {
        Row: {
          action: string | null
          error_message: string | null
          id: string
          order_id: string | null
          payload: Json
          payment_id: string | null
          processed_at: string | null
          processing_attempts: number
          processing_status: string
          received_at: string
          resource_id: string
          signature: string | null
          topic: string
        }
        Insert: {
          action?: string | null
          error_message?: string | null
          id?: string
          order_id?: string | null
          payload: Json
          payment_id?: string | null
          processed_at?: string | null
          processing_attempts?: number
          processing_status?: string
          received_at?: string
          resource_id: string
          signature?: string | null
          topic: string
        }
        Update: {
          action?: string | null
          error_message?: string | null
          id?: string
          order_id?: string | null
          payload?: Json
          payment_id?: string | null
          processed_at?: string | null
          processing_attempts?: number
          processing_status?: string
          received_at?: string
          resource_id?: string
          signature?: string | null
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_mp_webhooks_payment_id_fkey'
            columns: ['payment_id']
            isOneToOne: false
            referencedRelation: 'academy_payments'
            referencedColumns: ['id']
          },
        ]
      }
      academy_notifications: {
        Row: {
          archived_at: string | null
          body: string | null
          created_at: string
          expires_at: string | null
          icon_name: string | null
          id: string
          link_url: string | null
          payload: Json
          read_at: string | null
          title: string
          type: Database['public']['Enums']['academy_notification_type']
          user_id: string
        }
        Insert: {
          archived_at?: string | null
          body?: string | null
          created_at?: string
          expires_at?: string | null
          icon_name?: string | null
          id?: string
          link_url?: string | null
          payload?: Json
          read_at?: string | null
          title: string
          type: Database['public']['Enums']['academy_notification_type']
          user_id: string
        }
        Update: {
          archived_at?: string | null
          body?: string | null
          created_at?: string
          expires_at?: string | null
          icon_name?: string | null
          id?: string
          link_url?: string | null
          payload?: Json
          read_at?: string | null
          title?: string
          type?: Database['public']['Enums']['academy_notification_type']
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_order_items: {
        Row: {
          created_at: string
          discount_cents: number
          id: string
          metadata: Json
          order_id: string
          product_id: string
          product_slug_snapshot: string
          product_title_snapshot: string
          product_type_snapshot: Database['public']['Enums']['academy_product_type']
          quantity: number
          total_cents: number
          unit_price_cents: number
        }
        Insert: {
          created_at?: string
          discount_cents?: number
          id?: string
          metadata?: Json
          order_id: string
          product_id: string
          product_slug_snapshot: string
          product_title_snapshot: string
          product_type_snapshot: Database['public']['Enums']['academy_product_type']
          quantity?: number
          total_cents: number
          unit_price_cents: number
        }
        Update: {
          created_at?: string
          discount_cents?: number
          id?: string
          metadata?: Json
          order_id?: string
          product_id?: string
          product_slug_snapshot?: string
          product_title_snapshot?: string
          product_type_snapshot?: Database['public']['Enums']['academy_product_type']
          quantity?: number
          total_cents?: number
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: 'academy_order_items_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'academy_orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_order_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_order_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_order_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_orders: {
        Row: {
          buyer_cpf: string | null
          buyer_email: string | null
          buyer_full_name: string | null
          buyer_phone: string | null
          cancelled_at: string | null
          coupon_code_snapshot: string | null
          coupon_id: string | null
          created_at: string
          currency: string
          discount_cents: number
          expires_at: string | null
          failed_at: string | null
          id: string
          ip_address: unknown
          metadata: Json
          number: string
          paid_at: string | null
          payment_external_id: string | null
          payment_method: Database['public']['Enums']['academy_payment_method'] | null
          payment_provider: string | null
          payment_url: string | null
          pending_at: string | null
          refunded_at: string | null
          status: Database['public']['Enums']['academy_order_status']
          subtotal_cents: number
          total_cents: number
          updated_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          buyer_cpf?: string | null
          buyer_email?: string | null
          buyer_full_name?: string | null
          buyer_phone?: string | null
          cancelled_at?: string | null
          coupon_code_snapshot?: string | null
          coupon_id?: string | null
          created_at?: string
          currency?: string
          discount_cents?: number
          expires_at?: string | null
          failed_at?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json
          number: string
          paid_at?: string | null
          payment_external_id?: string | null
          payment_method?: Database['public']['Enums']['academy_payment_method'] | null
          payment_provider?: string | null
          payment_url?: string | null
          pending_at?: string | null
          refunded_at?: string | null
          status?: Database['public']['Enums']['academy_order_status']
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          buyer_cpf?: string | null
          buyer_email?: string | null
          buyer_full_name?: string | null
          buyer_phone?: string | null
          cancelled_at?: string | null
          coupon_code_snapshot?: string | null
          coupon_id?: string | null
          created_at?: string
          currency?: string
          discount_cents?: number
          expires_at?: string | null
          failed_at?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json
          number?: string
          paid_at?: string | null
          payment_external_id?: string | null
          payment_method?: Database['public']['Enums']['academy_payment_method'] | null
          payment_provider?: string | null
          payment_url?: string | null
          pending_at?: string | null
          refunded_at?: string | null
          status?: Database['public']['Enums']['academy_order_status']
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_orders_coupon_id_fkey'
            columns: ['coupon_id']
            isOneToOne: false
            referencedRelation: 'academy_coupons'
            referencedColumns: ['id']
          },
        ]
      }
      academy_payments: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          gateway_response: Json
          id: string
          installments: number | null
          metadata: Json
          method: Database['public']['Enums']['academy_payment_method']
          mp_payment_id: string | null
          mp_payment_type: string | null
          mp_status: string | null
          mp_status_detail: string | null
          order_id: string
          paid_at: string | null
          refund_amount_cents: number | null
          refunded_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          gateway_response?: Json
          id?: string
          installments?: number | null
          metadata?: Json
          method: Database['public']['Enums']['academy_payment_method']
          mp_payment_id?: string | null
          mp_payment_type?: string | null
          mp_status?: string | null
          mp_status_detail?: string | null
          order_id: string
          paid_at?: string | null
          refund_amount_cents?: number | null
          refunded_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          gateway_response?: Json
          id?: string
          installments?: number | null
          metadata?: Json
          method?: Database['public']['Enums']['academy_payment_method']
          mp_payment_id?: string | null
          mp_payment_type?: string | null
          mp_status?: string | null
          mp_status_detail?: string | null
          order_id?: string
          paid_at?: string | null
          refund_amount_cents?: number | null
          refunded_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      academy_posts: {
        Row: {
          author_user_id: string
          body_md: string | null
          comment_count: number
          created_at: string
          edited_at: string | null
          hidden_at: string | null
          id: string
          last_activity_at: string
          locked: boolean
          media: Json
          metadata: Json
          pinned: boolean
          reaction_count: number
          space_id: string
          status: Database['public']['Enums']['academy_post_status']
          title: string | null
          type: Database['public']['Enums']['academy_post_type']
          updated_at: string
          view_count: number
        }
        Insert: {
          author_user_id: string
          body_md?: string | null
          comment_count?: number
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          id?: string
          last_activity_at?: string
          locked?: boolean
          media?: Json
          metadata?: Json
          pinned?: boolean
          reaction_count?: number
          space_id: string
          status?: Database['public']['Enums']['academy_post_status']
          title?: string | null
          type?: Database['public']['Enums']['academy_post_type']
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_user_id?: string
          body_md?: string | null
          comment_count?: number
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          id?: string
          last_activity_at?: string
          locked?: boolean
          media?: Json
          metadata?: Json
          pinned?: boolean
          reaction_count?: number
          space_id?: string
          status?: Database['public']['Enums']['academy_post_status']
          title?: string | null
          type?: Database['public']['Enums']['academy_post_type']
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: 'academy_posts_author_user_id_fkey'
            columns: ['author_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_posts_space_id_fkey'
            columns: ['space_id']
            isOneToOne: false
            referencedRelation: 'academy_community_spaces'
            referencedColumns: ['id']
          },
        ]
      }
      academy_products: {
        Row: {
          access_duration_days: number | null
          archived_at: string | null
          author_id: string
          avg_rating: number
          bestseller: boolean
          business_unit: Database['public']['Enums']['business_unit']
          category_id: string | null
          cover_url: string
          created_at: string
          currency: string
          duration_minutes: number | null
          featured: boolean
          featured_order: number | null
          gallery: Json
          highlights: Json
          id: string
          included_in_subscription: boolean
          lesson_count: number
          level: Database['public']['Enums']['academy_product_level']
          long_description: Json | null
          max_devices: number
          metadata: Json
          module_count: number
          new_release: boolean
          og_image_url: string | null
          original_price_cents: number | null
          page_count: number | null
          preview_file_url: string | null
          price_cents: number
          published_at: string | null
          rating_count: number
          requirements: Json
          sales_count: number
          search_tsv: unknown
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          short_description: string | null
          slug: string
          status: Database['public']['Enums']['academy_product_status']
          subtitle: string | null
          target_audience: Json | null
          thumbnail_url: string | null
          title: string
          trailer_video_url: string | null
          type: Database['public']['Enums']['academy_product_type']
          updated_at: string
          views_count: number
        }
        Insert: {
          access_duration_days?: number | null
          archived_at?: string | null
          author_id: string
          avg_rating?: number
          bestseller?: boolean
          business_unit: Database['public']['Enums']['business_unit']
          category_id?: string | null
          cover_url: string
          created_at?: string
          currency?: string
          duration_minutes?: number | null
          featured?: boolean
          featured_order?: number | null
          gallery?: Json
          highlights?: Json
          id?: string
          included_in_subscription?: boolean
          lesson_count?: number
          level?: Database['public']['Enums']['academy_product_level']
          long_description?: Json | null
          max_devices?: number
          metadata?: Json
          module_count?: number
          new_release?: boolean
          og_image_url?: string | null
          original_price_cents?: number | null
          page_count?: number | null
          preview_file_url?: string | null
          price_cents: number
          published_at?: string | null
          rating_count?: number
          requirements?: Json
          sales_count?: number
          search_tsv?: unknown
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          status?: Database['public']['Enums']['academy_product_status']
          subtitle?: string | null
          target_audience?: Json | null
          thumbnail_url?: string | null
          title: string
          trailer_video_url?: string | null
          type: Database['public']['Enums']['academy_product_type']
          updated_at?: string
          views_count?: number
        }
        Update: {
          access_duration_days?: number | null
          archived_at?: string | null
          author_id?: string
          avg_rating?: number
          bestseller?: boolean
          business_unit?: Database['public']['Enums']['business_unit']
          category_id?: string | null
          cover_url?: string
          created_at?: string
          currency?: string
          duration_minutes?: number | null
          featured?: boolean
          featured_order?: number | null
          gallery?: Json
          highlights?: Json
          id?: string
          included_in_subscription?: boolean
          lesson_count?: number
          level?: Database['public']['Enums']['academy_product_level']
          long_description?: Json | null
          max_devices?: number
          metadata?: Json
          module_count?: number
          new_release?: boolean
          og_image_url?: string | null
          original_price_cents?: number | null
          page_count?: number | null
          preview_file_url?: string | null
          price_cents?: number
          published_at?: string | null
          rating_count?: number
          requirements?: Json
          sales_count?: number
          search_tsv?: unknown
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          status?: Database['public']['Enums']['academy_product_status']
          subtitle?: string | null
          target_audience?: Json | null
          thumbnail_url?: string | null
          title?: string
          trailer_video_url?: string | null
          type?: Database['public']['Enums']['academy_product_type']
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: 'academy_products_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'academy_authors'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_products_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['author_id']
          },
          {
            foreignKeyName: 'academy_products_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'academy_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_products_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['category_id']
          },
        ]
      }
      academy_progress_events: {
        Row: {
          event: Database['public']['Enums']['academy_progress_event']
          id: string
          lesson_id: string | null
          metadata: Json
          occurred_at: string
          product_id: string
          user_id: string
        }
        Insert: {
          event: Database['public']['Enums']['academy_progress_event']
          id?: string
          lesson_id?: string | null
          metadata?: Json
          occurred_at?: string
          product_id: string
          user_id: string
        }
        Update: {
          event?: Database['public']['Enums']['academy_progress_event']
          id?: string
          lesson_id?: string | null
          metadata?: Json
          occurred_at?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_progress_events_lesson_id_fkey'
            columns: ['lesson_id']
            isOneToOne: false
            referencedRelation: 'academy_lessons'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_progress_events_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_progress_events_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_progress_events_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_progress_events_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_reactions: {
        Row: {
          created_at: string
          id: string
          kind: string
          target_id: string
          target_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          target_id: string
          target_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          target_id?: string
          target_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_reactions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          reason: string
          reporter_user_id: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          reason: string
          reporter_user_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          reason?: string
          reporter_user_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_reports_reporter_user_id_fkey'
            columns: ['reporter_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_reports_resolved_by_fkey'
            columns: ['resolved_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_reviews: {
        Row: {
          body: string | null
          created_at: string
          helpful_count: number
          id: string
          product_id: string
          rating: number
          replied_at: string | null
          replied_by: string | null
          reply_text: string | null
          status: Database['public']['Enums']['academy_review_status']
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          helpful_count?: number
          id?: string
          product_id: string
          rating: number
          replied_at?: string | null
          replied_by?: string | null
          reply_text?: string | null
          status?: Database['public']['Enums']['academy_review_status']
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          helpful_count?: number
          id?: string
          product_id?: string
          rating?: number
          replied_at?: string | null
          replied_by?: string | null
          reply_text?: string | null
          status?: Database['public']['Enums']['academy_review_status']
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_reviews_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_reviews_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_reviews_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_reviews_replied_by_fkey'
            columns: ['replied_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_reviews_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      academy_subscription_plans: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          id: string
          interval: string
          metadata: Json
          mp_preapproval_plan_id: string | null
          name: string
          price_cents: number
          product_id: string
          slug: string
          trial_days: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          interval: string
          metadata?: Json
          mp_preapproval_plan_id?: string | null
          name: string
          price_cents: number
          product_id: string
          slug: string
          trial_days?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          interval?: string
          metadata?: Json
          mp_preapproval_plan_id?: string | null
          name?: string
          price_cents?: number
          product_id?: string
          slug?: string
          trial_days?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_subscription_plans_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_subscription_plans_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_subscription_plans_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
        ]
      }
      academy_subscriptions: {
        Row: {
          cancelled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          metadata: Json
          mp_preapproval_id: string | null
          paused_at: string | null
          plan_id: string
          started_at: string
          status: string
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          metadata?: Json
          mp_preapproval_id?: string | null
          paused_at?: string | null
          plan_id: string
          started_at?: string
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          metadata?: Json
          mp_preapproval_id?: string | null
          paused_at?: string | null
          plan_id?: string
          started_at?: string
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academy_subscriptions_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'academy_subscription_plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_subscriptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
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
          type: Database['public']['Enums']['activity_type']
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
          type: Database['public']['Enums']['activity_type']
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
          type?: Database['public']['Enums']['activity_type']
        }
        Relationships: [
          {
            foreignKeyName: 'activities_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
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
            foreignKeyName: 'attachments_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attachments_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          after: Json | null
          before: Json | null
          diff: Json | null
          entity: string
          entity_id: string | null
          id: number
          ts: string
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          diff?: Json | null
          entity: string
          entity_id?: string | null
          id?: number
          ts?: string
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          diff?: Json | null
          entity?: string
          entity_id?: string | null
          id?: number
          ts?: string
        }
        Relationships: []
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
          trigger_type: Database['public']['Enums']['automation_trigger']
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
          trigger_type: Database['public']['Enums']['automation_trigger']
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
          trigger_type?: Database['public']['Enums']['automation_trigger']
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
            foreignKeyName: 'automation_runs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'automation_runs_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'automation_runs_rule_id_fkey'
            columns: ['rule_id']
            isOneToOne: false
            referencedRelation: 'automation_rules'
            referencedColumns: ['id']
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
            foreignKeyName: 'campaign_leads_campaign_id_fkey'
            columns: ['campaign_id']
            isOneToOne: false
            referencedRelation: 'campaigns'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'campaign_leads_campaign_id_fkey'
            columns: ['campaign_id']
            isOneToOne: false
            referencedRelation: 'v_campaign_performance'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'campaign_leads_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      campaigns: {
        Row: {
          budget_brl: number | null
          channel: Database['public']['Enums']['campaign_channel']
          created_at: string
          end_at: string | null
          goal: string | null
          id: string
          metadata: Json
          name: string
          slug: string
          spent_brl: number
          start_at: string | null
          status: Database['public']['Enums']['campaign_status']
          unit: Database['public']['Enums']['business_unit'] | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          budget_brl?: number | null
          channel: Database['public']['Enums']['campaign_channel']
          created_at?: string
          end_at?: string | null
          goal?: string | null
          id?: string
          metadata?: Json
          name: string
          slug: string
          spent_brl?: number
          start_at?: string | null
          status?: Database['public']['Enums']['campaign_status']
          unit?: Database['public']['Enums']['business_unit'] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          budget_brl?: number | null
          channel?: Database['public']['Enums']['campaign_channel']
          created_at?: string
          end_at?: string | null
          goal?: string | null
          id?: string
          metadata?: Json
          name?: string
          slug?: string
          spent_brl?: number
          start_at?: string | null
          status?: Database['public']['Enums']['campaign_status']
          unit?: Database['public']['Enums']['business_unit'] | null
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
          status: Database['public']['Enums']['client_status']
          unit: Database['public']['Enums']['business_unit']
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
          status?: Database['public']['Enums']['client_status']
          unit: Database['public']['Enums']['business_unit']
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
          status?: Database['public']['Enums']['client_status']
          unit?: Database['public']['Enums']['business_unit']
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'clients_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
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
            foreignKeyName: 'invoice_items_invoice_id_fkey'
            columns: ['invoice_id']
            isOneToOne: false
            referencedRelation: 'invoices'
            referencedColumns: ['id']
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
          status: Database['public']['Enums']['invoice_status']
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
          status?: Database['public']['Enums']['invoice_status']
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
          status?: Database['public']['Enums']['invoice_status']
          subtotal_brl?: number
          tax_brl?: number
          total_brl?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invoices_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invoices_opportunity_id_fkey'
            columns: ['opportunity_id']
            isOneToOne: false
            referencedRelation: 'opportunities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invoices_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
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
            foreignKeyName: 'lead_service_interests_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_service_interests_package_id_fkey'
            columns: ['package_id']
            isOneToOne: false
            referencedRelation: 'service_packages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_service_interests_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
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
            foreignKeyName: 'lead_tags_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
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
          lead_type: Database['public']['Enums']['lead_type']
          name: string
          notes: string | null
          owner_id: string | null
          phone: string | null
          segment: Database['public']['Enums']['lead_segment']
          source: string | null
          stage_id: string | null
          status: Database['public']['Enums']['lead_status']
          updated_at: string
          utm: Json | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          details?: Json
          email?: string | null
          id?: string
          lead_type: Database['public']['Enums']['lead_type']
          name: string
          notes?: string | null
          owner_id?: string | null
          phone?: string | null
          segment: Database['public']['Enums']['lead_segment']
          source?: string | null
          stage_id?: string | null
          status?: Database['public']['Enums']['lead_status']
          updated_at?: string
          utm?: Json | null
        }
        Update: {
          city?: string | null
          created_at?: string
          details?: Json
          email?: string | null
          id?: string
          lead_type?: Database['public']['Enums']['lead_type']
          name?: string
          notes?: string | null
          owner_id?: string | null
          phone?: string | null
          segment?: Database['public']['Enums']['lead_segment']
          source?: string | null
          stage_id?: string | null
          status?: Database['public']['Enums']['lead_status']
          updated_at?: string
          utm?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'leads_stage_id_fkey'
            columns: ['stage_id']
            isOneToOne: false
            referencedRelation: 'pipeline_stages'
            referencedColumns: ['id']
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
            foreignKeyName: 'notes_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
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
          stage: Database['public']['Enums']['opportunity_stage']
          title: string
          unit: Database['public']['Enums']['business_unit']
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
          stage?: Database['public']['Enums']['opportunity_stage']
          title: string
          unit: Database['public']['Enums']['business_unit']
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
          stage?: Database['public']['Enums']['opportunity_stage']
          title?: string
          unit?: Database['public']['Enums']['business_unit']
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'opportunities_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'opportunities_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
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
          method: Database['public']['Enums']['payment_method']
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
          method: Database['public']['Enums']['payment_method']
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
          method?: Database['public']['Enums']['payment_method']
          paid_at?: string
          reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'payments_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_invoice_id_fkey'
            columns: ['invoice_id']
            isOneToOne: false
            referencedRelation: 'invoices'
            referencedColumns: ['id']
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
          segment: Database['public']['Enums']['lead_segment']
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_lost?: boolean
          is_won?: boolean
          name: string
          position: number
          segment: Database['public']['Enums']['lead_segment']
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          is_lost?: boolean
          is_won?: boolean
          name?: string
          position?: number
          segment?: Database['public']['Enums']['lead_segment']
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birthdate: string | null
          city: string | null
          country: string | null
          cover_url: string | null
          cpf: string | null
          created_at: string
          display_name: string | null
          email: string
          email_verified: boolean | null
          full_name: string
          gender: string | null
          id: string
          instagram_handle: string | null
          last_login_at: string | null
          linkedin_handle: string | null
          locale: string | null
          marketing_consent: boolean | null
          metadata: Json | null
          onboarding_completed: boolean | null
          phone: string | null
          role: string
          state: string | null
          stripe_customer_id: string | null
          terms_accepted_at: string | null
          tiktok_handle: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birthdate?: string | null
          city?: string | null
          country?: string | null
          cover_url?: string | null
          cpf?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          email_verified?: boolean | null
          full_name: string
          gender?: string | null
          id: string
          instagram_handle?: string | null
          last_login_at?: string | null
          linkedin_handle?: string | null
          locale?: string | null
          marketing_consent?: boolean | null
          metadata?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          role?: string
          state?: string | null
          stripe_customer_id?: string | null
          terms_accepted_at?: string | null
          tiktok_handle?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birthdate?: string | null
          city?: string | null
          country?: string | null
          cover_url?: string | null
          cpf?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string
          gender?: string | null
          id?: string
          instagram_handle?: string | null
          last_login_at?: string | null
          linkedin_handle?: string | null
          locale?: string | null
          marketing_consent?: boolean | null
          metadata?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          role?: string
          state?: string | null
          stripe_customer_id?: string | null
          terms_accepted_at?: string | null
          tiktok_handle?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          kind: Database['public']['Enums']['quote_item_kind']
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
          kind: Database['public']['Enums']['quote_item_kind']
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
          kind?: Database['public']['Enums']['quote_item_kind']
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
            foreignKeyName: 'quote_items_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
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
          status: Database['public']['Enums']['quote_status']
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
          status?: Database['public']['Enums']['quote_status']
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
          status?: Database['public']['Enums']['quote_status']
          subtotal_brl?: number
          title?: string
          total_brl?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'quotes_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
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
            foreignKeyName: 'service_addons_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
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
            foreignKeyName: 'service_packages_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
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
          unit: Database['public']['Enums']['business_unit']
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
          unit: Database['public']['Enums']['business_unit']
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
          unit?: Database['public']['Enums']['business_unit']
          updated_at?: string
        }
        Relationships: []
      }
      store_addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          line1: string
          line2: string | null
          phone: string | null
          postal_code: string
          recipient: string
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          line1: string
          line2?: string | null
          phone?: string | null
          postal_code: string
          recipient: string
          state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          line1?: string
          line2?: string | null
          phone?: string | null
          postal_code?: string
          recipient?: string
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      store_cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: string
          price_id: string
          quantity: number
          unit_amount: number
          updated_at: string
          variant_id: string | null
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: string
          price_id: string
          quantity?: number
          unit_amount: number
          updated_at?: string
          variant_id?: string | null
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: string
          price_id?: string
          quantity?: number
          unit_amount?: number
          updated_at?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'store_cart_items_cart_id_fkey'
            columns: ['cart_id']
            isOneToOne: false
            referencedRelation: 'store_carts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_cart_items_price_id_fkey'
            columns: ['price_id']
            isOneToOne: false
            referencedRelation: 'store_prices'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_cart_items_variant_id_fkey'
            columns: ['variant_id']
            isOneToOne: false
            referencedRelation: 'store_product_variants'
            referencedColumns: ['id']
          },
        ]
      }
      store_carts: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      store_categories: {
        Row: {
          active: boolean
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json
          name: string
          parent_id: string | null
          position: number
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          name: string
          parent_id?: string | null
          position?: number
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          name?: string
          parent_id?: string | null
          position?: number
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_categories_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'store_categories'
            referencedColumns: ['id']
          },
        ]
      }
      store_coupons: {
        Row: {
          active: boolean
          amount_off: number | null
          code: string
          created_at: string
          currency: string | null
          id: string
          max_redemptions: number | null
          metadata: Json
          percent_off: number | null
          stripe_coupon_id: string | null
          stripe_promo_code_id: string | null
          times_redeemed: number
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          active?: boolean
          amount_off?: number | null
          code: string
          created_at?: string
          currency?: string | null
          id?: string
          max_redemptions?: number | null
          metadata?: Json
          percent_off?: number | null
          stripe_coupon_id?: string | null
          stripe_promo_code_id?: string | null
          times_redeemed?: number
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          active?: boolean
          amount_off?: number | null
          code?: string
          created_at?: string
          currency?: string | null
          id?: string
          max_redemptions?: number | null
          metadata?: Json
          percent_off?: number | null
          stripe_coupon_id?: string | null
          stripe_promo_code_id?: string | null
          times_redeemed?: number
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      store_inventory_movements: {
        Row: {
          created_at: string
          delta: number
          id: string
          note: string | null
          reason: string
          reference_id: string | null
          variant_id: string
        }
        Insert: {
          created_at?: string
          delta: number
          id?: string
          note?: string | null
          reason: string
          reference_id?: string | null
          variant_id: string
        }
        Update: {
          created_at?: string
          delta?: number
          id?: string
          note?: string | null
          reason?: string
          reference_id?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_inventory_movements_variant_id_fkey'
            columns: ['variant_id']
            isOneToOne: false
            referencedRelation: 'store_product_variants'
            referencedColumns: ['id']
          },
        ]
      }
      store_order_events: {
        Row: {
          actor: string | null
          created_at: string
          id: string
          metadata: Json
          note: string | null
          order_id: string
          status: Database['public']['Enums']['store_order_status']
        }
        Insert: {
          actor?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          note?: string | null
          order_id: string
          status: Database['public']['Enums']['store_order_status']
        }
        Update: {
          actor?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          note?: string | null
          order_id?: string
          status?: Database['public']['Enums']['store_order_status']
        }
        Relationships: [
          {
            foreignKeyName: 'store_order_events_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'store_orders'
            referencedColumns: ['id']
          },
        ]
      }
      store_order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_snapshot: Json
          quantity: number
          stripe_price_id: string
          total_amount: number
          unit_amount: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_snapshot?: Json
          quantity?: number
          stripe_price_id: string
          total_amount: number
          unit_amount: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_snapshot?: Json
          quantity?: number
          stripe_price_id?: string
          total_amount?: number
          unit_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: 'store_order_items_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'store_orders'
            referencedColumns: ['id']
          },
        ]
      }
      store_orders: {
        Row: {
          billing_address: Json | null
          buyer_cpf: string | null
          buyer_email: string
          buyer_name: string | null
          buyer_phone: string | null
          cancelled_at: string | null
          coupon_code_snapshot: string | null
          coupon_id: string | null
          created_at: string
          currency: string
          discount_cents: number
          failed_at: string | null
          id: string
          idempotency_key: string | null
          ip_address: unknown
          metadata: Json
          nfse_id: string | null
          nfse_issued_at: string | null
          nfse_number: string | null
          nfse_status: string | null
          nfse_url: string | null
          notes: string | null
          order_number: string
          paid_at: string | null
          pending_at: string | null
          recaptcha_score: number | null
          refunded_at: string | null
          shipping_address: Json | null
          status: Database['public']['Enums']['store_order_status']
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          subtotal_cents: number
          tax_cents: number
          total_cents: number
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          buyer_cpf?: string | null
          buyer_email: string
          buyer_name?: string | null
          buyer_phone?: string | null
          cancelled_at?: string | null
          coupon_code_snapshot?: string | null
          coupon_id?: string | null
          created_at?: string
          currency?: string
          discount_cents?: number
          failed_at?: string | null
          id?: string
          idempotency_key?: string | null
          ip_address?: unknown
          metadata?: Json
          nfse_id?: string | null
          nfse_issued_at?: string | null
          nfse_number?: string | null
          nfse_status?: string | null
          nfse_url?: string | null
          notes?: string | null
          order_number?: string
          paid_at?: string | null
          pending_at?: string | null
          recaptcha_score?: number | null
          refunded_at?: string | null
          shipping_address?: Json | null
          status?: Database['public']['Enums']['store_order_status']
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal_cents?: number
          tax_cents?: number
          total_cents?: number
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          buyer_cpf?: string | null
          buyer_email?: string
          buyer_name?: string | null
          buyer_phone?: string | null
          cancelled_at?: string | null
          coupon_code_snapshot?: string | null
          coupon_id?: string | null
          created_at?: string
          currency?: string
          discount_cents?: number
          failed_at?: string | null
          id?: string
          idempotency_key?: string | null
          ip_address?: unknown
          metadata?: Json
          nfse_id?: string | null
          nfse_issued_at?: string | null
          nfse_number?: string | null
          nfse_status?: string | null
          nfse_url?: string | null
          notes?: string | null
          order_number?: string
          paid_at?: string | null
          pending_at?: string | null
          recaptcha_score?: number | null
          refunded_at?: string | null
          shipping_address?: Json | null
          status?: Database['public']['Enums']['store_order_status']
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal_cents?: number
          tax_cents?: number
          total_cents?: number
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'store_orders_coupon_id_fkey'
            columns: ['coupon_id']
            isOneToOne: false
            referencedRelation: 'store_coupons'
            referencedColumns: ['id']
          },
        ]
      }
      store_prices: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          id: string
          metadata: Json
          nickname: string | null
          price_type: Database['public']['Enums']['store_price_type']
          product_id: string
          recurring_interval: Database['public']['Enums']['store_recurring_interval'] | null
          recurring_interval_count: number | null
          stripe_price_id: string
          trial_period_days: number | null
          unit_amount: number
          unit_amount_decimal: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          nickname?: string | null
          price_type?: Database['public']['Enums']['store_price_type']
          product_id: string
          recurring_interval?: Database['public']['Enums']['store_recurring_interval'] | null
          recurring_interval_count?: number | null
          stripe_price_id: string
          trial_period_days?: number | null
          unit_amount: number
          unit_amount_decimal?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          nickname?: string | null
          price_type?: Database['public']['Enums']['store_price_type']
          product_id?: string
          recurring_interval?: Database['public']['Enums']['store_recurring_interval'] | null
          recurring_interval_count?: number | null
          stripe_price_id?: string
          trial_period_days?: number | null
          unit_amount?: number
          unit_amount_decimal?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_prices_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'store_products'
            referencedColumns: ['id']
          },
        ]
      }
      store_product_categories: {
        Row: {
          category_id: string
          product_id: string
        }
        Insert: {
          category_id: string
          product_id: string
        }
        Update: {
          category_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_product_categories_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'store_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_product_categories_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'store_products'
            referencedColumns: ['id']
          },
        ]
      }
      store_product_variants: {
        Row: {
          active: boolean
          created_at: string
          id: string
          low_stock_threshold: number
          name: string
          options: Json
          position: number
          price_id: string | null
          product_id: string
          sku: string | null
          stock_qty: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          low_stock_threshold?: number
          name: string
          options?: Json
          position?: number
          price_id?: string | null
          product_id: string
          sku?: string | null
          stock_qty?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          low_stock_threshold?: number
          name?: string
          options?: Json
          position?: number
          price_id?: string | null
          product_id?: string
          sku?: string | null
          stock_qty?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_product_variants_price_id_fkey'
            columns: ['price_id']
            isOneToOne: false
            referencedRelation: 'store_prices'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_product_variants_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'store_products'
            referencedColumns: ['id']
          },
        ]
      }
      store_products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          featured: boolean
          featured_order: number | null
          features: Json
          id: string
          images: Json
          metadata: Json
          name: string
          og_image_url: string | null
          product_type: Database['public']['Enums']['store_product_type']
          search_tsv: unknown
          seo_description: string | null
          seo_title: string | null
          slug: string
          stripe_product_id: string
          stripe_synced_at: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          featured?: boolean
          featured_order?: number | null
          features?: Json
          id?: string
          images?: Json
          metadata?: Json
          name: string
          og_image_url?: string | null
          product_type?: Database['public']['Enums']['store_product_type']
          search_tsv?: unknown
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          stripe_product_id: string
          stripe_synced_at?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          featured?: boolean
          featured_order?: number | null
          features?: Json
          id?: string
          images?: Json
          metadata?: Json
          name?: string
          og_image_url?: string | null
          product_type?: Database['public']['Enums']['store_product_type']
          search_tsv?: unknown
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          stripe_product_id?: string
          stripe_synced_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      store_restock_alerts: {
        Row: {
          created_at: string
          email: string
          id: string
          notified_at: string | null
          variant_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          notified_at?: string | null
          variant_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          notified_at?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_restock_alerts_variant_id_fkey'
            columns: ['variant_id']
            isOneToOne: false
            referencedRelation: 'store_product_variants'
            referencedColumns: ['id']
          },
        ]
      }
      store_webhook_dead_letter: {
        Row: {
          attempts: number
          created_at: string
          event_id: string
          event_type: string
          id: string
          last_error: string | null
          payload: Json
        }
        Insert: {
          attempts?: number
          created_at?: string
          event_id: string
          event_type: string
          id?: string
          last_error?: string | null
          payload?: Json
        }
        Update: {
          attempts?: number
          created_at?: string
          event_id?: string
          event_type?: string
          id?: string
          last_error?: string | null
          payload?: Json
        }
        Relationships: []
      }
      store_webhook_events: {
        Row: {
          attempts: number
          created_at: string
          error: string | null
          event_id: string
          event_type: string
          id: string
          payload: Json
          processed_at: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          error?: string | null
          event_id: string
          event_type: string
          id?: string
          payload?: Json
          processed_at?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          error?: string | null
          event_id?: string
          event_type?: string
          id?: string
          payload?: Json
          processed_at?: string | null
        }
        Relationships: []
      }
      store_wishlists: {
        Row: {
          created_at: string
          id: string
          price_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          price_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          price_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_wishlists_price_id_fkey'
            columns: ['price_id']
            isOneToOne: false
            referencedRelation: 'store_prices'
            referencedColumns: ['id']
          },
        ]
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
            foreignKeyName: 'team_resources_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'team_resource_categories'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      mv_academy_catalog: {
        Row: {
          author_id: string | null
          author_name: string | null
          author_profile_avatar: string | null
          author_slug: string | null
          avatar_override_url: string | null
          avg_rating: number | null
          bestseller: boolean | null
          business_unit: Database['public']['Enums']['business_unit'] | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          cover_url: string | null
          currency: string | null
          duration_minutes: number | null
          featured: boolean | null
          featured_order: number | null
          id: string | null
          lesson_count: number | null
          level: Database['public']['Enums']['academy_product_level'] | null
          module_count: number | null
          new_release: boolean | null
          original_price_cents: number | null
          page_count: number | null
          price_cents: number | null
          published_at: string | null
          rating_count: number | null
          sales_count: number | null
          short_description: string | null
          slug: string | null
          subtitle: string | null
          thumbnail_url: string | null
          title: string | null
          type: Database['public']['Enums']['academy_product_type'] | null
        }
        Relationships: []
      }
      v_academy_certificate_public: {
        Row: {
          cert_code: string | null
          city: string | null
          coordinator_name: string | null
          coordinator_title: string | null
          course_accent: string | null
          course_accent_soft: string | null
          course_chapter: string | null
          course_index: string | null
          course_slug: string | null
          course_title: string | null
          course_title_en: string | null
          course_title_pt: string | null
          discipline: string | null
          end_date: string | null
          founder_name: string | null
          founder_title: string | null
          hours: number | null
          id: string | null
          is_revoked: boolean | null
          issued_at: string | null
          seal_kind: string | null
          start_date: string | null
          student_name: string | null
        }
        Relationships: []
      }
      v_academy_course_progress: {
        Row: {
          completed_at: string | null
          completed_lessons: number | null
          last_accessed_at: string | null
          product_id: string | null
          product_slug: string | null
          product_title: string | null
          progress_percent: number | null
          total_lessons: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'academy_enrollments_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'academy_products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_enrollments_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'mv_academy_catalog'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_enrollments_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'v_academy_search'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'academy_enrollments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      v_academy_search: {
        Row: {
          avg_rating: number | null
          business_unit: Database['public']['Enums']['business_unit'] | null
          cover_url: string | null
          currency: string | null
          featured: boolean | null
          id: string | null
          price_cents: number | null
          published_at: string | null
          rating_count: number | null
          search_tsv: unknown
          short_description: string | null
          slug: string | null
          subtitle: string | null
          thumbnail_url: string | null
          title: string | null
          type: Database['public']['Enums']['academy_product_type'] | null
        }
        Insert: {
          avg_rating?: number | null
          business_unit?: Database['public']['Enums']['business_unit'] | null
          cover_url?: string | null
          currency?: string | null
          featured?: boolean | null
          id?: string | null
          price_cents?: number | null
          published_at?: string | null
          rating_count?: number | null
          search_tsv?: unknown
          short_description?: string | null
          slug?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title?: string | null
          type?: Database['public']['Enums']['academy_product_type'] | null
        }
        Update: {
          avg_rating?: number | null
          business_unit?: Database['public']['Enums']['business_unit'] | null
          cover_url?: string | null
          currency?: string | null
          featured?: boolean | null
          id?: string | null
          price_cents?: number | null
          published_at?: string | null
          rating_count?: number | null
          search_tsv?: unknown
          short_description?: string | null
          slug?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title?: string | null
          type?: Database['public']['Enums']['academy_product_type'] | null
        }
        Relationships: []
      }
      v_campaign_performance: {
        Row: {
          attributed_revenue_brl: number | null
          channel: Database['public']['Enums']['campaign_channel'] | null
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
          segment: Database['public']['Enums']['lead_segment'] | null
          status: Database['public']['Enums']['lead_status'] | null
          total: number | null
        }
        Relationships: []
      }
      v_opportunities_pipeline: {
        Row: {
          amount_total_brl: number | null
          stage: Database['public']['Enums']['opportunity_stage'] | null
          total: number | null
          unit: Database['public']['Enums']['business_unit'] | null
          weighted_brl: number | null
        }
        Relationships: []
      }
      v_revenue_monthly: {
        Row: {
          invoices_paid: number | null
          month: string | null
          revenue_brl: number | null
          unit: Database['public']['Enums']['business_unit'] | null
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
          p_rule: Database['public']['Tables']['automation_rules']['Row']
        }
        Returns: undefined
      }
      fn_expire_enrollments: { Args: never; Returns: number }
      fn_generate_slug: { Args: { p_input: string }; Returns: string }
      fn_grant_enrollment_from_order: {
        Args: { p_order_id: string }
        Returns: number
      }
      fn_is_admin: { Args: { p_user_id: string }; Returns: boolean }
      fn_recalc_enrollment_progress: {
        Args: { p_product_id: string; p_user_id: string }
        Returns: undefined
      }
      fn_recalc_module_aggregates: {
        Args: { p_module_id: string }
        Returns: undefined
      }
      fn_recalc_order_totals: {
        Args: { p_order_id: string }
        Returns: undefined
      }
      fn_recalc_product_course_aggregates: {
        Args: { p_product_id: string }
        Returns: undefined
      }
      fn_recalc_product_rating: {
        Args: { p_product_id: string }
        Returns: undefined
      }
      fn_refresh_academy_catalog: { Args: never; Returns: undefined }
      fn_unique_slug: {
        Args: {
          p_base_slug: string
          p_column_name: string
          p_table_name: string
        }
        Returns: string
      }
      fn_user_can_access_space: {
        Args: { p_space_id: string; p_user_id: string }
        Returns: boolean
      }
      fn_user_has_active_enrollment: {
        Args: { p_product_id: string; p_user_id: string }
        Returns: boolean
      }
      fn_user_has_active_subscription: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      fn_user_has_role: {
        Args: { p_role: string; p_user_id: string }
        Returns: boolean
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
          status: Database['public']['Enums']['quote_status']
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
          p_unit?: Database['public']['Enums']['business_unit']
        }
        Returns: string
      }
      run_automation_inactivity: { Args: never; Returns: number }
      run_automation_invoice_overdue: { Args: never; Returns: number }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { '': string }; Returns: string[] }
      unaccent: { Args: { '': string }; Returns: string }
    }
    Enums: {
      academy_coupon_type: 'percentage' | 'fixed_amount'
      academy_enrollment_status: 'active' | 'expired' | 'revoked' | 'suspended'
      academy_live_status: 'scheduled' | 'live' | 'ended' | 'cancelled' | 'rescheduled'
      academy_live_visibility: 'public' | 'enrolled_only' | 'subscribers_only'
      academy_notification_type:
        | 'order_paid'
        | 'enrollment_granted'
        | 'live_starting'
        | 'new_reply'
        | 'mention'
        | 'admin_announcement'
        | 'product_update'
        | 'community_milestone'
      academy_order_status:
        | 'pending'
        | 'processing'
        | 'paid'
        | 'failed'
        | 'refunded'
        | 'cancelled'
        | 'expired'
        | 'chargeback'
      academy_payment_method: 'pix' | 'credit_card' | 'debit_card' | 'boleto' | 'free'
      academy_post_status: 'published' | 'hidden' | 'deleted' | 'reported'
      academy_post_type: 'text' | 'image' | 'video' | 'link' | 'question' | 'announcement'
      academy_product_level: 'iniciante' | 'intermediario' | 'avancado' | 'todos'
      academy_product_status: 'draft' | 'published' | 'archived' | 'coming_soon'
      academy_product_type:
        | 'ebook'
        | 'course'
        | 'mentorship'
        | 'community_access'
        | 'live_event'
        | 'bundle'
        | 'subscription'
      academy_progress_event: 'started' | 'progress' | 'completed' | 'certificate_issued'
      academy_review_status: 'pending' | 'approved' | 'rejected' | 'flagged'
      activity_type:
        | 'call'
        | 'email'
        | 'whatsapp'
        | 'meeting'
        | 'note'
        | 'task'
        | 'status_change'
        | 'stage_change'
        | 'quote_sent'
        | 'system'
      automation_trigger:
        | 'lead_created'
        | 'lead_status_change'
        | 'stage_change'
        | 'quote_accepted'
        | 'invoice_overdue'
        | 'inactivity'
        | 'cron'
      business_unit: 'agencia' | 'studio' | 'produtora'
      campaign_channel:
        | 'instagram'
        | 'meta_ads'
        | 'google_ads'
        | 'tiktok'
        | 'email'
        | 'whatsapp'
        | 'evento'
        | 'indicacao'
        | 'organico'
        | 'outro'
      campaign_status: 'rascunho' | 'ativa' | 'pausada' | 'encerrada'
      client_status: 'ativo' | 'inativo' | 'churn' | 'prospect'
      invoice_status: 'rascunho' | 'emitida' | 'paga' | 'parcial' | 'vencida' | 'cancelada'
      lead_segment: 'talents' | 'commercial'
      lead_status:
        | 'novo'
        | 'em_contato'
        | 'qualificado'
        | 'proposta_enviada'
        | 'negociacao'
        | 'ganho'
        | 'perdido'
        | 'arquivado'
      lead_type:
        | 'aluno_curso'
        | 'afiliada'
        | 'agenciado_casting'
        | 'talento'
        | 'fornecedor'
        | 'parceiro'
        | 'cliente_agencia'
        | 'cliente_produtora'
        | 'cliente_studio'
      opportunity_stage:
        'descoberta' | 'qualificacao' | 'proposta' | 'negociacao' | 'ganho' | 'perdido'
      payment_method:
        | 'pix'
        | 'boleto'
        | 'cartao_credito'
        | 'cartao_debito'
        | 'transferencia'
        | 'dinheiro'
        | 'outro'
      quote_item_kind: 'package' | 'addon' | 'team_resource' | 'custom'
      quote_status: 'rascunho' | 'enviado' | 'aceito' | 'recusado' | 'expirado'
      store_order_status:
        | 'pending'
        | 'processing'
        | 'paid'
        | 'failed'
        | 'refunded'
        | 'partially_refunded'
        | 'cancelled'
        | 'chargeback'
      store_price_type: 'one_time' | 'recurring'
      store_product_type: 'physical' | 'digital' | 'service' | 'bundle'
      store_recurring_interval: 'day' | 'week' | 'month' | 'year'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      academy_coupon_type: ['percentage', 'fixed_amount'],
      academy_enrollment_status: ['active', 'expired', 'revoked', 'suspended'],
      academy_live_status: ['scheduled', 'live', 'ended', 'cancelled', 'rescheduled'],
      academy_live_visibility: ['public', 'enrolled_only', 'subscribers_only'],
      academy_notification_type: [
        'order_paid',
        'enrollment_granted',
        'live_starting',
        'new_reply',
        'mention',
        'admin_announcement',
        'product_update',
        'community_milestone',
      ],
      academy_order_status: [
        'pending',
        'processing',
        'paid',
        'failed',
        'refunded',
        'cancelled',
        'expired',
        'chargeback',
      ],
      academy_payment_method: ['pix', 'credit_card', 'debit_card', 'boleto', 'free'],
      academy_post_status: ['published', 'hidden', 'deleted', 'reported'],
      academy_post_type: ['text', 'image', 'video', 'link', 'question', 'announcement'],
      academy_product_level: ['iniciante', 'intermediario', 'avancado', 'todos'],
      academy_product_status: ['draft', 'published', 'archived', 'coming_soon'],
      academy_product_type: [
        'ebook',
        'course',
        'mentorship',
        'community_access',
        'live_event',
        'bundle',
        'subscription',
      ],
      academy_progress_event: ['started', 'progress', 'completed', 'certificate_issued'],
      academy_review_status: ['pending', 'approved', 'rejected', 'flagged'],
      activity_type: [
        'call',
        'email',
        'whatsapp',
        'meeting',
        'note',
        'task',
        'status_change',
        'stage_change',
        'quote_sent',
        'system',
      ],
      automation_trigger: [
        'lead_created',
        'lead_status_change',
        'stage_change',
        'quote_accepted',
        'invoice_overdue',
        'inactivity',
        'cron',
      ],
      business_unit: ['agencia', 'studio', 'produtora'],
      campaign_channel: [
        'instagram',
        'meta_ads',
        'google_ads',
        'tiktok',
        'email',
        'whatsapp',
        'evento',
        'indicacao',
        'organico',
        'outro',
      ],
      campaign_status: ['rascunho', 'ativa', 'pausada', 'encerrada'],
      client_status: ['ativo', 'inativo', 'churn', 'prospect'],
      invoice_status: ['rascunho', 'emitida', 'paga', 'parcial', 'vencida', 'cancelada'],
      lead_segment: ['talents', 'commercial'],
      lead_status: [
        'novo',
        'em_contato',
        'qualificado',
        'proposta_enviada',
        'negociacao',
        'ganho',
        'perdido',
        'arquivado',
      ],
      lead_type: [
        'aluno_curso',
        'afiliada',
        'agenciado_casting',
        'talento',
        'fornecedor',
        'parceiro',
        'cliente_agencia',
        'cliente_produtora',
        'cliente_studio',
      ],
      opportunity_stage: [
        'descoberta',
        'qualificacao',
        'proposta',
        'negociacao',
        'ganho',
        'perdido',
      ],
      payment_method: [
        'pix',
        'boleto',
        'cartao_credito',
        'cartao_debito',
        'transferencia',
        'dinheiro',
        'outro',
      ],
      quote_item_kind: ['package', 'addon', 'team_resource', 'custom'],
      quote_status: ['rascunho', 'enviado', 'aceito', 'recusado', 'expirado'],
      store_order_status: [
        'pending',
        'processing',
        'paid',
        'failed',
        'refunded',
        'partially_refunded',
        'cancelled',
        'chargeback',
      ],
      store_price_type: ['one_time', 'recurring'],
      store_product_type: ['physical', 'digital', 'service', 'bundle'],
      store_recurring_interval: ['day', 'week', 'month', 'year'],
    },
  },
} as const
