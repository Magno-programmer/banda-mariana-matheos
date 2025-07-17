import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const FAQSection = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useAdvancedViewport();

  const advancedFAQs = [
    // CATEGORIA: CONTRATAÇÃO E INVESTIMENTO
    {
      categoria: "Contratação e Investimento",
      pergunta: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
      resposta: "O valor varia conforme o tipo de evento, local, duração, estrutura técnica necessária e formação da banda. Casamentos têm valores diferenciados de eventos corporativos. Eventos em cidades próximas a BH têm desconto no deslocamento. Solicite um orçamento personalizado sem compromisso!",
      prioridade: "alta",
      tags: ["preço", "orçamento", "casamento", "evento", "contratação"],
      categoria_schema: "pricing"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "Qual é o prazo mínimo para contratar a banda?",
      resposta: "Recomendamos agendamento com pelo menos 30 dias de antecedência, especialmente para casamentos e eventos de fim de semana. Em alta temporada (outubro a março), sugerimos 60 dias. Para eventos corporativos urgentes, consulte nossa disponibilidade - às vezes conseguimos encaixar com menor prazo.",
      prioridade: "alta",
      tags: ["prazo", "antecedência", "agendamento", "temporada"],
      categoria_schema: "booking"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "Como funciona o pagamento e existe contrato?",
      resposta: "Trabalhamos com contrato formal para garantir segurança de ambas as partes. O pagamento é dividido em duas parcelas: 50% na assinatura do contrato e 50% no dia do evento. Aceitamos transferência bancária, PIX e cartão de crédito (com acréscimo de taxas).",
      prioridade: "media",
      tags: ["pagamento", "contrato", "parcelas", "pix", "transferência"],
      categoria_schema: "payment"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "O que está incluso no valor do investimento?",
      resposta: "O valor inclui: 5 músicos profissionais, todos os instrumentos da banda, microfones, pedalboards, 2 horas de apresentação, deslocamento para região metropolitana de BH, montagem e desmontagem dos equipamentos, e consultoria musical personalizada para escolha do repertório.",
      prioridade: "alta",
      tags: ["valor", "incluso", "músicos", "equipamentos", "deslocamento"],
      categoria_schema: "pricing"
    },

    // CATEGORIA: REPERTÓRIO E ESTILO MUSICAL
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "A banda toca músicas escolhidas pelos noivos ou contratantes?",
      resposta: "Sim! Para casamentos e eventos especiais, os noivos podem escolher até 3 músicas que façam sentido com o estilo da banda. A curadoria musical é feita pela própria diretora artística Mariana Matheos, garantindo harmonia e emoção em cada apresentação. Também oferecemos sugestões baseadas no tipo de evento e momento da celebração.",
      prioridade: "alta",
      tags: ["repertório", "personalização", "noivos", "curadoria", "Mariana Matheos"],
      categoria_schema: "customization"
    },
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "Quais estilos musicais fazem parte do repertório da banda?",
      resposta: "Tocamos uma mistura refinada de Jazz Clássico, Soul, Blues, R&B, Bossa Nova, baladas românticas e releituras vintage de pop contemporâneo. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade é envolvente, elegante e cheia de identidade. Temos mais de 150 músicas no repertório, desde clássicos como 'Fly Me To The Moon' até sucessos modernos com arranjos jazzeados.",
      prioridade: "alta",
      tags: ["jazz", "soul", "blues", "bossa nova", "repertório", "150 músicas"],
      categoria_schema: "repertoire"
    },
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "A banda toca música brasileira ou apenas internacional?",
      resposta: "Nosso repertório é eclético! Tocamos clássicos brasileiros como Tom Jobim, Elis Regina, Vinicius de Moraes, além de sucessos internacionais. Temos versões especiais de MPB com arranjos jazzeados, bossa nova clássica e até releituras de samba e choro no estilo jazz. A versatilidade é nossa marca registrada.",
      prioridade: "media",
      tags: ["música brasileira", "MPB", "Tom Jobim", "Elis Regina", "bossa nova", "internacional"],
      categoria_schema: "repertoire"
    },
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "É possível ouvir o repertório antes de contratar?",
      resposta: "Claro! Temos vários vídeos no nosso Instagram (@marianamatheos) e YouTube mostrando diferentes estilos e músicas. Também oferecemos uma playlist personalizada com samples das principais músicas do nosso repertório. Para eventos especiais, podemos agendar uma apresentação prévia ou videochamada para conhecer melhor nosso trabalho.",
      prioridade: "media",
      tags: ["samples", "vídeos", "instagram", "youtube", "apresentação prévia"],
      categoria_schema: "preview"
    },

    // CATEGORIA: ESTRUTURA TÉCNICA E LOGÍSTICA
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "A banda leva os equipamentos necessários?",
      resposta: "A banda leva seus próprios instrumentos (piano elétrico, baixo, guitarra, bateria completa, trompete), microfones profissionais Shure, pedalboards e todos os cabos. O contratante é responsável apenas pela estrutura básica de som (PA compatível com o espaço), energia elétrica estável e, em alguns casos, alimentação dos músicos após o show.",
      prioridade: "alta",
      tags: ["equipamentos", "instrumentos", "microfones", "PA", "energia", "alimentação"],
      categoria_schema: "technical"
    },
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "Qual o tamanho mínimo do palco ou espaço para apresentação?",
      resposta: "Precisamos de um espaço mínimo de 4m x 3m para acomodar os 5 músicos e instrumentos confortavelmente. O local deve ter piso nivelado, cobertura em caso de chuva e pontos de energia elétrica próximos. Para eventos ao ar livre, consideramos fatores como vento e temperatura. Fazemos visita técnica prévia se necessário.",
      prioridade: "media",
      tags: ["palco", "espaço", "4m x 3m", "cobertura", "energia", "visita técnica"],
      categoria_schema: "technical"
    },
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "A banda se apresenta em locais ao ar livre?",
      resposta: "Sim! Temos experiência em jardins, quintais, praças, fazendas e espaços abertos. Exigimos apenas cobertura para os músicos e equipamentos em caso de chuva, e estrutura de som adequada para o espaço. Eventos ao ar livre têm um charme especial, especialmente no pôr do sol com jazz de fundo.",
      prioridade: "media",
      tags: ["ar livre", "jardins", "fazendas", "cobertura", "pôr do sol"],
      categoria_schema: "venue"
    },

    // CATEGORIA: FORMAÇÃO E PROFISSIONAIS
    {
      categoria: "Formação e Profissionais",
      pergunta: "Quantas pessoas compõem a banda?",
      resposta: "A formação padrão tem 5 músicos profissionais: vocal (Mariana Matheos), piano, baixo/guitarra, bateria e trompete — todos com formação musical sólida e carreira consolidada. Para eventos menores ou orçamentos específicos, oferecemos formações reduzidas (trio ou quarteto). Também podemos incluir músicos adicionais como saxofone ou violino mediante solicitação.",
      prioridade: "alta",
      tags: ["5 músicos", "formação", "trio", "quarteto", "saxofone", "violino"],
      categoria_schema: "band_formation"
    },
    {
      categoria: "Formação e Profissionais",
      pergunta: "Qual é a formação musical dos integrantes?",
      resposta: "Todos os músicos têm formação superior em música ou extensa carreira profissional. Mariana Matheos (vocal) é formada em Canto Popular e tem mais de 10 anos de carreira. Nossos instrumentistas tocam em orquestras, bandas de renome e têm experiência em grandes eventos. A qualidade técnica é nossa prioridade.",
      prioridade: "media",
      tags: ["formação superior", "carreira profissional", "10 anos", "orquestras", "qualidade técnica"],
      categoria_schema: "qualifications"
    },
    {
      categoria: "Formação e Profissionais",
      pergunta: "A banda tem músicos substitutos caso alguém não possa comparecer?",
      resposta: "Sim! Temos uma rede de músicos profissionais parceiros que podem substituir qualquer integrante em caso de emergência. Todos os substitutos conhecem nosso repertório e mantêm o mesmo padrão de qualidade. Também fazemos ensaios de emergência quando necessário para garantir a perfeita sincronia.",
      prioridade: "baixa",
      tags: ["substitutos", "emergência", "rede de músicos", "ensaios", "qualidade"],
      categoria_schema: "backup"
    },

    // CATEGORIA: TIPOS DE EVENTOS
    {
      categoria: "Tipos de Eventos",
      pergunta: "A banda faz apresentações em eventos corporativos e particulares?",
      resposta: "Absolutamente! Temos experiência em eventos empresariais, jantares elegantes, festivais, bares de vinho, casas de jazz, formaturas, aniversários de 50 anos, vernissages e lançamentos de produtos. Adaptamos o repertório, figurino e energia conforme o clima e perfil do evento. Cada apresentação é única e personalizada.",
      prioridade: "alta",
      tags: ["corporativo", "empresarial", "festivais", "aniversários", "vernissages", "lançamentos"],
      categoria_schema: "event_types"
    },
    {
      categoria: "Tipos de Eventos",
      pergunta: "Vocês tocam em casamentos? Como funciona?",
      resposta: "Casamentos são nossa especialidade! Podemos tocar durante o coquetel, jantar e/ou festa. Oferecemos repertório específico para cada momento: jazz suave para coquetel, baladas românticas para jantar e música mais animada para dança. Trabalhamos em sincronia com cerimonialistas e fotógrafos para criar momentos únicos.",
      prioridade: "alta",
      tags: ["casamentos", "coquetel", "jantar", "festa", "cerimonialistas", "fotógrafos"],
      categoria_schema: "weddings"
    },
    {
      categoria: "Tipos de Eventos",
      pergunta: "A banda toca em restaurantes e bares regularmente?",
      resposta: "Sim! Temos apresentações regulares em diversos estabelecimentos de Belo Horizonte. Nosso estilo é perfeito para criar ambiente sofisticado sem interferir nas conversas. Conhecemos a dinâmica de restaurantes e bares, sabemos dosar volume e energia conforme o momento da noite.",
      prioridade: "media",
      tags: ["restaurantes", "bares", "regulares", "ambiente sofisticado", "volume", "dinâmica"],
      categoria_schema: "regular_venues"
    },

    // CATEGORIA: APRESENTAÇÃO E SHOW
    {
      categoria: "Apresentação e Show",
      pergunta: "Quanto tempo dura o show?",
      resposta: "A duração padrão é de 2 horas, divididas em dois blocos de 50 minutos com um intervalo de 20 minutos. Para eventos mais longos, podemos estender até 3 horas. Para eventos mais curtos (coquetel, por exemplo), oferecemos apresentações de 1 hora direto, sem pausa. Tudo é combinado previamente.",
      prioridade: "alta",
      tags: ["2 horas", "50 minutos", "intervalo", "3 horas", "1 hora", "flexibilidade"],
      categoria_schema: "duration"
    },
    {
      categoria: "Apresentação e Show",
      pergunta: "A banda interage com o público durante o show?",
      resposta: "Sim! Mariana Matheos é uma excelente apresentadora e interage naturalmente com o público. Fazemos dedicatórias especiais, contamos curiosidades sobre as músicas e criamos momentos espontâneos. Para casamentos, podemos incluir momentos especiais como dedicatórias aos noivos ou participação em brindis.",
      prioridade: "media",
      tags: ["interação", "apresentadora", "dedicatórias", "curiosidades", "brindis"],
      categoria_schema: "interaction"
    },
    {
      categoria: "Apresentação e Show",
      pergunta: "Qual é o figurino da banda?",
      resposta: "Temos diferentes figurinos conforme o tipo de evento: elegante social para casamentos (vestidos e ternos), casual chic para bares e restaurantes, e formal para eventos corporativos. Nosso estilo sempre remete à sofisticação do jazz clássico. Podemos adaptar cores ou temas específicos mediante solicitação prévia.",
      prioridade: "baixa",
      tags: ["figurino", "elegante", "casual chic", "formal", "cores", "temas"],
      categoria_schema: "styling"
    },

    // CATEGORIA: LOCALIZAÇÃO E DESLOCAMENTO
    {
      categoria: "Localização e Deslocamento",
      pergunta: "A banda se apresenta fora de Belo Horizonte?",
      resposta: "Sim! Já nos apresentamos em Nova Lima, Matozinhos, Ribeirão das Neves, Contagem, Betim, Ouro Preto, Tiradentes, Brumadinho e outras cidades de Minas Gerais. Para região metropolitana de BH, o deslocamento está incluso. Para cidades mais distantes, cobramos taxa de deslocamento e, em alguns casos, hospedagem.",
      prioridade: "alta",
      tags: ["fora de BH", "Nova Lima", "Ouro Preto", "Tiradentes", "deslocamento", "hospedagem"],
      categoria_schema: "location"
    },
    {
      categoria: "Localização e Deslocamento",
      pergunta: "Vocês viajam para outros estados?",
      resposta: "Sim! Já fizemos apresentações em São Paulo, Rio de Janeiro e Espírito Santo. Para outros estados, orçamos separadamente incluindo deslocamento, hospedagem e alimentação. Nesses casos, preferimos eventos de maior duração para compensar a logística. Entre em contato para orçamento personalizado.",
      prioridade: "baixa",
      tags: ["outros estados", "São Paulo", "Rio de Janeiro", "Espírito Santo", "hospedagem", "logística"],
      categoria_schema: "travel"
    },

    // CATEGORIA: RECOMENDAÇÕES E QUALIDADE
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "A banda possui boas recomendações?",
      resposta: "Sim! Temos avaliação 5,0 estrelas no Google com mais de 50 avaliações, centenas de depoimentos positivos no Instagram e referências de grandes eventos. Clientes nos recomendam frequentemente para amigos e familiares. Nossa taxa de satisfação é superior a 98% e muitos clientes nos contratam novamente.",
      prioridade: "alta",
      tags: ["5 estrelas", "50 avaliações", "instagram", "98% satisfação", "recontratação"],
      categoria_schema: "reviews"
    },
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "Posso falar com clientes que já contrataram a banda?",
      resposta: "Claro! Temos uma lista de clientes satisfeitos que se disponibilizaram a dar referências. Também pode conferir nossos depoimentos no Google, Instagram e nos stories destacados. Para eventos similares ao seu, podemos conectá-lo com clientes específicos mediante autorização prévia deles.",
      prioridade: "media",
      tags: ["referências", "clientes satisfeitos", "google", "stories", "autorização"],
      categoria_schema: "references"
    },
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "O que diferencia a Mariana Matheos de outras bandas?",
      resposta: "Nossa diferenciação está na combinação de técnica refinada, repertório cuidadosamente selecionado, interação calorosa com o público e profissionalismo absoluto. Mariana Matheos não apenas canta, mas conduz a experiência musical. Além disso, oferecemos consultoria musical personalizada e garantimos que cada evento seja único e memorável.",
      prioridade: "media",
      tags: ["diferenciação", "técnica", "profissionalismo", "consultoria", "experiência única"],
      categoria_schema: "differentiation"
    }
  ];

  const categorias = [
    "Contratação e Investimento",
    "Repertório e Estilo Musical", 
    "Estrutura Técnica e Logística",
    "Formação e Profissionais",
    "Tipos de Eventos",
    "Apresentação e Show",
    "Localização e Deslocamento",
    "Recomendações e Qualidade"
  ];

  const [categoriaAtiva, setCategoriaAtiva] = React.useState("Contratação e Investimento");

  const faqsFiltrados = advancedFAQs.filter(faq => faq.categoria === categoriaAtiva);

  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-6xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const questionSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
  const answerSize = isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-2xl';
  const buttonSize = isMobile ? 'text-sm px-6 py-3' : isTablet ? 'text-base px-7 py-3' : 'text-base px-8 py-4';

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className={`font-glimmer ${titleSize} font-bold text-white mb-4 jazz-text-shadow`}>
              Faq - Banda Jazz Blues Soul para Eventos 
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - FAQ banda de jazz"
                className="w-[50%] object-contain"
              />
            </div>
            <p className={`font-gatsbybold ${textSize} text-gray-300 leading-relaxed max-w-3xl mx-auto`}>
              Tire suas dúvidas sobre contratar a banda de jazz, soul, blues e R&B para seu casamento ou evento em Belo Horizonte e Minas Gerais. 
            </p>
          </div>

          {/* Navegação de Categorias */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categorias.map((categoria, index) => (
                <button
                  key={index}
                  onClick={() => setCategoriaAtiva(categoria)}
                  className={`px-4 py-2 rounded-full text-sm font-gatsbybold transition-all duration-300 ${
                    categoriaAtiva === categoria
                      ? 'bg-jazz-gold text-black border-2 border-jazz-gold'
                      : 'bg-black bg-opacity-40 text-jazz-gold border-2 border-jazz-gold border-opacity-30 hover:border-opacity-60 hover:bg-opacity-60'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-black bg-opacity-60 px-6 py-3 rounded-full">
                <span className="text-jazz-gold font-gatsbybold text-sm">
                  Categoria Ativa:
                </span>
                <span className="text-white font-glimmer text-sm">
                  {categoriaAtiva}
                </span>
                <span className="text-jazz-gold font-gatsbybold text-sm">
                  ({faqsFiltrados.length} perguntas)
                </span>
              </div>
            </div>
          </div>

          {/* FAQs Filtrados */}
          <div className="space-y-6 mb-16">
            {faqsFiltrados.map((faq, index) => (
              <div 
                key={index}
                className="bg-black bg-opacity-40 border border-jazz-gold border-opacity-30 animate-fade-in relative overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
                >
                <div className="absolute top-0 right-0 bg-jazz-gold bg-opacity-20 px-3 py-1">
                  <span className="text-jazz-gold font-gatsbybold text-xs uppercase">
                    {faq.prioridade}
                  </span>
                </div>
                <div className="p-6 pr-20">
                  <h2 className={`font-glimmer ${questionSize} jazz-gold font-bold mb-4 leading-tight`}>
                    {faq.pergunta}
                  </h2>
                  <p className={`font-gatsbybold ${answerSize} text-gray-300 leading-relaxed mb-4`}>
                    {faq.resposta}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {faq.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="bg-jazz-gold bg-opacity-10 text-jazz-gold px-2 py-1 rounded-full text-xs font-gatsbybold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50">
              <h2 className={`font-glimmer ${textSize} jazz-gold font-bold mb-4`}>
                Ainda tem dúvidas? 
              </h2>
              <p className={`font-gatsbybold ${isMobile ? 'text-base' : 'text-xl'} text-gray-300 mb-6`}>
                Entre em contato conosco pelo WhatsApp e tire todas as suas dúvidas sobre contratar nossa banda de jazz para seu evento especial. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5531997522127?text=Quero%20contratar%20a%20banda&utm_source=site&utm_medium=cta&utm_campaign=agendamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonSize} bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsby tracking-wide font-semibold`}
                >
                  Falar no WhatsApp 
                </a>
                <button
                  onClick={() => navigate('/contato')}
                  className={`${buttonSize} border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsbybold tracking-wide`}
                >
                  Ver Mais Contatos 
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
