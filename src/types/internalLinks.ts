export interface InternalLink {
  title: string;
  path: string;
  description: string;
  icon: string;
  priority: number; // 1-5, onde 5 é mais importante
  category: 'primary' | 'secondary' | 'related';
  keywords: string[];
}

export interface PageRelations {
  [pagePath: string]: {
    relatedPages: InternalLink[];
    contextualLinks: InternalLink[];
    callToActionLinks: InternalLink[];
  };
}

// Mapeamento inteligente de páginas relacionadas
export const pageRelations: PageRelations = {
  '/': {
    relatedPages: [
      {
        title: 'Conheça Nossa História',
        path: '/sobre',
        description: 'Descubra a trajetória da Mariana Matheos Jazz Band',
        icon: 'Users',
        priority: 5,
        category: 'primary',
        keywords: ['história', 'banda', 'experiência', 'profissionalismo']
      },
      {
        title: 'Nosso Repertório',
        path: '/repertorio',
        description: 'Explore mais de 200 músicas em nosso catálogo',
        icon: 'Music',
        priority: 5,
        category: 'primary',
        keywords: ['músicas', 'repertório', 'jazz', 'bossa nova']
      },
      {
        title: 'Galeria de Fotos',
        path: '/fotos',
        description: 'Veja momentos marcantes de nossos eventos',
        icon: 'Camera',
        priority: 4,
        category: 'secondary',
        keywords: ['fotos', 'eventos', 'casamentos', 'shows']
      }
    ],
    contextualLinks: [
      {
        title: 'Agende Seu Evento',
        path: '/agenda',
        description: 'Reserve já sua data especial',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['agenda', 'reserva', 'disponibilidade']
      }
    ],
    callToActionLinks: [
      {
        title: 'Entre em Contato',
        path: '/contato',
        description: 'Solicite seu orçamento personalizado',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['contato', 'orçamento', 'informações']
      }
    ]
  },
  '/sobre': {
    relatedPages: [
      {
        title: 'Depoimentos de Clientes',
        path: '/depoimentos',
        description: 'Veja o que nossos clientes falam sobre nós',
        icon: 'Star',
        priority: 5,
        category: 'primary',
        keywords: ['depoimentos', 'avaliações', 'clientes', 'experiência']
      },
      {
        title: 'Nosso Repertório Musical',
        path: '/repertorio',
        description: 'Conheça nossa seleção de músicas especiais',
        icon: 'Music',
        priority: 4,
        category: 'secondary',
        keywords: ['repertório', 'músicas', 'estilos']
      },
      {
        title: 'Galeria de Vídeos',
        path: '/videos',
        description: 'Assista nossas apresentações ao vivo',
        icon: 'Play',
        priority: 4,
        category: 'secondary',
        keywords: ['vídeos', 'apresentações', 'performances']
      }
    ],
    contextualLinks: [
      {
        title: 'Agende uma Apresentação',
        path: '/agenda',
        description: 'Garante a banda para seu evento especial',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['agenda', 'evento', 'apresentação']
      }
    ],
    callToActionLinks: [
      {
        title: 'Solicite Orçamento',
        path: '/contato',
        description: 'Receba uma proposta personalizada',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['orçamento', 'proposta', 'contato']
      }
    ]
  },
  '/repertorio': {
    relatedPages: [
      {
        title: 'Vídeos das Músicas',
        path: '/videos',
        description: 'Ouça nossas interpretações ao vivo',
        icon: 'Play',
        priority: 5,
        category: 'primary',
        keywords: ['vídeos', 'músicas', 'performances', 'ao vivo']
      },
      {
        title: 'Fotos dos Shows',
        path: '/fotos',
        description: 'Veja a banda em ação durante os eventos',
        icon: 'Camera',
        priority: 4,
        category: 'secondary',
        keywords: ['fotos', 'shows', 'eventos', 'apresentações']
      },
      {
        title: 'Nossa História Musical',
        path: '/sobre',
        description: 'Conheça a experiência por trás do repertório',
        icon: 'Users',
        priority: 3,
        category: 'related',
        keywords: ['história', 'experiência', 'banda']
      }
    ],
    contextualLinks: [
      {
        title: 'Personalize Seu Evento',
        path: '/agenda',
        description: 'Escolha as músicas ideais para sua ocasião',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['personalização', 'evento', 'músicas']
      }
    ],
    callToActionLinks: [
      {
        title: 'Discuta Seu Repertório',
        path: '/contato',
        description: 'Fale conosco sobre músicas especiais',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['repertório', 'músicas especiais', 'discussão']
      }
    ]
  },
  '/fotos': {
    relatedPages: [
      {
        title: 'Vídeos Complementares',
        path: '/videos',
        description: 'Veja a banda em movimento e som',
        icon: 'Play',
        priority: 5,
        category: 'primary',
        keywords: ['vídeos', 'som', 'movimento', 'performances']
      },
      {
        title: 'Depoimentos Visuais',
        path: '/depoimentos',
        description: 'Leia sobre as experiências retratadas',
        icon: 'Star',
        priority: 4,
        category: 'secondary',
        keywords: ['depoimentos', 'experiências', 'eventos']
      },
      {
        title: 'Repertório Visual',
        path: '/repertorio',
        description: 'Veja quais músicas tocamos nos eventos',
        icon: 'Music',
        priority: 3,
        category: 'related',
        keywords: ['repertório', 'músicas', 'eventos']
      }
    ],
    contextualLinks: [
      {
        title: 'Seu Evento Assim',
        path: '/agenda',
        description: 'Garanta momentos especiais como estes',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['evento', 'momentos especiais', 'fotografia']
      }
    ],
    callToActionLinks: [
      {
        title: 'Planeje Seu Evento',
        path: '/contato',
        description: 'Crie memórias inesquecíveis também',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['planejamento', 'memórias', 'evento']
      }
    ]
  },
  '/videos': {
    relatedPages: [
      {
        title: 'Galeria de Fotos',
        path: '/fotos',
        description: 'Veja mais registros de nossos eventos',
        icon: 'Camera',
        priority: 5,
        category: 'primary',
        keywords: ['fotos', 'registros', 'eventos', 'momentos']
      },
      {
        title: 'Lista de Repertório',
        path: '/repertorio',
        description: 'Confira todas as músicas que tocamos',
        icon: 'Music',
        priority: 4,
        category: 'secondary',
        keywords: ['repertório', 'músicas', 'lista']
      },
      {
        title: 'Avaliações dos Clientes',
        path: '/depoimentos',
        description: 'Ouça o que dizem sobre nossas performances',
        icon: 'Star',
        priority: 4,
        category: 'secondary',
        keywords: ['avaliações', 'performances', 'clientes']
      }
    ],
    contextualLinks: [
      {
        title: 'Reserve Sua Data',
        path: '/agenda',
        description: 'Tenha essa qualidade em seu evento',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['reserva', 'qualidade', 'evento']
      }
    ],
    callToActionLinks: [
      {
        title: 'Solicite Demonstração',
        path: '/contato',
        description: 'Peça uma apresentação personalizada',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['demonstração', 'apresentação', 'personalizada']
      }
    ]
  },
  '/agenda': {
    relatedPages: [
      {
        title: 'Perguntas Frequentes',
        path: '/faq',
        description: 'Tire dúvidas sobre contratação e eventos',
        icon: 'HelpCircle',
        priority: 5,
        category: 'primary',
        keywords: ['dúvidas', 'contratação', 'eventos', 'faq']
      },
      {
        title: 'Repertório Musical',
        path: '/repertorio',
        description: 'Escolha as músicas para seu evento',
        icon: 'Music',
        priority: 4,
        category: 'secondary',
        keywords: ['repertório', 'músicas', 'escolha']
      },
      {
        title: 'Depoimentos de Eventos',
        path: '/depoimentos',
        description: 'Veja a satisfação de outros clientes',
        icon: 'Star',
        priority: 4,
        category: 'secondary',
        keywords: ['depoimentos', 'satisfação', 'eventos']
      }
    ],
    contextualLinks: [
      {
        title: 'Nossa Experiência',
        path: '/sobre',
        description: 'Conheça nossa trajetória e qualificações',
        icon: 'Users',
        priority: 3,
        category: 'related',
        keywords: ['experiência', 'trajetória', 'qualificações']
      }
    ],
    callToActionLinks: [
      {
        title: 'Finalizar Contratação',
        path: '/contato',
        description: 'Complete os detalhes do seu evento',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['contratação', 'detalhes', 'finalização']
      }
    ]
  },
  '/contato': {
    relatedPages: [
      {
        title: 'Perguntas Frequentes',
        path: '/faq',
        description: 'Encontre respostas rápidas aqui',
        icon: 'HelpCircle',
        priority: 5,
        category: 'primary',
        keywords: ['faq', 'respostas', 'dúvidas']
      },
      {
        title: 'Verificar Disponibilidade',
        path: '/agenda',
        description: 'Consulte datas disponíveis para seu evento',
        icon: 'Calendar',
        priority: 4,
        category: 'secondary',
        keywords: ['disponibilidade', 'datas', 'agenda']
      },
      {
        title: 'Nossos Serviços',
        path: '/sobre',
        description: 'Entenda melhor o que oferecemos',
        icon: 'Users',
        priority: 3,
        category: 'related',
        keywords: ['serviços', 'ofertas', 'detalhes']
      }
    ],
    contextualLinks: [
      {
        title: 'Exemplos de Eventos',
        path: '/fotos',
        description: 'Veja trabalhos anteriores realizados',
        icon: 'Camera',
        priority: 4,
        category: 'secondary',
        keywords: ['exemplos', 'trabalhos', 'eventos']
      }
    ],
    callToActionLinks: [
      {
        title: 'Ver Depoimentos',
        path: '/depoimentos',
        description: 'Confirme nossa qualidade através dos clientes',
        icon: 'Star',
        priority: 4,
        category: 'secondary',
        keywords: ['depoimentos', 'qualidade', 'confirmação']
      }
    ]
  },
  '/faq': {
    relatedPages: [
      {
        title: 'Processo de agenda',
        path: '/agenda',
        description: 'Veja como é simples contratar nossos serviços',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['agenda', 'processo', 'contratação']
      },
      {
        title: 'Informações da Banda',
        path: '/sobre',
        description: 'Conheça mais detalhes sobre nossa equipe',
        icon: 'Users',
        priority: 4,
        category: 'secondary',
        keywords: ['banda', 'equipe', 'informações']
      },
      {
        title: 'Lista de Músicas',
        path: '/repertorio',
        description: 'Veja todas as opções musicais disponíveis',
        icon: 'Music',
        priority: 4,
        category: 'secondary',
        keywords: ['músicas', 'repertório', 'opções']
      }
    ],
    contextualLinks: [
      {
        title: 'Exemplos Práticos',
        path: '/videos',
        description: 'Veja respostas em ação através dos vídeos',
        icon: 'Play',
        priority: 3,
        category: 'related',
        keywords: ['exemplos', 'vídeos', 'prática']
      }
    ],
    callToActionLinks: [
      {
        title: 'Ainda com Dúvidas?',
        path: '/contato',
        description: 'Fale diretamente conosco para esclarecimentos',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['dúvidas', 'esclarecimentos', 'contato']
      }
    ]
  },
  '/depoimentos': {
    relatedPages: [
      {
        title: 'Veja Nossos Eventos',
        path: '/fotos',
        description: 'Registros visuais dos eventos elogiados',
        icon: 'Camera',
        priority: 5,
        category: 'primary',
        keywords: ['eventos', 'registros', 'fotos']
      },
      {
        title: 'Ouça Nossa Música',
        path: '/videos',
        description: 'Performances que geraram estes elogios',
        icon: 'Play',
        priority: 5,
        category: 'primary',
        keywords: ['música', 'performances', 'vídeos']
      },
      {
        title: 'Nossa Experiência',
        path: '/sobre',
        description: 'História por trás da excelência reconhecida',
        icon: 'Users',
        priority: 4,
        category: 'secondary',
        keywords: ['experiência', 'história', 'excelência']
      }
    ],
    contextualLinks: [
      {
        title: 'Seja o Próximo',
        path: '/agenda',
        description: 'Tenha a mesma experiência excepcional',
        icon: 'Calendar',
        priority: 5,
        category: 'primary',
        keywords: ['próximo', 'experiência', 'excepcional']
      }
    ],
    callToActionLinks: [
      {
        title: 'Compartilhe Sua História',
        path: '/contato',
        description: 'Crie memórias para também avaliar',
        icon: 'MessageCircle',
        priority: 5,
        category: 'primary',
        keywords: ['história', 'memórias', 'avaliação']
      }
    ]
  }
};

export const getPageRelations = (currentPath: string) => {
  return pageRelations[currentPath] || {
    relatedPages: [],
    contextualLinks: [],
    callToActionLinks: []
  };
};