
import React, {useRef, useState} from 'react';
import bordarArtDeco from '@/assets/images/divisor-de-textos.png';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const AboutSection = () => {
  const [imagemUnica, setImagemUnica] = useState(null);

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
              Sobre a Banda
            </h2>

            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco"
                className="w-[80%] object-contain"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="space-y-6 font-gatsby text-lg leading-relaxed text-gray-300">
                <p className="text-3xl text-white first-letter:text-4xl first-letter:font-glimmer first-letter:text-jazz-gold first-letter:float-left first-letter:mr-2">
                  A banda <span className="jazz-gold font-semibold">Mariana Matheos</span> oferece muito mais do que música ao vivo — entrega uma experiência sensorial sofisticada, envolvente e memorável. Inspirada na Era de Ouro do Jazz (1920–1960), sua sonoridade reflete o requinte de um tempo em que a arte de tocar era também a arte de emocionar.
                </p>
                
                <p className="text-3xl">
                  Sob a liderança da cantora <span className="jazz-gold font-semibold">Mariana Matheos</span>, cuja voz combina elegância, carisma e intensidade emocional, o grupo apresenta performances sob medida para eventos que exigem <span className="jazz-gold font-semibold">excelência estética e sonora</span>.
                </p>
                
                <p className="text-3xl font-bold">
                  Cada apresentação é um espetáculo completo — com figurinos planejados, repertório personalizado e presença cênica. É música viva, com alma, para eventos verdadeiramente especiais.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 border-l-4 border-jazz-gold bg-jazz-dark bg-opacity-20">
                <p className="font-glimmer text-xl jazz-gold italic">
                  "A música é a linguagem universal da alma, e nós falamos fluentemente."
                </p>
                <p className="font-gatsbybold text-sm text-gray-100 mt-2">— Mariana Matheos</p>
              </div>
            </div>

            <div className="animate-scale-in group relative w-[360px] h-[400px] mx-auto">
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Moldura decorativa como imagem */}
                <img
                  src={bordarArtDeco}
                  alt="Moldura Art Déco"
                  className="absolute object-contain pointer-events-none z-30"
                />

                {/* Área clicável */}
                <div
                  className="relative w-[330px] h-[230px] bg-gradient-to-br -inset-1 mt-3 from-jazz-dark to-black flex items-center justify-center overflow-hidden cursor-pointer z-20"
                  onClick={() => {
                    if (!imagemUnica) singleInputRef.current.click();
                  }}
                >
                  {/* Se houver imagem */}
                  {imagemUnica ? (
                    <>
                      <img
                        src={imagemUnica.src}
                        alt={imagemUnica.alt}
                        className="object-cover filter sepia-[0.3] contrast-110"
                      />
                      {/* Botão remover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSingleImageRemove();
                        }}
                        className="absolute top-2 right-2 z-30 bg-black/60 text-jazz-gold px-2 py-1 text-sm font-bold rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        Remover
                      </button>
                    </>
                  ) : (
                    // Ícone de "+" quando não há imagem
                    <span className="text-jazz-gold text-5xl select-none">＋</span>
                  )}

                  {/* Overlay escuro decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Input de arquivo (oculto) */}
                <input
                  type="file"
                  accept="image/*"
                  ref={singleInputRef}
                  onChange={handleSingleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
