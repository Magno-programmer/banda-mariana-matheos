
import React, {useRef, useState} from 'react';
import bordarArtDeco from '@/assets/images/divisor-de-textos.png';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const AboutSection = () => {
  const [imagemUnica, setImagemUnica] = useState({src: '/images/cantora.png', alt: 'Mariana Matheos - Vocalista da banda de jazz e soul'});

  const singleInputRef = useRef(null);

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        src: URL.createObjectURL(file),
        alt: file.name,
      };
      setImagemUnica(newImage);
    }
  };

  const handleSingleImageRemove = () => {
    setImagemUnica(null);
  };
  
  return (
    <section id="sobre" className="py-20 jazz-gradient relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-9xl font-glimmer text-jazz-gold">♪</div>
        <div className="absolute bottom-10 left-10 text-7xl font-glimmer text-jazz-gold">♫</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Title - Otimizado para SEO */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-5xl md:text-6xl font-bold jazz-gold mb-4 jazz-text-shadow">
              Banda de Jazz e Soul para Eventos em BH
            </h2>

            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco decorativo"
                className="w-[50%] object-contain"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Otimizado para SEO */}
            <div className="animate-fade-in">
              <div className="space-y-6 font-gatsbybold text-lg leading-relaxed text-gray-300">
                <p className="text-2xl text-white  first-letter:text-4xl first-letter:font-glimmer first-letter:text-jazz-gold first-letter:float-left first-letter:mr-2">
                  A <span className="jazz-gold font-bold">banda de jazz Mariana Matheos</span> oferece música ao vivo sofisticada para casamentos, eventos corporativos e celebrações especiais. Especializada em jazz, soul, blues e R&B, nossa banda entrega uma experiência musical única que combina a elegância da Era de Ouro do Jazz (1920–1960) com a emoção contemporânea.
                </p>
                
                <p className="text-2xl">
                  Sob a liderança da cantora <span className="jazz-gold font-semibold">Mariana Matheos</span>, nossa banda de música ao vivo apresenta performances personalizadas para eventos que exigem <span className="jazz-gold font-semibold">excelência musical e presença cênica</span>. Cada apresentação é cuidadosamente planejada com repertório sob medida, figurinos temáticos e arranjos únicos.
                </p>
                
                <p className="text-2xl font-bold">
                  Contrate nossa banda de jazz e soul para seu evento em Belo Horizonte e região. Oferecemos música ao vivo de alta qualidade para casamentos elegantes, eventos corporativos sofisticados e celebrações privadas memoráveis.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 border-l-4 border-jazz-gold bg-jazz-dark bg-opacity-20">
                <p className="font-glimmer text-xl jazz-gold italic">
                  "A música é a linguagem universal da alma, e nossa banda fala fluentemente jazz, soul e blues."
                </p>
                <p className="font-gatsbybold text-xl text-gray-100 mt-2">— Mariana Matheos, Vocalista</p>
              </div>
            </div>

            <div className="animate-scale-in group relative w-full h-max-full max-w-md mx-auto">
              <div className="relative w-full h-[400px] flex items-center justify-center">
                
                {/* Moldura decorativa como imagem */}
                <img
                  src={bordarArtDeco}
                  alt="Moldura Art Déco decorativa"
                  className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none z-30"
                />

                {/* Área clicável */}
                <div
                  className="relative w-[93%] h-[73%] bg-gradient-to-br -inset-1 mt-3 from-jazz-dark to-black flex items-center justify-center overflow-hidden z-20"
                >
                  <img
                    src={imagemUnica.src}
                    alt={imagemUnica.alt}
                    className="w-full h-full object-cover filter sepia-[0.3] contrast-110"
                  />

                  {/* Overlay escuro decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
