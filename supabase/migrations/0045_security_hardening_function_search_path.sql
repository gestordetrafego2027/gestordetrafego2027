-- 0045 — Hardening de segurança: fixa search_path das funções da aplicação
-- Origem: Supabase Security Advisor (lint 0011_function_search_path_mutable).
-- Escopo: SOMENTE funções próprias da aplicação. Funções de extensões
-- (pg_trgm, unaccent, pg_jsonschema) NÃO são alteradas aqui — o tratamento
-- correto delas é mover a extensão para fora do schema public (ver runbook).
-- Efeito: define search_path imutável (public, pg_temp), preservando o
-- comportamento (referências a objetos public continuam resolvendo) e
-- fechando o vetor de hijack de search_path. Idempotente.

ALTER FUNCTION public.accept_quote_by_token(p_token text) SET search_path = public, pg_temp;
ALTER FUNCTION public.check_lead_rate_limit() SET search_path = public, pg_temp;
ALTER FUNCTION public.current_user_unit() SET search_path = public, pg_temp;
ALTER FUNCTION public.exec_automation_actions(p_rule automation_rules, p_lead_id uuid, p_client_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_certificate_code() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_enrollments_lifecycle() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_generate_order_number() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_lives_lifecycle() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_orders_lifecycle() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_orders_number() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_products_lifecycle() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_academy_products_tsv() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_check_category_no_cycle() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_expire_enrollments() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_generate_slug(p_input text) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_grant_enrollment_from_order(p_order_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_is_admin(p_user_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_recalc_enrollment_progress(p_user_id uuid, p_product_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_recalc_module_aggregates(p_module_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_recalc_order_totals(p_order_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_recalc_product_course_aggregates(p_product_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_recalc_product_rating(p_product_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_refresh_academy_catalog() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_set_updated_at() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_comments_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_coupon_redeem() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_lesson_progress_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_lesson_resources_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_lessons_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_live_registrations_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_modules_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_order_items_recalc() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_orders_coupon_use() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_orders_grant() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_posts_space_count() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_reactions_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_academy_reviews_sync() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_validate_bundle_item() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_tg_validate_subscription_plan_product() SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_unique_slug(p_table_name text, p_column_name text, p_base_slug text) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_user_can_access_space(p_user_id uuid, p_space_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_user_has_active_enrollment(p_user_id uuid, p_product_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_user_has_active_subscription(p_user_id uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.fn_user_has_role(p_user_id uuid, p_role text) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_quote_by_token(p_token text) SET search_path = public, pg_temp;
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;
ALTER FUNCTION public.is_admin() SET search_path = public, pg_temp;
ALTER FUNCTION public.is_staff() SET search_path = public, pg_temp;
ALTER FUNCTION public.is_visible_unit(p_unit text) SET search_path = public, pg_temp;
ALTER FUNCTION public.promote_lead_to_client(p_lead_id uuid, p_unit business_unit, p_amount_brl numeric) SET search_path = public, pg_temp;
ALTER FUNCTION public.run_automation_inactivity() SET search_path = public, pg_temp;
ALTER FUNCTION public.run_automation_invoice_overdue() SET search_path = public, pg_temp;
ALTER FUNCTION public.set_updated_at() SET search_path = public, pg_temp;
ALTER FUNCTION public.store_orders_insert_event() SET search_path = public, pg_temp;
ALTER FUNCTION public.store_products_search_tsv() SET search_path = public, pg_temp;
ALTER FUNCTION public.store_set_updated_at() SET search_path = public, pg_temp;
ALTER FUNCTION public.tg_audit() SET search_path = public, pg_temp;
ALTER FUNCTION public.tg_lead_created_automation() SET search_path = public, pg_temp;
ALTER FUNCTION public.tg_quote_accepted_automation() SET search_path = public, pg_temp;

-- ------------------------------------------------------------------
-- ITENS QUE EXIGEM DECISÃO/TESTE (NÃO incluídos acima de propósito):
-- 1) RLS permissiva em store_restock_alerts (policy "store_restock_insert"
--    INSERT WITH CHECK true). Se o cadastro de alerta é aberto a anônimos,
--    pode ser intencional; se não, recriar a policy com checagem adequada.
--    Exemplo (revisar antes de aplicar):
--    -- DROP POLICY "store_restock_insert" ON public.store_restock_alerts;
--    -- CREATE POLICY "store_restock_insert" ON public.store_restock_alerts
--    --   FOR INSERT TO anon, authenticated WITH CHECK (email IS NOT NULL);
-- 2) Bucket "academy-media" com listagem pública: ajustar a policy de storage
--    para permitir leitura por caminho, sem listar o bucket inteiro.
-- 3) Extensões em public (pg_trgm, unaccent, pg_jsonschema): mover para schema
--    "extensions" (operação sensível; testar em dev primeiro).
-- 4) Leaked Password Protection: ativar no painel Auth (não é DDL).
-- ------------------------------------------------------------------
