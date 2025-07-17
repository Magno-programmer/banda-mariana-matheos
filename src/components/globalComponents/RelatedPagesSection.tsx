import React from 'react';
import { useLocation } from 'react-router-dom';
import InternalLinkBuilder from './InternalLinkBuilder';
import { getPageRelations } from '@/types/internalLinks';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

interface RelatedPagesSectionProps {
  title?: string;
  subtitle?: string;
  variant?: 'sidebar' | 'footer' | 'inline' | 'grid';
  showOnlyPrimary?: boolean;
  maxLinks?: number;
  className?: string;
}

const RelatedPagesSection: React.FC<RelatedPagesSectionProps> = ({
  title,
  subtitle,
  variant = 'grid',
  showOnlyPrimary = false,
  maxLinks = 6,
  className = ''
}) => {
  const location = useLocation();
  const { isMobile, isTablet } = useAdvancedViewport();
  const relations = getPageRelations(location.pathname);

  // Se não há links relacionados, não renderiza a seção
  const hasLinks = relations.relatedPages.length > 0 || 
                   relations.contextualLinks.length > 0 || 
                   relations.callToActionLinks.length > 0;

  if (!hasLinks) return null;

  // Títulos padrão baseados na página atual
  const getDefaultTitle = () => {
    const pathTitles: { [key: string]: string } = {
      '/': 'Explore Nossos Serviços',
      '/sobre': 'Conheça Mais Sobre Nós',
      '/repertorio': 'Veja Nosso Trabalho',
      '/fotos': 'Mais Conteúdo Visual',
      '/videos': 'Explore Mais',
      '/agendamento': 'Informações Importantes',
      '/contato': 'Antes de Entrar em Contato',
      '/faq': 'Próximos Passos',
      '/depoimentos': 'Veja Nosso Trabalho'
    };
    return pathTitles[location.pathname] || 'Páginas Relacionadas';
  };

  const getDefaultSubtitle = () => {
    const pathSubtitles: { [key: string]: string } = {
      '/': 'Descubra tudo que oferecemos para tornar seu evento inesquecível',
      '/sobre': 'Explore nosso trabalho e veja por que somos a escolha certa',
      '/repertorio': 'Veja como nossas músicas ganham vida em eventos reais',
      '/fotos': 'Descubra mais sobre nossos serviços e qualidade',
      '/videos': 'Conheça mais sobre nossa banda e serviços',
      '/agendamento': 'Informações que podem ajudar em sua decisão',
      '/contato': 'Conheça melhor nossos serviços antes de solicitar orçamento',
      '/faq': 'Continue explorando nossos serviços e diferenciais',
      '/depoimentos': 'Veja o trabalho que gera tantos elogios'
    };
    return pathSubtitles[location.pathname] || 'Explore conteúdos relacionados que podem interessar você';
  };

  const sectionTitle = title || getDefaultTitle();
  const sectionSubtitle = subtitle || getDefaultSubtitle();

  return (
    <section className={`related-pages-section py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-jazz-gold to-transparent"></div>
            <div className="w-2 h-2 bg-jazz-gold rounded-full animate-pulse"></div>
            <div className="w-12 h-px bg-gradient-to-r from-jazz-gold via-transparent to-transparent"></div>
          </div>
          
          <h2 className={`
            font-glimmer text-jazz-gold font-bold mb-3
            ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}
          `}>
            {sectionTitle}
          </h2>
          
          <p className={`
            text-white/80 max-w-2xl mx-auto leading-relaxed
            ${isMobile ? 'text-sm' : 'text-base'}
          `}>
            {sectionSubtitle}
          </p>
        </div>

        {/* Links relacionados */}
        <InternalLinkBuilder
          variant={variant}
          showOnlyPrimary={showOnlyPrimary}
          maxLinks={maxLinks}
        />

        {/* Decoração inferior */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-jazz-gold/50"></div>
            <div className="w-1 h-1 bg-jazz-gold/50 rounded-full"></div>
            <div className="w-4 h-px bg-jazz-gold/50"></div>
            <div className="w-1 h-1 bg-jazz-gold/50 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-jazz-gold/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedPagesSection;