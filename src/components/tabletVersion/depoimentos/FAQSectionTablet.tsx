
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const FAQSection = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      pergunta: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
      resposta: "O valor varia conforme o tipo de evento, local e estrutura técnica necessária. Solicite um orçamento sem compromisso!"
    },
    {
      pergunta: "A banda toca músicas escolhidas pelos noivos?",
      resposta: "Sim! Para casamentos e eventos especiais, os noivos podem escolher até 2 músicas que façam sentido com o estilo da banda. A curadoria musical é feita pela própria diretora artística Mariana Matheos, garantindo harmonia e emoção em cada apresentação."
    },
    {
      pergunta: "A banda faz apresentações em eventos corporativos e particulares?",
      resposta: "Com certeza! A Mariana Matheos já se apresentou em eventos empresariais, jantares elegantes, festivais, bares de vinho e casas de jazz. Adaptamos o repertório e o figurino conforme o clima do evento."
    },
    {
      pergunta: "Quais estilos musicais fazem parte do repertório da banda?",
      resposta: "Tocamos uma mistura refinada de Jazz Clássico, Soul, Blues, R&B, baladas e até releituras vintage de pop contemporâneo. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade é envolvente, elegante e cheia de identidade."
    },
    {
      pergunta: "A banda se apresenta fora de Belo Horizonte?",
      resposta: "Sim! A banda já se apresentou em cidades como Nova Lima, Matozinhos, Ribeirão das Neves e outras regiões de Minas Gerais. O deslocamento já está incluso no valor do investimento para a maioria das localidades próximas."
    },
    {
      pergunta: "A banda leva os equipamentos necessários?",
      resposta: "A banda leva seus próprios instrumentos, microfones e pedalboards. O contratante é responsável apenas pela estrutura básica de som (PA compatível com o espaço), energia elétrica e, em alguns casos, alimentação dos músicos após o show."
    },
    {
      pergunta: "Quantas pessoas compõem a banda?",
      resposta: "A formação padrão tem 5 músicos: vocal, piano, baixo/guitarra, bateria e trompete — todos com formação e carreira sólida na música. Apresentações com menos músicos podem ser combinadas, caso desejado."
    },
    {
      pergunta: "Quanto tempo dura o show?",
      resposta: "A duração padrão é de 2 horas, com um intervalo de 30 minutos entre os blocos. Para eventos mais curtos, é possível fazer o show direto, sem pausa."
    },
    {
      pergunta: "A banda possui boas recomendações?",
      resposta: "Sim! A Mariana Matheos tem avaliação 5,0 estrelas no Google e é muito elogiada por clientes de casamentos, bares, restaurantes e festivais. Visite o Google e Instagram da banda para conferir os depoimentos reais."
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-glimmer text-5xl md:text-6xl font-bold text-white mb-4 jazz-text-shadow">
              Faq - Banda Jazz Blues Soul para Eventos
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - FAQ"
                className="w-[50%] object-contain"
              />
            </div>
            <p className="font-gatsbybold text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Tire suas dúvidas sobre contratar a banda de jazz, soul, blues e R&B para seu casamento ou evento em Belo Horizonte e Minas Gerais.
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
