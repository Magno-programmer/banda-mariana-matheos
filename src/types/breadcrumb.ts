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

// Dynamic breadcrumb resolver for blog articles
export const getBlogArticleTitle = (slug: string): string => {
  // Import the blog data here to avoid circular dependencies
  try {
    const { blogArticlesData } = require('@/data/blogArticlesData');
    const article = blogArticlesData.find((a: any) => a.slug === slug);
    return article ? article.title : 'Artigo';
  } catch {
    return 'Artigo';
  }
};