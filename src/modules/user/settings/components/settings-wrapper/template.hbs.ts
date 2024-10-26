export default `
    <div class="setting-wrapper__user_avatar">
      {{{ avatar }}}
    </div>
    <div class="setting-wrapper__user-name">
      <h4 class="setting-wrapper__user-name__title">{{{ user.first_name }}}</h4>
    </div>
    {{#if fields.length }}
      <div class="setting-wrapper__user-fields-info">
        {{{ fields }}}
      </div>
    {{/if }}
    {{#if actions.length }}
      <div class="setting-wrapper__user-actions">
        {{{ actions }}}  
      </div>  
    {{/if }}
    {{#if saveButton }}
      <div class="setting-wrapper__save_button">
        {{{ saveButton }}}  
      </div>  
    {{/if }}
`;
