import { MessageCircle, Instagram, MapPin } from 'lucide-react';
import fundoBanda from '@/assets/images/imagem-da-banda.jpg';
import { useNavigate } from 'react-router-dom';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const ContactSection = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useAdvancedViewport();

  const whatsappLink = "https://wa.me/5531997522127?text=Olá,%20gostaria%20de%20entrar%20em%20contato%20com%20a%20banda%20Mariana%20Matheos.";

  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-6xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const cardTitleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-2xl';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1' : 'grid-cols-2';

  return (
    <section id="contato" className="py-20 bg-black relative">
      {/* Imagem de fundo escurecida */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{ backgroundImage: `url(${fundoBanda})` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`${titleSize} font-glimmer text-jazz-gold mb-4`}>Entre em Contato</h2>
          <div className="w-24 h-1 bg-jazz-gold mx-auto mb-4"></div>
          <p className={`${textSize} text-gray-300 font-gatsbybold`}>
            Ficaremos felizes em tocar no seu evento
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`grid ${gridCols} gap-8 mb-12`}>
            {/* Informações de Contato */}
            <div className="bg-gradient-to-br from-black to-jazz-dark border border-jazz-gold rounded-xl shadow-lg p-8">
              <h3 className={`${cardTitleSize} font-glimmer text-jazz-gold mb-6`}>Informações</h3>

              <div className="space-y-6 font-gatsby text-gray-300">
                <ContactItem icon={MessageCircle} label="WhatsApp" value="+55 (31) 9 9752-2127" textSize={textSize} />
                <ContactItem icon={MapPin} label="Atuação" value="Minas Gerais e região" textSize={textSize} />
                <ContactItem icon={Instagram} label="Instagram" value="@marianamatheosoficial" textSize={textSize} />
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gradient-to-br from-black to-jazz-dark border border-jazz-gold rounded-xl shadow-lg p-8">
              <h3 className={`${cardTitleSize} font-glimmer text-jazz-gold mb-6`}>Ações Rápidas</h3>

              <div className="space-y-4">
                <ActionButton href={whatsappLink} icon={MessageCircle} text="Falar no WhatsApp" textSize={textSize} />

                <button
                  onClick={() => navigate('/')}
                  className={`w-full bg-transparent border border-jazz-gold ${textSize} text-jazz-gold font-gatsbybold py-3 rounded hover:bg-jazz-gold hover:text-black transition`}
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente auxiliar para info
const ContactItem = ({ icon: Icon, label, value, textSize }) => (
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 border border-jazz-gold rounded-full flex items-center justify-center">
      <Icon size={22} className="text-jazz-gold" />
    </div>
    <div>
      <p className={`${textSize} font-gatsbybold font-bold text-jazz-gold`}>{label}</p>
      <p className={`${textSize} font-gatsbybold break-words text-gray-300`}>{value}</p>
    </div>
  </div>
);

// Componente para botões de ação
const ActionButton = ({ href, icon: Icon, text, textSize }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-full flex items-center justify-center ${textSize} space-x-3 border border-jazz-gold text-jazz-gold font-gatsbybold py-3 rounded hover:bg-jazz-gold hover:text-black transition`}
  >
    <Icon size={22} />
    <span>{text}</span>
  </a>
);

export default ContactSection;