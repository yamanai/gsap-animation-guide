---
title: 与ScrollTrigger结合使用
---

<script setup>
import { ScrollTriggerIntegration } from '@modules/animations/plugins/core/scrollsmoother';
</script>

# 与ScrollTrigger结合使用

ScrollSmoother与ScrollTrigger可以无缝集成，但需要注意一些特殊的配置要点。本章将详细介绍如何有效地将这两个强大的插件结合使用。

## 交互式示例

下面是一个综合性的交互式示例，展示了ScrollSmoother和ScrollTrigger的结合使用：

<ScrollTriggerIntegration />

## 基础集成方法

::: warning 关键配置点
使用ScrollSmoother时，必须为所有ScrollTrigger动画指定正确的滚动容器，否则动画将无法正确触发。
:::

```javascript
// 首先初始化ScrollSmoother
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5
});

// 然后在所有ScrollTrigger动画中指定scroller
gsap.to(".animated-element", {
  x: 100,
  duration: 1,
  scrollTrigger: {
    trigger: ".trigger-element",
    start: "top center",
    end: "bottom center",
    scrub: true,
    markers: true,
    // 关键设置：指定正确的滚动容器
    scroller: "#smooth-wrapper" // 必须是wrapper元素
  }
});
```

## 支持的主要特性

在ScrollSmoother环境中，ScrollTrigger的所有核心功能都能正常工作：

::: info 兼容功能
以下所有ScrollTrigger功能都可以与ScrollSmoother完美配合，只要正确设置了scroller参数。
:::

1. **基本触发动画**：
   ```javascript
   ScrollTrigger.create({
     trigger: ".element",
     start: "top center",
     end: "bottom center",
     scroller: "#smooth-wrapper", // 必须
     toggleClass: "active",
     markers: true
   });
   ```

2. **滚动进度模拟 (Scrub)**：
   ```javascript
   gsap.to(".progress-element", {
     width: "100%",
     scrollTrigger: {
       trigger: ".section",
       start: "top top",
       end: "bottom bottom",
       scroller: "#smooth-wrapper", // 必须
       scrub: 0.5,
       markers: true
     }
   });
   ```

3. **元素固定 (Pin)**：
   ```javascript
   ScrollTrigger.create({
     trigger: ".pin-section",
     start: "top top",
     end: "+=500",
     scroller: "#smooth-wrapper", // 必须
     pin: true,
     pinSpacing: true,
     markers: true
   });
   ```

## 创建平滑的时间轴动画

::: tip 提高复杂度
时间轴(Timeline)是GSAP的强大功能，与ScrollSmoother结合可以创建复杂的滚动动画序列。
:::

结合两个插件创建完全平滑的滚动动画序列：

```javascript
// 创建平滑滚动实例
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5
});

// 创建GSAP时间轴
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".animation-section",
    start: "top center",
    end: "bottom center",
    scrub: true, // 同步滚动进度
    scroller: "#smooth-wrapper", // 必须
    markers: true
  }
});

// 添加动画序列
tl.from(".element-1", { opacity: 0, y: 50 })
  .from(".element-2", { opacity: 0, x: -50 }, "-=0.3")
  .from(".element-3", { opacity: 0, scale: 0.5 }, "-=0.1");
```

## 注意事项和最佳实践

### 1. 初始化顺序

::: warning 顺序很重要
始终先创建ScrollSmoother实例，然后再创建ScrollTrigger动画，这样可以确保滚动环境已正确设置。
:::

```javascript
// 推荐的初始化顺序
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 1. 先创建ScrollSmoother
const smoother = ScrollSmoother.create({ ... });

// 2. 然后创建ScrollTrigger动画
ScrollTrigger.create({ ... });
```

### 2. 避免冲突的变换设置

::: danger 避免直接操作
不要直接修改内容容器的transform属性，这会干扰ScrollSmoother的平滑滚动功能。
:::

```javascript
// ❌ 避免这样做
gsap.set("#smooth-content", { transform: "..." }); // 不要直接设置内容容器的transform

// ✅ 正确方法：使用smoother的API
smoother.effects(".parallax-element", { speed: 0.8 });
```

### 3. 处理滚动到位置

::: info 正确的滚动方法
使用ScrollSmoother提供的scrollTo方法，而不是原生的window.scrollTo。
:::

```javascript
// ❌ 不要使用window.scrollTo
// window.scrollTo(0, 500); // 不适用于ScrollSmoother

// ✅ 正确方法：使用smoother的API
smoother.scrollTo(500, true);
// 或滚动到特定元素
smoother.scrollTo(".target-element", true);
```

### 4. 响应式设计考量

::: tip 窗口调整处理
在窗口大小变化时刷新ScrollTrigger，以确保动画位置和固定元素正确计算。
:::

```javascript
// 监听窗口大小变化
window.addEventListener("resize", () => {
  // 延迟刷新，避免频繁更新
  gsap.delayedCall(0.1, () => {
    // 同时刷新ScrollTrigger和ScrollSmoother
    ScrollTrigger.refresh();
  });
});
```

### 5. 优化复杂动画序列

::: tip 管理多个触发器
对于复杂页面，使用数组跟踪所有ScrollTrigger实例，方便统一管理和销毁。
:::

```javascript
// 管理多个ScrollTrigger
const triggers = [];

function createAnimations() {
  // 清除之前的动画
  triggers.forEach(t => t.kill());
  triggers.length = 0;
  
  // 创建新的动画
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    const trigger = ScrollTrigger.create({
      trigger: section,
      scroller: "#smooth-wrapper",
      // ...其他配置
    });
    triggers.push(trigger);
  });
}

// 初始化，并在必要时重新初始化
createAnimations();
```

## 动态处理滚动位置

::: info API用法
ScrollSmoother提供了丰富的API来控制和查询滚动位置。
:::

使用ScrollSmoother API进行滚动位置的动态操作：

```javascript
// 获取当前滚动位置
const currentPos = smoother.scrollTop();
console.log('当前滚动位置:', currentPos);

// 平滑滚动到特定位置
smoother.scrollTo(500, true); // 第二个参数为是否平滑滚动

// 滚动到特定元素
const targetElement = document.querySelector('#target');
smoother.scrollTo(targetElement, true);

// 滚动到顶部
document.querySelector('.to-top-btn').addEventListener('click', () => {
  smoother.scrollTo(0, true);
});

// 处理锚点链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    smoother.scrollTo(targetId, true);
  });
});
```

## 调试ScrollTrigger和ScrollSmoother

::: tip 开发调试技巧
在开发阶段添加调试工具，有助于诊断滚动问题和优化动画体验。
:::

```javascript
// 开发环境中启用调试
if (process.env.NODE_ENV === 'development') {
  // 显示所有ScrollTrigger标记
  gsap.defaults({scrollTrigger: {markers: true}});
  
  // 创建调试面板
  const debugDiv = document.createElement('div');
  debugDiv.style.cssText = 'position:fixed;bottom:10px;left:10px;background:rgba(0,0,0,0.8);color:white;padding:10px;z-index:999;font-family:monospace;';
  document.body.appendChild(debugDiv);
  
  // 监听滚动更新
  smoother.scrollTo(0);
  gsap.ticker.add(() => {
    debugDiv.innerHTML = `
      <div>Scroll Position: ${smoother.scrollTop().toFixed(1)}</div>
      <div>Smoothing: ${smoother.vars.smooth}</div>
      <div>Velocity: ${smoother.getVelocity().toFixed(1)}</div>
    `;
  });
}
``` 