import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedStructuredDataProps {
  pageType?: 'website' | 'article' | 'profile';
}

import { useLocation } from 'react-router-dom';
import { 
  generateLocalBusinessSchema,
  generateMusicGroupSchema,
  generateWebPageSchema,
  generateOfferSchema,
  generateReviewSchema,
  generateEventSchema,
  generateFAQPageSchema,
  generateArticleSchema,
  generateBlogPostingSchema,
  generatePersonSchema,
} from '@/utils/schemaGenerators';

// New perfect schemas
import {
  generateWebSiteSchema,
  generateBreadcrumbListSchema,
  generateVideoObjectSchema,
  generateImageGallerySchema,
  generatePerfectOrganizationSchema
} from '@/utils/perfectSEOSchemas';

import {
  generateEnhancedProductSchema,
  generateConsolidatedRatingSchema,
  generateSuperEventSchema,
  generateDigitalDocumentSchema,
  generateCreativeWorkSchema,
  generateSpeakableSchema,
  generateEnhancedFAQSchema,
  generateHowToSchema
} from '@/utils/advancedSchemaGenerators';

const EnhancedStructuredData = ({ pageType = 'website' }: EnhancedStructuredDataProps) => {
  const location = useLocation();

  const generatePageSpecificSchemas = () => {
    const schemas = [];
    
    // Always include perfect organization and website schemas
    schemas.push(generatePerfectOrganizationSchema());
    schemas.push(generateWebSiteSchema());
    
    // Add breadcrumb for non-homepage
    if (location.pathname !== '/') {
      const breadcrumbSchema = generateBreadcrumbListSchema(location.pathname);
      if (breadcrumbSchema) schemas.push(breadcrumbSchema);
    }

    switch (location.pathname) {
      case '/':
        schemas.push(generateLocalBusinessSchema());
        schemas.push(generateMusicGroupSchema());
        schemas.push(generateWebPageSchema('/'));
        schemas.push(generateOfferSchema());
        // Enhanced schemas
        schemas.push(...generateEnhancedProductSchema());
        schemas.push(generateConsolidatedRatingSchema());
        break;

      case '/sobre':
        schemas.push(generatePersonSchema());
        schemas.push(generateWebPageSchema('/sobre'));
        schemas.push(generateCreativeWorkSchema());
        break;

      case '/repertorio':
        schemas.push(generateWebPageSchema('/repertorio'));
        schemas.push(generateCreativeWorkSchema());
        break;

      case '/fotos':
        schemas.push(generateWebPageSchema('/fotos'));
        schemas.push(generateImageGallerySchema());
        break;

      case '/videos':
        schemas.push(generateWebPageSchema('/videos'));
        schemas.push(generateVideoObjectSchema());
        break;

      case '/agenda':
        schemas.push(generateWebPageSchema('/agenda'));
        schemas.push(generateOfferSchema());
        schemas.push(generateSuperEventSchema());
        schemas.push(generateHowToSchema());
        schemas.push(generateDigitalDocumentSchema());
        break;

      case '/contato':
        schemas.push(generateWebPageSchema('/contato'));
        schemas.push(generateHowToSchema());
        break;

      case '/depoimentos':
        schemas.push(generateWebPageSchema('/depoimentos'));
        schemas.push(generateReviewSchema());
        schemas.push(generateConsolidatedRatingSchema());
        break;

      case '/faq':
        schemas.push(generateFAQPageSchema());
        schemas.push(generateEnhancedFAQSchema());
        schemas.push(generateSpeakableSchema());
        break;

      case '/blog':
        schemas.push(generateWebPageSchema('/blog'));
        schemas.push(generateBlogPostingSchema());
        break;

      default:
        if (location.pathname.startsWith('/blog/')) {
          schemas.push(generateArticleSchema());
          schemas.push(generateBlogPostingSchema());
        } else {
          schemas.push(generateWebPageSchema(location.pathname));
        }
    }

    return schemas;
  };

  const schemas = generatePageSpecificSchemas();

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
};

export default EnhancedStructuredData;
