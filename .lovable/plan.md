

# Auditoria de Dados Falsos no Site

Analisei o site completo comparando com o site real (ecologiarentable.es). Aqui está o relatório:

---

## DADOS FALSOS encontrados

### 1. Telefone na página de Contacto
**Arquivo:** `src/pages/Contacto.tsx` (linha 20)
- **Falso:** `+34 900 123 456`
- **Real:** `+34 605 928 626`

### 2. Horário na página de Contacto e em todo o site
- **Usado no site:** `Lun–Vie 8:00–18:00` e `Sáb 9:00–13:00`
- **Real (do site):** `Lun - Vier 7:00 - 15:00 Hrs.` (sem sábado mencionado)

### 3. Endereço incompleto
- **Usado:** `Madrid, España`
- **Real:** `C. Isabel Colbrand, 6, 28050 Madrid`

### 4. FAQ de Contacto referencia centros removidos
**Arquivo:** `src/pages/Contacto.tsx` (linha 16)
- Ainda diz: *"En la sección 'Encuentra un centro' puedes ver el teléfono de cada centro certificado"* — funcionalidade que foi removida.

### 5. SociosPortal — dados de clientes fictícios
**Arquivo:** `src/pages/SociosPortal.tsx` (linhas 57-59)
- Clientes falsos: "María G.", "Carlos M.", "Ana R." com veículos e datas fictícias.
- **Nota:** Isto é um portal/dashboard de demonstração, então pode ser aceitável como mock de UI.

### 6. Citação de Younes Smaini ausente
- O site real tem: *"Únete a Ecología Rentable y convierte tu negocio en un motor de cambio sostenible." — Younes Smaini*
- Não encontrei esta citação no nosso site.

---

## DADOS PROVAVELMENTE REAIS (confirmados com site real)

### Testimonials — REAIS
Os 3 testimonials são do site real:
- **Nelson Valverde** (Socio) — texto real do site
- **María Jiménez** (Cliente) — texto real do site
- **Laura Herrera** (Cliente) — texto real do site

Nota: os textos no nosso site foram ligeiramente reescritos vs. o original, mas os nomes e papéis são reais.

### Contacto — PARCIALMENTE REAL
- **Email:** `info@ecologiarentable.es` — correto
- **Telefone no Footer:** `+34 605 928 626` — correto

---

## PREÇOS — NÃO VERIFICÁVEIS

O site real **não tem loja** (a URL /tienda/ dá 404). Portanto, **todos os preços dos produtos são inventados por IA**:

| Produto | Preço no site | Verificável? |
|---------|---------------|--------------|
| Hy-Calamine 1000S | Desde 2.800 € | Não |
| Hy-Calamine 2000S | Desde 4.200 € | Não |
| Hy-Calamine 3000S | Desde 6.900 € | Não |
| Hy-Carbon Connect | Desde 890 € | Não |
| Carbon FAP | Desde 28 € | Não |
| Kit DPF Básico | Desde 89 € | Não |
| Kit EGR Pro | Desde 65 € | Não |
| Aditivo Diésel PRO | Desde 22 € | Não |
| DPF Ultrasonidos | Desde 3.500 € | Não |
| Kit Flotas | Desde 450 € | Não |
| Limpiador Catalizador | Desde 35 € | Não |

Os preços de serviços em `ServicioDetalle.tsx` também são inventados (ex: "Desde 80 € hasta 200 €" para descarbonização).

As especificações técnicas dos produtos (potência, produção HHO, dimensões, peso) também foram geradas por IA e não são verificáveis.

---

## Plano de Correção

### Correções imediatas (dados reais disponíveis):
1. **Contacto.tsx** — Corrigir telefone para `+34 605 928 626`, endereço para `C. Isabel Colbrand, 6, 28050 Madrid`, horário para `Lun - Vier 7:00 - 15:00`
2. **Contacto.tsx** — Remover FAQ que referencia "Encuentra un centro"
3. **Horários** — Atualizar em todo o site para o horário real

### Decisão necessária do utilizador:
4. **Preços e especificações de produtos** — São todos inventados. Preciso que me forneça os preços reais, ou que remova a loja, ou que marque como "Consultar precio"
5. **Preços de serviços** — Mesma situação
6. **SociosPortal** — Manter como demo ou remover dados fictícios?

