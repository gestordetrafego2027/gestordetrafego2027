// Conteúdo das políticas legais — House Mazzutti
// Base: LGPD (Lei 13.709/2018) + Marco Civil da Internet + CDC + boas práticas ANPD.
// Minutas de apoio jurídico — revisar com advogado habilitado antes de publicar/assinar.
// Fonte única de dados de marca/endereço/contato/DPO: @/config/site

import {brand, contact, nap, napOneLine, cnpj, razaoSocial, dpo} from '@/config/site'

const updated = '07 de junho de 2026'

// Marketplaces parceiros (editável). Vendas de livros/e-books ocorrem nessas plataformas.
const marketplaces = 'Amazon, Mercado Livre, Shopee, Americanas e outras plataformas de venda de livros'

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
        body: `A House Mazzutti — ${razaoSocial}, CNPJ ${cnpj}, nome fantasia "House Mazzutti" — é uma casa criativa de direção criativa, branding e produção de imagem, com sede em ${napOneLine}. Este documento descreve como tratamos seus dados pessoais quando você utiliza nosso site (${brand.url}), serviços ou produtos, em conformidade com a Lei nº 13.709/2018 (LGPD) e o Marco Civil da Internet (Lei nº 12.965/2014).`
      },
      {
        heading: '2. Dados que coletamos',
        body: `Coletamos apenas os dados necessários para as finalidades indicadas abaixo:\n\n**Dados fornecidos por você:** nome, e-mail, telefone e mensagem ao preencher formulários de contato, agendamento ou inscrição em newsletter.\n\n**Dados de compra:** nome, CPF, endereço de entrega, dados de pagamento (processados por terceiros — Stripe / Asaas / marketplaces) ao adquirir produtos ou cursos na Loja ou Academy.\n\n**Dados de navegação:** endereço IP, páginas acessadas, tempo de sessão e tipo de dispositivo, coletados automaticamente via cookies e registros de servidor.\n\n**Dados de terceiros:** caso você interaja conosco via Instagram, LinkedIn ou WhatsApp, as políticas dessas plataformas também se aplicam.`
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
        body: `Você tem direito a:\n\n- **Acesso:** saber quais dados temos sobre você.\n- **Correção:** corrigir dados incompletos ou desatualizados.\n- **Exclusão:** solicitar a exclusão de dados tratados com base em consentimento.\n- **Portabilidade:** receber seus dados em formato estruturado.\n- **Revogação do consentimento:** a qualquer momento, sem custo.\n- **Informação sobre compartilhamento:** saber com quem compartilhamos seus dados.\n\nPara exercer qualquer direito, fale com nosso Encarregado de Dados: **${dpo.email}**`
      },
      {
        heading: '9. Crianças e adolescentes',
        body: `O site não é direcionado a menores de 18 anos e cadastros e compras são restritos a maiores de 18 anos. Identificado tratamento de dados de menor sem amparo legal, a House providenciará sua eliminação (art. 14 da LGPD; Lei nº 15.211/2025 — ECA Digital).`
      },
      {
        heading: '10. Uso de inteligência artificial',
        body: `Podemos usar IA em processos criativos, de atendimento e análise. Não tomamos decisões com efeitos jurídicos relevantes de forma exclusivamente automatizada e sem revisão. Você pode solicitar revisão (art. 20 da LGPD).`
      },
      {
        heading: '11. Segurança',
        body: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou destruição, incluindo HTTPS, controle de acesso e criptografia de dados sensíveis. Em incidente com risco relevante, comunicaremos os titulares e a ANPD.`
      },
      {
        heading: '12. Encarregado de Dados (DPO)',
        body: `Nosso Encarregado de Proteção de Dados é **${dpo.name}**, que pode ser contatado em: **${dpo.email}**`
      },
      {
        heading: '13. Alterações nesta política',
        body: `Podemos atualizar esta política periodicamente. Em caso de mudanças relevantes, publicaremos um aviso no site. A data de atualização é sempre indicada no topo do documento.`
      },
      {
        heading: '14. Contato',
        body: `${razaoSocial} — ${napOneLine}\nE-mail: ${contact.email}\nEncarregado de Dados (DPO): ${dpo.email}\nTelefone: ${contact.phone}`
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
        body: `A House Mazzutti (${razaoSocial}, CNPJ ${cnpj}) é uma casa criativa de direção criativa, branding e produção de imagem, com sede em ${napOneLine}. Oferecemos serviços de Studio (book, ensaio, cobertura), Agência (branding, web, comunicação), Produtora (campanhas de moda e publicidade) e Academy (cursos, workshops e livros).`
      },
      {
        heading: '3. Uso permitido',
        body: `Você pode usar o site para:\n\n- Conhecer nossos serviços e portfólio.\n- Entrar em contato para solicitar orçamentos.\n- Adquirir produtos, cursos e serviços oferecidos.\n- Inscrever-se em nossa newsletter.\n\n**Não é permitido:** reproduzir, copiar, distribuir ou explorar comercialmente qualquer conteúdo do site sem autorização expressa e escrita da House Mazzutti.`
      },
      {
        heading: '4. Propriedade intelectual',
        body: `Todo o conteúdo do site — textos, imagens, vídeos, marcas, logotipos, layouts e código — é de propriedade exclusiva da House Mazzutti ou licenciado por ela, protegido pela Lei 9.610/1998 (Lei de Direitos Autorais) e legislação aplicável. Veja a Política de Propriedade Intelectual e Direitos Autorais. O uso não autorizado configura infração sujeita a responsabilização civil e criminal.`
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
        body: `Estes Termos são regidos pelas leis brasileiras. Para resolução de conflitos, as partes elegem o foro da Comarca de São Paulo — SP, ressalvado o foro do consumidor quando aplicável.`
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
        body: `Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você acessa um site. Eles permitem que o site reconheça seu dispositivo, lembre preferências e colete dados de navegação. Esta Política integra a Política de Privacidade.`
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
        body: `Dúvidas sobre cookies e proteção de dados: **${dpo.email}**`
      }
    ]
  },

  'aviso-legal': {
    slug: 'aviso-legal',
    title: 'Aviso Legal',
    metaTitle: 'Aviso Legal — House Mazzutti',
    metaDescription: 'Aviso legal e disclaimer do site da House Mazzutti: natureza das informações, portfólio, links e disponibilidade.',
    updated,
    sections: [
      {
        heading: '1. Identificação',
        body: `O site ${brand.url} é operado por ${razaoSocial} (CNPJ ${cnpj}, nome fantasia "House Mazzutti"), ${napOneLine}. Contato: **${contact.email}**.`
      },
      {
        heading: '2. Natureza das informações',
        body: `As informações do site têm caráter institucional e informativo. A House busca mantê-las corretas e atualizadas, mas não garante ausência de erros ou completude.\n\nConteúdos do blog e materiais educativos não constituem aconselhamento profissional individualizado (jurídico, financeiro, médico etc.).`
      },
      {
        heading: '3. Portfólio e resultados',
        body: `Projetos e cases exibidos representam trabalhos realizados; resultados de clientes são específicos de cada contexto e não constituem promessa de resultado para novos contratantes.`
      },
      {
        heading: '4. Propriedade intelectual',
        body: `Marca, conteúdo e materiais são protegidos — veja a Política de Propriedade Intelectual e Direitos Autorais.`
      },
      {
        heading: '5. Links externos',
        body: `O site pode conter links para terceiros, pelos quais a House não se responsabiliza.`
      },
      {
        heading: '6. Disponibilidade',
        body: `A House não garante funcionamento ininterrupto do site e pode realizar manutenções e alterações.`
      },
      {
        heading: '7. Legislação e foro',
        body: `Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor quando aplicável.`
      }
    ]
  },

  'propriedade-intelectual': {
    slug: 'propriedade-intelectual',
    title: 'Propriedade Intelectual e Direitos Autorais',
    metaTitle: 'Propriedade Intelectual e Direitos Autorais — House Mazzutti',
    metaDescription: 'Como a House Mazzutti protege sua marca, conteúdo e obras, e as regras de uso permitido e vedado.',
    updated,
    sections: [
      {
        heading: '1. Titularidade',
        body: `Todo o conteúdo do site ${brand.url} — marca, logotipo, nome, identidade visual, textos, fotografias, vídeos, projetos, layouts, materiais e demais obras — é protegido pela Lei nº 9.610/1998 (Direitos Autorais) e pela Lei nº 9.279/1996 (Propriedade Industrial), e pertence a ${razaoSocial} (CNPJ ${cnpj}, nome fantasia "House Mazzutti") ou a terceiros que licenciaram seu uso.`
      },
      {
        heading: '2. Obras de terceiros exibidas no portfólio',
        body: `O portfólio pode conter obras de fotógrafos, modelos e produtoras parceiras, exibidas mediante autorização ou cessão formalizada em termo próprio (ver as políticas de Autorização de Uso de Imagem, Cessão/Licença de Obra e Portfólio Audiovisual).\n\nA House respeita os direitos morais de autor (art. 24 da Lei nº 9.610/1998), incluindo a indicação de crédito quando assim ajustado.`
      },
      {
        heading: '3. Uso permitido',
        body: `É permitido visualizar e compartilhar links do site para fins pessoais e não comerciais, mantida a integridade do conteúdo e a indicação da fonte.`
      },
      {
        heading: '4. Uso vedado',
        body: `É vedado, sem autorização prévia e por escrito da House: reproduzir, copiar, distribuir, modificar, explorar comercialmente, criar obra derivada ou utilizar a marca e os conteúdos do site, no todo ou em parte, inclusive para treinamento de sistemas de IA.`
      },
      {
        heading: '5. Conteúdo gerado por IA',
        body: `Quando a House utilizar IA na criação, os materiais resultantes seguem a titularidade desta Política. A House zela para que o uso de IA não viole direitos de terceiros.`
      },
      {
        heading: '6. Violações e notificação',
        body: `Suspeitas de violação de direitos autorais ou de uso indevido de imagem podem ser comunicadas a **${contact.email}**, com URL e descrição. A House analisará e adotará as providências cabíveis.\n\nO uso não autorizado sujeita o infrator às sanções civis e penais da legislação aplicável.`
      },
      {
        heading: '7. Lei aplicável e foro',
        body: `Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor quando aplicável.`
      }
    ]
  },

  'autorizacao-de-imagem': {
    slug: 'autorizacao-de-imagem',
    title: 'Autorização de Uso de Imagem',
    metaTitle: 'Autorização de Uso de Imagem — House Mazzutti',
    metaDescription: 'Termos da autorização de uso de imagem de modelos e retratados pela House Mazzutti, conforme o Código Civil e a LGPD.',
    updated,
    sections: [
      {
        heading: '1. Partes',
        body: `Este Termo é firmado entre o retratado ("Retratado") e ${razaoSocial} (CNPJ ${cnpj}), ${napOneLine} ("House"). Os campos de identificação do Retratado (nome, CPF, endereço) e do projeto são preenchidos no ato da assinatura.`
      },
      {
        heading: '2. Objeto',
        body: `O Retratado autoriza a House a fixar, utilizar, reproduzir e divulgar sua imagem, voz e semelhança, captadas no ensaio/produção identificado, na forma e nos limites deste Termo, com base no art. 5º, X e XXVIII, da Constituição e nos arts. 11 a 21 do Código Civil.`
      },
      {
        heading: '3. Finalidade e meios',
        body: `A imagem poderá ser utilizada para portfólio e divulgação institucional da House, em: site, redes sociais, materiais de apresentação e demais canais de comunicação da própria House.\n\nPor padrão, esta autorização **não inclui** uso em campanhas publicitárias de terceiros (clientes da House). Esse uso, quando ocorrer, será objeto de remuneração e termo específico.`
      },
      {
        heading: '4. Prazo e território',
        body: `Prazo: 5 (cinco) anos, renovável automaticamente por iguais períodos, salvo manifestação em contrário do Retratado. Território: mundial, dado o alcance da internet.`
      },
      {
        heading: '5. Gratuidade ou remuneração',
        body: `Para uso em portfólio e divulgação institucional, a autorização é concedida de forma gratuita, dando o Retratado plena quitação quanto ao uso aqui descrito. O uso em campanha de terceiros será remunerado em termo próprio.`
      },
      {
        heading: '6. Limites e direitos do Retratado',
        body: `A House não utilizará a imagem de forma vexatória, ofensiva, discriminatória ou que associe o Retratado a conteúdo ilícito.\n\nO Retratado poderá solicitar a retirada de imagem nova de circulação para usos futuros mediante comunicação por escrito, respeitados os materiais já produzidos e veiculados de boa-fé e os limites legais.`
      },
      {
        heading: '7. Proteção de dados (LGPD)',
        body: `Os dados e a imagem do Retratado são tratados conforme a Política de Privacidade. A imagem é dado pessoal; a base é o consentimento e/ou a execução deste Termo. Encarregado de Dados (DPO): **${dpo.email}**.`
      },
      {
        heading: '8. Menores',
        body: `Sendo o Retratado menor de 18 anos, este Termo deve ser assinado por pai, mãe ou responsável legal, observada a Lei nº 15.211/2025 (ECA Digital).`
      },
      {
        heading: '9. Foro',
        body: `Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor quando aplicável.`
      }
    ]
  },

  'direitos-autorais-obras': {
    slug: 'direitos-autorais-obras',
    title: 'Cessão e Licença de Obra (Fotógrafos)',
    metaTitle: 'Cessão e Licença de Obra — House Mazzutti',
    metaDescription: 'Termos de cessão e licença de uso de obras fotográficas em portfólio da House Mazzutti, conforme a Lei 9.610/1998.',
    updated,
    sections: [
      {
        heading: '1. Partes e objeto',
        body: `Este Termo é firmado entre o(a) fotógrafo(a) ("Autor") e ${razaoSocial} (CNPJ ${cnpj}, "House"). O Autor cede ou licencia à House os direitos patrimoniais de uso das fotografias produzidas no projeto identificado, relacionadas em anexo, regidos pela Lei nº 9.610/1998.`
      },
      {
        heading: '2. Modalidade e alcance',
        body: `**Licença** (recomendada para portfólio): não exclusiva, para a House exibir as obras em portfólio e divulgação institucional (site, redes, apresentações), por prazo de 5 (cinco) anos, renovável, e território mundial.\n\n**Cessão** (quando a obra foi produzida sob encomenda da House): cessão total e definitiva dos direitos patrimoniais, na forma dos arts. 49 a 52 da Lei nº 9.610/1998, podendo a House usar, editar e exibir as obras, inclusive em projetos de clientes.\n\nA modalidade aplicável é definida no ato da assinatura.`
      },
      {
        heading: '3. Direitos morais e crédito',
        body: `Os direitos morais do Autor são inalienáveis (art. 27). A House indicará o crédito do Autor sempre que veicular a obra, no formato **"Foto: [Nome do Autor] / @[perfil]"**, na legenda ou em local equivalente, conforme a peça.`
      },
      {
        heading: '4. Remuneração',
        body: `A remuneração — sem valor adicional (quando já remunerado no contrato de prestação) ou valor específico com plena quitação — é definida no ato da assinatura.`
      },
      {
        heading: '5. Garantias do Autor',
        body: `O Autor declara ser titular das obras, que são originais e não violam direitos de terceiros, e que obteve as autorizações de imagem das pessoas retratadas, respondendo por eventuais reclamações.`
      },
      {
        heading: '6. Proteção de dados e foro',
        body: `Dados tratados conforme a Política de Privacidade. Lei brasileira; foro de São Paulo/SP.`
      }
    ]
  },

  'portfolio-audiovisual': {
    slug: 'portfolio-audiovisual',
    title: 'Uso de Material Audiovisual em Portfólio',
    metaTitle: 'Uso de Material Audiovisual em Portfólio — House Mazzutti',
    metaDescription: 'Termos de uso de trechos audiovisuais em portfólio da House Mazzutti em parceria com produtoras.',
    updated,
    sections: [
      {
        heading: '1. Contexto e partes',
        body: `Aplica-se quando a House (${razaoSocial}, CNPJ ${cnpj}) prestou serviços de cenografia, casting e/ou produção em obra audiovisual cuja titularidade pertence à produtora parceira ("Produtora") e/ou a terceiros.`
      },
      {
        heading: '2. Objeto',
        body: `A Produtora autoriza a House a utilizar trechos da obra (até 60 segundos) em portfólio e divulgação institucional da House (site, redes, apresentações), como demonstração da contribuição criativa da House no projeto.`
      },
      {
        heading: '3. Limites',
        body: `O uso restringe-se a portfólio, sem exploração comercial autônoma da obra, e preservará os créditos da Produtora e dos demais titulares.\n\nA Produtora declara deter os direitos necessários (inclusive de músicas, elenco e locações) para conceder esta autorização, respondendo por reclamações de terceiros quanto à obra.`
      },
      {
        heading: '4. Prazo e território',
        body: `Prazo: 5 (cinco) anos, renovável; território: mundial. A autorização é gratuita e recíproca — a Produtora também poderá usar a obra como portfólio, com crédito mútuo às partes.`
      },
      {
        heading: '5. Propriedade intelectual',
        body: `Este Termo não transfere a titularidade da obra, que permanece com a Produtora/titulares. Eventuais materiais de autoria exclusiva da House (ex.: projeto de cenografia) permanecem da House.`
      },
      {
        heading: '6. Proteção de dados e foro',
        body: `Dados tratados conforme a Política de Privacidade. Lei brasileira; foro de São Paulo/SP.`
      }
    ]
  },

  'conteudo-e-publicidade': {
    slug: 'conteudo-e-publicidade',
    title: 'Conteúdo e Publicidade',
    metaTitle: 'Política de Conteúdo e Publicidade — House Mazzutti',
    metaDescription: 'Princípios de publicidade responsável da House Mazzutti, identificação de publi, creators e proteção de menores (CONAR/CDC).',
    updated,
    sections: [
      {
        heading: '1. Princípios',
        body: `A House produz e veicula conteúdo e publicidade com veracidade, transparência e responsabilidade, observando o Código de Defesa do Consumidor (Lei nº 8.078/1990), o Código Brasileiro de Autorregulamentação Publicitária e o Guia de Marketing e Publicidade por Influenciadores do CONAR em vigor.`
      },
      {
        heading: '2. Identificação da publicidade',
        body: `Todo conteúdo publicitário é identificável como tal. Em ações com influenciadores e creators, a natureza publicitária deve ser sinalizada de forma clara, priorizando as ferramentas nativas de "conteúdo pago/parceria paga" das plataformas, sem prejuízo de indicações como "publicidade".\n\nÉ vedada a publicidade dissimulada, enganosa ou abusiva.`
      },
      {
        heading: '3. Influenciadores e creators',
        body: `Há relação publicitária quando existir, cumulativamente, vínculo de compromissos recíprocos e alguma contrapartida, benefício ou conexão material entre a House e o influenciador.\n\nO creator deve respeitar esta Política, o Guia CONAR e divulgar apenas informações verídicas e comprováveis sobre produtos e serviços.`
      },
      {
        heading: '4. Proteção de crianças e adolescentes',
        body: `A publicidade observará as normas éticas de proteção a crianças e adolescentes, sem explorar a credulidade ou a inexperiência do público infanto-juvenil, conforme o Guia CONAR e a Lei nº 15.211/2025 (ECA Digital).`
      },
      {
        heading: '5. Uso de inteligência artificial',
        body: `Quando peças publicitárias utilizarem IA (geração de imagem, voz ou vídeo), a House zela pela não indução a erro do consumidor e pelo respeito a direitos de terceiros, sinalizando o uso quando exigido pelas normas aplicáveis.`
      },
      {
        heading: '6. Claims, preços e promoções',
        body: `Afirmações sobre resultados, preços, descontos e condições serão precisas, com as ressalvas necessárias. Promoções terão regulamento e prazo claros.`
      },
      {
        heading: '7. Direitos de terceiros',
        body: `Imagens, músicas, marcas e obras de terceiros utilizados em conteúdo e publicidade terão a devida autorização ou licença.`
      },
      {
        heading: '8. Canal e lei aplicável',
        body: `Manifestações: **${contact.email}**. Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor.`
      }
    ]
  },

  'politica-editorial': {
    slug: 'politica-editorial',
    title: 'Política Editorial e Jornalística',
    metaTitle: 'Política Editorial e Jornalística — House Mazzutti',
    metaDescription: 'Princípios editoriais da House Mazzutti: apuração, correções, direito de resposta, direitos autorais e uso de IA.',
    updated,
    sections: [
      {
        heading: '1. Propósito',
        body: `O conteúdo editorial da House (blog, artigos, newsletter Connect) tem caráter informativo e autoral e observa princípios de veracidade, apuração responsável, pluralidade e respeito aos direitos de terceiros, amparado na liberdade de expressão e de informação (CF, arts. 5º, IV e IX, e 220).`
      },
      {
        heading: '2. Linha editorial e distinção de publicidade',
        body: `O conteúdo jornalístico/editorial é claramente distinto da publicidade. Conteúdos patrocinados ou com parceria comercial são identificados como tais (ver Política de Conteúdo e Publicidade).`
      },
      {
        heading: '3. Apuração, fontes e correções',
        body: `As informações são apuradas com diligência e fontes verificáveis. Erros materiais são corrigidos de forma transparente, com registro da retificação.\n\nDireito de resposta: pessoas citadas que se sintam prejudicadas podem solicitar retificação ou resposta por **${contact.email}**, observada a Lei nº 13.188/2015.`
      },
      {
        heading: '4. Direitos autorais e citação',
        body: `Citações, imagens e trechos de terceiros respeitam a Lei nº 9.610/1998, com indicação de fonte/autoria. Não se reproduz obra de terceiro além do permitido sem autorização.`
      },
      {
        heading: '5. Imagem, honra e privacidade',
        body: `O conteúdo respeita a imagem, a honra e a privacidade das pessoas (CC, arts. 11–21), evitando exposição indevida e observando o interesse público da informação.`
      },
      {
        heading: '6. Conteúdo sobre crianças e adolescentes',
        body: `Conteúdo que envolva menores observa o ECA e a Lei nº 15.211/2025, com especial cuidado quanto a identificação e exposição.`
      },
      {
        heading: '7. Uso de IA no conteúdo editorial',
        body: `Quando a IA for usada na produção editorial, mantém-se a curadoria e a responsabilidade humana sobre a veracidade e a checagem das informações publicadas.`
      },
      {
        heading: '8. Proteção de dados e foro',
        body: `Dados de leitores e assinantes tratados conforme a Política de Privacidade. Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor.`
      }
    ]
  },

  'compra-de-produtos': {
    slug: 'compra-de-produtos',
    title: 'Compra de Livros e E-books',
    metaTitle: 'Compra de Livros e E-books — House Mazzutti',
    metaDescription: 'Termos de compra de livros e e-books da House Mazzutti em marketplaces parceiros: licença, entrega, arrependimento e suporte.',
    updated,
    sections: [
      {
        heading: '1. Objeto e partes',
        body: `Estes Termos tratam dos livros e e-books de autoria e/ou edição de ${razaoSocial} (CNPJ ${cnpj}, "House Mazzutti" ou "House"), divulgados no site ${brand.url}.\n\nAs compras são realizadas em marketplaces parceiros — ${marketplaces} —, que atuam como vendedores e/ou intermediadores. A contratação, o pagamento, a emissão fiscal, a entrega e a troca/devolução ocorrem no ambiente do marketplace e regem-se também pelos termos e políticas da respectiva plataforma.\n\nEstes Termos regem a relação do comprador com a House quanto a direitos autorais, autenticidade, uso do conteúdo e suporte, complementando — sem substituir — os termos do marketplace. Aplicam-se o CDC (Lei nº 8.078/1990), a Lei nº 9.610/1998 e o Decreto nº 7.962/2013.`
      },
      {
        heading: '2. O que você adquire',
        body: `**E-book:** a compra concede licença de uso pessoal, não exclusiva e intransferível. O comprador não adquire os direitos autorais, que permanecem com a House e/ou seus licenciantes.\n\n**Livro físico:** o comprador adquire a propriedade do exemplar, sem qualquer cessão de direitos autorais sobre o conteúdo.\n\nÉ vedado, em ambos os casos e salvo autorização expressa: copiar, reproduzir, distribuir, revender como conteúdo, compartilhar arquivos ou credenciais, disponibilizar publicamente ou sublicenciar o conteúdo, no todo ou em parte. A violação sujeita o infrator às sanções civis e penais da Lei nº 9.610/1998.`
      },
      {
        heading: '3. Compra e pedido',
        body: `A compra é concluída no marketplace escolhido, que exibe preço, condições, prazo de entrega e etapas do pedido conforme o Decreto nº 7.962/2013. Os dados informados na compra são tratados pela plataforma e, no que couber, conforme a Política de Privacidade da House.`
      },
      {
        heading: '4. Preço e pagamento',
        body: `Preços, formas de pagamento, parcelamento e frete são definidos e processados pelo marketplace. A House não armazena dados de pagamento dos compradores realizados nessas plataformas.`
      },
      {
        heading: '5. Entrega e acesso',
        body: `**E-book:** entrega digital pela plataforma (ex.: leitura no aplicativo/leitor do próprio marketplace). O acesso é vitalício na conta do comprador na respectiva plataforma, ressalvadas regras e disponibilidade do marketplace.\n\n**Livro físico:** entrega pela logística do marketplace, no prazo e nas condições por ele informados.\n\nRequisitos técnicos do e-book (dispositivo, aplicativo de leitura) seguem a plataforma de venda.`
      },
      {
        heading: '6. Arrependimento, troca e devolução',
        body: `**Arrependimento (CDC, art. 49):** nas compras pela internet, é assegurado o prazo de 7 (sete) dias corridos para desistência, exercido junto ao marketplace onde a compra foi feita, conforme o procedimento da plataforma.\n\n**E-book de acesso imediato:** quando o conteúdo é liberado de imediato, o direito de arrependimento sobre a parte já acessada observa a regra de renúncia informada adotada pela plataforma no momento da compra.\n\nTrocas e devoluções seguem a política do marketplace e a Política de Cancelamento e Reembolso da House, no que couber.`
      },
      {
        heading: '7. Proteção do conteúdo',
        body: `Os e-books podem conter marca d'água, identificação do comprador e/ou proteção técnica (DRM) para inibir cópia não autorizada. A remoção ou burla dessas proteções é vedada e caracteriza violação destes Termos e da Lei nº 9.610/1998.`
      },
      {
        heading: '8. Suporte e canais',
        body: `Questões de pedido, pagamento, entrega e devolução devem ser tratadas no canal de atendimento do marketplace onde a compra foi feita.\n\nQuestões sobre conteúdo, autenticidade da obra e direitos autorais: **${contact.email}**, com resposta em até 48 horas úteis.`
      },
      {
        heading: '9. Responsabilidades',
        body: `A House responde pela autoria e pela conformidade do conteúdo conforme anunciado. A experiência de compra, o pagamento e a entrega são de responsabilidade do marketplace, ressalvados os direitos do consumidor.`
      },
      {
        heading: '10. Proteção de dados e foro',
        body: `Os dados sob tratamento da House são tratados conforme a Política de Privacidade. Os dados coletados pelo marketplace seguem a política da plataforma. Aplica-se a lei brasileira; fica eleito o foro de domicílio do consumidor.`
      }
    ]
  },

  'cancelamento-e-reembolso': {
    slug: 'cancelamento-e-reembolso',
    title: 'Cancelamento, Trocas e Reembolso',
    metaTitle: 'Política de Cancelamento, Trocas e Reembolso — House Mazzutti',
    metaDescription: 'Política de cancelamento, devolução e reembolso da House Mazzutti Academy e Loja. Conforme o Código de Defesa do Consumidor.',
    updated,
    sections: [
      {
        heading: '1. Produtos digitais (cursos, e-books, workshops online)',
        body: `Conforme o art. 49 do Código de Defesa do Consumidor (CDC) e a Lei 8.078/1990, você tem **7 dias corridos** a partir da data de compra para solicitar cancelamento e reembolso integral, sem necessidade de justificativa, desde que o produto não tenha sido consumido integralmente (ex.: módulo de vídeo assistido em sua totalidade).\n\nApós 7 dias, não há direito a reembolso para produtos digitais já acessados, salvo defeito comprovado.`
      },
      {
        heading: '2. Produtos físicos (livros, materiais)',
        body: `Para produtos físicos, você tem 7 dias corridos a partir do recebimento para solicitar devolução (direito de arrependimento, CDC art. 49). O produto deve ser devolvido em perfeitas condições, sem sinais de uso, na embalagem original.\n\nQuando a compra ocorre em marketplace parceiro (${marketplaces}), a troca/devolução segue também o procedimento da plataforma.\n\nO frete de devolução é de responsabilidade do comprador, exceto em casos de defeito ou erro de envio. Após a confirmação do recebimento do produto, o reembolso é processado em até 10 dias úteis, pelo mesmo meio de pagamento utilizado na compra.`
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
  },

  'prestacao-de-servicos': {
    slug: 'prestacao-de-servicos',
    title: 'Termos de Prestação de Serviços',
    metaTitle: 'Termos de Prestação de Serviços — House Mazzutti',
    metaDescription: 'Termos gerais de contratação dos serviços criativos da House Mazzutti (agência, studio, produtora, academy).',
    updated,
    sections: [
      {
        heading: '1. Objeto',
        body: `Estes Termos regem a contratação dos serviços criativos e de comunicação da House (agência, studio, produtora, academy) iniciada ou solicitada pelo site ${brand.url}, complementando o contrato específico de cada serviço.`
      },
      {
        heading: '2. Proposta e contratação',
        body: `Cada serviço é objeto de proposta/orçamento com escopo, prazo, entregáveis e preço. A contratação se aperfeiçoa com o aceite da proposta e/ou assinatura do contrato e pagamento do sinal, quando aplicável.`
      },
      {
        heading: '3. Escopo, prazos e aprovações',
        body: `O escopo e o cronograma constam da proposta/contrato. Prazos ficam suspensos durante períodos de aprovação do cliente e em caso fortuito/força maior. Serviços fora do escopo dependem de aditivo.`
      },
      {
        heading: '4. Preço, pagamento e inadimplência',
        body: `Forma e condições de pagamento conforme proposta. O atraso autoriza correção, juros e a suspensão dos serviços, sem prejuízo das medidas cabíveis.`
      },
      {
        heading: '5. Cancelamento e remarcação',
        body: `As regras de sinal, cancelamento e remarcação (inclusive de sessões e produções) seguem o contrato específico. Na ausência de previsão, aplica-se a Política de Cancelamento, Trocas e Reembolso e o sinal pago cobre custos já incorridos.`
      },
      {
        heading: '6. Propriedade intelectual dos entregáveis',
        body: `A titularidade dos materiais produzidos e a cessão de direitos ao cliente seguem o contrato específico. Até a quitação integral, a House conserva os direitos sobre os entregáveis.\n\nA House pode utilizar os trabalhos realizados em seu portfólio, salvo confidencialidade ajustada por escrito.`
      },
      {
        heading: '7. Consumidor',
        body: `Quando o contratante for consumidor, aplicam-se as garantias do CDC, inclusive quanto a vícios na prestação (arts. 20 e 26).`
      },
      {
        heading: '8. Proteção de dados e foro',
        body: `Dados tratados conforme a Política de Privacidade. Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor.`
      }
    ]
  },

  'pagamentos': {
    slug: 'pagamentos',
    title: 'Política de Pagamentos',
    metaTitle: 'Política de Pagamentos — House Mazzutti',
    metaDescription: 'Como funcionam os pagamentos das compras da House Mazzutti em marketplaces parceiros: meios, confirmação e estornos.',
    updated,
    sections: [
      {
        heading: '1. Meios e intermediação',
        body: `As compras de livros e e-books da ${razaoSocial} (CNPJ ${cnpj}) são realizadas e processadas por marketplaces parceiros — ${marketplaces} —, que atuam como vendedores/intermediadores de pagamento e oferecem cartão, Pix, boleto e parcelamento conforme suas próprias regras.\n\nA House não processa nem armazena dados de pagamento dessas compras; o processamento, a segurança e a emissão fiscal da transação cabem ao marketplace/instituição de pagamento.`
      },
      {
        heading: '2. Preços, moeda e impostos',
        body: `Preços em reais (R$), com tributos aplicáveis, conforme anunciado no marketplace. O documento fiscal é emitido pela plataforma vendedora.`
      },
      {
        heading: '3. Confirmação e entrega',
        body: `A entrega do produto (acesso ao e-book ou envio do livro físico) ocorre após a confirmação do pagamento pela plataforma. Em pagamentos sujeitos a compensação (boleto/Pix agendado), ocorre após a confirmação.`
      },
      {
        heading: '4. Falhas de cobrança e estorno',
        body: `Cobranças indevidas são tratadas pela plataforma vendedora. O reembolso segue a Política de Cancelamento, Trocas e Reembolso e os procedimentos do marketplace.`
      },
      {
        heading: '5. Antifraude',
        body: `Transações podem passar por análise antifraude da plataforma, que pode recusar pedidos suspeitos.`
      },
      {
        heading: '6. Assinaturas recorrentes',
        body: `A House não opera, no momento, produtos por assinatura recorrente. Caso passe a oferecer, esta Política será atualizada com as regras de cobrança recorrente, renovação automática e cancelamento.`
      },
      {
        heading: '7. Proteção de dados e foro',
        body: `Dados tratados conforme a Política de Privacidade. Lei brasileira; foro de domicílio do consumidor.`
      }
    ]
  },

  'afiliados': {
    slug: 'afiliados',
    title: 'Programa de Afiliados',
    metaTitle: 'Termo do Programa de Afiliados — House Mazzutti',
    metaDescription: 'Regras do Programa de Afiliados da House Mazzutti: adesão, divulgação, comissão de 10% e pagamento via Pix.',
    updated,
    sections: [
      {
        heading: '1. Objeto',
        body: `Este Termo regula a adesão ao Programa de Afiliados da House Mazzutti (${razaoSocial}, CNPJ ${cnpj}), pelo qual o Afiliado divulga e indica produtos da House em troca de comissão por vendas realizadas por meio do seu link de indicação.`
      },
      {
        heading: '2. Adesão e elegibilidade',
        body: `O Afiliado deve ser maior de 18 anos, fornecer dados verdadeiros e, se pessoa jurídica/MEI, estar regular. A adesão se dá pelo aceite eletrônico deste Termo.`
      },
      {
        heading: '3. Regras de divulgação',
        body: `O Afiliado compromete-se a divulgar de forma verídica, ética e em conformidade com o CDC e o Guia CONAR (ver Política de Conteúdo e Publicidade), identificando a natureza publicitária das indicações.\n\nÉ vedado: (i) spam, e-mails não solicitados e práticas enganosas; (ii) prometer resultados não comprovados; (iii) usar a marca da House fora das diretrizes; (iv) criar páginas/anúncios que se passem pela House; (v) dar lances (bid) em palavras-chave da marca "House Mazzutti" ou variações em mídia paga (Google Ads, Meta Ads e similares), conduta expressamente proibida e sujeita a descredenciamento imediato.`
      },
      {
        heading: '4. Uso da marca',
        body: `A House concede licença limitada e revogável de uso da marca apenas para a divulgação autorizada, conforme material e diretrizes fornecidos. A licença cessa com o descredenciamento.`
      },
      {
        heading: '5. Comissão e pagamento',
        body: `Percentual de comissão: **10% (dez por cento)** sobre o valor líquido de cada venda. A comissão é devida sobre vendas efetivamente pagas e não estornadas/reembolsadas. Vendas canceladas, reembolsadas ou fraudulentas não geram comissão.\n\nApuração e pagamento: **mensal**, com valor mínimo de saque de **R$ 50,00**, pago via **Pix** (dados informados pelo Afiliado no aceite). A House ainda não utiliza plataforma de gestão de afiliados; a apuração é feita internamente até a eventual adoção de plataforma específica, quando este Termo será atualizado.`
      },
      {
        heading: '6. Relação entre as partes',
        body: `O Afiliado atua de forma autônoma e independente, sem vínculo empregatício, societário ou de representação com a House, arcando com seus próprios tributos e custos.`
      },
      {
        heading: '7. Descredenciamento',
        body: `A House pode suspender ou descredenciar o Afiliado que violar este Termo, retendo comissões de vendas irregulares, sem prejuízo das medidas cabíveis.`
      },
      {
        heading: '8. Proteção de dados e foro',
        body: `Dados tratados conforme a Política de Privacidade. Lei brasileira; foro de São Paulo/SP. Aceite eletrônico — data/IP registrados no momento da adesão.`
      }
    ]
  },

  'cadastro-creators': {
    slug: 'cadastro-creators',
    title: 'Cadastro de Creators e Talentos',
    metaTitle: 'Cadastro de Creators, Artistas, Modelos e Influenciadores — House Mazzutti',
    metaDescription: 'Termos do cadastro voluntário de creators, artistas, modelos e influenciadores na base da House Mazzutti.',
    updated,
    sections: [
      {
        heading: '1. Objeto',
        body: `Este Termo regula o cadastro voluntário de creators, artistas, modelos e influenciadores ("Talento") na base da House Mazzutti (${razaoSocial}, CNPJ ${cnpj}), para fins de prospecção, seleção e eventual convite para projetos e parcerias.`
      },
      {
        heading: '2. Elegibilidade',
        body: `O cadastro é destinado a maiores de 18 anos. Menores só podem ser cadastrados por meio de responsável legal, observada a Lei nº 15.211/2025 (ECA Digital) e o art. 14 da LGPD.`
      },
      {
        heading: '3. Dados e materiais enviados',
        body: `O Talento fornece dados de contato, portfólio, fotos/vídeos e informações profissionais, declarando que detém os direitos sobre os materiais enviados e que estes não violam direitos de terceiros.\n\nO cadastro não gera vínculo, exclusividade ou obrigação de contratação pela House. Eventual trabalho será objeto de contrato específico.`
      },
      {
        heading: '4. Autorização de uso dos materiais de cadastro',
        body: `O Talento autoriza a House a armazenar e analisar os materiais para fins de seleção. O uso de imagem em portfólio ou campanhas depende de autorização específica (ver Política de Autorização de Uso de Imagem).`
      },
      {
        heading: '5. Conduta e publicidade',
        body: `Em ações com a House, o Talento observará o Guia CONAR e a Política de Conteúdo e Publicidade, identificando conteúdo publicitário.`
      },
      {
        heading: '6. Proteção de dados (LGPD)',
        body: `Os dados são tratados conforme a Política de Privacidade, com base no consentimento e nos procedimentos preliminares de contratação. O Talento pode solicitar atualização ou exclusão do cadastro por **${dpo.email}**.`
      },
      {
        heading: '7. Atualização e exclusão',
        body: `O Talento pode pedir, a qualquer tempo, a atualização ou o descadastramento de seus dados.`
      },
      {
        heading: '8. Foro',
        body: `Lei brasileira; foro de São Paulo/SP. Aceite eletrônico — data/IP registrados no momento do cadastro.`
      }
    ]
  },

  'fornecedores': {
    slug: 'fornecedores',
    title: 'Termo Geral de Fornecedores e Prestadores',
    metaTitle: 'Termo Geral de Fornecedores e Prestadores — House Mazzutti',
    metaDescription: 'Condições gerais para fornecedores e prestadores autônomos contratados pela House Mazzutti.',
    updated,
    sections: [
      {
        heading: '1. Objeto',
        body: `Este Termo estabelece as condições gerais aplicáveis a fornecedores e prestadores autônomos contratados pela House Mazzutti (${razaoSocial}, CNPJ ${cnpj}) para projetos próprios e de clientes, complementando a ordem de serviço e o contrato específico de cada especialidade.`
      },
      {
        heading: '2. Autonomia e ausência de vínculo',
        body: `O fornecedor presta serviços com autonomia técnica, sem subordinação, jornada ou exclusividade, inexistindo vínculo empregatício. Responsabiliza-se com exclusividade por encargos trabalhistas, previdenciários e fiscais próprios.`
      },
      {
        heading: '3. Ordens de serviço',
        body: `Cada trabalho é acionado por ordem de serviço escrita (inclusive eletrônica), com escopo, prazo, entregáveis e remuneração. A execução iniciada caracteriza aceite.`
      },
      {
        heading: '4. Propriedade intelectual e cessão',
        body: `Salvo disposição diversa no contrato específico, o fornecedor cede à House os direitos patrimoniais sobre os materiais produzidos sob encomenda, na forma da Lei nº 9.610/1998, podendo a House usá-los em projetos próprios e de clientes. Os direitos morais permanecem com o autor.\n\nO fornecedor garante que os materiais são originais, que detém os direitos e as autorizações de imagem necessárias, respondendo por reclamações de terceiros.`
      },
      {
        heading: '5. Confidencialidade',
        body: `O fornecedor mantém sigilo sobre informações, projetos e dados a que tiver acesso, durante e após a relação, sob pena de responsabilização.`
      },
      {
        heading: '6. Proteção de dados',
        body: `Quando tratar dados pessoais por conta da House, o fornecedor atua como operador (LGPD), seguindo as instruções da House e adotando medidas de segurança, vedado uso para finalidade própria.`
      },
      {
        heading: '7. Remuneração e pagamento',
        body: `Conforme ordem de serviço/contrato. O pagamento depende da entrega aprovada e da documentação fiscal correspondente.`
      },
      {
        heading: '8. Rescisão e foro',
        body: `Descumprimento autoriza a rescisão e a retenção de pagamentos relativos a entregas não realizadas. Lei brasileira; foro de São Paulo/SP.`
      }
    ]
  },

  'academy': {
    slug: 'academy',
    title: 'Termos da Academy (Cursos Online)',
    metaTitle: 'Termos da Academy — Cursos Online — House Mazzutti',
    metaDescription: 'Termos de uso dos cursos, workshops e conteúdos digitais da House Mazzutti Academy: acesso, certificado, licença e reembolso.',
    updated,
    sections: [
      {
        heading: '1. Objeto e partes',
        body: `Estes Termos regem a matrícula e o acesso aos cursos, workshops e conteúdos educativos digitais (EAD) da House Mazzutti Academy, oferecidos por ${razaoSocial} (CNPJ ${cnpj}, "House"), pelo site ${brand.url}. Aplicam-se o CDC (Lei nº 8.078/1990), a Lei nº 9.610/1998 e o Decreto nº 7.962/2013.`
      },
      {
        heading: '2. Matrícula e acesso',
        body: `A matrícula é confirmada após a aprovação do pagamento. O acesso ao conteúdo é pessoal e liberado na conta do aluno, pelo prazo informado na página de cada curso. A House pode atualizar ou aprimorar o conteúdo durante esse período.`
      },
      {
        heading: '3. Licença de uso do conteúdo',
        body: `A compra concede licença de uso pessoal, não exclusiva e intransferível. É vedado gravar, reproduzir, distribuir, revender, compartilhar arquivos ou credenciais de acesso, ou disponibilizar publicamente o conteúdo, no todo ou em parte. A violação sujeita o infrator às sanções da Lei nº 9.610/1998 e ao cancelamento do acesso, sem reembolso.`
      },
      {
        heading: '4. Certificado',
        body: `Quando previsto no curso, será emitido certificado de conclusão ao aluno que cumprir os requisitos (ex.: conclusão dos módulos). O certificado atesta a participação, não constituindo título acadêmico oficial.`
      },
      {
        heading: '5. Requisitos técnicos',
        body: `O acesso requer conexão à internet, dispositivo compatível e navegador atualizado. A House não se responsabiliza por falhas decorrentes do equipamento ou da conexão do aluno.`
      },
      {
        heading: '6. Arrependimento e reembolso',
        body: `Conforme o art. 49 do CDC, o aluno tem 7 (sete) dias corridos a partir da compra para desistir e obter reembolso integral. Quando há liberação imediata do conteúdo, o arrependimento sobre a parte já acessada observa a renúncia informada no momento da compra. As demais regras seguem a Política de Cancelamento, Trocas e Reembolso.`
      },
      {
        heading: '7. Conduta do aluno',
        body: `O aluno compromete-se a usar a plataforma de boa-fé, respeitar instrutores e colegas e não compartilhar seu acesso. Condutas abusivas podem levar à suspensão sem reembolso.`
      },
      {
        heading: '8. Suporte',
        body: `Dúvidas sobre cursos e acesso: **${contact.academyEmail}**.`
      },
      {
        heading: '9. Proteção de dados e foro',
        body: `Dados tratados conforme a Política de Privacidade (Encarregado/DPO: ${dpo.email}). Lei brasileira; foro de domicílio do consumidor.`
      }
    ]
  },

  'comunidade': {
    slug: 'comunidade',
    title: 'Termos e Código de Conduta da Comunidade',
    metaTitle: 'Termos e Código de Conduta da Comunidade — House Mazzutti',
    metaDescription: 'Regras de participação, conduta, conteúdo do usuário e moderação da Comunidade House Mazzutti.',
    updated,
    sections: [
      {
        heading: '1. Objeto',
        body: `Estes Termos regulam a participação na Comunidade da House Mazzutti (${razaoSocial}, CNPJ ${cnpj}) — grupos, fóruns e canais oficiais —, complementando os Termos de Uso e a Política de Privacidade.`
      },
      {
        heading: '2. Elegibilidade',
        body: `A participação é destinada a maiores de 18 anos. O membro fornece dados verdadeiros e é responsável pela segurança da sua conta.`
      },
      {
        heading: '3. Código de conduta',
        body: `É esperado respeito mútuo. São vedados: discurso de ódio, discriminação, assédio, ameaças, conteúdo ilícito ou sexualmente explícito, spam, divulgação não autorizada e compartilhamento de dados de terceiros sem consentimento.`
      },
      {
        heading: '4. Conteúdo do usuário (UGC)',
        body: `O membro mantém a titularidade do conteúdo que publica e declara ser original e não violar direitos de terceiros. Ao publicar, concede à House licença não exclusiva e gratuita para exibir e moderar esse conteúdo nos canais da Comunidade. A House pode remover conteúdo que viole estes Termos.`
      },
      {
        heading: '5. Moderação e penalidades',
        body: `A House pode advertir, ocultar conteúdo, suspender ou banir membros que descumpram estas regras, a seu critério e sem aviso prévio quando houver risco. Decisões podem ser revistas mediante contato.`
      },
      {
        heading: '6. Propriedade intelectual',
        body: `O membro respeita a marca e os conteúdos da House e de terceiros (ver Política de Propriedade Intelectual), sendo vedada a reprodução não autorizada.`
      },
      {
        heading: '7. Proteção de dados (LGPD)',
        body: `Os dados dos membros são tratados conforme a Política de Privacidade. Encarregado/DPO: **${dpo.email}**.`
      },
      {
        heading: '8. Isenção e foro',
        body: `A House não se responsabiliza por opiniões e condutas de membros. Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor.`
      }
    ]
  },

  'tratamento-de-dados': {
    slug: 'tratamento-de-dados',
    title: 'Adendo de Proteção de Dados (Operadores)',
    metaTitle: 'Adendo de Proteção de Dados (DPA) — House Mazzutti',
    metaDescription: 'Cláusulas de tratamento de dados pessoais entre a House Mazzutti (controladora) e seus operadores, conforme a LGPD.',
    updated,
    sections: [
      {
        heading: '1. Objeto',
        body: `Este Adendo (DPA) regula o tratamento de dados pessoais realizado por fornecedores e prestadores ("Operador") por conta de ${razaoSocial} (CNPJ ${cnpj}, "Controladora"), no âmbito dos serviços contratados, nos termos do art. 39 da LGPD (Lei nº 13.709/2018). Complementa o Termo Geral de Fornecedores.`
      },
      {
        heading: '2. Papéis',
        body: `A House é a Controladora (define finalidades e meios); o Operador trata dados exclusivamente em nome da House e segundo suas instruções documentadas.`
      },
      {
        heading: '3. Obrigações do Operador',
        body: `O Operador compromete-se a: tratar dados apenas para a finalidade contratada; manter confidencialidade; adotar medidas de segurança técnicas e administrativas; não usar os dados para finalidade própria; e subcontratar apenas com autorização e sob as mesmas obrigações.`
      },
      {
        heading: '4. Segurança e incidentes',
        body: `O Operador notificará a Controladora imediatamente sobre qualquer incidente de segurança envolvendo dados pessoais, colaborando na resposta e na eventual comunicação a titulares e à ANPD.`
      },
      {
        heading: '5. Apoio aos direitos do titular',
        body: `O Operador auxiliará a House a atender às solicitações dos titulares (art. 18 da LGPD) e às requisições da ANPD, nos prazos legais.`
      },
      {
        heading: '6. Transferência internacional',
        body: `Quando houver tratamento fora do Brasil, o Operador garante salvaguardas adequadas conforme o art. 33 da LGPD.`
      },
      {
        heading: '7. Término',
        body: `Encerrado o contrato, o Operador devolverá ou eliminará os dados pessoais, conforme instrução da House, salvo obrigação legal de retenção.`
      },
      {
        heading: '8. Contato e foro',
        body: `Encarregado/DPO da House: **${dpo.email}**. Lei brasileira; foro de São Paulo/SP.`
      }
    ]
  },

  'seguranca-da-informacao': {
    slug: 'seguranca-da-informacao',
    title: 'Política de Segurança da Informação',
    metaTitle: 'Política de Segurança da Informação — House Mazzutti',
    metaDescription: 'Compromisso e controles de segurança da informação da House Mazzutti e fluxo de resposta a incidentes (LGPD).',
    updated,
    sections: [
      {
        heading: '1. Compromisso',
        body: `A House Mazzutti (${razaoSocial}, CNPJ ${cnpj}) adota medidas para proteger a confidencialidade, a integridade e a disponibilidade dos dados de clientes, parceiros e usuários, em linha com a LGPD e as boas práticas de segurança.`
      },
      {
        heading: '2. Controles técnicos',
        body: `Entre as medidas adotadas: criptografia em trânsito (HTTPS/TLS), política de segurança de conteúdo (CSP), controle de acesso, criptografia de dados sensíveis, backups, proteção antifraude (reCAPTCHA), limitação de requisições (rate-limiting) e monitoramento de erros.`
      },
      {
        heading: '3. Acesso e contas',
        body: `Aplica-se o princípio do menor privilégio: cada pessoa acessa apenas o necessário à sua função. Recomenda-se autenticação forte e, quando disponível, verificação em duas etapas.`
      },
      {
        heading: '4. Operadores',
        body: `Fornecedores que tratam dados por conta da House seguem padrão de proteção compatível, formalizado no Adendo de Proteção de Dados.`
      },
      {
        heading: '5. Resposta a incidentes',
        body: `Em caso de incidente de segurança com risco relevante aos titulares, a House adota detecção, contenção e correção, e comunica os titulares afetados e a ANPD em prazo razoável, conforme o art. 48 da LGPD.`
      },
      {
        heading: '6. Responsabilidade dos usuários',
        body: `Usuários devem manter suas credenciais em sigilo, usar senhas fortes e comunicar imediatamente qualquer suspeita de acesso indevido.`
      },
      {
        heading: '7. Relato de vulnerabilidades',
        body: `Suspeitas de vulnerabilidade ou incidente podem ser comunicadas a **${dpo.email}** (ou ${contact.email}). A House agradece a divulgação responsável e não tomará medidas contra quem reportar de boa-fé.`
      },
      {
        heading: '8. Revisão e foro',
        body: `Esta Política é revisada periodicamente. Lei brasileira; foro de São Paulo/SP, ressalvado o foro do consumidor.`
      }
    ]
  }
}

export const policyList = Object.values(policies)

export const policySlugs = Object.keys(policies)
