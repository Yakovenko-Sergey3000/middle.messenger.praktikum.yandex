export default `
  <div class="search-user">
    <h2 class="search-user__title">Найти пользователя</h2>
    <div class="search-user__menu">
      {{{ input }}}
      {{{ btn }}} 
    </div>
    {{#if isLoading}}
      <p>Loading...</p>
    {{/if}}
    <div class="search-user__list">{{{ userList }}}</div>
  </div>
`;
