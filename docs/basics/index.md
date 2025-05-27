# GSAP 基础篇

本章将带你从0到1掌握GSAP动画库的核心概念和基础用法，为后续的进阶学习打下坚实基础。

## 章节概览

### [前端动画基础概念](/basics/animation-fundamentals)

在学习GSAP之前，我们首先了解前端动画的基本原理、实现方式和设计原则，帮助你建立对动画的整体认知：

- 动画的基本原理与历史演进
- 各种前端动画实现方式对比(CSS/JS/SVG/Canvas/WebGL)
- 动画与用户体验的关系
- 动画设计原则与最佳实践
- 为什么选择GSAP作为动画解决方案

### [GSAP入门指南](./introduction.html) - 了解GSAP的基本概念、特性及引入方式

GSAP (GreenSock Animation Platform) 是业界领先的 JavaScript 动画库，为网页开发者提供简单而灵活的 API 来创建各种精彩的动画效果。本基础篇将从零开始，带你循序渐进地掌握GSAP的核心能力，所有内容均以原生JavaScript为主，兼顾实用性与可扩展性。

## 学习路径

本篇内容按照由浅入深的顺序组织，确保知识点之间平滑过渡，即使你是动画开发新手，也能轻松理解和掌握：

1. [动画基础要素](./animation-basics.html) - 掌握动画的四大核心要素（目标、属性、时间、缓动）
2. [核心动画方法](./core-methods.html) - 学习GSAP的基本动画方法（to、from、fromTo、set）
3. [动画属性详解](./properties.html) - 详细了解可动画的各种属性及其应用场景
4. [选择器与对象操作](./selectors.html) - 学习如何高效选择和操作多个元素
5. [时间控制](./timing.html) - 掌握动画的持续时间、延迟、重复等时间控制属性
6. [缓动函数](./easing.html) - 使用不同缓动函数让动画更加自然流畅
7. [回调函数与事件](./callbacks.html) - 在动画不同阶段执行自定义逻辑
8. [时间轴](./timeline.html) - 掌握时间轴的概念和用法，轻松实现多阶段动画
9. [综合案例实战](./practical-examples.html) - 通过实际案例综合运用所学知识

:::tip
建议按照顺序逐章学习，每一章都配有可交互代码和动手练习，帮助你边学边练。
:::

## 交互式学习体验

每个章节都配备了可直接编辑和运行的代码示例，帮助你即学即练：

<GsapEditor 
  title="GSAP 基础动画示例"
  :initialJs="`// 尝试修改这段代码
gsap.to('.animation-target', { 
  duration: 1, 
  x: 100, 
  rotation: 360, 
  backgroundColor: '#42b883' 
});`"
/>

:::info
遇到不懂的参数或 API，可随时查阅 [动画属性详解](./properties.html) 和 [核心动画方法](./core-methods.html) 。
:::

## 为什么选择 GSAP？

- **性能优化**：GSAP 经过深度优化，即使动画复杂也能保持高帧率
- **浏览器兼容性**：自动处理主流浏览器不一致性，让你专注创作
- **灵活强大**：支持几乎所有属性动画，不仅限于CSS属性
- **精确控制**：对动画每一方面都有细粒度控制
- **丰富生态**：通过插件扩展功能，满足高级需求

:::tip
GSAP 不仅适用于简单动画，更能胜任复杂交互和多阶段动画开发，是专业动画开发的首选工具。
:::

## 进阶阅读
- [GSAP 官方文档](https://greensock.com/docs/)
- [GSAP 插件与扩展](https://greensock.com/plugins/)
- [常见问题与排查](../resources/faq.md)

准备好开始 GSAP 之旅了吗？让我们[从入门开始](./introduction.html)！

<style>
.gsap-example-teaser {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: var(--shadow-1);
}

.demo-box {
  background: white;
  border-radius: 6px;
  height: 150px;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
}

.demo-element {
  width: 50px;
  height: 50px;
  background: #ff6b6b;
  border-radius: 4px;
  position: absolute;
  top: 50px;
  left: 20px;
}

.play-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.code-preview {
  background: #2d2d2d;
  border-radius: 6px;
  padding: 15px;
  overflow: auto;
}

.code-preview code {
  color: #e6e6e6;
  font-family: monospace;
}
</style>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      const playButton = document.querySelector('.play-button')
      const demoElement = document.querySelector('.demo-element')
      
      if (playButton && demoElement && typeof gsap !== 'undefined') {
        playButton.addEventListener('click', () => {
          // 重置元素位置
          gsap.set(demoElement, { x: 0, rotation: 0, backgroundColor: "#ff6b6b" })
          
          // 运行动画
          gsap.to(demoElement, { 
            duration: 1, 
            x: 100, 
            rotation: 360, 
            backgroundColor: "#42b883" 
          })
        })
      }
    })
  }
}
</script> 