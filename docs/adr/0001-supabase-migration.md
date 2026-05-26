# ADR-0001 — Migração SQLite → Supabase

**Status:** Aceito  
**Data:** 2026-01  
**Autores:** Angelo Mazzutti, Tech Lead

## Contexto
O projeto iniciou com SQLite local. Para suportar múltiplos usuários, RLS, realtime e deploys em Coolify sem estado local, a decisão foi migrar para Supabase (PostgreSQL gerenciado).

## Decisão
Supabase é o backend de dados. Toda query usa `@supabase/supabase-js` ou `@supabase/ssr` (server-side com cookies).

## Consequências
- RLS obrigatório em todas as tabelas com dados de usuário
- `service_role_key` só em rotas server — nunca exposta ao client
- Migrations versionadas em `supabase/migrations/`
