export default `
  <div class="setting-block">
    <div>
      {{#if left_partial}}
        {{>left_partial}}
      {{else}}
        <div class="left-text">
          {{left_text}}
        </div>
      {{/if}}
    </div>

    <div>
      {{#if right_partial}}
        {{>right_partial}}
      {{else}}
        <div class="right-text">
          {{right_text}}
        </div>
      {{/if}}
    </div>
  </div>
`;
