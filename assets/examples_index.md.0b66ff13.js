import{_ as l,c as p,a as o,b as s,d as n,e,o as t,r as c}from"./app.0af9a2d3.js";const h=JSON.parse('{"title":"GSAP + Vue \u793A\u4F8B\u96C6","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u52A8\u753B\u793A\u4F8B","slug":"\u57FA\u7840\u52A8\u753B\u793A\u4F8B","link":"#\u57FA\u7840\u52A8\u753B\u793A\u4F8B","children":[]},{"level":2,"title":"\u52A8\u753B\u539F\u7406","slug":"\u52A8\u753B\u539F\u7406","link":"#\u52A8\u753B\u539F\u7406","children":[]},{"level":2,"title":"\u793A\u4F8B\u4EE3\u7801","slug":"\u793A\u4F8B\u4EE3\u7801","link":"#\u793A\u4F8B\u4EE3\u7801","children":[]},{"level":2,"title":"\u5B9E\u9645\u5E94\u7528\u573A\u666F","slug":"\u5B9E\u9645\u5E94\u7528\u573A\u666F","link":"#\u5B9E\u9645\u5E94\u7528\u573A\u666F","children":[]},{"level":2,"title":"ScrollTrigger\u793A\u4F8B","slug":"scrolltrigger\u793A\u4F8B","link":"#scrolltrigger\u793A\u4F8B","children":[]}],"relativePath":"examples/index.md"}'),r={name:"examples/index.md"},y=s("h1",{id:"gsap-vue-\u793A\u4F8B\u96C6",tabindex:"-1"},[n("GSAP + Vue \u793A\u4F8B\u96C6 "),s("a",{class:"header-anchor",href:"#gsap-vue-\u793A\u4F8B\u96C6","aria-hidden":"true"},"#")],-1),F=s("p",null,"\u8FD9\u4E2A\u9875\u9762\u6536\u96C6\u4E86\u4E00\u4E9B\u4F7F\u7528GSAP\u548CVue\u7ED3\u5408\u7684\u5B9E\u7528\u793A\u4F8B\uFF0C\u5E2E\u52A9\u4F60\u5FEB\u901F\u7406\u89E3\u5982\u4F55\u5728\u5B9E\u9645\u9879\u76EE\u4E2D\u5E94\u7528\u8FD9\u4E9B\u6280\u672F\u3002",-1),D=s("h2",{id:"\u57FA\u7840\u52A8\u753B\u793A\u4F8B",tabindex:"-1"},[n("\u57FA\u7840\u52A8\u753B\u793A\u4F8B "),s("a",{class:"header-anchor",href:"#\u57FA\u7840\u52A8\u753B\u793A\u4F8B","aria-hidden":"true"},"#")],-1),i=e(`<h2 id="\u52A8\u753B\u539F\u7406" tabindex="-1">\u52A8\u753B\u539F\u7406 <a class="header-anchor" href="#\u52A8\u753B\u539F\u7406" aria-hidden="true">#</a></h2><p>GSAP\u52A8\u753B\u7684\u6838\u5FC3\u539F\u7406\u662F\u901A\u8FC7JavaScript\u5728\u6BCF\u4E00\u5E27\u8BA1\u7B97\u5E76\u66F4\u65B0\u5143\u7D20\u7684\u5C5E\u6027\u503C\uFF0C\u4EE5\u521B\u5EFA\u5E73\u6ED1\u7684\u52A8\u753B\u6548\u679C\u3002\u4E0ECSS\u52A8\u753B\u76F8\u6BD4\uFF0CGSAP\u63D0\u4F9B\u4E86\u66F4\u7CBE\u7EC6\u7684\u63A7\u5236\u548C\u66F4\u4E30\u5BCC\u7684\u529F\u80FD\u3002</p><h2 id="\u793A\u4F8B\u4EE3\u7801" tabindex="-1">\u793A\u4F8B\u4EE3\u7801 <a class="header-anchor" href="#\u793A\u4F8B\u4EE3\u7801" aria-hidden="true">#</a></h2><p>\u4EE5\u4E0B\u662F\u4E00\u4E2A\u7B80\u5355\u7684Vue + GSAP\u7684\u4EE3\u7801\u793A\u4F8B\uFF0C\u5C55\u793A\u4E86\u5982\u4F55\u521B\u5EFA\u4E00\u4E2A\u53EF\u590D\u7528\u7684\u52A8\u753B\u7EC4\u4EF6\uFF1A</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">setup</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { ref, onMounted } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> gsap </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;gsap&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">props</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">defineProps</span><span style="color:#C9D1D9;">({</span></span>
<span class="line"><span style="color:#C9D1D9;">  startVisible: {</span></span>
<span class="line"><span style="color:#C9D1D9;">    type: Boolean,</span></span>
<span class="line"><span style="color:#C9D1D9;">    default: </span><span style="color:#79C0FF;">false</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  duration: {</span></span>
<span class="line"><span style="color:#C9D1D9;">    type: Number,</span></span>
<span class="line"><span style="color:#C9D1D9;">    default: </span><span style="color:#79C0FF;">1</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">boxRef</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">(</span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">isVisible</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">(props.startVisible)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D2A8FF;">onMounted</span><span style="color:#C9D1D9;">(() </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// \u521D\u59CB\u5316\u5143\u7D20\u72B6\u6001</span></span>
<span class="line"><span style="color:#C9D1D9;">  gsap.</span><span style="color:#D2A8FF;">set</span><span style="color:#C9D1D9;">(boxRef.value, {</span></span>
<span class="line"><span style="color:#C9D1D9;">    autoAlpha: isVisible.value </span><span style="color:#FF7B72;">?</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">:</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    y: isVisible.value </span><span style="color:#FF7B72;">?</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">:</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">20</span></span>
<span class="line"><span style="color:#C9D1D9;">  })</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">show</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  isVisible.value </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">true</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#D2A8FF;">animateIn</span><span style="color:#C9D1D9;">()</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">hide</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  isVisible.value </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">false</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#D2A8FF;">animateOut</span><span style="color:#C9D1D9;">()</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">animateIn</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  gsap.</span><span style="color:#D2A8FF;">to</span><span style="color:#C9D1D9;">(boxRef.value, {</span></span>
<span class="line"><span style="color:#C9D1D9;">    duration: props.duration,</span></span>
<span class="line"><span style="color:#C9D1D9;">    autoAlpha: </span><span style="color:#79C0FF;">1</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    y: </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    ease: </span><span style="color:#A5D6FF;">&#39;power2.out&#39;</span></span>
<span class="line"><span style="color:#C9D1D9;">  })</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">animateOut</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  gsap.</span><span style="color:#D2A8FF;">to</span><span style="color:#C9D1D9;">(boxRef.value, {</span></span>
<span class="line"><span style="color:#C9D1D9;">    duration: props.duration,</span></span>
<span class="line"><span style="color:#C9D1D9;">    autoAlpha: </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    y: </span><span style="color:#79C0FF;">20</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    ease: </span><span style="color:#A5D6FF;">&#39;power2.in&#39;</span></span>
<span class="line"><span style="color:#C9D1D9;">  })</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">ref</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;boxRef&quot;</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">class</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;animated-box&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;</span><span style="color:#7EE787;">slot</span><span style="color:#C9D1D9;">&gt;&lt;/</span><span style="color:#7EE787;">slot</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">class</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;controls&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;</span><span style="color:#7EE787;">button</span><span style="color:#C9D1D9;"> @</span><span style="color:#79C0FF;">click</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">show</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">&gt;\u663E\u793A&lt;/</span><span style="color:#7EE787;">button</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;</span><span style="color:#7EE787;">button</span><span style="color:#C9D1D9;"> @</span><span style="color:#79C0FF;">click</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">hide</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">&gt;\u9690\u85CF&lt;/</span><span style="color:#7EE787;">button</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">style</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">scoped</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#79C0FF;">.animated-box</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">padding</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">20</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">background-color</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">#f1f1f1</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">border-radius</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">8</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">margin-bottom</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">10</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79C0FF;">.controls</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">display</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">flex</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">gap</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">10</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7EE787;">button</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">padding</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">8</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">16</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">background-color</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">#42b883</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">color</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">white</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">border</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">none</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">border-radius</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">4</span><span style="color:#FF7B72;">px</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">cursor</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">pointer</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7EE787;">button</span><span style="color:#79C0FF;">:hover</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#79C0FF;">background-color</span><span style="color:#C9D1D9;">: </span><span style="color:#79C0FF;">#33a06f</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">style</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">script</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">setup</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { ref, onMounted } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> gsap </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;gsap&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">props</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">defineProps</span><span style="color:#24292F;">({</span></span>
<span class="line"><span style="color:#24292F;">  startVisible: {</span></span>
<span class="line"><span style="color:#24292F;">    type: Boolean,</span></span>
<span class="line"><span style="color:#24292F;">    default: </span><span style="color:#0550AE;">false</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  duration: {</span></span>
<span class="line"><span style="color:#24292F;">    type: Number,</span></span>
<span class="line"><span style="color:#24292F;">    default: </span><span style="color:#0550AE;">1</span></span>
<span class="line"><span style="color:#24292F;">  }</span></span>
<span class="line"><span style="color:#24292F;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">boxRef</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">(</span><span style="color:#0550AE;">null</span><span style="color:#24292F;">)</span></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">isVisible</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">(props.startVisible)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8250DF;">onMounted</span><span style="color:#24292F;">(() </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">// \u521D\u59CB\u5316\u5143\u7D20\u72B6\u6001</span></span>
<span class="line"><span style="color:#24292F;">  gsap.</span><span style="color:#8250DF;">set</span><span style="color:#24292F;">(boxRef.value, {</span></span>
<span class="line"><span style="color:#24292F;">    autoAlpha: isVisible.value </span><span style="color:#CF222E;">?</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">1</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">:</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    y: isVisible.value </span><span style="color:#CF222E;">?</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">0</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">:</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">20</span></span>
<span class="line"><span style="color:#24292F;">  })</span></span>
<span class="line"><span style="color:#24292F;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">show</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">  isVisible.value </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">true</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#8250DF;">animateIn</span><span style="color:#24292F;">()</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">hide</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">  isVisible.value </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">false</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#8250DF;">animateOut</span><span style="color:#24292F;">()</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">animateIn</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">  gsap.</span><span style="color:#8250DF;">to</span><span style="color:#24292F;">(boxRef.value, {</span></span>
<span class="line"><span style="color:#24292F;">    duration: props.duration,</span></span>
<span class="line"><span style="color:#24292F;">    autoAlpha: </span><span style="color:#0550AE;">1</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    y: </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    ease: </span><span style="color:#0A3069;">&#39;power2.out&#39;</span></span>
<span class="line"><span style="color:#24292F;">  })</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">animateOut</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">  gsap.</span><span style="color:#8250DF;">to</span><span style="color:#24292F;">(boxRef.value, {</span></span>
<span class="line"><span style="color:#24292F;">    duration: props.duration,</span></span>
<span class="line"><span style="color:#24292F;">    autoAlpha: </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    y: </span><span style="color:#0550AE;">20</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    ease: </span><span style="color:#0A3069;">&#39;power2.in&#39;</span></span>
<span class="line"><span style="color:#24292F;">  })</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">script</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">  &lt;</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;</span><span style="color:#116329;">div</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">ref</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;boxRef&quot;</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">class</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;animated-box&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">      &lt;</span><span style="color:#116329;">slot</span><span style="color:#24292F;">&gt;&lt;/</span><span style="color:#116329;">slot</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;</span><span style="color:#116329;">div</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">class</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;controls&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">      &lt;</span><span style="color:#116329;">button</span><span style="color:#24292F;"> @</span><span style="color:#0550AE;">click</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">show</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">&gt;\u663E\u793A&lt;/</span><span style="color:#116329;">button</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">      &lt;</span><span style="color:#116329;">button</span><span style="color:#24292F;"> @</span><span style="color:#0550AE;">click</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">hide</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">&gt;\u9690\u85CF&lt;/</span><span style="color:#116329;">button</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">  &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">style</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">scoped</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#0550AE;">.animated-box</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">padding</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">20</span><span style="color:#CF222E;">px</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">background-color</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">#f1f1f1</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">border-radius</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">8</span><span style="color:#CF222E;">px</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">margin-bottom</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">10</span><span style="color:#CF222E;">px</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#0550AE;">.controls</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">display</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">flex</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">gap</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">10</span><span style="color:#CF222E;">px</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#116329;">button</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">padding</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">8</span><span style="color:#CF222E;">px</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">16</span><span style="color:#CF222E;">px</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">background-color</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">#42b883</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">color</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">white</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">border</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">none</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">border-radius</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">4</span><span style="color:#CF222E;">px</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">cursor</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">pointer</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#116329;">button</span><span style="color:#0550AE;">:hover</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">background-color</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">#33a06f</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">style</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5B9E\u9645\u5E94\u7528\u573A\u666F" tabindex="-1">\u5B9E\u9645\u5E94\u7528\u573A\u666F <a class="header-anchor" href="#\u5B9E\u9645\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a></h2><p>GSAP\u548CVue\u7684\u7ED3\u5408\u53EF\u4EE5\u5E94\u7528\u4E8E\u5404\u79CD\u5B9E\u9645\u573A\u666F\uFF1A</p><ol><li><strong>\u9875\u9762\u8FC7\u6E21\u6548\u679C</strong>\uFF1A\u5728\u8DEF\u7531\u5207\u6362\u65F6\u6DFB\u52A0\u5E73\u6ED1\u7684\u8FC7\u6E21\u52A8\u753B</li><li><strong>UI\u53CD\u9988</strong>\uFF1A\u4E3A\u7528\u6237\u4EA4\u4E92\u63D0\u4F9B\u52A8\u753B\u53CD\u9988\uFF0C\u5982\u6309\u94AE\u70B9\u51FB\u3001\u8868\u5355\u63D0\u4EA4\u7B49</li><li><strong>\u6570\u636E\u53EF\u89C6\u5316</strong>\uFF1A\u521B\u5EFA\u52A8\u6001\u7684\u56FE\u8868\u548C\u6570\u636E\u5C55\u793A</li><li><strong>\u5FAE\u4EA4\u4E92</strong>\uFF1A\u589E\u5F3A\u7528\u6237\u4F53\u9A8C\u7684\u5C0F\u578B\u52A8\u753B\u6548\u679C</li><li><strong>\u5F15\u5BFC\u6D41\u7A0B</strong>\uFF1A\u4E3A\u7528\u6237\u5F15\u5BFC\u548C\u6559\u7A0B\u6DFB\u52A0\u52A8\u753B\u6548\u679C</li></ol><h2 id="scrolltrigger\u793A\u4F8B" tabindex="-1">ScrollTrigger\u793A\u4F8B <a class="header-anchor" href="#scrolltrigger\u793A\u4F8B" aria-hidden="true">#</a></h2><p>\u4F7F\u7528GSAP\u7684ScrollTrigger\u63D2\u4EF6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u4E0E\u6EDA\u52A8\u76F8\u5173\u7684\u52A8\u753B\uFF1A</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">setup</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { ref, onMounted, onUnmounted } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> gsap </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;gsap&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> ScrollTrigger </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;gsap/ScrollTrigger&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8B949E;">// \u6CE8\u518C\u63D2\u4EF6</span></span>
<span class="line"><span style="color:#C9D1D9;">gsap.</span><span style="color:#D2A8FF;">registerPlugin</span><span style="color:#C9D1D9;">(ScrollTrigger)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">containerRef</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">(</span><span style="color:#79C0FF;">null</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#FF7B72;">let</span><span style="color:#C9D1D9;"> scrollTriggers </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D2A8FF;">onMounted</span><span style="color:#C9D1D9;">(() </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// \u521B\u5EFA\u6EDA\u52A8\u89E6\u53D1\u7684\u52A8\u753B</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tl</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> gsap.</span><span style="color:#D2A8FF;">timeline</span><span style="color:#C9D1D9;">({</span></span>
<span class="line"><span style="color:#C9D1D9;">    scrollTrigger: {</span></span>
<span class="line"><span style="color:#C9D1D9;">      trigger: containerRef.value,</span></span>
<span class="line"><span style="color:#C9D1D9;">      start: </span><span style="color:#A5D6FF;">&quot;top center&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">      end: </span><span style="color:#A5D6FF;">&quot;bottom center&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">      scrub: </span><span style="color:#79C0FF;">true</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">      markers: </span><span style="color:#79C0FF;">true</span><span style="color:#C9D1D9;"> </span><span style="color:#8B949E;">// \u5F00\u53D1\u65F6\u53EF\u89C1\uFF0C\u751F\u4EA7\u73AF\u5883\u4E2D\u79FB\u9664</span></span>
<span class="line"><span style="color:#C9D1D9;">    }</span></span>
<span class="line"><span style="color:#C9D1D9;">  })</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span></span>
<span class="line"><span style="color:#C9D1D9;">  tl.</span><span style="color:#D2A8FF;">from</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&quot;.item&quot;</span><span style="color:#C9D1D9;">, {</span></span>
<span class="line"><span style="color:#C9D1D9;">    opacity: </span><span style="color:#79C0FF;">0</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    y: </span><span style="color:#79C0FF;">100</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    stagger: </span><span style="color:#79C0FF;">0.2</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    duration: </span><span style="color:#79C0FF;">1</span></span>
<span class="line"><span style="color:#C9D1D9;">  })</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// \u4FDD\u5B58\u5F15\u7528\u4EE5\u4FBF\u6E05\u7406</span></span>
<span class="line"><span style="color:#C9D1D9;">  scrollTriggers.</span><span style="color:#D2A8FF;">push</span><span style="color:#C9D1D9;">(ScrollTrigger.</span><span style="color:#D2A8FF;">getAll</span><span style="color:#C9D1D9;">())</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D2A8FF;">onUnmounted</span><span style="color:#C9D1D9;">(() </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// \u6E05\u7406\u6240\u6709ScrollTrigger\u5B9E\u4F8B</span></span>
<span class="line"><span style="color:#C9D1D9;">  scrollTriggers.</span><span style="color:#D2A8FF;">forEach</span><span style="color:#C9D1D9;">(</span><span style="color:#FFA657;">trigger</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> trigger.</span><span style="color:#D2A8FF;">kill</span><span style="color:#C9D1D9;">())</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">ref</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;containerRef&quot;</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">class</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;scroll-container&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">v-for</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">n </span><span style="color:#FF7B72;">in</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">5</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;"> :</span><span style="color:#79C0FF;">key</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">n</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">class</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;item&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      \u6EDA\u52A8\u89E6\u53D1\u7684\u9879\u76EE {{ n }}</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">  &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">script</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">setup</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { ref, onMounted, onUnmounted } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> gsap </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;gsap&#39;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> ScrollTrigger </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;gsap/ScrollTrigger&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6E7781;">// \u6CE8\u518C\u63D2\u4EF6</span></span>
<span class="line"><span style="color:#24292F;">gsap.</span><span style="color:#8250DF;">registerPlugin</span><span style="color:#24292F;">(ScrollTrigger)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">containerRef</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">(</span><span style="color:#0550AE;">null</span><span style="color:#24292F;">)</span></span>
<span class="line"><span style="color:#CF222E;">let</span><span style="color:#24292F;"> scrollTriggers </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8250DF;">onMounted</span><span style="color:#24292F;">(() </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">// \u521B\u5EFA\u6EDA\u52A8\u89E6\u53D1\u7684\u52A8\u753B</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">tl</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> gsap.</span><span style="color:#8250DF;">timeline</span><span style="color:#24292F;">({</span></span>
<span class="line"><span style="color:#24292F;">    scrollTrigger: {</span></span>
<span class="line"><span style="color:#24292F;">      trigger: containerRef.value,</span></span>
<span class="line"><span style="color:#24292F;">      start: </span><span style="color:#0A3069;">&quot;top center&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">      end: </span><span style="color:#0A3069;">&quot;bottom center&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">      scrub: </span><span style="color:#0550AE;">true</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">      markers: </span><span style="color:#0550AE;">true</span><span style="color:#24292F;"> </span><span style="color:#6E7781;">// \u5F00\u53D1\u65F6\u53EF\u89C1\uFF0C\u751F\u4EA7\u73AF\u5883\u4E2D\u79FB\u9664</span></span>
<span class="line"><span style="color:#24292F;">    }</span></span>
<span class="line"><span style="color:#24292F;">  })</span></span>
<span class="line"><span style="color:#24292F;">  </span></span>
<span class="line"><span style="color:#24292F;">  tl.</span><span style="color:#8250DF;">from</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&quot;.item&quot;</span><span style="color:#24292F;">, {</span></span>
<span class="line"><span style="color:#24292F;">    opacity: </span><span style="color:#0550AE;">0</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    y: </span><span style="color:#0550AE;">100</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    stagger: </span><span style="color:#0550AE;">0.2</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    duration: </span><span style="color:#0550AE;">1</span></span>
<span class="line"><span style="color:#24292F;">  })</span></span>
<span class="line"><span style="color:#24292F;">  </span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">// \u4FDD\u5B58\u5F15\u7528\u4EE5\u4FBF\u6E05\u7406</span></span>
<span class="line"><span style="color:#24292F;">  scrollTriggers.</span><span style="color:#8250DF;">push</span><span style="color:#24292F;">(ScrollTrigger.</span><span style="color:#8250DF;">getAll</span><span style="color:#24292F;">())</span></span>
<span class="line"><span style="color:#24292F;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8250DF;">onUnmounted</span><span style="color:#24292F;">(() </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">// \u6E05\u7406\u6240\u6709ScrollTrigger\u5B9E\u4F8B</span></span>
<span class="line"><span style="color:#24292F;">  scrollTriggers.</span><span style="color:#8250DF;">forEach</span><span style="color:#24292F;">(</span><span style="color:#953800;">trigger</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=&gt;</span><span style="color:#24292F;"> trigger.</span><span style="color:#8250DF;">kill</span><span style="color:#24292F;">())</span></span>
<span class="line"><span style="color:#24292F;">})</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">script</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">  &lt;</span><span style="color:#116329;">div</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">ref</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;containerRef&quot;</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">class</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;scroll-container&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;</span><span style="color:#116329;">div</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">v-for</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">n </span><span style="color:#CF222E;">in</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">5</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;"> :</span><span style="color:#0550AE;">key</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">n</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">class</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;item&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">      \u6EDA\u52A8\u89E6\u53D1\u7684\u9879\u76EE {{ n }}</span></span>
<span class="line"><span style="color:#24292F;">    &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">  &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u63A5\u4E0B\u6765\u7684\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u5C06\u5C55\u793A\u66F4\u591A\u590D\u6742\u7684\u52A8\u753B\u6548\u679C\u548C\u5B9E\u9645\u5E94\u7528\u6848\u4F8B\u3002</p>`,12);function C(u,g,E,d,A,f){const a=c("GsapDemo");return t(),p("div",null,[y,F,D,o(a,{title:"\u57FA\u7840\u52A8\u753B\u793A\u4F8B",description:"\u7B80\u5355\u7684GSAP\u52A8\u753B\uFF0C\u5C55\u793A\u57FA\u672C\u7684\u52A8\u753B\u5C5E\u6027\u548C\u65F6\u95F4\u8F74\u529F\u80FD"}),i])}const b=l(r,[["render",C]]);export{h as __pageData,b as default};
