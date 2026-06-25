-- Adiciona os valores sem acento/renomeados que o código usa.
-- Os valores antigos (cliente_agência, estúdio_cliente) são mantidos
-- para não quebrar registros históricos já gravados no banco.
ALTER TYPE public.lead_type ADD VALUE IF NOT EXISTS 'cliente_agencia';
ALTER TYPE public.lead_type ADD VALUE IF NOT EXISTS 'cliente_studio';
