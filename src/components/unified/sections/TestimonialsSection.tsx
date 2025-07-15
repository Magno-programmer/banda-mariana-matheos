import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const TestimonialsSection = () => {
  const { styles, isMobile } = useResponsiveComponent();

  const testimonials = [
    {
      name: "Ana Carolina",
      company: "Noiva",
      rating: 5,
      text: "A Mariana e a banda foram incríveis no nosso casamento! A voz dela é simplesmente divina e a banda muito profissional. Todos os convidados elogiaram demais!",
      date: "2024-05-15"
    },
    {
      name: "Rafael Silva",
      company: "The Bulltique Vino Bar",
      rating: 5,
      text: "Mariana tem uma voz única e uma presença de palco extraordinária. Sempre que ela se apresenta aqui, o público fica extasiado.",
      date: "2024-04-20"
    },
    {
      name: "Marcelo Santos",
      company: "Evento Corporativo",
      rating: 5,
      text: "Contratamos a banda para um evento da empresa e foi um sucesso absoluto. Música de qualidade, profissionalismo impecável!",
      date: "2024-03-10"
    },
    {
      name: "Carla Mendes",
      company: "Festival de Jazz",
      rating: 5,
      text: "A Mariana Matheos é uma das vozes mais marcantes do jazz brasileiro. Sua interpretação é emocionante e autêntica.",
      date: "2024-02-28"
    },
    {
      name: "Pedro Oliveira",
      company: "Casamento",
      rating: 5,
      text: "Banda top demais, sucesso!!",
      date: "2024-01-15"
    },
    {
      name: "Juliana Costa",
      company: "Restaurante",
      rating: 5,
      text: "Excelente experiência estar em sua presença ouvindo o repertório.",
      date: "2024-01-20"
    },
    {
      name: "Poliana",
      company: "Soul Jazz Burguer",
      rating: 5,
      text: "Uma das melhores apresentações que já presenciei. A banda tem uma química incrível!",
      date: "2024-06-05"
    },
    {
      name: "Roberto Almeida",
      company: "Festival Regional",
      rating: 5,
      text: "Seu show foi fantástico! Marcou a história da nossa região. Sucesso total!",
      date: "2024-05-30"
    },
    {
      name: "Maria Fernanda",
      company: "Evento Privado",
      rating: 5,
      text: "Foi tudo lindo e mágico! 😍 Ansiosa para nosso próximo encontro!!!!",
      date: "2024-06-01"
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♪</div>
        <div className="absolute bottom-20 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♫</div>
      </div>

      <div className={styles.container}>
        <div className="text-center mb-16">
          <h1 className={`font-gatsby ${styles.text.xlarge} text-jazz-gold mb-6`}>
            Depoimentos
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Avaliação 5,0 estrelas no Google e depoimentos de clientes satisfeitos com os shows 
            da Mariana Matheos Jazz Band
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16 max-w-md mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-2`}>
              5,0 Estrelas
            </h2>
            <p className="font-gatsby text-gray-300">
              Baseado em {testimonials.length} avaliações
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-jazz-gold mr-3" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              
              <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6 italic`}>
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="font-gatsby text-jazz-gold font-semibold">
                  {testimonial.name}
                </p>
                <p className="font-gatsby text-gray-400 text-sm">
                  {testimonial.company}
                </p>
                <p className="font-gatsby text-gray-500 text-xs mt-1">
                  {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-16">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Quer ver mais avaliações?
          </p>
          <a
            href="https://www.google.com/search?q=Mariana+Matheos+Jazz+Band+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Ver no Google Reviews
          </a>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Quer fazer parte dos nossos clientes satisfeitos?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Gostaria de contratar a Mariana Matheos para meu evento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-jazz-gold hover:bg-jazz-gold/90 text-black px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;