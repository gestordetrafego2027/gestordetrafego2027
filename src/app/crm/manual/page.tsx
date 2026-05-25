import Link from 'next/link'

export const metadata = {
  title: 'Manual do CRM | House Mazzutti',
  description: 'Manual completo de operação do CRM da House Mazzutti — versão 2.0.',
}

/* ------------------------------------------------------------------
 * Design system do manual
 * ----------------------------------------------------------------- */

function H2({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-8 text-xl font-semibold tracking-tight border-b border-neutral-200 pb-2 mt-10 mb-4"
    >
      <span className="text-neutral-400 font-mono text-sm mr-2">{n}.</span>
      {title}
    </h2>
  )
}

function H3({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <h3 id={id} className="scroll-mt-8 text-base font-semibold tracking-tight mt-6 mb-2">
      <span className="text-neutral-400 font-mono text-xs mr-2">{n}</span>
      {title}
    </h3>
  )
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm">
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
    info:  'border-blue-200 bg-blue-50 text-blue-900',
    warn:  'border-amber-200 bg-amber-50 text-amber-900',
    tip:   'border-emerald-200 bg-emerald-50 text-emerald-900',
    do:    'border-emerald-200 bg-emerald-50 text-emerald-900',
    dont:  'border-rose-200 bg-rose-50 text-rose-900',
  }
  const icons: Record<string, string> = {
    info: 'ℹ️', warn: '⚠️', tip: '💡', do: '✅', dont: '🚫',
  }
  const defaultTitle: Record<string, string> = {
    info: 'Nota', warn: 'Atenção', tip: 'Dica', do: 'Faça', dont: 'Não faça',
  }
  return (
    <div className={`rounded-lg border px-4 py-3 my-3 text-sm ${styles[tone]}`}>
      <div className="font-medium mb-1">{icons[tone]} {title ?? defaultTitle[tone]}</div>
      <div>{children}</div>
    </div>
  )
}

function Path({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[12px] font-mono bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    violet: 'bg-violet-100 text-violet-700',
    blue:   'bg-blue-100 text-blue-700',
    amber:  'bg-amber-100 text-amber-700',
    rose:   'bg-rose-100 text-rose-700',
    emerald:'bg-emerald-100 text-emerald-700',
    neutral:'bg-neutral-100 text-neutral-700',
  }
  return (
    <span className={`rounded px-2 py-0.5 text-[10px] uppercase tracking-wide font-medium mr-2 ${map[color] ?? map.neutral}`}>
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------
 * Sumário
 * ----------------------------------------------------------------- */

const TOC = [
  { id: 'intro',       n: '1',  label: 'O que é o CRM HM' },
  { id: 'login',       n: '2',  label: 'Login, perfis e permissões' },
  { id: 'sidebar',     n: '3',  label: 'Barra lateral — navegação' },
  { id: 'leads',       n: '4',  label: 'Leads — receber e trabalhar' },
  { id: 'proposta',    n: '5',  label: 'Proposta comercial' },
  { id: 'fatura',      n: '6',  label: 'Fatura e pagamento' },
  { id: 'clientes',    n: '7',  label: 'Clientes e LTV' },
  { id: 'kanban',      n: '8',  label: 'Kanban de oportunidades' },
  { id: 'newsletter',  n: '9',  label: 'Newsletter — inscritos e disparos' },
  { id: 'academy',     n: '10', label: 'Academy — pedidos e certificados' },
  { id: 'campanhas',   n: '11', label: 'Campanhas e ROAS' },
  { id: 'automations', n: '12', label: 'Automações' },
  { id: 'anexos',      n: '13', label: 'Anexos' },
  { id: 'tags',        n: '14', label: 'Tags' },
  { id: 'relatorios',  n: '15', label: 'Relatórios e métricas' },
  { id: 'exports',     n: '16', label: 'Exportações CSV' },
  { id: 'busca',       n: '17', label: 'Busca global' },
  { id: 'boas-praticas', n: '18', label: 'Boas práticas' },
  { id: 'faq',         n: '19', label: 'FAQ e solução de problemas' },
  { id: 'glossario',   n: '20', label: 'Glossário' },
  { id: 'cheatsheet',  n: '21', label: 'Cheatsheet — atalhos de URL' },
]

/* ------------------------------------------------------------------
 * Page
 * ----------------------------------------------------------------- */

export default function ManualPage() {
  return (
    <div className="max-w-4xl space-y-2">

      {/* Cabeçalho */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manual do CRM — House Mazzutti</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Versão 2.0 · Atualizado em maio/2026 · Cobre todos os módulos: Leads, Propostas, Faturas,
          Clientes, Newsletter, Academy, Campanhas e Automações.
        </p>
      </header>

      {/* Sumário */}
      <nav className="rounded-xl border border-neutral-200 bg-white p-5 mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Sumário
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6 text-sm">
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

      {/* ==============================================================
          1. O QUE É O CRM
      ============================================================== */}
      <H2 id="intro" n="1" title="O que é o CRM HM" />
      <p className="text-sm leading-relaxed">
        O <strong>CRM da House Mazzutti</strong> é o sistema único que registra <em>tudo</em> que
        envolve clientes do grupo — Studio, Agência, Produtora e Comunidade. Do primeiro formulário
        preenchido no site até a última fatura paga, cada interação fica registrada e rastreável.
      </p>
      <p className="text-sm leading-relaxed mt-2">
        Ele substitui planilhas, grupos de WhatsApp dispersos e anotações soltas. Toda equipe
        trabalha do mesmo lugar e o histórico do cliente fica preservado para sempre.
      </p>

      <H3 id="o-que-vc-faz" n="1.1" title="O que você consegue fazer aqui" />
      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
        <li>Ver todos os leads recebidos pelos formulários do site, em tempo real.</li>
        <li>Atualizar status, anotar observações e registrar cada interação.</li>
        <li>Criar propostas comerciais com catálogo de serviços pré-cadastrado.</li>
        <li>Enviar propostas por <strong>link público</strong> — o cliente aceita com 1 clique.</li>
        <li>Gerar fatura, registrar pagamento e acompanhar LTV de cada cliente.</li>
        <li>Acompanhar pipeline em Kanban arrastável.</li>
        <li>Gerenciar inscritos da newsletter e disparar e-mails de novos artigos.</li>
        <li>Visualizar pedidos e certificados do Academy.</li>
        <li>Configurar automações sem código (regras "quando X, faça Y").</li>
        <li>Exportar tudo em CSV para Excel ou contabilidade.</li>
      </ul>

      <Box tone="tip" title="Princípio número 1">
        <strong>Se aconteceu, registre no CRM.</strong> Ligação, mensagem, reunião, observação
        importante. Em 6 meses ninguém lembra de cor — o CRM lembra.
      </Box>

      {/* ==============================================================
          2. LOGIN
      ============================================================== */}
      <H2 id="login" n="2" title="Login, perfis e permissões" />
      <p className="text-sm leading-relaxed">
        Acesse <Path>/login</Path> com o e-mail cadastrado. Se for a primeira vez ou esqueceu a
        senha, peça ao admin (Angelo) reenviar o convite. Após o login você é redirecionado para{' '}
        <Path>/crm</Path> (Dashboard).
      </p>

      <H3 id="perfis" n="2.1" title="Tipos de perfil" />
      <ul className="space-y-3 text-sm">
        <li>
          <Badge color="violet">admin</Badge>
          Vê todos os dados de todas as unidades. Pode gerenciar automações, tags, usuários e
          módulos de admin. Hoje: <strong>Angelo Mazzutti</strong>.
        </li>
        <li>
          <Badge color="blue">staff</Badge>
          Acesso amplo ao CRM sem as funções administrativas restritas ao admin.
          Exemplo: <strong>Mateus Sacavem</strong>.
        </li>
        <li>
          <Badge color="neutral">unit: studio</Badge>
          Gestor de uma unidade. Vê apenas leads/clientes/propostas/faturas da sua unidade
          (filtrado por <Path>business_unit</Path>).
        </li>
      </ul>
      <Box tone="info">
        Seu perfil aparece como badge no rodapé da barra lateral. Se não há badge, peça ao admin
        para revisar suas permissões.
      </Box>

      {/* ==============================================================
          3. SIDEBAR — NAVEGAÇÃO
      ============================================================== */}
      <H2 id="sidebar" n="3" title="Barra lateral — navegação" />
      <p className="text-sm leading-relaxed">
        O CRM usa uma <strong>barra lateral retrátil</strong> no lado esquerdo da tela. Ela pode ser
        expandida (w-56) ou colapsada para ícones (w-14) clicando no botão <strong>‹</strong>/
        <strong>›</strong> no topo da barra.
      </p>

      <H3 id="grupos-nav" n="3.1" title="Grupos de navegação" />
      <div className="text-sm space-y-3">
        <div className="rounded-lg border border-neutral-100 bg-white p-4">
          <p className="font-semibold text-neutral-700 mb-2 text-xs uppercase tracking-widest">Principal</p>
          <ul className="space-y-1">
            <li><strong>◈ Dashboard</strong> — KPIs, gráficos, atividade recente.</li>
            <li><strong>⟡ Leads</strong> — lista completa com badge âmbar (leads em aberto).</li>
            <li><strong>◎ Clientes</strong> — base de clientes com badge vermelho (faturas vencidas).</li>
            <li><strong>◇ Oportunidades</strong> — Kanban de negociações.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-100 bg-white p-4">
          <p className="font-semibold text-neutral-700 mb-2 text-xs uppercase tracking-widest">Financeiro</p>
          <ul className="space-y-1">
            <li><strong>▤ Propostas</strong> — todas as propostas criadas.</li>
            <li><strong>▦ Faturas</strong> — emitidas, pagas, vencidas.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-100 bg-white p-4">
          <p className="font-semibold text-neutral-700 mb-2 text-xs uppercase tracking-widest">Marketing</p>
          <ul className="space-y-1">
            <li><strong>◉ Campanhas</strong> — atribuição UTM e ROAS.</li>
            <li><strong>✉ Newsletter</strong> — inscritos, histórico de disparos, envio por artigo.</li>
            <li><strong>⟳ Automações</strong> — regras e histórico de execuções.</li>
            <li><strong>▨ Relatórios</strong> — métricas detalhadas.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-100 bg-white p-4">
          <p className="font-semibold text-neutral-700 mb-2 text-xs uppercase tracking-widest">Configuração</p>
          <ul className="space-y-1">
            <li><strong>▣ Catálogo</strong> — serviços e pacotes pré-cadastrados.</li>
            <li><strong>◈ Tags</strong> — rótulos personalizados.</li>
            <li><strong>▥ Manual</strong> — este documento.</li>
            <li><strong>◌ Ajuda</strong> — guia rápido de links.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-100 bg-white p-4">
          <p className="font-semibold text-neutral-700 mb-2 text-xs uppercase tracking-widest">Admin <Badge color="violet">admin only</Badge></p>
          <ul className="space-y-1">
            <li><strong>◑ Academy</strong> — pedidos, certificados, produtos.</li>
            <li><strong>◐ Usuários</strong> — gerenciar perfis e permissões.</li>
            <li><strong>◒ Auditoria</strong> — log de ações críticas do sistema.</li>
          </ul>
        </div>
      </div>

      <H3 id="sinais-sidebar" n="3.2" title="Sinais visuais (badges)" />
      <ul className="text-sm space-y-1.5">
        <li>
          <span className="inline-block w-3 h-3 rounded-full bg-amber-400 align-middle mr-2" />
          <strong>Âmbar em Leads</strong> — leads em status <em>novo</em> ou <em>em_contato</em>. Precisa qualificar.
        </li>
        <li>
          <span className="inline-block w-3 h-3 rounded-full bg-rose-500 align-middle mr-2" />
          <strong>Vermelho em Clientes</strong> — faturas vencidas sem pagamento. Precisa cobrar.
        </li>
      </ul>

      <H3 id="rodape-sidebar" n="3.3" title="Rodapé da sidebar" />
      <p className="text-sm">
        No final da barra lateral: avatar com inicial do e-mail, e-mail do usuário logado, badge de
        perfil (admin/staff/unit), link <Path>← Site</Path> (abre housemazzutti.com) e botão{' '}
        <strong>Sair</strong>.
      </p>

      {/* ==============================================================
          4. LEADS
      ============================================================== */}
      <H2 id="leads" n="4" title="Leads — receber e trabalhar" />

      <H3 id="receber-lead" n="4.1" title="Como chegam os leads" />
      <p className="text-sm">
        Toda vez que alguém preenche um formulário em{' '}
        <Path>housemazzutti.com</Path> (formulários das páginas Studio, Agência, Produtora,
        Comunidade ou qualquer formulário de contato), um lead é criado automaticamente via Edge
        Function <Path>submit_lead</Path>. Acesse em{' '}
        <Link href="/crm/leads" className="text-blue-600 underline">/crm/leads</Link>.
      </p>

      <H3 id="abrir-lead" n="4.2" title="Abrir e ler um lead" />
      <ol className="space-y-3 mt-2">
        <Step n={1}>
          Vá em <Link href="/crm/leads" className="text-blue-600 underline">/crm/leads</Link>.
          Lista mostra os 50 mais recentes com nome, e-mail, status (badge âmbar = novo) e fonte.
        </Step>
        <Step n={2}>Clique no nome do lead para abrir o detalhe.</Step>
        <Step n={3}>
          Leia o <strong>cabeçalho</strong>: nome, e-mail, telefone, cidade, status, segment
          (commercial / talents), lead_type e fonte de origem.
        </Step>
        <Step n={4}>
          Sidebar direita: <strong>Observações</strong>, <strong>Serviços de interesse</strong>
          (respostas do formulário em JSON), <strong>Anexos</strong>, <strong>Propostas</strong>
          e <strong>Oportunidades</strong> vinculadas.
        </Step>
        <Step n={5}>
          Bloco principal: <strong>Timeline</strong> — histórico de todas as interações em ordem
          cronológica (ligações, mensagens, mudanças de status, propostas enviadas).
        </Step>
      </ol>

      <H3 id="status-lead" n="4.3" title="Status do lead (funil)" />
      <div className="grid grid-cols-2 gap-1 text-sm mt-2">
        {[
          ['novo', 'Acabou de chegar'],
          ['em_contato', 'Já conversou'],
          ['qualificado', 'Tem fit + budget'],
          ['proposta_enviada', 'Recebeu proposta'],
          ['negociacao', 'Discutindo termos'],
          ['ganho', 'Comprou 🎉'],
          ['perdido', 'Não vai fechar'],
          ['arquivado', 'Sumiu / abandonar'],
        ].map(([s, d]) => (
          <div key={s} className="border border-neutral-100 rounded p-2">
            <code className="text-[11px] bg-neutral-100 px-1 rounded">{s}</code>
            <span className="text-neutral-500 text-xs ml-2">{d}</span>
          </div>
        ))}
      </div>
      <p className="text-sm mt-2">
        Troque o status pelo dropdown no cabeçalho do detalhe + botão <strong>Atualizar</strong>.
        Toda mudança gera entrada automática na timeline.
      </p>

      <H3 id="atividades" n="4.4" title="Registrar atividade" />
      <p className="text-sm">
        Abaixo da timeline há um formulário rápido: escolha o tipo (📞 call, ✉️ email, 💬 whatsapp,
        🤝 meeting, ✅ task, 📝 note), título curto e detalhes opcionais.
      </p>
      <Box tone="do" title="Bom registro">
        <span className="font-mono text-xs">📞 call · "Liguei, Maria vai pedir orçamento na próxima semana"</span>
      </Box>
      <Box tone="dont" title="Registro ruim">
        <span className="font-mono text-xs">📞 call · "liguei"</span>
      </Box>

      <H3 id="lead-manual" n="4.5" title="Cadastrar lead manualmente" />
      <p className="text-sm">
        Para contatos vindos por WhatsApp, DM ou indicação, vá em{' '}
        <Link href="/crm/leads/new" className="text-blue-600 underline">/crm/leads/new</Link>{' '}
        e preencha: nome, segment, lead_type e source (origem — "whatsapp", "indicação X").
      </p>

      <H3 id="promover" n="4.6" title="Promover lead a cliente" />
      <p className="text-sm">
        No cabeçalho do lead aparece o botão <strong>→ Promover a Cliente</strong>. Use quando o
        cliente fechou mas você ainda não gerou fatura via proposta. Se usar o fluxo proposta →
        aceite → fatura, a promoção é automática.
      </p>

      {/* ==============================================================
          5. PROPOSTA
      ============================================================== */}
      <H2 id="proposta" n="5" title="Proposta comercial" />

      <H3 id="criar-proposta" n="5.1" title="Criar proposta" />
      <p className="text-sm">
        Dentro do detalhe do lead, clique <strong>+ Nova proposta</strong>.
      </p>
      <ol className="space-y-2 mt-2">
        <Step n={1}><strong>Título</strong> — já vem como "Proposta — Nome do Cliente". Edite se precisar.</Step>
        <Step n={2}><strong>Válida até</strong> — data limite de aceite. Padrão: 30 dias.</Step>
        <Step n={3}><strong>Desconto (R$)</strong> — em reais. Zero se não houver.</Step>
        <Step n={4}><strong>Pacotes do catálogo</strong> — marque os itens desejados pelo cliente.</Step>
        <Step n={5}><strong>Add-ons globais</strong> — extras aplicáveis a qualquer unidade.</Step>
        <Step n={6}><strong>Observações internas</strong> — só equipe vê. Escopo, condições especiais.</Step>
        <Step n={7}>Clique <strong>Criar proposta</strong>. Voltará ao lead com a proposta listada e atividade <em>quote_sent</em> na timeline.</Step>
      </ol>
      <Box tone="warn">Selecione ao menos um pacote ou add-on — o sistema rejeita propostas vazias.</Box>

      <H3 id="enviar-proposta" n="5.2" title="Enviar a proposta" />
      <ul className="text-sm space-y-2">
        <li>🔗 <strong>Copiar link público</strong> — URL <Path>https://housemazzutti.com/p/&lt;token&gt;</Path>. Cole no WhatsApp.</li>
        <li>🖨️ <strong>Imprimir / Salvar PDF</strong> — abre versão A4 limpa. Cmd+P → "Salvar como PDF".</li>
        <li><strong>Marcar como enviada</strong> — registra horário do envio.</li>
        <li>✓ <strong>Marcar como aceita</strong> — força aceite manual (quando cliente confirmou por telefone).</li>
        <li>✗ <strong>Recusada</strong> — fecha sem virar fatura.</li>
      </ul>

      <H3 id="lado-cliente" n="5.3" title="O que o cliente vê no link público" />
      <p className="text-sm">
        Ao abrir <Path>/p/&lt;token&gt;</Path>: nome e e-mail como "Para", itens com preços,
        subtotal, desconto, <strong>total em destaque</strong> e botão <strong>✓ Aceitar e iniciar</strong>.
      </p>
      <Box tone="tip">
        Quando o cliente clica em Aceitar: proposta marcada como <em>aceito</em>, oportunidade
        marcada como <em>ganho</em>, atividade registrada na timeline e badge de atividade atualizado.
      </Box>

      {/* ==============================================================
          6. FATURA E PAGAMENTO
      ============================================================== */}
      <H2 id="fatura" n="6" title="Fatura e pagamento" />

      <H3 id="gerar-fatura" n="6.1" title="Gerar fatura após aceite" />
      <ol className="space-y-2 mt-2">
        <Step n={1}>Com proposta no status <em>aceito</em>, abra-a em <Path>/crm/quotes/[id]</Path>.</Step>
        <Step n={2}>Preencha o campo <strong>Vencimento</strong> e clique <strong>Gerar fatura</strong>.</Step>
        <Step n={3}>
          O sistema automaticamente: promove lead a cliente, cria a fatura com os itens da proposta
          e registra atividade "Fatura emitida" na timeline.
        </Step>
        <Step n={4}>Você é redirecionado para <Path>/crm/clients/[id]</Path> — fatura com status <em>emitida</em>.</Step>
      </ol>

      <H3 id="registrar-pagamento" n="6.2" title="Registrar pagamento" />
      <ol className="space-y-2 mt-2">
        <Step n={1}>Vá em <Path>/crm/clients/[id]</Path>.</Step>
        <Step n={2}>Na seção <strong>Pagamentos recentes</strong>: escolha a fatura, método (PIX/boleto/cartão/TED), valor, referência e data.</Step>
        <Step n={3}>
          Clique <strong>Registrar pagamento</strong>. O sistema: atualiza <Path>paid_brl</Path> da
          fatura, marca como <em>paga</em> (ou <em>parcial</em> se incompleto) e soma ao LTV do
          cliente.
        </Step>
      </ol>
      <Box tone="warn">Registre o valor exato recebido. Ajuste a fatura antes se houver desconto adicional.</Box>

      <H3 id="vencidas" n="6.3" title="Faturas vencidas" />
      <p className="text-sm">
        Toda noite às 3h o sistema marca como <em>vencida</em> qualquer fatura com{' '}
        <Path>due_date &lt; hoje</Path> que ainda não foi paga. Badge vermelho em
        <strong> Clientes</strong> na sidebar indica quantas existem.
      </p>

      {/* ==============================================================
          7. CLIENTES
      ============================================================== */}
      <H2 id="clientes" n="7" title="Clientes e LTV" />
      <p className="text-sm">
        Um cliente é qualquer lead que já teve fatura emitida (ou foi promovido manualmente). Em{' '}
        <Link href="/crm/clients" className="text-blue-600 underline">/crm/clients</Link> você vê
        a lista com LTV e última compra.
      </p>
      <p className="text-sm mt-2">
        No detalhe (<Path>/crm/clients/[id]</Path>) há 4 KPIs no topo:
        <strong> LTV</strong>, <strong>Total faturado</strong>, <strong>Recebido</strong> e{' '}
        <strong>Em aberto</strong>. Abaixo: histórico de faturas, pagamentos, propostas, oportunidades
        e anexos.
      </p>

      {/* ==============================================================
          8. KANBAN
      ============================================================== */}
      <H2 id="kanban" n="8" title="Kanban de oportunidades" />
      <p className="text-sm">
        Em <Link href="/crm/opportunities" className="text-blue-600 underline">/crm/opportunities</Link>:{' '}
        quadro com 6 colunas — Descoberta, Qualificação, Proposta, Negociação, Ganho 🎉, Perdido.
        Arraste os cards entre colunas para mudar o estágio. Jogar em "Ganho" fecha a oportunidade
        automaticamente com <Path>closed_at</Path> = agora e probabilidade 100%.
      </p>
      <Box tone="tip">
        Indicador no topo: <strong>Em aberto</strong> (soma total) e <strong>Ponderado</strong>
        (valor × probabilidade) — o forecast realista do mês.
      </Box>

      {/* ==============================================================
          9. NEWSLETTER
      ============================================================== */}
      <H2 id="newsletter" n="9" title="Newsletter — inscritos e disparos" />
      <p className="text-sm">
        Gerencie os inscritos da <strong>Carta House Mazzutti</strong> e dispare e-mails de novos
        artigos em <Link href="/crm/newsletter" className="text-blue-600 underline">/crm/newsletter</Link>.
      </p>

      <H3 id="como-chegam-inscritos" n="9.1" title="Como chegam os inscritos" />
      <p className="text-sm">
        Qualquer visitante que preenche o formulário "Carta House Mazzutti" no blog
        (<Path>/pt/blog</Path>) é salvo na tabela <Path>newsletter_subscribers</Path> com e-mail,
        nome (opcional), origem e UTMs. Cada inscrito recebe um token único de descadastro.
      </p>

      <H3 id="disparar-newsletter" n="9.2" title="Disparar e-mail de novo artigo" />
      <ol className="space-y-2 mt-2">
        <Step n={1}>
          Acesse <Link href="/crm/newsletter" className="text-blue-600 underline">/crm/newsletter</Link>.
        </Step>
        <Step n={2}>
          No painel <strong>Disparar nova carta</strong>: selecione o artigo no dropdown.
        </Step>
        <Step n={3}>
          Escreva um <strong>trecho de abertura</strong> no campo de texto — aparece no corpo do
          e-mail antes do CTA "Ler artigo completo". Use o primeiro parágrafo do artigo ou uma
          chamada exclusiva para inscritos.
        </Step>
        <Step n={4}>
          Clique <strong>Enviar para X inscritos</strong>. O sistema dispara via Resend em lotes
          de 50, salva o registro em <Path>newsletter_sends</Path> e mostra quantos e-mails foram
          entregues.
        </Step>
      </ol>
      <Box tone="info">
        O e-mail sai com remetente <Path>carta@housemazzutti.com</Path>, template com identidade
        visual da House Mazzutti e link de descadastro individual no rodapé.
      </Box>
      <Box tone="warn">
        Dispare apenas quando o artigo já estiver publicado e acessível no site. O link no e-mail
        aponta para <Path>housemazzutti.com/pt/blog/[slug]</Path>.
      </Box>

      <H3 id="gerenciar-inscritos" n="9.3" title="Gerenciar inscritos" />
      <p className="text-sm">
        A tabela de inscritos mostra e-mail, nome, origem, data de inscrição e status
        (Ativo / Inativo). Clique no status de um inscrito para alternar manualmente. Use o campo
        de busca e os filtros Todos / Ativos / Inativos para navegar.
      </p>
      <Box tone="tip">
        Inscritos que clicam em "Cancelar inscrição" no e-mail são marcados automaticamente como
        inativos — nunca removidos. Histórico sempre preservado.
      </Box>

      {/* ==============================================================
          10. ACADEMY
      ============================================================== */}
      <H2 id="academy" n="10" title="Academy — pedidos e certificados" />
      <p className="text-sm">
        Módulo restrito a <Badge color="violet">admin</Badge>. Acesse em{' '}
        <Link href="/crm/academy" className="text-blue-600 underline">/crm/academy</Link>.
      </p>

      <H3 id="pedidos-academy" n="10.1" title="Pedidos (orders)" />
      <p className="text-sm">
        Lista todos os pedidos de cursos com: número do pedido, comprador, produto, valor, status
        de pagamento (Mercado Pago) e data. Filtrável por status e com busca por e-mail.
      </p>

      <H3 id="certificados-academy" n="10.2" title="Certificados" />
      <p className="text-sm">
        Alunos que concluem um curso recebem certificado gerado automaticamente, acessível em{' '}
        <Path>/academy/certificado/[code]</Path>. O CRM exibe o código, aluno, curso, data de
        emissão e link de verificação.
      </p>

      <H3 id="produtos-academy" n="10.3" title="Produtos / Cursos" />
      <p className="text-sm">
        Gerencie o catálogo de cursos em <Path>/crm/academy/products</Path>: criar produto, definir
        preço, slug e módulos. Alterações refletem imediatamente na vitrine do Academy.
      </p>

      {/* ==============================================================
          11. CAMPANHAS E ROAS
      ============================================================== */}
      <H2 id="campanhas" n="11" title="Campanhas e ROAS" />
      <p className="text-sm">
        Em <Link href="/crm/campaigns" className="text-blue-600 underline">/crm/campaigns</Link>:
        leads atribuídos por UTM, gasto declarado, receita atribuída e ROAS
        (receita ÷ gasto). Use para decidir onde alocar mais investimento de mídia.
      </p>
      <Box tone="tip">
        ROAS &lt; 1 = prejuízo. ROAS 3+ = boa campanha. ROAS 5+ = excelente, escale o budget.
      </Box>

      {/* ==============================================================
          12. AUTOMAÇÕES
      ============================================================== */}
      <H2 id="automations" n="12" title="Automações" />
      <p className="text-sm">
        Regras que rodam automaticamente. Em{' '}
        <Link href="/crm/automations" className="text-blue-600 underline">/crm/automations</Link>:
        todas as regras ativas e histórico das últimas 20 execuções.
      </p>

      <H3 id="regras-padrao" n="12.1" title="Regras pré-configuradas" />
      <ul className="text-sm space-y-1 ml-2">
        <li>• <strong>Boas-vindas</strong> — lead criado → atividade "Lead recebido (auto)".</li>
        <li>• <strong>Onboarding</strong> — proposta aceita → opp marcada como ganho + atividade.</li>
        <li>• <strong>Cobrança</strong> — fatura vence → marcada como vencida (cron diário).</li>
        <li>• <strong>Reengajamento</strong> — lead sem atividade há 14 dias → task de follow-up.</li>
      </ul>

      <H3 id="criar-regra" n="12.2" title="Criar nova regra" />
      <ol className="space-y-2 mt-2">
        <Step n={1}>Clique <strong>+ Nova regra</strong>.</Step>
        <Step n={2}>Dê um <strong>nome</strong> descritivo.</Step>
        <Step n={3}><strong>Gatilho</strong> — 7 opções: lead criado, status mudou, proposta aceita, fatura vencida, lead inativo, cron customizado.</Step>
        <Step n={4}><strong>Condições (JSON)</strong> — filtro. Ex: <Path>{`{"status_in":["qualificado"]}`}</Path>.</Step>
        <Step n={5}><strong>Ações (JSON)</strong> — use os templates de botão: create_activity, send_email, update_opportunity_ganho, follow_up.</Step>
        <Step n={6}>Marque <strong>Ativa</strong> e salve.</Step>
      </ol>
      <Box tone="warn">Automações são território de admin. JSON errado pode parar regras críticas. Em dúvida, consulte Angelo.</Box>

      {/* ==============================================================
          13. ANEXOS
      ============================================================== */}
      <H2 id="anexos" n="13" title="Anexos" />
      <p className="text-sm">
        No detalhe do lead e do cliente há o bloco <strong>Anexos</strong>:
      </p>
      <ol className="space-y-2 mt-2">
        <Step n={1}>Clique <strong>Escolher arquivo</strong> (PDF, imagem, doc — até 10 MB).</Step>
        <Step n={2}>Tipo: Contrato, Briefing, Logo, Referência, NF/Fatura, Outro.</Step>
        <Step n={3}>Descrição opcional. Clique <strong>+ Adicionar anexo</strong>.</Step>
        <Step n={4}>Arquivo no bucket privado <Path>crm-assets</Path>. Para baixar: clique no nome → link assinado por 5 minutos.</Step>
      </ol>
      <Box tone="warn">Nenhum anexo é público. Apenas staff logado tem acesso.</Box>

      {/* ==============================================================
          14. TAGS
      ============================================================== */}
      <H2 id="tags" n="14" title="Tags" />
      <p className="text-sm">
        Em <Link href="/crm/tags" className="text-blue-600 underline">/crm/tags</Link>: crie rótulos
        para categorizar leads e clientes além do status oficial. Exemplos:
      </p>
      <ul className="list-disc list-inside text-sm ml-2">
        <li><strong>VIP</strong> — cliente prioritário</li>
        <li><strong>frio</strong> — não responde há muito tempo</li>
        <li><strong>indicação</strong> — veio por recomendação</li>
        <li><strong>parceiro-comercial</strong> — agência que envia volume</li>
      </ul>

      {/* ==============================================================
          15. RELATÓRIOS
      ============================================================== */}
      <H2 id="relatorios" n="15" title="Relatórios e métricas" />

      <H3 id="dashboard-kpis" n="15.1" title="Dashboard — 6 KPIs" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mt-2">
        {['Leads totais', 'Commercial (B2B)', 'Talents (modelos)', 'Clientes', 'Oportunidades abertas', 'Pipeline ponderado (R$)'].map(k => (
          <div key={k} className="border border-neutral-200 rounded p-2 font-medium">{k}</div>
        ))}
      </div>

      <H3 id="graficos" n="15.2" title="3 gráficos no dashboard" />
      <ul className="text-sm space-y-1.5 mt-2">
        <li><strong>Leads por status (barras)</strong> — onde estão acumulando no funil.</li>
        <li><strong>Funil de oportunidades</strong> — quantidade + valor por estágio.</li>
        <li><strong>Receita mensal (linha, 6 meses)</strong> — soma de pagamentos por mês.</li>
      </ul>

      <H3 id="ltv-cliente" n="15.3" title="LTV por cliente" />
      <p className="text-sm">
        Em <Path>/crm/clients/[id]</Path>: 4 KPIs — LTV, total faturado, total recebido, em aberto.
        Mostra a saúde financeira da relação com o cliente.
      </p>

      {/* ==============================================================
          16. EXPORTS
      ============================================================== */}
      <H2 id="exports" n="16" title="Exportações CSV" />
      <p className="text-sm">Cada lista tem botão <strong>↓ CSV</strong>. Atalhos diretos:</p>
      <ul className="space-y-1 text-sm mt-2">
        {[
          ['leads', 'Leads'],
          ['clients', 'Clientes'],
          ['payments', 'Pagamentos'],
          ['quotes', 'Propostas'],
          ['invoices', 'Faturas'],
        ].map(([entity, label]) => (
          <li key={entity}>
            •{' '}
            <a href={`/crm/api/export?entity=${entity}`} className="text-blue-600 underline">
              Exportar {label}
            </a>
          </li>
        ))}
      </ul>
      <Box tone="tip">Limite de 10.000 linhas por exportação. Para contabilidade, exporte Pagamentos no fim do mês.</Box>

      {/* ==============================================================
          17. BUSCA
      ============================================================== */}
      <H2 id="busca" n="17" title="Busca global" />
      <p className="text-sm">
        Campo de busca em <Link href="/crm/search" className="text-blue-600 underline">/crm/search</Link>.
        Busca simultânea em: <strong>Leads</strong> (nome, e-mail, telefone),{' '}
        <strong>Clientes</strong> (nome, razão social, e-mail, documento) e{' '}
        <strong>Propostas</strong> (título). Resultados agrupados com link direto para o detalhe.
        Limite de 20 por categoria.
      </p>

      {/* ==============================================================
          18. BOAS PRÁTICAS
      ============================================================== */}
      <H2 id="boas-praticas" n="18" title="Boas práticas" />
      <Box tone="do" title="Faça">
        <ul className="list-disc list-inside space-y-1">
          <li>Registre toda interação imediatamente após ela acontecer.</li>
          <li>Mantenha o status como verdade — atualize conforme o lead progride.</li>
          <li>Anexe contratos e briefings no início de cada projeto.</li>
          <li>Envie sempre a proposta pelo link público — permite aceite com 1 clique.</li>
          <li>Use observações para contexto permanente, atividades para eventos pontuais.</li>
          <li>Ao final do dia, zere a fila de leads com status <em>novo</em>.</li>
          <li>Dispare newsletter apenas quando o artigo já estiver publicado.</li>
          <li>Antes de criar lead novo, busque para evitar duplicatas.</li>
        </ul>
      </Box>
      <Box tone="dont" title="Não faça">
        <ul className="list-disc list-inside space-y-1">
          <li>Não duplique cadastros — busque antes de criar.</li>
          <li>Não registre pagamento maior para "cobrir" desconto — ajuste a fatura antes.</li>
          <li>Não envie PDF antigo por WhatsApp — use sempre o link público.</li>
          <li>Não delete leads — use status <em>arquivado</em> ou <em>perdido</em>.</li>
          <li>Não mexa em automações sem entender o JSON — chame o admin.</li>
          <li>Não dispare a newsletter para artigos ainda não publicados.</li>
        </ul>
      </Box>

      {/* ==============================================================
          19. FAQ
      ============================================================== */}
      <H2 id="faq" n="19" title="FAQ e solução de problemas" />
      <div className="space-y-4 text-sm">
        {[
          {
            q: 'Lead preencheu o form mas não aparece em /crm/leads.',
            a: 'Atualize a página (F5). Se após 1 minuto ainda não aparecer, pode ser bloqueio de RLS — o usuário não tem o role correto. Chame o admin.',
          },
          {
            q: 'Botão "Gerar fatura" não aparece na proposta.',
            a: 'Só aparece quando a proposta tem status aceito. Confirme se clicou em "Marcar como aceita" ou se o cliente clicou no link público.',
          },
          {
            q: 'Link público copiou só /p/<token> sem domínio.',
            a: 'A variável NEXT_PUBLIC_SITE_URL não está configurada no servidor. Avise o admin para definir como https://housemazzutti.com.',
          },
          {
            q: 'Como refazer uma proposta?',
            a: 'Crie outra com "+ Nova proposta". Marque a anterior como recusada. Não há limite de propostas por lead.',
          },
          {
            q: 'Errei o valor do pagamento. Como corrijo?',
            a: 'Hoje não há tela de edição. Avise o admin — ajuste direto no banco. Evite registros negativos para estorno.',
          },
          {
            q: 'O e-mail da newsletter não chegou para alguns inscritos.',
            a: 'Verifique o histórico em /crm/newsletter — o campo total_sent mostra quantos foram entregues. Erros de domínio exigem verificação do DNS do Resend.',
          },
          {
            q: 'Como adicionar um novo artigo ao dropdown de disparo de newsletter?',
            a: 'Edite o array ARTICLES no arquivo /src/app/crm/newsletter/page.tsx adicionando o objeto { slug, title } correspondente.',
          },
          {
            q: 'O cliente disse que aceitou a proposta mas não aparece como aceito.',
            a: 'Use "✓ Marcar como aceita" no detalhe da proposta — dispara as mesmas automações do aceite pelo link.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="border-b border-neutral-100 pb-3">
            <p className="font-semibold text-neutral-800">{q}</p>
            <p className="text-neutral-600 mt-1">{a}</p>
          </div>
        ))}
      </div>

      {/* ==============================================================
          20. GLOSSÁRIO
      ============================================================== */}
      <H2 id="glossario" n="20" title="Glossário" />
      <dl className="text-sm space-y-3">
        {[
          ['Lead', 'Contato em qualquer estágio do funil. Nasce no formulário ou no cadastro manual.'],
          ['Cliente', 'Lead que já comprou (fatura emitida ou promoção manual). Tem LTV, faturas, pagamentos.'],
          ['Oportunidade', 'Negociação específica com valor e estágio. Um cliente pode ter várias.'],
          ['Proposta (quote)', 'Documento comercial com itens e preços. Status: rascunho → enviado → aceito/recusado.'],
          ['Fatura (invoice)', 'Cobrança a receber. Status: emitida → parcial → paga, ou vencida.'],
          ['Pagamento (payment)', 'Recebimento vinculado a uma fatura. PIX, boleto, cartão, TED.'],
          ['LTV (Lifetime Value)', 'Soma total pago pelo cliente ao longo do tempo. Métrica-chave da relação.'],
          ['ROAS', 'Receita atribuída ÷ gasto em mídia. 1.0 = empate; acima = lucro; abaixo = prejuízo.'],
          ['Unit (unidade)', 'Studio, Agência, Produtora ou Comunidade. Filtra visibilidade de gestores.'],
          ['Pipeline ponderado', 'Soma de (valor × probabilidade %) de oportunidades abertas. Forecast realista.'],
          ['Inscrito (newsletter)', 'Visitante que se cadastrou na Carta House Mazzutti pelo blog.'],
          ['Disparo', 'Envio em massa do e-mail de um artigo para todos os inscritos ativos.'],
        ].map(([term, def]) => (
          <div key={term as string}>
            <dt className="font-semibold text-neutral-800">{term}</dt>
            <dd className="text-neutral-600 mt-0.5">{def}</dd>
          </div>
        ))}
      </dl>

      {/* ==============================================================
          21. CHEATSHEET
      ============================================================== */}
      <H2 id="cheatsheet" n="21" title="Cheatsheet — atalhos de URL" />
      <p className="text-sm mb-3">Cole no navegador para navegar direto:</p>
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs font-mono space-y-0.5 overflow-x-auto">
        {[
          ['/crm',                           'Dashboard — KPIs e gráficos'],
          ['/crm/leads',                     'Lista de leads'],
          ['/crm/leads/new',                 'Cadastrar lead manual'],
          ['/crm/leads/<id>',                'Detalhe do lead'],
          ['/crm/leads/<id>/edit',           'Editar lead'],
          ['/crm/leads/<id>/quote/new',      'Nova proposta para o lead'],
          ['/crm/leads/kanban',              'Kanban de leads por status'],
          ['/crm/quotes',                    'Lista de propostas'],
          ['/crm/quotes/<id>',               'Detalhe e ações da proposta'],
          ['/crm/quotes/<id>/print',         'PDF da proposta (imprimir)'],
          ['/p/<token>',                     'Link público para o cliente aceitar'],
          ['/crm/clients',                   'Lista de clientes'],
          ['/crm/clients/<id>',              'Detalhe + KPIs + pagamentos'],
          ['/crm/invoices',                  'Faturas emitidas'],
          ['/crm/opportunities',             'Kanban de oportunidades'],
          ['/crm/campaigns',                 'Campanhas e ROAS'],
          ['/crm/newsletter',                'Newsletter — inscritos e disparos'],
          ['/crm/automations',               'Regras de automação'],
          ['/crm/automations/new',           'Nova regra'],
          ['/crm/catalog',                   'Catálogo de serviços'],
          ['/crm/tags',                      'Tags'],
          ['/crm/search?q=...',              'Busca global'],
          ['/crm/api/export?entity=...',     'CSV: leads | clients | quotes | invoices | payments'],
          ['/crm/academy',                   'Academy — pedidos (admin only)'],
          ['/crm/academy/products',          'Catálogo de cursos (admin only)'],
          ['/crm/admin/users',               'Gerenciar usuários (admin only)'],
          ['/crm/admin/auditoria',           'Log de auditoria (admin only)'],
          ['/crm/ajuda',                     'Guia rápido de links'],
          ['/crm/manual',                    'Este manual'],
        ].map(([url, desc]) => (
          <div key={url} className="flex gap-4">
            <span className="text-neutral-700 w-72 shrink-0">{url}</span>
            <span className="text-neutral-400">{desc}</span>
          </div>
        ))}
      </div>

      <footer className="border-t border-neutral-200 pt-6 mt-10 text-xs text-neutral-400">
        Manual versão 2.0 · Atualizado em maio/2026 · House Mazzutti.{' '}
        Dúvidas técnicas: <a href="mailto:angelo@mztgrupo.com" className="underline">angelo@mztgrupo.com</a>
      </footer>
    </div>
  )
}
