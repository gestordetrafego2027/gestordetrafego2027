-- Adiciona o valor 'cliente_tour_canoinhas' ao enum lead_type.
-- ALTER TYPE ... ADD VALUE não pode rodar dentro de uma transação,
-- mas o Supabase executa cada migration como transação implícita;
-- o comando é seguro pois ADD VALUE é idempotente no Postgres 12+.
ALTER TYPE public.lead_type ADD VALUE IF NOT EXISTS 'cliente_tour_canoinhas';
