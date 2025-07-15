import React from 'react';
import { Music, Star, Clock, Users } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const RepertoireSection = () => {
  const { styles, isMobile } = useResponsiveComponent();

  const repertoireCategories = [
    {
      title: "Jazz Clássico",
      icon: <Music className="w-8 h-8 text-jazz-gold" />,
      description: "Standards eternos da Era de Ouro do Jazz",
      songs: [
        "Summertime",
        "Fly Me to the Moon",
        "The Girl from Ipanema",
        "Autumn Leaves",
        "Blue Moon",
        "All of Me"
      ]
    },
    {
      title: "Soul & Blues",
      icon: <Star className="w-8 h-8 text-jazz-gold" />,
      description: "Interpretações poderosas com alma e sentimento",
      songs: [
        "At Last - Etta James",
        "Feeling Good - Nina Simone",
        "I'd Rather Go Blind",
        "Strange Fruit",
        "Stormy Weather",
        "God Bless the Child"
      ]
    },
    {
      title: "Bossa Nova",
      icon: <Clock className="w-8 h-8 text-jazz-gold" />,
      description: "Clássicos brasileiros com swing sofisticado",
      songs: [
        "Corcovado",
        "Desafinado",
        "Wave",
        "Garota de Ipanema",
        "Águas de Março",
        "Só Danço Samba"
      ]
    },
    {
      title: "Contemporâneo",
      icon: <Users className="w-8 h-8 text-jazz-gold" />,
      description: "Releituras vintage de sucessos atuais",
      songs: [
        "Valerie - Amy Winehouse",
        "Back to Black",
        "Rehab",
        "Make You Feel My Love",
        "Hallelujah",
        "The Way You Look Tonight"
      ]
    }
  ];

  const artistsInspiration = [
    "Billie Holiday",
    "Amy Winehouse", 
    "Nina Simone",
    "Etta James",
    "Ella Fitzgerald",
    "Sarah Vaughan",
    "Norah Jones",
    "Diana Krall"
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
            Nosso Repertório
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Repertório completo incluindo clássicos do jazz, soul, blues e R&B. Interpretações fiéis de grandes 
            artistas com influências da Era de Ouro do Jazz
          </p>
        </div>

        {/* Repertoire Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {repertoireCategories.map((category, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className={`font-gatsby ${styles.text.large} text-jazz-gold ml-4`}>
                  {category.title}
                </h3>
              </div>
              
              <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6`}>
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.songs.map((song, songIndex) => (
                  <div key={songIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                    <span className="font-gatsby text-gray-300">{song}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Artists Inspiration */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6 text-center`}>
            Influências Artísticas
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artistsInspiration.map((artist, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                <span className="font-gatsby text-gray-300">{artist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Band Formation */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6 text-center`}>
            Formação da Banda
          </h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-gatsby text-jazz-gold mb-2">Vocal</h3>
              <p className="font-gatsby text-gray-300 text-sm">Mariana Matheos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-gatsby text-jazz-gold mb-2">Piano</h3>
              <p className="font-gatsby text-gray-300 text-sm">Teclados & Harmonias</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-gatsby text-jazz-gold mb-2">Baixo</h3>
              <p className="font-gatsby text-gray-300 text-sm">Contrabaixo & Guitarra</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-gatsby text-jazz-gold mb-2">Bateria</h3>
              <p className="font-gatsby text-gray-300 text-sm">Percussão & Groove</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-gatsby text-jazz-gold mb-2">Trompete</h3>
              <p className="font-gatsby text-gray-300 text-sm">Sopros & Melodias</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Quer ouvir nosso repertório ao vivo no seu evento?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Gostaria de conhecer mais sobre o repertório da Mariana Matheos"
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

export default RepertoireSection;