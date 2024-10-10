import{H as t}from"./button-C1xl2RBC.js";import{u as s}from"./button-link-CxnH7awg.js";import{i as v}from"./flushed-input-6HD5luNO.js";import{u as _}from"./button-main-B-eBI9Rk.js";import{u as h}from"./button-circle-BngciP30.js";const i=({type:e="text",name:a,className:p="",placeholder:d="",value:f=""}={})=>t.compile(v)({className:`un-styled-input ${p}`,type:e,name:a,placeholder:d,value:f}),m=`
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
`;t.registerPartial("return_back_button",h({label:"⇤",className:"return-back-button"}));const r=({content:e,backHref:a="/"}={})=>(t.registerPartial("content",e),t.compile(m)({back_href:a})),l=`
  <div class="setting-wrapper">
    <div class="setting-wrapper__user_avatar">
      <div class="user-avatar-mock"></div>
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
`,n=`
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
`,b=[{left_text:"Почта",right_text:"pochta@yandex.ru"},{left_text:"Логин",right_text:"ivanivanov"},{left_text:"Имя",right_text:"Иван"},{left_text:"Фамилия",right_text:"Иванов"},{left_text:"Имя в чате",right_text:"Иван"},{left_text:"Телефон",right_text:"+7 (909) 967 30 30"}],x=[{left_partial:s({label:"Изменить данные"})},{left_partial:s({label:"Изменить пароль"})},{left_partial:s({label:"Выйти",className:"button-link_red"})}];t.registerPartial("left_partial",e=>e.left_partial);t.registerPartial("right_partial",e=>e.right_partial);const c=t.compile(n);t.registerPartial("field",c);t.registerPartial("action",c);const g=t.compile(l)({user_name:"Иван",user_fields_info:b,user_actions:x});t.registerPartial("settings_block",g);const S=()=>r({content:g}),k=[{left_text:"Почта",right_partial:i({value:"pochta@yandex.ru",className:"un-styled-input_begin-right"})},{left_text:"Логин",right_partial:i({value:"ivanivanov",className:"un-styled-input_begin-right"})},{left_text:"Имя",right_partial:i({value:"Иван",className:"un-styled-input_begin-right"})},{left_text:"Фамилия",right_partial:i({value:"Иванов",className:"un-styled-input_begin-right"})},{left_text:"Имя в чате",right_partial:i({value:"Иван",className:"un-styled-input_begin-right"})},{left_text:"Телефон",right_partial:i({value:"+7 (909) 967 30 30",className:"un-styled-input_begin-right"})}];t.registerPartial("left_partial",e=>e.left_partial);t.registerPartial("right_partial",e=>e.right_partial);const y=t.compile(n);t.registerPartial("field",y);t.registerPartial("save_button",_({label:"Сохранить"}));const o=t.compile(l)({user_fields_info:k,is_change:!0});t.registerPartial("settings_block",o);const $=()=>r({content:o}),P=[{left_text:"Старый пароль",right_partial:i({value:"12345",type:"password",className:"un-styled-input_begin-right"})},{left_text:"Новый пароль",right_partial:i({value:"12345",type:"password",className:"un-styled-input_begin-right"})},{left_text:"Повторите новый пароль",right_partial:i({value:"12345",type:"password",className:"un-styled-input_begin-right"})}];t.registerPartial("left_partial",e=>e.left_partial);t.registerPartial("right_partial",e=>e.right_partial);const N=t.compile(n);t.registerPartial("field",N);t.registerPartial("save_button",_({label:"Сохранить"}));const u=t.compile(l)({user_fields_info:P,is_change:!0});t.registerPartial("settings_block",u);const U=()=>r({content:u});export{$ as a,U as b,S as m};
