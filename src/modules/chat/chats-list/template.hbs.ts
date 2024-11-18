export default `
  <div class="chat-list">
    <div class="chat-list__header">
    {{{ openSettings }}}      
    </div>
<!--    <div class="chat-list__search-input">-->
<!--      {{{ searchInput }}}-->
<!--      <div class="search-input__icon">-->
<!--        <img width="20" height="20" src="{{ srcSearchIcon }}" alt="search-icon">-->
<!--      </div>-->
<!--    </div>-->
    <div class="chat-list__add-chat">
        {{{ addChat }}}
      </div>
    <div class="chat-list__dialogs_list">
       {{{ chatsList }}}
    </div>
  </div>
`;
