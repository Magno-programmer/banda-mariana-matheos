import React from 'react';

interface FeaturedSnippetsOptimizerProps {
  content: any;
  pageType: 'faq' | 'howto' | 'definition' | 'table' | 'list';
  title?: string;
}

const FeaturedSnippetsOptimizer: React.FC<FeaturedSnippetsOptimizerProps> = ({
  content,
  pageType,
  title
}) => {
  
  // FAQ snippet optimization
  const renderFAQSnippet = () => {
    if (!content || !Array.isArray(content)) return null;
    
    return (
      <div className="featured-snippet-faq" itemScope itemType="https://schema.org/FAQPage">
        <h2 className="text-2xl font-bold mb-6 text-jazz-gold">{title || 'Perguntas Frequentes'}</h2>
        {content.map((faq: any, index: number) => (
          <div 
            key={index}
            className="mb-6 p-4 bg-jazz-dark/30 rounded-lg border border-jazz-gold/20"
            itemScope 
            itemType="https://schema.org/Question"
          >
            <h3 
              className="text-lg font-semibold text-jazz-gold mb-3 cursor-pointer hover:text-jazz-gold/80"
              itemProp="name"
            >
              {faq.question}
            </h3>
            <div 
              className="text-white/90 leading-relaxed"
              itemScope 
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <div itemProp="text">
                {faq.answer}
              </div>
            </div>
            
            {/* Structured data for better snippet chances */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              })}
            </script>
          </div>
        ))}
      </div>
    );
  };

  // How-to snippet optimization
  const renderHowToSnippet = () => {
    if (!content || !Array.isArray(content)) return null;
    
    return (
      <div className="featured-snippet-howto" itemScope itemType="https://schema.org/HowTo">
        <h2 className="text-2xl font-bold mb-6 text-jazz-gold" itemProp="name">
          {title || 'Como Contratar a Mariana Matheos Jazz Band'}
        </h2>
        
        <div className="mb-4 text-white/90" itemProp="description">
          Siga estes passos simples para contratar nossa banda para seu evento:
        </div>
        
        <ol className="space-y-4">
          {content.map((step: any, index: number) => (
            <li 
              key={index}
              className="flex items-start space-x-4"
              itemScope 
              itemType="https://schema.org/HowToStep"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-jazz-gold text-black rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-jazz-gold mb-2" itemProp="name">
                  {step.title}
                </h3>
                <div className="text-white/90" itemProp="text">
                  {step.description}
                </div>
              </div>
            </li>
          ))}
        </ol>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": title || "Como Contratar a Mariana Matheos Jazz Band",
            "description": "Guia passo a passo para contratar a banda",
            "step": content.map((step: any, index: number) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": step.title,
              "text": step.description
            }))
          })}
        </script>
      </div>
    );
  };

  // Definition snippet optimization
  const renderDefinitionSnippet = () => {
    if (!content || typeof content !== 'object') return null;
    
    return (
      <div className="featured-snippet-definition bg-jazz-dark/30 p-6 rounded-lg border border-jazz-gold/20">
        <h2 className="text-2xl font-bold mb-4 text-jazz-gold">
          {title || content.term}
        </h2>
        
        <div className="text-white/90 leading-relaxed mb-4">
          <strong className="text-jazz-gold">{content.term}:</strong> {content.definition}
        </div>
        
        {content.examples && (
          <div className="mt-4">
            <h3 className="font-semibold text-jazz-gold mb-2">Exemplos:</h3>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              {content.examples.map((example: string, index: number) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            "name": content.term,
            "description": content.definition
          })}
        </script>
      </div>
    );
  };

  // Table snippet optimization
  const renderTableSnippet = () => {
    if (!content || !content.headers || !content.rows) return null;
    
    return (
      <div className="featured-snippet-table">
        <h2 className="text-2xl font-bold mb-6 text-jazz-gold">
          {title || 'Tabela de Preços'}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-jazz-gold/20 rounded-lg overflow-hidden">
            <thead className="bg-jazz-gold/20">
              <tr>
                {content.headers.map((header: string, index: number) => (
                  <th 
                    key={index}
                    className="px-4 py-3 text-left font-semibold text-jazz-gold border-b border-jazz-gold/20"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row: any[], rowIndex: number) => (
                <tr 
                  key={rowIndex}
                  className="border-b border-jazz-gold/10 hover:bg-jazz-dark/30"
                >
                  {row.map((cell: any, cellIndex: number) => (
                    <td 
                      key={cellIndex}
                      className="px-4 py-3 text-white/90"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Table",
            "name": title || "Tabela de Preços",
            "about": "Informações sobre preços e serviços"
          })}
        </script>
      </div>
    );
  };

  // List snippet optimization
  const renderListSnippet = () => {
    if (!content || !Array.isArray(content)) return null;
    
    return (
      <div className="featured-snippet-list">
        <h2 className="text-2xl font-bold mb-6 text-jazz-gold">
          {title || 'Lista de Repertório'}
        </h2>
        
        <ul className="space-y-2">
          {content.map((item: any, index: number) => (
            <li 
              key={index}
              className="flex items-start space-x-3 text-white/90"
            >
              <span className="flex-shrink-0 w-2 h-2 bg-jazz-gold rounded-full mt-2"></span>
              <div>
                {typeof item === 'string' ? item : (
                  <>
                    <strong className="text-jazz-gold">{item.title}</strong>
                    {item.description && (
                      <span className="ml-2">- {item.description}</span>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": title || "Lista de Repertório",
            "itemListElement": content.map((item: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": typeof item === 'string' ? item : item.title,
              "description": typeof item === 'object' ? item.description : undefined
            }))
          })}
        </script>
      </div>
    );
  };

  // Render based on pageType
  const renderSnippet = () => {
    switch (pageType) {
      case 'faq':
        return renderFAQSnippet();
      case 'howto':
        return renderHowToSnippet();
      case 'definition':
        return renderDefinitionSnippet();
      case 'table':
        return renderTableSnippet();
      case 'list':
        return renderListSnippet();
      default:
        return null;
    }
  };

  return (
    <div className="featured-snippets-optimizer">
      {renderSnippet()}
    </div>
  );
};

// Sample data generators for different snippet types
export const sampleFAQData = [
  {
    question: "Quanto custa contratar a Mariana Matheos Jazz Band?",
    answer: "Os valores variam de R$ 1.500 a R$ 5.000 dependendo do tipo de evento, duração, local e formação da banda. Casamentos completos a partir de R$ 3.500. Solicite orçamento personalizado via WhatsApp."
  },
  {
    question: "Quantos músicos fazem parte da banda?",
    answer: "A formação completa tem 5 músicos profissionais: vocal (Mariana Matheos), piano, baixo, bateria e trompete. Também oferecemos formações reduzidas (trio ou quarteto) para eventos menores."
  },
  {
    question: "A banda toca em eventos fora de Belo Horizonte?",
    answer: "Sim! Atendemos toda a região metropolitana de BH e interior de Minas Gerais. Para região metropolitana, deslocamento incluso. Para cidades mais distantes, cobramos taxa de deslocamento."
  }
];

export const sampleHowToData = [
  {
    title: "Entre em contato via WhatsApp",
    description: "Clique no botão do WhatsApp no site ou envie mensagem para (31) 99752-2127. Informe data, local e tipo de evento."
  },
  {
    title: "Receba orçamento personalizado",
    description: "Nossa equipe enviará um orçamento detalhado em até 2 horas, considerando suas necessidades específicas."
  },
  {
    title: "Aprove o orçamento e assine o contrato",
    description: "Após aprovação, enviaremos o contrato formal. Pagamento: 50% na assinatura e 50% no dia do evento."
  },
  {
    title: "Relaxe e aproveite o show",
    description: "No dia do evento, nossa equipe chegará com antecedência para montagem. Você só precisa se preocupar em aproveitar!"
  }
];

export default FeaturedSnippetsOptimizer;