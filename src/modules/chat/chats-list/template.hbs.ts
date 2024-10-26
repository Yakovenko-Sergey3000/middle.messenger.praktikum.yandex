export default `
  <div class="chat-list">
    <div class="chat-list__header">
    {{{ openSettings }}}
<!--      <a href="/src/pages/view-user-settings.html">-->
<!--        Профиль-->
<!--      </a>-->
<!--      <button>-->
<!--        <img width="14" height="10" src="{{srcArrowHead }}" alt="header arrow">-->
<!--      </button>-->
      
    </div>
    <div class="chat-list__search-input">
      {{{ searchInput }}}
      <div class="search-input__icon">
        <img width="20" height="20" src="{{ srcSearchIcon }}" alt="search-icon">
      </div>
    </div>
    <div class="chat-list__dialogs_list">
       {{{ chatsList }}}
    </div>
  </div>
`;

// {{#each chats_list}}
// <article class="dialogs_list__item">{{> chat_item }}</article>
// {{/each}}
//   {{#unless chats_list.length}}
//   <div class="list_empty">
//     <p>Пока что у вас нет сообщений...</p>
//   </div>
//   {{/unless}}
