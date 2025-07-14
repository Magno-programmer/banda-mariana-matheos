import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const breadcrumbMap: Record<string, string> = {
  '/': 'Início',
  '/sobre': 'Sobre a Banda',
  '/repertorio': 'Repertório Musical',
  '/galeria/imagens': 'Galeria de Fotos',
  '/galeria/videos': 'Vídeos Musicais',
  '/depoimentos': 'Depoimentos de Clientes',
  '/faq': 'Perguntas Frequentes',
  '/contatos': 'Contato & Localização',
  '/agendamento': 'Agendar Apresentação'
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Início', path: '/' }
  ];

  let currentPath = '';
  pathnames.forEach(segment => {
    currentPath += `/${segment}`;
    const label = breadcrumbMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, path: currentPath });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      aria-label="Navegação breadcrumb" 
      className="bg-jazz-dark bg-opacity-50 py-3 px-6 border-b border-jazz-gold border-opacity-20"
    >
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={breadcrumb.path} className="flex items-center">
                {index === 0 && (
                  <Home size={16} className="text-jazz-gold mr-2" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-white font-gatsbybold"
                    aria-current="page"
                  >
                    {breadcrumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      to={breadcrumb.path}
                      className="text-jazz-gold hover:text-white transition-colors font-gatsbybold"
                    >
                      {breadcrumb.label}
                    </Link>
                    <ChevronRight 
                      size={16} 
                      className="text-gray-400 mx-2" 
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;