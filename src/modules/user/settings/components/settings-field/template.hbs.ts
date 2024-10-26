export default `
  <div class="setting-block">
    <div class="left-text">
      {{{ leftContent }}}
      {{#if error }}
         <div class="setting-block__error-text">{{ error }}</div>
      {{/if }}
    </div>
    <div class="right-text">
      {{{ rightContent }}}
    </div>
  </div>
`;
