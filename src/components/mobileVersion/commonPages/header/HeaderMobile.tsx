import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente-invertida.png';
import { useNavigate } from 'react-router-dom';
import VoiceAccessibilityButton from '@/components/globalComponents/VoiceAccessibilityButton';

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Início', path: '/inicio', title: 'Banda de Jazz Blues Soul R&B BH - Página Principal' },
    { name: 'Sobre', path: '/sobre', title: 'Sobre a Banda de Jazz Mariana Matheos - História e Membros' },
    { name: 'Repertório', path: '/repertorio', title: 'Repertório Jazz Blues Soul R&B - Lista de Músicas' },
    { name: 'Vídeos', path: '/videos', title: 'Vídeos da Banda de Jazz - Apresentações ao Vivo' },
    { name: 'Fotos', path: '/fotos', title: 'Galeria de Fotos - Banda de Jazz em Eventos' },
    { name: 'Agenda', path: '/agenda', title: 'Agenda de Shows - Próximas Apresentações da Banda' },
    { name: 'Depoimentos', path: '/depoimentos', title: 'Depoimentos - Contratantes e ouvintes' },
    { name: 'FAQ', path: '/faq', title: 'Perguntas Frequentes - Mariana Matheos' },
    { name: 'Contato', path: '/contato', title: 'Contratar Banda de Jazz - Contato' }
  ];

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50 font-gatsbybold text-2xl" role="banner">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo e nome da banda */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/inicio')}
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1"
              aria-label="Ir para página inicial - Mariana Matheos Banda de Jazz"
            >
              <img 
                src={logoWhite}
                alt="Logo Mariana Matheos - Banda de Jazz Blues Soul R&B Belo Horizonte"
                className="w-12 h-12 object-contain"
              />
              <div>
                <div className="text-xl font-bold text-jazz-gold font-glimmer">Mariana Matheos</div>
                <p className="text-xs text-white tracking-widest">Jazz Blues Soul R&B Band</p>
              </div>
            </button>
          </div>

          <VoiceAccessibilityButton />

          {/* Botão menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-jazz-gold hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded p-1"
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Navegação mobile */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            role="navigation"
            aria-label="Menu principal mobile"
            className="fixed top-20 right-4 w-60 max-h-[80vh] overflow-y-auto z-50 bg-black bg-opacity-95 border border-jazz-gold rounded-lg shadow-lg p-4 space-y-4 scrollbar-thin scrollbar-thumb-jazz-gold scrollbar-track-transparent"
          >
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-right text-jazz-gold hover:text-white focus:text-white transition-colors border-b border-jazz-gold/20 pb-2 font-gatsbybold focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                title={item.title}
                aria-label={item.title}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderMobile;
