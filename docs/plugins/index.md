---
title: GSAP插件篇
editLink: true
outline: deep
---

# GSAP插件篇

GSAP的插件系统极大地扩展了其核心功能，使你能够轻松创建各种复杂、引人入胜的动画效果。通过插件，你可以实现滚动触发动画、路径动画、拖拽交互、文字特效等高级功能，而无需编写大量复杂代码。

## 本篇包含内容

<div class="plugins-overview-grid">
  <div class="plugin-section-card">
    <div class="plugin-section-icon basics"></div>
    <h3>[插件系统基础](./basics.md)</h3>
    <p>了解GSAP插件的工作原理和使用方法，包括插件注册、加载方式、基本用法等基础知识，为后续学习各类插件打下坚实基础。</p>
  </div>
  
  <div class="plugin-section-card">
    <div class="plugin-section-icon core"></div>
    <h3>[核心重点插件](./core/)</h3>
    <p>深入学习GSAP最重要的四大核心插件：ScrollTrigger（滚动触发动画）、ScrollSmoother（平滑滚动效果）、Flip（布局状态转换）和SplitText（文本分割动画）。</p>
  </div>
  
  <div class="plugin-section-card">
    <div class="plugin-section-icon common"></div>
    <h3>[常用辅助插件](./common/)</h3>
    <p>掌握一系列常用的辅助类插件，包括DrawSVG（SVG线条绘制动画）、MotionPath（路径动画）、Draggable（拖拽交互）和MorphSVG（SVG形状变形）。</p>
  </div>
  
  <div class="plugin-section-card">
    <div class="plugin-section-icon others"></div>
    <h3>[其他实用插件](./others/)</h3>
    <p>探索更多专业领域的插件工具，如用于文本动画的TextPlugin，用于Canvas动画的PixiPlugin和EaselPlugin，以及用于创建特殊效果的RoughEase和CustomBounce等。</p>
  </div>
  
  <div class="plugin-section-card">
    <div class="plugin-section-icon combinations"></div>
    <h3>[插件组合应用](./combinations.md)</h3>
    <p>学习如何组合多个插件创造复杂的动画效果，例如结合ScrollTrigger和SplitText创建滚动触发的文字动画，或结合Flip和Draggable实现可排序列表。</p>
  </div>
</div>

## 学习建议

- 建议先掌握GSAP核心库的基础知识，再探索插件功能
- 优先学习ScrollTrigger插件，它是现代网站中最常用的GSAP扩展
- 根据项目需求选择合适的插件进行深入学习
- 先掌握单个插件的基本用法，再尝试组合多个插件创造复杂效果

## 相关资源

- [GSAP官方插件文档](https://gsap.com/docs/v3/Plugins/)
- [GSAP插件示例合集](https://gsap.com/resources/demos-tutorials/)
- [GSAP官方插件资源](https://gsap.com/resources/)

<style>
.plugins-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 40px 0;
}

.plugin-section-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.plugin-section-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
  background: linear-gradient(to bottom right, var(--vp-c-bg-soft), var(--vp-c-bg));
}

.plugin-section-card h3 {
  margin: 15px 0 10px;
  font-size: 18px;
}

.plugin-section-card p {
  margin: 10px 0;
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.plugin-section-icon {
  height: 70px;
  width: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid var(--vp-c-brand-light);
}

.plugin-section-icon::before {
  position: absolute;
  transition: all 0.4s ease;
}

.plugin-section-card:hover .plugin-section-icon {
  box-shadow: 0 0 15px var(--vp-c-brand-light);
}

.plugin-section-card:hover .plugin-section-icon::before {
  transform: scale(1.2);
}

.plugin-section-icon.basics {
  background: radial-gradient(circle, #fdcb6e, #e17055);
}

.plugin-section-icon.basics::before {
  content: "🧩";
  animation: pulse 3s infinite alternate;
}

.plugin-section-icon.core {
  background: radial-gradient(circle, #74b9ff, #0984e3);
}

.plugin-section-icon.core::before {
  content: "⭐";
  animation: spin 5s infinite linear;
}

.plugin-section-icon.common {
  background: radial-gradient(circle, #55efc4, #00b894);
}

.plugin-section-icon.common::before {
  content: "🛠️";
  animation: shake 3s infinite ease-in-out;
}

.plugin-section-icon.others {
  background: radial-gradient(circle, #a29bfe, #6c5ce7);
}

.plugin-section-icon.others::before {
  content: "🔍";
  animation: zoom 4s infinite alternate;
}

.plugin-section-icon.combinations {
  background: radial-gradient(circle, #ff7675, #d63031);
}

.plugin-section-icon.combinations::before {
  content: "🔗";
  animation: bounce 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px) rotate(-5deg); }
  75% { transform: translateX(5px) rotate(5deg); }
}

@keyframes zoom {
  0% { transform: scale(0.9) translateY(0); }
  50% { transform: scale(1.1) translateY(-5px); }
  100% { transform: scale(0.9) translateY(0); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style> 