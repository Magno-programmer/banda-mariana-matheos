import React from 'react';
import { BlogArticle } from '@/data/blogArticlesData';

interface BlogStructuredDataProps {
  articles: BlogArticle[];
  currentArticle?: BlogArticle;
  pageType: 'blog-index' | 'blog-article';
}

const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({ 
  articles, 
  currentArticle, 
  pageType 
}) => {
  // Base organization schema
  const organizationSchema = {
    "@type": "MusicGroup",
    "name": "Mariana Matheos Jazz Band",
    "description": "Banda profissional de jazz especializada em eventos elegantes em Belo Horizonte",
    "url": "https://marianamatheos.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/images/logo.png",
      "width": 600,
      "height": 200
    },
    "genre": ["Jazz", "Blues", "Soul", "R&B"],
    "foundingDate": "2020",
    "foundingLocation": {
      "@type": "Place",
      "name": "Belo Horizonte",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Belo Horizonte",
        "addressRegion": "MG",
        "addressCountry": "BR"
      }
    },
    "sameAs": [
      "https://www.instagram.com/marianamatheosjazz",
      "https://www.facebook.com/marianamatheosjazz"
    ]
  };

  // Blog index page schemas
  if (pageType === 'blog-index') {
    const blogCollectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Blog Mariana Matheos Jazz",
      "description": "Artigos sobre música jazz, dicas para eventos e inspirações musicais da banda Mariana Matheos Jazz em Belo Horizonte",
      "url": "https://marianamatheos.com.br/blog",
      "inLanguage": "pt-BR",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": articles.length,
        "itemListElement": articles.map((article, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "@id": `https://marianamatheos.com.br/blog/${article.slug}`,
            "headline": article.title,
            "description": article.excerpt,
            "image": {
              "@type": "ImageObject",
              "url": `https://marianamatheos.com.br${article.image}`,
              "width": 800,
              "height": 600
            },
            "datePublished": article.publishedDate,
            "dateModified": article.publishedDate,
            "author": {
              "@type": "Person",
              "name": article.author,
              "url": "https://marianamatheos.com.br"
            },
            "publisher": organizationSchema,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://marianamatheos.com.br/blog/${article.slug}`
            },
            "articleSection": article.category,
            "keywords": article.keywords.join(", "),
            "wordCount": article.content.split(' ').filter(word => word.length > 0).length,
            "timeRequired": `PT${parseInt(article.readingTime)}M`
          }
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://marianamatheos.com.br"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://marianamatheos.com.br/blog"
          }
        ]
      },
      "publisher": organizationSchema
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Blog Mariana Matheos Jazz",
      "url": "https://marianamatheos.com.br/blog",
      "description": "Blog oficial da banda Mariana Matheos Jazz com artigos sobre música, eventos e cultura jazzística",
      "inLanguage": "pt-BR",
      "publisher": organizationSchema,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://marianamatheos.com.br/blog?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogCollectionSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </>
    );
  }

  // Individual article page schemas
  if (pageType === 'blog-article' && currentArticle) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": currentArticle.title,
      "alternativeHeadline": currentArticle.excerpt,
      "description": currentArticle.seoDescription,
      "image": {
        "@type": "ImageObject",
        "url": `https://marianamatheos.com.br${currentArticle.image}`,
        "width": 1200,
        "height": 800,
        "caption": currentArticle.imageAlt
      },
      "datePublished": currentArticle.publishedDate,
      "dateModified": currentArticle.publishedDate,
      "author": {
        "@type": "Person",
        "name": currentArticle.author,
        "url": "https://marianamatheos.com.br",
        "jobTitle": "Vocalista e Líder da Banda",
        "worksFor": organizationSchema
      },
      "publisher": organizationSchema,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://marianamatheos.com.br/blog/${currentArticle.slug}`,
        "url": `https://marianamatheos.com.br/blog/${currentArticle.slug}`,
        "name": currentArticle.seoTitle,
        "description": currentArticle.seoDescription,
        "inLanguage": "pt-BR",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Mariana Matheos Jazz Band",
          "url": "https://marianamatheos.com.br"
        }
      },
      "keywords": currentArticle.keywords.join(", "),
      "articleSection": currentArticle.category,
      "genre": [currentArticle.category, "Jazz", "Música"],
      "wordCount": currentArticle.content.split(' ').filter(word => word.length > 0).length,
      "timeRequired": `PT${parseInt(currentArticle.readingTime)}M`,
      "inLanguage": "pt-BR",
      "copyrightYear": new Date(currentArticle.publishedDate).getFullYear(),
      "copyrightHolder": organizationSchema,
      "about": {
        "@type": "Thing",
        "name": "Jazz Music",
        "description": "Artigos sobre música jazz, eventos musicais e cultura jazzística"
      },
      "mentions": currentArticle.tags.map(tag => ({
        "@type": "Thing",
        "name": tag
      })),
      "isAccessibleForFree": true
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://marianamatheos.com.br"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://marianamatheos.com.br/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": currentArticle.title,
          "item": `https://marianamatheos.com.br/blog/${currentArticle.slug}`
        }
      ]
    };

    const seriesSchema = {
      "@context": "https://schema.org",
      "@type": "CreativeWorkSeries",
      "name": `Série: ${currentArticle.category}`,
      "description": `Artigos da categoria ${currentArticle.category} do blog Mariana Matheos Jazz`,
      "publisher": organizationSchema,
      "hasPart": {
        "@type": "BlogPosting",
        "@id": `https://marianamatheos.com.br/blog/${currentArticle.slug}`,
        "headline": currentArticle.title
      },
      "about": {
        "@type": "Thing",
        "name": currentArticle.category,
        "description": `Artigos sobre ${currentArticle.category.toLowerCase()} relacionados à música jazz`
      }
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seriesSchema)
          }}
        />
      </>
    );
  }

  return null;
};

export default BlogStructuredData;