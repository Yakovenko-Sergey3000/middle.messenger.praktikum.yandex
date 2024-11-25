export default `
      <div class="add-chat">
        <div class="add-chat__menu">
          {{{ input }}}
          {{{ btn }}} 
        </div>
        {{#if isLoading}}
          <p>Loading...</p>
        {{/if}}
        {{{ userList }}}
      </div>
`;
