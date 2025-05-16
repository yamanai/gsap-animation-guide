# GSAP简介与环境搭建

## 什么是GSAP？

GSAP (GreenSock Animation Platform) 是一个专业级的JavaScript动画库，由GreenSock团队开发维护。它提供了一套强大、灵活的工具，让开发者能够轻松创建从简单到复杂的各种网页动画效果。无论是基础的UI元素动画，还是复杂的交互体验，GSAP都能优雅高效地实现。

<div class="gsap-feature-box">
  <div class="feature">
    <div class="icon">⚡</div>
    <div class="title">超高性能</div>
    <div class="desc">经过优化的动画引擎，提供比CSS动画和其他库更流畅的60fps动画体验</div>
  </div>
  <div class="feature">
    <div class="icon">🌐</div>
    <div class="title">跨浏览器兼容</div>
    <div class="desc">解决各种浏览器兼容性问题，让你专注于创意而不是调试</div>
  </div>
  <div class="feature">
    <div class="icon">🧩</div>
    <div class="title">模块化设计</div>
    <div class="desc">核心模块轻量高效，插件系统按需扩展功能</div>
  </div>
</div>

## GSAP的历史与发展

GSAP的历史可以追溯到Flash时代。当时，GreenSock团队开发了ActionScript版的动画平台，广受欢迎。随着Flash的衰落和HTML5的兴起，GreenSock将这套成熟的动画系统移植到了JavaScript平台，就此诞生了GSAP。

从初代版本到如今的GSAP 3，它经历了多次重大更新：

- **2013年**: GSAP 1.0发布，替代了早期的TweenLite和TweenMax
- **2019年**: GSAP 3.0发布，带来了彻底重新设计的API和更高性能
- **2023年**: 最新的GSAP 3.13.0进一步优化并增强了功能集

如今，GSAP已成为行业标准，被Apple、Google、Microsoft、Spotify等公司的网站采用，也是众多创意网站的首选动画解决方案。

## 与其他动画库的对比

为什么选择GSAP而不是其他流行的动画解决方案？让我们看看它与几个主要竞争对手的对比：

| 特性 | GSAP | CSS动画 | Anime.js | Motion One |
|------|------|---------|---------|------------|
| 性能 | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| 灵活性 | ★★★★★ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ |
| 学习曲线 | 中等 | 简单 | 简单 | 中等 |
| 社区支持 | 极强 | 极强 | 一般 | 较新 |
| 功能丰富度 | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ |
| 文件大小 | ~120KB(全部) / ~34KB(核心) | 0KB(内置) | ~16KB | ~12KB |

虽然GSAP核心库比某些替代品稍大，但它提供了无与伦比的功能集和性能优势，特别是在复杂动画场景中。

## 安装与引入方式

GSAP提供多种安装和引入方法，适用于不同的项目需求：

### 方法一：通过CDN引入

最简单的方式是通过CDN直接在HTML文件中引入GSAP：

```html
<!-- 基础版本 - 只包含核心功能 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>

<!-- 全功能版本 - 包含所有插件 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/all.min.js"></script>
```

如果只需要特定插件，可以单独引入：

```html
<!-- 核心 + ScrollTrigger插件 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```

### 方法二：通过包管理器安装

在现代前端工程化项目中，推荐使用npm或yarn安装GSAP：

```bash
# 使用npm
npm install gsap

# 使用yarn
yarn add gsap
```

然后在你的项目中引入：

```javascript
// 引入核心库
import gsap from 'gsap';

// 引入插件(如ScrollTrigger)
import ScrollTrigger from 'gsap/ScrollTrigger';

// 注册插件
gsap.registerPlugin(ScrollTrigger);
```

## 你的第一个GSAP动画

让我们创建一个简单的动画来感受GSAP的魅力。这个例子会让一个方块在2秒内向右移动200像素并旋转360度：

<div class="gsap-demo">
  <div class="demo-container">
    <div class="box" id="firstBox"></div>
    <div class="controls">
      <button class="play-btn">播放</button>
      <button class="reset-btn">重置</button>
    </div>
  </div>
  
  ```javascript
  // 选择目标元素
  const box = document.querySelector("#firstBox");
  
  // 创建动画
  gsap.to(box, {
    duration: 2,
    x: 200,
    rotation: 360,
    backgroundColor: "#42b883",
    ease: "power2.inOut"
  });
  ```
</div>

### 代码解析

1. `gsap.to()` - GSAP的核心方法之一，用于将元素从当前状态动画到指定的目标状态
2. 第一个参数 - 目标元素，可以是DOM元素、选择器字符串或元素数组
3. 第二个参数 - 配置对象，包含:
   - `duration`: 动画持续时间(秒)
   - `x`: X轴位移(像素)
   - `rotation`: 旋转角度(度)
   - `backgroundColor`: 背景颜色
   - `ease`: 缓动函数，控制动画的速度变化

## 交互式练习：尝试修改动画

现在，让我们动手实践！下面是一个交互式代码编辑器，你可以修改代码并立即看到效果。尝试调整参数，添加新的属性，或者完全重写动画：

<GsapEditor 
  title="编辑并运行你的第一个GSAP动画"
  :initialJs="`// 尝试修改这段代码
gsap.to('.animation-target', {
  duration: 1,
  x: 150,
  rotation: 360,
  backgroundColor: '#42b883',
  ease: 'power2.inOut'
});`"
/>

### 你可以尝试的修改：

1. 改变`duration`值，使动画变快或变慢
2. 替换`ease`值，尝试不同的缓动函数，如`"bounce.out"`、`"elastic.inOut"`或`"steps(5)"`
3. 添加`y`属性，使元素在垂直方向也移动
4. 添加`scale`属性，使元素在动画过程中缩放
5. 使用`delay`属性延迟动画开始的时间

## 浏览器兼容性

GSAP支持所有现代浏览器以及IE11：

- Chrome
- Firefox
- Safari
- Edge
- Opera
- IE11 (需要使用polyfills支持ES6特性)

这意味着你可以安心使用GSAP，无需担心跨浏览器兼容性问题。GSAP内部处理了各种浏览器差异，提供一致的动画体验。

## 许可证说明

GSAP采用双重许可模式：

1. **标准许可证** - 免费用于大多数项目，包括商业使用
2. **商业许可证** ("Club GreenSock") - 提供额外高级插件和商业项目特权

使用标准许可证时，你可以自由使用GSAP核心库和部分免费插件。但某些高级插件(如MorphSVG、DrawSVG)需要商业许可证。详细的许可说明请参考[GreenSock官方许可页面](https://greensock.com/licensing/)。

## 准备好进一步探索了吗？

现在你已经了解了GSAP的基础知识，并创建了第一个动画。接下来，我们将深入学习[GSAP的核心动画方法](./core-methods.html)，包括`to()`、`from()`、`fromTo()`和`set()`等，以及如何利用这些方法创建更复杂的动画效果。

<style>
.gsap-feature-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.feature {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--shadow-1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-2);
}

.feature .icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.feature .title {
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-brand);
}

.feature .desc {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.gsap-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
  box-shadow: var(--shadow-1);
}

.demo-container {
  background: white;
  border-radius: 6px;
  height: 150px;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.box {
  width: 50px;
  height: 50px;
  background: #ff6b6b;
  border-radius: 4px;
  position: absolute;
  top: 50px;
  left: 20px;
}

.controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.controls button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.controls button:hover {
  background: var(--vp-c-brand-dark);
}

.controls .reset-btn {
  background: #6c757d;
}

.controls .reset-btn:hover {
  background: #5a6268;
}

.code-container {
  background: #2d2d2d;
  border-radius: 6px;
  padding: 15px;
  overflow: auto;
}

.code-container code {
  color: #e6e6e6;
  font-family: monospace;
  line-height: 1.5;
}
</style>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      if (typeof gsap !== 'undefined') {
        const box = document.querySelector("#firstBox");
        const playBtn = document.querySelector(".play-btn");
        const resetBtn = document.querySelector(".reset-btn");
        
        if (box && playBtn && resetBtn) {
          playBtn.addEventListener('click', () => {
            gsap.to(box, {
              duration: 2,
              x: 200,
              rotation: 360,
              backgroundColor: "#42b883",
              ease: "power2.inOut"
            });
          });
          
          resetBtn.addEventListener('click', () => {
            gsap.to(box, {
              duration: 0.5,
              x: 0,
              rotation: 0,
              backgroundColor: "#ff6b6b",
              ease: "power1.out"
            });
          });
        }
      }
    });
  }
}
</script> 