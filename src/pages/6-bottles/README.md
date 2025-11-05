# 6-Bottles Pages

Esta pasta contém todas as páginas relacionadas ao funil de 6 bottles.

## Estrutura Recomendada:

### Páginas:
- `Upsell1.tsx` - Primeira página de upsell
- `Downsell1.tsx` - Primeira página de downsell  
- `Downsell2.tsx` - Segunda página de downsell
- `ThankYou.tsx` - Página de agradecimento
- `OrderBump.tsx` - Página de order bump

### Componentes Relacionados:
- Todos os componentes específicos devem ficar em `src/components/6-bottles/`

### Rotas Sugeridas:
- `/6-bottles/upsell-1`
- `/6-bottles/downsell-1`
- `/6-bottles/downsell-2`
- `/6-bottles/thank-you`
- `/6-bottles/order-bump`

### Organização:
- Cada página deve ter seus próprios componentes na pasta `components/6-bottles/`
- Use prefixos como `SixBottle` para evitar conflitos
- Mantenha a independência entre as páginas

## Convenções de Nomenclatura:

### Prefixo: `SixBottle`
- `SixBottleDTCOffer.tsx`
- `SixBottleCopyright.tsx`
- `SixBottleTestimonials.tsx`
- `SixBottleHeader.tsx`
- `SixBottleFooter.tsx`

## Princípios:

1. **Independência**: Componentes não devem afetar outras páginas
2. **Reutilização**: Componentes podem ser reutilizados entre páginas 6-bottles
3. **Organização**: Mantenha a estrutura clara e consistente
4. **Nomenclatura**: Use prefixos para evitar conflitos