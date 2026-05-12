-- 0008_agencia_descriptions.sql
-- Enriquecimento de services.description (Agência) a partir das fichas
-- técnicas oficiais (Drive: pasta 1IPq1MXiRgGrD_ta454jg0iCdoUJfgBGU).
-- Preços e estrutura de pacotes ficam intactos.

update public.services set description =
  'Projeto completo de marca: pesquisa estratégica, posicionamento, identidade visual, brand book documentado e aplicações práticas (impressos, merchandising e fachada). Cinco módulos combináveis em pacotes Essencial/Completo/Premium/Máximo, com prazos de 20 a 75 dias. Marca pensada, pesquisada, documentada e aplicada com coerência.'
where slug = 'branding-project';

update public.services set description =
  'Ecossistema de comunicação multicanal para lançamentos: hero film, vídeos médios, reels, editorial, storytelling e landing page conectados por uma narrativa única. Dez formatos disponíveis — de Ecossistema 360° e Storyfilm a Onlife, Editorial Social, Live Performance, Lookbook Interativo e Storyselling de Fundadores. Fases: descoberta, criação, produção, pós e ativação.'
where slug = 'campanha-lancamento';

update public.services set description =
  'Sites premium com design autoral, performance e SEO. Três categorias: Pessoa Física/MEI (marca pessoal, portfólio, landing), Empresarial (corporativo, portal de agendamento, leads) e E-commerce moda/beleza/saúde (WooCommerce para escala ou Nuvemshop para validação rápida). Inclui consultoria estratégica, design, desenvolvimento, integrações (CRM, pagamento, frete, ERP) e treinamento.'
where slug = 'desenvolvimento-web';
