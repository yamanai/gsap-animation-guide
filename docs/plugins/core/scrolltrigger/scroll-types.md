# ScrollTrigger 滚动类型

在 GSAP ScrollTrigger 中，你可以使用多种不同的滚动方式来触发动画。理解这些不同的滚动类型及其实现方式，能够帮助你创建更加丰富和交互性强的滚动体验。

<script setup>
import { DefaultScroll, ContainerScroll, HorizontalScroll, OverlayScroll, MultiScroller } from '../../../../modules/animations/plugins/core/scrolltrigger/scroll-types';
</script>

## 默认页面滚动

最常见的 ScrollTrigger 使用方式是监听整个页面（viewport）的滚动。在这种情况下，滚动行为是由浏览器的默认滚动机制控制的，ScrollTrigger 只是在特定的滚动位置触发动画。

### 默认滚动的特点

- 使用浏览器原生滚动
- 适用于大多数常见的滚动动画需求
- 设置简单，无需额外配置特殊的滚动容器
- 对移动设备友好

### 实现方法

在默认页面滚动中，你只需要在 ScrollTrigger 的配置中指定触发元素（trigger）、开始和结束位置即可，无需指定 `scroller` 参数。

```js
gsap.to(".element", {
  y: 100,
  scrollTrigger: {
    trigger: ".trigger-element", 
    start: "top center",    // 当触发元素的顶部到达视口中心时开始
    end: "bottom center",   // 当触发元素的底部到达视口中心时结束
    markers: true           // 调试时显示标记
  }
});
```

### 示例演示

下面的示例展示了如何在默认页面滚动中创建淡入动画效果：

<DefaultScroll />

## 自定义容器滚动

有时候，你可能希望在页面的特定区域内创建滚动动画，而不是整个页面。ScrollTrigger 允许你指定一个自定义的滚动容器。

### 自定义容器滚动的特点

- 独立于页面主滚动条
- 可以在页面的任何部分创建独立滚动区域
- 适用于创建滚动卡片、面板切换等效果
- 允许在固定高度的容器中实现滚动动画

### 实现方法

要使用自定义容器滚动，你需要设置 ScrollTrigger 配置中的 `scroller` 参数，指向你的滚动容器：

```js
gsap.to(".animation-element", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".trigger-element",
    scroller: ".scroll-container", // 指定滚动容器
    start: "top 80%",
    end: "top 20%",
    markers: true
  }
});
```

### 示例演示

以下示例展示了如何在自定义容器中创建滚动触发动画：

<ContainerScroll />

## 横向滚动

除了传统的垂直滚动，ScrollTrigger 还支持创建水平滚动效果，这在创建时间轴、产品展示等场景下非常有用。

### 横向滚动的特点

- 通过垂直滚动控制水平移动
- 适合展示时间线、步骤流程、产品组合等
- 提供不同于传统上下滚动的用户体验
- 可以结合 pin 功能固定内容

### 实现方法

横向滚动通常通过以下方式实现：

1. 创建一个水平排列的内容容器（宽度超过视口）
2. 使用 GSAP 动画控制其水平位置
3. 将该动画与垂直滚动同步

```js
gsap.to(".horizontal-content", {
  x: () => -(document.querySelector(".horizontal-content").offsetWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: "+=3000", // 或基于内容长度动态设置
    pin: true,
    scrub: 1
  }
});
```

### 示例演示

以下示例展示了如何创建一个基于垂直滚动的横向滚动效果：

<HorizontalScroll />

## 叠加滚动效果

叠加滚动是一种特殊的滚动技术，它允许内容在固定背景上滚动，创造出深度和层次感。这种技术常被用于创建视差效果、沉浸式页面等。

### 叠加滚动的特点

- 多层内容以不同速率移动
- 创造视觉深度感
- 适合创建沉浸式体验
- 可以结合背景固定效果

### 实现方法

叠加滚动通常需要创建多层内容，并为每一层设置不同的滚动速率：

```js
// 背景层慢速移动
gsap.to(".background", {
  y: "-30%", 
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom", 
    end: "bottom top",
    scrub: true
  }
});

// 内容层正常滚动
// 可以使用默认滚动或自定义容器
```

### 示例演示

以下示例展示了如何创建叠加滚动效果：

<OverlayScroll />

## 多重滚动器

在一些复杂的滚动体验中，你可能需要监听多个不同的滚动容器，并创建它们之间的协调动画。ScrollTrigger 让这一切变得可能。

### 多重滚动器的特点

- 可以同时监控多个滚动容器
- 允许创建复杂的交互体验
- 适合创建分屏滚动、关联滚动等效果
- 支持滚动事件之间的通信

### 实现方法

实现多重滚动器主要涉及以下几个步骤：

1. 为每个滚动容器创建独立的 ScrollTrigger 实例
2. 使用回调函数在不同滚动事件间建立联系
3. 必要时使用 `ScrollTrigger.scrollerProxy()` 处理自定义滚动行为

```js
// 为第一个容器创建 ScrollTrigger
ScrollTrigger.create({
  trigger: ".container1",
  scroller: ".scroller1",
  onUpdate: (self) => {
    // 可以在这里与其他滚动器通信
  }
});

// 为第二个容器创建 ScrollTrigger
ScrollTrigger.create({
  trigger: ".container2",
  scroller: ".scroller2",
  // 其他配置
});
```

### 示例演示

以下示例展示了如何使用多个滚动容器并创建它们之间的协调动作：

<MultiScroller />

## 滚动类型性能优化

无论你使用哪种滚动类型，都应该注意以下性能优化技巧：

### 1. 使用 `invalidateOnRefresh`

当窗口大小改变可能影响滚动计算时，启用此选项可确保正确更新：

```js
scrollTrigger: {
  invalidateOnRefresh: true
}
```

### 2. 使用 `fastScrollEnd`

如果你的动画对滚动结束处理特别敏感：

```js
scrollTrigger: {
  fastScrollEnd: true
}
```

### 3. 使用 requestAnimationFrame 优化

在复杂的滚动处理函数中：

```js
function updateOnScroll() {
  // 避免在这里直接操作DOM
  requestAnimationFrame(() => {
    // 在这里执行DOM操作
  });
}
```

### 4. 减少标记的使用

生产环境关闭 markers：

```js
scrollTrigger: {
  markers: process.env.NODE_ENV === 'development'
}
```

### 5. 避免过度使用 scrub

scrub 模式会创建额外的动画实例，只在必要时使用：

```js
// 对于不需要精确同步的动画，考虑使用 toggleActions
scrollTrigger: {
  toggleActions: "play pause reverse reset"
}
```

## 总结与最佳实践

选择合适的滚动类型对于创建高质量的滚动体验至关重要。以下是一些最佳实践建议：

1. **根据需求选择合适的滚动类型**：
   - 简单的滚动触发动画 → 默认页面滚动
   - 局部内容滚动动画 → 自定义容器滚动
   - 展示步骤流程或时间线 → 横向滚动
   - 创建深度层次感 → 叠加滚动
   - 复杂交互场景 → 多重滚动器

2. **考虑不同设备的体验**：
   - 触摸设备上的滚动行为与鼠标滚轮不同
   - 测试不同屏幕尺寸下的滚动效果
   - 考虑添加平滑滚动功能提升体验

3. **注意滚动嵌套问题**：
   - 避免在滚动容器内再嵌套滚动容器，可能导致滚动冲突
   - 如需嵌套，确保正确设置 `preventDefault` 和事件传播

4. **性能优先**：
   - 使用 `will-change` 提示浏览器优化滚动元素
   - 避免在滚动事件中执行复杂计算
   - 使用 `debounce` 或 `throttle` 限制滚动事件处理频率

通过深入理解并灵活运用这些不同的滚动类型，你可以创建出既美观又流畅的滚动体验，提升用户与你的网站或应用的交互品质。
