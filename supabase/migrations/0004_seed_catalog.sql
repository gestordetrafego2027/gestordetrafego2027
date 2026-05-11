-- 0004_seed_catalog.sql
-- Seed do catálogo: pipelines, serviços (Agência/Studio/Produtora), pacotes,
-- add-ons e profissionais avulsos da Produtora.
-- Idempotente via slug + on conflict.

------------------------------------------------------------
-- Pipeline stages
------------------------------------------------------------
insert into public.pipeline_stages (segment, slug, name, position, is_won, is_lost) values
  -- Talents (alunos, talentos, parceiros, fornecedores)
  ('talents', 'novo_cadastro',  'Novo cadastro',     10, false, false),
  ('talents', 'triagem',        'Triagem',           20, false, false),
  ('talents', 'entrevista',     'Entrevista',        30, false, false),
  ('talents', 'aprovado',       'Aprovado',          40, true,  false),
  ('talents', 'onboarding',     'Onboarding',        50, true,  false),
  ('talents', 'ativo',          'Ativo na rede',     60, true,  false),
  ('talents', 'reprovado',      'Reprovado',         70, false, true),
  -- Commercial (clientes B2B)
  ('commercial', 'novo_lead',          'Novo lead',           10, false, false),
  ('commercial', 'qualificacao',       'Qualificação',        20, false, false),
  ('commercial', 'briefing',           'Briefing recebido',   30, false, false),
  ('commercial', 'proposta',           'Proposta enviada',    40, false, false),
  ('commercial', 'negociacao',         'Em negociação',       50, false, false),
  ('commercial', 'fechado_ganho',      'Fechado (ganho)',     60, true,  false),
  ('commercial', 'fechado_perdido',    'Fechado (perdido)',   70, false, true)
on conflict (segment, slug) do nothing;

------------------------------------------------------------
-- AGÊNCIA — services
------------------------------------------------------------
insert into public.services (slug, unit, name, description, position) values
  ('branding-project',    'agencia', 'Branding Project',
    'Projeto de marca: estratégia, identidade visual, brand book, visual merchandising e fachada como módulos.', 10),
  ('campanha-lancamento', 'agencia', 'Campanha de Lançamento',
    'Ecossistema de campanha multicanal — narrativa, produção integrada, distribuição e lançamento.', 20),
  ('desenvolvimento-web', 'agencia', 'Desenvolvimento Web',
    'Sites premium: estratégia digital, design, desenvolvimento, SEO e integrações.', 30),
  ('rp-mkt-direto',       'agencia', 'RP & Marketing Direto',
    'Assessoria de imprensa, relações públicas e marketing direto para marcas pessoais e corporativas.', 40)
on conflict (slug) do nothing;

------------------------------------------------------------
-- STUDIO — services
------------------------------------------------------------
insert into public.services (slug, unit, name, description, position) values
  ('book-studio',     'studio', 'Book Studio',
    'Book profissional para modelos, talentos e profissionais — direção de imagem completa.', 10),
  ('ensaio-pessoal',  'studio', 'Ensaio Pessoal',
    'Ensaio fotográfico autoral para autoimagem, redes sociais e posicionamento profissional.', 20),
  ('cobertura',       'studio', 'Cobertura / Concierge Production',
    'Cobertura de eventos, agendas e lifestyle em São Paulo com produção premium.', 30)
on conflict (slug) do nothing;

------------------------------------------------------------
-- PRODUTORA — services
------------------------------------------------------------
insert into public.services (slug, unit, name, description, position) values
  ('editorial-moda',         'produtora', 'Editorial de Moda',
    'Produção estética para posicionamento e branding de marcas de moda — lookbooks, fashion films, e-commerce.', 10),
  ('direcao-criativa',       'produtora', 'Direção & Criação Estratégica',
    'Direção criativa, videografia, fotografia, cenografia, narrativa publicitária e produção executiva.', 20),
  ('publicidade-campanha',   'produtora', 'Publicidade & Campanha',
    'Campanhas publicitárias completas — produção executiva 360°, linha editorial e creators.', 30),
  ('producao-educacao',      'produtora', 'Produção de Educação',
    'Conteúdo audiovisual para educação corporativa e infoprodutos.', 40),
  ('producao-eventos',       'produtora', 'Produção de Eventos',
    'Cobertura, transmissão e captação aérea de eventos.', 50),
  ('producao-corporativa',   'produtora', 'Produção Corporativa & Institucional',
    'Vídeos institucionais, posicionamento de CEO, vídeos explicativos e banco de imagem.', 60)
on conflict (slug) do nothing;

------------------------------------------------------------
-- STUDIO — service_packages
------------------------------------------------------------
-- Book Studio
insert into public.service_packages (service_id, slug, name, price_brl, duration, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.duration, p.includes::jsonb, p.position
from public.services s, (values
  ('essencial',   'Essencial',   4500.00,  '3h',  '["3 looks","Direção criativa básica","15 fotos tratadas","Studio house ou local","Sem assistente","Sem produção de looks"]', 10),
  ('estrategico', 'Estratégico', 10000.00, '4h',  '["4 looks","Direção criativa estratégica","20 fotos tratadas","Studio + externa","Assistente incluído","Orientação de produção de looks"]', 20),
  ('premium',     'Premium',     15000.00, '6h',  '["5 looks","Direção criativa autoral","25 fotos tratadas","Studio Premium","Assistente incluído","Stylist dedicado"]', 30)
) as p(slug, name, price_brl, duration, includes, position)
where s.slug = 'book-studio'
on conflict (service_id, slug) do nothing;

-- Ensaio Pessoal
insert into public.service_packages (service_id, slug, name, price_brl, duration, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.duration, p.includes::jsonb, p.position
from public.services s, (values
  ('2-looks', '2 Looks', 2800.00, '3h', '["2 looks","1 Make + Hair","8 fotos tratadas","Moodboard","Direção de poses"]', 10),
  ('3-looks', '3 Looks', 3600.00, '4h', '["3 looks","1 Make + 2 Hair","10 fotos tratadas","Moodboard","Direção de poses"]', 20),
  ('4-looks', '4 Looks', 4400.00, '5h', '["4 looks","2 Make + 3 Hair","12 fotos tratadas","Moodboard","Direção de poses"]', 30)
) as p(slug, name, price_brl, duration, includes, position)
where s.slug = 'ensaio-pessoal'
on conflict (service_id, slug) do nothing;

-- Cobertura / Concierge
insert into public.service_packages (service_id, slug, name, price_brl, duration, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.duration, p.includes::jsonb, p.position
from public.services s, (values
  ('oficial-plan',   'Oficial Plan',   2700.00, 'Até 2h', '["1 fotógrafo","5 fotos editadas","Sem vídeo","Deslocamento incluso"]', 10),
  ('essencial-plan', 'Essencial Plan', 4500.00, 'Até 2h', '["1 fotógrafo","10 fotos editadas","1 reels até 45s","1 videomaker","Deslocamento incluso"]', 20),
  ('imersive-plan',  'Imersive Plan',  5500.00, 'Até 4h', '["1 fotógrafo","15 fotos editadas + 1 vídeo","2 reels + teaser","1 videomaker","Plano de direção (moodboard)","Acompanhamento backstage parcial"]', 30),
  ('realtime-plan',  'RealTime Plan',  8500.00, 'Até 6h', '["1 fotógrafo","50 fotos editadas + 1 vídeo","1 teaser + reels + sequência stories","1 videomaker + 1 storymaker","Plano de direção (moodboard)","Acompanhamento backstage completo"]', 40)
) as p(slug, name, price_brl, duration, includes, position)
where s.slug = 'cobertura'
on conflict (service_id, slug) do nothing;

------------------------------------------------------------
-- STUDIO — service_addons
------------------------------------------------------------
-- Add-ons do Book
insert into public.service_addons (service_id, slug, name, price_brl, description, position)
select s.id, a.slug, a.name, a.price_brl, a.description, a.position
from public.services s, (values
  ('video-catwalk',          'Vídeo Catwalk',                      2500.00, 'Apresentação técnica para agências — desfile, postura, presença e movimento. Vídeo até 60s, vertical e horizontal.', 10),
  ('video-casting-falado',   'Vídeo Casting / Apresentação Falada', 3500.00, 'Vídeo estratégico com roteiro para envio a agências. Direção de fala, gravação até 1 min, edição dinâmica, inserção de nome/altura/medidas.', 20),
  ('book-impresso-padrao',   'Book Impresso (Padrão)',             2500.00, 'Material físico profissional — curadoria, diagramação clean, capa personalizada, papel premium, até 20 páginas.', 30),
  ('book-impresso-premium',  'Book Impresso (Premium)',            4000.00, 'Versão luxo do Book Impresso, com acabamento premium.', 40),
  ('fashionfilme-essencial', 'Fashionfilme Essencial',             1200.00, '1 vídeo vertical até 45s.', 50),
  ('fashionfilme-estrategico','Fashionfilme Estratégico',          2000.00, '1 vídeo até 60s + teaser de 15s.', 60),
  ('fashionfilme-premium',   'Fashionfilme Premium',               3500.00, '2 vídeos + cortes para tráfego.', 70)
) as a(slug, name, price_brl, description, position)
where s.slug = 'book-studio'
on conflict do nothing;

-- Add-ons globais (entrega rápida, periculosidade, etc.)
insert into public.service_addons (service_id, slug, name, description, price_brl, position) values
  (null, 'entrega-rapida-6h',  'Entrega rápida (até 6h)',  'Entrega das fotos editadas em até 6 horas após o shooting.', null, 10),
  (null, 'entrega-rapida-24h', 'Entrega rápida (até 24h)', 'Entrega das fotos editadas em até 24 horas após o shooting.', null, 20),
  (null, 'publicacao-blog',    'Publicação no Blog House', 'Inclusão do material no blog House Mazzutti.',                null, 30),
  (null, 'publicacao-externa', 'Publicação externa',       'Direitos de publicação em mídia externa.',                    null, 40),
  (null, 'alimentacao',        'Alimentação',              'Alimentação da equipe.',                                     null, 50),
  (null, 'risco-periculosidade','Risco / Periculosidade',  'Adicional para locações com risco operacional.',              null, 60),
  (null, 'equipamento-extra',  'Equipamento extra',        'Equipamento técnico além do padrão.',                         null, 70)
on conflict do nothing;

------------------------------------------------------------
-- PRODUTORA — service_packages
------------------------------------------------------------
-- Editorial de Moda
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('lookbook',       'Lookbook (foto + vídeo)',     3000.00, '["Produção de catálogo com modelos para coleção","Marcas de Moda","Gestão Completa: R$ 3.600"]', 10),
  ('fashion-film',   'Fashion Film',                 6000.00, '["Filme conceitual de coleção ou marca","Moda / Modelos","Gestão Completa: R$ 7.200"]', 20),
  ('short-videos',   'Short Vídeos Catálogo',        2500.00, '["Vídeos curtos para e-commerce e redes sociais","E-commerce","Gestão Completa: R$ 3.000"]', 30),
  ('still-produtos', 'Still de Produtos',            2500.00, '["Fotografia de produto para e-commerce","E-commerce","Gestão Completa: R$ 3.000"]', 40)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'editorial-moda'
on conflict (service_id, slug) do nothing;

-- Direção & Criação Estratégica
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('direcao-criativa',     'Projeto de Direção Criativa',    7000.00, '["Moodboard geral","Conceito e narrativa","Direção visual e estratégica","Gestão Completa: R$ 8.400"]', 10),
  ('direcao-videografia',  'Projeto de Direção de Videografia', 6000.00, '["Storyboard","Linguagem de câmera","Ritmo","Direção de vídeo","Gestão Completa: R$ 7.200"]', 20),
  ('direcao-fotografia',   'Projeto de Direção de Fotografia',  6000.00, '["Moodboard de luz","Estética","Enquadramentos","Direção de set","Gestão Completa: R$ 7.200"]', 30),
  ('cenografia',           'Projeto de Cenografia',          6000.00, '["Conceito de cenário","Objetos","Styling de set","Execução","Gestão Completa: R$ 7.200"]', 40),
  ('narrativa-publicitaria','Narrativa Publicitária',         5000.00, '["Storytelling","Slogan","Conceito de campanha","Posicionamento","Gestão Completa: R$ 6.000"]', 50),
  ('producao-executiva',   'Projeto de Produção Executiva',  8000.00, '["Planejamento geral","Cronograma","Orçamento","Gestão do projeto","Gestão Completa: R$ 9.600"]', 60)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'direcao-criativa'
on conflict (service_id, slug) do nothing;

-- Publicidade & Campanha
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('producao-360',         'Produção Executiva 360°',          20000.00, '["Campanha completa on/off","Grandes Marcas","Faixa: R$ 20.000–30.000+"]', 10),
  ('linha-editorial',      'Linha Editorial (2+ meses)',       25000.00, '["Conteúdo contínuo","Moda / Luxo","Faixa: R$ 25.000–35.000+"]', 20),
  ('campanha-influencers', 'Campanha com Influenciadores',     15000.00, '["Estratégia + creators","Marcas","Faixa: R$ 15.000–25.000+"]', 30)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'publicidade-campanha'
on conflict (service_id, slug) do nothing;

-- Educação
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('treinamento',  'Vídeo de Treinamento', 4000.00, '["Conteúdo técnico interno","Empresas","Gestão Completa: R$ 4.800"]', 10),
  ('video-aulas',  'Vídeo-aulas',          5000.00, '["Cursos online","Infoprodutores","Gestão Completa: R$ 6.000"]', 20),
  ('cases',        'Cases de Sucesso',     4000.00, '["Histórias reais de clientes","Empresas","Gestão Completa: R$ 4.800"]', 30)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'producao-educacao'
on conflict (service_id, slug) do nothing;

-- Eventos
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('cobertura-evento',  'Cobertura de Evento', 6000.00, '["Foto + vídeo","Empresas","Gestão Completa: R$ 7.200"]', 10),
  ('transmissao-online','Transmissão Online',  8000.00, '["Live commerce / eventos","Empresas","Gestão Completa: R$ 9.600"]', 20),
  ('imagens-aereas',    'Imagens Aéreas (Drone)', 3000.00, '["Captação aérea com drone","Empresas","Gestão Completa: R$ 3.600"]', 30)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'producao-eventos'
on conflict (service_id, slug) do nothing;

-- Corporativo / Institucional
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('posicionamento-ceo',  'Vídeo de Posicionamento CEO', 4000.00, '["CEO / institucional","Empresas","Gestão Completa: R$ 4.800"]', 10),
  ('video-explicativo',   'Vídeo Explicativo',          4000.00, '["Apresentação produto/serviço","Empresas","Gestão Completa: R$ 4.800"]', 20),
  ('video-marketing',     'Vídeo Marketing',            5000.00, '["Campanha digital","Empresas","Gestão Completa: R$ 6.000"]', 30),
  ('banco-imagem',        'Banco de Imagem',            6000.00, '["Conteúdo recorrente","Empresas","Gestão Completa: R$ 7.200"]', 40),
  ('video-apps-site',     'Vídeo para Apps e Site',     5000.00, '["Institucional digital","Empresas Tech","Gestão Completa: R$ 6.000"]', 50)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'producao-corporativa'
on conflict (service_id, slug) do nothing;

------------------------------------------------------------
-- AGÊNCIA — Branding Project (módulos como add-ons)
------------------------------------------------------------
insert into public.service_addons (service_id, slug, name, description, position)
select s.id, a.slug, a.name, a.description, a.position
from public.services s, (values
  ('modulo-identidade-visual',  'Módulo: Identidade Visual',     'Logotipo, paleta, tipografia, sistema gráfico.',                       10),
  ('modulo-brand-book',         'Módulo: Brand Book / Manual',   'Manual completo de marca com diretrizes de uso.',                      20),
  ('modulo-visual-merchandising','Módulo: Visual Merchandising', 'Design do ambiente interno do PDV (loja, vitrine, layout).',           30),
  ('modulo-fachada',            'Módulo: Projeto de Fachada',    'Design da fachada externa, sinalização e materiais (acrílico, metal, madeira, iluminação).', 40),
  ('modulo-print-pack',         'Módulo: Essencial Print Pack',  'Aplicações impressas — cartões, brochuras, papelaria.',               50),
  ('modulo-rp-imprensa',        'Módulo: Assessoria de Imprensa','Assessoria de imprensa e media training.',                            60)
) as a(slug, name, description, position)
where s.slug = 'branding-project'
on conflict do nothing;

------------------------------------------------------------
-- AGÊNCIA — Desenvolvimento Web (3 pacotes)
-- Nomes provisórios; ajustar quando a planilha de Agência for fornecida.
------------------------------------------------------------
insert into public.service_packages (service_id, slug, name, price_brl, includes, position)
select s.id, p.slug, p.name, p.price_brl, p.includes::jsonb, p.position
from public.services s, (values
  ('essential',     'Essential',     null, '["Site institucional / landing","Performance e responsividade","SEO técnico inicial","Integração WhatsApp e Instagram","Formulário de contato"]', 10),
  ('profissional',  'Profissional',  null, '["Site multi-página com blog","Galerias visuais","Áreas com CTA de conversão","Formulários inteligentes","Integrações de agenda/CRM","Treinamento básico"]', 20),
  ('premium',       'Premium',       null, '["Plataforma personalizada (WooCommerce ou stack custom)","Design exclusivo","E-commerce / catálogo / agenda","SEO avançado","Integrações ilimitadas (ERPs, marketplaces)","Manutenção mensal opcional"]', 30)
) as p(slug, name, price_brl, includes, position)
where s.slug = 'desenvolvimento-web'
on conflict (service_id, slug) do nothing;

------------------------------------------------------------
-- PRODUTORA — Team resource categories
------------------------------------------------------------
insert into public.team_resource_categories (slug, name, position) values
  ('direcao-criacao',   'Direção & Criação',     10),
  ('audiovisual',       'Audiovisual',           20),
  ('moda-beleza',       'Moda & Beleza',         30),
  ('casting-influencia','Casting & Influência',  40),
  ('producao-estrutura','Produção & Estrutura',  50)
on conflict (slug) do nothing;

------------------------------------------------------------
-- PRODUTORA — Team resources (catálogo de profissionais avulsos)
------------------------------------------------------------
-- 1. Direção & Criação
insert into public.team_resources (category_id, slug, role, description, base_price_brl, final_price_brl, target_audience, position)
select c.id, t.slug, t.role, t.description, t.base, t.final, t.target, t.position
from public.team_resource_categories c, (values
  ('producao-executiva-360', 'Produção Executiva 360', 'Gestão completa da campanha e orçamento', 8000.00, 9600.00, 'Empresas', 10),
  ('diretor-criativo',       'Diretor Criativo',        'Conceito, narrativa e supervisão criativa', 7000.00, 8400.00, 'Empresas', 20),
  ('diretor-arte',           'Diretor de Arte',         'Direção visual, estética e identidade',     6000.00, 7200.00, 'Empresas', 30),
  ('head-criacao',           'Head de Criação',         'Liderança criativa estratégica',            8000.00, 9600.00, 'Empresas', 40),
  ('supervisor-criativo',    'Supervisor Criativo',     'Supervisão da execução no set',             5000.00, 6000.00, 'Empresas', 50),
  ('roteirista',             'Roteirista',              'Criação de roteiro e storytelling',          5000.00, 6000.00, 'Empresas', 60),
  ('ilustrador',             'Ilustrador',              'Ilustrações e elementos gráficos',           4500.00, 5400.00, 'Empresas', 70),
  ('designer-grafico',       'Designer Gráfico',        'Design de peças visuais e layouts',          3500.00, 4200.00, 'Empresas', 80),
  ('redator-copywriter',     'Redator / Copywriter',    'Texto publicitário e copy estratégica',      4000.00, 4800.00, 'Empresas', 90)
) as t(slug, role, description, base, final, target, position)
where c.slug = 'direcao-criacao'
on conflict (category_id, slug) do nothing;

-- 2. Audiovisual
insert into public.team_resources (category_id, slug, role, description, base_price_brl, final_price_brl, target_audience, position)
select c.id, t.slug, t.role, t.description, t.base, t.final, t.target, t.position
from public.team_resource_categories c, (values
  ('videomaker',       'Videomaker',                     'Captação de vídeo profissional',        5000.00, 6000.00, 'Empresas', 10),
  ('diretor-fotografia','Diretor de Fotografia (DP/DF)', 'Direção da fotografia e luz',           6000.00, 7200.00, 'Empresas', 20),
  ('operador-camera',  'Operador de Câmera',             'Operação técnica de câmera',            3000.00, 3600.00, 'Empresas', 30),
  ('editor-video',     'Editor de Vídeo',                'Pós-produção e finalização',            3000.00, 3600.00, 'Empresas', 40),
  ('fotografo',        'Fotógrafo',                      'Sessão fotográfica profissional',        4000.00, 4800.00, 'Empresas', 50),
  ('editor-foto',      'Editor de Foto',                 'Tratamento e pós-produção',              2500.00, 3000.00, 'Empresas', 60),
  ('locutor',          'Locutor',                        'Narração profissional',                  4000.00, 4800.00, 'Empresas', 70),
  ('sound-designer',   'Sound Designer',                 'Design de som e ambientação',            5000.00, 6000.00, 'Empresas', 80),
  ('produtor-musical', 'Produtor Musical',               'Trilha sonora original',                 5000.00, 6000.00, 'Empresas', 90)
) as t(slug, role, description, base, final, target, position)
where c.slug = 'audiovisual'
on conflict (category_id, slug) do nothing;

-- 3. Moda & Beleza
insert into public.team_resources (category_id, slug, role, description, base_price_brl, final_price_brl, target_audience, position)
select c.id, t.slug, t.role, t.description, t.base, t.final, t.target, t.position
from public.team_resource_categories c, (values
  ('stylist',              'Stylist',                  'Produção de moda completa',     3000.00, 3600.00, 'Empresas', 10),
  ('assistente-stylist',   'Assistente de Stylist',    'Apoio ao stylist no set',       1200.00, 1440.00, 'Empresas', 20),
  ('maquiador',            'Maquiador',                'Maquiagem profissional',        2000.00, 2400.00, 'Empresas', 30),
  ('cabeleireiro',         'Cabeleireiro / Hair',      'Produção de cabelo',            1800.00, 2160.00, 'Empresas', 40),
  ('camareira',            'Camareira',                'Apoio, organização e set',       800.00,  960.00,  'Empresas', 50),
  ('passadeira',           'Passadeira',               'Cuidado com figurino',           900.00,  1080.00, 'Empresas', 60)
) as t(slug, role, description, base, final, target, position)
where c.slug = 'moda-beleza'
on conflict (category_id, slug) do nothing;

-- 4. Casting & Influência
insert into public.team_resources (category_id, slug, role, description, base_price_brl, final_price_brl, target_audience, position)
select c.id, t.slug, t.role, t.description, t.base, t.final, t.target, t.position
from public.team_resource_categories c, (values
  ('modelo-newface',       'Modelo New Face',          'Modelo iniciante',                       5000.00,  6000.00,  'Empresas', 10),
  ('modelo-renomada-br',   'Modelo Renomada (BR)',     'Modelo nacional',                        10000.00, 12000.00, 'Empresas', 20),
  ('modelo-internacional', 'Modelo Internacional',     'Modelo internacional',                   20000.00, 24000.00, 'Empresas', 30),
  ('influencer-nano',      'Influencer Nano (até 10k)','Creator iniciante',                      2000.00,  2400.00,  'Marcas',   40),
  ('influencer-micro',     'Influencer Micro (10–50k)','Influenciador nichado',                  4000.00,  4800.00,  'Marcas',   50),
  ('influencer-mid',       'Influencer Mid (50–200k)', 'Influenciador médio',                    8000.00,  9600.00,  'Marcas',   60),
  ('influencer-macro',     'Influencer Macro (200k+)', 'Influenciador de grande alcance',        15000.00, 18000.00, 'Marcas',   70),
  ('influencer-mega',      'Influencer Mega (5M+)',    'Influenciador de altíssimo alcance',     15000.00, 18000.00, 'Marcas',   80)
) as t(slug, role, description, base, final, target, position)
where c.slug = 'casting-influencia'
on conflict (category_id, slug) do nothing;

-- 5. Produção & Estrutura
insert into public.team_resources (category_id, slug, role, description, base_price_brl, final_price_brl, target_audience, position)
select c.id, t.slug, t.role, t.description, t.base, t.final, t.target, t.position
from public.team_resource_categories c, (values
  ('set-designer',          'Set Designer',                'Criação de cenário',                       6000.00, 7200.00, 'Empresas', 10),
  ('cenografia-execucao',   'Cenografia (execução)',       'Execução cenográfica',                     8000.00, 9600.00, 'Empresas', 20),
  ('assistente-producao',   'Assistente de Produção',      'Apoio geral de set',                       1000.00, 1200.00, 'Empresas', 30),
  ('locacao',               'Espaço / Locação',            'Aluguel de locação',                       5000.00, 6000.00, 'Empresas', 40),
  ('catering',              'Catering',                    'Alimentação da equipe',                    4000.00, 4800.00, 'Empresas', 50),
  ('brigadista',            'Brigadista',                  'Segurança e primeiros socorros',           3000.00, 3600.00, 'Eventos',  60),
  ('foquista',              '1º Assistente de Câmera (Foquista)','Controle de foco',                   2500.00, 3000.00, 'Empresas', 70),
  ('2-ac',                  '2º Assistente de Câmera',     'Cartões, bateria e claquete',              1800.00, 2160.00, 'Empresas', 80),
  ('logger-dit',            'Logger / DIT',                'Backup e gestão de mídia',                 2800.00, 3360.00, 'Empresas', 90),
  ('gaffer',                'Gaffer',                      'Chefe de elétrica',                        4000.00, 4800.00, 'Empresas', 100),
  ('maquinista',            'Maquinista',                  'Trilhos, grua e suporte',                  3500.00, 4200.00, 'Empresas', 110),
  ('best-boy',              'Best Boy',                    'Apoio técnico e logística',                2500.00, 3000.00, 'Empresas', 120)
) as t(slug, role, description, base, final, target, position)
where c.slug = 'producao-estrutura'
on conflict (category_id, slug) do nothing;

------------------------------------------------------------
-- TAGS iniciais
------------------------------------------------------------
insert into public.tags (slug, name, color) values
  ('vip',           'VIP',            '#FFD700'),
  ('urgente',       'Urgente',        '#FF3B30'),
  ('quente',        'Quente',         '#FF9500'),
  ('frio',          'Frio',           '#5AC8FA'),
  ('parceria',      'Parceria',       '#34C759'),
  ('indicacao',     'Indicação',      '#AF52DE'),
  ('instagram',     'Instagram',      '#E1306C'),
  ('whatsapp',      'WhatsApp',       '#25D366'),
  ('site-form',     'Site Form',      '#007AFF'),
  ('alto-ticket',   'Alto Ticket',    '#000000')
on conflict (slug) do nothing;
