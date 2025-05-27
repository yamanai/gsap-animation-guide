# GSAP 入门指南

> **学习目标**：了解 GSAP 的基本概念、优势及引入方式，能够独立完成第一个动画。

欢迎来到 GSAP 的世界！本章将帮助你了解 GSAP 的基本概念，并引导你轻松上手这个强大的 JavaScript 动画库。

## 什么是 GSAP？

**GSAP**（GreenSock Animation Platform）是一个专业级的 JavaScript 动画库，它让开发者能够轻松创建流畅、高性能的网页动画。无论是简单的 UI 元素动效，还是复杂的交互体验，GSAP 都能帮你实现。

<div class="features-container">
  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <div class="feature-content">
      <h3>高性能</h3>
      <p>经过优化的动画引擎，即使在复杂动画场景下也能保持流畅的 60fps 性能</p>
    </div>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🧩</div>
    <div class="feature-content">
      <h3>灵活易用</h3>
      <p>简洁的 API 设计，让你用最少的代码实现强大的动画效果</p>
    </div>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🌐</div>
    <div class="feature-content">
      <h3>兼容性好</h3>
      <p>解决各种浏览器兼容性问题，让你专注创意而非调试</p>
    </div>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🔄</div>
    <div class="feature-content">
      <h3>精确控制</h3>
      <p>对动画的每个方面都有细粒度控制，包括时间轴、缓动、状态等</p>
    </div>
  </div>
</div>

## 为什么选择 GSAP？

在众多动画解决方案中，GSAP 有哪些独特优势？

- **简单直观** —— GSAP 的 API 设计直观易懂，即使你是动画新手也能快速上手
- **功能全面** —— 从基础动画到复杂的时间轴序列，GSAP 都能轻松实现
- **不受框架限制** —— 可以在任何 JavaScript 环境中使用，包括原生 JS、React、Vue 等
- **专业级性能** —— 优化的动画引擎让复杂动画也能保持流畅
- **活跃的社区** —— 丰富的教程资源和活跃的开发者社区提供持续支持

:::tip
推荐优先使用 transform、opacity 等属性进行动画，性能更优。更多性能建议详见 [动画属性详解](./properties.html) 。
:::

## 快速开始：在项目中引入 GSAP

GSAP 提供了多种引入方式，适合不同的项目需求。让我们从最简单的开始：

### 方法一：通过 CDN 引入

最简单的方式是通过 CDN 直接在 HTML 文件中引入 GSAP：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>GSAP 快速开始</title>
</head>
<body>
  <!-- 创建一个元素用于动画 -->
  <div class="box"></div>

  <!-- 引入 GSAP -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js"></script>
  
  <!-- 编写动画代码 -->
  <script>
    // 创建一个简单的动画
    gsap.to(".box", {
      x: 100,                // 向右移动 100px
      rotation: 360,         // 旋转 360 度
      backgroundColor: "purple", // 背景色变为紫色
      duration: 2            // 动画持续 2 秒
    });
  </script>
  
  <style>
    .box {
      width: 100px;
      height: 100px;
      background-color: teal;
      margin: 100px;
    }
  </style>
</body>
</html>
```

### 方法二：通过 npm 安装（现代项目推荐）

在现代前端项目中，通过包管理器安装是更常见的方式：

```bash
# 使用 npm 安装
npm install gsap

# 或使用 yarn 安装
yarn add gsap
```

然后在你的 JavaScript 文件中导入：

```javascript
// 导入 GSAP 核心库
import gsap from 'gsap';

// 现在你可以使用 GSAP 了
gsap.to(".box", { x: 100, duration: 1 });
```

:::info
如需了解更多引入方式和兼容性问题，可参考 [GSAP 官方文档](https://greensock.com/docs/) 。
:::

## 你的第一个 GSAP 动画

让我们创建一个简单的动画来感受 GSAP 的魅力。下面是一个基础示例，展示了一个方块从左向右移动，同时旋转并改变颜色：

<div class="gsap-demo">
  <div class="demo-container">
    <div class="demo-box" id="firstDemo"></div>
    <div class="demo-controls">
      <button class="demo-button" id="playFirstDemo">播放</button>
      <button class="demo-button" id="resetFirstDemo">重置</button>
    </div>
  </div>
  
  <div class="code-preview">
    <pre><code>// 创建一个简单的动画
gsap.to("#firstDemo", {
  x: 200,                // 向右移动 200px
  rotation: 360,         // 旋转 360 度
  backgroundColor: "#8A2BE2", // 背景色变为紫色
  duration: 2,           // 动画持续 2 秒
  ease: "power1.inOut"   // 缓动函数
});</code></pre>
  </div>
</div>

### 代码解析

让我们来分解这个简单动画的各个部分：

1. `gsap.to()` —— GSAP 的核心方法之一，用于创建从当前状态到目标状态的动画
2. `"#firstDemo"` —— 目标元素的选择器（这里是一个 ID 选择器）
3. 动画配置对象：
   - `x: 200` —— 水平方向移动 200 像素
   - `rotation: 360` —— 旋转 360 度（一整圈）
   - `backgroundColor: "#8A2BE2"` —— 背景色变为紫色
   - `duration: 2` —— 动画持续 2 秒
   - `ease: "power1.inOut"` —— 缓动函数，控制动画速度的变化

:::info
推荐在实际项目中将动画参数集中管理，避免硬编码，提升可维护性。详见 [动画开发最佳实践](../cursorrules.md#动画开发最佳实践) 。
:::

## GSAP 核心概念预览

在进一步学习之前，让我们快速了解 GSAP 的一些核心概念：

### 1. 动画方法

GSAP 提供了几个基本的动画方法：

```javascript
// 从当前状态到目标状态的动画
gsap.to(".element", { x: 100 });

// 从指定状态到当前状态的动画
gsap.from(".element", { opacity: 0 });

// 从指定起始状态到指定结束状态的动画
gsap.fromTo(".element", 
  { x: -100, opacity: 0 },  // 起始状态
  { x: 100, opacity: 1 }    // 结束状态
);

// 立即设置属性（无动画）
gsap.set(".element", { x: 100 });
```

### 2. 时间轴

时间轴（Timeline）是 GSAP 最强大的功能之一，它允许你轻松创建和控制复杂的动画序列：

```javascript
// 创建时间轴
const tl = gsap.timeline();

// 添加动画到时间轴
tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 }, "-=0.5") // 与前一个动画重叠 0.5 秒
  .fromTo(".box3", 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 }
  );
```

### 3. 控制动画

GSAP 提供了丰富的控制选项：

```javascript
// 创建一个动画并保存引用
const myAnimation = gsap.to(".box", { 
  x: 100, 
  duration: 2,
  paused: true  // 创建后暂停
});

// 控制动画
myAnimation.play();    // 播放
myAnimation.pause();   // 暂停
myAnimation.reverse(); // 反向播放
myAnimation.restart(); // 重新开始
myAnimation.seek(1);   // 跳到特定时间点
```

## 交互式练习：尝试修改动画

现在，让我们动手实践！下面是一个互动编辑器，你可以修改代码并即时看到效果：

<GsapEditor 
  title="修改这个简单动画"
  :initialHtml="`<div class='animation-target'></div>`"
  :initialCss="`.animation-target {
  width: 120px;
  height: 120px;
  background-color: #42b883;
  margin: 100px auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`"
  :initialJs="`// 试试修改这些值
gsap.to('.animation-target', {
  x: 150,
  y: 50,
  rotation: 180,
  backgroundColor: '#ff6b6b',
  duration: 2,
  ease: 'back.out(1.7)'
});`"
/>

:::tip
你可以尝试：
- 改变 `x` 和 `y` 的值，观察位置变化
- 修改 `duration` 值，让动画变快或变慢
- 尝试不同的 `ease` 值，如 `"bounce.out"` 、 `"elastic.out"` 、 `"steps(5)"`
- 添加 `scale` 属性，使元素在动画过程中缩放
- 添加 `opacity` 属性，制作淡入淡出效果
:::

:::tip 互动学习提示
这是一个完全可交互的编辑器。尝试修改代码并点击"运行"按钮，观察动画效果的变化。这种动手实践是掌握GSAP最有效的方法之一。

**成功标准**: 当你能够独立修改多个属性并预测动画效果时，就说明你已经初步理解了基本概念。
:::

:::warning 常见问题
如果动画没有按预期执行，请检查:
- 选择器是否正确 (`.animation-target`)
- 属性值是否有效 (例如，颜色值必须是有效格式)
- 是否有语法错误 (如缺少逗号或括号)
:::

## 练习挑战

尝试完成以下简单挑战，巩固所学知识:

1. 修改上面的动画，让元素旋转720度并在动画结束时变为半透明
2. 添加一个`scale`属性，使元素先放大再恢复原大小
3. 使用`yoyo: true`和`repeat: 1`让动画来回执行一次

## 下一步

恭喜你完成了 GSAP 的基本入门！现在你已经了解了：

- GSAP 的基本概念和优势
- 如何在项目中引入 GSAP
- 创建简单动画的方法
- GSAP 的核心概念预览

接下来，我们将深入学习 [动画基础要素](./animation-basics.html) ，详细了解创建动画所需的各个组成部分。

<style>
.gsap-demo {
  margin: 30px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.demo-container {
  position: relative;
  height: 150px;
  margin-bottom: 20px;
}

.demo-box {
  width: 80px;
  height: 80px;
  background-color: #42b883;
  border-radius: 4px;
  position: absolute;
  top: 35px;
  left: 30px;
}

.demo-controls {
  position: absolute;
  bottom: 0;
  right: 0;
}

.demo-button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.demo-button:hover {
  background: var(--vp-c-brand-dark);
}

.code-preview {
  background: #2d2d2d;
  border-radius: 6px;
  padding: 15px;
  overflow: auto;
}

.code-preview pre {
  margin: 0;
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
      if (typeof gsap !== 'undefined') {
        const firstDemo = document.getElementById('firstDemo')
        const playFirstDemo = document.getElementById('playFirstDemo')
        const resetFirstDemo = document.getElementById('resetFirstDemo')
        
        if (firstDemo && playFirstDemo && resetFirstDemo) {
          // 创建动画但不自动播放
          const demoAnim = gsap.to(firstDemo, {
            x: 200,
            rotation: 360,
            backgroundColor: "#8A2BE2",
            duration: 2,
            ease: "power1.inOut",
            paused: true
          })
          
          // 播放按钮点击事件
          playFirstDemo.addEventListener('click', () => {
            demoAnim.restart()
          })
          
          // 重置按钮点击事件
          resetFirstDemo.addEventListener('click', () => {
            gsap.set(firstDemo, { 
              clearProps: "all" 
            })
          })
        }
      }
    })
  }
}
</script> 