# 动画基础要素

动画由多个基本要素组成，理解这些要素对创建出色的网页动画至关重要。本章将详细介绍 GSAP 动画的基本构成要素，为你打下坚实的基础。

## 动画的四大核心要素

一个完整的动画通常包含以下四个核心要素：

<div class="element-grid">
  <div class="element-card">
    <div class="element-icon">🎯</div>
    <h3>目标元素</h3>
    <p>要进行动画的对象，可以是 DOM 元素、CSS 选择器、对象、数组等</p>
  </div>
  <div class="element-card">
    <div class="element-icon">✨</div>
    <h3>变化属性</h3>
    <p>动画过程中将要改变的属性，如位置、大小、颜色、透明度等</p>
  </div>
  <div class="element-card">
    <div class="element-icon">⏱️</div>
    <h3>时间参数</h3>
    <p>控制动画时长、延迟、重复等时间相关的参数</p>
  </div>
  <div class="element-card">
    <div class="element-icon">📊</div>
    <h3>缓动函数</h3>
    <p>控制动画的速度变化，使其更加自然流畅</p>
  </div>
</div>

## 基本动画结构

GSAP 动画的基本结构如下：

```javascript
gsap.to(目标元素, {
  // 要变化的属性
  x: 100,
  opacity: 0.5,
  
  // 时间参数
  duration: 1,     // 动画持续时间（秒）
  delay: 0.2,      // 动画开始前的延迟
  
  // 缓动函数
  ease: "power2.out",
  
  // 其他控制参数
  repeat: 2,         // 重复次数
  onComplete: function() { console.log("动画完成") }  // 完成回调
});
```

现在，让我们逐一详细了解这些要素。

## 目标元素

目标元素是指你想要进行动画操作的对象。GSAP 非常灵活，可以接受多种类型的目标：

### CSS 选择器

最常用的方式是使用 CSS 选择器字符串：

```javascript
// 选择所有具有 .box 类的元素
gsap.to(".box", { x: 100 });

// 选择 ID 为 hero 的元素
gsap.to("#hero", { scale: 1.2 });

// 使用复杂的 CSS 选择器
gsap.to("section > div.container", { opacity: 0.5 });
```

### DOM 元素

你也可以直接传递 DOM 元素或元素集合：

```javascript
// 单个元素
const myElement = document.getElementById("myBox");
gsap.to(myElement, { rotation: 360 });

// 元素集合
const boxes = document.querySelectorAll(".box");
gsap.to(boxes, { backgroundColor: "#42b883" });
```

### 数组

可以传递元素数组或对象数组：

```javascript
// 元素数组
const elements = [document.querySelector(".box1"), document.querySelector(".box2")];
gsap.to(elements, { y: 50 });
```

### 对象

还可以对普通 JavaScript 对象的属性进行动画：

```javascript
// 对象动画
const obj = { count: 0, opacity: 0 };
gsap.to(obj, { 
  count: 100,
  opacity: 1,
  onUpdate: () => console.log(obj.count, obj.opacity)
});
```

## 变化属性

GSAP 可以为几乎任何数值属性创建动画。这些属性可分为以下几类：

### 位置和变换属性

这些是最常用的动画属性：

```javascript
gsap.to(".box", {
  x: 100,          // 水平移动 100px (使用 transform: translateX)
  y: 50,           // 垂直移动 50px (使用 transform: translateY)
  rotation: 45,    // 旋转 45 度
  scale: 1.5,      // 缩放到原来的 1.5 倍
  skewX: 20,       // X 轴倾斜 20 度
});
```

### 尺寸属性

```javascript
gsap.to(".box", {
  width: "80%",      // 宽度变为 80%
  height: 300,       // 高度变为 300px
  padding: 20,       // 内边距变为 20px
  margin: "10px 20px", // 外边距变化
});
```

### 视觉样式属性

```javascript
gsap.to(".box", {
  opacity: 0.7,                  // 透明度变为 0.7
  backgroundColor: "#42b883",    // 背景色变化
  color: "#333",                 // 文字颜色变化
  borderRadius: 10,              // 边框圆角变为 10px
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)", // 阴影变化
});
```

### 特殊动画属性

```javascript
gsap.to(".text", {
  // 文本内容数字变化
  innerText: i => `计数: ${Math.round(i * 100)}`,
  modifiers: {
    innerText: text => text // 用于处理文本变化的修饰符
  }
});
```

## 时间参数

时间参数控制动画的持续时间、延迟和执行方式：

```javascript
gsap.to(".box", {
  x: 100,
  duration: 2,       // 动画持续 2 秒
  delay: 0.5,        // 延迟 0.5 秒后开始
  repeat: 3,         // 重复 3 次（总共执行 4 次）
  repeatDelay: 0.2,  // 每次重复之间延迟 0.2 秒
  yoyo: true,        // 反向播放动画（配合 repeat 使用）
  stagger: 0.1,      // 当有多个目标时，每个目标之间的错开时间
});
```

## 缓动函数

缓动函数控制动画的速度变化，使动画更加生动自然：

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power2.out"    // 使用预设的缓动函数
});
```

GSAP 提供了多种预设的缓动函数：

- **线性**: `"none"` - 匀速移动
- **缓入**: `"power1.in"`, `"power2.in"`, `"power3.in"` - 开始慢，之后快
- **缓出**: `"power1.out"`, `"power2.out"`, `"power3.out"` - 开始快，之后慢
- **缓入缓出**: `"power1.inOut"`, `"power2.inOut"` - 开始慢，中间快，结束慢
- **特殊效果**: `"elastic.out"`, `"bounce.out"`, `"back.out"` - 弹性、弹跳、回弹效果

<div class="ease-demo-container">
  <div class="ease-demo">
    <div class="ease-track">
      <div class="ease-ball ease-linear" id="linear-ball"></div>
    </div>
    <div class="ease-label">线性 (none)</div>
  </div>
  <div class="ease-demo">
    <div class="ease-track">
      <div class="ease-ball ease-out" id="out-ball"></div>
    </div>
    <div class="ease-label">缓出 (power2.out)</div>
  </div>
  <div class="ease-demo">
    <div class="ease-track">
      <div class="ease-ball ease-bounce" id="bounce-ball"></div>
    </div>
    <div class="ease-label">弹跳 (bounce.out)</div>
  </div>
</div>

<button class="play-easing">播放缓动动画</button>

## 组合使用

将这些要素组合使用，我们就能创建各种令人惊叹的动画效果：

<GsapEditor 
  title="组合使用动画要素"
  :initialJs="`// 获取所有目标元素
const boxes = document.querySelectorAll('.animation-target');
// 创建动画，综合运用各种要素
gsap.to(boxes, {
  x: 100,
  rotation: 45,
  backgroundColor: '#8A2BE2',
  duration: 1.5,
  ease: 'back.out(1.7)',
  stagger: 0.2,
  opacity: 0.7,
  repeat: 1,
  yoyo: true
});`"
/>

## 小练习：创建你的第一个综合动画

尝试使用以下代码框架创建一个包含多个动画要素的效果：

<GsapEditor 
  title="动画要素练习"
  :initialJs="`// 在这里编写你的动画代码
// 目标元素: .animation-target
// 尝试添加不同的属性、时间参数和缓动函数
gsap.to('.animation-target', {
  // 这里添加你的动画属性和参数
});`"
/>

## 下一步

掌握了动画的基本要素，你已经能够创建简单的动画效果了。接下来，我们将深入学习 GSAP 的[核心动画方法](./core-methods.html)，掌握 `to()`、`from()`、`fromTo()` 和 `set()` 等方法的使用技巧。

<style>
.element-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.element-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.element-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.element-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.ease-demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
}

.ease-demo {
  flex: 1;
  min-width: 200px;
}

.ease-track {
  height: 40px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.ease-ball {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px;
}

.ease-linear {
  background-color: #ff6b6b;
}

.ease-out {
  background-color: #42b883;
}

.ease-bounce {
  background-color: #4a7aff;
}

.ease-label {
  text-align: center;
  margin-top: 5px;
  font-size: 0.9rem;
}

.play-easing {
  display: block;
  margin: 20px auto;
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.play-easing:hover {
  background: var(--vp-c-brand-dark);
}
</style>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      const playButton = document.querySelector('.play-easing')
      const linearBall = document.querySelector('#linear-ball')
      const outBall = document.querySelector('#out-ball')
      const bounceBall = document.querySelector('#bounce-ball')
      
      if (playButton && linearBall && outBall && bounceBall && typeof gsap !== 'undefined') {
        // 重置所有小球位置
        const resetBalls = () => {
          gsap.set([linearBall, outBall, bounceBall], { left: 5 })
        }
        
        // 初始重置
        resetBalls()
        
        // 播放动画
        playButton.addEventListener('click', () => {
          // 重置小球位置
          resetBalls()
          
          // 为每个小球设置不同的缓动动画
          gsap.to(linearBall, { 
            left: 'calc(100% - 35px)', 
            duration: 2, 
            ease: "none"
          })
          
          gsap.to(outBall, { 
            left: 'calc(100% - 35px)', 
            duration: 2, 
            ease: "power2.out"
          })
          
          gsap.to(bounceBall, { 
            left: 'calc(100% - 35px)', 
            duration: 2, 
            ease: "bounce.out"
          })
        })
      }
    })
  }
}
</script> 