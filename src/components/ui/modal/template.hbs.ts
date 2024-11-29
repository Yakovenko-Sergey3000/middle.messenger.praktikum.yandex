export default `
  {{#if isOpen }}
     <div class="modal">
       <div class="modal__overlay"></div> 
       <div class="modal__content">{{{ content }}}</div>
     </div>
  {{/if }}
`;
