interface ImageContext {
  page: string;
  category: 'performance' | 'band' | 'event' | 'instrument' | 'venue' | 'historical';
  location?: string;
  emotion?: string;
  technical?: string;
  keywords?: string[];
}

interface AdvancedAltTextConfig {
  includeContext?: boolean;
  includeTechnical?: boolean;
  includeEmotion?: boolean;
  includeLocation?: boolean;
  maxLength?: number;
  screenReaderOptimized?: boolean;
  localKeywords?: boolean;
}

class AdvancedAltTextGenerator {
  private static instance: AdvancedAltTextGenerator;
  
  private localKeywords = [
    'Belo Horizonte', 'BH', 'Minas Gerais', 'MG', 'Nova Lima',
    'região metropolitana', 'Grande BH'
  ];
  
  private jazzKeywords = [
    'jazz band', 'banda de jazz', 'música jazz', 'jazz ao vivo',
    'performance jazz', 'repertório jazz', 'standards jazz'
  ];
  
  private eventKeywords = [
    'casamento', 'evento corporativo', 'festa de aniversário',
    'inauguração', 'coquetel', 'recepção', 'cerimônia'
  ];

  static getInstance(): AdvancedAltTextGenerator {
    if (!AdvancedAltTextGenerator.instance) {
      AdvancedAltTextGenerator.instance = new AdvancedAltTextGenerator();
    }
    return AdvancedAltTextGenerator.instance;
  }

  generateAltText(
    baseDescription: string,
    context: ImageContext,
    config: AdvancedAltTextConfig = {}
  ): string {
    const {
      includeContext = true,
      includeTechnical = true,
      includeEmotion = true,
      includeLocation = true,
      maxLength = 125,
      screenReaderOptimized = true,
      localKeywords = true
    } = config;

    let altText = baseDescription;

    // Add category context
    if (includeContext) {
      altText = this.addCategoryContext(altText, context);
    }

    // Add location keywords
    if (includeLocation && localKeywords) {
      altText = this.addLocationContext(altText, context);
    }

    // Add emotional context
    if (includeEmotion && context.emotion) {
      altText = this.addEmotionalContext(altText, context.emotion);
    }

    // Add technical details
    if (includeTechnical && context.technical) {
      altText = this.addTechnicalContext(altText, context.technical);
    }

    // Optimize for screen readers
    if (screenReaderOptimized) {
      altText = this.optimizeForScreenReader(altText);
    }

    // Truncate if necessary
    if (altText.length > maxLength) {
      altText = altText.substring(0, maxLength - 3) + '...';
    }

    return altText;
  }

  private addCategoryContext(altText: string, context: ImageContext): string {
    const categoryMap = {
      performance: 'apresentação ao vivo',
      band: 'banda de jazz',
      event: 'evento musical',
      instrument: 'instrumento musical',
      venue: 'local de apresentação',
      historical: 'registro histórico'
    };

    const categoryContext = categoryMap[context.category];
    if (categoryContext && !altText.toLowerCase().includes(categoryContext)) {
      return `${altText} - ${categoryContext}`;
    }
    return altText;
  }

  private addLocationContext(altText: string, context: ImageContext): string {
    const location = context.location || 'Belo Horizonte';
    
    // Check if location is already mentioned
    const hasLocation = this.localKeywords.some(keyword => 
      altText.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasLocation) {
      return `${altText} em ${location}`;
    }
    return altText;
  }

  private addEmotionalContext(altText: string, emotion: string): string {
    if (!altText.toLowerCase().includes(emotion.toLowerCase())) {
      return `${altText} com atmosfera ${emotion}`;
    }
    return altText;
  }

  private addTechnicalContext(altText: string, technical: string): string {
    return `${altText} - ${technical}`;
  }

  private optimizeForScreenReader(altText: string): string {
    // Remove redundant phrases
    altText = altText.replace(/imagem de |foto de |picture of /gi, '');
    
    // Standardize terminology
    altText = altText.replace(/banda jazz/gi, 'banda de jazz');
    altText = altText.replace(/BH/gi, 'Belo Horizonte');
    
    // Ensure proper spacing
    altText = altText.replace(/\s+/g, ' ').trim();
    
    return altText;
  }

  generatePerformerAltText(
    name: string,
    instrument: string,
    setting: string,
    expression?: string,
    location: string = 'Belo Horizonte'
  ): string {
    let altText = `${name} tocando ${instrument}`;
    
    if (expression) {
      altText += ` com expressão ${expression}`;
    }
    
    altText += ` durante ${setting} em ${location}`;
    
    return this.optimizeForScreenReader(altText);
  }

  generateEventAltText(
    eventType: string,
    participants: string[],
    venue: string,
    atmosphere: string,
    location: string = 'Belo Horizonte'
  ): string {
    const participantsList = participants.length > 2 
      ? `${participants.slice(0, 2).join(', ')} e outros`
      : participants.join(' e ');
    
    let altText = `${eventType} com ${participantsList}`;
    altText += ` no ${venue}, ${location}`;
    
    if (atmosphere) {
      altText += ` - ambiente ${atmosphere}`;
    }
    
    return this.optimizeForScreenReader(altText);
  }

  generateContextualAltText(imageName: string, pageContext: string): string {
    const contextMap: Record<string, ImageContext> = {
      '/': {
        page: 'home',
        category: 'band',
        location: 'Belo Horizonte',
        keywords: ['banda de jazz Belo Horizonte', 'jazz band BH']
      },
      '/fotos': {
        page: 'gallery',
        category: 'performance',
        location: 'Belo Horizonte',
        keywords: ['fotos apresentações jazz', 'galeria banda jazz']
      },
      '/sobre': {
        page: 'about',
        category: 'band',
        location: 'Belo Horizonte',
        keywords: ['Mariana Matheos', 'banda de jazz profissional']
      },
      '/repertorio': {
        page: 'repertoire',
        category: 'performance',
        location: 'Belo Horizonte',
        keywords: ['repertório jazz', 'standards jazz']
      },
      '/videos': {
        page: 'videos',
        category: 'performance',
        location: 'Belo Horizonte',
        keywords: ['vídeos apresentações', 'performance ao vivo']
      }
    };

    const context = contextMap[pageContext] || contextMap['/'];
    
    // Extract base description from image name
    const baseDescription = this.extractBaseDescription(imageName);
    
    return this.generateAltText(baseDescription, context, {
      localKeywords: true,
      includeContext: true,
      includeLocation: true
    });
  }

  private extractBaseDescription(imageName: string): string {
    const nameMap: Record<string, string> = {
      'cantora': 'Mariana Matheos, vocalista da banda de jazz',
      'pianista': 'Pianista da banda durante apresentação',
      'baixista': 'Baixista executando solo de jazz',
      'baterista': 'Baterista em performance rítmica',
      'banda': 'Banda de jazz completa em apresentação',
      'casamento': 'Banda tocando em cerimônia de casamento',
      'evento-corporativo': 'Apresentação em evento corporativo',
      'amy-winehouse': 'Tributo a Amy Winehouse',
      'billie-holiday': 'Homenagem a Billie Holiday',
      'ella-fitzgerald': 'Performance inspirada em Ella Fitzgerald',
      'frank-sinatra': 'Interpretação de clássicos de Frank Sinatra',
      'nina-simone': 'Tributo a Nina Simone'
    };

    // Extract key from filename
    const key = imageName.replace(/\.(avif|webp|jpg|jpeg|png)$/i, '');
    
    return nameMap[key] || `Apresentação musical da banda de jazz`;
  }

  validateAltText(altText: string): {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Length validation
    if (altText.length < 10) {
      issues.push('Alt text muito curto');
      suggestions.push('Adicione mais contexto descritivo');
    }

    if (altText.length > 125) {
      issues.push('Alt text muito longo');
      suggestions.push('Reduza para menos de 125 caracteres');
    }

    // Keyword presence
    const hasJazzKeyword = this.jazzKeywords.some(keyword => 
      altText.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasJazzKeyword) {
      suggestions.push('Considere adicionar "jazz" ou "banda de jazz"');
    }

    // Location presence
    const hasLocation = this.localKeywords.some(keyword => 
      altText.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasLocation) {
      suggestions.push('Considere adicionar localização (Belo Horizonte)');
    }

    // Accessibility check
    if (altText.toLowerCase().startsWith('imagem de') || 
        altText.toLowerCase().startsWith('foto de')) {
      issues.push('Evite redundâncias como "imagem de" ou "foto de"');
      suggestions.push('Comece diretamente com a descrição');
    }

    return {
      isValid: issues.length === 0,
      issues,
      suggestions
    };
  }
}

// Export singleton instance
export const altTextGenerator = AdvancedAltTextGenerator.getInstance();

// Predefined configurations for different contexts
export const ALT_TEXT_CONFIGS = {
  homepage: {
    includeLocation: true,
    localKeywords: true,
    maxLength: 120
  },
  gallery: {
    includeContext: true,
    includeTechnical: true,
    includeEmotion: true,
    maxLength: 125
  },
  blog: {
    includeContext: false,
    includeLocation: false,
    maxLength: 100
  },
  events: {
    includeLocation: true,
    includeEmotion: true,
    includeTechnical: false,
    maxLength: 115
  }
} as const;

// Historical performers data for context
export const HISTORICAL_PERFORMERS = {
  'amy-winehouse': {
    name: 'Amy Winehouse',
    era: 'contemporâneo',
    style: 'soul jazz',
    significance: 'Revival do jazz moderno'
  },
  'billie-holiday': {
    name: 'Billie Holiday',
    era: 'era dourada',
    style: 'jazz vocal',
    significance: 'Pioneira do jazz vocal feminino'
  },
  'ella-fitzgerald': {
    name: 'Ella Fitzgerald',
    era: 'swing',
    style: 'scat singing',
    significance: 'Primeira dama do jazz'
  },
  'frank-sinatra': {
    name: 'Frank Sinatra',
    era: 'era dourada',
    style: 'crooner',
    significance: 'Ícone do jazz vocal masculino'
  },
  'nina-simone': {
    name: 'Nina Simone',
    era: 'civil rights',
    style: 'jazz fusion',
    significance: 'Ativista e revolucionária musical'
  }
} as const;