-- 0039_academy_seeds.sql
-- House Mazzutti Academy — seeds iniciais: categorias raiz + filhas + spaces da comunidade.
-- Idempotente. NÃO insere produtos nem autor (autor exige auth.users real).
-- DEPENDS ON: 0026 (categories), 0036 (community_spaces)

------------------------------------------------------------
-- Categorias raiz
------------------------------------------------------------
insert into public.academy_categories (slug, name, description, order_index, active)
values
  ('cursos',     'Cursos',     'Cursos completos em vídeo, com módulos e aulas progressivas.', 10, true),
  ('ebooks',     'Ebooks',     'Livros digitais práticos sobre Studio, Produtora e Agência.', 20, true),
  ('mentorias',  'Mentorias',  'Acompanhamento individual com Angelo Mazzutti.', 30, true),
  ('lives',      'Lives',      'Eventos ao vivo e workshops gravados.', 40, true),
  ('comunidade', 'Comunidade', 'Espaços de troca entre alunos e profissionais.', 50, true)
on conflict (parent_id, slug) do nothing;

------------------------------------------------------------
-- Categorias filhas por business_unit
------------------------------------------------------------
with roots as (
  select id, slug from public.academy_categories where parent_id is null
)
insert into public.academy_categories (parent_id, slug, name, business_unit, order_index, active)
select r.id, v.slug, v.name, v.bu::business_unit, v.idx, true
from roots r
cross join (values
  ('studio',    'Studio',    'studio'::text,    10),
  ('produtora', 'Produtora', 'produtora'::text, 20),
  ('agencia',   'Agência',   'agencia'::text,   30)
) as v(slug, name, bu, idx)
where r.slug in ('cursos','ebooks','mentorias','lives')
on conflict (parent_id, slug) do nothing;

------------------------------------------------------------
-- Spaces da comunidade
------------------------------------------------------------
insert into public.academy_community_spaces (slug, name, description, order_index, active, requires_subscription)
values
  ('geral',             'Geral',             'Boas-vindas, dúvidas rápidas e papo livre.', 10, true, false),
  ('cases',             'Cases',             'Compartilhe trabalhos, antes/depois, cases reais.', 20, true, false),
  ('behind-the-scenes', 'Behind the Scenes', 'Bastidores: equipamento, setup, fluxos.', 30, true, false),
  ('agencia',           'Agência',           'Operação, prospecção, casting, contratos.', 40, true, false),
  ('produtora',         'Produtora',         'Pré-produção, set, direção, pós.', 50, true, false),
  ('studio',            'Studio',            'Iluminação, direção de modelo, edição.', 60, true, false),
  ('vagas-e-jobs',      'Vagas e Jobs',      'Oportunidades, freelas, parcerias.', 70, true, false)
on conflict (slug) do nothing;
