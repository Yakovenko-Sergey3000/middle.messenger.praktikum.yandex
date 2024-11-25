export default `
  <div class="chat-list">
    <div class="chat-list__header">
    {{{ openSettings }}}      
    </div>
    <div class="chat-list__add-chat">
        {{{ searchUser }}}
    </div>
    {{#if isSearch }}
       {{{ searchChatList }}}
    {{else}}
      <div class="chat-list__dialogs_list">
         {{{ chatsList }}}
      </div>
    {{/if}}
  </div>
`;
