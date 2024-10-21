export default `
  <div class="sign-in-form">
    <div class="sign-in-form__inputs">
      {{> login }}
      {{> password }}
    </div>
    <div class="sign-in-form__btns">
      {{> button }}
      <a href="/src/pages/sign-out-page.html">{{> link_button }}</a>
    </div>
  </div>
`;
