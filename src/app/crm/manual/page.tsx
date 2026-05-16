import Link from 'next/link'

export const metadata = {
  title: 'Manual do CRM | House Mazzutti',
  description: 'Manual completo de operação do CRM da House Mazzutti.',
}

/* ----------------------------------------------------------------------
 * Helpers de markup didático
 * -------------------------------------------------------------------- */

function H2({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight border-b border-neutral-200 pb-2 mt-8">
      <span className="text-neutral-400 font-mono text-sm mr-2">{n}.</span>
      {title}
    </h2>
  )
}

function H3({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <h3 id={id} className="scroll-mt-24 text-base font-semibold tracking-tight mt-6 mb-2">
      <span className="text-neutral-400 font-mono text-xs mr-2">{n}</span>
      {title}
    </h3>
  )
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-medium shrink-0 mt-0.5">
        {n}
      </span>
      <div className="flex-1">{children}</div>
    </li>
  )
}

function Box({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn' | 'tip' | 'do' | 'dont'
  title?: string
  children: React.ReactNode
}) {
  const styles: Record<string, string> = {
    info: 'border-blue-200 bg-blue-50 text-blue-900',
    warn: 'border-amber-200 bg-amber-50 text-amber-900',
    tip: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    do: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    dont: 'border-rose-200 bg-rose-50 text-rose-900',
  }
  const icons: Record<string, string> = {
    info: 'ℹ️', warn: '⚠️', tip: '💡', do: '✅', dont: '🚫',
  }
  return (
    <div className={`rounded-lg border px-4 py-3 my-3 text-sm ${styles[tone]}`}>
      <div className="font-medium mb-1">
        {icons[tone]} {title ?? (tone === 'warn' ? 'Atenção' : tone === 'tip' ? 'Dica' : tone === 'do' ? 'Faça' : tone === 'dont' ? 'Não faça' : 'Nota')}
      </div>
      <div>{children}</div>
    </div>
  )
}

function K({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 text-[11px] font-mono leading-none">
      {children}
    </kbd>
  )
}

function Path({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[12px] font-mono bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

/* ----------------------------------------------------------------------
 * Sumário (uma lista, com link âncora pra cada seção)
 * -------------------------------------------------------------------- */

const TOC = [
  { id: 'intro', n: '1', label: 'Bem-vindo ao CRM HM' },
  { id: 'login', n: '2', label: 'Login, perfis e permissões' },
  { id: 'tour', n: '3', label: 'Tour pela interface' },
  { id: 'licao-1', n: '4', label: 'Lição 1 — Receber e abrir um lead' },
  { id: 'licao-2', n: '5', label: 'Lição 2 — Trabalhar um lead (status, atividades, notas)' },
  { id: 'licao-3', n: '6', label: 'Lição 3 — Criar uma proposta' },
  { id: 'licao-4', n: '7', label: 'Lição 4 — Enviar proposta pelo link público' },
  { id: 'licao-5', n: '8', label: 'Lição 5 — Aceite, fatura e onboarding' },
  { id: 'licao-6', n: '9', label: 'Lição 6 — Registrar pagamento e fechar o ciclo' },
  { id: 'licao-7', n: '10', label: 'Lição 7 — Pipeline visual (Kanban)' },
  { id: 'licao-8', n: '11', label: 'Lição 8 — Anexos (contratos, briefings, logos)' },
  { id: 'licao-9', n: '12', label: 'Lição 9 — Automações' },
  { id: 'licao-10', n: '13', label: 'Lição 10 — Tags e organização' },
  { id: 'relatorios', n: '14', label: 'Relatórios e métricas' },
  { id: 'exports', n: '15', label: 'Exportações CSV' },
  { id: 'busca', n: '16', label: 'Busca global' },
  { id: 'sinais', n: '17', label: 'Sinais visuais do nav' },
  { id: 'glossario', n: '18', label: 'Glossário' },
  { id: 'boas-praticas', n: '19', label: 'Boas práticas' },
  { id: 'faq', n: '20', label: 'FAQ e solução de problemas' },
  { id: 'cheatsheet', n: '21', label: 'Cheatsheet — atalhos de URL' },
]

/* ----------------------------------------------------------------------
 * Page
 * -------------------------------------------------------------------- */

export default function ManualPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Manual do CRM House Mazzutti</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Versão 1.0 · Treinamento da equipe comercial, marketing e financeiro.
          Leia na ordem para a primeira vez; use o sumário para consulta rápida depois.
        </p>
      </header>

      {/* Sumário */}
      <nav className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          Sumário
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 text-sm">
          {TOC.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-blue-600 hover:underline">
                <span className="text-neutral-400 font-mono mr-2">{t.n}.</span>
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* =================================================================
          1. INTRO
      ================================================================== */}
      <H2 id="intro" n="1" title="Bem-vindo ao CRM HM" />
      <p>
        O <strong>CRM da House Mazzutti</strong> é o sistema único que registra <em>tudo</em> que
        acontece com clientes do grupo (Studio, Agência, Produtora e Comunidade): desde o momento
        em que alguém preenche um formulário no site, até a última fatura paga.
      </p>
      <p className="mt-2">
        Ele substitui planilhas, grupos de WhatsApp dispersos e anotações soltas. Toda equipe
        trabalha do mesmo lugar e o histórico do cliente fica salvo para sempre.
      </p>
      <Box tone="tip" title="Princípio número 1">
        <strong>Se aconteceu, registre no CRM.</strong> Ligação, mensagem, reunião, observação
        importante. Em 6 meses ninguém lembra de cor; o CRM lembra.
      </Box>

      <H3 id="o-que-vc-faz" n="1.1" title="O que você consegue fazer aqui" />
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Ver todos os leads recebidos pelos formulários do site, em tempo real.</li>
        <li>Atualizar status, anotar observações e registrar cada interação.</li>
        <li>Criar propostas comerciais com catálogo de serviços pré-cadastrado.</li>
        <li>Mandar a proposta pro cliente por um <strong>link público</strong> — ele aceita sozinho.</li>
        <li>Gerar fatura, registrar pagamento, ver o LTV de cada cliente.</li>
        <li>Acompanhar pipeline em um Kanban arrastável.</li>
        <li>Anexar arquivos (contratos, briefings, logos) em cada lead/cliente.</li>
        <li>Configurar automações sem código (regras de “quando X, faça Y”).</li>
        <li>Exportar tudo em CSV para Excel/contabilidade.</li>
      </ul>

      {/* =================================================================
          2. LOGIN
      ================================================================== */}
      <H2 id="login" n="2" title="Login, perfis e permissões" />
      <p>
        Acesse <Path>/login</Path> com o email cadastrado. Se for a primeira vez ou esqueceu a
        senha, peça pro admin (Angelo) reenviar o convite. Depois do login você cai em <Path>/crm</Path>.
      </p>

      <H3 id="perfis" n="2.1" title="Tipos de perfil" />
      <ul className="space-y-2 text-sm">
        <li>
          <span className="rounded bg-violet-100 text-violet-700 text-[10px] px-2 py-0.5 uppercase mr-2">admin</span>
          Vê todos os dados de todas as unidades. Pode editar automações, tags, promover usuários.
          Hoje: Angelo Mazzutti.
        </li>
        <li>
          <span className="rounded bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 uppercase mr-2">unit: studio</span>
          Gestor de uma unidade específica. Vê só leads/clientes/propostas/faturas da sua unidade.
          Exemplo: gestor do Studio vê apenas leads marcados como <em>business_unit = studio</em>.
        </li>
        <li>
          <span className="rounded bg-neutral-100 text-neutral-700 text-[10px] px-2 py-0.5 uppercase mr-2">staff</span>
          Usuário comum (atendente, comercial). Vê os dados que o admin liberou.
        </li>
      </ul>
      <Box tone="info">
        Seu perfil aparece como badge no canto superior direito do nav. Se não tem badge nenhum,
        peça ao admin para revisar suas permissões.
      </Box>

      {/* =================================================================
          3. TOUR
      ================================================================== */}
      <H2 id="tour" n="3" title="Tour pela interface" />
      <p>
        Toda página do CRM compartilha o mesmo cabeçalho. Da esquerda pra direita:
      </p>
      <ul className="list-disc list-inside text-sm space-y-1">
        <li><strong>HM CRM</strong> — logo, volta pro Dashboard.</li>
        <li><strong>Leads, Clientes, Oportunidades, Propostas, Campanhas, Automações, Ajuda, Manual</strong> — atalhos pras seções.</li>
        <li><strong>Campo de busca</strong> (md+) — busca global cross-tabela.</li>
        <li><strong>Badge de perfil</strong> — admin (violeta) ou unit (azul).</li>
        <li><strong>Email do usuário</strong> + botão <strong>Sair</strong>.</li>
      </ul>
      <Box tone="tip">
        Veja os <a href="#sinais" className="underline">sinais visuais do nav</a> (bolinhas
        coloridas indicando alertas).
      </Box>

      {/* =================================================================
          LIÇÃO 1 — RECEBER E ABRIR UM LEAD
      ================================================================== */}
      <H2 id="licao-1" n="4" title="Lição 1 — Receber e abrir um lead" />
      <p>
        Toda vez que alguém preenche um dos formulários do site
        (housemazzutti.com/studio, /agencia, /produtora, /comunidade), um lead é criado
        automaticamente. Você verá em <Link href="/crm/leads" className="text-blue-600 underline">/crm/leads</Link>.
      </p>

      <H3 id="abrir-lead" n="4.1" title="Como abrir e ler um lead" />
      <ol className="space-y-3 text-sm">
        <Step n={1}>
          Vá em <Link href="/crm/leads" className="text-blue-600 underline">/crm/leads</Link>.
          A lista mostra os 50 mais recentes, com nome, email, status (badge âmbar) e fonte.
        </Step>
        <Step n={2}>
          Clique no nome do lead. Você vai pro detalhe — a página mais importante do CRM.
        </Step>
        <Step n={3}>
          Leia o <strong>cabeçalho</strong>: nome, email, telefone, cidade, status, segment
          (commercial/talents), lead_type, fonte (de onde veio).
        </Step>
        <Step n={4}>
          Na sidebar direita você vê <strong>Observações</strong>, <strong>Serviços de interesse</strong>{' '}
          (com as respostas do formulário em JSON colapsável), <strong>Anexos</strong>,{' '}
          <strong>Propostas</strong> e <strong>Oportunidades</strong> vinculadas.
        </Step>
        <Step n={5}>
          O bloco principal é a <strong>Timeline</strong> — histórico cronológico de todas as
          interações (ligações, emails, WhatsApp, mudanças de status, propostas enviadas).
        </Step>
      </ol>

      <Box tone="do">
        Sempre comece o dia abrindo <Path>/crm/leads</Path> e clicando nos leads com status <em>novo</em>
        (badge âmbar no nav indica quantos existem).
      </Box>

      <H3 id="cadastrar-manual" n="4.2" title="Cadastrar lead manualmente" />
      <p>
        Quando o contato chegou por WhatsApp, indicação ou DM no Instagram (fora do formulário):
      </p>
      <ol className="space-y-3 text-sm">
        <Step n={1}>
          Vá em <Link href="/crm/leads/new" className="text-blue-600 underline">/crm/leads/new</Link>.
        </Step>
        <Step n={2}>
          Preencha pelo menos: nome, segment (commercial/talents), lead_type (cliente_studio,
          cliente_agencia, parceiro, etc.) e source (origem — &quot;whatsapp&quot;, &quot;indicação X&quot;).
        </Step>
        <Step n={3}>
          Salvar. O lead já aparece no topo da lista com status <em>novo</em>.
        </Step>
      </ol>

      {/* =================================================================
          LIÇÃO 2 — TRABALHAR UM LEAD
      ================================================================== */}
      <H2 id="licao-2" n="5" title="Lição 2 — Trabalhar um lead" />
      <p>Dentro do detalhe do lead, três ações você vai fazer o tempo todo:</p>

      <H3 id="status" n="5.1" title="Mudar o status (qualificação)" />
      <p>O status sinaliza onde o lead está no funil:</p>
      <ul className="grid grid-cols-2 gap-1 text-sm">
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">novo</code> — acabou de chegar</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">em_contato</code> — já conversou</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">qualificado</code> — tem fit + budget</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">proposta_enviada</code> — recebeu proposta</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">negociacao</code> — discutindo termos</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">ganho</code> — comprou 🎉</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">perdido</code> — não vai fechar</li>
        <li>• <code className="text-xs bg-neutral-100 px-1 rounded">arquivado</code> — sumiu, abandonar</li>
      </ul>
      <p className="text-sm mt-2">
        No cabeçalho do detalhe há um <strong>dropdown</strong> de status + botão{' '}
        <strong>Atualizar</strong>. Toda mudança vira uma entrada na timeline automaticamente.
      </p>

      <H3 id="atividades" n="5.2" title="Registrar uma atividade" />
      <p>
        Logo abaixo da timeline há um formulário rápido: escolha o tipo (📞 call, ✉️ email,
        💬 whatsapp, 🤝 meeting, ✅ task, 📝 note), digite um título curto e detalhes opcionais.
      </p>
      <Box tone="do" title="Bom registro de atividade">
        <p className="font-mono text-xs">
          📞 call · &quot;Liguei, falei com Maria, vai pedir orçamento na próxima semana&quot;
        </p>
      </Box>
      <Box tone="dont" title="Registro ruim">
        <p className="font-mono text-xs">📞 call · &quot;liguei&quot;</p>
      </Box>

      <H3 id="notas" n="5.3" title="Adicionar uma observação (nota interna)" />
      <p>
        Notas ficam na sidebar e servem pra observações que não são uma “interação” em si:
        contexto sobre o cliente, alerta interno, lembrete pra próxima conversa.
      </p>
      <Box tone="tip">
        Pense em atividade como “o que aconteceu” e nota como “o que eu preciso lembrar”.
      </Box>

      <H3 id="promover" n="5.4" title="Promover lead a cliente (manual)" />
      <p>
        No cabeçalho aparece o botão <strong>→ Promover a Cliente</strong> com campo de valor.
        Use quando o cliente já fechou mas você ainda não emitiu fatura. Cria registro em{' '}
        <Path>clients</Path> + oportunidade ganha + atividade.
      </p>
      <Box tone="info">
        Se você for direto pro caminho “proposta aceita → gerar fatura”, a promoção é automática.
        Não precisa fazer manual.
      </Box>

      {/* =================================================================
          LIÇÃO 3 — CRIAR PROPOSTA
      ================================================================== */}
      <H2 id="licao-3" n="6" title="Lição 3 — Criar uma proposta" />
      <p>Dentro do detalhe do lead, clique <strong>+ Nova proposta</strong> (botão azul no cabeçalho).</p>

      <ol className="space-y-3 text-sm">
        <Step n={1}>
          <strong>Título</strong> — já vem preenchido como “Proposta — Nome do Cliente”. Edite se quiser.
        </Step>
        <Step n={2}>
          <strong>Válida até</strong> — data limite pro cliente aceitar. Use 30 dias como padrão.
        </Step>
        <Step n={3}>
          <strong>Desconto (R$)</strong> — em reais, não percentual. Deixe 0 se não houver.
        </Step>
        <Step n={4}>
          <strong>Pacotes do catálogo</strong> — marque os checkboxes dos pacotes/serviços que o cliente quer.
          Os pacotes vêm pré-cadastrados em <Path>service_packages</Path>.
        </Step>
        <Step n={5}>
          <strong>Add-ons globais</strong> — extras vendidos em qualquer unidade (ex: produção de figurino).
        </Step>
        <Step n={6}>
          <strong>Observações internas</strong> — só você vê. Notas sobre escopo, condições.
        </Step>
        <Step n={7}>
          Clique <strong>Criar proposta</strong>. Você é redirecionado de volta ao detalhe do lead,
          com a nova proposta listada na sidebar e uma atividade <em>quote_sent</em> na timeline.
        </Step>
      </ol>

      <Box tone="warn">
        Se você esquecer de marcar nenhum item, o sistema rejeita e mostra erro. Selecione ao
        menos um pacote ou addon.
      </Box>

      {/* =================================================================
          LIÇÃO 4 — ENVIAR PROPOSTA
      ================================================================== */}
      <H2 id="licao-4" n="7" title="Lição 4 — Enviar proposta pelo link público" />
      <p>
        Abra a proposta criada (clique no título dela na sidebar do lead, ou vá em{' '}
        <Link href="/crm/quotes" className="text-blue-600 underline">/crm/quotes</Link>).
      </p>

      <H3 id="acoes-proposta" n="7.1" title="Botões de ação" />
      <ul className="space-y-2 text-sm">
        <li>
          🖨️ <strong>Imprimir / Salvar PDF</strong> — abre versão A4 limpa em nova aba. Cmd+P
          → “Salvar como PDF”. Anexe em email se preferir.
        </li>
        <li>
          🔗 <strong>Copiar link público</strong> — copia URL{' '}
          <Path>https://housemazzutti.com/p/&lt;token&gt;</Path> pra área de transferência.
          Cole no WhatsApp do cliente.
        </li>
        <li>
          <strong>Marcar como enviada</strong> — muda status para <em>enviado</em> e registra o
          horário. Use após enviar o link.
        </li>
        <li>
          ✓ <strong>Marcar como aceita</strong> — força aceite (caso o cliente confirmou por
          telefone e não vai clicar no link).
        </li>
        <li>
          ✗ <strong>Recusada</strong> — fecha a proposta sem virar fatura.
        </li>
        <li>
          <strong>Gerar fatura</strong> — só aparece após aceite. Veja Lição 5.
        </li>
      </ul>

      <H3 id="lado-cliente" n="7.2" title="O que o cliente vê" />
      <p>
        Quando ele abre o link <Path>/p/&lt;token&gt;</Path>:
      </p>
      <ul className="list-disc list-inside text-sm space-y-1">
        <li>Cabeçalho com logo House Mazzutti.</li>
        <li>Nome dele + email/telefone como “Para”.</li>
        <li>Título da proposta + tabela de itens com preços.</li>
        <li>Subtotal, desconto, <strong>total destacado em negrito grande</strong>.</li>
        <li>Observações (se você preencheu).</li>
        <li>Botão verde gigante <strong>✓ Aceitar e iniciar</strong>.</li>
      </ul>
      <Box tone="tip">
        Quando o cliente clica em Aceitar, o sistema:
        <ol className="list-decimal list-inside mt-1">
          <li>Marca proposta como <em>aceito</em>.</li>
          <li>Cria/atualiza oportunidade como <em>ganho</em>.</li>
          <li>Registra atividade “Proposta aceita — iniciar onboarding” no lead.</li>
          <li>Você vê tudo isso no nav (badge verde de atividade 24h).</li>
        </ol>
      </Box>

      {/* =================================================================
          LIÇÃO 5 — ACEITE → FATURA
      ================================================================== */}
      <H2 id="licao-5" n="8" title="Lição 5 — Aceite, fatura e onboarding" />

      <ol className="space-y-3 text-sm">
        <Step n={1}>
          Após o cliente aceitar (ou você marcar como aceita manualmente), volte ao{' '}
          <Path>/crm/quotes/[id]</Path>.
        </Step>
        <Step n={2}>
          Aparece um campo <strong>Vencimento</strong> e botão <strong>Gerar fatura</strong>.
          Escolha a data (ex: 30 dias depois) e clique.
        </Step>
        <Step n={3}>
          O sistema faz <strong>3 coisas automaticamente</strong>:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Promove o lead a <strong>cliente</strong> (se ainda não era).</li>
            <li>Cria a <strong>fatura</strong> copiando os itens da proposta.</li>
            <li>Registra atividade “Fatura emitida” na timeline do lead.</li>
          </ul>
        </Step>
        <Step n={4}>
          Você é redirecionado direto pro <Path>/crm/clients/[id]</Path> — onde a fatura aparece
          com status <em>emitida</em> e LTV ainda em 0 (vai virar &gt; 0 quando pagar).
        </Step>
      </ol>

      {/* =================================================================
          LIÇÃO 6 — PAGAMENTO
      ================================================================== */}
      <H2 id="licao-6" n="9" title="Lição 6 — Registrar pagamento e fechar o ciclo" />

      <ol className="space-y-3 text-sm">
        <Step n={1}>
          Cliente pagou (PIX, boleto, cartão). Vá em <Path>/crm/clients/[id]</Path>.
        </Step>
        <Step n={2}>
          Na seção <strong>Pagamentos recentes</strong>, há um form: escolha a fatura
          (mostra valor pendente), método, valor, referência (ex: ID do PIX), data.
        </Step>
        <Step n={3}>
          Clique <strong>Registrar pagamento</strong>. O sistema:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Cria registro em <Path>payments</Path>.</li>
            <li>Atualiza <Path>paid_brl</Path> da fatura.</li>
            <li>Se total ≥ valor da fatura, marca como <em>paga</em>. Se parcial, marca <em>parcial</em>.</li>
            <li>Soma ao <strong>LTV</strong> do cliente e atualiza <em>last_purchase_at</em>.</li>
          </ul>
        </Step>
      </ol>

      <Box tone="warn">
        Sempre registre o pagamento exato. Se houve desconto adicional, ajuste o valor antes de
        gerar a fatura — não registre menor pra “bater”.
      </Box>

      <H3 id="overdue" n="9.1" title="Faturas vencidas" />
      <p>
        Toda noite às 3h o sistema marca como <em>vencida</em> as faturas com{' '}
        <Path>due_date &lt; hoje</Path> que ainda não foram pagas. Elas aparecem como badge
        vermelho em <strong>Clientes</strong> no nav.
      </p>

      {/* =================================================================
          LIÇÃO 7 — KANBAN
      ================================================================== */}
      <H2 id="licao-7" n="10" title="Lição 7 — Pipeline visual (Kanban)" />
      <p>
        Em <Link href="/crm/opportunities" className="text-blue-600 underline">/crm/opportunities</Link>{' '}
        há um quadro Kanban com 6 colunas:
      </p>
      <ol className="list-decimal list-inside text-sm space-y-0.5 ml-2">
        <li>Descoberta</li>
        <li>Qualificação</li>
        <li>Proposta</li>
        <li>Negociação</li>
        <li>Ganho 🎉</li>
        <li>Perdido</li>
      </ol>
      <p className="text-sm mt-2">
        Cada card mostra título, unit e valor. <strong>Arraste o card entre colunas</strong> para
        mudar o estágio. Quando jogar em “Ganho”, a oportunidade fecha automaticamente com
        <em> closed_at</em> = agora e <em>probability</em> = 100%.
      </p>
      <Box tone="tip">
        No topo da página há indicador de <strong>Em aberto</strong> e <strong>Ponderado</strong>
        (soma valor × probabilidade) — o último é o forecast realista do mês.
      </Box>

      {/* =================================================================
          LIÇÃO 8 — ANEXOS
      ================================================================== */}
      <H2 id="licao-8" n="11" title="Lição 8 — Anexos" />
      <p>
        Tanto no detalhe do lead quanto do cliente há o bloco <strong>Anexos</strong>:
      </p>
      <ol className="space-y-3 text-sm">
        <Step n={1}>
          Clique em <strong>Escolher arquivo</strong>, selecione (PDF, imagem, doc até 10MB).
        </Step>
        <Step n={2}>
          Escolha o tipo: <em>Contrato, Briefing, Logo, Referência, NF/Fatura, Outro</em>.
        </Step>
        <Step n={3}>
          Descrição opcional. Clique <strong>+ Adicionar anexo</strong>.
        </Step>
        <Step n={4}>
          O arquivo é guardado no bucket privado <Path>crm-assets</Path> do Supabase. Para
          baixar depois, clique no nome — gera link assinado válido por 5 minutos.
        </Step>
      </ol>
      <Box tone="warn">
        Nenhum anexo é público. Só staff logado pode ver. Cliente externo nunca tem acesso direto
        ao arquivo.
      </Box>

      {/* =================================================================
          LIÇÃO 9 — AUTOMAÇÕES
      ================================================================== */}
      <H2 id="licao-9" n="12" title="Lição 9 — Automações" />
      <p>
        Automações são <em>regras</em> que rodam sozinhas. Em{' '}
        <Link href="/crm/automations" className="text-blue-600 underline">/crm/automations</Link>{' '}
        você vê todas as regras ativas e o histórico das últimas 20 execuções.
      </p>

      <H3 id="exemplos-auto" n="12.1" title="Exemplos pré-configurados" />
      <ul className="text-sm space-y-1.5">
        <li>• <strong>Boas-vindas</strong> — quando lead é criado, registra atividade “Lead recebido (auto)”.</li>
        <li>• <strong>Onboarding</strong> — quando proposta é aceita, marca opp como ganho + cria atividade.</li>
        <li>• <strong>Cobrança</strong> — quando fatura vence, marca como vencida (cron diário).</li>
        <li>• <strong>Reengajamento</strong> — leads sem atividade há 14 dias ganham task de follow-up.</li>
      </ul>

      <H3 id="criar-auto" n="12.2" title="Criar uma regra nova" />
      <ol className="space-y-3 text-sm">
        <Step n={1}>
          Clique <strong>+ Nova regra</strong>.
        </Step>
        <Step n={2}>
          <strong>Nome</strong> — descritivo, ex: “Avisar comercial em lead VIP”.
        </Step>
        <Step n={3}>
          <strong>Gatilho</strong> — escolha uma das 7 opções (lead criado, status mudou, proposta aceita,
          fatura vencida, lead inativo, cron customizado).
        </Step>
        <Step n={4}>
          <strong>Condições (JSON)</strong> — filtro. Ex:{' '}
          <Path>{`{"status_in": ["qualificado"]}`}</Path>. O hint embaixo do campo mostra exemplo
          contextual por gatilho.
        </Step>
        <Step n={5}>
          <strong>Ações (JSON)</strong> — o que fazer. Botões de template ajudam (create_activity,
          send_email, update_opportunity_ganho, follow_up).
        </Step>
        <Step n={6}>
          Marque <strong>Ativa</strong> e salve. A regra começa a rodar nos próximos eventos.
        </Step>
      </ol>

      <Box tone="warn">
        Mexer em automações é coisa de admin. Errar JSON pode parar uma regra crítica (como
        marcação de fatura vencida). Em dúvida, peça pro Angelo.
      </Box>

      {/* =================================================================
          LIÇÃO 10 — TAGS
      ================================================================== */}
      <H2 id="licao-10" n="13" title="Lição 10 — Tags e organização" />
      <p>
        Em <Link href="/crm/tags" className="text-blue-600 underline">/crm/tags</Link> você cria
        rótulos pra categorizar leads/clients além do status oficial. Exemplos:
      </p>
      <ul className="list-disc list-inside text-sm">
        <li><strong>VIP</strong> — clientes prioritários</li>
        <li><strong>frio</strong> — não responde há muito tempo</li>
        <li><strong>indicação</strong> — chegou por recomendação</li>
        <li><strong>parceiro-comercial</strong> — agência que envia volume</li>
      </ul>

      {/* =================================================================
          RELATÓRIOS
      ================================================================== */}
      <H2 id="relatorios" n="14" title="Relatórios e métricas" />
      <p>O <Link href="/crm" className="text-blue-600 underline">Dashboard</Link> (página inicial) tem 4 áreas:</p>

      <H3 id="kpis" n="14.1" title="6 KPIs no topo" />
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        <li className="border border-neutral-200 rounded p-2"><strong>Leads totais</strong></li>
        <li className="border border-neutral-200 rounded p-2"><strong>Commercial</strong> (B2B)</li>
        <li className="border border-neutral-200 rounded p-2"><strong>Talents</strong> (modelos)</li>
        <li className="border border-neutral-200 rounded p-2"><strong>Clientes</strong></li>
        <li className="border border-neutral-200 rounded p-2"><strong>Oportunidades abertas</strong></li>
        <li className="border border-neutral-200 rounded p-2"><strong>Pipeline ponderado</strong> (em R$)</li>
      </ul>

      <H3 id="graficos" n="14.2" title="3 gráficos" />
      <ul className="text-sm space-y-2">
        <li>
          <strong>Leads por status (barras)</strong> — visualiza onde estão acumulando.
          Muitos em <em>novo</em>? Time precisa qualificar. Muitos em <em>negociação</em>? Hora de fechar.
        </li>
        <li>
          <strong>Funil de oportunidades</strong> — barras horizontais por estágio. Mostra
          quantidade + valor total em cada um.
        </li>
        <li>
          <strong>Receita mensal (linha, 6 meses)</strong> — soma de pagamentos por mês.
          Tendência crescente é o objetivo.
        </li>
      </ul>

      <H3 id="campanhas" n="14.3" title="ROAS por campanha" />
      <p>
        Em <Link href="/crm/campaigns" className="text-blue-600 underline">/crm/campaigns</Link>:
        leads atribuídos por UTM, gasto, receita atribuída e ROAS (return on ad spend). Use para
        decidir onde colocar mais grana.
      </p>
      <Box tone="tip">
        ROAS &lt; 1 = campanha está dando prejuízo. ROAS 3+ = boa. ROAS 5+ = excelente, escale.
      </Box>

      <H3 id="cliente-ltv" n="14.4" title="LTV por cliente" />
      <p>
        No detalhe de cada cliente (<Path>/crm/clients/[id]</Path>):
        4 KPIs no topo — LTV, total faturado, total recebido, em aberto. Mostra a saúde
        financeira da relação.
      </p>

      {/* =================================================================
          EXPORTS
      ================================================================== */}
      <H2 id="exports" n="15" title="Exportações CSV" />
      <p>
        Cada lista tem botão <strong>↓ CSV</strong>. Também há atalhos diretos:
      </p>
      <ul className="space-y-1 text-sm">
        <li>• <a href="/crm/api/export?entity=leads" className="text-blue-600 underline">Exportar Leads</a></li>
        <li>• <a href="/crm/api/export?entity=clients" className="text-blue-600 underline">Exportar Clientes</a></li>
        <li>• <a href="/crm/api/export?entity=payments" className="text-blue-600 underline">Exportar Pagamentos</a></li>
        <li>• <a href="/crm/api/export?entity=quotes" className="text-blue-600 underline">Exportar Propostas</a></li>
        <li>• <a href="/crm/api/export?entity=invoices" className="text-blue-600 underline">Exportar Faturas</a></li>
      </ul>
      <Box tone="tip">
        Limite de 10.000 linhas por export. Pra contabilidade, exporte pagamentos no fim do mês.
      </Box>

      {/* =================================================================
          BUSCA
      ================================================================== */}
      <H2 id="busca" n="16" title="Busca global" />
      <p>
        Campo no topo do nav (telas médias+). Busca em:
      </p>
      <ul className="list-disc list-inside text-sm">
        <li><strong>Leads</strong> por nome, email, telefone</li>
        <li><strong>Clientes</strong> por nome, razão social, email, telefone, documento</li>
        <li><strong>Propostas</strong> por título</li>
      </ul>
      <p className="text-sm mt-2">
        Resultados agrupados, com link direto pro detalhe. Limite 20 por categoria.
      </p>

      {/* =================================================================
          SINAIS DO NAV
      ================================================================== */}
      <H2 id="sinais" n="17" title="Sinais visuais do nav" />
      <ul className="text-sm space-y-1.5">
        <li>
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 align-middle mr-2"></span>
          <strong>Verde no logo HM CRM</strong> — quantidade de atividades nas últimas 24h.
        </li>
        <li>
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 align-middle mr-2"></span>
          <strong>Âmbar em Leads</strong> — leads em status <em>novo</em> ou <em>em_contato</em>.
          Precisa qualificar.
        </li>
        <li>
          <span className="inline-block w-3 h-3 rounded-full bg-rose-500 align-middle mr-2"></span>
          <strong>Vermelho em Clientes</strong> — faturas vencidas. Cobrar.
        </li>
        <li>
          <span className="inline-block rounded bg-violet-100 text-violet-700 text-[10px] px-1.5 py-0.5 uppercase align-middle mr-2">admin</span>
          Você é admin (vê tudo).
        </li>
        <li>
          <span className="inline-block rounded bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 uppercase align-middle mr-2">studio</span>
          Você vê só sua unidade.
        </li>
      </ul>

      {/* =================================================================
          GLOSSÁRIO
      ================================================================== */}
      <H2 id="glossario" n="18" title="Glossário" />
      <dl className="text-sm space-y-3">
        <div>
          <dt className="font-semibold">Lead</dt>
          <dd className="text-neutral-700">
            Contato em qualquer estágio do funil. Nasce no formulário ou no cadastro manual.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Cliente</dt>
          <dd className="text-neutral-700">
            Lead que já comprou (pelo menos uma fatura emitida ou promoção manual).
            Tem LTV, faturas, pagamentos.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Oportunidade</dt>
          <dd className="text-neutral-700">
            Negociação específica, com valor e estágio. Um cliente pode ter várias.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Proposta (quote)</dt>
          <dd className="text-neutral-700">
            Documento comercial com itens e preços. Status: rascunho → enviado → aceito/recusado.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Fatura (invoice)</dt>
          <dd className="text-neutral-700">
            Cobrança a receber. Nasce de uma proposta aceita. Status: emitida → parcial → paga,
            ou vencida.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Pagamento (payment)</dt>
          <dd className="text-neutral-700">
            Recebimento associado a uma fatura. PIX, boleto, cartão, transferência.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">LTV (Lifetime Value)</dt>
          <dd className="text-neutral-700">
            Soma de tudo que o cliente já pagou ao longo do tempo. Métrica-chave da relação.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">ROAS (Return on Ad Spend)</dt>
          <dd className="text-neutral-700">
            Receita atribuída ÷ gasto em mídia. 1.0 = empate; acima = lucro; abaixo = prejuízo.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Unit (unidade)</dt>
          <dd className="text-neutral-700">
            Studio, Agência, Produtora ou Comunidade. Filtra visibilidade de gestores.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Pipeline ponderado</dt>
          <dd className="text-neutral-700">
            Soma de (valor × probabilidade %) de todas as oportunidades abertas. Forecast realista.
          </dd>
        </div>
      </dl>

      {/* =================================================================
          BOAS PRÁTICAS
      ================================================================== */}
      <H2 id="boas-praticas" n="19" title="Boas práticas" />
      <Box tone="do" title="Faça">
        <ul className="list-disc list-inside space-y-1">
          <li>Registre toda interação imediatamente após ela acontecer.</li>
          <li>Use status como verdade — atualize quando o lead progredir.</li>
          <li>Anexe contratos e briefings logo no início do projeto.</li>
          <li>Mande proposta sempre pelo link público — vira aceite + automação.</li>
          <li>Use observações pra contexto, atividades pra eventos.</li>
          <li>No fim do dia, deixe a lista de leads <em>novos</em> em zero.</li>
        </ul>
      </Box>
      <Box tone="dont" title="Não faça">
        <ul className="list-disc list-inside space-y-1">
          <li>Não duplique cadastros — busque antes de criar lead novo.</li>
          <li>Não use status pra coisa que não progrediu (pra isso tem nota).</li>
          <li>Não envie PDF antigo no WhatsApp — sempre use o link público (cliente pode aceitar com 1 clique).</li>
          <li>Não registre pagamento maior pra cobrir desconto — ajuste a fatura antes.</li>
          <li>Não delete leads — use status <em>arquivado</em> ou <em>perdido</em>.</li>
        </ul>
      </Box>

      {/* =================================================================
          FAQ
      ================================================================== */}
      <H2 id="faq" n="20" title="FAQ e solução de problemas" />
      <div className="space-y-4 text-sm">
        <div>
          <p className="font-semibold">O cliente preencheu o form mas não aparece em Leads.</p>
          <p>Atualize a página (F5). Se passou de 1 minuto, abra o console (F12) e veja se há erro
          de rede. Pode ser bloqueio de RLS — chame o admin.</p>
        </div>
        <div>
          <p className="font-semibold">Botão “Gerar fatura” não aparece.</p>
          <p>Só aparece quando a proposta está com status <em>aceito</em>. Verifique se você
          clicou em “Marcar como aceita” ou se o cliente clicou no botão público.</p>
        </div>
        <div>
          <p className="font-semibold">Link público copiou só /p/&lt;token&gt; sem domínio.</p>
          <p>A env var <Path>NEXT_PUBLIC_SITE_URL</Path> não está configurada no servidor de
          produção. Avise o admin pra setar como <Path>https://housemazzutti.com</Path>.</p>
        </div>
        <div>
          <p className="font-semibold">Quero refazer uma proposta — posso?</p>
          <p>Sim. Crie outra com <strong>+ Nova proposta</strong>. A anterior pode ser marcada
          como recusada ou ignorada. Não há limite de propostas por lead.</p>
        </div>
        <div>
          <p className="font-semibold">Errei o pagamento. Como corrijo?</p>
          <p>Hoje não há tela de edição. Avise o admin que ajusta direto no banco. Ou registre
          outro pagamento negativo (com valor negativo) pra estornar — gambiarra, evite.</p>
        </div>
        <div>
          <p className="font-semibold">Quem pode ver o quê?</p>
          <p>Admin vê tudo. Quem tem unit setada vê só dados dessa unit. Veja seu badge no nav.</p>
        </div>
        <div>
          <p className="font-semibold">O cliente disse que aceitou mas não aparece como aceito.</p>
          <p>Pergunte se ele clicou no link. Se sim, peça print. Se ele não vai clicar mesmo, você
          pode usar “✓ Marcar como aceita” no detalhe da proposta — dispara as mesmas automações.</p>
        </div>
      </div>

      {/* =================================================================
          CHEATSHEET
      ================================================================== */}
      <H2 id="cheatsheet" n="21" title="Cheatsheet — atalhos de URL" />
      <p className="text-sm mb-3">Cole no navegador pra ir direto:</p>
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs font-mono space-y-0.5">
        <div>/crm                          → Dashboard</div>
        <div>/crm/leads                    → Lista de leads</div>
        <div>/crm/leads/new                → Cadastrar lead manual</div>
        <div>/crm/leads/&lt;id&gt;               → Detalhe do lead</div>
        <div>/crm/leads/&lt;id&gt;/edit          → Editar lead</div>
        <div>/crm/leads/&lt;id&gt;/quote/new     → Nova proposta</div>
        <div>/crm/quotes                   → Lista de propostas</div>
        <div>/crm/quotes/&lt;id&gt;              → Detalhe / ações</div>
        <div>/crm/quotes/&lt;id&gt;/print        → PDF da proposta</div>
        <div>/p/&lt;token&gt;                   → Link público p/ cliente</div>
        <div>/crm/clients                  → Lista de clientes</div>
        <div>/crm/clients/&lt;id&gt;             → Detalhe + KPIs + pagamentos</div>
        <div>/crm/opportunities            → Kanban</div>
        <div>/crm/campaigns                → ROAS</div>
        <div>/crm/automations              → Regras + execuções</div>
        <div>/crm/automations/new          → Nova regra</div>
        <div>/crm/automations/&lt;id&gt;         → Editar regra</div>
        <div>/crm/tags                     → Tags</div>
        <div>/crm/search?q=...             → Busca global</div>
        <div>/crm/api/export?entity=...    → CSV (leads|clients|quotes|invoices|payments)</div>
        <div>/crm/ajuda                    → Guia rápido (links + descrições curtas)</div>
        <div>/crm/manual                   → Este manual</div>
      </div>

      <footer className="border-t border-neutral-200 pt-6 mt-10 text-xs text-neutral-500">
        Manual versão 1.0 · Atualizado em 2026-05-13 · House Mazzutti.
        Dúvidas técnicas ou sugestões: angelo@mztgrupo.com.
      </footer>
    </div>
  )
}
