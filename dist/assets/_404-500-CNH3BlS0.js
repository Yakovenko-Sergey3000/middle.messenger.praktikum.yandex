import{H as t,u as i}from"./button-link-D1i3wCh7.js";const s=`
  <div class="_400-500-wrapper">
    <h1 class="_400-500-title">{{ title }}</h1>
    <h2 class="_400-500-sub-title">{{ subtitle }}</h2>
    <div class="_400-500-link-button">
      <a href="{{href}}">{{> link_button }}</a>
    </div>
  </div>
`;t.registerPartial("link_button",i({label:"Назад к чатам"}));const n=({title:a,subtitle:l,href:e}={})=>t.compile(s)({title:a,subtitle:l,href:e});export{n as l};
