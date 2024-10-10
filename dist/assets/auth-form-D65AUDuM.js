import{i as o}from"./flushed-input-6HD5luNO.js";import{H as a}from"./button-C1xl2RBC.js";const d=({type:e="text",name:l,className:t="",placeholder:r="",value:s=""}={})=>a.compile(o)({className:`flushed-input ${t}`,type:e,name:l,placeholder:r,value:s}),i=`
  <div class="form-label">
    <label class="form-label__label">{{ label }}</label>
    <div class="form-label__element">
      {{> element }}
    </div>
    {{#if error }}
    <div class="form-label__error">
      {{ error }}
    </div>
    {{/if}}
  </div>
`,m=a.compile(i),f=({element:e,label:l,error:t}={})=>(a.registerPartial("element",e),m({label:l,error:t})),c=`
  <div class="auth {{className}}">
    <div class="auth__title">
      <h2>{{ title }}</h2>
    </div>
    <form class="auth__content">
      {{> content }}
    </form>
  </div>
`,b=({content:e,title:l,className:t=""})=>(a.registerPartial("content",e),a.compile(c)({title:l,className:t}));export{d as a,b as l,f as u};
