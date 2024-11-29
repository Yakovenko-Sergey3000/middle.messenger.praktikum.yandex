export default `
  <div class="chat">
    <div class="chat__list">
      {{{ chatsList }}}
    </div>
    <div class="chat__dialog">
      {{#unless chatDialog }}
        <h3 class="chat__dialog__without-dialog">Выберите диалог</h3>
      {{/unless }}
      
      {{{ chatDialog }}}
    </div>
  </div>
`;
