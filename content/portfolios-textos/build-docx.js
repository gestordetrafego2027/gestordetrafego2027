// Build the consolidated DOCX for all House Mazzutti portfolios.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  PageBreak, PageOrientation, LevelFormat
} = require('docx');

// ---------- portfolio data ----------
const QUOTE = "Nada foi feito para parecer. Foi feito para sustentar.";
const PHILO = "Retrato como direção: presença, intenção e tratamento editorial.";
const AUTHOR = "House Mazzutti";
const YEAR = "2026";

// Each portfolio: { n, name, cat, text, team }
const portfolios = [
  // ============ STUDIO — BOOK MODEL ============
  { n: "01", name: "Amanda Oliveira", cat: "Studio", text:
"Renovar um book não é refazer fotos — é reposicionar uma carreira. Para Amanda Oliveira, a House Mazzutti construiu um material que devolve à modelo o que o mercado precisa enxergar antes de marcá-la: presença, leitura corporal e versatilidade editorial. A direção criativa de Angelo Mazzutti desenhou cada quadro como um teste de mercado, e a produção executiva de Mateus Sacavem entregou o set pronto para sustentar a sequência. O resultado é um book que abre porta de cliente, não apenas álbum de imagens — uma ferramenta de trabalho que coloca Amanda em outra prateleira de seleção.",
    team: "Direção Criativa e Fotografia: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "02", name: "Ana Laura Saar", cat: "Studio", text:
"Cada modelo carrega uma assinatura — e a função do book é torná-la legível em segundos. Ana Laura Saar chegou ao studio com trajetória em construção e saiu com um material que comunica direção. A House Mazzutti tratou a sessão como leitura editorial: poses pensadas em cima de referência de mercado, beauty conduzido para não competir com o rosto, vídeo curto que sintetiza o eixo de imagem. A condução de Angelo Mazzutti e a produção executiva de Mateus Sacavem entregaram um book que faz Ana ser vista — e lembrada — pelo lado certo.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "03", name: "Chai e Dai", cat: "Studio", text:
"Trabalhar duas modelos no mesmo book exige outra geometria de direção — presença individual sem perder a sintonia da dupla. Para Chai e Dai, a House Mazzutti desenhou um set capaz de sustentar dois eixos visuais em paralelo: cada uma com sua leitura, ambas com a mesma assinatura editorial. Angelo Mazzutti dirigiu a sessão a partir do contraste, Mateus Sacavem coordenou o ritmo de produção para que nenhum quadro dependesse de improviso. O resultado é um book que apresenta as duas como conjunto e como individualidade — um material que abre conversas com clientes que pensam em campanha e em editorial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "04", name: "Débora Pantaglione", cat: "Studio", text:
"Renovar material é menos sobre repetir e mais sobre amadurecer. Débora Pantaglione voltou ao studio em um novo momento de carreira, e a House Mazzutti respondeu com um book que respeita essa transição — sem inflar, sem suavizar. A direção criativa de Angelo Mazzutti partiu da estrutura óssea e da força de olhar de Débora; a produção executiva de Mateus Sacavem garantiu fluxo de set, beauty e estilo conversando em uma só linha. O resultado é um book editorial que sustenta a próxima fase profissional dela — leitura imediata para quem seleciona elenco, autoridade para quem assina contrato.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "05", name: "Aniele Rockenbach", cat: "Studio", text:
"O book de uma modelo precisa entregar o que palavras não conseguem — temperatura, alcance, intenção. Para Aniele Rockenbach, a House Mazzutti construiu um material que abandona o retrato decorativo e assume a função de currículo visual. Sob direção criativa de Angelo Mazzutti, cada bloco da sessão respondeu a um nicho de mercado: editorial, comercial, fashion film. A produção executiva de Mateus Sacavem manteve o cronograma do set e a curadoria de equipe afinada. Aniele saiu com um book que se apresenta sozinho — e abre conversa antes mesmo do primeiro briefing.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "06", name: "Francine Massocco", cat: "Studio", text:
"Existe um tipo de book que abre porta — e outro que prende a atenção. A House Mazzutti se ocupa do segundo. Francine Massocco chegou pedindo material novo; saiu com um conjunto de imagens que reorganiza a leitura do mercado sobre ela. Angelo Mazzutti dirigiu a sessão a partir de uma proposta de presença mais editorial e menos óbvia; Mateus Sacavem coordenou a produção para que cada bloco tivesse acabamento de campanha. Sem fashion film desta vez — e nem precisou. O book carrega a tensão visual que se espera de uma modelo que vai entrar em outro nível de seleção.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Thyago Barriviera · Beauty: Rodrigo Frois" },

  { n: "07", name: "Anna Laura Alves", cat: "Studio", text:
"Cada renovação de material é uma decisão estratégica — não estética. Para Anna Laura Alves, a House Mazzutti tratou o book como reposicionamento: novas referências visuais, novo tratamento de luz, nova narrativa de carreira. A direção criativa de Angelo Mazzutti partiu de uma leitura da fase atual da modelo, e a produção executiva de Mateus Sacavem entregou um set sem ruído. O fashion film fecha o conjunto com movimento e atitude. Anna saiu com material que conversa com agências, marcas e direção de elenco — e que sustenta, em uma única apresentação, tudo que ela é capaz de entregar.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eduardo Evangelista" },

  { n: "08", name: "Gabriele Cruz", cat: "Studio", text:
"Gabriele Cruz é o tipo de modelo que ganha a câmera no primeiro frame — e a House Mazzutti dirigiu o book para amplificar exatamente isso. Angelo Mazzutti construiu uma sequência de quadros que alterna proximidade e distância, presença e silêncio. Mateus Sacavem conduziu a produção executiva com o ritmo necessário para que beauty, vídeo e direção criativa entregassem uma só assinatura. O resultado é um book denso, com mais de uma camada de leitura, capaz de circular entre cliente comercial, cliente editorial e direção de campanha sem perder coerência.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "09", name: "Ariely Farah", cat: "Studio", text:
"Tem material que documenta — e tem material que projeta. Ariely Farah procurou a House Mazzutti para o segundo. A direção criativa de Angelo Mazzutti partiu do que Ariely tem de mais raro: uma leitura calma, sustentada, que cresce no plano fechado. Mateus Sacavem coordenou a produção executiva com a equipe de beauty e vídeo costurada em torno desse ponto de força. O fashion film fecha o book com uma camada cinematográfica que devolve à modelo a oportunidade de ser dirigida — e não apenas fotografada. Um book de leitura adulta, para o próximo estágio de carreira.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "10", name: "Iasmin Passos", cat: "Studio", text:
"Existem rostos que pedem tempo — e existem rostos que pedem direção. Iasmin Passos pertence ao segundo grupo. A House Mazzutti construiu seu book a partir da intenção de tornar visível o que escapa em uma foto comum: a forma como Iasmin sustenta presença sem precisar performar. Angelo Mazzutti dirigiu a sessão em blocos de mercado distintos; Mateus Sacavem garantiu produção executiva impecável para que cada bloco tivesse acabamento próprio. O fashion film amplia o repertório. O book opera como apresentação completa: editorial, comercial, narrativo — pronto para circular em casting de alto nível.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "11", name: "Jamile Caroline Siewerdt", cat: "Studio", text:
"O bom book não vende a modelo — instala uma percepção. Para Jamile Caroline Siewerdt, a House Mazzutti desenhou um conjunto de imagens que reposiciona Jamile no radar de seleção: presença firme, leitura de mercado clara, fashion film com ritmo próprio. A direção criativa de Angelo Mazzutti partiu da observação da modelo em set, e a produção executiva de Mateus Sacavem alinhou beauty, vídeo e estilo em uma só linha narrativa. O resultado é um material que serve tanto para teste de campanha quanto para apresentação editorial — uma ferramenta de carreira, não um portfólio decorativo.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "12", name: "Jéssica Bittelbrunn", cat: "Studio", text:
"Renovar o book é uma decisão de mercado — e Jéssica Bittelbrunn chegou no momento certo. A House Mazzutti construiu uma sessão capaz de revelar três versões dela em um único material: a presença comercial direta, a sofisticação editorial e a leveza de fashion film. Angelo Mazzutti dirigiu a sessão a partir da naturalidade que Jéssica entrega em set; Mateus Sacavem coordenou a produção executiva com a precisão que um material multifacetado exige. O book devolve à modelo um conjunto de imagens que abre portas em mais de uma direção — e fecha apresentação com autoridade.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "13", name: "Júlia Moraes", cat: "Studio", text:
"Cada book é uma decisão sobre o que vai entrar na carreira da modelo — e o que vai ficar de fora. Para Júlia Moraes, a House Mazzutti tratou a sessão como recorte editorial: apenas o que sustenta a próxima fase. A direção criativa de Angelo Mazzutti partiu da força de presença de Júlia em planos fechados; Mateus Sacavem coordenou a produção executiva para que beauty e fashion film entregassem o mesmo eixo de leitura. O material entrega não só imagens — entrega autoridade visual. Júlia sai com um book que comunica intenção antes mesmo da apresentação.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Higino" },

  { n: "14", name: "Letícia Moraes", cat: "Studio", text:
"Letícia Moraes procurou a House Mazzutti em fase de virada — e o book responde a isso. Angelo Mazzutti dirigiu a sessão com foco em uma leitura visual mais madura, capaz de circular em casting editorial e comercial sem precisar de tradução. Mateus Sacavem conduziu a produção executiva com a precisão que essa transição exige: beauty contido, luz desenhada, vídeo que respira. O fashion film amarra o conjunto com narrativa. Letícia sai com material que sustenta sua próxima janela de mercado — não um book de manutenção, mas uma ferramenta de reposicionamento.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "15", name: "Maria Eduarda Borges", cat: "Studio", text:
"Tem modelo cuja presença não cabe num quadro só — pede direção. Maria Eduarda Borges chegou ao studio assim. A House Mazzutti construiu o book com a intenção de fixar essa amplitude em uma sequência editorial coerente. Angelo Mazzutti dirigiu a sessão a partir de gestos curtos, sem coreografia visível; Mateus Sacavem coordenou a produção executiva mantendo o ritmo de set ágil, sem perda de acabamento. Mesmo sem fashion film desta vez, o conjunto fotográfico entrega o que importa: uma modelo que apresenta repertório em silêncio. Um book que se sustenta sozinho diante de uma direção de elenco.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando" },

  { n: "16", name: "Bruna Brumer", cat: "Studio", text:
"Modelo experiente pede outro tipo de book — menos demonstração, mais assinatura. Para Bruna Brumer, a House Mazzutti dirigiu uma sessão que reorganiza a leitura do mercado sobre ela: presença adulta, sem rigidez; força sem dureza. Angelo Mazzutti construiu o eixo visual em torno de gestos sutis; Mateus Sacavem coordenou produção executiva, beauty e vídeo com o cuidado necessário para que cada bloco entregasse um nicho diferente. O fashion film fecha com camada cinematográfica. Bruna sai com material que abre conversa em outro patamar — editorial, campanha, narrativa.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eduardo Evangelista" },

  { n: "17", name: "Isabela Fezer", cat: "Studio", text:
"A renovação do material de Isabela Fezer começou pela leitura do que faltava: uma assinatura editorial mais firme. A House Mazzutti respondeu com um book que sustenta essa nova posição. Angelo Mazzutti dirigiu a sessão em torno do olhar — ponto forte de Isabela — e Mateus Sacavem alinhou produção executiva, beauty e vídeo para que essa força não se diluísse. O fashion film amplia o repertório com camada de movimento. Isabela sai com book que circula em casting editorial e comercial com mesma autoridade — um material que faz o trabalho de apresentação antes da apresentação acontecer.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "18", name: "Marina Machado", cat: "Studio", text:
"Marina Machado tem um tipo de presença que pede leitura editorial — e a House Mazzutti construiu o book exatamente nessa chave. Angelo Mazzutti dirigiu a sessão a partir de uma narrativa de calma e contenção; Mateus Sacavem garantiu produção executiva precisa, sem ruído na entrega. Beauty discreto, luz desenhada, foco em estrutura facial. O book de Marina não tenta vender — apresenta. E essa diferença, no mercado de seleção, separa um portfólio comum de uma ferramenta de carreira. Um material que sustenta editoriais densos e direções de campanha com a mesma autoridade.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "19", name: "Nataly Silva", cat: "Studio", text:
"Renovar book é tomar posição. Nataly Silva chegou ao studio em fase de virada, e a House Mazzutti dirigiu a sessão para sustentar essa nova etapa. Angelo Mazzutti construiu o eixo visual a partir da força de presença de Nataly em plano americano; Mateus Sacavem conduziu a produção executiva com o cuidado de manter beauty e luz alinhados a essa proposta. O book entrega o que o mercado precisa enxergar — leitura editorial sólida, versatilidade comercial — sem nenhuma camada de excesso. Nataly sai com material que reorganiza a percepção da carreira dela em uma única apresentação.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "20", name: "Patricia Marafon", cat: "Studio", text:
"Patricia Marafon procurou a House Mazzutti em busca de um material que respondesse à fase atual da carreira. A direção criativa de Angelo Mazzutti traduziu isso em um book de leitura adulta — sem cair em demonstração, sem economizar presença. Mateus Sacavem coordenou produção executiva, beauty e vídeo em torno do mesmo eixo. O fashion film fecha a sequência com camada cinematográfica. Patricia sai com book denso, capaz de sustentar editorial, comercial e direção de elenco com a mesma autoridade. Um material que faz o trabalho antes do briefing começar.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "21", name: "Pollyana Barreto", cat: "Studio", text:
"A renovação de book de Pollyana Barreto partiu de uma decisão clara: chegar mais firme em casting editorial. A House Mazzutti respondeu com sessão dirigida em torno de presença sustentada. Angelo Mazzutti construiu a sequência de quadros a partir do que Pollyana entrega sem performar; Mateus Sacavem manteve a produção executiva em ritmo de set profissional, beauty contido, vídeo com respiração. O fashion film fecha com camada de movimento. O resultado é um material que circula entre cliente direto, agência e direção de elenco — e abre conversas que um book genérico não abriria.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "22", name: "Sarah Henriches", cat: "Studio", text:
"Sarah Henriches tem presença que se desdobra em vários nichos — e o book precisava sustentar essa amplitude. A House Mazzutti dirigiu a sessão para entregar editorial, comercial e fashion film na mesma assinatura. Angelo Mazzutti partiu da observação da modelo em set; Mateus Sacavem conduziu a produção executiva alinhando beauty, luz e vídeo em um único eixo. O resultado é um material que apresenta Sarah em camadas — não em poses. Cada bloco do book responde a uma janela de mercado, e o fashion film amarra a apresentação com narrativa visual.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "23", name: "Vitória Brodt", cat: "Studio", text:
"Renovar material é trabalhar percepção. Para Vitória Brodt, a House Mazzutti construiu um book que devolve à modelo um conjunto de imagens com leitura editorial firme. Angelo Mazzutti dirigiu a sessão em torno da força facial e da presença contida de Vitória; Mateus Sacavem conduziu a produção executiva mantendo ritmo, beauty e luz em uma só linha. Sem fashion film desta vez — e o conjunto fotográfico sustenta sozinho. Vitória sai com material que apresenta a próxima fase da carreira com autoridade, pronto para circular em casting comercial e editorial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Hailton Hesse" },

  { n: "24", name: "Samara Same", cat: "Studio", text:
"Samara Same chegou à House Mazzutti em fase de construção de carreira. O book respondeu a isso com material que projeta — não documenta. Angelo Mazzutti dirigiu a sessão em torno da naturalidade que Samara entrega em set; Mateus Sacavem coordenou produção executiva, beauty e vídeo em torno do mesmo eixo de leitura. O fashion film fecha o conjunto com camada de movimento. O resultado é um book editorial e comercial, capaz de circular em casting de marca, agência e direção de elenco com a mesma assinatura — uma ferramenta de carreira, não uma coleção de imagens.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "25", name: "Francielle Reis", cat: "Studio", text:
"Para Francielle Reis, a House Mazzutti tratou o book como abertura de mercado. Angelo Mazzutti dirigiu e fotografou a sessão pessoalmente — uma decisão que reflete o tipo de leitura que o material exigia: presença firme, sem performar. Mateus Sacavem conduziu a produção executiva mantendo set, beauty e vídeo afinados em um só ritmo. O fashion film fecha a apresentação com camada cinematográfica. Francielle sai com book editorial que abre conversa em outro nível — não como material introdutório, mas como apresentação de uma modelo pronta para circular em casting de marca e direção de elenco.",
    team: "Direção Criativa e Fotografia: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Vídeo: Lucas Brando · Beauty: Felipe Azevedo" },

  { n: "26", name: "Emanuelly Terres", cat: "Studio", text:
"Emanuelly Terres tem a presença certa para campanha — e o book da House Mazzutti foi dirigido para tornar isso impossível de ignorar. Angelo Mazzutti construiu uma sequência de quadros que alterna leitura comercial e editorial, sustentando um eixo único de assinatura. Mateus Sacavem conduziu a produção executiva em torno de uma linha de beauty discreta e luz desenhada. O book de Emanuelly entrega versatilidade sem confusão narrativa — cada bloco responde a um nicho de mercado, e o conjunto sustenta uma apresentação de modelo pronta para encarar casting de campanha nacional.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  // ============ STUDIO — ENSAIO PESSOAL ============
  { n: "27", name: "Andressa Gomiero", cat: "Studio", text:
"Um ensaio pessoal não documenta um momento — instala uma percepção. Para Andressa Gomiero, a House Mazzutti tratou o trabalho como construção de imagem própria: o ensaio entrega à cliente o registro adulto de uma fase em transformação. Angelo Mazzutti dirigiu a sessão a partir da leitura do que Andressa queria sustentar para frente — e do que precisava deixar para trás. Mateus Sacavem coordenou produção executiva, beauty e vídeo com a precisão necessária para um trabalho íntimo. O resultado é um material editorial que serve tanto à esfera pessoal quanto à apresentação pública — uma assinatura visual da próxima etapa.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "28", name: "Fernanda Treml", cat: "Studio", text:
"Médica em fase de consolidação profissional precisa de imagem que sustente autoridade sem rigidez. Fernanda Treml procurou a House Mazzutti exatamente para isso. Angelo Mazzutti dirigiu o ensaio em torno de uma narrativa que combina presença feminina e autoridade técnica — sem cair em estereótipo de qualquer lado. Mateus Sacavem coordenou a produção executiva mantendo o set fluido, beauty alinhado, luz desenhada para projetar leitura adulta. O ensaio entrega à Fernanda um banco de imagens que cobre apresentação institucional, redes próprias e materiais profissionais — uma imagem que sustenta a próxima década de carreira.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "29", name: "Nairícia Caberlon", cat: "Studio", text:
"Há momentos da vida que pedem mais do que registro — pedem direção. O ensaio Hall of Fame de Nairícia Caberlon foi conduzido pela House Mazzutti com esse cuidado. Angelo Mazzutti dirigiu a sessão como narrativa visual: cada quadro respondendo a uma camada da trajetória dela. Mateus Sacavem coordenou produção executiva, beauty e vídeo para que nada competisse com a protagonista. O resultado é um ensaio editorial denso, que sustenta a celebração de uma fase de vida — sem caricatura, sem teatralidade. Nairícia sai com material que se torna parte da própria história, não apenas memória dela.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "30", name: "Thaisi Dias", cat: "Studio", text:
"Concurso de miss é decidido muito antes do palco — começa na construção da imagem. Para Thaisi Dias, a House Mazzutti tratou o ensaio como ferramenta estratégica de concurso. Angelo Mazzutti dirigiu a sessão a partir de referências editoriais de Miss internacional, traduzindo essas referências para a presença de Thaisi. Mateus Sacavem conduziu a produção executiva com a precisão que esse tipo de material exige — beauty afinado, luz desenhada, vídeo de apresentação. O ensaio entrega o banco de imagens que sustenta inscrição, divulgação e presença institucional. Uma imagem que projeta autoridade muito antes do julgamento.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "31", name: "Brenda Mattos", cat: "Studio", text:
"Brenda Mattos entrou no studio em fase de preparação para concurso de miss — e a House Mazzutti respondeu com ensaio que sustenta a próxima etapa da trajetória. Angelo Mazzutti dirigiu a sessão a partir da leitura de presença que Brenda entrega em set. Mateus Sacavem coordenou a produção executiva alinhando beauty, vídeo e estilo em uma só linha narrativa. O ensaio editorial entrega à Brenda um banco de imagens que circula em comissões, redes próprias e divulgação institucional. Mais do que registro: um material que reposiciona a candidata em outro patamar de leitura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "32", name: "Gustavo Viotto", cat: "Studio", text:
"Jornalista precisa de imagem que sustente autoridade pública sem teatralidade. Gustavo Viotto procurou a House Mazzutti com esse pedido — e Angelo Mazzutti assumiu pessoalmente a direção criativa e a fotografia. Mateus Sacavem conduziu a produção executiva e capturou o vídeo, fechando um set enxuto e de alta precisão. O ensaio entrega ao Gustavo um banco de imagens editorial e institucional, capaz de circular em coluna, vídeo de abertura e apresentação corporativa com a mesma assinatura. Uma imagem adulta, sustentada — pronta para acompanhar a próxima fase da carreira jornalística.",
    team: "Direção Criativa e Fotografia: Angelo Mazzutti · Produção Executiva e Vídeo: Mateus Sacavem" },

  { n: "33", name: "Paula Assunção", cat: "Studio", text:
"Construir imagem de candidata a miss é trabalhar a percepção antes da disputa. Paula Assunção chegou à House Mazzutti com esse desafio. Angelo Mazzutti dirigiu o ensaio a partir de referências editoriais internacionais, e Mateus Sacavem conduziu a produção executiva com o ritmo de set que esse tipo de material exige. Beauty pensado para sustentar autoridade e doçura na mesma imagem, luz desenhada para retrato editorial. O ensaio entrega à Paula um banco de imagens que circula em divulgação, redes próprias e apresentação institucional — uma ferramenta de competição, não apenas registro.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Raul" },

  { n: "34", name: "Caroline Costa", cat: "Studio", text:
"Ensaio pessoal com pets pede outra geometria de direção — vínculo afetivo virando narrativa visual. Para Caroline Costa, a House Mazzutti construiu uma sessão que dá a mesma dignidade editorial à dona e aos cães. Angelo Mazzutti dirigiu o ensaio em torno de uma narrativa íntima, sem composição artificial. Mateus Sacavem conduziu a produção executiva ajustando luz, set e ritmo para garantir presença espontânea. O resultado é um ensaio editorial que reposiciona a relação afetiva como assinatura visual — não foto fofa, mas retrato de família contemporâneo, denso e bem direcionado.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Rodrigo Frois" },

  { n: "35", name: "Leif Sinclar", cat: "Studio", text:
"Ensaio masculino editorial pede direção firme — sem cair em pose de catálogo, sem perder presença. Leif Sinclar procurou a House Mazzutti em fase de construção de imagem própria. Angelo Mazzutti dirigiu a sessão em torno de uma narrativa adulta e contemporânea: postura, olhar, silêncio, sem performar masculinidade. Mateus Sacavem coordenou a produção executiva alinhando beauty, vídeo e luz nesse mesmo eixo. O ensaio entrega ao Leif um banco de imagens editorial, capaz de circular em redes próprias, apresentação institucional e composição de portfólio profissional. Uma imagem sustentada, sem necessidade de explicação.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Higino" },

  { n: "36", name: "Rebeca Cabral", cat: "Studio", text:
"Mulher de negócios precisa de imagem que sustente autoridade sem rigidez. Para Rebeca Cabral, a House Mazzutti construiu o ensaio Business como ferramenta estratégica — não como retrato corporativo. Angelo Mazzutti dirigiu a sessão a partir de uma leitura editorial da presença executiva contemporânea. Mateus Sacavem coordenou a produção executiva alinhando beauty discreto, luz desenhada e vídeo institucional. O resultado é um banco de imagens que circula em LinkedIn, site, palestra e apresentação de negócios com mesma assinatura — uma imagem adulta, contemporânea, pronta para sustentar a próxima fase de posicionamento profissional.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "37", name: "Cynthia Andrade", cat: "Studio", text:
"O ensaio Business de Cynthia Andrade foi tratado pela House Mazzutti como reposicionamento de imagem executiva — não retrato institucional. Angelo Mazzutti dirigiu a sessão em torno de uma leitura adulta e contemporânea da presença feminina nos negócios: força, postura, sem teatralidade. Mateus Sacavem coordenou a produção executiva alinhando beauty, vídeo e set em uma só linha. O ensaio entrega à Cynthia um banco de imagens editorial e institucional, capaz de sustentar LinkedIn, site profissional, palestra e materiais corporativos com mesma assinatura — uma imagem que conversa de igual para igual com o tipo de cliente que ela quer atrair.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "38", name: "Maria Tereza Abdo", cat: "Studio", text:
"Ensaio pessoal feito com cuidado editorial vira parte da história — não apenas registro dela. Para Maria Tereza Abdo, a House Mazzutti dirigiu uma sessão que privilegia a presença e o silêncio acima da pose. Angelo Mazzutti construiu o eixo visual em torno da leitura facial de Maria Tereza; Mateus Sacavem conduziu a produção executiva com o ritmo necessário para um trabalho íntimo, sem ruído de set. Beauty contido, luz desenhada. O resultado é um banco de imagens editorial que sustenta apresentação pessoal e profissional com a mesma assinatura — material para guardar e para circular.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "39", name: "Samara Sama", cat: "Studio", text:
"Construir imagem de candidata a miss é instalar autoridade visual antes da disputa. Samara Sama procurou a House Mazzutti para sustentar essa preparação. Angelo Mazzutti dirigiu o ensaio em torno de uma narrativa editorial internacional, e Mateus Sacavem coordenou a produção executiva com a precisão de set que esse material exige. Beauty afinado para sustentar dupla leitura — autoridade e elegância. O ensaio entrega à Samara um banco de imagens denso, capaz de circular em divulgação, comissão, mídia e apresentação institucional. Uma ferramenta estratégica que reposiciona a candidata muito antes da passarela.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "40", name: "Deise Smaniotto", cat: "Studio", text:
"Trabalhar com profissionais do próprio setor de imagem exige outra camada de cuidado — a expectativa é técnica. Para Deise Smaniotto, a House Mazzutti construiu o ensaio pessoal em torno de presença adulta e leitura editorial firme. Angelo Mazzutti dirigiu a sessão a partir da postura natural de Deise em set; Mateus Sacavem coordenou a produção executiva mantendo beauty, luz e vídeo afinados em uma só linha. O ensaio entrega à Deise um banco de imagens editorial que circula em redes próprias, apresentação profissional e materiais institucionais com mesma assinatura. Uma imagem que sustenta autoridade sem teatralidade.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eduardo Evangelista" },

  { n: "41", name: "Marjorie Rossi", cat: "Studio", text:
"O ensaio pessoal de Marjorie Rossi foi conduzido pela House Mazzutti como leitura editorial — não retrato decorativo. Angelo Mazzutti dirigiu a sessão em torno da força de presença de Marjorie em planos fechados; Mateus Sacavem coordenou a produção executiva alinhando beauty, luz e set em uma só linha. O resultado é um banco de imagens denso, capaz de sustentar apresentação pessoal e profissional com a mesma assinatura. Mais do que registro: um material que reposiciona a percepção sobre Marjorie em uma única apresentação — adulto, contemporâneo, editorial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos" },

  { n: "42", name: "Simony", cat: "Studio", text:
"Trabalhar com uma figura pública consolidada é trabalhar memória coletiva — sem deixar que ela engesse o presente. Para Simony, a House Mazzutti dirigiu um ensaio pessoal que devolve à artista uma leitura editorial contemporânea da própria imagem. Angelo Mazzutti partiu da presença carismática que Simony entrega em set, sem caricatura, sem nostalgia. Mateus Sacavem coordenou produção executiva, beauty e vídeo com o cuidado que esse tipo de material exige. O ensaio entrega à Simony um banco de imagens editorial atual — pronto para sustentar apresentação pessoal, profissional e institucional com a mesma assinatura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "43", name: "Fernanda Costas", cat: "Studio", text:
"O ensaio pessoal de Fernanda Costas foi conduzido pela House Mazzutti em torno de uma narrativa editorial sustentada — presença adulta, sem rigidez. Angelo Mazzutti dirigiu a sessão a partir da leitura facial e da postura de Fernanda; Mateus Sacavem coordenou a produção executiva mantendo beauty, luz e vídeo alinhados em uma só linha. O resultado é um banco de imagens editorial que circula em apresentação profissional, materiais pessoais e redes próprias com a mesma assinatura. Um ensaio que faz o trabalho de reposicionar a percepção sobre Fernanda — e que sustenta a próxima fase de imagem dela com autoridade.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "44", name: "Mileide Mihaile", cat: "Studio", text:
"Empresária e figura pública com base de milhões precisa de imagem que sustente leitura editorial atual — não apenas presença de rede. Mileide Mihaile procurou a House Mazzutti em fase de reposicionamento. Angelo Mazzutti dirigiu o ensaio a partir da combinação que Mileide entrega em set: feminilidade firme, autoridade serena. Mateus Sacavem coordenou a produção executiva alinhando beauty, vídeo e estilo a esse eixo. O ensaio entrega à Mileide um banco de imagens editorial denso, capaz de sustentar campanhas próprias, apresentação institucional e mídia com mesma assinatura — uma imagem que conversa com a fase atual da carreira dela.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Eliseu Almeida" },

  { n: "45", name: "Talita Dalbó (Birthday Shooting)", cat: "Studio", text:
"Aniversário é marco — mas pode ser narrativa. Para Talita Dalbó, a House Mazzutti tratou o birthday shooting como ensaio editorial de transição: marca a data, sustenta a fase. Angelo Mazzutti dirigiu a sessão em torno de uma narrativa visual cinematográfica — luz desenhada, beauty contemporâneo, presença adulta. Mateus Sacavem coordenou a produção executiva mantendo set, vídeo e estilo afinados em uma só linha. O ensaio entrega à Talita um banco de imagens editorial que se torna parte da memória — e da apresentação pública — desse marco pessoal. Mais do que celebração: assinatura visual da próxima década.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nathan Cruz" },

  // ============ PRODUTORA — CAMPANHAS ============
  { n: "46", name: "Bárbara Porto", cat: "Produtora", text:
"Marca de acessório vive ou morre pela imagem — e a Bárbara Porto procurou a House Mazzutti para sustentar a próxima fase de posicionamento. Angelo Mazzutti dirigiu a campanha a partir de uma leitura editorial dos produtos: peças tratadas como objetos de desejo, não como inventário. Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha narrativa. A modelagem do set sustentou uma campanha com circulação dupla — comercial e editorial — capaz de abrir espaço em mídia, ponto de venda e canal próprio com a mesma assinatura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nathan · Modelo: Talita Dalbó" },

  { n: "47", name: "Camila Scarpa", cat: "Produtora", text:
"Marca de acessório que entra em outra fase pede campanha com leitura editorial firme. Camila Scarpa procurou a House Mazzutti com essa demanda. Angelo Mazzutti dirigiu a campanha em torno de uma narrativa adulta dos produtos — peças apresentadas em contexto, não em vitrine. Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, stylist e ambiente em uma só linha. O resultado é uma campanha capaz de circular em mídia editorial, canal próprio e ponto de venda com mesma assinatura. Uma imagem de marca que reposiciona a percepção sobre a Camila Scarpa.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Beauty: Hailton Hasse · Modelo: Rayssa Moseli · Stylist: Rapha Mendonça" },

  { n: "48", name: "Poema", cat: "Produtora", text:
"Sapato é objeto sensorial — campanha de calçado precisa traduzir isso em imagem. Para a Poema, a House Mazzutti dirigiu uma campanha editorial em que o produto carrega a narrativa sem precisar de explicação. Angelo Mazzutti construiu o eixo visual em torno do movimento e da textura; Mateus Sacavem coordenou a produção executiva alinhando elenco, set, beauty e estilo em uma só linha de leitura. O resultado é uma campanha que sustenta circulação em mídia editorial, ponto de venda e canal próprio com a mesma assinatura — uma imagem que reposiciona a Poema em outro patamar de marca.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Thyago Barriviera · Vídeo: Rebeca Cabral · Beauty: Débora · Modelo: Rafaela Andrade · Stylist: Deise Smaniotto" },

  { n: "49", name: "PontoK", cat: "Produtora", text:
"Marca de acessório que quer escala precisa de campanha com leitura editorial firme — sem perder apelo comercial. Para a PontoK, a House Mazzutti construiu uma campanha que conversa nas duas frentes. Angelo Mazzutti dirigiu a sessão em torno de uma narrativa visual contemporânea, com o produto tratado como objeto de desejo. Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha de assinatura. O resultado é uma campanha capaz de sustentar circulação em mídia, ponto de venda e canal próprio com mesma autoridade — uma imagem que reposiciona a percepção sobre a marca.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Thyago Barriviera · Beauty: Andre Mattos · Modelo: Emanuelly Terres" },

  { n: "50", name: "Signus Eyewear", cat: "Produtora", text:
"A Signus Indústria Óptica produz mais de 100 mil peças por mês e desenvolve coleções com DNA brasileiro — uma marca que pede campanha à altura. A House Mazzutti dirigiu a Signus Eyewear como narrativa editorial: óculos tratados como assinatura, não como item. Angelo Mazzutti construiu o eixo visual a partir do contraste entre presença facial e geometria das armações; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha. O resultado é uma campanha que sustenta circulação em mídia editorial, canal de óticas e ponto de venda com a mesma assinatura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Neto Lins · Vídeo: Thyago Barriviera · Beauty: Rodrigo Frois · Modelo: Isnia Machado · Stylist: Deise Smaniotto" },

  { n: "51", name: "Versolato Eyewear", cat: "Produtora", text:
"A Versolato chegou ao mercado como nova marca do grupo Signus com proposta clara — design autoral, sofisticação contemporânea, leitura editorial de fashion brasileira. A House Mazzutti dirigiu a campanha de lançamento à altura desse posicionamento. Angelo Mazzutti construiu uma narrativa visual em que cada armação é apresentada como peça de assinatura; Mateus Sacavem coordenou a produção executiva com a precisão necessária para um lançamento de marca. A presença de Gianne Albertoni, top model brasileira com mais de 30 anos de carreira internacional, sustenta a leitura adulta e cosmopolita da Versolato. Campanha de inauguração — e de instalação de percepção.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Thyago Barriviera · Vídeo: Caio Marcandali · Beauty: Andre Mattos · Modelo: Gianne Albertoni · Stylist: Deise Smaniotto" },

  { n: "52", name: "Signus Eyewear (2026)", cat: "Produtora", text:
"A continuidade de uma marca pede consistência de assinatura — sem repetir. Para a nova coleção 2026 da Signus Eyewear, a House Mazzutti dirigiu uma campanha que dialoga com a anterior e abre o próximo capítulo. Angelo Mazzutti construiu uma narrativa visual mais adulta, com Gianne Albertoni sustentando uma leitura editorial cosmopolita. Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha. A campanha entrega à Signus material com circulação em mídia editorial, canal de óticas e ponto de venda — sustentando a marca como referência de design brasileiro em armação.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Neto Lins · Vídeo: Thyago Barriviera · Beauty: Andre Mattos · Modelo: Gianne Albertoni" },

  { n: "53", name: "Vertz Eyewear", cat: "Produtora", text:
"A Vertz é uma das marcas do portfólio da Signus Indústria Óptica — e pede campanha que sustente um eixo próprio dentro do conjunto. A House Mazzutti dirigiu a sessão em torno de uma leitura editorial mais jovem e direta. Angelo Mazzutti construiu o eixo visual a partir da força da modelo em planos fechados; Mateus Sacavem coordenou a produção executiva alinhando fashion film, beauty e set em uma só linha narrativa. O resultado é uma campanha que apresenta a Vertz com personalidade distinta, capaz de circular em mídia editorial, canal de óticas e ponto de venda sem se diluir no portfólio do grupo.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Neto Lins · Vídeo: Thyago Barriviera · Beauty: Rodrigo Frois · Modelo: Ivia · Stylist: Deise Smaniotto" },

  { n: "54", name: "Elyah", cat: "Produtora", text:
"Marca de acessório que entra em outra fase precisa de campanha com leitura editorial sustentada — não apenas catálogo de produto. Para a Elyah, a House Mazzutti dirigiu uma sessão em que a peça aparece como assinatura, não como item de inventário. Angelo Mazzutti construiu o eixo visual em torno de uma narrativa adulta e contemporânea; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha. A campanha entrega à Elyah um banco de imagens denso, capaz de sustentar mídia editorial, canal próprio e ponto de venda com mesma assinatura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nathan · Modelo: Talita Dalbó" },

  { n: "55", name: "Fiamma Eyewear", cat: "Produtora", text:
"A Fiamma é uma das marcas do grupo Signus, com proposta autoral em armação. A House Mazzutti dirigiu a campanha a partir de uma leitura editorial direta — armação tratada como acessório de assinatura, não como utilidade. Angelo Mazzutti construiu o eixo visual em torno da geometria das peças e da presença do modelo. Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha narrativa. A campanha entrega à Fiamma um banco de imagens capaz de sustentar canal de óticas, mídia editorial e ponto de venda com mesma assinatura — instalando a marca em outro patamar de percepção.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Neto Lins · Vídeo: Thyago Barriviera · Beauty: Rodrigo Frois · Modelo: Gabriel · Stylist: Deise Smaniotto" },

  { n: "56", name: "Lavorato Eyewear", cat: "Produtora", text:
"A Lavorato Eyewear faz parte do portfólio da Signus Indústria Óptica — uma marca que pede leitura editorial feminina firme. A House Mazzutti dirigiu a campanha em torno de uma narrativa editorial adulta, com a modelo Erica Redling sustentando o eixo de presença. Angelo Mazzutti construiu cada quadro a partir do diálogo entre geometria da armação e estrutura facial; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha. A campanha entrega à Lavorato banco de imagens denso, com circulação em mídia editorial, ponto de venda e canal de óticas com mesma assinatura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Neto Lins · Vídeo: Thyago Barriviera · Beauty: Rodrigo Frois · Modelo: Erica Redling · Stylist: Deise Smaniotto" },

  { n: "57", name: "Mônica Costa Jewelry", cat: "Produtora", text:
"Joalheria pede outra camada de cuidado em campanha — a peça é pequena, a leitura precisa ser densa. Para a Mônica Costa Jewelry, a House Mazzutti dirigiu uma campanha em que cada joia é tratada como objeto autoral. Angelo Mazzutti construiu o eixo visual em torno do contraste entre pele, luz e metal; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e fashion film em uma só linha. A modelo Gabriele Cruz sustenta a presença editorial. A campanha entrega à Mônica Costa Jewelry banco de imagens denso, com circulação em mídia editorial, canal próprio e ponto de venda com mesma assinatura — uma joalheria apresentada com autoridade.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos · Modelo: Gabriele Cruz" },

  { n: "58", name: "Jean Pierre", cat: "Produtora", text:
"A Jean Pierre é uma das marcas históricas do portfólio Signus — uma assinatura que pede continuidade editorial firme. A House Mazzutti dirigiu a campanha a partir de uma leitura adulta e contemporânea da marca. Angelo Mazzutti construiu o eixo visual em torno da relação entre presença feminina e geometria da armação; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha. A campanha entrega à Jean Pierre banco de imagens com circulação em canal de óticas, mídia editorial e ponto de venda — uma marca que sustenta autoridade no mercado óptico nacional.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Neto Lins · Vídeo: Thyago Barriviera · Beauty: Rodrigo Frois · Modelo: Jessica Vieira · Stylist: Deise Smaniotto" },

  { n: "59", name: "Alletto Skinlab", cat: "Produtora", text:
"Marca de skincare precisa de campanha que traduza a promessa do produto em imagem — pele tratada, leitura sensorial, presença adulta. Para a Alletto Skinlab, a House Mazzutti operou em modelagem enxuta: Angelo Mazzutti assumiu pessoalmente direção criativa e fotografia, em um set conduzido pela produção executiva de Mateus Sacavem. A campanha foi dirigida em torno de uma narrativa visual mínima — sem ruído, sem excesso — para que cada quadro entregue o que importa na categoria: textura, luz, autoridade. O resultado é um banco de imagens editorial capaz de sustentar lançamento, mídia, ponto de venda e canal próprio com mesma assinatura — uma marca de skincare instalada como referência.",
    team: "Direção Criativa e Fotografia: Angelo Mazzutti · Produção Executiva: Mateus Sacavem" },

  { n: "60", name: "Sensi · Jequiti", cat: "Produtora", text:
"A Jequiti, marca do Grupo Silvio Santos, é uma das maiores plataformas de cosméticos do Brasil — e a campanha Sensi precisava sustentar essa escala com leitura editorial firme. A House Mazzutti operou em coordenação direta com a marca: Angelo Mazzutti construiu o eixo de direção criativa, Mateus Sacavem conduziu a produção executiva, fotografia de Brunico e beauty de Eliseu Almeida. A narrativa partiu da presença feminina contemporânea, com Barbara e Samara Same sustentando o eixo visual. A entrega serve à circulação nacional da marca: catálogo, ponto de venda, comissão e mídia — uma campanha à altura da escala em que a Jequiti opera.",
    team: "Produção Executiva: Mateus Sacavem · Direção: House Mazzutti · Fotografia: Brunico · Beauty: Eliseu Almeida · Modelos: Barbara, Samara Same" },

  { n: "61", name: "Larissa Manoela · Océane", cat: "Produtora", text:
"A linha Larissa Manoela by Océane — primeira marca de maquiagem assinada pela atriz, com base de milhões em redes próprias — foi lançada sob a premissa \"ser livre para ser várias\". A House Mazzutti dirigiu a campanha em torno dessa narrativa: presença múltipla, leitura editorial sustentada. Angelo Mazzutti construiu o eixo visual da sessão; Mateus Sacavem coordenou a produção executiva mantendo set, vídeo e beauty em uma só linha. A campanha entrega à Océane material capaz de sustentar lançamento nacional, mídia, comunicação da artista e ponto de venda — instalando a coleção como categoria autoral, não apenas como assinatura de celebridade.",
    team: "Produção Executiva: Mateus Sacavem · Direção: House Mazzutti · Fotografia: Ita Mazzutti · Vídeo: Vitor Terra · Talento: Larissa Manoela" },

  { n: "62", name: "Beatco", cat: "Produtora", text:
"Moda fitness vive de leitura visual — o produto precisa parecer extensão do corpo, não uniforme. Para a Beatco, a House Mazzutti dirigiu campanha que traduz performance em editorial. Angelo Mazzutti construiu o eixo visual a partir do movimento e da textura; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha narrativa. A modelo Talita Dalbó sustenta a presença editorial adulta. A campanha entrega à Beatco um banco de imagens denso, com circulação em mídia, e-commerce e ponto de venda com mesma assinatura — uma marca de fitness apresentada com autoridade editorial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nathan · Modelo: Talita Dalbó" },

  { n: "63", name: "Pous", cat: "Produtora", text:
"Lookbook não é catálogo — é apresentação de mundo de marca. Para a Pous, a House Mazzutti dirigiu uma sessão que sustenta essa diferença. Angelo Mazzutti construiu o eixo visual a partir do diálogo entre coleção, modelo e ambiente; Mateus Sacavem coordenou a produção executiva alinhando elenco e set em uma só linha. O resultado é um lookbook editorial que apresenta a Pous com leitura adulta e contemporânea, capaz de circular em mídia editorial, canal próprio e ponto de venda. Uma coleção apresentada com a densidade que diferencia marca de produto — Pous instalada como autoridade visual, não apenas como entrega comercial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Thyago Barriviera · Vídeo: Rebeca Cabral · Modelo: Deise Smaniotto" },

  { n: "64", name: "Toli", cat: "Produtora", text:
"Coleção nova pede campanha que apresente o universo da marca — não apenas as peças. Para a Toli, a House Mazzutti dirigiu uma sessão editorial em que a coleção aparece com leitura própria. Angelo Mazzutti construiu o eixo visual em torno do diálogo entre estilo, modelagem e presença da modelo; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, stylist e set em uma só linha. A campanha entrega à Toli banco de imagens denso, capaz de sustentar mídia editorial, ponto de venda, e-commerce e canal próprio com mesma assinatura — uma coleção apresentada com autoridade visual.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos · Modelo: Jaquelini Bertan · Stylist: Juciléia" },

  { n: "65", name: "Unique Chic", cat: "Produtora", text:
"Marca de moda que entra em fase de reposicionamento pede campanha com leitura editorial sustentada. Para a Unique Chic, a House Mazzutti dirigiu uma sessão em que a coleção apresenta uma narrativa própria, sem apoio em catálogo. Angelo Mazzutti construiu o eixo visual em torno da combinação entre estilo da peça e presença da modelo; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha. A campanha entrega à Unique Chic banco de imagens denso, com circulação em mídia editorial, e-commerce e ponto de venda — uma coleção apresentada com autoridade, não apenas como item de inventário.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nathan · Modelo: Talita Dalbó" },

  { n: "66", name: "Idrissi", cat: "Produtora", text:
"Marca de moda em construção pede campanha que instale percepção — não apenas apresente produto. Para a Idrissi, a House Mazzutti dirigiu uma sessão editorial densa, capaz de servir como instalação de assinatura visual. Angelo Mazzutti construiu o eixo visual em torno da combinação entre coleção, modelo e ambiente; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty, fashion film e estilo em uma só linha narrativa. A campanha entrega à Idrissi banco de imagens com circulação em mídia editorial, canal próprio e ponto de venda — uma coleção apresentada como universo de marca, não apenas como inventário comercial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Andre Mattos · Modelo: Fernanda Diolive" },

  { n: "67", name: "Splash Boutique", cat: "Produtora", text:
"Boutique pede outra camada de assinatura na campanha — o cliente compra curadoria, não apenas produto. Para a Splash Boutique, a House Mazzutti dirigiu uma sessão editorial em que a coleção aparece como recorte autoral. Angelo Mazzutti construiu o eixo visual em torno da relação entre estilo, ambiente e presença; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha narrativa. A campanha entrega à Splash Boutique banco de imagens denso, capaz de sustentar mídia editorial, redes próprias e ponto de venda — uma curadoria apresentada com autoridade visual.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: House Mazzutti" },

  { n: "68", name: "Five Senses Resort", cat: "Produtora", text:
"Resort de alto padrão vende experiência — campanha institucional precisa traduzir isso em narrativa visual. Para o Five Senses Resort, a House Mazzutti dirigiu uma campanha institucional em que o lugar aparece como atmosfera, não como inventário. Angelo Mazzutti construiu o eixo visual em torno da relação entre cenário, presença e luz natural; Mateus Sacavem assumiu a direção e produção executiva assegurando ritmo de set em locação. A campanha entrega ao Five Senses Resort um banco de imagens institucional denso, capaz de sustentar comunicação digital, materiais corporativos e mídia editorial — uma marca de hospitalidade apresentada com autoridade.",
    team: "Direção Criativa e Produção Executiva: Angelo Mazzutti · Fotografia: Ita Mazzutti · Vídeo: Vitor Terra · Beauty: Everson Rocha · Modelo: Nakamura" },

  { n: "69", name: "Dumond", cat: "Produtora", text:
"A Dumond opera no mercado desde 1992 e exporta para mais de 50 países — uma marca de calçado feminino que pede campanha à altura. A House Mazzutti dirigiu a sessão em torno de uma leitura editorial adulta dos produtos. Angelo Mazzutti construiu o eixo visual a partir da combinação entre textura, luz e movimento; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha narrativa. A campanha entrega à Dumond banco de imagens capaz de sustentar mídia editorial, ponto de venda e canal próprio com a mesma assinatura — uma marca de calçado posicionada com autoridade visual.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Beauty: Allysson Chinalia" },

  { n: "70", name: "We Pink × Virginia Fonseca × Zé Felipe", cat: "Produtora", text:
"A We Pink, fundada por Virginia Fonseca em 2021, ultrapassou R$ 1,3 bilhão em faturamento e opera mais de 250 pontos físicos. Campanha de marca dessa escala pede direção que sustente a presença do casal sem perder o foco no produto. A House Mazzutti dirigiu a sessão como narrativa de marca contemporânea: Virginia e Zé Felipe em leitura editorial, produto tratado como autoridade. Angelo Mazzutti construiu o eixo visual; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha. A campanha entrega à We Pink banco de imagens capaz de sustentar live commerce, mídia, redes próprias e ponto de venda na escala em que a marca opera.",
    team: "Direção Criativa: Ita Mazzutti · Produção Executiva: Angelo Mazzutti · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nikolas Beauty · Talentos: Virginia Fonseca, Zé Felipe" },

  { n: "71", name: "We Pink × Virginia Fonseca × Gabriela Versiani", cat: "Produtora", text:
"A We Pink construiu uma das maiores operações de cosmético do país — e suas campanhas precisam sustentar percepção à altura desse alcance. Para a sessão com Virginia Fonseca e Gabriela Versiani — modelo e criadora de base milionária —, a House Mazzutti dirigiu uma campanha de produto com leitura editorial sustentada. Angelo Mazzutti conduziu a produção executiva alinhando elenco, beauty e set em uma só linha; Mateus Sacavem operou a coordenação de set; Ita Mazzutti assumiu a fotografia. A campanha entrega à We Pink material capaz de circular em live commerce, mídia, comunicação própria e ponto de venda — sustentando a marca como referência de cosmético brasileiro.",
    team: "Produção Executiva: Angelo Mazzutti · Direção: House Mazzutti · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Beauty: Nikolas Beauty · Talentos: Virginia Fonseca, Gabriela Versiani" },

  { n: "72", name: "Adriane Galisteu · Jequiti", cat: "Produtora", text:
"A parceria entre Adriane Galisteu e Jequiti ultrapassa uma década — uma das mais longevas da perfumaria nacional. Para a nova campanha, a House Mazzutti operou em torno de uma leitura editorial adulta da apresentadora. Angelo Mazzutti construiu o eixo de direção criativa privilegiando presença e elegância; Mateus Sacavem conduziu a produção executiva alinhando elenco, set e ritmo de captação; a fotografia ficou a cargo de Monteiro. A campanha entrega à Jequiti banco de imagens denso, capaz de circular em catálogo, comissão, mídia e ponto de venda com a mesma assinatura — sustentando a continuidade de uma das parcerias mais sólidas do mercado brasileiro de fragrância.",
    team: "Produção Executiva: Mateus Sacavem · Direção: House Mazzutti · Fotografia: Monteiro · Talento: Adriane Galisteu" },

  { n: "73", name: "Natália Beauty", cat: "Produtora", text:
"Beauty contemporâneo pede campanha que devolva à marca a autoridade da própria assinatura. Para a Natália Beauty, a House Mazzutti dirigiu uma sessão editorial em torno da leitura adulta do produto. Angelo Mazzutti construiu o eixo visual em torno da relação entre presença, textura e luz; Mateus Sacavem coordenou a produção executiva alinhando elenco, set e fashion film em uma só linha. A campanha entrega à Natália Beauty banco de imagens capaz de sustentar mídia, ponto de venda e canal próprio com a mesma assinatura — uma marca de beauty apresentada como categoria autoral, não apenas como portfólio de produto.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando · Talento: Natália Beauty" },

  { n: "74", name: "Larissa Manoela · Jequiti", cat: "Produtora", text:
"Larissa Manoela construiu uma das fragrâncias mais bem-sucedidas da Jequiti, com várias coleções lançadas ao longo dos anos — uma parceria que se sustenta pela consistência de imagem. Para a nova campanha, a House Mazzutti operou em torno de uma leitura adulta da artista. Angelo Mazzutti construiu o eixo de direção criativa em torno de presença e narrativa; Mateus Sacavem conduziu a produção executiva alinhando elenco, set e ritmo de captação; fotografia de Brunico e vídeo de Monteiro fecharam a entrega. A campanha entrega à Jequiti banco de imagens capaz de circular em catálogo, comissão, mídia e ponto de venda — sustentando a continuidade de uma das marcas mais fortes da perfumaria brasileira.",
    team: "Produção Executiva: Mateus Sacavem · Direção: House Mazzutti · Fotografia: Brunico · Vídeo: Monteiro · Talento: Larissa Manoela" },

  { n: "75", name: "Ana Castela · Jequiti", cat: "Produtora", text:
"Ana Castela quebrou recordes de pré-venda em sua primeira parceria com a Jequiti — uma campanha que precisava traduzir o universo da artista em narrativa visual de marca. A House Mazzutti coordenou a produção executiva alinhando elenco, set e ritmo de captação à altura desse lançamento. Angelo Mazzutti construiu o eixo de direção criativa em torno da combinação entre força artística e elegância feminina; Mateus Sacavem conduziu a produção executiva mantendo cada bloco do set afinado. A campanha entrega à Jequiti um banco de imagens capaz de sustentar lançamento nacional, catálogo, comissão e mídia com a mesma assinatura — instalando a parceria como nova referência da perfumaria nacional.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Talento: Ana Castela" },

  { n: "76", name: "Patrícia Abravanel · Jequiti", cat: "Produtora", text:
"Apresentadora consolidada do Grupo Silvio Santos, Patrícia Abravanel sustenta uma das fragrâncias do portfólio Jequiti — e a campanha precisava operar na altura desse posicionamento. A House Mazzutti coordenou a produção executiva em torno de uma leitura editorial adulta da apresentadora. Angelo Mazzutti construiu o eixo de direção criativa privilegiando presença e silêncio; Mateus Sacavem conduziu a produção executiva alinhando elenco, set e ritmo de captação em uma só linha. A campanha entrega à Jequiti banco de imagens denso, capaz de circular em catálogo, comissão, mídia e ponto de venda — sustentando a continuidade da marca em mais um capítulo de assinatura institucional.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Talento: Patrícia Abravanel" },

  { n: "77", name: "Celso Portiolli · Jequiti", cat: "Produtora", text:
"Apresentador histórico do SBT, Celso Portiolli reúne décadas de carreira pública — e a campanha de fragrância masculina pela Jequiti precisava traduzir essa autoridade em imagem editorial atual. A House Mazzutti dirigiu a sessão em torno de uma leitura adulta e contemporânea da masculinidade do apresentador. Angelo Mazzutti construiu o eixo de direção criativa em torno de presença e contenção; Mateus Sacavem conduziu a produção executiva alinhando elenco, set e ritmo. A campanha entrega à Jequiti banco de imagens denso, capaz de sustentar lançamento nacional, catálogo, comissão e ponto de venda com a mesma assinatura — fixando o apresentador como rosto de marca em outra leitura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Talento: Celso Portiolli" },

  { n: "78", name: "Jequiti · 16 Anos (Institucional)", cat: "Produtora", text:
"Aniversário institucional de marca pede campanha que sustente continuidade e abertura ao mesmo tempo. Para a edição comemorativa de 16 anos da Jequiti — uma das maiores marcas de cosmético do Grupo Silvio Santos —, a House Mazzutti coordenou produção executiva em torno de uma narrativa institucional adulta. Angelo Mazzutti construiu o eixo de direção criativa em torno da combinação entre legado e renovação; Mateus Sacavem conduziu a produção executiva alinhando elenco, set e ritmo de captação em uma só linha. A campanha entrega à Jequiti banco de imagens institucional, capaz de circular em mídia, catálogo, comissão e materiais corporativos com a mesma assinatura — uma marca celebrada com densidade editorial.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem" },

  { n: "79", name: "Beatco · Coleção II", cat: "Produtora", text:
"A continuidade de uma marca pede campanhas que dialoguem com a anterior sem repetir. Para a segunda campanha Beatco com a House Mazzutti, a direção partiu de uma leitura mais sensorial da coleção — movimento, textura, presença. Angelo Mazzutti construiu o eixo visual em torno de quadros que alternam intensidade e calma; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha narrativa. A campanha entrega à Beatco banco de imagens denso, capaz de sustentar mídia editorial, e-commerce, redes próprias e ponto de venda — uma marca de moda fitness apresentada com a mesma autoridade visual em mais um capítulo de relação.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando" },

  { n: "80", name: "Vivi Modas", cat: "Produtora", text:
"Marca de moda em fase de construção pede campanha que instale assinatura editorial firme. Para a Vivi Modas, a House Mazzutti dirigiu uma sessão em que a coleção aparece com leitura própria de marca, não como inventário. Angelo Mazzutti construiu o eixo visual em torno da relação entre estilo, ambiente e presença; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set em uma só linha narrativa. A campanha entrega à Vivi Modas banco de imagens denso, capaz de sustentar mídia editorial, redes próprias e ponto de venda — uma coleção apresentada com a densidade que diferencia marca de produto.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · Fotografia: Ita Mazzutti · Vídeo: Lucas Brando" },

  { n: "81", name: "Carlinhos Maia · Carnaval", cat: "Produtora", text:
"Cobertura de carnaval com figura pública de grande alcance pede operação de produção em tempo real — narrativa visual capturada ao vivo, com leitura editorial sustentada. Para o registro de Carlinhos Maia no carnaval, a House Mazzutti operou em sintonia com a rotina do talento, traduzindo presença pública em material editorial. Angelo Mazzutti construiu o eixo de direção criativa em torno do contraste entre energia coletiva e presença individual; Mateus Sacavem coordenou a produção executiva mantendo o ritmo de captação alinhado à logística do evento. O resultado é um banco de imagens com circulação imediata em redes próprias do talento e em mídia.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · House Mazzutti" },

  { n: "82", name: "Ana Jorge · Bazaar", cat: "Produtora", text:
"Editorial para grande mídia exige outra camada de cuidado — a peça vai disputar atenção com a curadoria da revista, não apenas com o leitor. Para o editorial de Ana Jorge para a Bazaar, a House Mazzutti dirigiu uma sessão em que presença, estilo e ambiente operam em uma só linha de leitura editorial. Angelo Mazzutti construiu o eixo visual em torno de uma narrativa contemporânea da editorial brasileira; Mateus Sacavem coordenou a produção executiva alinhando elenco, beauty e set. A entrega circula em mídia editorial impressa e digital com a assinatura que esse tipo de peça exige.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · House Mazzutti" },

  { n: "83", name: "Inside Out", cat: "Produtora", text:
"Projeto autoral pede campanha com leitura editorial mais livre — espaço de experimento dentro da produção da casa. Para o Inside Out, a House Mazzutti dirigiu uma sessão em que a narrativa visual carrega o trabalho. Angelo Mazzutti construiu o eixo a partir de uma proposta editorial mais arriscada; Mateus Sacavem coordenou a produção executiva mantendo set, beauty e vídeo afinados nesse eixo. O resultado é um material que sustenta apresentação institucional, circula em mídia editorial e funciona como recorte autoral da própria House — uma peça que demonstra a direção criativa como assinatura.",
    team: "Direção Criativa: Angelo Mazzutti · Produção Executiva: Mateus Sacavem · House Mazzutti" },
];

// ---------- helpers ----------
function H1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text })] });
}
function H2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text })] });
}
function H3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text })] });
}
function P(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, ...opts })]
  });
}
function META(label, value) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${label}: `, bold: true }),
      new TextRun({ text: value }),
    ],
  });
}
function QUOTEPARA() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    indent: { left: 360 },
    children: [new TextRun({ text: `"${QUOTE}"`, italics: true })],
  });
}
function PHILOPARA() {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    children: [
      new TextRun({ text: "Filosofia do Studio: ", bold: true }),
      new TextRun({ text: PHILO, italics: true }),
    ],
  });
}
function TEAMPARA(team) {
  return new Paragraph({
    spacing: { before: 120, after: 200 },
    children: [new TextRun({ text: team, italics: true, size: 20 })],
  });
}
function DIVIDER() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    children: [new TextRun({ text: "— · —" })],
    alignment: AlignmentType.CENTER,
  });
}

// ---------- build the document body ----------
const children = [];

// Cover
children.push(new Paragraph({
  spacing: { before: 240, after: 240 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "HOUSE MAZZUTTI", bold: true, size: 56 })]
}));
children.push(new Paragraph({
  spacing: { after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Portfólios Individuais", size: 32, italics: true })]
}));
children.push(new Paragraph({
  spacing: { after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Textos editoriais para o site · 2026", size: 22 })]
}));
children.push(new Paragraph({
  spacing: { before: 360, after: 120 },
  alignment: AlignmentType.CENTER,
  indent: { left: 720, right: 720 },
  children: [new TextRun({ text: `"${QUOTE}"`, italics: true, size: 24 })]
}));
children.push(new Paragraph({
  spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: PHILO, size: 20, italics: true })]
}));

// Section heads + entries grouped by category
const BOOK = portfolios.slice(0, 26);
const ENSAIO = portfolios.slice(26, 45);
const CAMPANHA = portfolios.slice(45);

function renderEntry(p) {
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(H2(`${p.n} · ${p.name}`));
  children.push(META("Categoria", p.cat));
  children.push(META("Autor", AUTHOR));
  children.push(META("Ano", YEAR));
  children.push(QUOTEPARA());
  children.push(PHILOPARA());
  children.push(P(p.text));
  children.push(TEAMPARA(p.team));
}

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(H1("STUDIO — BOOK MODEL"));
BOOK.forEach(renderEntry);

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(H1("STUDIO — ENSAIO PESSOAL"));
ENSAIO.forEach(renderEntry);

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(H1("PRODUTORA — CAMPANHAS"));
CAMPANHA.forEach(renderEntry);

// ---------- create the document ----------
const doc = new Document({
  creator: "House Mazzutti",
  title: "Portfólios Individuais — House Mazzutti",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Calibri" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Calibri" },
        paragraph: { spacing: { before: 120, after: 60 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("portfolios-house-mazzutti.docx", buffer);
  console.log("DOCX written: portfolios-house-mazzutti.docx (" + portfolios.length + " portfólios)");
});

// also export portfolios array for the HTML builder
module.exports = { portfolios, QUOTE, PHILO, AUTHOR, YEAR };
