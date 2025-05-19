---
layout: home
title: GSAP 动画开发指南
description: 学习如何在纯JavaScript、Vue3和React中使用GSAP创建专业级动画效果
hero:
  name: GSAP 动画
  text: 开发指南
  tagline: 掌握最新版GSAP (3.13.0+) 在各种前端环境中的应用技巧
  image:
    src: /logo.svg
    alt: GSAP 动画开发指南
  actions:
    - theme: brand
      text: 开始学习
      link: /basics/
    - theme: alt
      text: 在线练习
      link: /playground/
    - theme: alt
      text: 查看示例
      link: /examples/
    - theme: alt
      text: GitHub仓库
      link: https://github.com/yourusername/gsap-guide
features:
  - icon: 🚀
    title: 原生JavaScript基础
    details: 从零开始学习GSAP核心概念，掌握无框架环境下的动画开发技巧。
  - icon: ⚡
    title: Vue3深度集成
    details: 结合Vue3组合式API和选项式API，创建响应式动画效果和可复用动画组件。
  - icon: ⚛️
    title: React实战应用
    details: 在React组件和hooks中应用GSAP，解决React特有的动画开发挑战。
  - icon: 🎨
    title: 交互式学习系统
    details: 通过内嵌代码编辑器即学即练，每个知识点都配有可直接编辑运行的示例。
  - icon: 🏗️
    title: 渐进式项目开发
    details: 跟随教程构建完整动画项目，将零散知识点串联成实用技能。
  - icon: 🔥
    title: 高级动画技术
    details: 深入学习ScrollTrigger、MotionPath等高级插件，创建专业级动画效果。
  - icon: ⚙️
    title: 性能优化指南
    details: 掌握动画性能优化技巧，确保动画在各种设备上流畅运行。
  - icon: 📚
    title: 真实项目案例
    details: 分析基于GSAP构建的商业项目，学习专业动画开发的最佳实践。
---

<div class="hero-bg-elements">
  <div class="circle circle-1"></div>
  <div class="circle circle-2"></div>
  <div class="circle circle-3"></div>
  <div class="square"></div>
  <div class="triangle"></div>
</div>

<style>
.hero-bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 640px;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  top: 10%;
  left: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--gsap-green), transparent 70%);
  animation: float 20s infinite ease-in-out;
}

.circle-2 {
  bottom: 5%;
  right: 10%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--gsap-purple), transparent 70%);
  animation: float 15s infinite ease-in-out reverse;
}

.circle-3 {
  top: 40%;
  right: 25%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--gsap-blue), transparent 70%);
  animation: float 12s infinite ease-in-out 2s;
}

.square {
  position: absolute;
  bottom: 20%;
  left: 15%;
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, var(--gsap-yellow), transparent);
  opacity: 0.1;
  transform: rotate(30deg);
  animation: rotate 25s infinite linear;
}

.triangle {
  position: absolute;
  top: 25%;
  right: 15%;
  width: 0;
  height: 0;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 140px solid rgba(255, 120, 73, 0.1);
  animation: float 18s infinite ease-in-out 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .circle-1 {
    width: 200px;
    height: 200px;
  }
  
  .circle-2, .square {
    width: 100px;
    height: 100px;
  }
  
  .triangle {
    border-left-width: 40px;
    border-right-width: 40px;
    border-bottom-width: 70px;
  }
}
</style>

<div class="frameworks-badges">
  <div class="badge">
    <span class="version">GSAP 3.13.0+</span>
  </div>
  <div class="badge">
    <span class="framework">JavaScript</span>
  </div>
  <div class="badge">
    <span class="framework">Vue 3</span>
  </div>
  <div class="badge">
    <span class="framework">React</span>
  </div>
</div>

<style>
.frameworks-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 2rem auto;
  max-width: 600px;
}

.badge {
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  box-shadow: var(--shadow-1);
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2);
}

.version {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.framework {
  font-weight: 600;
}

@media (max-width: 768px) {
  .frameworks-badges {
    gap: 8px;
  }
  
  .badge {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>
