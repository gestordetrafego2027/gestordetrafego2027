-- 0023_academy_enums.sql
-- House Mazzutti Academy — enumerações de domínio
-- Todos os enums são prefixados implicitamente pelo contexto da Academy.

-- ═══════ Produtos ═══════
DO $$ BEGIN
  CREATE TYPE academy_product_type AS ENUM (
    'ebook',
    'course',
    'mentorship',
    'community_access',
    'live_event',
    'bundle',
    'subscription'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE academy_product_status AS ENUM (
    'draft',
    'published',
    'archived',
    'coming_soon'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE academy_product_level AS ENUM (
    'iniciante',
    'intermediario',
    'avancado',
    'todos'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Comércio ═══════
DO $$ BEGIN
  CREATE TYPE academy_order_status AS ENUM (
    'pending',
    'processing',
    'paid',
    'failed',
    'refunded',
    'cancelled',
    'expired',
    'chargeback'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE academy_payment_method AS ENUM (
    'pix',
    'credit_card',
    'debit_card',
    'boleto',
    'free'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE academy_coupon_type AS ENUM (
    'percentage',
    'fixed_amount'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Acesso ═══════
DO $$ BEGIN
  CREATE TYPE academy_enrollment_status AS ENUM (
    'active',
    'expired',
    'revoked',
    'suspended'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Lives ═══════
DO $$ BEGIN
  CREATE TYPE academy_live_status AS ENUM (
    'scheduled',
    'live',
    'ended',
    'cancelled',
    'rescheduled'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE academy_live_visibility AS ENUM (
    'public',
    'enrolled_only',
    'subscribers_only'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Comunidade ═══════
DO $$ BEGIN
  CREATE TYPE academy_post_type AS ENUM (
    'text',
    'image',
    'video',
    'link',
    'question',
    'announcement'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE academy_post_status AS ENUM (
    'published',
    'hidden',
    'deleted',
    'reported'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Avaliações ═══════
DO $$ BEGIN
  CREATE TYPE academy_review_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'flagged'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Notificações ═══════
DO $$ BEGIN
  CREATE TYPE academy_notification_type AS ENUM (
    'order_paid',
    'enrollment_granted',
    'live_starting',
    'new_reply',
    'mention',
    'admin_announcement',
    'product_update',
    'community_milestone'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Progresso ═══════
DO $$ BEGIN
  CREATE TYPE academy_progress_event AS ENUM (
    'started',
    'progress',
    'completed',
    'certificate_issued'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════ Comentários documentação ═══════
COMMENT ON TYPE academy_product_type IS
  'Tipos de produto vendidos na Academy: ebook, course, mentorship etc.';
COMMENT ON TYPE academy_order_status IS
  'Estados possíveis de um pedido (espelha conceitos do Mercado Pago)';
COMMENT ON TYPE academy_enrollment_status IS
  'Status de uma matrícula ativa em produto adquirido';
