---
title: 最佳实践
---

# 最佳实践 

为了充分发挥ScrollSmoother的潜力并确保最佳用户体验，以下是一些经过实践验证的最佳建议。

## 项目架构设计

### 保持简洁的DOM结构

```html
<!-- 推荐的基本结构 -->
<body>
  <!-- 导航和固定元素可以放在包装器外部 -->
  <nav class="site-nav">...</nav>
  
  <!-- ScrollSmoother包装器和内容 -->
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!-- 所有滚动内容放在这里 -->
      <header>...</header>
      <main>...</main>
      <footer>...</footer>
    </div>
  </div>
  
  <!-- 固定UI元素也可以放在外部 -->
  <div class="fixed-ui">...</div>
</body>
```

### 文件组织

为大型项目创建有组织的结构：

```javascript
// scrollConfig.js - 集中管理所有滚动配置
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 设备检测
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 配置选项
export const scrollConfig = {
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: isMobile ? 0.5 : 1.5,
  effects: !isMobile,
  ignoreMobileResize: true,
  smoothTouch: isMobile ? 0.1 : 0
};

// 创建实例
let smoother = null;

export function initSmoother() {
  if (smoother) return smoother;
  smoother = ScrollSmoother.create(scrollConfig);
  return smoother;
}

export function getSmoother() {
  return smoother;
}

export function killSmoother() {
  if (smoother) {
    smoother.kill();
    smoother = null;
  }
}
```

```javascript
// animations.js - 管理所有滚动动画
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSmoother } from './scrollConfig';

// 初始化基本动画
export function initBaseAnimations() {
  const smoother = getSmoother();
  if (!smoother) return;

  // 淡入效果
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=100',
        scroller: '#smooth-wrapper'
      }
    });
  });
  
  // 更多动画...
}

// 初始化高级动画
export function initAdvancedAnimations() {
  // 复杂动画效果...
}
```

### 模块化开发

为特定部分创建独立的动画模块：

```javascript
// 英雄区动画模块
export function setupHeroSection() {
  const smoother = getSmoother();
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection || !smoother) return;

  // 创建时间轴
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      scroller: '#smooth-wrapper'
    }
  });
  
  // 添加动画序列
  tl.to('.hero-title', { y: -50, opacity: 0.5 })
    .to('.hero-image', { scale: 1.1, y: -30 }, 0)
    .to('.hero-subtitle', { y: -20 }, 0.1);
    
  return tl;
}
```

## 性能与可访问性

### 渐进增强

采用渐进增强的方法，确保基本功能在不支持高级动画的设备上也能正常工作：

```javascript
// 检查浏览器支持
function checkSupport() {
  // 检查基本支持
  const hasTransform = 'transform' in document.documentElement.style;
  const hasRAF = typeof requestAnimationFrame !== 'undefined';
  const hasPromise = typeof Promise !== 'undefined';
  
  // 检查WebGL支持（用于高级视效）
  const canvas = document.createElement('canvas');
  const hasWebGL = !!(window.WebGLRenderingContext && 
                     (canvas.getContext('webgl') || 
                      canvas.getContext('experimental-webgl')));
  
  return {
    basic: hasTransform && hasRAF && hasPromise,
    advanced: hasWebGL
  };
}

// 根据支持程度初始化
function initScrollWithFallback() {
  const support = checkSupport();
  
  if (support.basic) {
    // 基础ScrollSmoother支持
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: support.advanced // 只在高级支持时启用复杂效果
    });
    
    return smoother;
  } else {
    // 回退到无动画版本
    console.warn('Browser lacks support for smooth scrolling animations');
    document.body.classList.add('no-animation');
    
    // 可能需要移除某些依赖于动画的UI元素
    document.querySelectorAll('.animation-only').forEach(el => {
      el.style.display = 'none';
    });
    
    return null;
  }
}

const smoother = initScrollWithFallback();
```

### 考虑可访问性

确保您的滚动体验对所有用户都友好：

```javascript
function setupAccessibility() {
  // 添加减弱动画的选项
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function handleReduceMotion() {
    if (reduceMotionQuery.matches && smoother) {
      // 用户希望减少动画
      smoother.paused(true); // 完全禁用平滑滚动
      
      // 或者使用极轻微的滚动效果
      // smoother.smooth = 0.1; 
      
      // 禁用所有视差效果
      document.querySelectorAll('[data-speed]').forEach(el => {
        el.removeAttribute('data-speed');
      });
      
      // 禁用复杂动画
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.animation && trigger.animation.duration() > 0.5) {
          trigger.animation.duration(0.1);
        }
      });
      
      document.body.classList.add('reduced-motion');
    }
  }
  
  // 初始检查
  handleReduceMotion();
  
  // 监听设置变化
  reduceMotionQuery.addEventListener('change', handleReduceMotion);
  
  // 添加跳转到内容链接（可访问性功能）
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.classList.add('skip-to-content');
  skipLink.textContent = '跳转到主内容';
  document.body.prepend(skipLink);
  
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#main-content');
    if (target && smoother) {
      smoother.scrollTo(target, false); // 立即滚动，不使用动画
      target.focus(); // 聚焦到主内容
    }
  });
}

setupAccessibility();
```

## 滚动动画模式

### 视差滚动最佳实践

```javascript
// 视差滚动的最佳实践
function setupParallaxEffects() {
  // 1. 为不同层次创建不同的视差速度
  const layers = [
    { selector: '.bg-layer', speed: 0.3 },
    { selector: '.mid-layer', speed: 0.5 },
    { selector: '.fg-layer', speed: 0.8 }
  ];
  
  layers.forEach(layer => {
    document.querySelectorAll(layer.selector).forEach(el => {
      // 使用dataset而不是直接设置属性，方便后续JS操作
      el.dataset.speed = layer.speed;
    });
  });
  
  // 2. 加入随机因子使视差更自然
  document.querySelectorAll('.random-parallax').forEach(el => {
    // 在基础速度上添加小的随机变化
    const baseSpeed = 0.5;
    const randomFactor = (Math.random() - 0.5) * 0.2; // -0.1 到 0.1的随机值
    el.dataset.speed = baseSpeed + randomFactor;
  });
  
  // 3. 为视差元素添加额外的裕度，防止出现边缘空白
  document.querySelectorAll('[data-speed]').forEach(el => {
    // 对原始尺寸进行放大，确保滚动时不会露出底部
    const speed = Math.abs(parseFloat(el.dataset.speed));
    if (el.tagName.toLowerCase() === 'img' && speed < 1) {
      // 计算需要的额外大小比例
      const scale = 1 + (1 - speed) * 0.2;
      gsap.set(el, { scale: scale });
    }
  });
}

setupParallaxEffects();
```

### 滚动触发动画模式

```javascript
// 常用滚动触发动画模式
function setupScrollAnimations() {
  // 1. 渐入渐出模式
  function createFadeSequence(container) {
    const elements = gsap.utils.toArray(`${container} .fade-element`);
    
    return ScrollTrigger.create({
      trigger: container,
      start: 'top bottom-=10%',
      once: true, // 只触发一次
      scroller: '#smooth-wrapper',
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });
  }
  
  // 2. 滚动进度指示器
  function createScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scroller: '#smooth-wrapper',
      onUpdate: (self) => {
        gsap.to(progressBar, {
          width: `${self.progress * 100}%`,
          duration: 0.1
        });
      }
    });
  }
  
  // 3. 绑定滚动到动画时间轴
  function createSectionTimeline(selector) {
    const section = document.querySelector(selector);
    if (!section) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        scroller: '#smooth-wrapper'
      }
    });
    
    // 根据滚动比例控制动画
    tl.from(section.querySelector('.animated-title'), { y: 100, opacity: 0 })
      .from(section.querySelector('.animated-content'), { y: 50, opacity: 0 }, 0.2)
      .from(section.querySelectorAll('.animated-item'), { 
        y: 30, 
        opacity: 0, 
        stagger: 0.1 
      }, 0.3);
      
    return tl;
  }
  
  // 应用这些模式
  document.querySelectorAll('.fade-section').forEach(createFadeSequence);
  createScrollProgress();
  createSectionTimeline('.hero-section');
  createSectionTimeline('.about-section');
  // 其他部分...
}
```

## 调试与优化

### 调试工具

创建开发环境专用的调试工具：

```javascript
function createDebugTools() {
  // 只在开发环境启用
  if (process.env.NODE_ENV !== 'development') return;
  
  // 创建调试面板
  const debugPanel = document.createElement('div');
  debugPanel.classList.add('debug-panel');
  debugPanel.innerHTML = `
    <div class="debug-header">ScrollSmoother调试</div>
    <div class="debug-controls">
      <button id="toggle-markers">显示/隐藏标记</button>
      <button id="toggle-smooth">启用/禁用平滑</button>
      <div>平滑度: <input type="range" id="smooth-value" min="0" max="3" step="0.1" value="1"></div>
      <div>视口: <span id="viewport-size"></span></div>
      <div>滚动位置: <span id="scroll-pos">0</span></div>
      <div>FPS: <span id="fps">0</span></div>
    </div>
  `;
  
  // 样式
  debugPanel.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    z-index: 9999;
    font-size: 12px;
  `;
  
  document.body.appendChild(debugPanel);
  
  // 功能实现
  let markersVisible = false;
  document.getElementById('toggle-markers').addEventListener('click', () => {
    markersVisible = !markersVisible;
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.vars.markers = markersVisible;
      trigger.refresh(true);
    });
  });
  
  document.getElementById('toggle-smooth').addEventListener('click', () => {
    const smoother = getSmoother();
    if (smoother) {
      smoother.paused(!smoother.paused());
    }
  });
  
  document.getElementById('smooth-value').addEventListener('input', (e) => {
    const smoother = getSmoother();
    if (smoother) {
      smoother.smooth = parseFloat(e.target.value);
    }
  });
  
  // 更新面板信息
  let lastTime = performance.now();
  let frameCount = 0;
  
  function updateDebugInfo(time) {
    const smoother = getSmoother();
    if (smoother) {
      document.getElementById('scroll-pos').textContent = 
        Math.round(smoother.scrollTop());
    }
    
    document.getElementById('viewport-size').textContent = 
      `${window.innerWidth}×${window.innerHeight}`;
    
    // 计算FPS
    frameCount++;
    if (time - lastTime > 1000) {
      const fps = Math.round((frameCount * 1000) / (time - lastTime));
      document.getElementById('fps').textContent = fps;
      frameCount = 0;
      lastTime = time;
    }
    
    requestAnimationFrame(updateDebugInfo);
  }
  
  requestAnimationFrame(updateDebugInfo);
}

// 初始化调试工具
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', createDebugTools);
}
```

### 性能优化清单

```javascript
// 性能优化检查列表
function performanceChecklist() {
  console.info('ScrollSmoother性能优化检查列表:');

  // 1. 检查视差元素数量
  const parallaxElements = document.querySelectorAll('[data-speed]');
  if (parallaxElements.length > 15) {
    console.warn(`⚠️ 视差元素数量过多: ${parallaxElements.length}。考虑减少数量以提高性能。`);
  } else {
    console.info(`✓ 视差元素数量适中: ${parallaxElements.length}`);
  }

  // 2. 检查动画实例数量
  const triggers = ScrollTrigger.getAll();
  if (triggers.length > 20) {
    console.warn(`⚠️ ScrollTrigger实例过多: ${triggers.length}。考虑合并或延迟创建。`);
  } else {
    console.info(`✓ ScrollTrigger实例数量可控: ${triggers.length}`);
  }

  // 3. 检查图像优化
  const images = document.querySelectorAll('img');
  let unoptimizedImages = 0;
  
  images.forEach(img => {
    // 检查是否使用了响应式图像
    if (!img.srcset && img.naturalWidth > 1000) {
      unoptimizedImages++;
    }
    
    // 检查是否有延迟加载属性
    if (!img.loading) {
      img.loading = 'lazy'; // 自动添加延迟加载
    }
  });
  
  if (unoptimizedImages > 0) {
    console.warn(`⚠️ 发现${unoptimizedImages}张未优化的大图像。考虑使用srcset和sizes优化加载。`);
  } else {
    console.info('✓ 图像优化良好');
  }
  
  // 4. 检查transform属性的使用
  const animatedElements = document.querySelectorAll('.gsap-animate');
  let nonTransformAnims = 0;
  
  animatedElements.forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.left !== 'auto' || style.top !== 'auto') {
      nonTransformAnims++;
    }
  });
  
  if (nonTransformAnims > 0) {
    console.warn(`⚠️ 发现${nonTransformAnims}个元素使用left/top动画代替transform。可能导致性能问题。`);
  } else {
    console.info('✓ 正确使用transform属性进行动画');
  }
  
  // 5. 检查滚动容器高度
  const content = document.querySelector('#smooth-content');
  if (content && content.scrollHeight > 15000) {
    console.warn('⚠️ 内容高度过高，可能导致性能问题。考虑使用虚拟滚动或分页加载。');
  } else {
    console.info('✓ 内容高度合理');
  }
}

// 在开发环境中运行检查
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(performanceChecklist, 1000);
  });
}
```

## 综合示例

一个结合了良好实践的完整示例：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ScrollSmoother最佳实践演示</title>
  <style>
    /* 基础样式 */
    body, html {
      margin: 0;
      padding: 0;
      overflow: hidden;
      height: 100%;
    }
    
    #smooth-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    
    #smooth-content {
      min-height: 100vh;
    }
    
    /* 部分样式 */
    .section {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    
    .parallax-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%; /* 额外空间防止滚动时出现空白 */
      object-fit: cover;
      z-index: -1;
    }
    
    .content {
      max-width: 800px;
      padding: 40px;
      background: rgba(255,255,255,0.8);
      border-radius: 10px;
    }
    
    /* 淡入元素初始状态 */
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
    }
    
    /* 滚动进度条 */
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0;
      background: #ff3366;
      z-index: 1000;
    }
    
    /* 跳转到内容链接（可访问性） */
    .skip-to-content {
      position: absolute;
      left: -9999px;
      top: 0;
      padding: 10px;
      background: #000;
      color: #fff;
      z-index: 9999;
    }
    
    .skip-to-content:focus {
      left: 0;
    }
  </style>
</head>
<body>
  <!-- 可访问性链接 -->
  <a href="#main-content" class="skip-to-content">跳转到主内容</a>
  
  <!-- 滚动进度条 -->
  <div class="progress-bar"></div>
  
  <!-- ScrollSmoother结构 -->
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!-- 英雄部分 -->
      <section class="section hero">
        <img src="hero-bg.jpg" alt="" class="parallax-bg" data-speed="0.4">
        <div class="content">
          <h1 class="fade-in">ScrollSmoother最佳实践</h1>
          <p class="fade-in">一个优化的平滑滚动体验示例</p>
        </div>
      </section>
      
      <!-- 主内容部分 -->
      <section id="main-content" class="section">
        <div class="content">
          <h2 class="fade-in">优化的滚动体验</h2>
          <div class="fade-in">
            <p>这个示例展示了如何创建性能优化的平滑滚动体验。</p>
            <p>通过遵循最佳实践，我们可以确保动画流畅运行。</p>
          </div>
        </div>
      </section>
      
      <!-- 特性部分 -->
      <section class="section features">
        <img src="features-bg.jpg" alt="" class="parallax-bg" data-speed="0.2">
        <div class="content">
          <h2 class="fade-in">主要特性</h2>
          <ul>
            <li class="fade-in">优化的性能与流畅度</li>
            <li class="fade-in">响应式设计与移动设备支持</li>
            <li class="fade-in">考虑可访问性要求</li>
            <li class="fade-in">良好的调试工具</li>
          </ul>
        </div>
      </section>
      
      <!-- 更多部分... -->
    </div>
  </div>

  <!-- 脚本 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollSmoother.min.js"></script>
  <script>
    // 注册插件
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    // 检测设备类型
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 检测减少动画偏好
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 配置ScrollSmoother
    let smoothConfig = {
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: prefersReducedMotion ? 0.1 : isMobile ? 0.5 : 1.2,
      effects: !prefersReducedMotion, // 根据用户偏好启用视差
      ignoreMobileResize: true,
      smoothTouch: isMobile ? 0.1 : 0
    };
    
    // 创建ScrollSmoother实例
    const smoother = ScrollSmoother.create(smoothConfig);
    
    // 设置淡入动画
    gsap.utils.toArray('.fade-in').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: prefersReducedMotion ? 0.1 : 1,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
          scroller: "#smooth-wrapper"
        }
      });
    });
    
    // 设置滚动进度条
    ScrollTrigger.create({
      scroller: "#smooth-wrapper",
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        gsap.to('.progress-bar', {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: 'none'
        });
      }
    });
    
    // 处理图片加载
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    function checkAllImagesLoaded() {
      loadedImages++;
      if (loadedImages === images.length) {
        // 所有图片加载完成，刷新ScrollTrigger
        ScrollTrigger.refresh();
      }
    }
    
    images.forEach(img => {
      if (img.complete) {
        checkAllImagesLoaded();
      } else {
        img.addEventListener('load', checkAllImagesLoaded);
        img.addEventListener('error', checkAllImagesLoaded);
      }
    });
    
    // 处理窗口大小变化
    window.addEventListener('resize', () => {
      // 使用防抖进行刷新
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 250);
    });
    
    // 处理锚点链接
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && smoother) {
          smoother.scrollTo(target, true);
        }
      });
    });
  </script>
</body>
</html>
```

通过遵循这些最佳实践，您可以创建既美观又高效的ScrollSmoother体验，确保在各种设备和浏览器上都能提供流畅的滚动动画。随着项目的发展，持续监控性能并对代码结构进行优化，将帮助您的网站在复杂的滚动动画中保持良好的用户体验。 