import"./style-8P9LypbU.js";import{H as e,u as i}from"./button-link-D1i3wCh7.js";import{u as a,a as t,b as n,l}from"./auth-form-051AJ-LR.js";const r=`
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
`;e.registerPartial("email",a({label:"Почта",element:t({name:"email",type:"email"})}));e.registerPartial("login",a({label:"Логин",element:t({name:"login"})}));e.registerPartial("first_name",a({label:"Имя",element:t({name:"first_name"})}));e.registerPartial("last_name",a({label:"Фамилия",element:t({name:"last_name"})}));e.registerPartial("phone",a({label:"Телефон",element:t({name:"phone"})}));e.registerPartial("password",a({label:"Пароль",element:t({type:"password",name:"password"})}));e.registerPartial("confirm_password",a({label:"Пароль (еще раз)",element:t({type:"password",name:"confirm_password"})}));e.registerPartial("button",n({type:"submit",label:"Зарегестрироваться"}));e.registerPartial("link_button",i({type:"button",label:"Войти"}));const s=()=>l({title:"Регистрация",content:e.compile(r)()});document.querySelector("#app").innerHTML=s();
