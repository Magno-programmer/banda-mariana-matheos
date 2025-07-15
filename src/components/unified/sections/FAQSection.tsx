import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
    answer: "O valor varia conforme o tipo de evento, local e estrutura técnica necessária. Solicite um orçamento sem compromisso!"
  },
  {
    question: "A banda toca músicas escolhidas pelos noivos?",
    answer: "Sim! Os noivos podem escolher até 2 músicas que combinem com o estilo da banda. A curadoria é feita por Mariana Matheos para manter a harmonia artística."
  },
  {
    question: "A banda faz apresentações em eventos corporativos e particulares?",
    answer: "Sim! A banda se apresenta em eventos empresariais, festivais, jantares elegantes, bares de vinho e casas de jazz."
  },
  {
    question: "Quais estilos musicais fazem parte do repertório da banda?",
    answer: "O repertório inclui Jazz Clássico, Soul, Blues, R&B e releituras vintage de pop contemporâneo, com influências da Era de Ouro do Jazz."
  },
  {
    question: "A banda se apresenta fora de Belo Horizonte?",
    answer: "Sim! A banda já se apresentou em cidades como Nova Lima, Matozinhos e Ribeirão das Neves. O deslocamento já está incluso no investimento para regiões próximas."
  },
  {
    question: "A banda leva os equipamentos necessários?",
    answer: "Sim. A banda leva instrumentos, microfones e pedalboards. O contratante fornece apenas o PA, energia elétrica e, em alguns casos, alimentação."
  },
  {
    question: "Quantas pessoas compõem a banda?",
    answer: "A formação padrão inclui 5 músicos: vocal, piano, baixo/guitarra, bateria e trompete. Formatos reduzidos são possíveis mediante acordo."
  },
  {
    question: "Quanto tempo dura o show?",
    answer: "A duração padrão é de 2 horas, com intervalo. Shows mais curtos também são possíveis sem pausa."
  },
  {
    question: "A banda possui boas recomendações?",
    answer: "Sim! A banda tem avaliação 5,0 estrelas no Google e é amplamente elogiada por clientes de casamentos, restaurantes e eventos corporativos."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { styles, isMobile } = useResponsiveComponent();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl font-glimmer text-jazz-gold transform -rotate-12">?</div>
        <div className="absolute bottom-20 right-10 text-8xl font-glimmer text-jazz-gold transform rotate-12">FAQ</div>
      </div>

      <div className={styles.container}>
        <div className="text-center mb-16">
          <h1 className={`font-gatsby ${styles.text.xlarge} text-jazz-gold mb-6`}>
            Perguntas Frequentes
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Esclareça suas dúvidas sobre contratação, repertório e apresentações da Mariana Matheos Jazz Band
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full p-6 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 text-left ${
                  openIndex === index ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`font-gatsby ${isMobile ? 'text-lg' : 'text-xl'} text-jazz-gold pr-4`}>
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-jazz-gold w-5 h-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-jazz-gold w-5 h-5 flex-shrink-0" />
                  )}
                </div>
                
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className={`font-gatsby ${isMobile ? 'text-base' : 'text-lg'} text-gray-300 leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Não encontrou sua resposta?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Tenho uma dúvida sobre os shows da Mariana Matheos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-jazz-gold hover:bg-jazz-gold/90 text-black px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Entre em contato conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;