# 1-Bottle Pages

Esta pasta contém todas as páginas relacionadas ao funil de 1 bottle.

## Estrutura Recomendada:

### Páginas:
- `Upsell1.tsx` - Primeira página de upsell
- `Downsell1.tsx` - Primeira página de downsell  
- `Downsell2.tsx` - Segunda página de downsell
- `ThankYou.tsx` - Página de agradecimento
- `OrderBump.tsx` - Página de order bump

### Componentes Relacionados:
- Todos os componentes específicos devem ficar em `src/components/1-bottle/`

### Rotas Sugeridas:
- `/1-bottle/upsell-1`
- `/1-bottle/downsell-1`
- `/1-bottle/downsell-2`
- `/1-bottle/thank-you`
- `/1-bottle/order-bump`

### Organização:
- Cada página deve ter seus próprios componentes na pasta `components/1-bottle/`
- Use prefixos como `OneBottle` para evitar conflitos
- Mantenha a independência entre as páginas