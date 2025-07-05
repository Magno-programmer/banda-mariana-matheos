import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente-invertida.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50 font-gatsbybold text-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo + nome */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoWhite}
              alt="Mariana Matheos"
              className="w-12 h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-jazz-gold font-glimmer">Mariana Matheos</h1>
              <p className="text-xs text-white tracking-widest">Jazz Band</p>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-jazz-gold"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="fixed top-20 right-4 w-56 z-50 bg-black bg-opacity-95 border border-jazz-gold rounded-lg shadow-lg p-4 space-y-4">
            {['Inicio', 'Sobre', 'Repertorio', 'Videos', 'Fotos', 'Agenda', 'Contato'].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(`/${item.toLowerCase()}`);
                  setIsMenuOpen(false);
                }}
                className="block text-right text-jazz-gold hover:text-white transition-colors border-b border-jazz-gold/20 pb-2 font-gatsbybold"
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
