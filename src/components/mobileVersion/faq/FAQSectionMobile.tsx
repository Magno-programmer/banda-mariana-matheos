
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const FAQSection = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      pergunta: "Quanto custa contratar uma banda de jazz para casamento?",
      resposta: "O valor varia conforme local, duração e estrutura técnica. Oferecemos apresentações personalizadas com repertório exclusivo. Entre em contato para orçamento sob medida."
    },
    {
      pergunta: "A banda toca músicas personalizadas?",
      resposta: "Sim! Adaptamos o repertório ao evento e gosto dos anfitriões. Incluímos músicas especiais para cerimônias, entradas e homenagens."
    },
    {
      pergunta: "A banda se apresenta em eventos corporativos?",
      resposta: "Sim, somos ideais para eventos corporativos. Atuamos em coquetéis, lançamentos e premiações, criando atmosfera elegante."
    },
    {
      pergunta: "A banda viaja para outras cidades?",
      resposta: "Sim! Atuamos em todo estado de Minas Gerais e outras regiões do Brasil. Custos de deslocamento incluídos no orçamento."
    },
    {
      pergunta: "Quais estilos musicais do repertório?",
      resposta: "Jazz, Soul, Blues e R&B com influências de Ella Fitzgerald, Etta James, Nina Simone, Amy Winehouse e Adele."
    },
    {
      pergunta: "A banda tem equipamentos próprios?",
      resposta: "Sim, temos estrutura própria de som e iluminação para eventos pequenos e médios. Para eventos maiores, parceria com fornecedores."
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-glimmer text-4xl md:text-5xl font-bold text-white mb-4 jazz-text-shadow">
              FAQ - Banda Jazz Soul Blues para Eventos
            </h1>
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - FAQ"
                className="w-[80%] object-contain"
              />
            </div>
            <p className="font-gatsby text-xl text-gray-300 leading-relaxed">
              Tire suas dúvidas sobre contratar nossa banda para seu evento em BH.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-black bg-opacity-40 border border-jazz-gold border-opacity-30 p-4 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h2 className="font-glimmer text-xl jazz-gold font-bold mb-3 leading-tight">
                  {faq.pergunta}
                </h2>
                <p className="font-gatsby text-lg text-gray-300 leading-relaxed">
                  {faq.resposta}
                </p>
              </div>
            ))}
          </div>

          {/* Depoimentos */}
          <div className="mb-12 animate-fade-in">
            <h2 className="font-glimmer text-3xl jazz-gold font-bold text-center mb-6">
              Depoimentos
            </h2>
            <div className="space-y-4">
              <blockquote className="bg-black bg-opacity-40 p-4 border-l-4 border-jazz-gold">
                <p className="font-gatsby text-lg text-gray-300 italic mb-2">
                  "Contratei a Mariana Matheos para meu casamento e foi a melhor escolha. Banda de jazz maravilhosa!"
                </p>
                <cite className="font-gatsby text-jazz-gold text-sm">— Débora</cite>
              </blockquote>
              
              <blockquote className="bg-black bg-opacity-40 p-4 border-l-4 border-jazz-gold">
                <p className="font-gatsby text-lg text-gray-300 italic mb-2">
                  "Música ao vivo de altíssima qualidade para nosso evento corporativo."
                </p>
                <cite className="font-gatsby text-jazz-gold text-sm">— Ana Luiza</cite>
              </blockquote>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-6 border border-jazz-gold border-opacity-50">
              <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-3">
                Ainda tem dúvidas?
              </h2>
              <p className="font-gatsby text-lg text-gray-300 mb-4">
                Entre em contato pelo WhatsApp e tire suas dúvidas.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5531997522127?text=Quero%20contratar%20a%20banda&utm_source=site&utm_medium=cta&utm_campaign=agendamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsby font-semibold"
                >
                  Falar no WhatsApp
                </a>
                <button
                  onClick={() => navigate('/contato')}
                  className="w-full px-6 py-3 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsby"
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
