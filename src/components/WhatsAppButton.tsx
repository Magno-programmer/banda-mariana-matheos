
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappMessage = "Olá, Mariana! Vi seu site e gostaria de saber mais sobre a banda.";
  const whatsappNumber = "5531997522127"; // Substitua pelo número real
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group animate-scale-in"
      style={{animationDelay: '1s'}}
    >
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 flex items-center">
        <MessageCircle className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black text-jazz-gold px-3 py-2 rounded text-sm font-gatsby whitespace-nowrap border border-jazz-gold border-opacity-30">
            Fale conosco no WhatsApp
            <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
    </a>
  );
};

export default WhatsAppButton;
