import React from 'react';
import { Globe, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAdvancedTranslation } from '@/hooks/useAdvancedTranslation';
import { useInternational } from './InternationalRouter';

interface TranslationStatusBarProps {
  className?: string;
}

export const TranslationStatusBar: React.FC<TranslationStatusBarProps> = ({ className = '' }) => {
  const { currentLanguage } = useInternational();
  const {
    isTranslating,
    translationProgress,
    enableAutoTranslation,
    setEnableAutoTranslation,
    translatePage,
    availableAPIs
  } = useAdvancedTranslation();

  const isPortuguese = currentLanguage === 'pt-BR' || currentLanguage === 'pt';

  if (isPortuguese) {
    return null; // Don't show for Portuguese (original language)
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-background/95 backdrop-blur border border-border/50 rounded-lg p-4 shadow-lg max-w-sm ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {isTranslating ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : enableAutoTranslation ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {isTranslating ? 'Translating...' : 'Translation'}
            </span>
            <span className="text-xs text-muted-foreground">
              {currentLanguage.toUpperCase()}
            </span>
          </div>

          {isTranslating && (
            <div className="mt-2">
              <Progress value={translationProgress} className="h-1" />
              <span className="text-xs text-muted-foreground">
                {Math.round(translationProgress)}%
              </span>
            </div>
          )}

          {!isTranslating && (
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant={enableAutoTranslation ? "default" : "outline"}
                onClick={() => setEnableAutoTranslation(!enableAutoTranslation)}
                className="text-xs h-6 px-2"
              >
                {enableAutoTranslation ? 'Auto ON' : 'Auto OFF'}
              </Button>

              {!enableAutoTranslation && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={translatePage}
                  className="text-xs h-6 px-2"
                >
                  Translate Now
                </Button>
              )}
            </div>
          )}

          {availableAPIs.length === 0 && (
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-orange-500">No translation APIs available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationStatusBar;