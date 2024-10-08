export default `
  <div class="sign-out-form">
    <div class="sign-out-form__inputs">
      {{> email }}
      {{> login }}
      {{> first_name }}
      {{> last_name }}
      {{> phone }}
      {{> password }}
      {{> confirm_password }}
    </div>
    <div class="sign-out-form__btns">
      {{> button }}
      <a href="/src/pages/sign-in-page/sign-in-page.html">{{> link_button }}</a>
    </div>
  </div>
`;