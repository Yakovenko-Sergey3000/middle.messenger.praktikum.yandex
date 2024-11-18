export default `
    {{#if isOpen }}
      <div class="add-chat">
        {{{ input }}}
        {{{ btn }}}
      </div>
    {{else}}
      {{{ openBtn }}}
    {{/if }}
   
`;
