# House Mazzutti Academy — Plano-mestre do Schema

Estado atual: migrations `0022` a `0026` já executadas no Supabase.
Próximos blocos: `D` (0027) em diante. Cada bloco vira **1 migration SQL** com
prefixo numérico sequencial, no padrão `lowercase`, idempotente
(`if not exists` / `drop ... if exists`), com RLS sempre habilitado.

---

## Estado já consolidado (recap)

| Migration | Conteúdo |
|---|---|
| `0022_academy_extensions.sql` | `pgcrypto`, `pg_trgm`, `unaccent`, `citext`, `uuid-ossp` |
| `0023_academy_enums.sql` | Todos os enums `academy_*` (produto, ordem, matrícula, live, post, review, notification, progress) |
| `0024_academy_functions.sql` | `fn_set_updated_at`, `fn_generate_slug`, `fn_unique_slug`, `fn_user_has_active_enrollment`, `fn_user_has_role`, `fn_is_admin` |
| `0025_academy_profiles.sql` | `profiles` (1:1 com `auth.users`) + auto-criação + RLS |
| `0026_academy_categories_authors.sql` | `academy_categories` (hierárquicas) + `academy_authors` |

---

## Blocos a entregar

Ordem de execução (cada linha = 1 migration). Dependências apontam para
tabelas/funções que **precisam existir antes** dessa migration rodar.

### Bloco D — Catálogo principal
**`0027_academy_products.sql`**
- `academy_products` (linha-mestra do catálogo, qualquer tipo)
  - FK: `author_id → academy_authors`, `category_id → academy_categories`
  - Campos: `type` (enum), `status` (enum), `level` (enum), `slug` (unique),
    `title`, `subtitle`, `description`, `long_description`, `cover_url`,
    `trailer_url`, `price_cents`, `compare_at_price_cents`, `currency`,
    `duration_minutes`, `language`, `tags text[]`, `metadata jsonb`,
    SEO (meta_title, meta_description, og_image_url), `featured`,
    `published_at`, contadores agregados (`enrollment_count`, `review_avg`,
    `review_count`)
- `academy_product_categories` (N:N produto↔categoria além da principal)
- RLS: público vê `status='published'`; admin/autor veem próprios
**Depende de:** `academy_authors`, `academy_categories`, enums de produto

---

### Bloco E — Estrutura de cursos
**`0028_academy_course_structure.sql`**
- `academy_modules` (FK `product_id`, `order_index`, `title`, `summary`)
- `academy_lessons` (FK `module_id`, `order_index`, `title`, `type`
  ['video','text','quiz','live','download'], `video_url`, `duration_seconds`,
  `body_md`, `is_preview` bool, `free_preview` bool)
- `academy_lesson_resources` (FK `lesson_id`, `kind`
  ['pdf','link','code','image'], `url`, `label`)
- RLS: preview livre; restante via `fn_user_has_active_enrollment`
**Depende de:** `academy_products`

---

### Bloco F — Ebooks
**`0029_academy_ebooks.sql`**
- `academy_ebook_files` (FK `product_id`, `format` ['pdf','epub','mobi'],
  `file_url`, `file_size_bytes`, `pages`, `language`, `version`)
- `academy_ebook_chapters` (opcional, FK `product_id`, `order_index`,
  `title`, `is_preview`)
- RLS: arquivos só via download autorizado (signed URL gerada na app)
**Depende de:** `academy_products`

---

### Bloco G — Bundles e assinaturas
**`0030_academy_bundles_subscriptions.sql`**
- `academy_bundle_items` (bundle pai contém produtos filhos)
  - constraint: não permitir bundle dentro de bundle
- `academy_subscription_plans` (`product_id` do tipo `subscription`,
  `interval` ['monthly','quarterly','yearly'], `price_cents`,
  `trial_days`, `mp_preapproval_plan_id`)
- `academy_subscriptions` (`user_id`, `plan_id`, `status`
  ['active','paused','cancelled','past_due'], `current_period_end`)
**Depende de:** `academy_products`

---

### Bloco H — Comércio (parte 1: cupons e pedidos)
**`0031_academy_orders.sql`**
- `academy_coupons` (`code`, `type` enum, `value`, `valid_from`, `valid_until`,
  `usage_limit`, `usage_count`, `min_order_cents`, `applies_to` jsonb)
- `academy_orders` (`user_id`, `status` enum, `subtotal_cents`,
  `discount_cents`, `total_cents`, `currency`, `coupon_id`,
  `mp_preference_id`, `mp_payment_id`, campos billing)
- `academy_order_items` (`order_id`, `product_id`, `unit_price_cents`,
  `quantity` (default 1 — sempre 1 por enquanto), `snapshot` jsonb)
- `academy_coupon_redemptions` (`coupon_id`, `order_id`, `user_id`)
**Depende de:** `academy_products`, enums de comércio

---

### Bloco I — Comércio (parte 2: pagamentos e webhooks)
**`0032_academy_payments.sql`**
- `academy_payments` (`order_id`, `method` enum, `mp_payment_id`,
  `status`, `paid_at`, `amount_cents`, `gateway_response` jsonb)
- `academy_mp_webhooks` (log cru de webhooks do Mercado Pago,
  `received_at`, `topic`, `resource_id`, `payload` jsonb,
  `processed_at`, `error`)
- Trigger: ao mudar `orders.status → 'paid'`, criar matrículas via função
  (implementação no Bloco J ou em RPC)
**Depende de:** `academy_orders`

---

### Bloco J — Acesso (matrículas e certificados)
**`0033_academy_enrollments.sql`**
- `academy_enrollments` (`user_id`, `product_id`, `order_id` (nullable —
  pode ser concedida por admin), `status` enum, `granted_at`, `expires_at`)
  - UNIQUE (`user_id`, `product_id`) — uma matrícula ativa por produto
- `academy_certificates` (`enrollment_id`, `code` unique,
  `issued_at`, `revoked_at`, `pdf_url`)
- Função `fn_grant_enrollment(order_id)` chamada por trigger do pagamento
**Depende de:** `academy_orders`, `academy_products`

---

### Bloco K — Progresso
**`0034_academy_progress.sql`**
- `academy_lesson_progress` (`user_id`, `lesson_id`, `seconds_watched`,
  `completed_at`, `last_position_seconds`)
- `academy_progress_events` (audit log, `event` enum, `lesson_id`,
  `metadata` jsonb)
- View `v_academy_course_progress` (% por matrícula)
**Depende de:** `academy_lessons`, `academy_enrollments`

---

### Bloco L — Lives
**`0035_academy_lives.sql`**
- `academy_lives` (`product_id` opcional, `title`, `description`,
  `host_author_id`, `scheduled_at`, `duration_minutes`,
  `status` enum, `visibility` enum, `stream_url`, `recording_url`,
  `recording_available_until`, `max_attendees`)
- `academy_live_registrations` (`live_id`, `user_id`, `registered_at`,
  `attended` bool)
**Depende de:** `academy_products` (opcional), `academy_authors`

---

### Bloco M — Comunidade
**`0036_academy_community.sql`**
- `academy_community_spaces` (espaços/canais; ex: "Geral", "Cases",
  "Behind the Scenes"; cada um com `required_product_id` opcional)
- `academy_posts` (`space_id`, `author_user_id`, `type` enum, `status` enum,
  `title`, `body_md`, `media` jsonb, `pinned`, `locked`)
- `academy_comments` (recursivo, `parent_comment_id`)
- `academy_reactions` (`target_type` ['post','comment'], `target_id`,
  `user_id`, `kind` ['like','fire','heart','clap'])
- `academy_follows` (`follower_user_id`, `followed_user_id`)
- `academy_reports` (denúncias; `target_type`, `target_id`, `reason`)
**Depende de:** `profiles`, enums de comunidade

---

### Bloco N — Reviews e notificações
**`0037_academy_reviews_notifications.sql`**
- `academy_reviews` (`product_id`, `user_id`, `rating` (1–5),
  `title`, `body`, `status` enum)
  - UNIQUE (`user_id`, `product_id`)
  - trigger: recalcular `products.review_avg`/`review_count` ao
    `status='approved'`
- `academy_notifications` (`user_id`, `type` enum, `payload` jsonb,
  `read_at`, `created_at`)
**Depende de:** `academy_products`, `profiles`

---

### Bloco O — Busca e views agregadas
**`0038_academy_search_views.sql`**
- Coluna `search_tsv tsvector` em `academy_products` + trigger de manutenção
- View materializada `mv_academy_catalog` (produto + autor + categoria +
  rating + price) para landing/catálogo
- Função `fn_refresh_academy_catalog()` para cron
**Depende de:** quase tudo

---

### Bloco P — Seeds iniciais
**`0039_academy_seeds.sql`**
- Categorias raiz: "Cursos", "Ebooks", "Mentorias", "Lives", "Comunidade"
- Categorias filhas (Studio, Produtora, Agência) usando `business_unit`
- Espaços de comunidade base
- Autor inicial: Angelo Mazzutti (a partir do `profile_id` real)
- ❓ Produtos seed? Ou só seed de taxonomia e autor?

---

## Decisões em aberto (precisam de resposta antes do Bloco D)

> Marque sua resposta direto neste arquivo, ou cole respostas no chat.

1. ❓ **Moeda única ou multi-moeda?**
   Default proposto: `BRL` fixo em `academy_products.currency` com CHECK.
   Suporte multi-moeda parece overkill agora.

2. ❓ **Preço NULL = "grátis" ou "sob consulta"?**
   Proposta: `price_cents` NOT NULL DEFAULT 0; `0` = grátis. Mentorias com
   preço variável usam `subscription_plans` separado ou produto-pai sem
   compra direta + flag `inquiry_only`.

3. ❓ **Bundle pode conter outro bundle?**
   Proposta: **não** (CHECK no `bundle_items` impede produtos com
   `type='bundle'` como filho).

4. ❓ **Subscription dá acesso a quê?**
   Opções:
   - (a) acesso plano a um conjunto fixo de produtos (table
     `academy_subscription_includes`)
   - (b) acesso a tudo marcado `included_in_subscription = true`
   Proposta: (b) — mais simples, suficiente pra começar.

5. ❓ **Mentoria — 1:1 ou em grupo?**
   Proposta: começar só com 1:1; usar `metadata.slots[]` com horários.
   Reservas futuras viram tabela própria depois.

6. ❓ **Quotas / agendamento de mentorias**
   Pular para depois do MVP? Proposta: **sim**, fica fora deste schema agora.

7. ❓ **Comunidade — sem moderação automática no MVP?**
   Proposta: `posts.status` começa em `'published'`; report → admin revisa
   manualmente; sem AI moderation por enquanto.

8. ❓ **Certificados — geração de PDF onde?**
   Proposta: tabela guarda só `pdf_url`; geração feita por Edge Function
   on-demand. Schema fica pronto, geração é outro projeto.

9. ❓ **Notificações in-app + email?**
   Proposta: tabela é só in-app (`academy_notifications`). Email/push
   ficam em job externo lendo essa tabela. Fora do schema.

10. ❓ **Soft delete em quais tabelas?**
    Proposta: nenhuma usa soft delete dedicado; usar `status='archived'`
    onde fizer sentido (produtos, posts). Comentários/reviews realmente
    deletam.

11. ❓ **Audit log da Academy reusa `0021_audit_log.sql` ou tem o próprio?**
    Proposta: reusar o do CRM se ele for genérico o suficiente. Verificar
    no Bloco D.

12. ❓ **Seed de produtos no Bloco P?**
    Proposta: **não** semear produtos via SQL. Você cria pelo admin.
    Bloco P só semeia taxonomia + Angelo autor.

---

## Próximo passo

1. Responda as 12 perguntas acima (pode ser inline neste arquivo ou no chat).
2. Eu produzo a **spec detalhada do Bloco D (`0027_academy_products.sql`)**
   no mesmo formato dos blocos A/B/C — pronta pra colar de volta.
3. Você cola → eu escrevo o SQL → você valida → executa no Supabase.
