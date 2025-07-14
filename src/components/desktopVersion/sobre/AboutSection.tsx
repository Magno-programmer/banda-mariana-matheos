
import React, {useRef, useState} from 'react';
import bordarArtDeco from '@/assets/images/divisor-de-textos.png';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const AboutSection = () => {
  const [imagemUnica, setImagemUnica] = useState({src: '/images/cantora.png', alt: 'Cantora Mariana Matheos'});

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
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-5xl md:text-6xl font-bold jazz-gold mb-4 jazz-text-shadow">
              Sobre a Banda de Jazz Mariana Matheos
            </h2>

            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco"
                className="w-[50%] object-contain"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="space-y-6 font-gatsbybold text-lg leading-relaxed text-gray-300">
                <h3 className="text-3xl font-glimmer jazz-gold mb-4">
                  Experiência Musical Profissional Há Mais de Uma Década
                </h3>
                
                <p className="text-2xl text-white first-letter:text-4xl first-letter:font-glimmer first-letter:text-jazz-gold first-letter:float-left first-letter:mr-2">
                  A banda <span className="jazz-gold font-bold">Mariana Matheos</span> oferece muito mais do que música ao vivo — entrega uma experiência sensorial sofisticada, envolvente e memorável para eventos especiais. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade reflete o requinte de um tempo em que a arte de tocar era também a arte de emocionar.
                </p>
                
                <h4 className="text-2xl jazz-gold font-bold mt-6 mb-3">
                  Por Que Escolher Nossa Banda de Jazz?
                </h4>
                
                <p className="text-2xl">
                  Sob a liderança da cantora <span className="jazz-gold font-semibold">Mariana Matheos</span>, cuja voz combina elegância técnica, carisma e intensidade emocional, nosso grupo apresenta performances sob medida para <span className="jazz-gold font-semibold">casamentos elegantes, eventos corporativos sofisticados e celebrações especiais</span> que exigem excelência estética e sonora.
                </p>
                
                <h4 className="text-2xl jazz-gold font-bold mt-6 mb-3">
                  O Que Oferecemos em Cada Apresentação
                </h4>
                
                <ul className="text-xl space-y-2 list-disc list-inside">
                  <li>Repertório personalizado de Jazz, Soul, Blues e R&B</li>
                  <li>Figurinos temáticos da Era de Ouro do Jazz</li>
                  <li>Presença cênica profissional e envolvente</li>
                  <li>Equipamentos de som de alta qualidade</li>
                  <li>Atendimento em Minas Gerais e região</li>
                </ul>
                
                <p className="text-2xl font-bold">
                  Cada apresentação é um espetáculo completo — música viva, com alma, para eventos verdadeiramente especiais e inesquecíveis.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 border-l-4 border-jazz-gold bg-jazz-dark bg-opacity-20">
                <p className="font-glimmer text-xl jazz-gold italic">
                  "A música é a linguagem universal da alma, e nós falamos fluentemente."
                </p>
                <p className="font-gatsbybold text-xl text-gray-100 mt-2">— Mariana Matheos</p>
              </div>
            </div>

            <div className="animate-scale-in group relative w-full h-max-full max-w-md mx-auto">
              <div className="relative w-full h-[400px] flex items-center justify-center">
                
                {/* Moldura decorativa como imagem */}
                <img
                  src={bordarArtDeco}
                  alt="Moldura Art Déco"
                  className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none z-30"
                />

                {/* Área clicável */}
                <div
                  className="relative w-[93%] h-[73%] bg-gradient-to-br -inset-1 mt-3 from-jazz-dark to-black flex items-center justify-center overflow-hidden z-20"
                >
                  <img
                    src={imagemUnica.src}
                    alt="Mariana Matheos - Cantora profissional de jazz, especialista em música ao vivo para casamentos e eventos elegantes"
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
