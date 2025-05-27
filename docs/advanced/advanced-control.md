# 高级动画控制

在掌握基础的GSAP动画技术后，高级动画控制将帮助你更精确地操作和管理复杂的动画序列。本章将深入探讨GSAP提供的高级控制机制，帮助你构建专业级的动画系统。

## 动画实例高级控制方法

GSAP的每个动画实例都提供了丰富的控制方法，让你能够精确地控制动画的行为。

### 核心控制方法概览

| 方法 | 功能 | 示例 |
|------|------|------|
| play() | 播放动画 | `animation.play()` |
| pause() | 暂停动画 | `animation.pause()` |
| resume() | 从暂停点继续播放 | `animation.resume()` |
| reverse() | 反向播放 | `animation.reverse()` |
| restart() | 重新播放动画 | `animation.restart()` |
| timeScale() | 控制播放速度 | `animation.timeScale(2)` |
| seek() | 跳转到特定时间点 | `animation.seek(1.5)` |
| progress() | 跳转到特定进度比例 | `animation.progress(0.5)` |
| kill() | 销毁动画实例 | `animation.kill()` |

::: tip 动画实例获取
要使用这些控制方法，需要先获取动画实例：
```javascript
// 创建并保存动画实例
const animation = gsap.to(".box", {
  x: 100,
  duration: 2,
  paused: true // 创建后不立即播放
});

// 之后可以通过控制方法操作这个动画
animation.play();
```
:::

### 播放控制实例

```html
<div class="demo-container">
  <div class="box"></div>
  <div class="controls">
    <button id="play-btn">播放</button>
    <button id="pause-btn">暂停</button>
    <button id="reverse-btn">反向</button>
    <button id="restart-btn">重启</button>
  </div>
</div>
```

```javascript
// 创建一个动画实例但不立即播放
const boxAnim = gsap.to(".box", {
  x: 200,
  rotation: 360,
  duration: 2,
  paused: true, // 创建后暂停
  ease: "power1.inOut"
});

// 添加控制按钮事件
document.getElementById("play-btn").onclick = () => boxAnim.play();
document.getElementById("pause-btn").onclick = () => boxAnim.pause();
document.getElementById("reverse-btn").onclick = () => boxAnim.reverse();
document.getElementById("restart-btn").onclick = () => boxAnim.restart();
```

::: warning 注意事项
`restart()`会从头开始播放动画，而`resume()`则从当前暂停位置继续播放。了解这些细微差别对精确控制动画至关重要。
:::

## 时间控制技术

掌握timeScale、seek、progress等时间控制方法，实现对动画时间的精准控制。

### timeScale控制

调整动画播放速度，实现加速、减速和反向播放效果。

```javascript
// 创建一个动画实例
const animation = gsap.to(".element", {
  x: 300,
  duration: 2,
  ease: "power2.inOut"
});

// 各种速度控制
animation.timeScale(2);    // 2倍速播放
animation.timeScale(0.5);  // 半速播放
animation.timeScale(-1);   // 反向播放
```

::: tip 实时速度调整
timeScale还可以进行动画，实现渐进式的速度变化：
```javascript
// 动画慢慢加速
gsap.to(animation, {
  timeScale: 3,    // 最终达到3倍速
  duration: 1.5,   // 用1.5秒时间从当前速度过渡到3倍速
  ease: "power1.in"
});
```
:::

#### 交互式速度控制

```html
<div class="speed-control">
  <div class="ball"></div>
  <input type="range" id="speed-slider" min="-2" max="2" step="0.1" value="1">
  <div class="speed-value">速度: <span id="speed-display">1</span>x</div>
</div>
```

```javascript
// 创建一个循环动画
const ballAnimation = gsap.to(".ball", {
  x: 200,
  duration: 2,
  repeat: -1,     // 无限循环
  yoyo: true,     // 来回运动
  ease: "power1.inOut"
});

// 连接速度滑块
const slider = document.getElementById("speed-slider");
const display = document.getElementById("speed-display");

slider.addEventListener("input", function() {
  const speed = parseFloat(this.value);
  ballAnimation.timeScale(speed);
  display.textContent = speed.toFixed(1);
});
```

### seek与progress控制

直接跳转到动画的特定时间点或百分比位置，实现精确的时间控制。

#### seek方法

`seek()` 允许你跳转到动画的特定时间点(以秒为单位)。

```javascript
const tl = gsap.timeline();
tl.to(".box1", {x: 100, duration: 1})
  .to(".box2", {y: 50, duration: 0.5})
  .to(".box3", {rotation: 90, duration: 1});

// 直接跳转到1.5秒位置
tl.seek(1.5);

// 跳转到标签位置
tl.addLabel("middle", 1);
tl.seek("middle");
```

#### progress方法

`progress()` 让你基于百分比(0-1)控制动画进度。

```javascript
const animation = gsap.to(".circle", {
  x: 400,
  rotation: 360,
  duration: 3
});

// 直接跳到50%的位置
animation.progress(0.5);

// 跳到开头
animation.progress(0);

// 跳到结尾
animation.progress(1);
```

#### 构建播放器控件

```html
<div class="player-container">
  <div class="animated-element"></div>
  <div class="controls">
    <button id="play-pause">播放/暂停</button>
    <input type="range" id="progress-bar" min="0" max="100" value="0">
    <div class="time">
      <span id="current-time">0.0</span>s / <span id="total-time">0.0</span>s
    </div>
  </div>
</div>
```

```javascript
// 创建一个复杂动画
const tl = gsap.timeline({paused: true});
tl.to(".animated-element", {x: 200, duration: 1})
  .to(".animated-element", {y: 100, duration: 0.8})
  .to(".animated-element", {rotation: 360, duration: 1.2});

// 设置总时间显示
document.getElementById("total-time").textContent = tl.duration().toFixed(1);

// 播放/暂停按钮
let isPlaying = false;
document.getElementById("play-pause").onclick = function() {
  if (isPlaying) {
    tl.pause();
    isPlaying = false;
  } else {
    tl.play();
    isPlaying = true;
  }
};

// 进度条控制
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");

// 进度条拖动控制动画
progressBar.addEventListener("input", function() {
  // 暂停自动更新
  const progress = this.value / 100;
  tl.progress(progress);
  currentTime.textContent = (progress * tl.duration()).toFixed(1);
});

// 动画播放时更新进度条
tl.eventCallback("onUpdate", function() {
  const progress = tl.progress();
  progressBar.value = progress * 100;
  currentTime.textContent = (progress * tl.duration()).toFixed(1);
});
```

::: warning 性能考量
过于频繁地调用`seek()`或`progress()`可能影响性能。如果需要实现拖动式的进度控制，可以考虑使用节流(throttle)技术或只在拖动结束后更新。
:::

## 动画状态管理与保存

学习如何管理和保存动画状态，在复杂场景中恢复特定的动画状态。

### 保存与恢复动画状态

在复杂的交互式应用中，经常需要保存动画的当前状态，以便之后恢复。

```javascript
// 创建一个复杂动画
const tl = gsap.timeline();
tl.to(".element", {x: 100, duration: 1})
  .to(".element", {y: 50, rotation: 45, duration: 1.5});

// 在某个时刻保存动画状态
const savedTime = tl.time();
const savedProgress = tl.progress();
const savedState = {
  time: savedTime,
  progress: savedProgress,
  paused: tl.paused(),
  reversed: tl.reversed()
};

// 稍后恢复这个状态
function restoreAnimationState(timeline, state) {
  timeline.pause(); // 先暂停以避免跳跃效果
  
  if (state.time !== undefined) {
    timeline.time(state.time);
  } else if (state.progress !== undefined) {
    timeline.progress(state.progress);
  }
  
  if (state.reversed) {
    timeline.reversed(true);
  }
  
  if (!state.paused) {
    timeline.play();
  }
}

// 使用保存的状态
restoreAnimationState(tl, savedState);
```

### 使用本地存储持久化动画状态

对于需要跨页面或会话保存的动画状态，可以使用localStorage。

```javascript
// 保存到localStorage
function saveAnimationToStorage(key, timeline) {
  const state = {
    progress: timeline.progress(),
    paused: timeline.paused(),
    reversed: timeline.reversed(),
    timeScale: timeline.timeScale(),
    savedAt: new Date().getTime()
  };
  
  localStorage.setItem(key, JSON.stringify(state));
}

// 从localStorage恢复
function loadAnimationFromStorage(key, timeline) {
  const stateString = localStorage.getItem(key);
  if (!stateString) return false;
  
  try {
    const state = JSON.parse(stateString);
    timeline.progress(state.progress);
    timeline.paused(state.paused);
    timeline.reversed(state.reversed);
    timeline.timeScale(state.timeScale);
    return true;
  } catch (e) {
    console.error("恢复动画状态出错:", e);
    return false;
  }
}

// 使用示例
const myAnimation = gsap.timeline({id: "mainAnimation"});
// ... 设置动画内容 ...

// 保存
saveAnimationToStorage("mainAnimation", myAnimation);

// 恢复(例如页面刷新后)
document.addEventListener("DOMContentLoaded", () => {
  loadAnimationFromStorage("mainAnimation", myAnimation);
});
```

::: tip 状态管理最佳实践
- 只保存真正需要的状态数据，避免过度存储
- 对于长时间运行的应用，考虑设置状态过期时间
- 对于复杂状态，可以使用专门的状态管理库
:::

## 复杂动画序列编排

掌握复杂动画序列的设计和管理技巧，处理多元素、多阶段的动画编排。

### 高级时间轴技术

GSAP的时间轴(Timeline)是构建复杂动画序列的核心工具。

```javascript
// 创建具有默认设置的时间轴
const masterTimeline = gsap.timeline({
  paused: true,             // 创建后不自动播放
  defaults: {               // 所有子动画的默认值
    duration: 0.8,
    ease: "power2.out"
  },
  onComplete: function() {  // 完成时的回调
    console.log("动画序列完成");
  }
});

// 添加多个子动画，形成序列
masterTimeline
  .to(".header", {y: 0, opacity: 1, duration: 1}, 0)                // 从0秒开始
  .to(".sidebar", {x: 0, opacity: 1}, 0.5)                          // 从0.5秒开始
  .to(".content", {opacity: 1, y: 0, stagger: 0.2}, "sidebar+=0.3") // 侧边栏后0.3秒
  .to(".footer", {y: 0, opacity: 1}, "-=0.5");                      // 提前0.5秒开始
```

#### 相对位置与标签系统

```javascript
const tl = gsap.timeline();

// 添加标签
tl.addLabel("start", 0)
  .to(".element1", {x: 100, duration: 1})
  .addLabel("middle")                      // 在当前位置添加标签
  .to(".element2", {y: 50, duration: 1})
  .addLabel("end");

// 使用标签控制
tl.play("middle");       // 从middle标签开始播放
tl.seek("end");          // 跳转到end标签
tl.tweenFromTo("start", "end"); // 从start播放到end
```

### 嵌套时间轴

通过嵌套时间轴，可以构建模块化的复杂动画系统。

```javascript
// 创建主时间轴
const mainTimeline = gsap.timeline({paused: true});

// 创建独立的场景时间轴
function createSceneTimeline(selector, duration) {
  const tl = gsap.timeline();
  tl.to(`${selector} .element`, {opacity: 1, y: 0, stagger: 0.1, duration: 0.5})
    .to(`${selector} .title`, {scale: 1, duration: 0.7}, 0.2);
  
  return tl;
}

// 创建多个场景并添加到主时间轴
const scene1 = createSceneTimeline(".scene1", 2);
const scene2 = createSceneTimeline(".scene2", 1.5);
const scene3 = createSceneTimeline(".scene3", 2.5);

// 将场景添加到主时间轴
mainTimeline
  .add(scene1)
  .add(scene2, "+=0.5") // 场景1结束后等待0.5秒
  .add(scene3, "-=0.3"); // 场景2结束前0.3秒开始

// 控制整个动画
mainTimeline.play();
```

::: warning 嵌套时间轴注意事项
- 嵌套时间轴的控制是层级性的：暂停主时间轴会暂停所有子时间轴
- 当销毁主时间轴时，应考虑是否需要手动清理子时间轴
- 避免过深的嵌套层级，以维持代码可读性和性能
:::

### 复杂交叉动画

创建元素之间的交叉和重叠动画效果。

```javascript
// 创建交叉动画效果
const crossfadeTimeline = gsap.timeline();

// 第一个元素淡出的同时第二个元素淡入
crossfadeTimeline
  .to(".element1", {opacity: 0, y: -30, duration: 1}, 0)
  .to(".element2", {opacity: 1, y: 0, duration: 1}, 0);  // 注意这里的0表示与前一个动画同时开始

// 创建交错的波浪效果
const staggerTimeline = gsap.timeline();
staggerTimeline.to(".wave-item", {
  y: -20,
  opacity: 1,
  stagger: {
    each: 0.1,        // 每个元素之间的延迟
    from: "center",   // 从中间开始
    grid: "auto",     // 自动计算网格
    ease: "power2.out" // 错开的缓动函数
  },
  duration: 0.8
});
```

::: tip 专业提示
对于非常复杂的动画序列，考虑使用状态机或命令模式来组织代码，这样可以更好地管理动画状态和转换逻辑。
:::

## 条件分支动画设计

基于用户交互或程序状态，设计具有条件分支的智能动画系统。

### 基于条件的动画选择

根据不同条件执行不同的动画序列。

```javascript
// 创建不同状态的动画
const successAnimation = gsap.timeline({paused: true});
successAnimation
  .to(".status-icon", {backgroundColor: "#4CAF50", duration: 0.3})
  .to(".status-icon", {scale: 1.2, duration: 0.2})
  .to(".status-icon", {scale: 1, duration: 0.2});

const errorAnimation = gsap.timeline({paused: true});
errorAnimation
  .to(".status-icon", {backgroundColor: "#F44336", duration: 0.3})
  .to(".status-icon", {x: -5, duration: 0.1})
  .to(".status-icon", {x: 5, repeat: 3, yoyo: true, duration: 0.1})
  .to(".status-icon", {x: 0, duration: 0.1});

const warningAnimation = gsap.timeline({paused: true});
warningAnimation
  .to(".status-icon", {backgroundColor: "#FF9800", duration: 0.3})
  .to(".status-icon", {rotation: 15, duration: 0.2})
  .to(".status-icon", {rotation: -15, duration: 0.2})
  .to(".status-icon", {rotation: 0, duration: 0.2});

// 根据状态选择并播放动画
function playStatusAnimation(status) {
  // 先重置所有动画
  successAnimation.progress(0).pause();
  errorAnimation.progress(0).pause();
  warningAnimation.progress(0).pause();
  
  // 根据状态选择动画
  switch(status) {
    case "success":
      successAnimation.play();
      break;
    case "error":
      errorAnimation.play();
      break;
    case "warning":
      warningAnimation.play();
      break;
    default:
      // 默认状态不播放动画
      break;
  }
}

// 使用示例
document.getElementById("status-success").addEventListener("click", () => {
  playStatusAnimation("success");
});

document.getElementById("status-error").addEventListener("click", () => {
  playStatusAnimation("error");
});

document.getElementById("status-warning").addEventListener("click", () => {
  playStatusAnimation("warning");
});
```

### 条件分支动画的中断与恢复

处理动画过程中的条件变化，平滑过渡到新状态。

```javascript
// 创建可中断的多阶段动画
const multiStageAnimation = gsap.timeline({
  paused: true,
  onUpdate: checkConditions
});

// 添加多个动画阶段
multiStageAnimation
  .addLabel("phase1")
  .to(".element", {x: 100, duration: 1})
  .addLabel("phase2")
  .to(".element", {y: 50, duration: 1})
  .addLabel("phase3")
  .to(".element", {rotation: 90, duration: 1})
  .addLabel("complete");

// 当前动画目标阶段
let targetPhase = "complete";

// 检查条件并决定是否中断或改变方向
function checkConditions() {
  // 示例：根据某些条件改变目标阶段
  const newTargetPhase = determineTargetPhase();
  
  if (newTargetPhase !== targetPhase) {
    targetPhase = newTargetPhase;
    
    // 如果当前已经超过目标阶段，反向播放到目标
    if (multiStageAnimation.labels[targetPhase] < multiStageAnimation.time()) {
      multiStageAnimation.tweenTo(targetPhase);
    }
  }
}

// 确定当前应该到达的目标阶段
function determineTargetPhase() {
  // 这里可以基于任何条件（用户输入、数据状态等）
  const userLevel = document.getElementById("user-level").value;
  
  switch(userLevel) {
    case "beginner":
      return "phase1";
    case "intermediate":
      return "phase2";
    case "advanced":
      return "phase3";
    default:
      return "complete";
  }
}

// 启动动画
document.getElementById("start-animation").addEventListener("click", () => {
  // 重置动画
  multiStageAnimation.progress(0);
  
  // 设置初始目标阶段
  targetPhase = determineTargetPhase();
  
  // 开始播放
  multiStageAnimation.play();
});
```

### 事件驱动的动画系统

创建响应事件的动画系统，灵活处理用户交互。

```javascript
// 创建事件驱动的动画管理器
class AnimationManager {
  constructor() {
    this.animations = {};
    this.currentAnimation = null;
  }
  
  // 注册动画
  register(name, timelineCreator) {
    this.animations[name] = {
      creator: timelineCreator,
      instance: null
    };
  }
  
  // 播放指定动画
  play(name, params = {}) {
    // 如果有当前正在播放的动画，决定如何处理
    if (this.currentAnimation) {
      if (params.interrupt === false) {
        // 不中断当前动画
        return false;
      }
      
      // 完成或中断当前动画
      if (params.complete && this.currentAnimation.instance) {
        this.currentAnimation.instance.progress(1);
      } else if (this.currentAnimation.instance) {
        this.currentAnimation.instance.kill();
      }
    }
    
    // 创建新动画实例
    if (!this.animations[name]) {
      console.error(`Animation '${name}' not registered`);
      return false;
    }
    
    const animation = this.animations[name];
    animation.instance = animation.creator(params);
    
    this.currentAnimation = animation;
    
    // 播放动画
    if (params.delay) {
      setTimeout(() => {
        animation.instance.play();
      }, params.delay * 1000);
    } else {
      animation.instance.play();
    }
    
    return animation.instance;
  }
}

// 使用动画管理器
const animManager = new AnimationManager();

// 注册几个动画
animManager.register("fadeIn", (params) => {
  const tl = gsap.timeline({paused: true});
  tl.to(params.target || ".element", {
    opacity: 1, 
    y: 0, 
    duration: params.duration || 0.5
  });
  return tl;
});

animManager.register("bounce", (params) => {
  const tl = gsap.timeline({paused: true});
  tl.to(params.target || ".element", {
    y: -20, 
    duration: 0.3, 
    ease: "power2.out"
  })
  .to(params.target || ".element", {
    y: 0, 
    duration: 0.5, 
    ease: "bounce.out"
  });
  return tl;
});

// 响应不同事件播放动画
document.getElementById("button-hover").addEventListener("mouseenter", () => {
  animManager.play("bounce", {
    target: "#button-hover",
    duration: 0.8
  });
});

document.getElementById("section-enter").addEventListener("inview", () => {
  animManager.play("fadeIn", {
    target: "#section-enter .content",
    duration: 1.2
  });
});
```

::: tip 条件动画最佳实践
- 预先定义所有可能的动画状态和转换
- 使用有限状态机模式管理复杂的状态转换
- 提供平滑的中断和恢复机制
- 为动画转换添加适当的缓动函数，使状态变化更自然
:::

## 动态参数调整

学习如何在动画运行过程中动态调整参数，创建适应性更强的动画效果。

### 实时修改动画参数

GSAP允许在动画运行时动态更新其属性和参数。

```javascript
// 创建一个动画实例
const animation = gsap.to(".ball", {
  x: 400,
  duration: 3,
  ease: "power1.inOut",
  paused: true // 先不播放
});

// 播放动画
animation.play();

// 动态更改目标位置
document.getElementById("position-slider").addEventListener("input", function() {
  const newX = parseFloat(this.value);
  
  // 更新动画目标值
  animation.vars.x = newX;
  
  // 强制更新，使更改立即生效
  animation.invalidate().restart();
});

// 动态调整动画持续时间
document.getElementById("duration-slider").addEventListener("input", function() {
  const newDuration = parseFloat(this.value);
  
  // 更新持续时间
  animation.duration(newDuration);
});

// 动态更改缓动函数
document.getElementById("ease-select").addEventListener("change", function() {
  const newEase = this.value;
  
  // 重新创建动画使用新的缓动函数
  const progress = animation.progress(); // 保存当前进度
  animation.kill();
  
  animation = gsap.to(".ball", {
    x: animation.vars.x, // 使用当前的目标值
    duration: animation.duration(),
    ease: newEase,
    paused: true
  });
  
  // 恢复到相同的进度并继续播放
  animation.progress(progress).play();
});
```

### 基于用户输入的动态动画

创建响应用户输入的实时动画效果。

```javascript
// 创建响应鼠标移动的动画
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// 追踪鼠标位置
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// 创建动画更新函数
function animateToMouse() {
  // 设定目标位置（平滑跟随效果）
  targetX += (mouseX - targetX) * 0.1;
  targetY += (mouseY - targetY) * 0.1;
  
  // 应用动画
  gsap.set(".follower", {
    x: targetX,
    y: targetY
  });
  
  // 循环更新
  requestAnimationFrame(animateToMouse);
}

// 启动动画
animateToMouse();

// 响应滚动位置的动画
let scrollProgress = 0;

window.addEventListener("scroll", () => {
  // 计算页面滚动进度(0-1)
  scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  
  // 根据滚动位置更新动画
  updateScrollBasedAnimation();
});

function updateScrollBasedAnimation() {
  // 根据滚动位置动态设置动画参数
  gsap.to(".parallax-element", {
    y: scrollProgress * 100, // 视差效果
    opacity: 1 - scrollProgress, // 渐隐效果
    scale: 1 + scrollProgress * 0.2, // 缩放效果
    duration: 0.5 // 平滑过渡
  });
}
```

### 数据驱动的动画

基于实时数据更新动画参数，适用于数据可视化场景。

```javascript
// 数据驱动的柱状图动画
function updateChartAnimation(data) {
  // 为每个数据点创建/更新动画
  data.forEach((value, index) => {
    // 计算高度比例
    const height = value / Math.max(...data) * 100;
    
    // 动画更新对应的柱子
    gsap.to(`.bar-${index}`, {
      height: `${height}%`,
      duration: 0.8,
      ease: "power2.out"
    });
  });
}

// 初始数据
let chartData = [30, 45, 22, 80, 65];

// 首次渲染
updateChartAnimation(chartData);

// 模拟数据更新
setInterval(() => {
  // 生成新的随机数据
  chartData = chartData.map(() => Math.floor(Math.random() * 100));
  
  // 更新动画
  updateChartAnimation(chartData);
}, 3000);
```

::: tip 动态参数性能优化
- 避免频繁重建整个动画，优先使用`vars`属性和`invalidate()`方法
- 对于高频事件(如mousemove、scroll)，考虑使用节流(throttling)或请求动画帧(requestAnimationFrame)
- 对于复杂计算，考虑使用Web Workers分离计算逻辑
:::

## 动画调试与优化工具

使用GSAP提供的调试和优化工具，提高动画开发效率。

### GSDevTools调试工具

GSDevTools是GSAP的高级插件，提供了一个功能强大的动画调试界面。

```javascript
// 注意：GSDevTools是GSAP的付费插件，需要Club GreenSock会员资格
import { gsap } from "gsap";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(GSDevTools);

// 创建复杂动画
const tl = gsap.timeline({id: "mainSequence"});
tl.to(".box1", {x: 100, duration: 1})
  .to(".box2", {y: 50, duration: 0.5})
  .to(".box3", {rotation: 90, duration: 1});

// 添加调试工具
GSDevTools.create({
  animation: tl,          // 要调试的动画
  globalSync: true,       // 全局同步
  visibility: "visible",  // 控制面板可见性
  inTime: 0,              // 可播放范围的开始
  outTime: 5,             // 可播放范围的结束
  timeScale: 1            // 初始播放速度
});
```

::: warning 付费功能提示
GSDevTools是GSAP的付费插件，需要Club GreenSock会员资格。本教程仅作为学习参考，在商业项目中使用前请确保获得适当的许可。
:::

### 自定义调试工具

如果不使用付费插件，也可以创建简单的自定义调试工具。

```javascript
// 创建简单的动画调试器
function createAnimationDebugger(animation, container) {
  // 创建控制UI
  const debugDiv = document.createElement("div");
  debugDiv.className = "gsap-debugger";
  debugDiv.innerHTML = `
    <div class="controls">
      <button class="play-pause">播放/暂停</button>
      <button class="restart">重启</button>
      <input type="range" class="progress" min="0" max="100" value="0">
      <div class="info">
        <span class="time">0.00</span>s / 
        <span class="duration">0.00</span>s
        <select class="timeScale">
          <option value="0.25">0.25x</option>
          <option value="0.5">0.5x</option>
          <option value="1" selected>1x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
        </select>
      </div>
    </div>
  `;
  
  container.appendChild(debugDiv);
  
  // 获取元素引用
  const playPauseBtn = debugDiv.querySelector(".play-pause");
  const restartBtn = debugDiv.querySelector(".restart");
  const progressSlider = debugDiv.querySelector(".progress");
  const timeDisplay = debugDiv.querySelector(".time");
  const durationDisplay = debugDiv.querySelector(".duration");
  const timeScaleSelect = debugDiv.querySelector(".timeScale");
  
  // 更新持续时间显示
  durationDisplay.textContent = animation.duration().toFixed(2);
  
  // 播放/暂停按钮
  playPauseBtn.addEventListener("click", () => {
    if (animation.paused()) {
      animation.play();
    } else {
      animation.pause();
    }
  });
  
  // 重启按钮
  restartBtn.addEventListener("click", () => {
    animation.restart();
  });
  
  // 进度条控制
  progressSlider.addEventListener("input", () => {
    const progress = progressSlider.value / 100;
    animation.progress(progress);
    timeDisplay.textContent = animation.time().toFixed(2);
  });
  
  // 播放速度控制
  timeScaleSelect.addEventListener("change", () => {
    const timeScale = parseFloat(timeScaleSelect.value);
    animation.timeScale(timeScale);
  });
  
  // 动画更新时同步UI
  animation.eventCallback("onUpdate", () => {
    if (!progressSlider.dragging) {
      progressSlider.value = animation.progress() * 100;
      timeDisplay.textContent = animation.time().toFixed(2);
    }
  });
  
  return {
    element: debugDiv,
    update: () => {
      progressSlider.value = animation.progress() * 100;
      timeDisplay.textContent = animation.time().toFixed(2);
      durationDisplay.textContent = animation.duration().toFixed(2);
    }
  };
}

// 使用自定义调试器
const myAnimation = gsap.timeline();
// ... 设置动画内容 ...

const debugger = createAnimationDebugger(
  myAnimation, 
  document.getElementById("debug-container")
);
```

### 性能分析与优化

使用浏览器开发工具和GSAP功能进行性能分析。

```javascript
// 监控动画性能的辅助函数
function monitorAnimationPerformance(animation, sampleRate = 100) {
  let lastTime = performance.now();
  let frames = 0;
  let totalJank = 0;
  const frameTimes = [];
  
  animation.eventCallback("onUpdate", () => {
    const now = performance.now();
    const elapsed = now - lastTime;
    
    frames++;
    frameTimes.push(elapsed);
    
    // 检测卡顿（帧时间超过16.7ms）
    if (elapsed > 16.7) {
      totalJank += elapsed - 16.7;
    }
    
    lastTime = now;
    
    // 定期输出性能报告
    if (frames % sampleRate === 0) {
      const avgFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length;
      
      console.log(`--- 动画性能报告 ---`);
      console.log(`平均帧时间: ${avgFrameTime.toFixed(2)}ms`);
      console.log(`总卡顿时间: ${totalJank.toFixed(2)}ms`);
      console.log(`卡顿比例: ${(totalJank / (frames * 16.7) * 100).toFixed(2)}%`);
      
      // 重置收集
      frameTimes.length = 0;
    }
  });
  
  return {
    reset: () => {
      frames = 0;
      totalJank = 0;
      frameTimes.length = 0;
      lastTime = performance.now();
    }
  };
}

// 使用性能监控
const complexAnimation = gsap.timeline();
// ... 设置复杂动画 ...

const performanceMonitor = monitorAnimationPerformance(complexAnimation);

// 在性能测试后重置
document.getElementById("reset-test").addEventListener("click", () => {
  performanceMonitor.reset();
});
```

::: tip 开发者工具技巧
使用Chrome开发者工具的Performance面板录制动画执行情况，查看：
- FPS图表 - 识别帧率下降
- CPU使用情况 - 查看JS执行时间
- Rendering事件 - 检查重绘和重排
- 请求动画帧事件 - 分析每帧的处理时间
:::

## 高级动画控制模式

探索常见的高级动画控制模式，如队列控制、状态机、事件驱动等。

### 动画队列模式

管理多个动画的顺序执行，适用于复杂的流程控制。

```javascript
// 创建动画队列管理器
class AnimationQueue {
  constructor() {
    this.queue = [];
    this.isPlaying = false;
    this.currentAnimation = null;
  }
  
  // 添加动画到队列
  add(animationCreator, options = {}) {
    this.queue.push({
      creator: animationCreator,
      options
    });
    
    // 如果队列正在空闲，立即播放
    if (!this.isPlaying) {
      this.playNext();
    }
    
    return this;
  }
  
  // 播放队列中的下一个动画
  playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      this.currentAnimation = null;
      
      // 触发队列完成事件
      if (this.onComplete) {
        this.onComplete();
      }
      
      return;
    }
    
    this.isPlaying = true;
    const item = this.queue.shift();
    
    // 创建动画
    this.currentAnimation = item.creator();
    
    // 设置完成回调
    this.currentAnimation.eventCallback("onComplete", () => {
      // 如果设置了延迟，等待后再播放下一个
      if (item.options.delay) {
        setTimeout(() => this.playNext(), item.options.delay * 1000);
      } else {
        this.playNext();
      }
      
      // 触发单个动画完成事件
      if (item.options.onComplete) {
        item.options.onComplete();
      }
    });
    
    // 播放动画
    if (item.options.paused) {
      this.currentAnimation.pause();
    } else {
      this.currentAnimation.play();
    }
  }
  
  // 清空队列
  clear() {
    // 停止当前动画
    if (this.currentAnimation) {
      this.currentAnimation.kill();
    }
    
    // 清空队列
    this.queue = [];
    this.isPlaying = false;
    this.currentAnimation = null;
    
    return this;
  }
  
  // 设置队列完成回调
  onQueueComplete(callback) {
    this.onComplete = callback;
    return this;
  }
}

// 使用动画队列
const animQueue = new AnimationQueue();

// 添加多个动画到队列
animQueue
  .add(() => {
    // 第一个动画 - 元素淡入
    return gsap.to(".element-1", {
      opacity: 1, 
      y: 0, 
      duration: 0.8
    });
  })
  .add(() => {
    // 第二个动画 - 文本输入效果
    return gsap.to(".text", {
      text: "欢迎使用GSAP高级控制功能！",
      duration: 1.5
    });
  }, {
    delay: 0.5, // 添加延迟
    onComplete: () => console.log("文本动画完成")
  })
  .add(() => {
    // 第三个动画 - 按钮弹出
    return gsap.from(".button", {
      scale: 0,
      opacity: 0,
      ease: "back.out(1.7)",
      duration: 0.5
    });
  })
  .onQueueComplete(() => {
    console.log("所有动画序列完成！");
  });
```

### 状态机动画模式

使用状态机管理复杂的动画状态转换。

```javascript
// 简单的动画状态机
class AnimationStateMachine {
  constructor() {
    this.states = {};
    this.currentState = null;
    this.initialState = null;
    this.isTransitioning = false;
  }
  
  // 添加状态
  addState(name, config) {
    this.states[name] = {
      enter: config.enter || (() => {}),
      exit: config.exit || (() => {}),
      transitions: config.transitions || {}
    };
    
    // 设置初始状态
    if (config.initial) {
      this.initialState = name;
    }
    
    return this;
  }
  
  // 初始化状态机
  init() {
    if (!this.initialState) {
      throw new Error("没有设置初始状态");
    }
    
    this.currentState = this.initialState;
    const state = this.states[this.currentState];
    
    // 执行进入动画
    const enterPromise = state.enter();
    if (enterPromise && enterPromise.then) {
      enterPromise.then(() => {
        this.isTransitioning = false;
      });
    } else {
      this.isTransitioning = false;
    }
    
    return this;
  }
  
  // 触发状态转换
  trigger(event) {
    // 如果正在转换中，忽略事件
    if (this.isTransitioning) {
      return false;
    }
    
    const state = this.states[this.currentState];
    const nextState = state.transitions[event];
    
    // 检查是否有对应的转换
    if (!nextState) {
      console.warn(`在状态 ${this.currentState} 中没有找到事件 ${event} 的转换`);
      return false;
    }
    
    this.isTransitioning = true;
    
    // 执行退出动画
    const exitPromise = state.exit(nextState);
    
    const completeTransition = () => {
      // 更新当前状态
      this.currentState = nextState;
      
      // 执行进入动画
      const enterPromise = this.states[nextState].enter(this.currentState);
      
      if (enterPromise && enterPromise.then) {
        enterPromise.then(() => {
          this.isTransitioning = false;
        });
      } else {
        this.isTransitioning = false;
      }
    };
    
    // 处理退出动画完成
    if (exitPromise && exitPromise.then) {
      exitPromise.then(completeTransition);
    } else {
      completeTransition();
    }
    
    return true;
  }
  
  // 获取当前状态
  getState() {
    return this.currentState;
  }
  
  // 检查是否可以触发某个事件
  canTrigger(event) {
    if (this.isTransitioning) {
      return false;
    }
    
    const state = this.states[this.currentState];
    return !!state.transitions[event];
  }
}

// 使用状态机控制UI状态
const uiStateMachine = new AnimationStateMachine();

// 添加各种状态
uiStateMachine
  .addState("closed", {
    initial: true,
    enter: () => {
      // 关闭状态的进入动画
      return gsap.to(".panel", {
        x: "-100%",
        duration: 0.5,
        ease: "power2.inOut"
      });
    },
    transitions: {
      open: "opening"
    }
  })
  .addState("opening", {
    enter: () => {
      // 打开中状态的动画
      const tl = gsap.timeline();
      tl.to(".panel", {
        x: "0%",
        duration: 0.5,
        ease: "power2.out"
      })
      .to(".panel-item", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.3
      });
      
      // 自动转换到opened状态
      tl.eventCallback("onComplete", () => {
        uiStateMachine.trigger("complete");
      });
      
      return tl;
    },
    transitions: {
      complete: "opened",
      cancel: "closed"
    }
  })
  .addState("opened", {
    enter: () => {
      console.log("面板已完全打开");
    },
    exit: () => {
      // 离开opened状态的动画
      return gsap.to(".panel-item", {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.2
      });
    },
    transitions: {
      close: "closing"
    }
  })
  .addState("closing", {
    enter: () => {
      // 关闭中状态的动画
      const tl = gsap.timeline();
      tl.to(".panel", {
        x: "-100%",
        duration: 0.5,
        ease: "power2.in"
      });
      
      // 自动转换到closed状态
      tl.eventCallback("onComplete", () => {
        uiStateMachine.trigger("complete");
      });
      
      return tl;
    },
    transitions: {
      complete: "closed",
      cancel: "opened"
    }
  });

// 初始化状态机
uiStateMachine.init();

// 绑定按钮事件
document.getElementById("toggle-panel").addEventListener("click", () => {
  const currentState = uiStateMachine.getState();
  
  if (currentState === "closed") {
    uiStateMachine.trigger("open");
  } else if (currentState === "opened") {
    uiStateMachine.trigger("close");
  }
});
```

::: tip 高级控制模式选择指南
- **队列模式**：适用于严格顺序执行的动画序列
- **状态机模式**：适用于有明确状态和转换的界面动画
- **事件驱动模式**：适用于响应用户交互的动态动画
- **混合模式**：在复杂应用中可组合使用不同模式
:::

## 全局动画管理系统设计

学习如何设计一个全局的动画管理系统，有效组织和协调复杂项目中的多个动画。

### 动画系统架构

设计一个集中管理所有动画的系统架构。

```javascript
// 全局动画管理系统
class AnimationSystem {
  constructor() {
    // 存储所有动画实例
    this.animations = {};
    
    // 动画分组
    this.groups = {};
    
    // 全局配置
    this.config = {
      defaultDuration: 0.5,
      defaultEase: "power2.out",
      disableAnimations: false,
      timeScale: 1
    };
    
    // 存储页面状态
    this.pageState = "default";
    
    // 绑定窗口事件
    this._bindEvents();
  }
  
  // 注册动画
  register(id, animationCreator, options = {}) {
    this.animations[id] = {
      creator: animationCreator,
      instance: null,
      options: {
        group: options.group || "default",
        autoplay: options.autoplay || false,
        persist: options.persist || false
      }
    };
    
    // 如果指定了组，添加到组
    if (options.group) {
      if (!this.groups[options.group]) {
        this.groups[options.group] = [];
      }
      this.groups[options.group].push(id);
    }
    
    // 如果设置了自动播放，立即创建并播放
    if (options.autoplay && !this.config.disableAnimations) {
      this.play(id);
    }
    
    return this;
  }
  
  // 播放动画
  play(id, vars = {}) {
    if (!this.animations[id]) {
      console.error(`动画 ${id} 未注册`);
      return null;
    }
    
    const anim = this.animations[id];
    
    // 如果已经有实例且配置为持久化，则复用
    if (anim.instance && anim.options.persist) {
      anim.instance.play();
      return anim.instance;
    }
    
    // 创建新实例
    const mergedVars = {...this.config, ...vars};
    anim.instance = anim.creator(mergedVars);
    
    // 应用全局时间缩放
    if (anim.instance.timeScale) {
      anim.instance.timeScale(this.config.timeScale);
    }
    
    return anim.instance;
  }
  
  // 暂停动画
  pause(id) {
    if (id) {
      // 暂停特定动画
      if (this.animations[id] && this.animations[id].instance) {
        this.animations[id].instance.pause();
      }
    } else {
      // 暂停所有动画
      Object.values(this.animations).forEach(anim => {
        if (anim.instance) {
          anim.instance.pause();
        }
      });
    }
    
    return this;
  }
  
  // 按组播放动画
  playGroup(groupName, stagger = 0) {
    if (!this.groups[groupName]) {
      console.error(`动画组 ${groupName} 不存在`);
      return this;
    }
    
    this.groups[groupName].forEach((id, index) => {
      setTimeout(() => {
        this.play(id);
      }, index * stagger * 1000);
    });
    
    return this;
  }
  
  // 设置全局配置
  setConfig(config) {
    this.config = {...this.config, ...config};
    
    // 如果修改了时间缩放，应用到所有活动动画
    if (config.timeScale !== undefined) {
      Object.values(this.animations).forEach(anim => {
        if (anim.instance && anim.instance.timeScale) {
          anim.instance.timeScale(config.timeScale);
        }
      });
    }
    
    return this;
  }
  
  // 切换页面状态，管理相关动画
  setPageState(state) {
    const previousState = this.pageState;
    this.pageState = state;
    
    // 触发状态退出动画
    if (this.groups[`exit_${previousState}`]) {
      this.playGroup(`exit_${previousState}`);
    }
    
    // 触发状态进入动画
    if (this.groups[`enter_${state}`]) {
      this.playGroup(`enter_${state}`);
    }
    
    return this;
  }
  
  // 清理特定动画资源
  dispose(id) {
    if (this.animations[id]) {
      if (this.animations[id].instance) {
        this.animations[id].instance.kill();
      }
      delete this.animations[id];
      
      // 从组中移除
      Object.keys(this.groups).forEach(groupName => {
        this.groups[groupName] = this.groups[groupName].filter(animId => animId !== id);
      });
    }
    
    return this;
  }
  
  // 清理所有动画资源
  disposeAll() {
    Object.values(this.animations).forEach(anim => {
      if (anim.instance) {
        anim.instance.kill();
      }
    });
    
    this.animations = {};
    this.groups = {};
    
    return this;
  }
  
  // 绑定窗口事件
  _bindEvents() {
    // 响应页面可见性变化
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // 页面不可见时暂停所有动画
        this.pause();
      } else {
        // 页面可见时恢复适合的动画
        // 这里可以实现更复杂的恢复逻辑
      }
    });
    
    // 响应窗口大小变化
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // 触发注册的响应式动画重置
        if (this.groups.responsive) {
          this.groups.responsive.forEach(id => {
            // 销毁并重新创建
            if (this.animations[id].instance) {
              this.animations[id].instance.kill();
              this.animations[id].instance = null;
              this.play(id);
            }
          });
        }
      }, 250);
    });
  }
}

// 创建全局动画系统实例
const animationSystem = new AnimationSystem();

// 注册各种动画
animationSystem.register("headerAnimation", (vars) => {
  // 创建页头动画
  return gsap.timeline()
    .from(".header-logo", {opacity: 0, x: -20, duration: vars.defaultDuration})
    .from(".header-nav li", {opacity: 0, y: -20, stagger: 0.1, duration: vars.defaultDuration}, "-=0.2");
}, {
  group: "enter_default",
  autoplay: true
});

animationSystem.register("contentFade", (vars) => {
  // 创建内容区动画
  return gsap.from(".content-section", {
    opacity: 0,
    y: 30,
    duration: vars.defaultDuration,
    stagger: 0.2
  });
}, {
  group: "enter_default",
  group: "responsive"
});

// 在页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  // 播放内容动画组
  animationSystem.playGroup("enter_default", 0.1);
});

// 响应用户操作
document.getElementById("theme-toggle").addEventListener("click", () => {
  // 切换主题状态，触发相关动画
  const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  animationSystem.setPageState(newTheme);
  document.body.classList.toggle("dark-theme");
});
```

::: warning 性能考量
全局动画系统虽然提供了便捷的管理，但也需要注意内存管理。特别是在单页应用中，要确保页面切换时正确清理不需要的动画资源，避免内存泄漏。
:::

## 实战控制案例分析

通过实际案例分析，学习如何在真实项目中应用高级控制技巧。

### 案例一：电子商务产品展示

以下是一个电子商务网站产品展示页面的动画控制案例。

```javascript
// 电子商务产品展示动画系统
class ProductShowcase {
  constructor(container) {
    this.container = document.querySelector(container);
    this.products = this.container.querySelectorAll('.product-item');
    this.currentIndex = 0;
    this.isAnimating = false;
    this.animations = {};
    
    // 初始化动画系统
    this.initAnimations();
    this.initControls();
  }
  
  // 初始化产品动画
  initAnimations() {
    // 创建主时间轴
    this.animations.main = gsap.timeline({paused: true});
    
    // 为每个产品创建显示动画
    this.products.forEach((product, index) => {
      // 隐藏除第一个外的所有产品
      if (index !== 0) {
        gsap.set(product, {autoAlpha: 0, x: 100});
      }
      
      // 为每个产品创建出场动画
      const enterTl = gsap.timeline({paused: true})
        .fromTo(product.querySelector('.product-image'), 
          {scale: 0.8, autoAlpha: 0},
          {scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.4)"}
        )
        .fromTo(product.querySelector('.product-info'), 
          {y: 30, autoAlpha: 0},
          {y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out"},
          "-=0.3"
        )
        .fromTo(product.querySelectorAll('.product-feature'),
          {y: 20, autoAlpha: 0},
          {y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.4},
          "-=0.2"
        );
      
      // 为每个产品创建退场动画
      const exitTl = gsap.timeline({paused: true})
        .to(product.querySelector('.product-info'), 
          {y: -30, autoAlpha: 0, duration: 0.3, ease: "power1.in"}
        )
        .to(product.querySelector('.product-image'), 
          {scale: 0.8, autoAlpha: 0, duration: 0.5, ease: "power1.in"},
          "-=0.1"
        )
        .to(product, 
          {autoAlpha: 0, x: -100, duration: 0.3},
          "-=0.3"
        );
      
      // 保存动画引用
      this.animations[`product${index}Enter`] = enterTl;
      this.animations[`product${index}Exit`] = exitTl;
    });
    
    // 显示第一个产品
    this.animations[`product0Enter`].play();
  }
  
  // 初始化控制界面
  initControls() {
    // 上一个产品
    this.container.querySelector('.prev-btn').addEventListener('click', () => {
      this.showProduct(this.currentIndex - 1);
    });
    
    // 下一个产品
    this.container.querySelector('.next-btn').addEventListener('click', () => {
      this.showProduct(this.currentIndex + 1);
    });
    
    // 直接跳转到特定产品
    this.container.querySelectorAll('.product-nav-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.showProduct(index);
      });
    });
    
    // 暂停和恢复查看
    let autoPlayInterval;
    
    this.container.querySelector('.autoplay-toggle').addEventListener('click', (e) => {
      const button = e.target;
      
      if (button.dataset.playing === 'true') {
        // 停止自动播放
        clearInterval(autoPlayInterval);
        button.dataset.playing = 'false';
        button.textContent = '开始自动播放';
      } else {
        // 开始自动播放
        autoPlayInterval = setInterval(() => {
          this.showProduct((this.currentIndex + 1) % this.products.length);
        }, 5000);
        button.dataset.playing = 'true';
        button.textContent = '停止自动播放';
      }
    });
    
    // 产品特性详情弹出动画
    this.container.querySelectorAll('.product-feature').forEach(feature => {
      feature.addEventListener('click', () => {
        const featureInfo = feature.querySelector('.feature-details');
        
        if (feature.dataset.expanded === 'true') {
          // 收起详情
          gsap.to(featureInfo, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              feature.dataset.expanded = 'false';
            }
          });
        } else {
          // 展开详情
          gsap.fromTo(featureInfo, 
            {height: 0, opacity: 0},
            {
              height: 'auto',
              opacity: 1,
              duration: 0.5,
              onComplete: () => {
                feature.dataset.expanded = 'true';
              }
            }
          );
        }
      });
    });
  }
  
  // 切换显示产品
  showProduct(index) {
    // 防止动画重叠
    if (this.isAnimating) return;
    
    // 验证索引范围
    if (index < 0) index = this.products.length - 1;
    if (index >= this.products.length) index = 0;
    
    // 如果点击当前产品，不执行动画
    if (index === this.currentIndex) return;
    
    this.isAnimating = true;
    
    // 获取当前和下一个产品的动画
    const currentExitAnim = this.animations[`product${this.currentIndex}Exit`];
    const nextEnterAnim = this.animations[`product${index}Enter`];
    
    // 准备下一个产品
    gsap.set(this.products[index], {autoAlpha: 0, x: (index > this.currentIndex) ? 100 : -100});
    
    // 创建转场动画序列
    const transitionTl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
        
        // 更新导航状态
        this.updateNavigation(index);
      }
    });
    
    // 当前产品退场
    transitionTl.add(() => {
      currentExitAnim.restart();
      return currentExitAnim;
    });
    
    // 下一个产品进场
    transitionTl.add(() => {
      gsap.set(this.products[index], {autoAlpha: 1});
      nextEnterAnim.restart();
      return nextEnterAnim;
    }, "+=0.1");
    
    // 更新当前索引
    this.currentIndex = index;
  }
  
  // 更新导航状态
  updateNavigation(activeIndex) {
    // 更新导航项目状态
    this.container.querySelectorAll('.product-nav-item').forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // 更新前后按钮状态
    this.container.querySelector('.prev-btn').disabled = (activeIndex === 0);
    this.container.querySelector('.next-btn').disabled = (activeIndex === this.products.length - 1);
  }
}

// 初始化产品展示
document.addEventListener('DOMContentLoaded', () => {
  const productShowcase = new ProductShowcase('.product-showcase');
});
```

#### 案例分析

1. **模块化动画设计**：将产品展示动画拆分为多个独立时间轴，便于管理和控制。
2. **状态管理**：使用类属性跟踪当前状态（如当前产品索引和动画状态）。
3. **防抖保护**：通过`isAnimating`标志防止用户在动画过程中连续触发新动画。
4. **动态序列控制**：根据用户交互动态构建和播放动画序列。
5. **UI状态同步**：将动画状态与UI元素（如导航指示器）保持同步。

### 案例二：交互式数据可视化动画

以下是一个交互式数据可视化应用的动画控制系统。

```javascript
// 数据可视化动画控制器
class DataVisualizationController {
  constructor(container) {
    this.container = document.querySelector(container);
    this.chartContainer = this.container.querySelector('.chart-container');
    this.timelineSlider = this.container.querySelector('.timeline-slider');
    this.playButton = this.container.querySelector('.play-button');
    this.yearDisplay = this.container.querySelector('.year-display');
    
    // 动画状态
    this.isPlaying = false;
    this.currentYear = 2000;
    this.endYear = 2020;
    this.playbackSpeed = 1;
    
    // 数据和图表配置
    this.data = {}; // 将由fetchData填充
    this.barElements = [];
    this.axisElements = [];
    this.chartTimeline = null;
    
    // 初始化
    this.init();
  }
  
  async init() {
    // 加载数据
    await this.fetchData();
    
    // 创建图表基础元素
    this.createChartBase();
    
    // 初始化动画
    this.initAnimations();
    
    // 设置控制器
    this.setupControls();
    
    // 显示初始年份数据
    this.updateVisualization(this.currentYear, true);
  }
  
  async fetchData() {
    try {
      // 模拟数据加载
      const response = await fetch('/api/yearly-data');
      this.data = await response.json();
      
      // 处理数据
      this.years = Object.keys(this.data).sort();
      this.categories = Object.keys(this.data[this.years[0]]);
      this.maxValue = this.calculateMaxValue();
    } catch (error) {
      console.error('数据加载失败:', error);
      
      // 使用模拟数据进行演示
      this.setupMockData();
    }
  }
  
  setupMockData() {
    // 创建模拟数据用于演示
    this.data = {};
    this.years = [];
    
    for (let year = 2000; year <= 2020; year++) {
      this.years.push(year.toString());
      this.data[year] = {
        'Category A': Math.random() * 100,
        'Category B': Math.random() * 80,
        'Category C': Math.random() * 120,
        'Category D': Math.random() * 60,
        'Category E': Math.random() * 90
      };
    }
    
    this.categories = Object.keys(this.data[2000]);
    this.maxValue = this.calculateMaxValue();
  }
  
  calculateMaxValue() {
    let max = 0;
    Object.values(this.data).forEach(yearData => {
      Object.values(yearData).forEach(value => {
        if (value > max) max = value;
      });
    });
    return max * 1.1; // 增加10%的空间
  }
  
  createChartBase() {
    // 创建坐标轴
    const axisContainer = document.createElement('div');
    axisContainer.className = 'axis-container';
    this.chartContainer.appendChild(axisContainer);
    
    // Y轴刻度
    for (let i = 0; i <= 10; i++) {
      const tick = document.createElement('div');
      tick.className = 'y-axis-tick';
      tick.style.bottom = `${i * 10}%`;
      tick.textContent = Math.round(this.maxValue * i / 10);
      axisContainer.appendChild(tick);
      this.axisElements.push(tick);
    }
    
    // 创建条形图容器
    const barsContainer = document.createElement('div');
    barsContainer.className = 'bars-container';
    this.chartContainer.appendChild(barsContainer);
    
    // 为每个类别创建条形
    this.categories.forEach((category, index) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.left = `${index * (100 / this.categories.length)}%`;
      bar.style.width = `${80 / this.categories.length}%`;
      
      const barLabel = document.createElement('div');
      barLabel.className = 'bar-label';
      barLabel.textContent = category;
      
      const barValue = document.createElement('div');
      barValue.className = 'bar-value';
      
      bar.appendChild(barLabel);
      bar.appendChild(barValue);
      barsContainer.appendChild(bar);
      
      this.barElements.push({
        container: bar,
        valueElement: barValue
      });
    });
  }
  
  initAnimations() {
    // 初始化主时间轴
    this.chartTimeline = gsap.timeline({paused: true});
    
    // 为每一年创建关键帧
    this.years.forEach((year, index) => {
      // 计算这一年在时间轴上的位置(0-1)
      const position = index / (this.years.length - 1);
      
      // 添加年份标签
      this.chartTimeline.addLabel(year, position);
      
      // 在这个位置添加更新函数
      if (index < this.years.length - 1) {
        this.chartTimeline.call(() => {
          this.updateYearDisplay(year);
        }, [], position);
      }
    });
    
    // 设置时间轴总时长
    this.chartTimeline.duration(this.years.length * 0.5); // 每年0.5秒
    
    // 初始化时间线滑块
    gsap.set(this.timelineSlider, {
      attr: {min: 0, max: 100, value: 0},
      onInput: this.handleSliderChange.bind(this)
    });
  }
  
  setupControls() {
    // 播放/暂停按钮
    this.playButton.addEventListener('click', () => {
      this.togglePlayback();
    });
    
    // 时间线滑块
    this.timelineSlider.addEventListener('input', this.handleSliderChange.bind(this));
    
    // 速度控制
    this.container.querySelectorAll('.speed-control').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.playbackSpeed = parseFloat(e.target.dataset.speed);
        
        // 更新UI
        this.container.querySelectorAll('.speed-control').forEach(b => {
          b.classList.toggle('active', b === e.target);
        });
        
        // 应用新速度
        if (this.isPlaying) {
          this.chartTimeline.timeScale(this.playbackSpeed);
        }
      });
    });
    
    // 数据分类筛选器
    this.container.querySelectorAll('.category-filter').forEach(filter => {
      filter.addEventListener('change', () => {
        this.updateVisualization(this.currentYear, false);
      });
    });
  }
  
  handleSliderChange() {
    // 计算滑块位置对应的时间线位置
    const progress = this.timelineSlider.value / 100;
    
    // 暂停任何正在进行的动画
    if (this.isPlaying) {
      this.togglePlayback();
    }
    
    // 设置时间线位置
    this.chartTimeline.progress(progress);
    
    // 找出当前年份
    const newYear = this.findCurrentYear(progress);
    
    // 更新可视化
    if (newYear !== this.currentYear) {
      this.currentYear = newYear;
      this.updateVisualization(this.currentYear, false);
    }
  }
  
  findCurrentYear(progress) {
    // 计算时间线上的时间
    const time = progress * this.chartTimeline.duration();
    
    // 找到最接近的年份标签
    let closestYear = this.years[0];
    let minDistance = Number.MAX_VALUE;
    
    this.years.forEach(year => {
      const labelTime = this.chartTimeline.labels[year];
      const distance = Math.abs(labelTime - time);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestYear = year;
      }
    });
    
    return parseInt(closestYear);
  }
  
  togglePlayback() {
    if (this.isPlaying) {
      // 暂停动画
      this.chartTimeline.pause();
      this.playButton.textContent = '播放';
    } else {
      // 检查是否已到结尾
      if (this.currentYear >= this.endYear) {
        // 重置到开始
        this.chartTimeline.seek(0);
        this.currentYear = parseInt(this.years[0]);
      }
      
      // 设置播放速度
      this.chartTimeline.timeScale(this.playbackSpeed);
      
      // 开始播放
      this.chartTimeline.play();
      this.playButton.textContent = '暂停';
      
      // 设置完成后的回调
      this.chartTimeline.eventCallback('onComplete', () => {
        this.isPlaying = false;
        this.playButton.textContent = '播放';
        this.currentYear = this.endYear;
      });
    }
    
    this.isPlaying = !this.isPlaying;
  }
  
  updateYearDisplay(year) {
    this.currentYear = parseInt(year);
    this.yearDisplay.textContent = year;
    this.updateVisualization(this.currentYear, false);
    
    // 更新滑块位置
    const yearIndex = this.years.indexOf(year.toString());
    const progress = yearIndex / (this.years.length - 1) * 100;
    this.timelineSlider.value = progress;
  }
  
  updateVisualization(year, immediate) {
    // 获取当前年份数据
    const yearData = this.data[year];
    if (!yearData) return;
    
    // 获取激活的类别
    const activeCategories = Array.from(
      this.container.querySelectorAll('.category-filter:checked')
    ).map(checkbox => checkbox.value);
    
    // 更新每个条形
    this.categories.forEach((category, index) => {
      const isActive = activeCategories.includes(category);
      const value = isActive ? yearData[category] : 0;
      const bar = this.barElements[index];
      
      // 计算高度百分比
      const heightPercent = (value / this.maxValue) * 100;
      
      // 应用动画或立即更新
      if (immediate) {
        gsap.set(bar.valueElement, {
          height: `${heightPercent}%`,
          opacity: isActive ? 1 : 0.3
        });
        bar.valueElement.textContent = Math.round(value);
      } else {
        gsap.to(bar.valueElement, {
          height: `${heightPercent}%`,
          opacity: isActive ? 1 : 0.3,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => {
            // 计算当前动画中的值
            const currentHeight = parseFloat(bar.valueElement.style.height) || 0;
            const currentValue = (currentHeight / 100) * this.maxValue;
            bar.valueElement.textContent = Math.round(currentValue);
          }
        });
      }
    });
  }
}

// 初始化数据可视化控制器
document.addEventListener('DOMContentLoaded', () => {
  const vizController = new DataVisualizationController('#data-viz');
});
```

#### 案例分析

1. **时间控制**：使用`timeScale`控制动画播放速度，实现快进和慢放功能。
2. **进度跟踪**：通过标签系统和`progress`方法，实现精确的时间轴位置控制。
3. **动态更新**：基于用户交互（滑块、筛选器）动态更新数据可视化。
4. **平滑过渡**：在数据更新时使用GSAP动画，实现值变化的平滑过渡。
5. **事件回调**：使用事件回调（`onUpdate`、`onComplete`）同步UI状态。

::: tip 案例启示
这两个案例展示了GSAP高级控制在实际项目中的应用：
- **分离关注点**：将动画逻辑、数据管理和UI控制分离，提高代码可维护性
- **响应式设计**：动画系统能够响应用户交互和数据变化，提供流畅的用户体验
- **优雅降级**：处理错误情况（如数据加载失败），确保动画系统依然能够工作
- **性能考量**：通过状态跟踪和动画优化，确保复杂交互场景下的性能
:::

## 实战练习

尝试应用本章所学的高级控制技术，创建具有复杂交互的动画系统。

### 练习一：创建可控制的多状态过渡动画

设计一个具有多个视觉状态的UI组件，并实现以下功能：

1. 状态之间的平滑过渡动画
2. 可以暂停、恢复和反向播放过渡动画
3. 提供时间控制（加速、减速）
4. 状态转换过程中的交互保护

#### 实现思路

1. 使用状态机模式管理UI状态和转换逻辑
2. 为每种状态转换创建专用动画时间轴
3. 利用GSAP的控制方法实现动画控制
4. 添加交互保护逻辑，防止状态转换中断

### 练习二：构建时间轴控制器组件

创建一个通用的时间轴控制器组件，可以应用于任何GSAP动画，提供以下功能：

1. 播放、暂停、重置控制
2. 进度条拖动控制
3. 时间缩放控制
4. 关键帧跳转功能
5. 时间显示

#### 实现思路

1. 创建一个可复用的控制器类
2. 实现UI元素与GSAP时间轴的双向绑定
3. 添加事件监听器处理用户交互
4. 使用GSAP的事件回调更新UI状态

### 练习三：设计全局动画管理系统

为一个多页面应用设计一个全局动画管理系统，实现以下功能：

1. 集中管理所有动画实例
2. 页面转换时的动画协调
3. 基于用户偏好的动画控制（如减弱动画模式）
4. 动画性能监控和自动优化

#### 实现思路

1. 创建单例动画管理器类
2. 实现动画注册和组织机制
3. 添加全局配置和用户偏好控制
4. 集成性能监控和优化逻辑

### 挑战任务：构建交互式故事体验

创建一个交互式故事体验，结合所有学到的高级控制技术：

1. 分段故事情节，每段有独特的动画效果
2. 用户可以控制故事的播放进度和速度
3. 包含分支选择，影响后续动画展示
4. 提供回顾功能，可以回到之前的情节
5. 响应式设计，适应不同设备

#### 实现思路

1. 设计模块化的故事结构和状态管理
2. 使用嵌套时间轴组织复杂的动画序列
3. 实现条件分支和动态参数调整
4. 创建自定义控制界面，实现精确的时间控制
5. 添加性能监控和优化措施

完成这些练习后，你将能够在实际项目中灵活应用GSAP的高级控制技术，创建专业级的动画交互体验。 