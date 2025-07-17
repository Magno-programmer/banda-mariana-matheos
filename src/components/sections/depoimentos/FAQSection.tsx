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
      pergunta: "Como funciona o processo de contratação da banda?",
      resposta: "A contratação é formalizada com um contrato claro e transparente. O processo inclui briefing inicial com os noivos ou contratante, definição do repertório personalizado e organização logística com antecedência. É possível reservar datas com antecedência e personalizar diversos aspectos da apresentação.",
      prioridade: "alta",
      tags: ["contrato", "reserva", "briefing", "organização", "personalização"],
      categoria_schema: "booking"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "O que está incluso na contratação da banda?",
      resposta: "A banda é formada por cinco músicos profissionais e leva todos os seus instrumentos e equipamentos essenciais, incluindo microfones, cabos e pedalboards. A equipe oferece curadoria musical exclusiva para o evento e cuida de toda a montagem e desmontagem da estrutura de palco que lhe compete.",
      prioridade: "alta",
      tags: ["músicos", "equipamentos", "estrutura", "curadoria", "completo"],
      categoria_schema: "pricing"
    },

    // CATEGORIA: REPERTÓRIO E ESTILO MUSICAL
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "Que estilos musicais fazem parte do repertório da banda?",
      resposta: "A banda é especializada em Jazz Clássico, Soul, Blues, R&B e também executa baladas, swings, rockabilly e releituras vintage de músicas pop. Com forte inspiração na Era de Ouro do Jazz, oferece um repertório elegante e envolvente, adaptado ao perfil do evento.",
      prioridade: "alta",
      tags: ["jazz", "soul", "blues", "r&b", "releituras", "vintage"],
      categoria_schema: "repertoire"
    },
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "Posso sugerir músicas para o repertório?",
      resposta: "Sim! A escolha de músicas personalizadas faz parte da experiência oferecida. A curadoria é realizada pela diretora artística Mariana Matheos, garantindo que as escolhas estejam em harmonia com a proposta sonora da banda. Os noivos ou contratantes podem indicar músicas com significado especial.",
      prioridade: "alta",
      tags: ["personalização", "curadoria", "repertório especial", "Mariana Matheos"],
      categoria_schema: "customization"
    },

    // CATEGORIA: ESTRUTURA TÉCNICA E LOGÍSTICA
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "Quais equipamentos a banda leva para os eventos?",
      resposta: "A banda leva seus próprios instrumentos (piano, guitarra, baixo, bateria, trompete), microfones, pedalboards e cabos. O contratante deve fornecer estrutura de som compatível com o porte do evento (PA), pontos de energia estabilizada e alimentação para os músicos.",
      prioridade: "alta",
      tags: ["instrumentos", "estrutura", "PA", "energia", "alimentação"],
      categoria_schema: "technical"
    },
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "Existe algum requisito técnico para o espaço do evento?",
      resposta: "Sim. O local deve ter pelo menos 4x3 metros de área plana para acomodar os cinco músicos. Para eventos externos, é importante contar com cobertura contra chuva e pontos de energia próximos ao palco. O rider técnico pode ser fornecido com antecedência para o fornecedor de som.",
      prioridade: "media",
      tags: ["palco", "dimensão", "energia", "rider técnico", "evento externo"],
      categoria_schema: "technical"
    },

    // CATEGORIA: FORMAÇÃO E PROFISSIONAIS
    {
      categoria: "Formação e Profissionais",
      pergunta: "Quem são os integrantes da banda?",
      resposta: "A banda é composta por: Mariana Matheos (voz e direção artística), Carlos Magno (piano), Tarciso Júnior (baixo e guitarra), Rubens Kalil (bateria) e Charles Amaral (trompete). Todos têm longa trajetória profissional e atuam em shows, festivais e eventos de alto padrão.",
      prioridade: "alta",
      tags: ["integrantes", "formação", "trajetória", "profissionais"],
      categoria_schema: "band_formation"
    },
    {
      categoria: "Formação e Profissionais",
      pergunta: "É possível contratar formações reduzidas?",
      resposta: "Sim. A formação padrão é de 5 músicos, mas a banda pode se adaptar a trios ou quartetos para eventos mais íntimos. Também é possível incluir músicos adicionais como saxofonistas ou violinistas mediante solicitação antecipada.",
      prioridade: "media",
      tags: ["trio", "quarteto", "adicional", "flexibilidade", "eventos menores"],
      categoria_schema: "customization"
    },

    // CATEGORIA: TIPOS DE EVENTOS
    {
      categoria: "Tipos de Eventos",
      pergunta: "A banda toca em eventos além de casamentos?",
      resposta: "Sim. Além de casamentos, a banda se apresenta em eventos corporativos, festivais de música, bares, casas de vinho, aniversários especiais, vernissages e eventos culturais. O repertório e a performance são adaptados para cada contexto.",
      prioridade: "alta",
      tags: ["corporativo", "festival", "aniversário", "cultural", "versatilidade"],
      categoria_schema: "event_types"
    },

    // CATEGORIA: APRESENTAÇÃO E SHOW
    {
      categoria: "Apresentação e Show",
      pergunta: "Quanto tempo dura a apresentação da banda?",
      resposta: "A apresentação padrão tem cerca de 2 horas, podendo ser dividida em dois blocos com intervalo. Para eventos mais curtos ou específicos, a banda adapta o tempo de show conforme o cronograma do contratante.",
      prioridade: "alta",
      tags: ["duração", "show", "2 horas", "intervalo", "flexível"],
      categoria_schema: "duration"
    },
    {
      categoria: "Apresentação e Show",
      pergunta: "Como é a interação da banda com o público?",
      resposta: "A banda valoriza a conexão com o público. A vocalista Mariana Matheos tem carisma, experiência e costuma apresentar as músicas, interagir com os convidados e criar momentos especiais durante o show, com naturalidade e elegância.",
      prioridade: "media",
      tags: ["interação", "apresentação", "público", "carisma"],
      categoria_schema: "interaction"
    },

    // CATEGORIA: LOCALIZAÇÃO E DESLOCAMENTO
    {
      categoria: "Localização e Deslocamento",
      pergunta: "A banda atua fora de Belo Horizonte?",
      resposta: "Sim. A banda já se apresentou em diversas cidades de Minas Gerais, como Nova Lima, Matozinhos, Tiradentes, Brumadinho e outras. Para regiões metropolitanas, o deslocamento costuma ser mais simples. Em eventos mais distantes, pode haver necessidade de logística adicional.",
      prioridade: "alta",
      tags: ["deslocamento", "fora de BH", "região metropolitana", "logística"],
      categoria_schema: "location"
    },

    // CATEGORIA: RECOMENDAÇÕES E QUALIDADE
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "A banda é bem avaliada pelos clientes?",
      resposta: "Sim! A banda Mariana Matheos possui nota 5,0 em todas as avaliações no Google, além de dezenas de depoimentos positivos no Instagram e canais sociais. Muitos clientes contratam a banda novamente e indicam para familiares e amigos.",
      prioridade: "alta",
      tags: ["avaliações", "5 estrelas", "depoimentos", "Google", "recontratação"],
      categoria_schema: "reviews"
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
