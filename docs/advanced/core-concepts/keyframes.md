# 关键帧动画设计与使用策略

关键帧动画是GSAP中创建复杂动画序列的强大工具，允许你在单个补间动画中定义多个状态变化点，从而创建更丰富、更流畅的视觉效果。掌握关键帧技术，能让你的动画代码更简洁、更高效。

:::tip 核心要点
GSAP的关键帧系统让你可以在**一个补间动画**中定义**多个状态变化**，而不需要创建多个独立的补间或复杂的时间轴。
:::

## 关键帧动画机制解析

<div class="concept-visual">
  <div class="keyframe-track">
    <div class="keyframe-point start">开始状态</div>
    <div class="keyframe-point" style="left:33%">关键帧1</div>
    <div class="keyframe-point" style="left:66%">关键帧2</div>
    <div class="keyframe-point end">结束状态</div>
    <div class="keyframe-segment" style="left:0; width:33%;">
      <div class="segment-props">x: 0→100, y: 0→0</div>
      <div class="segment-duration">duration: 1s</div>
      <div class="segment-ease">ease: power2.out</div>
    </div>
    <div class="keyframe-segment" style="left:33%; width:33%;">
      <div class="segment-props">x: 100→100, y: 0→50</div>
      <div class="segment-duration">duration: 0.5s</div>
      <div class="segment-ease">ease: bounce.out</div>
    </div>
    <div class="keyframe-segment" style="left:66%; width:34%;">
      <div class="segment-props">x: 100→0, y: 50→0</div>
      <div class="segment-duration">duration: 1s</div>
      <div class="segment-ease">ease: elastic.out</div>
    </div>
  </div>
</div>

关键帧动画的核心理念是在一个动画对象中定义多个状态点（关键帧），每个关键帧可以有：

- 不同的属性值（如位置、大小、颜色等）
- 独立的持续时间（duration）
- 特定的缓动函数（ease）
- 可选的延迟（delay）

GSAP会自动计算这些关键帧之间的过渡，创建一个连贯的动画流程。

## 创建关键帧动画的不同方法

GSAP提供了多种方式来定义关键帧动画，每种方法各有优势：

<div class="methods-comparison">
  <div class="method-card">
    <div class="method-title">对象数组方式</div>
    <div class="method-desc">使用数组定义一系列顺序执行的关键帧，每个关键帧都是一个对象</div>
    <div class="method-code">
    ```js
    gsap.to(".box", {
      keyframes: [
        { x: 100, duration: 1, ease: "power2.out" },
        { y: 50, duration: 0.5, ease: "bounce.out" },
        { rotation: 360, duration: 1, ease: "elastic.out" }
      ]
    });
    ```
    </div>
    <div class="method-note">优势：可以为每个关键帧设置不同的属性和参数</div>
  </div>

  <div class="method-card">
    <div class="method-title">对象属性方式</div>
    <div class="method-desc">使用对象定义各属性的变化数组，所有属性共享相同的时间分布</div>
    <div class="method-code">
    ```js
    gsap.to(".box", {
      keyframes: {
        x: [0, 100, 50, 0],
        y: [0, 0, 50, 0],
        rotation: [0, 90, 180, 0],
        duration: 2,
        ease: "none"
      }
    });
    ```
    </div>
    <div class="method-note">优势：更简洁，适合多属性同步变化的场景</div>
  </div>

  <div class="method-card">
    <div class="method-title">百分比标记方式</div>
    <div class="method-desc">使用CSS关键帧动画风格的百分比标记来定义状态</div>
    <div class="method-code">
    ```js
    gsap.to(".box", {
      keyframes: {
        "0%": { x: 0, y: 0, backgroundColor: "red" },
        "25%": { x: 100, y: 0, backgroundColor: "blue" },
        "75%": { x: 100, y: 100, backgroundColor: "green" },
        "100%": { x: 0, y: 0, backgroundColor: "red" }
      },
      duration: 3
    });
    ```
    </div>
    <div class="method-note">优势：直观控制时间分布，类似CSS @keyframes</div>
  </div>
</div>

:::warning 注意事项
关键帧数组中的每个关键帧都是**相对于前一个关键帧的终点**开始的，而不是从动画的初始状态开始。
:::

## 关键帧的高级控制技巧

### 精确控制时间分布

可以通过不同的方式控制关键帧之间的时间分布：

```js
// 方法1：为每个关键帧设置不同的持续时间
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 1 },        // 第一段：1秒
    { y: 50, duration: 0.5 },       // 第二段：0.5秒
    { rotation: 360, duration: 1.5 } // 第三段：1.5秒
  ]
});

// 方法2：使用delay在同一时间点开始多个属性变化
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 1 },
    { y: 50, duration: 0.5, delay: 0.2 }, // 延迟0.2秒后开始
    { rotation: 360, duration: 1 }
  ]
});

// 方法3：使用百分比精确控制时间点
gsap.to(".box", {
  keyframes: {
    "0%": { x: 0, y: 0 },
    "30%": { x: 100, y: 0 },  // 动画30%处
    "60%": { x: 100, y: 50 },  // 动画60%处
    "100%": { x: 0, y: 0 }    // 动画结束
  },
  duration: 3
});
```

### 使用不同缓动函数增强视觉效果

为每个关键帧设置不同的缓动函数，可以创造更加丰富的动画效果：

```js
gsap.to(".element", {
  keyframes: [
    { x: 100, duration: 1, ease: "power2.out" },  // 缓出效果
    { y: 50, duration: 0.5, ease: "bounce.out" }, // 弹跳效果
    { rotation: 360, scale: 1.5, duration: 1, ease: "elastic.out(1, 0.3)" } // 弹性效果
  ]
});
```

## 直观理解关键帧动画

<GsapEditor
  title="关键帧动画演示"
  initialHtml="<div class='container'>
  <div class='box'>关键帧动画</div>
  <div class='controls'>
    <button id='play-btn'>播放</button>
    <button id='reset-btn'>重置</button>
  </div>
</div>"
  initialCss=".container {
  position: relative;
  height: 250px;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
}
.box {
  width: 100px;
  height: 60px;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: absolute;
  left: 20px;
  top: 100px;
}
.controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
button {
  background: #2980b9;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}"
  initialJs="// 创建关键帧动画
const tl = gsap.timeline({paused: true});
tl.to('.box', {
  keyframes: [
    {x: 100, y: -50, rotation: 0, backgroundColor: '#e74c3c', duration: 0.8},
    {x: 200, y: 0, rotation: 180, backgroundColor: '#2ecc71', duration: 0.6},
    {x: 100, y: 50, rotation: 360, backgroundColor: '#f39c12', duration: 0.8},
    {x: 0, y: 0, rotation: 0, backgroundColor: '#3498db', duration: 1, ease: 'bounce.out'}
  ]
});
// 按钮控制
document.getElementById('play-btn').addEventListener('click', () => tl.restart());
document.getElementById('reset-btn').addEventListener('click', () => {
  tl.pause();
  gsap.set('.box', {x: 0, y: 0, rotation: 0, backgroundColor: '#3498db'});
});"
/>

## 关键帧动画的应用场景与实例

### 场景1：创建复杂的运动路径

关键帧特别适合创建沿着特定路径移动的动画：

```js
// 创建一个方形路径运动
gsap.to(".box", {
  keyframes: [
    { x: 200, y: 0, duration: 1 },    // 向右
    { x: 200, y: 200, duration: 1 },  // 向下
    { x: 0, y: 200, duration: 1 },    // 向左
    { x: 0, y: 0, duration: 1 }       // 向上
  ],
  ease: "none",  // 整体使用线性缓动使路径更均匀
  repeat: -1     // 无限循环
});
```

### 场景2：多属性协同变化创建复杂过渡

当需要多个属性同时变化并创建复杂的视觉效果时：

```js
// 创建加载动画
gsap.to(".loading-indicator", {
  keyframes: {
    "0%": { scale: 1, opacity: 1, borderRadius: "0%" },
    "25%": { scale: 1.5, opacity: 0.8, borderRadius: "25%" },
    "50%": { scale: 1, opacity: 0.6, borderRadius: "50%" },
    "75%": { scale: 0.5, opacity: 0.8, borderRadius: "25%" },
    "100%": { scale: 1, opacity: 1, borderRadius: "0%" }
  },
  duration: 2,
  repeat: -1,
  ease: "sine.inOut"
});
```

### 场景3：UI元素状态变化

使用关键帧创建按钮悬停效果：

```js
// 创建鼠标悬停按钮效果
const button = document.querySelector(".fancy-button");

// 创建悬停动画
const hoverAnim = gsap.to(button, {
  keyframes: [
    { scale: 1.1, boxShadow: "0 5px 15px rgba(0,0,0,0.2)", duration: 0.3 },
    { y: -3, duration: 0.2 }
  ],
  paused: true // 创建后不立即播放
});

// 监听鼠标事件
button.addEventListener("mouseenter", () => hoverAnim.play());
button.addEventListener("mouseleave", () => hoverAnim.reverse());
```

### 场景4：字符动画效果

使用关键帧创建文字动画：

```js
// 文字弹跳效果
gsap.utils.toArray(".animated-text span").forEach((span, i) => {
  gsap.to(span, {
    keyframes: [
      { y: -20, scale: 1.2, color: "#ff4d4d", duration: 0.2 },
      { y: 0, scale: 1, color: "#000000", duration: 0.3, ease: "bounce.out" }
    ],
    delay: i * 0.1, // 字符间的延迟
    repeat: -1,     // 无限重复
    repeatDelay: 5  // 重复前等待5秒
  });
});
```

## 与时间轴结合使用

关键帧动画可以无缝集成到GSAP时间轴中，为复杂动画序列提供更多控制：

```js
const tl = gsap.timeline();

// 添加关键帧动画到时间轴
tl.to(".element1", {
  keyframes: [
    { x: 100, duration: 1 },
    { y: 50, duration: 0.5 },
    { rotation: 360, duration: 1 }
  ]
})
.to(".element2", { opacity: 0, duration: 0.5 }, "<1") // 在第一个动画开始1秒后开始
.to(".element3", {
  keyframes: {
    x: [0, 50, 0, -50, 0],
    y: [0, 30, 60, 30, 0],
    duration: 2,
    ease: "sine.inOut"
  }
}, "-=0.5"); // 比前一个动画提前0.5秒开始
```

## 常见问题与解决方案

### 🔴 问题：关键帧动画属性不一致

关键帧之间更改的属性不一致，导致某些属性突然"跳跃"。

```js
// 问题代码
gsap.to(".element", {
  keyframes: [
    { x: 100, y: 0, duration: 1 },
    { y: 50, rotation: 45, duration: 1 }, // x属性缺失，将保持100
    { x: 0, duration: 1 }                 // y和rotation属性缺失
  ]
});
```

### ✅ 解决方案：保持属性一致性

在每个关键帧中明确设置所有你想控制的属性：

```js
// 解决方案
gsap.to(".element", {
  keyframes: [
    { x: 100, y: 0, rotation: 0, duration: 1 },
    { x: 100, y: 50, rotation: 45, duration: 1 },
    { x: 0, y: 0, rotation: 0, duration: 1 }
  ]
});
```

### 🔴 问题：动画节奏不符合预期

关键帧动画的整体节奏不符合预期，特别是在使用对象属性方式时。

```js
// 问题代码
gsap.to(".element", {
  keyframes: {
    x: [0, 100, 200, 0],
    y: [0, 50, 100, 0],
    // 缺少控制时间分布的参数
    duration: 2
  }
});
```

### ✅ 解决方案：使用百分比或times参数

使用百分比标记或times参数控制每个关键帧的时间分布：

```js
// 解决方案1：使用百分比
gsap.to(".element", {
  keyframes: {
    "0%": { x: 0, y: 0 },
    "20%": { x: 100, y: 50 },  // 在动画20%时
    "80%": { x: 200, y: 100 }, // 在动画80%时
    "100%": { x: 0, y: 0 },
    duration: 2
  }
});

// 解决方案2：使用times参数
gsap.to(".element", {
  keyframes: {
    x: [0, 100, 200, 0],
    y: [0, 50, 100, 0],
    times: [0, 0.2, 0.8, 1], // 控制每个值的时间点
    duration: 2
  }
});
```

:::info 性能优化提示
关键帧动画通常比多个独立的补间动画性能更好，但过多或过于复杂的关键帧可能导致性能问题。保持关键帧数量合理，避免在同一个关键帧中修改过多属性。
:::

## 最佳实践

<div class="best-practices">
  <div class="practice-item">
    <div class="practice-icon">⚖️</div>
    <div class="practice-content">
      <h4>选择合适的关键帧方式</h4>
      <p>对于简单的属性变化序列，使用对象数组方式；对于需要精确控制时间分布的复杂动画，考虑使用百分比标记方式。</p>
    </div>
  </div>
  
  <div class="practice-item">
    <div class="practice-icon">🔄</div>
    <div class="practice-content">
      <h4>保持属性一致性</h4>
      <p>尽量在每个关键帧中设置相同的属性集，避免属性突然出现或消失导致的跳跃效果。对于不需要变化的属性，保持其值不变。</p>
    </div>
  </div>
  
  <div class="practice-item">
    <div class="practice-icon">⏱️</div>
    <div class="practice-content">
      <h4>适度使用独立缓动</h4>
      <p>虽然可以为每个关键帧设置不同的缓动函数，但这可能导致动画不连贯。对于需要流畅过渡的情况，考虑使用相同或互补的缓动函数。</p>
    </div>
  </div>
  
  <div class="practice-item">
    <div class="practice-icon">🔍</div>
    <div class="practice-content">
      <h4>使用调试工具</h4>
      <p>GSDevTools是调试关键帧动画的利器，可以帮助你可视化动画时间线并精确调整每个关键帧。</p>
    </div>
  </div>
  
  <div class="practice-item">
    <div class="practice-icon">📏</div>
    <div class="practice-content">
      <h4>权衡与时间轴的使用</h4>
      <p>虽然关键帧动画强大，但对于非常复杂的多元素协同动画，时间轴可能更合适。关键帧最适合单个元素的复杂状态变化。</p>
    </div>
  </div>
</div>

## 动画类型选择指南

<div class="decision-guide">
  <h4>何时使用关键帧动画 vs. 时间轴</h4>
  <div class="guide-table">
    <table>
      <thead>
        <tr>
          <th>场景</th>
          <th>关键帧动画</th>
          <th>时间轴</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>单个元素的复杂变化</td>
          <td><span class="recommend">✓ 推荐</span></td>
          <td><span class="neutral">可行</span></td>
        </tr>
        <tr>
          <td>多个元素精确同步</td>
          <td><span class="not-recommend">不推荐</span></td>
          <td><span class="recommend">✓ 推荐</span></td>
        </tr>
        <tr>
          <td>需要中途修改动画</td>
          <td><span class="not-recommend">较难</span></td>
          <td><span class="recommend">✓ 容易</span></td>
        </tr>
        <tr>
          <td>沿路径移动</td>
          <td><span class="recommend">✓ 适合</span></td>
          <td><span class="neutral">可行</span></td>
        </tr>
        <tr>
          <td>循环动画</td>
          <td><span class="recommend">✓ 高效</span></td>
          <td><span class="neutral">可行</span></td>
        </tr>
        <tr>
          <td>代码简洁性</td>
          <td><span class="recommend">✓ 更简洁</span></td>
          <td><span class="not-recommend">更冗长</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## 小结

关键帧动画是GSAP中一个强大而灵活的功能，能够帮助你创建复杂而流畅的动画序列，同时保持代码的简洁性和可维护性。通过掌握不同的关键帧定义方式和控制技巧，你可以为你的项目创建更加专业、引人入胜的动画效果。

关键要点：
- 关键帧动画允许在单个补间中定义多个状态变化
- 有多种方式定义关键帧：对象数组、对象属性和百分比标记
- 每个关键帧可以有独立的持续时间、缓动函数和延迟
- 适合创建复杂路径动画、多属性协同变化和循环动画
- 可以与时间轴无缝集成，打造更复杂的动画序列

掌握关键帧动画技术，将使你的GSAP动画能力更上一层楼，能够以更少的代码实现更复杂的动画效果。

<style>
/* 概念可视化样式 */
.concept-visual {
  margin: 30px 0;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.keyframe-track {
  height: 180px;
  background: #2c3e50;
  border-radius: 4px;
  position: relative;
  margin-top: 10px;
  overflow: hidden;
}

.keyframe-point {
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  background: #f1c40f;
  color: #2c3e50;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;
}

.keyframe-point.start {
  left: 0;
  transform: translateX(0);
}

.keyframe-point.end {
  right: 0;
  left: auto;
  transform: translateX(0);
}

.keyframe-segment {
  position: absolute;
  height: 120px;
  background: rgba(52, 152, 219, 0.7);
  border-radius: 4px;
  top: 50px;
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.segment-props, .segment-duration, .segment-ease {
  margin: 5px 0;
  text-align: center;
  width: 100%;
}

.segment-props {
  font-weight: bold;
}

/* 方法比较卡片 */
.methods-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.method-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s, box-shadow 0.2s;
}

.method-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.method-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-brand-dark);
  font-size: 16px;
}

.method-desc {
  font-size: 14px;
  margin-bottom: 15px;
  color: var(--vp-c-text-1);
}

.method-code {
  margin-bottom: 15px;
}

.method-note {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

/* 问题与解决方案 */
.problem-solution {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 25px 0;
}

@media (max-width: 768px) {
  .problem-solution {
    grid-template-columns: 1fr;
  }
}

.problem, .solution {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.problem {
  border-left: 4px solid #e74c3c;
}

.solution {
  border-left: 4px solid #2ecc71;
}

.problem h4, .solution h4 {
  margin-top: 0;
}

/* 最佳实践 */
.best-practices {
  margin: 30px 0;
}

.practice-item {
  display: flex;
  margin-bottom: 20px;
}

.practice-icon {
  font-size: 24px;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.practice-content {
  flex: 1;
}

.practice-content h4 {
  margin: 0 0 10px 0;
}

.practice-content p {
  margin: 0;
  color: var(--vp-c-text-2);
}

/* 决策指南表格 */
.decision-guide {
  margin: 30px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.guide-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.guide-table th, .guide-table td {
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.guide-table th {
  background: var(--vp-c-bg-mute);
  font-weight: bold;
}

.recommend {
  color: #2ecc71;
  font-weight: bold;
}

.not-recommend {
  color: #e74c3c;
}

.neutral {
  color: #f39c12;
}
</style> 