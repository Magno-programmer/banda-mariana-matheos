import { useAdvancedViewport } from './useAdvancedViewport';

interface ResponsiveStyles {
  container: string;
  text: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  layout: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export const useResponsiveComponent = () => {
  const { 
    isMobile, 
    isTablet, 
    isDesktop 
  } = useAdvancedViewport();

  // Dynamic responsive styles based on device type
  const getResponsiveStyles = (): ResponsiveStyles => ({
    container: isMobile 
      ? 'container mx-auto px-4' 
      : isTablet 
        ? 'container mx-auto px-6' 
        : 'container mx-auto px-8',
    
    text: {
      small: isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base',
      medium: isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl',
      large: isMobile ? 'text-3xl md:text-4xl' : isTablet ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl',
      xlarge: isMobile ? 'text-4xl md:text-5xl' : isTablet ? 'text-5xl md:text-6xl' : 'text-6xl md:text-7xl'
    },

    spacing: {
      small: isMobile ? 'py-4' : isTablet ? 'py-6' : 'py-8',
      medium: isMobile ? 'py-8' : isTablet ? 'py-12' : 'py-16',
      large: isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
    },

    layout: {
      mobile: 'block sm:hidden',
      tablet: 'hidden sm:block lg:hidden', 
      desktop: 'hidden lg:block'
    }
  });

  // Component variants based on device
  const getComponentVariant = () => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  };

  // Navigation visibility logic
  const getNavigationConfig = () => ({
    showFullNavigation: isDesktop,
    showMobileMenu: isMobile || isTablet,
    showBrandText: !isMobile,
    logoSize: isMobile ? 'w-10 h-10' : isTablet ? 'w-12 h-12' : 'w-12 h-12'
  });

  // Content layout configuration
  const getLayoutConfig = () => ({
    showSidebar: isDesktop,
    columnsCount: isMobile ? 1 : isTablet ? 2 : 3,
    gridGap: isMobile ? 'gap-4' : isTablet ? 'gap-6' : 'gap-8',
    imageSize: isMobile ? 'w-full' : isTablet ? 'w-[50%]' : 'w-[30%]'
  });

  return {
    isMobile,
    isTablet, 
    isDesktop,
    styles: getResponsiveStyles(),
    variant: getComponentVariant(),
    navigation: getNavigationConfig(),
    layout: getLayoutConfig()
  };
};