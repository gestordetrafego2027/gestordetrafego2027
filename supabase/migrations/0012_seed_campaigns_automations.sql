-- 0012_seed_campaigns_automations.sql
-- Seed inicial de campanhas e regras de automação para popular dashboards.

insert into public.campaigns (slug, name, channel, status, unit, utm_source, utm_medium, utm_campaign, start_at, budget_brl, goal)
values
  ('instagram-organico-2026', 'Instagram Orgânico 2026', 'instagram', 'ativa', 'agencia',
   'instagram', 'organic', 'ig-organic-2026', date '2026-01-01', null,
   'Captação de leads via conteúdo orgânico'),
  ('meta-ads-studio-q2', 'Meta Ads Studio Q2', 'meta_ads', 'ativa', 'studio',
   'facebook', 'paid', 'studio-q2-2026', date '2026-04-01', 5000.00,
   'Agendamentos de book fotográfico'),
  ('google-ads-produtora', 'Google Ads Produtora', 'google_ads', 'rascunho', 'produtora',
   'google', 'cpc', 'produtora-2026', null, 8000.00,
   'Leads B2B para produção audiovisual'),
  ('indicacoes-2026', 'Programa de Indicações', 'indicacao', 'ativa', null,
   'indicacao', 'referral', 'referral-2026', date '2026-01-01', null,
   'Indicações de clientes/parceiros')
on conflict (slug) do nothing;

insert into public.automation_rules (name, description, trigger_type, conditions, actions, active)
values
  ('Boas-vindas a novos leads',
   'Cria activity de "first touch" + envia e-mail de boas-vindas quando um lead entra.',
   'lead_created',
   '{}'::jsonb,
   '[
      {"type": "create_activity", "activity_type": "system", "title": "Lead recebido (auto)"},
      {"type": "send_email", "template": "welcome_lead"}
    ]'::jsonb,
   true),
  ('Reativação por inatividade (14d)',
   'Marca lead como "em_contato" se ficar 14 dias sem interação.',
   'inactivity',
   '{"days_idle": 14, "status_in": ["novo", "em_contato"]}'::jsonb,
   '[
      {"type": "create_activity", "activity_type": "task", "title": "Follow-up de reengajamento"},
      {"type": "notify_owner"}
    ]'::jsonb,
   true),
  ('Fatura vencida → cobrança',
   'Envia lembrete ao cliente quando invoice passa do due_date sem pagamento.',
   'invoice_overdue',
   '{"days_overdue": 1}'::jsonb,
   '[
      {"type": "send_email", "template": "invoice_overdue"},
      {"type": "create_activity", "activity_type": "task", "title": "Cobrar fatura vencida"}
    ]'::jsonb,
   true),
  ('Proposta aceita → criar oportunidade ganha',
   'Quando quote vira "aceito", marca oportunidade como ganho e dispara onboarding.',
   'quote_accepted',
   '{}'::jsonb,
   '[
      {"type": "update_opportunity", "stage": "ganho"},
      {"type": "create_activity", "activity_type": "system", "title": "Proposta aceita — iniciar onboarding"}
    ]'::jsonb,
   true)
on conflict do nothing;
