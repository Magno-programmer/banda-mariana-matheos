import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPageRelations, type InternalLink } from '@/types/internalLinks';
import { 
  Users, Music, Camera, Play, Calendar, MessageCircle, 
  Star, HelpCircle, ArrowRight, Sparkles, Heart,
  ExternalLink
} from 'lucide-react';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

// Mapeamento de ícones
const iconMap = {
  Users,
  Music,
  Camera,
  Play,
  Calendar,
  MessageCircle,
  Star,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Heart,
  ExternalLink
};

interface InternalLinkBuilderProps {
  variant?: 'sidebar' | 'footer' | 'inline' | 'grid';
  showOnlyPrimary?: boolean;
  maxLinks?: number;
  className?: string;
}

const InternalLinkBuilder: React.FC<InternalLinkBuilderProps> = ({
  variant = 'sidebar',
  showOnlyPrimary = false,
  maxLinks = 6,
  className = ''
}) => {
  const location = useLocation();
  const { isMobile, isTablet } = useAdvancedViewport();
  const relations = getPageRelations(location.pathname);

  // Combinar e filtrar links baseado nas configurações
  const allLinks = [
    ...relations.relatedPages,
    ...relations.contextualLinks,
    ...relations.callToActionLinks
  ];

  const filteredLinks = showOnlyPrimary 
    ? allLinks.filter(link => link.category === 'primary')
    : allLinks;

  const sortedLinks = filteredLinks
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxLinks);

  if (sortedLinks.length === 0) return null;

  const LinkCard: React.FC<{ link: InternalLink; index: number }> = ({ link, index }) => {
    const IconComponent = iconMap[link.icon as keyof typeof iconMap] || ArrowRight;
    
    return (
      <Link
        to={link.path}
        className={`
          group relative overflow-hidden rounded-lg
          bg-gradient-to-br from-black via-jazz-dark to-black
          border border-jazz-gold/20 hover:border-jazz-gold/40
          p-4 transition-all duration-500 ease-out
          hover:scale-105 hover:shadow-lg hover:shadow-jazz-gold/20
          transform-gpu will-change-transform
          ${variant === 'grid' ? 'min-h-[120px]' : ''}
          ${isMobile ? 'p-3' : 'p-4'}
        `}
        style={{
          animationDelay: `${index * 100}ms`,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}
      >
        {/* Efeito de brilho Art Déco */}
        <div className="absolute inset-0 bg-gradient-to-br from-jazz-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Decoração Art Déco nos cantos */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-jazz-gold/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-jazz-gold/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        <div className="relative z-10 flex items-start gap-3">
          {/* Ícone */}
          <div className="flex-shrink-0 p-2 rounded-lg bg-jazz-gold/10 group-hover:bg-jazz-gold/20 transition-colors duration-300">
            <IconComponent 
              size={isMobile ? 20 : 24} 
              className="text-jazz-gold group-hover:scale-110 transition-transform duration-300" 
            />
          </div>
          
          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-gatsby font-semibold text-white group-hover:text-jazz-gold 
              transition-colors duration-300 mb-1 leading-tight
              ${isMobile ? 'text-sm' : 'text-base'}
            `}>
              {link.title}
            </h3>
            <p className={`
              text-white/70 group-hover:text-white/90 
              transition-colors duration-300 leading-relaxed
              ${isMobile ? 'text-xs' : 'text-sm'}
            `}>
              {link.description}
            </p>
            
            {/* Indicador de categoria */}
            {link.category === 'primary' && (
              <div className="flex items-center gap-1 mt-2">
                <Sparkles size={12} className="text-jazz-gold" />
                <span className="text-xs text-jazz-gold font-medium">Recomendado</span>
              </div>
            )}
          </div>
          
          {/* Seta indicativa */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowRight size={16} className="text-jazz-gold" />
          </div>
        </div>
      </Link>
    );
  };

  // Renderização baseada na variante
  const renderVariant = () => {
    switch (variant) {
      case 'grid':
        return (
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'} ${className}`}>
            {sortedLinks.map((link, index) => (
              <LinkCard key={link.path} link={link} index={index} />
            ))}
          </div>
        );
        
      case 'inline':
        return (
          <div className={`flex flex-wrap gap-3 ${className}`}>
            {sortedLinks.map((link, index) => (
              <LinkCard key={link.path} link={link} index={index} />
            ))}
          </div>
        );
        
      case 'footer':
        return (
          <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} ${className}`}>
            {sortedLinks.slice(0, 4).map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="group flex items-center gap-2 text-sm text-white/70 hover:text-jazz-gold transition-colors duration-300"
              >
                {React.createElement(iconMap[link.icon as keyof typeof iconMap] || ArrowRight, { 
                  size: 14, 
                  className: "group-hover:scale-110 transition-transform duration-300" 
                })}
                <span className="group-hover:underline">{link.title}</span>
              </Link>
            ))}
          </div>
        );
        
      default: // sidebar
        return (
          <div className={`space-y-3 ${className}`}>
            {sortedLinks.map((link, index) => (
              <LinkCard key={link.path} link={link} index={index} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="internal-link-builder">
      {renderVariant()}
      
      {/* Animação CSS definida no index.css */}
    </div>
  );
};

export default InternalLinkBuilder;