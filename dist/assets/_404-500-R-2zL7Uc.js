import{H as t}from"./button-C1xl2RBC.js";import{u as e}from"./button-link-CxnH7awg.js";const s=`
  <div class="_400-500-wrapper">
    <h1 class="_400-500-title">{{ title }}</h1>
    <h2 class="_400-500-sub-title">{{ subtitle }}</h2>
    <div class="_400-500-link-button">
      <a href="{{href}}">{{> link_button }}</a>
    </div>
  </div>
`;t.registerPartial("link_button",e({label:"Назад к чатам"}));const n=({title:a,subtitle:l,href:i}={})=>t.compile(s)({title:a,subtitle:l,href:i});export{n as l};
