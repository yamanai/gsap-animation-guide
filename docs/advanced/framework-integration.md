# GSAP与现代框架深度集成

在专业的前端开发中，GSAP通常需要与现代框架（如Vue、React等）深度集成。本章将探讨如何在复杂的框架环境中充分发挥GSAP的动画能力，构建高效、可维护的动画系统。

## 组件生命周期与动画同步

理解不同框架中组件的生命周期，并将GSAP动画与之有效同步。

在框架环境中，动画的初始化、运行和销毁都应当与组件的生命周期紧密绑定，这样才能确保资源的正确管理，避免内存泄漏和其他意外问题。

### Vue中的生命周期同步

Vue组件有明确的生命周期钩子，我们可以利用这些钩子来管理GSAP动画：

```javascript
// Vue3组件中的GSAP动画生命周期管理
export default {
  data() {
    return {
      boxAnimation: null
    }
  },
  // 组件挂载后初始化动画
  mounted() {
    // 创建动画并保存引用
    this.boxAnimation = gsap.to('.box', {
      x: 200,
      rotation: 360,
      duration: 2,
      paused: true // 初始化时暂停，等待适当时机播放
    });
    
    // 根据需要决定是否立即播放
    // this.boxAnimation.play();
  },
  methods: {
    playAnimation() {
      if (this.boxAnimation) {
        this.boxAnimation.play();
      }
    },
    pauseAnimation() {
      if (this.boxAnimation) {
        this.boxAnimation.pause();
      }
    }
  },
  // 组件销毁前清理动画
  beforeUnmount() {
    if (this.boxAnimation) {
      this.boxAnimation.kill(); // 彻底销毁动画
      this.boxAnimation = null;
    }
  }
}
```

在Vue3的组合式API中，我们可以使用更灵活的方式：

```javascript
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const boxAnimation = ref(null);
    
    onMounted(() => {
      boxAnimation.value = gsap.to('.box', {
        x: 200,
        rotation: 360,
        duration: 2,
        paused: true
      });
    });
    
    onBeforeUnmount(() => {
      if (boxAnimation.value) {
        boxAnimation.value.kill();
        boxAnimation.value = null;
      }
    });
    
    return {
      playAnimation: () => boxAnimation.value?.play(),
      pauseAnimation: () => boxAnimation.value?.pause()
    };
  }
}
```

### React中的生命周期同步

在React中，我们可以使用useEffect和useRef来管理动画生命周期：

```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function AnimatedComponent() {
  // 使用ref保存动画实例
  const boxAnimation = useRef(null);
  // 使用ref获取DOM元素
  const boxRef = useRef(null);
  
  // 组件挂载和更新时的处理
  useEffect(() => {
    // 创建动画
    boxAnimation.current = gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      paused: true
    });
    
    // 清理函数 - 组件卸载时执行
    return () => {
      if (boxAnimation.current) {
        boxAnimation.current.kill();
        boxAnimation.current = null;
      }
    };
  }, []); // 空依赖数组表示仅在挂载和卸载时执行
  
  // 播放动画的处理函数
  const handlePlay = () => {
    boxAnimation.current?.play();
  };
  
  // 暂停动画的处理函数
  const handlePause = () => {
    boxAnimation.current?.pause();
  };
  
  return (
    <div>
      <div ref={boxRef} className="box"></div>
      <button onClick={handlePlay}>播放</button>
      <button onClick={handlePause}>暂停</button>
    </div>
  );
}
```

### 组件生命周期与动画状态的高级同步

在更复杂的场景中，我们可能需要根据组件的不同状态管理多个动画序列：

```javascript
// Vue3组件中的高级生命周期同步
export default {
  props: {
    isVisible: Boolean
  },
  data() {
    return {
      enterAnimation: null,
      exitAnimation: null,
      contentAnimation: null
    }
  },
  watch: {
    // 监听属性变化，触发相应的动画
    isVisible(newValue, oldValue) {
      if (newValue === true) {
        this.playEnterAnimation();
      } else {
        this.playExitAnimation();
      }
    }
  },
  mounted() {
    // 创建进入动画
    this.enterAnimation = gsap.timeline({
      paused: true,
      onComplete: () => this.setupContentAnimation()
    });
    this.enterAnimation
      .from('.modal', { opacity: 0, y: -50, duration: 0.5 })
      .from('.modal-backdrop', { opacity: 0, duration: 0.3 }, 0);
    
    // 创建退出动画
    this.exitAnimation = gsap.timeline({
      paused: true,
      onComplete: () => this.$emit('exit-complete')
    });
    this.exitAnimation
      .to('.modal', { opacity: 0, y: -50, duration: 0.4 })
      .to('.modal-backdrop', { opacity: 0, duration: 0.3 }, 0);
    
    // 初始状态设置
    if (this.isVisible) {
      this.playEnterAnimation();
    }
  },
  methods: {
    playEnterAnimation() {
      // 确保退出动画已经停止
      this.exitAnimation.pause(0);
      this.enterAnimation.restart();
    },
    playExitAnimation() {
      // 停止其他动画
      if (this.contentAnimation) {
        this.contentAnimation.kill();
      }
      this.enterAnimation.pause();
      this.exitAnimation.restart();
    },
    setupContentAnimation() {
      // 进入动画完成后设置内容动画
      this.contentAnimation = gsap.from('.modal-content > *', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      });
    }
  },
  beforeUnmount() {
    // 清理所有动画
    [this.enterAnimation, this.exitAnimation, this.contentAnimation].forEach(anim => {
      if (anim) anim.kill();
    });
  }
}
```

::: tip 生命周期同步关键点
- 始终在组件挂载时创建动画，在组件销毁前清理
- 使用refs（React）或实例属性（Vue）保存动画引用
- 将复杂动画的创建与其他生命周期事件分离
- 监听组件属性变化，触发相应的动画状态变更
- 在异步生命周期事件（如数据加载完成）后再初始化依赖这些数据的动画
:::

## 动画实例的创建与销毁管理

掌握在组件环境中正确创建和销毁GSAP动画实例的最佳实践。

### 集中式动画实例管理

在组件内管理多个动画实例时，可以创建集中式的管理系统：

```javascript
// 创建动画管理器
class AnimationManager {
  constructor() {
    this.animations = new Map();
  }
  
  // 创建并存储动画
  create(id, target, vars) {
    // 先清理同ID的旧动画
    this.kill(id);
    
    // 创建新动画
    const animation = gsap.to(target, vars);
    this.animations.set(id, animation);
    
    return animation;
  }
  
  // 创建时间线
  createTimeline(id, vars) {
    this.kill(id);
    
    const timeline = gsap.timeline(vars);
    this.animations.set(id, timeline);
    
    return timeline;
  }
  
  // 获取动画
  get(id) {
    return this.animations.get(id);
  }
  
  // 销毁单个动画
  kill(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.kill();
      this.animations.delete(id);
    }
  }
  
  // 销毁所有动画
  killAll() {
    this.animations.forEach(animation => animation.kill());
    this.animations.clear();
  }
}

// 在Vue3中使用
export default {
  data() {
    return {
      animManager: new AnimationManager()
    }
  },
  methods: {
    setupAnimations() {
      // 创建多个动画并通过ID管理
      this.animManager.create('header', '.header', {
        y: 0, 
        opacity: 1, 
        duration: 1
      });
      
      const timeline = this.animManager.createTimeline('content');
      timeline
        .to('.item1', {x: 100, duration: 0.5})
        .to('.item2', {y: 50, duration: 0.5})
        .to('.item3', {rotation: 45, duration: 0.5});
    },
    playHeaderAnimation() {
      const anim = this.animManager.get('header');
      if (anim) anim.play();
    }
  },
  mounted() {
    this.setupAnimations();
  },
  beforeUnmount() {
    this.animManager.killAll();
  }
}
```

### 使用GSAP上下文管理动画

GSAP 3提供了上下文功能，可以大大简化动画实例的管理：

```javascript
// 在React中使用GSAP上下文
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

function AnimatedScene() {
  const root = useRef(null);
  const ctx = useRef(null);
  
  useLayoutEffect(() => {
    // 创建一个作用域限定在组件根元素的GSAP上下文
    ctx.current = gsap.context(() => {
      // 所有在这个函数内创建的动画都会被上下文跟踪
      gsap.to('.box', { x: 100, duration: 1 });
      gsap.from('.circle', { scale: 0, duration: 0.8 });
      
      // 创建时间线
      const tl = gsap.timeline();
      tl.to('.item', { y: 50, stagger: 0.1 })
        .to('.item', { rotation: 45 });
    }, root); // 限定作用域到根元素
    
    // 组件卸载时自动清理所有动画
    return () => ctx.current.revert();
  }, []);
  
  return (
    <div ref={root} className="animated-scene">
      <div className="box"></div>
      <div className="circle"></div>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  );
}
```

在Vue3的组合式API中使用上下文：

```javascript
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

export default {
  setup() {
    const root = ref(null);
    let ctx = null;
    
    onMounted(() => {
      // 创建GSAP上下文
      ctx = gsap.context(() => {
        gsap.to('.box', { x: 100, duration: 1 });
        gsap.from('.circle', { scale: 0, duration: 0.8 });
        
        const tl = gsap.timeline();
        tl.to('.item', { y: 50, stagger: 0.1 })
          .to('.item', { rotation: 45 });
      }, root.value); // 限定作用域到根元素
    });
    
    onBeforeUnmount(() => {
      // 一次性清理所有动画
      if (ctx) ctx.revert();
    });
    
    return { root };
  },
  template: `
    <div ref="root" class="animated-scene">
      <div class="box"></div>
      <div class="circle"></div>
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
  `
}
```

### 延迟创建与按需加载

对于大型应用，可以采用延迟创建和按需加载策略来优化性能：

```javascript
// React中的延迟创建与按需加载
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function LazyAnimatedComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const containerRef = useRef(null);
  const animation = useRef(null);
  
  // 监测元素可见性
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  // 当元素可见时，按需加载GSAP
  useEffect(() => {
    if (!isVisible) return;
    
    // 异步加载GSAP相关模块
    const loadGSAPModules = async () => {
      // 这里可以使用动态导入，实际项目中可能已经预加载了GSAP
      try {
        // const { gsap, ScrollTrigger } = await import('gsap/all');
        // gsap.registerPlugin(ScrollTrigger);
        
        // 创建动画
        animation.current = gsap.from(containerRef.current.querySelectorAll('.item'), {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8
        });
        
        setIsAnimationLoaded(true);
      } catch (error) {
        console.error('Failed to load animation modules:', error);
      }
    };
    
    loadGSAPModules();
    
    return () => {
      if (animation.current) {
        animation.current.kill();
      }
    };
  }, [isVisible]);
  
  return (
    <div ref={containerRef} className="lazy-container">
      {isAnimationLoaded ? (
        <>
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}
```

::: tip 动画实例管理要点
- 使用集中式管理器或GSAP上下文跟踪所有动画实例
- 为动画分配唯一标识符，便于后续控制和管理
- 避免创建过多动画实例，复用已有实例
- 使用延迟创建和按需加载策略减少初始负载
- 确保在组件销毁时彻底清理所有动画实例
:::

## 动态组件的动画实现

学习如何为动态创建和销毁的组件添加流畅的动画效果。

### Vue中的动态组件动画

Vue提供了内置的`<transition>`和`<transition-group>`组件，可以与GSAP结合实现高级动画效果：

```vue
<template>
  <div class="dynamic-components">
    <button @click="addItem">添加项目</button>
    <button @click="removeItem">移除项目</button>
    
    <transition-group
      tag="div"
      class="items-container"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-for="item in items" :key="item.id" class="item">
        {{ item.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  data() {
    return {
      items: [],
      nextId: 1
    }
  },
  methods: {
    addItem() {
      this.items.push({
        id: this.nextId++,
        text: `项目 ${this.nextId - 1}`
      });
    },
    removeItem() {
      if (this.items.length) {
        this.items.pop();
      }
    },
    // GSAP动画钩子
    beforeEnter(el) {
      gsap.set(el, {
        opacity: 0,
        height: 0,
        y: 20,
        overflow: 'hidden'
      });
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: 'auto',
        y: 0,
        duration: 0.5,
        onComplete: done
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        y: -20,
        duration: 0.5,
        onComplete: done
      });
    }
  }
}
</script>
```

### React中的动态组件动画

在React中，我们可以使用库如react-transition-group，或者自定义钩子实现动态组件动画：

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function DynamicItems() {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);
  
  const addItem = () => {
    const newItem = {
      id: nextId,
      text: `项目 ${nextId}`
    };
    setItems([...items, newItem]);
    setNextId(nextId + 1);
  };
  
  const removeItem = () => {
    if (items.length) {
      setItems(items.slice(0, -1));
    }
  };
  
  // 每个项目的组件
  const Item = ({ item }) => {
    const nodeRef = useRef(null);
    
    return (
      <CSSTransition
        nodeRef={nodeRef}
        timeout={500}
        classNames="item"
        onEnter={(node) => {
          gsap.from(node, {
            opacity: 0,
            y: 20,
            duration: 0.5
          });
        }}
        onExit={(node) => {
          gsap.to(node, {
            opacity: 0,
            y: -20,
            height: 0,
            duration: 0.5
          });
        }}
      >
        <div ref={nodeRef} className="item">
          {item.text}
        </div>
      </CSSTransition>
    );
  };
  
  return (
    <div className="dynamic-components">
      <button onClick={addItem}>添加项目</button>
      <button onClick={removeItem}>移除项目</button>
      
      <TransitionGroup className="items-container">
        {items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </TransitionGroup>
    </div>
  );
}
```

### 动态组件的高级动画策略

对于更复杂的场景，如列表的排序、过滤和动态更新，可以采用更高级的策略：

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function AdvancedDynamicList({ items: propItems }) {
  const [visibleItems, setVisibleItems] = useState(propItems);
  const listRef = useRef(null);
  const itemsRef = useRef(new Map()).current;
  const prevPositions = useRef(new Map()).current;
  
  // 保存元素的当前位置
  const savePositions = () => {
    itemsRef.forEach((node, id) => {
      const rect = node.getBoundingClientRect();
      prevPositions.set(id, { top: rect.top, left: rect.left });
    });
  };
  
  // 计算并应用FLIP动画
  const animatePositions = () => {
    itemsRef.forEach((node, id) => {
      const prevPos = prevPositions.get(id);
      if (!prevPos) return;
      
      const currentRect = node.getBoundingClientRect();
      const deltaX = prevPos.left - currentRect.left;
      const deltaY = prevPos.top - currentRect.top;
      
      if (deltaX || deltaY) {
        // 设置初始位置（反转）
        gsap.set(node, {
          x: deltaX,
          y: deltaY,
          opacity: 1
        });
        
        // 动画到最终位置（播放）
        gsap.to(node, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power1.out"
        });
      }
    });
  };
  
  // 当items属性变化时更新列表
  useEffect(() => {
    // 保存当前位置
    savePositions();
    
    // 计算即将移除的项目
    const removedItems = visibleItems.filter(
      oldItem => !propItems.some(newItem => newItem.id === oldItem.id)
    );
    
    // 为移除的项目设置动画
    removedItems.forEach(item => {
      const node = itemsRef.get(item.id);
      if (node) {
        gsap.to(node, {
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.3,
          onComplete: () => {
            // 动画完成后更新状态
            setVisibleItems(propItems);
          }
        });
      }
    });
    
    // 如果没有移除项目，直接更新状态
    if (removedItems.length === 0) {
      setVisibleItems(propItems);
    }
  }, [propItems]);
  
  // 在DOM更新后应用FLIP动画
  useEffect(() => {
    // 为新项目设置进入动画
    const newItems = visibleItems.filter(
      newItem => !prevPositions.has(newItem.id)
    );
    
    newItems.forEach(item => {
      const node = itemsRef.get(item.id);
      if (node) {
        gsap.from(node, {
          opacity: 0,
          height: 0,
          y: 20,
          duration: 0.5
        });
      }
    });
    
    // 应用位置动画
    animatePositions();
  }, [visibleItems]);
  
  return (
    <div ref={listRef} className="advanced-list">
      {visibleItems.map(item => (
        <div
          key={item.id}
          className="list-item"
          ref={node => {
            if (node) {
              itemsRef.set(item.id, node);
            } else {
              itemsRef.delete(item.id);
            }
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

这种FLIP（First, Last, Invert, Play）技术可以高效地为复杂列表变化创建流畅的过渡动画。

::: tip 动态组件动画要点
- 在Vue中利用内置的transition组件与GSAP结合
- 在React中使用ref和生命周期方法控制动画
- 为列表项的添加、移除和移动设计不同的动画效果
- 使用FLIP技术实现高性能的位置变换动画
- 妥善处理动画过程中的布局影响，避免不必要的重排
:::

## 避免内存泄漏的最佳实践

理解并防止框架环境中使用GSAP可能导致的内存泄漏问题。

在框架环境中使用GSAP时，内存泄漏主要来源于未正确销毁的动画实例、循环引用以及事件监听器。下面是一些避免这些问题的最佳实践。

### 常见内存泄漏来源

```javascript
// 内存泄漏示例 - 不正确的动画处理
function createLeakyAnimation() {
  // 问题1: 创建全局引用但不清理
  window.globalTimeline = gsap.timeline();
  
  // 问题2: 对DOM元素的长期引用
  const elements = document.querySelectorAll('.animated');
  
  // 问题3: 循环引用
  const data = { elements: elements };
  
  window.globalTimeline.to(elements, {
    x: 100,
    duration: 1,
    onComplete: function() {
      // 保存对数据的引用，造成循环引用
      this.data = data;
      // 动画完成后的回调仍然持有元素引用
      console.log(`Animated ${elements.length} elements`);
    }
  });
  
  return () => {
    // 函数返回但没有正确清理动画，导致内存泄漏
  };
}
```

### 避免内存泄漏的策略

#### 1. 使用GSAP上下文

```javascript
// Vue3组件中使用上下文避免泄漏
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

export default {
  setup() {
    const containerRef = ref(null);
    let ctx = null;
    
    onMounted(() => {
      // 创建限定在组件内的上下文
      ctx = gsap.context((self) => {
        // 所有动画都在此上下文中创建
        self.add(() => {
          gsap.to('.box', { x: 100, duration: 1 });
          gsap.to('.circle', { scale: 1.5, duration: 0.8 });
        });
        
        // 创建时间线
        const tl = gsap.timeline();
        tl.to('.item', { opacity: 1, stagger: 0.1 });
        
        // 添加到上下文
        self.add(tl);
      }, containerRef.value);
    });
    
    onBeforeUnmount(() => {
      // 一次性清理所有动画和关联资源
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
    });
    
    return { containerRef };
  }
}
```

#### 2. 避免在回调中创建闭包引用

```javascript
// 避免闭包导致的内存泄漏
function createSafeAnimation() {
  const component = {
    elements: document.querySelectorAll('.item'),
    largeData: new Array(1000).fill('data'),
    
    init() {
      // 不良做法 - 在回调中引用组件
      gsap.to(this.elements, {
        x: 100,
        duration: 1,
        onComplete: function() {
          // 这会持有对整个组件(包括largeData)的引用
          console.log(`Animated ${component.elements.length} items`);
          // 即使动画完成，largeData也不会被释放
        }
      });
      
      // 良好做法 - 使用弱引用或传递必要数据
      const count = this.elements.length;
      gsap.to(this.elements, {
        x: 100,
        duration: 1,
        onComplete: function() {
          // 只使用已保存的数据，不引用组件
          console.log(`Animated ${count} items`);
        }
      });
    },
    
    destroy() {
      // 清理动画
      gsap.killTweensOf(this.elements);
      this.elements = null;
      this.largeData = null;
    }
  };
  
  return component;
}
```

#### 3. 正确管理事件监听器

```jsx
// React组件中管理事件监听器
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function AnimatedScroller() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const element = containerRef.current;
    let scrollTween;
    
    // 创建滚动处理函数
    const handleScroll = () => {
      // 避免重复创建动画
      if (scrollTween) {
        scrollTween.kill();
      }
      
      // 创建新动画
      scrollTween = gsap.to('.parallax-element', {
        y: window.scrollY * 0.5,
        duration: 0.5
      });
    };
    
    // 使用防抖优化事件处理
    const debouncedHandleScroll = debounce(handleScroll, 10);
    
    // 添加事件监听
    window.addEventListener('scroll', debouncedHandleScroll);
    
    // 保存引用以便清理
    animationRef.current = scrollTween;
    
    // 清理函数
    return () => {
      // 移除事件监听
      window.removeEventListener('scroll', debouncedHandleScroll);
      
      // 清理动画
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (scrollTween) {
        scrollTween.kill();
      }
    };
  }, []);
  
  // 防抖函数
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  return <div ref={containerRef} className="scroller-container">...</div>;
}
```

#### 4. 循环引用检测

在复杂应用中，可以创建工具函数来检测潜在的循环引用：

```javascript
// 循环引用检测工具
function detectCircularReferences(obj, path = [], visited = new WeakSet()) {
  // 基本类型或null/undefined不会造成循环引用
  if (obj === null || typeof obj !== 'object') return false;
  
  // 检测循环引用
  if (visited.has(obj)) {
    console.warn('Circular reference detected at:', path.join('.'));
    return true;
  }
  
  // 标记为已访问
  visited.add(obj);
  
  // 递归检查所有属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (detectCircularReferences(obj[key], [...path, key], visited)) {
        return true;
      }
    }
  }
  
  return false;
}

// 使用方法
function checkAnimation(animation) {
  detectCircularReferences(animation);
}
```

#### 5. 内存使用监控

实现简单的内存监控工具，帮助发现潜在问题：

```javascript
// 内存监控工具
const MemoryMonitor = {
  start() {
    if (!performance.memory) {
      console.warn('Memory API not available in this browser');
      return;
    }
    
    this.memoryCheckInterval = setInterval(() => {
      const used = performance.memory.usedJSHeapSize / (1024 * 1024);
      const total = performance.memory.totalJSHeapSize / (1024 * 1024);
      const limit = performance.memory.jsHeapSizeLimit / (1024 * 1024);
      
      console.log(`Memory Usage: ${used.toFixed(2)}MB / ${total.toFixed(2)}MB (Limit: ${limit.toFixed(2)}MB)`);
      
      // 检查是否有内存泄漏迹象
      if (used > total * 0.8) {
        console.warn('Possible memory leak detected! Memory usage is high.');
      }
    }, 5000);
  },
  
  stop() {
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval);
    }
  },
  
  // 手动触发垃圾回收（仅在特定环境下有效）
  forceGC() {
    if (window.gc) {
      window.gc();
      console.log('Manual garbage collection triggered');
    }
  }
};

// 使用方法
function monitorComponent() {
  MemoryMonitor.start();
  
  // 模拟组件销毁
  return () => {
    MemoryMonitor.stop();
  };
}
```

::: tip 内存泄漏防范关键点
- 使用GSAP上下文(gsap.context())自动管理动画生命周期
- 避免在动画回调中引用大型对象或组件实例
- 妥善管理事件监听器，确保在组件销毁时移除
- 注意循环引用，特别是在复杂数据结构中
- 使用弱引用(WeakMap/WeakSet)存储可能造成循环引用的对象
- 定期监控内存使用情况，及早发现潜在问题
:::

## 组件状态变化的高效动画

设计能够响应组件状态变化的高效动画系统。

在框架应用中，组件状态的变化通常需要触发相应的动画效果。以下是几种实现高效状态驱动动画的方法。

### 基于状态的动画控制

#### Vue中的状态驱动动画

利用Vue的响应式系统和计算属性驱动动画：

```vue
<template>
  <div class="card" :class="{ expanded: isExpanded }">
    <div class="card-header" @click="toggleExpand">
      <h3>{{ title }}</h3>
      <div class="arrow" ref="arrow"></div>
    </div>
    <div class="card-content" ref="content">
      <div class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  props: {
    title: String,
    initialExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: this.initialExpanded,
      animations: {
        content: null,
        arrow: null
      }
    };
  },
  watch: {
    // 监听状态变化，触发相应动画
    isExpanded(newValue, oldValue) {
      if (newValue) {
        this.expandCard();
      } else {
        this.collapseCard();
      }
    }
  },
  mounted() {
    // 初始化
    this.setupAnimations();
    
    // 根据初始状态设置
    if (this.isExpanded) {
      gsap.set(this.$refs.content, { height: 'auto' });
      gsap.set(this.$refs.arrow, { rotation: 180 });
    } else {
      gsap.set(this.$refs.content, { height: 0 });
    }
  },
  methods: {
    setupAnimations() {
      // 预先创建动画，提高性能
      this.animations.content = gsap.timeline({ paused: true })
        .to(this.$refs.content, {
          height: 'auto',
          duration: 0.3,
          ease: 'power1.out'
        });
      
      this.animations.arrow = gsap.timeline({ paused: true })
        .to(this.$refs.arrow, {
          rotation: 180,
          duration: 0.3,
          ease: 'power1.inOut'
        });
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    expandCard() {
      // 使用预先创建的动画
      this.animations.content.play();
      this.animations.arrow.play();
    },
    collapseCard() {
      this.animations.content.reverse();
      this.animations.arrow.reverse();
    }
  },
  beforeUnmount() {
    // 清理动画
    Object.values(this.animations).forEach(anim => {
      if (anim) anim.kill();
    });
  }
};
</script>
```

#### React中的状态驱动动画

使用React hooks和状态管理动画：

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function ExpandableCard({ title, children, initialExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);
  const animations = useRef({
    content: null,
    arrow: null
  }).current;
  
  // 初始化动画
  useEffect(() => {
    // 创建内容动画
    animations.content = gsap.timeline({ paused: true })
      .to(contentRef.current, {
        height: 'auto',
        duration: 0.3,
        ease: 'power1.out'
      });
    
    // 创建箭头动画
    animations.arrow = gsap.timeline({ paused: true })
      .to(arrowRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    
    // 设置初始状态
    if (isExpanded) {
      gsap.set(contentRef.current, { height: 'auto' });
      gsap.set(arrowRef.current, { rotation: 180 });
    } else {
      gsap.set(contentRef.current, { height: 0 });
    }
    
    // 清理函数
    return () => {
      animations.content.kill();
      animations.arrow.kill();
    };
  }, []); // 空依赖数组，只在挂载和卸载时执行
  
  // 响应状态变化
  useEffect(() => {
    if (isExpanded) {
      animations.content.play();
      animations.arrow.play();
    } else {
      animations.content.reverse();
      animations.arrow.reverse();
    }
  }, [isExpanded, animations]);
  
  // 切换展开状态
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={toggleExpand}>
        <h3>{title}</h3>
        <div className="arrow" ref={arrowRef}></div>
      </div>
      <div className="card-content" ref={contentRef}>
        <div className="content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### 复杂状态过渡管理

对于具有多个状态的组件，可以使用状态机来管理复杂的过渡动画：

```javascript
// Vue3组合式API中使用状态机管理动画
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { createMachine, interpret } from 'xstate';

export default {
  props: {
    initialState: {
      type: String,
      default: 'idle'
    }
  },
  setup(props) {
    const elementRef = ref(null);
    const currentState = ref(props.initialState);
    const ctx = ref(null);
    
    // 定义状态机
    const animationMachine = createMachine({
      id: 'animationState',
      initial: props.initialState,
      states: {
        idle: {
          on: { ACTIVATE: 'active', DISABLE: 'disabled' }
        },
        active: {
          on: { DEACTIVATE: 'idle', DISABLE: 'disabled' }
        },
        disabled: {
          on: { ENABLE: 'idle' }
        }
      }
    });
    
    // 创建状态机服务
    const animationService = interpret(animationMachine)
      .onTransition(state => {
        // 状态变化时触发动画
        if (state.changed) {
          currentState.value = state.value;
        }
      });
    
    // 启动状态机
    onMounted(() => {
      animationService.start();
      
      // 创建GSAP上下文
      ctx.value = gsap.context(() => {}, elementRef.value);
    });
    
    // 停止状态机
    onBeforeUnmount(() => {
      animationService.stop();
      if (ctx.value) ctx.value.revert();
    });
    
    // 监听状态变化
    watch(currentState, (newState, oldState) => {
      // 根据状态转换执行相应动画
      playStateTransition(oldState, newState);
    });
    
    // 状态转换动画
    const playStateTransition = (from, to) => {
      if (!ctx.value) return;
      
      // 使用GSAP上下文创建动画
      ctx.value.add(() => {
        // 从idle到active的转换
        if (from === 'idle' && to === 'active') {
          return gsap.to(elementRef.value, {
            scale: 1.2,
            backgroundColor: '#4CAF50',
            duration: 0.5
          });
        }
        
        // 从active到idle的转换
        if (from === 'active' && to === 'idle') {
          return gsap.to(elementRef.value, {
            scale: 1,
            backgroundColor: '#2196F3',
            duration: 0.5
          });
        }
        
        // 任何状态到disabled的转换
        if (to === 'disabled') {
          return gsap.to(elementRef.value, {
            scale: 0.9,
            backgroundColor: '#9E9E9E',
            opacity: 0.7,
            duration: 0.5
          });
        }
        
        // 从disabled到idle的转换
        if (from === 'disabled' && to === 'idle') {
          return gsap.to(elementRef.value, {
            scale: 1,
            backgroundColor: '#2196F3',
            opacity: 1,
            duration: 0.5
          });
        }
      });
    };
    
    // 对外暴露状态机控制方法
    const activate = () => animationService.send('ACTIVATE');
    const deactivate = () => animationService.send('DEACTIVATE');
    const disable = () => animationService.send('DISABLE');
    const enable = () => animationService.send('ENABLE');
    
    return {
      elementRef,
      currentState,
      activate,
      deactivate,
      disable,
      enable
    };
  }
};
```

### 中间状态和过渡状态管理

在某些情况下，组件可能需要经过多个中间状态才能到达最终状态。以下是管理这种复杂过渡的方法：

```jsx
// React组件中管理中间状态
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// 定义可能的状态
const States = {
  INITIAL: 'initial',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  CONFIRMED: 'confirmed'
};

function StatefulButton() {
  const [state, setState] = useState(States.INITIAL);
  const [isPending, setIsPending] = useState(false);
  const buttonRef = useRef(null);
  const timeline = useRef(null);
  
  // 状态转换函数
  const transition = (nextState) => {
    // 设置过渡标志
    setIsPending(true);
    
    // 执行相应的转换动画
    const tl = gsap.timeline({
      onComplete: () => {
        // 动画完成后更新状态并清除过渡标志
        setState(nextState);
        setIsPending(false);
      }
    });
    
    // 根据当前状态和目标状态定义不同的动画
    switch (state) {
      case States.INITIAL:
        if (nextState === States.LOADING) {
          tl.to(buttonRef.current, {
            width: 60,
            duration: 0.3,
            ease: 'power1.out'
          }).to(buttonRef.current, {
            borderRadius: 30,
            duration: 0.2
          });
        }
        break;
      
      case States.LOADING:
        if (nextState === States.SUCCESS) {
          tl.to(buttonRef.current, {
            backgroundColor: '#4CAF50',
            duration: 0.3
          }).to(buttonRef.current, {
            width: 120,
            duration: 0.3
          });
        } else if (nextState === States.ERROR) {
          tl.to(buttonRef.current, {
            backgroundColor: '#F44336',
            duration: 0.3
          }).to(buttonRef.current, {
            width: 120,
            duration: 0.3
          });
        }
        break;
      
      case States.SUCCESS:
      case States.ERROR:
        if (nextState === States.CONFIRMED) {
          tl.to(buttonRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.3
          }).to(buttonRef.current, {
            width: 180,
            backgroundColor: '#2196F3',
            y: 0,
            opacity: 1,
            duration: 0.3
          });
        }
        break;
      
      case States.CONFIRMED:
        if (nextState === States.INITIAL) {
          tl.to(buttonRef.current, {
            width: 120,
            duration: 0.3
          });
        }
        break;
    }
    
    // 保存时间线引用
    timeline.current = tl;
  };
  
  // 处理点击事件
  const handleClick = () => {
    if (isPending) return; // 忽略过渡期间的点击
    
    switch (state) {
      case States.INITIAL:
        transition(States.LOADING);
        // 模拟API调用
        setTimeout(() => {
          const success = Math.random() > 0.3;
          transition(success ? States.SUCCESS : States.ERROR);
        }, 2000);
        break;
      
      case States.SUCCESS:
      case States.ERROR:
        transition(States.CONFIRMED);
        break;
      
      case States.CONFIRMED:
        transition(States.INITIAL);
        break;
    }
  };
  
  // 清理动画
  useEffect(() => {
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, []);
  
  // 根据状态渲染不同的内容
  const getButtonText = () => {
    switch (state) {
      case States.INITIAL: return '提交';
      case States.LOADING: return '';
      case States.SUCCESS: return '成功';
      case States.ERROR: return '失败';
      case States.CONFIRMED: return '完成';
      default: return '';
    }
  };
  
  return (
    <button
      ref={buttonRef}
      className={`state-button ${state} ${isPending ? 'pending' : ''}`}
      onClick={handleClick}
      disabled={state === States.LOADING}
    >
      {state === States.LOADING ? (
        <div className="spinner"></div>
      ) : (
        getButtonText()
      )}
    </button>
  );
}
```

::: tip 状态驱动动画关键点
- 将动画与组件状态变化明确关联，避免命令式触发
- 为不同状态间的转换定义清晰的动画策略
- 预先创建常用动画并复用，而不是每次状态变化都重新创建
- 考虑使用状态机管理复杂的多状态组件
- 妥善处理过渡期间的用户交互和边缘情况
- 确保动画不会阻塞状态更新，尤其是在重要功能操作中
:::

## 基于数据变化的智能动画

创建能够自动响应数据变化的智能动画系统。

在数据驱动的应用程序中，数据变化通常是界面变化的源头。创建能够智能响应数据变化的动画系统可以大大提升用户体验。

### 数据驱动的过渡效果

#### Vue中的数据监听动画

利用Vue的响应式系统实现数据驱动动画：

```vue
<template>
  <div class="chart-container">
    <div class="bar-chart">
      <div
        v-for="(item, index) in chartData"
        :key="index"
        class="bar"
        :ref="el => { if(el) bars[index] = el }"
      >
        <div class="bar-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: [],
      bars: [],
      ctx: null
    };
  },
  watch: {
    // 监听数据变化
    data: {
      handler(newData) {
        // 更新内部数据
        this.chartData = [...newData];
        // 触发动画更新
        this.$nextTick(() => {
          this.animateChart();
        });
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    // 初始化图表数据
    this.chartData = [...this.data];
    
    // 创建GSAP上下文
    this.ctx = gsap.context(() => {}, this.$el);
    
    // 初始设置 - 所有条形高度为0
    gsap.set(this.bars, { height: 0, opacity: 0 });
    
    // 初始动画
    this.$nextTick(() => {
      this.animateChart(true);
    });
  },
  beforeUnmount() {
    // 清理GSAP上下文
    if (this.ctx) {
      this.ctx.revert();
    }
  },
  methods: {
    animateChart(isInitial = false) {
      if (!this.ctx) return;
      
      // 使用上下文添加动画
      this.ctx.add(() => {
        // 计算最大值以确定比例
        const maxValue = Math.max(...this.chartData.map(item => item.value));
        
        // 为每个条形创建动画
        this.bars.forEach((bar, index) => {
          if (!bar || index >= this.chartData.length) return;
          
          const item = this.chartData[index];
          const height = (item.value / maxValue) * 100;
          
          gsap.to(bar, {
            height: `${height}%`,
            opacity: 1,
            backgroundColor: item.color || '#3498db',
            duration: isInitial ? 1.5 : 0.8,
            delay: isInitial ? index * 0.1 : 0,
            ease: isInitial ? 'elastic.out(0.5, 0.3)' : 'power2.out'
          });
        });
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}
.bar-chart {
  display: flex;
  height: 100%;
  align-items: flex-end;
  gap: 10px;
}
.bar {
  flex: 1;
  background-color: #3498db;
  position: relative;
  min-width: 40px;
  transition: background-color 0.3s;
}
.bar-label {
  position: absolute;
  bottom: -25px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
```

#### React中的数据驱动动画

使用React的useEffect钩子监听数据变化：

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function DataDrivenAnimation({ data, colorScheme = 'blue' }) {
  const [prevData, setPrevData] = useState(null);
  const listRef = useRef(null);
  const itemsRef = useRef({});
  const ctx = useRef(null);
  
  // 创建GSAP上下文
  useEffect(() => {
    // 初始化上下文
    ctx.current = gsap.context(() => {}, listRef);
    
    // 清理函数
    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, []);
  
  // 响应数据变化
  useEffect(() => {
    if (!ctx.current) return;
    
    ctx.current.add(() => {
      // 如果是首次加载，执行初始动画
      if (!prevData) {
        gsap.from(Object.values(itemsRef.current), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5
        });
      } else {
        // 找出新增的项
        const newItems = data.filter(
          item => !prevData.some(p => p.id === item.id)
        );
        
        // 找出移除的项
        const removedItems = prevData.filter(
          item => !data.some(d => d.id === item.id)
        );
        
        // 找出数值变化的项
        const changedItems = data.filter(
          item => {
            const prevItem = prevData.find(p => p.id === item.id);
            return prevItem && prevItem.value !== item.value;
          }
        );
        
        // 为新增项添加动画
        newItems.forEach(item => {
          const el = itemsRef.current[item.id];
          if (el) {
            gsap.from(el, {
              opacity: 0,
              y: 20,
              duration: 0.5
            });
          }
        });
        
        // 为移除项添加动画
        removedItems.forEach(item => {
          const el = itemsRef.current[item.id];
          if (el) {
            gsap.to(el, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              onComplete: () => {
                // 可能需要从DOM中移除元素
              }
            });
          }
        });
        
        // 为数值变化的项添加动画
        changedItems.forEach(item => {
          const el = itemsRef.current[item.id];
          if (el) {
            // 找到数值元素
            const valueEl = el.querySelector('.value');
            if (valueEl) {
              // 保存当前显示的值
              const currentValue = parseFloat(valueEl.textContent);
              const targetValue = item.value;
              
              // 创建补间动画更新数值
              gsap.to({value: currentValue}, {
                value: targetValue,
                duration: 1,
                ease: 'power1.out',
                onUpdate: function() {
                  valueEl.textContent = Math.round(this.targets()[0].value);
                }
              });
              
              // 添加强调动画
              gsap.fromTo(valueEl, 
                {scale: 1, color: 'inherit'},
                {
                  scale: 1.2, 
                  color: item.value > currentValue ? '#4CAF50' : '#F44336',
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1
                }
              );
            }
          }
        });
      }
    });
    
    // 更新前一次数据
    setPrevData([...data]);
  }, [data]);
  
  return (
    <div className="data-list" ref={listRef}>
      {data.map(item => (
        <div
          key={item.id}
          className={`data-item ${colorScheme}`}
          ref={el => itemsRef.current[item.id] = el}
        >
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
```

### 高级数据插值与动画

对于更复杂的数据驱动动画，可以实现高级插值技术：

```javascript
// 数据驱动的路径动画
function createDataDrivenPathAnimation(svgSelector, dataPoints) {
  // 获取SVG路径元素
  const path = document.querySelector(svgSelector);
  if (!path) return null;
  
  // 创建时间线
  const timeline = gsap.timeline();
  
  // 将数据点转换为SVG路径
  const pointsToPath = (points) => {
    if (!points.length) return '';
    
    // 移动到第一个点
    let pathData = `M ${points[0].x} ${points[0].y} `;
    
    // 添加线段到后续点
    for (let i = 1; i < points.length; i++) {
      pathData += `L ${points[i].x} ${points[i].y} `;
    }
    
    return pathData;
  };
  
  // 创建初始空路径
  const initialPath = '';
  const targetPath = pointsToPath(dataPoints);
  
  // 设置初始路径
  gsap.set(path, { attr: { d: initialPath } });
  
  // 创建路径绘制动画
  timeline.to(path, {
    attr: { d: targetPath },
    duration: 2,
    ease: 'power2.inOut'
  });
  
  // 提供方法以更新数据
  const updateData = (newDataPoints) => {
    const newPath = pointsToPath(newDataPoints);
    
    // 为路径创建新的动画
    gsap.to(path, {
      attr: { d: newPath },
      duration: 1.5,
      ease: 'power1.inOut'
    });
  };
  
  return {
    timeline,
    updateData
  };
}

// 数值变化时的流畅过渡
function createSmoothNumberTransition(element, options = {}) {
  const defaults = {
    duration: 1,
    ease: 'power1.out',
    format: value => Math.round(value)
  };
  
  const settings = {...defaults, ...options};
  let currentValue = 0;
  let tween = null;
  
  // 初始化
  const init = (initialValue = 0) => {
    currentValue = initialValue;
    element.textContent = settings.format(currentValue);
  };
  
  // 更新到新值
  const updateTo = (newValue) => {
    // 如果有正在进行的动画，先停止
    if (tween) {
      tween.kill();
    }
    
    // 创建新的补间动画
    tween = gsap.to({value: currentValue}, {
      value: newValue,
      duration: settings.duration,
      ease: settings.ease,
      onUpdate: function() {
        const value = this.targets()[0].value;
        element.textContent = settings.format(value);
      },
      onComplete: function() {
        currentValue = newValue;
        tween = null;
      }
    });
  };
  
  return {
    init,
    updateTo
  };
}
```

### 时间序列数据的动画

对于随时间变化的数据，可以创建专门的时间序列动画：

```vue
<template>
  <div class="time-series-chart" ref="chartContainer">
    <svg width="100%" height="100%" ref="svg">
      <path class="line" ref="path" stroke="#2196F3" fill="none" stroke-width="2" />
      <g class="data-points"></g>
    </svg>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  props: {
    timeSeriesData: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 400
    },
    margin: {
      type: Object,
      default: () => ({ top: 20, right: 20, bottom: 30, left: 40 })
    }
  },
  data() {
    return {
      ctx: null,
      chartWidth: 0,
      chartHeight: 0,
      pathTween: null,
      pointsGroup: null
    };
  },
  computed: {
    // 计算内部绘图区域尺寸
    innerWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    innerHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }
  },
  watch: {
    // 监听数据变化并更新图表
    timeSeriesData(newData) {
      this.updateChart(newData);
    }
  },
  mounted() {
    // 设置SVG尺寸
    const svg = this.$refs.svg;
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    
    // 创建数据点分组
    this.pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.pointsGroup.classList.add('data-points');
    svg.appendChild(this.pointsGroup);
    
    // 创建GSAP上下文
    this.ctx = gsap.context(() => {}, this.$refs.chartContainer);
    
    // 初始化图表
    this.initChart();
    this.updateChart(this.timeSeriesData);
  },
  methods: {
    initChart() {
      // 设置内部绘图区域
      this.chartWidth = this.innerWidth;
      this.chartHeight = this.innerHeight;
      
      // 设置路径元素的变换
      const path = this.$refs.path;
      gsap.set(path, {
        attr: { transform: `translate(${this.margin.left}, ${this.margin.top})` }
      });
      
      // 设置点组的变换
      gsap.set(this.pointsGroup, {
        attr: { transform: `translate(${this.margin.left}, ${this.margin.top})` }
      });
    },
    updateChart(data) {
      if (!this.ctx) return;
      
      this.ctx.add(() => {
        // 计算x和y的比例尺
        const xScale = (i) => (i / (data.length - 1)) * this.chartWidth;
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value), 0);
        const yScale = (value) => this.chartHeight - ((value - minValue) / (maxValue - minValue)) * this.chartHeight;
        
        // 创建路径数据
        let pathData = '';
        data.forEach((d, i) => {
          const x = xScale(i);
          const y = yScale(d.value);
          pathData += (i === 0 ? 'M' : 'L') + `${x},${y}`;
        });
        
        // 动画更新路径
        gsap.to(this.$refs.path, {
          attr: { d: pathData },
          duration: 1,
          ease: 'power2.inOut'
        });
        
        // 清空数据点组
        while (this.pointsGroup.firstChild) {
          this.pointsGroup.removeChild(this.pointsGroup.firstChild);
        }
        
        // 创建并添加数据点
        data.forEach((d, i) => {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          const x = xScale(i);
          const y = yScale(d.value);
          
          gsap.set(circle, {
            attr: {
              cx: x,
              cy: y,
              r: 0,
              fill: '#2196F3'
            }
          });
          
          this.pointsGroup.appendChild(circle);
          
          // 为点创建出现动画
          gsap.to(circle, {
            attr: { r: 4 },
            duration: 0.5,
            delay: 0.8 + i * 0.05,
            ease: 'back.out(1.7)'
          });
        });
      });
    }
  },
  beforeUnmount() {
    // 清理GSAP上下文
    if (this.ctx) {
      this.ctx.revert();
    }
  }
};
</script>
```

::: tip 数据驱动动画关键点
- 使用框架的响应式/状态系统监听数据变化并触发动画
- 对数据变化进行分析，确定添加、移除和更新的元素
- 使用GSAP的数值补间功能实现平滑的数值过渡
- 为不同类型的数据变化（增加/减少）设计不同的视觉反馈
- 使用补间动画直接更新SVG路径或其他复杂属性
- 记录前一状态以便创建连续的过渡效果
:::

## 高阶动画组件开发

学习如何设计和实现可复用的高阶动画组件。

高阶动画组件可以大大提高动画代码的复用性和可维护性，让开发者更容易在应用中添加一致的动画效果。

### 高阶组件模式

#### Vue中的高阶动画组件

使用Vue的混入(mixin)或组合式API创建可复用动画逻辑：

```javascript
// 创建一个动画混入
const AnimationMixin = {
  data() {
    return {
      animationContext: null
    };
  },
  methods: {
    // 创建一个GSAP上下文
    createAnimationContext(rootElement = this.$el) {
      if (this.animationContext) {
        this.animationContext.revert();
      }
      
      this.animationContext = gsap.context(() => {}, rootElement);
      return this.animationContext;
    },
    
    // 添加进入动画
    animateIn(targets, options = {}) {
      if (!this.animationContext) {
        this.createAnimationContext();
      }
      
      const defaults = {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      };
      
      return this.animationContext.add(() => {
        return gsap.from(targets, {...defaults, ...options});
      });
    },
    
    // 添加退出动画
    animateOut(targets, options = {}) {
      if (!this.animationContext) {
        this.createAnimationContext();
      }
      
      const defaults = {
        y: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in'
      };
      
      return this.animationContext.add(() => {
        return gsap.to(targets, {...defaults, ...options});
      });
    },
    
    // 添加强调动画
    animateEmphasis(targets, options = {}) {
      if (!this.animationContext) {
        this.createAnimationContext();
      }
      
      const defaults = {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      };
      
      return this.animationContext.add(() => {
        return gsap.to(targets, {...defaults, ...options});
      });
    }
  },
  beforeUnmount() {
    // 清理动画上下文
    if (this.animationContext) {
      this.animationContext.revert();
      this.animationContext = null;
    }
  }
};

// 在Vue3的组合式API中实现
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

export function useAnimation(rootElementRef) {
  const animationContext = ref(null);
  
  // 在组件挂载后创建上下文
  onMounted(() => {
    animationContext.value = gsap.context(() => {}, rootElementRef.value);
  });
  
  // 在组件卸载前清理上下文
  onBeforeUnmount(() => {
    if (animationContext.value) {
      animationContext.value.revert();
      animationContext.value = null;
    }
  });
  
  // 添加进入动画
  const animateIn = (targets, options = {}) => {
    if (!animationContext.value) return null;
    
    const defaults = {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    };
    
    return animationContext.value.add(() => {
      return gsap.from(targets, {...defaults, ...options});
    });
  };
  
  // 添加退出动画
  const animateOut = (targets, options = {}) => {
    if (!animationContext.value) return null;
    
    const defaults = {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    };
    
    return animationContext.value.add(() => {
      return gsap.to(targets, {...defaults, ...options});
    });
  };
  
  // 添加强调动画
  const animateEmphasis = (targets, options = {}) => {
    if (!animationContext.value) return null;
    
    const defaults = {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    };
    
    return animationContext.value.add(() => {
      return gsap.to(targets, {...defaults, ...options});
    });
  };
  
  return {
    animateIn,
    animateOut,
    animateEmphasis
  };
}
```

#### React中的高阶动画组件

使用React的高阶组件模式和自定义钩子：

```jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// 创建动画高阶组件
function withAnimation(WrappedComponent) {
  return function WithAnimation(props) {
    const rootRef = useRef(null);
    const ctxRef = useRef(null);
    
    // 创建上下文
    useEffect(() => {
      if (rootRef.current) {
        ctxRef.current = gsap.context(() => {}, rootRef.current);
      }
      
      return () => {
        if (ctxRef.current) {
          ctxRef.current.revert();
        }
      };
    }, []);
    
    // 动画工具集
    const animation = {
      animateIn: (targets, options = {}) => {
        if (!ctxRef.current) return null;
        
        const defaults = {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        };
        
        return ctxRef.current.add(() => {
          return gsap.from(targets, {...defaults, ...options});
        });
      },
      
      animateOut: (targets, options = {}) => {
        if (!ctxRef.current) return null;
        
        const defaults = {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in'
        };
        
        return ctxRef.current.add(() => {
          return gsap.to(targets, {...defaults, ...options});
        });
      },
      
      animateEmphasis: (targets, options = {}) => {
        if (!ctxRef.current) return null;
        
        const defaults = {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut'
        };
        
        return ctxRef.current.add(() => {
          return gsap.to(targets, {...defaults, ...options});
        });
      }
    };
    
    return (
      <div ref={rootRef}>
        <WrappedComponent {...props} animation={animation} />
      </div>
    );
  };
}

// React自定义钩子实现
function useAnimation(rootElementRef) {
  const ctxRef = useRef(null);
  
  // 创建上下文
  useEffect(() => {
    if (rootElementRef.current) {
      ctxRef.current = gsap.context(() => {}, rootElementRef.current);
    }
    
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [rootElementRef]);
  
  // 添加进入动画
  const animateIn = (targets, options = {}) => {
    if (!ctxRef.current) return null;
    
    const defaults = {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    };
    
    return ctxRef.current.add(() => {
      return gsap.from(targets, {...defaults, ...options});
    });
  };
  
  // 添加退出动画
  const animateOut = (targets, options = {}) => {
    if (!ctxRef.current) return null;
    
    const defaults = {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    };
    
    return ctxRef.current.add(() => {
      return gsap.to(targets, {...defaults, ...options});
    });
  };
  
  // 添加强调动画
  const animateEmphasis = (targets, options = {}) => {
    if (!ctxRef.current) return null;
    
    const defaults = {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    };
    
    return ctxRef.current.add(() => {
      return gsap.to(targets, {...defaults, ...options});
    });
  };
  
  return {
    animateIn,
    animateOut,
    animateEmphasis
  };
}

// 使用示例
function AnimatedComponent() {
  const containerRef = useRef(null);
  const { animateIn, animateEmphasis } = useAnimation(containerRef);
  
  useEffect(() => {
    // 组件挂载后的进入动画
    const elements = containerRef.current.querySelectorAll('.item');
    animateIn(elements);
  }, []);
  
  // 强调动画处理函数
  const handleEmphasis = (e) => {
    animateEmphasis(e.currentTarget);
  };
  
  return (
    <div ref={containerRef} className="animated-container">
      <div className="item" onClick={handleEmphasis}>Item 1</div>
      <div className="item" onClick={handleEmphasis}>Item 2</div>
      <div className="item" onClick={handleEmphasis}>Item 3</div>
    </div>
  );
}
```

### 动画指令与组件

在Vue中，可以创建自定义指令和可复用组件来简化动画应用：

```javascript
// Vue自定义动画指令
const gsapDirectives = {
  // 添加淡入动画指令
  vFadeIn: {
    mounted(el, binding) {
      // 获取指令参数
      const options = binding.value || {};
      const defaults = {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
      };
      
      // 合并选项
      const animOptions = {...defaults, ...options};
      
      // 设置初始状态
      gsap.set(el, {opacity: 0, y: animOptions.y});
      
      // 创建动画
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: animOptions.duration,
        ease: animOptions.ease,
        delay: animOptions.delay || 0
      });
    }
  },
  
  // 滚动触发动画指令
  vScrollReveal: {
    mounted(el, binding) {
      // 获取指令参数
      const options = binding.value || {};
      const defaults = {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        threshold: 0.2,
        once: true
      };
      
      // 合并选项
      const animOptions = {...defaults, ...options};
      
      // 设置初始状态
      gsap.set(el, {opacity: 0, y: animOptions.y});
      
      // 创建观察者
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 元素进入视口，播放动画
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: animOptions.duration,
              ease: animOptions.ease
            });
            
            // 如果设置了只触发一次，停止观察
            if (animOptions.once) {
              observer.unobserve(el);
            }
          } else if (!animOptions.once) {
            // 如果设置了重复触发，元素离开视口时重置
            gsap.to(el, {
              opacity: 0,
              y: animOptions.y,
              duration: animOptions.duration,
              ease: animOptions.ease
            });
          }
        });
      }, {
        threshold: animOptions.threshold
      });
      
      // 开始观察元素
      observer.observe(el);
      
      // 保存观察者引用以便清理
      el._scrollReveal = observer;
    },
    
    unmounted(el) {
      // 清理观察者
      if (el._scrollReveal) {
        el._scrollReveal.disconnect();
      }
    }
  }
};

// 注册指令
export default {
  install(app) {
    Object.entries(gsapDirectives).forEach(([name, directive]) => {
      app.directive(name, directive);
    });
  }
};

// 使用方法
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import gsapDirectives from './directives/gsap-directives';

const app = createApp(App);
app.use(gsapDirectives);
app.mount('#app');

// 在组件中使用
// <div v-fade-in="{duration: 0.8}">淡入内容</div>
// <div v-scroll-reveal="{y: 50, once: false}">滚动触发内容</div>
```

### 创建可复用的转场动画组件

为页面转场或组件切换创建可复用的动画组件：

```vue
<!-- Vue3动画转场组件 -->
<template>
  <div class="transition-container" ref="container">
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'TransitionWrapper',
  props: {
    type: {
      type: String,
      default: 'fade', // fade, slide, zoom, etc.
      validator: (value) => ['fade', 'slide', 'zoom', 'flip'].includes(value)
    },
    duration: {
      type: Number,
      default: 0.5
    },
    delay: {
      type: Number,
      default: 0
    },
    ease: {
      type: String,
      default: 'power2.out'
    },
    appear: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const container = ref(null);
    let ctx = null;
    
    // 创建GSAP上下文
    onMounted(() => {
      ctx = gsap.context(() => {}, container);
      
      // 如果设置了appear属性，执行进入动画
      if (props.appear) {
        playEnterAnimation();
      }
    });
    
    // 清理上下文
    onBeforeUnmount(() => {
      if (ctx) {
        ctx.revert();
      }
    });
    
    // 根据类型创建动画配置
    const getAnimationProps = (isEnter) => {
      const direction = isEnter ? 1 : -1;
      
      switch (props.type) {
        case 'fade':
          return {
            opacity: isEnter ? 0 : 1,
            y: 20 * direction
          };
        case 'slide':
          return {
            x: 100 * direction,
            opacity: isEnter ? 0 : 1
          };
        case 'zoom':
          return {
            scale: isEnter ? 0.8 : 1,
            opacity: isEnter ? 0 : 1
          };
        case 'flip':
          return {
            rotationY: 90 * direction,
            opacity: isEnter ? 0 : 1,
            transformPerspective: 600
          };
        default:
          return {
            opacity: isEnter ? 0 : 1
          };
      }
    };
    
    // 播放进入动画
    const playEnterAnimation = () => {
      if (!ctx) return;
      
      ctx.add(() => {
        // 设置初始状态
        gsap.set(container.value, getAnimationProps(true));
        
        // 创建动画
        return gsap.to(container.value, {
          ...getAnimationProps(false),
          duration: props.duration,
          delay: props.delay,
          ease: props.ease
        });
      });
    };
    
    // 播放离开动画
    const playLeaveAnimation = () => {
      if (!ctx) return;
      
      return new Promise(resolve => {
        ctx.add(() => {
          return gsap.to(container.value, {
            ...getAnimationProps(true),
            duration: props.duration,
            ease: props.ease,
            onComplete: resolve
          });
        });
      });
    };
    
    return {
      container,
      playEnterAnimation,
      playLeaveAnimation
    };
  }
};
</script>

<!-- 使用方法 -->
<!-- <transition-wrapper type="slide" :duration="0.7">
  <div class="page-content">页面内容</div>
</transition-wrapper> -->
```

::: tip 高阶动画组件关键点
- 使用混入(mixin)、组合式API钩子或高阶组件包装动画逻辑
- 为常用动画效果创建标准化API，保持一致性
- 使用GSAP上下文管理动画资源，避免内存泄漏
- 创建自定义指令简化动画应用，提高开发效率
- 设计可复用的转场组件，实现一致的页面过渡效果
- 提供合理的默认值，同时允许自定义配置以适应不同场景
:::

## 框架特性与GSAP结合点

探索各框架独特特性与GSAP的最佳结合方式。

不同的前端框架拥有各自独特的特性和优势，将这些特性与GSAP结合，可以创建更强大、更高效的动画系统。

### Vue3与GSAP

利用Vue3的响应式系统和组合式API增强GSAP动画。

Vue3提供了全新的组合式API和强大的响应式系统，这些特性与GSAP结合可以创建灵活且高性能的动画。

#### 响应式系统与GSAP

结合Vue3的响应式系统和计算属性创建动态动画：

```vue
<template>
  <div class="animation-container">
    <div
      ref="animatedBox"
      class="box"
      :style="{ backgroundColor: boxColor }"
      @click="toggleAnimation"
    ></div>
    
    <div class="controls">
      <label>
        动画持续时间: 
        <input type="range" min="0.1" max="2" step="0.1" v-model="duration">
        {{ duration }}秒
      </label>
      
      <label>
        动画距离: 
        <input type="range" min="50" max="300" step="10" v-model="distance">
        {{ distance }}px
      </label>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

export default {
  setup() {
    // 响应式状态
    const animatedBox = ref(null);
    const isAnimating = ref(false);
    const duration = ref(1);
    const distance = ref(150);
    const animations = ref({
      forward: null,
      backward: null
    });
    
    // 计算属性 - 根据状态动态改变颜色
    const boxColor = computed(() => 
      isAnimating.value ? '#FF5722' : '#2196F3'
    );
    
    // 创建动画
    const createAnimations = () => {
      // 向前动画
      animations.value.forward = gsap.to(animatedBox.value, {
        x: distance.value,
        rotation: 360,
        duration: duration.value,
        paused: true,
        ease: 'power1.inOut',
        onStart: () => isAnimating.value = true,
        onComplete: () => isAnimating.value = false
      });
      
      // 向后动画
      animations.value.backward = gsap.to(animatedBox.value, {
        x: 0,
        rotation: 0,
        duration: duration.value,
        paused: true,
        ease: 'power1.inOut',
        onStart: () => isAnimating.value = true,
        onComplete: () => isAnimating.value = false
      });
    };
    
    // 监听属性变化，更新动画
    watch([duration, distance], () => {
      // 如果动画已存在，则杀死它们
      if (animations.value.forward) {
        animations.value.forward.kill();
      }
      if (animations.value.backward) {
        animations.value.backward.kill();
      }
      
      // 重新创建动画，应用新参数
      createAnimations();
    });
    
    // 切换动画状态
    const toggleAnimation = () => {
      const currentX = gsap.getProperty(animatedBox.value, 'x') || 0;
      
      if (currentX < distance.value / 2) {
        animations.value.forward.play(0);
      } else {
        animations.value.backward.play(0);
      }
    };
    
    // 组件挂载时创建动画
    onMounted(createAnimations);
    
    // 组件卸载时清理
    onBeforeUnmount(() => {
      if (animations.value.forward) {
        animations.value.forward.kill();
      }
      if (animations.value.backward) {
        animations.value.backward.kill();
      }
    });
    
    return {
      animatedBox,
      boxColor,
      duration,
      distance,
      toggleAnimation
    };
  }
};
</script>

<style scoped>
.animation-container {
  padding: 20px;
}

.box {
  width: 80px;
  height: 80px;
  background-color: #2196F3;
  cursor: pointer;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

#### 组合式API与GSAP钩子

创建可复用的GSAP动画钩子：

```javascript
// useGSAP.js - 自定义组合式API钩子
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// 基础GSAP钩子
export function useGSAP() {
  const ctx = ref(null);
  
  onMounted(() => {
    ctx.value = gsap.context(() => {});
  });
  
  onBeforeUnmount(() => {
    if (ctx.value) {
      ctx.value.revert();
    }
  });
  
  return {
    context: ctx,
    add: (animation) => ctx.value?.add(animation)
  };
}

// 时间线钩子
export function useTimeline(config = {}) {
  const { context } = useGSAP();
  const timeline = ref(null);
  
  onMounted(() => {
    timeline.value = gsap.timeline(config);
    context.value?.add(() => timeline.value);
  });
  
  return {
    timeline,
    add: (target, props, position) => timeline.value?.to(target, props, position)
  };
}

// 滚动触发钩子
export function useScrollTrigger(elementRef, options = {}) {
  const { context } = useGSAP();
  const trigger = ref(null);
  
  onMounted(() => {
    // 确保已导入ScrollTrigger插件
    if (!gsap.plugins?.ScrollTrigger) {
      console.warn('ScrollTrigger plugin is not loaded');
      return;
    }
    
    // 创建滚动触发器
    const defaults = {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    };
    
    const triggerOptions = {...defaults, ...options};
    triggerOptions.trigger = elementRef.value;
    
    trigger.value = gsap.ScrollTrigger.create(triggerOptions);
    
    // 添加到上下文
    context.value?.add(() => trigger.value);
  });
  
  return {
    trigger,
    refresh: () => trigger.value?.refresh(),
    kill: () => trigger.value?.kill()
  };
}

// 动画元素钩子
export function useAnimatedElement(options = {}) {
  const elementRef = ref(null);
  const { context } = useGSAP();
  const animation = ref(null);
  
  // 默认配置
  const defaults = {
    autoPlay: false,
    duration: 0.5,
    initialState: {},
    animateState: {},
    ease: 'power2.out'
  };
  
  const config = {...defaults, ...options};
  
  onMounted(() => {
    if (elementRef.value) {
      // 设置初始状态
      gsap.set(elementRef.value, config.initialState);
      
      // 创建动画
      animation.value = gsap.to(elementRef.value, {
        ...config.animateState,
        duration: config.duration,
        ease: config.ease,
        paused: !config.autoPlay
      });
      
      // 添加到上下文
      context.value?.add(() => animation.value);
    }
  });
  
  const play = (from = null) => {
    if (from !== null) {
      animation.value?.play(from);
    } else {
      animation.value?.play();
    }
  };
  
  const reverse = (from = null) => {
    if (from !== null) {
      animation.value?.reverse(from);
    } else {
      animation.value?.reverse();
    }
  };
  
  return {
    elementRef,
    animation,
    play,
    reverse,
    restart: () => animation.value?.restart(),
    pause: () => animation.value?.pause()
  };
}
```

使用这些钩子的示例：

```vue
<template>
  <div class="scroll-section">
    <div ref="triggerElement" class="scroll-trigger">
      <div ref="animatedElement" class="content-box">
        <h2>滚动触发内容</h2>
        <p>使用自定义GSAP钩子创建的滚动动画</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useScrollTrigger, useAnimatedElement } from './composables/useGSAP';

export default {
  setup() {
    // 创建动画元素
    const { elementRef: animatedElement } = useAnimatedElement({
      initialState: {
        opacity: 0,
        y: 50
      },
      animateState: {
        opacity: 1,
        y: 0
      },
      duration: 0.8
    });
    
    // 创建滚动触发器
    const { trigger } = useScrollTrigger(animatedElement, {
      start: 'top 80%',
      onEnter: () => {
        gsap.to(animatedElement.value, {
          opacity: 1,
          y: 0,
          duration: 0.8
        });
      },
      onLeave: () => {
        gsap.to(animatedElement.value, {
          opacity: 0,
          y: 50,
          duration: 0.5
        });
      },
      onEnterBack: () => {
        gsap.to(animatedElement.value, {
          opacity: 1,
          y: 0,
          duration: 0.8
        });
      },
      onLeaveBack: () => {
        gsap.to(animatedElement.value, {
          opacity: 0,
          y: 50,
          duration: 0.5
        });
      }
    });
    
    return {
      animatedElement,
      triggerElement: animatedElement
    };
  }
};
</script>
```

#### Teleport与动画弹出层

结合Vue3的Teleport功能创建动画弹出层：

```vue
<template>
  <button @click="showModal = true">打开模态框</button>
  
  <teleport to="body">
    <div v-if="showModal" class="modal-backdrop" ref="backdrop" @click="closeModal"></div>
    <div v-if="showModal" class="modal-container" ref="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="closeModal">关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'AnimatedModal',
  props: {
    title: {
      type: String,
      default: '模态框'
    }
  },
  setup(props, { emit }) {
    const showModal = ref(false);
    const modal = ref(null);
    const backdrop = ref(null);
    const ctx = ref(null);
    
    onMounted(() => {
      ctx.value = gsap.context(() => {});
    });
    
    onBeforeUnmount(() => {
      if (ctx.value) {
        ctx.value.revert();
      }
    });
    
    // 关闭模态框
    const closeModal = async () => {
      // 执行退出动画
      await playExitAnimation();
      // 更新状态
      showModal.value = false;
      // 触发关闭事件
      emit('close');
    };
    
    // 进入动画
    const playEnterAnimation = () => {
      if (!ctx.value || !modal.value || !backdrop.value) return;
      
      return ctx.value.add(() => {
        // 设置初始状态
        gsap.set(backdrop.value, { opacity: 0 });
        gsap.set(modal.value, { opacity: 0, y: -50, scale: 0.9 });
        
        // 创建时间线
        const tl = gsap.timeline();
        
        // 添加动画
        tl.to(backdrop.value, {
          opacity: 1,
          duration: 0.2
        }).to(modal.value, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        }, "-=0.1");
        
        return tl;
      });
    };
    
    // 退出动画
    const playExitAnimation = () => {
      if (!ctx.value || !modal.value || !backdrop.value) return Promise.resolve();
      
      return new Promise(resolve => {
        ctx.value.add(() => {
          const tl = gsap.timeline({
            onComplete: resolve
          });
          
          tl.to(modal.value, {
            opacity: 0,
            y: -50,
            scale: 0.9,
            duration: 0.2,
            ease: 'power1.in'
          }).to(backdrop.value, {
            opacity: 0,
            duration: 0.2
          }, "-=0.1");
          
          return tl;
        });
      });
    };
    
    // 监听显示状态变化
    watch(showModal, (newValue) => {
      if (newValue) {
        // 显示模态框时执行进入动画
        nextTick(() => {
          playEnterAnimation();
        });
      }
    });
    
    return {
      showModal,
      modal,
      backdrop,
      closeModal
    };
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  max-width: 90%;
  z-index: 1001;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.modal-content {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.modal-footer {
  padding: 15px 20px;
  text-align: right;
  border-top: 1px solid #eee;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}
</style>
```

### React与GSAP

结合React的hooks和虚拟DOM优化GSAP动画性能。

React的声明式编程模型和虚拟DOM技术与GSAP的命令式动画API相结合，可以创建高性能且易于管理的动画系统。

#### 自定义动画Hooks

创建专用的React Hooks来管理GSAP动画：

```jsx
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// 基础GSAP Hook
export function useGSAP(dependencies = []) {
  const contextRef = useRef(null);
  
  useEffect(() => {
    // 创建上下文
    contextRef.current = gsap.context(() => {});
    
    // 清理函数
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, dependencies);
  
  return contextRef.current;
}

// 动画元素Hook
export function useAnimatedRef(initialProps = {}, animateProps = {}, options = {}) {
  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // 默认选项
  const defaultOptions = {
    duration: 0.5,
    ease: 'power2.out',
    delay: 0,
    autoPlay: false,
    paused: true,
    repeat: 0,
    yoyo: false
  };
  
  const animationOptions = { ...defaultOptions, ...options };
  
  // 创建动画
  useEffect(() => {
    if (!elementRef.current) return;
    
    // 设置初始属性
    gsap.set(elementRef.current, initialProps);
    
    // 创建动画
    animationRef.current = gsap.to(elementRef.current, {
      ...animateProps,
      duration: animationOptions.duration,
      ease: animationOptions.ease,
      delay: animationOptions.delay,
      paused: !animationOptions.autoPlay,
      repeat: animationOptions.repeat,
      yoyo: animationOptions.yoyo,
      onStart: () => {
        setIsAnimating(true);
        if (animationOptions.onStart) {
          animationOptions.onStart();
        }
      },
      onComplete: () => {
        setIsAnimating(false);
        if (animationOptions.onComplete) {
          animationOptions.onComplete();
        }
      }
    });
    
    // 如果设置了自动播放，立即播放
    if (animationOptions.autoPlay) {
      animationRef.current.play();
    }
    
    // 清理
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);
  
  // 控制方法
  const play = useCallback((from = null) => {
    if (animationRef.current) {
      if (from !== null) {
        animationRef.current.play(from);
      } else {
        animationRef.current.play();
      }
    }
  }, []);
  
  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  }, []);
  
  const reverse = useCallback((from = null) => {
    if (animationRef.current) {
      if (from !== null) {
        animationRef.current.reverse(from);
      } else {
        animationRef.current.reverse();
      }
    }
  }, []);
  
  const restart = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.restart();
    }
  }, []);
  
  return {
    elementRef,
    animation: animationRef.current,
    isAnimating,
    play,
    pause,
    reverse,
    restart
  };
}

// 时间线Hook
export function useTimeline(options = {}) {
  const timelineRef = useRef(null);
  const contextRef = useRef(null);
  
  useEffect(() => {
    // 创建上下文
    contextRef.current = gsap.context(() => {
      // 创建时间线
      timelineRef.current = gsap.timeline(options);
    });
    
    // 清理函数
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, []);
  
  // 添加动画到时间线
  const add = useCallback((target, props, position) => {
    if (timelineRef.current) {
      return timelineRef.current.to(target, props, position);
    }
    return null;
  }, []);
  
  // 添加标签
  const addLabel = useCallback((label, position) => {
    if (timelineRef.current) {
      return timelineRef.current.addLabel(label, position);
    }
    return null;
  }, []);
  
  // 控制方法
  const play = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  }, []);
  
  const pause = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  }, []);
  
  const seek = useCallback((position) => {
    if (timelineRef.current) {
      timelineRef.current.seek(position);
    }
  }, []);
  
  return {
    timeline: timelineRef.current,
    add,
    addLabel,
    play,
    pause,
    seek
  };
}
```

#### 配合React.memo优化性能

利用React.memo和useCallback减少不必要的重渲染：

```jsx
import React, { useState, useCallback, memo } from 'react';
import { useAnimatedRef } from './hooks/useGSAP';

// 使用memo优化动画组件
const AnimatedButton = memo(({ label, onClick }) => {
  const { elementRef, play, reverse } = useAnimatedRef(
    { scale: 1 },
    { scale: 1.1, backgroundColor: '#FF5722' },
    { duration: 0.2, ease: 'power1.out' }
  );
  
  // 使用useCallback包装事件处理函数
  const handleMouseEnter = useCallback(() => {
    play();
  }, [play]);
  
  const handleMouseLeave = useCallback(() => {
    reverse();
  }, [reverse]);
  
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  
  return (
    <button
      ref={elementRef}
      className="animated-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {label}
    </button>
  );
});

// 使用组件
function ButtonGroup() {
  const [count, setCount] = useState(0);
  
  const incrementCount = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div className="button-group">
      <h2>点击次数: {count}</h2>
      <AnimatedButton label="增加" onClick={incrementCount} />
      <AnimatedButton label="重置" onClick={() => setCount(0)} />
    </div>
  );
}
```

#### useMemo优化复杂动画配置

使用useMemo缓存复杂的动画配置：

```jsx
import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';

function ComplexAnimationComponent({ animationType, complexity, duration }) {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const ctx = useRef(null);
  
  // 缓存复杂的动画配置
  const animationConfig = useMemo(() => {
    // 基于属性计算动画配置
    const config = {
      duration,
      stagger: complexity > 5 ? 0.05 : 0.1,
      ease: animationType === 'bounce' ? 'bounce.out' : 'power2.out',
      // 复杂的配置计算
      transformOrigin: animationType === 'flip' ? '50% 50%' : '0% 0%'
    };
    
    // 基于类型添加特定属性
    switch (animationType) {
      case 'fade':
        config.opacity = 0;
        config.y = 30;
        break;
      case 'scale':
        config.scale = 0;
        config.opacity = 0;
        break;
      case 'flip':
        config.rotationY = 90;
        config.opacity = 0;
        break;
      case 'bounce':
        config.y = -50;
        config.stagger = 0.08;
        break;
      default:
        config.opacity = 0;
    }
    
    return config;
  }, [animationType, complexity, duration]);
  
  // 初始化动画
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 创建上下文
    ctx.current = gsap.context(() => {}, containerRef);
    
    // 返回清理函数
    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, []);
  
  // 响应配置变化
  useEffect(() => {
    if (!ctx.current || elementsRef.current.length === 0) return;
    
    // 添加动画到上下文
    ctx.current.add(() => {
      gsap.fromTo(
        elementsRef.current,
        { opacity: 1, y: 0, scale: 1, rotationY: 0 },
        {
          ...animationConfig,
          onComplete: () => console.log('Animation complete')
        }
      );
    });
  }, [animationConfig]);
  
  // 创建元素数组
  const elements = useMemo(() => {
    return Array.from({ length: complexity }, (_, i) => (
      <div
        key={i}
        className="animated-element"
        ref={el => el && (elementsRef.current[i] = el)}
      >
        元素 {i + 1}
      </div>
    ));
  }, [complexity]);
  
  return (
    <div className="complex-animation" ref={containerRef}>
      {elements}
    </div>
  );
}
```

#### 结合React Context管理全局动画状态

创建动画上下文来管理应用级动画状态：

```jsx
import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// 创建上下文
const AnimationContext = createContext(null);

// 提供者组件
export function AnimationProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const globalContextRef = useRef(null);
  const animationsRef = useRef(new Map());
  
  // 初始化
  useEffect(() => {
    globalContextRef.current = gsap.context(() => {});
    setIsReady(true);
    
    return () => {
      // 清理所有动画
      if (globalContextRef.current) {
        globalContextRef.current.revert();
      }
      
      animationsRef.current.clear();
    };
  }, []);
  
  // 注册动画
  const registerAnimation = (id, animation) => {
    animationsRef.current.set(id, animation);
  };
  
  // 取消注册
  const unregisterAnimation = (id) => {
    animationsRef.current.delete(id);
  };
  
  // 播放特定动画
  const playAnimation = (id, options) => {
    const animation = animationsRef.current.get(id);
    if (animation) {
      if (options?.from !== undefined) {
        animation.play(options.from);
      } else {
        animation.play();
      }
    }
  };
  
  // 暂停特定动画
  const pauseAnimation = (id) => {
    const animation = animationsRef.current.get(id);
    if (animation) {
      animation.pause();
    }
  };
  
  // 播放所有动画
  const playAllAnimations = () => {
    animationsRef.current.forEach(animation => {
      animation.play();
    });
  };
  
  // 暂停所有动画
  const pauseAllAnimations = () => {
    animationsRef.current.forEach(animation => {
      animation.pause();
    });
  };
  
  // 创建上下文值
  const contextValue = {
    isReady,
    globalContext: globalContextRef.current,
    registerAnimation,
    unregisterAnimation,
    playAnimation,
    pauseAnimation,
    playAllAnimations,
    pauseAllAnimations
  };
  
  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

// 使用动画上下文的钩子
export function useAnimation() {
  const context = useContext(AnimationContext);
  
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  
  return context;
}

// 创建一个带有全局注册的动画元素钩子
export function useGlobalAnimatedRef(id, initialProps = {}, animateProps = {}, options = {}) {
  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const { isReady, registerAnimation, unregisterAnimation } = useAnimation();
  
  useEffect(() => {
    if (!isReady || !elementRef.current) return;
    
    // 设置初始属性
    gsap.set(elementRef.current, initialProps);
    
    // 创建动画
    animationRef.current = gsap.to(elementRef.current, {
      ...animateProps,
      ...options,
      paused: true
    });
    
    // 注册到全局上下文
    registerAnimation(id, animationRef.current);
    
    // 清理函数
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      unregisterAnimation(id);
    };
  }, [id, isReady]);
  
  return {
    elementRef,
    animation: animationRef.current
  };
}

// 使用示例
function AnimatedApp() {
  return (
    <AnimationProvider>
      <Header />
      <MainContent />
      <Footer />
      <AnimationControls />
    </AnimationProvider>
  );
}

function Header() {
  const { elementRef } = useGlobalAnimatedRef(
    'header',
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1 },
    { duration: 0.8 }
  );
  
  return <header ref={elementRef}>页面头部</header>;
}

function AnimationControls() {
  const { playAllAnimations, pauseAllAnimations } = useAnimation();
  
  return (
    <div className="animation-controls">
      <button onClick={playAllAnimations}>播放所有动画</button>
      <button onClick={pauseAllAnimations}>暂停所有动画</button>
    </div>
  );
}
```

::: tip 框架集成关键点
- Vue3中利用响应式系统和组合式API创建灵活的动画组件
- React中使用useMemo和useCallback优化动画性能
- 创建专用钩子封装GSAP功能，与框架API无缝集成
- 利用框架的上下文/Context机制管理全局动画状态
- 结合框架的生命周期/副作用系统管理动画资源
- 利用框架特有功能(如Teleport/Portals)增强动画能力
:::

## 服务端渲染环境下的动画处理

解决在服务端渲染(SSR)环境中使用GSAP的常见问题。

服务端渲染是现代Web应用的常见架构，但由于GSAP是一个操作DOM的客户端库，在SSR环境中使用时需要特别注意。

### 服务端渲染的核心挑战

服务端渲染环境下使用GSAP面临几个主要挑战：

1. **Window对象不可用**：服务端没有浏览器环境，所以`window`、`document`等对象不存在
2. **DOM操作无效**：服务端无法执行DOM操作，而GSAP主要是通过DOM操作实现动画
3. **插件加载问题**：某些GSAP插件可能会尝试访问浏览器特有API
4. **hydration不匹配**：如果动画改变了初始DOM状态，可能导致客户端hydration不匹配

### Next.js中的GSAP集成

在Next.js等服务端渲染框架中安全使用GSAP：

```jsx
// components/AnimatedComponent.js
import { useEffect, useRef, useState } from 'react';

export default function AnimatedComponent() {
  const boxRef = useRef(null);
  // 使用状态跟踪客户端渲染
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // 标记为客户端渲染
    setIsClient(true);
    
    // 动态导入GSAP
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      
      // 安全地使用GSAP
      gsap.to(boxRef.current, {
        x: 100,
        duration: 1,
        ease: 'power2.out'
      });
    };
    
    initAnimation();
  }, []);
  
  // 在服务端渲染时渲染静态内容
  return (
    <div className="container">
      <div 
        ref={boxRef} 
        className="box"
        // 可以添加内联样式确保服务端渲染和客户端hydration匹配
        style={{ transform: isClient ? undefined : 'translateX(0px)' }}
      >
        动画盒子
      </div>
    </div>
  );
}
```

### Nuxt.js中的GSAP集成

在Nuxt.js中安全地使用GSAP：

```vue
<template>
  <div class="animation-container">
    <div ref="animatedElement" class="animated-element">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '服务端渲染动画元素',
      gsapLoaded: false
    };
  },
  // 使用客户端专用钩子
  mounted() {
    // 确保在客户端执行
    this.initGSAP();
  },
  methods: {
    async initGSAP() {
      // 仅在客户端动态导入
      if (process.client) {
        try {
          const { gsap } = await import('gsap');
          this.gsapLoaded = true;
          
          // 初始化动画
          gsap.from(this.$refs.animatedElement, {
            opacity: 0,
            y: 30,
            duration: 1
          });
        } catch (err) {
          console.error('Failed to load GSAP:', err);
        }
      }
    }
  }
};
</script>

<!-- 在Nuxt 3中的写法 -->
<script setup>
import { ref, onMounted } from 'vue';

const animatedElement = ref(null);
const text = ref('服务端渲染动画元素');

// 仅在客户端执行
onMounted(async () => {
  // 动态导入GSAP
  const { gsap } = await import('gsap');
  
  // 安全地使用GSAP
  gsap.from(animatedElement.value, {
    opacity: 0,
    y: 30,
    duration: 1
  });
});
</script>
```

### 服务端与客户端状态同步

确保服务端渲染内容与客户端动画状态一致：

```jsx
// React中同步服务端与客户端状态
import { useEffect, useRef, useState } from 'react';

export default function SynchronizedAnimation() {
  const elementRef = useRef(null);
  // 初始化与服务端渲染匹配的状态
  const [opacity, setOpacity] = useState(0);
  const [yPosition, setYPosition] = useState(30);
  
  useEffect(() => {
    // 仅在客户端执行
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      
      // 创建动画
      gsap.to(elementRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        // 使用onUpdate同步状态
        onUpdate: function() {
          setOpacity(this.targets()[0].style.opacity);
          // 从transform样式中提取y值
          const transform = this.targets()[0].style.transform;
          const yMatch = transform.match(/translateY\(([^)]+)\)/);
          if (yMatch && yMatch[1]) {
            setYPosition(parseFloat(yMatch[1]));
          }
        }
      });
    };
    
    initAnimation();
  }, []);
  
  // 使用状态值确保服务端和客户端渲染匹配
  return (
    <div 
      ref={elementRef}
      className="animated-element"
      style={{
        opacity: opacity,
        transform: `translateY(${yPosition}px)`
      }}
    >
      服务端渲染与客户端动画同步
    </div>
  );
}
```

### 插件安全加载

在SSR环境中安全加载GSAP插件：

```javascript
// utils/animation.js
// GSAP及插件的安全加载器

// 初始化GSAP实例
let gsapInstance = null;
let ScrollTriggerInstance = null;

// 安全加载GSAP及插件
export async function loadGSAP() {
  // 防止重复加载
  if (gsapInstance) {
    return {
      gsap: gsapInstance,
      ScrollTrigger: ScrollTriggerInstance
    };
  }
  
  // 检查是否在客户端环境
  if (typeof window !== 'undefined') {
    try {
      // 动态导入GSAP
      const gsapModule = await import('gsap');
      gsapInstance = gsapModule.gsap;
      
      // 尝试加载ScrollTrigger插件
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsapInstance.registerPlugin(ScrollTrigger);
        ScrollTriggerInstance = ScrollTrigger;
      } catch (pluginError) {
        console.warn('Failed to load ScrollTrigger plugin:', pluginError);
      }
      
      return {
        gsap: gsapInstance,
        ScrollTrigger: ScrollTriggerInstance
      };
    } catch (error) {
      console.error('Failed to load GSAP:', error);
      return { gsap: null, ScrollTrigger: null };
    }
  }
  
  // 服务端环境返回空对象
  return { gsap: null, ScrollTrigger: null };
}

// 检查环境是否支持动画
export function canAnimate() {
  return typeof window !== 'undefined' && 
         !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

在组件中使用：

```jsx
// SSR兼容的动画组件
import { useEffect, useRef } from 'react';
import { loadGSAP, canAnimate } from '../utils/animation';

export default function SSRCompatibleAnimation() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // 检查是否可以执行动画
    if (!canAnimate()) return;
    
    let ctx = null;
    
    const initAnimation = async () => {
      // 安全加载GSAP及插件
      const { gsap, ScrollTrigger } = await loadGSAP();
      
      // 如果加载失败或不在客户端，则退出
      if (!gsap) return;
      
      // 创建上下文
      ctx = gsap.context(() => {
        // 基础动画
        gsap.from('.animated-item', {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.8
        });
        
        // 如果ScrollTrigger可用，创建滚动动画
        if (ScrollTrigger) {
          gsap.from('.scroll-item', {
            opacity: 0,
            y: 100,
            scrollTrigger: {
              trigger: '.scroll-container',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          });
        }
      }, containerRef);
    };
    
    initAnimation();
    
    // 清理函数
    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="ssr-animation-container">
      <div className="animated-section">
        <div className="animated-item">项目 1</div>
        <div className="animated-item">项目 2</div>
        <div className="animated-item">项目 3</div>
      </div>
      
      <div className="scroll-container">
        <div className="scroll-item">滚动项目 1</div>
        <div className="scroll-item">滚动项目 2</div>
        <div className="scroll-item">滚动项目 3</div>
      </div>
    </div>
  );
}
```

### 处理SSR Hydration不匹配

解决服务端渲染和客户端hydration不匹配的问题：

```jsx
// 避免hydration不匹配的动画组件
import { useEffect, useRef, useState } from 'react';

export default function HydrationSafeAnimation() {
  const containerRef = useRef(null);
  // 标记客户端hydration是否完成
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // 标记组件已在客户端挂载
    setIsMounted(true);
    
    // 动态导入GSAP
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      
      // 创建动画
      gsap.from('.animated-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8
      });
    };
    
    initAnimation();
  }, []);
  
  return (
    <div ref={containerRef} className="hydration-safe-container">
      {/* 使用客户端状态条件渲染动画内容 */}
      {isMounted ? (
        // 客户端渲染的动画内容
        <div className="animated-content">
          <div className="animated-item">动画项目 1</div>
          <div className="animated-item">动画项目 2</div>
          <div className="animated-item">动画项目 3</div>
        </div>
      ) : (
        // 服务端渲染的静态内容
        <div className="static-content">
          <div>静态项目 1</div>
          <div>静态项目 2</div>
          <div>静态项目 3</div>
        </div>
      )}
    </div>
  );
}
```

### 使用useIsomorphicLayoutEffect

创建同构的useLayoutEffect钩子，在服务端和客户端均可安全使用：

```javascript
// hooks/useIsomorphicLayoutEffect.js
import { useLayoutEffect, useEffect } from 'react';

// 根据环境选择合适的effect钩子
const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
```

在动画组件中使用：

```jsx
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

export default function IsomorphicAnimationComponent() {
  const elementRef = useRef(null);
  
  // 在服务端渲染时不会抛出警告，在客户端会正常执行布局效果
  useIsomorphicLayoutEffect(() => {
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      
      // 初始样式设置
      gsap.set(elementRef.current, { opacity: 0, y: 50 });
      
      // 动画
      gsap.to(elementRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
    };
    
    if (typeof window !== 'undefined') {
      initAnimation();
    }
  }, []);
  
  return (
    <div className="isomorphic-container">
      <div ref={elementRef} className="animated-element">
        同构动画内容
      </div>
    </div>
  );
}
```

::: tip SSR环境下的GSAP使用关键点
- 始终使用动态导入GSAP，避免服务端渲染时执行
- 使用状态标记客户端渲染，避免hydration不匹配
- 为动画初始状态提供与服务端渲染一致的值
- 创建专用的GSAP安全加载工具和检查机制
- 对于复杂动画，考虑在hydration完成后再执行
- 利用框架提供的客户端专用钩子(onMounted, useEffect等)
- 注意动画对SEO和核心Web指标的影响
:::

## 实际大型项目中的动画架构案例

学习如何在大型复杂项目中构建可扩展的动画架构。

大型项目中的动画管理需要良好的架构设计，以确保代码的可维护性、性能和一致性。本节将介绍一个实际的动画架构案例。

### 分层动画架构

设计分层的动画架构，实现关注点分离：

```
动画架构
├── 核心层 (Core)
│   ├── 动画引擎封装
│   ├── 通用工具函数
│   └── 性能监控与优化
├── 服务层 (Services)
│   ├── 动画预设管理
│   ├── 主题与配置
│   └── 响应式适配
├── 组件层 (Components)
│   ├── 动画基础组件
│   ├── 复合动画组件
│   └── 页面级动画
└── 应用层 (Application)
    ├── 路由过渡
    ├── 全局状态动画
    └── 用户交互反馈
```

### 核心层实现

封装GSAP，提供统一的动画接口：

```typescript
// src/animation/core/engine.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// 注册插件
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

// 动画引擎单例
class AnimationEngine {
  private static instance: AnimationEngine;
  private _contexts: Map<string, gsap.Context> = new Map();
  private _defaultEase: string = 'power2.out';
  private _defaultDuration: number = 0.5;
  private _enableLogging: boolean = false;
  
  private constructor() {
    // 私有构造函数，防止直接实例化
  }
  
  // 获取单例实例
  public static getInstance(): AnimationEngine {
    if (!AnimationEngine.instance) {
      AnimationEngine.instance = new AnimationEngine();
    }
    return AnimationEngine.instance;
  }
  
  // 创建动画上下文
  public createContext(scopeName: string, scope?: Element | null): gsap.Context {
    // 如果已存在同名上下文，先清理
    if (this._contexts.has(scopeName)) {
      this.removeContext(scopeName);
    }
    
    // 创建新上下文
    const ctx = gsap.context(() => {}, scope);
    this._contexts.set(scopeName, ctx);
    
    if (this._enableLogging) {
      console.log(`[AnimationEngine] Context created: ${scopeName}`);
    }
    
    return ctx;
  }
  
  // 获取上下文
  public getContext(scopeName: string): gsap.Context | undefined {
    return this._contexts.get(scopeName);
  }
  
  // 移除上下文
  public removeContext(scopeName: string): boolean {
    const ctx = this._contexts.get(scopeName);
    if (ctx) {
      ctx.revert();
      this._contexts.delete(scopeName);
      
      if (this._enableLogging) {
        console.log(`[AnimationEngine] Context removed: ${scopeName}`);
      }
      
      return true;
    }
    return false;
  }
  
  // 创建标准动画
  public createAnimation(
    targets: gsap.TweenTarget, 
    props: gsap.TweenVars,
    contextName?: string
  ): gsap.core.Tween {
    // 合并默认属性
    const mergedProps = {
      ease: this._defaultEase,
      duration: this._defaultDuration,
      ...props
    };
    
    if (contextName && this._contexts.has(contextName)) {
      // 在指定上下文中创建
      const ctx = this._contexts.get(contextName)!;
      return ctx.add(() => gsap.to(targets, mergedProps));
    } else {
      // 直接创建
      return gsap.to(targets, mergedProps);
    }
  }
  
  // 创建时间线
  public createTimeline(
    config: gsap.TimelineVars = {},
    contextName?: string
  ): gsap.core.Timeline {
    if (contextName && this._contexts.has(contextName)) {
      // 在指定上下文中创建
      const ctx = this._contexts.get(contextName)!;
      return ctx.add(() => gsap.timeline(config));
    } else {
      // 直接创建
      return gsap.timeline(config);
    }
  }
  
  // 设置配置
  public setConfig(config: {
    defaultEase?: string;
    defaultDuration?: number;
    enableLogging?: boolean;
  }): void {
    if (config.defaultEase) this._defaultEase = config.defaultEase;
    if (config.defaultDuration) this._defaultDuration = config.defaultDuration;
    if (config.enableLogging !== undefined) this._enableLogging = config.enableLogging;
  }
  
  // 清理所有上下文
  public clearAll(): void {
    this._contexts.forEach((ctx, name) => {
      ctx.revert();
      if (this._enableLogging) {
        console.log(`[AnimationEngine] Context cleared: ${name}`);
      }
    });
    this._contexts.clear();
  }
  
  // 获取GSAP原始实例
  public get gsap(): typeof gsap {
    return gsap;
  }
  
  // 获取ScrollTrigger插件
  public get ScrollTrigger(): typeof ScrollTrigger {
    return ScrollTrigger;
  }
}

// 导出单例
export const animationEngine = AnimationEngine.getInstance();
```

### 服务层实现

创建动画预设和配置管理：

```typescript
// src/animation/services/presets.ts
import { animationEngine } from '../core/engine';

// 动画预设类型
export interface AnimationPreset {
  name: string;
  props: Record<string, any>;
  duration?: number;
  ease?: string;
}

// 动画方向
export type AnimationDirection = 'in' | 'out' | 'emphasis';

// 预设管理服务
class AnimationPresetService {
  private _presets: Map<string, AnimationPreset> = new Map();
  
  // 注册预设
  public register(preset: AnimationPreset): void {
    this._presets.set(preset.name, preset);
  }
  
  // 批量注册预设
  public registerBatch(presets: AnimationPreset[]): void {
    presets.forEach(preset => this.register(preset));
  }
  
  // 获取预设
  public get(name: string): AnimationPreset | undefined {
    return this._presets.get(name);
  }
  
  // 应用预设动画
  public apply(
    name: string,
    targets: gsap.TweenTarget,
    additionalProps: gsap.TweenVars = {},
    contextName?: string
  ): gsap.core.Tween | null {
    const preset = this._presets.get(name);
    if (!preset) {
      console.warn(`[AnimationPresetService] Preset not found: ${name}`);
      return null;
    }
    
    // 合并预设属性和附加属性
    const mergedProps = {
      ...preset.props,
      duration: preset.duration,
      ease: preset.ease,
      ...additionalProps
    };
    
    // 创建动画
    return animationEngine.createAnimation(targets, mergedProps, contextName);
  }
  
  // 获取所有预设名称
  public getAllPresetNames(): string[] {
    return Array.from(this._presets.keys());
  }
}

// 导出单例
export const animationPresets = new AnimationPresetService();

// 注册基础预设
animationPresets.registerBatch([
  // 进入动画
  {
    name: 'fadeIn',
    props: { opacity: 0, y: 20 },
    duration: 0.5,
    ease: 'power2.out'
  },
  {
    name: 'slideInRight',
    props: { opacity: 0, x: 50 },
    duration: 0.6,
    ease: 'power1.out'
  },
  {
    name: 'zoomIn',
    props: { opacity: 0, scale: 0.8 },
    duration: 0.5,
    ease: 'back.out(1.7)'
  },
  
  // 退出动画
  {
    name: 'fadeOut',
    props: { opacity: 0, y: -20 },
    duration: 0.4,
    ease: 'power2.in'
  },
  {
    name: 'slideOutRight',
    props: { opacity: 0, x: 50 },
    duration: 0.5,
    ease: 'power1.in'
  },
  
  // 强调动画
  {
    name: 'pulse',
    props: { scale: 1.05 },
    duration: 0.2,
    ease: 'power1.inOut'
  },
  {
    name: 'shake',
    props: { x: 10, repeat: 3, yoyo: true },
    duration: 0.1,
    ease: 'power1.inOut'
  }
]);
```

### 响应式适配服务

```typescript
// src/animation/services/responsive.ts
import { animationEngine } from '../core/engine';

// 断点定义
export enum Breakpoint {
  XS = 'xs',  // < 576px
  SM = 'sm',  // >= 576px
  MD = 'md',  // >= 768px
  LG = 'lg',  // >= 992px
  XL = 'xl',  // >= 1200px
  XXL = 'xxl' // >= 1400px
}

// 断点值映射
const breakpointValues: Record<Breakpoint, number> = {
  [Breakpoint.XS]: 0,
  [Breakpoint.SM]: 576,
  [Breakpoint.MD]: 768,
  [Breakpoint.LG]: 992,
  [Breakpoint.XL]: 1200,
  [Breakpoint.XXL]: 1400
};

// 响应式动画配置
export interface ResponsiveAnimationConfig {
  // 默认配置
  default: gsap.TweenVars;
  // 断点特定配置
  [Breakpoint.XS]?: Partial<gsap.TweenVars>;
  [Breakpoint.SM]?: Partial<gsap.TweenVars>;
  [Breakpoint.MD]?: Partial<gsap.TweenVars>;
  [Breakpoint.LG]?: Partial<gsap.TweenVars>;
  [Breakpoint.XL]?: Partial<gsap.TweenVars>;
  [Breakpoint.XXL]?: Partial<gsap.TweenVars>;
}

// 响应式动画服务
class ResponsiveAnimationService {
  private _currentBreakpoint: Breakpoint = Breakpoint.LG;
  private _resizeObserver: ResizeObserver | null = null;
  private _listeners: Set<() => void> = new Set();
  
  constructor() {
    this._initBreakpoint();
    this._initResizeObserver();
    
    // 监听窗口大小变化
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this._handleResize);
    }
  }
  
  // 初始化当前断点
  private _initBreakpoint(): void {
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    this._currentBreakpoint = this._getBreakpointFromWidth(width);
  }
  
  // 初始化ResizeObserver
  private _initResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined' || typeof window === 'undefined') return;
    
    this._resizeObserver = new ResizeObserver(entries => {
      // 通知ScrollTrigger更新
      animationEngine.ScrollTrigger.refresh();
    });
  }
  
  // 根据宽度获取断点
  private _getBreakpointFromWidth(width: number): Breakpoint {
    if (width >= breakpointValues[Breakpoint.XXL]) return Breakpoint.XXL;
    if (width >= breakpointValues[Breakpoint.XL]) return Breakpoint.XL;
    if (width >= breakpointValues[Breakpoint.LG]) return Breakpoint.LG;
    if (width >= breakpointValues[Breakpoint.MD]) return Breakpoint.MD;
    if (width >= breakpointValues[Breakpoint.SM]) return Breakpoint.SM;
    return Breakpoint.XS;
  }
  
  // 处理窗口大小变化
  private _handleResize = (): void => {
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    const newBreakpoint = this._getBreakpointFromWidth(width);
    
    if (newBreakpoint !== this._currentBreakpoint) {
      this._currentBreakpoint = newBreakpoint;
      // 通知所有监听器
      this._notifyListeners();
    }
  };
  
  // 通知断点变化监听器
  private _notifyListeners(): void {
    this._listeners.forEach(listener => listener());
  }
  
  // 获取当前断点
  public get currentBreakpoint(): Breakpoint {
    return this._currentBreakpoint;
  }
  
  // 观察元素大小变化
  public observeElement(element: Element): void {
    if (this._resizeObserver) {
      this._resizeObserver.observe(element);
    }
  }
  
  // 停止观察元素
  public unobserveElement(element: Element): void {
    if (this._resizeObserver) {
      this._resizeObserver.unobserve(element);
    }
  }
  
  // 添加断点变化监听器
  public addBreakpointListener(listener: () => void): () => void {
    this._listeners.add(listener);
    
    // 返回移除监听器的函数
    return () => {
      this._listeners.delete(listener);
    };
  }
  
  // 获取响应式配置
  public getResponsiveConfig(config: ResponsiveAnimationConfig): gsap.TweenVars {
    const { default: defaultConfig, ...breakpointConfigs } = config;
    
    // 合并默认配置和当前断点配置
    return {
      ...defaultConfig,
      ...(breakpointConfigs[this._currentBreakpoint] || {})
    };
  }
  
  // 创建响应式动画
  public createResponsiveAnimation(
    targets: gsap.TweenTarget,
    config: ResponsiveAnimationConfig,
    contextName?: string
  ): gsap.core.Tween {
    // 获取合并后的配置
    const mergedConfig = this.getResponsiveConfig(config);
    
    // 创建动画
    return animationEngine.createAnimation(targets, mergedConfig, contextName);
  }
  
  // 清理
  public dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._handleResize);
    }
    
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    
    this._listeners.clear();
  }
}

// 导出单例
export const responsiveAnimation = new ResponsiveAnimationService();
```

### 组件层封装

创建基础动画组件，以React为例：

```tsx
// src/animation/components/AnimatedElement.tsx
import React, { useRef, useEffect, useState } from 'react';
import { animationEngine } from '../core/engine';
import { animationPresets, AnimationDirection } from '../services/presets';
import { responsiveAnimation, ResponsiveAnimationConfig } from '../services/responsive';

interface AnimatedElementProps {
  // 子元素
  children: React.ReactNode;
  // 预设名称或自定义配置
  preset?: string;
  // 动画方向（进入/退出/强调）
  direction?: AnimationDirection;
  // 自定义配置（优先级高于预设）
  config?: gsap.TweenVars | ResponsiveAnimationConfig;
  // 是否响应式
  responsive?: boolean;
  // 是否自动播放
  autoPlay?: boolean;
  // 是否在视口中触发
  triggerOnView?: boolean;
  // 触发偏移量
  triggerOffset?: string;
  // 自定义类名
  className?: string;
  // 延迟
  delay?: number;
  // 动画完成回调
  onComplete?: () => void;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  preset,
  direction = 'in',
  config,
  responsive = false,
  autoPlay = true,
  triggerOnView = false,
  triggerOffset = '0px',
  className = '',
  delay = 0,
  onComplete
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  
  // 清理动画
  const cleanupAnimation = () => {
    if (animation.current) {
      animation.current.kill();
      animation.current = null;
    }
  };
  
  // 创建动画
  const createAnimation = () => {
    if (!elementRef.current) return;
    
    cleanupAnimation();
    
    // 构建动画配置
    let animConfig: gsap.TweenVars;
    
    if (preset) {
      // 使用预设
      const presetName = direction === 'in' 
        ? preset 
        : direction === 'out'
          ? `${preset.replace(/In$/, '')}Out`
          : preset;
      
      const presetAnimation = animationPresets.apply(
        presetName,
        elementRef.current,
        { delay, onComplete: handleAnimationComplete }
      );
      
      if (presetAnimation) {
        animation.current = presetAnimation;
        return;
      }
    }
    
    // 使用自定义配置
    if (config) {
      if (responsive && 'default' in config) {
        // 响应式配置
        animation.current = responsiveAnimation.createResponsiveAnimation(
          elementRef.current,
          config as ResponsiveAnimationConfig
        );
      } else {
        // 标准配置
        const mergedConfig = {
          ...config as gsap.TweenVars,
          delay,
          onComplete: handleAnimationComplete
        };
        
        animation.current = animationEngine.createAnimation(
          elementRef.current,
          mergedConfig
        );
      }
    }
  };
  
  // 动画完成处理
  const handleAnimationComplete = () => {
    setIsAnimated(true);
    if (onComplete) {
      onComplete();
    }
  };
  
  // 播放动画
  const playAnimation = () => {
    if (animation.current) {
      animation.current.play(0);
    }
  };
  
  // 设置初始状态
  useEffect(() => {
    if (!elementRef.current) return;
    
    // 创建动画
    createAnimation();
    
    // 如果不是视口触发，且自动播放，则立即播放
    if (!triggerOnView && autoPlay && animation.current) {
      animation.current.play();
    }
    
    // 如果需要视口触发，设置观察器
    if (triggerOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        {
          rootMargin: triggerOffset,
          threshold: 0.1
        }
      );
      
      observer.observe(elementRef.current);
      
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
    
    return cleanupAnimation;
  }, [preset, direction, JSON.stringify(config), responsive]);
  
  // 响应视口变化
  useEffect(() => {
    if (triggerOnView && isInView && !isAnimated && animation.current) {
      playAnimation();
    }
  }, [isInView, isAnimated, triggerOnView]);
  
  // 监听断点变化
  useEffect(() => {
    if (!responsive) return;
    
    // 添加断点变化监听器
    const removeListener = responsiveAnimation.addBreakpointListener(() => {
      // 重新创建动画以应用新断点配置
      createAnimation();
      
      // 如果已经在视口中或不需要视口触发，重新播放
      if ((isInView || !triggerOnView) && autoPlay) {
        playAnimation();
      }
    });
    
    return removeListener;
  }, [responsive, isInView, triggerOnView, autoPlay]);
  
  return (
    <div ref={elementRef} className={`animated-element ${className}`}>
      {children}
    </div>
  );
};
```

### 应用层集成

在应用中集成动画系统，以Vue3为例：

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <!-- 全局动画提供者 -->
    <animation-provider>
      <!-- 路由切换动画 -->
      <router-transition>
        <router-view />
      </router-transition>
      
      <!-- 全局通知组件 -->
      <notifications />
    </animation-provider>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { animationEngine } from './animation/core/engine';
import AnimationProvider from './components/AnimationProvider.vue';
import RouterTransition from './components/RouterTransition.vue';
import Notifications from './components/Notifications.vue';

export default defineComponent({
  components: {
    AnimationProvider,
    RouterTransition,
    Notifications
  },
  setup() {
    // 初始化动画引擎配置
    onMounted(() => {
      animationEngine.setConfig({
        defaultDuration: 0.4,
        defaultEase: 'power2.out',
        enableLogging: process.env.NODE_ENV === 'development'
      });
      
      // 初始化ScrollTrigger
      animationEngine.ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
      });
      
      // 刷新ScrollTrigger
      animationEngine.ScrollTrigger.refresh();
    });
    
    // 清理动画引擎
    onBeforeUnmount(() => {
      animationEngine.clearAll();
    });
    
    return {};
  }
});
</script>
```

### 路由过渡管理

实现页面间的平滑过渡：

```vue
<!-- components/RouterTransition.vue -->
<template>
  <transition
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @enter="enter"
    @after-enter="afterEnter"
    :css="false"
  >
    <slot />
  </transition>
</template>

<script>
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import { animationEngine } from '../animation/core/engine';

export default defineComponent({
  setup() {
    const router = useRouter();
    const timeline = ref(null);
    
    // 路由变化前
    const beforeLeave = (el) => {
      // 创建新的时间线
      timeline.value = animationEngine.createTimeline({
        paused: true,
        onComplete: () => {
          // 清理时间线
          timeline.value = null;
        }
      });
      
      // 保存滚动位置
      el._scrollPosition = window.scrollY;
      
      // 触发离开前事件
      animationEngine.ScrollTrigger.getAll().forEach(trigger => {
        // 临时禁用滚动触发器
        trigger.disable(false, false);
      });
    };
    
    // 页面离开动画
    const leave = (el, done) => {
      if (!timeline.value) return done();
      
      // 添加离开动画
      timeline.value.to(el, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: 'power1.in',
        onComplete: done
      });
      
      // 播放时间线
      timeline.value.play();
    };
    
    // 页面离开后
    const afterLeave = () => {
      // 滚动到顶部
      window.scrollTo(0, 0);
    };
    
    // 页面进入动画
    const enter = (el, done) => {
      // 设置初始状态
      gsap.set(el, { opacity: 0, y: 30 });
      
      // 创建进入动画
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: done
      });
    };
    
    // 页面进入后
    const afterEnter = (el) => {
      // 重新启用滚动触发器
      animationEngine.ScrollTrigger.getAll().forEach(trigger => {
        trigger.enable();
      });
      
      // 刷新滚动触发器
      animationEngine.ScrollTrigger.refresh();
    };
    
    return {
      beforeLeave,
      leave,
      afterLeave,
      enter,
      afterEnter
    };
  }
});
</script>
```

### 动画设计系统集成

将动画系统与设计系统集成：

```typescript
// src/animation/services/designSystem.ts
import { animationPresets } from './presets';

// 导入设计系统令牌
import { tokens } from '../../design-system/tokens';

// 定义设计系统动画令牌
interface AnimationTokens {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  ease: {
    standard: string;
    in: string;
    out: string;
    sharp: string;
    bouncy: string;
  };
  transition: {
    page: string;
    modal: string;
    dropdown: string;
  };
}

// 从设计系统获取的动画令牌
const animationTokens: AnimationTokens = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.7
  },
  ease: {
    standard: 'power2.inOut',
    in: 'power2.in',
    out: 'power2.out',
    sharp: 'power3.out',
    bouncy: 'back.out(1.7)'
  },
  transition: {
    page: 'pageTransition',
    modal: 'modalTransition',
    dropdown: 'dropdownTransition'
  }
};

// 根据设计系统令牌注册预设
export function registerDesignSystemPresets(): void {
  // 页面过渡
  animationPresets.register({
    name: animationTokens.transition.page,
    props: { opacity: 0, y: 30 },
    duration: animationTokens.duration.normal,
    ease: animationTokens.ease.out
  });
  
  // 模态框过渡
  animationPresets.register({
    name: animationTokens.transition.modal,
    props: { opacity: 0, scale: 0.9, y: -20 },
    duration: animationTokens.duration.fast,
    ease: animationTokens.ease.bouncy
  });
  
  // 下拉菜单过渡
  animationPresets.register({
    name: animationTokens.transition.dropdown,
    props: { opacity: 0, y: -10, transformOrigin: 'top' },
    duration: animationTokens.duration.fast,
    ease: animationTokens.ease.sharp
  });
  
  // 根据设计系统颜色创建动画
  Object.entries(tokens.colors).forEach(([name, value]) => {
    // 颜色过渡动画
    animationPresets.register({
      name: `colorTo${name.charAt(0).toUpperCase() + name.slice(1)}`,
      props: { backgroundColor: value },
      duration: animationTokens.duration.normal,
      ease: animationTokens.ease.standard
    });
  });
}
```

::: tip 大型项目动画架构关键点
- 采用分层架构设计，实现关注点分离和代码复用
- 创建统一的动画引擎封装，提供一致的API接口
- 实现动画预设系统，确保整个应用动画风格统一
- 设计响应式动画系统，自动适应不同屏幕尺寸
- 与设计系统深度集成，使用设计令牌驱动动画配置
- 提供性能监控和优化工具，确保动画流畅运行
- 为路由切换创建统一的过渡效果，提升用户体验
:::

## 实战案例：框架集成动画系统

构建一个完整的框架集成动画系统，应用本章所学的各项技术。

<!-- 这里将包含完整的框架集成动画系统的实现过程 -->

## 实战练习

尝试在你选择的框架中实现高级动画效果，应用本章所学的集成技术。

<!-- 这里将包含实战练习任务和指导 --> 