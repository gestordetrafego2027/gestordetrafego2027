// Conteúdo das políticas legais — House Mazzutti
// Base: LGPD (Lei 13.709/2018) + Marco Civil da Internet + boas práticas ANPD.
// Revisar com advogado antes de qualquer alteração nos campos marcados [REVISAR].

import {brand, contact, nap, napOneLine, cnpj} from '@/config/site'

const updated = '02 de junho de 2026'

export const policies = {
  'privacidade': {
    slug: 'privacidade',
    title: 'Política de Privacidade',
    metaTitle: 'Política de Privacidade — House Mazzutti',
    metaDescription: 'Saiba como a House Mazzutti coleta, usa e protege seus dados pessoais conforme a LGPD (Lei 13.709/2018).',
    updated,
    sections: [
      {
        heading: '1. Quem somos',
        body: `A House Mazzutti (CNPJ ${cnpj}) é uma casa criativa de direção criativa, branding e produção de imagem, com sede em ${napOneLine}. Este documento descreve como tratamos seus dados pessoais quando você utiliza nosso site (${brand.url}), serviços ou produtos.`
      },
      {
        heading: '2. Dados que coletamos',
        body: `Coletamos apenas os dados necessários para as finalidades indicadas abaixo:\n\n**Dados fornecidos por você:** nome, e-mail, telefone e mensagem ao preencher formulários de contato, agendamento ou inscrição em newsletter.\n\n**Dados de compra:** nome, CPF, endereço de entrega, dados de pagamento (processados por terceiros — Stripe / Asaas) ao adquirir produtos ou cursos na Loja ou Academy.\n\n**Dados de navegação:** endereço IP, páginas acessadas, tempo de sessão e tipo de dispositivo, coletados automaticamente via cookies e registros de servidor.\n\n**Dados de terceiros:** caso você interaja conosco via Instagram, LinkedIn ou WhatsApp, as políticas dessas plataformas também se aplicam.`
      },
      {
        heading: '3. Para que usamos seus dados',
        body: `Usamos seus dados para:\n\n- Responder mensagens e solicitações de orçamento.\n- Processar compras e enviar confirmações de pedido.\n- Enviar a newsletter e comunicações de marketing (apenas com seu consentimento).\n- Melhorar o site com base em dados de navegação agregados.\n- Cumprir obrigações legais e fiscais.\n- Prevenir fraudes e garantir a segurança do ambiente digital.`
      },
      {
        heading: '4. Base legal (LGPD)',
        body: `Tratamos seus dados com base nas seguintes hipóteses legais previstas na Lei 13.709/2018:\n\n- **Consentimento** (art. 7º, I): para envio de newsletter e marketing.\n- **Execução de contrato** (art. 7º, V): para processar compras e prestar serviços contratados.\n- **Interesse legítimo** (art. 7º, IX): para melhorias do site e segurança.\n- **Cumprimento de obrigação legal** (art. 7º, II): para retenção de notas fiscais e registros contábeis.`
      },
      {
        heading: '5. Compartilhamento de dados',
        body: `Não vendemos seus dados. Podemos compartilhá-los com operadores que nos prestam serviços, sempre sob obrigação contratual de proteção:\n\n- **Processadores de pagamento:** Stripe e Asaas (para transações financeiras).\n- **Envio de e-mail:** Resend (confirmações de pedido e newsletter).\n- **Antifraude / segurança:** Google reCAPTCHA (proteção dos formulários contra robôs e spam).\n- **Análise e marketing (com seu consentimento):** Google Analytics e Meta (Facebook) Pixel.\n- **Infraestrutura:** Supabase (banco de dados e autenticação) e provedores de hospedagem.\n- **Autoridades públicas:** quando exigido por lei ou ordem judicial.\n\nAlguns desses parceiros podem tratar dados fora do Brasil; nesses casos, exigimos salvaguardas adequadas conforme a LGPD. Este site é protegido pelo reCAPTCHA do Google — aplicam-se a **Política de Privacidade** e os **Termos de Serviço** do Google.`
      },
      {
        heading: '6. Cookies',
        body: `Utilizamos cookies para funcionamento do site, análise de navegação e personalização. Você pode gerenciar ou recusar cookies nas configurações do seu navegador. Veja nossa Política de Cookies para detalhes.`
      },
      {
        heading: '7. Retenção de dados',
        body: `Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas ou obrigações legais:\n\n- **Dados de contato:** até 2 anos após o último contato.\n- **Dados de compra:** 5 anos (obrigação fiscal).\n- **Newsletter:** até que você cancele a inscrição.\n- **Logs de navegação:** até 6 meses (Marco Civil da Internet).`
      },
      {
        heading: '8. Seus direitos (LGPD, art. 18)',
        body: `Você tem direito a:\n\n- **Acesso:** saber quais dados temos sobre você.\n- **Correção:** corrigir dados incompletos ou desatualizados.\n- **Exclusão:** solicitar a exclusão de dados tratados com base em consentimento.\n- **Portabilidade:** receber seus dados em formato estruturado.\n- **Revogação do consentimento:** a qualquer momento, sem custo.\n- **Informação sobre compartilhamento:** saber com quem compartilhamos seus dados.\n\nPara exercer qualquer direito, entre em contato: **${contact.email}**`
      },
      {
        heading: '9. Segurança',
        body: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou destruição, incluindo HTTPS, controle de acesso e criptografia de dados sensíveis.`
      },
      {
        heading: '10. Encarregado de Dados (DPO)',
        body: `Nosso encarregado de proteção de dados pode ser contatado em: **${contact.email}**`
      },
      {
        heading: '11. Alterações nesta política',
        body: `Podemos atualizar esta política periodicamente. Em caso de mudanças relevantes, publicaremos um aviso no site. A data de atualização é sempre indicada no topo do documento.`
      },
      {
        heading: '12. Contato',
        body: `House Mazzutti — ${napOneLine}\nE-mail: ${contact.email}\nTelefone: ${contact.phone}`
      }
    ]
  },

  'termos-de-uso': {
    slug: 'termos-de-uso',
    title: 'Termos de Uso',
    metaTitle: 'Termos de Uso — House Mazzutti',
    metaDescription: 'Termos e condições de uso do site e dos serviços da House Mazzutti. Leia antes de utilizar nossos serviços.',
    updated,
    sections: [
      {
        heading: '1. Aceitação dos termos',
        body: `Ao acessar ou usar o site ${brand.url} e seus serviços, você concorda com estes Termos de Uso. Se não concordar, não utilize o site.`
      },
      {
        heading: '2. Sobre a House Mazzutti',
        body: `A House Mazzutti é uma casa criativa de direção criativa, branding e produção de imagem, com sede em ${napOneLine}. Oferecemos serviços de Studio (book, ensaio, cobertura), Agência (branding, web, comunicação), Produtora (campanhas de moda e publicidade) e Academy (cursos, workshops e livros).`
      },
      {
        heading: '3. Uso permitido',
        body: `Você pode usar o site para:\n\n- Conhecer nossos serviços e portfólio.\n- Entrar em contato para solicitar orçamentos.\n- Adquirir produtos, cursos e serviços oferecidos.\n- Inscrever-se em nossa newsletter.\n\n**Não é permitido:** reproduzir, copiar, distribuir ou explorar comercialmente qualquer conteúdo do site sem autorização expressa e escrita da House Mazzutti.`
      },
      {
        heading: '4. Propriedade intelectual',
        body: `Todo o conteúdo do site — textos, imagens, vídeos, marcas, logotipos, layouts e código — é de propriedade exclusiva da House Mazzutti ou licenciado por ela, protegido pela Lei 9.610/1998 (Lei de Direitos Autorais) e legislação aplicável. O uso não autorizado configura infração sujeita a responsabilização civil e criminal.`
      },
      {
        heading: '5. Produtos e serviços',
        body: `Ao contratar serviços ou adquirir produtos, você recebe uma proposta ou briefing com escopo, prazo e condições específicas. Esses documentos complementam estes Termos e prevalecem em caso de conflito.`
      },
      {
        heading: '6. Responsabilidade',
        body: `A House Mazzutti não se responsabiliza por:\n\n- Interrupções temporárias de acesso ao site por manutenção ou fatores externos.\n- Uso inadequado de informações publicadas no site por terceiros.\n- Danos indiretos ou lucros cessantes decorrentes do uso dos serviços, exceto em casos de dolo ou culpa grave.`
      },
      {
        heading: '7. Links externos',
        body: `O site pode conter links para plataformas de terceiros (Instagram, LinkedIn, WhatsApp etc.). A House Mazzutti não se responsabiliza pelo conteúdo ou políticas dessas plataformas.`
      },
      {
        heading: '8. Lei aplicável e foro',
        body: `Estes Termos são regidos pelas leis brasileiras. Para resolução de conflitos, as partes elegem o foro da Comarca de São Paulo — SP, com renúncia expressa a qualquer outro, por mais privilegiado que seja.`
      },
      {
        heading: '9. Contato',
        body: `Dúvidas sobre estes termos: **${contact.email}** | ${contact.phone}`
      }
    ]
  },

  'cookies': {
    slug: 'cookies',
    title: 'Política de Cookies',
    metaTitle: 'Política de Cookies — House Mazzutti',
    metaDescription: 'Como a House Mazzutti usa cookies no site e como você pode gerenciá-los.',
    updated,
    sections: [
      {
        heading: '1. O que são cookies',
        body: `Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você acessa um site. Eles permitem que o site reconheça seu dispositivo, lembre preferências e colete dados de navegação.`
      },
      {
        heading: '2. Cookies que utilizamos',
        body: `**Cookies essenciais:** necessários para o funcionamento básico do site (autenticação, carrinho de compras, sessão, preferência de idioma e proteção anti-spam via reCAPTCHA). Não podem ser desativados sem comprometer o funcionamento.\n\n**Cookies de análise:** coletam dados agregados e anônimos sobre como o site é usado (páginas mais visitadas, tempo de sessão) por meio do Google Analytics. Só são ativados com o seu consentimento e podem ser desativados a qualquer momento.\n\n**Cookies de marketing:** usados para medir campanhas e exibir conteúdo relevante em outras plataformas (Meta Pixel e remarketing). Requerem consentimento explícito e ficam desativados por padrão.`
      },
      {
        heading: '3. Cookies de terceiros',
        body: `Algumas funcionalidades podem utilizar cookies de terceiros:\n\n- **Google Analytics:** análise de tráfego (apenas com consentimento).\n- **Meta Pixel:** rastreamento de conversões (apenas com consentimento).\n- **Google reCAPTCHA:** proteção dos formulários contra robôs e spam (cookie essencial de segurança). Aplicam-se a Política de Privacidade e os Termos do Google.\n- **Stripe / Asaas:** processamento seguro de pagamentos.\n\nEssas empresas têm suas próprias políticas de privacidade e uso de dados.`
      },
      {
        heading: '4. Como gerenciar cookies',
        body: `Você pode rever sua decisão a qualquer momento pelo botão **"Gerenciar preferências de cookies"** no final desta página, ou ajustar/desativar cookies nas configurações do seu navegador:\n\n- **Chrome:** Configurações → Privacidade e segurança → Cookies\n- **Safari:** Preferências → Privacidade\n- **Firefox:** Configurações → Privacidade e segurança\n\nDesativar cookies pode afetar o funcionamento de algumas partes do site.`
      },
      {
        heading: '5. Consentimento',
        body: `Ao usar o site pela primeira vez, exibimos um banner informando sobre o uso de cookies. Você pode aceitar todos, recusar os não essenciais ou personalizar suas preferências. Seu consentimento é registrado e pode ser revogado a qualquer momento.`
      },
      {
        heading: '6. Contato',
        body: `Dúvidas sobre cookies: **${contact.email}**`
      }
    ]
  },

  'cancelamento-e-reembolso': {
    slug: 'cancelamento-e-reembolso',
    title: 'Política de Cancelamento e Reembolso',
    metaTitle: 'Política de Cancelamento e Reembolso — House Mazzutti',
    metaDescription: 'Política de cancelamento, devolução e reembolso da House Mazzutti Academy e Loja. Conforme o Código de Defesa do Consumidor.',
    updated,
    sections: [
      {
        heading: '1. Produtos digitais (cursos, e-books, workshops online)',
        body: `Conforme o art. 49 do Código de Defesa do Consumidor (CDC) e a Lei 8.078/1990, você tem **7 dias corridos** a partir da data de compra para solicitar cancelamento e reembolso integral, sem necessidade de justificativa, desde que o produto não tenha sido consumido integralmente (ex.: módulo de vídeo assistido em sua totalidade).\n\nApós 7 dias, não há direito a reembolso para produtos digitais já acessados, salvo defeito comprovado.`
      },
      {
        heading: '2. Produtos físicos (livros, materiais)',
        body: `Para produtos físicos, você tem 7 dias corridos a partir do recebimento para solicitar devolução (direito de arrependimento, CDC art. 49). O produto deve ser devolvido em perfeitas condições, sem sinais de uso, na embalagem original.\n\nO frete de devolução é de responsabilidade do comprador, exceto em casos de defeito ou erro de envio da House Mazzutti.\n\nApós a confirmação do recebimento do produto, o reembolso é processado em até 10 dias úteis, pelo mesmo meio de pagamento utilizado na compra.`
      },
      {
        heading: '3. Serviços (Studio, Agência, Produtora)',
        body: `Para serviços contratados (books, ensaios, produções, branding), as condições de cancelamento são estabelecidas no contrato ou proposta específica firmada entre as partes.\n\n**Regra geral para cancelamentos sem contrato específico:**\n\n- Cancelamento com **mais de 7 dias de antecedência:** reembolso integral do valor pago.\n- Cancelamento com **3 a 7 dias de antecedência:** retenção de 30% do valor como taxa de reagendamento e reserva de agenda.\n- Cancelamento com **menos de 3 dias de antecedência ou no dia:** retenção de 50% do valor.\n- **No-show (ausência sem aviso):** sem reembolso.\n\nReagendamentos são aceitos com no mínimo 72 horas de antecedência, sujeitos à disponibilidade.`
      },
      {
        heading: '4. Academy — inscrições em eventos presenciais e workshops',
        body: `Para workshops e eventos presenciais:\n\n- Cancelamento até **15 dias antes:** reembolso integral.\n- Cancelamento entre **8 e 14 dias antes:** reembolso de 50%.\n- Cancelamento com **7 dias ou menos:** sem reembolso. O participante pode transferir a vaga para outra pessoa, comunicando o nome do substituto com no mínimo 48 horas de antecedência.`
      },
      {
        heading: '5. Como solicitar cancelamento ou reembolso',
        body: `Envie um e-mail para **${contact.email}** com:\n\n- Nome completo\n- CPF (para confirmar a titularidade)\n- Número do pedido ou data da compra\n- Produto ou serviço adquirido\n- Motivo do cancelamento (opcional, mas ajuda a melhorar)\n\nResponderemos em até 2 dias úteis.`
      },
      {
        heading: '6. Prazo de reembolso',
        body: `O prazo de reembolso varia de acordo com o meio de pagamento:\n\n- **Cartão de crédito:** estorno em até 2 faturas (conforme a operadora).\n- **PIX:** reembolso em até 2 dias úteis após aprovação.\n- **Boleto:** crédito em conta em até 5 dias úteis após aprovação.`
      },
      {
        heading: '7. Defeitos e problemas técnicos',
        body: `Se você enfrentar defeito ou problema técnico em produto digital (acesso bloqueado, erro na plataforma), entre em contato imediatamente. Solucionaremos o problema ou, se não for possível, ofereceremos reembolso integral, independentemente do prazo de 7 dias.`
      },
      {
        heading: '8. Legislação aplicável',
        body: `Esta política é regida pelo Código de Defesa do Consumidor (Lei 8.078/1990), pelo Marco Civil da Internet (Lei 12.965/2014) e pela LGPD (Lei 13.709/2018).`
      },
      {
        heading: '9. Contato',
        body: `**House Mazzutti**\n${napOneLine}\nE-mail: ${contact.email}\nTelefone: ${contact.phone}`
      }
    ]
  }
}

export const policyList = Object.values(policies)

export const policySlugs = Object.keys(policies)
