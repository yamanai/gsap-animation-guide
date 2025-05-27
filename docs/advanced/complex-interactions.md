# 复杂交互动画开发

在动画与用户交互结合的场景中，需要设计高响应度、高性能的动画系统。本章将探讨如何构建复杂的交互动画，使其能够流畅地响应用户的各种操作。

## 多元素协同动画设计

创建多个元素协同工作的动画效果，使视觉表达更加丰富和有层次。

### 元素协同的基本原理

多元素协同动画是指多个元素按照特定的逻辑关系和时序，共同参与完成一个连贯的动画效果。协同动画能够创造出更加复杂和生动的视觉表现。

```javascript
// 基本的多元素协同动画
function createCoordinatedAnimation() {
  // 创建主时间轴
  const mainTimeline = gsap.timeline();
  
  // 添加多个元素的动画，形成协同效果
  mainTimeline
    .to(".circle", {scale: 1.5, duration: 0.5})
    .to(".square", {rotation: 45, duration: 0.5}, "<0.2") // 与上一个动画重叠0.2秒开始
    .to(".triangle", {y: -30, duration: 0.7}, "<0.3")     // 与上一个动画重叠0.3秒开始
    .to([".circle", ".square", ".triangle"], {
      opacity: 0.7,
      duration: 0.4
    }, ">-0.2");  // 上一个动画结束前0.2秒开始
    
  return mainTimeline;
}
```

### 协同模式

多元素协同动画有几种常见的模式：

1. **串联式**：元素按顺序一个接一个地动画
2. **重叠式**：元素动画部分重叠，形成连贯过渡
3. **并行式**：多元素同时动画，但每个元素有自己的动画特性
4. **触发式**：一个元素的动画完成触发另一个元素的动画

```javascript
// 重叠式协同动画示例
function createOverlappingAnimation() {
  const cards = document.querySelectorAll(".card");
  const tl = gsap.timeline();
  
  // 设置初始状态
  gsap.set(cards, {y: 100, opacity: 0});
  
  // 创建重叠式入场动画
  cards.forEach((card, index) => {
    tl.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.4)"
    }, index * 0.15); // 每张卡片比前一张提前0.15秒开始动画
  });
  
  return tl;
}
```

### 层级协同设计

更复杂的协同动画可以通过层级设计来组织：

```javascript
// 层级协同动画
function createHierarchicalAnimation() {
  // 主时间轴
  const mainTimeline = gsap.timeline();
  
  // 第一组元素的动画
  const headerAnimation = gsap.timeline()
    .from(".header-logo", {x: -50, opacity: 0, duration: 0.5})
    .from(".header-nav li", {y: -20, opacity: 0, stagger: 0.1, duration: 0.4});
  
  // 第二组元素的动画
  const contentAnimation = gsap.timeline()
    .from(".hero-title", {y: 50, opacity: 0, duration: 0.6})
    .from(".hero-description", {y: 30, opacity: 0, duration: 0.5}, "-=0.3")
    .from(".hero-cta", {scale: 0.8, opacity: 0, duration: 0.5}, "-=0.2");
  
  // 第三组元素的动画
  const featuresAnimation = gsap.timeline()
    .from(".feature-item", {
      y: 40,
      opacity: 0,
      stagger: {
        each: 0.2,
        from: "center",
        grid: "auto"
      },
      duration: 0.6
    });
  
  // 将所有组动画添加到主时间轴
  mainTimeline
    .add(headerAnimation)
    .add(contentAnimation, "-=0.2")  // 第一组结束前0.2秒开始第二组
    .add(featuresAnimation, "+=0.3"); // 第二组结束后等待0.3秒开始第三组
  
  return mainTimeline;
}
```

::: tip 协同动画设计技巧
- 使用相对位置参数（如"<"、">"、"-="、"+="）精确控制时间关系
- 为复杂序列创建独立的子时间轴，提高可维护性
- 使用`stagger`参数创建有序的元素序列动画
- 考虑动画的视觉重量和焦点引导，避免同时有太多动画分散用户注意力
:::

## 基于用户交互的动态动画系统

学习如何设计能够响应各种用户交互的动态动画系统。

### 交互触发动画基础

交互动画的核心是将用户的操作（如点击、悬停、滚动等）与动画效果连接起来。

```javascript
// 基本的交互触发动画
function setupInteractionAnimations() {
  // 悬停动画
  document.querySelectorAll(".hover-item").forEach(item => {
    // 创建动画但不立即播放
    const hoverAnimation = gsap.to(item, {
      scale: 1.1,
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      duration: 0.3,
      paused: true
    });
    
    // 鼠标进入时播放动画
    item.addEventListener("mouseenter", () => hoverAnimation.play());
    
    // 鼠标离开时反向播放动画
    item.addEventListener("mouseleave", () => hoverAnimation.reverse());
  });
  
  // 点击动画
  document.querySelectorAll(".click-item").forEach(item => {
    item.addEventListener("click", () => {
      gsap.to(item, {
        backgroundColor: "#2ecc71",
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        duration: 0.2
      });
    });
  });
}
```

### 交互状态管理

在复杂的交互系统中，需要管理元素的多种状态和它们之间的转换。

```javascript
// 交互状态管理
class InteractiveElement {
  constructor(element) {
    this.element = element;
    this.currentState = "default";
    this.animations = {};
    
    // 创建各种状态的动画
    this.createAnimations();
    
    // 绑定交互事件
    this.bindEvents();
  }
  
  createAnimations() {
    // 默认状态到悬停状态
    this.animations.hover = gsap.to(this.element, {
      scale: 1.05,
      backgroundColor: "#f5f5f5",
      duration: 0.3,
      paused: true
    });
    
    // 默认状态到活跃状态
    this.animations.active = gsap.to(this.element, {
      scale: 0.98,
      backgroundColor: "#e0e0e0",
      duration: 0.2,
      paused: true
    });
    
    // 默认状态到禁用状态
    this.animations.disabled = gsap.to(this.element, {
      opacity: 0.5,
      grayscale: 1,
      duration: 0.3,
      paused: true
    });
  }
  
  bindEvents() {
    this.element.addEventListener("mouseenter", () => {
      if (this.currentState === "default") {
        this.changeState("hover");
      }
    });
    
    this.element.addEventListener("mouseleave", () => {
      if (this.currentState === "hover") {
        this.changeState("default");
      }
    });
    
    this.element.addEventListener("mousedown", () => {
      if (this.currentState === "hover" || this.currentState === "default") {
        this.changeState("active");
      }
    });
    
    this.element.addEventListener("mouseup", () => {
      if (this.currentState === "active") {
        this.changeState("hover");
      }
    });
  }
  
  changeState(newState) {
    // 如果状态没有变化，不做任何操作
    if (newState === this.currentState) return;
    
    // 从当前状态反转动画
    if (this.currentState !== "default") {
      this.animations[this.currentState].reverse();
    }
    
    // 播放新状态的动画
    if (newState !== "default") {
      this.animations[newState].play();
    }
    
    // 更新当前状态
    this.currentState = newState;
  }
  
  // 外部控制方法
  disable() {
    this.changeState("disabled");
    this.element.classList.add("disabled");
  }
  
  enable() {
    this.changeState("default");
    this.element.classList.remove("disabled");
  }
}

// 使用交互元素类
document.querySelectorAll(".interactive-button").forEach(button => {
  new InteractiveElement(button);
});
```

### 多类型交互响应

一个完善的交互动画系统需要响应多种类型的用户交互。

```javascript
// 响应多种交互类型
function setupMultiInteractionSystem() {
  // 1. 点击/触摸动画
  document.querySelectorAll(".touch-element").forEach(element => {
    element.addEventListener("click", (e) => {
      // 创建点击波纹效果
      const circle = document.createElement("div");
      circle.classList.add("ripple");
      
      // 计算波纹位置
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.set(circle, {
        left: x + "px",
        top: y + "px",
        scale: 0,
        opacity: 1
      });
      
      element.appendChild(circle);
      
      gsap.to(circle, {
        scale: 3,
        opacity: 0,
        duration: 0.6,
        onComplete: () => circle.remove()
      });
    });
  });
  
  // 2. 滚动触发动画
  const scrollElements = document.querySelectorAll(".scroll-element");
  
  function checkScroll() {
    scrollElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInView = (
        rect.top <= window.innerHeight * 0.8 &&
        rect.bottom >= window.innerHeight * 0.2
      );
      
      if (isInView && !element.classList.contains("animated")) {
        gsap.fromTo(element, 
          {y: 50, opacity: 0},
          {y: 0, opacity: 1, duration: 0.7}
        );
        element.classList.add("animated");
      }
    });
  }
  
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // 初始检查
  
  // 3. 拖拽交互
  const draggables = document.querySelectorAll(".draggable");
  
  draggables.forEach(draggable => {
    gsap.set(draggable, {cursor: "grab"});
    
    draggable.addEventListener("mousedown", () => {
      gsap.to(draggable, {scale: 0.95, duration: 0.2});
      gsap.set(draggable, {cursor: "grabbing"});
    });
    
    draggable.addEventListener("mouseup", () => {
      gsap.to(draggable, {scale: 1, duration: 0.2});
      gsap.set(draggable, {cursor: "grab"});
    });
    
    // 注意：这里只是视觉反馈，实际拖拽功能需要使用Draggable插件
  });
}
```

::: warning 注意事项
在移动设备上，需要处理触摸事件而非鼠标事件。可以使用事件监听器检测设备类型，或使用库如Hammer.js处理跨设备的手势。
:::

## 事件驱动动画架构

构建基于事件驱动的动画架构，使动画能够更加灵活地响应程序状态变化和用户交互。

### 事件系统基础

事件驱动架构允许动画系统与应用程序的其他部分解耦，通过事件通信进行协调。

```javascript
// 简单的事件总线
class AnimationEventBus {
  constructor() {
    this.events = {};
  }
  
  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    
    // 返回取消订阅的函数
    return () => this.off(eventName, callback);
  }
  
  // 取消订阅
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    
    this.events[eventName] = this.events[eventName]
      .filter(cb => cb !== callback);
  }
  
  // 触发事件
  emit(eventName, data) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach(callback => {
      callback(data);
    });
  }
}

// 创建全局事件总线
const animEvents = new AnimationEventBus();

// 使用事件总线
function setupEventDrivenAnimations() {
  // 订阅菜单打开事件
  animEvents.on("menu:open", () => {
    gsap.to(".menu-panel", {
      x: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
  
  // 订阅菜单关闭事件
  animEvents.on("menu:close", () => {
    gsap.to(".menu-panel", {
      x: "-100%",
      duration: 0.4,
      ease: "power2.in"
    });
  });
  
  // 触发事件的UI元素
  document.querySelector(".menu-toggle").addEventListener("click", () => {
    const menuPanel = document.querySelector(".menu-panel");
    const isOpen = menuPanel.style.transform !== "translateX(-100%)";
    
    if (isOpen) {
      animEvents.emit("menu:close");
    } else {
      animEvents.emit("menu:open");
    }
  });
}
```

### 组件通信动画

在组件化架构中，可以使用事件系统实现组件之间的动画协调。

```javascript
// 组件通信动画示例
class AnimatedComponent {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;
    this.isExpanded = false;
    this.timeline = gsap.timeline({paused: true});
    
    // 创建动画
    this.setupAnimation();
    
    // 绑定事件
    this.bindEvents();
  }
  
  setupAnimation() {
    // 展开动画
    this.timeline
      .to(this.element.querySelector(".component-header"), {
        backgroundColor: "#f0f0f0",
        duration: 0.3
      })
      .to(this.element.querySelector(".component-content"), {
        height: "auto",
        opacity: 1,
        duration: 0.5
      }, "-=0.1");
  }
  
  bindEvents() {
    // 本地交互
    this.element.querySelector(".component-header").addEventListener("click", () => {
      this.toggle();
    });
    
    // 监听全局事件
    this.eventBus.on("component:expandAll", () => {
      if (!this.isExpanded) {
        this.expand();
      }
    });
    
    this.eventBus.on("component:collapseAll", () => {
      if (this.isExpanded) {
        this.collapse();
      }
    });
  }
  
  toggle() {
    if (this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }
  
  expand() {
    this.timeline.play();
    this.isExpanded = true;
    // 通知其他组件
    this.eventBus.emit("component:expanded", {
      id: this.element.id
    });
  }
  
  collapse() {
    this.timeline.reverse();
    this.isExpanded = false;
    // 通知其他组件
    this.eventBus.emit("component:collapsed", {
      id: this.element.id
    });
  }
}

// 创建多个组件实例
document.querySelectorAll(".collapsible-component").forEach(element => {
  new AnimatedComponent(element, animEvents);
});

// 全局控制按钮
document.querySelector(".expand-all-btn").addEventListener("click", () => {
  animEvents.emit("component:expandAll");
});

document.querySelector(".collapse-all-btn").addEventListener("click", () => {
  animEvents.emit("component:collapseAll");
});
```

### 状态变化动画

使用事件驱动架构响应应用程序状态变化。

```javascript
// 状态驱动的动画系统
class StateAnimationController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.currentState = "default";
    this.transitions = {};
    
    // 注册状态转换动画
    this.registerTransitions();
    
    // 监听状态变化事件
    this.eventBus.on("app:stateChange", (newState) => {
      this.changeState(newState);
    });
  }
  
  registerTransitions() {
    // 从默认状态到加载状态
    this.transitions["default->loading"] = () => {
      return gsap.timeline()
        .to(".content-area", {opacity: 0.7, duration: 0.3})
        .to(".loading-spinner", {opacity: 1, scale: 1, duration: 0.3}, 0);
    };
    
    // 从加载状态到默认状态
    this.transitions["loading->default"] = () => {
      return gsap.timeline()
        .to(".content-area", {opacity: 1, duration: 0.3})
        .to(".loading-spinner", {opacity: 0, scale: 0.5, duration: 0.3}, 0);
    };
    
    // 从默认状态到错误状态
    this.transitions["default->error"] = () => {
      return gsap.timeline()
        .to(".content-area", {opacity: 0.5, duration: 0.3})
        .to(".error-message", {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out"
        }, 0);
    };
    
    // 其他状态转换...
  }
  
  changeState(newState) {
    if (newState === this.currentState) return;
    
    // 构建转换名称
    const transitionName = `${this.currentState}->${newState}`;
    
    // 执行对应的转换动画
    if (this.transitions[transitionName]) {
      const transition = this.transitions[transitionName]();
      transition.eventCallback("onComplete", () => {
        // 转换完成后更新当前状态
        this.currentState = newState;
        // 通知其他系统转换已完成
        this.eventBus.emit("animation:stateChangeComplete", newState);
      });
    } else {
      // 如果没有定义转换动画，直接更新状态
      this.currentState = newState;
      this.eventBus.emit("animation:stateChangeComplete", newState);
    }
  }
}

// 创建状态动画控制器
const stateController = new StateAnimationController(animEvents);

// 模拟应用程序状态变化
document.querySelector("#load-data-btn").addEventListener("click", () => {
  // 通知系统状态变为加载中
  animEvents.emit("app:stateChange", "loading");
  
  // 模拟数据加载
  setTimeout(() => {
    if (Math.random() > 0.3) {
      // 加载成功
      animEvents.emit("app:stateChange", "default");
    } else {
      // 加载失败
      animEvents.emit("app:stateChange", "error");
    }
  }, 2000);
});
```

::: tip 事件驱动设计优势
- **解耦**：动画逻辑与业务逻辑分离，便于维护
- **可扩展**：新功能可以通过订阅已有事件轻松集成
- **可测试**：各组件可以独立测试，通过模拟事件测试交互
- **状态同步**：多个UI元素可以协调响应同一事件
:::

事件驱动的动画架构特别适合复杂的单页应用、大型交互式网站和需要精确状态管理的项目。

## 条件分支动画实现方法

根据不同的交互条件和上下文，设计具有条件分支的动画逻辑。

### 条件分支动画的基本原理

条件分支动画是指根据不同的条件和上下文状态，执行不同的动画逻辑。这种动画模式增加了交互的复杂性和智能感，让用户感觉界面能够"理解"他们的操作意图。

```javascript
// 基本条件分支动画示例
function conditionalAnimation(element, condition) {
  // 根据条件执行不同的动画
  if (condition === 'success') {
    return gsap.to(element, {
      backgroundColor: '#4CAF50',
      scale: 1.1,
      duration: 0.5,
      ease: 'back.out'
    });
  } else if (condition === 'warning') {
    return gsap.to(element, {
      backgroundColor: '#FFC107',
      rotation: 5,
      yoyo: true,
      repeat: 1,
      duration: 0.3
    });
  } else if (condition === 'error') {
    const tl = gsap.timeline();
    tl.to(element, {
      backgroundColor: '#F44336',
      duration: 0.3
    }).to(element, {
      x: -10,
      duration: 0.1,
      repeat: 3,
      yoyo: true
    });
    return tl;
  } else {
    // 默认动画
    return gsap.to(element, {
      backgroundColor: '#2196F3',
      scale: 1,
      rotation: 0,
      duration: 0.5
    });
  }
}

// 使用示例
document.querySelector('#submit-btn').addEventListener('click', function() {
  const inputValue = document.querySelector('#user-input').value;
  let condition = 'default';
  
  if (inputValue.length > 10) {
    condition = 'success';
  } else if (inputValue.length > 5) {
    condition = 'warning';
  } else if (inputValue.length > 0) {
    condition = 'error';
  }
  
  conditionalAnimation(this, condition);
});
```

### 数据驱动的条件动画

更复杂的条件动画可以基于数据状态变化来执行：

```javascript
// 数据驱动的条件动画
class DataDrivenAnimation {
  constructor(element, initialData) {
    this.element = element;
    this.data = initialData;
    this.animations = {};
    this.currentAnimation = null;
    
    // 定义各种条件动画
    this.setupAnimations();
  }
  
  setupAnimations() {
    // 价格上涨动画
    this.animations.priceIncrease = () => {
      return gsap.to(this.element, {
        color: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        scale: 1.05,
        duration: 0.5,
        onComplete: () => {
          gsap.to(this.element, {
            scale: 1,
            delay: 0.5,
            duration: 0.3
          });
        }
      });
    };
    
    // 价格下跌动画
    this.animations.priceDecrease = () => {
      return gsap.to(this.element, {
        color: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        scale: 0.95,
        duration: 0.5,
        onComplete: () => {
          gsap.to(this.element, {
            scale: 1,
            delay: 0.5,
            duration: 0.3
          });
        }
      });
    };
    
    // 价格无变化动画
    this.animations.priceUnchanged = () => {
      return gsap.to(this.element, {
        color: '#757575',
        backgroundColor: 'transparent',
        scale: 1,
        duration: 0.3
      });
    };
    
    // 交易量突增动画
    this.animations.volumeSpike = () => {
      const tl = gsap.timeline();
      tl.to(this.element, {
        color: '#2196F3',
        fontWeight: 'bold',
        duration: 0.3
      }).to(this.element.querySelector('.volume-indicator'), {
        height: '100%',
        duration: 0.5,
        ease: 'power2.out'
      });
      return tl;
    };
  }
  
  // 更新数据并触发条件动画
  updateData(newData) {
    const oldData = {...this.data};
    this.data = {...newData};
    
    // 价格变化条件判断
    if (newData.price > oldData.price) {
      this.currentAnimation = this.animations.priceIncrease();
    } else if (newData.price < oldData.price) {
      this.currentAnimation = this.animations.priceDecrease();
    } else {
      this.currentAnimation = this.animations.priceUnchanged();
    }
    
    // 交易量突增条件判断（同时条件）
    if (newData.volume > oldData.volume * 1.5) {
      // 如果价格动画还在进行，先完成它
      if (this.currentAnimation) {
        this.currentAnimation.eventCallback('onComplete', () => {
          this.animations.volumeSpike();
        });
      } else {
        this.animations.volumeSpike();
      }
    }
  }
}

// 使用示例
const priceElement = document.querySelector('.stock-price');
const stockAnimation = new DataDrivenAnimation(priceElement, {
  price: 100,
  volume: 1000
});

// 模拟数据更新
setInterval(() => {
  const newPrice = 100 + Math.random() * 10 - 5;
  const newVolume = 1000 + Math.random() * 500;
  
  stockAnimation.updateData({
    price: newPrice,
    volume: newVolume
  });
  
  // 更新显示的数值
  priceElement.textContent = newPrice.toFixed(2);
  priceElement.querySelector('.volume-text').textContent = newVolume.toFixed(0);
}, 2000);
```

### 用户行为条件分支

基于用户行为模式执行不同的动画分支：

```javascript
// 用户行为条件分支动画
class UserBehaviorAnimation {
  constructor() {
    this.clickCount = 0;
    this.lastClickTime = 0;
    this.userPattern = 'normal';
    
    this.bindEvents();
  }
  
  bindEvents() {
    const button = document.querySelector('#action-button');
    
    button.addEventListener('click', (e) => {
      const now = Date.now();
      
      // 分析用户点击模式
      if (this.lastClickTime > 0) {
        const timeDiff = now - this.lastClickTime;
        
        // 快速连续点击
        if (timeDiff < 300) {
          this.clickCount++;
          
          if (this.clickCount > 3) {
            this.userPattern = 'impatient';
          }
        } else {
          // 正常点击频率
          this.clickCount = 0;
          this.userPattern = 'normal';
        }
      }
      
      this.lastClickTime = now;
      
      // 根据用户模式执行不同动画
      this.playAnimation(button);
    });
  }
  
  playAnimation(element) {
    // 清除当前动画
    gsap.killTweensOf(element);
    
    if (this.userPattern === 'impatient') {
      // 对于急躁用户，使用更快的动画
      gsap.to(element, {
        scale: 0.95,
        backgroundColor: '#FF5722',
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // 直接显示加载完成状态，跳过加载动画
          gsap.to(element.querySelector('.progress'), {
            width: '100%',
            duration: 0.1
          });
          
          setTimeout(() => {
            element.querySelector('.text').textContent = '完成！';
          }, 100);
        }
      });
    } else {
      // 对于普通用户，使用正常的动画序列
      const tl = gsap.timeline();
      
      tl.to(element, {
        scale: 0.98,
        backgroundColor: '#4CAF50',
        duration: 0.3,
        ease: 'power1.out'
      })
      .to(element.querySelector('.progress'), {
        width: '100%',
        duration: 1.5,
        ease: 'power1.inOut'
      })
      .call(() => {
        element.querySelector('.text').textContent = '完成！';
      });
    }
  }
}

// 初始化用户行为动画
new UserBehaviorAnimation();
```

::: tip 条件动画最佳实践
- 将动画逻辑与条件判断逻辑分离，提高代码可维护性
- 使用状态机模式管理复杂的条件状态转换
- 为动画创建清晰的退出策略，避免中断时的视觉混乱
- 考虑添加过渡状态，使不同条件下的动画转换更加平滑
- 记录用户交互历史，为未来的交互提供更智能的动画响应
:::

## 鼠标/触摸跟随效果

实现平滑的鼠标或触摸跟随效果，增强用户界面的交互体验。

### 基本跟随效果

鼠标跟随效果的核心是捕获鼠标/触摸的位置，并使元素平滑地移动到该位置。

```javascript
// 基本的鼠标跟随效果
function setupMouseFollower() {
  const follower = document.querySelector('.mouse-follower');
  
  // 初始化位置在视窗中心
  gsap.set(follower, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  
  // 跟随动画配置
  const config = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    ease: "power2.out",
    duration: 0.5
  };
  
  // 创建动画但不立即播放
  const animation = gsap.to(follower, config);
  
  // 鼠标移动时更新目标位置
  window.addEventListener('mousemove', (e) => {
    // 更新目标位置
    config.x = e.clientX;
    config.y = e.clientY;
    
    // 启动动画
    animation.vars.x = e.clientX;
    animation.vars.y = e.clientY;
    
    if (!animation.isActive()) {
      animation.restart();
    }
  });
}
```

### 平滑延迟跟随

创建具有平滑延迟效果的跟随动画，增加有机感和流动性：

```javascript
// 平滑延迟跟随效果
function setupSmoothFollower() {
  const follower = document.querySelector('.smooth-follower');
  const cursor = document.querySelector('.cursor-dot');
  
  // 设置初始位置
  gsap.set([follower, cursor], {
    xPercent: -50,
    yPercent: -50
  });
  
  // 创建对象存储位置信息
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  
  // 设置速度系数（越小越平滑）
  const speed = 0.1;
  
  // 更新函数
  const xSet = gsap.quickSetter(follower, "x", "px");
  const ySet = gsap.quickSetter(follower, "y", "px");
  
  // 光标直接跟随
  const cursorXSet = gsap.quickSetter(cursor, "x", "px");
  const cursorYSet = gsap.quickSetter(cursor, "y", "px");
  
  // 鼠标移动时更新位置
  window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // 使用gsap的ticker确保平滑更新
  gsap.ticker.add(() => {
    // 计算当前位置与目标位置的差值
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    
    // 逐渐接近目标位置
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    
    // 更新元素位置
    xSet(pos.x);
    ySet(pos.y);
  });
}
```

### 多元素延迟跟随

创建跟随链效果，多个元素以不同的延迟跟随鼠标：

```javascript
// 多元素延迟跟随
function setupFollowerChain() {
  // 创建多个跟随元素
  const container = document.querySelector('.follower-container');
  const followerCount = 10;
  const followers = [];
  
  for (let i = 0; i < followerCount; i++) {
    const follower = document.createElement('div');
    follower.classList.add('follower');
    follower.style.backgroundColor = `hsla(${i * 360 / followerCount}, 100%, 50%, ${1 - i / followerCount * 0.8})`;
    follower.style.width = `${20 - i}px`;
    follower.style.height = `${20 - i}px`;
    container.appendChild(follower);
    followers.push(follower);
    
    // 设置初始位置
    gsap.set(follower, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
  }
  
  // 跟随位置数组（每个元素都有自己的目标位置）
  const positions = followers.map(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }));
  
  // 鼠标当前位置
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  // 监听鼠标移动
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  // 使用GSAP的ticker进行平滑更新
  gsap.ticker.add(() => {
    // 第一个元素直接跟随鼠标
    positions[0].x = mouse.x;
    positions[0].y = mouse.y;
    
    // 设置第一个元素位置
    gsap.set(followers[0], {
      x: positions[0].x,
      y: positions[0].y
    });
    
    // 其他元素跟随前一个元素
    for (let i = 1; i < followers.length; i++) {
      // 计算当前位置到目标位置（前一个元素）的差值
      const dx = positions[i-1].x - positions[i].x;
      const dy = positions[i-1].y - positions[i].y;
      
      // 更新位置（速度系数随索引增加而减小，造成延迟加大的效果）
      positions[i].x += dx * (0.5 / i);
      positions[i].y += dy * (0.5 / i);
      
      // 设置元素位置
      gsap.set(followers[i], {
        x: positions[i].x,
        y: positions[i].y
      });
    }
  });
}
```

### 跟随效果的交互增强

添加交互效果，使跟随元素响应鼠标悬停和点击：

```javascript
// 交互增强的鼠标跟随
function setupInteractiveFollower() {
  const follower = document.querySelector('.interactive-follower');
  
  // 初始设置
  gsap.set(follower, {
    xPercent: -50,
    yPercent: -50,
    scale: 1,
    backgroundColor: 'rgba(100, 100, 255, 0.5)'
  });
  
  // 创建跟随动画
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const speed = 0.15;
  
  const xSet = gsap.quickSetter(follower, "x", "px");
  const ySet = gsap.quickSetter(follower, "y", "px");
  
  // 鼠标移动更新位置
  window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // 更新动画
  gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });
  
  // 交互增强 - 悬停元素时的效果
  document.querySelectorAll('.hoverable').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, {
        scale: 1.5,
        backgroundColor: 'rgba(255, 100, 100, 0.5)',
        borderColor: '#fff',
        duration: 0.3
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'rgba(100, 100, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3
      });
    });
  });
  
  // 点击效果
  window.addEventListener('mousedown', () => {
    gsap.to(follower, {
      scale: 0.7,
      duration: 0.15
    });
  });
  
  window.addEventListener('mouseup', () => {
    gsap.to(follower, {
      scale: 1,
      duration: 0.15
    });
  });
}
```

::: warning 跟随效果的性能注意事项
- 使用`gsap.ticker`而非`requestAnimationFrame`可以更好地与GSAP动画系统同步
- 对于大量跟随元素，考虑降低更新频率或减少元素数量
- 在移动设备上，应使用触摸事件而非鼠标事件
- 为提高性能，可以使用CSS `transform`属性而非直接修改`left`/`top`
- 考虑在滚动时暂时禁用跟随效果，避免性能问题
:::

## 高级过渡效果实现

设计和实现复杂的状态过渡动画，使界面转换更加流畅和专业。

### 页面转场过渡效果

在页面或视图之间切换时，使用平滑的过渡效果可以大幅提升用户体验。

```javascript
// 高级页面转场系统
class PageTransitionManager {
  constructor() {
    this.currentPage = null;
    this.nextPage = null;
    this.isAnimating = false;
    this.transitions = {};
    
    // 注册过渡效果
    this.registerTransitions();
    
    // 绑定导航事件
    this.bindNavEvents();
  }
  
  registerTransitions() {
    // 淡入淡出过渡
    this.transitions.fade = (currentPage, nextPage) => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentPage, {display: 'none'});
          this.isAnimating = false;
        }
      });
      
      // 初始设置
      gsap.set(nextPage, {display: 'block', opacity: 0});
      
      // 执行过渡动画
      tl.to(currentPage, {opacity: 0, duration: 0.5})
        .to(nextPage, {opacity: 1, duration: 0.5}, "-=0.3");
        
      return tl;
    };
    
    // 滑动过渡
    this.transitions.slide = (currentPage, nextPage, direction = 'left') => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentPage, {display: 'none', x: 0});
          this.isAnimating = false;
        }
      });
      
      // 根据方向设置初始位置
      const xPosition = direction === 'left' ? '100%' : '-100%';
      gsap.set(nextPage, {display: 'block', x: xPosition});
      
      // 执行过渡动画
      tl.to(currentPage, {
        x: direction === 'left' ? '-100%' : '100%',
        duration: 0.6,
        ease: 'power2.inOut'
      })
      .to(nextPage, {
        x: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }, "-=0.6");
      
      return tl;
    };
    
    // 缩放过渡
    this.transitions.zoom = (currentPage, nextPage, zoomIn = true) => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentPage, {display: 'none', scale: 1, opacity: 1});
          this.isAnimating = false;
        }
      });
      
      // 初始设置
      if (zoomIn) {
        gsap.set(nextPage, {display: 'block', scale: 0.7, opacity: 0});
      } else {
        gsap.set(nextPage, {display: 'block', scale: 1.3, opacity: 0});
      }
      
      // 执行过渡动画
      tl.to(currentPage, {
        scale: zoomIn ? 1.3 : 0.7,
        opacity: 0,
        duration: 0.5
      })
      .to(nextPage, {
        scale: 1,
        opacity: 1,
        duration: 0.5
      }, "-=0.3");
      
      return tl;
    };
    
    // 翻页过渡
    this.transitions.flip = (currentPage, nextPage) => {
      // 创建容器确保3D效果
      const container = document.querySelector('.page-container');
      gsap.set(container, {perspective: 1000});
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentPage, {display: 'none', rotationY: 0, backfaceVisibility: 'visible'});
          gsap.set(nextPage, {backfaceVisibility: 'visible'});
          this.isAnimating = false;
        }
      });
      
      // 初始设置
      gsap.set(nextPage, {
        display: 'block',
        rotationY: -180,
        backfaceVisibility: 'hidden'
      });
      gsap.set(currentPage, {backfaceVisibility: 'hidden'});
      
      // 执行过渡动画
      tl.to(currentPage, {
        rotationY: 180,
        duration: 0.7,
        ease: 'power2.inOut'
      })
      .to(nextPage, {
        rotationY: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      }, "-=0.7");
      
      return tl;
    };
  }
  
  bindNavEvents() {
    document.querySelectorAll('[data-navigate]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (this.isAnimating) return;
        
        const targetPageId = link.getAttribute('data-navigate');
        const transitionType = link.getAttribute('data-transition') || 'fade';
        const transitionOptions = link.getAttribute('data-transition-options') || '';
        
        this.navigateTo(targetPageId, transitionType, transitionOptions);
      });
    });
  }
  
  navigateTo(pageId, transitionType = 'fade', options = '') {
    // 防止重复动画
    if (this.isAnimating) return;
    
    const targetPage = document.getElementById(pageId);
    
    // 验证目标页面
    if (!targetPage) {
      console.error(`页面 ${pageId} 不存在`);
      return;
    }
    
    // 获取当前显示的页面
    const currentPage = document.querySelector('.page.active') || document.querySelector('.page:first-child');
    
    // 如果点击的是当前页面，不执行动画
    if (currentPage === targetPage) return;
    
    // 标记动画状态
    this.isAnimating = true;
    
    // 更新活动页面标记
    currentPage.classList.remove('active');
    targetPage.classList.add('active');
    
    // 执行过渡动画
    if (this.transitions[transitionType]) {
      this.transitions[transitionType](currentPage, targetPage, options);
    } else {
      // 默认使用淡入淡出过渡
      this.transitions.fade(currentPage, targetPage);
    }
  }
}

// 初始化页面转场管理器
const pageTransitions = new PageTransitionManager();
```

### 组件状态过渡

在组件内部状态变化时实现平滑的过渡效果：

```javascript
// 组件状态过渡系统
class ComponentStateTransition {
  constructor(component, states) {
    this.component = component;
    this.states = states;
    this.currentState = 'default';
    this.timeline = null;
    
    // 初始化默认状态
    if (this.states[this.currentState]) {
      gsap.set(this.component, this.states[this.currentState].properties);
    }
  }
  
  // 切换到新状态
  transitionTo(stateName, duration = 0.5, ease = 'power2.inOut') {
    // 检查状态是否存在
    if (!this.states[stateName]) {
      console.error(`状态 ${stateName} 未定义`);
      return;
    }
    
    // 如果已经是当前状态，不执行操作
    if (stateName === this.currentState) return;
    
    // 如果有正在执行的过渡，先完成它
    if (this.timeline && this.timeline.isActive()) {
      this.timeline.kill();
    }
    
    // 获取目标状态属性
    const targetState = this.states[stateName];
    
    // 创建过渡动画
    this.timeline = gsap.timeline();
    
    // 添加前置钩子
    if (typeof targetState.onBefore === 'function') {
      targetState.onBefore(this.component, this.currentState);
    }
    
    // 执行过渡动画
    this.timeline.to(this.component, {
      ...targetState.properties,
      duration,
      ease,
      onComplete: () => {
        // 添加完成钩子
        if (typeof targetState.onAfter === 'function') {
          targetState.onAfter(this.component, this.currentState);
        }
        
        // 更新当前状态
        this.currentState = stateName;
      }
    });
    
    return this.timeline;
  }
  
  // 添加新状态
  addState(stateName, properties, callbacks = {}) {
    this.states[stateName] = {
      properties,
      onBefore: callbacks.onBefore,
      onAfter: callbacks.onAfter
    };
  }
  
  // 获取当前状态
  getCurrentState() {
    return this.currentState;
  }
}

// 使用示例
const card = document.querySelector('.card');

// 定义组件的多个状态
const cardStates = {
  default: {
    properties: {
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff'
    }
  },
  expanded: {
    properties: {
      scale: 1.1,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      backgroundColor: '#f8f8f8'
    },
    onBefore: (el) => {
      // 在动画开始前，提高元素的z-index
      gsap.set(el, {zIndex: 10});
    }
  },
  collapsed: {
    properties: {
      scale: 0.9,
      opacity: 0.7,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      backgroundColor: '#f0f0f0'
    }
  },
  highlighted: {
    properties: {
      backgroundColor: '#fff8e1',
      boxShadow: '0 0 0 2px #ffc107'
    },
    onAfter: (el) => {
      // 动画完成后添加强调效果
      gsap.to(el, {
        boxShadow: '0 0 0 2px #ffc107, 0 0 10px #ffc107',
        repeat: 1,
        yoyo: true,
        duration: 0.5
      });
    }
  }
};

// 创建状态管理器
const cardTransition = new ComponentStateTransition(card, cardStates);

// 绑定交互事件
card.addEventListener('mouseenter', () => {
  cardTransition.transitionTo('expanded', 0.3);
});

card.addEventListener('mouseleave', () => {
  cardTransition.transitionTo('default', 0.3);
});

card.addEventListener('click', () => {
  if (cardTransition.getCurrentState() !== 'highlighted') {
    cardTransition.transitionTo('highlighted', 0.4, 'back.out');
  } else {
    cardTransition.transitionTo('default', 0.4);
  }
});

// 为相邻元素创建联动效果
document.querySelectorAll('.card').forEach(otherCard => {
  if (otherCard !== card) {
    card.addEventListener('mouseenter', () => {
      // 当前卡片悬停时，其他卡片收缩
      new ComponentStateTransition(otherCard, cardStates)
        .transitionTo('collapsed', 0.3);
    });
    
    card.addEventListener('mouseleave', () => {
      // 当前卡片离开时，其他卡片恢复
      new ComponentStateTransition(otherCard, cardStates)
        .transitionTo('default', 0.3);
    });
  }
});
```

### 形变过渡效果

实现元素之间的形状过渡，创造有机的变化效果：

```javascript
// 形变过渡效果
class MorphTransition {
  constructor(element) {
    this.element = element;
    this.shapes = {};
    this.currentShape = null;
  }
  
  // 注册形状
  registerShape(name, points) {
    this.shapes[name] = points;
    
    // 如果是第一个注册的形状，设为当前形状
    if (!this.currentShape) {
      this.currentShape = name;
      this.updatePoints(points);
    }
  }
  
  // 更新SVG多边形或路径的点
  updatePoints(points) {
    if (this.element.tagName.toLowerCase() === 'polygon') {
      this.element.setAttribute('points', points);
    } else if (this.element.tagName.toLowerCase() === 'path') {
      this.element.setAttribute('d', points);
    }
  }
  
  // 过渡到新形状
  morphTo(shapeName, duration = 1, ease = 'power2.inOut') {
    if (!this.shapes[shapeName]) {
      console.error(`形状 ${shapeName} 未定义`);
      return;
    }
    
    // 已经是当前形状，不执行操作
    if (shapeName === this.currentShape) return;
    
    const targetPoints = this.shapes[shapeName];
    
    // 执行过渡动画
    return gsap.to(this.element, {
      attr: {
        points: this.element.tagName.toLowerCase() === 'polygon' ? targetPoints : null,
        d: this.element.tagName.toLowerCase() === 'path' ? targetPoints : null
      },
      duration,
      ease,
      onComplete: () => {
        this.currentShape = shapeName;
      }
    });
  }
  
  // 随机形变效果
  randomMorph(iterations = 1, duration = 0.5) {
    const shapeNames = Object.keys(this.shapes);
    let count = 0;
    
    const morphNext = () => {
      count++;
      if (count > iterations && iterations !== -1) return;
      
      // 随机选择一个不同的形状
      let nextShape;
      do {
        nextShape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
      } while (nextShape === this.currentShape && shapeNames.length > 1);
      
      // 过渡到下一个形状
      this.morphTo(nextShape, duration).eventCallback('onComplete', morphNext);
    };
    
    morphNext();
  }
}

// 使用示例 - SVG多边形形变
const polygon = document.querySelector('polygon');
const morphTransition = new MorphTransition(polygon);

// 注册多个形状
morphTransition.registerShape('circle', '50,50 54,60 60,70 50,80 40,70 46,60');
morphTransition.registerShape('star', '50,30 55,45 70,45 60,55 65,70 50,60 35,70 40,55 30,45 45,45');
morphTransition.registerShape('square', '30,30 70,30 70,70 30,70');
morphTransition.registerShape('triangle', '50,30 75,70 25,70');

// 添加交互控制
document.querySelectorAll('.shape-button').forEach(button => {
  button.addEventListener('click', () => {
    const shapeName = button.getAttribute('data-shape');
    morphTransition.morphTo(shapeName, 0.8, 'elastic.out(1, 0.3)');
  });
});

// 自动随机形变演示
document.querySelector('.random-morph-button').addEventListener('click', () => {
  morphTransition.randomMorph(5, 0.7);
});
```

### 自定义路径过渡

实现元素沿着自定义路径的运动过渡效果：

```javascript
// 自定义路径过渡
function createPathTransition(element, path) {
  // 获取SVG路径元素
  const svgPath = document.querySelector(path);
  
  // 确保找到路径
  if (!svgPath) {
    console.error(`路径 ${path} 不存在`);
    return;
  }
  
  // 获取路径总长度
  const pathLength = svgPath.getTotalLength();
  
  // 创建路径跟随动画
  return gsap.timeline()
    .set(element, {
      xPercent: -50,  // 居中定位
      yPercent: -50,
      transformOrigin: '50% 50%'
    })
    .to(element, {
      duration: 2,
      ease: 'none',
      motionPath: {
        path: svgPath,
        align: svgPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      onUpdate: function() {
        // 根据路径位置更新其他效果
        const progress = this.progress();
        
        // 可以基于进度添加缩放、透明度等效果
        gsap.set(element, {
          scale: 1 + Math.sin(progress * Math.PI) * 0.2,
          opacity: Math.min(1, progress * 2)
        });
      }
    });
}

// 使用示例
const element = document.querySelector('.moving-element');
const pathAnimation = createPathTransition(element, '#motion-path');

// 控制按钮
document.querySelector('.play-path-button').addEventListener('click', () => {
  pathAnimation.restart();
});

document.querySelector('.reverse-path-button').addEventListener('click', () => {
  pathAnimation.reverse();
});
```

::: tip 高级过渡技巧
- 为重要的过渡效果预先加载资源，避免动画过程中出现卡顿
- 考虑添加音效增强过渡体验，提供更丰富的感官反馈
- 使用`will-change`属性提示浏览器优化即将发生的变化
- 复杂过渡可以分解为多个简单过渡，更易于控制和调试
- 长时间过渡应提供跳过或加速选项，照顾不同用户的偏好
- 考虑添加动画中间帧，确保过渡在各种条件下都平滑运行
:::

## 动画状态回退与前进

管理动画的状态历史，实现动画效果的回退和前进功能。

### 动画历史记录

创建动画状态的历史记录系统，实现类似撤销/重做的功能：

```javascript
// 动画历史记录系统
class AnimationHistory {
  constructor(maxHistoryLength = 20) {
    this.history = [];
    this.future = [];
    this.currentState = null;
    this.maxHistoryLength = maxHistoryLength;
  }
  
  // 记录新的状态
  recordState(state) {
    // 如果与当前状态相同，不记录
    if (this.currentState && JSON.stringify(state) === JSON.stringify(this.currentState)) {
      return;
    }
    
    // 将当前状态推入历史
    if (this.currentState) {
      this.history.push(this.currentState);
      
      // 限制历史长度
      if (this.history.length > this.maxHistoryLength) {
        this.history.shift();
      }
    }
    
    // 记录为当前状态
    this.currentState = state;
    
    // 清空未来状态
    this.future = [];
  }
  
  // 回退到上一个状态
  undo() {
    if (this.history.length === 0) {
      return null;
    }
    
    // 将当前状态移到未来
    if (this.currentState) {
      this.future.unshift(this.currentState);
    }
    
    // 获取上一个状态
    this.currentState = this.history.pop();
    
    return this.currentState;
  }
  
  // 前进到下一个状态
  redo() {
    if (this.future.length === 0) {
      return null;
    }
    
    // 将当前状态移到历史
    if (this.currentState) {
      this.history.push(this.currentState);
    }
    
    // 获取下一个状态
    this.currentState = this.future.shift();
    
    return this.currentState;
  }
  
  // 获取当前状态
  getCurrentState() {
    return this.currentState;
  }
  
  // 检查是否可以回退
  canUndo() {
    return this.history.length > 0;
  }
  
  // 检查是否可以前进
  canRedo() {
    return this.future.length > 0;
  }
  
  // 清空历史
  clearHistory() {
    this.history = [];
    this.future = [];
  }
}

// 使用示例 - 元素位置状态记录
class DraggableWithHistory {
  constructor(element) {
    this.element = element;
    this.history = new AnimationHistory();
    
    // 记录初始状态
    this.recordCurrentState();
    
    // 设置拖拽功能
    this.setupDraggable();
    
    // 绑定快捷键
    this.bindShortcuts();
  }
  
  // 记录当前状态
  recordCurrentState() {
    const rect = this.element.getBoundingClientRect();
    this.history.recordState({
      x: rect.left,
      y: rect.top,
      rotation: gsap.getProperty(this.element, "rotation") || 0,
      scale: gsap.getProperty(this.element, "scale") || 1
    });
  }
  
  // 设置拖拽功能
  setupDraggable() {
    Draggable.create(this.element, {
      type: "x,y",
      onDragEnd: () => {
        // 拖拽结束时记录状态
        this.recordCurrentState();
      }
    });
    
    // 添加旋转和缩放控制
    const rotateBtn = document.createElement("button");
    rotateBtn.textContent = "旋转";
    rotateBtn.className = "control-btn rotate-btn";
    
    const scaleBtn = document.createElement("button");
    scaleBtn.textContent = "缩放";
    scaleBtn.className = "control-btn scale-btn";
    
    document.body.appendChild(rotateBtn);
    document.body.appendChild(scaleBtn);
    
    // 旋转功能
    rotateBtn.addEventListener("click", () => {
      gsap.to(this.element, {
        rotation: "+=45",
        duration: 0.3,
        onComplete: () => this.recordCurrentState()
      });
    });
    
    // 缩放功能
    scaleBtn.addEventListener("click", () => {
      const currentScale = gsap.getProperty(this.element, "scale") || 1;
      gsap.to(this.element, {
        scale: currentScale < 1.5 ? currentScale + 0.25 : 1,
        duration: 0.3,
        onComplete: () => this.recordCurrentState()
      });
    });
  }
  
  // 绑定快捷键
  bindShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl+Z: 撤销
      if (e.ctrlKey && e.key === "z") {
        this.undo();
      }
      
      // Ctrl+Y: 重做
      if (e.ctrlKey && e.key === "y") {
        this.redo();
      }
    });
    
    // 添加UI按钮
    const undoBtn = document.createElement("button");
    undoBtn.textContent = "撤销";
    undoBtn.className = "history-btn undo-btn";
    undoBtn.addEventListener("click", () => this.undo());
    
    const redoBtn = document.createElement("button");
    redoBtn.textContent = "重做";
    redoBtn.className = "history-btn redo-btn";
    redoBtn.addEventListener("click", () => this.redo());
    
    document.body.appendChild(undoBtn);
    document.body.appendChild(redoBtn);
  }
  
  // 撤销操作
  undo() {
    const prevState = this.history.undo();
    if (prevState) {
      this.animateToState(prevState);
    }
  }
  
  // 重做操作
  redo() {
    const nextState = this.history.redo();
    if (nextState) {
      this.animateToState(nextState);
    }
  }
  
  // 动画过渡到指定状态
  animateToState(state) {
    gsap.to(this.element, {
      x: state.x,
      y: state.y,
      rotation: state.rotation,
      scale: state.scale,
      duration: 0.5,
      ease: "power2.out"
    });
  }
}

// 初始化带历史记录的可拖拽元素
const draggableElement = document.querySelector(".draggable-element");
new DraggableWithHistory(draggableElement);
```

### 多层级动画状态管理

管理更复杂的动画状态和层级变化：

```javascript
// 多层级动画状态管理
class AnimationStateManager {
  constructor() {
    this.states = {};
    this.currentStateId = null;
    this.stateHistory = new AnimationHistory();
    this.transitions = {};
  }
  
  // 注册状态
  registerState(stateId, stateConfig) {
    this.states[stateId] = stateConfig;
    
    // 如果是第一个注册的状态，设为当前状态
    if (this.currentStateId === null) {
      this.currentStateId = stateId;
      this.stateHistory.recordState(stateId);
      
      // 应用初始状态
      if (stateConfig.onEnter) {
        stateConfig.onEnter();
      }
    }
  }
  
  // 注册状态间的过渡
  registerTransition(fromStateId, toStateId, transitionFn) {
    const key = `${fromStateId}->${toStateId}`;
    this.transitions[key] = transitionFn;
  }
  
  // 切换到指定状态
  goToState(stateId, recordHistory = true) {
    // 状态不存在
    if (!this.states[stateId]) {
      console.error(`状态 ${stateId} 不存在`);
      return false;
    }
    
    // 已经是当前状态
    if (stateId === this.currentStateId) {
      return true;
    }
    
    const fromStateId = this.currentStateId;
    const fromState = this.states[fromStateId];
    const toState = this.states[stateId];
    
    // 检查是否有定义的过渡
    const transitionKey = `${fromStateId}->${stateId}`;
    const hasTransition = !!this.transitions[transitionKey];
    
    // 执行离开前回调
    if (fromState && fromState.onLeave) {
      fromState.onLeave(stateId);
    }
    
    // 执行过渡动画
    if (hasTransition) {
      const transitionFn = this.transitions[transitionKey];
      transitionFn(() => {
        // 过渡完成后执行进入回调
        if (toState.onEnter) {
          toState.onEnter(fromStateId);
        }
      });
    } else {
      // 无过渡时直接执行进入回调
      if (toState.onEnter) {
        toState.onEnter(fromStateId);
      }
    }
    
    // 更新当前状态
    this.currentStateId = stateId;
    
    // 记录历史
    if (recordHistory) {
      this.stateHistory.recordState(stateId);
    }
    
    return true;
  }
  
  // 回退到上一个状态
  goBack() {
    const prevState = this.stateHistory.undo();
    if (prevState) {
      return this.goToState(prevState, false);
    }
    return false;
  }
  
  // 前进到下一个状态
  goForward() {
    const nextState = this.stateHistory.redo();
    if (nextState) {
      return this.goToState(nextState, false);
    }
    return false;
  }
  
  // 获取当前状态ID
  getCurrentStateId() {
    return this.currentStateId;
  }
  
  // 检查是否可以回退
  canGoBack() {
    return this.stateHistory.canUndo();
  }
  
  // 检查是否可以前进
  canGoForward() {
    return this.stateHistory.canRedo();
  }
}

// 使用示例 - 界面状态管理
const stateManager = new AnimationStateManager();

// 注册多个UI状态
stateManager.registerState('default', {
  onEnter: (fromState) => {
    gsap.to('.panel', {opacity: 0, x: -100, duration: 0.3});
    gsap.to('.main-content', {width: '100%', duration: 0.3});
    document.body.classList.remove('panel-open');
  },
  onLeave: (toState) => {
    // 离开默认状态时的操作
  }
});

stateManager.registerState('panel-open', {
  onEnter: (fromState) => {
    gsap.to('.panel', {opacity: 1, x: 0, duration: 0.3});
    gsap.to('.main-content', {width: '70%', duration: 0.3});
    document.body.classList.add('panel-open');
  },
  onLeave: (toState) => {
    // 离开面板打开状态时的操作
  }
});

stateManager.registerState('fullscreen', {
  onEnter: (fromState) => {
    gsap.to('.panel', {opacity: 0, x: -100, duration: 0.3});
    gsap.to('.main-content', {
      width: '100%',
      height: '100vh',
      padding: 0,
      duration: 0.5
    });
    document.body.classList.add('fullscreen-mode');
  },
  onLeave: (toState) => {
    gsap.to('.main-content', {
      height: 'auto',
      padding: '20px',
      duration: 0.5
    });
    document.body.classList.remove('fullscreen-mode');
  }
});

// 注册状态间的过渡动画
stateManager.registerTransition('default', 'panel-open', (onComplete) => {
  const tl = gsap.timeline({onComplete});
  tl.to('.overlay', {opacity: 0.5, duration: 0.3})
    .to('.panel', {opacity: 1, x: 0, duration: 0.3}, 0)
    .to('.main-content', {width: '70%', duration: 0.3}, 0);
});

stateManager.registerTransition('panel-open', 'default', (onComplete) => {
  const tl = gsap.timeline({onComplete});
  tl.to('.overlay', {opacity: 0, duration: 0.3})
    .to('.panel', {opacity: 0, x: -100, duration: 0.3}, 0)
    .to('.main-content', {width: '100%', duration: 0.3}, 0);
});

// 绑定UI事件
document.querySelector('.toggle-panel-btn').addEventListener('click', () => {
  if (stateManager.getCurrentStateId() === 'panel-open') {
    stateManager.goToState('default');
  } else {
    stateManager.goToState('panel-open');
  }
});

document.querySelector('.fullscreen-btn').addEventListener('click', () => {
  stateManager.goToState('fullscreen');
});

document.querySelector('.exit-fullscreen-btn').addEventListener('click', () => {
  if (stateManager.getCurrentStateId() === 'fullscreen') {
    stateManager.goToState('default');
  }
});

// 绑定导航按钮
document.querySelector('.back-btn').addEventListener('click', () => {
  stateManager.goBack();
});

document.querySelector('.forward-btn').addEventListener('click', () => {
  stateManager.goForward();
});

// 更新导航按钮状态
function updateNavButtons() {
  document.querySelector('.back-btn').disabled = !stateManager.canGoBack();
  document.querySelector('.forward-btn').disabled = !stateManager.canGoForward();
}

// 监听状态变化，更新按钮状态
const observer = new MutationObserver(updateNavButtons);
observer.observe(document.body, {attributes: true, attributeFilter: ['class']});
updateNavButtons();
```

::: tip 动画状态回退与前进的优势
- 提供类似"撤销/重做"的用户体验，增强用户控制感
- 对于复杂的多步骤交互非常有用，用户可以安全地进行实验
- 减轻用户操作失误的后果，提高用户信心
- 为教学和演示提供了方便的前进/后退功能
:::

## 动画队列与调度管理

设计动画队列系统，合理调度多个动画的执行顺序和时机。

### 基本动画队列

创建简单的动画队列系统，按顺序执行多个动画：

```javascript
// 基本动画队列
class AnimationQueue {
  constructor() {
    this.queue = [];
    this.isPlaying = false;
    this.onCompleteCallback = null;
  }
  
  // 添加动画到队列
  add(animationFn) {
    this.queue.push(animationFn);
    return this;
  }
  
  // 设置整个队列完成时的回调
  onComplete(callback) {
    this.onCompleteCallback = callback;
    return this;
  }
  
  // 开始执行队列
  play() {
    if (this.isPlaying || this.queue.length === 0) {
      return this;
    }
    
    this.isPlaying = true;
    this.playNext();
    
    return this;
  }
  
  // 播放下一个动画
  playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
      return;
    }
    
    const nextAnimation = this.queue.shift();
    
    // 执行动画，并在完成后继续下一个
    nextAnimation(() => {
      this.playNext();
    });
  }
  
  // 清空队列
  clear() {
    this.queue = [];
    this.isPlaying = false;
    return this;
  }
  
  // 获取队列中剩余的动画数量
  getLength() {
    return this.queue.length;
  }
  
  // 暂停队列（注意：只能在支持的动画类型上使用）
  pause() {
    // 此方法需要具体动画实现支持
    this.isPlaying = false;
    return this;
  }
  
  // 恢复队列
  resume() {
    if (!this.isPlaying && this.queue.length > 0) {
      this.isPlaying = true;
      this.playNext();
    }
    return this;
  }
}

// 使用示例
const queue = new AnimationQueue();

// 添加多个动画到队列
queue.add((next) => {
  gsap.to('.element1', {
    x: 100,
    duration: 1,
    onComplete: next
  });
})
.add((next) => {
  gsap.to('.element2', {
    y: 50,
    duration: 0.8,
    onComplete: next
  });
})
.add((next) => {
  gsap.to('.element3', {
    rotation: 360,
    duration: 1.2,
    onComplete: next
  });
})
.onComplete(() => {
  console.log('所有动画都已完成！');
})
.play();
```

### 高级动画调度器

创建更复杂的动画调度系统，支持并行、条件和优先级：

```javascript
// 高级动画调度器
class AnimationScheduler {
  constructor() {
    this.queues = {
      high: new AnimationQueue(),
      normal: new AnimationQueue(),
      low: new AnimationQueue()
    };
    this.currentPriority = null;
    this.paused = false;
    this.conditionalAnimations = {};
  }
  
  // 添加动画到指定优先级队列
  add(animationFn, priority = 'normal') {
    if (!this.queues[priority]) {
      console.error(`优先级 ${priority} 不存在`);
      return this;
    }
    
    this.queues[priority].add(animationFn);
    this.checkQueues();
    return this;
  }
  
  // 检查并播放队列
  checkQueues() {
    if (this.paused || this.currentPriority) {
      return;
    }
    
    // 按优先级顺序检查队列
    if (this.queues.high.getLength() > 0) {
      this.currentPriority = 'high';
      this.playCurrentQueue();
    } else if (this.queues.normal.getLength() > 0) {
      this.currentPriority = 'normal';
      this.playCurrentQueue();
    } else if (this.queues.low.getLength() > 0) {
      this.currentPriority = 'low';
      this.playCurrentQueue();
    }
  }
  
  // 播放当前优先级队列
  playCurrentQueue() {
    if (!this.currentPriority) return;
    
    this.queues[this.currentPriority].onComplete(() => {
      this.currentPriority = null;
      this.checkQueues();
    }).play();
  }
  
  // 暂停所有动画
  pause() {
    this.paused = true;
    return this;
  }
  
  // 恢复所有动画
  resume() {
    this.paused = false;
    this.checkQueues();
    return this;
  }
  
  // 清空所有队列
  clear() {
    Object.values(this.queues).forEach(queue => queue.clear());
    this.currentPriority = null;
    return this;
  }
  
  // 添加条件动画（只有在条件满足时才执行）
  addConditional(name, conditionFn, animationFn, checkInterval = 200) {
    // 清除同名条件动画
    if (this.conditionalAnimations[name]) {
      clearInterval(this.conditionalAnimations[name].intervalId);
    }
    
    // 设置条件检查
    const intervalId = setInterval(() => {
      if (this.paused) return;
      
      if (conditionFn()) {
        // 条件满足，清除检查并执行动画
        clearInterval(intervalId);
        delete this.conditionalAnimations[name];
        animationFn();
      }
    }, checkInterval);
    
    // 存储条件动画
    this.conditionalAnimations[name] = {
      intervalId,
      conditionFn,
      animationFn
    };
    
    return this;
  }
  
  // 删除条件动画
  removeConditional(name) {
    if (this.conditionalAnimations[name]) {
      clearInterval(this.conditionalAnimations[name].intervalId);
      delete this.conditionalAnimations[name];
    }
    return this;
  }
  
  // 批量添加动画（并行执行）
  addParallel(animationFns, priority = 'normal') {
    let completedCount = 0;
    const total = animationFns.length;
    
    // 创建一个包装器函数，等待所有并行动画完成
    const wrapperFn = (next) => {
      if (total === 0) {
        next();
        return;
      }
      
      // 每个动画完成时的回调
      const onAnimationComplete = () => {
        completedCount++;
        if (completedCount === total) {
          next();
        }
      };
      
      // 并行启动所有动画
      animationFns.forEach(fn => fn(onAnimationComplete));
    };
    
    // 添加到队列
    return this.add(wrapperFn, priority);
  }
  
  // 获取当前状态
  getStatus() {
    return {
      paused: this.paused,
      currentPriority: this.currentPriority,
      queueLengths: {
        high: this.queues.high.getLength(),
        normal: this.queues.normal.getLength(),
        low: this.queues.low.getLength()
      },
      conditionalCount: Object.keys(this.conditionalAnimations).length
    };
  }
}

// 使用示例
const scheduler = new AnimationScheduler();

// 添加高优先级动画
scheduler.add((next) => {
  gsap.to('.notification', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    onComplete: () => {
      // 显示2秒后消失
      setTimeout(() => {
        gsap.to('.notification', {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: next
        });
      }, 2000);
    }
  });
}, 'high');

// 添加普通优先级动画
scheduler.add((next) => {
  gsap.to('.content-card', {
    scale: 1,
    opacity: 1,
    stagger: 0.1,
    duration: 0.7,
    onComplete: next
  });
});

// 添加并行动画
scheduler.addParallel([
  (done) => {
    gsap.to('.background', {
      opacity: 1,
      duration: 1,
      onComplete: done
    });
  },
  (done) => {
    gsap.to('.foreground', {
      y: 0,
      duration: 0.8,
      onComplete: done
    });
  }
]);

// 添加条件动画
scheduler.addConditional(
  'scrollAnimation',
  // 条件：页面滚动到特定位置
  () => window.scrollY > 300,
  // 动画：显示返回顶部按钮
  () => {
    gsap.to('.back-to-top', {
      opacity: 1,
      scale: 1,
      duration: 0.3
    });
  }
);

// 监听滚动，动态添加动画
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      element.classList.add('animated');
      
      // 添加低优先级动画
      scheduler.add((next) => {
        gsap.fromTo(element,
          {y: 50, opacity: 0},
          {y: 0, opacity: 1, duration: 0.7, onComplete: next}
        );
      }, 'low');
    }
  });
});
```

### 智能动画优化调度

实现基于性能和可见性的智能动画调度：

```javascript
// 智能动画优化调度器
class SmartAnimationScheduler {
  constructor() {
    this.scheduler = new AnimationScheduler();
    this.visibilityThreshold = 0.3; // 元素可见比例阈值
    this.performanceMode = 'auto'; // auto, high, medium, low
    this.fpsTarget = 60;
    this.fpsMonitor = new FPSMonitor();
    this.setupPerformanceMode();
  }
  
  // 设置性能模式
  setupPerformanceMode() {
    if (this.performanceMode === 'auto') {
      // 自动监测性能
      this.fpsMonitor.onUpdate((fps) => {
        if (fps < 30) {
          this.setLowPerformanceMode();
        } else if (fps < 50) {
          this.setMediumPerformanceMode();
        } else {
          this.setHighPerformanceMode();
        }
      });
      this.fpsMonitor.start();
    }
  }
  
  // 设置高性能模式
  setHighPerformanceMode() {
    this.performanceMode = 'high';
    // 启用所有视觉效果
    document.body.classList.remove('medium-performance', 'low-performance');
    document.body.classList.add('high-performance');
  }
  
  // 设置中等性能模式
  setMediumPerformanceMode() {
    this.performanceMode = 'medium';
    // 减少部分视觉效果
    document.body.classList.remove('high-performance', 'low-performance');
    document.body.classList.add('medium-performance');
  }
  
  // 设置低性能模式
  setLowPerformanceMode() {
    this.performanceMode = 'low';
    // 最小化视觉效果
    document.body.classList.remove('high-performance', 'medium-performance');
    document.body.classList.add('low-performance');
  }
  
  // 添加只有当元素可见时才执行的动画
  addVisibilityBased(element, animationFn, priority = 'normal') {
    const checkVisibility = () => {
      if (!element || !document.body.contains(element)) {
        return false;
      }
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 计算元素在视窗中的可见比例
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / rect.height;
      
      return visibleRatio >= this.visibilityThreshold;
    };
    
    // 添加条件动画
    this.scheduler.addConditional(
      'visibility_' + this.generateUniqueId(),
      checkVisibility,
      () => {
        // 根据性能模式调整动画
        if (this.performanceMode === 'low') {
          // 简化动画
          const simplifiedAnimation = this.simplifyAnimation(animationFn);
          simplifiedAnimation(() => {});
        } else {
          // 正常执行动画
          animationFn(() => {});
        }
      }
    );
    
    return this;
  }
  
  // 简化动画（低性能模式下使用）
  simplifyAnimation(originalAnimationFn) {
    return (next) => {
      // 这里可以根据具体动画类型进行简化
      // 例如：减少动画步骤、降低动画复杂度、使用更简单的缓动函数等
      // 这是一个简单的例子，实际应用中需要更复杂的逻辑
      
      originalAnimationFn((result) => {
        // 简化后的动画完成回调
        next(result);
      });
    };
  }
  
  // 生成唯一ID
  generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // 智能批处理动画（合并可以一起执行的动画）
  batchAnimations(elements, propertyMap, options = {}) {
    const batchedElements = {};
    
    // 根据元素类型和属性分组
    elements.forEach(el => {
      const type = el.tagName.toLowerCase();
      const key = type + '_' + (options.key || 'default');
      
      if (!batchedElements[key]) {
        batchedElements[key] = [];
      }
      
      batchedElements[key].push(el);
    });
    
    // 为每组创建一个批量动画
    Object.keys(batchedElements).forEach(key => {
      const groupElements = batchedElements[key];
      
      this.scheduler.add((next) => {
        gsap.to(groupElements, {
          ...propertyMap,
          stagger: options.stagger || 0.05,
          onComplete: next
        });
      }, options.priority || 'normal');
    });
    
    return this;
  }
  
  // 代理方法到调度器
  add(animationFn, priority) {
    return this.scheduler.add(animationFn, priority);
  }
  
  addParallel(animationFns, priority) {
    return this.scheduler.addParallel(animationFns, priority);
  }
  
  pause() {
    return this.scheduler.pause();
  }
  
  resume() {
    return this.scheduler.resume();
  }
  
  clear() {
    return this.scheduler.clear();
  }
}

// FPS监视器（用于性能监测）
class FPSMonitor {
  constructor() {
    this.fps = 0;
    this.frames = 0;
    this.lastTime = performance.now();
    this.callback = null;
    this.isRunning = false;
  }
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.measure();
  }
  
  stop() {
    this.isRunning = false;
  }
  
  measure() {
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    this.frames++;
    
    // 每秒更新一次FPS
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.lastTime = currentTime;
      this.frames = 0;
      
      if (this.callback) {
        this.callback(this.fps);
      }
    }
    
    requestAnimationFrame(() => this.measure());
  }
  
  onUpdate(callback) {
    this.callback = callback;
  }
  
  getFPS() {
    return this.fps;
  }
}

// 使用示例
const smartScheduler = new SmartAnimationScheduler();

// 添加基于可见性的动画
document.querySelectorAll('.animate-when-visible').forEach(element => {
  smartScheduler.addVisibilityBased(element, (next) => {
    gsap.fromTo(element,
      {y: 30, opacity: 0},
      {y: 0, opacity: 1, duration: 0.7, onComplete: next}
    );
  });
});

// 批量处理类似元素的动画
smartScheduler.batchAnimations(
  document.querySelectorAll('.card-item'),
  {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 0.5
  },
  {
    stagger: 0.08,
    priority: 'normal',
    key: 'cards'
  }
);

// 在页面加载时运行一些动画
window.addEventListener('load', () => {
  smartScheduler.addParallel([
    (done) => {
      gsap.to('.hero-image', {
        opacity: 1,
        scale: 1,
        duration: 1,
        onComplete: done
      });
    },
    (done) => {
      gsap.to('.hero-text', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        onComplete: done
      });
    }
  ], 'high');
});
```

::: tip 动画队列与调度管理的优势
- 避免动画重叠导致的视觉混乱，确保用户关注点的合理引导
- 优化性能，避免同时执行过多动画导致的卡顿
- 提供一致的动画体验，确保各种状态转换的平滑衔接
- 支持动态调整动画复杂度，适应不同设备的性能水平
- 实现基于视觉优先级的动画执行顺序，关键动画优先显示
:::

## 视窗内外元素动画优化

优化视窗内外元素的动画处理，提升大型页面的动画性能。

### 视窗检测基础

实现元素可见性检测，只为可见元素应用动画：

```javascript
// 基本的视窗检测工具
class ViewportChecker {
  constructor(options = {}) {
    this.options = {
      threshold: 0.3,      // 元素可见比例阈值
      scrollOffset: 100,   // 向上和向下的缓冲区，提前触发
      throttleInterval: 150, // 节流间隔（毫秒）
      ...options
    };
    
    this.elements = [];
    this.lastScrollY = window.scrollY;
    this.viewportHeight = window.innerHeight;
    this.ticking = false;
    
    // 绑定滚动事件
    this.bindScrollEvent();
    // 绑定窗口大小改变事件
    this.bindResizeEvent();
  }
  
  // 绑定滚动事件
  bindScrollEvent() {
    window.addEventListener('scroll', () => {
      this.lastScrollY = window.scrollY;
      this.requestCheck();
    });
  }
  
  // 绑定窗口大小改变事件
  bindResizeEvent() {
    window.addEventListener('resize', () => {
      this.viewportHeight = window.innerHeight;
      this.requestCheck();
    });
  }
  
  // 请求执行检查（使用requestAnimationFrame优化）
  requestCheck() {
    if (!this.ticking) {
      this.ticking = true;
      
      requestAnimationFrame(() => {
        this.checkElements();
        this.ticking = false;
      });
    }
  }
  
  // 添加要监控的元素
  add(element, callbacks = {}) {
    this.elements.push({
      element,
      visible: false,
      callbacks: {
        onEnter: callbacks.onEnter || null,
        onExit: callbacks.onExit || null,
        onVisible: callbacks.onVisible || null,
        onHidden: callbacks.onHidden || null
      }
    });
    
    // 立即检查一次
    this.checkElement(this.elements[this.elements.length - 1]);
    
    return this;
  }
  
  // 检查所有元素
  checkElements() {
    this.elements.forEach(item => this.checkElement(item));
  }
  
  // 检查单个元素
  checkElement(item) {
    // 如果元素不在DOM中，跳过
    if (!document.body.contains(item.element)) {
      return;
    }
    
    const rect = item.element.getBoundingClientRect();
    const wasVisible = item.visible;
    
    // 计算元素在视窗中的可见比例
    const visibleHeight = Math.min(rect.bottom, this.viewportHeight + this.options.scrollOffset) - 
                         Math.max(rect.top, -this.options.scrollOffset);
    const visibleRatio = visibleHeight / rect.height;
    
    // 根据可见比例判断元素是否可见
    const isVisible = visibleRatio >= this.options.threshold;
    
    // 更新可见状态
    item.visible = isVisible;
    
    // 调用相应的回调
    if (isVisible && !wasVisible) {
      // 元素进入视窗
      if (item.callbacks.onEnter) {
        item.callbacks.onEnter(item.element);
      }
      
      // 元素变为可见
      if (item.callbacks.onVisible) {
        item.callbacks.onVisible(item.element);
      }
    } else if (!isVisible && wasVisible) {
      // 元素离开视窗
      if (item.callbacks.onExit) {
        item.callbacks.onExit(item.element);
      }
      
      // 元素变为不可见
      if (item.callbacks.onHidden) {
        item.callbacks.onHidden(item.element);
      }
    }
  }
  
  // 移除监控的元素
  remove(element) {
    this.elements = this.elements.filter(item => item.element !== element);
    return this;
  }
  
  // 清空所有监控的元素
  clear() {
    this.elements = [];
    return this;
  }
}

// 使用示例
const viewportChecker = new ViewportChecker();

// 添加元素监控
document.querySelectorAll('.animate-on-scroll').forEach(element => {
  viewportChecker.add(element, {
    onEnter: (el) => {
      // 元素进入视窗时的动画
      gsap.fromTo(el, 
        {y: 50, opacity: 0},
        {y: 0, opacity: 1, duration: 0.7}
      );
      
      // 标记已动画的元素，避免重复动画
      el.classList.add('animated');
      
      // 动画完成后从监控列表中移除
      viewportChecker.remove(el);
    }
  });
});
```

### 高效滚动动画

优化滚动触发的动画，确保平滑性能：

```javascript
// 高效滚动动画系统
class ScrollAnimationManager {
  constructor() {
    this.animations = [];
    this.scrollY = window.scrollY;
    this.viewportHeight = window.innerHeight;
    this.documentHeight = document.body.scrollHeight;
    this.ticking = false;
    this.enabled = true;
    
    // 初始化
    this.init();
  }
  
  // 初始化
  init() {
    // 监听滚动事件
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      this.requestUpdate();
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      this.viewportHeight = window.innerHeight;
      this.documentHeight = document.body.scrollHeight;
      this.requestUpdate();
    });
    
    // 首次检查
    this.requestUpdate();
  }
  
  // 请求更新（使用requestAnimationFrame优化）
  requestUpdate() {
    if (!this.ticking && this.enabled) {
      this.ticking = true;
      
      requestAnimationFrame(() => {
        this.updateAnimations();
        this.ticking = false;
      });
    }
  }
  
  // 更新所有动画
  updateAnimations() {
    const scrollProgress = this.scrollY / (this.documentHeight - this.viewportHeight);
    
    this.animations.forEach(anim => {
      // 检查动画是否在可见范围内
      if (this.isInActiveRange(anim)) {
        // 计算动画进度
        const progress = this.calculateProgress(anim);
        
        // 更新动画
        if (typeof anim.onUpdate === 'function') {
          anim.onUpdate(progress, scrollProgress);
        }
      }
    });
  }
  
  // 判断动画是否在激活范围内
  isInActiveRange(anim) {
    const elementRect = anim.element.getBoundingClientRect();
    const elementTop = elementRect.top + this.scrollY;
    const elementBottom = elementTop + elementRect.height;
    
    // 扩展视口范围，提前/延后触发
    const extendedViewportTop = this.scrollY - this.viewportHeight * anim.offset;
    const extendedViewportBottom = this.scrollY + this.viewportHeight * (1 + anim.offset);
    
    return elementBottom >= extendedViewportTop && elementTop <= extendedViewportBottom;
  }
  
  // 计算动画进度（0-1之间）
  calculateProgress(anim) {
    const elementRect = anim.element.getBoundingClientRect();
    
    // 默认进度计算（基于元素在视窗中的位置）
    let progress = 1 - (elementRect.top + elementRect.height) / (this.viewportHeight + elementRect.height);
    
    // 应用自定义映射函数
    if (typeof anim.progressMap === 'function') {
      progress = anim.progressMap(progress);
    }
    
    // 限制在0-1范围内
    return Math.max(0, Math.min(1, progress));
  }
  
  // 添加滚动动画
  add(element, options = {}) {
    const animation = {
      element,
      offset: options.offset || 0.2,  // 提前/延后触发的视口高度比例
      onUpdate: options.onUpdate || null,
      progressMap: options.progressMap || null,  // 进度映射函数
      active: true
    };
    
    this.animations.push(animation);
    
    // 立即执行一次更新
    if (this.isInActiveRange(animation)) {
      const progress = this.calculateProgress(animation);
      if (typeof animation.onUpdate === 'function') {
        animation.onUpdate(progress, this.scrollY / (this.documentHeight - this.viewportHeight));
      }
    }
    
    return animation;
  }
  
  // 移除动画
  remove(element) {
    this.animations = this.animations.filter(anim => anim.element !== element);
    return this;
  }
  
  // 启用/禁用特定动画
  toggle(element, active = true) {
    const animation = this.animations.find(anim => anim.element === element);
    if (animation) {
      animation.active = active;
    }
    return this;
  }
  
  // 启用所有动画
  enable() {
    this.enabled = true;
    this.requestUpdate();
    return this;
  }
  
  // 禁用所有动画（例如在移动设备上）
  disable() {
    this.enabled = false;
    return this;
  }
}

// 使用示例
const scrollAnimator = new ScrollAnimationManager();

// 添加视差滚动效果
document.querySelectorAll('.parallax-element').forEach((element, index) => {
  // 根据元素索引设置不同的视差速度
  const speed = 0.5 + (index % 3) * 0.2;
  
  scrollAnimator.add(element, {
    offset: 0.5,  // 提前半个视口高度触发
    onUpdate: (progress) => {
      // 使用GSAP应用平滑的视差效果
      gsap.set(element, {
        y: (0.5 - progress) * 100 * speed,  // 视差移动
        opacity: Math.min(1, progress * 1.5)  // 渐变透明度
      });
    }
  });
});

// 添加滚动触发的序列动画
const timelineElement = document.querySelector('.scroll-timeline');
if (timelineElement) {
  // 创建一个GSAP时间轴
  const tl = gsap.timeline({paused: true});
  
  // 添加多个动画阶段
  tl.to('.scroll-element-1', {opacity: 1, y: 0, duration: 0.2})
    .to('.scroll-element-2', {opacity: 1, scale: 1, duration: 0.2})
    .to('.scroll-element-3', {opacity: 1, rotation: 0, duration: 0.2})
    .to('.scroll-element-4', {opacity: 1, x: 0, duration: 0.2});
  
  // 绑定到滚动位置
  scrollAnimator.add(timelineElement, {
    offset: 0.3,
    onUpdate: (progress) => {
      // 使用滚动进度直接控制时间轴进度
      tl.progress(progress);
    },
    // 使用缓动函数平滑进度
    progressMap: (p) => {
      // 平滑的开始和结束
      return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    }
  });
}
```

### 按需加载与卸载动画

优化大型页面中的动画资源管理：

```javascript
// 按需加载与卸载动画系统
class LazyAnimationManager {
  constructor() {
    this.sections = [];
    this.activeDistance = 2; // 激活的视口倍数
    this.viewportChecker = new ViewportChecker({
      threshold: 0,
      scrollOffset: window.innerHeight
    });
  }
  
  // 注册动画区域
  registerSection(element, options = {}) {
    const section = {
      element,
      initialized: false,
      active: false,
      animations: null,
      options: {
        onInitialize: options.onInitialize || null,
        onActivate: options.onActivate || null,
        onDeactivate: options.onDeactivate || null,
        onCleanup: options.onCleanup || null
      }
    };
    
    this.sections.push(section);
    
    // 添加到视窗检测器
    this.viewportChecker.add(element, {
      onEnter: () => this.handleSectionEnter(section),
      onExit: () => this.handleSectionExit(section)
    });
    
    return this;
  }
  
  // 处理区域进入视窗
  handleSectionEnter(section) {
    // 初始化区域（如果尚未初始化）
    if (!section.initialized && section.options.onInitialize) {
      section.animations = section.options.onInitialize(section.element);
      section.initialized = true;
    }
    
    // 激活区域动画
    if (!section.active && section.options.onActivate) {
      section.options.onActivate(section.element, section.animations);
      section.active = true;
    }
  }
  
  // 处理区域离开视窗
  handleSectionExit(section) {
    // 如果区域已激活，则停用动画
    if (section.active && section.options.onDeactivate) {
      section.options.onDeactivate(section.element, section.animations);
      section.active = false;
    }
    
    // 检查区域是否离得太远，可以清理资源
    this.checkForCleanup();
  }
  
  // 检查是否有区域可以清理
  checkForCleanup() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    this.sections.forEach(section => {
      if (!section.initialized) return;
      
      const rect = section.element.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionBottom = sectionTop + rect.height;
      
      // 计算区域到当前视窗的距离（以视口高度为单位）
      const distanceTop = (sectionTop - scrollY) / viewportHeight;
      const distanceBottom = (sectionBottom - scrollY) / viewportHeight;
      
      // 如果区域离视窗太远，并且已初始化，则清理资源
      if ((distanceBottom < -this.activeDistance || distanceTop > 1 + this.activeDistance) && 
          section.initialized && section.options.onCleanup) {
        section.options.onCleanup(section.element, section.animations);
        section.initialized = false;
        section.active = false;
      }
    });
  }
  
  // 手动激活特定区域
  activateSection(element) {
    const section = this.sections.find(s => s.element === element);
    if (section) {
      this.handleSectionEnter(section);
    }
    return this;
  }
  
  // 手动停用特定区域
  deactivateSection(element) {
    const section = this.sections.find(s => s.element === element);
    if (section) {
      this.handleSectionExit(section);
    }
    return this;
  }
  
  // 强制检查所有区域
  checkAll() {
    this.viewportChecker.checkElements();
    return this;
  }
}

// 使用示例
const lazyAnimator = new LazyAnimationManager();

// 注册页面的各个区域
document.querySelectorAll('.animation-section').forEach((section, index) => {
  lazyAnimator.registerSection(section, {
    // 初始化函数 - 只在区域接近视窗时执行一次
    onInitialize: (element) => {
      console.log(`初始化区域 ${index}`);
      
      // 创建区域的动画
      const animations = {
        timeline: gsap.timeline({paused: true}),
        elements: Array.from(element.querySelectorAll('.animated-element'))
      };
      
      // 设置初始状态
      gsap.set(animations.elements, {opacity: 0, y: 30});
      
      // 构建动画时间轴
      animations.timeline.to(animations.elements, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out"
      });
      
      return animations;
    },
    
    // 激活函数 - 区域进入视窗时执行
    onActivate: (element, animations) => {
      console.log(`激活区域 ${index}`);
      
      // 播放动画
      if (animations && animations.timeline) {
        animations.timeline.play();
      }
    },
    
    // 停用函数 - 区域离开视窗时执行
    onDeactivate: (element, animations) => {
      console.log(`停用区域 ${index}`);
      
      // 暂停动画（可选，取决于你的需求）
      if (animations && animations.timeline) {
        // animations.timeline.pause();
      }
    },
    
    // 清理函数 - 区域离视窗很远时执行
    onCleanup: (element, animations) => {
      console.log(`清理区域 ${index}`);
      
      // 释放资源，重置状态
      if (animations) {
        if (animations.timeline) {
          animations.timeline.kill();
        }
        
        // 重置元素状态（可选）
        gsap.set(animations.elements, {clearProps: "all"});
      }
    }
  });
});

// 页面加载后检查一次
window.addEventListener('load', () => {
  lazyAnimator.checkAll();
});
```

### 分级渲染策略

根据设备性能实现分级渲染，确保所有设备的流畅体验：

```javascript
// 分级渲染策略管理器
class TieredRenderingManager {
  constructor() {
    this.performanceTier = this.detectPerformanceTier();
    this.featureFlags = this.createFeatureFlags();
    this.animationSettings = this.createAnimationSettings();
    
    // 将性能等级应用到文档
    document.documentElement.setAttribute('data-performance-tier', this.performanceTier);
    
    // 监听性能变化
    this.setupPerformanceMonitoring();
  }
  
  // 检测设备性能等级
  detectPerformanceTier() {
    // 使用多种因素检测性能
    
    // 1. 检查设备类型和平台
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 2. 检查硬件并发数
    const cpuCores = navigator.hardwareConcurrency || 1;
    
    // 3. 检查设备内存（如果可用）
    const deviceMemory = navigator.deviceMemory || 4; // 默认4GB
    
    // 4. 检查是否为低电量模式（如果可用）
    const isLowPowerMode = navigator.connection?.saveData || false;
    
    // 5. 检查连接类型（如果可用）
    const connectionType = navigator.connection?.type || 'unknown';
    const isSlowConnection = connectionType === 'cellular' || connectionType === '2g' || connectionType === '3g';
    
    // 6. 检查减少动画偏好
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 根据上述因素确定性能等级
    if (prefersReducedMotion || isLowPowerMode) {
      return 'minimal';
    } else if (isMobile && (cpuCores <= 4 || deviceMemory <= 2 || isSlowConnection)) {
      return 'low';
    } else if (isMobile || cpuCores <= 6 || deviceMemory <= 4) {
      return 'medium';
    } else {
      return 'high';
    }
  }
  
  // 根据性能等级创建功能标志
  createFeatureFlags() {
    const flags = {
      parallaxEnabled: false,
      complexAnimationsEnabled: false,
      particleEffectsEnabled: false,
      shadowsEnabled: false,
      blurEffectsEnabled: false,
      highQualityImagesEnabled: false
    };
    
    // 根据性能等级设置功能标志
    switch (this.performanceTier) {
      case 'high':
        flags.parallaxEnabled = true;
        flags.complexAnimationsEnabled = true;
        flags.particleEffectsEnabled = true;
        flags.shadowsEnabled = true;
        flags.blurEffectsEnabled = true;
        flags.highQualityImagesEnabled = true;
        break;
      case 'medium':
        flags.parallaxEnabled = true;
        flags.complexAnimationsEnabled = true;
        flags.shadowsEnabled = true;
        flags.highQualityImagesEnabled = true;
        break;
      case 'low':
        flags.parallaxEnabled = false;
        flags.complexAnimationsEnabled = false;
        flags.shadowsEnabled = true;
        flags.highQualityImagesEnabled = false;
        break;
      case 'minimal':
        // 最小模式保持所有高级效果关闭
        break;
    }
    
    return flags;
  }
  
  // 创建动画设置
  createAnimationSettings() {
    // 基本设置
    const settings = {
      staggerFactor: 0.05,
      defaultDuration: 0.5,
      easing: 'power2.out',
      particleCount: 0,
      maxAnimatedElements: 20
    };
    
    // 根据性能等级调整设置
    switch (this.performanceTier) {
      case 'high':
        settings.staggerFactor = 0.05;
        settings.defaultDuration = 0.7;
        settings.easing = 'power2.out';
        settings.particleCount = 100;
        settings.maxAnimatedElements = 50;
        break;
      case 'medium':
        settings.staggerFactor = 0.08;
        settings.defaultDuration = 0.5;
        settings.easing = 'power1.out';
        settings.particleCount = 50;
        settings.maxAnimatedElements = 30;
        break;
      case 'low':
        settings.staggerFactor = 0.1;
        settings.defaultDuration = 0.4;
        settings.easing = 'power1.out';
        settings.particleCount = 20;
        settings.maxAnimatedElements = 15;
        break;
      case 'minimal':
        settings.staggerFactor = 0;
        settings.defaultDuration = 0.3;
        settings.easing = 'power1.out';
        settings.particleCount = 0;
        settings.maxAnimatedElements = 5;
        break;
    }
    
    return settings;
  }
  
  // 设置性能监控
  setupPerformanceMonitoring() {
    // 创建FPS监视器
    const fpsMonitor = new FPSMonitor();
    
    // 如果FPS持续偏低，降级渲染
    fpsMonitor.onUpdate((fps) => {
      if (fps < 30 && this.performanceTier !== 'minimal') {
        // 连续低FPS，降级
        this.downgradePerformanceTier();
      }
    });
    
    // 开始监控
    fpsMonitor.start();
  }
  
  // 降级性能等级
  downgradePerformanceTier() {
    let newTier;
    
    switch (this.performanceTier) {
      case 'high':
        newTier = 'medium';
        break;
      case 'medium':
        newTier = 'low';
        break;
      case 'low':
        newTier = 'minimal';
        break;
      default:
        return; // 已是最低等级
    }
    
    console.log(`性能降级：${this.performanceTier} -> ${newTier}`);
    
    // 更新性能等级
    this.performanceTier = newTier;
    document.documentElement.setAttribute('data-performance-tier', this.performanceTier);
    
    // 更新功能标志和动画设置
    this.featureFlags = this.createFeatureFlags();
    this.animationSettings = this.createAnimationSettings();
    
    // 触发性能变化事件
    window.dispatchEvent(new CustomEvent('performancetierchange', {
      detail: {
        tier: this.performanceTier,
        flags: this.featureFlags,
        settings: this.animationSettings
      }
    }));
  }
  
  // 获取当前性能等级
  getPerformanceTier() {
    return this.performanceTier;
  }
  
  // 检查功能是否启用
  isFeatureEnabled(featureName) {
    return this.featureFlags[featureName] || false;
  }
  
  // 获取动画设置
  getAnimationSetting(settingName) {
    return this.animationSettings[settingName];
  }
  
  // 创建适合当前性能等级的动画
  createOptimizedAnimation(element, type) {
    const settings = this.animationSettings;
    
    // 根据性能等级和动画类型创建不同复杂度的动画
    switch (type) {
      case 'entrance':
        if (this.performanceTier === 'minimal') {
          // 最简单的显示动画
          return gsap.fromTo(element, 
            {opacity: 0},
            {opacity: 1, duration: 0.3}
          );
        } else {
          // 标准入场动画
          return gsap.fromTo(element,
            {y: 30, opacity: 0},
            {y: 0, opacity: 1, duration: settings.defaultDuration, ease: settings.easing}
          );
        }
        
      case 'hover':
        if (this.performanceTier === 'minimal') {
          // 简单的悬停效果
          return {
            over: () => gsap.to(element, {opacity: 0.8, duration: 0.2}),
            out: () => gsap.to(element, {opacity: 1, duration: 0.2})
          };
        } else {
          // 复杂的悬停效果
          return {
            over: () => gsap.to(element, {
              scale: 1.05, 
              boxShadow: this.isFeatureEnabled('shadowsEnabled') ? '0 10px 20px rgba(0,0,0,0.15)' : 'none',
              duration: settings.defaultDuration,
              ease: settings.easing
            }),
            out: () => gsap.to(element, {
              scale: 1, 
              boxShadow: 'none', 
              duration: settings.defaultDuration,
              ease: settings.easing
            })
          };
        }
        
      // 其他动画类型...
    }
  }
}

// 使用示例
const renderManager = new TieredRenderingManager();

// 检查是否启用视差效果
if (renderManager.isFeatureEnabled('parallaxEnabled')) {
  // 初始化视差滚动
  document.querySelectorAll('.parallax-element').forEach(element => {
    scrollAnimator.add(element, {
      onUpdate: (progress) => {
        // 使用优化的视差设置
        gsap.set(element, {
          y: (0.5 - progress) * 50,  // 视差移动量减少
          opacity: Math.min(1, progress * 1.5)
        });
      }
    });
  });
}

// 创建性能优化的动画
document.querySelectorAll('.card').forEach(card => {
  // 获取优化的动画设置
  const entranceAnim = renderManager.createOptimizedAnimation(card, 'entrance');
  
  // 为可见元素触发动画
  viewportChecker.add(card, {
    onEnter: () => entranceAnim.play()
  });
  
  // 添加优化的悬停效果
  const hoverAnim = renderManager.createOptimizedAnimation(card, 'hover');
  card.addEventListener('mouseenter', () => hoverAnim.over());
  card.addEventListener('mouseleave', () => hoverAnim.out());
});

// 监听性能等级变化
window.addEventListener('performancetierchange', (e) => {
  console.log(`性能等级已变更为: ${e.detail.tier}`);
  
  // 根据新的性能等级更新UI和动画
  if (e.detail.tier === 'minimal') {
    // 禁用所有非必要动画
    document.querySelectorAll('.optional-animation').forEach(el => {
      gsap.killTweensOf(el);
      gsap.set(el, {clearProps: 'all'});
    });
  }
  
  // 更新CSS变量以适应新的性能等级
  document.documentElement.style.setProperty('--animation-duration', `${e.detail.settings.defaultDuration}s`);
  document.documentElement.style.setProperty('--stagger-delay', `${e.detail.settings.staggerFactor}s`);
});
```

::: tip 视窗优化技巧
- 使用`IntersectionObserver` API代替基于滚动事件的检测，性能更好
- 将动画资源按区域组织，实现更细粒度的资源管理
- 考虑使用CSS变量动态调整动画参数，减少JavaScript操作
- 对于固定位置的元素（如页眉、页脚），不要进行视窗检测
- 在低性能设备上，考虑完全禁用纯装饰性的动画
:::

## 性能与流畅度保障技术

学习如何在复杂交互动画中保持高性能和流畅的用户体验。

### 动画性能分析与优化

了解和识别动画性能瓶颈，采取针对性的优化措施：

```javascript
// 动画性能分析工具
class AnimationPerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      frameTimes: [],
      jankFrames: 0,
      totalFrames: 0
    };
    
    this.isMonitoring = false;
    this.lastFrameTime = 0;
    this.fpsUpdateInterval = 500; // 每500ms更新一次FPS
    this.lastFpsUpdateTime = 0;
    this.currentFps = 0;
    
    // 如果支持Performance Observer，则使用它
    this.hasPerformanceObserver = typeof PerformanceObserver !== 'undefined';
    
    if (this.hasPerformanceObserver) {
      this.setupPerformanceObserver();
    }
  }
  
  // 设置Performance Observer
  setupPerformanceObserver() {
    try {
      this.longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn(`检测到长任务: ${entry.duration}ms`, entry);
          this.metrics.jankFrames++;
        }
      });
      
      this.longTaskObserver.observe({entryTypes: ['longtask']});
    } catch (e) {
      console.warn('PerformanceObserver不被支持或无法监控长任务', e);
      this.hasPerformanceObserver = false;
    }
  }
  
  // 开始监控
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.lastFrameTime = performance.now();
    this.lastFpsUpdateTime = this.lastFrameTime;
    this.metrics = {
      fps: [],
      frameTimes: [],
      jankFrames: 0,
      totalFrames: 0
    };
    
    this.frameCallback();
    
    return this;
  }
  
  // 停止监控
  stop() {
    this.isMonitoring = false;
    
    if (this.hasPerformanceObserver && this.longTaskObserver) {
      this.longTaskObserver.disconnect();
    }
    
    return this;
  }
  
  // 帧回调
  frameCallback() {
    if (!this.isMonitoring) return;
    
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    
    // 记录帧时间
    this.metrics.frameTimes.push(deltaTime);
    this.metrics.totalFrames++;
    
    // 检测卡顿帧 (>50ms视为卡顿)
    if (deltaTime > 50 && !this.hasPerformanceObserver) {
      this.metrics.jankFrames++;
    }
    
    // 定期计算FPS
    if (now - this.lastFpsUpdateTime >= this.fpsUpdateInterval) {
      const frameCount = this.metrics.frameTimes.length;
      const totalTime = now - this.lastFpsUpdateTime;
      
      this.currentFps = Math.round((frameCount * 1000) / totalTime);
      this.metrics.fps.push(this.currentFps);
      
      // 保持合理的数组大小
      if (this.metrics.fps.length > 20) {
        this.metrics.fps.shift();
      }
      
      if (this.metrics.frameTimes.length > 100) {
        this.metrics.frameTimes = this.metrics.frameTimes.slice(-100);
      }
      
      this.lastFpsUpdateTime = now;
      
      // 如果设置了回调，则调用
      if (typeof this.onFpsUpdate === 'function') {
        this.onFpsUpdate(this.currentFps);
      }
    }
    
    this.lastFrameTime = now;
    requestAnimationFrame(() => this.frameCallback());
  }
  
  // 设置FPS更新回调
  onFpsUpdate(callback) {
    this.onFpsUpdate = callback;
    return this;
  }
  
  // 获取性能报告
  getReport() {
    const avgFps = this.metrics.fps.reduce((sum, fps) => sum + fps, 0) / (this.metrics.fps.length || 1);
    
    const frameTimes = [...this.metrics.frameTimes];
    frameTimes.sort((a, b) => a - b);
    
    const medianFrameTime = frameTimes[Math.floor(frameTimes.length / 2)] || 0;
    const p90FrameTime = frameTimes[Math.floor(frameTimes.length * 0.9)] || 0;
    
    return {
      averageFps: Math.round(avgFps),
      currentFps: this.currentFps,
      medianFrameTime: medianFrameTime.toFixed(2),
      p90FrameTime: p90FrameTime.toFixed(2),
      jankFrames: this.metrics.jankFrames,
      totalFrames: this.metrics.totalFrames,
      jankPercentage: ((this.metrics.jankFrames / this.metrics.totalFrames) * 100).toFixed(2),
      isPerformant: avgFps > 50 && (this.metrics.jankFrames / this.metrics.totalFrames) < 0.05
    };
  }
  
  // 创建可视化性能显示
  createPerformanceDisplay() {
    // 创建显示容器
    const container = document.createElement('div');
    container.className = 'gsap-performance-monitor';
    container.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      padding: 10px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      min-width: 180px;
    `;
    
    // 创建FPS显示
    const fpsDisplay = document.createElement('div');
    fpsDisplay.className = 'gsap-fps-display';
    
    // 创建其他指标显示
    const metricsDisplay = document.createElement('div');
    metricsDisplay.className = 'gsap-metrics-display';
    
    container.appendChild(fpsDisplay);
    container.appendChild(metricsDisplay);
    document.body.appendChild(container);
    
    // 更新显示
    const updateDisplay = () => {
      if (!this.isMonitoring) return;
      
      const report = this.getReport();
      
      // 根据FPS设置颜色
      let fpsColor = '#4CAF50'; // 绿色
      if (report.currentFps < 30) {
        fpsColor = '#F44336'; // 红色
      } else if (report.currentFps < 50) {
        fpsColor = '#FFC107'; // 黄色
      }
      
      fpsDisplay.innerHTML = `FPS: <span style="color: ${fpsColor}">${report.currentFps}</span>`;
      
      metricsDisplay.innerHTML = `
        平均: ${report.averageFps} FPS<br>
        帧时间: ${report.medianFrameTime}ms<br>
        卡顿: ${report.jankPercentage}%
      `;
    };
    
    // 设置定期更新
    const updateInterval = setInterval(updateDisplay, 500);
    
    // 返回清理函数
    return () => {
      clearInterval(updateInterval);
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }
}

// 使用示例
const performanceMonitor = new AnimationPerformanceMonitor();

// 开始监控
performanceMonitor.start();

// 添加FPS回调
performanceMonitor.onFpsUpdate((fps) => {
  if (fps < 30) {
    console.warn(`检测到低FPS: ${fps}`);
    // 可以在这里触发性能优化策略
  }
});

// 创建可视化显示（开发和测试时使用）
const removeDisplay = performanceMonitor.createPerformanceDisplay();

// 执行一些动画...

// 一段时间后获取报告
setTimeout(() => {
  const report = performanceMonitor.getReport();
  console.log('性能报告:', report);
  
  // 基于报告进行优化
  if (!report.isPerformant) {
    console.warn('检测到性能问题，正在应用优化策略...');
    applyPerformanceOptimizations();
  }
  
  // 停止监控和显示
  performanceMonitor.stop();
  removeDisplay();
}, 10000);

// 性能优化策略
function applyPerformanceOptimizations() {
  // 减少活跃动画数量
  gsap.globalTimeline.getChildren().forEach(tween => {
    if (!tween.vars.isEssential) {
      tween.kill();
    }
  });
  
  // 降低动画复杂度
  document.querySelectorAll('.complex-animation').forEach(element => {
    // 使用更简单的动画替代
    gsap.killTweensOf(element);
    gsap.to(element, {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.out'
    });
  });
  
  // 禁用非必要的视觉效果
  document.documentElement.classList.add('reduced-animation-complexity');
  
  // 移除不必要的监听器
  window.removeEventListener('scroll', heavyScrollHandler);
  
  // 减少渲染压力
  document.querySelectorAll('.fancy-shadow').forEach(element => {
    element.style.boxShadow = 'none';
  });
}
```

### 批量操作与计算优化

通过批量操作优化动画性能，减少布局抖动：

```javascript
// 批量DOM操作优化器
class BatchDOMOptimizer {
  constructor() {
    this.readQueue = [];
    this.writeQueue = [];
    this.scheduled = false;
    this.frameId = null;
  }
  
  // 批量读取DOM属性（避免强制同步布局）
  read(callback) {
    this.readQueue.push(callback);
    this.scheduleFlush();
    return this;
  }
  
  // 批量写入DOM属性
  write(callback) {
    this.writeQueue.push(callback);
    this.scheduleFlush();
    return this;
  }
  
  // 安排下一帧执行队列
  scheduleFlush() {
    if (!this.scheduled) {
      this.scheduled = true;
      this.frameId = requestAnimationFrame(() => this.flush());
    }
    return this;
  }
  
  // 立即执行队列
  flush() {
    // 先读取DOM，收集所有需要的信息
    const reads = this.readQueue;
    this.readQueue = [];
    
    for (let i = 0; i < reads.length; i++) {
      reads[i]();
    }
    
    // 然后一次性写入DOM
    const writes = this.writeQueue;
    this.writeQueue = [];
    
    for (let i = 0; i < writes.length; i++) {
      writes[i]();
    }
    
    this.scheduled = false;
    
    // 如果在执行过程中添加了新任务，继续安排下一帧
    if (this.readQueue.length || this.writeQueue.length) {
      this.scheduleFlush();
    }
    
    return this;
  }
  
  // 取消所有计划的操作
  clear() {
    this.readQueue = [];
    this.writeQueue = [];
    
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    
    this.scheduled = false;
    return this;
  }
}

// 使用示例
const batchOptimizer = new BatchDOMOptimizer();

// 非优化版本（可能导致布局抖动）
function updateElementsUnoptimized(elements) {
  elements.forEach(element => {
    // 读取DOM
    const height = element.offsetHeight;
    
    // 立即写入DOM（可能导致布局抖动）
    element.style.height = (height * 1.5) + 'px';
    
    // 再次读取（导致强制重新计算布局）
    const width = element.offsetWidth;
    
    // 再次写入
    element.style.width = (width * 1.2) + 'px';
  });
}

// 优化版本（批量读取和写入）
function updateElementsOptimized(elements) {
  // 收集所有读取操作
  const dimensions = [];
  
  batchOptimizer.read(() => {
    elements.forEach((element, i) => {
      dimensions[i] = {
        height: element.offsetHeight,
        width: element.offsetWidth
      };
    });
  });
  
  // 收集所有写入操作
  batchOptimizer.write(() => {
    elements.forEach((element, i) => {
      const dim = dimensions[i];
      element.style.height = (dim.height * 1.5) + 'px';
      element.style.width = (dim.width * 1.2) + 'px';
    });
  });
}

// 在动画中使用批量操作
function animateElementsOptimized(elements) {
  // 使用GSAP创建批量动画
  gsap.to(elements, {
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 0.5,
    onUpdate: function() {
      // 每帧只执行一次批量更新
      batchOptimizer.read(() => {
        // 收集所有需要的数据
        const progress = this.progress();
        
        elements.forEach(element => {
          element._animData = {
            scale: 1 + (0.2 * Math.sin(progress * Math.PI))
          };
        });
      });
      
      batchOptimizer.write(() => {
        // 一次性应用所有更新
        elements.forEach(element => {
          if (element._animData) {
            gsap.set(element, {scale: element._animData.scale});
          }
        });
      });
    }
  });
}
```

### 内存管理与资源释放

管理动画相关资源，避免内存泄漏和性能衰减：

```javascript
// 动画资源管理器
class AnimationResourceManager {
  constructor() {
    this.animations = new Map();  // 动画引用
    this.eventListeners = new Map();  // 事件监听器引用
    this.intervals = new Set();  // 定时器引用
    this.activeElements = new WeakMap();  // 活跃元素引用
  }
  
  // 注册动画
  registerAnimation(id, animation) {
    if (this.animations.has(id)) {
      // 先清理同ID的旧动画
      this.killAnimation(id);
    }
    
    this.animations.set(id, animation);
    return this;
  }
  
  // 注册事件监听器
  registerEventListener(element, eventType, listener, options) {
    if (!this.eventListeners.has(element)) {
      this.eventListeners.set(element, new Map());
    }
    
    const elementListeners = this.eventListeners.get(element);
    
    if (!elementListeners.has(eventType)) {
      elementListeners.set(eventType, new Set());
    }
    
    elementListeners.get(eventType).add({listener, options});
    
    // 添加实际的事件监听器
    element.addEventListener(eventType, listener, options);
    
    return this;
  }
  
  // 注册定时器
  registerInterval(id, intervalId) {
    this.intervals.add({id, intervalId});
    return this;
  }
  
  // 注册活跃元素（使用WeakMap避免内存泄漏）
  registerActiveElement(element, data) {
    this.activeElements.set(element, {
      timestamp: Date.now(),
      data
    });
    return this;
  }
  
  // 停止并移除动画
  killAnimation(id) {
    const animation = this.animations.get(id);
    if (animation) {
      // 检查是GSAP动画还是时间轴
      if (typeof animation.kill === 'function') {
        animation.kill();
      } else if (typeof animation.pause === 'function') {
        animation.pause(0);
        animation.kill();
      }
      
      this.animations.delete(id);
    }
    return this;
  }
  
  // 移除事件监听器
  removeEventListener(element, eventType = null, listener = null) {
    if (!this.eventListeners.has(element)) return this;
    
    const elementListeners = this.eventListeners.get(element);
    
    if (eventType === null) {
      // 移除元素的所有事件监听器
      elementListeners.forEach((listeners, type) => {
        listeners.forEach(({listener, options}) => {
          element.removeEventListener(type, listener, options);
        });
      });
      
      this.eventListeners.delete(element);
    } else if (listener === null) {
      // 移除特定事件类型的所有监听器
      if (elementListeners.has(eventType)) {
        elementListeners.get(eventType).forEach(({listener, options}) => {
          element.removeEventListener(eventType, listener, options);
        });
        
        elementListeners.delete(eventType);
      }
    } else {
      // 移除特定监听器
      if (elementListeners.has(eventType)) {
        const listeners = elementListeners.get(eventType);
        listeners.forEach((item) => {
          if (item.listener === listener) {
            element.removeEventListener(eventType, listener, item.options);
            listeners.delete(item);
          }
        });
        
        if (listeners.size === 0) {
          elementListeners.delete(eventType);
        }
      }
    }
    
    // 如果没有更多监听器，删除元素的记录
    if (elementListeners.size === 0) {
      this.eventListeners.delete(element);
    }
    
    return this;
  }
  
  // 清除定时器
  clearInterval(id = null) {
    if (id === null) {
      // 清除所有定时器
      this.intervals.forEach(({intervalId}) => {
        window.clearInterval(intervalId);
      });
      this.intervals.clear();
    } else {
      // 清除特定ID的定时器
      this.intervals.forEach((item) => {
        if (item.id === id) {
          window.clearInterval(item.intervalId);
          this.intervals.delete(item);
        }
      });
    }
    return this;
  }
  
  // 清理特定元素的所有资源
  cleanupElement(element) {
    // 移除事件监听器
    this.removeEventListener(element);
    
    // 移除相关动画（如果使用元素ID作为动画ID）
    if (element.id) {
      this.killAnimation(element.id);
    }
    
    // 从活跃元素列表中移除
    this.activeElements.delete(element);
    
    return this;
  }
  
  // 清理所有资源
  cleanupAll() {
    // 停止所有动画
    this.animations.forEach((animation) => {
      if (typeof animation.kill === 'function') {
        animation.kill();
      } else if (typeof animation.pause === 'function') {
        animation.pause(0);
        animation.kill();
      }
    });
    this.animations.clear();
    
    // 移除所有事件监听器
    this.eventListeners.forEach((elementListeners, element) => {
      elementListeners.forEach((listeners, type) => {
        listeners.forEach(({listener, options}) => {
          element.removeEventListener(type, listener, options);
        });
      });
    });
    this.eventListeners.clear();
    
    // 清除所有定时器
    this.intervals.forEach(({intervalId}) => {
      window.clearInterval(intervalId);
    });
    this.intervals.clear();
    
    return this;
  }
  
  // 清理不活跃的资源
  cleanupInactive(maxAge = 60000) { // 默认清理60秒前注册的元素
    const now = Date.now();
    
    // 由于使用WeakMap，元素被移除后会自动从活跃元素列表中清除
    // 这里只清理仍在DOM中但不再活跃的元素
    this.eventListeners.forEach((elementListeners, element) => {
      // 检查元素是否仍在文档中
      if (!document.body.contains(element)) {
        this.removeEventListener(element);
        return;
      }
      
      // 检查元素是否长时间不活跃
      const activeData = this.activeElements.get(element);
      if (activeData && (now - activeData.timestamp > maxAge)) {
        this.cleanupElement(element);
      }
    });
    
    return this;
  }
}

// 使用示例
const resourceManager = new AnimationResourceManager();

// 创建并注册动画
function createAndManageAnimation(element, id) {
  const animation = gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    paused: true
  });
  
  // 注册动画以便管理
  resourceManager.registerAnimation(id, animation);
  
  // 标记元素为活跃
  resourceManager.registerActiveElement(element, {type: 'animated'});
  
  return animation;
}

// 绑定并管理事件监听器
function bindManagedEvents(element) {
  const mouseEnterHandler = () => {
    gsap.to(element, {scale: 1.1, duration: 0.3});
  };
  
  const mouseLeaveHandler = () => {
    gsap.to(element, {scale: 1, duration: 0.3});
  };
  
  // 注册事件监听器
  resourceManager.registerEventListener(element, 'mouseenter', mouseEnterHandler);
  resourceManager.registerEventListener(element, 'mouseleave', mouseLeaveHandler);
  
  // 注册定时器（如果需要）
  const intervalId = setInterval(() => {
    // 更新元素活跃时间戳
    resourceManager.registerActiveElement(element, {type: 'refreshed'});
  }, 10000);
  
  resourceManager.registerInterval(element.id, intervalId);
}

// 定期清理不活跃资源
setInterval(() => {
  resourceManager.cleanupInactive(30000); // 清理30秒内不活跃的资源
}, 60000);

// 页面卸载时清理所有资源
window.addEventListener('beforeunload', () => {
  resourceManager.cleanupAll();
});
```

### 异步与延迟加载策略

使用异步和延迟加载减轻初始加载压力，提升动画流畅度：

```javascript
// 动画延迟加载管理器
class LazyAnimationLoader {
  constructor() {
    this.priorityLevels = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };
    
    this.loadedModules = new Set();
    this.isLoading = false;
  }
  
  // 注册动画模块
  register(id, loadFn, options = {}) {
    const priority = options.priority || 'medium';
    const dependencies = options.dependencies || [];
    
    const module = {
      id,
      loadFn,
      dependencies,
      loaded: false,
      options
    };
    
    this.priorityLevels[priority].push(module);
    return this;
  }
  
  // 开始加载过程
  startLoading() {
    if (this.isLoading) return this;
    
    this.isLoading = true;
    
    // 首先加载关键模块
    this.loadPriorityLevel('critical')
      .then(() => {
        // 在下一帧开始加载高优先级模块
        requestAnimationFrame(() => {
          this.loadPriorityLevel('high')
            .then(() => {
              // 在空闲时加载中等优先级模块
              this.scheduleIdleTask(() => {
                this.loadPriorityLevel('medium')
                  .then(() => {
                    // 最后在真正空闲时加载低优先级模块
                    this.scheduleIdleTask(() => {
                      this.loadPriorityLevel('low')
                        .then(() => {
                          this.isLoading = false;
                          this.triggerEvent('allModulesLoaded');
                        });
                    }, {timeout: 3000});
                  });
              }, {timeout: 1000});
            });
        });
      });
    
    return this;
  }
  
  // 加载特定优先级的模块
  async loadPriorityLevel(priority) {
    const modules = this.priorityLevels[priority];
    
    // 按序加载所有模块
    for (const module of modules) {
      await this.loadModule(module);
    }
  }
  
  // 加载单个模块
  async loadModule(module) {
    // 如果已经加载，跳过
    if (module.loaded || this.loadedModules.has(module.id)) {
      return;
    }
    
    // 首先加载所有依赖
    for (const depId of module.dependencies) {
      // 查找依赖模块
      const depModule = this.findModuleById(depId);
      if (depModule && !depModule.loaded) {
        await this.loadModule(depModule);
      }
    }
    
    // 所有依赖加载完成，加载此模块
    try {
      await module.loadFn();
      module.loaded = true;
      this.loadedModules.add(module.id);
      this.triggerEvent('moduleLoaded', {id: module.id});
    } catch (error) {
      console.error(`加载模块 ${module.id} 失败:`, error);
      this.triggerEvent('moduleLoadError', {id: module.id, error});
    }
  }
  
  // 在空闲时执行任务
  scheduleIdleTask(callback, options = {}) {
    const timeout = options.timeout || 1000;
    
    // 如果支持requestIdleCallback，使用它
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, {timeout});
    } else {
      // 降级到setTimeout
      setTimeout(callback, 1);
    }
  }
  
  // 查找模块
  findModuleById(id) {
    for (const priority in this.priorityLevels) {
      const module = this.priorityLevels[priority].find(m => m.id === id);
      if (module) return module;
    }
    return null;
  }
  
  // 事件触发
  triggerEvent(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(`animationLoader:${name}`, {detail}));
    return this;
  }
  
  // 监听事件
  on(eventName, callback) {
    window.addEventListener(`animationLoader:${eventName}`, callback);
    return this;
  }
  
  // 移除事件监听
  off(eventName, callback) {
    window.removeEventListener(`animationLoader:${eventName}`, callback);
    return this;
  }
}

// 使用示例
const animationLoader = new LazyAnimationLoader();

// 注册核心动画模块
animationLoader.register('core', async () => {
  // 加载核心动画功能
  console.log('加载核心动画功能');
  
  // 这里可以动态导入核心GSAP模块
  // const {gsap} = await import('/path/to/gsap-core.js');
  
  // 初始化核心功能
  return Promise.resolve();
}, {priority: 'critical'});

// 注册扩展模块
animationLoader.register('scroll-animations', async () => {
  console.log('加载滚动动画模块');
  
  // 动态导入滚动动画相关功能
  // const {ScrollTrigger} = await import('/path/to/ScrollTrigger.js');
  // gsap.registerPlugin(ScrollTrigger);
  
  return Promise.resolve();
}, {
  priority: 'high',
  dependencies: ['core'] // 依赖核心模块
});

// 注册低优先级的视觉效果模块
animationLoader.register('particles', async () => {
  console.log('加载粒子动画模块');
  
  // 动态导入粒子效果
  // await import('/path/to/particles.js');
  
  return Promise.resolve();
}, {
  priority: 'low',
  dependencies: ['core']
});

// 监听加载事件
animationLoader.on('moduleLoaded', (e) => {
  console.log(`模块 ${e.detail.id} 已加载`);
});

animationLoader.on('allModulesLoaded', () => {
  console.log('所有动画模块已加载完成');
});

// 在页面加载后开始延迟加载过程
window.addEventListener('load', () => {
  // 先处理关键内容和交互
  // ...
  
  // 然后在下一帧开始加载动画模块
  requestAnimationFrame(() => {
    animationLoader.startLoading();
  });
});
```

::: tip 性能优化关键点
- 使用`transform`和`opacity`进行动画，避免触发布局重排的属性
- 通过`will-change`提前通知浏览器即将发生的变化
- 使用Bézier缓动曲线而非Elastic或Back等计算复杂的缓动函数
- 限制同时执行的动画数量，合理使用stagger参数
- 利用`requestAnimationFrame`同步所有动画到一个渲染帧
- 复杂序列使用GSAP时间轴减少回调和管理复杂度
- 在动画更新循环中合并批处理多个DOM操作，减少布局抖动
- 关注Timeline嵌套层级，避免过深的嵌套带来的性能开销
:::

## 实战案例：交互式动画组件

通过构建完整的交互式动画组件，综合应用本章的各项技术。

### 交互式卡片展开组件

下面我们将实现一个可以展开详情的交互式卡片组件，综合使用多种高级交互技术：

```html
<!-- HTML结构 -->
<div class="interactive-cards-container">
  <div class="card" data-card-id="1">
    <div class="card-header">
      <h3>卡片标题 1</h3>
      <button class="expand-btn">展开</button>
    </div>
    <div class="card-content">
      <p>卡片的详细内容区域，展开后显示更多信息...</p>
      <div class="card-details">
        <div class="detail-item">
          <span class="icon">📊</span>
          <span class="value">85%</span>
        </div>
        <div class="detail-item">
          <span class="icon">⭐</span>
          <span class="value">4.7</span>
        </div>
        <div class="detail-item">
          <span class="icon">🕒</span>
          <span class="value">3小时</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 更多卡片... -->
</div>
```

```javascript
// 交互式卡片管理器
class InteractiveCardsManager {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.cards = [];
    this.expandedCard = null;
    
    // 事件总线
    this.eventBus = new AnimationEventBus();
    
    // 性能监控
    this.performanceMonitor = new AnimationPerformanceMonitor();
    
    // 初始化
    this.init();
  }
  
  // 初始化
  init() {
    if (!this.container) return;
    
    // 初始化所有卡片
    this.container.querySelectorAll('.card').forEach(cardElement => {
      this.initCard(cardElement);
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', this.debounce(() => {
      this.updateLayout();
    }, 200));
    
    // 开始性能监控
    this.performanceMonitor.start();
    
    // 初始布局
    this.updateLayout();
  }
  
  // 初始化单个卡片
  initCard(cardElement) {
    const cardId = cardElement.getAttribute('data-card-id');
    const expandBtn = cardElement.querySelector('.expand-btn');
    const cardContent = cardElement.querySelector('.card-content');
    const cardDetails = cardElement.querySelector('.card-details');
    
    // 设置初始状态
    gsap.set(cardContent, {height: 'auto'});
    const contentHeight = cardContent.offsetHeight;
    gsap.set(cardContent, {height: 80, overflow: 'hidden'});
    gsap.set(cardDetails, {opacity: 0, y: 20});
    
    // 创建卡片对象
    const card = {
      element: cardElement,
      id: cardId,
      expandBtn,
      content: cardContent,
      details: cardDetails,
      contentHeight,
      expanded: false,
      animations: {
        expand: null,
        collapse: null,
        hover: null
      }
    };
    
    // 创建展开/收起动画
    card.animations.expand = gsap.timeline({paused: true})
      .to(cardContent, {
        height: contentHeight,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(cardDetails, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1
      }, '-=0.3')
      .to(expandBtn, {
        rotation: 180,
        duration: 0.4
      }, 0);
    
    card.animations.collapse = gsap.timeline({paused: true})