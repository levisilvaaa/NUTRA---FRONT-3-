# 3-Bottles Components

Esta pasta contém todos os componentes específicos para as páginas de 3 bottles.

## Convenções de Nomenclatura:

### Prefixo: `ThreeBottle`
- `ThreeBottleDTCOffer.tsx`
- `ThreeBottleCopyright.tsx`
- `ThreeBottleTestimonials.tsx`
- `ThreeBottleHeader.tsx`
- `ThreeBottleFooter.tsx`

## Estrutura Recomendada:

### Componentes Comuns:
- `ThreeBottleLayout.tsx` - Layout base para todas as páginas
- `ThreeBottleHeader.tsx` - Header específico
- `ThreeBottleFooter.tsx` - Footer específico
- `ThreeBottleCopyright.tsx` - Copyright específico

### Componentes de Ofertas:
- `ThreeBottleDTCOffer.tsx` - Ofertas DTC
- `ThreeBottleUpsellOffer.tsx` - Ofertas de upsell
- `ThreeBottleDownsellOffer.tsx` - Ofertas de downsell

### Componentes de Conteúdo:
- `ThreeBottleTestimonials.tsx` - Depoimentos
- `ThreeBottleDoctorTestimonials.tsx` - Depoimentos médicos
- `ThreeBottleGuarantee.tsx` - Seção de garantia

## Princípios:

1. **Independência**: Componentes não devem afetar outras páginas
2. **Reutilização**: Componentes podem ser reutilizados entre páginas 3-bottles
3. **Organização**: Mantenha a estrutura clara e consistente
4. **Nomenclatura**: Use prefixos para evitar conflitos

## Exemplo de Uso:

```tsx
// Importação limpa
import { ThreeBottleDTCOffer, ThreeBottleCopyright } from '../../components/3-bottles';

// Uso no componente
<ThreeBottleDTCOffer />
<ThreeBottleCopyright />
```