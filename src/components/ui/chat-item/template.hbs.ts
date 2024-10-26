export default `
    <div class="chat-item__avatar">
      {{{ avatar }}}
    </div>
    <div class="chat-item__text-info">
      <h4>{{ title }}</h4>
      <p class="last_message">{{{ last_message }}}</p>
    </div>
    <div class="chat-item__another-info">
      <p class="message-create-at">{{{ time }}}</p>
      {{#if unread_count}}
      <span class="unread-message-count">
        {{ unread_count }}
      </span>
      {{/if}}
    </div>
`;
