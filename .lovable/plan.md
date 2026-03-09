
## Plano de Correção: Reverter para Light Mode com Efeitos Premium

### Problema Identificado
A página Index.tsx foi alterada para dark mode (fundo `hsl(210_25%_4%)`, textos brancos, classes como `bg-dark-gradient`, `section-dark-mesh`, etc.). O usuário quer o site em **light mode** obrigatoriamente.

### Solução
Vou reverter toda a página Index.tsx para **light mode** mantendo os efeitos visuais premium (parallax, animações, glassmorphism), mas com:

1. **Fundos claros** - Backgrounds brancos/cinza claro
2. **Textos escuros** - Para contraste adequado
3. **Hero dramático** - Manter o hero com fundo escuro (é aceitável para impacto visual), mas todas as outras seções em light mode
4. **Efeitos visuais** - Manter animações, parallax, cards com hover, gradientes verdes

### Alterações Principais

**Index.tsx:**
- Linha 82: `bg-[hsl(210_25%_4%)]` → `bg-background`
- Seções 2-10: Trocar `section-dark-mesh`, `bg-dark-gradient` por fundos claros (`bg-white`, `bg-gray-50`, `bg-[hsl(var(--secondary))]`)
- Textos: De `text-white` para `text-foreground`, cores escuras
- Cards: De `glass-card` escuros para cards claros com sombras sutis
- Badges/botões: Manter estilo verde mas adaptar para fundo claro

**Estrutura das seções (após o hero):**
- Seção 2 (Quiénes Somos): Fundo claro
- Seção 3 (Hy-Carbon): Fundo alternado
- Seção 4 (Proceso): Fundo claro
- Seção 5 (Carbon FAP): Fundo cinza suave
- Seção 6 (Socios): Fundo claro
- Seção 7 (Testimonios): Fundo cinza
- Seção 8 (CTA): Pode ser escuro para impacto
- Seção 9 (FAQ): Fundo claro
- Seção 10 (Red Nacional): Pode ser escuro para fechamento

### Detalhes Técnicos

Vou atualizar:
- Classes de background de cada seção
- Cores de texto (branco → escuro)
- Estilos de cards (glass-card → cards com bg-white e sombras)
- Ícones e badges para contrastar com fundo claro
- Gradientes de overlay em imagens

O admin panel pode permanecer em dark mode (é uma área "oculta" e separada).
