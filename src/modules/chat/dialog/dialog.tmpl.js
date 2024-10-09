export default `
  <div class="dialog">
    <div class="dialog__header">
      <div class="dialog__header__user-info">
        <div class="dialog__header__mock-avatar"></div>
        <h4>{{ user_name }}</h4>
      </div>
      <button class="dialog__header__menu">
        ︙
      </button>
    </div>
    <div class="dialog__ribbon">
      <p>Выберите чат чтобы отправить сообщение</p>
    </div>
    <div class="dialog__footer">
      <div class="dialog__footer__add-file">
        <img src="{{sct_file_icon}}" alt="file-icon" >
      </div>
      <div class="dialog__footer__input">
        {{> message_input }}
      </div>
      <div class="dialog__footer__button">
        {{> send_message_button }}
      </div>
    </div>
  </div>
`;
