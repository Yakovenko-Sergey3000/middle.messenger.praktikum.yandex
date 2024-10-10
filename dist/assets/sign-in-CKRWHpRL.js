import"./style-8P9LypbU.js";import{H as i,u as n}from"./button-link-D1i3wCh7.js";import{u as t,a,b as s,l as e}from"./auth-form-051AJ-LR.js";const r=`
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
`;i.registerPartial("login",t({label:"Логин",element:a({name:"login"})}));i.registerPartial("password",t({label:"Пароль",element:a({type:"password",name:"password"})}));i.registerPartial("button",s({type:"submit",label:"Авторизоваться"}));i.registerPartial("link_button",n({label:"Нет аккаунта?"}));const o=()=>e({title:"Вход",content:i.compile(r)(),className:"sign-in-wrapper"});document.querySelector("#app").innerHTML=o();
