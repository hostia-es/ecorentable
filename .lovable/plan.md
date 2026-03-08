
## Plano de Implementação: Atualização do Rodapé, Mais Contatos e Novo Painel Admin

Com base no seu pedido e na imagem enviada, elaborei um plano para deixar o site mais tecnológico, criar a área de administração oculta para gestão de leads e atualizar o rodapé exatamente como você pediu.

### 1. Atualização do Rodapé (Footer)
Vou refazer o `Footer.tsx` para refletir exatamente a estrutura da imagem enviada:
- **Coluna 1 (Ecología Rentable)**: Texto descritivo ("Somos expertos em descarbonización..."), endereço, telefone e email.
- **Coluna 2 (Web)**: Links para Inicio, Nosotros, Socios, Contacto.
- **Coluna 3 (Servicios)**: Links para Descarbonización, Limpieza de filtros.
- **Barra Inferior**: Links de Aviso Legal, Política de Cookies, Política de Privacidad, Accesibilidad, Copyright e o banner do Kit Digital centralizado.

### 2. Aumento de Pontos de Contato
- **Botão Flutuante do WhatsApp**: Vou adicionar um botão flutuante persistente no canto inferior direito de todo o site, para que os usuários possam entrar em contato a qualquer momento com um clique.

### 3. Criação do Painel Admin Oculto
Vou criar uma área administrativa premium e tecnológica acessível pela URL `/admin`. O painel terá uma barra lateral de navegação (Sidebar) e as seguintes páginas:

- **Dashboard (`/admin`)**: Uma visão geral tecnológica com métricas falsas/iniciais (Total de Leads, Taxa de Conversão, etc.).
- **Gestão de Leads / CRM (`/admin/leads`)**: Uma tabela onde você poderá ver os contatos que chegam pelo site, com status (Novo, Em contato, Fechado) e botões de ação rápida para fazer follow-up.
- **Configurações e Integração Resend (`/admin/settings`)**: Uma página específica com o espaço exato que você pediu para **colar a sua Chave de API do Resend**. O painel guardará essa chave para que possamos (no futuro ou em back-end) disparar os emails de follow-up diretamente para os leads.

### 4. Estrutura Técnica
- **Novos Componentes**: `AdminLayout.tsx` (estrutura do painel), `AdminDashboard.tsx`, `AdminLeads.tsx`, `AdminSettings.tsx`.
- **Rotas**: Atualização do `App.tsx` para incluir as rotas `/admin/*` de forma organizada e sem atrapalhar a navegação do site principal.

Assim que você aprovar, implementarei todas essas alterações.
