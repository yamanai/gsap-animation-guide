---
title: 常见应用场景
---

<script setup>
import { BasicExample } from '@modules/animations/plugins/core/scrollsmoother'
</script>

# 常见应用场景

ScrollSmoother可以为多种交互场景带来流畅的滚动体验，下面介绍几种常见的应用场景及其实现方法。

## 基础平滑滚动页面

::: tip 核心概念
平滑滚动是ScrollSmoother的基础功能，通过`smooth`参数调整平滑程度。数值越大，滚动效果越平滑。
:::

<BasicExample />

以下是创建一个简单的平滑滚动网页的代码，适合展示型网站或作品集：

```html
<!DOCTYPE html>
<html>
<head>
  <title>平滑滚动页面</title>
  <style>
    body, html { margin: 0; padding: 0; }
    .section {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3em;
      color: white;
    }
    #smooth-wrapper {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    #smooth-content { overflow: visible; }
    .section:nth-child(odd) { background: #345; }
    .section:nth-child(even) { background: #534; }
  </style>
</head>
<body>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <section class="section">第一屏内容</section>
      <section class="section">第二屏内容</section>
      <section class="section">第三屏内容</section>
      <section class="section">第四屏内容</section>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollSmoother.min.js"></script>
  <script>
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true
    });
  </script>
</body>
</html>
```

::: warning 注意DOM结构
确保始终遵循`wrapper` > `content`的嵌套结构，这对ScrollSmoother正常工作至关重要。
:::

## 视差滚动效果

::: tip 视差效果
ScrollSmoother通过`effects`参数和`data-speed`属性可以轻松创建视差效果，无需额外的JavaScript代码。
:::

创建具有多层视差效果的页面，为不同元素设置不同的滚动速度：

::: info 推荐做法
使用`data-speed`属性控制元素的视差效果，数值范围通常在-1到2之间：
- 小于1：比正常滚动慢
- 等于1：正常滚动速度
- 大于1：比正常滚动快
- 负值：反向滚动
:::

```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- 背景层，滚动较慢 -->
    <div class="parallax-bg" data-speed="0.3">
      <img src="background.jpg" alt="背景">
    </div>
    
    <!-- 中间层，滚动适中 -->
    <div class="parallax-content" data-speed="0.6">
      <h1>视差滚动效果</h1>
      <p>这一层的滚动速度适中</p>
    </div>
    
    <!-- 前景层，滚动较快 -->
    <div class="parallax-foreground" data-speed="1.2">
      <img src="foreground-elements.png" alt="前景元素">
    </div>
    
    <!-- 反向滚动元素 -->
    <div class="float-element" data-speed="-0.2">
      <div class="floating-icon">这个元素会轻微反向移动</div>
    </div>
  </div>
</div>

<script>
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true // 启用视差效果
  });
</script>
```

::: danger 性能警告
过多的视差元素会影响滚动性能，特别是在移动设备上。建议限制视差元素的数量，并对大型图片进行适当优化。
:::

## 滚动触发动画

::: tip ScrollTrigger集成
ScrollSmoother与ScrollTrigger无缝集成，但需要在ScrollTrigger配置中指定正确的scroller。
:::

结合ScrollTrigger实现滚动触发的动画效果：

```javascript
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 先创建ScrollSmoother实例
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5
});

// 然后创建ScrollTrigger动画
gsap.from(".fade-in-element", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".fade-in-section",
    start: "top 80%", // 当元素顶部到达视口80%位置时触发
    end: "top 20%",
    toggleActions: "play none none reverse",
    // 告诉ScrollTrigger使用平滑的滚动位置
    scroller: "#smooth-wrapper" // 重要！指定滚动容器
  }
});

// 创建水平滚动画廊
gsap.to(".horizontal-gallery", {
  x: () => -(document.querySelector('.horizontal-gallery').scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-gallery",
    start: "top top",
    end: () => `+=${document.querySelector('.horizontal-gallery').scrollWidth - window.innerWidth}`,
    pin: true,
    scrub: 1,
    scroller: "#smooth-wrapper" // 重要！指定滚动容器
  }
});
```

::: warning 常见错误
忘记设置`scroller`属性是使用ScrollSmoother时的最常见错误。必须将其设置为wrapper元素，否则动画不会正确触发。

```js
// ❌ 错误做法 - 未指定scroller
scrollTrigger: {
  trigger: ".element",
  start: "top center"
}

// ✅ 正确做法 - 指定scroller
scrollTrigger: {
  trigger: ".element",
  start: "top center",
  scroller: "#smooth-wrapper"
}
```
:::

## 页面内导航

::: tip 平滑导航
ScrollSmoother提供`scrollTo()`方法，实现页面内目标位置的平滑滚动。
:::

创建带有平滑滚动的页面内导航：

```html
<nav>
  <ul>
    <li><a href="#section1" class="nav-link">第一部分</a></li>
    <li><a href="#section2" class="nav-link">第二部分</a></li>
    <li><a href="#section3" class="nav-link">第三部分</a></li>
  </ul>
</nav>

<div id="smooth-wrapper">
  <div id="smooth-content">
    <section id="section1" class="section">第一部分内容</section>
    <section id="section2" class="section">第二部分内容</section>
    <section id="section3" class="section">第三部分内容</section>
  </div>
</div>

<script>
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
  // 创建滚动平滑实例
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5
  });
  
  // 为导航链接添加点击事件，实现平滑滚动到目标位置
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 使用ScrollSmoother的scrollTo方法平滑滚动到目标元素
        smoother.scrollTo(targetElement, true);
      }
    });
  });
</script>
```

::: info 进阶技巧
第二个参数`true`表示滚动时使用平滑动画。你还可以传入一个数值来控制特定导航的动画持续时间：
```js
// 快速滚动（0.5秒）
smoother.scrollTo(targetElement, 0.5);

// 慢速滚动（2秒）
smoother.scrollTo(targetElement, 2);
```
:::

## 多页滚动体验

结合页面过渡动画创建类似幻灯片的页面切换效果：

```javascript
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});

// 获取所有页面部分
const sections = document.querySelectorAll(".page-section");

// 为每个部分创建进入动画
sections.forEach((section, i) => {
  // 设置初始状态
  gsap.set(section.querySelector('.section-content'), { 
    opacity: 0, 
    y: 50 
  });
  
  // 创建进入动画
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    scroller: "#smooth-wrapper",
    onEnter: () => {
      gsap.to(section.querySelector('.section-content'), {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(section.querySelector('.section-content'), {
        opacity: 0,
        y: 50,
        duration: 1
      });
    }
  });
});

// 可选：添加导航点指示当前位置
const navDots = document.querySelectorAll(".nav-dot");
sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    scroller: "#smooth-wrapper",
    toggleClass: {
      targets: navDots[i],
      className: "active"
    }
  });
});
``` 