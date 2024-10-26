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
    <div class="dialog__ribbon">
      <p>Выберите чат чтобы отправить сообщение</p>
    </div>
    {{{ footer }}}
`;
