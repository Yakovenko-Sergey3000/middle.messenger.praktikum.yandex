import"./style-8P9LypbU.js";import{H as e}from"./button-C1xl2RBC.js";import{u as a,a as t,l as i}from"./auth-form-D65AUDuM.js";import"./flushed-input-6HD5luNO.js";import{u as r}from"./button-main-B-eBI9Rk.js";import{u as n}from"./button-link-CxnH7awg.js";const l=`
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
`;e.registerPartial("email",a({label:"Почта",element:t({name:"email",type:"email"})}));e.registerPartial("login",a({label:"Логин",element:t({name:"login"})}));e.registerPartial("first_name",a({label:"Имя",element:t({name:"first_name"})}));e.registerPartial("last_name",a({label:"Фамилия",element:t({name:"last_name"})}));e.registerPartial("phone",a({label:"Телефон",element:t({name:"phone"})}));e.registerPartial("password",a({label:"Пароль",element:t({type:"password",name:"password"})}));e.registerPartial("confirm_password",a({label:"Пароль (еще раз)",element:t({type:"password",name:"confirm_password"})}));e.registerPartial("button",r({type:"submit",label:"Зарегестрироваться"}));e.registerPartial("link_button",n({type:"button",label:"Войти"}));const s=()=>i({title:"Регистрация",content:e.compile(l)()});document.querySelector("#app").innerHTML=s();
