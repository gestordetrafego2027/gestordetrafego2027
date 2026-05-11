-- 0001_init_extensions.sql
-- Habilita extensões necessárias para o CRM House Mazzutti.

create extension if not exists "pgcrypto" with schema extensions;
create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists "vector";       -- pgvector para embeddings de busca semântica
create extension if not exists "pg_jsonschema"; -- validação de JSONB por schema
