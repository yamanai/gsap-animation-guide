# 避免FOUC (Flash of Unstyled Content)的技巧

FOUC（Flash of Unstyled Content，无样式内容闪烁）是指网页在加载过程中，短暂显示未应用样式或初始状态的元素，然后突然变为最终样式，导致用户体验不佳。在使用GSAP创建动画时，如果处理不当，很容易引发FOUC问题。本章将介绍识别和解决GSAP动画中FOUC问题的有效策略。

:::tip 核心概念
FOUC现象在动画中尤为明显，因为**初始状态到动画状态的突变**会造成用户视觉上的不连贯体验。解决FOUC问题的关键是**确保元素在动画开始前已处于正确的初始状态**。
:::

## FOUC问题的可视化展示

<div class="concept-visual">
  <div class="fouc-demo">
    <div class="timeline-view">
      <div class="timeline-labels">
        <div class="label">页面加载</div>
        <div class="label">DOM就绪</div>
        <div class="label">CSS应用</div>
        <div class="label">JS执行</div>
      </div>
      <div class="timeline-track">
        <div class="stage-marker" style="left:0%">0ms</div>
        <div class="stage-marker" style="left:30%">200ms</div>
        <div class="stage-marker" style="left:50%">400ms</div>
        <div class="stage-marker" style="left:80%">600ms</div>
        <div class="fouc-row">
          <div class="fouc-block initial" style="left:0%; width:30%;">
            <div class="fouc-label">HTML下载</div>
          </div>
          <div class="fouc-block dom-ready" style="left:30%; width:20%;">
            <div class="fouc-label">DOM构建</div>
          </div>
          <div class="fouc-block css-apply" style="left:50%; width:30%;">
            <div class="fouc-label">CSS应用</div>
          </div>
          <div class="fouc-block js-run" style="left:80%; width:20%;">
            <div class="fouc-label">JS动画开始</div>
            <div class="fouc-marker">FOUC风险区!</div>
          </div>
        </div>
        <div class="element-preview">
          <div class="element-state unstyled" style="left:30%">无样式内容可见</div>
          <div class="element-state css-styled" style="left:60%">应用CSS样式</div>
          <div class="element-state animated" style="left:90%">GSAP动画状态</div>
        </div>
      </div>
    </div>
    <div class="visual-caption">
      FOUC通常发生在DOM构建完成后至GSAP动画开始前的时间窗口内，此时用户可能看到未处理的"原始"状态
    </div>
  </div>
</div>

## FOUC问题的根本原因

在GSAP动画环境中，FOUC主要由以下原因导致：

<div class="reasons-grid">
  <div class="reason-card">
    <div class="reason-icon">⏱️</div>
    <div class="reason-title">加载时序问题</div>
    <div class="reason-desc">JavaScript（包括GSAP）通常在CSS之后加载，导致初始渲染与动画开始之间的不协调</div>
  </div>
  <div class="reason-card">
    <div class="reason-icon">🔄</div>
    <div class="reason-title">初始状态未预设</div>
    <div class="reason-desc">动画从当前DOM状态开始，而非预期的初始状态，导致起点不受控制</div>
  </div>
  <div class="reason-card">
    <div class="reason-icon">⚙️</div>
    <div class="reason-title">immediateRender默认行为</div>
    <div class="reason-desc">from/fromTo动画默认会立即渲染初始状态，可能覆盖已有的CSS样式</div>
  </div>
  <div class="reason-card">
    <div class="reason-icon">🖥️</div>
    <div class="reason-title">渲染延迟</div>
    <div class="reason-desc">复杂页面的初次渲染可能需要时间，导致动画与页面渲染不同步</div>
  </div>
</div>

## 预防FOUC的核心策略

### 1. 使用CSS预设初始状态

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">🎯</div>
    <div class="strategy-title">CSS预设 + GSAP to()</div>
  </div>
  <div class="strategy-content">
    <p>最基本且有效的方法是通过CSS预先设置元素的初始状态，然后使用GSAP的<code>to()</code>方法向目标状态过渡：</p>
  </div>
</div>

```html
<style>
  .hidden-initially {
    opacity: 0;
    transform: translateY(20px);
  }
</style>

<div class="box hidden-initially">内容</div>

<script>
  // 使用to()动画显示元素，避免闪烁
  gsap.to(".hidden-initially", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out"
  });
</script>
```

### 2. 控制页面可见性

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">👁️</div>
    <div class="strategy-title">整页控制策略</div>
  </div>
  <div class="strategy-content">
    <p>使用CSS控制整个页面的初始可见性，确保所有元素在动画准备就绪前不可见：</p>
  </div>
</div>

```html
<style>
  body {
    opacity: 0; /* 初始隐藏整个页面 */
  }
  .page-loaded body {
    opacity: 1;
    transition: opacity 0.3s;
  }
</style>

<script>
  window.addEventListener('DOMContentLoaded', () => {
    // 设置动画初始状态
    gsap.set(".animated-element", { x: -50, opacity: 0 });
    // 显示页面
    document.documentElement.classList.add('page-loaded');
    // 执行动画
    gsap.to(".animated-element", {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1
    });
  });
</script>
```

### 3. 控制GSAP的immediateRender参数

<div class="problem-solution">
  <div class="problem">
    <h4>🔴 问题</h4>
    <p>from()/fromTo()动画默认会立即渲染初始状态，可能导致FOUC问题。</p>
    <pre><code>// 有FOUC风险的写法
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5 // 延迟会使FOUC更明显
});</code></pre>
  </div>
  <div class="solution">
    <h4>✅ 解决方案</h4>
    <p>选择合适的动画方法或明确设置immediateRender参数。</p>
    <pre><code>// 方法1：先用CSS设置初始状态，再用to()动画
// .element { opacity: 0; transform: translateY(50px); }
gsap.to(".element", {
  opacity: 1,
  y: 0,
  duration: 1
});
// 方法2：使用set()预设状态，再用to()动画
gsap.set(".element", { opacity: 0, y: 50 });
gsap.to(".element", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.5
});
// 方法3：从动画，但禁用immediateRender
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
  immediateRender: false // 防止立即应用初始状态
});</code></pre>
  </div>
</div>

### 4. 使用GSAP的Context Plugin

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">🧩</div>
    <div class="strategy-title">上下文管理</div>
  </div>
  <div class="strategy-content">
    <p>对于大型应用，GSAP的Context Plugin可以帮助管理和自动清理动画：</p>
  </div>
</div>

```js
// 创建上下文
const ctx = gsap.context(() => {
  // 在上下文中创建的所有动画会被自动追踪
  gsap.set(".element", { opacity: 0 });
  gsap.to(".element", {
    opacity: 1,
    duration: 1,
    delay: 0.2
  });
});

// 稍后可以清除上下文中的所有动画
// ctx.revert();
```

## 特定场景下的FOUC解决方案

<div class="options-comparison">
  <div class="option-card">
    <div class="option-title">页面加载动画</div>
    <div class="option-desc">初次加载内容时的处理</div>
    <div class="option-code">
      <pre><code>document.addEventListener("DOMContentLoaded", () => {
        // 1. 首先隐藏所有需要动画的元素
        gsap.set(".hero-text, .hero-image, .cta-button", { 
          opacity: 0, y: 20 
        });
        // 2. 创建一个显示页面的时间轴
        const pageEnterTl = gsap.timeline();
        // 3. 添加元素显示动画
        pageEnterTl.to(".hero-text", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(".hero-image", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .to(".cta-button", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");
});</code></pre>
    </div>
  </div>
  <div class="option-card">
    <div class="option-title">SPA路由切换</div>
    <div class="option-desc">单页应用内容切换</div>
    <div class="option-code">
      <pre><code>function handleRouteChange(newRoute) {
        // 1. 淡出当前页面内容
        gsap.to(".current-page-content", {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            // 2. 更新DOM内容
            updatePageContent(newRoute);
            // 3. 预设新内容状态
            gsap.set(".new-page-content", { 
              opacity: 0, y: 20 
            });
            // 4. 淡入新内容
            gsap.to(".new-page-content", {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power1.out",
              stagger: 0.1
            });
          }
        });
}</code></pre>
    </div>
  </div>
  
  <div class="option-card">
    <div class="option-title">动态加载内容</div>
    <div class="option-desc">异步获取并显示内容</div>
    <div class="option-code">
      <pre><code>async function loadContent() {
        // 1. 显示加载指示器
        gsap.to(".loading-indicator", { 
          opacity: 1, duration: 0.3 
        });
        try {
          // 2. 获取数据
          const data = await fetchData();
          // 3. 隐藏加载指示器
          gsap.to(".loading-indicator", { 
            opacity: 0, duration: 0.3 
          });
          // 4. 渲染新内容但初始隐藏
          renderContent(data);
          gsap.set(".content-item", { 
            opacity: 0, y: 20 
          });
          // 5. 动画显示新内容
          gsap.to(".content-item", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          });
        } catch (error) {
          // 错误处理...
        }
}</code></pre>
    </div>
  </div>
</div>

## 复杂页面的FOUC处理方案

### 1. 分阶段加载策略

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">📦</div>
    <div class="strategy-title">分阶段加载</div>
  </div>
  <div class="strategy-content">
    <p>对于复杂页面，采用分阶段加载和动画，确保用户始终有内容可看：</p>
  </div>
</div>

```js
// 分阶段加载和动画
const loadPage = () => {
  // 阶段1: 显示骨架屏
  document.body.classList.add("loading");
  // 阶段2: 主要内容加载完毕
  window.addEventListener("load", () => {
    const mainTl = gsap.timeline();
    // 隐藏骨架屏，显示主要内容
    mainTl.to(".skeleton", { opacity: 0, duration: 0.3 })
          .set(".main-content", { display: "block", opacity: 0 })
          .to(".main-content", { opacity: 1, duration: 0.5 });
    document.body.classList.remove("loading");
    document.body.classList.add("main-loaded");
    // 阶段3: 异步加载次要内容
    loadSecondaryContent().then(() => {
      // 动画显示次要内容
      gsap.to(".secondary-content", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1
      });
    });
  });
};
```

### 2. 使用预加载器

<div class="interactive-demo">
  <div class="demo-header">
    <h4>预加载器方案演示</h4>
    <div class="demo-controls">
      <button class="demo-btn reset-btn">重置演示</button>
      <button class="demo-btn load-btn">模拟加载</button>
    </div>
  </div>
  <div class="demo-stage">
    <div class="preloader-example">
      <div class="preloader-spinner">加载中...</div>
      <div class="demo-content">页面主要内容区域</div>
    </div>
    <div class="demo-info">点击"模拟加载"按钮查看预加载器防止FOUC的效果</div>
  </div>
</div>

```js
// 使用预加载器确保资源加载完成后再显示内容
const preloader = {
  init() {
    // 隐藏主内容
    gsap.set("#main-content", { opacity: 0 });
    // 显示预加载器
    gsap.set("#preloader", { opacity: 1 });
    // 追踪关键资源
    this.loadResources().then(this.onLoaded.bind(this));
  },
  loadResources() {
    // 加载关键图片等资源...
    const imagePromises = Array.from(document.querySelectorAll('.critical-image'))
      .map(img => {
        return new Promise(resolve => {
          if (img.complete) resolve();
          else img.onload = resolve;
        });
      });
    return Promise.all(imagePromises);
  },
  onLoaded() {
    // 隐藏预加载器，显示内容
    const tl = gsap.timeline();
    tl.to("#preloader", { opacity: 0, duration: 0.5 })
      .set("#preloader", { display: "none" })
      .to("#main-content", { opacity: 1, duration: 0.8 });
    // 开始内容动画
    this.startContentAnimations();
  },
  startContentAnimations() {
    // 内容进场动画...
  }
};
// 初始化预加载器
document.addEventListener("DOMContentLoaded", () => preloader.init());
```

## FOUC预防策略决策指南

<div class="decision-guide">
  <table>
    <thead>
      <tr>
        <th>场景</th>
        <th>推荐策略</th>
        <th>优势</th>
        <th>注意事项</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>简单网页</td>
        <td>CSS预设 + to()</td>
        <td>简单易实现，性能好</td>
        <td>需要在CSS中维护初始状态</td>
      </tr>
      <tr>
        <td>内容丰富的页面</td>
        <td>全页控制 + 时间轴</td>
        <td>协调性好，体验流畅</td>
        <td>可能导致短暂的白屏</td>
      </tr>
      <tr>
        <td>SPA应用</td>
        <td>路由转场策略</td>
        <td>无缝过渡，用户体验佳</td>
        <td>需与路由系统集成</td>
      </tr>
      <tr>
        <td>图片密集页面</td>
        <td>预加载器 + 资源追踪</td>
        <td>避免资源加载造成的闪烁</td>
        <td>初次加载时间可能较长</td>
      </tr>
      <tr>
        <td>大型复杂应用</td>
        <td>分阶段加载 + Context管理</td>
        <td>系统性解决方案，可扩展</td>
        <td>实现复杂度高</td>
      </tr>
    </tbody>
  </table>
</div>

## 最佳实践总结

<div class="best-practices">
  <div class="practice-item">
    <div class="practice-icon">🎨</div>
    <div class="practice-content">
      <h4>使用CSS预设初始状态</h4>
      <p>始终优先使用CSS设置元素的初始状态，配合GSAP的<code>to()</code>方法创建入场动画。这是最简单且高效的防止FOUC的方法。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">⚠️</div>
    <div class="practice-content">
      <h4>谨慎使用from()方法</h4>
      <p>避免使用带延迟的<code>from()</code>动画，或在必须使用时明确设置<code>immediateRender: false</code>参数。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">⌛</div>
    <div class="practice-content">
      <h4>使用骨架屏</h4>
      <p>为长时间加载的内容提供骨架屏，避免用户面对空白页面，同时防止内容加载后的突然显示。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🔄</div>
    <div class="practice-content">
      <h4>分阶段加载策略</h4>
      <p>对于复杂页面，采用分阶段加载策略，优先显示关键内容，随后再加载次要内容，保持用户体验流畅。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">⏱️</div>
    <div class="practice-content">
      <h4>利用时间轴</h4>
      <p>使用GSAP时间轴统一协调多元素的动画序列，确保动画有序进行，避免杂乱的动画时序造成的闪烁。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">📱</div>
    <div class="practice-content">
      <h4>考虑多设备环境</h4>
      <p>测试不同网络条件和设备性能下的加载表现，确保在各种环境中都能提供流畅的体验。</p>
    </div>
  </div>
</div>

:::warning 常见陷阱
使用<code>opacity: 0</code>隐藏元素虽然有效，但这些元素仍会被渲染并参与布局计算。对于完全不需要显示的元素，考虑使用<code>visibility: hidden</code>或<code>display: none</code>，但注意这些属性可能会影响动画的执行方式。
:::

通过理解FOUC产生的原因并应用这些技巧，可以显著提高GSAP动画项目的专业度和用户体验，创建流畅、无闪烁的动画效果。 

<style>
/* 概念可视化样式 */
.concept-visual {
  margin: 30px 0;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.fouc-demo {
  position: relative;
}

.timeline-view {
  position: relative;
}

.timeline-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.timeline-labels .label {
  font-size: 14px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.timeline-track {
  position: relative;
  height: 160px;
  background: #2c3e50;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}

.stage-marker {
  position: absolute;
  top: -20px;
  color: white;
  font-size: 12px;
  transform: translateX(-50%);
}

.fouc-row {
  position: relative;
  height: 70px;
  margin-bottom: 20px;
}

.fouc-block {
  position: absolute;
  height: 60px;
  border-radius: 4px;
  top: 5px;
  padding: 5px;
  font-size: 12px;
  color: white;
}

.fouc-block.initial {
  background: rgba(52, 152, 219, 0.7);
}

.fouc-block.dom-ready {
  background: rgba(46, 204, 113, 0.7);
}

.fouc-block.css-apply {
  background: rgba(155, 89, 182, 0.7);
}

.fouc-block.js-run {
  background: rgba(231, 76, 60, 0.7);
}

.fouc-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.fouc-marker {
  position: absolute;
  top: -15px;
  right: 10px;
  background: #f1c40f;
  color: #000;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 11px;
}

.element-preview {
  position: relative;
  height: 60px;
}

.element-state {
  position: absolute;
  padding: 5px 10px;
  background: #f1c40f;
  border-radius: 4px;
  font-size: 12px;
  transform: translateX(-50%);
  z-index: 2;
}

.element-state.unstyled {
  background: #e74c3c;
  color: white;
}

.element-state.css-styled {
  background: #3498db;
  color: white;
}

.element-state.animated {
  background: #2ecc71;
  color: white;
}

.visual-caption {
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

/* 原因卡片网格 */
.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.reason-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s;
  border-left: 3px solid var(--vp-c-brand);
}

.reason-card:hover {
  transform: translateY(-3px);
}

.reason-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.reason-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.reason-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* 策略块 */
.strategy-block {
  margin: 20px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.strategy-header {
  background: var(--vp-c-brand-dimm);
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.strategy-icon {
  font-size: 20px;
  margin-right: 10px;
}

.strategy-title {
  font-weight: bold;
}

.strategy-content {
  padding: 15px;
}

/* 选项比较卡片 */
.options-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.option-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.option-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.option-title {
  background: var(--vp-c-brand);
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 16px;
}

.option-desc {
  padding: 5px 15px;
  font-style: italic;
  font-size: 14px;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.option-code {
  padding: 0 15px;
  margin: 10px 0;
}

/* 问题与解决方案 */
.problem-solution {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 25px 0;
}

@media (max-width: 768px) {
  .problem-solution {
    grid-template-columns: 1fr;
  }
}

.problem, .solution {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.problem {
  border-left: 4px solid #e74c3c;
}

.solution {
  border-left: 4px solid #2ecc71;
}

.problem h4, .solution h4 {
  margin-top: 0;
}

/* 交互演示区域 */
.interactive-demo {
  margin: 30px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.demo-header {
  background: var(--vp-c-bg-soft);
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-header h4 {
  margin: 0;
}

.demo-controls {
  display: flex;
  gap: 10px;
}

.demo-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.demo-btn:hover {
  background: var(--vp-c-brand-dark);
}

.demo-stage {
  height: 200px;
  background: var(--vp-c-bg-mute);
  position: relative;
  padding: 20px;
}

.preloader-example {
  width: 100%;
  height: 100%;
  position: relative;
}

.preloader-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  z-index: 10;
}

.demo-content {
  width: 80%;
  height: 70%;
  background: var(--vp-c-brand-dimm);
  margin: 0 auto;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--vp-c-brand-dark);
  opacity: 0;
}

.demo-info {
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
}

/* 决策指南表格 */
.decision-guide {
  margin: 30px 0;
  overflow-x: auto;
}

.decision-guide table {
  width: 100%;
  border-collapse: collapse;
}

.decision-guide th, .decision-guide td {
  padding: 12px 15px;
  border: 1px solid var(--vp-c-divider);
}

.decision-guide th {
  background: var(--vp-c-bg-soft);
  font-weight: bold;
  text-align: left;
}

.decision-guide tr:nth-child(even) {
  background: var(--vp-c-bg-soft);
}

/* 最佳实践 */
.best-practices {
  margin: 30px 0;
}

.practice-item {
  display: flex;
  margin-bottom: 20px;
}

.practice-icon {
  font-size: 24px;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.practice-content {
  flex: 1;
}

.practice-content h4 {
  margin: 0 0 10px 0;
}

.practice-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}
</style>

<script>
// 确保GSAP可用
function ensureGSAPLoaded(callback) {
  // 检查GSAP是否已经加载
  if (typeof gsap !== 'undefined') {
    callback();
    return;
  }

  // 如果GSAP未加载，创建脚本加载它
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
  script.onload = callback;
  document.head.appendChild(script);
}

// 多次尝试加载GSAP并初始化演示
function tryInitWithRetries(maxRetries = 3, attempt = 1) {
  if (attempt > maxRetries) {
    console.error('无法加载GSAP库，请刷新页面重试');
    return;
  }
  
  console.log(`尝试加载GSAP并初始化动画，尝试次数：${attempt}`);
  ensureGSAPLoaded(() => {
    try {
      initDemoAnimation();
    } catch (e) {
      console.error('初始化动画时出错：', e);
      setTimeout(() => tryInitWithRetries(maxRetries, attempt + 1), 1000);
    }
  });
}

// 初始化预加载器演示动画
function initDemoAnimation() {
  // 等待DOM元素完全加载
  setTimeout(() => {
  const resetBtn = document.querySelector('.reset-btn');
  const loadBtn = document.querySelector('.load-btn');
  const preloaderSpinner = document.querySelector('.preloader-spinner');
  const demoContent = document.querySelector('.demo-content');
  const demoInfo = document.querySelector('.demo-info');
  
    if (!resetBtn || !loadBtn || !preloaderSpinner || !demoContent) {
      console.warn('预加载器演示元素未找到，将尝试再次初始化');
      setTimeout(initDemoAnimation, 1000); // 如果元素未找到，1秒后重试
      return;
    }
    
    console.log('找到预加载器演示元素，开始初始化');
    
    // 初始化状态
    gsap.set(demoContent, { opacity: 0 });
    gsap.set(preloaderSpinner, { autoAlpha: 1 });
    
    // 重置按钮
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault(); // 阻止默认行为
      gsap.killTweensOf([demoContent, preloaderSpinner]);
      gsap.set(demoContent, { opacity: 0 });
      gsap.set(preloaderSpinner, { autoAlpha: 1 });
      demoInfo.textContent = "点击\"模拟加载\"按钮查看预加载器防止FOUC的效果";
    });
    
    // 加载按钮
    loadBtn.addEventListener('click', (e) => {
      e.preventDefault(); // 阻止默认行为
      // 模拟加载过程
      demoInfo.textContent = "加载中...";
      
      // 使用时间轴创建加载序列
      const loadTl = gsap.timeline();
      
      loadTl.to(preloaderSpinner, {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          demoInfo.textContent = "资源加载完成，应用过渡动画...";
        }
      })
      .to(preloaderSpinner, {
        autoAlpha: 0,
        duration: 0.5
      })
      .to(demoContent, {
        opacity: 1,
        duration: 0.8,
        onComplete: () => {
          demoInfo.textContent = "内容已加载，无FOUC现象！";
        }
      });
    });
    
    console.log('预加载器演示已初始化');
  }, 500);
}

// 文档加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    tryInitWithRetries();
  });
} else {
  tryInitWithRetries();
}

// 为了确保在动态加载的环境中也能初始化，添加一个MutationObserver
const observer = new MutationObserver((mutations) => {
  let shouldInit = false;
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && 
        Array.from(mutation.addedNodes).some(node => 
          node.classList && node.classList.contains('interactive-demo'))) {
      shouldInit = true;
      break;
    }
  }
  
  if (shouldInit) {
    tryInitWithRetries();
  }
});

// 开始观察文档变化
observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true
});

// 确保在window加载完成后也尝试初始化
window.addEventListener('load', () => {
  tryInitWithRetries();
});
</script> 