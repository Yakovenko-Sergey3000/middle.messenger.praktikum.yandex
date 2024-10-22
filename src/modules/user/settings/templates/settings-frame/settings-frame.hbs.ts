export default `
  <div class="setting-wrapper">
    <div class="setting-wrapper__user_avatar">
      {{>avatar}}
    </div>
    <div class="setting-wrapper__user-name">
      <h4 class="setting-wrapper__user-name__title">{{user_name}}</h4>
    </div>
    <div class="setting-wrapper__user-fields-info">
      {{#each user_fields_info}}
        <div class="user-field">
          {{>field}}
        </div>
      {{/each}}
    </div>
    {{#unless is_change}}
      <div class="setting-wrapper__user-actions">
        {{#each user_actions}}
          <div class="action">
            {{>action}}
          </div>
        {{/each}}
      </div>
    {{/unless}}
    {{#if is_change }}
      <div class="setting-wrapper__save_button">
        {{>save_button}}
      </div>
    {{/if}}
  </div>
`;
