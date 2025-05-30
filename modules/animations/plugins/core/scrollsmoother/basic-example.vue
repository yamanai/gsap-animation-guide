<template>
  <div class="scrollsmoother-demo">
    <!-- 标题区域 -->
    <h3>基础滚动平滑示例</h3>
    
    <GsapEditor 
      title="ScrollSmoother 基础示例" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
      scrollHeight="2000px"
    />

    <!-- 提示说明区 -->
    <div class="explanation">
      <div class="tip">
        <strong>提示：</strong> ScrollSmoother创建了一个虚拟滚动层，实现平滑滚动效果。
      </div>
      
      <div class="warning">
        <strong>注意：</strong> 请确保wrapper和content结构正确，否则会导致滚动问题。
      </div>
      
      <h4>推荐用法</h4>
      <pre><code>// 正确设置容器结构
&lt;body&gt;
  &lt;div id="smooth-wrapper"&gt;
    &lt;div id="smooth-content"&gt;
      &lt;!-- 内容放这里 --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/body&gt;</code></pre>
      
      <h4>不推荐用法</h4>
      <pre><code>// 不正确的结构，会导致滚动问题
&lt;div id="smooth-wrapper"&gt;
  &lt;!-- 内容直接放在wrapper中，没有content容器 --&gt;
&lt;/div&gt;</code></pre>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML，包含ScrollSmoother所需的结构
const initialHtml = `<!-- ScrollSmoother需要特定的DOM结构来工作 -->
<!-- 整个页面内容需要包装在两个嵌套的div中 -->
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- 页头部分 -->
    <header>
      <h1>ScrollSmoother 演示</h1>
      <p>体验平滑丝般的滚动效果</p>
    </header>
    
    <!-- 内容区块 -->
    <section class="content-block">
      <h2>关于平滑滚动</h2>
      <p>ScrollSmoother 插件可以轻松地为网站添加平滑滚动效果，提升用户体验。</p>
      <div class="box"></div>
    </section>
    
    <!-- 更多内容块，用于展示滚动效果 -->
    <section class="content-block alt">
      <h2>简单易用</h2>
      <p>只需几行代码即可实现专业级的滚动体验。</p>
      <div class="box alt"></div>
    </section>
    
    <section class="content-block">
      <h2>高度可定制</h2>
      <p>通过各种参数调整滚动速度、缓动函数等效果。</p>
      <div class="box"></div>
    </section>
    
    <section class="content-block alt">
      <h2>无缝集成</h2>
      <p>与其他GSAP插件完美配合，创建复杂的滚动动画。</p>
      <div class="box alt"></div>
    </section>
    
    <!-- 页脚 -->
    <footer>
      <p>滚动到底部了！试试快速滚动看看效果。</p>
    </footer>
  </div>
</div>`;

// 定义初始CSS，设置基本样式
const initialCss = `/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 基础样式 */
body {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* ScrollSmoother需要这些样式确保正确工作 */
/* wrapper需要设置固定高度或者overflow: hidden */
#smooth-wrapper {
  overflow: hidden;
}

/* content包含实际内容，将被ScrollSmoother虚拟化 */
#smooth-content {
  /* 内容样式 */
}

/* 页面各部分样式 */
header {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  background-color: #f5f5f5;
}

header h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.content-block {
  min-height: 80vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.content-block.alt {
  background-color: #f5f5f5;
}

.box {
  width: 150px;
  height: 150px;
  background-color: #3498db;
  margin: 40px 0;
  border-radius: 8px;
}

.box.alt {
  background-color: #e74c3c;
}

footer {
  padding: 60px 20px;
  text-align: center;
  background-color: #333;
  color: #fff;
}`;

// 定义初始JS，实现ScrollSmoother效果
const initialJs = `// 首先需要注册ScrollTrigger和ScrollSmoother插件
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 创建ScrollSmoother实例
// 这将处理页面的滚动平滑效果
let smoother = ScrollSmoother.create({
  // smooth参数控制平滑程度，值越高越平滑但可能感觉越迟缓
  smooth: 1.5,
  
  // wrapper和content是必需的
  // 它们指定哪些元素会被用于创建平滑滚动效果
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  
  // 设置为true可以平滑滚动所有通过JS触发的滚动
  // 如锚点导航等
  smoothTouch: 0.1, // 触摸设备上使用较小的值
  
  // 可选：指定要滚动的元素（默认是窗口）
  // scroller: "#my-scroller",
  
  // 启用这个选项可以在移动设备上禁用平滑滚动
  // normalizeScroll: true,
  
  // 禁用平滑滚动时的回弹效果
  // ignoreMobileResize: true
});

// 添加一些额外的动画效果以展示ScrollSmoother与GSAP的配合
// 注意：这些不是ScrollSmoother必需的，只是为了展示效果

// 为每个盒子添加旋转动画，结合ScrollTrigger
gsap.utils.toArray(".box").forEach(box => {
  gsap.to(box, {
    rotation: 360,
    scrollTrigger: {
      trigger: box,
      start: "top bottom",
      end: "top 30%",
      scrub: true,
      // markers: true, // 调试时可启用标记
    }
  });
});

// 页头淡出效果
gsap.to("header", {
  opacity: 0.3,
  scrollTrigger: {
    trigger: "header",
    start: "bottom 80%",
    end: "bottom top",
    scrub: true,
  }
});

// 提示：ScrollSmoother.get()可以随时获取实例
// smoother = ScrollSmoother.get();

// 控制台输出，确认ScrollSmoother已激活
console.log("ScrollSmoother 已激活");`;
</script>

<style scoped>
.scrollsmoother-demo {
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.explanation {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.tip, .warning {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
}

.tip {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.warning {
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
}

pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

h4 {
  margin: 1.5rem 0 0.5rem 0;
}
</style> 