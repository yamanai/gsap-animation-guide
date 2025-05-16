# GSAP高级动画

本章探讨GSAP的高级功能和插件，以创建更复杂、更精彩的动画效果。

## 交互式动画演示

下面是一个高级GSAP动画演示，你可以调整各种参数，实时查看效果：

<GsapAdvancedDemo 
  title="GSAP时间轴动画控制器" 
  description="调整参数、控制播放并查看实时代码示例"
/>

## GSAP插件系统

GSAP核心库本身功能已经很强大，但其插件系统进一步扩展了其能力。以下是一些最常用的GSAP插件：

### ScrollTrigger

ScrollTrigger是GSAP最强大的插件之一，它允许你创建与页面滚动相关的动画：

```js
// 首先注册插件
gsap.registerPlugin(ScrollTrigger);

// 创建一个与滚动相关的动画
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center", // 当元素顶部到达视口中心时
    end: "bottom center", // 当元素底部到达视口中心时
    scrub: true, // 动画会跟随滚动位置
    markers: true, // 开发时显示标记点
    toggleActions: "play pause reverse reset" // 动作序列
  },
  x: 500,
  rotation: 360,
  duration: 3
});
```

### MotionPath

MotionPath插件允许元素沿着自定义路径移动：

```js
// 注册插件
gsap.registerPlugin(MotionPathPlugin);

// 创建路径动画
gsap.to(".box", {
  duration: 5,
  motionPath: {
    path: "#path", // SVG路径元素
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  },
  repeat: -1,
  ease: "none"
});
```

### DrawSVG

DrawSVG插件可以创建SVG路径的绘制动画：

```js
// 注册插件
gsap.registerPlugin(DrawSVGPlugin);

// 创建SVG绘制动画
gsap.from("#svg-path", {
  drawSVG: 0,
  duration: 2,
  ease: "power1.inOut"
});
```

## 高级时间轴技术

GSAP的时间轴(Timeline)是创建复杂动画序列的关键。以下是一些高级技巧：

### 相对定位

可以使用相对标签精确控制动画的时间点：

```js
const tl = gsap.timeline();

tl.to(".box1", {duration: 1, x: 100})
  .to(".box2", {duration: 1, x: 100}, "-=0.5") // 在前一个动画完成0.5秒前开始
  .to(".box3", {duration: 1, x: 100}, "<") // 与前一个动画同时开始
  .to(".box4", {duration: 1, x: 100}, "+=0.5") // 在前一个动画完成后等待0.5秒再开始
  .to(".box5", {duration: 1, x: 100}, 1) // 在时间轴的1秒处开始
```

### 嵌套时间轴

可以将时间轴嵌套在其他时间轴中，创建更复杂的动画结构：

```js
const masterTl = gsap.timeline();
const childTl1 = gsap.timeline();
const childTl2 = gsap.timeline();

// 构建子时间轴
childTl1.to(".child1", {duration: 1, x: 100})
        .to(".child1", {duration: 1, rotation: 360});

childTl2.to(".child2", {duration: 1, y: 100})
        .to(".child2", {duration: 1, scale: 2});

// 将子时间轴添加到主时间轴
masterTl.add(childTl1)
        .add(childTl2, "-=0.5");
```

## 使用GSAP控制器

GSAP控制器提供了对动画的精细控制：

```js
// 创建动画
const tween = gsap.to(".box", {
  duration: 2,
  x: 200,
  paused: true // 创建时不自动播放
});

// 控制动画
document.querySelector("#play").addEventListener("click", () => tween.play());
document.querySelector("#pause").addEventListener("click", () => tween.pause());
document.querySelector("#reverse").addEventListener("click", () => tween.reverse());
document.querySelector("#restart").addEventListener("click", () => tween.restart());

// 设置动画位置
document.querySelector("#slider").addEventListener("input", (e) => {
  tween.progress(e.target.value / 100);
});
```

## 高级缓动函数

GSAP提供了强大的缓动函数系统：

```js
// 自定义弹性效果
gsap.to(".box", {
  duration: 2,
  x: 200,
  ease: "elastic.out(1, 0.3)" // 弹性参数可调整
});

// 自定义缓动
gsap.to(".box", {
  duration: 2,
  x: 200,
  ease: "custom"
});

// 注册自定义缓动函数
gsap.registerEase("custom", function(progress) {
  // 返回0到1之间的值，用于映射动画进度
  return progress * progress * (3 - 2 * progress);
});
```

## 在Vue项目中应用高级动画

在Vue项目中，可以创建自定义指令来封装GSAP的高级功能：

```js
// 创建滚动动画指令
app.directive('gsap-scroll', {
  mounted(el, binding) {
    gsap.registerPlugin(ScrollTrigger);
    
    const options = binding.value || {};
    
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: options.start || "top bottom",
        end: options.end || "bottom top",
        scrub: options.scrub || false,
        markers: options.markers || false
      },
      opacity: 0,
      y: options.y || 50,
      duration: options.duration || 1,
      ease: options.ease || "power2.out"
    });
  }
});
```

在组件中使用：

```vue
<template>
  <div v-gsap-scroll="{ y: 100, scrub: true }">
    滚动时会有动画效果
  </div>
</template>
```

在下一章节，我们将深入探讨ScrollTrigger的高级用法，以创建复杂的滚动相关动画。 