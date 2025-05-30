---
title: ScrollTrigger插件
editLink: true
outline: deep
---

<script setup>
// 使用相对路径导入组件
import { BasicExample, PinExample, BatchAnimation } from '../../../../modules/animations/plugins/core/scrolltrigger';
</script>

# ScrollTrigger插件：滚动驱动动画的终极解决方案

<div class="scrolltrigger-header">
  <div class="st-icon">
    <div class="st-scroll-indicator"></div>
  </div>
  <h2>让网页随着滚动而生动起来</h2>
</div>

ScrollTrigger 是 GSAP 生态系统中最受欢迎的插件，它彻底改变了基于滚动的动画创建方式。通过简洁而强大的 API，它让开发者能够精确控制动画与页面滚动之间的关系，创建引人入胜的交互体验。

<div class="features-grid">
  <a href="#精确的滚动控制" class="feature-card">
    <div class="feature-icon timing">
      <div class="icon-animation"></div>
    </div>
    <h3>精确的滚动控制</h3>
    <p>精确设置动画开始和结束的滚动位置，实现完美的滚动同步效果</p>
  </a>
  <a href="#视差滚动效果" class="feature-card">
    <div class="feature-icon parallax">
      <div class="icon-animation"></div>
    </div>
    <h3>视差滚动效果</h3>
    <p>轻松创建元素以不同速度移动的视差效果，增强空间深度感</p>
  </a>
  <a href="#元素固定功能" class="feature-card">
    <div class="feature-icon pin">
      <div class="icon-animation"></div>
    </div>
    <h3>元素固定功能</h3>
    <p>在滚动过程中将元素固定在视口中，实现复杂的交互序列</p>
  </a>
  <a href="#水平滚动支持" class="feature-card">
    <div class="feature-icon horizontal">
      <div class="icon-animation"></div>
    </div>
    <h3>水平滚动支持</h3>
    <p>不只是垂直滚动，还可以创建横向滚动动画和画廊效果</p>
  </a>
</div>

## 为什么选择 ScrollTrigger？

现代网站和应用中，滚动驱动的动画已成为标准体验的一部分。ScrollTrigger 提供了市场上最强大、最灵活的工具来创建这些效果：

- **简洁的 API**：易于学习，同时具备解决复杂问题的能力
- **高性能**：优化的代码确保动画流畅运行，即使在移动设备上
- **深度的控制**：从简单的触发到复杂的滚动同步，满足各种需求
- **强大的调试工具**：内置的辅助标记和日志功能，帮助快速定位问题
- **适应性强**：自动处理窗口调整大小和设备方向变化

## 基础示例

以下是一个基本的ScrollTrigger示例，演示了如何创建随滚动触发的动画：

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
  <h3>ScrollTrigger 基础示例</h3>
  <p>此处应有交互式示例。由于技术限制，目前替换为静态内容。</p>
  <div style="background-color: #edf2ff; padding: 15px; border-radius: 6px;">
    <pre style="margin: 0; font-family: monospace;">
// 基础ScrollTrigger示例
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    markers: true,
    toggleClass: "active",
    scrub: true
  },
  x: 300,
  rotation: 360
});</pre>
  </div>
</div>

## 核心概念

### 触发器与滚动位置

ScrollTrigger 的核心概念是"触发器"和"开始/结束位置"：

```js
// 基本设置
ScrollTrigger.create({
  trigger: ".box", // 触发元素
  start: "top center", // 当元素顶部到达视口中心时
  end: "bottom center", // 当元素底部到达视口中心时
  markers: true, // 开发时显示标记(仅用于调试)
  toggleClass: "active", // 在激活范围内添加类名
  onEnter: () => console.log("进入触发区域"),
  onLeave: () => console.log("离开触发区域")
});
```

### Scrub 模式：动画与滚动同步

ScrollTrigger 最强大的功能之一是 `scrub` 属性，它将动画进度与滚动位置直接关联：

```js
gsap.to(".element", {
  x: 500,
  rotation: 360,
  duration: 3,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    end: "top 20%",
    scrub: true, // 动画进度与滚动同步
    // scrub: 1 // 数值参数添加平滑过渡效果
  }
});
```

### Pin 功能：固定元素实现复杂序列

通过 `pin` 属性，可以在滚动过程中临时固定元素，创建引导式体验：

```js
ScrollTrigger.create({
  trigger: ".panel",
  start: "top top",
  end: "+=300%", // 滚动3倍触发元素高度后结束
  pin: true, // 在触发范围内固定元素
  pinSpacing: true // 添加空间以避免内容重叠
});
```

下面是一个固定元素的实际示例：

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
  <h3>ScrollTrigger 固定元素示例</h3>
  <p>此处应有固定元素的交互式示例。由于技术限制，目前替换为静态内容。</p>
  <div style="background-color: #edf2ff; padding: 15px; border-radius: 6px;">
    <pre style="margin: 0; font-family: monospace;">
// 固定元素示例
ScrollTrigger.create({
  trigger: ".pin-panel",
  start: "top top",
  end: "+=400%", 
  pin: true,
  pinSpacing: true,
  markers: true
});</pre>
  </div>
</div>

## 常见应用场景

<div class="use-cases">
  <div class="use-case">
    <h3>🎯 产品特性展示</h3>
    <p>随着用户滚动，逐步揭示产品功能和特性，保持用户注意力</p>
  </div>
  <div class="use-case">
    <h3>📊 数据可视化</h3>
    <p>创建随滚动而展开的图表和数据展示，增强数据叙事能力</p>
  </div>
  <div class="use-case">
    <h3>🖼️ 作品集展示</h3>
    <p>设计交互性强的项目展示，给访问者留下深刻印象</p>
  </div>
  <div class="use-case">
    <h3>📱 移动应用引导</h3>
    <p>创建引人入胜的应用功能引导和上手教程</p>
  </div>
</div>

## 批量元素动画示例

下面是一个展示如何对多个元素应用滚动触发动画的示例：

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
  <h3>ScrollTrigger 批量元素动画示例</h3>
  <p>此处应有批量元素动画的交互式示例。由于技术限制，目前替换为静态内容。</p>
  <div style="background-color: #edf2ff; padding: 15px; border-radius: 6px;">
    <pre style="margin: 0; font-family: monospace;">
// 批量元素动画示例
gsap.utils.toArray(".animate-me").forEach(element => {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none none"
    }
  });
});</pre>
  </div>
</div>

## 高级技巧

### 1. 嵌套的 ScrollTriggers

创建复杂的、多层次的滚动体验：

```js
const main = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-container",
    start: "top top",
    end: "bottom bottom",
    pin: true
  }
});

// 在主时间轴内部再添加ScrollTrigger控制的动画
main.add(gsap.to(".nested-element", {
  opacity: 1, 
  y: 0,
  scrollTrigger: {
    trigger: ".nested-element",
    containerAnimation: main,
    start: "center 80%",
    toggleActions: "play none none reverse"
  }
}));
```

### 2. 自定义动画播放控制

使用 `toggleActions` 精细控制动画行为：

```js
scrollTrigger: {
  trigger: ".element",
  start: "top 80%",
  end: "top 20%",
  toggleActions: "play pause reverse reset"
  // 四个参数分别控制: onEnter onLeave onEnterBack onLeaveBack
}
```

### 3. 批量创建动画

为多个元素高效创建滚动动画：

```js
gsap.utils.toArray(".animate-me").forEach(element => {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none none"
    }
  });
});
```

## 代码示例库

::: details 视差滚动效果
```js
// 创建简单的视差滚动效果
gsap.utils.toArray(".parallax-section").forEach(section => {
  const depth = section.dataset.depth || 0.2;
  
  gsap.to(section, {
    y: () => window.innerHeight * depth,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```
:::

::: details 滚动固定面板展示
```js
// 创建固定面板，展示多个内容块
const panels = gsap.utils.toArray(".panel");

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```
:::

::: details 滚动触发的序列动画
```js
// 创建随滚动展开的时间线动画
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sequence-container",
    start: "top center",
    end: "bottom center",
    scrub: true,
    markers: true
  }
});

tl.from(".item-1", {opacity: 0, y: 100})
  .from(".item-2", {opacity: 0, y: 100})
  .from(".item-3", {opacity: 0, y: 100})
  .from(".item-4", {opacity: 0, y: 100});
```
:::

## 性能优化技巧

为确保滚动动画在各种设备上流畅运行，请考虑以下优化建议：

- **使用 will-change 属性**：提前告知浏览器元素将发生变化
- **避免同时运行太多动画**：分批触发动画，减轻GPU负担
- **使用 transform 和 opacity**：优先使用这些属性而非改变布局属性
- **减少 scrub 数量**：过多的 scrub 动画会增加计算量
- **合理使用 invalidateOnRefresh**：仅在必要时重新计算值

## 下一步学习

掌握 ScrollTrigger 的基础后，可以探索更多高级功能：

<div class="next-steps">
  <a href="./basic-usage.md" class="next-card">
    <h3>基本用法详解</h3>
    <p>掌握 ScrollTrigger 的核心参数和基本设置</p>
  </a>
  <a href="./advanced-techniques.md" class="next-card">
    <h3>高级技巧</h3>
    <p>探索复杂场景解决方案和进阶用法</p>
  </a>
  <a href="./examples.md" class="next-card">
    <h3>示例集锦</h3>
    <p>通过实际案例学习常见效果的实现方法</p>
  </a>
  <a href="./performance.md" class="next-card">
    <h3>性能优化</h3>
    <p>让滚动动画在各种设备上流畅运行的技巧</p>
  </a>
</div>

<style>
.scrolltrigger-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 0;
  margin-bottom: 40px;
}

.st-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffeaa7, #fdcb6e);
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(253, 203, 110, 0.4);
}

.st-scroll-indicator {
  width: 24px;
  height: 40px;
  border: 3px solid #e17055;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.st-scroll-indicator:before {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  background: #e17055;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  top: 8px;
  animation: scrollDown 1.5s infinite;
}

@keyframes scrollDown {
  0% { top: 8px; opacity: 1; }
  50% { top: 26px; opacity: 0.5; }
  100% { top: 8px; opacity: 1; }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.feature-card h3 {
  margin: 10px 0;
  font-size: 18px;
  color: var(--vp-c-brand);
  transition: color 0.3s;
}

.feature-card:hover h3 {
  color: var(--vp-c-brand-dark);
}

.feature-card p {
  margin: 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.feature-icon {
  height: 70px;
  width: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #ffeaa7, #fdcb6e);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid #fdcb6e;
}

.feature-card:hover .feature-icon {
  box-shadow: 0 0 15px rgba(253, 203, 110, 0.6);
  border-color: #e17055;
}

.icon-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.feature-icon.timing .icon-animation:before {
  content: "⏱️";
  position: absolute;
  font-size: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 3s infinite alternate;
  transition: all 0.4s ease;
}

.feature-icon.parallax .icon-animation:before {
  content: "🪄";
  position: absolute;
  font-size: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 3s infinite ease-in-out;
  transition: all 0.4s ease;
}

.feature-icon.pin .icon-animation:before {
  content: "📌";
  position: absolute;
  font-size: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: wiggle 3s infinite;
  transition: all 0.4s ease;
}

.feature-icon.horizontal .icon-animation:before {
  content: "↔️";
  position: absolute;
  font-size: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: slide 3s infinite alternate;
  transition: all 0.4s ease;
}

.feature-card:hover .feature-icon.timing .icon-animation:before {
  animation: pulse 1.5s infinite alternate;
  transform: translate(-50%, -50%) scale(1.2);
}

.feature-card:hover .feature-icon.parallax .icon-animation:before {
  animation: float 1.5s infinite ease-in-out;
  transform: translate(-50%, -50%) scale(1.2);
}

.feature-card:hover .feature-icon.pin .icon-animation:before {
  animation: wiggle 1.5s infinite;
  transform: translate(-50%, -50%) scale(1.2);
}

.feature-card:hover .feature-icon.horizontal .icon-animation:before {
  animation: slide 1.5s infinite alternate;
  transform: translate(-50%, -50%) scale(1.2);
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes float {
  0% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, -60%); }
  100% { transform: translate(-50%, -50%); }
}

@keyframes wiggle {
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-50%, -50%) rotate(10deg); }
  75% { transform: translate(-50%, -50%) rotate(-10deg); }
}

@keyframes slide {
  0% { transform: translate(-60%, -50%); }
  100% { transform: translate(-40%, -50%); }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 30px 0;
}

.use-case {
  background: var(--vp-c-bg-mute);
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s;
}

.use-case:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.use-case h3 {
  margin-top: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.next-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.next-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand-light);
}

.next-card h3 {
  margin-top: 0;
  color: var(--vp-c-brand);
}

.next-card p {
  margin-bottom: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style> 