

## Plano: Encurtar copy da homepage (bypass style)

Manter todos os dados como estão. Apenas cortar texto excessivo para que o lead frio leia sem esforço.

### Alterações em `src/pages/Index.tsx`

**1. Hero subtitle (linha 182)** — De 2 linhas para 1:
- Antes: "Con el uso, tu motor acumula residuos de carbono que le hacen gastar más, perder potencia y contaminar. Nosotros los eliminamos con hidrógeno — sin desmontar nada, sin química agresiva y con un informe que demuestra la diferencia."
- Depois: "Eliminamos los residuos de carbono de tu motor con hidrógeno. Sin desmontar, sin química, con informe."

**2. Secção "Quiénes somos" (linhas 307-311)** — De 2 parágrafos para 1 curto:
- Fundir os dois parágrafos num só mais direto e curto

**3. Badge §2 (linha 302)** — Encurtar:
- "No vendemos promesas. Entregamos diagnósticos con datos reales." → "Diagnósticos con datos reales"

**4. aboutBullets (linhas 43-48)** — Encurtar cada bullet:
- "Recuperas la potencia original del motor" → "Recuperas potencia"
- "Reduces el consumo de combustible de forma medible" → "Reduces consumo de combustible"
- "Evitas averías que pueden costarte entre 350 € y 2.000 €" → "Evitas averías costosas"
- "Pasas la ITV sin sustos en la prueba de gases" → "Pasas la ITV sin sustos"

**5. Hy-Carbon Connect (linhas 368-373)** — De 2 parágrafos para 1 curto

**6. hyCarbonFeatures desc (linhas 51-56)** — Cortar segunda frase de cada feature, manter só a primeira

**7. processSteps desc (linhas 68-72)** — Reduzir cada desc a 1 frase curta

**8. carbonFapBullets desc (linhas 75-78)** — Já estão curtos, manter

**9. Carbon FAP secção (linhas 485-492)** — De 3 parágrafos para 1-2 curtos

**10. Socios secção (linhas 553-557)** — De 2 parágrafos para 1 curto

**11. CTA Final (linhas 663-666)** — De 2 parágrafos para 1 curto + tagline

**12. FAQ respostas (linhas 81-86)** — Encurtar cada resposta para 2-3 frases max

### Regra aplicada
- Títulos: máx 8 palavras
- Descrições/parágrafos: máx 1-2 frases curtas
- Bullets: 1 linha
- Dados e números: intocados

### Ficheiro alterado
- `src/pages/Index.tsx` — apenas texto, zero mudanças de layout ou estilo

