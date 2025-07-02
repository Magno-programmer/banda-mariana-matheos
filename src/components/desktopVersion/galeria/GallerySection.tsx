import React, {useState, useRef} from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const GallerySection = () => {
  const [images, setImages] = useState([]);

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


  const [videoOpen, setVideoOpen] = useState(false);
  
   const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/CO_yWe9z8S0");
  
  const [videos, setVideos] = useState([
    { title: "All About That Bass - Postmodern Jukebox Cover (Matozinhos)", url: "https://www.youtube.com/embed/CO_yWe9z8S0" },
    { title: "Blue Moon - Billie Holiday (Festival Jazz & Blues)", url: "https://www.youtube.com/embed/h8z62Ae5a9Q" },
    { title: "Summertime (Festival Jazz & Blues)", url: "https://www.youtube.com/embed/3vUOFhwE134" },
  ]);

  const [newLink, setNewLink] = useState("");

  const thumbnailUrl = "https://img.youtube.com/vi/CO_yWe9z8S0/hqdefault.jpg"; // Default thumbnail URL

  // Função para converter link do YouTube para formato embed
  const convertToEmbed = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const handleAddVideo = () => {
    const embedUrl = convertToEmbed(newLink);
    if (embedUrl) {
      setVideos((prev) => [...prev, { title: `Vídeo ${prev.length + 1}`, url: embedUrl }]);
      setNewLink("");
    } else {
      alert("Link inválido. Use um link do YouTube.");
    }
  };

  const handleVideoSelect = (url) => {
    setVideoUrl(url);
    setVideoOpen(true);
  };

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
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco"
                className="w-[50%] object-contain"
              />
            </div>
          <p className="font-gatsbybold text-xl text-gray-400 max-w-2xl mx-auto">
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


    {/* Vídeo session */}
    <div className="mt-16 max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="font-glimmer text-3xl font-bold jazz-gold mb-4">Performance ao Vivo</h3>
        <p className="font-gatsbybold text-gray-400 text-xl">Assista um trecho da apresentação</p>
      </div>

      {/* Vídeo embed */}
      <div className="relative bg-jazz-dark h-[450px] border border-jazz-dark border-opacity-50 flex items-center justify-center">
        {videoOpen ? (
          <iframe
            className="w-full h-full"
            src={`${videoUrl}?autoplay=1`}
            title="Vídeo da banda Mariana Matheos"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="text-center">
            <div
              onClick={() => setVideoOpen(true)}
              className="relative w-full h-full cursor-pointer group"
            >
              
              <img
                src={thumbnailUrl}
                alt="Capa do vídeo"
                className="h-[450px] w-[700px] object-cover"
              />
              {/* Ícone play centralizado */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
                <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center hover:bg-jazz-gold hover:text-black transition text-jazz-gold text-3xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.197-3.6A1 1 0 007 8.5v7a1 1 0 001.555.832l6.197-3.6a1 1 0 000-1.664z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Campo para adicionar novo vídeo */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Cole aqui o link do YouTube"
            className="w-96 px-4 py-2 border border-jazz-gold bg-black text-white placeholder:text-gray-400 font-gatsbybold text-sm"
          />
          <button
            onClick={handleAddVideo}
            className="px-4 py-2 border border-jazz-gold text-jazz-gold font-gatsbybold hover:bg-jazz-gold hover:text-black transition"
          >
            Adicionar vídeo
          </button>
        </div>

        {/* Lista de vídeos para assistir */}
        <div className="mt-6 grid grid-cols-3 flex flex-wrap justify-center gap-4">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => handleVideoSelect(video.url)}
              className="font-gatsbybold text-sm md:text-base px-4 py-2 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition"
            >
              {video.title}
            </button>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default GallerySection;
