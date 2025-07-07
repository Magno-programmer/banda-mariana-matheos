
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const FAQSection = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      pergunta: "Quanto custa contratar uma banda de jazz para casamento?",
      resposta: "O valor para contratar uma banda de jazz para casamento pode variar de acordo com o local, duração do evento e estrutura técnica necessária. A Mariana Matheos Jazz Band oferece apresentações personalizadas, com formação flexível e repertório exclusivo, adaptado ao perfil do casal. Para receber um orçamento sob medida, entre em contato via WhatsApp."
    },
    {
      pergunta: "A banda toca músicas personalizadas?",
      resposta: "Sim! A banda adapta o repertório conforme o tipo de evento e o gosto dos anfitriões. É possível incluir músicas especiais para cerimônias, entradas, homenagens ou até surpresas. Também trabalhamos com releituras autênticas de clássicos do jazz, soul, blues e R&B."
    },
    {
      pergunta: "A banda se apresenta em eventos corporativos?",
      resposta: "Sim, a Mariana Matheos Jazz Band é ideal para eventos corporativos que exigem sofisticação e impacto emocional. Atuamos em coquetéis, lançamentos, confraternizações e premiações, criando uma atmosfera elegante com música ao vivo de altíssimo nível."
    },
    {
      pergunta: "A banda viaja para outras cidades?",
      resposta: "Sim! Embora sediada em Belo Horizonte (MG), a banda realiza apresentações em todo o estado de Minas Gerais e também em outras regiões do Brasil, mediante agendamento prévio. Os custos de deslocamento e logística são incluídos no orçamento personalizado."
    },
    {
      pergunta: "Quais estilos musicais fazem parte do repertório?",
      resposta: "O repertório da banda inclui os grandes clássicos do Jazz, Soul, Blues e R&B, com influências de artistas como Ella Fitzgerald, Etta James, Billie Holiday, Nina Simone, Amy Winehouse e Adele. As interpretações são sofisticadas, nostálgicas e emocionantes — perfeitas para criar uma experiência musical marcante."
    },
    {
      pergunta: "A banda tem equipamentos próprios?",
      resposta: "Sim. A Mariana Matheos Jazz Band possui estrutura própria de som e iluminação para atender eventos de pequeno e médio porte. Para casas maiores ou eventos ao ar livre, trabalhamos em parceria com fornecedores confiáveis de sonorização e técnica."
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-glimmer text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 jazz-text-shadow">
              Perguntas Frequentes - Banda de Jazz Soul Blues para Eventos
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - FAQ banda de jazz"
                className="w-[50%] object-contain"
              />
            </div>
            <p className="font-gatsby text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Tire suas dúvidas sobre contratar a banda de jazz, soul, blues e R&B para seu casamento ou evento em Belo Horizonte e Minas Gerais.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6 mb-16">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-black bg-opacity-40 border border-jazz-gold border-opacity-30 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="p-6">
                  <h2 className="font-glimmer text-2xl lg:text-3xl jazz-gold font-bold mb-4 leading-tight">
                    {faq.pergunta}
                  </h2>
                  <p className="font-gatsby text-lg text-gray-300 leading-relaxed">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Depoimentos Section */}
          <div className="mb-16 animate-fade-in">
            <h2 className="font-glimmer text-4xl jazz-gold font-bold text-center mb-8">
              O que dizem sobre nossa banda de jazz
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <blockquote className="bg-black bg-opacity-40 p-6 border-l-4 border-jazz-gold">
                <p className="font-gatsby text-lg text-gray-300 italic mb-4">
                  "Contratei a Mariana Matheos para meu casamento e foi a melhor escolha. Banda de jazz maravilhosa!"
                </p>
                <cite className="font-gatsbybold text-jazz-gold">— Débora, The Bulltique Vino Bar</cite>
              </blockquote>
              
              <blockquote className="bg-black bg-opacity-40 p-6 border-l-4 border-jazz-gold">
                <p className="font-gatsby text-lg text-gray-300 italic mb-4">
                  "A apresentação superou nossas expectativas. Música ao vivo de altíssima qualidade para nosso evento corporativo."
                </p>
                <cite className="font-gatsbybold text-jazz-gold">— Ana Luiza, Evento Corporativo</cite>
              </blockquote>
            </div>
          </div>

          {/* Internal Link for SEO */}
          <div className="text-center mb-8 animate-fade-in">
            <p className="font-gatsby text-xl text-gray-300 mb-4">
              Se ainda ficou com dúvidas ou deseja nos contratar,
            </p>
            <button
              onClick={() => navigate('/contato')}
              className="font-gatsby text-xl jazz-gold hover:text-yellow-400 underline transition-colors duration-300"
            >
              vá para a página de contato
            </button>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50">
              <h2 className="font-glimmer text-3xl jazz-gold font-bold mb-4">
                Ainda tem dúvidas?
              </h2>
              <p className="font-gatsby text-lg text-gray-300 mb-6">
                Entre em contato conosco pelo WhatsApp e tire todas as suas dúvidas sobre contratar nossa banda de jazz para seu evento especial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5531997522127?text=Quero%20contratar%20a%20banda&utm_source=site&utm_medium=cta&utm_campaign=agendamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsby tracking-wide font-semibold"
                >
                  Falar no WhatsApp
                </a>
                <button
                  onClick={() => navigate('/contato')}
                  className="px-8 py-4 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsby tracking-wide"
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
