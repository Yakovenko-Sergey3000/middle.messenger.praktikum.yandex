export default `

    <div class="dialog-menu__btn">︙<div>
    {{#if isOpen}}
      <div class="dialog-menu__list">
        {{{ dialogList }}}
      </div>
    {{/if }}
`;
