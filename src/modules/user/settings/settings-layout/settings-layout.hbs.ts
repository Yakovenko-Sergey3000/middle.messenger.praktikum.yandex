export default `
  <div class="user-settings">
    <div class="user-settings__left-bar">
      <a href="{{ back_href }}">
        {{> return_back_button }}
      </a>
    </div>
    <div class="user-settings__right-bar">
      {{> content }}
    </div>
  </div>
`;
