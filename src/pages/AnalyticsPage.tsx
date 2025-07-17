import React from 'react';
import { useParams } from 'react-router-dom';
import CTRAnalyticsDashboard from '@/components/seo/CTRAnalyticsDashboard';
import Header from '@/components/sections/commonPages/header/Header';
import Footer from '@/components/sections/commonPages/footer/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import AdvancedSEOMetaTags from '@/components/seo/AdvancedSEOMetaTags';

const AnalyticsPage = () => {
  return (
    <>
      <AdvancedSEOMetaTags 
        title="📊 Analytics CTR | Mariana Matheos Jazz | Dashboard Avançado"
        description="Dashboard avançado de analytics de CTR da Mariana Matheos Jazz Band. Métricas de performance, A/B testing e otimizações SERP."
        keywords="analytics, ctr, dashboard, performance, metricas, a/b testing, serp"
        canonicalUrl="/analytics"
        pageType="website"
        isOptimizedForCTR={false}
        priority="medium"
      />
      
      <div className="min-h-screen bg-black">
        <Header />
        <CTRAnalyticsDashboard />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default AnalyticsPage;