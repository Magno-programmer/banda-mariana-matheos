import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, MessageCircle } from 'lucide-react';
import Header from '@/components/sections/commonPages/header/Header';
import Footer from '@/components/sections/commonPages/footer/Footer';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';
import blogHeroImage from '/images/banda-blue-jazz-concurso.png';
import casamentoImage from '@/assets/images/casamento-jazz-band.jpg';
import historiaJazzImage from '@/assets/images/historia-jazz-brasil.jpg';
import eventosCorporativosImage from '@/assets/images/eventos-corporativos.jpg';
import marianaEssenciaImage from '/images/cantora.png';
import jazzStandardsImage from '/images/jazz-standard.jpg';
import bandaDeJazzImage from '/images/banda-de-jazz-1920.jpg';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  category: string;
  tags: string[];
  publishedDate: string;
  readingTime: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

const blogArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Mariana Matheos Jazz — A essência da música ao vivo nos eventos',
    slug: 'mariana-matheos-jazz-essencia-da-musica-ao-vivo',
    excerpt: 'Descubra como a banda Mariana Matheos transformou o cenário da música ao vivo em Belo Horizonte, trazendo elegância e sofisticação para eventos especiais.',
    content: '',
    image: marianaEssenciaImage,
    imageAlt: 'Mariana Matheos Jazz performando ao vivo em evento elegante',
    category: 'Jazz',
    tags: ['banda', 'música ao vivo', 'eventos', 'jazz'],
    publishedDate: '2025-07-17',
    readingTime: '8 min',
    author: 'Mariana Matheos',
    seoTitle: 'Mariana Matheos Jazz — A essência da música ao vivo nos eventos | Blog',
    seoDescription: 'Conheça a história e missão da banda Mariana Matheos Jazz, especializada em música ao vivo para eventos elegantes em Belo Horizonte.',
    keywords: ['banda mariana matheos', 'música ao vivo', 'eventos belo horizonte', 'jazz band']
  },
  {
    id: '2',
    title: 'Como escolher a banda ideal para o seu casamento',
    slug: 'como-escolher-banda-casamento',
    excerpt: 'Guia completo para escolher a banda perfeita para seu casamento, com dicas sobre estilo musical, repertório e como criar momentos inesquecíveis.',
    content: '',
    image: casamentoImage,
    imageAlt: 'Banda de jazz tocando em casamento elegante',
    category: 'Eventos',
    tags: ['casamento', 'banda', 'música ao vivo', 'dicas'],
    publishedDate: '2025-07-17',
    readingTime: '10 min',
    author: 'Mariana Matheos',
    seoTitle: 'Como escolher a banda ideal para o seu casamento | Blog Mariana Matheos',
    seoDescription: 'Dicas essenciais para escolher a banda perfeita para seu casamento. Saiba como a música ao vivo pode transformar seu grande dia.',
    keywords: ['banda para casamento', 'música casamento', 'banda de jazz casamento', 'evento elegante']
  },
  {
    id: '3',
    title: 'A história do jazz no Brasil — das rádios aos grandes festivais',
    slug: 'historia-do-jazz-brasil',
    excerpt: 'Uma jornada pela rica história do jazz brasileiro, desde suas primeiras manifestações nas rádios até os grandes festivais contemporâneos.',
    content: '',
    image: historiaJazzImage,
    imageAlt: 'Músicos de jazz vintage no Brasil dos anos 1920',
    category: 'Curiosidades',
    tags: ['jazz', 'história', 'brasil', 'cultura'],
    publishedDate: '2025-07-17',
    readingTime: '12 min',
    author: 'Mariana Matheos',
    seoTitle: 'A história do jazz no Brasil — das rádios aos grandes festivais | Blog',
    seoDescription: 'Explore a rica história do jazz brasileiro, suas influências e evolução desde os anos 1920 até os festivais contemporâneos.',
    keywords: ['jazz brasileiro', 'história do jazz', 'música brasileira', 'cultura musical']
  },
  {
    id: '4',
    title: 'Por que a música ao vivo transforma eventos corporativos?',
    slug: 'musica-ao-vivo-eventos-corporativos',
    excerpt: 'Descubra como a música ao vivo pode elevar o nível dos seus eventos corporativos, criando conexões autênticas e experiências memoráveis.',
    content: '',
    image: eventosCorporativosImage,
    imageAlt: 'Banda de jazz tocando em evento corporativo elegante',
    category: 'Eventos',
    tags: ['eventos corporativos', 'música ao vivo', 'networking', 'empresas'],
    publishedDate: '2025-07-17',
    readingTime: '7 min',
    author: 'Mariana Matheos',
    seoTitle: 'Por que a música ao vivo transforma eventos corporativos? | Blog',
    seoDescription: 'Entenda como a música ao vivo pode transformar seus eventos corporativos, criando experiências únicas e fortalecendo conexões.',
    keywords: ['eventos corporativos', 'música ao vivo empresas', 'banda profissional', 'networking musical']
  },
  {
    id: '5',
    title: 'O que são Jazz Standards e por que são tão importantes?',
    slug: 'historia-dos-jazz-standards',
    excerpt: 'Descubra a origem e o papel essencial dos jazz standards — as músicas clássicas que moldaram a identidade do jazz e encantam gerações.',
    content: '',
    image: jazzStandardsImage,
    imageAlt: 'Pianista e vocalista interpretando um jazz standard em palco iluminado',
    category: 'Curiosidades',
    tags: ['jazz standards', 'jazz clássico', 'história', 'repertório tradicional'],
    publishedDate: '2025-07-17',
    readingTime: '6 min',
    author: 'Mariana Matheos',
    seoTitle: 'O que são Jazz Standards e por que são tão importantes? | Blog',
    seoDescription: 'Entenda o que são os jazz standards, sua origem e importância para o repertório clássico do jazz. Descubra como a banda Mariana Matheos reinventa esses clássicos em performances ao vivo.',
    keywords: ['jazz standards', 'história do jazz', 'repertório jazzístico', 'banda de jazz', 'clássicos do jazz']
  },
  {
    id: '6',
    title: 'O que é necessário para ser uma banda de jazz?',
    slug: 'como-ser-uma-banda-de-jazz',
    excerpt: 'Entenda os principais elementos artísticos, técnicos e humanos que compõem uma banda de jazz de sucesso — e como construir uma do zero com autenticidade.',
    content: '',
    image: bandaDeJazzImage,
    imageAlt: 'Banda de jazz ensaiando em um estúdio com instrumentos clássicos',
    category: 'Dicas',
    tags: ['como montar banda', 'dicas para músicos', 'jazz', 'banda de jazz'],
    publishedDate: '2024-01-27',
    readingTime: '8 min',
    author: 'Mariana Matheos',
    seoTitle: 'O que é necessário para ser uma banda de jazz? | Blog',
    seoDescription: 'Confira dicas essenciais para montar e manter uma banda de jazz de sucesso — desde os músicos certos até repertório, ensaios e postura profissional.',
    keywords: ['como formar banda de jazz', 'dicas para músicos de jazz', 'banda instrumental', 'montar banda', 'jazz moderno']
  }
];

const BlogPage = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useAdvancedViewport();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Jazz', 'Eventos', 'Curiosidades', 'Dicas'];

  const filteredArticles = selectedCategory === 'Todos' 
    ? blogArticles 
    : blogArticles.filter(article => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const heroTextSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
  const subtitleSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';

  return (
    <div className="min-h-screen bg-black">
      <SEOMetaTags
        title="Blog Mariana Matheos Jazz | Dicas e Inspirações Musicais"
        description="Descubra dicas, histórias e inspirações musicais no blog da banda Mariana Matheos Jazz. Tudo sobre música ao vivo para eventos elegantes em Belo Horizonte."
        keywords="blog banda jazz, dicas música casamento, eventos corporativos, história jazz brasil, banda mariana matheos"
        canonicalUrl="/blog"
        ogImage="/images/blog-hero.jpg"
        pageType="website"
      />

      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${blogHeroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className={`${heroTextSize} font-bold text-jazz-gold mb-6 font-glimmer jazz-text-shadow`}>
            Blog Mariana Matheos
          </h1>
          <p className={`${subtitleSize} text-white mb-8 font-gatsbybold leading-relaxed`}>
            Dicas, histórias e inspirações musicais para eventos inesquecíveis
          </p>
          <button
            onClick={() => navigate('/contato')}
            className="bg-jazz-gold text-black text-lg px-8 py-3 rounded-lg font-gatsbybold hover:bg-white transition-colors duration-300 transform hover:scale-105"
          >
            Fale Conosco
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gradient-to-b from-black to-jazz-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-gatsbybold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-jazz-gold text-black'
                    : 'bg-transparent text-jazz-gold border border-jazz-gold hover:bg-jazz-gold hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-jazz-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-jazz-gold/20"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-jazz-gold text-black px-3 py-1 rounded-full text-sm font-gatsby">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-jazz-gold/70 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(article.publishedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-gatsbybold text-jazz-gold mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-white/80 mb-4 line-clamp-3 font-gatsbybold text-2xl">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs text-jazz-gold/60 border border-jazz-gold/30 px-2 py-1 rounded"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="flex items-center text-lg gap-2 text-jazz-gold hover:text-white transition-colors duration-300 font-gatsbybold"
                  >
                    Ler mais
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-jazz-dark to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-gatsbybold text-jazz-gold mb-6">
              Quer transformar seu evento em um espetáculo memorável?
            </h2>
            <p className="text-xl text-white mb-8 font-gatsby">
              Entre em contato conosco e descubra como a música ao vivo pode elevar a experiência do seu evento.
            </p>
            <button
              onClick={() => window.open('https://wa.me/5531997522127?text=Olá! Gostaria de saber mais sobre a banda para meu evento.', '_blank')}
              className="bg-jazz-gold text-black px-8 py-4 rounded-lg font-gatsbybold hover:bg-white transition-colors duration-300 transform hover:scale-105 text-lg"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;