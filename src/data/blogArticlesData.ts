export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  publishedDate: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  newsKeywords?: string[]; // New property for Google News optimization
}

export const blogArticlesData: BlogArticle[] = [
  {
    id: 1,
    title: "A História do Jazz no Brasil: Das Raízes aos Grandes Nomes",
    slug: "historia-jazz-brasil",
    excerpt: "Descubra como o jazz se desenvolveu no Brasil e conheça os principais artistas que moldaram esse gênero musical único em nossa cultura.",
    content: `
      <p>O jazz brasileiro tem uma história rica e fascinante que se entrelaça com a cultura musical do nosso país de forma única. Desde suas primeiras manifestações até os dias atuais, o jazz no Brasil desenvolveu características próprias que o tornam reconhecido mundialmente.</p>
      
      <h2>Os Primeiros Passos do Jazz Brasileiro</h2>
      <p>Na década de 1920, o jazz chegou ao Brasil através dos marinheiros americanos e das primeiras gravações que circulavam pelo país. Cities como Rio de Janeiro e São Paulo foram os primeiros centros de desenvolvimento dessa nova linguagem musical.</p>
      
      <h2>A Era de Ouro: Anos 1950-1960</h2>
      <p>Os anos 1950 marcaram o início da era dourada do jazz brasileiro. Músicos como Johnny Alf, considerado o precursor da bossa nova, começaram a fundir elementos do jazz americano com ritmos tipicamente brasileiros.</p>
      
      <h2>Grandes Nomes que Fizeram História</h2>
      <ul>
        <li><strong>Tom Jobim</strong> - O maestro soberano da bossa nova</li>
        <li><strong>João Gilberto</strong> - Revolucionou a interpretação vocal</li>
        <li><strong>Elis Regina</strong> - A voz mais expressiva do jazz brasileiro</li>
        <li><strong>Milton Nascimento</strong> - Trouxe elementos mineiros ao jazz</li>
        <li><strong>Hermeto Pascoal</strong> - O bruxo da música instrumental</li>
      </ul>
      
      <h2>O Jazz Brasileiro Hoje</h2>
      <p>Atualmente, o jazz brasileiro continua evoluindo com novos talentos que respeitam a tradição while incorporando influências contemporâneas. Festivais como o Festival de Inverno de Bonito e o Bourbon Festival mantêm viva essa tradição.</p>
      
      <p>Para eventos que buscam essa rica sonoridade brasileira, bandas especializadas como a Mariana Matheos Jazz Band oferecem repertórios que celebram tanto os clássicos quanto as inovações contemporâneas do gênero.</p>
    `,
    image: "/images/historia-jazz-brasil.avif",
    imageAlt: "Apresentação de jazz no Brasil",
    publishedDate: "2024-01-20",
    author: "Mariana Matheos",
    category: "História da Música",
    tags: ["jazz", "brasil", "bossa nova", "música brasileira"],
    readingTime: "8 minutos",
    seoTitle: "A História do Jazz no Brasil: Uma Jornada Musical",
    seoDescription: "Explore a rica história do jazz no Brasil, desde suas origens até os grandes nomes que moldaram o gênero. Descubra como o jazz se tornou parte da cultura brasileira.",
    keywords: ["jazz brasileiro", "história do jazz", "música no brasil", "bossa nova"],
    newsKeywords: ["jazz brasileiro", "música brasileira", "bossa nova", "tom jobim", "elis regina", "cultura musical", "história da música", "festivais de jazz"]
  },
  {
    id: 2,
    title: "Como Escolher a Banda Perfeita para seu Casamento",
    slug: "banda-perfeita-casamento",
    excerpt: "Encontre a banda ideal para o seu casamento com estas dicas essenciais. Música ao vivo para criar o ambiente perfeito e tornar seu dia inesquecível.",
    content: `
      <p>A escolha da banda para o seu casamento é uma das decisões mais importantes para garantir que o dia seja memorável. A música ao vivo tem o poder de criar uma atmosfera única e envolvente, que ficará na lembrança de todos os presentes.</p>
      
      <h2>Defina o Estilo Musical</h2>
      <p>O primeiro passo é definir o estilo musical que mais combina com o casal e com o tipo de cerimônia. Jazz, MPB, rock, pop, ou uma mistura de estilos? A escolha é sua!</p>
      
      <h2>Considere o Tamanho da Banda</h2>
      <p>O tamanho da banda deve ser adequado ao espaço disponível e ao número de convidados. Uma banda muito grande em um espaço pequeno pode ser desconfortável, enquanto uma banda pequena demais pode não preencher o ambiente.</p>
      
      <h2>Peça Recomendações e Veja Apresentações</h2>
      <p>Peça recomendações a amigos, familiares e outros fornecedores do casamento. Veja vídeos de apresentações da banda e, se possível, assista a um show ao vivo antes de tomar a decisão.</p>
      
      <h2>Verifique o Repertório</h2>
      <p>Certifique-se de que a banda possui um repertório variado e que inclua as músicas que vocês mais gostam. É importante que a banda esteja disposta a aprender novas músicas, caso necessário.</p>
      
      <h2>Negocie o Preço e Formalize o Contrato</h2>
      <p>Negocie o preço com a banda e formalize todos os detalhes em um contrato. O contrato deve incluir o valor total, a forma de pagamento, o tempo de duração da apresentação, o número de músicos, o equipamento utilizado e as responsabilidades de cada parte.</p>
      
      <p>Com estas dicas, você estará pronto para escolher a banda perfeita para o seu casamento e garantir que a música seja um dos pontos altos do seu grande dia. E se você busca uma banda de jazz experiente e versátil, a Mariana Matheos Jazz Band é a escolha certa!</p>
    `,
    image: "/images/casamento-jazz-band.avif",
    imageAlt: "Banda de jazz tocando em um casamento",
    publishedDate: "2024-02-10",
    author: "Equipe Mariana Matheos",
    category: "Casamentos",
    tags: ["banda", "casamento", "música ao vivo", "evento"],
    readingTime: "6 minutos",
    seoTitle: "Como Escolher a Banda Ideal para Seu Casamento",
    seoDescription: "Dicas essenciais para escolher a banda perfeita para o seu casamento. Música ao vivo para criar o ambiente ideal e tornar seu dia inesquecível.",
    keywords: ["banda casamento", "música casamento", "música ao vivo", "banda para eventos"],
    newsKeywords: ["casamento", "música casamento", "banda casamento", "música ao vivo", "eventos", "festa de casamento", "entretenimento", "música para eventos"]
  },
  {
    id: 3,
    title: "Repertório Jazz: 50 Clássicos Que Todo Amante da Música Deveria Conhecer",
    slug: "repertorio-jazz-classicos",
    excerpt: "Descubra 50 clássicos do jazz que todo amante da música deveria conhecer. Deixe-se levar pelos sons de Louis Armstrong, Ella Fitzgerald e outros ícones do jazz.",
    content: `
      <p>O jazz é um gênero musical rico e diversificado, com uma história que se estende por mais de um século. Para quem está começando a explorar o mundo do jazz, pode ser difícil saber por onde começar. Por isso, preparamos uma lista com 50 clássicos que todo amante da música deveria conhecer.</p>
      
      <h2>Os Pioneiros do Jazz</h2>
      <ul>
        <li><strong>Louis Armstrong</strong> - "What a Wonderful World"</li>
        <li><strong>Duke Ellington</strong> - "Take the 'A' Train"</li>
        <li><strong>Charlie Parker</strong> - "Bird and Diz"</li>
        <li><strong>Dizzy Gillespie</strong> - "Salt Peanuts"</li>
        <li><strong>Miles Davis</strong> - "So What"</li>
      </ul>
      
      <h2>As Divas do Jazz</h2>
      <ul>
        <li><strong>Ella Fitzgerald</strong> - "Dream a Little Dream of Me"</li>
        <li><strong>Billie Holiday</strong> - "Strange Fruit"</li>
        <li><strong>Sarah Vaughan</strong> - "Misty"</li>
        <li><strong>Nina Simone</strong> - "Feeling Good"</li>
        <li><strong>Etta James</strong> - "At Last"</li>
      </ul>
      
      <h2>Os Clássicos Instrumentais</h2>
      <ul>
        <li><strong>John Coltrane</strong> - "Giant Steps"</li>
        <li><strong>Thelonious Monk</strong> - "'Round Midnight"</li>
        <li><strong>Charles Mingus</strong> - "Goodbye Pork Pie Hat"</li>
        <li><strong>Wes Montgomery</strong> - "Bumpin'"</li>
        <li><strong>Herbie Hancock</strong> - "Cantaloupe Island"</li>
      </ul>
      
      <h2>O Jazz no Brasil</h2>
      <ul>
        <li><strong>Tom Jobim</strong> - "Garota de Ipanema"</li>
        <li><strong>João Gilberto</strong> - "Chega de Saudade"</li>
        <li><strong>Elis Regina</strong> - "Águas de Março"</li>
        <li><strong>Vinicius de Moraes</strong> - "Samba em Prelúdio"</li>
        <li><strong>Baden Powell</strong> - "Berimbau"</li>
      </ul>
      
      <p>Esta é apenas uma pequena amostra do vasto repertório do jazz. Explore, descubra novos artistas e deixe-se levar pela magia deste gênero musical que encanta gerações. E se você quer ouvir estes clássicos ao vivo, a Mariana Matheos Jazz Band tem o repertório perfeito para o seu evento!</p>
    `,
    image: "/images/jazz-standard.avif",
    imageAlt: "Músicos de jazz tocando em um clube",
    publishedDate: "2024-03-05",
    author: "Redação Mariana Matheos",
    category: "Repertório",
    tags: ["jazz", "repertório", "clássicos", "música"],
    readingTime: "10 minutos",
    seoTitle: "50 Clássicos do Jazz Que Você Precisa Conhecer",
    seoDescription: "Descubra 50 clássicos do jazz que todo amante da música deveria conhecer. Deixe-se levar pelos sons de Louis Armstrong, Ella Fitzgerald e outros ícones do jazz.",
    keywords: ["repertório jazz", "clássicos jazz", "músicas jazz", "jazz para iniciantes"],
    newsKeywords: ["repertório jazz", "clássicos do jazz", "música jazz", "standards jazz", "billie holiday", "frank sinatra", "ella fitzgerald", "educação musical"]
  },
  {
    id: 4,
    title: "Eventos Corporativos: Por Que a Música Ao Vivo Faz a Diferença",
    slug: "musica-ao-vivo-eventos-corporativos",
    excerpt: "Descubra por que a música ao vivo é essencial para o sucesso de eventos corporativos. Crie um ambiente memorável e fortaleça o relacionamento com seus clientes e colaboradores.",
    content: `
      <p>A música ao vivo tem o poder de transformar qualquer evento corporativo em uma experiência única e memorável. Seja uma conferência, um lançamento de produto, uma festa de fim de ano ou um evento de premiação, a música ao vivo pode fazer toda a diferença.</p>
      
      <h2>Cria um Ambiente Envolvente</h2>
      <p>A música ao vivo cria um ambiente envolvente e acolhedor, que estimula a interação entre os participantes e promove o networking. Uma banda de jazz, por exemplo, pode criar uma atmosfera sofisticada e elegante, perfeita para eventos de alto nível.</p>
      
      <h2>Fortalece o Relacionamento com Clientes e Colaboradores</h2>
      <p>A música ao vivo demonstra que a empresa se preocupa em oferecer o melhor para seus clientes e colaboradores. Um evento com música ao vivo mostra que a empresa valoriza a cultura e o entretenimento, e que está disposta a investir em experiências de qualidade.</p>
      
      <h2>Personaliza o Evento</h2>
      <p>A música ao vivo pode ser personalizada de acordo com o tema do evento e com o perfil dos participantes. Uma banda pode tocar músicas que são significativas para a empresa, ou que estão relacionadas com o produto ou serviço que está sendo lançado.</p>
      
      <h2>Aumenta o Engajamento</h2>
      <p>A música ao vivo aumenta o engajamento dos participantes, que se sentem mais motivados e inspirados. Um evento com música ao vivo é mais dinâmico e interativo, o que contribui para o sucesso do evento.</p>
      
      <p>Se você quer que o seu evento corporativo seja um sucesso, não deixe de investir na música ao vivo. A Mariana Matheos Jazz Band tem a experiência e o repertório perfeitos para tornar o seu evento inesquecível!</p>
    `,
    image: "/images/banda-blue-jazz-concurso.avif",
    imageAlt: "Banda tocando em um evento corporativo",
    publishedDate: "2024-03-20",
    author: "Marketing Mariana Matheos",
    category: "Eventos Corporativos",
    tags: ["música", "eventos", "corporativo", "ao vivo"],
    readingTime: "7 minutos",
    seoTitle: "Música Ao Vivo em Eventos Corporativos: Por Que Investir?",
    seoDescription: "Descubra por que a música ao vivo é essencial para o sucesso de eventos corporativos. Crie um ambiente memorável e fortaleça o relacionamento com seus clientes e colaboradores.",
    keywords: ["música eventos corporativos", "música ao vivo empresas", "eventos empresariais"],
    newsKeywords: ["eventos corporativos", "música empresarial", "música ao vivo", "entretenimento corporativo", "networking", "música para empresas", "eventos de negócios"]
  },
  {
    id: 5,
    title: "Jazz e Blues: Entendendo as Diferenças e Semelhanças",
    slug: "jazz-blues-diferencas-semelhancas",
    excerpt: "Explore as diferenças e semelhanças entre jazz e blues, dois gêneros musicais que compartilham raízes profundas e influenciaram a música mundial.",
    content: `
      <p>Jazz e blues são dois gêneros musicais que compartilham raízes profundas na cultura afro-americana e que influenciaram a música mundial de diversas formas. Embora tenham características distintas, jazz e blues também possuem muitas semelhanças.</p>
      
      <h2>Origens e História</h2>
      <p>O blues surgiu no final do século XIX, nas comunidades afro-americanas do sul dos Estados Unidos. O jazz, por sua vez, surgiu no início do século XX, em Nova Orleans, como uma fusão de blues, ragtime e música europeia.</p>
      
      <h2>Estrutura Musical</h2>
      <p>O blues geralmente segue uma estrutura de 12 compassos, com letras que expressam tristeza, sofrimento e dificuldades da vida. O jazz, por outro lado, é mais livre e improvisacional, com estruturas musicais mais complexas e harmonias sofisticadas.</p>
      
      <h2>Instrumentação</h2>
      <p>O blues é geralmente tocado com guitarra, harmônica e voz. O jazz, por sua vez, utiliza uma variedade maior de instrumentos, como saxofone, trompete, piano, bateria e contrabaixo.</p>
      
      <h2>Temas e Emoções</h2>
      <p>O blues expressa emoções como tristeza, melancolia, dor e sofrimento. O jazz, por outro lado, pode expressar uma variedade maior de emoções, como alegria, entusiasmo, paixão e liberdade.</p>
      
      <p>Apesar das diferenças, jazz e blues são dois gêneros musicais que se complementam e que continuam a inspirar músicos e amantes da música em todo o mundo. Se você quer conhecer mais sobre estes dois gêneros, a Mariana Matheos Jazz Band tem um repertório que explora tanto o jazz quanto o blues, com interpretações autênticas e emocionantes!</p>
    `,
    image: "/images/billie-holiday.avif",
    imageAlt: "Billie Holiday cantando blues",
    publishedDate: "2024-04-01",
    author: "Especialista em Música",
    category: "História da Música",
    tags: ["jazz", "blues", "música", "gêneros"],
    readingTime: "9 minutos",
    seoTitle: "Jazz e Blues: Descubra as Diferenças e Semelhanças",
    seoDescription: "Explore as diferenças e semelhanças entre jazz e blues, dois gêneros musicais que compartilham raízes profundas e influenciaram a música mundial.",
    keywords: ["jazz blues", "diferenças jazz blues", "música jazz blues", "gêneros musicais"],
    newsKeywords: ["jazz", "blues", "teoria musical", "história da música", "estilos musicais", "música americana", "educação musical", "cultura musical"]
  }
];
