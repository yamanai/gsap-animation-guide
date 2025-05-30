---
title: ScrollSmoother插件
editLink: true
outline: deep
---

# ScrollSmoother插件

ScrollSmoother是GSAP官方推出的平滑滚动插件，它可以为网页添加流畅的滚动体验，消除传统滚动的生硬感。本文档详细介绍如何使用ScrollSmoother创建流畅的滚动效果，以及如何解决使用过程中可能遇到的常见问题。

<script setup>
// 使用相对路径导入
import { BasicExample } from '../../../../modules/animations/plugins/core/scrollsmoother'
</script>

## 快速导航

- [基本概念与工作原理](./basic-concepts.md) - 了解ScrollSmoother如何工作
- [安装与设置](./installation.md) - 快速开始使用ScrollSmoother
- [基础配置选项](./configuration.md) - 掌握核心配置参数
- [常见应用场景](./common-use-cases.md) - 典型的使用示例
- [与ScrollTrigger结合使用](./scrolltrigger-integration.md) - 创建更强大的滚动交互
- [高级功能与技巧](./advanced-features.md) - 探索高级功能
- [性能优化](./performance.md) - 优化滚动性能
- [常见问题解决](./troubleshooting.md) - 排查常见问题
- [最佳实践](./best-practices.md) - 专业技巧与建议

## 什么是ScrollSmoother？

::: tip 核心功能
ScrollSmoother通过创建虚拟滚动层，实现丝滑的滚动效果，同时保持与原生滚动完全一致的行为。
:::

ScrollSmoother是GSAP生态系统中的一款强大插件，专为创建丝般顺滑的网页滚动体验而设计。它通过独特的双层结构和精确的动画计算，实现了流畅的滚动效果，同时保持了与原生滚动完全一致的行为。

与市场上其他平滑滚动解决方案相比，ScrollSmoother具有以下优势：

- **与GSAP生态系统完美集成**，特别是与ScrollTrigger无缝协作
- **性能优化**，确保在各种设备上都能流畅运行
- **高度可定制**，提供丰富的API和配置选项
- **处理复杂场景**，如水平滚动、视差效果等
- **兼容性强**，支持现代浏览器和触摸设备

## 快速开始

::: warning 必要结构
ScrollSmoother要求特定的HTML结构 - 一个wrapper元素包含一个content元素。这对正确运行至关重要。
:::

最简单的ScrollSmoother实现只需三步：

```html
<!-- 1. 创建必要的HTML结构 -->
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- 页面内容放这里 -->
  </div>
</div>

<script>
  // 2. 注册必要的插件
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
  // 3. 初始化ScrollSmoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,  // 滚动平滑度
    effects: true // 启用视差效果
  });
</script>
```

了解更多详情，请继续浏览各个章节的详细文档。

## 交互式示例

<!-- 替换动态组件为静态HTML -->
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
  <h3>ScrollSmoother 基础示例</h3>
  <p>此处应有交互式示例。由于技术限制，目前替换为静态内容。</p>
  <div style="background-color: #edf2ff; padding: 15px; border-radius: 6px;">
    <pre style="margin: 0; font-family: monospace;">
// 基础ScrollSmoother设置
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});</pre>
  </div>
</div>

## 版本与兼容性

ScrollSmoother需要GSAP 3.11.0或更高版本，并且依赖于ScrollTrigger插件。它支持所有主流现代浏览器，包括移动设备。

::: info 浏览器兼容性
| 浏览器 | 最低版本要求 | 性能表现 |
|-------|------------|---------|
| Chrome | 60+ | 极佳 |
| Firefox | 70+ | 良好 |
| Safari | 12+ | 良好 |
| Edge | 80+ | 良好 |
| iOS Safari | 12+ | 良好 |
| Android Chrome | 80+ | 良好 |
:::

## 资源链接

- [官方演示](https://greensock.com/scrollsmoother/)
- [GSAP官方文档](https://greensock.com/docs/)
- [ScrollTrigger文档](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP论坛](https://greensock.com/forums/)
- [ScrollSmoother GitHub问题](https://github.com/greensock/GSAP/issues) 