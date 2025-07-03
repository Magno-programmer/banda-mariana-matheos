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
              <p className="text-lg text-white tracking-widest">Jazz Band</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex space-x-6">
            {['Inicio', 'Sobre', 'Repertorio', 'Videos', 'Fotos', 'Agenda', 'Contato'].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                className="text-jazz-gold hover:text-white transition-colors font-gatsbybold tracking-wide"
              >
                {item}
              </button>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
