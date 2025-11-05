# 1-Bottle Components

Esta pasta contém todos os componentes específicos para as páginas de 1 bottle.

## Convenções de Nomenclatura:

### Prefixo: `OneBottle`
- `OneBottleDTCOffer.tsx`
- `OneBottleCopyright.tsx`
- `OneBottleTestimonials.tsx`
- `OneBottleHeader.tsx`
- `OneBottleFooter.tsx`

## Estrutura Recomendada:

### Componentes Comuns:
- `OneBottleLayout.tsx` - Layout base para todas as páginas
- `OneBottleHeader.tsx` - Header específico
- `OneBottleFooter.tsx` - Footer específico
- `OneBottleCopyright.tsx` - Copyright específico

### Componentes de Ofertas:
- `OneBottleDTCOffer.tsx` - Ofertas DTC
- `OneBottleUpsellOffer.tsx` - Ofertas de upsell
- `OneBottleDownsellOffer.tsx` - Ofertas de downsell

### Componentes de Conteúdo:
- `OneBottleTestimonials.tsx` - Depoimentos
- `OneBottleDoctorTestimonials.tsx` - Depoimentos médicos
- `OneBottleGuarantee.tsx` - Seção de garantia

## Princípios:

1. **Independência**: Componentes não devem afetar outras páginas
2. **Reutilização**: Componentes podem ser reutilizados entre páginas 1-bottle
3. **Organização**: Mantenha a estrutura clara e consistente
4. **Nomenclatura**: Use prefixos para evitar conflitos