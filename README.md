# Project TODO List

This document outlines the tasks to be completed for the project. Each task is color-coded to indicate its current status.

## Legend
- 🟢 **Completed**
- 🟡 **In Progress**
- 🔴 **Not Started**

## Task List

- 🟢 **Criar Utilizadores**
- 🟢 **Ativar/Inativar utilizadores**
- 🟡 **Associar utilizadores a permissões da aplicação** - <span style="color:yellow">Falta promover a admin</span>
- 🟢 **Associar utilizadores a pelo menos um centro**
- 🟡 **Obrigar a atualização de password no primeiro login** - <span style="color:yellow">Falta verificar com o prof</span>
- 🟢 **Enviar email ao utilizador após o seu registo/criação na aplicação**
- 🟢 **Possibilidade de criação de áreas/categorias** (Desporto, Formação, Transportes, ...)
- 🟢 **Possibilidade de criação de subáreas/atividades** (Futebol, Boleias, Padle, ...)
- 🔴 **Possibilidade de criação de centros** Possibilidade de criação de fóruns de discussão por categoria e/ou por atividade.
- 🔴 **Associado a cada área/categoria possibilidade de criação de Álbuns.**
- 🟢 **Apresentação do calendário de eventos**
- 🔴 **Na área pessoal de um utilizador normal deve ser possível indicar/definir as áreas e subtópicos preferidos. Depois, sempre que forem publicados conteúdos nessas áreas e subtópicos, o utilizador deve ser notificado**
- 🔴 **Alterar o estado dos formulários a qualquer altura**
- 🟢 **Um administrador, em backoffice, apenas pode criar e moderar conteúdos relacionados com o centro em que é administrador. Os conteúdos moderados e publicados devem aparecer de imediato na aplicação móvel**
- 🔴 **Os Administradores podem editar os conteúdos dos utilizadores, quando estão a fazer a moderação. Por exemplo, podem mudar a área associada ao conteúdo**
- 🟢 **BackOffice adicionar os vários tipos de Categorias/Recomendações/Eventos/Atividades/Espaços. Cada tópico, terá subtópicos de acordo com as áreas de atuação**
- 🔴 **Validação em backoffice de recomendações/eventos/comentários e outros conteúdos inseridos pelos utilizadores da aplicação móvel.**
- 🔴 **Visão geral no BackOffice em dashboard dividido por área de atuação, atividade mais comentada, atividades mais vistas, nº de tópicos abertos, e recomendações/eventos por validar, etc..**
- 🟢 **Um administrador só pode validar/aprovar/publicar conteúdos do seu centro**

---

## Night Thoughts

---

## User Types (Web)

### Center Admin
- Only sees items from their center
  ```js
  // loc = officeID
  if(loc != 0){ // The Location with id = 0 is the server admin (can see all data)
      posts.filter(post => post.Location == loc)
  }
  ```

### Server Admin
- Can see all data
