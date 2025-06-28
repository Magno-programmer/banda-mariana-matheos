
import React from 'react';
import { Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-jazz-gold border-opacity-30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="font-glimmer text-2xl font-bold jazz-gold mb-4">
                Mariana Matheos
              </h3>
              <p className="font-gatsby text-gray-400 text-sm">
                Jazz Band
              </p>
              <p className="font-gatsby text-gray-400 text-sm mt-2">
                Era de Ouro do Jazz (1920–1960)
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <h4 className="font-glimmer text-lg jazz-gold mb-4">Contato</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:contato@marianamatheos.com.br" 
                  className="flex items-center justify-center font-gatsby text-gray-400 text-sm hover:text-jazz-gold transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contato@marianamatheos.com.br
                </a>
                <a 
                  href="tel:+5531997522127" 
                  className="flex items-center justify-center font-gatsby text-gray-400 text-sm hover:text-jazz-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (31) 99752-2127
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
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
              <p className="font-gatsby text-gray-500 text-sm">
                © 2024 Mariana Matheos Jazz Band. Todos os direitos reservados.
              </p>
              <p className="font-gatsby text-gray-500 text-xs mt-2">
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
