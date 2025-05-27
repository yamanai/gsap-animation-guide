# GSAP核心动画方法

GSAP提供了多个强大的核心动画方法，使你能够创建各种复杂的动画效果。本章将介绍这些基础方法及其用法。

## 核心动画方法概览

GSAP的核心动画方法主要包括：

- **gsap.to()** - 从当前状态到目标状态的动画
- **gsap.from()** - 从指定起始状态到当前状态的动画
- **gsap.fromTo()** - 从指定起始状态到指定目标状态的动画
- **gsap.set()** - 立即设置属性（无动画过渡）

## gsap.to() 方法

`gsap.to()` 是最常用的动画方法，它创建从元素当前状态到指定目标状态的动画。

### 何时使用 to() 方法？

使用 `gsap.to()` 的理想场景：
- 当你知道动画的目标状态，但不关心起始状态时
- 当你想从元素的当前状态自然过渡到新状态时
- 用于响应用户交互，如点击按钮后的动画反馈
- 适合大多数日常动画需求，是最常用的GSAP方法

### 基本语法

```javascript
gsap.to(目标元素, {
  // 动画属性和配置
  duration: 1, // 动画持续时间（秒）
  x: 100,      // 水平移动100px
  opacity: 0.5, // 透明度变为0.5
  rotation: 360, // 旋转360度
  ease: "power2.out", // 缓动函数
});
```

### 动画示例

<GsapEditor 
  title="gsap.to() 基础示例"
  :initialJs="`// 基本的to()动画
gsap.to('.animation-target', {
  duration: 1.5,
  x: 100,
  y: 20,
  backgroundColor: '#8a2be2',
  borderRadius: '8px',
  rotation: 360,
  ease: 'power2.inOut'
});`"
/>

### 常见用法

`gsap.to()` 适用于：

- 元素移动、缩放、旋转等位置变化
- 颜色、透明度等样式变化
- 响应用户交互的状态变化

## gsap.from() 方法

`gsap.from()` 方法创建从指定起始状态到元素当前状态的动画，常用于入场动画。

### 何时使用 from() 方法？

使用 `gsap.from()` 的理想场景：
- 创建元素的入场动画，如页面加载时元素飞入
- 当你希望动画结束后元素回到其"自然状态"时
- 不确定元素的当前样式，但知道你希望动画从哪种状态开始
- 当动画结束后不需要再重置元素状态时

### 基本语法

```javascript
gsap.from(目标元素, {
  // 起始状态
  opacity: 0,  // 开始时完全透明
  y: -50,      // 开始时在当前位置上方50px
  // 其他配置
  duration: 1, 
  ease: "back.out",
});
```

### 动画示例

<GsapEditor 
  title="gsap.from() 实例"
  :initialJs="`// 元素从透明状态淡入并上升
gsap.from('.animation-target', {
  opacity: 0,
  y: 50,
  scale: 0.7,
  backgroundColor: '#ff6347',
  duration: 1.2,
  ease: 'back.out(1.7)'
});`"
/>

### 常见用法

`gsap.from()` 适用于：

- 页面加载时的元素入场动画
- 滚动到视图时的显示效果
- 任何需要从"隐藏"状态开始的动画

## gsap.fromTo() 方法

`gsap.fromTo()` 方法同时指定动画的起始状态和结束状态，提供最精确的控制。

### 何时使用 fromTo() 方法？

使用 `gsap.fromTo()` 的理想场景：
- 需要完全控制动画的整个过程，不依赖元素的当前状态
- 创建复杂的多阶段动画时，确保每阶段都有明确的起止状态
- 当动画需要从一个"非自然"状态过渡到另一个特定状态时
- 在多个元素之间创建统一的动画效果，忽略它们可能的不同初始状态

### 基本语法

```javascript
gsap.fromTo(目标元素, 
  { // 起始状态
    opacity: 0,
    x: -100
  }, 
  { // 结束状态和配置
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "elastic.out"
  }
);
```

### 动画示例

<GsapEditor 
  title="gsap.fromTo() 实例"
  :initialJs="`// 完全控制动画的起止状态
gsap.fromTo('.animation-target', 
{ // 起始状态
  x: -80,
  opacity: 0,
  backgroundColor: '#ff6347',
  borderRadius: '0%'
},
{ // 结束状态
  x: 80,
  opacity: 1,
  backgroundColor: '#4682b4',
  borderRadius: '50%',
  rotation: 360,
  duration: 2,
  ease: 'elastic.out(1, 0.3)'
});`"
/>

### 常见用法

`gsap.fromTo()` 适用于：

- 需要精确控制的复杂动画
- 确保动画总是从特定状态开始，不受DOM当前状态影响
- 多阶段动画的一部分

## gsap.set() 方法

`gsap.set()` 立即设置元素属性，没有动画过渡。它常用于设置动画的初始状态。

### 何时使用 set() 方法？

使用 `gsap.set()` 的理想场景：
- 在动画开始前设置元素的初始状态
- 需要立即改变元素属性而不需要平滑过渡时
- 为多个相关动画创建一致的起始状态
- 性能优化：比使用CSS直接设置更高效，特别是处理transform属性时

### 基本语法

```javascript
gsap.set(目标元素, {
  x: 100,         // 立即设置x坐标为100px
  opacity: 0.5,   // 立即设置透明度为0.5
  backgroundColor: "#3498db"
});
```

### 使用示例

<GsapEditor 
  title="gsap.set() 与动画组合"
  :initialJs="`// 先使用set设置初始状态，然后创建动画
// 立即设置元素初始状态
gsap.set('.animation-target', {
  x: -80,
  backgroundColor: '#3498db',
  borderRadius: '8px',
  scale: 0.8
});
// 0.5秒后开始动画
setTimeout(() => {
  gsap.to('.animation-target', {
    x: 80,
    backgroundColor: '#e74c3c',
    scale: 1,
    rotation: 180,
    duration: 1.5,
    ease: 'power3.inOut'
  });
}, 800);`"
/>

### 常见用法

`gsap.set()` 适用于：

- 设置动画的初始状态
- 重置元素属性
- 需要立即改变而不需要过渡的场景
- 提高性能（比CSS设置属性更高效）

## 通用动画参数

所有GSAP动画方法都支持以下常用参数：

| 参数 | 描述 | 默认值 | 示例 |
|------|------|--------|------|
| `duration` | 动画持续时间(秒) | 0.5 | `duration: 2` |
| `delay` | 开始前延迟(秒) | 0 | `delay: 0.5` |
| `ease` | 缓动函数 | "power1.out" | `ease: "bounce.out"` |
| `repeat` | 重复次数 | 0 | `repeat: 3` 或 `-1` (无限循环) |
| `yoyo` | 往返动画 | false | `yoyo: true` |
| `stagger` | 多元素间隔 | 0 | `stagger: 0.2` |
| `onComplete` | 完成回调 | - | `onComplete: () => console.log('完成')` |

## 动画控制

每个动画方法都返回一个可以控制的动画实例：

```javascript
// 创建并保存动画实例
const animation = gsap.to('.box', {
  x: 200,
  duration: 2
});

// 控制方法
animation.play();      // 播放
animation.pause();     // 暂停
animation.reverse();   // 反向播放
animation.restart();   // 重新开始
animation.timeScale(2); // 2倍速播放
```

## 组合动画示例

下面是一个组合使用多种核心方法的复杂动画示例：

<GsapEditor 
  title="GSAP核心方法组合"
  :initialJs="`// 组合使用多种核心方法创建连续动画
// 1. 重置元素初始状态
gsap.set('.animation-target', {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  backgroundColor: '#3498db',
  borderRadius: '5px'
});
// 2. 创建入场动画
gsap.from('.animation-target', {
  opacity: 0,
  scale: 0.5,
  y: -50,
  duration: 1,
  ease: 'back.out(1.7)'
});
// 3. 延迟后创建移动动画
setTimeout(() => {
  gsap.to('.animation-target', {
    x: 150,
    backgroundColor: '#e74c3c',
    borderRadius: '50%',
    rotation: 360,
    duration: 1.5,
    ease: 'elastic.out(1, 0.3)'
  });
}, 1500);
// 注意：在实际项目中，应使用GSAP的Timeline来替代setTimeout
// 我们将在下一章节中学习Timeline`"
/>

## 总结

GSAP的核心动画方法为创建各种动画效果提供了坚实的基础：

- **gsap.to()** - 从当前状态到目标状态的动画
- **gsap.from()** - 从指定状态到当前状态的动画
- **gsap.fromTo()** - 完全控制动画的起始和结束状态
- **gsap.set()** - 立即设置属性，无动画过渡

理解这些核心方法是掌握GSAP的第一步。在下一章中，我们将学习如何使用[GSAP时间线](./timeline.html)来创建精确控制的复杂动画序列。 