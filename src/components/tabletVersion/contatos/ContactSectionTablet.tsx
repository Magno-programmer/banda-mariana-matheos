
import { MessageCircle, Instagram, MapPin } from 'lucide-react';
import fundoBanda from '@/assets/images/imagem-da-banda.jpg'; // imagem de fundo da banda
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const navigate = useNavigate();

  const whatsappLink = "https://wa.me/5531997522127?text=Olá,%20gostaria%20de%20entrar%20em%20contato%20com%20a%20banda%20Mariana%20Matheos.";

  return (
    <section id="contato" className="py-20 bg-black relative">
      {/* Imagem de fundo escurecida */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{ backgroundImage: `url(${fundoBanda})` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-glimmer text-jazz-gold mb-4">Entre em Contato</h2>
          <div className="w-24 h-1 bg-jazz-gold mx-auto mb-4"></div>
          <p className="text-2xl text-gray-50 font-gatsbybold">
            Ficaremos felizes em tocar no seu evento
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Informações de Contato */}
            <div className="bg-gradient-to-br from-black to-jazz-dark border border-jazz-gold rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-glimmer text-jazz-gold mb-6">Informações</h3>

              <div className="space-y-6 font-gatsby text-gray-300">
                <ContactItem icon={MessageCircle} label="WhatsApp" value="+55 (31) 9 9752-2127" />
                <ContactItem icon={MapPin} label="Atuação" value="Minas Gerais e região" />
                <ContactItem icon={Instagram} label="Instagram" value="@marianamatheosoficial" />
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gradient-to-br from-black to-jazz-dark border border-jazz-gold rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-glimmer text-jazz-gold mb-6">Ações Rápidas</h3>

              <div className="space-y-4">
                <ActionButton href={whatsappLink} icon={MessageCircle} text="Falar no WhatsApp" />

                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-transparent border border-jazz-gold text-jazz-gold text-xl font-gatsbybold py-3 rounded hover:bg-jazz-gold hover:text-black transition"
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
const ContactItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 border border-jazz-gold rounded-full flex items-center justify-center">
      <Icon size={22} className="text-jazz-gold" />
    </div>
    <div>
      <p className="text-xl font-gatsbybold text-jazz-gold">{label}</p>
      <p className="text-xl font-gatsbybold break-words text-gray-300">{value}</p>
    </div>
  </div>
);

// Componente para botões de ação
const ActionButton = ({ href, icon: Icon, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full flex items-center justify-center space-x-3 border border-jazz-gold text-jazz-gold font-gatsbybold text-xl py-3 rounded hover:bg-jazz-gold hover:text-black transition"
  >
    <Icon size={22} />
    <span>{text}</span>
  </a>
);

export default ContactSection;
