# Project TODO List

This document outlines the tasks to be completed for the project. Each task is color-coded to indicate its current status.

## Legend
- 🟢 **Completed**
- 🟡 **In Progress**
- 🔴 **Not Started**

## Task List

- 🟢 **Criar Utilizadores**
- 🟢 **Ativar/Inativar utilizadores**
- 🟢 **Associar utilizadores a permissões da aplicação**
- 🟢 **Associar utilizadores a pelo menos um centro**
- 🔴 **Obrigar a atualização de password no primeiro login**
- 🟢 **Enviar email ao utilizador após o seu registo/criação na aplicação**
- 🟢 **Possibilidade de criação de áreas/categorias** (Desporto, Formação, Transportes, ...)
- 🟢 **Possibilidade de criação de subáreas/atividades** (Futebol, Boleias, Padle, ...)
- 🟢 **Possibilidade de criação de centros** 
- 🔴 **Possibilidade de criação de fóruns de discussão por categoria e/ou por atividade**.
- 🔴 <span style="color: yellow;">**Associado a cada área/categoria possibilidade de criação de Álbuns.** maybe by trigger =)</span>
- 🟢 **Apresentação do calendário de eventos**
- 🔴 <span style="color: yellow;">**Na área pessoal de um utilizador normal deve ser possível indicar/definir as áreas e subtópicos preferidos. Depois, sempre que forem publicados conteúdos nessas áreas e subtópicos, o utilizador deve ser notificado** não sei onde por a informação</span>
- 🔴 **Alterar o estado dos formulários a qualquer altura**
- 🟢 **Um administrador, em backoffice, apenas pode criar e moderar conteúdos relacionados com o centro em que é administrador. Os conteúdos moderados e publicados devem aparecer de imediato na aplicação móvel**
- 🔴 <span style="color: yellow;">**Os Administradores podem editar os conteúdos dos utilizadores, quando estão a fazer a moderação. Por exemplo, podem mudar a área associada ao conteúdo** Quando tem imagens buga um bocado</span>
- 🟢 **BackOffice adicionar os vários tipos de Categorias/Recomendações/Eventos/Atividades/Espaços. Cada tópico, terá subtópicos de acordo com as áreas de atuação**
- 🟢 **Validação em backoffice de recomendações/eventos/comentários e outros conteúdos inseridos pelos utilizadores da aplicação móvel.**
- 🟢 **Visão geral no BackOffice em dashboard dividido por área de atuação, atividade mais comentada, atividades mais vistas, nº de tópicos abertos, e recomendações/eventos por validar, etc..**
- 🟢 **Um administrador só pode validar/aprovar/publicar conteúdos do seu centro**

---

## Emails Prof Artur

### Relativamente à atualização de password no 1º login
- A mudança de psw no primeiro acesso continua a fazer sentido para os utilizadores de backoffice, cujas contas são criadas antecipadamente no backoffice. Quanto aos utilizadores da APP mobile, a vossa opção parece razoável. Convém, no entanto, referir que foi a softinsa que definiu os requisitos obrigatórios. Assim, parece-me que vão ter de justificar bem a vossa opção para os membros da softinsa. No entanto, parece-me defensável





## Night Thoughts


### User Types (Web)

#### Center Admin
- Only sees items from their center
  ```js
  // loc = officeID
  if(loc != 0){ // The Location with id = 0 is the server admin (can see all data)
      posts.filter(post => post.Location == loc)
  }

  ```


#### Server Admin
- Can see all data
