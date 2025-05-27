# 动画无障碍(Accessibility)设计

创建令人愉悦的动画效果不仅仅是为了视觉吸引力，还应该考虑所有用户的可访问性。本章将探讨如何在使用GSAP创建动画时实施无障碍设计原则，确保你的动画对所有用户都是包容和友好的。

:::tip 核心概念
动画无障碍设计是指**创建对所有用户都友好的动画体验**，包括那些有视觉、认知或运动障碍的用户。最关键的原则是**提供选择和替代方案**，而不是强制所有用户体验相同的动画效果。
:::

## 无障碍动画体验可视化

<div class="concept-visual">
  <div class="a11y-comparison">
    <div class="experience-row">
      <div class="experience-title">标准用户体验</div>
      <div class="experience-demo standard">
        <div class="demo-element bouncing-element">弹跳元素</div>
        <div class="demo-element spinning-element">旋转元素</div>
        <div class="demo-element fading-elements">
          <span>淡入</span><span>淡出</span><span>元素</span>
        </div>
      </div>
      <div class="experience-desc">
        完整动画效果，包括弹跳、旋转、交错和复杂的缓动函数
      </div>
    </div>
    <div class="experience-row">
      <div class="experience-title">无障碍用户体验</div>
      <div class="experience-demo reduced">
        <div class="demo-element reduced-element">简化元素</div>
        <div class="demo-element static-element">静态元素</div>
        <div class="demo-element simplified-elements">
          <span>简化</span><span>动画</span><span>元素</span>
        </div>
      </div>
      <div class="experience-desc">
        减少或移除动画效果，简化交互，避免前庭功能刺激
      </div>
    </div>
  </div>
  <div class="visual-caption">
    动画无障碍设计提供两种体验模式：标准模式满足大多数用户需求，而简化模式确保有特殊需求的用户也能顺畅地使用界面
  </div>
</div>

## 动画无障碍的重要性

<div class="benefits-grid">
  <div class="benefit-card">
    <div class="benefit-icon">🌐</div>
    <div class="benefit-title">包容性</div>
    <div class="benefit-desc">确保所有用户都能访问和使用你的内容，无论其能力如何，扩大受众范围</div>
  </div>
  <div class="benefit-card">
    <div class="benefit-icon">⚖️</div>
    <div class="benefit-title">法规遵从</div>
    <div class="benefit-desc">许多国家和地区有明确的无障碍法规要求（如美国的ADA、欧盟的EN 301 549等）</div>
  </div>
  <div class="benefit-card">
    <div class="benefit-icon">✨</div>
    <div class="benefit-title">用户体验提升</div>
    <div class="benefit-desc">无障碍设计的原则往往也能提升所有用户的整体体验，创造更清晰的界面</div>
  </div>
  <div class="benefit-card">
    <div class="benefit-icon">📈</div>
    <div class="benefit-title">市场扩展</div>
    <div class="benefit-desc">支持更广泛的用户群体，包括那些有临时或永久性障碍的用户，提高用户满意度</div>
  </div>
</div>

## 常见动画无障碍问题

在实施动画时，以下问题可能会影响用户体验：

<div class="issues-overview">
  <div class="issue-item">
    <div class="issue-icon">🤢</div>
    <div class="issue-content">
      <h4>前庭功能障碍</h4>
      <p>过多或过于剧烈的动画可能导致眩晕、恶心或不适，尤其是视差滚动和大幅度移动效果</p>
    </div>
  </div>
  <div class="issue-item">
    <div class="issue-icon">⚡</div>
    <div class="issue-content">
      <h4>光敏性癫痫</h4>
      <p>闪烁或高对比度的快速变化可能触发癫痫发作，每秒3次以上的闪烁尤其危险</p>
    </div>
  </div>
  <div class="issue-item">
    <div class="issue-icon">🧠</div>
    <div class="issue-content">
      <h4>注意力障碍</h4>
      <p>过度动画可能分散有认知处理障碍用户的注意力，让用户难以集中精力处理核心内容</p>
    </div>
  </div>
  <div class="issue-item">
    <div class="issue-icon">🔊</div>
    <div class="issue-content">
      <h4>屏幕阅读器兼容性</h4>
      <p>纯视觉动画可能对使用屏幕阅读器的用户无法感知，关键信息需要通过多种方式传达</p>
    </div>
  </div>
  <div class="issue-item">
    <div class="issue-icon">📱</div>
    <div class="issue-content">
      <h4>慢速连接</h4>
      <p>复杂动画可能在低性能设备或慢速网络连接下表现不佳，影响用户交互的流畅性</p>
    </div>
  </div>
</div>

## 实现prefers-reduced-motion媒体查询

`prefers-reduced-motion`是一个CSS媒体查询，可以检测用户是否在其操作系统中设置了减少动画的偏好。这是实现动画无障碍的基础工具。

<div class="methods-comparison">
  <div class="method-card">
    <div class="method-title">基本CSS实现</div>
    <div class="method-desc">使用纯CSS响应用户偏好</div>
    <div class="method-code">
```css
/* 默认动画样式 */
.animated-element {
  transition: transform 0.5s ease;
}
/* 当用户偏好减少动画时 */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```
    </div>
    <div class="method-note">适用于简单的CSS过渡和动画</div>
  </div>
  <div class="method-card">
    <div class="method-title">GSAP基础实现</div>
    <div class="method-desc">基于用户偏好条件执行动画</div>
    <div class="method-code">
```js
// 检测用户偏好
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
// 基于用户偏好调整动画
if (prefersReducedMotion) {
  // 为偏好减少动画的用户提供替代体验
        gsap.set(".element", { x: 100 }); // 立即设置最终状态
} else {
  // 正常动画
        gsap.to(".element", { 
          x: 100, 
          duration: 1, 
          ease: "power2.out" 
        });
}
```
    </div>
    <div class="method-note">适用于独立的GSAP动画</div>
  </div>
  <div class="method-card highlight">
    <div class="method-title">通用动画函数封装</div>
    <div class="method-desc">创建包含无障碍考量的复用函数</div>
    <div class="method-code">
```js
// 创建一个尊重用户动画偏好的通用动画函数
function accessibleAnimate(targets, props, reducedProps) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
  if (prefersReducedMotion) {
    // 使用简化版本或完全禁用动画
    gsap.set(targets, reducedProps || props);
  } else {
    // 使用完整动画
    gsap.to(targets, props);
  }
}
// 使用
accessibleAnimate(".box", 
  { x: 100, duration: 1, ease: "power2.out" }, // 标准动画
  { x: 100 } // 减少动画时的属性
);
```
    </div>
    <div class="method-note">推荐用于项目中的所有动画，确保一致性</div>
  </div>
</div>

### 监听用户偏好变化

<div class="problem-solution">
  <div class="problem">
    <h4>🔴 问题</h4>
    <p>用户可能在使用过程中更改系统动画偏好设置，如果不响应这些变化，会导致不一致的体验。</p>
    ```js
// 不完整的做法：只在初始加载时检查一次
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
// 可能不再准确，如果用户在使用过程中更改了设置
if (prefersReducedMotion) {
  // 减少动画...
}
```
  </div>
  <div class="solution">
    <h4>✅ 解决方案</h4>
    <p>添加事件监听器，动态响应用户偏好变化。</p>
    ```js
// 监听用户偏好变化
const motionMediaQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
function updateMotionPreference() {
  const prefersReducedMotion = motionMediaQuery.matches;
  // 更新全局设置
  gsap.ticker.fps(prefersReducedMotion ? 30 : 60);
  gsap.globalTimeline.timeScale(prefersReducedMotion ? 1.5 : 1);
  // 还可以更新特定动画...
}
// 初始设置
updateMotionPreference();
// 监听变化
motionMediaQuery.addEventListener("change", updateMotionPreference);
```
  </div>
</div>

## 提升动画对比度与可读性

### 避免纯视觉信息传递

<div class="comparison-demo">
  <div class="comparison-header">
    <div class="comparison-title">视觉反馈无障碍对比</div>
  </div>
  <div class="comparison-content">
    <div class="comparison-item">
      <div class="comparison-label">❌ 仅视觉反馈</div>
      <div class="comparison-example bad-example">
        <input type="text" placeholder="邮箱地址" class="demo-input">
        <button class="demo-submit">提交</button>
      </div>
      <div class="comparison-desc">
        仅使用抖动和颜色变化表示错误，屏幕阅读器用户无法感知
      </div>
    </div>
    <div class="comparison-item">
      <div class="comparison-label">✅ 多感官反馈</div>
      <div class="comparison-example good-example">
        <input type="text" placeholder="邮箱地址" class="demo-input">
        <button class="demo-submit">提交</button>
        <div class="error-message" role="alert"></div>
      </div>
      <div class="comparison-desc">
        结合视觉提示和文本反馈，确保所有用户都能理解状态
      </div>
    </div>
  </div>
</div>

### 确保足够的对比度

动画过程中的颜色变化可能会影响内容的可读性，尤其是文本内容。确保在整个动画过程中维持足够的对比度，让所有用户都能阅读内容。

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">🎨</div>
    <div class="strategy-title">动态对比度调整</div>
  </div>
  <div class="strategy-content">
    <p>在背景色变化时动态调整文本颜色，确保可读性：</p>
  </div>
</div>

```js
// 动画过程中保持文本可读性
gsap.to(".card", {
  backgroundColor: "#333",
  duration: 1,
  onUpdate: function() {
    // 根据背景色调整文本颜色
    const bgColor = gsap.getProperty(".card", "backgroundColor");
    const textColor = getLuminance(bgColor) > 0.5 ? "#000" : "#fff";
    gsap.set(".card-text", { color: textColor });
  }
});
// 计算亮度的辅助函数
function getLuminance(color) {
  // 简化的亮度计算...
  return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
}
```

## 确保屏幕阅读器兼容性

屏幕阅读器用户无法感知纯视觉变化，因此需要确保动画内容通过适当的ARIA属性和文本描述来传达。

### 使用ARIA属性标注动态内容

<div class="interactive-demo">
  <div class="demo-header">
    <h4>进度条无障碍演示</h4>
    <div class="demo-controls">
      <button class="demo-btn start-btn">开始加载</button>
      <button class="demo-btn reset-btn">重置</button>
    </div>
  </div>
  <div class="demo-stage">
    <div class="progress-container">
      <div class="progress-track">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div class="sr-progress-text">已完成 0%</div>
      <div class="progress-announcements" aria-live="polite"></div>
    </div>
    <div class="demo-info">点击"开始加载"按钮查看屏幕阅读器友好的进度条</div>
  </div>
</div>

```js
// 动态内容变化通知屏幕阅读器
gsap.to(".progress-bar", {
  width: "100%", 
  duration: 3,
  onUpdate: function() {
    const progress = Math.round(this.progress() * 100);
    const progressBar = document.querySelector(".progress-bar");
    // 更新ARIA值和文本
    progressBar.setAttribute("aria-valuenow", progress);
    document.querySelector(".sr-progress-text").textContent = `已完成 ${progress}%`;
    // 在重要节点通知屏幕阅读器
    if (progress === 50 || progress === 100) {
      const alertElem = document.createElement("div");
      alertElem.setAttribute("role", "status");
      alertElem.classList.add("sr-only"); // 视觉上隐藏
      alertElem.textContent = `进度已达 ${progress}%`;
      document.body.appendChild(alertElem);
      // 稍后移除，避免重复通知
      setTimeout(() => alertElem.remove(), 1000);
    }
  }
});
```

### 为纯装饰性动画添加适当属性

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">🎭</div>
    <div class="strategy-title">装饰性元素处理</div>
  </div>
  <div class="strategy-content">
    <p>明确标记纯装饰性动画元素，避免屏幕阅读器尝试解释它们：</p>
  </div>
</div>

```html
<div class="background-animation" aria-hidden="true">
  <!-- 装饰性背景动画内容 -->
</div>
<script>
  // 装饰性动画不需要被屏幕阅读器理解
  gsap.to(".background-animation div", {
    y: -20,
    opacity: 0.7,
    stagger: 0.1,
    repeat: -1,
    yoyo: true
  });
</script>
```

## 减少动量和动态效果的策略

对于选择减少动画的用户，提供替代方案非常重要。这些替代方案应该保留基本功能，同时减少可能导致不适的视觉效果。

### 提供替代的简化动画

<div class="options-comparison">
  <div class="option-card">
    <div class="option-title">标准动画</div>
    <div class="option-desc">完整体验</div>
    <div class="option-code">
      ```js
      gsap.to(target, {
        x: 100,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)" // 弹性效果
      });
      ```
    </div>
    <div class="option-visual standard-anim">
      <div class="anim-preview"></div>
    </div>
  </div>
  <div class="option-card">
    <div class="option-title">简化动画</div>
    <div class="option-desc">减少动画体验</div>
    <div class="option-code">
      ```js
      gsap.to(target, {
        x: 100,
        duration: 0.3,
        ease: "power1.out" // 简单缓动
      });
      ```
    </div>
    <div class="option-visual reduced-anim">
      <div class="anim-preview"></div>
    </div>
  </div>
  <div class="option-card">
    <div class="option-title">无动画</div>
    <div class="option-desc">直接设置状态</div>
    <div class="option-code">
      ```js
      gsap.set(target, {
        x: 100 // 立即设置，无动画
      });
      ```
    </div>
    <div class="option-visual no-anim">
      <div class="anim-preview"></div>
    </div>
  </div>
</div>

```js
function createAnimation(target) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    // 简化版本：无弹性效果，更短的持续时间
    return gsap.to(target, {
      x: 100,
      duration: 0.3,
      ease: "power1.out" // 简单缓动
    });
  } else {
    // 完整版本：包含弹性和更长的持续时间
    return gsap.to(target, {
      x: 100,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)" // 弹性效果
    });
  }
}
```

### 减少并简化交错动画

<div class="problem-solution">
  <div class="problem">
    <h4>🔴 问题</h4>
    <p>标准交错动画可能会导致视觉过载，尤其是对于有认知障碍或前庭功能障碍的用户。</p>
    ```js
// 标准交错动画，同时有多个元素移动
gsap.from(".card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2, // 较大的交错间隔
  ease: "back.out(1.7)" // 复杂的弹跳效果
});
```
  </div>
  <div class="solution">
    <h4>✅ 解决方案</h4>
    <p>为偏好减少动画的用户提供简化版本，减少交错效果和动态变化。</p>
    ```js
// 根据用户偏好提供适当的动画版本
function animateItems(selector) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    // 简化：减少交错，使用更直接的动画
    gsap.to(selector, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05, // 极小的交错
      ease: "power1.out"
    });
  } else {
    // 标准：完整交错和动态效果
    gsap.from(selector, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });
  }
}
```
  </div>
</div>

## 测试和验证无障碍性

确保你的动画对所有用户都可访问需要系统性的测试和验证。

### 手动测试清单

<div class="checklist-container">
  <div class="checklist-title">动画无障碍测试清单</div>
  <div class="checklist-items">
    <div class="checklist-item">
      <input type="checkbox" id="check1">
      <label for="check1">使用键盘导航测试所有动画交互</label>
    </div>
    <div class="checklist-item">
      <input type="checkbox" id="check2">
      <label for="check2">验证操作系统的减少动画设置是否正确响应</label>
    </div>
    <div class="checklist-item">
      <input type="checkbox" id="check3">
      <label for="check3">使用屏幕阅读器测试动态内容的可访问性</label>
    </div>
    <div class="checklist-item">
      <input type="checkbox" id="check4">
      <label for="check4">测试高对比度模式下的动画可见性</label>
    </div>
    <div class="checklist-item">
      <input type="checkbox" id="check5">
      <label for="check5">检查动画是否使界面元素难以聚焦或交互</label>
    </div>
    <div class="checklist-item">
      <input type="checkbox" id="check6">
      <label for="check6">测试在不同设备和屏幕尺寸上的表现</label>
    </div>
    <div class="checklist-item">
      <input type="checkbox" id="check7">
      <label for="check7">验证没有快速闪烁的内容(3Hz以上)</label>
    </div>
  </div>
</div>

### 使用自动化工具辅助测试

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">🔍</div>
    <div class="strategy-title">动画无障碍检查工具</div>
  </div>
  <div class="strategy-content">
    <p>创建一个辅助函数来检查动画配置是否符合无障碍标准：</p>
  </div>
</div>

```js
// 一个简单的辅助函数，在开发环境中检查常见的动画无障碍问题
function checkAnimationAccessibility(animationConfig) {
  const warnings = [];
  // 检查是否处理了减少动画偏好
  if (!animationConfig.hasReducedMotionCheck) {
    warnings.push("警告：未检测prefers-reduced-motion偏好");
  }
  // 检查动画速度
  if (animationConfig.duration < 0.1) {
    warnings.push("警告：动画可能过快，考虑增加持续时间");
  }
  // 检查闪烁风险
  if (animationConfig.blink || (animationConfig.repeat && animationConfig.repeatDelay < 0.5)) {
    warnings.push("警告：检测到可能的闪烁模式，这可能引发光敏性问题");
  }
  // 输出警告
  if (warnings.length > 0) {
    console.group("动画无障碍检查");
    warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }
  return animationConfig;
}
// 使用
const config = checkAnimationAccessibility({
  duration: 0.05,
  repeat: 5,
  repeatDelay: 0.1,
  hasReducedMotionCheck: false
});
```

## 实际项目中的综合示例

<div class="strategy-block">
  <div class="strategy-header">
    <div class="strategy-icon">📦</div>
    <div class="strategy-title">全站动画无障碍管理模块</div>
  </div>
  <div class="strategy-content">
    <p>创建一个可复用的模块来统一管理整个网站的动画无障碍设置：</p>
  </div>
</div>

```js
// 全站动画无障碍管理模块
const AccessibleAnimations = {
  // 系统状态
  state: {
    prefersReducedMotion: false,
    highContrastMode: false
  },
  // 初始化
  init() {
    // 检测用户偏好
    this.checkUserPreferences();
    // 添加偏好变化监听器
    this.addPreferenceListeners();
    // 设置全局GSAP默认值
    this.setGlobalDefaults();
  },
  // 检查用户偏好
  checkUserPreferences() {
    this.state.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.state.highContrastMode = window.matchMedia("(-ms-high-contrast: active)").matches;
  },
  // 添加媒体查询监听器
  addPreferenceListeners() {
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", e => {
      this.state.prefersReducedMotion = e.matches;
      this.setGlobalDefaults();
    });
  },
  // 设置GSAP全局默认值
  setGlobalDefaults() {
    if (this.state.prefersReducedMotion) {
      // 减少动画模式：更快的动画，简单缓动
      gsap.defaults({
        duration: 0.3,
        ease: "power1.out",
        stagger: 0.05
      });
      // 减慢全局时间轴以保持顺畅
      gsap.globalTimeline.timeScale(1.5);
    } else {
      // 正常动画模式
      gsap.defaults({
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1
      });
      gsap.globalTimeline.timeScale(1);
    }
  },
  // 创建考虑无障碍的动画
  animate(targets, props, reducedProps) {
    if (this.state.prefersReducedMotion) {
      // 简化版动画或直接设置最终状态
      return gsap.to(targets, reducedProps || {
        ...props,
        duration: Math.min(props.duration * 0.6 || 0.3, 0.3),
        ease: "power1.out",
        stagger: props.stagger ? Math.min(props.stagger * 0.5, 0.05) : 0
      });
    } else {
      // 正常动画
      return gsap.to(targets, props);
    }
  },
  // 注册无障碍功能模块
  registerModule(name, moduleConfig) {
    // 允许添加特定功能模块
    this[name] = moduleConfig;
    // 初始化模块
    if (moduleConfig.init) {
      moduleConfig.init(this.state);
    }
  }
};
// 初始化
AccessibleAnimations.init();
// 使用
AccessibleAnimations.animate(".hero-elements", {
  y: 0,
  opacity: 1,
  duration: 1,
  stagger: 0.2,
  ease: "back.out"
}, {
  // 减少动画时的简化属性
  y: 0,
  opacity: 1,
  duration: 0.3,
  stagger: 0.05,
  ease: "power1.out"
});
```

## 决策指南：无障碍动画策略选择

<div class="decision-guide">
  <table>
    <thead>
      <tr>
        <th>场景</th>
        <th>&lt;span&gt;推荐策略&lt;/span&gt;</th>
        <th>实现方式</th>
        <th>&lt;span&gt;注意事项&lt;/span&gt;</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>装饰性背景动画</td>
        <td>完全禁用</td>
        <td>在reduced-motion模式下使用gsap.set或不创建动画</td>
        <td>标记为aria-hidden=&quot;true&quot;</td>
      </tr>
      <tr>
        <td>界面反馈动画</td>
        <td>简化版本</td>
        <td>减少持续时间，简化缓动函数</td>
        <td>确保反馈有文本/听觉替代方案</td>
      </tr>
      <tr>
        <td>页面转场动画</td>
        <td>保留但简化</td>
        <td>更直接的过渡，减少复杂度</td>
        <td>避免方向改变和大幅度移动</td>
      </tr>
      <tr>
        <td>进度指示器</td>
        <td>保留但添加辅助</td>
        <td>正常动画 &plus; ARIA标记</td>
        <td>使用aria-live区域通知进度变化</td>
      </tr>
      <tr>
        <td>内容加载动画</td>
        <td>快速版本</td>
        <td>减少stagger和持续时间</td>
        <td>确保内容可快速访问，不被动画延迟</td>
      </tr>
      <tr>
        <td>悬停/聚焦状态</td>
        <td>简化变化</td>
        <td>减少移动，保留颜色变化</td>
        <td>保持状态清晰可辨识</td>
      </tr>
    </tbody>
  </table>
</div>

## 最佳实践汇总

<div class="best-practices">
  <div class="practice-item">
    <div class="practice-icon">🔄</div>
    <div class="practice-content">
      <h4>响应用户偏好</h4>
      <p>始终响应<code>prefers-reduced-motion</code>媒体查询，尊重用户系统设置和偏好，允许用户控制他们的体验。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🔄</div>
    <div class="practice-content">
      <h4>提供替代方案</h4>
      <p>为每个动画设计一个简化版本，针对不同用户需求提供不同级别的动画体验，而不是简单地全部禁用。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">📢</div>
    <div class="practice-content">
      <h4>多渠道信息传递</h4>
      <p>避免纯视觉信息传递，确保所有重要信息都有文本或听觉替代方案，使用ARIA属性增强屏幕阅读器体验。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🧪</div>
    <div class="practice-content">
      <h4>多条件测试</h4>
      <p>在各种条件下测试你的动画，包括不同的辅助技术、设备和用户设置，确保所有用户都能获得良好体验。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🔍</div>
    <div class="practice-content">
      <h4>避免闪烁内容</h4>
      <p>控制闪烁，避免每秒超过3次的快速、高对比度的颜色变化，降低触发光敏性癫痫的风险。</p>
    </div>
  </div>
  <div class="practice-item">
    <div class="practice-icon">🎮</div>
    <div class="practice-content">
      <h4>提供用户控制</h4>
      <p>除了响应系统偏好外，考虑提供显式的动画控制选项，让用户可以根据自己的需求调整动画设置。</p>
    </div>
  </div>
</div>

:::warning 重要提示
无障碍设计不仅是为特定用户群体服务，而是通过创建更灵活、更考虑用户需求的界面，提升所有用户的体验。将无障碍考量融入设计流程的起始阶段，而不是作为事后的修补。
:::

通过实施这些无障碍设计原则，你可以创建既美观又包容的动画体验，确保你的内容能够被尽可能广泛的受众所欣赏和使用。 

<style>
/* 概念可视化样式 */
.concept-visual {
  margin: 30px 0;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.a11y-comparison {
  position: relative;
}

.experience-row {
  margin-bottom: 20px;
}

.experience-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.experience-demo {
  height: 120px;
  background: #2c3e50;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.demo-element {
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  color: #2c3e50;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.bouncing-element {
  animation: bounce 2s infinite;
}

.spinning-element {
  animation: spin 3s infinite;
}

.fading-elements span {
  display: inline-block;
  margin: 0 5px;
  animation: fade 1.5s infinite;
  animation-delay: calc(var(--i, 0) * 0.5s);
}

.fading-elements span:nth-child(1) { --i: 0; }
.fading-elements span:nth-child(2) { --i: 1; }
.fading-elements span:nth-child(3) { --i: 2; }

.experience-demo.reduced .demo-element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.reduced-element {
  transform: translateY(0);
}

.static-element {
  /* 无动画 */
}

.simplified-elements span {
  display: inline-block;
  margin: 0 5px;
}

.experience-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.visual-caption {
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-top: 15px;
}

/* 优势网格 */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.benefit-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s;
  border-left: 3px solid var(--vp-c-brand);
}

.benefit-card:hover {
  transform: translateY(-3px);
}

.benefit-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.benefit-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.benefit-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* 问题概览 */
.issues-overview {
  margin: 20px 0;
}

.issue-item {
  display: flex;
  margin-bottom: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s;
}

.issue-item:hover {
  transform: translateX(5px);
}

.issue-icon {
  font-size: 24px;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.issue-content {
  flex: 1;
}

.issue-content h4 {
  margin: 0 0 8px 0;
}

.issue-content p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
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
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.method-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.method-card.highlight {
  border-color: var(--vp-c-brand);
  background: rgba(66, 185, 131, 0.05);
}

.method-title {
  background: var(--vp-c-brand);
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 16px;
}

.method-desc {
  padding: 5px 15px;
  font-style: italic;
  font-size: 14px;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.method-code {
  padding: 0 15px;
  margin: 10px 0;
}

.method-note {
  padding: 10px 15px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-style: italic;
  border-top: 1px dashed var(--vp-c-divider);
}

/* 策略块 */
.strategy-block {
  margin: 20px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.strategy-header {
  background: var(--vp-c-brand-dimm);
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.strategy-icon {
  font-size: 20px;
  margin-right: 10px;
}

.strategy-title {
  font-weight: bold;
}

.strategy-content {
  padding: 15px;
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

/* 比较演示 */
.comparison-demo {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-header {
  background: var(--vp-c-bg-soft);
  padding: 10px 15px;
}

.comparison-title {
  font-weight: bold;
  margin: 0;
}

.comparison-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--vp-c-divider);
}

@media (max-width: 640px) {
  .comparison-content {
    grid-template-columns: 1fr;
  }
}

.comparison-item {
  background: var(--vp-c-bg);
  padding: 15px;
}

.comparison-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.comparison-example {
  margin: 15px 0;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  position: relative;
}

.demo-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.demo-submit {
  padding: 8px 15px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
  font-size: 14px;
}

.comparison-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 10px;
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
  height: 200px;
  background: var(--vp-c-bg-mute);
  position: relative;
  padding: 20px;
}

.progress-container {
  width: 80%;
  margin: 0 auto;
  padding-top: 60px;
}

.progress-track {
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: var(--vp-c-brand);
  border-radius: 10px;
}

.sr-progress-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

.progress-announcements {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.demo-info {
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
}

/* 选项比较卡片 */
.options-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

.option-code {
  padding: 0 15px;
  margin: 10px 0;
}

.option-visual {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px 15px;
}

.anim-preview {
  width: 30px;
  height: 30px;
  background: var(--vp-c-brand);
  border-radius: 4px;
}

/* 测试清单 */
.checklist-container {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
}

.checklist-title {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 16px;
}

.checklist-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
}

.checklist-item {
  display: flex;
  align-items: center;
}

.checklist-item input[type="checkbox"] {
  margin-right: 10px;
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

/* 动画 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // GSAP加载检查
  function ensureGSAPLoaded(callback, maxRetries = 5, retryInterval = 200) {
    let retries = 0;
    
    function checkGSAP() {
      if (typeof gsap !== 'undefined') {
        callback();
        return true;
      }
      
      retries++;
      if (retries < maxRetries) {
        setTimeout(checkGSAP, retryInterval);
      } else {
        console.warn('GSAP未能加载，动画功能可能不可用');
        return false;
      }
    }
    
    return checkGSAP();
  }

  // 初始化所有动画
  ensureGSAPLoaded(() => {
  // 表单无障碍演示
  const badSubmitBtn = document.querySelector('.bad-example .demo-submit');
  const goodSubmitBtn = document.querySelector('.good-example .demo-submit');
  const badInput = document.querySelector('.bad-example .demo-input');
  const goodInput = document.querySelector('.good-example .demo-input');
  const errorMessage = document.querySelector('.error-message');
  
    if (badSubmitBtn && goodSubmitBtn && badInput && goodInput && errorMessage) {
    // 坏例子 - 只有视觉反馈
      badSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 防止表单提交跳转
      gsap.to(badInput, { 
        borderColor: "red",
        x: [-5, 5, -3, 3, 0],
        duration: 0.5
      });
    });
    
    // 好例子 - 包含视觉和屏幕阅读器反馈
      goodSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 防止表单提交跳转
      gsap.to(goodInput, { 
        borderColor: "red",
        x: [-5, 5, -3, 3, 0],
        duration: 0.5,
        onStart: () => {
          errorMessage.textContent = "请输入有效的电子邮件地址";
        }
      });
    });
  }
  
  // 进度条无障碍演示
  const startBtn = document.querySelector('.start-btn');
  const resetProgressBtn = document.querySelector('.interactive-demo .reset-btn');
  const progressBar = document.querySelector('.progress-bar');
  const srProgressText = document.querySelector('.sr-progress-text');
  const announcements = document.querySelector('.progress-announcements');
  
    if (startBtn && resetProgressBtn && progressBar && srProgressText && announcements) {
    // 重置进度条
      resetProgressBtn.addEventListener('click', (e) => {
        e.preventDefault();
      gsap.killTweensOf(progressBar);
      gsap.set(progressBar, { width: "0%" });
      srProgressText.textContent = "已完成 0%";
      progressBar.setAttribute("aria-valuenow", 0);
      announcements.textContent = "";
    });
    
    // 开始进度动画
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
      gsap.to(progressBar, {
        width: "100%", 
        duration: 3,
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          
          // 更新ARIA值和文本
          progressBar.setAttribute("aria-valuenow", progress);
          srProgressText.textContent = `已完成 ${progress}%`;
          
          // 在重要节点通知屏幕阅读器
          if (progress === 50 || progress === 100) {
            announcements.textContent = `进度已达 ${progress}%`;
            
            // 清除通知
            setTimeout(() => {
              if (announcements.textContent === `进度已达 ${progress}%`) {
                announcements.textContent = "";
              }
            }, 1000);
          }
        }
      });
    });
  }
  
  // 不同动画选项的预览
  const standardPreview = document.querySelector('.standard-anim .anim-preview');
  const reducedPreview = document.querySelector('.reduced-anim .anim-preview');
  const noAnimPreview = document.querySelector('.no-anim .anim-preview');
  
    if (standardPreview && reducedPreview && noAnimPreview) {
      // 创建MutationObserver来监视DOM变化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            initAnimations();
          }
        });
      });
      
      // 开始观察
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true
      });
      
      function initAnimations() {
    // 标准动画
    function playStandardAnim() {
      gsap.fromTo(standardPreview, 
        { x: -50 },
        { 
          x: 50, 
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          yoyo: true, 
          repeat: 1,
          onComplete: () => {
            setTimeout(playStandardAnim, 1000);
          }
        }
      );
    }
    
    // 简化动画
    function playReducedAnim() {
      gsap.fromTo(reducedPreview, 
        { x: -30 },
        { 
          x: 30, 
          duration: 0.3,
          ease: "power1.out",
          yoyo: true, 
          repeat: 1,
          onComplete: () => {
            setTimeout(playReducedAnim, 1000);
          }
        }
      );
    }
    
    // 无动画
    gsap.set(noAnimPreview, { x: 0 });
    
    // 启动动画预览
    playStandardAnim();
    playReducedAnim();
      }
      
      // 初始化动画
      initAnimations();
  }
  });
});
</script> 