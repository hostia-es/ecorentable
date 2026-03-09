

## Problema

Os mini-cards flutuantes na hero mostram dados isolados ("-15%", "-20% NOx/CO₂") sem contexto suficiente para um visitante que ainda não sabe o que a empresa faz. Para um leitor novo, esses números não comunicam valor — parecem métricas genéricas.

## Proposta: Reformular os mini-cards com contexto claro

Manter o visual dark glass e os dados, mas ajustar o copy para que qualquer pessoa entenda o benefício imediatamente:

### Card 1 (superior esquerdo)
- **Antes:** "Ahorro combustible / Tras tratamiento / -15%"
- **Depois:** "Consumo de combustible / Con descarbonización / -15%" + manter barra de progresso

### Card 2 (inferior esquerdo)
- **Antes:** "Emisiones reducidas / -20% NOx/CO₂"
- **Depois:** "Emisiones contaminantes / Resultado medio tras servicio / -20% NOx/CO₂"

### Alterações técnicas
- Arquivo: `src/pages/Index.tsx` (linhas ~238-277)
- Apenas mudanças de texto — zero mudanças de layout ou estilo
- Adicionar subtitle no card 2 para dar contexto (como o card 1 já tem)

