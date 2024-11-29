export default `
    {{{ avatar }}}
  <label for="change-avatar" class="change-wrapper">
    <div class="change-wrapper-overlay"></div>
    <p>{{{ wrapperText }}}</p>
  </label>
  {{#if isLoading}}
    <p class="change-avatar-loading">Загрузка картинки...</p>
  {{/if}}
  <div class="change-avatar-input-file">
    {{{ input }}}
  </div>
`;
