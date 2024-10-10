import"./style-8P9LypbU.js";import{H as i}from"./button-C1xl2RBC.js";import{u as t,a,l as n}from"./auth-form-D65AUDuM.js";import"./flushed-input-6HD5luNO.js";import{u as s}from"./button-main-B-eBI9Rk.js";import{u as e}from"./button-link-CxnH7awg.js";const r=`
  <div class="sign-in-form">
    <div class="sign-in-form__inputs">
      {{> login }}
      {{> password }}
    </div>
    <div class="sign-in-form__btns">
      {{> button }}
      <a href="../../../../src/pages/sign-out-page/sign-out-page.html">{{> link_button }}</a>
    </div>
  </div>
`;i.registerPartial("login",t({label:"Логин",element:a({name:"login"})}));i.registerPartial("password",t({label:"Пароль",element:a({type:"password",name:"password"})}));i.registerPartial("button",s({type:"submit",label:"Авторизоваться"}));i.registerPartial("link_button",e({label:"Нет аккаунта?"}));const o=()=>n({title:"Вход",content:i.compile(r)(),className:"sign-in-wrapper"});document.querySelector("#app").innerHTML=o();
