import React, {useState, useRef} from 'react';

const GallerySection = () => {
  const [images, setImages] = useState([
    
  ]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        src: URL.createObjectURL(file),
        alt: file.name,
      };
      setImages((prev) => [...prev, newImage]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  } // Function to remove an image from the gallery

  return (
    <section className="py-20 bg-black relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-jazz-gold rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-jazz-gold rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-glimmer text-5xl md:text-6xl font-bold jazz-gold mb-4 jazz-text-shadow">
            Galeria
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-jazz-gold w-20"></div>
            <div className="mx-4 w-3 h-3 bg-jazz-gold rounded-full"></div>
            <div className="h-px bg-jazz-gold w-20"></div>
          </div>
          <p className="font-gatsby text-lg text-gray-300 max-w-2xl mx-auto">
            Momentos especiais capturados durante nossas apresentações exclusivas
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group animate-scale-in relative overflow-hidden"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Art Deco frame */}
              <div className="absolute -inset-2 border-2 border-jazz-gold opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>
              
              <div className="relative overflow-hidden bg-jazz-dark">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 md:h-72 object-cover filter sepia-[0.2] contrast-110 group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-jazz-gold bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* Botão de remover (hover) */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 z-20 bg-black/60 text-jazz-gold px-2 py-1 text-sm font-bold rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Remover
                </button>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-gatsby text-white text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}

          {/* File input for adding new images */}
          <div 
            className="relative flex items-center justify-center h-64 md:h-72 border-2 border-dashed border-jazz-gold text-jazz-gold cursor-pointer group hover:bg-jazz-gold/10 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="text-2xl">+</span>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Video placeholder */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="font-glimmer text-3xl font-bold jazz-gold mb-4">Performance ao Vivo</h3>
            <p className="font-gatsby text-gray-300">Assista um trecho de nossa apresentação</p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-jazz-gold opacity-30"></div>
            <div className="relative bg-jazz-dark h-64 md:h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-jazz-gold hover:text-black transition-all duration-300 cursor-pointer">
                  <span className="text-2xl">▶</span>
                </div>
                <p className="font-gatsby text-jazz-gold">Vídeo em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
