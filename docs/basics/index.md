# GSAP 基础篇

GSAP (GreenSock Animation Platform) 是一个强大的JavaScript动画库，为网页开发者提供了简单而灵活的API来创建各种精彩的动画效果。在这个基础篇中，我们将从零开始学习GSAP的核心概念和基本用法，不依赖任何前端框架，纯粹使用原生JavaScript。

## 学习路径

本篇内容按照由浅入深的顺序组织，即使你是动画开发的新手，也能轻松跟上：

1. [GSAP简介与环境搭建](./introduction.html) - 了解GSAP的历史、特性以及如何在项目中使用它
2. [核心动画方法](./core-methods.html) - 掌握创建动画的基本方法
3. [选择器与DOM操作](./selectors.md) - 学习如何选择和动画多个元素
4. [时间控制](./timing.md) - 控制动画的持续时间、延迟和重复
5. [缓动函数](./easing.md) - 使用不同的缓动函数让动画更自然
6. [回调函数与事件](./callbacks.md) - 在动画的不同阶段执行代码
7. [时间轴](./timeline.md) - 创建和控制复杂的动画序列

## 交互式学习

每个章节都配备了可以直接编辑和运行的代码示例，帮助你即学即练：

<GsapEditor 
  title="GSAP基础动画示例"
  :initialJs="`// 尝试修改这段代码
gsap.to('.animation-target', { 
  duration: 1, 
  x: 100, 
  rotation: 360, 
  backgroundColor: '#42b883' 
});`"
/>

## 为什么选择GSAP？

GSAP比其他动画解决方案有很多优势：

- **性能优化** - GSAP经过精心优化，即使在动画复杂的情况下也能保持高帧率
- **浏览器兼容性** - 处理了各种浏览器不一致性，让你专注于创作
- **灵活强大** - 可以动画几乎任何属性，不仅限于CSS属性
- **精确控制** - 对动画的每一个方面都有细粒度控制
- **丰富的生态系统** - 通过插件扩展功能，满足高级需求

准备好开始GSAP之旅了吗？让我们[从基础开始](./introduction.html)！

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