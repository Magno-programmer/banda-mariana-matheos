import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'article' | 'profile';
}

const SEOMetaTags = ({ 
  title, 
  description, 
  keywords = "banda de jazz, música ao vivo, eventos, casamentos, shows corporativos, música brasileira",
  canonicalUrl,
  ogImage = "/images/banda.png",
  pageType = "website"
}: SEOMetaTagsProps) => {
  const baseUrl = "https://marianamatheos.com.br";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={pageType} />
      <meta property="og:site_name" content="Mariana Matheos Jazz Band" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Mariana Matheos Jazz Band" />
      <meta name="theme-color" content="#800000" />
    </Helmet>
  );
};

export default SEOMetaTags;