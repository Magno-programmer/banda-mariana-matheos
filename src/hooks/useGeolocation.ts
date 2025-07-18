/**
 * Geolocation Hook for International Market Detection
 * Provides intelligent market suggestions based on user location
 */

import { useState, useEffect } from 'react';

interface GeolocationData {
  country: string | null;
  region: string | null;
  suggestedMarket: string | null;
  confidence: number;
  isLoading: boolean;
  error: string | null;
}

const MARKET_MAPPING: Record<string, string> = {
  // Core Portuguese markets
  'BR': 'pt-BR',
  'PT': 'pt-PT',
  
  // English markets
  'US': 'en-US',
  'GB': 'en-GB',
  'AU': 'en-AU',
  'CA': 'en-CA',
  'IE': 'en-IE',
  'NZ': 'en-NZ',
  'ZA': 'en-ZA',
  'IN': 'en-IN',
  'SG': 'en-SG',
  'MY': 'en-MY',
  
  // Spanish markets
  'ES': 'es-ES',
  'AR': 'es-AR',
  'MX': 'es-MX',
  'CO': 'es-CO',
  'CL': 'es-CL',
  'PE': 'es-PE',
  'UY': 'es-UY',
  'VE': 'es-VE',
  
  // French markets
  'FR': 'fr-FR',
  'BE': 'fr-BE', // Default to French for Belgium
  'CH': 'de-CH', // Default to German for Switzerland
  
  // German markets
  'DE': 'de-DE',
  'AT': 'de-AT',
  
  // Nordic markets
  'SE': 'sv-SE',
  'DK': 'da-DK',
  'NO': 'nb-NO',
  'FI': 'fi-FI',
  
  // Other European markets
  'NL': 'nl-NL',
  'IT': 'it-IT',
  'PL': 'pl-PL',
  'CZ': 'cs-CZ',
  'RU': 'ru-RU',
  'UA': 'uk-UA',
  'BG': 'bg-BG',
  'RO': 'ro-RO',
  'HR': 'hr-HR',
  'SI': 'sl-SI',
  'SK': 'sk-SK',
  'HU': 'hu-HU',
  'EE': 'et-EE',
  'LV': 'lv-LV',
  'LT': 'lt-LT',
  'GR': 'el-GR',
  'MT': 'mt-MT',
  'CY': 'el-CY',
  
  // Asian markets
  'JP': 'ja-JP',
  'KR': 'ko-KR',
  'CN': 'zh-CN',
  'TW': 'zh-TW',
  'TH': 'th-TH',
  
  // Other markets
  'TR': 'tr-TR',
  'SA': 'ar-SA',
  'IL': 'he-IL',
};

export const useGeolocation = (): GeolocationData => {
  const [data, setData] = useState<GeolocationData>({
    country: null,
    region: null,
    suggestedMarket: null,
    confidence: 0,
    isLoading: true,
    error: null,
  });

  // Get cached preference
  const getCachedMarket = (): string | null => {
    try {
      return localStorage.getItem('preferredMarket');
    } catch {
      return null;
    }
  };

  // Set cached preference
  const setCachedMarket = (market: string): void => {
    try {
      localStorage.setItem('preferredMarket', market);
    } catch {
      // Silent fail for localStorage issues
    }
  };

  // Detect country from browser timezone
  const getCountryFromTimezone = (): string | null => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Map common timezones to countries
      const timezoneMap: Record<string, string> = {
        'America/Sao_Paulo': 'BR',
        'America/New_York': 'US',
        'America/Los_Angeles': 'US',
        'Europe/London': 'GB',
        'Europe/Paris': 'FR',
        'Europe/Berlin': 'DE',
        'Europe/Madrid': 'ES',
        'Europe/Rome': 'IT',
        'Europe/Amsterdam': 'NL',
        'Europe/Stockholm': 'SE',
        'Europe/Copenhagen': 'DK',
        'Europe/Oslo': 'NO',
        'Europe/Helsinki': 'FI',
        'Asia/Tokyo': 'JP',
        'Asia/Seoul': 'KR',
        'Asia/Shanghai': 'CN',
        'Asia/Taipei': 'TW',
        'Australia/Sydney': 'AU',
        'Australia/Melbourne': 'AU',
      };
      
      return timezoneMap[timezone] || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const detectMarket = async () => {
      try {
        // Check for cached preference first
        const cached = getCachedMarket();
        if (cached) {
          setData({
            country: null,
            region: null,
            suggestedMarket: cached,
            confidence: 1.0,
            isLoading: false,
            error: null,
          });
          return;
        }

        // Try timezone-based detection
        const timezoneCountry = getCountryFromTimezone();
        if (timezoneCountry && MARKET_MAPPING[timezoneCountry]) {
          const suggestedMarket = MARKET_MAPPING[timezoneCountry];
          setCachedMarket(suggestedMarket);
          
          setData({
            country: timezoneCountry,
            region: null,
            suggestedMarket,
            confidence: 0.8,
            isLoading: false,
            error: null,
          });
          return;
        }

        // Try IP-based detection (if available in browser)
        try {
          const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) {
            const ipData = await response.json();
            const country = ipData.country_code;
            
            if (country && MARKET_MAPPING[country]) {
              const suggestedMarket = MARKET_MAPPING[country];
              setCachedMarket(suggestedMarket);
              
              setData({
                country,
                region: ipData.region,
                suggestedMarket,
                confidence: 0.9,
                isLoading: false,
                error: null,
              });
              return;
            }
          }
        } catch {
          // Silent fail for IP detection
        }

        // Fallback to browser language
        const browserLang = navigator.language || 'pt-BR';
        const fallbackMarket = browserLang.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';
        
        setData({
          country: null,
          region: null,
          suggestedMarket: fallbackMarket,
          confidence: 0.3,
          isLoading: false,
          error: null,
        });

      } catch (error) {
        setData({
          country: null,
          region: null,
          suggestedMarket: 'pt-BR', // Safe fallback
          confidence: 0,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Geolocation failed',
        });
      }
    };

    detectMarket();
  }, []);

  return data;
};

export default useGeolocation;
