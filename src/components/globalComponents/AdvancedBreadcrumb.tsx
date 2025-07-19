import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbMappings, getBlogArticleTitle, type BreadcrumbItem } from '@/types/breadcrumb';
import { buildCanonicalUrl } from '@/utils/urlUtils';

const AdvancedBreadcrumb = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Início', href: '/' }
    ];

    if (pathSegments.length === 0) {
      breadcrumbs[0].isActive = true;
      return breadcrumbs;
    }

    // Handle blog article pages
    if (pathSegments.length === 2 && pathSegments[0] === 'blog') {
      // Add blog page first
      breadcrumbs.push({
        label: 'Blog',
        href: '/blog',
        isActive: false
      });
      
      // Add article page
      const articleSlug = pathSegments[1];
      breadcrumbs.push({
        label: getBlogArticleTitle(articleSlug),
        href: location.pathname,
        isActive: true
      });
      
      return breadcrumbs;
    }

    // Handle regular pages
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const mapping = breadcrumbMappings[currentPath];
      
      if (mapping) {
        breadcrumbs.push({
          label: mapping.label,
          href: currentPath,
          isActive: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate JSON-LD for breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.label,
      "item": buildCanonicalUrl(breadcrumb.href)
    }))
  };

  if (breadcrumbs.length <= 1) return null;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      </Helmet>
      
      <nav 
        aria-label="Breadcrumb" 
        className="w-full bg-gradient-to-r from-black via-jazz-dark to-black border-b border-jazz-gold/20"
      >
        <div className="container mx-auto px-4">
          <ol className="flex flex-wrap items-center gap-1 sm:gap-2 py-3 text-xs sm:text-sm overflow-x-auto">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center shrink-0">
                {index > 0 && (
                  <ChevronRight 
                    size={12} 
                    className="mx-1 sm:mx-2 text-jazz-gold/60 shrink-0" 
                    aria-hidden="true"
                  />
                )}
                
                {breadcrumb.isActive ? (
                  <span 
                    className="font-gatsby text-jazz-gold font-medium flex items-center gap-1 
                             truncate max-w-[120px] sm:max-w-none"
                    aria-current="page"
                    title={breadcrumb.label}
                  >
                    {index === 0 && <Home size={12} className="shrink-0" aria-hidden="true" />}
                    <span className="truncate">{breadcrumb.label}</span>
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.href}
                    className="font-gatsby text-white hover:text-jazz-gold transition-colors duration-300 
                             flex items-center gap-1 hover:scale-105 transform transition-transform
                             truncate max-w-[120px] sm:max-w-none"
                    title={breadcrumb.label}
                  >
                    {index === 0 && <Home size={12} className="shrink-0" aria-hidden="true" />}
                    <span className="truncate">{breadcrumb.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default AdvancedBreadcrumb;