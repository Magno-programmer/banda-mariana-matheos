# Otimização de Imagens

Este projeto implementa otimização automática de imagens com formatos modernos WebP e AVIF para melhor performance.

## Como Funciona

### 1. Componente OptimizedImage
Use o componente `OptimizedImage` em vez da tag `<img>` comum:

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

// Uso básico
<OptimizedImage 
  src="/images/exemplo.jpg"
  alt="Descrição da imagem"
  className="w-full h-64 object-cover"
/>

// Para imagens acima da dobra (hero, etc)
<OptimizedImage 
  src="/images/hero.jpg"
  alt="Imagem principal"
  className="w-full h-screen object-cover"
  priority={true}
/>
```

### 2. Build com Minificação
Durante o build de produção, as imagens são automaticamente otimizadas:

```bash
npm run build
```

### 3. Gerar Versões WebP/AVIF Manualmente
Para gerar versões otimizadas das imagens existentes:

```bash
node scripts/optimize-images.js
```

## Formatos Suportados

### AVIF (Primeira Opção)
- Melhor compressão (~50% menor que JPEG)
- Suporte moderno (Chrome 85+, Firefox 86+)

### WebP (Fallback)
- Boa compressão (~25% menor que JPEG)
- Suporte amplo (Chrome 32+, Firefox 65+, Safari 14+)

### Formato Original (Fallback Final)
- JPG/PNG original para compatibilidade total

## Performance

### Benefícios:
- ✅ Redução de 25-50% no tamanho dos arquivos
- ✅ Carregamento mais rápido em dispositivos móveis
- ✅ Menor uso de banda
- ✅ Melhor Core Web Vitals (LCP)

### Como o browser escolhe:
1. Tenta carregar AVIF (menor tamanho)
2. Se não suporta, tenta WebP
3. Se não suporta, carrega formato original

## Diretrizes de Uso

### ✅ Use OptimizedImage para:
- Imagens de conteúdo (galeria, sobre, etc)
- Imagens de fundo importantes
- Logos e elementos visuais principais

### ❌ Mantenha img comum para:
- Imagens externas (YouTube thumbnails)
- SVGs (já otimizados)
- Ícones pequenos em base64

## Configuração do Vite

O arquivo `vite.config.ts` está configurado com:
- Minificação automática de imagens em produção
- Conversão para WebP
- Otimização de PNG, JPEG, GIF e SVG