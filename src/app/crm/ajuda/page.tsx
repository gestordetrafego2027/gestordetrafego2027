import Link from 'next/link'

export const metadata = { title: 'Guia do CRM | Ajuda' }

type Item = {
  href: string
  label: string
  desc: string
  who?: string  // quem usa / quando
}

type Section = {
  title: string
  emoji: string
  items: Item[]
}

const sections: Section[] = [
  {
    title: 'Visão geral',
    emoji: '🏠',
    items: [
      {
        href: '/crm',
        label: 'Dashboard',
        desc: 'KPIs do mês (leads, clientes, pipeline) + funil de oportunidades + gráfico de receita + top campanhas. Primeira tela ao logar.',
        who: 'Todos. Abre ao logar.',
      },
      {
        href: '/crm/search',
        label: 'Busca global',
        desc: 'Procura leads (nome/email/telefone), clientes (nome/CNPJ/email) e propostas (título). Também acessível pelo campo no topo do nav.',
        who: 'Use sempre que souber o nome/contato e quiser ir direto.',
      },
    ],
  },
  {
    title: 'Funil de vendas',
    emoji: '🎯',
    items: [
      {
        href: '/crm/leads',
        label: 'Lista de Leads',
        desc: 'Todos os contatos recebidos pelos formulários do site. Coluna mostra status (novo, em contato, qualificado, etc) e fonte. Botão "↓ CSV" exporta.',
        who: 'Comercial — primeira parada do dia.',
      },
      {
        href: '/crm/leads/new',
        label: 'Cadastrar lead manualmente',
        desc: 'Quando um contato chega por WhatsApp/indicação fora do site. Preenche nome, contato, segment, tipo.',
        who: 'Comercial.',
      },
      {
        href: '/crm/leads/[id]',
        label: 'Detalhe do Lead',
        desc: 'Timeline completa, observações, propostas, anexos, dados do form, serviços de interesse. Tem botões: mudar status, registrar atividade, +Nova proposta, →Promover a Cliente.',
        who: 'Comercial — onde você passa o dia.',
      },
      {
        href: '/crm/leads/[id]/edit',
        label: 'Editar Lead',
        desc: 'Atualiza campos básicos do lead (nome, contato, segment, fonte, owner).',
        who: 'Comercial.',
      },
      {
        href: '/crm/leads/[id]/quote/new',
        label: 'Nova Proposta',
        desc: 'Cria proposta selecionando pacotes/addons do catálogo. Calcula subtotal/desconto/total automático.',
        who: 'Comercial — após qualificar o lead.',
      },
      {
        href: '/crm/opportunities',
        label: 'Oportunidades (Kanban)',
        desc: 'Quadro de oportunidades com 6 colunas (descoberta → ganho/perdido). Arraste cards entre colunas para mudar estágio — atualiza no DB automaticamente.',
        who: 'Comercial — gestão visual do pipeline.',
      },
    ],
  },
  {
    title: 'Propostas e faturamento',
    emoji: '💰',
    items: [
      {
        href: '/crm/quotes',
        label: 'Lista de Propostas',
        desc: 'Todas as propostas filtráveis por status (rascunho, enviado, aceito, recusado, expirado).',
      },
      {
        href: '/crm/quotes/[id]',
        label: 'Detalhe da Proposta',
        desc: 'Ver itens, totais e ações: 🖨️ Imprimir/PDF · 🔗 Copiar link público · Marcar como enviada · ✓ Marcar como aceita · ✗ Recusada · Gerar Fatura (após aceite). Aceitar dispara automação que marca opp como ganho.',
        who: 'Comercial. Envie o link público pro cliente via WhatsApp.',
      },
      {
        href: '/crm/quotes/[id]/print',
        label: 'Print/PDF da Proposta',
        desc: 'Versão A4 limpa pra impressão. Cmd+P → "Salvar como PDF". Usado pra anexar em e-mail.',
        who: 'Comercial.',
      },
      {
        href: '/p/[token]',
        label: 'Link público (cliente)',
        desc: 'Página pública sem login que o cliente abre direto. Vê a proposta e clica "✓ Aceitar e iniciar". Aceitar dispara o ciclo de onboarding automaticamente.',
        who: 'Cliente — fora da intranet.',
      },
    ],
  },
  {
    title: 'Clientes',
    emoji: '🏢',
    items: [
      {
        href: '/crm/clients',
        label: 'Lista de Clientes',
        desc: 'Leads promovidos a cliente. Mostra LTV (lifetime value), última compra, status. Botão "↓ CSV" exporta.',
      },
      {
        href: '/crm/clients/[id]',
        label: 'Detalhe do Cliente',
        desc: 'KPIs (LTV, faturado, recebido, em aberto) + faturas + pagamentos + oportunidades + anexos. Aqui você registra novo pagamento (atualiza LTV e fatura automaticamente).',
        who: 'Comercial + Financeiro.',
      },
    ],
  },
  {
    title: 'Marketing e atribuição',
    emoji: '📈',
    items: [
      {
        href: '/crm/campaigns',
        label: 'Campanhas',
        desc: 'Performance por campanha (UTM): leads atribuídos, gasto, receita atribuída, ROAS.',
        who: 'Marketing.',
      },
    ],
  },
  {
    title: 'Automações',
    emoji: '🤖',
    items: [
      {
        href: '/crm/automations',
        label: 'Regras de automação',
        desc: 'Lista de regras ativas que disparam ações automáticas (criar atividade, mandar email, atualizar oportunidade). Toggle ativar/desativar. Painel de execuções recentes.',
        who: 'Admin / Configuração.',
      },
      {
        href: '/crm/automations/new',
        label: 'Nova regra',
        desc: 'Configurar gatilho (lead criado, status mudou, proposta aceita, fatura vencida, etc) + condições (JSON) + ações (JSON). Botões de template ajudam.',
      },
      {
        href: '/crm/automations/[id]',
        label: 'Editar regra',
        desc: 'Histórico das últimas 30 execuções da regra com link para o lead/cliente afetado.',
      },
    ],
  },
  {
    title: 'Organização interna',
    emoji: '🏷️',
    items: [
      {
        href: '/crm/tags',
        label: 'Tags',
        desc: 'Gerenciar tags pra categorizar leads/clients (ex: VIP, frio, indicação).',
      },
    ],
  },
  {
    title: 'Exportações (CSV)',
    emoji: '📤',
    items: [
      {
        href: '/crm/api/export?entity=leads',
        label: 'Exportar todos os Leads',
        desc: 'Baixa CSV com últimos 10k leads. Útil pra mailing, análises externas, backup.',
      },
      {
        href: '/crm/api/export?entity=clients',
        label: 'Exportar todos os Clientes',
        desc: 'Baixa CSV com todos os clientes ativos + LTV.',
      },
      {
        href: '/crm/api/export?entity=payments',
        label: 'Exportar Pagamentos',
        desc: 'CSV de todos os pagamentos recebidos. Útil pra contabilidade.',
      },
      {
        href: '/crm/api/export?entity=quotes',
        label: 'Exportar Propostas',
        desc: 'CSV de todas as propostas e seus status.',
      },
      {
        href: '/crm/api/export?entity=invoices',
        label: 'Exportar Faturas',
        desc: 'CSV de todas as faturas emitidas.',
      },
    ],
  },
]

const flow = [
  { step: '1', label: 'Cliente preenche form no site', where: 'housemazzutti.com/studio (etc.)' },
  { step: '2', label: 'Lead aparece automaticamente em /crm/leads' },
  { step: '3', label: 'Você abre o detalhe, qualifica, conversa' },
  { step: '4', label: 'Clica "+ Nova proposta", monta com itens do catálogo' },
  { step: '5', label: 'Em /crm/quotes/[id] clica "🔗 Copiar link público"' },
  { step: '6', label: 'Envia o link pro cliente (WhatsApp/email)' },
  { step: '7', label: 'Cliente abre /p/[token] e clica "Aceitar"' },
  { step: '8', label: 'Sistema marca oportunidade como ganho e cria atividade' },
  { step: '9', label: 'Clica "Gerar fatura" → lead vira cliente, fatura é emitida' },
  { step: '10', label: 'Cliente paga → você registra em /crm/clients/[id] → LTV atualiza' },
]

export default function AjudaPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Guia rápido do CRM</h1>
        <p className="text-sm text-neutral-500">
          Toda página do sistema com descrição. Use pra treinar a equipe e como atalho.
        </p>
      </header>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          🔄 Fluxo end-to-end (do site ao pagamento)
        </h2>
        <ol className="space-y-1.5 text-sm">
          {flow.map((f) => (
            <li key={f.step} className="flex gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-medium shrink-0">
                {f.step}
              </span>
              <span>
                {f.label}
                {f.where && <span className="text-xs text-neutral-500"> — {f.where}</span>}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            {section.emoji} {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.items.map((item) => {
              const isTemplate = item.href.includes('[')
              const isExternal = item.href.startsWith('/p/') || item.href.startsWith('/crm/api/')
              const Tag: 'a' | 'span' | typeof Link = isTemplate ? 'span' : isExternal ? 'a' : Link
              return (
                <div
                  key={item.href}
                  className="rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-400 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <div className="font-medium">{item.label}</div>
                    {!isTemplate && (
                      <Tag
                        href={item.href}
                        {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
                        className="text-xs text-blue-600 hover:underline shrink-0"
                      >
                        abrir →
                      </Tag>
                    )}
                    {isTemplate && (
                      <span className="text-[10px] uppercase tracking-wide text-neutral-400 shrink-0">
                        dinâmica
                      </span>
                    )}
                  </div>
                  <code className="block text-[11px] text-neutral-500 font-mono mb-2">
                    {item.href}
                  </code>
                  <p className="text-sm text-neutral-700">{item.desc}</p>
                  {item.who && (
                    <p className="text-xs text-neutral-500 mt-2 border-t border-neutral-100 pt-2">
                      <strong>Quem usa:</strong> {item.who}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800 mb-3">
          🔔 Indicadores no topo do nav
        </h2>
        <ul className="text-sm space-y-1.5">
          <li>
            <span className="inline-block w-4 h-4 rounded-full bg-emerald-500 align-middle"></span>{' '}
            <strong>Verde no logo HM CRM:</strong> atividades nas últimas 24h.
          </li>
          <li>
            <span className="inline-block w-4 h-4 rounded-full bg-amber-500 align-middle"></span>{' '}
            <strong>Âmbar em Leads:</strong> leads em status &quot;novo&quot; ou &quot;em contato&quot; — precisam ação.
          </li>
          <li>
            <span className="inline-block w-4 h-4 rounded-full bg-rose-500 align-middle"></span>{' '}
            <strong>Vermelho em Clientes:</strong> faturas vencidas — cobrar.
          </li>
          <li>
            <span className="inline-block rounded bg-violet-100 text-violet-700 text-[10px] px-1.5 py-0.5 uppercase align-middle">admin</span>{' '}
            <strong>Badge violeta:</strong> você é admin (vê tudo).
          </li>
          <li>
            <span className="inline-block rounded bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 uppercase align-middle">studio</span>{' '}
            <strong>Badge azul:</strong> você vê só dados da sua unidade.
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
          ⚙️ Conceitos importantes
        </h2>
        <dl className="text-sm space-y-3">
          <div>
            <dt className="font-medium">Lead vs. Cliente</dt>
            <dd className="text-neutral-600">
              Lead = contato em qualquer estágio do funil. Cliente = lead que já comprou. Promoção
              acontece automaticamente ao gerar a primeira fatura, ou manualmente via &quot;→ Promover
              a Cliente&quot;.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Proposta (quote) vs. Fatura (invoice)</dt>
            <dd className="text-neutral-600">
              Proposta = documento de venda (rascunho/enviado/aceito). Fatura = cobrança a receber
              (emitida/parcial/paga/vencida). Toda fatura nasce de uma proposta aceita.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Automação</dt>
            <dd className="text-neutral-600">
              Regras que disparam sozinhas. Exemplo: ao criar lead, gera atividade
              &quot;Lead recebido&quot;; ao aceitar proposta, marca oportunidade como ganho. Configurável
              em /crm/automations.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Unit (unidade)</dt>
            <dd className="text-neutral-600">
              Cada lead/cliente/oportunidade pertence a uma unidade: studio, agencia, produtora ou
              comunidade. Quem é admin vê tudo; quem tem unit setada (sócio gestor) vê só sua
              unidade.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
