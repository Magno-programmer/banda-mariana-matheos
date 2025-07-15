import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente-invertida.png';
import { useNavigate } from 'react-router-dom';
import VoiceAccessibilityButton from '@/components/globalComponents/VoiceAccessibilityButton';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { styles, navigation, isMobile, isDesktop } = useResponsiveComponent();

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

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50 font-gatsbybold text-2xl" role="banner">
      <div className={styles.container}>
        <div className="flex justify-between items-center py-3">
          
          {/* Logo + nome com SEO otimizado */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavigation('/inicio')}
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1"
              aria-label="Ir para página inicial - Mariana Matheos Banda de Jazz"
            >
              <img 
                src={logoWhite}
                alt="Logo Mariana Matheos - Banda de Jazz Blues Soul R&B Belo Horizonte"
                className={navigation.logoSize + " object-contain"}
              />
              {navigation.showBrandText && (
                <div>
                  <div className={`${styles.text.medium} font-bold text-jazz-gold font-glimmer`}>
                    Mariana Matheos
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-lg'} text-white tracking-widest`}>
                    Jazz Blues Soul R&B Band
                  </p>
                </div>
              )}
            </button>
          </div>

          <VoiceAccessibilityButton />
      
          {/* Desktop Navigation */}
          {navigation.showFullNavigation && (
            <nav className="flex space-x-6" role="navigation" aria-label="Menu principal da banda">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="text-jazz-gold hover:text-white focus:text-white transition-colors font-gatsbybold tracking-wide focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                  title={item.title}
                  aria-label={item.title}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavigation(item.path);
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          )}
          
          {/* Mobile/Tablet menu button */}
          {navigation.showMobileMenu && (
            <button
              className="text-jazz-gold hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded p-1"
              aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isMenuOpen}
              aria-controls="responsive-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile/Tablet Navigation Menu */}
        {isMenuOpen && navigation.showMobileMenu && (
          <nav
            id="responsive-menu"
            role="navigation"
            aria-label="Menu principal mobile"
            className="fixed top-20 right-4 w-60 max-h-[80vh] z-50 bg-black bg-opacity-95 border border-jazz-gold rounded-lg shadow-lg p-4 space-y-4 scrollbar-thin scrollbar-thumb-jazz-gold scrollbar-track-transparent overflow-y-auto"
          >
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="block w-full text-right text-jazz-gold hover:text-white focus:text-white transition-colors border-b border-jazz-gold/20 pb-2 font-gatsbybold focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                title={item.title}
                aria-label={item.title}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigation(item.path);
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

export default Header;