
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const FAQSection = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      pergunta: "Quanto custa contratar uma banda de jazz para casamento?",
      resposta: "O valor varia de acordo com local, duração e estrutura técnica. Oferecemos apresentações personalizadas com repertório exclusivo. Entre em contato para orçamento sob medida."
    },
    {
      pergunta: "A banda toca músicas personalizadas?",
      resposta: "Sim! Adaptamos o repertório conforme o evento e gosto dos anfitriões. Incluímos músicas especiais para cerimônias, entradas e homenagens."
    },
    {
      pergunta: "A banda se apresenta em eventos corporativos?",
      resposta: "Sim, somos ideais para eventos corporativos. Atuamos em coquetéis, lançamentos e premiações, criando atmosfera elegante com música ao vivo."
    },
    {
      pergunta: "A banda viaja para outras cidades?",
      resposta: "Sim! Embora sediada em BH, atuamos em todo estado de Minas Gerais e outras regiões. Custos de deslocamento incluídos no orçamento."
    },
    {
      pergunta: "Quais estilos musicais fazem parte do repertório?",
      resposta: "Jazz, Soul, Blues e R&B com influências de Ella Fitzgerald, Etta James, Nina Simone, Amy Winehouse e Adele. Interpretações sofisticadas e emocionantes."
    },
    {
      pergunta: "A banda tem equipamentos próprios?",
      resposta: "Sim, temos estrutura própria de som e iluminação para eventos pequenos e médios. Para eventos maiores, parceria com fornecedores confiáveis."
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-glimmer text-5xl md:text-6xl font-bold text-white mb-4 jazz-text-shadow">
              FAQ - Banda Jazz Soul Blues para Eventos
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - FAQ"
                className="w-[50%] object-contain"
              />
            </div>
            <p className="font-gatsbybold text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Tire suas dúvidas sobre contratar nossa banda para seu evento em Belo Horizonte e Minas Gerais.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6 mb-16">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-black bg-opacity-40 border border-jazz-gold border-opacity-30 p-6 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-4 leading-tight">
                  {faq.pergunta}
                </h2>
                <p className="font-gatsbybold text-xl text-gray-300 leading-relaxed">
                  {faq.resposta}
                </p>
              </div>
            ))}
          </div>

          {/* Depoimentos */}
          <div className="mb-16 animate-fade-in">
            <h2 className="font-glimmer text-4xl jazz-gold font-bold text-center mb-8">
              Depoimentos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <blockquote className="bg-black bg-opacity-40 p-6 border-l-4 border-jazz-gold">
                <p className="font-gatsbybold text-xl text-gray-300 italic mb-4">
                  "Contratei a Mariana Matheos para meu casamento e foi a melhor escolha. Banda de jazz maravilhosa!"
                </p>
                <cite className="font-gatsbybold text-jazz-gold">— Débora</cite>
              </blockquote>
              
              <blockquote className="bg-black bg-opacity-40 p-6 border-l-4 border-jazz-gold">
                <p className="font-gatsbybold text-xl text-gray-300 italic mb-4">
                  "Música ao vivo de altíssima qualidade para nosso evento corporativo."
                </p>
                <cite className="font-gatsbybold text-jazz-gold">— Ana Luiza</cite>
              </blockquote>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50">
              <h2 className="font-glimmer text-3xl jazz-gold font-bold mb-4">
                Ainda tem dúvidas?
              </h2>
              <p className="font-gatsbybold text-2xl text-gray-300 mb-6">
                Entre em contato conosco pelo WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5531997522127?text=Quero%20contratar%20a%20banda&utm_source=site&utm_medium=cta&utm_campaign=agendamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsbybold tracking-wide font-semibold"
                >
                  Falar no WhatsApp
                </a>
                <button
                  onClick={() => navigate('/contato')}
                  className="px-8 py-4 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsbybold tracking-wide"
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
