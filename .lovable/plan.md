

## Redesign Completo da Home — Estilo Futurista Premium

### Problemas Identificados

O hero tem um bom ponto de partida (parallax, glassmorphism), mas o resto da página cai para um design genérico e plano:
- Seções alternam entre branco e cinza claro sem personalidade
- Cards são simples `Card` do shadcn sem efeitos visuais
- Sem gradientes, glows ou texturas nas seções de conteúdo
- Tipografia sem impacto visual nas seções intermediárias
- Transições entre seções são bruscas
- Seção de processo (4 passos) é escura mas os cards são básicos
- Testimonials e FAQ sem diferenciação visual

### Plano de Redesign

**1. Sistema Visual Futurista (CSS global)**
- Adicionar keyframes para glow pulse, gradient shimmer e grid animation
- Criar classes `.glass-card` (backdrop-blur + border glow verde), `.glow-border`, `.grid-bg` (subtle grid pattern)
- Gradiente de fundo animado para seções escuras

**2. Seção "Quiénes Somos" (§2) — Dark com glow**
- Mudar de `bg-secondary` (cinza claro) para fundo escuro com gradient mesh
- Bullets com ícones em círculos com glow verde
- Imagem com borda gradiente animada e shadow verde
- Badge com efeito glow

**3. Seção Hy-Carbon Connect (§3) — Cards glassmorphism**
- Fundo com grid pattern sutil
- 6 feature cards com glassmorphism: fundo semi-transparente, borda com gradient verde, hover com glow
- Cada card com ícone animado (Lucide icons: Stethoscope, Cog, Timer, Fuel, FileCheck, BarChart)
- Número/ícone no topo do card com efeito de brilho

**4. Seção Processo (§4) — Timeline futurista**
- Manter fundo escuro, adicionar grid pattern animado
- Redesenhar como timeline vertical com linha central glowing
- Números em círculos com borda gradiente e pulse animation
- Cards com glassmorphism mais pronunciado

**5. Seção Carbon FAP (§5) — Layout mais dramático**
- Fundo escuro em vez de branco
- Imagem com moldura glowing
- Bullets com animação stagger e ícones com glow

**6. Seção Socios (§6) — Metrics com efeito neon**
- Manter fundo escuro, melhorar cards de métricas com borders gradientes
- Counters com efeito glow no número
- Quote do fundador com estilo mais premium (borda gradiente em vez de sólida)

**7. Testimonials (§7) — Cards premium**
- Fundo com gradient mesh escuro
- Cards com glassmorphism, hover levanta e adiciona glow
- Stars com animação de entrada
- Avatar com ring gradiente

**8. CTA Final (§8) — Impacto máximo**
- Background com partículas/grid animado
- Texto principal com gradient text animado
- Botões com efeito glow e pulse sutil

**9. FAQ (§9) — Estilo clean escuro**
- Mover para fundo escuro para manter consistência
- Accordion items com borda glowing on hover

**10. Red Nacional (§10) — Fechamento forte**
- Adicionar visual de mapa ou grid de pontos estilizado
- Gradient de fundo dramático

### Detalhes Técnicos

- **Ficheiros editados**: `src/index.css` (novas classes utilitárias), `src/pages/Index.tsx` (redesign completo)
- **Sem dependências novas** — usar Tailwind, framer-motion e CSS puro para todos os efeitos
- **Padrão visual**: Predominância de fundos escuros (hsl 210 25% 4-8%) com acentos verde neon (hsl 148 60-72% 45-65%), glassmorphism (backdrop-blur + white/5-10% borders), grid patterns em CSS
- A página ficará maioritariamente escura com contraste verde neon — estilo tech/futurista consistente do topo ao fundo

