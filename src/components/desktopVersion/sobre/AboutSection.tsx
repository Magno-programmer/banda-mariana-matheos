
import React, {useRef, useState} from 'react';
import bordarArtDeco from '@/assets/images/divisor-de-textos.png';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const AboutSection = () => {
  const [imagemUnica, setImagemUnica] = useState({src: '/images/cantora.png', alt: 'Mariana Matheos - Vocalista especialista em jazz soul blues R&B'});

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
              Sobre a Banda Mariana Matheos - Jazz Soul Blues R&B
            </h2>

            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco decorativo - Banda para casamento"
                className="w-[50%] object-contain"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Otimizado para SEO */}
            <div className="animate-fade-in">
              <div className="space-y-6 font-gatsbybold text-lg leading-relaxed text-gray-300">
                <p className="text-2xl text-white  first-letter:text-4xl first-letter:font-glimmer first-letter:text-jazz-gold first-letter:float-left first-letter:mr-2">
                  A <span className="jazz-gold font-bold">banda Mariana Matheos</span> é especializada em <span className="jazz-gold font-bold">jazz soul blues e R&B</span> em Minas Gerais. Nossa <span className="jazz-gold font-bold">banda ao vivo</span> oferece <span className="jazz-gold font-bold">shows personalizados</span> para casamentos, eventos corporativos e celebrações especiais, criando experiências musicais únicas que combinam a elegância clássica do jazz com a energia contagiante do soul, blues e R&B.
                </p>
                
                <p className="text-2xl">
                  Com a liderança carismática da cantora <span className="jazz-gold font-semibold">Mariana Matheos</span>, nossa <span className="jazz-gold font-semibold">banda para evento</span> apresenta <span className="jazz-gold font-semibold">shows de jazz soul blues ao vivo</span> personalizados para cada ocasião. Somos reconhecidos pela nossa capacidade de criar atmosferas sofisticadas e envolventes através de repertório cuidadosamente selecionado, figurinos temáticos e presença cênica marcante.
                </p>
                
                <p className="text-2xl font-bold">
                  Quando você contrata a <span className="jazz-gold">banda Mariana Matheos ao vivo</span>, está escolhendo profissionais experientes para transformar seu evento em uma experiência inesquecível. Nossos <span className="jazz-gold">shows de soul jazz blues e R&B ao vivo</span> são reconhecidos em toda Minas Gerais pela qualidade musical excepcional e dedicação artística.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 border-l-4 border-jazz-gold bg-jazz-dark bg-opacity-20">
                <p className="font-glimmer text-xl jazz-gold italic">
                  "Nossa banda ao vivo é mais que música - é uma ponte entre épocas, conectando a sofisticação do jazz clássico com a energia contemporânea do soul, blues e R&B."
                </p>
                <p className="font-gatsbybold text-xl text-gray-100 mt-2">— Mariana Matheos, Vocalista da Banda</p>
              </div>
            </div>

            <div className="animate-scale-in group relative w-full h-max-full max-w-md mx-auto">
              <div className="relative w-full h-[400px] flex items-center justify-center">
                
                {/* Moldura decorativa como imagem */}
                <img
                  src={bordarArtDeco}
                  alt="Moldura Art Déco decorativa - Banda de jazz para evento"
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
