---
title: 高级功能与技巧
---

<script setup>
import { AdvancedFeatures } from '@modules/animations/plugins/core/scrollsmoother';
</script>

# 高级功能与技巧

本章将介绍ScrollSmoother的一些高级功能和使用技巧，帮助您充分发挥这个强大插件的潜力。

## 交互式示例

下面是一个展示多种ScrollSmoother高级功能的交互式示例，包括自定义平滑度、动态控制和高级视差效果：

<AdvancedFeatures />

## 动态启用和禁用平滑滚动

::: tip 根据需求切换
在某些情况下（如移动设备或特定用户交互），您可能需要动态切换平滑滚动功能。
:::

```javascript
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5
});

// 禁用平滑滚动
document.querySelector('.disable-smooth').addEventListener('click', () => {
  smoother.paused(true); // 暂停平滑滚动效果
});

// 重新启用平滑滚动
document.querySelector('.enable-smooth').addEventListener('click', () => {
  smoother.paused(false); // 恢复平滑滚动效果
});

// 根据设备类型自动设置
function updateSmoothingBasedOnDevice() {
  // 检查是否为移动设备
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  // 在移动设备上禁用，在桌面设备上启用
  if (isMobile) {
    smoother.paused(true);
  } else {
    smoother.paused(false);
    smoother.scrollTo(smoother.offset); // 保持当前滚动位置
  }
}

// 初始设置
updateSmoothingBasedOnDevice();

// 监听窗口大小变化
window.addEventListener('resize', updateSmoothingBasedOnDevice);
```

## 自定义滚动效果

::: info 缓动函数
通过不同的缓动函数（ease）可以创建多样化的滚动体验，从弹性效果到步进式滚动。
:::

除了基本的平滑滚动，您还可以创建自定义的滚动效果：

```javascript
// 创建弹性滚动效果
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true,
  // 自定义缓动函数，创建弹性滚动效果
  ease: "elastic.out(1, 0.3)" // 弹性效果，参数为强度和弹性
});

// 创建步进式滚动效果
const stepSmoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  ease: "steps(10)" // 将滚动分为10个离散步骤
});

// 控制滚动速度曲线
const variableSmoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1,
  ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"), // 自定义缓动曲线
  
  // 自定义滚动速度控制
  onUpdate: self => {
    // 根据滚动位置动态调整平滑度
    const scrollTop = self.scrollTop();
    const totalHeight = self.maxScroll();
    const scrollProgress = scrollTop / totalHeight;
    
    // 滚动到中间部分时减慢速度
    if (scrollProgress > 0.4 && scrollProgress < 0.6) {
      self.smooth = 2; // 中间段更慢
    } else {
      self.smooth = 1; // 其他部分正常速度
    }
  }
});
```

::: warning 性能注意
过于复杂的缓动函数会增加计算负担，可能影响性能。在移动设备上尤其需要谨慎使用。
:::

## 高级视差效果

::: tip 专业视差
创建分层视差效果是ScrollSmoother的强项，特别是通过`effects()`方法可以大大简化实现。
:::

创建更加复杂和动态的视差效果：

```javascript
// 初始化ScrollSmoother
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});

// 为不同元素添加不同的视差效果
document.querySelectorAll('.parallax-section').forEach(section => {
  // 获取该部分的所有视差元素
  const elements = section.querySelectorAll('.parallax-element');
  
  elements.forEach((el, index) => {
    // 创建随机的视差速度
    const speed = 0.5 + Math.random() * 0.8;
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    // 设置视差速度
    smoother.effects(el, { speed: speed * direction });
    
    // 添加额外的动画效果
    gsap.to(el, {
      rotation: direction * 10, // 旋转效果
      scale: 1 + speed * 0.1,    // 缩放效果
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scroller: "#smooth-wrapper",
        scrub: true
      }
    });
  });
});

// 创建深度视差效果
function createDepthParallax() {
  const layers = document.querySelectorAll('.depth-layer');
  
  layers.forEach((layer, i) => {
    const depth = parseFloat(layer.getAttribute('data-depth') || 1);
    
    // 设置z轴位置
    gsap.set(layer, { z: depth * 100 });
    
    // 为每个层级添加不同的视差速度
    smoother.effects(layer, { speed: 1 / (depth + 1) });
  });
  
  // 添加透视效果
  gsap.set("#smooth-content", { perspective: 1000 });
}

createDepthParallax();
```

## 页面过渡效果

::: info SPA集成
在单页应用(SPA)中，ScrollSmoother可以与页面过渡动画结合，创建无缝的用户体验。
:::

结合ScrollSmoother和GSAP动画创建平滑的页面过渡效果：

```javascript
// 初始化ScrollSmoother
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5
});

// 页面加载时的入场动画
function pageEnterAnimation() {
  const tl = gsap.timeline();
  
  tl.from("header", { y: -50, opacity: 0, duration: 0.8 })
    .from(".hero-section", { y: 50, opacity: 0, duration: 0.8 }, "-=0.4")
    .from(".hero-section .title", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
    .from(".hero-section .subtitle", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
    
  return tl;
}

// 页面内部分段过渡
function createSectionTransitions() {
  const sections = document.querySelectorAll(".content-section");
  
  sections.forEach((section, i) => {
    // 创建每个部分的进入动画
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center",
        scroller: "#smooth-wrapper", // 必须设置
        toggleActions: "play none none reverse"
      }
    });
    
    // 定制每个部分的动画
    const elements = section.querySelectorAll(".animate-item");
    
    sectionTl.from(elements, { 
      y: 50, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.15,
      ease: "power2.out"
    });
  });
}

// 页面离开动画(用于SPA)
function pageLeaveAnimation() {
  const tl = gsap.timeline();
  
  tl.to("#smooth-content", { 
    opacity: 0, 
    y: -50, 
    duration: 0.6,
    onComplete: () => {
      // 在这里可以触发页面切换
      console.log("页面离开动画完成，可以切换到新页面");
    }
  });
  
  return tl;
}

// 执行初始动画
window.addEventListener("DOMContentLoaded", () => {
  // 首先禁用平滑滚动，直到入场动画完成
  smoother.paused(true);
  
  // 运行入场动画
  pageEnterAnimation().then(() => {
    // 动画完成后启用平滑滚动
    smoother.paused(false);
    
    // 设置部分过渡
    createSectionTransitions();
  });
});
```

::: warning 注意副作用
在SPA中使用ScrollSmoother时，务必在页面切换前销毁实例（使用`smoother.kill()`），以防止内存泄漏和滚动冲突。
:::

## ScrollSmoother配置中间件

::: tip 高级用法
配置中间件是ScrollSmoother的高级功能，可以让您完全自定义滚动行为。
:::

通过修改ScrollSmoother的内部函数，可以实现自定义的滚动处理逻辑：

```javascript
// 创建ScrollSmoother实例
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5
});

// 保存原始滚动函数的引用
const originalScrollFunc = smoother.scrollFunc;

// 创建自定义滚动处理逻辑
smoother.scrollFunc = (position, forceOnly) => {
  // 获取当前滚动位置
  const currentPosition = smoother.scrollTop();
  
  // 应用自定义逻辑
  if (position < 100) {
    // 顶部区域使用不同的平滑度
    smoother.vars.smooth = 0.5; 
  } else if (position > smoother.maxScroll() - 100) {
    // 底部区域使用不同的平滑度
    smoother.vars.smooth = 3;
  } else {
    // 其他区域使用默认平滑度
    smoother.vars.smooth = 1.5;
  }
  
  // 检查特定区域，应用特殊效果
  document.querySelectorAll(".special-section").forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionBottom = sectionTop + rect.height;
    
    if (position > sectionTop && position < sectionBottom) {
      // 特殊区域内的自定义行为
      console.log("在特殊区域内滚动");
      
      // 例如：在特定区域反转滚动方向
      // position = sectionTop + sectionBottom - position;
    }
  });
  
  // 调用原始滚动函数
  originalScrollFunc(position, forceOnly);
}
```

## 创建自定义更新处理函数

::: info 事件处理
通过onUpdate回调，您可以根据滚动位置创建自定义效果，如速度感应、视差效果等。
:::

使用ScrollSmoother的onUpdate回调创建自定义滚动效果：

```javascript
// 创建ScrollSmoother实例
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  
  // 监听滚动更新
  onUpdate: self => {
    // 获取当前滚动位置和速度
    const scrollTop = self.scrollTop();
    const velocity = self.getVelocity();
    
    // 速度感应效果
    if (Math.abs(velocity) > 100) {
      // 快速滚动时的效果
      document.querySelectorAll('.speed-sensitive').forEach(el => {
        // 根据滚动速度调整模糊度
        const blur = Math.min(Math.abs(velocity) / 20, 10);
        el.style.filter = `blur(${blur}px)`;
      });
    } else {
      // 正常滚动时清除效果
      document.querySelectorAll('.speed-sensitive').forEach(el => {
        el.style.filter = 'none';
      });
    }
    
    // 创建基于滚动位置的颜色变化
    const scrollProgress = scrollTop / self.maxScroll();
    document.body.style.setProperty('--scroll-progress', scrollProgress);
    
    // 示例：根据滚动进度改变背景颜色
    const hue = Math.round(scrollProgress * 360);
    document.body.style.backgroundColor = `hsla(${hue}, 80%, 90%, 1)`;
  }
});
```

## 图像和媒体加载优化

优化媒体加载和ScrollSmoother的性能：

```javascript
// 跟踪需要加载的图像
let imagesToLoad = 0;
let imagesLoaded = 0;

// 图像加载检查
function checkImagesLoaded() {
  imagesLoaded++;
  
  // 更新加载进度
  const progress = imagesLoaded / imagesToLoad;
  updateLoadingProgress(progress);
  
  // 所有图像加载完成后初始化滚动
  if (imagesLoaded === imagesToLoad) {
    initScrollSmoother();
  }
}

// 预加载图像
function preloadImages() {
  const images = document.querySelectorAll('img');
  imagesToLoad = images.length;
  
  // 显示加载指示器
  showLoadingIndicator();
  
  if (imagesToLoad === 0) {
    // 如果没有图像，直接初始化
    initScrollSmoother();
    return;
  }
  
  // 监听每个图像的加载
  images.forEach(img => {
    if (img.complete) {
      checkImagesLoaded();
    } else {
      img.onload = checkImagesLoaded;
      img.onerror = checkImagesLoaded; // 即使加载失败也继续
    }
    
    // 确保图像有src属性
    if (!img.src && img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

// 初始化滚动
function initScrollSmoother() {
  hideLoadingIndicator();
  
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });
  
  // 图像加载后刷新ScrollTrigger
  ScrollTrigger.refresh();
}

// 显示加载指示器
function showLoadingIndicator() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
      <div class="loader-text">加载中 <span id="loader-progress">0%</span></div>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  gsap.set(loader, {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });
}

// 更新加载进度
function updateLoadingProgress(progress) {
  const progressElement = document.getElementById('loader-progress');
  if (progressElement) {
    progressElement.textContent = `${Math.round(progress * 100)}%`;
  }
}

// 隐藏加载指示器
function hideLoadingIndicator() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => loader.remove()
    });
  }
}

// 在页面加载完成后开始预加载
window.addEventListener('load', preloadImages);
``` 