# 3-Bottles Pages

Esta pasta contém todas as páginas relacionadas ao funil de 3 bottles.

## Estrutura Recomendada:

### Páginas:
- `Upsell1.tsx` - Primeira página de upsell
- `Downsell1.tsx` - Primeira página de downsell  
- `Downsell2.tsx` - Segunda página de downsell
- `ThankYou.tsx` - Página de agradecimento
- `OrderBump.tsx` - Página de order bump

### Componentes Relacionados:
- Todos os componentes específicos devem ficar em `src/components/3-bottles/`

### Rotas Sugeridas:
- `/3-bottles/upsell-1`
- `/3-bottles/downsell-1`
- `/3-bottles/downsell-2`
- `/3-bottles/thank-you`
- `/3-bottles/order-bump`

### Organização:
- Cada página deve ter seus próprios componentes na pasta `components/3-bottles/`
- Use prefixos como `ThreeBottle` para evitar conflitos
- Mantenha a independência entre as páginas

## Convenções de Nomenclatura:

### Prefixo: `ThreeBottle`
- `ThreeBottleDTCOffer.tsx`
- `ThreeBottleCopyright.tsx`
- `ThreeBottleTestimonials.tsx`
- `ThreeBottleHeader.tsx`
- `ThreeBottleFooter.tsx`

## Princípios:

1. **Independência**: Componentes não devem afetar outras páginas
2. **Reutilização**: Componentes podem ser reutilizados entre páginas 3-bottles
3. **Organização**: Mantenha a estrutura clara e consistente
4. **Nomenclatura**: Use prefixos para evitar conflitos