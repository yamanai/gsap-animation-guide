---
title: 核心重点插件
editLink: true
outline: deep
---

# GSAP核心重点插件概述

在GSAP的丰富插件生态系统中，有四个插件因其强大的功能和广泛的应用场景而被视为"核心重点插件"。这些插件能够处理现代网站和应用中最常见、最具挑战性的动画需求。本章将对这些核心插件进行概要介绍，帮助你选择合适的工具解决特定的动画问题。

<div class="core-plugins-grid">
  <div class="plugin-card">
    <div class="plugin-icon scrolltrigger"></div>
    <h3>ScrollTrigger</h3>
    <p>滚动驱动动画的终极解决方案</p>
    <div class="plugin-tags">
      <span>滚动交互</span>
      <span>视差效果</span>
    </div>
  </div>
  <div class="plugin-card">
    <div class="plugin-icon scrollsmoother"></div>
    <h3>ScrollSmoother</h3>
    <p>创造平滑丝滑的滚动体验</p>
    <div class="plugin-tags">
      <span>平滑滚动</span>
      <span>用户体验</span>
    </div>
  </div>
  <div class="plugin-card">
    <div class="plugin-icon flip"></div>
    <h3>Flip</h3>
    <p>强大的布局状态转换动画</p>
    <div class="plugin-tags">
      <span>布局变化</span>
      <span>列表排序</span>
    </div>
  </div>
  <div class="plugin-card">
    <div class="plugin-icon splittext"></div>
    <h3>SplitText</h3>
    <p>专业级文字动画解决方案</p>
    <div class="plugin-tags">
      <span>文字特效</span>
      <span>创意排版</span>
    </div>
  </div>
</div>

## 插件选择指南

根据你的项目需求，下面的表格可以帮助你快速确定需要学习和使用的核心插件：

| 如果你需要... | 首选插件 | 可能的配合插件 |
|------------|---------|------------|
| 滚动触发的动画效果 | ScrollTrigger | ScrollSmoother |
| 平滑的滚动体验 | ScrollSmoother | ScrollTrigger |
| 元素之间的状态转换 | Flip | - |
| 列表重排序动画 | Flip | - |
| 网格布局变化动画 | Flip | - |
| 字符/单词/行级文字动画 | SplitText | ScrollTrigger |
| 创意文字入场效果 | SplitText | - |
| 交错文字动画序列 | SplitText | - |

## 核心插件概览

### ScrollTrigger - 滚动动画的革命

ScrollTrigger是GSAP生态系统中最受欢迎的插件，它彻底改变了基于滚动的动画创建方式。

**主要功能**：
- 精确控制动画与滚动位置的关系
- 创建视差滚动效果
- 锁定元素(pin)跟随滚动
- 横向滚动动画
- 滚动捕捉(snap)功能
- 丰富的事件回调系统

**适用场景**：
- 产品展示网站
- 故事叙事型页面
- 作品集网站
- 长页面内容展示
- 交互式数据可视化

[深入了解ScrollTrigger →](./scrolltrigger/)

### ScrollSmoother - 丝滑滚动体验

ScrollSmoother基于ScrollTrigger构建，专注于提供流畅、自然的滚动体验，解决原生滚动的生硬感。

**主要功能**：
- 创建平滑的滚动过渡
- 自定义滚动速度和缓动效果
- 控制不同元素的滚动速率
- 与ScrollTrigger无缝集成
- 针对触摸设备优化

**适用场景**：
- 高端品牌网站
- 沉浸式体验设计
- 创意作品集
- 需要精细滚动控制的场景

[深入了解ScrollSmoother →](./scrollsmoother.md)

### Flip - 布局状态魔术师

Flip插件基于FLIP技术(First, Last, Invert, Play)，使复杂的布局变化动画变得简单而高效。

**主要功能**：
- 平滑过渡不同布局状态
- 列表项重排序动画
- 网格布局变换
- 元素位置和尺寸变化
- DOM结构变化的动画过渡

**适用场景**：
- 响应式布局变化
- 过滤和排序界面
- 模态框过渡
- 列表与网格视图切换
- 购物车添加/删除商品动画

[深入了解Flip →](./flip.md)

### SplitText - 文字动画专家

SplitText为文字动画提供专业级解决方案，通过智能拆分文本创建精细的动画控制。

**主要功能**：
- 将文本拆分为字符、单词或行
- 保持原始文本布局和样式
- 创建交错动画序列
- 自动响应式调整
- 复杂文本动画的简化实现

**适用场景**：
- 标题动画效果
- 逐字逐行显示内容
- 创意排版设计
- 故事叙述动画
- 文字特效展示

[深入了解SplitText →](./splittext.md)

## 插件协同工作

这些核心插件设计为可以无缝协作，创造更加强大的动画效果。以下是一些常见的组合场景：

::: tip ScrollTrigger + SplitText
结合这两个插件可以创建随着滚动逐渐显示的文字动画，非常适合故事叙事型网站。
```js
// 示例：滚动触发的文字动画
const splitText = new SplitText(".heading", { type: "chars, words" });
  
gsap.from(splitText.chars, {
  scrollTrigger: {
    trigger: ".heading",
    start: "top 80%",
    end: "top 20%",
    scrub: true
  },
  opacity: 0,
  y: 100,
  stagger: 0.05
});
```
:::

::: tip ScrollSmoother + Flip
这种组合可以在平滑滚动的同时处理元素布局变化，创造流畅的用户体验。
```js
// 示例：平滑滚动中的布局变化
const smoother = ScrollSmoother.create({
  smooth: 1,
  effects: true
});

// 当需要改变布局时
const state = Flip.getState(".card");
// 改变DOM结构
Flip.from(state, {
  duration: 1,
  ease: "power1.inOut",
  stagger: 0.05
});
```
:::

## 如何选择合适的插件

选择合适的插件取决于你要实现的具体动画效果和交互需求：

1. **先确定核心需求** - 你最主要想解决的问题是什么？
   - 滚动相关动画？→ ScrollTrigger
   - 布局变化动画？→ Flip
   - 文字特效？→ SplitText
   - 平滑滚动体验？→ ScrollSmoother

2. **考虑性能因素** - 在移动设备或低配设备上：
   - ScrollSmoother可能需要谨慎使用
   - SplitText拆分大量文本会增加DOM元素数量
   - 复杂的Flip动画可能需要优化

3. **学习曲线** - 从最容易掌握到较复杂：
   - SplitText (概念简单，API直观)
   - ScrollSmoother (基于ScrollTrigger，配置较少)
   - ScrollTrigger (功能全面但配置项较多)
   - Flip (概念需要时间理解)

## 总结与下一步

这些核心插件共同构成了GSAP动画系统的强大扩展，从滚动交互、布局变化到文字动画，几乎涵盖了现代网站和应用中所有常见的高级动画需求。

建议先深入学习与你当前项目最相关的插件，掌握其基本概念和用法后，再探索其他插件，逐步构建你的GSAP动画技能库。

<style>
.core-plugins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.plugin-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.plugin-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
  background: linear-gradient(to bottom right, var(--vp-c-bg-soft), var(--vp-c-bg));
}

.plugin-card:hover .plugin-icon {
  box-shadow: 0 0 15px var(--vp-c-brand-light);
}

.plugin-card:hover .plugin-icon::before {
  transform: scale(1.2);
}

.plugin-card:hover .plugin-icon.scrolltrigger::before {
  animation: scroll 1.5s infinite alternate;
}

.plugin-card:hover .plugin-icon.scrollsmoother::before {
  animation: wave 1.5s infinite ease-in-out;
}

.plugin-card:hover .plugin-icon.flip::before {
  animation: rotate 1.5s infinite cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.plugin-card:hover .plugin-icon.splittext::before {
  animation: cut 1.2s infinite ease-in-out;
}

.plugin-icon {
  height: 60px;
  margin: 0 auto 15px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, var(--vp-c-brand-light), var(--vp-c-brand-dark));
  font-size: 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid var(--vp-c-brand-light);
}

.plugin-icon::before {
  position: absolute;
  transition: all 0.4s ease;
}

.plugin-icon.scrolltrigger {
  background: radial-gradient(circle, #ffeaa7, #fdcb6e);
}

.plugin-icon.scrollsmoother {
  background: radial-gradient(circle, #81ecec, #00cec9);
}

.plugin-icon.flip {
  background: radial-gradient(circle, #a29bfe, #6c5ce7);
}

.plugin-icon.splittext {
  background: radial-gradient(circle, #fab1a0, #e17055);
}

.plugin-icon.scrolltrigger::before {
  content: "📜";
  animation: scroll 3s infinite alternate;
}

.plugin-icon.scrollsmoother::before {
  content: "🌊";
  animation: wave 3s infinite ease-in-out;
}

.plugin-icon.flip::before {
  content: "🔄";
  animation: rotate 3s infinite cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.plugin-icon.splittext::before {
  content: "✂️";
  animation: cut 2.5s infinite ease-in-out;
}

@keyframes scroll {
  0% { transform: translateY(-10px); }
  100% { transform: translateY(10px); }
}

@keyframes wave {
  0% { transform: translateX(-8px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateX(8px); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes cut {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(0.8) scaleY(1.2); }
  100% { transform: scaleX(1); }
}

.plugin-card h3 {
  margin: 10px 0;
  font-size: 18px;
}

.plugin-card p {
  margin: 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.plugin-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 15px;
}

.plugin-tags span {
  background: var(--vp-c-bg-mute);
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

table {
  width: 100%;
  margin: 20px 0;
}

th {
  text-align: left;
  padding: 10px;
  background: var(--vp-c-bg-soft);
}

td {
  padding: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}
</style> 