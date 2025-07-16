import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Facebook, MessageCircle, ChevronRight } from 'lucide-react';
import Header from '@/components/sections/commonPages/header/Header';
import Footer from '@/components/sections/commonPages/footer/Footer';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';
import { blogArticlesData } from '@/data/blogArticlesData';

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useAdvancedViewport();
  
  const article = blogArticlesData.find(a => a.slug === slug);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-gatsbybold text-jazz-gold mb-4">Artigo não encontrado</h1>
          <button
            onClick={() => navigate('/blog')}
            className="bg-jazz-gold text-black px-6 py-3 rounded-lg font-gatsbybold hover:bg-white transition-colors"
          >
            Voltar ao Blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Confira este artigo: ${article.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';

  return (
    <div className="min-h-screen bg-black">
      <SEOMetaTags
        title={article.seoTitle}
        description={article.seoDescription}
        keywords={article.keywords.join(', ')}
        canonicalUrl={`/blog/${article.slug}`}
        ogImage={article.image}
        pageType="article"
      />

      <Header />

      {/* Breadcrumb */}
      <div className="bg-jazz-dark py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-jazz-gold/70">
            <button
              onClick={() => navigate('/')}
              className="hover:text-jazz-gold transition-colors"
            >
              Início
            </button>
            <ChevronRight size={16} />
            <button
              onClick={() => navigate('/blog')}
              className="hover:text-jazz-gold transition-colors"
            >
              Blog
            </button>
            <ChevronRight size={16} />
            <span className="text-jazz-gold">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-16 bg-gradient-to-b from-jazz-dark to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-2xl text-jazz-gold hover:text-white transition-colors mb-8 font-gatsbybold"
            >
              <ArrowLeft size={20} />
              Voltar ao Blog
            </button>

            <div className="mb-8">
              <span className="bg-jazz-gold text-black px-4 py-2 rounded-full text-lg font-gatsbybold mb-4 inline-block">
                {article.category}
              </span>
              
              <h1 className={`${titleSize} font-gatsbybold text-jazz-gold mb-6 leading-tight`}>
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-jazz-gold/70 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{article.readingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Por {article.author}</span>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={18} />
                  Facebook
                </button>
              </div>
            </div>

            <div className="relative mb-3">
              <img
                src={article.image}
                alt={article.imageAlt}
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-1 bg-gradient-to-b from-black to-jazz-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg prose-invert text-white
                max-w-none prose-headings:font-gatsbybold
                prose-headings:text-jazz-gold prose-p:font-gatsby
                prose-a:text-jazz-gold prose-a:no-underline hover:prose-a:text-white
                prose-blockquote:border-l-jazz-gold prose-blockquote:text-jazz-gold/80
                prose-strong:text-jazz-gold prose-strong:font-gatsbybold
                prose-hr:border-jazz-gold/30"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />


            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-jazz-gold/30">
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 text-sm font-medium text-jazz-gold border border-jazz-gold/50 px-4 py-1 rounded-full hover:bg-jazz-gold/10 transition"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-jazz-dark to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-gatsbybold text-jazz-gold mb-6">
              Gostou do que leu?
            </h2>
            <p className="text-xl text-white mb-8 font-gatsby">
              Transforme seu evento em uma experiência inesquecível com a música ao vivo da banda Mariana Matheos.
            </p>
            <button
              onClick={() => window.open('https://wa.me/5531999999999?text=Olá! Gostaria de saber mais sobre a banda para meu evento.', '_blank')}
              className="bg-jazz-gold text-black px-8 py-4 rounded-lg font-gatsbybold hover:bg-white transition-colors duration-300 transform hover:scale-105 text-lg"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.seoDescription,
            "image": [article.image],
            "datePublished": article.publishedDate,
            "dateModified": article.publishedDate,
            "author": {
              "@type": "Person",
              "name": article.author,
              "url": "https://marianamatheos.com.br"
            },
            "publisher": {
              "@type": "MusicGroup",
              "name": "Mariana Matheos Jazz Band",
              "logo": {
                "@type": "ImageObject",
                "url": "https://marianamatheos.com.br/images/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://marianamatheos.com.br/blog/${article.slug}`
            },
            "keywords": article.keywords.join(", "),
            "genre": article.category,
            "wordCount": article.content.split(' ').length,
            "timeRequired": article.readingTime
          })
        }}
      />
    </div>
  );
};

export default BlogArticlePage;