-- 0011_views_security_invoker.sql
-- Força as views analíticas a respeitarem RLS do usuário que consulta.
alter view public.v_leads_funnel           set (security_invoker = on);
alter view public.v_opportunities_pipeline set (security_invoker = on);
alter view public.v_revenue_monthly        set (security_invoker = on);
alter view public.v_campaign_performance   set (security_invoker = on);
