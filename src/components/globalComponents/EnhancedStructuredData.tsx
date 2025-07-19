import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedStructuredDataProps {
  pageType?: 'website' | 'article' | 'profile' | 'gallery' | 'testimonials';
}

import { useLocation } from 'react-router-dom';
import { 
  generateLocalBusinessSchema,
  generateWebPageSchema,
  generateReviewSchema,
  generateFAQSchema,
  generateBlogPostingSchema,
  generateServiceSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateEventSeriesSchema,
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
        schemas.push(generateOrganizationSchema());
        schemas.push(generateServiceSchema());
        schemas.push(generateEventSeriesSchema());
        // Enhanced schemas
        schemas.push(...generateEnhancedProductSchema());
        schemas.push(generateConsolidatedRatingSchema());
        break;

      case '/sobre':
        schemas.push(generateOrganizationSchema());
        schemas.push(generateCreativeWorkSchema());
        break;

      case '/repertorio':
        schemas.push(generateCreativeWorkSchema());
        break;

      case '/fotos':
        schemas.push(generateImageGallerySchema());
        break;

      case '/videos':
        schemas.push(generateVideoObjectSchema());
        break;

      case '/agenda':
        schemas.push(generateEventSeriesSchema());
        schemas.push(generateServiceSchema());
        schemas.push(generateSuperEventSchema());
        schemas.push(generateHowToSchema());
        schemas.push(generateDigitalDocumentSchema());
        break;

      case '/contato':
        schemas.push(generateHowToSchema());
        break;

      case '/depoimentos':
        schemas.push(generateReviewSchema());
        schemas.push(generateConsolidatedRatingSchema());
        break;

      case '/faq':
        schemas.push(generateFAQSchema([]));
        schemas.push(generateEnhancedFAQSchema());
        schemas.push(generateSpeakableSchema());
        break;

      case '/blog':
        // Blog posting schema requires article data, skip for now
        break;

      default:
        if (location.pathname.startsWith('/blog/')) {
          // Article schemas require specific data, skip for now  
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
