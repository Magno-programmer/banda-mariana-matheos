
import React from 'react';
import { Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-jazz-gold border-opacity-30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="font-glimmer text-2xl font-bold jazz-gold mb-4">
                Mariana Matheos
              </h3>
              <p className="font-gatsbybold text-gray-400 text-xl">
                Banda de jazz
              </p>
              <p className="font-gatsbybold text-gray-400 text-xl mt-2">
                Era de Ouro do Jazz (1920–1960)
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center mt-1">
              <h4 className="font-glimmer text-lg jazz-gold mb-4">Telefone Contato</h4>
              <div className="space-y-2">
                
                <a 
                  href="tel:+5531997522127" 
                  className="flex items-center justify-center font-gatsbybold text-gray-400 text-xl hover:text-jazz-gold transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (31) 99752-2127
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h4 className="font-glimmer text-lg jazz-gold mb-4">Redes Sociais</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a 
                  href="https://instagram.com/marianamatheosoficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-jazz-gold rounded-full flex items-center justify-center text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@marianamatheosoficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-jazz-gold rounded-full flex items-center justify-center text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-jazz-gold border-opacity-20 pt-8">
            <div className="text-center">
              <p className="font-gatsbybold text-gray-500 text-xl">
                © 2024 Mariana Matheos Banda de jazz. Todos os direitos reservados.
              </p>
              <p className="font-gatsbybold text-gray-500 text-lg mt-2">
                "Uma experiência musical sofisticada, atemporal e arrebatadora"
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
