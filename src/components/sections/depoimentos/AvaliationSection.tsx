
import React from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import lineArtDeco from '/images/divisor-de-sessao.avif';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const AvaliationSection = () => {
  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();

  const googleReviews = [
    { name: "Geraldo Santana", review: "Excelente cantora!! Vale a pena assistir o seu show!!" },
    { name: "Juciane Petenusso", review: "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática" },
    { name: "Vanessa Guedes", review: "Cantora sensacional! Deus abençoe nesta jornada... Emoção e carisma!" },
    { name: "Ana Carolina", review: "Canta muitooooo. Adorei!!!! Irei mais vezes." },
    { name: "Kel Souza", review: "Alegria e simpatia sempre em alta. Sucesso p vc!" },
    { name: "Carlos Magno", review: "Banda top demais, sucesso!!" },
    { name: "Luciana dos Santos", review: "Sensação que estamos na década de 20 ~ 60, é algo tão único que não dá pra explicar, tem que assistir." },
    { name: "Mariana Sabbag", review: "Excelente experiência estar em sua presença ouvindo o repertório." },
    { name: "Sergio Roberto", review: "Mariana é uma cantora excelente, super afinada, interage com o público." },
    { name: "Andre Guedes", review: "Excelente cantora!" },
    { name: "Alende Guedes", review: "👏👏👏👏 Sucesso Mariana!" },
    { name: "Reginaldo Santos", review: "Mariana você é 10" }
  ];

  const clientReviews = [
    { name: "Poliana", business: "Soul Jazz Burguer", review: "Eeeeiii Mari!! Foi muito bacana!!! Agradecemos mais uma vez a parceria!!" },
    { name: "Ana Luiza", business: "Restaurante Le Pontes", review: "A gente adorou a apresentação de vocês, queremos trazer vocês mais vezes. Muitíssimo obrigada!!" },
    { name: "Ravana", business: "Arena Cachoeirinha", review: "Nossa foi otimooooooo! Brigaduuuu, foi tão lindooooo! Obrigadaaaaaaa, lindezaaaa!" },
    { name: "Maurinho", business: "Chopperhead Garage", review: "Vamos fazer mais! ✌️" },
    { name: "Lucca", business: "Barólio", review: "O pessoal gostou bastante, muito obrigado!" },
    { name: "André Serra", business: "Evento de Carros Antigos de Matozinhos", review: "Seu show foi fantástico! Marcou a história da nossa região. Sucesso total!" },
    { name: "Débora", business: "The Bulltique Vino Bar", review: "Foi tudo lindo e mágico! 😍 Ansiosa para nosso próximo encontro!!!!" }
  ];

  const renderStars = () => (
    <div className="flex justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-jazz-gold text-jazz-gold" />
      ))}
    </div>
  );

  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
  const sectionTitleSize = isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const reviewTextSize = isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
  const nameSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const carouselBasis = isMobile ? 'basis-full' : isTablet ? 'basis-1/2' : 'basis-1/3';

  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-12 text-8xl font-glimmer text-jazz-gold">🎵</div>
        <div className="absolute bottom-1/4 right-20 text-6xl font-glimmer text-jazz-gold">🎤</div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className={`font-glimmer ${titleSize} font-bold text-white mb-6 jazz-text-shadow`}>
            Depoimentos Sobre Mariana Matheos 
          </h2>
          <div className="w-full flex justify-center mb-6">
            <img
              src={lineArtDeco}
              alt=""
              className="w-64 object-contain"
              aria-hidden="true"
              loading="lazy"
            />
          </div>
          <p className={`font-gatsbybold ${textSize} text-gray-100 max-w-4xl mx-auto leading-relaxed`}>
            Veja o que nossos clientes e o público falam sobre as apresentações ao vivo da nossa banda de jazz, soul, blues e R&B 
          </p>
        </div>

        {/* 5-star Google Reviews Highlight */}
        <div className="text-center mb-16 animate-scale-in">
          <div className="bg-black bg-opacity-40 p-6 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto rounded-lg">
            <div className="flex justify-center items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-jazz-gold text-jazz-gold" />
              ))}
            </div>
            <h3 className={`font-glimmer ${textSize} jazz-gold font-bold mb-2`}>
              Todas as avaliações da banda no Google são 5 estrelas 
            </h3>
            <p className={`font-gatsbybold text-gray-100 ${reviewTextSize}`}>
              Nossa banda de jazz ao vivo tem 100% de aprovação no Google 
            </p>
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className="mb-20 animate-fade-in">
          <h3 className={`font-glimmer ${sectionTitleSize} font-bold text-white mb-4 text-center jazz-text-shadow`}>
            Avaliações no Google
          </h3>
          <div className="w-full flex justify-center mb-12">
            <img
              src={lineArtDeco}
              alt=""
              className="w-48 object-contain"
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          <Carousel className={`w-full ${isMiniMobile ? 'max-w-[70%]' : 'max-w-[80%]'}  mx-auto`}>
            <CarouselContent>
              {googleReviews.map((review, index) => (
                <CarouselItem key={index} className={carouselBasis}>
                  <div className="p-2">
                    <Card className="bg-black bg-opacity-40 border-2 border-jazz-gold border-opacity-30 hover:border-opacity-100 transition-all duration-300 h-full">
                      <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                        {renderStars()}
                        <blockquote className={`font-gatsbybold text-gray-200 ${reviewTextSize} leading-relaxed mb-4 flex-grow`}>
                          "{review.review}"
                        </blockquote>
                        <cite className={`font-glimmer text-jazz-gold font-bold ${nameSize}`}>
                          — {review.name}
                        </cite>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-jazz-gold border-jazz-gold hover:bg-jazz-gold hover:text-black" />
            <CarouselNext className="text-jazz-gold border-jazz-gold hover:bg-jazz-gold hover:text-black" />
          </Carousel>
        </div>

        {/* Client Reviews Section */}
        <div className="animate-fade-in">
          <h3 className={`font-glimmer ${sectionTitleSize} font-bold text-white mb-4 text-center jazz-text-shadow`}>
            Depoimentos dos Contratantes
          </h3>
          <div className="w-full flex justify-center mb-12">
            <img
              src={lineArtDeco}
              alt=""
              className="w-48 object-contain"
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          <Carousel className={`w-full ${isMiniMobile ? 'max-w-[70%]' : 'max-w-[80%]'}  mx-auto`}>
            <CarouselContent>
              {clientReviews.map((review, index) => (
                <CarouselItem key={index} className={carouselBasis}>
                  <div className="p-2">
                    <Card className="bg-black bg-opacity-40 border-2 border-jazz-gold border-opacity-30 hover:border-opacity-100 transition-all duration-300 h-full">
                      <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                        {renderStars()}
                        <blockquote className={`font-gatsbybold text-gray-100 ${reviewTextSize} leading-relaxed mb-4 flex-grow`}>
                          "{review.review}"
                        </blockquote>
                        <div className="text-center">
                          <cite className={`font-glimmer text-jazz-gold font-bold ${nameSize} block`}>
                            — {review.name}
                          </cite>
                          <span className={`font-gatsbybold text-gray-400 ${reviewTextSize}`}>
                            {review.business}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-jazz-gold border-jazz-gold hover:bg-jazz-gold hover:text-black" />
            <CarouselNext className="text-jazz-gold border-jazz-gold hover:bg-jazz-gold hover:text-black" />
          </Carousel>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-scale-in">
          <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-3xl mx-auto rounded-lg">
            <h3 className={`font-glimmer ${textSize} jazz-gold font-bold mb-4`}>
              Seja o próximo a contratar nossa banda de jazz ao vivo
            </h3>
            <p className={`font-gatsbybold ${textSize} text-gray-50 mb-6`}>
              Junte-se aos nossos clientes satisfeitos e garante uma apresentação inesquecível de jazz, soul, blues e R&B para seu evento
            </p>
            <a 
              href="https://wa.me/5531997522127?text=Olá, Mariana! Vi os depoimentos no site e gostaria de contratar a banda para meu evento."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block font-gatsby ${isMobile ? 'text-base' : 'text-lg'} px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 tracking-wider uppercase font-semibold rounded`}
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvaliationSection;
