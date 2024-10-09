export default `
  <div class="chat-list">
    <div class="chat-list__header">
      <a href="/">
        Профиль
      </a>
      <img src="{{src_arrow_head}}" alt="header arrow">
    </div>
    <div class="chat-list__search-input">
      {{> search_input }}
      <div class="search-input__icon">
        <img src="{{src_search_icon}}" alt="search-icon">
      </div>
    </div>
    <div class="chat-list__dialogs_list">
      {{#each chats_list}}
        <article class="dialogs_list__item">{{> chat_item }}</article>
      {{/each}}
      {{#unless chats_list.length}}
        <div class="list_empty">
          <p>Пока что у вас нет сообщений...</p>
        </div>
      {{/unless}}
    </div>
  </div>
`;