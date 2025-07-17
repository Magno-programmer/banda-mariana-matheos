export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface BreadcrumbMapping {
  [key: string]: {
    label: string;
    parent?: string;
  };
}

export const breadcrumbMappings: BreadcrumbMapping = {
  '/': { label: 'Início' },
  '/sobre': { label: 'Sobre a Banda' },
  '/repertorio': { label: 'Repertório' },
  '/fotos': { label: 'Galeria de Fotos' },
  '/videos': { label: 'Vídeos' },
  '/agenda': { label: 'Agendamento' },
  '/contato': { label: 'Contato' },
  '/faq': { label: 'FAQ' },
  '/depoimentos': { label: 'Depoimentos' },
  '/blog': { label: 'Blog' }
};