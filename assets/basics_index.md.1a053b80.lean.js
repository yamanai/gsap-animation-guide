import{_ as n,f as o,c as r,a as l,e as a,o as s,r as d}from"./app.8d58c549.js";const c={setup(){o(()=>{const t=document.querySelector(".play-button"),e=document.querySelector(".demo-element");t&&e&&typeof gsap<"u"&&t.addEventListener("click",()=>{gsap.set(e,{x:0,rotation:0,backgroundColor:"#ff6b6b"}),gsap.to(e,{duration:1,x:100,rotation:360,backgroundColor:"#42b883"})})})}},A=JSON.parse('{"title":"GSAP \u57FA\u7840\u7BC7","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B66\u4E60\u8DEF\u5F84","slug":"\u5B66\u4E60\u8DEF\u5F84","link":"#\u5B66\u4E60\u8DEF\u5F84","children":[]},{"level":2,"title":"\u4EA4\u4E92\u5F0F\u5B66\u4E60","slug":"\u4EA4\u4E92\u5F0F\u5B66\u4E60","link":"#\u4EA4\u4E92\u5F0F\u5B66\u4E60","children":[]},{"level":2,"title":"\u4E3A\u4EC0\u4E48\u9009\u62E9GSAP\uFF1F","slug":"\u4E3A\u4EC0\u4E48\u9009\u62E9gsap","link":"#\u4E3A\u4EC0\u4E48\u9009\u62E9gsap","children":[]}],"relativePath":"basics/index.md"}'),h=a("",7),_=a("",4);function p(t,e,u,g,m,S){const i=d("GsapEditor");return s(),r("div",null,[h,l(i,{title:"GSAP\u57FA\u7840\u52A8\u753B\u793A\u4F8B",initialJs:`// \u5C1D\u8BD5\u4FEE\u6539\u8FD9\u6BB5\u4EE3\u7801
gsap.to('.animation-target', { 
  duration: 1, 
  x: 100, 
  rotation: 360, 
  backgroundColor: '#42b883' 
});`},null,8,["initialJs"]),_])}const P=n(c,[["render",p]]);export{A as __pageData,P as default};
