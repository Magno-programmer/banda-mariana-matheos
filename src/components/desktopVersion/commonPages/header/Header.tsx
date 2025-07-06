
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente-invertida.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Início', path: '/inicio', title: 'Banda de Jazz Soul Blues R&B BH - Página Principal' },
    { name: 'Sobre', path: '/sobre', title: 'Sobre a Banda de Jazz Mariana Matheos - História e Membros' },
    { name: 'Repertório', path: '/repertorio', title: 'Repertório Jazz Soul Blues R&B - Lista de Músicas' },
    { name: 'Vídeos', path: '/videos', title: 'Vídeos da Banda de Jazz - Apresentações ao Vivo' },
    { name: 'Fotos', path: '/fotos', title: 'Galeria de Fotos - Banda de Jazz em Eventos' },
    { name: 'Agenda', path: '/agenda', title: 'Agenda de Shows - Próximas Apresentações da Banda' },
    { name: 'Contato', path: '/contato', title: 'Contratar Banda de Jazz - Orçamento e Contato' }
  ];

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50 font-gatsbybold text-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo + nome com SEO otimizado */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoWhite}
              alt="Logo Mariana Matheos - Banda de Jazz Soul Blues R&B Belo Horizonte"
              className="w-12 h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-jazz-gold font-glimmer">Mariana Matheos</h1>
              <p className="text-lg text-white tracking-widest">Jazz Soul Blues R&B Band</p>
            </div>
          </div>

          {/* Desktop Navigation com links internos SEO */}
          <nav className="flex space-x-6" role="navigation" aria-label="Menu principal da banda">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-jazz-gold hover:text-white transition-colors font-gatsbybold tracking-wide"
                title={item.title}
                aria-label={item.title}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
