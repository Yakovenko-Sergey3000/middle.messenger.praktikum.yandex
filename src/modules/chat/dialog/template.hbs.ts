export default `
    <div class="dialog__header">
      <div class="dialog__header__user-info">
        <div class="dialog__header__avatar">
          {{{ dialogAvatar }}}
        </div>
        <h4>{{{ userName }}}</h4>
      </div>
      <button class="dialog__header__menu">
        ︙
      </button>
    </div>
    <div class="dialog__messages">
    {{#if isLoading}}
      <div class="dialog__loading">Загрузка...</div>
    {{else}}
      {{#unless messages.length}}
      <div class="dialog__ribbon">
        <p>У вас пока что нет сообщений</p>
      </div>
      {{ else }}
         {{{ messages }}}
      {{/unless }}
    {{/if}}
    </div>
    {{{ footer }}}
`;
