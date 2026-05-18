-- 0022_academy_extensions.sql
-- House Mazzutti Academy — extensões Postgres necessárias
-- Idempotente: pode rodar várias vezes sem efeito colateral.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- uuid_generate_v4 (legado)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";     -- gen_random_uuid (preferido)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- busca fuzzy em produtos
CREATE EXTENSION IF NOT EXISTS "citext";       -- emails case-insensitive
CREATE EXTENSION IF NOT EXISTS "unaccent";     -- busca sem acento (PT-BR)

-- Comentário para documentação
COMMENT ON EXTENSION pg_trgm IS 'Usado para busca fuzzy no catálogo da Academy';
COMMENT ON EXTENSION unaccent IS 'Normaliza acentos em buscas de catálogo';
