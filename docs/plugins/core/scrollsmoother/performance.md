---
title: 性能优化
---

<script setup>
import { PerformanceTips } from '@modules/animations/plugins/core/scrollsmoother';
</script>

# 性能优化

平滑滚动效果虽然美观，但可能会影响网页性能。本章将介绍如何优化ScrollSmoother的性能，确保即使在低性能设备上也能提供流畅的体验。

## 交互式优化示例

下面是一个全面展示ScrollSmoother性能优化技术的交互式组件：

<PerformanceTips />

## 性能隐患识别

::: warning 性能风险
使用ScrollSmoother时需要警惕几个主要的性能陷阱，特别是在开发复杂页面时。
:::

在优化之前，首先要识别可能的性能瓶颈：

1. **硬件加速问题**：
   - 平滑滚动大量使用CSS transform，可能会导致GPU内存占用过高
   - 同时运行多个视差效果会增加渲染负担

2. **触发过多重绘**：
   - 频繁更新DOM元素可能导致页面不断重绘
   - 特别是在低性能设备或移动设备上表现明显

3. **内存泄漏**：
   - 不正确的清理可能导致内存持续增加
   - 大量动画实例未被回收会消耗过多内存

## 基础优化策略

::: tip 配置优化
通过调整ScrollSmoother的基本配置，可以在保持视觉效果的同时提高性能。
:::

通过以下基本措施可以显著提高ScrollSmoother性能：

```javascript
// 基础优化配置
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1, // 使用较低的平滑值
  effects: false, // 在低性能设备上禁用视差效果
  ignoreMobileResize: true, // 避免在移动设备上频繁刷新
  normalizeScroll: false, // 禁用标准化滚动以减少计算
  speed: 1, // 保持默认速度
  ease: "power2.out" // 使用简单的缓动函数
});

// 检测设备性能并适配
function optimizeForDevice() {
  // 检测低性能设备
  const isLowPerformanceDevice = window.navigator.hardwareConcurrency < 4 || 
                               !window.matchMedia('(min-device-width: 768px)').matches;
  
  // 根据设备性能调整配置
  if (isLowPerformanceDevice) {
    smoother.smooth = 0.5; // 低性能设备使用较低平滑度
    gsap.ticker.fps(30); // 降低动画帧率
  }
}

optimizeForDevice();
```

## 使用will-change优化

::: tip GPU加速
will-change属性告诉浏览器某个元素将来可能发生变化，从而提前做好准备，提高渲染效率。
:::

正确使用will-change属性可以改善渲染性能：

```javascript
// 设置将要变换的元素
function optimizeTransforms() {
  // 只对进入视口的元素应用will-change
  const sections = document.querySelectorAll('.scrollsmoother-section');
  
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom+=30%",
      end: "bottom top-=30%",
      scroller: "#smooth-wrapper", // 必须参数
      onEnter: () => {
        // 元素即将进入视口时添加will-change
        gsap.set(section.querySelectorAll('.animated-element'), {
          willChange: 'transform, opacity'
        });
      },
      onLeave: () => {
        // 元素离开视口时移除will-change
        gsap.set(section.querySelectorAll('.animated-element'), {
          willChange: 'auto'
        });
      },
      onEnterBack: () => {
        gsap.set(section.querySelectorAll('.animated-element'), {
          willChange: 'transform, opacity'
        });
      },
      onLeaveBack: () => {
        gsap.set(section.querySelectorAll('.animated-element'), {
          willChange: 'auto'
        });
      }
    });
  });
}

// 初始化后调用
optimizeTransforms();
```

::: warning 谨慎使用
过度使用will-change会占用大量内存，应仅应用于真正需要的元素，且在不需要时及时移除。
:::

## 降低复杂度

::: info 优化视差
每个视差效果都会增加计算负担，优化视差元素数量是提高性能的关键方式之一。
:::

降低动画复杂度可以显著提升性能：

```javascript
// 推荐：使用ScrollSmoother的effects方法批量处理视差效果
smoother.effects("[data-speed]");

// 不推荐：为每个元素创建单独的ScrollTrigger
// gsap.utils.toArray("[data-speed]").forEach(el => {
//   gsap.to(el, {
//     y: (i, el) => el.dataset.speed * -100,
//     scrollTrigger: { ... }
//   });
// });

// 减少同时运行的视差效果
function optimizeParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-speed]');
  const totalElements = parallaxElements.length;
  
  // 如果视差元素过多，限制同时激活的数量
  if (totalElements > 10) {
    // 只对首屏和可见区域附近的元素激活视差
    parallaxElements.forEach(element => {
      // 检查元素是否在视口附近
      const rect = element.getBoundingClientRect();
      const isNearViewport = rect.top < window.innerHeight * 1.5;
      
      if (!isNearViewport) {
        // 暂时禁用远离视口的视差效果
        element.removeAttribute('data-speed');
        element._originalSpeed = element.dataset.speed; // 存储原始值
      }
    });
    
    // 监听滚动，动态启用视差
    smoother.effects("data-speed");
    
    // 滚动时检查并激活更多视差元素
    ScrollTrigger.create({
      trigger: 'body',
      start: "top top",
      end: "bottom bottom",
      scroller: "#smooth-wrapper",
      onUpdate: (self) => {
        // 限制更新频率
        if (self.progress % 0.05 < 0.01) { // 约每5%滚动检查一次
          updateVisibleParallaxElements();
        }
      }
    });
  } else {
    // 元素数量适中，直接激活所有视差
    smoother.effects("data-speed");
  }
}

// 更新可见区域的视差元素
function updateVisibleParallaxElements() {
  const elements = document.querySelectorAll('[_originalSpeed]');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isNearViewport = rect.top < window.innerHeight * 1.5 && rect.bottom > -window.innerHeight * 0.5;
    
    if (isNearViewport) {
      // 恢复视差效果
      element.dataset.speed = element._originalSpeed;
      delete element._originalSpeed;
      // 重新应用视差效果
      smoother.effects(element, { speed: parseFloat(element.dataset.speed) });
    }
  });
}

optimizeParallaxEffects();
```

## 减少DOM操作

::: tip 批量处理
减少独立DOM操作，使用批量处理和虚拟列表可以显著提高性能。
:::

减少不必要的DOM操作可以提高性能：

```javascript
// 优化ScrollTrigger更新
function optimizeScrollTriggerUpdates() {
  // 使用requestAnimationFrame限制滚动更新频率
  let lastScrollY = 0;
  let ticking = false;
  
  smoother.scrollTop(0); // 重置滚动位置
  
  // 替换默认的update处理
  const originalUpdate = smoother.update;
  smoother.update = function() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY = smoother.scrollTop();
        // 只有滚动位置变动超过阈值才执行更新
        if (Math.abs(currentY - lastScrollY) > 1) {
          originalUpdate.call(this);
          lastScrollY = currentY;
        }
        ticking = false;
      });
      ticking = true;
    }
  };
}

// 延迟更新DOM内容
function optimizeDOMUpdates() {
  // 假设有需要随滚动更新的内容
  const progressBars = document.querySelectorAll('.progress-bar');
  const counters = document.querySelectorAll('.scroll-counter');
  
  if (progressBars.length || counters.length) {
    let lastUpdateTime = 0;
    
    ScrollTrigger.create({
      trigger: 'body',
      scroller: "#smooth-wrapper",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // 限制更新频率为每100ms一次
        const now = Date.now();
        if (now - lastUpdateTime > 100) {
          // 更新进度条
          progressBars.forEach(bar => {
            gsap.set(bar, { width: `${self.progress * 100}%` });
          });
          
          // 更新计数器
          counters.forEach(counter => {
            counter.textContent = Math.round(self.progress * 100) + '%';
          });
          
          lastUpdateTime = now;
        }
      }
    });
  }
}
```

## 处理移动设备

::: warning 移动设备考量
移动设备通常计算能力有限，需要特别优化策略以确保流畅体验。
:::

移动设备需要特别的优化策略：

```javascript
// 移动设备优化策略
function setupMobileOptimization() {
  // 检测是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // 移动设备配置
    smoother.vars.smooth = 0.5; // 降低平滑度
    
    // 减少视差效果
    const heavyParallaxElements = document.querySelectorAll('[data-speed]:not([data-mobile-speed])');
    heavyParallaxElements.forEach(el => {
      // 降低移动设备上的视差强度
      const originalSpeed = parseFloat(el.dataset.speed);
      const mobileSpeed = originalSpeed * 0.5; // 减半视差效果
      smoother.effects(el, { speed: mobileSpeed });
    });
    
    // 使用CSS视差代替JS视差
    document.body.classList.add('mobile-parallax');
    
    // 禁用复杂动画
    const complexAnimations = document.querySelectorAll('.complex-animation');
    complexAnimations.forEach(el => {
      el.classList.add('simplified');
    });
    
    // 添加CSS优化
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* 移动设备使用CSS视差代替JS视差 */
      .mobile-parallax .css-parallax {
        transform: translateZ(0);
      }
      
      /* 降低动画复杂度 */
      .complex-animation.simplified {
        transition: none !important;
        animation: none !important;
      }
      
      /* 优化滚动容器 */
      #smooth-wrapper {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(styleElement);
  }
}

// 初始化移动设备优化
setupMobileOptimization();
```

## 使用content-visibility优化

::: tip 新特性
使用CSS的content-visibility属性可以大幅提高长页面的滚动性能。
:::

```css
/* 在CSS中应用content-visibility */
.scroll-section {
  content-visibility: auto;
  contain-intrinsic-size: 500px;
}

.off-screen-element {
  content-visibility: auto;
  contain-intrinsic-size: 300px 200px;
}
```

```javascript
// 在JS中动态管理content-visibility
function setupContentVisibility() {
  const sections = document.querySelectorAll('.scroll-section');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 当元素接近视口时，移除content-visibility以显示内容
        if (entry.isIntersecting) {
          entry.target.style.contentVisibility = 'visible';
        } else {
          entry.target.style.contentVisibility = 'auto';
        }
      });
    }, {
      rootMargin: '200px 0px' // 提前200px开始加载
    });
    
    sections.forEach(section => observer.observe(section));
  }
}

setupContentVisibility();
```

## 内存管理与清理

::: danger 避免内存泄漏
在单页应用或动态内容页面中，必须正确清理ScrollSmoother和ScrollTrigger实例，避免内存泄漏。
:::

```javascript
// 创建页面实例管理系统
const pageManager = {
  instances: [],
  smoother: null,
  
  // 初始化页面
  init() {
    this.smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5
    });
    
    this.instances.push(this.smoother);
    
    // 初始化ScrollTrigger
    this.initScrollTriggers();
  },
  
  // 创建ScrollTrigger
  initScrollTriggers() {
    // 创建并存储所有ScrollTrigger实例
    const sections = document.querySelectorAll('.animated-section');
    
    sections.forEach(section => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        scroller: "#smooth-wrapper",
        start: "top bottom",
        // 其他配置...
      });
      
      this.instances.push(trigger);
    });
  },
  
  // 清理所有实例
  cleanup() {
    // 杀死所有动画和ScrollTrigger实例
    this.instances.forEach(instance => {
      if (instance && instance.kill) {
        instance.kill();
      }
    });
    
    // 清空实例数组
    this.instances = [];
    this.smoother = null;
    
    // 重置ScrollTrigger
    ScrollTrigger.getAll().forEach(st => st.kill());
    ScrollTrigger.clearMatchMedia();
    
    // 清除GSAP动画
    gsap.killTweensOf('*');
  },
  
  // 页面切换时使用
  refresh() {
    this.cleanup();
    this.init();
  }
};

// 初始化页面
pageManager.init();

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  pageManager.cleanup();
});

// SPA路由变化时刷新
document.addEventListener('routeChange', () => {
  pageManager.refresh();
});
``` 