import{_ as l,c as o,a as n,e as s,o as p,r as e}from"./app.8d58c549.js";const m=JSON.parse('{"title":"GSAP\u6838\u5FC3\u52A8\u753B\u65B9\u6CD5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6838\u5FC3\u65B9\u6CD5\u6982\u89C8","slug":"\u6838\u5FC3\u65B9\u6CD5\u6982\u89C8","link":"#\u6838\u5FC3\u65B9\u6CD5\u6982\u89C8","children":[]},{"level":2,"title":"gsap.to() \u65B9\u6CD5","slug":"gsap-to-\u65B9\u6CD5","link":"#gsap-to-\u65B9\u6CD5","children":[{"level":3,"title":"\u57FA\u672C\u8BED\u6CD5","slug":"\u57FA\u672C\u8BED\u6CD5","link":"#\u57FA\u672C\u8BED\u6CD5","children":[]},{"level":3,"title":"\u52A8\u753B\u793A\u4F8B","slug":"\u52A8\u753B\u793A\u4F8B","link":"#\u52A8\u753B\u793A\u4F8B","children":[]},{"level":3,"title":"\u5E38\u89C1\u7528\u6CD5","slug":"\u5E38\u89C1\u7528\u6CD5","link":"#\u5E38\u89C1\u7528\u6CD5","children":[]}]},{"level":2,"title":"gsap.from() \u65B9\u6CD5","slug":"gsap-from-\u65B9\u6CD5","link":"#gsap-from-\u65B9\u6CD5","children":[{"level":3,"title":"\u57FA\u672C\u8BED\u6CD5","slug":"\u57FA\u672C\u8BED\u6CD5-1","link":"#\u57FA\u672C\u8BED\u6CD5-1","children":[]},{"level":3,"title":"\u52A8\u753B\u793A\u4F8B","slug":"\u52A8\u753B\u793A\u4F8B-1","link":"#\u52A8\u753B\u793A\u4F8B-1","children":[]},{"level":3,"title":"\u5E38\u89C1\u7528\u6CD5","slug":"\u5E38\u89C1\u7528\u6CD5-1","link":"#\u5E38\u89C1\u7528\u6CD5-1","children":[]}]},{"level":2,"title":"gsap.fromTo() \u65B9\u6CD5","slug":"gsap-fromto-\u65B9\u6CD5","link":"#gsap-fromto-\u65B9\u6CD5","children":[{"level":3,"title":"\u57FA\u672C\u8BED\u6CD5","slug":"\u57FA\u672C\u8BED\u6CD5-2","link":"#\u57FA\u672C\u8BED\u6CD5-2","children":[]},{"level":3,"title":"\u52A8\u753B\u793A\u4F8B","slug":"\u52A8\u753B\u793A\u4F8B-2","link":"#\u52A8\u753B\u793A\u4F8B-2","children":[]},{"level":3,"title":"\u5E38\u89C1\u7528\u6CD5","slug":"\u5E38\u89C1\u7528\u6CD5-2","link":"#\u5E38\u89C1\u7528\u6CD5-2","children":[]}]},{"level":2,"title":"gsap.set() \u65B9\u6CD5","slug":"gsap-set-\u65B9\u6CD5","link":"#gsap-set-\u65B9\u6CD5","children":[{"level":3,"title":"\u57FA\u672C\u8BED\u6CD5","slug":"\u57FA\u672C\u8BED\u6CD5-3","link":"#\u57FA\u672C\u8BED\u6CD5-3","children":[]},{"level":3,"title":"\u4F7F\u7528\u793A\u4F8B","slug":"\u4F7F\u7528\u793A\u4F8B","link":"#\u4F7F\u7528\u793A\u4F8B","children":[]},{"level":3,"title":"\u5E38\u89C1\u7528\u6CD5","slug":"\u5E38\u89C1\u7528\u6CD5-3","link":"#\u5E38\u89C1\u7528\u6CD5-3","children":[]}]},{"level":2,"title":"\u901A\u7528\u52A8\u753B\u53C2\u6570","slug":"\u901A\u7528\u52A8\u753B\u53C2\u6570","link":"#\u901A\u7528\u52A8\u753B\u53C2\u6570","children":[]},{"level":2,"title":"\u52A8\u753B\u63A7\u5236","slug":"\u52A8\u753B\u63A7\u5236","link":"#\u52A8\u753B\u63A7\u5236","children":[]},{"level":2,"title":"\u7EC4\u5408\u52A8\u753B\u793A\u4F8B","slug":"\u7EC4\u5408\u52A8\u753B\u793A\u4F8B","link":"#\u7EC4\u5408\u52A8\u753B\u793A\u4F8B","children":[]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","link":"#\u603B\u7ED3","children":[]}],"relativePath":"basics/core-methods.md"}'),t={name:"basics/core-methods.md"},r=s("",10),c=s("",8),i=s("",8),d=s("",8),y=s("",11),D=s("",4);function C(A,F,h,g,u,_){const a=e("GsapEditor");return p(),o("div",null,[r,n(a,{title:"gsap.to() \u57FA\u7840\u793A\u4F8B",initialJs:`// \u57FA\u672C\u7684to()\u52A8\u753B
    gsap.to('.animation-target', {
    duration: 1.5,
    x: 100,
    y: 20,
    backgroundColor: '#8a2be2',
    borderRadius: '8px',
    rotation: 360,
    ease: 'power2.inOut'
    });`}),c,n(a,{title:"gsap.from() \u5B9E\u4F8B",initialJs:`// \u5143\u7D20\u4ECE\u900F\u660E\u72B6\u6001\u6DE1\u5165\u5E76\u4E0A\u5347
    gsap.from('.animation-target', {
    opacity: 0,
    y: 50,
    scale: 0.7,
    backgroundColor: '#ff6347',
    duration: 1.2,
    ease: 'back.out(1.7)'
    });`}),i,n(a,{title:"gsap.fromTo() \u5B9E\u4F8B",initialJs:`// \u5B8C\u5168\u63A7\u5236\u52A8\u753B\u7684\u8D77\u6B62\u72B6\u6001
    gsap.fromTo('.animation-target', 
    { // \u8D77\u59CB\u72B6\u6001
        x: -80,
        opacity: 0,
        backgroundColor: '#ff6347',
        borderRadius: '0%'
    },
    { // \u7ED3\u675F\u72B6\u6001
        x: 80,
        opacity: 1,
        backgroundColor: '#4682b4',
        borderRadius: '50%',
        rotation: 360,
        duration: 2,
        ease: 'elastic.out(1, 0.3)'
    }
    );`}),d,n(a,{title:"gsap.set() \u4E0E\u52A8\u753B\u7EC4\u5408",initialJs:`// \u5148\u4F7F\u7528set\u8BBE\u7F6E\u521D\u59CB\u72B6\u6001\uFF0C\u7136\u540E\u521B\u5EFA\u52A8\u753B
    // \u7ACB\u5373\u8BBE\u7F6E\u5143\u7D20\u521D\u59CB\u72B6\u6001
    gsap.set('.animation-target', {
    x: -80,
    backgroundColor: '#3498db',
    borderRadius: '8px',
    scale: 0.8
    });
    // 0.5\u79D2\u540E\u5F00\u59CB\u52A8\u753B
    setTimeout(() => {
    gsap.to('.animation-target', {
        x: 80,
        backgroundColor: '#e74c3c',
        scale: 1,
        rotation: 180,
        duration: 1.5,
        ease: 'power3.inOut'
    });
    }, 800);`}),y,n(a,{title:"GSAP\u6838\u5FC3\u65B9\u6CD5\u7EC4\u5408",initialJs:`// \u7EC4\u5408\u4F7F\u7528\u591A\u79CD\u6838\u5FC3\u65B9\u6CD5\u521B\u5EFA\u8FDE\u7EED\u52A8\u753B
// 1. \u91CD\u7F6E\u5143\u7D20\u521D\u59CB\u72B6\u6001
gsap.set('.animation-target', {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  backgroundColor: '#3498db',
  borderRadius: '5px'
});
// 2. \u521B\u5EFA\u5165\u573A\u52A8\u753B
gsap.from('.animation-target', {
  opacity: 0,
  scale: 0.5,
  y: -50,
  duration: 1,
  ease: 'back.out(1.7)'
});
// 3. \u5EF6\u8FDF\u540E\u521B\u5EFA\u79FB\u52A8\u52A8\u753B
setTimeout(() => {
  gsap.to('.animation-target', {
    x: 150,
    backgroundColor: '#e74c3c',
    borderRadius: '50%',
    rotation: 360,
    duration: 1.5,
    ease: 'elastic.out(1, 0.3)'
  });
}, 1500);
// \u6CE8\u610F\uFF1A\u5728\u5B9E\u9645\u9879\u76EE\u4E2D\uFF0C\u5E94\u4F7F\u7528GSAP\u7684Timeline\u6765\u66FF\u4EE3setTimeout
// \u6211\u4EEC\u5C06\u5728\u4E0B\u4E00\u7AE0\u8282\u4E2D\u5B66\u4E60Timeline`}),D])}const f=l(t,[["render",C]]);export{m as __pageData,f as default};
