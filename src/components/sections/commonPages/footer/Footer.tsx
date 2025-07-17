
import React from 'react';
import { Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const Footer = () => {
  const { isMobile, isTablet } = useAdvancedViewport();

  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const smallText = isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg';

  return (
    <footer className="bg-black py-12 border-t border-jazz-gold border-opacity-30" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <p className={`font-glimmer ${textSize} font-bold jazz-gold mb-4`}>
                Mariana Matheos
              </p>
              <p className={`font-gatsbybold text-gray-400 ${textSize}`}>
                Banda de jazz
              </p>
              <p className={`font-gatsbybold text-gray-400 ${textSize} mt-2`}>
                Era de Ouro do Jazz (1920–1960)
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <p className={`font-glimmer ${textSize} jazz-gold mb-4`}>Contato</p>
              <div className="space-y-2">
                <a 
                  href="tel:+5531997522127"  
                  className={`flex items-center justify-center font-gatsbybold text-gray-400 ${smallText} hover:text-jazz-gold focus:text-jazz-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1`}
                  aria-label="Ligar para (31) 99752-2127 - Contato da Banda Mariana Matheos"
                >
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  (31) 99752-2127
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <p className={`font-glimmer ${textSize} jazz-gold mb-4`}>Redes Sociais</p>
              <div className="flex justify-center md:justify-end space-x-4" role="list">
                <a 
                  href="https://instagram.com/marianamatheosoficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-jazz-gold rounded-full flex items-center justify-center text-jazz-gold hover:bg-jazz-gold hover:text-black focus:bg-jazz-gold focus:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Seguir Mariana Matheos no Instagram (abre em nova aba)"
                  role="listitem"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://youtube.com/@marianamatheosoficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-jazz-gold rounded-full flex items-center justify-center text-jazz-gold hover:bg-jazz-gold hover:text-black focus:bg-jazz-gold focus:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Inscrever-se no canal do YouTube da Mariana Matheos (abre em nova aba)"
                  role="listitem"
                >
                  <Youtube className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-jazz-gold border-opacity-20 pt-8">
            <div className="text-center">
              <p className={`font-gatsbybold text-gray-500 ${smallText}`}>
                © 2024 Mariana Matheos Banda de jazz. Todos os direitos reservados.
              </p>
              <p className={`font-gatsbybold text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'} mt-2`}>
                "Mariana Matheos, o vintage que te trará uma experiência musical sofisticada, atemporal e arrebatadora"
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
