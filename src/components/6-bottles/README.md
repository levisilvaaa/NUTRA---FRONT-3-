# 6-Bottles Components

Esta pasta contém todos os componentes específicos para as páginas de 6 bottles.

## Convenções de Nomenclatura:

### Prefixo: `SixBottle`
- `SixBottleDTCOffer.tsx`
- `SixBottleCopyright.tsx`
- `SixBottleTestimonials.tsx`
- `SixBottleHeader.tsx`
- `SixBottleFooter.tsx`

## Estrutura Recomendada:

### Componentes Comuns:
- `SixBottleLayout.tsx` - Layout base para todas as páginas
- `SixBottleHeader.tsx` - Header específico
- `SixBottleFooter.tsx` - Footer específico
- `SixBottleCopyright.tsx` - Copyright específico

### Componentes de Ofertas:
- `SixBottleDTCOffer.tsx` - Ofertas DTC
- `SixBottleUpsellOffer.tsx` - Ofertas de upsell
- `SixBottleDownsellOffer.tsx` - Ofertas de downsell

### Componentes de Conteúdo:
- `SixBottleTestimonials.tsx` - Depoimentos
- `SixBottleDoctorTestimonials.tsx` - Depoimentos médicos
- `SixBottleGuarantee.tsx` - Seção de garantia

## Princípios:

1. **Independência**: Componentes não devem afetar outras páginas
2. **Reutilização**: Componentes podem ser reutilizados entre páginas 6-bottles
3. **Organização**: Mantenha a estrutura clara e consistente
4. **Nomenclatura**: Use prefixos para evitar conflitos

## Exemplo de Uso:

```tsx
// Importação limpa
import { SixBottleDTCOffer, SixBottleCopyright } from '../../components/6-bottles';

// Uso no componente
<SixBottleDTCOffer />
<SixBottleCopyright />
```