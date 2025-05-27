# 处理冲突补间动画的策略

在复杂的动画项目中，当多个动画同时作用于同一元素的同一属性时，就会产生动画冲突。GSAP提供了强大的冲突管理机制，掌握这些机制对于创建顺畅、专业的动画至关重要。

:::tip 核心概念
动画冲突发生在**多个动画同时尝试控制相同元素的相同属性**时。GSAP提供了多种方式处理这些冲突，以确保动画按照预期运行。
:::

## 动画冲突可视化

<div class="concept-visual">
  <div class="timeline-view">
    <div class="timeline-labels">
      <div class="label">开始</div>
      <div class="label">1秒</div>
      <div class="label">2秒</div>
      <div class="label">3秒</div>
    </div>
    <div class="timeline-track">
      <div class="time-marker" style="left:0%">0s</div>
      <div class="time-marker" style="left:33%">1s</div>
      <div class="time-marker" style="left:66%">2s</div>
      <div class="time-marker" style="left:100%">3s</div>
      <div class="animation-row">
        <div class="anim-block first-anim" style="left:0%; width:66%;">
          <div class="anim-label">动画1: x → 200</div>
          <div class="duration">duration: 2s</div>
        </div>
        <div class="anim-block second-anim" style="left:33%; width:33%;">
          <div class="anim-label">动画2: x → -100</div>
          <div class="duration">duration: 1s</div>
          <div class="conflict-marker">冲突!</div>
        </div>
      </div>
      <div class="element-row">
        <div class="element-state" style="left:0%">初始位置</div>
        <div class="element-state" style="left:33%; opacity:0.5;">x = 100</div>
        <div class="element-state override" style="left:66%;">x = -100</div>
        <div class="element-path first-path"></div>
        <div class="element-path second-path"></div>
      </div>
    </div>
    <div class="visual-caption">
      没有冲突处理时，第二个动画会完全覆盖第一个动画的效果，导致不自然的运动路径
    </div>
  </div>
</div>

## 理解动画冲突

当两个或多个动画尝试同时控制同一元素的相同属性时，就会发生冲突。这种情况通常出现在：

- 多个独立的动画序列同时运行
- 用户交互中断了现有动画并触发新动画
- 多个事件处理程序触发了不同的动画

基本冲突示例：

```js
// 第一个动画
gsap.to(".box", { x: 200, duration: 2 });

// 一秒后启动第二个动画，控制相同元素的同一属性
setTimeout(() => {
  gsap.to(".box", { x: -100, duration: 1 });
}, 1000);

// 结果：第一个动画被中断，元素从当前位置移动到x: -100
```

## GSAP的冲突处理机制：overwrite参数

GSAP通过`overwrite`参数提供了灵活而强大的冲突管理选项：

<div class="options-comparison">
  <div class="option-card">
    <div class="option-title">false</div>
    <div class="option-desc">默认值</div>
    <div class="option-explain">不覆盖任何现有动画，动画将并行运行</div>
    <div class="option-code">
      <pre><code class="language-js">gsap.to(".element", { 
  x: 100, 
  duration: 1,
  // overwrite: false // 默认值，可省略
});</code></pre>
    </div>
    <div class="option-note">当多个动画控制相同属性时可能导致不可预测的结果</div>
  </div>
  <div class="option-card highlight">
    <div class="option-title">"auto"</div>
    <div class="option-desc">智能覆盖</div>
    <div class="option-explain">仅覆盖与新动画有冲突属性的现有动画</div>
    <div class="option-code">
      <pre><code class="language-js">gsap.to(".element", { 
  x: 100, 
  rotation: 45,
  duration: 1,
  overwrite: "auto"
});</code></pre>
    </div>
    <div class="option-note">最常用和推荐的设置，提供良好的平衡</div>
  </div>
  <div class="option-card">
    <div class="option-title">"all"</div>
    <div class="option-desc">全部覆盖</div>
    <div class="option-explain">覆盖目标元素的所有现有动画，即使属性不冲突</div>
    <div class="option-code">
      <pre><code class="language-js">gsap.to(".element", { 
  x: 100, 
  duration: 1,
  overwrite: "all"
});</code></pre>
    </div>
    <div class="option-note">慎用，会停止元素上的所有动画，包括不冲突的属性</div>
  </div>
  <div class="option-card">
    <div class="option-title">对象形式</div>
    <div class="option-desc">精确控制</div>
    <div class="option-explain">允许指定哪些特定属性应当覆盖现有动画</div>
    <div class="option-code">
      <pre><code class="language-js">gsap.to(".element", { 
  x: 100, 
  y: 50,
  rotation: 45,
  duration: 1,
  overwrite: {
    x: true,  // 只覆盖x属性
    // y和rotation不会覆盖现有动画
  }
});</code></pre>
    </div>
    <div class="option-note">最灵活的方式，适合复杂场景的精确控制</div>
  </div>
</div>

:::warning 重要提示
从GSAP 3开始，`overwrite`默认值从`"auto"`更改为`false`。这意味着默认情况下，GSAP不会自动处理冲突，这可能导致多个动画同时尝试控制同一属性。
:::

## 实际应用场景与解决方案

### 场景1：序列动画中的冲突

<div class="problem-solution">
  <div class="problem">
    <h4>🔴 问题</h4>
    <p>多个独立的动画作用于同一元素，导致意外的动画行为。</p>
    <pre><code>// 问题代码
// 对同一元素创建序列动画
gsap.to(".box", { x: 200, duration: 2 });
gsap.to(".box", { y: 100, duration: 1, delay: 1 }); // 不会冲突，控制不同属性
gsap.to(".box", { x: 0, duration: 1, delay: 2 });   // 会与第一个动画冲突</code></pre>
  </div>
  <div class="solution">
    <h4>✅ 解决方案</h4>
    <p>使用时间轴创建序列动画，时间轴会自动管理动画顺序和依赖关系。</p>
    <pre><code>// 解决方案：使用时间轴
const tl = gsap.timeline();
tl.to(".box", { x: 200, duration: 2 })
  .to(".box", { y: 100, duration: 1 })
  .to(".box", { x: 0, duration: 1 });</code></pre>
  </div>
</div>

### 场景2：用户交互中断现有动画

<div class="problem-solution">
  <div class="problem">
    <h4>🔴 问题</h4>
    <p>用户交互（如点击按钮）触发新动画，与正在进行的动画产生冲突。</p>
    <pre><code>// 问题代码
// 存储动画引用
const anim = gsap.to(".box", { x: 200, duration: 2 });
// 用户点击按钮，触发新动画
document.querySelector("button").addEventListener("click", () => {
  // 新动画将与现有动画冲突，导致不自然的跳跃
  gsap.to(".box", { x: 0, rotation: 180, duration: 1 });
});</code></pre>
  </div>
  <div class="solution">
    <h4>✅ 解决方案</h4>
    <p>使用<code>overwrite: "auto"</code>仅覆盖冲突的属性，或显式终止现有动画。</p>
    <pre><code>// 解决方案1：使用overwrite参数
document.querySelector("button").addEventListener("click", () => {
  gsap.to(".box", { 
    x: 0, 
    rotation: 180, 
    duration: 1,
    overwrite: "auto" // 只覆盖冲突的x属性，rotation不冲突所以不覆盖
  });
});
// 解决方案2：显式终止现有动画
document.querySelector("button").addEventListener("click", () => {
  anim.kill(); // 终止现有动画
  gsap.to(".box", { x: 0, rotation: 180, duration: 1 });
});</code></pre>
  </div>
</div>

### 场景3：多重事件触发的动画冲突

<div class="problem-solution">
  <div class="problem">
    <h4>🔴 问题</h4>
    <p>多个事件（如悬停和点击）同时触发不同动画，导致冲突和闪烁。</p>
    <pre><code>// 问题代码
// 鼠标悬停效果
elem.addEventListener("mouseenter", () => {
  gsap.to(elem, { scale: 1.2, duration: 0.3 });
});
elem.addEventListener("mouseleave", () => {
  gsap.to(elem, { scale: 1, duration: 0.3 });
});
// 点击动画与悬停动画冲突
elem.addEventListener("click", () => {
  gsap.to(elem, { rotation: 180, scale: 0.8, duration: 0.5 });
});</code></pre>
  </div>
  <div class="solution">
    <h4>✅ 解决方案</h4>
    <p>使用动画ID标记和选择性覆盖来管理不同类型的动画。</p>
    <pre><code>// 解决方案：使用ID和overwrite参数
// 鼠标悬停效果
elem.addEventListener("mouseenter", () => {
  gsap.to(elem, { 
    scale: 1.2, 
    duration: 0.3,
    id: "hover" // 为动画添加标识
  });
});
elem.addEventListener("mouseleave", () => {
  gsap.to(elem, { 
    scale: 1, 
    duration: 0.3,
    id: "hover" // 相同ID的动画会自动覆盖
  });
});
// 点击动画
elem.addEventListener("click", () => {
  gsap.to(elem, { 
    rotation: 180, 
    scale: 0.8, 
    duration: 0.5,
    overwrite: {
      scale: true, // 只覆盖scale属性
      rotation: true // 只覆盖rotation属性
    }
  });
});</code></pre>
  </div>
</div>

<!-- 添加清除浮动元素 -->
<div style="clear: both; height: 1px; margin: 0; padding: 0;"></div>

<div class="interactive-demo">
  <div class="demo-header">
    <h4>动画冲突处理演示</h4>
    <div class="demo-controls">
      <button class="demo-btn reset-btn">重置</button>
      <button class="demo-btn no-overwrite-btn">无覆盖</button>
      <button class="demo-btn auto-overwrite-btn">智能覆盖</button>
      <button class="demo-btn all-overwrite-btn">全部覆盖</button>
    </div>
  </div>
  <div class="demo-stage">
    <div class="demo-box">测试元素</div>
    <div class="demo-info">选择一个选项来观察不同覆盖策略的效果</div>
  </div>
</div>

## 高级冲突管理技巧

### 精确控制冲突属性

当你需要对动画冲突进行精细控制时，可以使用对象形式的`overwrite`参数：

```js
// 精确控制哪些属性会覆盖现有动画
gsap.to(".element", {
  x: 100, 
  y: 100, 
  rotation: 90,
  backgroundColor: "#ff0000",
  duration: 1,
  overwrite: {
    x: true,       // 覆盖x属性的现有动画
    y: true,       // 覆盖y属性的现有动画
    // rotation和backgroundColor不会覆盖现有动画
  }
});
```

### 使用killTweensOf手动管理动画

有时你可能需要更精确地控制哪些动画被终止：

```js
// 终止特定元素上特定属性的所有动画
gsap.killTweensOf(".box", "x,y"); // 只终止x和y属性的动画
gsap.killTweensOf(".box"); // 终止元素上的所有动画

// 终止后创建新动画
gsap.to(".box", { x: 100, y: 200, rotation: 360, duration: 1 });
```

### 创建简单的动画管理系统

对于复杂应用程序，创建一个动画管理系统可以帮助你更好地组织和控制动画：

```js
// 创建简单的动画管理系统
const AnimationManager = {
  animations: {},
  
  // 创建或更新动画
  animate(id, target, vars) {
    // 终止同ID的现有动画
    if (this.animations[id]) {
      this.animations[id].kill();
    }
    
    // 创建并存储新动画
    this.animations[id] = gsap.to(target, vars);
    return this.animations[id];
  },
  
  // 获取动画实例
  get(id) {
    return this.animations[id];
  },
  
  // 终止动画
  kill(id) {
    if (this.animations[id]) {
      this.animations[id].kill();
      delete this.animations[id];
    }
  },
  
  // 终止所有动画
  killAll() {
    for (const id in this.animations) {
      this.animations[id].kill();
    }
    this.animations = {};
  }
};

// 使用示例
AnimationManager.animate("moveBox", ".box", { x: 100, duration: 1 });
// 稍后覆盖相同ID的动画
AnimationManager.animate("moveBox", ".box", { x: 200, duration: 0.5 });
```

## 决策指南：选择正确的冲突处理策略

<div class="decision-guide">
  <table>
    <thead>
      <tr>
        <th>场景</th>
        <th>推荐策略</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>顺序动画序列</td>
        <td>使用Timeline</td>
        <td>时间轴自动管理动画顺序，避免冲突</td>
      </tr>
      <tr>
        <td>用户交互中断动画</td>
        <td>overwrite: "auto"</td>
        <td>智能覆盖冲突属性，保持平滑过渡</td>
      </tr>
      <tr>
        <td>完全替换现有动画</td>
        <td>overwrite: "all"</td>
        <td>终止元素上的所有动画，全新开始</td>
      </tr>
      <tr>
        <td>相同类型的重复动画</td>
        <td>使用ID标记</td>
        <td>相同ID的动画会自动覆盖，便于管理</td>
      </tr>
      <tr>
        <td>复杂多元素动画</td>
        <td>动画管理系统</td>
        <td>创建自定义管理系统，按逻辑分组控制</td>
      </tr>
      <tr>
        <td>精确控制特定属性</td>
        <td>对象形式overwrite</td>
        <td>最灵活，但需要更多代码和思考</td>
      </tr>
    </tbody>
  </table>
</div>

## 最佳实践

<div class="best-practices">
  <div class="practice-item">
    <div class="practice-icon">📊</div>
    <div class="practice-content">
      <h4>优先使用Timeline</h4>
      <p>对于预定义的动画序列，总是优先使用时间轴，它会自动处理内部动画的顺序和依赖关系。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🔍</div>
    <div class="practice-content">
      <h4>明确设置overwrite策略</h4>
      <p>不要依赖默认行为，明确设置<code>overwrite</code>参数，让动画行为更可预测，特别是在复杂应用中。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🏷️</div>
    <div class="practice-content">
      <h4>使用ID组织动画</h4>
      <p>为相关动画分配相同的ID，使用<code>id</code>参数标记，这样可以更轻松地组织和控制动画组。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🎮</div>
    <div class="practice-content">
      <h4>复用动画实例</h4>
      <p>存储动画引用并使用<code>play()</code>、<code>pause()</code>、<code>reverse()</code>等控制方法，而不是创建新动画。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🧹</div>
    <div class="practice-content">
      <h4>清理不再需要的动画</h4>
      <p>使用<code>kill()</code>方法释放不再需要的动画，防止长时间运行的应用中累积过多动画实例。</p>
    </div>
  </div>
</div>

## 常见陷阱与注意事项

:::warning 谨慎使用overwrite: "all"
过度使用`overwrite: "all"`可能会意外终止不相关的动画。只有在确实需要完全重置元素的所有动画时才使用此选项。
:::

:::tip 理解transform属性的特殊性
`x`、`y`、`rotation`、`scale`等transform相关属性在内部共享同一CSS属性（transform），因此它们之间更容易发生冲突。
:::

:::info 性能考虑
在高性能要求的应用中，过多的并行动画和动画冲突不仅会导致视觉问题，还可能影响性能。合理使用冲突管理可以减少不必要的计算。
:::

## 小结

动画冲突管理是创建复杂、流畅动画体验的关键环节。通过GSAP提供的工具：

- **时间轴（Timeline）**：自动管理动画序列，避免冲突
- **overwrite参数**：控制动画如何覆盖现有动画
- **动画ID**：组织和管理相关动画
- **killTweensOf方法**：精确控制动画终止
- **动画控制方法**：如play()、pause()、reverse()等

掌握这些技巧，你可以创建更加流畅、可靠的动画体验，并在复杂的交互场景中保持对动画的完全控制。

<style>
/* 概念可视化样式 */
.concept-visual {
  margin: 30px 0;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.timeline-view {
  position: relative;
}

.timeline-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.timeline-labels .label {
  font-size: 14px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.timeline-track {
  position: relative;
  height: 160px;
  background: #2c3e50;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}

.time-marker {
  position: absolute;
  top: -20px;
  color: white;
  font-size: 12px;
  transform: translateX(-50%);
}

.animation-row {
  position: relative;
  height: 70px;
  margin-bottom: 20px;
}

.anim-block {
  position: absolute;
  height: 60px;
  border-radius: 4px;
  top: 5px;
  padding: 5px;
  font-size: 12px;
  color: white;
}

.first-anim {
  background: rgba(52, 152, 219, 0.7);
  z-index: 1;
}

.second-anim {
  background: rgba(231, 76, 60, 0.7);
  z-index: 2;
}

.anim-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.duration {
  font-style: italic;
}

.conflict-marker {
  position: absolute;
  top: -15px;
  right: 10px;
  background: #f1c40f;
  color: #000;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 11px;
}

.element-row {
  position: relative;
  height: 60px;
}

.element-state {
  position: absolute;
  padding: 5px 10px;
  background: #f1c40f;
  border-radius: 4px;
  font-size: 12px;
  transform: translateX(-50%);
  z-index: 2;
}

.element-state.override {
  background: #e74c3c;
  color: white;
}

.element-path {
  position: absolute;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
  top: 15px;
  z-index: 1;
}

.first-path {
  left: 0;
  width: 66%;
  background: rgba(52, 152, 219, 0.7);
}

.second-path {
  left: 33%;
  width: 33%;
  background: rgba(231, 76, 60, 0.7);
}

.visual-caption {
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

/* 选项比较卡片 */
.options-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.option-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.option-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.option-card.highlight {
  border-color: var(--vp-c-brand);
  background: rgba(66, 185, 131, 0.05);
}

.option-title {
  background: var(--vp-c-brand);
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 16px;
}

.option-desc {
  padding: 5px 15px;
  font-style: italic;
  font-size: 14px;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.option-explain {
  padding: 10px 15px;
  font-size: 14px;
}

.option-code {
  padding: 0 15px;
  margin: 10px 0;
}

.option-note {
  padding: 10px 15px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-style: italic;
  border-top: 1px dashed var(--vp-c-divider);
}

/* 问题与解决方案 */
.problem-solution {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 25px 0;
}

@media (max-width: 768px) {
  .problem-solution {
    display: flex;
    flex-direction: column;
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

/* 交互演示区域 */
.interactive-demo {
  margin: 30px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.demo-header {
  background: var(--vp-c-bg-soft);
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-header h4 {
  margin: 0;
}

.demo-controls {
  display: flex;
  gap: 10px;
}

.demo-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.demo-btn:hover {
  background: var(--vp-c-brand-dark);
}

.demo-stage {
  height: 300px;
  background: var(--vp-c-bg-mute);
  position: relative;
  padding: 20px;
}

.demo-box {
  width: 120px;
  height: 60px;
  background: var(--vp-c-brand);
  border-radius: 4px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  top: 100px;
  left: 40px;
}

.demo-info {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

/* 决策指南表格 */
.decision-guide {
  margin: 30px 0;
  overflow-x: auto;
}

.decision-guide table {
  width: 100%;
  border-collapse: collapse;
}

.decision-guide th, .decision-guide td {
  padding: 12px 15px;
  border: 1px solid var(--vp-c-divider);
}

.decision-guide th {
  background: var(--vp-c-bg-soft);
  font-weight: bold;
  text-align: left;
}

.decision-guide tr:nth-child(even) {
  background: var(--vp-c-bg-soft);
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

/* 问题与解决方案 - 代码块优化 */
.problem-solution pre {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre;
  margin: 0;
}

.problem-solution code {
  font-size: 0.9em;
  display: block;
}

.problem pre, .solution pre {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
}
</style>

<script>
// 确保GSAP可用
function ensureGSAPLoaded(callback) {
  // 检查GSAP是否已经加载
  if (typeof gsap !== 'undefined') {
    callback();
    return;
  }

  // 如果GSAP未加载，创建脚本加载它
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
  script.onload = callback;
  document.head.appendChild(script);
}

// 初始化动画演示
function initConflictDemo() {
  // 等待DOM元素加载完成
  setTimeout(() => {
  const resetBtn = document.querySelector('.reset-btn');
  const noOverwriteBtn = document.querySelector('.no-overwrite-btn');
  const autoOverwriteBtn = document.querySelector('.auto-overwrite-btn');
  const allOverwriteBtn = document.querySelector('.all-overwrite-btn');
  const demoBox = document.querySelector('.demo-box');
  const demoInfo = document.querySelector('.demo-info');
  
  if (!resetBtn || !noOverwriteBtn || !autoOverwriteBtn || !allOverwriteBtn || !demoBox) {
      console.warn('动画冲突演示元素未找到，将尝试再次初始化');
      setTimeout(initConflictDemo, 1000); // 如果元素未找到，1秒后重试
    return;
  }
    
    console.log('找到动画演示元素，开始初始化');
  
  // 初始化
  gsap.set(demoBox, { x: 0, y: 0, rotation: 0, backgroundColor: "#42b883" });
  
  // 重置按钮
  resetBtn.addEventListener('click', () => {
    gsap.killTweensOf(demoBox);
    gsap.set(demoBox, { x: 0, y: 0, rotation: 0, backgroundColor: "#42b883" });
    demoInfo.textContent = "选择一个选项来观察不同覆盖策略的效果";
  });
  
  // 无覆盖策略
  noOverwriteBtn.addEventListener('click', () => {
    // 先重置
    gsap.set(demoBox, { x: 0, y: 0, rotation: 0, backgroundColor: "#42b883" });
    
    // 第一个动画
    gsap.to(demoBox, {
      x: 200,
      backgroundColor: "#3498db",
      duration: 2
    });
    
    // 一秒后启动第二个动画，不覆盖现有动画
    setTimeout(() => {
      gsap.to(demoBox, {
        y: 50,
        rotation: 180,
        backgroundColor: "#e74c3c",
        duration: 1,
        overwrite: false,
        onStart: () => {
          demoInfo.textContent = "无覆盖: 两个动画同时运行，都会影响元素";
        }
      });
    }, 1000);
  });
  
  // 智能覆盖策略
  autoOverwriteBtn.addEventListener('click', () => {
    // 先重置
    gsap.set(demoBox, { x: 0, y: 0, rotation: 0, backgroundColor: "#42b883" });
    
    // 第一个动画
    gsap.to(demoBox, {
      x: 200,
      backgroundColor: "#3498db",
      duration: 2
    });
    
    // 一秒后启动第二个动画，智能覆盖
    setTimeout(() => {
      gsap.to(demoBox, {
        y: 50,
        rotation: 180,
        backgroundColor: "#e74c3c",
        duration: 1,
        overwrite: "auto",
        onStart: () => {
          demoInfo.textContent = "智能覆盖: 只有backgroundColor被覆盖，x、y和rotation不冲突";
        }
      });
    }, 1000);
  });
  
  // 全部覆盖策略
  allOverwriteBtn.addEventListener('click', () => {
    // 先重置
    gsap.set(demoBox, { x: 0, y: 0, rotation: 0, backgroundColor: "#42b883" });
    
    // 第一个动画
    gsap.to(demoBox, {
      x: 200,
      backgroundColor: "#3498db",
      duration: 2
    });
    
    // 一秒后启动第二个动画，覆盖所有动画
    setTimeout(() => {
      gsap.to(demoBox, {
        y: 50,
        rotation: 180,
        backgroundColor: "#e74c3c",
        duration: 1,
        overwrite: "all",
        onStart: () => {
          demoInfo.textContent = "全部覆盖: 第一个动画被完全终止，从当前状态开始新动画";
        }
      });
    }, 1000);
  });
  
  console.log('动画冲突演示已初始化');
  }, 500);
}

// 多次尝试加载GSAP并初始化演示
function tryInitWithRetries(maxRetries = 3, attempt = 1) {
  if (attempt > maxRetries) {
    console.error('无法加载GSAP库，请刷新页面重试');
    return;
  }
  
  console.log(`尝试加载GSAP并初始化动画，尝试次数：${attempt}`);
  ensureGSAPLoaded(() => {
    try {
    initConflictDemo();
    } catch (e) {
      console.error('初始化动画时出错：', e);
      setTimeout(() => tryInitWithRetries(maxRetries, attempt + 1), 1000);
    }
  });
}

// 文档加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    tryInitWithRetries();
  });
} else {
  tryInitWithRetries();
}

// 为了确保在动态加载的环境中也能初始化，添加一个MutationObserver
const observer = new MutationObserver((mutations) => {
  let shouldInit = false;
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && 
        Array.from(mutation.addedNodes).some(node => 
          node.classList && node.classList.contains('interactive-demo'))) {
      shouldInit = true;
      break;
}
  }
  
  if (shouldInit) {
    tryInitWithRetries();
  }
});

// 开始观察文档变化
observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true
});

// 确保在window加载完成后也尝试初始化
window.addEventListener('load', () => {
  tryInitWithRetries();
});
</script> 