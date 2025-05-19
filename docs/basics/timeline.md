# 时间轴

GSAP的时间轴（Timeline）是一个强大的功能，让你能够轻松创建和控制复杂的动画序列。本章将详细介绍如何使用时间轴创建精确控制的连续动画。

<script setup>
import { BasicTimeline, TimelineControl, TimelinePosition, NestedTimeline, TimelineParams } from '../../modules/animations/timeline';
</script>

::: tip 💡 时间轴心智模型
把时间轴想象成一条**动画播放清单**：
- 你可以按特定顺序添加不同的动画
- 可以精确控制每个动画的开始时间
- 可以嵌套多层时间轴创建复杂序列
- 所有动画都可以作为整体一起控制（播放、暂停、反转等）
:::

## 什么是时间轴？

时间轴可以被看作是一个容器，你可以在其中添加多个动画，并精确控制它们的开始时间和相对顺序：

```javascript
// 创建一个新的时间轴
const tl = gsap.timeline();

// 添加一系列动画
tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 })
  .to(".box3", { rotation: 360, duration: 1.5 });
```

这个例子中，动画会按顺序执行：先是box1向右移动，然后是box2向下移动，最后是box3旋转。

<BasicTimeline />

::: info 📌 操作指引
👆 点击上方示例中的"重播动画"按钮，观察盒子是如何按顺序动画的。注意GSAP时间轴默认会在前一个动画完成后立即播放下一个动画。
:::

## 创建时间轴

时间轴的创建非常简单，使用`gsap.timeline()`方法：

```javascript
// 创建一个基本时间轴
const tl = gsap.timeline();

// 创建带参数的时间轴
const tlWithParams = gsap.timeline({
  delay: 1,        // 整个时间轴延迟1秒开始
  repeat: 2,       // 整个时间轴重复2次（总共执行3次）
  repeatDelay: 0.5, // 每次重复前等待0.5秒
  yoyo: true,      // 反向重复（来回运动）
  paused: true     // 创建后不自动播放
});
```

### 时间轴参数选项

时间轴支持多种参数，让你能够精确控制整个动画序列的行为：

<TimelineParams />

::: info 📌 操作指引
观察每个面板中动画的不同行为，点击"重播"按钮可以重新查看效果。注意"重复时间轴"如何实现往返动画效果。
:::

| 参数 | 类型 | 描述 |
|------|------|------|
| `delay` | 数字 | 延迟指定秒数后开始整个时间轴 |
| `paused` | 布尔值 | 设为`true`时创建后不自动播放 |
| `repeat` | 数字 | 整个时间轴重复次数（-1为无限重复） |
| `repeatDelay` | 数字 | 每次重复前等待的秒数 |
| `yoyo` | 布尔值 | 设为`true`时重复时反向播放 |
| `onComplete` | 函数 | 时间轴完成时的回调函数 |
| `onStart` | 函数 | 时间轴开始时的回调函数 |
| `onUpdate` | 函数 | 时间轴更新时的回调函数（每帧触发） |
| `onRepeat` | 函数 | 时间轴每次重复时的回调函数 |
| `defaults` | 对象 | 为时间轴内所有动画设置默认值 |

## 时间轴控制和定位

GSAP时间轴提供了丰富的控制方法，让你能够精确控制动画播放：

<TimelineControl />

::: info 📌 操作指引
尝试使用各种控制按钮操作动画。特别注意"进度控制"按钮如何让你直接跳到特定位置，以及速度控制如何改变动画速率。
:::

### 常用控制方法

时间轴实例提供了丰富的控制方法：

```javascript
const tl = gsap.timeline();

// 基本控制
tl.play();      // 播放时间轴
tl.pause();     // 暂停时间轴
tl.resume();    // 从暂停点继续播放
tl.reverse();   // 反向播放
tl.restart();   // 重新开始播放

// 位置控制
tl.progress(0.5);  // 立即跳转到50%进度
tl.time(2);        // 立即跳转到2秒位置
tl.seek(1.5);      // 跳转到1.5秒位置（与time类似）

// 速度控制
tl.timeScale(0.5); // 以一半速度播放
tl.timeScale(2);   // 以两倍速度播放
```

### 获取时间轴信息

你可以获取时间轴的当前状态：

```javascript
const tl = gsap.timeline();

// ... 添加动画 ...

// 获取状态信息
const progress = tl.progress();    // 0-1之间的进度值
const totalTime = tl.totalDuration(); // 总时长（包括所有重复）
const currentTime = tl.time();     // 当前播放位置（秒）
const reversed = tl.reversed();    // 是否正在反向播放
```

## 时间轴位置控制

时间轴最强大的功能之一是能够精确控制各个动画的开始位置：

<TimelinePosition />

::: info 📌 操作指引
点击"重播"按钮观察不同动画元素如何在时间轴上的特定位置开始动画。注意时间线上的标记点如何对应每个动画的触发时机。
:::

### 相对位置设置

默认情况下，时间轴上的动画会在前一个动画完成后立即开始。但你可以使用第三个参数来更改这个行为：

```javascript
const tl = gsap.timeline();

// 相对位置示例
tl.to(".box1", {x: 100, duration: 1})
  .to(".box2", {y: 50, duration: 1}, 0)       // 在时间轴0秒处开始
  .to(".box3", {rotation: 90, duration: 1}, 1) // 在时间轴1秒处开始
  .to(".box4", {scale: 1.5, duration: 1}, "+=0.5") // 在前一动画结束后延迟0.5秒开始
  .to(".box5", {opacity: 0, duration: 1}, "-=0.5"); // 在前一动画结束前0.5秒开始
```

### 位置参数语法

| 位置参数 | 说明 | 示例 |
|---------|------|------|
| `数字` | 从时间轴开始的绝对时间（秒） | `2` - 在2秒处开始 |
| `"+=数字"` | 在前一动画结束后等待指定秒数 | `"+=0.5"` - 等待0.5秒 |
| `"-=数字"` | 在前一动画结束前指定秒数开始 | `"-=0.5"` - 提前0.5秒 |
| `"<"` | 与前一个动画同时开始 | `"<"` - 在前一动画开始处 |
| `">"` | 在前一个动画结束后立即开始（默认） | `">"` - 在前一动画结束处 |
| `标签名` | 在指定的时间轴标签处开始 | `"scene1"` - 在"scene1"标签处 |

## 嵌套时间轴

对于复杂的动画序列，GSAP允许你将一个时间轴嵌套在另一个时间轴内，创建模块化的动画架构：

<NestedTimeline />

::: info 📌 操作指引
点击"播放动画"按钮观察主时间轴和子时间轴的协作方式。注意子动画是如何在特定时间点开始播放的。
:::

### 创建嵌套时间轴

```javascript
// 创建子时间轴
function createSubTimeline() {
  const subTl = gsap.timeline();
  
  subTl.to(".sub-element1", {x: 100, duration: 0.5})
      .to(".sub-element2", {y: 50, duration: 0.5})
      .to(".sub-element3", {rotation: 90, duration: 0.5});
      
  return subTl; // 返回时间轴实例
}

// 创建主时间轴
const mainTl = gsap.timeline();

// 添加主时间轴的动画
mainTl.to(".main-element", {x: 200, duration: 1})
     // 在1秒位置添加子时间轴
     .add(createSubTimeline(), 1)
     // 继续添加主时间轴动画
     .to(".main-element", {scale: 1.5, duration: 1});
```

### 嵌套时间轴的优势

1. **模块化管理**：将复杂动画拆分为更易于管理的小部分
2. **重复使用**：子时间轴可以在多个地方重复使用
3. **更好的控制**：可以单独控制子动画序列或整体控制
4. **更清晰的代码**：提高代码可读性和可维护性

## 时间轴标签系统

GSAP时间轴提供了强大的标签系统，允许你在时间轴上标记特定位置，并通过标签名引用这些位置：

```javascript
const tl = gsap.timeline();

tl.to(".box1", {x: 100, duration: 1})
  .addLabel("scene1", "+=0.5") // 在前一动画完成后0.5秒添加标签
  .to(".box2", {y: 50, duration: 1})
  .addLabel("scene2") // 在当前位置添加标签
  .to(".box3", {rotation: 90, duration: 1});
  
// 使用标签控制播放
tl.play("scene1"); // 从scene1标签处播放
tl.seek("scene2"); // 跳转到scene2标签处
```

### 常用标签方法

| 方法 | 描述 | 示例 |
|------|------|------|
| `addLabel(name, position)` | 添加标签 | `tl.addLabel("intro", 0)` |
| `addPause(position)` | 添加暂停点 | `tl.addPause("+=1")` |
| `play(position)` | 从指定位置播放 | `tl.play("middle")` |
| `seek(position)` | 跳转到指定位置 | `tl.seek("end")` |
| `tweenTo(position)` | 动画过渡到指定位置 | `tl.tweenTo("scene2")` |

## 实际应用技巧

### 1. 使用Timeline默认值

为时间轴内的所有动画设置默认参数，避免重复代码：

```javascript
// 为所有子动画设置默认值
const tl = gsap.timeline({
  defaults: {
    duration: 0.8,
    ease: "power2.out",
    opacity: 0
  }
});

// 所有这些动画都会使用上面设置的默认值
tl.from(".title", {y: -50})
  .from(".subtitle", {y: -30})
  .from(".button", {y: 20})
  .from(".image", {x: 100});
```

### 2. 时间轴链式调用

利用GSAP的链式调用API创建更简洁的代码：

```javascript
gsap.timeline()
  .set(".element", {autoAlpha: 0}) // 立即设置初始状态
  .to(".element", {autoAlpha: 1, duration: 1})
  .to(".element", {x: 100, duration: 1})
  .to(".element", {rotation: 360, duration: 1})
  .to(".element", {scale: 0, duration: 0.5});
```

### 3. 双向控制系统

结合时间轴和UI控件创建交互式动画：

```javascript
// 创建暂停的时间轴
const tl = gsap.timeline({paused: true});

// 添加动画...

// 创建滑块控制
const slider = document.querySelector("#timeline-slider");
slider.addEventListener("input", function() {
  // 直接控制时间轴进度
  tl.progress(this.value / 100);
});

// 同步时间轴与滑块
tl.eventCallback("onUpdate", function() {
  // 更新滑块位置
  slider.value = tl.progress() * 100;
});
```

## 性能优化

当创建复杂的时间轴动画时，考虑以下性能优化技巧：

1. **使用transformOrigin**：正确设置变换原点可以获得更流畅的旋转和缩放动画

```javascript
tl.to(".element", {
  rotation: 360,
  transformOrigin: "center center", // 从中心点旋转
  duration: 1
});
```

2. **利用fromTo减少重排**：明确设置起始值减少浏览器计算

```javascript
tl.fromTo(".element", 
  {x: 0, autoAlpha: 0}, // 起始状态
  {x: 100, autoAlpha: 1, duration: 1} // 结束状态
);
```

3. **批量更新**：使用stagger而不是多个单独的动画

```javascript
// 不推荐：单独添加
tl.to(".item1", {x: 100, duration: 1})
  .to(".item2", {x: 100, duration: 1})
  .to(".item3", {x: 100, duration: 1});

// 推荐：使用stagger批量更新
tl.to(".item", {x: 100, duration: 1, stagger: 0.2});
```

## 总结

GSAP时间轴是创建复杂动画序列的强大工具，通过本章你已经学习了：

- 创建和配置时间轴
- 控制动画的播放、暂停和跳转
- 设置精确的动画定位
- 使用嵌套时间轴构建模块化动画
- 利用标签系统增强控制
- 性能优化和实际应用技巧

时间轴使你能够轻松处理复杂的动画序列，无需担心时间计算和动画同步问题。通过组合这些技术，你可以创建专业级的动画效果，使你的网站和应用更具吸引力和交互性。 