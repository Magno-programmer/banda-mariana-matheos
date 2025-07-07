
import React from 'react';
import { useNavigate } from 'react-router-dom';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import bordaComum from '@/assets/images/borda-comum-gold.png';

const EstilosMusicaisSection = () => {
  const navigate = useNavigate();

  const musicStyles = [
    {
      id: 'jazz',
      name: 'Jazz',
      description: 'O jazz é o alicerce do nosso repertório. Nascido no início do século XX nos Estados Unidos, o jazz combina elementos da música africana, blues e ragtime. Nossa interpretação traz os clássicos de Miles Davis, Duke Ellington e John Coltrane com arranjos sofisticados e improvisações elegantes.',
      characteristics: ['Improvisação', 'Swing', 'Blue notes', 'Harmonia complexa'],
      artists: ['Miles Davis', 'Duke Ellington', 'John Coltrane', 'Charlie Parker']
    },
    {
      id: 'soul',
      name: 'Soul',
      description: 'O soul music representa a expressão mais profunda da música negra americana. Combinando gospel, R&B e pop, criamos interpretações emocionantes que tocam a alma. Nossa vocalista entrega performances que ecoam a força de Aretha Franklin e a sensibilidade de Sam Cooke.',
      characteristics: ['Vocal expressivo', 'Ritmo marcante', 'Groove intenso', 'Emoção autêntica'],
      artists: ['Aretha Franklin', 'Sam Cooke', 'Otis Redding', 'Stevie Wonder']
    },
    {
      id: 'blues',
      name: 'Blues',
      description: 'O blues é a raiz de toda música popular moderna. Com sua estrutura de 12 compassos e progressões melancólicas, o blues conta histórias de vida, amor e superação. Nossa banda honra essa tradição com interpretações que respeitam os mestres B.B. King e Muddy Waters.',
      characteristics: ['Estrutura 12 compassos', 'Blue notes', 'Call and response', 'Narrativa emocional'],
      artists: ['B.B. King', 'Muddy Waters', 'Robert Johnson', 'Howlin\' Wolf']
    },
    {
      id: 'rnb',
      name: 'R&B',
      description: 'O Rhythm & Blues moderno une a tradição do soul com elementos contemporâneos. Interpretamos clássicos e sucessos mais recentes com a sofisticação vocal de Amy Winehouse e a elegância atemporal de Alicia Keys, criando uma ponte entre passado e presente.',
      characteristics: ['Groove marcante', 'Vocal melismático', 'Harmonias ricas', 'Produção refinada'],
      artists: ['Amy Winehouse', 'Alicia Keys', 'John Legend', 'Adele']
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 text-6xl font-glimmer text-jazz-gold rotate-12">🎵</div>
        <div className="absolute bottom-20 right-1/4 text-8xl font-glimmer text-jazz-gold -rotate-12">🎶</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-glimmer text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 jazz-text-shadow">
              Estilos Musicais - Jazz, Soul, Blues e R&B
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - Estilos musicais"
                className="w-[50%] object-contain"
              />
            </div>
            <p className="font-gatsby text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Conheça os estilos musicais que definem nossa identidade artística. Da sofisticação do jazz à emoção do soul, cada gênero é interpretado com excelência e autenticidade pela banda Mariana Matheos.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {musicStyles.map((style) => (
              <a
                key={style.id}
                href={`#${style.id}`}
                className="px-6 py-3 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsby tracking-wide"
              >
                {style.name}
              </a>
            ))}
          </div>

          {/* Music Styles */}
          <div className="space-y-20">
            {musicStyles.map((style, index) => (
              <section key={style.id} id={style.id} className="animate-fade-in">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                    <h2 className="font-glimmer text-4xl jazz-gold font-bold mb-6">
                      {style.name}
                    </h2>
                    <p className="font-gatsby text-lg text-gray-300 leading-relaxed mb-6">
                      {style.description}
                    </p>
                    
                    {/* Characteristics */}
                    <h3 className="font-glimmer text-2xl text-white mb-4">Características:</h3>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {style.characteristics.map((char, charIndex) => (
                        <li key={charIndex} className="font-gatsby text-gray-300 flex items-center">
                          <span className="jazz-gold mr-2">•</span>
                          {char}
                        </li>
                      ))}
                    </ul>

                    {/* Artists */}
                    <h3 className="font-glimmer text-2xl text-white mb-4">Influências:</h3>
                    <div className="flex flex-wrap gap-2">
                      {style.artists.map((artist, artistIndex) => (
                        <span
                          key={artistIndex}
                          className="px-3 py-1 bg-jazz-gold bg-opacity-20 text-jazz-gold text-sm border border-jazz-gold border-opacity-30"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} flex justify-center`}>
                    <div className="relative w-80 h-80">
                      <img
                        src={bordaComum}
                        alt={`Moldura decorativa - ${style.name}`}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl font-glimmer jazz-gold mb-4">
                            {style.id === 'jazz' && '🎺'}
                            {style.id === 'soul' && '🎤'}
                            {style.id === 'blues' && '🎸'}
                            {style.id === 'rnb' && '🎹'}
                          </div>
                          <h3 className="font-glimmer text-3xl jazz-gold font-bold">
                            {style.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Internal Links for SEO */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50">
              <h2 className="font-glimmer text-3xl jazz-gold font-bold mb-4">
                Interessado em nossos estilos?
              </h2>
              <p className="font-gatsby text-lg text-gray-300 mb-6">
                Veja o que nossos clientes dizem em depoimentos reais sobre nossas apresentações.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/faq')}
                  className="px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsby tracking-wide font-semibold"
                >
                  Ver Depoimentos
                </button>
                <button
                  onClick={() => navigate('/contato')}
                  className="px-8 py-4 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsby tracking-wide"
                >
                  Entre em contato para orçamento personalizado
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstilosMusicaisSection;
