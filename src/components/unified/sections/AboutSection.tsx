import React from 'react';
import { Music, Users, Star, Award, MapPin, Calendar } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const AboutSection = () => {
  const { styles, isMobile } = useResponsiveComponent();

  const bandMembers = [
    {
      name: "Mariana Matheos",
      role: "Vocalista Principal",
      description: "Voz marcante com influências de Billie Holiday, Amy Winehouse e Nina Simone",
      icon: <Music className="w-6 h-6 text-jazz-gold" />
    },
    {
      name: "Piano",
      role: "Teclados & Harmonias",
      description: "Arranjos sofisticados que complementam perfeitamente o vocal",
      icon: <Music className="w-6 h-6 text-jazz-gold" />
    },
    {
      name: "Baixo/Guitarra",
      role: "Base Harmônica",
      description: "Groove sólido e melodias que enriquecem cada apresentação",
      icon: <Music className="w-6 h-6 text-jazz-gold" />
    },
    {
      name: "Bateria",
      role: "Percussão & Ritmo",
      description: "Swing autêntico da Era de Ouro do Jazz",
      icon: <Music className="w-6 h-6 text-jazz-gold" />
    },
    {
      name: "Trompete",
      role: "Sopros & Melodias",
      description: "Solos expressivos e contracantos que elevam cada música",
      icon: <Music className="w-6 h-6 text-jazz-gold" />
    }
  ];

  const achievements = [
    {
      icon: <Star className="w-8 h-8 text-jazz-gold" />,
      title: "Avaliação 5,0 Estrelas",
      description: "Reconhecimento no Google Reviews com dezenas de avaliações positivas"
    },
    {
      icon: <Award className="w-8 h-8 text-jazz-gold" />,
      title: "Apresentações Regionais",
      description: "Shows em Nova Lima, Matozinhos, Ribeirão das Neves e região metropolitana"
    },
    {
      icon: <Users className="w-8 h-8 text-jazz-gold" />,
      title: "Clientes Satisfeitos",
      description: "Centenas de eventos realizados com sucesso em casamentos e eventos corporativos"
    },
    {
      icon: <MapPin className="w-8 h-8 text-jazz-gold" />,
      title: "Parcerias Exclusivas",
      description: "Apresentações regulares em The Bulltique Vino Bar e Soul Jazz Burguer"
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
            Sobre a Banda
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            História da Mariana Matheos Jazz Band, formação especializada em jazz, bossa nova e música 
            brasileira para eventos especiais
          </p>
        </div>

        {/* Band Story */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6 text-center`}>
            Nossa História
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6 leading-relaxed`}>
              A Mariana Matheos Jazz Band nasceu da paixão pela música autêntica e pela Era de Ouro do Jazz. 
              Sediada em Belo Horizonte, a banda se especializou em repertório inspirado nos grandes clássicos 
              do jazz, soul, blues e R&B.
            </p>
            
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6 leading-relaxed`}>
              Com interpretações fiéis de artistas icônicos como Billie Holiday, Amy Winehouse, Nina Simone, 
              Etta James e Ella Fitzgerald, a banda conquistou seu espaço no cenário musical mineiro, 
              especializando-se em eventos sofisticados.
            </p>
            
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 leading-relaxed`}>
              Hoje, a Mariana Matheos Jazz Band é reconhecida pela qualidade musical, profissionalismo e 
              capacidade de transformar qualquer evento em uma experiência musical inesquecível, seja em 
              casamentos, eventos corporativos, festivais ou apresentações em casas noturnas.
            </p>
          </div>
        </div>

        {/* Band Members */}
        <div className="mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-8 text-center`}>
            Formação da Banda
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bandMembers.map((member, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {member.icon}
                  <div className="ml-4">
                    <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold`}>
                      {member.name}
                    </h3>
                    <p className="font-gatsby text-gray-400 text-sm">{member.role}</p>
                  </div>
                </div>
                
                <p className="font-gatsby text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-8 text-center`}>
            Nossos Diferenciais
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-700">
                <div className="flex items-start mb-4">
                  {achievement.icon}
                  <div className="ml-4">
                    <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold mb-2`}>
                      {achievement.title}
                    </h3>
                    <p className="font-gatsby text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6 text-center`}>
            Nossa Missão
          </h2>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6 leading-relaxed`}>
              Levar a magia e sofisticação do jazz autêntico para eventos especiais, criando 
              atmosferas únicas que marcam momentos importantes na vida das pessoas.
            </p>
            
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 leading-relaxed`}>
              Cada apresentação é cuidadosamente preparada para proporcionar uma experiência 
              musical que permanece na memória muito depois da última nota.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Quer conhecer mais sobre nosso trabalho?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Gostaria de conhecer mais sobre a Mariana Matheos Jazz Band"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-jazz-gold hover:bg-jazz-gold/90 text-black px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Entrar em Contato
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;