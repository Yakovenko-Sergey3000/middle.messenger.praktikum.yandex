export default `
    <label for="{{ forId }}" class="form-label__label">{{ label }}</label>
    {{{ element }}}
    {{#if error}}
    <div class="form-label__error">
      {{ error }}
    </div>
    {{/if}}
`;
