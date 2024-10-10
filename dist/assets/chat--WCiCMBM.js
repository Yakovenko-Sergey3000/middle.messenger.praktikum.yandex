import"./style-8P9LypbU.js";import{H as e}from"./button-C1xl2RBC.js";import{i as d}from"./flushed-input-6HD5luNO.js";import{u as r}from"./button-circle-BngciP30.js";const n=({type:s="text",name:a,className:t="",placeholder:i="",value:l=""}={})=>e.compile(d)({className:`filled-input ${t}`,type:s,name:a,placeholder:i,value:l}),_=`
  <div class="chat-list">
    <div class="chat-list__header">
      <a href="/">
        Профиль
      </a>
      <img src="{{src_arrow_head}}" alt="header arrow">
    </div>
    <div class="chat-list__search-input">
      {{> search_input }}
      <div class="search-input__icon">
        <img src="{{src_search_icon}}" alt="search-icon">
      </div>
    </div>
    <div class="chat-list__dialogs_list">
      {{#each chats_list}}
        <article class="dialogs_list__item">{{> chat_item }}</article>
      {{/each}}
      {{#unless chats_list.length}}
        <div class="list_empty">
          <p>Пока что у вас нет сообщений...</p>
        </div>
      {{/unless}}
    </div>
  </div>
`,c=`
  <div class="chat-item">
    <div class="chat-item__avatar">
      <div class="chat-item__mock-avatar"></div>
    </div>
    <div class="chat-item__text-info">
      <h4>{{ name }}</h4>
      <p class="last_message">{{ long_message last_message }}</p>
    </div>
    <div class="chat-item__another-info">
      <p class="message-create-at">{{ time message_created_at }}</p>
      {{#if unread_message_count}}
      <span class="unread-message-count">
        {{ unread_message_count }}
      </span>
      {{/if}}
    </div>
  </div>
`;e.registerHelper("time",s=>"10:23");e.registerHelper("long_message",s=>s.length>45?s.slice(0,45)+"...":s);const o=e.compile(c),g=({name:s="",last_message:a,message_created_at:t,unread_message_count:i}={})=>o({name:s,last_message:a,message_created_at:t,unread_message_count:i}),u="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.5924%2011.4138C10.1605%2012.8457%207.83886%2012.8457%206.40694%2011.4138C4.97502%209.98187%204.97502%207.66027%206.40694%206.22834C7.83886%204.79642%2010.1605%204.79642%2011.5924%206.22834C13.0243%207.66027%2013.0243%209.98187%2011.5924%2011.4138ZM12.0328%2012.7968C10.0725%2014.2961%207.25696%2014.1494%205.46413%2012.3566C3.51151%2010.404%203.51151%207.23816%205.46413%205.28553C7.41675%203.33291%2010.5826%203.33291%2012.5352%205.28553C14.3279%207.07828%2014.4747%209.8937%2012.9755%2011.8539L16.5423%2015.4206L15.5994%2016.3634L12.0328%2012.7968Z'%20fill='%23999999'/%3e%3c/svg%3e",p="data:image/svg+xml,%3csvg%20width='6'%20height='10'%20viewBox='0%200%206%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%209L5%205L1%201'%20stroke='%23999999'/%3e%3c/svg%3e",h=[{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")},{name:"Sergey",last_message:"Lorem Ipsum is simply dummy text...",unread_message_count:0,message_created_at:new Date("2024-10-01")},{name:"Andrey",last_message:"Lorem Ipsum ",unread_message_count:1,message_created_at:new Date("2024-10-01")},{name:"Nikolay",last_message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",unread_message_count:10,message_created_at:new Date("2024-10-01")}];e.registerPartial("search_input",n({name:"chats-search",className:"search-input"}));e.registerPartial("chat_item",g);const v=e.compile(_),y=()=>v({chats_list:h,src_search_icon:u,src_arrow_head:p}),L=`
  <div class="dialog">
    <div class="dialog__header">
      <div class="dialog__header__user-info">
        <div class="dialog__header__mock-avatar"></div>
        <h4>{{ user_name }}</h4>
      </div>
      <button class="dialog__header__menu">
        ︙
      </button>
    </div>
    <div class="dialog__ribbon">
      <p>Выберите чат чтобы отправить сообщение</p>
    </div>
    <div class="dialog__footer">
      <div class="dialog__footer__add-file">
        <img src="{{sct_file_icon}}" alt="file-icon" >
      </div>
      <div class="dialog__footer__input">
        {{> message_input }}
      </div>
      <div class="dialog__footer__button">
        {{> send_message_button }}
      </div>
    </div>
  </div>
`,f="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.18662%2013.5L14.7628%205.92389L15.7056%206.8667L8.12943%2014.4428L7.18662%2013.5Z'%20fill='%233369F3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.70067%2016.014L17.2768%208.43781L18.2196%209.38062L10.6435%2016.9568L9.70067%2016.014Z'%20fill='%233369F3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.0433%2021.3567L22.6195%2013.7806L23.5623%2014.7234L15.9861%2022.2995L15.0433%2021.3567Z'%20fill='%233369F3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M17.5574%2023.8706L25.1335%2016.2945L26.0763%2017.2373L18.5002%2024.8134L17.5574%2023.8706Z'%20fill='%233369F3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M17.5574%2023.8709C14.9423%2026.486%2010.7118%2026.4954%208.10831%2023.8919C5.50482%2021.2884%205.51424%2017.0579%208.12936%2014.4428L7.18655%2013.5C4.0484%2016.6381%204.0371%2021.7148%207.16129%2024.839C10.2855%2027.9632%2015.3621%2027.9518%2018.5003%2024.8137L17.5574%2023.8709Z'%20fill='%233369F3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M22.6195%2013.7806L23.5623%2014.7234C26.003%2012.2826%2026.0118%208.3341%2023.5819%205.90417C21.152%203.47424%2017.2035%203.48304%2014.7627%205.92381L15.7055%206.86662C17.6233%204.94887%2020.7257%204.94196%2022.6349%206.85119C24.5441%208.76042%2024.5372%2011.8628%2022.6195%2013.7806Z'%20fill='%233369F3'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.70092%2016.0144C7.95751%2017.7578%207.95123%2020.5782%209.68689%2022.3138C11.4226%2024.0495%2014.2429%2024.0432%2015.9863%2022.2998L15.0435%2021.357C13.8231%2022.5774%2011.8489%2022.5818%2010.6339%2021.3668C9.41894%2020.1518%209.42334%2018.1776%2010.6437%2016.9572L9.70092%2016.0144Z'%20fill='%233369F3'/%3e%3c/svg%3e";e.registerPartial("send_message_button",r({label:"➔"}));e.registerPartial("message_input",n({name:"message",className:"send-message-input",placeholder:"Сообщение"}));const w=e.compile(L),I=()=>w({user_name:"Вадим",sct_file_icon:f}),C=`
  <div class="chat">
    <div class="chat__list">
      {{> chat_list_content }}
    </div>
    <div class="chat__dialog">
      {{> chat_dialog_content }}
    </div>
  </div>
`,m=e.compile(""),D=({chatListContent:s=m,chatDialogContent:a=m}={})=>(e.registerPartial("chat_list_content",s),e.registerPartial("chat_dialog_content",a),e.compile(C)()),x=()=>D({chatListContent:y(),chatDialogContent:I()});document.querySelector("#app").innerHTML=x();
