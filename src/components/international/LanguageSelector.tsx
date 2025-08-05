import React, { useState } from 'react';
import { Check, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useInternational } from './InternationalRouter';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region?: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  // Portuguese
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', flag: '🇵🇹' },
  
  // English
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', nativeName: 'English (UK)', flag: '🇬🇧' },
  { code: 'en-AU', name: 'English (Australia)', nativeName: 'English (Australia)', flag: '🇦🇺' },
  { code: 'en-CA', name: 'English (Canada)', nativeName: 'English (Canada)', flag: '🇨🇦' },
  
  // Spanish
  { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español (España)', flag: '🇪🇸' },
  { code: 'es-MX', name: 'Spanish (Mexico)', nativeName: 'Español (México)', flag: '🇲🇽' },
  { code: 'es-AR', name: 'Spanish (Argentina)', nativeName: 'Español (Argentina)', flag: '🇦🇷' },
  
  // Catalan & Regional Spanish
  { code: 'ca-ES', name: 'Catalan', nativeName: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
  { code: 'eu-ES', name: 'Basque', nativeName: 'Euskera', flag: '🏴󠁥󠁳󠁰󠁶󠁿' },
  { code: 'gl-ES', name: 'Galician', nativeName: 'Galego', flag: '🏴󠁥󠁳󠁧󠁡󠁿' },
  
  // French
  { code: 'fr-FR', name: 'French (France)', nativeName: 'Français (France)', flag: '🇫🇷' },
  { code: 'fr-CA', name: 'French (Canada)', nativeName: 'Français (Canada)', flag: '🇨🇦' },
  { code: 'fr-BE', name: 'French (Belgium)', nativeName: 'Français (Belgique)', flag: '🇧🇪' },
  
  // German
  { code: 'de-DE', name: 'German (Germany)', nativeName: 'Deutsch (Deutschland)', flag: '🇩🇪' },
  { code: 'de-AT', name: 'German (Austria)', nativeName: 'Deutsch (Österreich)', flag: '🇦🇹' },
  { code: 'de-CH', name: 'German (Switzerland)', nativeName: 'Deutsch (Schweiz)', flag: '🇨🇭' },
  
  // Italian
  { code: 'it-IT', name: 'Italian (Italy)', nativeName: 'Italiano (Italia)', flag: '🇮🇹' },
  { code: 'it-CH', name: 'Italian (Switzerland)', nativeName: 'Italiano (Svizzera)', flag: '🇨🇭' },
  
  // Nordic
  { code: 'sv-SE', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'da-DK', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'nb-NO', name: 'Norwegian', nativeName: 'Norsk bokmål', flag: '🇳🇴' },
  { code: 'fi-FI', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  
  // Dutch
  { code: 'nl-NL', name: 'Dutch (Netherlands)', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'nl-BE', name: 'Dutch (Belgium)', nativeName: 'Nederlands (België)', flag: '🇧🇪' },
  
  // Asian
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
  { code: 'th-TH', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi-VN', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id-ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  
  // Eastern European
  { code: 'pl-PL', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'cs-CZ', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'uk-UA', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'bg-BG', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
  { code: 'ro-RO', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  
  // Balkan
  { code: 'hr-HR', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sl-SI', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
  { code: 'sk-SK', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sr-RS', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
  
  // Other European
  { code: 'hu-HU', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'et-EE', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
  { code: 'lv-LV', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt-LT', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
  { code: 'el-GR', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'mt-MT', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹' },
  
  // Middle Eastern & Others
  { code: 'tr-TR', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'he-IL', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  variant?: 'compact' | 'full';
  showFlag?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  showFlag = true,
  className = ''
}) => {
  const { currentLanguage, setLanguage } = useInternational();
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = LANGUAGE_OPTIONS.find(option => option.code === currentLanguage) || LANGUAGE_OPTIONS[0];

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    setIsOpen(false);
  };

  const groupedLanguages = LANGUAGE_OPTIONS.reduce((groups, option) => {
    const [lang] = option.code.split('-');
    if (!groups[lang]) {
      groups[lang] = [];
    }
    groups[lang].push(option);
    return groups;
  }, {} as Record<string, LanguageOption[]>);

  if (variant === 'compact') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-2 bg-background/95 backdrop-blur border-border/50 hover:bg-accent/50 ${className}`}
          >
            {showFlag && <span className="text-sm">{currentOption.flag}</span>}
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">{currentOption.code.split('-')[0].toUpperCase()}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-80 max-h-96 overflow-y-auto bg-background/95 backdrop-blur border-border/50"
        >
          {Object.entries(groupedLanguages).map(([langCode, options]) => (
            <div key={langCode}>
              {options.length > 1 && (
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50">
                  {options[0].name.split(' ')[0]} Variants
                </div>
              )}
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code)}
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    {showFlag && <span className="text-sm">{option.flag}</span>}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{option.nativeName}</span>
                      <span className="text-xs text-muted-foreground">{option.name}</span>
                    </div>
                  </div>
                  {currentLanguage === option.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Globe className="h-5 w-5" />
        Select Language
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {LANGUAGE_OPTIONS.map((option) => (
          <Button
            key={option.code}
            variant={currentLanguage === option.code ? "default" : "outline"}
            onClick={() => handleLanguageChange(option.code)}
            className="flex items-center justify-start gap-3 p-3 h-auto"
          >
            {showFlag && <span className="text-sm">{option.flag}</span>}
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{option.nativeName}</span>
              <span className="text-xs opacity-70">{option.name}</span>
            </div>
            {currentLanguage === option.code && (
              <Check className="h-4 w-4 ml-auto" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
