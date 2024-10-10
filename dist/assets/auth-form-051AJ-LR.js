import{H as a,b as o}from"./button-link-D1i3wCh7.js";const u=({label:e,type:t="button",className:l=""})=>a.compile(o)({type:t,className:`button ${l}`,label:e}),r=`
  <input name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" class="input {{className}}" />
`,p=({type:e="text",name:t,className:l="",placeholder:s=""}={})=>a.compile(r)({className:`flushed-input ${l}`,type:e,name:t,placeholder:s}),n=`
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
`,i=a.compile(n),b=({element:e,label:t,error:l}={})=>(a.registerPartial("element",e),i({label:t,error:l})),c=`
  <div class="auth {{className}}">
    <div class="auth__title">
      <h2>{{ title }}</h2>
    </div>
    <form class="auth__content">
      {{> content }}
    </form>
  </div>
`,d=({content:e,title:t,className:l=""})=>(a.registerPartial("content",e),a.compile(c)({title:t,className:l}));export{p as a,u as b,d as l,b as u};
