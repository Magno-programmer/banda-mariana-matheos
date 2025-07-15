import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className={`relative group ${className}`}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
        aria-label="Selecionar idioma"
      >
        <Globe size={16} />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.name}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-muted first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${
              i18n.language === language.code ? 'bg-jazz-gold/20 text-jazz-gold' : ''
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;