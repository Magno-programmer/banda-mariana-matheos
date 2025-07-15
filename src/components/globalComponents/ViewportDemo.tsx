import React from 'react';
import { useAdvancedViewport } from '../../hooks/useAdvancedViewport';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export const ViewportDemo: React.FC = () => {
  const viewport = useAdvancedViewport();

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-background/90 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Viewport Avançado</CardTitle>
          <CardDescription className="text-xs">
            Sistema dinâmico de viewport em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Tipo de dispositivo */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {viewport.config.deviceType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {viewport.config.orientation}
            </Badge>
          </div>

          {/* Dimensões */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Largura:</span>
              <span className="ml-1 font-mono">{viewport.config.width}px</span>
            </div>
            <div>
              <span className="text-muted-foreground">Altura:</span>
              <span className="ml-1 font-mono">{viewport.config.height}px</span>
            </div>
          </div>

          {/* DPR */}
          <div className="text-xs">
            <span className="text-muted-foreground">DPR:</span>
            <span className="ml-1 font-mono">{viewport.config.devicePixelRatio}</span>
          </div>

          {/* Safe Areas */}
          {viewport.hasNotch && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">Safe Areas:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>Top: {viewport.config.safeArea.top}px</div>
                <div>Right: {viewport.config.safeArea.right}px</div>
                <div>Bottom: {viewport.config.safeArea.bottom}px</div>
                <div>Left: {viewport.config.safeArea.left}px</div>
              </div>
            </div>
          )}

          {/* Características */}
          <div className="flex flex-wrap gap-1">
            {viewport.isTouch && (
              <Badge variant="secondary" className="text-xs">Touch</Badge>
            )}
            {viewport.isRetina && (
              <Badge variant="secondary" className="text-xs">Retina</Badge>
            )}
            {viewport.isStandalone && (
              <Badge variant="secondary" className="text-xs">PWA</Badge>
            )}
            {viewport.isFoldable && (
              <Badge variant="secondary" className="text-xs">Foldable</Badge>
            )}
            {viewport.config.hdrSupport && (
              <Badge variant="secondary" className="text-xs">HDR</Badge>
            )}
          </div>

          {/* Estado do dispositivo foldável */}
          {viewport.isFoldable && viewport.config.foldableState && (
            <div className="text-xs">
              <span className="text-muted-foreground">Estado:</span>
              <span className="ml-1 font-mono">{viewport.config.foldableState}</span>
            </div>
          )}

          {/* Breakpoints */}
          <div className="text-xs">
            <span className="text-muted-foreground">Breakpoint:</span>
            <span className="ml-1 font-mono">
              {viewport.isMobile && 'Mobile'}
              {viewport.isTablet && 'Tablet'}
              {viewport.isDesktop && 'Desktop'}
              {viewport.isLargeDesktop && 'Large Desktop'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewportDemo;