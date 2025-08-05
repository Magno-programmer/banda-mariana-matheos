import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ViewportManager from './components/globalComponents/ViewportManager'
import WebVitalsReporter from './components/performance/WebVitalsReporter'
import CriticalCSS from './components/performance/CriticalCSS'
import ResourcePreloader from './components/performance/ResourcePreloader'
import TranslationStatusBar from './components/international/TranslationStatusBar'
import InternationalAnalytics from './components/international/InternationalAnalytics'
import { getCriticalResourcesForPage, getPreconnectDomains, getPrefetchPages } from './utils/performanceUtils'

const currentPath = window.location.pathname;

createRoot(document.getElementById("root")!).render(
  <ViewportManager enableDynamicViewport={true}>
    <WebVitalsReporter enableGA4={true} />
    <InternationalAnalytics enableGA4={true} enableCustomAnalytics={true} />
    <CriticalCSS />
    <ResourcePreloader
      preconnectDomains={getPreconnectDomains()}
      heroImages={getCriticalResourcesForPage(currentPath).filter(src => src.includes('.avif'))}
      prefetchPages={getPrefetchPages(currentPath)}
      preloadResources={[
        { href: '/GatsbyFLF.ttf', as: 'font', type: 'font/ttf', crossOrigin: 'anonymous', importance: 'high' },
        { href: '/GatsbyFLF-Bold.ttf', as: 'font', type: 'font/ttf', crossOrigin: 'anonymous', importance: 'high' },
        { href: '/glimmer-of-light.otf', as: 'font', type: 'font/otf', crossOrigin: 'anonymous' },
      ]}
    />
    <TranslationStatusBar />
    <App />
  </ViewportManager>
);
