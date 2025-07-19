
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Início',
  '/sobre': 'Sobre a Banda',
  '/repertorio': 'Repertório Musical',
  '/fotos': 'Galeria de Fotos',
  '/videos': 'Vídeos da Banda',
  '/agenda': 'Agendar Show',
  '/contato': 'Contato',
  '/depoimentos': 'Depoimentos',
  '/faq': 'Perguntas Frequentes',
  '/blog': 'Blog Musical'
};

const VisualBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Don't show breadcrumb on homepage
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', path: '/' }
  ];

  // Build breadcrumb path
  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbItems.push({ label, path: currentPath });
  });

  return (
    <div className="bg-background/80 backdrop-blur-sm border-b border-border/50 py-3 px-4 sticky top-0 z-40">
      <div className="container mx-auto max-w-6xl">
        <Breadcrumb>
          <BreadcrumbList className="text-sm">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.path || index}>
                <BreadcrumbItem>
                  {index === 0 ? (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.path!} 
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        aria-label="Voltar para página inicial"
                      >
                        <Home className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">{item.label}</span>
                      </Link>
                    </BreadcrumbLink>
                  ) : index === breadcrumbItems.length - 1 ? (
                    <BreadcrumbPage className="font-medium text-foreground">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.path!}
                        className="hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default VisualBreadcrumb;
