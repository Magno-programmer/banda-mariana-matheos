import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, MessageCircle } from 'lucide-react';
import Header from '@/components/sections/commonPages/header/Header';
import Footer from '@/components/sections/commonPages/footer/Footer';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';
import AdvancedBreadcrumb from '@/components/globalComponents/AdvancedBreadcrumb';
import blogHeroImage from '/images/banda-blue-jazz-concurso.avif';
import casamentoImage from '/images/casamento-jazz-band.avif';
import historiaJazzImage from '/images/historia-jazz-brasil.avif';
import eventosCorporativosImage from '/images/eventos-corporativos.avif';
import marianaEssenciaImage from '/images/cantora.avif';
import jazzStandardsImage from '/images/jazz-standard.avif';
import bandaDeJazzImage from '/images/banda-de-jazz-1920.avif';

// Singer portraits
import billieHolidayImage from '/images/billie-holiday.avif';
import ellaFitzgeraldImage from '/images/ella-fitzgerald.avif';
import ettaJamesImage from '/images/etta-james.avif';
import amyWinehouseImage from '/images/amy-winehouse.avif';
import frankSinatraImage from '/images/frank-sinatra.avif';
import ninaSimoneImage from '/images/nina-simone.avif';
import bethHartImage from '/images/beth-hart.avif';
import bbKingImage from '/images/bb-king.avif';
import andraDayImage from '/images/andra-day.avif';
import natKingColeImage from '/images/nat-king-cole.avif';
import kittyKallenImage from '/images/kitty-kallen.avif';
import glennMillerImage from '/images/glenn-miller.avif';

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
    publishedDate: '2025-07-18',
    readingTime: '8 min',
    author: 'Mariana Matheos',
    seoTitle: 'O que é necessário para ser uma banda de jazz? | Blog',
    seoDescription: 'Confira dicas essenciais para montar e manter uma banda de jazz de sucesso — desde os músicos certos até repertório, ensaios e postura profissional.',
    keywords: ['como formar banda de jazz', 'dicas para músicos de jazz', 'banda instrumental', 'montar banda', 'jazz moderno']
  },
    {
    id: '7',
    title: 'Billie Holiday — A Dama do Jazz que Revolucionou a Música',
    slug: 'billie-holiday-dama-do-jazz',
    excerpt: 'Conheça a história extraordinária de Billie Holiday, uma das vozes mais expressivas e influentes do jazz, que transformou a dor em arte inesquecível.',
    content: '',
    image: billieHolidayImage,
    imageAlt: 'Retrato artístico de cantora de jazz dos anos 1940 com gardênia no cabelo',
    category: 'Curiosidades',
    tags: ['billie holiday', 'história do jazz', 'cantores clássicos', 'lady day'],
    publishedDate: '2025-07-17',
    readingTime: '8 min',
    author: 'Mariana Matheos',
    seoTitle: 'Billie Holiday — A Dama do Jazz que Revolucionou a Música | Blog',
    seoDescription: 'Conheça a história extraordinária de Billie Holiday, uma das vozes mais expressivas do jazz que transformou a dor em arte inesquecível.',
    keywords: ['billie holiday', 'historia do jazz', 'cantores de jazz', 'lady day', 'jazz classico']
  },
  {
    id: '8',
    title: 'Ella Fitzgerald — A Primeira Dama da Canção',
    slug: 'ella-fitzgerald-primeira-dama-cancao',
    excerpt: 'Descubra a trajetória de Ella Fitzgerald, a "First Lady of Song", cujo talento vocal incomparável e técnica de scat singing revolucionaram o jazz.',
    content: '',
    image: ellaFitzgeraldImage,
    imageAlt: 'Retrato artístico de elegante cantora de jazz dos anos 1940 com sorriso radiante',
    category: 'Curiosidades',
    tags: ['ella fitzgerald', 'first lady of song', 'scat singing', 'jazz clássico'],
    publishedDate: '2025-07-17',
    readingTime: '9 min',
    author: 'Mariana Matheos',
    seoTitle: 'Ella Fitzgerald — A Primeira Dama da Canção | Blog',
    seoDescription: 'Descubra a trajetória de Ella Fitzgerald, cujo talento vocal incomparável e técnica de scat singing revolucionaram o jazz.',
    keywords: ['ella fitzgerald', 'first lady of song', 'scat singing', 'historia do jazz', 'cantores de jazz']
  },
  {
    id: '9',
    title: 'Frank Sinatra — O Rei do Swing e dos Crooners',
    slug: 'frank-sinatra-rei-do-swing',
    excerpt: 'A história de Frank Sinatra, "Ol\' Blue Eyes", que definiu o estilo crooner e se tornou uma das maiores vozes da música americana.',
    content: '',
    image: frankSinatraImage,
    imageAlt: 'Retrato de elegante cantor dos anos 1950 com terno e gravata borboleta',
    category: 'Curiosidades',
    tags: ['frank sinatra', 'crooner', 'swing', 'rat pack'],
    publishedDate: '2025-07-17',
    readingTime: '6 min',
    author: 'Mariana Matheos',
    seoTitle: 'Frank Sinatra — O Rei do Swing e dos Crooners | Blog',
    seoDescription: 'A história de Frank Sinatra, que definiu o estilo crooner e se tornou uma das maiores vozes da música americana.',
    keywords: ['frank sinatra', 'crooner', 'swing', 'jazz', 'musica americana']
  },
  {
    id: '10',
    title: 'Nina Simone — A Sacerdotisa do Soul',
    slug: 'nina-simone-sacerdotisa-soul',
    excerpt: 'Conheça Nina Simone, pianista clássica que se tornou uma das vozes mais poderosas do jazz, soul e dos direitos civis.',
    content: '',
    image: ninaSimoneImage,
    imageAlt: 'Retrato de poderosa pianista e cantora dos anos 1960 ao piano',
    category: 'Curiosidades',
    tags: ['nina simone', 'soul', 'ativismo', 'piano jazz'],
    publishedDate: '2025-07-17',
    readingTime: '7 min',
    author: 'Mariana Matheos',
    seoTitle: 'Nina Simone — A Sacerdotisa do Soul | Blog',
    seoDescription: 'Conheça Nina Simone, pianista que se tornou uma das vozes mais poderosas do jazz, soul e dos direitos civis.',
    keywords: ['nina simone', 'soul', 'jazz', 'ativismo', 'piano']
  },
  {
    id: '11',
    title: 'Amy Winehouse — O Talento Interrompido do Neo-Soul',
    slug: 'amy-winehouse-neo-soul',
    excerpt: 'A trajetória breve mas impactante de Amy Winehouse, que revitalizou o soul e jazz contemporâneo com sua voz única.',
    content: '',
    image: amyWinehouseImage,
    imageAlt: 'Amy Winehouse com seu icônico penteado beehive e vestido preto',
    category: 'Curiosidades',
    tags: ['amy winehouse', 'neo-soul', 'contemporary jazz', 'british soul'],
    publishedDate: '2025-07-17',
    readingTime: '5 min',
    author: 'Mariana Matheos',
    seoTitle: 'Amy Winehouse — O Talento Interrompido do Neo-Soul | Blog',
    seoDescription: 'A trajetória breve mas impactante de Amy Winehouse, que revitalizou o soul e jazz contemporâneo.',
    keywords: ['amy winehouse', 'neo soul', 'jazz contemporaneo', 'soul music']
  },
  {
    id: '12',
    title: 'Etta James — A Matriarca do Soul e R&B',
    slug: 'etta-james-matriarca-soul-rb',
    excerpt: 'A história de Etta James, uma das vozes mais poderosas do soul e R&B, que influenciou gerações de cantores.',
    content: '',
    image: ettaJamesImage,
    imageAlt: 'Retrato de poderosa cantora de soul dos anos 1960 com expressão intensa',
    category: 'Curiosidades',
    tags: ['etta james', 'soul', 'r&b', 'blues'],
    publishedDate: '2025-07-17',
    readingTime: '6 min',
    author: 'Mariana Matheos',
    seoTitle: 'Etta James — A Matriarca do Soul e R&B | Blog',
    seoDescription: 'A história de Etta James, uma das vozes mais poderosas do soul e R&B que influenciou gerações.',
    keywords: ['etta james', 'soul', 'r&b', 'blues', 'at last']
  },
  {
    id: '13',
    title: 'Beth Hart — A Força do Blues Contemporâneo',
    slug: 'beth-hart-blues-contemporaneo',
    excerpt: 'Conheça Beth Hart, uma das vozes mais poderosas do blues contemporâneo, conhecida por sua intensidade emocional.',
    content: '',
    image: bethHartImage,
    imageAlt: 'Cantora de blues contemporâneo com cabelos loiros e expressão intensa',
    category: 'Curiosidades',
    tags: ['beth hart', 'blues contemporaneo', 'rock blues', 'cantora americana'],
    publishedDate: '2025-07-17',
    readingTime: '5 min',
    author: 'Mariana Matheos',
    seoTitle: 'Beth Hart — A Força do Blues Contemporâneo | Blog',
    seoDescription: 'Conheça Beth Hart, uma das vozes mais poderosas do blues contemporâneo e sua intensidade emocional.',
    keywords: ['beth hart', 'blues contemporaneo', 'rock blues', 'cantora blues']
  },
  {
    id: '14',
    title: 'B.B. King — O Rei do Blues',
    slug: 'bb-king-rei-do-blues',
    excerpt: 'A história de B.B. King, o lendário guitarrista e cantor que definiu o blues moderno com sua guitarra Lucille.',
    content: '',
    image: bbKingImage,
    imageAlt: 'Lendário guitarrista de blues dos anos 1960 com sua guitarra em performance',
    category: 'Curiosidades',
    tags: ['bb king', 'blues', 'guitarra', 'lucille'],
    publishedDate: '2025-07-17',
    readingTime: '6 min',
    author: 'Mariana Matheos',
    seoTitle: 'B.B. King — O Rei do Blues | Blog',
    seoDescription: 'A história de B.B. King, o lendário guitarrista que definiu o blues moderno com sua guitarra Lucille.',
    keywords: ['bb king', 'blues', 'guitarra blues', 'lucille', 'rei do blues']
  },
  {
    id: '15',
    title: 'Andra Day — A Nova Voz do Soul',
    slug: 'andra-day-nova-voz-soul',
    excerpt: 'Conheça Andra Day, a cantora que trouxe o soul clássico para o século XXI com sua voz poderosa e estilo vintage.',
    content: '',
    image: andraDayImage,
    imageAlt: 'Cantora de soul contemporânea com turbante e estilo vintage elegante',
    category: 'Curiosidades',
    tags: ['andra day', 'soul contemporaneo', 'rise up', 'neo soul'],
    publishedDate: '2025-07-17',
    readingTime: '5 min',
    author: 'Mariana Matheos',
    seoTitle: 'Andra Day — A Nova Voz do Soul | Blog',
    seoDescription: 'Conheça Andra Day, a cantora que trouxe o soul clássico para o século XXI com sua voz poderosa.',
    keywords: ['andra day', 'soul contemporaneo', 'rise up', 'neo soul', 'billie holiday']
  },
  {
    id: '16',
    title: 'Nat King Cole — O Cavaleiro do Piano e da Voz',
    slug: 'nat-king-cole-cavaleiro-piano-voz',
    excerpt: 'A história de Nat King Cole, pianista virtuoso que se tornou um dos maiores crooners da história do jazz.',
    content: '',
    image: natKingColeImage,
    imageAlt: 'Elegante pianista e cantor dos anos 1950 ao piano com sorriso característico',
    category: 'Curiosidades',
    tags: ['nat king cole', 'piano jazz', 'crooner', 'unforgettable'],
    publishedDate: '2025-07-17',
    readingTime: '6 min',
    author: 'Mariana Matheos',
    seoTitle: 'Nat King Cole — O Cavaleiro do Piano e da Voz | Blog',
    seoDescription: 'A história de Nat King Cole, pianista virtuoso que se tornou um dos maiores crooners da história do jazz.',
    keywords: ['nat king cole', 'piano jazz', 'crooner', 'unforgettable', 'trio']
  },
  {
    id: '17',
    title: 'Kitty Kallen — A Voz Doce da Era de Ouro',
    slug: 'kitty-kallen-voz-doce-era-ouro',
    excerpt: 'Conheça Kitty Kallen, a cantora que marcou a era de ouro do jazz com sua voz doce e interpretações memoráveis.',
    content: '',
    image: kittyKallenImage,
    imageAlt: 'Cantora elegante dos anos 1940 com vestido de gala e microfone vintage',
    category: 'Curiosidades',
    tags: ['kitty kallen', 'era de ouro', 'big bands', 'swing'],
    publishedDate: '2025-07-17',
    readingTime: '5 min',
    author: 'Mariana Matheos',
    seoTitle: 'Kitty Kallen — A Voz Doce da Era de Ouro | Blog',
    seoDescription: 'Conheça Kitty Kallen, a cantora que marcou a era de ouro do jazz com sua voz doce e interpretações memoráveis.',
    keywords: ['kitty kallen', 'era de ouro', 'big bands', 'swing', 'anos 1940']
  },
  {
    id: '18',
    title: 'Glenn Miller — O Maestro do Swing',
    slug: 'glenn-miller-maestro-swing',
    excerpt: 'A história de Glenn Miller, o líder de orquestra que definiu o som do swing e se tornou uma lenda da música americana.',
    content: '',
    image: glennMillerImage,
    imageAlt: 'Maestro de orquestra dos anos 1940 com batuta e uniforme militar elegante',
    category: 'Curiosidades',
    tags: ['glenn miller', 'swing', 'big band', 'orquestra'],
    publishedDate: '2025-07-17',
    readingTime: '6 min',
    author: 'Mariana Matheos',
    seoTitle: 'Glenn Miller — O Maestro do Swing | Blog',
    seoDescription: 'A história de Glenn Miller, o líder de orquestra que definiu o som do swing e se tornou uma lenda.',
    keywords: ['glenn miller', 'swing', 'big band', 'orquestra', 'in the mood']
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
        ogImage="/images/blog-hero.avif"
        pageType="website"
      />

      <Header />
      <AdvancedBreadcrumb />

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

      {/* Blog Collection Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog Mariana Matheos Jazz",
            "description": "Artigos sobre música jazz, dicas para eventos e inspirações musicais da banda Mariana Matheos Jazz em Belo Horizonte",
            "url": "https://marianamatheos.com.br/blog",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": blogArticles.length,
              "itemListElement": blogArticles.map((article, index) => ({
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
                  "publisher": {
                    "@type": "MusicGroup",
                    "name": "Mariana Matheos Jazz Band",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://marianamatheos.com.br/images/logo.avif",
                      "width": 600,
                      "height": 200
                    },
                    "url": "https://marianamatheos.com.br",
                    "sameAs": [
                      "https://www.instagram.com/marianamatheosjazz",
                      "https://www.facebook.com/marianamatheosjazz"
                    ]
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://marianamatheos.com.br/blog/${article.slug}`
                  },
                  "articleSection": article.category,
                  "keywords": article.keywords.join(", "),
                  "wordCount": article.content.split(' ').length,
                  "timeRequired": `PT${parseInt(article.readingTime)}M`,
                  "genre": [article.category, "Jazz", "Música"],
                  "about": {
                    "@type": "Thing",
                    "name": "Jazz Music",
                    "description": "Artigos sobre música jazz, eventos e cultura musical"
                  }
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
            "publisher": {
              "@type": "MusicGroup",
              "name": "Mariana Matheos Jazz Band",
              "description": "Banda profissional de jazz especializada em eventos elegantes em Belo Horizonte",
              "url": "https://marianamatheos.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://marianamatheos.com.br/images/logo.avif",
                "width": 600,
                "height": 200
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Belo Horizonte",
                "addressRegion": "MG",
                "addressCountry": "BR"
              },
              "sameAs": [
                "https://www.instagram.com/marianamatheosjazz",
                "https://www.facebook.com/marianamatheosjazz"
              ]
            }
          })
        }}
      />

      {/* WebSite Schema for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Blog Mariana Matheos Jazz",
            "url": "https://marianamatheos.com.br/blog",
            "description": "Blog oficial da banda Mariana Matheos Jazz com artigos sobre música, eventos e cultura jazzística",
            "publisher": {
              "@type": "MusicGroup",
              "name": "Mariana Matheos Jazz Band"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://marianamatheos.com.br/blog?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "Blog",
              "name": "Blog Mariana Matheos Jazz",
              "description": "Artigos e inspirações sobre música jazz para eventos elegantes",
              "blogPost": blogArticles.map(article => ({
                "@type": "BlogPosting",
                "@id": `https://marianamatheos.com.br/blog/${article.slug}`,
                "headline": article.title,
                "datePublished": article.publishedDate,
                "author": {
                  "@type": "Person",
                  "name": article.author
                }
              }))
            }
          })
        }}
      />
    </div>
  );
};

export default BlogPage;