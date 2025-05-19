# 回调函数与事件

GSAP提供了强大的回调函数系统，让你能够在动画的不同阶段执行代码。通过这些回调，你可以创建复杂的交互和连锁动画效果。本章将详细介绍如何使用GSAP的回调函数和事件系统。

::: tip 💡 回调函数心智模型
把回调函数想象成**动画旅程中的检查点**：
- **onStart** - 出发点，旅程开始时
- **onUpdate** - 沿途的路标，记录整个旅途
- **onComplete** - 终点站，表示已到达目的地
- **onRepeat** - 环形路线的起点，每次循环都会经过
- **onReverseComplete** - 回到起点的标记，表示完成了往返旅程
:::

<script setup>
import BasicCallbacks from '../../modules/animations/callbacks/basic-callbacks.vue';
import CallbackParams from '../../modules/animations/callbacks/callback-params.vue';
import CallbackScope from '../../modules/animations/callbacks/callback-scope.vue';
import EventListeners from '../../modules/animations/callbacks/event-listeners.vue';
</script>

## 常用回调函数

GSAP提供了一套完整的回调函数机制，可以在动画生命周期的关键节点精确触发自定义行为。每个回调都有其特定的触发时机和执行上下文，掌握这些细节对于创建精确的交互至关重要。

### 核心回调函数详解

<BasicCallbacks />

::: info 📌 操作指引
👆 点击上方的"播放动画"按钮，观察右侧日志区域显示的回调函数触发顺序和时机。注意onUpdate是如何随着动画进度频繁触发的。
:::

GSAP中的回调函数按触发时机可分为以下几类：

- **onStart** - 动画第一次开始时触发（即使从中间位置开始也只触发一次）
- **onUpdate** - 每次动画更新时触发（实质上是每一帧，通常约60次/秒）
- **onComplete** - 动画完成到终点后触发
- **onRepeat** - 动画每次重复开始时触发（需设置repeat属性）
- **onReverseComplete** - 动画反向完成到起点时触发

### 回调函数的触发时机与特性

回调函数的触发遵循特定规则，理解这些规则对于调试至关重要：

```javascript
gsap.to(".element", {
  x: 100,
  duration: 1,
  delay: 0.5,         // 延迟0.5秒开始
  repeat: 2,          // 重复2次（总共执行3次）
  yoyo: true,         // 往返运动
  onStart: () => console.log("动画开始 - 在delay后才触发"),
  onUpdate: () => console.log("动画更新 - 每帧触发，频率取决于设备性能"),
  onRepeat: () => console.log("动画重复 - 每次循环开始时触发"),
  onComplete: () => console.log("动画完成 - 所有重复次数结束后触发"),
  onReverseComplete: () => console.log("反向完成 - 在yoyo或reverse()后触发")
});
```

**关键触发特性**：

- `delay`会延迟`onStart`的触发
- `onUpdate`在动画暂停时不会触发
- `onRepeat`在`repeat: -1`（无限循环）时也会正常触发
- `onComplete`只在最后一次重复完成后触发一次
- 在时间轴中，每个子动画的回调都会独立触发

::: warning ⚠️ 常见误区
新手常见的错误是认为`onUpdate`只会触发几次，但实际上它在**每一帧**都会触发（约60次/秒），在此回调中放置复杂计算会导致严重性能问题。
:::

::: tip 小贴士：回调函数的真实身份
在GSAP内部，所有回调函数最终都被转换为`eventCallback()`方法的调用。例如，`onComplete: myFunction` 等价于 `animation.eventCallback("onComplete", myFunction)`。了解这一点有助于理解事件系统。
:::

## 回调函数参数传递机制

GSAP回调系统支持复杂的参数传递，让你能够在回调触发时获取动态数据和上下文。了解参数传递的完整语法可以让你构建更灵活的动画逻辑。

### 参数传递的多种方式

<CallbackParams />

::: info 📌 操作指引
👆 点击"播放动画"按钮，观察每个盒子完成动画时，回调如何接收不同的参数并反馈在日志区域。注意每个元素都传递了自己的信息给回调函数。
:::

| 参数传递方式 | 语法 | 适用场景 | 优势 |
|------------|------|----------|------|
| **onCompleteParams** | `onComplete: fn, onCompleteParams: [param1, param2]` | 简单参数传递 | 清晰明了，代码简洁 |
| **数组形式** | `onComplete: [fn, [param1, param2], scope]` | 需要自定义作用域 | 可同时设置参数和作用域 |
| **函数闭包** | `onComplete: () => handleComplete(param1, param2)` | 动态计算参数 | 可使用当前作用域中的变量 |

#### 1. 使用onCompleteParams形式（推荐用于简单场景）

```javascript
// 推荐: 直观明了的参数传递
gsap.to(".element", {
  x: 100,
  duration: 1,
  onComplete: handleComplete,
  onCompleteParams: ["参数1", 42, {key: "value"}]  // 传递多个不同类型的参数
});

function handleComplete(param1, param2, param3) {
  console.log(param1, param2, param3);  // "参数1", 42, {key: "value"}
}
```

#### 2. 使用数组形式（推荐用于复杂场景）

```javascript
// 推荐: 当需要同时设置作用域时
gsap.to(".element", {
  x: 100,
  duration: 1,
  onComplete: [
    handleComplete,      // 第一个元素: 回调函数
    ["参数1", 42],       // 第二个元素: 参数数组
    customScope          // 第三个元素: 作用域对象(可选)
  ]
});
```

::: warning ⚠️ 避免常见错误
不要混淆以下两种写法，它们的行为完全不同：
```javascript
// 这是传递参数的正确方式
onComplete: handleComplete,
onCompleteParams: ["参数1", "参数2"]

// 这是创建匿名函数的方式，无法接收GSAP传递的参数
onComplete: () => handleComplete("参数1", "参数2")
```
在第二种写法中，箭头函数会立即执行，而非等待动画完成。
:::

### 动态参数技巧

在实际开发中，经常需要传递动态创建的参数：

```javascript
// 循环创建多个动画，每个都带有唯一标识符
elements.forEach((el, index) => {
  gsap.to(el, {
    x: 100,
    onComplete: handleComplete,
    onCompleteParams: [
      index,                          // 传递元素索引
      el.dataset.id,                  // 传递元素自定义属性
      gsap.utils.random(0, 100, 1)    // 传递随机生成的值
    ]
  });
});
```

::: tip 💡 实用技巧：传递当前动画元素
如果想在回调中操作当前动画的目标元素，可以直接传递：
```javascript
gsap.to(".element", {
  x: 100,
  onComplete: handleElement,
  onCompleteParams: ["{self}"]  // 特殊标记，GSAP会替换为动画实例
});

function handleElement(animation) {
  // animation是完整的动画实例
  const elements = animation.targets();  // 获取目标元素
  elements.forEach(el => el.classList.add("completed"));
}
```
:::

### 参数与动画实例的结合

回调参数可以与动画实例的方法结合使用：

```javascript
function handleUpdate(element, customData) {
  // this指向动画实例
  const progress = this.progress();
  element.style.opacity = progress;  // 根据动画进度设置透明度
  console.log(`动画${customData}进度: ${progress * 100}%`);
}
```

## 回调作用域（this）的精确控制

在GSAP回调函数中，`this`关键字的绑定方式直接影响代码的行为。掌握作用域控制可以让你编写更简洁和可维护的代码。

### 默认作用域与自定义作用域

<CallbackScope />

::: info 📌 操作指引
👆 分别点击"默认作用域"和"自定义作用域"按钮，比较两种模式下日志输出的不同。注意观察`this`关键字的指向如何影响可用的方法和属性。
:::

#### 默认作用域的方法和属性

当使用传统函数时，回调内部的`this`默认指向动画实例（tween），提供以下有用的方法和属性：

| 方法/属性 | 返回值 | 用途 |
|----------|--------|------|
| **this.progress()** | 0-1之间的数字 | 获取动画完成度百分比 |
| **this.time()** | 秒数 | 获取当前播放位置 |
| **this.duration()** | 秒数 | 获取动画总时长 |
| **this.totalProgress()** | 0-1之间的数字 | 获取包含重复在内的总进度 |
| **this.totalTime()** | 秒数 | 获取包含重复在内的总时间 |
| **this.targets()** | 元素数组 | 获取动画目标元素 |
| **this.vars** | 对象 | 获取动画创建时的所有参数 |
| **this.parent()** | 时间轴实例 | 获取父时间轴 |

```javascript
// 默认作用域示例
gsap.to(".box", {
  x: 300,
  duration: 2,
  onUpdate: function() {
    // 这里的this指向动画实例
    console.log("进度:", this.progress());
    console.log("当前时间:", this.time());
    
    // 可以用来动态控制动画
    if (this.progress() > 0.5) {
      this.timeScale(2);  // 加速动画
    }
  }
});
```

#### 默认作用域 vs 自定义作用域

<div class="code-comparison">
<div class="code-column">

**默认作用域（推荐用于访问动画实例）**

```javascript
// 使用传统函数语法
gsap.to(".element", {
  x: 100,
  duration: 1,
  onUpdate: function() {
    // this指向动画实例
    const progress = this.progress();
    console.log("进度:", progress);
    
    // 获取目标元素
    const target = this.targets()[0];
    target.classList.toggle(
      "highlight", 
      progress > 0.5
    );
  }
});
```

</div>
<div class="code-column">

**自定义作用域（用于访问外部对象）**

```javascript
// 创建自定义对象
const gameState = {
  score: 0,
  addPoints(amount) {
    this.score += amount;
    console.log("得分:", this.score);
  }
};

gsap.to(".element", {
  x: 100,
  callbackScope: gameState,
  onComplete: function() {
    // this指向gameState
    this.addPoints(10);
  }
});
```

</div>
</div>

::: warning ⚠️ 箭头函数陷阱
**箭头函数不会绑定自己的this**，它会保留外部作用域的this值。这会导致在回调中无法访问动画实例：

```javascript
// 问题代码
gsap.to(".element", {
  x: 100,
  onUpdate: () => {
    // 警告: 这里的this不是动画实例!
    console.log(this.progress());  // 错误: this.progress不是函数
  }
});

// 正确做法: 需要访问动画实例时使用传统函数
gsap.to(".element", {
  x: 100,
  onUpdate: function() {
    console.log(this.progress());  // 正常工作
  }
});
```
:::

#### 适用场景对照表

| 场景 | 推荐作用域 | 示例 |
|------|-----------|------|
| 需要访问动画进度/时间 | 默认作用域 | `onUpdate: function() { console.log(this.progress()); }` |
| 需要访问动画目标元素 | 默认作用域 | `onUpdate: function() { this.targets()[0].textContent = "更新中"; }` |
| 需要在回调中控制动画 | 默认作用域 | `onUpdate: function() { if(condition) this.pause(); }` |
| 需要在回调中访问组件数据 | 自定义作用域 | `onComplete: [fn, params, componentInstance]` |
| 需要在回调中访问多个动画的共享状态 | 自定义作用域 | `callbackScope: sharedState` |
| 需要在Vue/React组件中访问组件方法 | 箭头函数 | `onComplete: () => this.componentMethod()` |

### 自定义作用域技术

为所有回调设置统一作用域：

```javascript
// 创建自定义上下文对象
const gameContext = {
  score: 0,
  level: 1,
  updateScore: function(points) {
    this.score += points;
    document.querySelector('.score').textContent = this.score;
  }
};

// 为所有回调设置统一作用域
gsap.to(".character", {
  x: 500,
  duration: 2,
  callbackScope: gameContext,  // 所有回调中this都指向gameContext
  onStart: function() {
    console.log(`关卡${this.level}开始!`);
  },
  onUpdate: function() {
    // 在游戏上下文中操作
    if (Math.random() > 0.95) {
      this.updateScore(10);
    }
  },
  onComplete: function() {
    this.level++;
    console.log(`升级到${this.level}!`);
  }
});
```

::: tip 🌟 最佳实践：明确选择作用域
根据需要明确选择合适的函数类型和作用域设置：
- **访问动画属性和方法**：使用传统`function`关键字
- **访问组件实例或外部变量**：使用箭头函数`() => {}`
- **需要既访问动画实例又访问外部变量**：使用`onCompleteParams`传递外部变量
- **为多个相关回调统一提供上下文**：使用`callbackScope`设置共享上下文
:::

<style>
.code-comparison {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}
.code-column {
  flex: 1;
  min-width: 0;
}
</style>

## 事件监听系统

除了常规回调外，GSAP还提供了一个完整的事件系统，允许你为动画的任何实例添加和移除事件监听器。这种方式在复杂应用中特别有价值，因为它提供了更强的解耦和更灵活的控制。

### 全局事件与实例事件

<EventListeners />

GSAP提供两级事件监听机制：

#### 1. 动画实例级别事件

```javascript
// 创建动画
const tween = gsap.to(".box", {x: 300, duration: 2});

// 动态添加监听器(可以在动画创建后随时添加)
tween.eventCallback("onUpdate", function() {
  console.log("更新:", this.progress());
});

// 移除监听器
tween.eventCallback("onUpdate", null);

// 带参数添加监听器
tween.eventCallback("onComplete", handleComplete, ["动画1完成", true], customScope);

// 获取当前监听器
const currentCallback = tween.eventCallback("onComplete");
```

#### 2. 全局事件监听

```javascript
// 监听所有动画的开始事件
gsap.globalTimeline.addEventListener("start", function(event) {
  console.log("有动画开始了:", event.target);
});

// 监听所有补间动画完成事件
gsap.ticker.addEventListener("complete", function(event) {
  console.log("有动画完成了:", event);
});
```

### 事件对象详解

事件监听器接收一个事件对象，包含丰富的信息：

```javascript
gsap.globalTimeline.addEventListener("start", function(event) {
  console.log(event.target);         // 触发事件的动画实例
  console.log(event.type);           // 事件类型("start")
  console.log(event.target.targets); // 动画目标元素
  console.log(event.target.vars);    // 动画参数对象
});
```

### ticker事件系统

GSAP的动画引擎基于ticker系统，可以直接监听：

```javascript
// 添加每帧回调(相当于requestAnimationFrame)
gsap.ticker.add(function(time, deltaTime, frame) {
  console.log(`帧${frame}: 经过${time}ms, 增量${deltaTime}ms`);
});

// 移除ticker回调
gsap.ticker.remove(myTickerFunction);

// 暂停全局ticker(会暂停所有动画)
gsap.ticker.sleep();

// 唤醒全局ticker
gsap.ticker.wake();
```

## 高级应用技巧

回调函数的真正威力在于它们能够实现复杂的动画协作和控制逻辑。以下是一些高级应用模式。

### 动画链与条件分支

创建动态决策的动画序列：

```javascript
function playSequence(element, condition) {
  // 创建基础动画
  const tl = gsap.timeline();
  
  // 第一段动画
  tl.to(element, {
    x: 200,
    duration: 1,
    onComplete: function() {
      // 根据条件选择不同的后续动画路径
      if (condition) {
        this.parent.to(element, {  // 注意this.parent访问时间轴
          y: 100,
          scale: 1.5,
          duration: 0.5
        });
      } else {
        this.parent.to(element, {
          rotation: 360,
          backgroundColor: "red",
          duration: 0.8
        });
      }
    }
  });
  
  return tl;
}
```

### 计算密集型操作优化

在`onUpdate`回调中执行频繁操作时，需要考虑性能：

```javascript
gsap.to(".element", {
  x: 500,
  duration: 3,
  // 不良做法: 每帧执行重计算
  onUpdate: function() {
    // 这会在每一帧执行，大约60次/秒
    heavyCalculation();  // 性能杀手!
  }
});

// 优化做法: 节流重计算
gsap.to(".element", {
  x: 500,
  duration: 3,
  onUpdate: function() {
    // 获取进度百分比(0-100)
    const progress = Math.round(this.progress() * 100);
    
    // 只在整10%的节点触发计算
    if (progress % 10 === 0 && progress > 0) {
      // 每10%触发一次，而不是每帧
      heavyCalculation(progress);
    }
  }
});
```

### 回调函数与状态管理

在复杂应用中集成回调与状态系统：

```javascript
// 假设有一个简单的状态管理器
const appState = {
  isAnimating: false,
  lastAnimationCompleted: null,
  animationCount: 0,
  updateUI() {
    document.querySelector(".status").textContent = this.isAnimating 
      ? "动画进行中..." 
      : `已完成 ${this.animationCount} 个动画`;
  }
};

// 创建与状态集成的动画
function createAnimationWithState(selector) {
  // 更新状态
  appState.isAnimating = true;
  appState.updateUI();
  
  return gsap.to(selector, {
    x: 300,
    duration: 2,
    onStart: function() {
      console.log("动画开始，当前状态:", appState);
    },
    onUpdate: function() {
      // 可以在这里更新进度指示器
      document.querySelector(".progress").style.width = 
        this.progress() * 100 + "%";
    },
    onComplete: function() {
      // 更新应用状态
      appState.isAnimating = false;
      appState.lastAnimationCompleted = new Date();
      appState.animationCount++;
      appState.updateUI();
      
      // 可以触发后续逻辑
      checkAndRunNextAnimation();
    }
  });
}
```

### 全局错误处理

为回调添加错误处理机制：

```javascript
// 通用错误处理包装函数
function withErrorHandling(callback) {
  return function(...args) {
    try {
      return callback.apply(this, args);
    } catch (error) {
      console.error("动画回调错误:", error);
      // 可以上报错误或执行备用逻辑
      gsap.globalTimeline.resume(); // 确保系统不会卡住
      return false;
    }
  };
}

// 使用包装函数
gsap.to(".element", {
  x: 300,
  onComplete: withErrorHandling(function() {
    // 即使这里出错，也不会中断整个动画系统
    document.querySelector("#non-existent").innerHTML = "更新";
  })
});
```

## 高级同步模式

GSAP回调可以实现多个动画、音频、视频和用户交互之间的精确同步。

### 帧精确同步

```javascript
// 在特定动画时刻触发音效
const tl = gsap.timeline();

tl.to(".character", {
  x: 500,
  duration: 2,
  onUpdate: function() {
    // 在30%处播放脚步声
    if (this.progress() > 0.3 && this.progress() < 0.31) {
      playFootstepSound();
    }
    
    // 在60%处播放跳跃声
    if (this.progress() > 0.6 && this.progress() < 0.61) {
      playJumpSound();
    }
  }
});
```

### 视频同步

```javascript
// 使动画与视频播放同步
const video = document.querySelector("video");
const tl = gsap.timeline({
  paused: true,
  onUpdate: function() {
    // 根据动画进度设置视频时间
    const videoDuration = video.duration;
    video.currentTime = videoDuration * this.progress();
  }
});

// 添加动画内容
tl.to(".element1", {x: 300, duration: 2})
  .to(".element2", {y: 200, duration: 1.5})
  .to(".element3", {rotation: 360, duration: 2.5});

// 视频控制动画
video.addEventListener("play", () => tl.play());
video.addEventListener("pause", () => tl.pause());
video.addEventListener("seeked", () => {
  // 根据视频位置设置动画进度
  const progress = video.currentTime / video.duration;
  tl.progress(progress);
});
```

### 回调间通信

通过闭包变量在不同回调间共享状态：

```javascript
// 创建共享状态
let sharedData = {
  hits: 0,
  maxSpeed: 1,
  elements: []
};

// 第一个动画将数据传递给第二个
gsap.to(".first", {
  x: 300,
  duration: 2,
  onUpdate: function() {
    // 更新共享数据
    sharedData.speed = this.timeScale();
    sharedData.elements.push(this.targets()[0]);
  },
  onComplete: function() {
    // 完成时启动下一个动画
    gsap.to(".second", {
      x: 500,
      // 使用第一个动画收集的数据
      duration: sharedData.maxSpeed * 2,
      // 动态创建回调参数
      onComplete: handleComplete,
      onCompleteParams: [sharedData.elements]
    });
  }
});
```

## 实际应用场景分析

回调函数在实际项目中有许多关键用途，以下是常见应用场景的深入分析。

### 1. 多阶段动画与转场效果

使用回调创建多阶段转场，如页面切换效果：

```javascript
function pageTransition(fromPage, toPage) {
  // 第一阶段：当前页面淡出
  gsap.to(fromPage, {
    opacity: 0,
    y: -50,
    duration: 0.4,
    onComplete: function() {
      // 第二阶段：隐藏当前页，准备新页面
      fromPage.style.display = "none";
      toPage.style.display = "block";
      gsap.set(toPage, {opacity: 0, y: 50});
      
      // 第三阶段：新页面淡入
      gsap.to(toPage, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        onComplete: function() {
          // 第四阶段：完成后初始化新页面内容
          initPageContent(toPage);
        }
      });
    }
  });
}
```

### 2. 条件逻辑与互动体验

基于用户行为或动画状态动态调整动画：

```javascript
// 为游戏角色创建受控跳跃动画
function characterJump(character, jumpHeight) {
  let hasLanded = false;
  let obstacleHit = false;
  
  return gsap.to(character, {
    y: -jumpHeight,
    ease: "power2.out",
    duration: 0.5,
    onUpdate: function() {
      // 碰撞检测
      obstacleHit = checkCollision(character);
      if (obstacleHit && !hasLanded) {
        // 中断上升，开始下落
        hasLanded = true;
        this.pause();
        characterFall(character, this.progress() * jumpHeight);
      }
    },
    onComplete: function() {
      if (!obstacleHit) {
        // 正常完成跳跃，开始下落
        characterFall(character, jumpHeight);
      }
    }
  });
}

function characterFall(character, fromHeight) {
  gsap.to(character, {
    y: 0, // 回到地面
    ease: "power2.in",
    duration: 0.4 * (fromHeight / 100),
    onComplete: function() {
      // 落地动作
      playLandingAnimation(character);
    }
  });
}
```

### 3. 性能监控与优化

使用回调监控动画性能：

```javascript
// 创建性能追踪器
function createPerformanceTracker() {
  const metrics = {
    startTime: 0,
    updateCount: 0,
    frameDrops: 0,
    lastFrameTime: 0
  };
  
  return {
    track: function(animation) {
      // 添加性能监控回调
      animation.eventCallback("onStart", function() {
        metrics.startTime = performance.now();
        metrics.lastFrameTime = metrics.startTime;
        console.log("动画开始追踪");
      });
      
      animation.eventCallback("onUpdate", function() {
        metrics.updateCount++;
        const now = performance.now();
        const frameDelta = now - metrics.lastFrameTime;
        
        // 检测丢帧 (假设目标是60fps，即16.7ms/帧)
        if (frameDelta > 20) { // 允许一点缓冲
          metrics.frameDrops++;
          console.warn(`检测到丢帧: ${frameDelta.toFixed(1)}ms`);
        }
        
        metrics.lastFrameTime = now;
      });
      
      animation.eventCallback("onComplete", function() {
        const totalTime = performance.now() - metrics.startTime;
        console.log(`性能报告:
          - 总时长: ${totalTime.toFixed(0)}ms
          - 更新次数: ${metrics.updateCount}
          - 丢帧次数: ${metrics.frameDrops}
          - 平均帧率: ${(metrics.updateCount / (totalTime / 1000)).toFixed(1)}fps
        `);
      });
      
      return animation;
    }
  };
}

// 使用追踪器
const tracker = createPerformanceTracker();
tracker.track(
  gsap.to(".complex-animation", {x: 500, duration: 2})
);
```

## 高级调试技巧

### 回调调试器

创建一个通用回调调试工具：

```javascript
// 回调调试器
function createCallbackDebugger(name) {
  return {
    wrapAnimation: function(animation) {
      const self = this;
      const wrappedCallbacks = {};
      
      ["Start", "Update", "Complete", "Repeat", "ReverseComplete"].forEach(type => {
        const callbackName = "on" + type;
        
        // 保存原始回调
        const originalCallback = animation.vars[callbackName];
        
        // 创建包装回调
        wrappedCallbacks[callbackName] = function() {
          self.log(type, this);
          
          // 调用原始回调(如果存在)
          if (originalCallback) {
            if (Array.isArray(originalCallback)) {
              // 处理数组格式回调
              const fn = originalCallback[0];
              const params = originalCallback[1] || [];
              const scope = originalCallback[2] || this;
              return fn.apply(scope, params);
            } else {
              // 处理函数格式回调
              return originalCallback.apply(this, arguments);
            }
          }
        };
      });
      
      // 应用包装回调
      for (const key in wrappedCallbacks) {
        animation.eventCallback(key, wrappedCallbacks[key]);
      }
      
      return animation;
    },
    
    log: function(type, tweenInstance) {
      console.log(`[${name}] ${type} 回调:`, {
        progress: tweenInstance.progress(),
        time: tweenInstance.time(),
        targets: tweenInstance.targets(),
        timestamp: new Date().toISOString().substr(11, 12)
      });
    }
  };
}

// 使用调试器
const debugger = createCallbackDebugger("主角动画");
debugger.wrapAnimation(
  gsap.to("#hero", {x: 300, duration: 2})
);
```

## 练习与挑战

通过以下高级练习来掌握GSAP回调函数：

1. **连锁反应动画**：创建一个连锁反应，使用`onUpdate`和`onComplete`回调在特定时刻触发新的动画，形成视觉连锁反应效果。

2. **动态进度指示器**：使用`onUpdate`回调创建一个复杂的进度指示器，包括百分比显示、分段进度条和视觉反馈。

3. **有状态动画控制器**：创建一个动画状态管理系统，使用回调函数在不同动画阶段更新状态，并根据状态动态调整后续动画。

4. **异步API集成**：使用回调函数与异步API操作协调，例如在动画特定点获取数据，然后根据返回结果调整动画路径。

5. **交互式时间轴构建器**：实现一个可视化时间轴编辑器，允许用户通过界面添加回调点，并在这些点上执行自定义代码。

## 高级注意事项与最佳实践

### 性能考量

- **避免回调阻塞**：`onUpdate`回调中的重操作会导致动画卡顿
  ```javascript
  // 不良做法
  onUpdate: function() {
    document.querySelectorAll('.item').forEach(el => complexCalculation(el));
  }
  
  // 优化做法：节流或使用requestAnimationFrame
  let lastUpdate = 0;
  onUpdate: function() {
    const now = Date.now();
    if (now - lastUpdate > 100) { // 限制为最多每100ms执行一次
      lastUpdate = now;
      requestAnimationFrame(() => {
        document.querySelectorAll('.item').forEach(el => complexCalculation(el));
      });
    }
  }
  ```

- **避免DOM重排**：批量处理DOM更新以减少布局抖动
  ```javascript
  // 优化DOM操作
  onUpdate: function() {
    // 读取操作集中在前面
    const progress = this.progress();
    const elements = document.querySelectorAll('.item');
    const values = [];
    
    // 计算所有值
    elements.forEach(el => {
      values.push(calculateValue(el, progress));
    });
    
    // 写入操作集中在后面
    elements.forEach((el, i) => {
      el.style.transform = `translateX(${values[i]}px)`;
    });
  }
  ```

### 内存管理

- **防止内存泄漏**：清理不再需要的闭包引用
  ```javascript
  // 潜在的内存泄漏
  function setupAnimation() {
    const largeData = new Array(10000).fill('data');
    
    gsap.to('.element', {
      x: 100,
      onComplete: function() {
        // 这个回调持有largeData的引用，即使动画完成也不会释放
        console.log(largeData.length);
      }
    });
  }
  
  // 改进：使用弱引用或显式清理
  function setupSafeAnimation() {
    let largeData = new Array(10000).fill('data');
    
    gsap.to('.element', {
      x: 100,
      onComplete: function() {
        console.log(largeData.length);
        largeData = null; // 显式清理引用
      }
    });
  }
  ```

- **使用合适的事件清理**：在组件卸载时移除全局事件监听器
  ```javascript
  // Vue组件中的清理示例
  mounted() {
    this.animation = gsap.to('.target', {x: 100});
    gsap.globalTimeline.addEventListener("complete", this.handleGlobalComplete);
  },
  beforeUnmount() {
    // 清理资源
    if (this.animation) this.animation.kill();
    gsap.globalTimeline.removeEventListener("complete", this.handleGlobalComplete);
  }
  ```

### 调试技巧

- **使用标记调试法**：在关键回调中添加视觉标记
  ```javascript
  gsap.to('.element', {
    x: 500,
    onStart: function() {
      // 添加可视标记
      const marker = document.createElement('div');
      marker.className = 'debug-marker start-marker';
      marker.style.left = '0px';
      document.body.appendChild(marker);
      
      // 2秒后自动移除
      setTimeout(() => marker.remove(), 2000);
    },
    onComplete: function() {
      // 类似地添加完成标记
      const marker = document.createElement('div');
      marker.className = 'debug-marker complete-marker';
      marker.style.left = '500px';
      document.body.appendChild(marker);
      setTimeout(() => marker.remove(), 2000);
    }
  });
  ```

- **时间轴可视化**：创建回调执行的可视时间轴
  ```javascript
  const timeline = [];
  
  gsap.to('.element', {
    x: 500,
    duration: 2,
    onStart: () => timeline.push({event: 'start', time: Date.now()}),
    onUpdate: function() {
      if (Math.round(this.progress() * 10) % 2 === 0) {
        timeline.push({event: 'update', progress: this.progress(), time: Date.now()});
      }
    },
    onComplete: () => {
      timeline.push({event: 'complete', time: Date.now()});
      console.table(timeline);
      renderTimelineVisualizer(timeline);
    }
  });
  ```

通过掌握这些高级技术，你可以创建更加复杂、响应式和性能优化的动画体验，同时保持代码的清晰度和可维护性。 

通过掌握这些高级技术，你可以创建更加复杂、响应式和性能优化的动画体验，同时保持代码的清晰度和可维护性。 
通过掌握这些高级技术，你可以创建更加复杂、响应式和性能优化的动画体验，同时保持代码的清晰度和可维护性。 
