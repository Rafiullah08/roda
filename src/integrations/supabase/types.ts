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
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          password_hash: string
          permissions: Json | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          password_hash: string
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          password_hash?: string
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          category: string
          content: string
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          importance: string | null
          send_email: boolean | null
          start_date: string
          target_user_groups: string[]
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          importance?: string | null
          send_email?: boolean | null
          start_date?: string
          target_user_groups?: string[]
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          importance?: string | null
          send_email?: boolean | null
          start_date?: string
          target_user_groups?: string[]
          title?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string | null
          category: string | null
          content: string
          created_at: string
          excerpt: string
          featured_image: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          tags: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          category?: string | null
          content: string
          created_at?: string
          excerpt: string
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string | null
          id: string
          service_id: string
          service_name: string
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_id: string
          service_name: string
          user_id: string
          user_type?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          service_id?: string
          service_name?: string
          user_id?: string
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          is_group: boolean | null
          last_message: string | null
          last_message_at: string | null
          name: string | null
          participants: string[]
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_group?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          name?: string | null
          participants: string[]
        }
        Update: {
          created_at?: string | null
          id?: string
          is_group?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          name?: string | null
          participants?: string[]
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          content: string
          id: string
          metadata: Json | null
          recipient: string
          sent_at: string | null
          status: string
          subject: string
          template_id: string | null
        }
        Insert: {
          content: string
          id?: string
          metadata?: Json | null
          recipient: string
          sent_at?: string | null
          status: string
          subject: string
          template_id?: string | null
        }
        Update: {
          content?: string
          id?: string
          metadata?: Json | null
          recipient?: string
          sent_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          is_active: boolean | null
          name: string
          preview_image_url: string | null
          subject: string
          text_content: string | null
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          is_active?: boolean | null
          name: string
          preview_image_url?: string | null
          subject: string
          text_content?: string | null
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          name?: string
          preview_image_url?: string | null
          subject?: string
          text_content?: string | null
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachments: Json | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          sender_id: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_sends: {
        Row: {
          created_at: string
          id: string
          newsletter_id: string
          opened_at: string | null
          sent_at: string
          subscriber_email: string
        }
        Insert: {
          created_at?: string
          id?: string
          newsletter_id: string
          opened_at?: string | null
          sent_at?: string
          subscriber_email: string
        }
        Update: {
          created_at?: string
          id?: string
          newsletter_id?: string
          opened_at?: string | null
          sent_at?: string
          subscriber_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_sends_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletters"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribe_token: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletters: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          sent_at: string | null
          status: string
          subject_line: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          subject_line: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          subject_line?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string
          created_at: string | null
          id: string
          link_to: string | null
          message: string
          read: boolean | null
          title: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          link_to?: string | null
          message: string
          read?: boolean | null
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          link_to?: string | null
          message?: string
          read?: boolean | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      order_deliverables: {
        Row: {
          description: string | null
          file_name: string
          file_url: string
          id: string
          order_id: string
          uploaded_at: string | null
          uploaded_by: string
          version: number | null
        }
        Insert: {
          description?: string | null
          file_name: string
          file_url: string
          id?: string
          order_id: string
          uploaded_at?: string | null
          uploaded_by: string
          version?: number | null
        }
        Update: {
          description?: string | null
          file_name?: string
          file_url?: string
          id?: string
          order_id?: string
          uploaded_at?: string | null
          uploaded_by?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_deliverables_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_notes: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          note: string
          order_id: string
          private: boolean | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          note: string
          order_id: string
          private?: boolean | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          note?: string
          order_id?: string
          private?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "order_notes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          order_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          order_id: string
          status: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          customer_email: string | null
          customer_name: string
          delivery_date: string | null
          id: string
          partner_id: string | null
          priority: string | null
          service: string
          service_id: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_email?: string | null
          customer_name: string
          delivery_date?: string | null
          id?: string
          partner_id?: string | null
          priority?: string | null
          service: string
          service_id?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string
          delivery_date?: string | null
          id?: string
          partner_id?: string | null
          priority?: string | null
          service?: string
          service_id?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_applications: {
        Row: {
          admin_notes: string | null
          application_date: string | null
          business_details: Json
          document_links: Json | null
          experience: string | null
          id: string
          partner_id: string
          portfolio_links: Json | null
          qualifications: string | null
          rejection_reason: string | null
          review_date: string | null
          source_lead_id: string | null
          status: string
        }
        Insert: {
          admin_notes?: string | null
          application_date?: string | null
          business_details: Json
          document_links?: Json | null
          experience?: string | null
          id?: string
          partner_id: string
          portfolio_links?: Json | null
          qualifications?: string | null
          rejection_reason?: string | null
          review_date?: string | null
          source_lead_id?: string | null
          status?: string
        }
        Update: {
          admin_notes?: string | null
          application_date?: string | null
          business_details?: Json
          document_links?: Json | null
          experience?: string | null
          id?: string
          partner_id?: string
          portfolio_links?: Json | null
          qualifications?: string | null
          rejection_reason?: string | null
          review_date?: string | null
          source_lead_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_applications_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_applications_source_lead_id_fkey"
            columns: ["source_lead_id"]
            isOneToOne: false
            referencedRelation: "partner_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_credentials: {
        Row: {
          created_at: string | null
          credential_name: string
          credential_type: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuer: string | null
          partner_id: string
          updated_at: string | null
          verification_status: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          credential_name: string
          credential_type: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuer?: string | null
          partner_id: string
          updated_at?: string | null
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          credential_name?: string
          credential_type?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuer?: string | null
          partner_id?: string
          updated_at?: string | null
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_credentials_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_expertise: {
        Row: {
          category_id: string | null
          id: string
          partner_id: string
          skill_level: string | null
          subcategory_id: string | null
          years_experience: number | null
        }
        Insert: {
          category_id?: string | null
          id?: string
          partner_id: string
          skill_level?: string | null
          subcategory_id?: string | null
          years_experience?: number | null
        }
        Update: {
          category_id?: string | null
          id?: string
          partner_id?: string
          skill_level?: string | null
          subcategory_id?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_expertise_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_expertise_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_expertise_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "service_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_leads: {
        Row: {
          converted_at: string | null
          converted_by: string | null
          converted_to_application: boolean | null
          created_at: string
          email: string
          full_name: string
          id: string
          invitation_expires_at: string | null
          invitation_sent_at: string | null
          invitation_token: string | null
          notes: string | null
          skills: string
          status: string
        }
        Insert: {
          converted_at?: string | null
          converted_by?: string | null
          converted_to_application?: boolean | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          invitation_expires_at?: string | null
          invitation_sent_at?: string | null
          invitation_token?: string | null
          notes?: string | null
          skills: string
          status?: string
        }
        Update: {
          converted_at?: string | null
          converted_by?: string | null
          converted_to_application?: boolean | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          invitation_expires_at?: string | null
          invitation_sent_at?: string | null
          invitation_token?: string | null
          notes?: string | null
          skills?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_leads_converted_by_fkey"
            columns: ["converted_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_ratings: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          order_id: string | null
          partner_id: string
          rating: number
          review_text: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          partner_id: string
          rating: number
          review_text?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          partner_id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_ratings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          bio: string | null
          business_name: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string | null
          employee_count: number | null
          id: string
          partner_type: string
          status: string
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          business_name: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string | null
          employee_count?: number | null
          id?: string
          partner_type?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          business_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string | null
          employee_count?: number | null
          id?: string
          partner_type?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      password_reset_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          used: boolean
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          used?: boolean
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          used?: boolean
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          order_id: string
          payment_method: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          order_id: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          order_id?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          business_name: string
          business_type: string | null
          city: string | null
          created_at: string | null
          id: string
          owner_name: string | null
          phone: string | null
          state: string | null
          tax_id: string | null
          updated_at: string | null
          website: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type?: string | null
          city?: string | null
          created_at?: string | null
          id: string
          owner_name?: string | null
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string | null
          city?: string | null
          created_at?: string | null
          id?: string
          owner_name?: string | null
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      quote_email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          subject: string
          template_type: string
          text_content: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          subject: string
          template_type: string
          text_content?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          subject?: string
          template_type?: string
          text_content?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_notifications: {
        Row: {
          created_at: string
          id: string
          inquiry_id: string
          message: string
          read: boolean | null
          recipient_id: string
          recipient_type: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          inquiry_id: string
          message: string
          read?: boolean | null
          recipient_id: string
          recipient_type: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          inquiry_id?: string
          message?: string
          read?: boolean | null
          recipient_id?: string
          recipient_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_notifications_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "service_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          admin_assigned_to: string | null
          budget_range: string | null
          buyer_id: string
          conversation_id: string | null
          created_at: string
          id: string
          is_converted_to_order: boolean | null
          message: string
          order_id: string | null
          partner_id: string | null
          priority: string | null
          quote_amount: number | null
          quote_expiry: string | null
          quote_status: string | null
          rejection_reason: string | null
          requirements: string | null
          service_id: string
          status: string
          timeline: string | null
          updated_at: string
        }
        Insert: {
          admin_assigned_to?: string | null
          budget_range?: string | null
          buyer_id: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_converted_to_order?: boolean | null
          message: string
          order_id?: string | null
          partner_id?: string | null
          priority?: string | null
          quote_amount?: number | null
          quote_expiry?: string | null
          quote_status?: string | null
          rejection_reason?: string | null
          requirements?: string | null
          service_id: string
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          admin_assigned_to?: string | null
          budget_range?: string | null
          buyer_id?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_converted_to_order?: boolean | null
          message?: string
          order_id?: string | null
          partner_id?: string | null
          priority?: string | null
          quote_amount?: number | null
          quote_expiry?: string | null
          quote_status?: string | null
          rejection_reason?: string | null
          requirements?: string | null
          service_id?: string
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_inquiries_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_inquiries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_inquiries_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_inquiries_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_partner_assignments: {
        Row: {
          assigned_date: string | null
          commission_rate: number | null
          commission_type: string
          completion_date: string | null
          created_at: string | null
          id: string
          partner_id: string
          service_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          assigned_date?: string | null
          commission_rate?: number | null
          commission_type?: string
          completion_date?: string | null
          created_at?: string | null
          id?: string
          partner_id: string
          service_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          assigned_date?: string | null
          commission_rate?: number | null
          commission_type?: string
          completion_date?: string | null
          created_at?: string | null
          id?: string
          partner_id?: string
          service_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_partner_assignments_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_partner_assignments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_subcategories: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          delivery_time: string | null
          description: string | null
          faqs: Json | null
          featured: boolean | null
          features: Json | null
          id: string
          image_url: string | null
          is_free: boolean | null
          metadata: Json | null
          price: number
          rating: number | null
          reviews_count: number | null
          service_location: string | null
          service_type: string | null
          status: string | null
          subcategory: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          delivery_time?: string | null
          description?: string | null
          faqs?: Json | null
          featured?: boolean | null
          features?: Json | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          metadata?: Json | null
          price: number
          rating?: number | null
          reviews_count?: number | null
          service_location?: string | null
          service_type?: string | null
          status?: string | null
          subcategory?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          delivery_time?: string | null
          description?: string | null
          faqs?: Json | null
          featured?: boolean | null
          features?: Json | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          metadata?: Json | null
          price?: number
          rating?: number | null
          reviews_count?: number | null
          service_location?: string | null
          service_type?: string | null
          status?: string | null
          subcategory?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trial_services: {
        Row: {
          assigned_date: string | null
          completion_date: string | null
          created_at: string | null
          customer_feedback: string | null
          id: string
          on_time_delivery: boolean | null
          partner_id: string
          quality_rating: number | null
          response_rating: number | null
          service_id: string
          status: string
        }
        Insert: {
          assigned_date?: string | null
          completion_date?: string | null
          created_at?: string | null
          customer_feedback?: string | null
          id?: string
          on_time_delivery?: boolean | null
          partner_id: string
          quality_rating?: number | null
          response_rating?: number | null
          service_id: string
          status?: string
        }
        Update: {
          assigned_date?: string | null
          completion_date?: string | null
          created_at?: string | null
          customer_feedback?: string | null
          id?: string
          on_time_delivery?: boolean | null
          partner_id?: string
          quality_rating?: number | null
          response_rating?: number | null
          service_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "trial_services_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trial_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_admin: {
        Args: { admin_email: string; admin_password: string }
        Returns: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          password_hash: string
          permissions: Json | null
          role: string | null
          updated_at: string | null
        }
      }
      calculate_commission_rate: {
        Args: { commission_type: string }
        Returns: number
      }
      cleanup_expired_reset_codes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_invitation_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_partner_verified: {
        Args: { partner_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
