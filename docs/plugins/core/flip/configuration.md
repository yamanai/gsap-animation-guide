---
title: Flip插件 - 基础API和配置选项
editLink: true
outline: deep
---

<!--
<div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>暂时替代的内容</h3>
  <p>由于模块加载问题，我们暂时使用静态HTML内容代替Vue组件。</p>
</div>
-->

# 基础API和配置选项

Flip插件提供了一组简洁但功能强大的API，本页面将详细介绍核心API和配置选项的使用方法。

## 交互式配置演示

下面是FLIP插件配置选项的交互式演示，您可以实时尝试不同的配置参数，观察它们对动画效果的影响：

<FlipConfigurationOptions />

## 核心API

::: info API概述
FLIP插件主要提供了四个核心API方法：`getState()`、`from()`、`fit()`和`isFlipping()`。
:::

### `Flip.getState(targets, vars)`

创建并返回一个表示目标元素当前状态的对象。

**参数说明：**

- `targets`: 字符串选择器、元素或元素数组，指定要记录状态的元素
- `vars` (可选): 配置对象，可以包含：
  - `props`: 要捕获的属性列表，如 `"width,height,backgroundColor"`
  - `simple`: Boolean值，如果为`true`，则只捕获变换信息（位置和缩放）以提高性能
  - `nested`: 如果为`true`，则处理嵌套变换
  - `prune`: 如果为`true`，则移除不可见元素的跟踪

**返回值：**
返回一个Flip状态对象，用于后续动画创建。

**示例：**

```javascript
// 基本用法
const state = Flip.getState(".box");

// 高级用法 - 捕获额外属性
const state = Flip.getState(".box", {
  props: "backgroundColor,color", // 跟踪颜色变化
  simple: false,                 // 捕获所有变换信息
  nested: true                  // 处理嵌套变换
});
```

### `Flip.from(state, vars)`

基于之前捕获的状态创建动画，将元素从该状态动画过渡到当前状态。

**参数说明：**

- `state`: 由`Flip.getState()`返回的状态对象
- `vars` (可选): 动画配置对象，包含标准GSAP动画选项和Flip特定选项

**返回值：**
返回一个Timeline实例，包含所有创建的动画。

**示例：**

```javascript
// 创建简单Flip动画
Flip.from(state, {
  duration: 0.5,
  ease: "power2.out"
});

// 高级动画配置
Flip.from(state, {
  duration: 0.8,
  stagger: 0.05,        // 为多个元素添加间隔
  ease: "elastic.out",
  onComplete: () => console.log("Flip动画完成")
});
```

### `Flip.fit(fromElement, toElement, vars)`

将一个元素的大小/位置（通过transforms）设置为与另一个元素匹配。

::: tip 实用技巧
`Flip.fit()` 在创建卡片展开/收缩效果时特别有用，可以在不使用完整FLIP流程的情况下快速匹配元素位置。
:::

**参数说明：**

- `fromElement`: 源元素
- `toElement`: 目标元素
- `vars` (可选): 配置项，如`{scale:true, absolute:true}` 

**返回值：**
返回一个包含应用的变换信息的对象。

**示例：**

```javascript
// 将一个元素匹配到另一个元素的位置和大小
Flip.fit("#source", "#target", {scale: true});

// 创建一个具有位置和大小匹配的动画
gsap.from("#element", {
  ...Flip.fit("#element", "#target"),
  duration: 1,
  ease: "power3.inOut"
});
```

### `Flip.isFlipping(targets)`

检查指定目标是否正在进行Flip动画。

**参数说明：**
- `targets`: 字符串选择器、元素或元素数组

**返回值：**
如果任何指定元素正在进行Flip动画，则返回`true`。

**示例：**

```javascript
// 检查元素是否正在动画中
if (Flip.isFlipping(".box")) {
  console.log("元素正在进行Flip动画");
}
```

## 主要配置选项

在使用`Flip.from()`时，可以传入多种配置选项来控制动画行为：

| 选项 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `duration` | Number | 0.5 | 动画持续时间（秒） |
| `ease` | String/Function | "power1.out" | 缓动函数 |
| `absolute` | Boolean | false | 是否将元素设置为绝对定位以进行动画 |
| `absoluteOnLeave` | Boolean | false | 是否仅对离开视图的元素使用绝对定位 |
| `nested` | Boolean | false | 设置为`true`以处理嵌套变换 |
| `fade` | Boolean | false | 是否添加淡入淡出效果 |
| `scale` | Boolean | true | 是否动画化缩放变化 |
| `simple` | Boolean | false | 仅跟踪位置和缩放（性能优化） |
| `zIndex` | Number/Function | 0 | 设置动画期间的z-index |
| `clearProps` | String | "transform" | 动画完成后要清除的属性 |
| `onEnter` | Function | null | 新元素进入时的回调 |
| `onLeave` | Function | null | 元素离开时的回调 |
| `onComplete` | Function | null | 所有动画完成时的回调 |
| `stagger` | Number/Object | 0 | 多元素动画的间隔时间 |

::: warning 特别注意
在处理列表重排序时，通常需要设置 `absolute: true` 以避免布局抖动。在处理大量元素时，可以使用 `simple: true` 来提高性能。
:::

## 完整示例：配置选项的使用

下面的示例展示了如何使用多种配置选项来创建更复杂和定制化的Flip动画：

```javascript
// 获取列表中所有项目的初始状态
const state = Flip.getState(".list-item");

// 更改DOM - 例如，重排序列表项
sortList();

// 使用多种配置选项创建动画
Flip.from(state, {
  // 基本动画设置
  duration: 0.7,                   // 持续时间
  ease: "power3.inOut",            // 缓动函数
  
  // Flip特定选项
  absolute: true,                  // 使用绝对定位
  scale: true,                     // 动画化缩放变化
  fade: true,                      // 添加淡入淡出效果
  stagger: 0.05,                   // 为每个元素添加50ms间隔
  
  // 回调函数
  onEnter: (elements) => {
    // 处理新增的元素
    gsap.from(elements, {
      opacity: 0,
      y: 20,
      duration: 0.5
    });
  },
  
  onLeave: (elements) => {
    // 处理被移除的元素
    gsap.to(elements, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      onComplete: () => gsap.set(elements, {display: "none"})
    });
  },
  
  onComplete: () => console.log("所有动画完成")
});
```

## 高级配置示例

### 1. 处理嵌套元素的转换

::: tip 嵌套元素处理
当您的动画涉及到嵌套DOM结构时，`nested: true`选项至关重要，它能确保子元素跟随父元素正确动画。
:::

当您有复杂的嵌套DOM结构时，可以使用`nested`选项来确保嵌套元素的正确动画：

```javascript
// 获取包含嵌套元素的容器状态
const state = Flip.getState(".card", {
  nested: true,  // 追踪嵌套变换
  props: "borderRadius,backgroundColor" // 也追踪这些属性的变化
});

// 更改DOM结构
container.classList.toggle("expanded");

// 创建动画，保持嵌套关系
Flip.from(state, {
  duration: 0.6,
  nested: true,
  absolute: true,
  ease: "power2.inOut"
});
```

### 2. 使用stagger创建序列动画

当动画涉及多个元素时，使用`stagger`选项可以创建更有趣的序列效果：

```javascript
// 获取网格项目状态
const state = Flip.getState(".grid-item");

// 更改布局
container.classList.toggle("list-view");

// 使用复杂的stagger配置
Flip.from(state, {
  duration: 0.8,
  absolute: true,
  ease: "back.out(1.2)",
  
  // 高级stagger配置
  stagger: {
    amount: 0.3,         // 总stagger时间
    from: "start",       // 从第一个元素开始
    grid: "auto",        // 自动检测网格排列
    ease: "power1.inOut" // stagger缓动
  }
});
```

### 3. 自定义进入和离开动画

::: info 元素进入和离开
`onEnter`和`onLeave`回调在处理动态添加或移除元素时非常有用，可以创建无缝的过渡效果。
:::

使用`onEnter`和`onLeave`回调可以为新增和移除的元素创建自定义动画：

```javascript
// 记录初始状态
const state = Flip.getState(".item");

// 添加和移除一些元素
addNewItems();
removeOldItems();

// 创建动画，处理新元素和被移除的元素
Flip.from(state, {
  duration: 0.6,
  absolute: true,
  
  // 新元素进入动画
  onEnter: (elements, animation) => {
    gsap.fromTo(elements, 
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.2 }
    );
  },
  
  // 元素离开动画
  onLeave: (elements, animation) => {
    gsap.to(elements, {
      opacity: 0,
      y: -50,
      duration: 0.3,
      onComplete: () => {
        elements.forEach(el => el.remove());
      }
    });
  }
});
```

::: tip 探索配置选项
使用上方的[交互式演示](#交互式配置演示)尝试各种配置选项，直观感受不同参数组合的效果。
::: 