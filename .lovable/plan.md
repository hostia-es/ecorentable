

## Problema

O screenshot mostra o hero mobile com muito espaço vazio entre os elementos — o título está pequeno demais para o espaço, os stats ocupam área mas não preenchem, e o layout geral fica "ralo".

## Plano: Hero mobile-first limpo

### Alterações em `src/pages/Index.tsx` (seção Hero, linhas ~129-286)

**1. Remover stats do hero mobile** — mover os 4 números (10+, 300+, 50K+, 45K+) para fora do hero. No mobile ficam escondidos (`hidden sm:grid`), e aparecem como uma faixa logo abaixo do hero.

**2. Aumentar tipografia mobile:**
- H1: de `text-[2.1rem]` para `text-[2.5rem]`
- MorphingText: mesmo tamanho do H1
- Subtitle: de `text-[15px]` para `text-base`

**3. Centralizar conteúdo verticalmente** — usar `flex items-center justify-center` com `min-h-[100svh]` e distribuir o espaço melhor entre badge → título → subtitle → CTAs.

**4. CTAs full-width no mobile** — botões `w-full` no mobile para preencher o espaço horizontal.

**5. Stats como faixa separada abaixo do hero** — nova `<section>` com `grid-cols-2 sm:grid-cols-4` que aparece em todas as telas, mas no mobile fica fora do hero (abaixo), evitando o aperto.

**6. Remover top bar no mobile** — o bar de email/telefone (`§0 TOP BAR`) já está compacto, mas se necessário esconder completamente no mobile com `hidden sm:block` para ganhar mais espaço vertical.

### Ficheiro alterado
- `src/pages/Index.tsx` — apenas hero section + nova faixa de stats

