'use client';

import React from 'react';
import Link from 'next/link';

const articles = {
  'book-para-modelos-quem-e-escolhido': {
    categoria: 'Studio — Book',
    titulo: 'Book para Modelos: o que realmente define quem é escolhido no mercado',
    data: 'Abril 2026',
    texto1: 'Existe um momento silencioso na trajetória de quem deseja trabalhar com imagem: aquele em que você percebe que talvez não esteja sendo visto da forma certa. Não é sobre beleza. Não é sobre potencial. É sobre como tudo isso está sendo apresentado. Muitos talentos deixam de avançar no mercado simplesmente porque não possuem um material capaz de traduzir quem realmente são.',
    citacao: 'Um book bem construído não é portfólio. É posicionamento. É a diferença entre esperar uma oportunidade e criar uma.',
    texto2: 'Um book fotográfico profissional não é apenas um ensaio. Ele é um instrumento de leitura. Agências, diretores de casting e marcas utilizam esse material para responder, rapidamente, perguntas essenciais: Essa pessoa é versátil? Ela entende câmera? Existe potencial comercial ou editorial?',
    texto3: 'Trabalhar com imagem exige mais do que presença. Exige construção. O book é, muitas vezes, o primeiro capítulo dessa construção — não como um registro, mas como uma decisão consciente sobre como você deseja ser visto.',
  },

  'book-modelo-imagem-trabalha-por-voce': {
    categoria: 'Studio — Book',
    titulo: 'Book de Modelo: quando sua imagem começa a trabalhar por você',
    data: 'Abril 2026',
    texto1: 'Existe uma mudança sutil — mas poderosa — quando alguém passa a se ver como parte do mercado. A forma de olhar para si muda. A forma de se apresentar também. O que antes era apenas tirar fotos passa a ser entendido como construção de imagem.',
    citacao: 'Sua imagem já comunica algo — mesmo quando não existe intenção. A diferença está em decidir o que ela deve comunicar.',
    texto2: 'Um book não nasce para impressionar. Ele nasce para comunicar. Cada imagem carrega uma função: revelar potencial, indicar direção, criar leitura rápida. O mercado não procura apenas rostos bonitos. Procura rostos que funcionam em diferentes contextos.',
    texto3: 'Existe um momento em que algo muda. O material começa a gerar retorno. Convites surgem. Respostas chegam. O olhar do mercado se abre. Isso não acontece por acaso. Acontece quando a imagem passa a estar alinhada com o que o mercado espera.',
  },

  'ensaio-pessoal-imagem-autoridade': {
    categoria: 'Studio — Ensaio',
    titulo: 'Ensaio Pessoal: o que realmente constrói uma imagem de autoridade',
    data: 'Março 2026',
    texto1: 'Existe um ponto na trajetória profissional em que o crescimento deixa de depender apenas de competência. E passa a depender de percepção. Você pode ter experiência, repertório, resultados — mas se sua imagem não traduz isso com clareza, o mercado não acessa essa informação.',
    citacao: 'Em estágios mais avançados de carreira, não basta ser. É necessário ser percebida com precisão.',
    texto2: 'O ensaio pessoal não deve ser entendido como um produto fotográfico. Ele é um instrumento de posicionamento visual. Ele estrutura percepção, define linguagem, orienta leitura de valor e estabelece hierarquia visual.',
    texto3: 'O ensaio pessoal não é sobre se mostrar melhor. É sobre garantir que aquilo que você já construiu possa, finalmente, ser visto da forma correta.',
  },

  'ensaio-pessoal-imagem-lidera-percepcao': {
    categoria: 'Studio — Ensaio',
    titulo: 'Ensaio Pessoal: quando sua imagem deixa de acompanhar sua trajetória',
    data: 'Março 2026',
    texto1: 'Existe uma transição silenciosa na vida profissional. Ela não acontece quando você conquista algo novo. Mas quando percebe que já não pode mais se apresentar da mesma forma. A imagem que antes funcionava já não sustenta mais.',
    citacao: 'Quando estética e intenção se encontram, o visual deixa de ser decorativo. A imagem passa a ter peso. A presença ganha consistência.',
    texto2: 'Durante um ensaio pessoal bem conduzido, algo acontece além da imagem. Você se reposiciona. Não apenas diante da câmera — mas diante de si mesma. A forma como você se move muda. A forma como você sustenta o olhar muda.',
    texto3: 'Você não precisa se tornar outra pessoa. Mas, em algum momento, precisa atualizar a forma como é vista. E quando isso é feito com direção, intenção e clareza, sua imagem deixa de ser apenas reflexo. E passa a ser extensão real da sua presença.',
  },

  'cobertura-externa-presenca-alto-valor': {
    categoria: 'Studio — Cobertura',
    titulo: 'Cobertura Externa em Tempo Real: o que realmente define uma presença de alto valor em São Paulo',
    data: 'Fevereiro 2026',
    texto1: 'São Paulo é uma cidade que exige presença. Mas, na prática, poucas pessoas realmente constroem essa presença de forma intencional. Entre compromissos, eventos, deslocamentos e agendas intensas, o que deveria ser uma experiência marcante muitas vezes se perde em registros aleatórios.',
    citacao: 'Presença de alto nível não acontece por acaso. Ela é construída.',
    texto2: 'A Cobertura Externa em Tempo Real não nasce como um serviço de cobertura tradicional. Ela nasce como uma estrutura de acompanhamento. Enquanto formatos comuns se limitam a registrar momentos, aqui o foco está em algo mais sofisticado: produzir presença ao longo da jornada.',
    texto3: 'Existem agendas que passam. E existem agendas que marcam. A diferença entre elas raramente está no evento em si — mas na forma como ele é vivido, organizado e apresentado.',
  },

  'cobertura-externa-narrativa-visual': {
    categoria: 'Studio — Cobertura',
    titulo: 'Cobertura Externa em Tempo Real: quando sua experiência em São Paulo se transforma em narrativa visual',
    data: 'Fevereiro 2026',
    texto1: 'Algumas experiências merecem mais do que serem vividas. Merecem ser construídas. São agendas importantes, convites especiais, momentos que carregam significado — e que, quando bem conduzidos, se tornam algo maior do que o próprio acontecimento.',
    citacao: 'Alguns momentos passam rapidamente. Outros permanecem. Não porque foram mais importantes — mas porque foram melhor construídos.',
    texto2: 'Existe uma diferença sutil entre participar de um evento e realmente marcar presença. Ela não está apenas no look. Está na forma como tudo se organiza ao redor. A chegada. O tempo. O ritmo. A leitura visual.',
    texto3: 'Quando existe intenção, cuidado e direção, até uma simples passagem pela cidade pode se transformar em algo memorável.',
  },

  'branding-project-arquitetura-valor': {
    categoria: 'Agência — Branding',
    titulo: 'Branding Project como Arquitetura de Valor',
    data: 'Março 2026',
    texto1: 'Existe um ponto silencioso — mas decisivo — dentro de qualquer negócio. Não é o produto. Não é o serviço. Não é nem mesmo o preço. É a forma como tudo isso é percebido. Duas empresas podem entregar exatamente a mesma solução. Mas apenas uma será lembrada. Apenas uma será desejada.',
    citacao: 'Branding não é estética. É alavanca de crescimento.',
    texto2: 'O Branding Project é um processo estruturado de desenvolvimento de marca que transforma uma ideia de negócio em um sistema completo de identidade, percepção e aplicação. Ele integra estratégia de marca, identidade visual, diretrizes e aplicações práticas.',
    texto3: 'Todo negócio começa com uma ideia. Mas só cresce quando essa ideia se torna clara, reconhecível e desejada. O Branding Project existe para transformar isso em realidade.',
  },

  'branding-project-motor-vendas': {
    categoria: 'Agência — Branding',
    titulo: 'Branding Project como Motor de Vendas',
    data: 'Março 2026',
    texto1: 'A maioria das empresas comete o mesmo erro. Investe primeiro em tráfego. Depois em conteúdo. Depois em equipe comercial. E só então percebe que algo não funciona. Os leads não convertem como deveriam. O preço precisa ser justificado o tempo todo.',
    citacao: 'Sem marca, você paga mais caro para crescer.',
    texto2: 'Sem um Branding Project, toda ação de crescimento opera com atrito. Isso acontece porque a comunicação não é clara, a identidade não sustenta valor e a percepção não acompanha a entrega.',
    texto3: 'Toda empresa quer crescer. Mas poucas percebem que o crescimento sustentável começa antes da venda. Começa na construção da marca.',
  },

  'quanto-investir-em-branding': {
    categoria: 'Agência — Branding',
    titulo: 'Quanto investir em branding: o guia estratégico',
    data: 'Fevereiro 2026',
    texto1: 'A pergunta mais comum sobre branding é direta: quanto custa? Mas a pergunta mais inteligente é outra: quanto vale construir uma marca que sustenta o crescimento do meu negócio? Porque branding não é um gasto isolado. É uma decisão estrutural.',
    citacao: 'Economizar no branding pode sair caro — e de forma contínua.',
    texto2: 'Muitas empresas olham para branding como criação de logo, escolha de cores, estética visual. E por isso tentam reduzir investimento e simplificar decisão. O problema é que isso gera marcas genéricas, falta de diferenciação e dificuldade de crescimento.',
    texto3: 'Quanto investir em branding? A resposta mais honesta é: o suficiente para não precisar refazer depois. Porque branding não é algo que você faz várias vezes. É algo que você estrutura para sustentar o seu crescimento.',
  },

  'campanha-lancamento-arquitetura-invisivel': {
    categoria: 'Agência — Campanhas',
    titulo: 'Campaign de Lançamento: a arquitetura invisível',
    data: 'Fevereiro 2026',
    texto1: 'Existe uma diferença silenciosa — e decisiva — entre marcas que lançam e marcas que crescem. As primeiras comunicam. As segundas constroem presença. No ambiente atual, lançar deixou de ser um ato pontual. Passou a ser um processo estratégico de ocupação de espaço.',
    citacao: 'Comunicação sem estrutura gera visibilidade. Comunicação estruturada gera crescimento.',
    texto2: 'Uma Campaign de Lançamento é uma arquitetura estratégica que organiza múltiplos pontos de contato em torno de uma narrativa central, com o objetivo de gerar percepção consistente e impacto progressivo.',
    texto3: 'No cenário atual, crescer não depende apenas de aparecer. Depende de como se aparece — e com que consistência. A Campaign de Lançamento é o que transforma intenção em estrutura. E estrutura em resultado.',
  },

  'por-que-campanhas-falham': {
    categoria: 'Agência — Campanhas',
    titulo: 'Por que a maioria das campanhas falha',
    data: 'Janeiro 2026',
    texto1: 'Vivemos a era do excesso. Mais vídeos. Mais fotos. Mais posts. Mais campanhas. E, paradoxalmente, menos impacto. A maioria das marcas não sofre por falta de conteúdo. Sofre por falta de direção.',
    citacao: 'Não é sobre fazer mais. É sobre conectar melhor.',
    texto2: 'Grande parte das marcas não falha por falta de qualidade. Falha por falta de integração. É comum encontrar vídeos bem produzidos que não se conectam com outros conteúdos, campanhas que não têm continuidade e estética inconsistente entre canais.',
    texto3: 'Campanhas não falham por falta de talento. Elas falham por falta de estrutura. No cenário atual, não vence quem produz mais. Vence quem organiza melhor.',
  },

  'editorial-moda-narrativa-visual': {
    categoria: 'Produtora — Editorial de Moda',
    titulo: 'Editorial de Moda como Narrativa Visual',
    data: 'Janeiro 2026',
    texto1: 'Existe um momento sutil em que a moda deixa de ser apenas matéria. E passa a ser percepção. É quando o tecido já não comunica apenas textura, mas intenção. Quando a pose não mostra apenas uma roupa, mas sugere uma história.',
    citacao: 'O valor deixou de estar apenas no que é vendido. E passou a estar na forma como é apresentado.',
    texto2: 'O editorial de moda é uma produção visual estruturada para transformar uma coleção em narrativa. Mais do que fotografar produtos, ele organiza elementos como direção de arte, styling, casting, luz e cenário para criar uma leitura coesa de marca.',
    texto3: 'Uma coleção pode existir. Mas nem sempre é percebida. O editorial é o que traduz. O que conecta. O que sustenta. E, principalmente, o que transforma produto em presença.',
  },

  'editorial-moda-performance-vendas': {
    categoria: 'Produtora — Editorial de Moda',
    titulo: 'Editorial de Moda orientado à performance',
    data: 'Janeiro 2026',
    texto1: 'Existe um momento silencioso entre ver e desejar. E outro, ainda mais decisivo, entre desejar e comprar. A maioria das marcas acredita que esse processo acontece de forma natural. Mas não acontece. Ele é conduzido.',
    citacao: 'Imagem deixou de ser suporte. Ela passou a ser motor de performance.',
    texto2: 'Um editorial orientado à performance é uma produção visual estruturada não apenas para posicionar — mas para gerar resultado mensurável. Ele organiza direção de arte, enquadramento, ritmo visual e linguagem corporal com um objetivo claro: aumentar a capacidade da imagem de gerar ação.',
    texto3: 'Na moda, vender não é apenas oferecer. É conduzir percepção até a decisão. O editorial, quando bem construído, faz exatamente isso. Ele não apenas mostra. Ele direciona. E, no momento certo, ele converte.',
  },

  'por-que-boas-ideias-nao-garantem-resultados': {
    categoria: 'Produtora — Prod. Executiva',
    titulo: 'Por que boas ideias não garantem bons resultados?',
    data: 'Dezembro 2025',
    texto1: 'Uma ideia forte é apenas o ponto de partida. Sem execução estruturada, ela perde intensidade, se dilui, se adapta demais e perde identidade. Isso é mais comum do que parece.',
    citacao: 'Produção influencia performance. Conteúdos mais consistentes retêm mais atenção, aumentam engajamento e melhoram conversão.',
    texto2: 'O investimento em conteúdo e campanhas aumentou. Mas junto com ele, aumentou o risco. Mais formatos significa mais complexidade. Mais equipe significa mais variáveis. Mais canais significa mais possibilidade de erro.',
    texto3: 'Projetos bem estruturados têm menos surpresas, tomam decisões mais rápidas e executam com mais confiança. E isso impacta diretamente o resultado.',
  },

  'producao-executiva-sistema-campanhas': {
    categoria: 'Produtora — Prod. Executiva',
    titulo: 'Produção Executiva: o sistema invisível que transforma ideias em campanhas',
    data: 'Dezembro 2025',
    texto1: 'Existe um imaginário comum no mercado publicitário: acredita-se que campanhas são feitas de ideias brilhantes. E, de fato, são. Mas o que raramente se discute é que ideias não falham — execuções falham.',
    citacao: 'Grandes campanhas não são feitas apenas com talento — são sustentadas por estrutura.',
    texto2: 'Produção Executiva não é produção. É governança. É o que conecta criação, equipe, fornecedores, cronograma, orçamento e execução em um único fluxo coerente. Sem isso, cada área funciona bem — mas o todo falha.',
    texto3: 'A House atua com uma visão clara: não basta criar bem, é preciso entregar com excelência. Por isso, a Produção Executiva conecta direção criativa, operação técnica, linguagem de marca e execução em set.',
  },

  'por-que-campanhas-caras-falham': {
    categoria: 'Produtora — Prod. Executiva',
    titulo: 'Por que campanhas caras falham',
    data: 'Dezembro 2025',
    texto1: 'Existe uma expectativa implícita no mercado: quanto maior o investimento, maior o resultado. Mas na prática, o que determina o resultado não é o valor investido. É a forma como esse investimento é organizado.',
    citacao: 'O custo não está apenas no orçamento. Está na eficiência perdida.',
    texto2: 'Muitas campanhas contam com bons profissionais em cada área. Mas sem um ponto central de coordenação, decisões se fragmentam, responsabilidades se sobrepõem e prioridades se confundem.',
    texto3: 'Produção Executiva atua como uma camada de proteção. Ela não elimina imprevistos. Mas reduz significativamente o impacto deles. Ela transforma incerteza em previsibilidade.',
  },
};

export default function ArticleContent({ slug }) {
    const article = articles[slug] || articles['book-para-modelos-quem-e-escolhido'];

    return (
        <div className="bg-white text-zinc-800 m-0 p-0 antialiased font-sans">
            <style dangerouslySetInnerHTML={{ __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                    font-size: 18px;
                }
                body {
                    font-feature-settings: "kern" 1;
                    -webkit-font-smoothing: antialiased;
                }
                .hairline-b { border-bottom: 0.5px solid #e0e0e0; }
                .hairline-t { border-top: 0.5px solid #e0e0e0; }
                .hairline-all { border: 0.5px solid #e0e0e0; }
                .fine-line { border-bottom: 0.5px solid #f0f0f0; }
            `}} />

            {/* TopAppBar */}
            <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50">
                <div className="flex justify-between items-center px-8 h-20 hairline-b">
                    <Link href="/" className="text-2xl font-headline italic text-zinc-900 no-underline">HOUSE MAZZUTTI</Link>
                    <nav className="hidden xl:flex items-center gap-6">
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/">HOME</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/about">SOBRE</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/studio">STUDIO</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/produtora">PRODUTORA</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/agencia">AGÊNCIA</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/angelo">ANGELO</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/comunidade">COMUNIDADE</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/portfolio">PORTFÓLIO</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-900 border-b-[0.5px] border-zinc-900 pb-1" href="/blog">BLOG</Link>
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500 hover:text-zinc-900 transition-opacity" href="/contato">CONTATO</Link>
                        <span className="material-symbols-outlined cursor-pointer text-zinc-900 ml-2">search</span>
                    </nav>
                    <div className="xl:hidden flex items-center gap-4">
                        <span className="material-symbols-outlined cursor-pointer">search</span>
                        <span className="material-symbols-outlined cursor-pointer">menu</span>
                    </div>
                </div>
                <div className="h-[0.5px] w-full fine-line"></div>
            </header>
            <div className="h-20 w-full"></div>

            {/* Title Block */}
            <section className="mt-0 hairline-b pt-7 pb-4 px-10 flex justify-between items-center bg-white">
                <div className="text-[14px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900">BLOG</div>
                <div className="pr-[120px] font-headline italic text-zinc-500 text-[18px]">
                    Home / Blog / {article.titulo}
                </div>
            </section>

            {/* Main Content Layout */}
            <main className="max-w-[1400px] mx-auto flex flex-col lg:flex-row px-8 py-16 gap-16 items-start">
                {/* Article Content */}
                <article className="flex-1 max-w-[860px]">
                    {/* Hero Slider */}
                    <div className="relative aspect-video bg-zinc-100 mb-12 group overflow-hidden">
                        <img alt="professional fashion model" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRiG1oq6763CqUifvwVFLJeKwBhS5kXPoAHgmg0ugN832fmDeDPykPGMSDAFQNwo8V2k-mo37N-SrpCqPdWoJHmWR3SIf5tAqoaX7btgs0O4cU32iksgNvCEnGAq7ZLw7hiu9CcovhNeKBP9uCuvXeXTyDKbp65GL_F2syOljyI6QG2YbNzuYM_r_2cd6z0mQDoaRWxlcd5kXVvPEiD-rx02G2W7GLHUr35A6KyBVLkH7Qw0u62h31vNVOTNZKJUzdNSZk_Af4W8EC"/>
                        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur text-white text-2xl font-light">←</button>
                            <button className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur text-white text-2xl font-light">→</button>
                        </div>
                    </div>
                    {/* Metadata & Title */}
                    <div className="mb-10 text-center md:text-left">
                        <div className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-500 mb-4">{article.categoria}</div>
                        <h1 className="text-xl md:text-2xl font-headline uppercase tracking-[0.15em] leading-tight text-zinc-900">
                            {article.titulo}
                        </h1>
                    </div>
                    {/* Body 1 */}
                    <div className="text-zinc-700 text-sm md:text-base leading-[1.9] font-body space-y-8 mb-12">
                        <p>{article.texto1}</p>
                    </div>
                    {/* Blockquote */}
                    <div className="bg-zinc-950 text-white p-12 md:p-16 mb-12 text-center">
                        <blockquote className="font-headline italic text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                            "{article.citacao}"
                        </blockquote>
                    </div>
                    {/* Body 2 */}
                    <div className="text-zinc-700 text-sm md:text-base leading-[1.9] font-body space-y-8 mb-12">
                        <p>{article.texto2}</p>
                    </div>
                    {/* Side-by-Side Images Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-12 aspect-[3/2] overflow-hidden">
                        <div className="h-full bg-zinc-100">
                            <img alt="close-up portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoQ4Cua8bpnT8yLhrYNbmm_YoJE-vwBnrIPFIZjeJMi0AbKYn75BbccZb4_UjvHQLlc9SAVl4vg2kq_NI_jpNoAOrxhwXMe9P-uzkFRN4dF_E3YknX_dUc8uIsxDx2QmJAo_INfo7n2KfLClk_W-_SCT3sgbQxcN_qMBpGEhliaMM0JWrNwomVB3HIyZrFD1cwnCUGJfleDCNDfFKl-8YWf68Pxh1XU5r3FdC90dzROT8WRS0h7nBlDcYt3-GiG_JSpR0MH6lxkHXE"/>
                        </div>
                        <div className="h-full bg-zinc-100">
                            <img alt="full body dynamic model pose" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYQE1P82Z0eTcUjnQk8n9vE1BNywx2mWiwAbdHny4dMy3huLLw4XkciV5SQASwPncBgmSzbx_wJy6JNApRj2b9dYIx_gRkkr52s-rjAmXSf0Zyl-7rQ21HOc3XX_p4KgoM9ZFCFse2MhOkMsdNj1WJ4Xbb3Zfqkz3aqW4q_r5c40CGPMBs7x9RZJX09YDONV3RFDA6tkbklYt0LeaLAtrwZa_cZjT-TxClYPpZCoOTN7FfBpp1zc_JjfZ6VvU0o8OXluGR53HvRETh"/>
                        </div>
                    </div>
                    {/* Body 3 */}
                    <div className="text-zinc-700 text-sm md:text-base leading-[1.9] font-body space-y-8 mb-12">
                        <p>{article.texto3}</p>
                    </div>
                    
                    {/* Article Footer */}
                    <footer className="pt-8 hairline-t flex justify-between items-center mb-16">
                        <div className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-400">{article.data}</div>
                        <div className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors">
                            <span className="text-[10px] font-label font-bold uppercase tracking-widest">Share</span>
                            <span className="material-symbols-outlined">share</span>
                        </div>
                    </footer>
                    
                    {/* Return Link */}
                    <div className="mb-20">
                        <Link className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 flex items-center gap-2 hover:opacity-70 transition-opacity" href="/blog">
                            ← Voltar ao Blog
                        </Link>
                    </div>
                    
                    {/* Author Section */}
                    <div className="flex items-center gap-8 p-8 hairline-t border-b-[0.5px] border-zinc-100 mb-20">
                        <img alt="Angelo Mazzutti portrait" className="w-20 h-20 rounded-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK7FElomFMu_PQnqn3Dtn1hw9i1HelZztYId9nJ0jl9oD3BS2Nc5qNeujWoaoGb40EWAGHvRkSLB8UBbwj_6tbwMc04ThR9KgPtPRLlgSoiqjHmOIyKN10fcDU0hbNoQxS2msj9ycmpExTz0Jxm2HVW3xIQIcfJcSvJav81BVRXK9XW-NIZ6GZIBReRxnC7MnLHlWYBV6nd-rnDjnAGXEujcxSIdc59YjR27mdvOWDesDah9yDYzzpkqaBPaBOdEJYn8phdOzVibs9"/>
                        <div>
                            <div className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-400 mb-1">AUTOR</div>
                            <div className="text-[18px] font-headline italic text-zinc-900 mb-2">Angelo Mazzutti</div>
                            <p className="text-[14px] text-zinc-500 font-body leading-[1.7] max-w-md">Diretor criativo e fundador da House Mazzutti, dedicado à curadoria de imagem editorial e ao desenvolvimento de identidades visuais de alto impacto.</p>
                        </div>
                    </div>
                    
                    {/* Comments Section */}
                    <section className="mb-20">
                        <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-12">SEM COMENTÁRIOS</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input className="w-full border-0 border-b-[0.5px] border-zinc-200 py-4 focus:ring-0 focus:border-zinc-900 bg-transparent placeholder:uppercase placeholder:text-[10px] placeholder:font-label placeholder:tracking-widest" placeholder="Nome" type="text" />
                                </div>
                                <div className="relative">
                                    <input className="w-full border-0 border-b-[0.5px] border-zinc-200 py-4 focus:ring-0 focus:border-zinc-900 bg-transparent placeholder:uppercase placeholder:text-[10px] placeholder:font-label placeholder:tracking-widest" placeholder="Email" type="email" />
                                </div>
                            </div>
                            <textarea className="w-full border-0 border-b-[0.5px] border-zinc-200 py-4 focus:ring-0 focus:border-zinc-900 bg-transparent placeholder:uppercase placeholder:text-[10px] placeholder:font-label placeholder:tracking-widest resize-none" placeholder="Mensagem" rows="4"></textarea>
                            <button className="bg-zinc-950 text-white px-12 py-4 text-[10px] font-label font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors" type="button">ENVIAR</button>
                        </form>
                    </section>
                </article>

                {/* Sidebar (Sticky) */}
                <aside className="hidden lg:flex flex-col w-80 sticky" style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
                    {/* About Sidebar */}
                    <div className="mb-12 pb-10 hairline-b">
                        <img alt="Angelo Mazzutti" className="w-[100px] h-[100px] rounded-full object-cover grayscale mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdQRMa_7XqDCP1ZKTnhPTPm-3OOSyYV-qNgqf0TlX10XGbSFTUqm3jyFW-NIa6jerfgmLhIYr7MBJRV2OUHGx-U_xS6lJW11xEieP7lRAqpNfLkIn5JHOFg8zW69qCY0jq9B8tBMEa0h6DrqfmrEZIVy-AzaWvOjgXIbJ6Ja1m4X8kjJmKX1rbJrI0AAMC2NlANqSU-8Ss4nV0AsqteZvU2jc5nKfRFp_pG6QtFgqR5QzWFWjvtH5eCOCKHCV3J394LOZJqCrOX_CQ"/>
                        <h4 className="text-[20px] font-headline italic text-zinc-900 mb-4">Angelo Mazzutti</h4>
                        <p className="text-[14px] text-zinc-500 font-body leading-relaxed">Direção de imagem, arquitetura e narrativa visual. Explorando as fronteiras entre o espaço construído e a estética capturada.</p>
                        <button className="mt-6 text-[12px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 border-b-[0.5px] border-zinc-900 pb-1">ABOUT ME</button>
                    </div>
                    {/* Recent Posts */}
                    <div className="mb-12">
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-8 pt-8 hairline-t">RECENT POSTS</h4>
                        <div className="space-y-8 pb-8 hairline-b">
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="w-[70px] h-[70px] bg-zinc-100 flex-shrink-0 overflow-hidden">
                                    <img alt="Book thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDX6wTdzUl2QNWTtZBSxAeDh0J93DjPiGic0mgTBYHGc-EvviUC1elJVwLEUC0goHvSPesdvQfLm79X_lZ1-xfHqbJC4_qdIGLSHpFRdQyCTRyxAyDGfp_xJUzGfIRIrx8cvPfiexItlI8dQaN2iqc6LFonZg3vrZgEn5gazgtw6lvX6BzZKrPPv_KPwFhTlTYkP64hL8fPYen93C6_HaDp6fYeSO6xrP6mbxnakMPflUR7voxBTPNURTEv1SLt8VTWG7u2oGMH8Hl"/>
                                </div>
                                <div>
                                    <div className="text-[11px] font-label font-bold uppercase text-zinc-400 mb-1">ABRIL 2026</div>
                                    <h5 className="text-[13px] font-body font-medium text-zinc-800 leading-snug group-hover:underline">Book para Modelos: mercado e escolha</h5>
                                </div>
                            </div>
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="w-[70px] h-[70px] bg-zinc-100 flex-shrink-0 overflow-hidden">
                                    <img alt="Brand thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi4nkuGyCWUFwU27V9VeF92Nhs-ApxTMqxBVSLihmgKkSf6Z71yMbRQRLIMPly1dkwFlhJWv0jqnqkfkT5pC9CNSKybsiUGnlsJP93yARZcCKpyZyKl6k9CgDdG1R1jC-EDan90yUjEY0znFkA59wEWctGT5dRwz6aPkwp5B2kteg5Q_pHapbWoHhtBRU-VHo63rrECvUkUWKe9_q9_8oLvnHwrlGyNRNLJjC6ZAv82ADZ8Pyabb2O8ShTrcsZOTTsAPF3Ly3ORPBE"/>
                                </div>
                                <div>
                                    <div className="text-[11px] font-label font-bold uppercase text-zinc-400 mb-1">MARÇO 2026</div>
                                    <h5 className="text-[13px] font-body font-medium text-zinc-800 leading-snug group-hover:underline">Marcas fortes e a narrativa arquitetônica</h5>
                                </div>
                            </div>
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="w-[70px] h-[70px] bg-zinc-100 flex-shrink-0 overflow-hidden">
                                    <img alt="Editorial thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEUsXrbBijGl-UPNBSN2-5NrnxRA5XafwDUkwgUO_dKD0B3MjD0Mic86rhoKn4Nh2mNGRUwB14TIRtOZgwjlFNVHASQRL-Xa05rc9Kvf6kY2-ExPrEDCSK7XPYgdaD9QcrG6VIHD-q8-0zl20kagIUbwxmgUK7z9UdPWOFNBJuS1yD8-MRx-2wBsfccyuxXvlXlK5F4BL8G_G2ulEPWTPiuKiNYqQEwe0spD0nG0AnFWqL-_fzvIqqCY7bgGclccvDNud-QBtfzfCG"/>
                                </div>
                                <div>
                                    <div className="text-[11px] font-label font-bold uppercase text-zinc-400 mb-1">MARÇO 2026</div>
                                    <h5 className="text-[13px] font-body font-medium text-zinc-800 leading-snug group-hover:underline">Produção editorial no Studio Mazzutti</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Categories */}
                    <div className="mb-12">
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-6">CATEGORIES</h4>
                        <ul className="space-y-3">
                            <li className="flex justify-between text-[11px] font-label uppercase tracking-tighter text-zinc-500 hover:text-zinc-900 cursor-pointer"><span>Editorial</span> <span>(12)</span></li>
                            <li className="flex justify-between text-[11px] font-label uppercase tracking-tighter text-zinc-500 hover:text-zinc-900 cursor-pointer"><span>Arquitetura</span> <span>(08)</span></li>
                            <li className="flex justify-between text-[11px] font-label uppercase tracking-tighter text-zinc-500 hover:text-zinc-900 cursor-pointer"><span>Studio</span> <span>(15)</span></li>
                            <li className="flex justify-between text-[11px] font-label uppercase tracking-tighter text-zinc-500 hover:text-zinc-900 cursor-pointer"><span>Lifestyle</span> <span>(04)</span></li>
                        </ul>
                    </div>
                    {/* Follow Us Section */}
                    <div className="mb-12">
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-6">FOLLOW US</h4>
                        <div className="flex gap-4">
                            <a className="text-zinc-400 hover:text-black transition-colors" href="#">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                            </a>
                            <a className="text-zinc-400 hover:text-black transition-colors" href="#">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                            </a>
                        </div>
                    </div>
                    {/* Tags */}
                    <div>
                        <h4 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-zinc-900 mb-6">TAGS</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">FASHION</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">DIRECTION</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">STUDIO</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">EDITORIAL</span>
                            <span className="text-[9px] font-label uppercase tracking-widest px-3 py-1 hairline-all text-zinc-500 hover:bg-zinc-50 cursor-pointer">MODEL</span>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] py-12 px-8">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-xl font-headline italic text-white">HOUSE MAZZUTTI</div>
                    <div className="flex gap-12">
                        <a className="text-[10px] tracking-[0.2em] uppercase font-label text-zinc-400 hover:text-white transition-colors" href="#">INSTAGRAM</a>
                        <a className="text-[10px] tracking-[0.2em] uppercase font-label text-zinc-400 hover:text-white transition-colors" href="#">LINKEDIN</a>
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase font-label text-zinc-500">
                        © 2025 HOUSE MAZZUTTI. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>
        </div>
    );
}
