# Cumprimento legal e consentimento de cookies

## Objetivo
Implementar o pacote jurídico descrito no arquivo enviado, com estas correções incorporadas:
- consentimento válido por **doze meses** nos dois pontos indicados;
- rotas **`/privacidad`** e **`/cookies`**;
- rota **`/aviso-legal`** mantida;
- todo o restante preservado conforme o texto original.

## Implementação
1. Criar as três páginas legais em espanhol, com os dados oficiais fornecidos, títulos afirmativos, metadados próprios e conteúdo estruturado para leitura confortável.
2. Acrescentar as novas rotas sem alterar nenhuma rota existente e registrar as novas URLs conforme a política append-only do projeto.
3. Implementar o banner e o painel de cookies:
   - técnicas sempre ativas;
   - analíticas desativadas por padrão;
   - ações equivalentes para aceitar, rejeitar e configurar;
   - decisão armazenada em `er_consent_v1` por doze meses;
   - reabertura pelo rodapé.
4. Ajustar o Google Consent Mode v2:
   - negar armazenamento publicitário e analítico antes da escolha;
   - carregar o Google Analytics somente após consentimento analítico;
   - manter o rastreamento de páginas existente;
   - revogar o consentimento e apagar cookies analíticas quando necessário.
5. Atualizar apenas o bloco legal do rodapé:
   - links para `/aviso-legal`, `/cookies` e `/privacidad`;
   - opção “Configurar cookies”;
   - copyright de ECOLOGÍA RENTABLE, S.L.
6. Adicionar consentimento obrigatório de privacidade nos formulários de Contacto, Hazte Socio e checkout, sem alterar campos, envio ou armazenamento existentes.
7. Validar a primeira visita, aceitar/rejeitar/reconfigurar cookies, as três páginas legais, os três formulários e a apresentação em desktop e móvel.

## Detalhes técnicos
- Usar os componentes e tokens visuais já existentes.
- Compartilhar um bloco de consentimento legal entre os três formulários para manter texto e comportamento idênticos.
- Disparar um evento interno para abrir o painel de cookies a partir do rodapé, sem modificar a navegação comercial.
- Não criar nem reativar qualquer recurso de IA.
