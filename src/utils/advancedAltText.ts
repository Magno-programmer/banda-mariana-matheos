/**
 * Sistema Avançado de Alt Text para Acessibilidade
 * Implementa descrições otimizadas para leitores de tela seguindo WCAG 2.1
 */

export interface ImageContext {
  purpose: 'informative' | 'functional' | 'decorative' | 'complex';
  category: 'performer' | 'instrument' | 'venue' | 'logo' | 'decorative' | 'historical' | 'event';
  emotion?: 'energetic' | 'elegant' | 'intimate' | 'sophisticated' | 'vintage' | 'modern';
  technical?: {
    setting?: string;
    lighting?: string;
    composition?: string;
    era?: string;
  };
}

export interface AdvancedAltTextConfig {
  includeContext?: boolean;
  includeTechnical?: boolean;
  includeEmotion?: boolean;
  maxLength?: number;
  screenReaderOptimized?: boolean;
}

class AdvancedAltTextGenerator {
  private static instance: AdvancedAltTextGenerator;
  
  static getInstance(): AdvancedAltTextGenerator {
    if (!AdvancedAltTextGenerator.instance) {
      AdvancedAltTextGenerator.instance = new AdvancedAltTextGenerator();
    }
    return AdvancedAltTextGenerator.instance;
  }

  /**
   * Gera alt text avançado baseado no contexto da imagem
   */
  generateAltText(
    baseDescription: string,
    context: ImageContext,
    config: AdvancedAltTextConfig = {}
  ): string {
    const {
      includeContext = true,
      includeTechnical = false,
      includeEmotion = true,
      maxLength = 125,
      screenReaderOptimized = true
    } = config;

    // Se é puramente decorativa, retorna alt vazio
    if (context.purpose === 'decorative') {
      return '';
    }

    let altText = baseDescription;

    // Adiciona contexto emocional
    if (includeEmotion && context.emotion) {
      const emotionDescriptions = {
        energetic: 'em performance energética',
        elegant: 'em ambiente elegante',
        intimate: 'em apresentação íntima',
        sophisticated: 'em setting sofisticado',
        vintage: 'em estilo vintage',
        modern: 'em contexto moderno'
      };
      altText += ` ${emotionDescriptions[context.emotion]}`;
    }

    // Adiciona informações técnicas
    if (includeTechnical && context.technical) {
      const { setting, lighting, era } = context.technical;
      const technicalParts = [];
      
      if (setting) technicalParts.push(`ambiente: ${setting}`);
      if (lighting) technicalParts.push(`iluminação: ${lighting}`);
      if (era) technicalParts.push(`época: ${era}`);
      
      if (technicalParts.length > 0) {
        altText += ` - ${technicalParts.join(', ')}`;
      }
    }

    // Adiciona informações específicas por categoria
    if (includeContext) {
      altText = this.addCategoryContext(altText, context);
    }

    // Otimiza para leitores de tela
    if (screenReaderOptimized) {
      altText = this.optimizeForScreenReader(altText);
    }

    // Limita o comprimento
    if (altText.length > maxLength) {
      altText = altText.substring(0, maxLength - 3) + '...';
    }

    return altText;
  }

  private addCategoryContext(altText: string, context: ImageContext): string {
    const contextMappings = {
      performer: 'artista musical',
      instrument: 'instrumento musical',
      venue: 'local de apresentação',
      logo: 'logotipo da banda',
      historical: 'imagem histórica',
      event: 'evento musical'
    };

    const categoryContext = contextMappings[context.category];
    if (categoryContext && !altText.toLowerCase().includes(categoryContext.toLowerCase())) {
      altText = `${categoryContext} - ${altText}`;
    }

    return altText;
  }

  private optimizeForScreenReader(altText: string): string {
    return altText
      // Remove redundâncias comuns
      .replace(/\b(imagem|foto|picture|image)\s*(de|da|do|of)?\s*/gi, '')
      // Padroniza terminologias musicais
      .replace(/\bbanda\b/gi, 'grupo musical')
      .replace(/\bshow\b/gi, 'apresentação')
      .replace(/\bpalco\b/gi, 'palco de apresentação')
      // Melhora fluidez da leitura
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Gera alt text específico para músicos/performers
   */
  generatePerformerAltText(
    name: string,
    instrument: string,
    setting: string,
    expression?: string
  ): string {
    const context: ImageContext = {
      purpose: 'informative',
      category: 'performer',
      emotion: 'sophisticated',
      technical: {
        setting,
        composition: 'retrato musical'
      }
    };

    const baseDescription = `${name} tocando ${instrument}${expression ? ` com expressão ${expression}` : ''}`;
    
    return this.generateAltText(baseDescription, context);
  }

  /**
   * Gera alt text para logos com contexto funcional
   */
  generateLogoAltText(
    brandName: string,
    style: string,
    functional: boolean = true
  ): string {
    const context: ImageContext = {
      purpose: functional ? 'functional' : 'informative',
      category: 'logo',
      emotion: 'elegant'
    };

    const baseDescription = `Logotipo ${style} da ${brandName}`;
    
    return this.generateAltText(baseDescription, context, {
      includeContext: functional,
      maxLength: 60
    });
  }

  /**
   * Gera alt text para imagens de eventos
   */
  generateEventAltText(
    eventType: string,
    participants: string[],
    venue: string,
    atmosphere: string
  ): string {
    const context: ImageContext = {
      purpose: 'informative',
      category: 'event',
      emotion: 'energetic',
      technical: {
        setting: venue,
        composition: 'grupo musical'
      }
    };

    const baseDescription = `${eventType} da ${participants.join(' e ')} em ${venue} com atmosfera ${atmosphere}`;
    
    return this.generateAltText(baseDescription, context);
  }

  /**
   * Gera alt text para imagens históricas
   */
  generateHistoricalAltText(
    subject: string,
    era: string,
    significance: string
  ): string {
    const context: ImageContext = {
      purpose: 'informative',
      category: 'historical',
      emotion: 'vintage',
      technical: {
        era,
        composition: 'retrato histórico'
      }
    };

    const baseDescription = `${subject} ${significance} da era ${era}`;
    
    return this.generateAltText(baseDescription, context);
  }

  /**
   * Valida se o alt text atende aos critérios de acessibilidade
   */
  validateAltText(altText: string): {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Verifica comprimento
    if (altText.length > 125) {
      issues.push('Alt text muito longo (>125 caracteres)');
      suggestions.push('Reduza para informações essenciais');
    }

    if (altText.length < 10 && altText.length > 0) {
      issues.push('Alt text muito curto');
      suggestions.push('Adicione mais contexto descritivo');
    }

    // Verifica redundâncias
    if (/\b(imagem|foto|picture|image)\s*(de|da|do|of)?\s*/gi.test(altText)) {
      issues.push('Contém redundâncias desnecessárias');
      suggestions.push('Remova palavras como "imagem de"');
    }

    // Verifica se termina com ponto
    if (altText.length > 0 && !altText.endsWith('.') && !altText.endsWith('!') && !altText.endsWith('?')) {
      issues.push('Não termina com pontuação');
      suggestions.push('Adicione ponto final para melhor leitura');
    }

    return {
      isValid: issues.length === 0,
      issues,
      suggestions
    };
  }
}

export const altTextGenerator = AdvancedAltTextGenerator.getInstance();

// Configurações predefinidas para diferentes contextos
export const ALT_TEXT_CONFIGS = {
  PERFORMER_PORTRAIT: {
    includeContext: true,
    includeTechnical: false,
    includeEmotion: true,
    maxLength: 100,
    screenReaderOptimized: true
  },
  LOGO_FUNCTIONAL: {
    includeContext: true,
    includeTechnical: false,
    includeEmotion: false,
    maxLength: 60,
    screenReaderOptimized: true
  },
  EVENT_PHOTO: {
    includeContext: true,
    includeTechnical: true,
    includeEmotion: true,
    maxLength: 125,
    screenReaderOptimized: true
  },
  DECORATIVE_ELEMENT: {
    includeContext: false,
    includeTechnical: false,
    includeEmotion: false,
    maxLength: 0,
    screenReaderOptimized: true
  }
} as const;

// Dados estruturados para performers históricos
export const HISTORICAL_PERFORMERS = {
  'billie-holiday': {
    name: 'Billie Holiday',
    era: 'anos 1940-1950',
    significance: 'pioneira do jazz vocal com estilo único e expressivo',
    instruments: ['vocal'],
    style: 'jazz vocal emotivo'
  },
  'ella-fitzgerald': {
    name: 'Ella Fitzgerald',
    era: 'anos 1940-1980',
    significance: 'primeira dama da canção com técnica vocal incomparável',
    instruments: ['vocal', 'scat singing'],
    style: 'swing e scat singing'
  },
  'frank-sinatra': {
    name: 'Frank Sinatra',
    era: 'anos 1940-1990',
    significance: 'crooner icônico que definiu o estilo interpretativo',
    instruments: ['vocal'],
    style: 'crooner e swing'
  },
  'nina-simone': {
    name: 'Nina Simone',
    era: 'anos 1960-1970',
    significance: 'pianista e cantora que uniu jazz, soul e ativismo',
    instruments: ['piano', 'vocal'],
    style: 'jazz soul com consciência social'
  },
  'amy-winehouse': {
    name: 'Amy Winehouse',
    era: 'anos 2000-2010',
    significance: 'revitalizou o soul contemporâneo com estilo retrô',
    instruments: ['vocal'],
    style: 'neo-soul e jazz contemporâneo'
  },
  'etta-james': {
    name: 'Etta James',
    era: 'anos 1960-1980',
    significance: 'voz poderosa do soul e R&B',
    instruments: ['vocal'],
    style: 'soul e rhythm & blues'
  },
  'beth-hart': {
    name: 'Beth Hart',
    era: 'anos 1990-atual',
    significance: 'cantora contemporânea de blues e rock',
    instruments: ['vocal', 'piano'],
    style: 'blues rock contemporâneo'
  },
  'bb-king': {
    name: 'B.B. King',
    era: 'anos 1950-2000',
    significance: 'rei do blues com sua lendária guitarra Lucille',
    instruments: ['guitarra', 'vocal'],
    style: 'blues elétrico'
  },
  'andra-day': {
    name: 'Andra Day',
    era: 'anos 2010-atual',
    significance: 'nova voz do soul com influências vintage',
    instruments: ['vocal'],
    style: 'neo-soul contemporâneo'
  },
  'nat-king-cole': {
    name: 'Nat King Cole',
    era: 'anos 1940-1960',
    significance: 'pianista virtuoso que se tornou crooner icônico',
    instruments: ['piano', 'vocal'],
    style: 'jazz piano e crooner'
  },
  'kitty-kallen': {
    name: 'Kitty Kallen',
    era: 'anos 1940-1950',
    significance: 'voz doce da era dourada do jazz',
    instruments: ['vocal'],
    style: 'big band e swing'
  },
  'glenn-miller': {
    name: 'Glenn Miller',
    era: 'anos 1930-1940',
    significance: 'maestro que definiu o som do swing',
    instruments: ['trombone', 'arranjo'],
    style: 'big band e swing orquestral'
  }
} as const;