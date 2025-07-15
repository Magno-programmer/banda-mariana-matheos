import React from 'react';
import { Phone, Mail, MapPin, Clock, Music } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const ContactSection = () => {
  const { styles, isMobile } = useResponsiveComponent();

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♪</div>
        <div className="absolute bottom-20 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♫</div>
      </div>

      <div className={styles.container}>
        <div className="text-center mb-16">
          <h1 className={`font-gatsby ${styles.text.xlarge} text-jazz-gold mb-6`}>
            Entre em Contato
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Vamos conversar sobre como transformar seu evento numa experiência musical inesquecível
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6`}>
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="text-jazz-gold w-6 h-6" />
                  <div>
                    <p className="font-gatsby text-gray-300">Telefone/WhatsApp</p>
                    <a 
                      href="tel:+5531997522127"
                      className="font-gatsby text-jazz-gold hover:text-jazz-gold/80 transition-colors"
                    >
                      +55 (31) 99752-2127
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="text-jazz-gold w-6 h-6" />
                  <div>
                    <p className="font-gatsby text-gray-300">E-mail</p>
                    <a 
                      href="mailto:contato@marianamatheos.com.br"
                      className="font-gatsby text-jazz-gold hover:text-jazz-gold/80 transition-colors"
                    >
                      contato@marianamatheos.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="text-jazz-gold w-6 h-6" />
                  <div>
                    <p className="font-gatsby text-gray-300">Localização</p>
                    <p className="font-gatsby text-white">Belo Horizonte, MG</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="text-jazz-gold w-6 h-6" />
                  <div>
                    <p className="font-gatsby text-gray-300">Horário de Atendimento</p>
                    <p className="font-gatsby text-white">Segunda a Domingo: 09:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <h3 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6`}>
                Nossos Serviços
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Music className="text-jazz-gold w-5 h-5" />
                  <span className="font-gatsby text-gray-300">Música para Casamentos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="text-jazz-gold w-5 h-5" />
                  <span className="font-gatsby text-gray-300">Eventos Corporativos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="text-jazz-gold w-5 h-5" />
                  <span className="font-gatsby text-gray-300">Shows e Festivais</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="text-jazz-gold w-5 h-5" />
                  <span className="font-gatsby text-gray-300">Jantares Elegantes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="text-jazz-gold w-5 h-5" />
                  <span className="font-gatsby text-gray-300">Bares de Vinho</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
            <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6`}>
              Solicite seu Orçamento
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-gatsby text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-jazz-gold transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block font-gatsby text-gray-300 mb-2">E-mail</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-jazz-gold transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block font-gatsby text-gray-300 mb-2">Telefone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-jazz-gold transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block font-gatsby text-gray-300 mb-2">Tipo de Evento</label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-jazz-gold transition-colors">
                  <option value="">Selecione o tipo de evento</option>
                  <option value="casamento">Casamento</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="show">Show/Festival</option>
                  <option value="jantar">Jantar Elegante</option>
                  <option value="bar">Bar/Restaurante</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block font-gatsby text-gray-300 mb-2">Mensagem</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-jazz-gold transition-colors"
                  placeholder="Conte-nos mais sobre seu evento..."
                />
              </div>

              <button className="w-full bg-jazz-gold hover:bg-jazz-gold/90 text-black py-3 rounded-lg font-gatsby text-lg transition-all duration-300">
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-6`}>
            Prefere falar diretamente conosco?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Gostaria de saber mais sobre os shows da Mariana Matheos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;