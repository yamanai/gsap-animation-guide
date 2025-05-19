# 时间控制

GSAP提供了丰富的时间控制功能，让你能够精确掌握动画的持续时间、延迟、重复等时间相关参数。本章将详细介绍如何使用这些功能。

<script setup>
// 方式1：直接从timing模块导入（推荐）
import { BasicParameters, AnimationControl, StaggerDemo, RelativePosition, TimelineLabels, CallbacksDemo } from '../../modules/animations/timing';

// 方式2：从总索引导入（适用于需要多种动画类型时）
// import { animations } from '../../modules';
// const { BasicParameters, AnimationControl, StaggerDemo, RelativePosition, TimelineLabels, CallbacksDemo } = animations.timing;
</script>

## 基础时间参数

GSAP动画中最常用的时间参数包括：

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `duration` | Number | 0.5 | 动画持续时间（秒） |
| `delay` | Number | 0 | 动画开始前的延迟（秒） |
| `repeat` | Number | 0 | 重复次数（不包括第一次播放） |
| `repeatDelay` | Number | 0 | 每次重复之间的延迟（秒） |
| `yoyo` | Boolean | false | 设置为true时，动画会在重复时反向播放 |
| `startTime` | Number | 0 | 在时间轴上的开始时间点（秒） |

<BasicParameters />

### duration（持续时间）

`duration`参数定义了动画从开始到结束需要的时间，单位为秒。它决定了动画的速度感：

```javascript
// 快速动画（0.2秒）
gsap.to(".box-fast", { x: 100, duration: 0.2 });

// 中速动画（1秒，也是默认值）
gsap.to(".box-medium", { x: 100, duration: 1 });

// 慢速动画（3秒）
gsap.to(".box-slow", { x: 100, duration: 3 });
```

::: tip 提示
如果不指定`duration`，GSAP将使用默认值0.5秒。对于大多数UI动画，0.2-0.5秒的持续时间通常感觉最自然。
:::

### delay（延迟）

`delay`参数用于推迟动画开始的时间，对于创建序列动画或等待特定事件后触发动画非常有用：

```javascript
// 立即开始
gsap.to(".box1", { x: 100 });

// 延迟1秒后开始
gsap.to(".box2", { x: 100, delay: 1 });

// 延迟2秒后开始
gsap.to(".box3", { x: 100, delay: 2 });
```

### repeat（重复次数）

`repeat`参数控制动画重复播放的次数（不包含首次播放）：

```javascript
// 不重复（默认）
gsap.to(".box1", { x: 100, repeat: 0 });

// 重复1次（总共播放2次）
gsap.to(".box2", { x: 100, repeat: 1 });

// 无限重复
gsap.to(".box3", { x: 100, repeat: -1 });
```

### yoyo（来回播放）

将`yoyo`设置为`true`时，动画会在重复时反向播放，创造出来回运动的效果：

```javascript
// 重复3次，来回播放
gsap.to(".box", { 
  x: 100, 
  repeat: 3,
  yoyo: true 
});
```

### repeatDelay（重复延迟）

`repeatDelay`指定每次重复之间的等待时间：

```javascript
gsap.to(".box", {
  x: 100, 
  repeat: 3,
  repeatDelay: 0.5 // 每次重复前等待0.5秒
});
```

## 动画状态控制

GSAP提供了一系列方法来控制动画的播放状态：

| 方法 | 描述 |
|------|------|
| `play()` | 播放动画 |
| `pause()` | 暂停动画 |
| `resume()` | 从暂停点恢复播放 |
| `reverse()` | 反向播放动画 |
| `restart()` | 重新开始动画 |
| `timeScale()` | 设置或获取播放速度 |
| `seek()` | 跳转到特定时间点 |
| `progress()` | 设置或获取动画进度（0-1） |
| `totalProgress()` | 设置或获取包含重复次数的总进度 |

<AnimationControl />

### 创建可控制的动画

为了使用这些控制方法，你需要保存动画的引用：

```javascript
// 创建动画并保存引用
const myAnimation = gsap.to(".box", {
  x: 100,
  duration: 1,
  paused: true // 创建时不立即播放
});

// 现在可以随时控制动画
myAnimation.play();   // 播放
myAnimation.pause();  // 暂停
myAnimation.reverse(); // 反向播放
myAnimation.restart(); // 重新开始
```

### 速度控制（timeScale）

`timeScale()`方法可以调整动画的播放速度：

```javascript
// 正常速度播放
myAnimation.timeScale(1);

// 半速播放
myAnimation.timeScale(0.5);

// 2倍速播放
myAnimation.timeScale(2);

// 反向半速播放
myAnimation.timeScale(-0.5);
```

### 跳转和进度控制

你可以跳转到动画的特定时间点或进度：

```javascript
// 跳转到1.5秒处
myAnimation.seek(1.5);

// 跳转到50%的进度
myAnimation.progress(0.5);

// 获取当前进度
const currentProgress = myAnimation.progress();
```

## 交错动画（Stagger）

GSAP的"交错"功能让你可以轻松创建一组元素的序列动画，每个元素的动画都会稍微延迟开始。

<StaggerDemo />

### 基本交错用法

最简单的交错动画只需指定一个延迟值：

```javascript
// 每个元素开始的时间比前一个晚0.2秒
gsap.to(".box", {
  x: 100,
  stagger: 0.2
});
```

### 高级交错选项

对于更复杂的交错效果，你可以使用对象语法：

```javascript
gsap.to(".box", {
  x: 100,
  stagger: {
    amount: 1,       // 第一个与最后一个动画开始的总时间差
    from: "center",  // 动画从哪开始（"start"、"center"、"edges"、"random"或索引值）
    grid: "auto",    // 用于网格布局的交错
    ease: "power2.inOut", // 交错时间的缓动函数
    each: 0.1        // 每个元素之间的准确延迟（覆盖amount）
  }
});
```

## 绝对时间与相对时间

GSAP提供了多种处理动画时间的方式：

### 绝对时间

绝对时间指的是精确的秒数：

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1, // 精确的1秒时长
  delay: 0.5   // 精确的0.5秒延迟
});
```

### 相对时间与标签

在时间轴（Timeline）中，你可以使用相对位置标记来安排动画：

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { x: 100, duration: 1 }, "<") // 与前一动画同时开始
  .to(".box3", { x: 100, duration: 1 }, "+=0.5") // 前一动画结束后延迟0.5秒
  .to(".box4", { x: 100, duration: 1 }, "-=0.5"); // 前一动画结束前0.5秒开始
```

相对位置标记的种类：

| 标记 | 描述 |
|------|------|
| `">"` | 前一动画结束后立即开始（默认） |
| `"<"` | 与前一动画同时开始 |
| `"+=[value]"` | 前一动画结束后等待指定时间 |
| `"-=[value]"` | 前一动画结束前指定时间开始 |

<RelativePosition />

## 标签系统（Labels）

在复杂的动画序列中，你可以使用标签来标记特定的时间点：

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100 })
  .addLabel("middle", "+=0.5") // 在前一动画结束后0.5秒添加标签
  .to(".box2", { x: 100 })
  .addLabel("end")
  .to(".box3", { x: 100 });

// 现在可以使用标签控制播放
tl.play("middle"); // 从"middle"标签处播放
tl.seek("end");    // 跳转到"end"标签处
```

<TimelineLabels />

## 回调函数与时间事件

GSAP提供了多种回调函数，可以在动画的特定时间点触发：

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: () => console.log("动画开始"),
  onUpdate: () => console.log("动画更新中"),
  onComplete: () => console.log("动画完成"),
  onRepeat: () => console.log("动画重复"),
  // 更细粒度的控制
  onStartParams: [参数1, 参数2],
  onUpdateParams: [参数1, 参数2],
  onCompleteParams: [参数1, 参数2],
  onRepeatParams: [参数1, 参数2]
});
```

<CallbacksDemo />

## 时间控制最佳实践

### 性能优化

1. **避免过多的动画重叠**：同时运行过多动画会影响性能，考虑使用时间轴顺序化动画。

2. **使用适当的重复模式**：无限重复的动画(`repeat: -1`)应当在不可见时暂停或杀死，以节省资源。

```javascript
// 在元素滚出视口时暂停动画
ScrollTrigger.create({
  trigger: ".animated-element",
  start: "top bottom",
  end: "bottom top",
  onEnter: () => animation.play(),
  onLeave: () => animation.pause()
});
```

### 用户体验考虑

1. **考虑交互动画的时长**：
   - 按钮反馈：0.1-0.2秒
   - 界面过渡：0.2-0.5秒
   - 强调动画：0.5-1.5秒

2. **使用延迟创造自然感**：人工设计的轻微延迟可以使动画序列感觉更自然。

3. **响应用户的减少动画偏好**：
```javascript
// 检测用户是否偏好减少动画
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // 使用更少或更简单的动画
  gsap.defaults({ duration: 0.1, ease: "none" });
}
```

## 总结

GSAP的时间控制功能丰富而灵活，通过掌握这些功能，你可以：

- 精确控制动画的持续时间、延迟和重复
- 使用暂停、播放、反转等方法实时控制动画状态
- 创建复杂的交错动画，实现连贯的视觉效果
- 结合时间轴和标签系统组织复杂的动画序列

在下一章中，我们将学习GSAP的缓动函数（Easing），它能让动画更加生动自然。 